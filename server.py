import http.server
import socketserver
import webbrowser
import os
import sys
import subprocess
import socket

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

def get_port(preferred=8000):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        if s.connect_ex(('127.0.0.1', preferred)) != 0:
            return preferred
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('', 0))
        return s.getsockname()[1]

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(root_dir)
    port = get_port(8000)
    url = f"http://localhost:{port}"

    print(f"=====================================================")
    print(f"  🌟 MÁY CHỦ LOCALHOST ĐANG CHẠY")
    print(f"  👉 Truy cập tại: {url}")
    print(f"  👉 Thư mục gốc : {root_dir}")
    print(f"  👉 Để dừng máy chủ: Nhấn Ctrl + C")
    print(f"=====================================================")
    sys.stdout.flush()

    chrome_paths = [
        os.path.expandvars(r"%ProgramFiles%\Google\Chrome\Application\chrome.exe"),
        os.path.expandvars(r"%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"),
        os.path.expandvars(r"%LocalAppData%\Google\Chrome\Application\chrome.exe"),
        os.path.expandvars(r"%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"),
        os.path.expandvars(r"%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"),
    ]
    
    app_launched = False
    for p in chrome_paths:
        if os.path.exists(p):
            try:
                subprocess.Popen([p, f"--app={url}"])
                app_launched = True
                break
            except Exception:
                pass

    if not app_launched:
        webbrowser.open(url)

    # Use ThreadingHTTPServer so multiple requests and assets never block
    ServerClass = getattr(http.server, 'ThreadingHTTPServer', socketserver.ThreadingTCPServer)
    ServerClass.allow_reuse_address = True
    with ServerClass(("", port), CustomHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nĐã dừng máy chủ localhost.")

if __name__ == "__main__":
    main()
