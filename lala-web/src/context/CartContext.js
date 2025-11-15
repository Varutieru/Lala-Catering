"use client";

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    const findItemIndex = (id, day) => {
        return cart.findIndex(item => item.id === id && item.day === day);
    };

    const addToCart = (newItem) => {
        setCart(prevCart => {
            const index = prevCart.findIndex(i => i.id === newItem.id && i.day === newItem.day);
            if (index > -1) {
                const newCart = [...prevCart];
                newCart[index].quantity += 1;
                return newCart;
            } else {
                return [...prevCart, { ...newItem, quantity: 1 }];
            }
        });
    };

    const updateQuantity = (id, day, delta) => {
        setCart(prevCart => {
            const newCart = [...prevCart];
            const index = newCart.findIndex(i => i.id === id && i.day === day);
            if (index > -1) {
                newCart[index].quantity += delta;
                if (newCart[index].quantity <= 0) newCart.splice(index, 1);
            }
            return newCart;
        });
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
      };
      
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, getTotal, totalItems }}>
          {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};


export default CartContext