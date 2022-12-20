import React from 'react';
import './SurveyCard.css';

const SurveyCard = (props) => {
    return (
        <div className='theme-card'>
            <a>
                <div className='sc-title'>
                    {props.title}
                </div>
                <div className='sc-count'>
                    {props.count}
                </div>
                <div className='sc-icon'>
                    <img src={props.image} />
                </div>
            </a>
        </div>
    );
}

export default SurveyCard;
