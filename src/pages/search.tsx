import style from '@/styles/main.module.scss'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'
import { Product } from '../types/Product';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link'
import Card, { CardContainer, CardContent, CardDetail, CardImage, CardItem, CardLeftRight, CardTitle, FavButton } from '@/components/Card';
import { FavoritesContext } from '@/components/FavoriteContext';
import Router from 'next/router';
export default function Home() {
    const [search, setSearch] = useState('');
    const { favorites, addToFavorites } = useContext(FavoritesContext);
    const [searchProducts, setSearchProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/search?q=${search}`);
        const results = await res.json();
        const { products } = results;
        setSearchProducts(products);
        setLoading(false);
      };
      const handleInputChange = (event:any) => {
        setSearch(event.target.value);
      };
    return (
      <>
        <Navbar/>
        <form onSubmit={handleSubmit} className={style.search_container}>
            <input type="text" value={search} onChange={handleInputChange}  
            className={style.search_input} placeholder='Find Your Items Here...' />
            <button type="submit" className={style.search_button}>Search</button>
        </form>
        <main>
        {
          loading ? <Loading/> :(
            <CardContainer >
            {searchProducts.map((product) => (
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
                      <FavButton onClick={() => addToFavorites(product)}>
                      {favorites.find(fave => fave.id === product.id) ? '❤️' : '🤍'}
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