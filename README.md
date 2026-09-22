# Interactive Masonry Image Gallery

เว็บเพจแสดงคลังภาพแกเลอรีสไตล์ Masonry Layout พร้อมกรองแท็กคำสำคัญ

---

## Features (คุณสมบัติของระบบ)

1. **Masonry Layout:** จัดวางรูปภาพที่มีความสูงไม่เท่ากันให้ชิดกัน จากซ้ายไปขวา 
2. **Infinite Scroll :** โหลดข้อมูลอัตโนมัติ เมื่อผู้ใช้เลื่อนหน้าจอลงมาด้านล่างสุด ระบบจะเรียกฟังก์ชันดึงข้อมูลเพิ่มให้ทันทีเพื่อแสดงภาพถัดไป
3. **Hashtag & Filtering System:**
   - รูปภาพแต่ละรูปสามารถมีคำสำคัญ (Keywords / Hashtags) ได้ไม่จำกัดจำนวน
   - เมื่อกดที่ Hashtag ใดๆ ระบบจะทำการกรอง (Filter) หน้าจอเพื่อแสดงเฉพาะรูปภาพที่มีคำสำคัญนั้นทันที
4. **Multi-Source Images:** รองรับการดึงรูปภาพจำลองและรูปภาพสุ่มคุณภาพสูง เช่น [Placehold.co](https://placehold.co), [Picsum Photos](https://picsum.photos), และ [Flickr](https://loremflickr.com).


---

## Getting Started (วิธีเปิดใช้งานในเครื่อง)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
เปิดบราวเซอร์ไปที่ลิงก์ (เช่น `http://localhost:5173`) เพื่อทดสอบการทำงาน


