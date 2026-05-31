#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any


PORT = 8787
ROOT = Path(__file__).resolve().parent
ENV_PATH = ROOT / ".env"


CAPITAL_ASSET_ENV_KEYS = {
    "NASDAQ 100": "CAPITAL_NASDAQ_100_EPIC",
    "S&P 500": "CAPITAL_SP_500_EPIC",
    "WTI OIL/USD": "CAPITAL_WTI_OIL_USD_EPIC",
    "XAU/USD": "CAPITAL_XAU_USD_EPIC",
    "XAG/USD": "CAPITAL_XAG_USD_EPIC",
    "EUR/USD": "CAPITAL_EUR_USD_EPIC",
    "AUD/USD": "CAPITAL_AUD_USD_EPIC",
    "NVIDIA": "CAPITAL_NVIDIA_EPIC",
    "TESLA": "CAPITAL_TESLA_EPIC",
    "AIRBNB": "CAPITAL_AIRBNB_EPIC",
    "BTC/USD": "CAPITAL_BTC_USD_EPIC",
    "ETH/USD": "CAPITAL_ETH_USD_EPIC",
    "LTC/USD": "CAPITAL_LTC_USD_EPIC",
}

capital_session: dict[str, Any] = {}
quote_cache: dict[str, Any] = {"quotes": {}, "errors": [], "timestamp": 0.0}
capital_quote_cache: dict[str, Any] = {"quotes": {}, "timestamp": 0.0}
coinbase_quote_cache: dict[str, Any] = {"quotes": {}, "timestamp": 0.0}
CAPITAL_QUOTES_TTL_SECONDS = 12
COINBASE_QUOTES_TTL_SECONDS = 3

YAHOO_SYMBOLS = {
    "NASDAQ 100": "NQ=F",
    "S&P 500": "ES=F",
    "WTI OIL/USD": "CL=F",
    "XAU/USD": "GC=F",
    "XAG/USD": "SI=F",
    "EUR/USD": "EURUSD=X",
    "AUD/USD": "AUDUSD=X",
    "NVIDIA": "NVDA",
    "TESLA": "TSLA",
    "AIRBNB": "ABNB",
}

COINBASE_PRODUCTS = {
    "BTC/USD": "BTC-USD",
    "ETH/USD": "ETH-USD",
    "LTC/USD": "LTC-USD",
}


def load_env_file() -> None:
    if not ENV_PATH.exists():
        return
    for raw_line in ENV_PATH.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


load_env_file()


def fetch_json(
    url: str,
    timeout: int = 8,
    headers: dict[str, str] | None = None,
    method: str = "GET",
    body: dict[str, Any] | None = None,
) -> tuple[dict[str, Any], dict[str, str]]:
    request_headers = {"User-Agent": "MarketIntelligenceApp/1.0"}
    request_headers.update(headers or {})
    data = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        request_headers["Content-Type"] = "application/json"
    request = urllib.request.Request(url, headers=request_headers, data=data, method=method)
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            payload = response.read().decode("utf-8") or "{}"
            return json.loads(payload), dict(response.headers.items())
    except urllib.error.HTTPError as exc:
        body_text = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {exc.code}: {body_text or exc.reason}") from exc


def format_price(asset: str, price: float) -> str:
    if asset in {"EUR/USD", "AUD/USD"}:
        return f"${price:,.5f}"
    if asset in {"LTC/USD", "WTI OIL/USD", "XAG/USD"}:
        return f"${price:,.2f}"
    if price >= 1000:
        return f"${price:,.0f}"
    return f"${price:,.2f}"


def yahoo_quotes() -> dict[str, dict[str, Any]]:
    quotes: dict[str, dict[str, Any]] = {}
    for asset, symbol in YAHOO_SYMBOLS.items():
        encoded = urllib.parse.quote(symbol, safe="")
        url = f"https://query1.finance.yahoo.com/v8/finance/chart/{encoded}?range=1d&interval=1m"
        payload, _ = fetch_json(url)
        result = (payload.get("chart", {}).get("result") or [{}])[0]
        meta = result.get("meta") or {}
        price = meta.get("regularMarketPrice")
        quote_time = meta.get("regularMarketTime") or time.time()
        if price is None:
            continue
        now = time.time()
        age = max(0, now - float(quote_time))
        quotes[asset] = {
            "asset": asset,
            "providerSymbol": symbol,
            "price": float(price),
            "formatted": format_price(asset, float(price)),
            "timestamp": quote_time,
            "ageSeconds": round(age, 1),
            "source": "Yahoo Finance public quote",
            "isFresh": age <= 90,
            "note": "Public quotes can be delayed. Use broker/exchange feed for scalp execution.",
        }
    return quotes


