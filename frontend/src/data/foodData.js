// Crazy4U Comprehensive Food Catalogue & Offers Data

export const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: '🍽️' },
  { id: 'pizza', name: 'Pizzas', icon: '🍕' },
  { id: 'burger', name: 'Burgers', icon: '🍔' },
  { id: 'fastfood', name: 'Fast Food', icon: '🍟' },
  { id: 'combos', name: 'Crazy Combos', icon: '🍱' },
  { id: 'desserts', name: 'Desserts', icon: '🧁' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' }
];

export const FOOD_ITEMS = [
  // --- PIZZAS ---
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
    ],
    crusts: ['Classic Hand Tossed', 'Cheese Burst (+₹60)', 'Thin & Crispy (+₹30)'],
    addons: [
      { id: 'cheese', name: 'Extra Mozzarella Cheese', price: 50 },
      { id: 'jalapenos', name: 'Pickled Jalapeños', price: 30 },
      { id: 'mushrooms', name: 'Herb Butter Mushrooms', price: 40 },
      { id: 'dip', name: 'Cheesy Garlic Dip', price: 35 }
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
    ],
    crusts: ['Classic Hand Tossed', 'Cheese Burst (+₹60)', 'Wheat Thin Crust (+₹40)'],
    addons: [
      { id: 'cheese', name: 'Extra Mozzarella Cheese', price: 50 },
      { id: 'olives', name: 'Black Spanish Olives', price: 35 },
      { id: 'corn', name: 'Golden Sweet Corn', price: 30 }
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
    ],
    crusts: ['Classic Hand Tossed', 'Cheese Burst (+₹60)', 'Pan Tossed (+₹35)'],
    addons: [
      { id: 'paneer', name: 'Extra Paneer Tikka', price: 60 },
      { id: 'cheese', name: 'Extra Mozzarella Cheese', price: 50 },
      { id: 'dip', name: 'Spicy Tandoori Dip', price: 35 }
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
    ],
    crusts: ['Molten Cheddar Burst (Included)', 'Double Cheese Burst (+₹70)'],
    addons: [
      { id: 'jalapenos', name: 'Spicy Jalapeños', price: 30 },
      { id: 'dip', name: 'Garlic Butter Dip', price: 35 }
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
    ],
    crusts: ['Classic Hand Tossed', 'Cheese Burst (+₹60)', 'New York Crust (+₹40)'],
    addons: [
      { id: 'pepperoni', name: 'Extra Chicken Pepperoni', price: 70 },
      { id: 'cheese', name: 'Extra Cheese', price: 50 },
      { id: 'bacon', name: 'Chicken Rashers', price: 60 }
    ]
  },
  {
    id: 'pizza-6',
    name: 'Fiery Chicken Tikka Pizza',
    category: 'pizza',
    isVeg: false,
    rating: 4.8,
    reviewsCount: 310,
    basePrice: 419,
    originalPrice: 499,
    discountBadge: '16% OFF',
    isPopular: false,
    isBestseller: false,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=700&auto=format&fit=crop&q=80',
    description: 'Juicy tandoori chicken tikka chunks with smoky capsicum, red paprika, and creamy makhani sauce base.',
    sizes: [
      { name: 'Regular (7")', price: 419 },
      { name: 'Medium (10")', price: 579 },
      { name: 'Large (12")', price: 749 }
    ],
    crusts: ['Classic Hand Tossed', 'Cheese Burst (+₹60)'],
    addons: [
      { id: 'tikka', name: 'Extra Chicken Tikka', price: 65 },
      { id: 'cheese', name: 'Extra Mozzarella Cheese', price: 50 }
    ]
  },

  // --- BURGERS ---
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
    ],
    crusts: ['Sesame Brioche Bun', 'Whole Wheat Bun (+₹20)'],
    addons: [
      { id: 'cheese', name: 'Yellow Cheddar Slice', price: 30 },
      { id: 'jalapenos', name: 'Pickled Jalapeños', price: 20 },
      { id: 'dip', name: 'Smoky Chipotle Mayo', price: 25 }
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
    ],
    crusts: ['Sesame Brioche Bun', 'Garlic Butter Toasted Bun (+₹25)'],
    addons: [
      { id: 'cheese', name: 'Double Cheese Slice', price: 40 },
      { id: 'sauce', name: 'Peri Peri Mayo Dip', price: 25 }
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
    ],
    crusts: ['Toasted Sesame Bun', 'Spicy Glazed Brioche (+₹25)'],
    addons: [
      { id: 'cheese', name: 'Melted Cheddar Slice', price: 30 },
      { id: 'bacon', name: 'Chicken Rasher', price: 50 },
      { id: 'egg', name: 'Fried Egg', price: 30 }
    ]
  },
  {
    id: 'burger-4',
    name: 'Double Cheeseburger Deluxe',
    category: 'burger',
    isVeg: false,
    rating: 4.9,
    reviewsCount: 410,
    basePrice: 279,
    originalPrice: 349,
    discountBadge: '20% OFF',
    isPopular: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80',
    description: 'Two flame-grilled chicken patties, double American cheddar slices, gherkins, caramelized onions, and secret house relish.',
    sizes: [
      { name: 'Double Patty', price: 279 },
      { name: 'Monster Triple Patty', price: 379 }
    ],
    crusts: ['Golden Brioche Bun', 'Potato Bun (+₹25)'],
    addons: [
      { id: 'cheese', name: 'Extra Melted Cheddar', price: 35 },
      { id: 'dip', name: 'Truffle Mayo Dip', price: 35 }
    ]
  },

  // --- FAST FOOD / SIDES ---
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
    ],
    crusts: ['Sea Salted', 'Salt & Black Pepper'],
    addons: [
      { id: 'cheese-dip', name: 'Cheesy Jalapeño Dip', price: 35 },
      { id: 'mayo', name: 'Garlic Mayo Dip', price: 30 }
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
    ],
    crusts: ['Peri Peri Shaker', 'Extra Fiery Peri Peri'],
    addons: [
      { id: 'cheese-sauce', name: 'Warm Cheese Sauce', price: 40 },
      { id: 'dip', name: 'Tandoori Mayo Dip', price: 30 }
    ]
  },
  {
    id: 'side-3',
    name: 'Cheesy Garlic Breadsticks',
    category: 'fastfood',
    isVeg: true,
    rating: 4.8,
    reviewsCount: 420,
    basePrice: 169,
    originalPrice: 210,
    discountBadge: '19% OFF',
    isPopular: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1619895092538-128341789043?w=700&auto=format&fit=crop&q=80',
    description: 'Freshly baked baguette slices slathered with garlic herb butter and covered in bubbling mozzarella & cheddar cheese.',
    sizes: [
      { name: '4 Pieces', price: 169 },
      { name: '6 Pieces', price: 229 }
    ],
    crusts: ['Original Garlic Herb', 'Spicy Jalapeño Garlic'],
    addons: [
      { id: 'marinara', name: 'Warm Marinara Dip', price: 35 },
      { id: 'extra-cheese', name: 'Double Stuffed Cheese', price: 45 }
    ]
  },
  {
    id: 'side-4',
    name: 'Crispy Chicken Wings (6 Pcs)',
    category: 'fastfood',
    isVeg: false,
    rating: 4.9,
    reviewsCount: 390,
    basePrice: 269,
    originalPrice: 329,
    discountBadge: '18% OFF',
    isPopular: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=700&auto=format&fit=crop&q=80',
    description: 'Crispy bone-in chicken wings tossed in your choice of signature glaze. Juicy inside, crunchy outside.',
    sizes: [
      { name: '6 Pieces', price: 269 },
      { name: '12 Pieces', price: 489 }
    ],
    crusts: ['Smoky BBQ Glaze', 'Hot Buffalo Sauce', 'Honey Mustard Glaze'],
    addons: [
      { id: 'blue-cheese', name: 'Blue Cheese Dip', price: 40 },
      { id: 'ranch', name: 'Cool Ranch Dip', price: 35 }
    ]
  },

  // --- CRAZY COMBOS ---
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
      { name: 'Large Combo (Large Fries + 500ml Drink)', price: 419 }
    ],
    crusts: ['Non-Veg Chicken Zinger', 'Veg Spicy Paneer Burger Option'],
    addons: [
      { id: 'cheese-fries', name: 'Upgrade to Peri-Peri Fries', price: 30 },
      { id: 'extra-cheese', name: 'Cheese Slice on Burger', price: 30 }
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
    ],
    crusts: ['Veg Margherita', 'Upgrade to Farmhouse Pizza (+₹80)'],
    addons: [
      { id: 'burst', name: 'Upgrade to Cheese Burst Crust', price: 70 },
      { id: 'dip', name: 'Garlic Dip Box', price: 35 }
    ]
  },
  {
    id: 'combo-3',
    name: 'Mega Family Pizza Feast',
    category: 'combos',
    isVeg: true,
    rating: 4.8,
    reviewsCount: 320,
    basePrice: 1199,
    originalPrice: 1599,
    discountBadge: '25% OFF',
    isPopular: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=700&auto=format&fit=crop&q=80',
    description: '2 Large Gourmet Pizzas (Farmhouse & Paneer Tikka) + 1 Peri-Peri Fries + 6 Pcs Garlic Bread + 1 Large Coke (1.25L). Serves 4-5.',
    sizes: [
      { name: 'Family Pack (2 Large Pizzas)', price: 1199 },
      { name: 'Party Pack (3 Large Pizzas)', price: 1699 }
    ],
    crusts: ['Classic Hand Tossed', 'Both Cheese Burst (+₹140)'],
    addons: [
      { id: 'choc-lava', name: 'Add 2 Choco Lava Cakes', price: 179 },
      { id: 'wings', name: 'Add 6 Pcs Chicken Wings', price: 239 }
    ]
  },
  {
    id: 'combo-4',
    name: 'The Ultimate Crazy4U Party Feast',
    category: 'combos',
    isVeg: false,
    rating: 5.0,
    reviewsCount: 195,
    basePrice: 4199,
    originalPrice: 5599,
    discountBadge: '25% OFF',
    isPopular: true,
    isBestseller: false,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&auto=format&fit=crop&q=80',
    description: 'Massive party celebration: 4 Large Pizzas + 4 Burgers + 2 Giant Peri-Peri Fries + 12 Pcs Wings + 4 Choco Lava Cakes + 4 Cokes. Eligible for 25% instant discount!',
    sizes: [
      { name: 'Party Feast (Serves 8-10)', price: 4199 }
    ],
    crusts: ['Assorted Gourmet Crusts'],
    addons: [
      { id: 'extra-lava', name: '4 Extra Choco Lava Cakes', price: 320 }
    ]
  },

  // --- DESSERTS ---
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
    ],
    crusts: ['Warm & Freshly Baked'],
    addons: [
      { id: 'vanilla-icecream', name: 'Vanilla Ice Cream Scoop', price: 50 }
    ]
  },
  {
    id: 'dessert-2',
    name: 'New York Baked Cheesecake',
    category: 'desserts',
    isVeg: true,
    rating: 4.8,
    reviewsCount: 310,
    basePrice: 189,
    originalPrice: 229,
    discountBadge: '17% OFF',
    isPopular: false,
    isBestseller: false,
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=700&auto=format&fit=crop&q=80',
    description: 'Silky smooth classic cream cheese filling baked over a buttery graham cracker crust, topped with berry compote swirl.',
    sizes: [
      { name: 'Single Slice', price: 189 }
    ],
    crusts: ['Berry Compote Swirl', 'Salted Caramel Drizzle'],
    addons: []
  },

  // --- BEVERAGES ---
  {
    id: 'drink-1',
    name: 'Coca-Cola Can (300ml)',
    category: 'beverages',
    isVeg: true,
    rating: 4.8,
    reviewsCount: 520,
    basePrice: 60,
    originalPrice: 65,
    discountBadge: '8% OFF',
    isPopular: false,
    isBestseller: false,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=700&auto=format&fit=crop&q=80',
    description: 'Crisp, chilled carbonated soft drink served ice-cold for the ultimate refreshing gulp with your meal.',
    sizes: [
      { name: 'Can (300ml)', price: 60 },
      { name: 'Bottle (500ml)', price: 80 }
    ],
    crusts: ['Chilled'],
    addons: []
  },
  {
    id: 'drink-2',
    name: 'Thick Belgian Chocolate Shake',
    category: 'beverages',
    isVeg: true,
    rating: 4.9,
    reviewsCount: 460,
    basePrice: 169,
    originalPrice: 210,
    discountBadge: '19% OFF',
    isPopular: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=700&auto=format&fit=crop&q=80',
    description: 'Decadent milkshake made with real Belgian chocolate ice cream, whole milk, and topped with chocolate curls and whipped cream.',
    sizes: [
      { name: 'Regular (350ml)', price: 169 },
      { name: 'Large (500ml)', price: 219 }
    ],
    crusts: ['With Whipped Cream', 'Without Whipped Cream'],
    addons: [
      { id: 'choco-chips', name: 'Extra Chocolate Chips', price: 25 }
    ]
  }
];

