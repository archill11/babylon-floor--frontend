import React from "react"


import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: React.FC = () => (
    <div className={styles.root}>
        <h1>
            😕<br/>
            Ничего не найдено
        </h1>
        <h2> К сожалени данная страница отсутствует или в разработке</h2>
    </div>
)

export {NotFoundBlock}