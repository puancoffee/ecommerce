// export const ADD_TO_CART = 'ADD_TO_CART';
// export const REMOVE_ITEM = 'REMOVE_ITEM';
// export const SUB_QUANTITY = 'SUB_QUANTITY';
// export const ADD_QUANTITY = 'ADD_QUANTITY';
// export const ADD_SHIPPING = 'ADD_SHIPPING';
// export const addToCart= (id)=>{
//     return{
//         type: ADD_TO_CART,
//          id }
//     }

import localforage from 'localforage'
export const beli = ((idBarang, namaBarang, hargaBarang, imgBarang) => {
    return dispatch => {
        const run = async () => {
            let data = await localforage.getItem('keranjang');
            data = data || [];
            const barangSudahAda = data.find(item => {
                return item.id === idBarang;
            });

            if (barangSudahAda){
                data = data.map (item => {
                    if (item.id === idBarang){
                        item.jumlah += 1
                    }
                    return item;
                })
            }else {
                data.push({
                    id: idBarang,
                    name: namaBarang,
                    price: hargaBarang,
                    imageUrl : imgBarang,
                    jumlah : 1
                })
            }
            
            await localforage.setItem('keranjang', data);
            dispatch({ type: 'BELI', data })
        }
        run();
    }
})