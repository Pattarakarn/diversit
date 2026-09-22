import { useState, useEffect } from 'react';
import type { ImageData } from '../interface/page';
import { useInView } from 'react-intersection-observer';

export default function Marsonry({ images, loading, onCallFetch, handleClickImage, handleClickTag, selectTag }: {
    images: ImageData[],
    loading: boolean | 'force',
    onCallFetch: () => void
    handleClickImage?: (image: ImageData) => void
    handleClickTag?: (tag: string) => void
    selectTag?: string
}) {
    const { ref, inView } = useInView({
        threshold: 0.5,
    });
    useEffect(() => {
        if (inView) {
            if (selectTag) return
            onCallFetch();
        }
    }, [inView]);

    const numColumns = 4;
    const columns = Array.from({ length: numColumns }, (): ImageData[] => []);

    images.filter(el => !el.hidden)
        .forEach((image, index) => {
            columns[index % numColumns].push(image);
        });

    return (
        <section>
            <div style={{
                display: 'flex',
                gap: '15px',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                alignItems: 'flex-start'
            }}>

                {columns.map((colImages, colIndex) => (
                    <div
                        key={colIndex}
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px'
                        }}
                    >
                        {colImages.map((image, i) => (
                            <CardItem key={image.id + i.toString()} image={image} handleClickImage={handleClickImage} handleClickTag={handleClickTag} />
                        ))}
                    </div>
                ))}
            </div>

            <div ref={ref} style={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                {loading && <p style={{ fontSize: '18px', }}> กำลังโหลดรูปภาพเพิ่ม . . .</p>}
            </div>
        </section>
    );
}

function CardItem({ image, handleClickImage, handleClickTag }: {
    image: ImageData,
    handleClickImage?: (image: ImageData) => void
    handleClickTag?: (tag: string) => void
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                width: '100%',
                backgroundColor: '#f0f0f0',
                borderRadius: isHovered ? '0px' : '10px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'border-radius 0.3s ease',
                cursor: handleClickImage ? 'pointer' : 'default',
                position: 'relative'
            }}
            onClick={() => handleClickImage && handleClickImage(image)}
        >
            <img
                src={image.url}
                loading="lazy"
                style={{
                    width: '100%',
                    display: 'block',
                    height: 'auto',
                    borderRadius: isHovered ? '0px' : '10px',
                    transition: 'transform 0.3s ease, border-radius 0.3s ease',
                }}
            />
            {handleClickTag &&
                <section style={{
                    display: 'flex', gap: 2, position: 'absolute', bottom: '5px', right: '5px', flexWrap: 'wrap', justifyContent: 'end'
                }}>
                    {image?.tags?.map((t: string) =>
                        <button className="tag"
                            onClick={() => handleClickTag(t)}
                        >
                            {t}
                        </button>
                    )}
                </section>
            }
        </div>
    );
}
