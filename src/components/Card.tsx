import style from '@/styles/main.module.scss'
import { Children } from 'react'
export default function Card({children, ...attr}:any) {
    return <div {...attr} className={style.card}>{children} </div>
}

export function CardImage({src, ...attr}:any) {
    return <img src={src} {...attr} className={style.card_image}/>
}
export function CardContainer({children, ...attr}:any) {
    return <div {...attr} className={style.product_container}>{children}</div>
}

export function CardTitle({children, ...attr}:any) {
    return <h2 {...attr} className={style.card_title}>{children}</h2>
}

export function CardContent({children, ...attr}:any) {
    return <div className={style.card_content}>{children}</div>
}
export function CardDetail({children, ...attr}:any) {
    return <div className={style.card_detail}>{children}</div>
}


export function CardLeftRight({children, ...attr}:any) {
    return <div className={style.card_left}>{children}</div>
}
export function CardItem({children, ...attr}:any) {
    return <div className={style.card_item}>{children}</div>
}

export function FavButton({children, ...attr}:any) {
    return <button className={style.fav_button} {...attr}>{children}</button>
}