export const PROMOTIONAL_OFFERS = [
  {
    id: 'midweek-20',
    code: 'MIDWEEK20',
    title: '20% OFF Every Wednesday & Friday',
    subtitle: 'Midweek Madness on all food orders',
    discountPercent: 20,
    minOrderAmount: 0,
    validDays: [3, 5], // Wednesday = 3, Friday = 5
    badge: 'MIDWEEK SPECIAL',
    description: 'Enjoy a flat 20% discount on every order placed on Wednesdays and Fridays. Automatically applied or use code MIDWEEK20.',
    colorGradient: 'linear-gradient(135deg, #e22525 0%, #ff5252 100%)'
  },
  {
    id: 'feast-25',
    code: 'FEAST25',
    title: '25% OFF On Orders Above ₹3,999',
    subtitle: 'Grand Party discount for bulk treats',
    discountPercent: 25,
    minOrderAmount: 3999,
    validDays: [0, 1, 2, 3, 4, 5, 6],
    badge: 'MEGA SAVINGS',
    description: 'Ordering for family, friends, or a celebration? Save 25% instantly whenever your cart subtotal crosses ₹3,999.',
    colorGradient: 'linear-gradient(135deg, #b91c1c 0%, #e22525 100%)'
  },
  {
    id: 'first-order',
    code: 'CRAZYFIRST',
    title: 'Flat ₹100 OFF On First Order',
    subtitle: 'Welcome gift for all new food lovers',
    discountFlat: 100,
    minOrderAmount: 499,
    validDays: [0, 1, 2, 3, 4, 5, 6],
    badge: 'WELCOME BONUS',
    description: 'First time ordering on Crazy4U? Enjoy ₹100 flat discount on orders above ₹499.',
    colorGradient: 'linear-gradient(135deg, #18181b 0%, #3f3f46 100%)'
  }
];

// Token reward rate: ₹10 spent = 1 token (10% back in token points)
export const TOKEN_REWARD_RATE = 0.1; // 1 token per 10 rupees
