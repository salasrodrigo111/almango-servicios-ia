import React from "react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/pages/Servicios";

export interface CartItemsStepProps {
  cartItems: CartItem[];
  updateCartItem: (id: string, quantity: number) => void;
  total: number;
  onNext: () => void;
  onPrevious: () => void;
}

const CartItemsStep: React.FC<CartItemsStepProps> = ({ 
  cartItems, 
  updateCartItem, 
  total, 
  onNext,
  onPrevious
}) => {
  const handleIncreaseQuantity = (id: string, currentQuantity: number) => {
    updateCartItem(id, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (id: string, currentQuantity: number) => {
    updateCartItem(id, currentQuantity - 1);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold">Resumen de Servicios</h3>
        <p className="text-muted-foreground">Revisa y confirma tus servicios seleccionados</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hay servicios en el carrito</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{item.serviceCategory}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-md border flex items-center">
                  <button 
                    className="px-2 py-1 text-lg"
                    onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{item.quantity}</span>
                  <button 
                    className="px-2 py-1 text-lg"
                    onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                  >
                    +
                  </button>
                </div>
                <span className="font-medium min-w-[70px] text-right">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}

          <div className="flex justify-between p-4 bg-orange-50 rounded-lg text-orange-800 font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        {/* If you want to add a button to go back to shopping, uncomment this: */}
        {/* <Button type="button" variant="outline" onClick={onPrevious}>
          Seguir comprando
        </Button> */}

        <div className="ml-auto">
          <Button 
            onClick={onNext} 
            disabled={cartItems.length === 0}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItemsStep;
