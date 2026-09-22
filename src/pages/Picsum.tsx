import { useEffect, useState } from "react";
import type { ImageData } from "../interface/page";
import { imageWidth } from "../utils/styles";
import Marsonry from "../component/imageMasonry";

export default function Picsum({ loading, setLoading }: {
    loading: boolean | 'force';
    setLoading: (value: boolean) => void;
}) {
    const [images, setImages] = useState<ImageData[]>([])

    useEffect(() => {
        if (loading) fetchPicsum()
    }, [loading])

    const fetchPicsum = () => {
        if (loading == 'force') setImages([])
        const newImages: ImageData[] = Array.from({ length: 15 }).map(() => {
            const id = Math.floor(Math.random() * 100) + 1;
            // สุ่มความสูงระหว่าง 300px ถึง 600px 
            const randomHeight = Math.floor(Math.random() * (600 - 300 + 1)) + 300;

            return {
                id,
                url: `https://picsum.photos/id/${id}/${imageWidth}/${randomHeight}`,
                hidden: false,
            };
        });

        setTimeout(() => {
            setImages((prev) => [...prev, ...newImages]);
            setLoading(false);
        }, 800);
    };

    return <Marsonry loading={loading} onCallFetch={fetchPicsum} images={images} />

}