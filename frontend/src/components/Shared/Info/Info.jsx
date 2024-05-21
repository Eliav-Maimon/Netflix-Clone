import React from 'react'
import "./info.css"
import ReactPlayer from 'react-player'

const Info = ({ item, isDisplay, setDisplay }) => {
    // console.log(item)
    return (
        <div style={{ display: isDisplay ? "inline-block" : "none" }} className='infoDiv'>
            <div className="container">

                {/* <ReactPlayer url={item.trailer} muted={true} playing={true} loop={true} width="100%" height="56.25%" style={{ pointerEvents: 'none', objectFit: "cover" }} /> */}
                {/* <ReactPlayer url={item.trailer} muted={true} playing={true} loop={true} width="100%" height="56.25%" style={{ pointerEvents: 'none', objectFit: "cover" }} /> */}
                <img style={{ width: "100%", height: "60%" }} src={item.imgThumb} alt="" />
                <h1>{item.title}</h1>
                <h2 className='titleInfo'>Year: {item.year}</h2>
                <h2 className='titleInfo'>Genre: {item.genre}</h2>
                <p className='pInfo'>{item.description}</p>

                {/* <img className='imgInfo' src={item.imgThumb} alt="" /> */}
                <button className='exitInfo' onClick={() => setDisplay(false)}>X</button>
            </div>

        </div>
    )
}

export default Info