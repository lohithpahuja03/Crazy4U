// Crazy4U Backend Food Catalogue

const FOODS = [
  {
    id: 'pizza-1',
    name: 'Margherita Delight Pizza',
    category: 'pizza',
    isVeg: true,
    rating: 4.8,
    reviewsCount: 342,
    basePrice: 299,
    originalPrice: 349,
    discountBadge: '14% OFF',
    isPopular: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=700&auto=format&fit=crop&q=80',
    description: 'Classic Italian delight with fresh San Marzano tomato sauce, mozzarella cheese, and fresh basil leaves on hand-tossed dough.',
    sizes: [
      { name: 'Regular (7")', price: 299 },
      { name: 'Medium (10")', price: 449 },
      { name: 'Large (12")', price: 599 }
    ]
  },
  {
    id: 'pizza-2',
    name: 'Farmhouse Fresh Veggie Pizza',
    category: 'pizza',
    isVeg: true,
    rating: 4.7,
    reviewsCount: 289,
    basePrice: 349,
    originalPrice: 420,
    discountBadge: '17% OFF',
    isPopular: true,
    isBestseller: false,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=700&auto=format&fit=crop&q=80',
    description: 'Delightful combination of crisp capsicum, ripe tomatoes, red onions, and succulent mushrooms with golden mozzarella.',
    sizes: [
      { name: 'Regular (7")', price: 349 },
      { name: 'Medium (10")', price: 499 },
      { name: 'Large (12")', price: 659 }
    ]
  },
  {
    id: 'pizza-3',
    name: 'Paneer Tikka Fusion Pizza',
    category: 'pizza',
    isVeg: true,
    rating: 4.9,
    reviewsCount: 512,
    basePrice: 379,
    originalPrice: 450,
    discountBadge: '15% OFF',
    isPopular: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=700&auto=format&fit=crop&q=80',
    description: 'Tandoori-spiced tender paneer cubes, roasted bell peppers, red onion rings, and cilantro drizzled with mint-mayo swirl.',
    sizes: [
      { name: 'Regular (7")', price: 379 },
      { name: 'Medium (10")', price: 529 },
      { name: 'Large (12")', price: 699 }
    ]
  },
  {
    id: 'pizza-4',
    name: 'Cheese Burst Supreme Pizza',
    category: 'pizza',
    isVeg: true,
    rating: 4.9,
    reviewsCount: 620,
    basePrice: 399,
    originalPrice: 499,
    discountBadge: '20% OFF',
    isPopular: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=700&auto=format&fit=crop&q=80',
    description: 'Liquid molten cheddar cheese oozing from the crust, topped with mozzarella, yellow cheddar, parmesan, and spicy herbs.',
    sizes: [
      { name: 'Regular (7")', price: 399 },
      { name: 'Medium (10")', price: 579 },
      { name: 'Large (12")', price: 749 }
    ]
  },
  {
    id: 'pizza-5',
    name: 'Chicken Pepperoni Feast Pizza',
    category: 'pizza',
    isVeg: false,
    rating: 4.9,
    reviewsCount: 478,
    basePrice: 429,
    originalPrice: 529,
    discountBadge: '19% OFF',
    isPopular: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=700&auto=format&fit=crop&q=80',
    description: 'Smoky chicken pepperoni slices layered generously over bubbly mozzarella cheese and robust marinara sauce.',
    sizes: [
      { name: 'Regular (7")', price: 429 },
      { name: 'Medium (10")', price: 599 },
      { name: 'Large (12")', price: 799 }
    ]
  },
  {
    id: 'burger-1',
    name: 'Classic Veggie Crunch Burger',
    category: 'burger',
    isVeg: true,
    rating: 4.6,
    reviewsCount: 220,
    basePrice: 149,
    originalPrice: 189,
    discountBadge: '21% OFF',
    isPopular: false,
    isBestseller: false,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=700&auto=format&fit=crop&q=80',
    description: 'Crispy herb potato & peas patty topped with fresh iceberg lettuce, tomato slices, crunchy onions, and signature burger mayo.',
    sizes: [
      { name: 'Single Patty', price: 149 },
      { name: 'Double Patty', price: 199 }
    ]
  },
  {
    id: 'burger-2',
    name: 'Spicy Paneer Royale Burger',
    category: 'burger',
    isVeg: true,
    rating: 4.8,
    reviewsCount: 380,
    basePrice: 199,
    originalPrice: 249,
    discountBadge: '20% OFF',
    isPopular: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=700&auto=format&fit=crop&q=80',
    description: 'Panko-crusted crispy paneer patty glazed with peri-peri marinade, fresh coleslaw, and melted mozzarella on toasted brioche.',
    sizes: [
      { name: 'Single Patty', price: 199 },
      { name: 'Double Patty', price: 269 }
    ]
  },
  {
    id: 'burger-3',
    name: 'Crispy Chicken Zinger Burger',
    category: 'burger',
    isVeg: false,
    rating: 4.9,
    reviewsCount: 740,
    basePrice: 229,
    originalPrice: 289,
    discountBadge: '20% OFF',
    isPopular: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=700&auto=format&fit=crop&q=80',
    description: '100% whole chicken breast fillet coated in spicy crunchy batter, iceberg lettuce, and creamy garlic mayonnaise in toasted buns.',
    sizes: [
      { name: 'Regular Zinger', price: 229 },
      { name: 'Mighty Double Zinger', price: 329 }
    ]
  },
  {
    id: 'side-1',
    name: 'Golden Salted French Fries',
    category: 'fastfood',
    isVeg: true,
    rating: 4.7,
    reviewsCount: 310,
    basePrice: 119,
    originalPrice: 149,
    discountBadge: '20% OFF',
    isPopular: false,
    isBestseller: false,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=700&auto=format&fit=crop&q=80',
    description: 'Crispy skin-on potato fries, fried to golden perfection and tossed in sea salt. Served with tomato dip.',
    sizes: [
      { name: 'Medium', price: 119 },
      { name: 'Large', price: 159 }
    ]
  },
  {
    id: 'side-2',
    name: 'Spicy Peri Peri Crinkle Fries',
    category: 'fastfood',
    isVeg: true,
    rating: 4.9,
    reviewsCount: 560,
    basePrice: 149,
    originalPrice: 189,
    discountBadge: '21% OFF',
    isPopular: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=700&auto=format&fit=crop&q=80',
    description: 'Extra-crisp crinkle-cut fries tossed in an aromatic African bird eye chili peri-peri spice mix.',
    sizes: [
      { name: 'Medium', price: 149 },
      { name: 'Large', price: 199 }
    ]
  },
  {
    id: 'combo-1',
    name: 'Solo Feast: Burger + Fries + Coke',
    category: 'combos',
    isVeg: false,
    rating: 4.9,
    reviewsCount: 610,
    basePrice: 349,
    originalPrice: 470,
    discountBadge: '25% OFF',
    isPopular: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=700&auto=format&fit=crop&q=80',
    description: '1 Crispy Chicken Zinger Burger + 1 Medium Golden Salted Fries + 1 Chilled Coca-Cola (300ml). Perfect meal for one.',
    sizes: [
      { name: 'Standard Combo', price: 349 },
      { name: 'Large Combo', price: 419 }
    ]
  },
  {
    id: 'combo-2',
    name: 'Pizza Buddy Meal: Pizza + Garlic Bread + Coke',
    category: 'combos',
    isVeg: true,
    rating: 4.9,
    reviewsCount: 780,
    basePrice: 499,
    originalPrice: 650,
    discountBadge: '23% OFF',
    isPopular: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=700&auto=format&fit=crop&q=80',
    description: '1 Medium Margherita Delight Pizza + 4 Pcs Cheesy Garlic Breadsticks + 2 Cans Coca-Cola (300ml).',
    sizes: [
      { name: 'Medium Pizza Combo', price: 499 },
      { name: 'Large Pizza Combo', price: 699 }
    ]
  },
  {
    id: 'dessert-1',
    name: 'Molten Belgian Choco Lava Cake',
    category: 'desserts',
    isVeg: true,
    rating: 4.9,
    reviewsCount: 890,
    basePrice: 119,
    originalPrice: 149,
    discountBadge: '20% OFF',
    isPopular: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=700&auto=format&fit=crop&q=80',
    description: 'Warm, rich chocolate cake with a gooey, molten Belgian fudge center that spills out on the first spoonful.',
    sizes: [
      { name: '1 Piece', price: 119 },
      { name: 'Pack of 2', price: 219 }
    ]
  }
];

module.exports = FOODS;
