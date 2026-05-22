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
  {
    id: "ORD-8943",
    restaurant: "Punjabi Dhaba",
    date: "Sep 28, 1:15 PM",
    total: "₹ 250",
    status: "Cancelled",
    items: "1x Chole Bhature, 1x Sweet Lassi",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "ORD-8512",
    restaurant: "Spice Symphony",
    date: "Sep 15, 8:45 PM",
    total: "₹ 1200",
    status: "Delivered",
    items: "1x Paneer Tikka Masala, 1x Dal Makhani, 3x Butter Naan",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "ORD-8100",
    restaurant: "Mumbai Street Food",
    date: "Aug 10, 4:00 PM",
    total: "₹ 180",
    status: "Delivered",
    items: "2x Vada Pav, 1x Cutting Chai",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "ORD-7944",
    restaurant: "Kolkata Rolls Co.",
    date: "Aug 02, 6:30 PM",
    total: "₹ 300",
    status: "Delivered",
    items: "1x Chicken Egg Roll, 1x Mutton Roll",
    image: "https://images.unsplash.com/photo-1626804475297-41609ea264eb?auto=format&fit=crop&w=200&q=80",
  }
];
