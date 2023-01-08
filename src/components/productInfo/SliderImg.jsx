import React, { useState } from 'react'
import './style/sliderImg.css'

const SliderImg = ({ listImg }) => {
    const [indexImg, setIndexImg] = useState(0)

    const styleContainer = {
        transform: `translateX(calc(100% * -${indexImg} / 3))`
    }


    const handleLeft = () => {
        if (indexImg - 1 < 0) {
            setIndexImg(2)
        } else {
            setIndexImg(indexImg - 1)
        }
    }

    const handleNext = () => {
        if (indexImg + 1 > 2) {
            setIndexImg(0)
        } else {
            setIndexImg(indexImg + 1)
        }
    }

    return (
        <div className='slider'>
            <button onClick={handleLeft} className='slider-left'><i className='bx bx-chevron-left'></i></button>
            <div style={styleContainer} className="slider__container">
                {
                    listImg?.map(url => (
                        <div className='slider_img-container' key={url}>
                            <img className='slider__img img' src={url} alt="slider-img" />
                        </div>
                    ))
                }
            </div>
            <button onClick={handleNext} className='slider-right'><i className='bx bx-chevron-right' ></i></button>
            <ul className='slider__ul'>
                {
                    listImg?.map((url, index) => (
                        <li className={`slider_img-container item ${index === indexImg && 'slider__border'}`}
                            onClick={() => setIndexImg(index)}
                            key={url}
                        >
                            <img className='slider__img' src={url} alt="slider-img" />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SliderImg