import { useState, useEffect } from 'react';
import { GlassStyle, imageWidth, PASTEL_COLORS } from './utils/styles';
import Picsum from './pages/Picsum';
import type { ImageData } from './interface/page';
import { getRandomTags } from './utils/tag';
import { IconClose, IconRefresh, IconTag } from './utils/icon';
import Filckr from './pages/Flickr';
import Marsonry from './component/imageMasonry';

type SouceData = "lorem" | "picsum" | "placehold"

export default function App() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean | 'force'>(false);

  const [Source, setSource] = useState<SouceData>("placehold");
  const [selectTag, setSelectTag] = useState<string>()

  useEffect(() => {
    handleFetch()
    if (selectTag) {
      setSelectTag(undefined)
    }
  }, [Source]);


  function handleFetch() {
    if (Source == "placehold") {
      getPlaceholderImages()
    } else {
      setLoading(true)
    }
  }

  const getPlaceholderImages = () => {
    if (loading) return;
    setLoading(true);

    const newImages: ImageData[] = Array.from({ length: 15 }).map(() => {
      const randomSeed = Math.floor(Math.random() * 1000000);
      const randomHeight = Math.floor(Math.random() * 300) + 250;

      const tags = getRandomTags();
      const primaryTag = tags[0];

      const colorPair = PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
      const placeholderUrl = `https://placehold.co/${imageWidth}x${randomHeight}/${colorPair.bg}/${colorPair.text}?text=${primaryTag}`;

      return {
        id: `${randomSeed}`,
        url: placeholderUrl,
        tags: tags,
        hidden: false
      };

    });

    setTimeout(() => {
      setImages((prev) => [...prev, ...newImages])
      setLoading(false);
    }, 400);
  };

  const handleRefresh = () => {
    if (Source === "placehold") {
      setImages([]);
    } else {
      setLoading('force')
    }
    setSelectTag(undefined)
  };

  function handleClickImage(image: ImageData) {
    if (Source === "placehold") {
      setSelectTag(image.tags?.[0])
    }
  }
  useEffect(() => {
    if (Source != "placehold") return
    setImages(prev => {
      if (!selectTag?.length) return prev.map(el => ({ ...el, hidden: false }))
      return prev.map(el => ({ ...el, hidden: el.tags?.[0] == selectTag ? false : true }))
    })
  }, [selectTag])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Gallery
      </h1>

      <section style={{ display: 'flex', flexWrap: 'wrap', gap: '1em', alignItems: 'center', marginBottom: 5 }}>
        <div style={{ alignSelf: 'center' }}>
          <select name="source" id="source-image"
            onChange={e => setSource(e.target.value as SouceData)}
            style={{ minWidth: '6em', minHeight: '2.5em', }}
            value={Source}
          >
            <option value="lorem">Loremflickr</option>
            <option value="picsum">Picsum</option>
            <option value="placehold">Placehold</option>
          </select>
        </div>
        <button style={{ fontSize: 'small', minWidth: '5em', gap: 3, display: 'flex', padding: '.5em', borderRadius: '.5em', background: 'none' }}
          onClick={() => handleRefresh()}>
          <IconRefresh />
          Refresh
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, alignItems: 'center' }}>
          <div style={{ ...GlassStyle, fontSize: 'small', minWidth: '5em', display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: 5, cursor: 'default',
            background: selectTag ? '#f69a2b30' : ''
           }}>
            <IconTag />
            {selectTag || (Source == "picsum" ? 'ไม่รองรับ' : 'ทั้งหมด')}
          </div>
          {selectTag &&
            <button data-type="danger"
              style={{ height: 'fit-content', padding: '.5em', borderRadius: '50%', border: 'none', background: 'none' }}
              onClick={() => setSelectTag(undefined)}>
              <IconClose />
            </button>
          }
        </div>
      </section>

      {Source === "placehold"
        ? <Marsonry
          images={images}
          loading={loading}
          onCallFetch={getPlaceholderImages}
          handleClickImage={handleClickImage}
          selectTag={selectTag}
        />
        : Source === "picsum"
          ? (
            <Picsum
              loading={loading}
              setLoading={setLoading}
            />
          ) : (
            <Filckr
              loading={loading}
              setLoading={setLoading}
              selectTag={selectTag}
              setSelectTag={setSelectTag}
            />
          )
      }
    </div >
  );
}
