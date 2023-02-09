import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import style from '@/styles/main.module.scss'
import { CardLeftRight, FavButton } from '@/components/Card';
import { FavoritesContext } from '@/components/FavoriteContext';
import Link from 'next/link'
import Loading from '@/components/Loading';
export default function Detail(){
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        async function fetchData() {
          const res = await fetch('https://dummyjson.com/products?limit=100&skip=0');
          const response = await res.json();
          const { products } = response;

          setProducts(products);
        //   console.log(products);
        //   console.log(props.id);
          
          setLoading(false);
        }
        fetchData();
      }, []);
    const { favorites, addToFavorites } = useContext(FavoritesContext);
    const {
        query:{
            id,
            title,
            price,
            thumbnail,
            rating,
            description,
            brand,
            category,
            discountPercentage,
            stock 
        },
    } = router
    const props ={
        id,
        title,
        price,
        thumbnail,
        rating,
        description,
        brand,
        category,
        discountPercentage,
        stock 
    }
    return(
        
        loading ? <Loading /> :(
            <>
                <Link href="/" className={style.back}>
                Back
                </Link>
            <div className={style.product_display}>
                <div className={style.left}>
                    <img src={props.thumbnail} alt="" className={style.img_detail} />
                </div>
                <div className={style.right}>
                    <div className={style.top}>
                        <h1>{props.title}</h1>
                        <div>
                            {products.map((product, index) => {
                            // console.log(props.id, product.id);
                            return (
                                props.id == parseInt(product.id, 10) && (
                                <button key={index} onClick={() => addToFavorites(product)} className={style.fav_button2}>
                                    {favorites.find(fave => fave.id === product.id) ? '❤️' : '🤍'}
                                </button>
                                )
                            );
                            })}
                        </div>

                    </div>
                    <div className={style.middle}>
                        <p>Stock :{props.stock}</p>
                        <p>Price :{props.price}</p>
                        <p>Brand :{props.brand}</p>
                        <p>Category :{props.category}</p>
                    </div>
                    <div className={style.bottom}>
                        <p>{props.description}</p>
                    </div> 
                    
                </div>
            </div>
            </>
        )
        
    );
}