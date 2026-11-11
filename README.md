# 🌟 Siêu Ứng Dụng Gọi Tên Học Sinh — Gọi Tên Ngôi Sao 🌟

Hệ thống trò chơi gọi tên học sinh ngẫu nhiên toàn diện dành cho giáo viên và lớp học, tích hợp **15 trò chơi tương tác đỉnh cao**, hoàn toàn **đồng bộ 100% về cơ chế hoạt động và bảng màu vũ trụ ngôi sao**, âm thanh hiệu ứng sống động, hỗ trợ câu hỏi trắc nghiệm/tự luận và chạy **100% Offline**.

---

## 🎮 Hệ thống 15 trò chơi gọi tên học sinh (Đồng bộ 100%)

Tất cả 15 trò chơi đều được tích hợp trực tiếp trên thanh điều hướng và kho game của ứng dụng:

1. **🎡 Vòng quay ngôi sao (`wheel`)**: Vòng quay may mắn rực rỡ, mũi tên vàng chỉ trúng tên người được vinh danh.
2. **🚀 Đua tên lửa (`race`)**: Các tên lửa vũ trụ bứt phá tốc độ bay lên không gian.
3. **🐷 Bắt heo (`pig`)**: Đàn heo con ngộ nghĩnh chạy nhảy trong sân vườn.
4. **✨ Bầu trời sao (`sky`)**: Chòm sao thiên hà huyền ảo kết nối các vì sao học sinh.
5. **🦆 Bắt vịt sân đình (`duck`)**: Đàn vịt vàng đáng yêu bơi lội dưới ánh đèn rọi spotlight vàng óng.
6. **⚙️ Cỗ Máy Kỳ Diệu (`machine`)**: Cỗ máy viễn tưởng với bánh răng kim loại và màn hình cuộn tên phát sáng.
7. **🃏 Lá Bài Định Mệnh (`card`)**: Những lá bài ma thuật lật mở 3D tỏa ánh hào quang ngôi sao lấp lánh.
8. **🔮 Triệu Hồi Tinh Cầu (`orb`)**: Quả cầu năng lượng 3D vũ trụ hút các vì sao học sinh vào tâm ánh sáng.
9. **🛸 UFO Không Gian (`ufo`)**: Đĩa bay ngoài hành tinh chiếu chùm tia laser hút học sinh lên làm nhiệm vụ.
10. **🌀 Vòng Quay Lốc Xoáy (`vortex`)**: Cơn bão xoáy sao 3D cuốn các tên xoay tít và phóng tên bạn chiến thắng.
11. **🎱 Đua Bi Sinh Tử (`marble`)**: Đua bi vật lý Pachinko nảy qua các cọc zic-zac lao qua vạch đích.
12. **👥 Ghép cặp · Chia nhóm (`group`)**: Tự động chia cặp/chia nhóm học tập ngẫu nhiên, công bằng, không ai bị bỏ sót.
13. **🏁 Chặng Đua Ngân Hà (`rally`)**: Đua theo từng chặng qua các lượt gieo.
14. **🐝 Đàn Ong Về Tổ (`bee`)**: Mỗi bạn một chú ong bay đua trên đồng hoa, chú về đích đầu tiên bay vào tổ.
15. **🌟 Gọi Nhiều Ngôi Sao (`multi`)**: Chọn số bạn (1–20), xào thẻ, đèn dò chọn và quay tên trước khi lật từng thẻ; thẻ cuối là Siêu Sao được thưởng ngay 1★. Bấm vào thẻ để hỏi hoặc thưởng sao cho bạn đó.

---

## ⚡ Đồng bộ cơ chế hoạt động & Màu sắc thiết kế

### 1. Đồng bộ Cơ chế hoạt động (Shared Mechanism):
- **Dùng chung danh sách học sinh**: Chọn lớp ở thanh trên cùng, tất cả 15 game đều ngay lập tức cập nhật danh sách của lớp đó.
- **Không gọi lại bạn đã được gọi**: Tùy chọn `Không gọi lại` tự động lọc học sinh và hiển thị thanh tiến độ còn lại của lớp.
- **Tích hợp bộ câu hỏi**: Kèm câu hỏi trắc nghiệm, đúng/sai, tự luận với công thức Toán KaTeX, đồng hồ đếm ngược và chấm điểm tự động.
- **Âm thanh & Đọc tên**: Âm thanh Web Audio chân thực, tiếng reo hò "Yeah!", và giọng đọc to tên học sinh (không tự đọc câu hỏi; bấm “Đọc câu hỏi” khi cần). Sau khi đọc tên có 5 giây chuẩn bị rồi mới tính giờ.
- **Không lặp lại câu hỏi**: Mỗi lớp dùng lần lượt hết bộ câu hỏi rồi mới quay lại từ đầu, nhớ cả khi tắt máy; có nút “Làm mới câu hỏi”.
- **Bảng vàng ngôi sao**: Tự động tích lũy và cập nhật số sao thưởng (★) của từng học sinh sau mỗi lượt gọi.
- **Phím tắt tiện lợi**: Kích hoạt bằng nút bấm lớn `GỌI TÊN ★` hoặc nhấn phím `Space` / `Enter`.

### 2. Đồng bộ Màu sắc Vũ Trụ (Cosmic Starry Palette):
- **Nền chính**: Xanh vũ trụ sâu thẳm `#0b1230` với hiệu ứng gradient tím xanh huyền bí.
- **Bầu trời ngàn sao**: Hàng trăm hạt sao lấp lánh chuyển động nhẹ nhàng phía sau.
- **Điểm nhấn ngôi sao**: Vàng ánh kim rực rỡ `#ffc23d` và `#ffe08a`.
- **Khung & Thẻ**: Bo tròn mềm mại, nền navy `#121a3d` với viền xanh công nghệ `#2a3670`.
- **Font chữ**: Chuẩn tiếng Việt `Baloo 2` và `Be Vietnam Pro`.

---

## 🔒 Mật khẩu sử dụng

Lần đầu mở ứng dụng (trang chính hoặc từng trò chơi) sẽ phải nhập mật khẩu. Tích “Ghi nhớ trên máy này” thì lần sau không hỏi lại; bỏ tích thì chỉ nhớ đến khi đóng trình duyệt. Mã chỉ lưu mã băm của mật khẩu trong [`libs/khoa.js`](libs/khoa.js); muốn đổi mật khẩu thì thay giá trị `HASH` trong tệp đó theo hướng dẫn ở đầu tệp.

---

## 🚀 Cách chạy & Cài đặt

- **Chạy máy chủ Localhost**: Nhấp đúp vào [`Chay_App.bat`](file:///c:/Users/oc/OneDrive/Desktop/GOI_TEN_NGOI_SAO/Chay_App.bat) hoặc truy cập [http://localhost:8000](http://localhost:8000).
- **Cài đặt Desktop 1-Click**: Nhấp đúp vào [`Cai_Dat_Desktop.bat`](file:///c:/Users/oc/OneDrive/Desktop/GOI_TEN_NGOI_SAO/Cai_Dat_Desktop.bat) để tạo icon ngoài Desktop và Start Menu.
- **Mở trực tiếp offline**: Nhấp đúp vào [`index.html`](file:///c:/Users/oc/OneDrive/Desktop/GOI_TEN_NGOI_SAO/index.html).
