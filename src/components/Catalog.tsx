import { useEffect, useState } from 'react';
import { IProduct } from '../store/models/cart/types';

import api from '../services/api';
import { CatalogItem } from './CatalogItem';


export const Catalog = () => {
    const [catalog, setCatalog] = useState<IProduct[]>([]);

    useEffect(() => {
        api.get('products').then(response => {
            setCatalog(response.data);
        })
    }, []);

    return (
        <>
            <h1>Catalogo</h1>
            {catalog.map(item => (
              <CatalogItem key={item.id} product={item} />
            ))}
        </>

    )
}