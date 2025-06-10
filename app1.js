import React, { useState } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';


const productos = [
 {
   id: '1',
   nombre: 'Camiseta Nike',
   precio: 29.99,
   imagen: 'https://permanent.mx/cdn/shop/products/65.png?v=1689102255',
 },
 {
   id: '2',
   nombre: 'Gorro Adidas',
   precio: 19.99,
   imagen: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/71ab10bfa4ca4e9686dcafc901299242_9366/Gorro_Beanie_Adicolor_Cuff_UNISEX_Azul_IL4878_01_00_standard.jpg',
 },
 {
   id: '3',
   nombre: 'Tenis Puma',
   precio: 49.99,
   imagen: 'https://s3-us-west-1.amazonaws.com/calzzapato/zoom/09HPY9-2.jpg',
 },
 {
   id: '4',
   nombre: 'Tenis Nike',
   precio: 54.99,
   imagen: 'https://tafmx.vtexassets.com/arquivos/ids/246795-800-1067?v=638792960021570000&width=800&height=1067&aspect=true',
 },
];


export default function App() {
 const [carrito, setCarrito] = useState([]);


 const agregarAlCarrito = (producto) => {
   const index = carrito.findIndex((item) => item.producto.id === producto.id);
   if (index !== -1) {
     const nuevoCarrito = [...carrito];
     nuevoCarrito[index].cantidad += 1;
     setCarrito(nuevoCarrito);
   } else {
     setCarrito([...carrito, { producto, cantidad: 1 }]);
   }
 };


 const eliminarDelCarrito = (productoId) => {
   const nuevoCarrito = carrito
     .map((item) =>
       item.producto.id === productoId
         ? { ...item, cantidad: item.cantidad - 1 }
         : item
     )
     .filter((item) => item.cantidad > 0);
   setCarrito(nuevoCarrito);
 };


 const vaciarCarrito = () => setCarrito([]);


 const total = carrito.reduce(
   (sum, item) => sum + item.producto.precio * item.cantidad,
   0
 );


 return (
   <ScrollView style={styles.container}>
     <Text style={styles.titulo}>🛍️ Mi Tienda Moderna</Text>


     <FlatList
       data={productos}
       keyExtractor={(item) => item.id}
       renderItem={({ item }) => (
         <View style={styles.card}>
           <Image source={{ uri: item.imagen }} style={styles.imagen} />
           <Text style={styles.nombre}>{item.nombre}</Text>
           <Text>💲{item.precio.toFixed(2)}</Text>
           <Button title="🛒 Agregar al carrito" onPress={() => agregarAlCarrito(item)} />
         </View>
       )}
     />


     <View style={styles.carrito}>
       <Text style={styles.subtitulo}>🧾 Carrito de Compras</Text>
       {carrito.length === 0 ? (
         <Text>Tu carrito está vacío.</Text>
       ) : (
         carrito.map((item, index) => (
           <View key={index} style={styles.itemCarrito}>
             <Text>{item.producto.nombre} × {item.cantidad}</Text>
             <Text>${(item.producto.precio * item.cantidad).toFixed(2)}</Text>
             <TouchableOpacity onPress={() => eliminarDelCarrito(item.producto.id)}>
               <Text style={styles.eliminar}>❌</Text>
             </TouchableOpacity>
           </View>
         ))
       )}


       {carrito.length > 0 && (
         <>
           <Text style={styles.total}>💰 Total: ${total.toFixed(2)}</Text>
           <Button title="🧹 Vaciar carrito" onPress={vaciarCarrito} />
         </>
       )}
     </View>
   </ScrollView>
 );
}


const styles = StyleSheet.create({
 container: { padding: 20, marginTop: 40, backgroundColor: '#fff' },
 titulo: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
 subtitulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
 card: {
   backgroundColor: '#f2f2f2',
   padding: 15,
   borderRadius: 12,
   marginBottom: 15,
   alignItems: 'center',
 },
 imagen: { width: 100, height: 100, marginBottom: 10 },
 nombre: { fontWeight: 'bold', fontSize: 16 },
 carrito: {
   marginTop: 20,
   padding: 15,
   backgroundColor: '#e0ffe0',
   borderRadius: 10,
 },
 itemCarrito: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingVertical: 5,
 },
 eliminar: {
   color: 'red',
   fontSize: 18,
   marginLeft: 10,
 },
 total: {
   marginTop: 10,
   fontWeight: 'bold',
   fontSize: 16,
 },
});
