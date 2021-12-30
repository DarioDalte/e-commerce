import React from 'react'
import styles from './backdrop.module.css'


function Backdrop(props) {
    return (
        <div onClick={props.onClick} className={styles['backdrop']}>
            
        </div>
    )
}

export default Backdrop;
