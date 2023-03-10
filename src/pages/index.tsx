import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Product } from '../types/Product';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import  {FavoritesContext}  from '@/components/FavoriteContext';
import Loading from '@/components/Loading';
import style from '@/styles/main.module.scss'
import Card, { CardContainer, CardContent, CardDetail, CardImage, CardItem, CardLeftRight, CardTitle, FavButton } from '@/components/Card';
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites, addToFavorites } = useContext(FavoritesContext);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://dummyjson.com/products?limit=80&skip=0');
      const response = await res.json();
      const { products } = response;
      setProducts(products);
      setLoading(false);
    }
    fetchData();
  }, []);


  return (
    <>
      <Navbar/>  
      <main>
        {
          loading ? <Loading /> :(
            <CardContainer >
            {products.map((product) => (
              <Card key={product.id}>
                
                <Link  href={{
                  pathname : '/detail/' + product.id,
                  query :{
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail : product.thumbnail,
                    rating : product.rating,
                    description : product.description,
                    brand : product.brand,
                    category : product.category,
                    discountPercentage: product.discountPercentage,
                    stock : product.stock,
                  }
                  }} >
                  <CardImage src={product.thumbnail} alt="" />
                </Link> 
                <CardContent>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDetail>
                    <CardLeftRight>
                      <CardItem>Price : Rp{product.price}</CardItem>
                      <CardItem>Category : {product.category}</CardItem>
                    </CardLeftRight>
                    <CardLeftRight>
                      <FavButton className={style.fav_button} onClick={() => addToFavorites(product)}>
                      {favorites.find(fav => fav.id === product.id) ? '??????' : '????'}
                      </FavButton>
                    </CardLeftRight>
                  </CardDetail>
                </CardContent>
              </Card>
            ))}
            </CardContainer>
          )
        }
        
      </main>
      <Footer/>
    </>
  )
}
