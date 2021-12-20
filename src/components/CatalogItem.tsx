import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../store";
import { addProductToCartRequest } from "../store/models/cart/action";
import { IProduct } from "../store/models/cart/types"

interface CatalogItemProps {
  product: IProduct;
}

export const CatalogItem = ({ product }: CatalogItemProps) => {
  
  const dispatch = useDispatch();

  const hasFailedStockCheck = useSelector<IState, boolean>(state => {
    return state.cart.failedStockCheck.includes(product.id);
  })
  
  const handleAddProductToCart = useCallback(() => {
    // Dispara uma ação dentro do Redux
    dispatch(addProductToCartRequest(product));
},[dispatch, product]);

  return (
    <div>
      <span>{product.title}</span> {" - "}
      <span>{product.price}</span> {"  "}
      <button 
        onClick={handleAddProductToCart}
      >
        Comprar
      </button>

      {hasFailedStockCheck && <span style={{ color: 'red'}}>Falta de Estoque</span>}
  </div>
  )
}