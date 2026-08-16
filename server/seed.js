require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");
const Category = require("./models/Category");
const Photographer = require("./models/Photographer");
const Portfolio = require("./models/Portfolio");
const Package = require("./models/Package");
const Testimonial = require("./models/Testimonial");

const seed = async () => {
  await connectDB();

  // Clear existing data (optional - comment out to keep)
  await Promise.all([
    User.deleteMany(),
    Category.deleteMany(),
    Photographer.deleteMany(),
    Portfolio.deleteMany(),
    Package.deleteMany(),
    Testimonial.deleteMany(),
  ]);
  console.log("🗑️  Cleared existing data");

  // Admin user
  await User.create({
    name: "Admin",
    email: "sunnysatya4@gmail.com",
    password: "Sunny@Satya123",
    role: "admin",
  });
  console.log("👤 Admin created: sunnysatya4@gmail.com / admin@123");

  // Categories
  const categoryData = [
    {
      name: "Wedding Photography",
      icon: "💍",
      description: "Timeless wedding moments",
    },
    { name: "Pre Wedding", icon: "❤️", description: "Romantic storytelling" },
    { name: "Fashion", icon: "👗", description: "Editorial & runway" },
    { name: "Maternity", icon: "🤰", description: "Precious life moments" },
    { name: "Birthday", icon: "🎂", description: "Celebrations captured" },
    { name: "Corporate", icon: "💼", description: "Business & headshots" },
    {
      name: "Product Photography",
      icon: "📦",
      description: "E-commerce & ads",
    },
    { name: "Travel", icon: "✈️", description: "Wanderlust stories" },
    { name: "Wildlife", icon: "🦁", description: "Nature in the wild" },
    { name: "Food", icon: "🍽️", description: "Delicious captures" },
    { name: "Sports", icon: "⚽", description: "Action & motion" },
    { name: "Real Estate", icon: "🏠", description: "Property & interiors" },
    {
      name: "Drone Photography",
      icon: "🚁",
      description: "Aerial perspectives",
    },
  ];
  await Category.insertMany(categoryData);
  console.log("📂 Categories seeded");

  // Photographers
  const photographerData = [
    {
      name: "Ayesha Sharma",
      specialty: "Wedding & Cinematic",
      coverImage:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=400&fit=crop",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
      rating: 4.9,
      bookings: 320,
      price: 45000,
      experience: 8,
      available: true,
      verified: true,
      featured: true,
      portfolio: [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=120&h=70&fit=crop",
        "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=120&h=70&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=120&h=70&fit=crop",
      ],
    },
    {
      name: "Arjun Patel",
      specialty: "Fashion & Editorials",
      coverImage:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=400&fit=crop",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
      rating: 4.8,
      bookings: 450,
      price: 60000,
      experience: 12,
      available: true,
      verified: true,
      featured: true,
      portfolio: [
        "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=120&h=70&fit=crop",
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=120&h=70&fit=crop",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=120&h=70&fit=crop",
      ],
    },
    {
      name: "Rahul Verma",
      specialty: "Drone & Aerial",
      coverImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      rating: 5.0,
      bookings: 280,
      price: 35000,
      experience: 6,
      available: true,
      verified: true,
      featured: true,
      portfolio: [
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=120&h=70&fit=crop",
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=120&h=70&fit=crop",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=120&h=70&fit=crop",
      ],
    },
  ];
  await Photographer.insertMany(photographerData);
  console.log("🧑‍🚀 Photographers seeded");

  // Portfolio — Indian wedding & celebration themes
  const portfolioData = [
    {
      title: "Indian Bride Beauty",
      image:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
      category: "Wedding",
      photographer: "Royal Photography",
    },
    {
      title: "Sacred Vows",
      image:
        "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80",
      category: "Wedding",
      photographer: "Royal Photography",
    },
    {
      title: "Haldi Ceremony Joy",
      image:
        "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=600&q=80",
      category: "Haldi",
      photographer: "Royal Photography",
    },
    {
      title: "Festive Haldi Fun",
      image:
        "https://images.unsplash.com/photo-1621857008318-1a4da4f0ecb9?w=600&q=80",
      category: "Haldi",
      photographer: "Royal Photography",
    },
    {
      title: "Mehendi Celebration",
      image:
        "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=80",
      category: "Mehendi",
      photographer: "Royal Photography",
    },
    {
      title: "Mehendi Artistry",
      image:
        "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&q=80",
      category: "Mehendi",
      photographer: "Royal Photography",
    },
    {
      title: "Ring Exchange Moment",
      image:
        "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80",
      category: "Ring Ceremony",
      photographer: "Royal Photography",
    },
    {
      title: "The Promise",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
      category: "Ring Ceremony",
      photographer: "Royal Photography",
    },
    {
      title: "Grand Celebration",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80",
      category: "Event",
      photographer: "Royal Photography",
    },
    {
      title: "Festive Gathering",
      image:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
      category: "Event",
      photographer: "Royal Photography",
    },
    {
      title: "Romantic Couple",
      image:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
      category: "Wedding",
      photographer: "Royal Photography",
    },
    {
      title: "Indian Couple Portrait",
      image:
        "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=600&q=80",
      category: "Wedding",
      photographer: "Royal Photography",
    },
  ];
  await Portfolio.insertMany(portfolioData);
  console.log("🖼️  Portfolio seeded");

  // Packages — all share Platinum's master feature list; lower tiers
  // mark the features they don't include as disabledFeatures (line-through).
  const masterFeatures = [
    "Full Wedding",
    "Traditional Shoot",
    "Drone Shoot",
    "4K Video",
    "350+ Photos Album",
    "7 Photographers",
    "Haldi Shoot",
    "Mehendi Shoot",
    "Ring Ceremony",
    "Candid Shoot",
    "Cinematic Shoot",
    "Wall Led",
    "Gallery Frames",
    "1 Female Photographer",
    "Luxury Photo Album",
    "Instatnt Reels",
    "Crane Shots",
    "Pre-Wedding Shoot",
    "Story Shoot",
  ];

  const packageData = [
    {
      name: "Silver",
      icon: "🥈",
      price: 50000,
      advance: 1,
      featured: false,
      features: [
        "Full Wedding",
        "Traditional Shoot",
        "Drone Shoot",
        "4K Video",
        "200+ Photos Album",
        "3 Photographers",
      ],
      disabledFeatures: [
        "Haldi Shoot",
        "Mehendi Shoot",
        "Ring Ceremony",
        "Candid Shoot",
        "Cinematic Shoot",
        "Wall Led",
        "Gallery Frames",
        "1 Female Photographer",
        "Luxury Photo Album",
        "Instatnt Reels",
        "Crane Shots",
        "Pre-Wedding Shoot",
        "Story Shoot",
      ],
    },
    {
      name: "Gold",
      icon: "🥇",
      price: 80000,
      advance: 10000,
      featured: true,
      features: [
        "Full Wedding",
        "Traditional Shoot",
        "Drone Shoot",
        "4K Video",
        "300+ Photos Album",
        "5 Photographers",
        "Haldi Shoot",
        "Mehendi Shoot",
        "Ring Ceremony",
        "Candid Shoot",
        "Cinematic Shoot",
        "Wall Led",
        "Gallery Frames",
      ],
      disabledFeatures: [
        "1 Female Photographer",
        "Luxury Photo Album",
        "Instatnt Reels",
        "Crane Shots",
        "Pre-Wedding Shoot",
        "Story Shoot",
      ],
    },
    {
      name: "Platinum",
      icon: "💎",
      price: 130000,
      advance: 18000,
      featured: false,
      features: masterFeatures.slice(),
      disabledFeatures: [],
    },
  ];
  await Package.insertMany(packageData);
  console.log("📦 Packages seeded");

  // Testimonials
  const testimonialData = [
    {
      name: "Priya & Karan",
      role: "Wedding Photography",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      rating: 5,
      text: "Absolutely breathtaking work! The photographer captured our wedding so beautifully — every photo felt like cinema. Worth every rupee.",
    },
    {
      name: "Rohan Mehta",
      role: "Corporate Event",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      rating: 5,
      text: "The booking process was effortless and the drone shots took our corporate event to the next level. Highly professional team!",
    },
    {
      name: "Ananya Singh",
      role: "Pre-Wedding",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      rating: 5,
      text: "Our pre-wedding shoot was magical. The photographer had such a keen eye for detail and golden light. We're obsessed with every frame!",
    },
  ];
  await Testimonial.insertMany(testimonialData);
  console.log("💬 Testimonials seeded");

  console.log("\n✅ Seeding complete!");
  console.log("🔑 Admin login: sunnysatya4@gmail.com / admin123");
  process.exit(0);
};

seed();
