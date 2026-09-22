import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface ImageData {
  id: string;
  url: string;
}

export default function App() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const fetchMoreImages = () => {
    if (loading) return;
    setLoading(true);

    const newImages: ImageData[] = Array.from({ length: 15 }).map((_, index) => {
      const id = `${page}-${index}-${Math.random()}`;
      // สุ่มความสูงระหว่าง 300px ถึง 600px เพื่อให้เกิดเอฟเฟกต์ Masonry
      const randomWidth = 400;
      const randomHeight = Math.floor(Math.random() * (600 - 300 + 1)) + 300;

      return {
        id,
        // url: `https://picsum.photos{randomWidth}/${randomHeight}?random=${id}`
        url: `https://picsum.photos/id/${id}/${randomWidth}/${randomHeight}`
      };
    });

    setTimeout(() => {
      setImages((prev) => [...prev, ...newImages]);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchMoreImages();
  }, []);

  useEffect(() => {
    if (inView) {
      fetchMoreImages();
    }
  }, [inView]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        📸 Gallery สุ่มภาพคละขนาด (Lazy Load)
      </h1>

      {/* 3. สไตล์ CSS สำหรับจัดวางแกลเลอรีแบบ Masonry Layout */}
      <div style={{
        columnCount: window.innerWidth > 1024 ? 4 : window.innerWidth > 768 ? 3 : 2,
        columnGap: '15px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {images.map((image) => (
          <div key={image.id} style={{
            breakInside: 'avoid',
            marginBottom: '15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <img
              src={image.url}
              alt="Random Dynamic"
              loading="lazy" // เปิดฟีเจอร์ Native Lazy Loading ของ Browser ไปด้วย
              style={{
                width: '100%',
                display: 'block',
                height: 'auto',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        ))}
      </div>

      {/* 4. กล่องตรวจจับตำแหน่งเพื่อเปิดการ Lazy Load ชุดถัดไป */}
      <div ref={ref} style={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        {loading && <p style={{ fontSize: '18px', color: '#666' }}>⏳ กำลังโหลดรูปภาพเพิ่ม...</p>}
      </div>
    </div>
  );
}