def coinbase_quotes() -> dict[str, dict[str, Any]]:
    now = time.time()
    if now - float(coinbase_quote_cache["timestamp"]) < COINBASE_QUOTES_TTL_SECONDS:
        return refresh_cached_ages(coinbase_quote_cache["quotes"])
    quotes: dict[str, dict[str, Any]] = {}
    for asset, product in COINBASE_PRODUCTS.items():
        try:
            payload, _ = fetch_json(f"https://api.exchange.coinbase.com/products/{product}/ticker")
            price = float(payload["price"])
            quotes[asset] = {
                "asset": asset,
                "providerSymbol": product,
                "price": price,
                "formatted": format_price(asset, price),
                "timestamp": now,
                "ageSeconds": 0,
                "source": "Coinbase Exchange public ticker",
                "isFresh": True,
                "note": "Public crypto ticker. Verify on your execution venue before trading.",
            }
        except (KeyError, ValueError, urllib.error.URLError, TimeoutError):
            continue
    coinbase_quote_cache["quotes"] = quotes
    coinbase_quote_cache["timestamp"] = now
    return quotes


def capital_enabled() -> bool:
    return all(
        os.environ.get(key)
        for key in ["CAPITAL_API_KEY", "CAPITAL_IDENTIFIER", "CAPITAL_API_PASSWORD"]
    )


def capital_base_url() -> str:
    use_demo = os.environ.get("CAPITAL_DEMO", "true").lower() != "false"
    if use_demo:
        return "https://demo-api-capital.backend-capital.com/api/v1"
    return "https://api-capital.backend-capital.com/api/v1"


def capital_login() -> None:
    now = time.time()
    if capital_session.get("cst") and now < float(capital_session.get("expires_at", 0)):
        return
    url = f"{capital_base_url()}/session"
    _, headers = fetch_json(
        url,
        method="POST",
        headers={"X-CAP-API-KEY": os.environ["CAPITAL_API_KEY"]},
        body={
            "identifier": os.environ["CAPITAL_IDENTIFIER"],
            "password": os.environ["CAPITAL_API_PASSWORD"],
            "encryptedPassword": False,
        },
    )
    cst = headers.get("CST") or headers.get("cst")
    security_token = headers.get("X-SECURITY-TOKEN") or headers.get("x-security-token")
    if not cst or not security_token:
        raise RuntimeError("Capital.com session created without CST/X-SECURITY-TOKEN headers")
    capital_session.update(
        {
            "cst": cst,
            "security_token": security_token,
            "expires_at": now + 8 * 60,
        }
    )


def capital_headers() -> dict[str, str]:
    capital_login()
    return {
        "CST": str(capital_session["cst"]),
        "X-SECURITY-TOKEN": str(capital_session["security_token"]),
    }


def capital_get(path: str, params: dict[str, str] | None = None) -> dict[str, Any]:
    query = f"?{urllib.parse.urlencode(params)}" if params else ""
    payload, _ = fetch_json(f"{capital_base_url()}{path}{query}", headers=capital_headers())
    return payload


def parse_capital_update_time(value: str | None) -> float:
    if not value:
        return time.time()
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00")).timestamp()
    except ValueError:
        return time.time()


def capital_quotes() -> dict[str, dict[str, Any]]:
    if not capital_enabled():
        return {}
    now = time.time()
    if now - float(capital_quote_cache["timestamp"]) < CAPITAL_QUOTES_TTL_SECONDS:
        return refresh_cached_ages(capital_quote_cache["quotes"])
    quotes: dict[str, dict[str, Any]] = {}
    for asset, env_key in CAPITAL_ASSET_ENV_KEYS.items():
        epic = os.environ.get(env_key)
        if not epic:
            continue
        payload = capital_get(f"/markets/{urllib.parse.quote(epic, safe='')}")
        snapshot = payload.get("snapshot") or {}
        instrument = payload.get("instrument") or {}
        bid = snapshot.get("bid")
        offer = snapshot.get("offer")
        if bid is None and offer is None:
            continue
        price = float(offer if bid is None else bid if offer is None else (float(bid) + float(offer)) / 2)
        delay_time = float(snapshot.get("delayTime") or 0)
        timestamp = parse_capital_update_time(snapshot.get("updateTime"))
        quotes[asset] = {
            "asset": asset,
            "providerSymbol": epic,
            "price": price,
            "formatted": format_price(asset, price),
            "timestamp": timestamp,
            "ageSeconds": 0 if delay_time == 0 else delay_time,
            "source": "Capital.com CFD quote",
            "isFresh": delay_time == 0 and snapshot.get("marketStatus") == "TRADEABLE",
            "marketStatus": snapshot.get("marketStatus") or "UNKNOWN",
            "note": (
                f"{instrument.get('name', epic)}. Bid {bid}, offer {offer}. "
                "Capital.com prices are CFD quotes, not direct CME futures quotes."
            ),
        }
    capital_quote_cache["quotes"] = quotes
    capital_quote_cache["timestamp"] = now
    return quotes


