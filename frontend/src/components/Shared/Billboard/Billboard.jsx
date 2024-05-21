import './billboard.css'
import { PropTypes } from '../../../imports'
import ReactPlayer from 'react-player'
import Info from '../Info/Info';
import { useEffect, useState } from "react";


const Billboard = ({ item }) => {

    const [displayInfo, setDisplayInfo] = useState(false)

    if (!item) {
        return null;
    }

    return (
        <div className="billboard-container">
            <div className='billboard'>
                <div className='innerBillboard'>
                    <ReactPlayer url={item.trailer} muted={true} playing={true} loop={true} width="100vw" height="56.25vw" style={{ pointerEvents: 'none', objectFit: "cover" }} />
                    <div className='info'>
                        <img src={item.imgTitle} style={{ width: '500px', height: '120px' }} />
                        <div className='description'>
                            {item.description}
                        </div>
                        <div className='links'>
                            <a href={`/play/${item._id}`}><i className="fa fa-play" aria-hidden="true"></i><span>Play</span></a>
                            <button className="billboardBtn" onClick={() => setDisplayInfo(prev => !prev)}><i className="fa fa-exclamation-circle" aria-hidden="true"></i><span>Info</span></button>
                            <Info isDisplay={displayInfo} setDisplay={setDisplayInfo} item={item}></Info>
                        </div>
                    </div>
                </div>
            </div>
            <div className="player-gradient-overlay"></div>
        </div>
    )
}
Billboard.propTypes = { item: PropTypes.object }
export default Billboard