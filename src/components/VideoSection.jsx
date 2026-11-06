import ProductSlider from './ProductSlider.jsx'

// 영상이 생기면 videoId에 유튜브 영상 ID를 넣으면 된다.
const videoId = ''

function VideoSection({ items }) {
  return (
    <ProductSlider items={items} green title="영상 속 그 물품" subtitle="#한살림 바른 양념 #영상에 나온 그 물품">
      <div className="video">
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="영상 속 그 물품"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <a className="video-empty" href="https://www.youtube.com/@hansalim" target="_blank" rel="noreferrer">한살림 유튜브에서 영상 보기 ▶</a>
        )}
      </div>
    </ProductSlider>
  )
}

export default VideoSection
