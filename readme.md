# FreshMart AI — Sàn Thương Mại Điện Tử Bán Trái Cây Tươi Sạch

Dự án đồ án website thương mại điện tử chuyên cung cấp trái cây tươi sạch, trái cây nhập khẩu và giỏ quà cao cấp; tích hợp **Trợ lý AI tư vấn dinh dưỡng** và **AI tóm tắt đánh giá khách hàng** bám sát dữ liệu thực tế từ cơ sở dữ liệu SQL Server.

- **Backend:** Python Django, Django REST Framework (DRF)
- **Database:** Microsoft SQL Server (14 bảng quan hệ chuẩn hóa ACID)
- **Frontend:** ReactJS (Vite, Tailwind CSS, Lucide Icons, Axios)
- **Tích hợp:** Giao Hàng Nhanh (GHN), Cổng thanh toán VNPay Sandbox, AI Chatbot

---

## 🛠️ PHẦN 1: HƯỚNG DẪN CÀI ĐẶT CÔNG CỤ TỪ CON SỐ 0 (DÀNH CHO MÁY MỚI TINH)

Để chạy được dự án, máy tính cần được cài đặt lần lượt 5 phần mềm dưới đây (chỉ cần làm một lần duy nhất):

### 1. Cài đặt Python (Môi trường chạy Backend Django)
1. Tải bản cài đặt chính thức: [Python 3.11 hoặc 3.12](https://www.python.org/downloads/)
2. Chạy file cài đặt vừa tải về (`python-3.11.x-amd64.exe`).
3. ⚠️ **BƯỚC BẮT BUỘC:** Ở màn hình đầu tiên, nhìn xuống dưới cùng và **tích chọn vào ô:**
   `☑ Add python.exe to PATH`
4. Bấm vào dòng chữ **Install Now** ở trên cùng và chờ máy cài xong thì bấm **Close**.
5. Mở Command Prompt (`cmd`) gõ `python --version` để kiểm tra (hiện `Python 3.11.x` là thành công).

---

### 2. Cài đặt Node.js (Môi trường chạy Frontend React)
1. Tải bản cài đặt chính thức: [Node.js (Bản LTS khuyên dùng)](https://nodejs.org/)
2. Chạy file cài đặt (`node-v20.x.x-x64.msi`).
3. Bấm **Next** liên tục theo các cài đặt mặc định đến khi bấm **Install** và **Finish**.
4. Mở Command Prompt (`cmd`) gõ `node -v` và `npm -v` để kiểm tra.

---

### 3. Cài đặt Microsoft SQL Server & SSMS (Hệ quản trị cơ sở dữ liệu)
1. **Cài SQL Server 2022 Express (Bản miễn phí):**
   - Tải bộ cài tại: [SQL Server 2022 Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads/)
   - Mở file cài đặt, chọn ô **Basic** (Cơ bản) $\rightarrow$ Bấm **Accept** $\rightarrow$ Bấm **Install**.
   - Chờ máy tự động tải và cài đặt xong.
2. **Cài SQL Server Management Studio (SSMS - Giao diện quản lý):**
   - Tải phần mềm tại: [Tải SSMS mới nhất](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms)
   - Chạy file cài đặt, bấm **Install**. Cài xong khởi động lại máy tính nếu được yêu cầu.

---

### 4. Cài đặt Microsoft ODBC Driver for SQL Server (Driver kết nối Python - SQL)
1. Tải trình điều khiển: [Microsoft ODBC Driver 18 for SQL Server (x64)](https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server)
2. Mở file cài đặt, bấm **Next** $\rightarrow$ **Install** $\rightarrow$ **Finish**.
*(Đây là trình điều khiển bắt buộc để thư viện `pyodbc` trong Python có thể kết nối được với SQL Server).*

---

### 5. Cài đặt Git & VS Code
1. Tải và cài đặt [Visual Studio Code](https://code.visualstudio.com/) để chỉnh sửa code.
2. Tải và cài đặt [Git for Windows](https://www.google.com/search?q=https://git-scm.com/downloads) để tải mã nguồn từ GitHub.

---

## 🚀 PHẦN 2: HƯỚNG DẪN KHỞI CHẠY DỰ ÁN TỪ GITHUB

### Bước 1: Tải mã nguồn về máy (Clone Repository)

Mở **Command Prompt (`cmd`)** hoặc **PowerShell** tại thư mục bạn muốn lưu code (ví dụ `D:\code`), gõ lệnh:

```bash
# Tải mã nguồn từ nhánh test01
git clone -b test01 https://github.com/RyotaD6/do-an-tmdt-fruit-shop.git

# Đi vào thư mục dự án
cd do-an-tmdt-fruit-shop
```

---

### Bước 2: Thiết lập Cơ sở dữ liệu trên SQL Server

1. Mở phần mềm **SQL Server Management Studio (SSMS)** lên, đăng nhập bằng tài khoản Windows (*Windows Authentication*).
2. Bấm vào nút **New Query** trên thanh công cụ, dán đoạn lệnh sau và bấm **Execute** (hoặc `F5`):

```sql
-- 1. Tạo database cho dự án
CREATE DATABASE FreshMartDB;
GO

-- 2. Kích hoạt tài khoản sa và đặt mật khẩu là 123
ALTER LOGIN sa WITH PASSWORD = '123', CHECK_POLICY = OFF;
ALTER LOGIN sa ENABLE;
GO

-- 3. Bật chế độ đăng nhập Mixed Mode (cho phép đăng nhập bằng tài khoản sa)
EXEC xp_instance_regwrite 
    N'HKEY_LOCAL_MACHINE', 
    N'Software\Microsoft\MSSQLServer\MSSQLServer', 
    N'LoginMode', 
    REG_DWORD, 2;
GO
```

3. **Khởi động lại SQL Server:** Nhấp chuột phải vào tên Server ở dòng trên cùng bên trái của SSMS $\rightarrow$ Chọn **Restart** $\rightarrow$ Chọn **Yes**.

---

### Bước 3: Cài đặt và Khởi chạy Backend (Django)

Mở cửa sổ dòng lệnh tại thư mục dự án và chuyển vào thư mục `backend`:

```bash
cd backend

# 1. Tạo môi trường ảo Python
python -m venv venv

# 2. Kích hoạt môi trường ảo (trên Windows)
venv\Scripts\activate
# (Nếu dùng macOS/Linux thì gõ: source venv/bin/activate)

# 3. Cài đặt các thư viện cần thiết
pip install -r requirements.txt
```

> **Lưu ý kiểm tra tên Server:** Mở file `core/settings.py`, tìm đoạn `DATABASES`, kiểm tra dòng `'HOST': r'TÊN_SERVER_CỦA_BẠN'` đã đúng với tên Server hiển thị trên máy bạn chưa (ví dụ: `localhost\SQLEXPRESS` hoặc `LAPTOP-XXXXXX\SQLEXPRESS`).

Tiếp tục chạy các lệnh tạo bảng và khởi động Backend:

```bash
# 4. Tạo toàn bộ 14 bảng dữ liệu vào SQL Server
python manage.py migrate

# 5. Tạo tài khoản Admin quản trị (tùy chọn)
python manage.py createsuperuser

# 6. Khởi chạy máy chủ Backend
python manage.py runserver
```

Backend sẽ khởi chạy tại: **`http://127.0.0.1:8000/`**

> **⚡ Bước nạp dữ liệu trái cây mẫu:** Ngay sau khi server chạy, bạn mở trình duyệt truy cập vào link này một lần duy nhất để nạp sẵn dữ liệu trái cây mẫu vào SQL Server:  
> 👉 **`http://127.0.0.1:8000/api/seed-data/`**

---

### Bước 4: Cài đặt và Khởi chạy Frontend (ReactJS)

Mở một **cửa sổ Terminal mới** tại thư mục dự án và chuyển vào thư mục `frontend`:

```bash
cd frontend

# 1. Cài đặt toàn bộ thư viện npm
npm install

# 2. Khởi chạy giao diện web
npm run dev
```

Giao diện web sẽ khởi chạy tại địa chỉ:  
👉 **`http://localhost:5173/`**

Giữ phím `Ctrl` và click vào link để mở trang web trên trình duyệt!

---

## 🌟 CÁC CHỨC NĂNG CHÍNH ĐỂ TEST THỬ NGHIỆM

1. **Mua sắm & Giỏ hàng:** Chọn biến thể quy cách (Hộp 500g, 1kg, Thùng), độ chín (Ăn ngay, Già 85%), hệ thống tự động tính cước GHN theo trọng lượng.
2. **Thanh toán VNPay Sandbox:**
   - Ngân hàng test: `NCB (Ngân hàng Quốc Dân - Sandbox)`
   - Số thẻ: `9704198526191432198` | Tên chủ thẻ: `NGUYEN VAN A`
   - Ngày phát hành: `07/15` | Mã OTP: `123456`
3. **Bảo vệ người mua & Hoàn tiền:** Bấm "Hủy đơn" hoặc gửi "Yêu cầu hoàn trả" để thấy tiền tự động hoàn 100% về Ví nội bộ.
4. **Chatbot AI tư vấn:** Bấm vào biểu tượng Chatbot AI ở góc dưới màn hình, gõ các câu như:
   - *"Tư vấn trái cây giảm cân"*
   - *"Giỏ quà biếu sinh nhật"*
   - *"Sầu riêng Flash Sale"*
   AI sẽ truy vấn trực tiếp dữ liệu từ SQL Server và trích dẫn sản phẩm kèm nút thêm nhanh vào giỏ.
5. **Chuyển vai trò Demo:** Ở thanh trên cùng, bạn có thể chuyển đổi giữa quyền **Khách hàng**, **Nhà vườn (Seller Center)** và **Admin** để trải nghiệm đầy đủ các luồng quản trị.

---

## 📁 CẤU TRÚC THƯ MỤC DỰ ÁN

```text
do-an-tmdt-fruit-shop/
├── backend/                  # Backend Python Django
│   ├── api/                  # Ứng dụng xử lý API, Models, Serializers
│   │   ├── models.py         # 14 Models dữ liệu quan hệ
│   │   ├── views.py          # API endpoints & Chatbot AI logic
│   │   └── urls.py
│   ├── core/                 # Cấu hình dự án Django (settings.py)
│   ├── manage.py
│   └── requirements.txt      # Danh sách thư viện Python
├── frontend/                 # Frontend ReactJS + Vite + Tailwind CSS
│   ├── src/
│   │   ├── App.jsx           # Giao diện chính kết nối API
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md                 # Hướng dẫn chi tiết
```

---

## 📡 DANH SÁCH ENDPOINT API CHÍNH

- `GET /api/products/` — Lấy danh sách trái cây kèm biến thể từ SQL Server.
- `GET /api/categories/` — Lấy danh mục phân loại trái cây.
- `POST /api/ai/advisor/` — API Chatbot AI tư vấn & gợi ý sản phẩm.
- `GET /api/seed-data/` — Tự động nạp dữ liệu mẫu ban đầu vào SQL Server.
- `GET /admin/` — Trang quản trị hệ thống Django Admin.
