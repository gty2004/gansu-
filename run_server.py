from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import socket


HOST = "0.0.0.0"
PORT = 4173


class Utf8StaticHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
    }


def get_lan_ip() -> str:
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
            sock.connect(("8.8.8.8", 80))
            return sock.getsockname()[0]
    except OSError:
        return "127.0.0.1"


def main() -> None:
    root = Path(__file__).resolve().parent
    print(f"Serving: {root}")
    print(f"Local:   http://localhost:{PORT}/")
    print(f"QR:      http://localhost:{PORT}/qr.html")
    print(f"LAN:     http://{get_lan_ip()}:{PORT}/")
    print("Press Ctrl+C to stop.")

    server = ThreadingHTTPServer((HOST, PORT), Utf8StaticHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
