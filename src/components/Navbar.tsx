import Link from 'next/link';
import style from '../styles/navbar.module.scss'

export default function Navbar(){
    return(
        <nav className={style.navbar}>
            <ul className={style.nav_container}>
                <li className={style.nav_item}><h2>WeNo</h2></li>
                <li className={style.nav_item}><Link href ="/" className={style.link} >Home</Link> </li>
                <li className={style.nav_item}><Link href ="/search" className={style.link} >Search Item</Link> </li>
                <li className={style.nav_item}><Link href ="/favorite" className={style.link} >Favorite Item</Link> </li>
            </ul>
        </nav>
    );

}