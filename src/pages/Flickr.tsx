import { useEffect, useState } from "react";
import type { ImageData } from "../interface/page";
import { getRandomTags } from "../utils/tag";
import { imageWidth } from "../utils/styles";
import Marsonry from "../component/imageMasonry";

export default function Filckr({ loading, setLoading, selectTag, setSelectTag }: {
    loading: boolean | 'force';
    setLoading: (value: boolean) => void;
    selectTag: string | undefined;
    setSelectTag: (value: string) => void;
}) {
    const [images, setImages] = useState<ImageData[]>([])
    useEffect(() => {
        if (loading) fetchFlickr()
    }, [loading])

    const fetchFlickr = async () => {
        if (selectTag) return
        if (loading == 'force') setImages([]);

        const newImages: ImageData[] = Array.from({ length: 15 }).map(() => {
            const randomSeed = Math.floor(Math.random() * 1000000);

            const randomHeight = Math.floor(Math.random() * 250) + 300;

            const tags = getRandomTags();
            // ใช้แท็กแรกที่สุ่มได้เป็นคีย์เวิร์ดหลักในการดึงรูปจาก LoremFlickr เพื่อให้รูปตรงกับแท็ก
            const primaryCategory = tags[0];

            return {
                id: `${randomSeed}`,
                url: `https://loremflickr.com/${imageWidth}/${randomHeight}/${primaryCategory}?lock=${randomSeed}`,
                tags: tags,
                hidden: false
            };
        });

        setTimeout(() => {
            setImages((prev) => [...prev, ...newImages]);
            setLoading(false);
        }, 500);
    };

     useEffect(() => {
        setImages(prev => {
            if (!selectTag?.length) return prev.map(el => ({ ...el, hidden: false }))

            return prev.map(el => ({ ...el, hidden: el.tags?.includes(selectTag) ? false : true }))
        })
    }, [selectTag])
    return <Marsonry loading={loading} onCallFetch={fetchFlickr} images={images}
        handleClickTag={setSelectTag} />
}