def refresh_cached_ages(quotes: dict[str, dict[str, Any]]) -> dict[str, dict[str, Any]]:
    now = time.time()
    refreshed: dict[str, dict[str, Any]] = {}
    for asset, quote in quotes.items():
        copy = dict(quote)
        timestamp = float(copy.get("timestamp") or now)
        copy["ageSeconds"] = round(max(0, now - timestamp), 1)
        refreshed[asset] = copy
    return refreshed


def all_quotes() -> tuple[dict[str, Any], list[str]]:
    now = time.time()
    if now - float(quote_cache["timestamp"]) < 2:
        return refresh_cached_ages(quote_cache["quotes"]), list(quote_cache["errors"])
    quotes: dict[str, Any] = {}
    errors: list[str] = []
    try:
        quotes.update(capital_quotes())
    except Exception as exc:  # noqa: BLE001
        errors.append(f"Capital.com unavailable: {exc}")
        quotes.update(refresh_cached_ages(capital_quote_cache["quotes"]))
    try:
        yahoo = yahoo_quotes()
        for asset, quote in yahoo.items():
            quotes.setdefault(asset, quote)
    except Exception as exc:  # noqa: BLE001
        errors.append(f"Yahoo unavailable: {exc}")
    try:
        coinbase = coinbase_quotes()
        for asset, quote in coinbase.items():
            quotes.setdefault(asset, quote)
    except Exception as exc:  # noqa: BLE001
        errors.append(f"Coinbase unavailable: {exc}")
    quote_cache["quotes"] = quotes
    quote_cache["errors"] = errors
    quote_cache["timestamp"] = now
    return quotes, errors


def capital_search(term: str) -> dict[str, Any]:
    if not capital_enabled():
        return {"error": "Capital.com is not configured. Create .env first."}
    return capital_get("/markets", {"searchTerm": term})


def masked(value: str | None) -> str:
    if not value:
        return "missing"
    if len(value) <= 6:
        return "***"
    return f"{value[:3]}...{value[-3:]}"


def capital_status() -> dict[str, Any]:
    required = {
        "CAPITAL_DEMO": os.environ.get("CAPITAL_DEMO", "true"),
        "CAPITAL_API_KEY": masked(os.environ.get("CAPITAL_API_KEY")),
        "CAPITAL_IDENTIFIER": masked(os.environ.get("CAPITAL_IDENTIFIER")),
        "CAPITAL_API_PASSWORD": "set" if os.environ.get("CAPITAL_API_PASSWORD") else "missing",
    }
    if not capital_enabled():
        return {
            "configured": False,
            "settings": required,
            "message": "One or more required Capital.com .env values are missing.",
        }
    try:
        capital_login()
        return {
            "configured": True,
            "session": "ok",
            "baseUrl": capital_base_url(),
            "settings": required,
            "message": "Capital.com accepted the credentials and returned session tokens.",
        }
    except Exception as exc:  # noqa: BLE001
        return {
            "configured": True,
            "session": "failed",
            "baseUrl": capital_base_url(),
            "settings": required,
            "message": str(exc),
            "commonFixes": [
                "Use CAPITAL_DEMO=false for a live account and true for demo.",
                "CAPITAL_API_PASSWORD must be the custom API password, not your normal account password.",
                "Some accounts require encrypted password login or API access approval.",
                "Regulated regional accounts can use a different Capital.com API host/access policy.",
            ],
        }


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self) -> None:
        if self.path.startswith("/api/capital/status"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(capital_status()).encode("utf-8"))
            return
        if self.path.startswith("/api/capital/search"):
            parsed = urllib.parse.urlparse(self.path)
            term = urllib.parse.parse_qs(parsed.query).get("term", [""])[0]
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            try:
                self.wfile.write(json.dumps(capital_search(term)).encode("utf-8"))
            except Exception as exc:  # noqa: BLE001
                self.wfile.write(json.dumps({"error": str(exc)}).encode("utf-8"))
            return
        if self.path.startswith("/api/quotes"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            quotes, errors = all_quotes()
            self.wfile.write(
                json.dumps(
                    {
                        "quotes": quotes,
                        "errors": errors,
                        "serverTime": time.time(),
                        "accuracyWarning": (
                            "Use broker/exchange-grade real-time feeds for execution. "
                            "Public quotes can be delayed or unavailable."
                        ),
                    }
                ).encode("utf-8")
            )
            return
        super().do_GET()


def main() -> None:
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"Market Intelligence live server: http://127.0.0.1:{PORT}/index.html")
    server.serve_forever()


if __name__ == "__main__":
    main()
