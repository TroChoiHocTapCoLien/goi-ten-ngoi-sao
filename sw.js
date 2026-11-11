// Gọi Tên Ngôi Sao — cho trò chơi chạy được khi không có mạng.
// Trang chính: lấy bản mới từ mạng trước, mất mạng thì dùng bản đã lưu.
// Phông chữ, KaTeX, bộ chuyển MP3 (CDN): dùng bản đã lưu, cập nhật ngầm khi có mạng.
var CACHE = 'goiten-ngoisao-v3';
var SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './libs/katex.min.css',
  './libs/katex.min.js',
  './libs/auto-render.min.js',
  './libs/lame.min.js',
  './libs/khoa.js',
  './BẮT VỊT SÂN ĐÌNH.html',
  './CỖ MÁY GỌI TÊN.html',
  './LÁ BÀI ĐỊNH MỆNH.html',
  './TRIỆU HỒI TINH CẦU.html',
  './UFO.html',
  './VÒNG QUAY LỐC XOÁY.html',
  './ĐUA BI SINH TỬ.html'
];
var CDN = [
  'https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.1/lame.min.js'
];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){
    return c.addAll(SHELL).then(function(){
      // tài nguyên CDN: lỗi một tệp không làm hỏng cả bước cài
      return Promise.all(CDN.map(function(u){ return c.add(new Request(u, { mode: 'cors' })).catch(function(){}); }));
    });
  }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener('fetch', function(e){
  var req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  var cdn = /(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com)$/.test(url.hostname);
  if (url.origin === location.origin) {
    // trang và tệp của trò chơi: mạng trước (để luôn có bản mới), mất mạng thì lấy bản lưu
    e.respondWith(fetch(req).then(function(res){
      if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function(c){ c.put(req.mode === 'navigate' ? './' : req, copy); }); }
      return res;
    }).catch(function(){
      return caches.match(req, { ignoreSearch: true }).then(function(m){ return m || caches.match('./'); });
    }));
  } else if (cdn) {
    // phông chữ, công thức: bản lưu trước, cập nhật ngầm
    e.respondWith(caches.match(req).then(function(hit){
      var net = fetch(req).then(function(res){
        if (res.ok || res.type === 'opaque') { var copy = res.clone(); caches.open(CACHE).then(function(c){ c.put(req, copy); }); }
        return res;
      }).catch(function(){ return hit; });
      return hit || net;
    }));
  }
});
