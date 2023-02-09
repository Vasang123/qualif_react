import { FavoritesContext } from '@/components/FavoriteContext';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading';
import {useContext, useState, useEffect } from 'react';
import Card, { CardContainer, CardContent, CardDetail, CardImage, CardItem, CardLeftRight, CardTitle, FavButton } from '@/components/Card';
import Link from 'next/link';
import Router from 'next/router';
export default function Favorite(){
    const { favorites, addToFavorites } = useContext(FavoritesContext);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
      if (!favorites) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    }, [favorites]);
    return (
      <>
      <Navbar/>  
      <main>
        {
          loading ? <Loading/> :(
            <CardContainer >
            {favorites.map((product) => (
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
                      {favorites.find(fav => fav.id === product.id) ? '❤️' : '🤍'}
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
      
      );
}