
// pages/products.js
import axios from 'axios';

const ProductsPage = ({ products }) => {
  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>Price: ₹{product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// This function is called on every request to fetch data from the backend API.
export async function getServerSideProps() {
  try {
    // Fetching data from the backend API (make sure to update the URL if needed)
    const res = await axios.get('http://localhost:3001/products'); // Adjust the URL if necessary
    const products = res.data;

    return { props: { products } }; // Pass products as props to the page
  } catch (error) {
    console.error('Error fetching products:', error);
    return { props: { products: [] } }; // Return empty array if there's an error
  }
}

export default ProductsPage;
