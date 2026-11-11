/* Gọi Tên Ngôi Sao — màn hình nhập mật khẩu khi mở ứng dụng.
   Chỉ lưu mã băm SHA-256 của mật khẩu (kèm chuỗi "goi-ten-ngoi-sao:" phía trước), không lưu mật khẩu gốc.
   Đổi mật khẩu: tính SHA-256 của "goi-ten-ngoi-sao:" + mật khẩu mới rồi thay giá trị HASH bên dưới.
   Lưu ý: đây là khoá chặn người dùng thông thường; người biết sửa mã vẫn gỡ được vì mã nguồn công khai. */
(function(){
  'use strict';
  var HASH = 'c8e27eb4a3f9b3600f3fd19af010924ec5d3ae0580444e54561eac8da60ecb28';
  var SALT = 'goi-ten-ngoi-sao:', KEY = 'gtns-mo-khoa';
  // Trò chơi được nhúng trong khung của index.html thì trang chính đã hỏi mật khẩu rồi
  try { if (window.top !== window && window.top.location.href) return; } catch (e) {}
  function get(store){ try { return window[store].getItem(KEY); } catch (e) { return null; } }
  if (get('localStorage') === HASH || get('sessionStorage') === HASH) return;

  // SHA-256 viết sẵn: chạy được cả khi mở tệp trực tiếp hoặc qua mạng nội bộ (không cần crypto.subtle)
  function sha256(str){
    var s = unescape(encodeURIComponent(str)), K = [], H = [], p = 2, n = 0, i, j;
    function frac(x){ return ((x - Math.floor(x)) * 4294967296) | 0; }
    while (n < 64) { var prime = true; for (j = 2; j * j <= p; j++) if (p % j === 0) { prime = false; break; } if (prime) { if (n < 8) H[n] = frac(Math.pow(p, 1 / 2)); K[n] = frac(Math.pow(p, 1 / 3)); n++; } p++; }
    var bits = s.length * 8; s += '\x80'; while (s.length % 64 !== 56) s += '\x00';
    var W = []; for (i = 0; i < s.length; i++) W[i >> 2] |= s.charCodeAt(i) << (24 - (i % 4) * 8);
    W.push(Math.floor(bits / 4294967296), bits | 0);
    function r(x, c){ return (x >>> c) | (x << (32 - c)); }
    for (i = 0; i < W.length; i += 16) {
      var w = W.slice(i, i + 16), a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (j = 0; j < 64; j++) {
        if (j >= 16) { var x0 = w[j - 15], x1 = w[j - 2]; w[j] = (w[j - 16] + (r(x0, 7) ^ r(x0, 18) ^ (x0 >>> 3)) + w[j - 7] + (r(x1, 17) ^ r(x1, 19) ^ (x1 >>> 10))) | 0; }
        var t1 = (h + (r(e, 6) ^ r(e, 11) ^ r(e, 25)) + ((e & f) ^ (~e & g)) + K[j] + w[j]) | 0;
        var t2 = ((r(a, 2) ^ r(a, 13) ^ r(a, 22)) + ((a & b) ^ (a & c) ^ (b & c))) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }
    return H.map(function(v){ return ('00000000' + (v >>> 0).toString(16)).slice(-8); }).join('');
  }
  window.__gtnsSha256 = sha256;

  var root = document.documentElement;
  root.classList.add('gtns-locked');
  var css = document.createElement('style');
  css.textContent =
    // ẩn bằng visibility để trò chơi vẫn đo được kích thước khung, mở khoá xong hiện đúng ngay
    'html.gtns-locked body{overflow:hidden!important}' +
    'html.gtns-locked body>*:not(#gtnsLock){visibility:hidden!important}' +
    // margin:auto giữ khung ở giữa nhưng vẫn cuộn được khi cửa sổ thấp, không bị cắt mất nút
    '#gtnsLock{position:fixed;inset:0;z-index:2147483647;display:flex;overflow-y:auto;padding:16px;' +
      'background:radial-gradient(900px 600px at 70% -10%,#2a2f7a 0%,transparent 60%),radial-gradient(700px 500px at -10% 110%,#3b1d5e 0%,transparent 55%),#0b1230;' +
      'color:#eef2ff;font-family:"Be Vietnam Pro",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}' +
    '#gtnsLock form{margin:auto;width:min(380px,100%);padding:28px 24px 24px;border-radius:22px;border:1px solid #2a3670;background:linear-gradient(180deg,#1b2560,#111944);box-shadow:0 30px 80px rgba(0,0,0,.5);text-align:center}' +
    '#gtnsLock .st{font-size:46px;line-height:1;color:#ffc23d;text-shadow:0 0 24px rgba(255,194,61,.6)}' +
    '#gtnsLock h1{margin:10px 0 4px;font-family:"Baloo 2","Be Vietnam Pro",system-ui,sans-serif;font-size:28px;line-height:1.15}' +
    '#gtnsLock p{margin:0 0 18px;color:#a3add6;font-size:14.5px}' +
    '#gtnsLock input[type=password]{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:2px solid #2a3670;background:#0b1230;color:#eef2ff;font:inherit;font-size:17px;outline:none}' +
    '#gtnsLock input[type=password]:focus{border-color:#ffc23d}' +
    '#gtnsLock label{display:flex;align-items:center;justify-content:center;gap:8px;margin:12px 0 16px;font-size:14px;color:#a3add6;cursor:pointer}' +
    '#gtnsLock button{width:100%;padding:12px;border:0;border-radius:999px;font:inherit;font-weight:800;font-size:18px;color:#3a2700;cursor:pointer;background:linear-gradient(135deg,#ffe08a,#ffc23d 45%,#ff9f3d);box-shadow:0 5px 0 #b86f12}' +
    '#gtnsLock button:active{transform:translateY(3px);box-shadow:0 2px 0 #b86f12}' +
    '#gtnsLock .err{min-height:20px;margin-top:12px;color:#ff7b72;font-size:14px;font-weight:600}' +
    '#gtnsLock form.shake{animation:gtnsShake .4s}' +
    '@keyframes gtnsShake{20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}';
  (document.head || root).appendChild(css);

  // chặn phím tắt của trò chơi (Space, Enter...) khi đang khoá, trừ khi gõ trong ô mật khẩu
  function blockKeys(e){ var l = document.getElementById('gtnsLock'); if (l && !l.contains(e.target)) { e.stopImmediatePropagation(); e.preventDefault(); } }
  window.addEventListener('keydown', blockKeys, true);
  window.addEventListener('keyup', blockKeys, true);

  function show(){
    var box = document.createElement('div');
    box.id = 'gtnsLock';
    box.innerHTML = '<form autocomplete="off"><div class="st">★</div><h1>Gọi Tên Ngôi Sao</h1><p>Nhập mật khẩu để sử dụng ứng dụng</p>' +
      '<input type="password" id="gtnsPw" placeholder="Mật khẩu" aria-label="Mật khẩu" autofocus>' +
      '<label><input type="checkbox" id="gtnsKeep" checked> Ghi nhớ trên máy này</label>' +
      '<button type="submit">Mở khoá</button><div class="err" id="gtnsErr" role="alert"></div></form>';
    document.body.appendChild(box);
    var form = box.querySelector('form'), pw = box.querySelector('#gtnsPw'), err = box.querySelector('#gtnsErr');
    pw.focus();
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (sha256(SALT + pw.value) === HASH) {
        try { (box.querySelector('#gtnsKeep').checked ? localStorage : sessionStorage).setItem(KEY, HASH); } catch (x) {}
        window.removeEventListener('keydown', blockKeys, true);
        window.removeEventListener('keyup', blockKeys, true);
        box.remove(); root.classList.remove('gtns-locked');
        window.dispatchEvent(new Event('resize'));
      } else {
        err.textContent = 'Mật khẩu chưa đúng, thử lại nhé.';
        pw.value = ''; pw.focus();
        form.classList.remove('shake'); void form.offsetWidth; form.classList.add('shake');
      }
    });
  }
  if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
})();
