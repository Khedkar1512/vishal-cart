export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  badge?: string;
  imageUrl: string;
  offer?: string;
}

// Fixing image URLs using highly reliable Unsplash IDs
export const products: Product[] = [
  { id: 'p1', name: 'Banarasi Silk Saree', category: 'Ethnic Wear', description: 'Classic elegance for weddings.', price: 4500, badge: 'BEST SELLER', imageUrl: 'https://tse1.explicit.bing.net/th/id/OIP.BVhWKdcnyKlq6RBDXvB0jAHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 'p2', name: 'Cotton Kurta Set', category: 'Mens Wear', description: 'Comfortable everyday ethnic.', price: 1299, imageUrl: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&q=80&w=800' },
  { id: 'p3', name: 'Kundan Necklace', category: 'Jewellery', description: 'Royal traditional jewellery.', price: 8500, offer: '20% OFF', imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800' },
  { id: 'p4', name: 'Handcrafted Juttis', category: 'Footwear', description: 'Embroidered perfection.', price: 899, imageUrl: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=800' },
  { id: 'p5', name: 'Smartwatch Pro', category: 'Electronics', description: 'Track your fitness journey.', price: 2999, badge: 'NEW', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800' },
  { id: 'p6', name: 'Wireless Earbuds', category: 'Electronics', description: 'Crystal clear sound.', price: 1499, offer: '50% OFF', imageUrl: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=800' },
  { id: 'p7', name: 'Spices Gift Box', category: 'Grocery', description: 'Premium Indian spices.', price: 599, imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800' },
  { id: 'p8', name: 'Designer Lehenga', category: 'Ethnic Wear', description: 'Ready for the festive season.', price: 12000, offer: '30% OFF', imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800' },
  { id: 'p9', name: 'Clay Chai Kulhad', category: 'Home & Kitchen', description: 'Authentic tea experience.', price: 299, imageUrl: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&q=80&w=800' },
  { id: 'p10', name: 'Yoga Mat Premium', category: 'Fitness', description: 'Anti-slip meditation mat.', price: 799, imageUrl: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&q=80&w=800' },
  { id: 'p11', name: 'Brass Diya Set', category: 'Decor', description: 'Traditional pooja essentials.', price: 450, imageUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=800' },
  { id: 'p12', name: 'Handloom Dupatta', category: 'Apparel', description: 'Vibrant colors and weaves.', price: 650, imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800' },
  { id: 'p13', name: 'Gaming Smartphone', category: 'Mobiles', description: 'Snapdragon powered.', price: 24999, offer: '10% OFF', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800' },
  { id: 'p14', name: 'Ayurvedic Skincare', category: 'Beauty', description: 'Natural glowing skin.', price: 899, imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800' },
  { id: 'p15', name: 'Running Sneakers', category: 'Footwear', description: 'High performance sports shoes.', price: 2199, offer: '40% OFF', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800' },
  { id: 'p16', name: 'Wooden Mandir', category: 'Furniture', description: 'Hand-carved temple for home.', price: 5500, imageUrl: 'https://images.unsplash.com/photo-1603504386760-b6f709d3b73e?auto=format&fit=crop&q=80&w=800' },
  { id: 'p17', name: 'Copper Water Bottle', category: 'Kitchen', description: 'Health benefits in every sip.', price: 699, imageUrl: 'https://images.unsplash.com/photo-1615555462586-7281d7634f18?auto=format&fit=crop&q=80&w=800' },
  { id: 'p18', name: 'Silk Sherwani', category: 'Mens Wear', description: 'Royal groom collection.', price: 15000, offer: '25% OFF', imageUrl: 'https://images.unsplash.com/photo-1593030761757-71fae46af504?auto=format&fit=crop&q=80&w=800' },
  { id: 'p19', name: 'Leather Wallet', category: 'Accessories', description: 'Genuine leather bifold.', price: 499, imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800' },
  { id: 'p20', name: 'Pashmina Shawl', category: 'Apparel', description: 'Warmth and luxury.', price: 3500, imageUrl: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800' },
];
