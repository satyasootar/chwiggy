export interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  isVeg: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: string;
  deliveryTime: string;
  cuisine: string;
  image: string;
  menu: FoodItem[];
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: "101",
    name: "Royal Biryani House",
    rating: "4.9",
    deliveryTime: "15-25 min",
    cuisine: "Indian • Mughlai",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    menu: [
      {
        id: "f1",
        name: "Hyderabadi Chicken Biryani",
        price: 350,
        description: "Classic slow-cooked chicken biryani with aromatic basmati rice, saffron, and traditional spices.",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80",
        isVeg: false,
      },
      {
        id: "f2",
        name: "Mutton Dum Biryani",
        price: 450,
        description: "Tender pieces of mutton marinated in yogurt and spices, cooked with long-grain rice.",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93cb0?auto=format&fit=crop&w=300&q=80",
        isVeg: false,
      },
      {
        id: "f3",
        name: "Vegetable Biryani",
        price: 250,
        description: "Aromatic rice layered with fresh vegetables and paneer, slow-cooked to perfection.",
        image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=300&q=80",
        isVeg: true,
      },
    ],
  },
  {
    id: "102",
    name: "Delhi Heights",
    rating: "4.8",
    deliveryTime: "20-30 min",
    cuisine: "North Indian • Punjabi",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    menu: [
      {
        id: "f4",
        name: "Butter Chicken",
        price: 380,
        description: "Tender chicken cooked in a rich, creamy tomato gravy with a hint of fenugreek.",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=300&q=80",
        isVeg: false,
      },
      {
        id: "f5",
        name: "Garlic Naan",
        price: 60,
        description: "Soft and fluffy Indian bread topped with roasted garlic and butter.",
        image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=300&q=80",
        isVeg: true,
      },
      {
        id: "f6",
        name: "Dal Makhani",
        price: 220,
        description: "Slow-cooked black lentils and kidney beans simmered in butter and cream overnight.",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=300&q=80",
        isVeg: true,
      },
    ],
  },
  {
    id: "103",
    name: "South Indian Express",
    rating: "4.7",
    deliveryTime: "15-25 min",
    cuisine: "South Indian • Dosa",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=600&q=80",
    menu: [
      {
        id: "f7",
        name: "Masala Dosa",
        price: 150,
        description: "Crispy fermented crepe made from rice and lentils, filled with a spiced potato curry.",
        image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=300&q=80",
        isVeg: true,
      },
      {
        id: "f8",
        name: "Idli Sambar",
        price: 100,
        description: "Steamed rice cakes served with a flavorful lentil and vegetable stew.",
        image: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&w=300&q=80",
        isVeg: true,
      },
    ],
  },
  {
    id: "104",
    name: "Mumbai Street Food",
    rating: "4.6",
    deliveryTime: "10-20 min",
    cuisine: "Street Food • Snacks",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=600&q=80",
    menu: [
      {
        id: "f9",
        name: "Vada Pav",
        price: 50,
        description: "Spicy potato dumpling fried in gram flour batter, sandwiched in a soft bun.",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=300&q=80",
        isVeg: true,
      },
      {
        id: "f10",
        name: "Pav Bhaji",
        price: 160,
        description: "Thick vegetable curry (bhaji) served with a soft bread roll (pav).",
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=300&q=80",
        isVeg: true,
      },
    ],
  },
];

export type OrderStatus = "Pending" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  restaurant: string;
  date: string;
  total: string;
  status: OrderStatus;
  items: string;
  image: string;
}

export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-9821",
    restaurant: "Royal Biryani House",
    date: "Today, 1:45 PM",
    total: "₹ 450",
    status: "Pending",
    items: "1x Hyderabadi Chicken Biryani, 1x Raita",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "ORD-9754",
    restaurant: "Delhi Heights",
    date: "Yesterday, 7:30 PM",
    total: "₹ 850",
    status: "Delivered",
    items: "1x Butter Chicken, 2x Garlic Naan, 1x Mango Lassi",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "ORD-9122",
    restaurant: "South Indian Express",
    date: "Oct 12, 8:15 PM",
    total: "₹ 320",
    status: "Delivered",
    items: "1x Masala Dosa, 1x Idli Sambar, 1x Filter Coffee",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=200&q=80",
  },
];
