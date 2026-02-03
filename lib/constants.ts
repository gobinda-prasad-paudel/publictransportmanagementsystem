// Admin Credentials (hardcoded for demo)
export const ADMIN_CREDENTIALS = {
  email: "admin@projectsahaj.com",
  password: "Admin@123456",
};

// Admin Schema
export interface Admin {
  adminId: string;
  full_name: string;
  email: string;
  role: "main_admin" | "admin";
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const ADMINS: Admin[] = [
  {
    adminId: "ADM001",
    full_name: "Sahaj Admin",
    email: "admin@projectsahaj.com",
    role: "main_admin",
    is_active: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

// User Schema
export interface User {
  userId: string;
  full_name: string;
  email: string;
  phone_number: string;
  document_type: "citizenship" | "national_id" | "passport";
  document_number: string;
  document_issued_from: string;
  document_file_url: string;
  date_of_birth: Date;
  balance: number;
  is_verified: boolean;
  is_active: boolean;
  account_created_by_admin_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const USERS: User[] = [
  {
    userId: "USR001",
    full_name: "Ram Bahadur Thapa",
    email: "user@email.com",
    phone_number: "9841234567",
    document_type: "citizenship",
    document_number: "12-34-567890",
    document_issued_from: "Kathmandu, Nepal",
    document_file_url: "/documents/ram_citizenship.pdf",
    date_of_birth: new Date("2000-05-15"),
    balance: 500,
    is_verified: true,
    is_active: true,
    account_created_by_admin_id: "ADM001",
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    userId: "USR002",
    full_name: "Sita Kumari Sharma",
    email: "sita.sharma@email.com",
    phone_number: "+977-9851234567",
    document_type: "national_id",
    document_number: "NID-9876543210",
    document_issued_from: "Lalitpur, Nepal",
    document_file_url: "/documents/sita_nid.pdf",
    date_of_birth: new Date("1985-08-20"),
    balance: 750,
    is_verified: true,
    is_active: true,
    account_created_by_admin_id: "ADM001",
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15"),
  },
  {
    userId: "USR003",
    full_name: "Hari Prasad Koirala",
    email: "hari.koirala@email.com",
    phone_number: "+977-9861234567",
    document_type: "passport",
    document_number: "PA-1234567",
    document_issued_from: "Ministry of Foreign Affairs, Nepal",
    document_file_url: "/documents/hari_passport.pdf",
    date_of_birth: new Date("1995-12-10"),
    balance: 250,
    is_verified: false,
    is_active: true,
    account_created_by_admin_id: "ADM001",
    createdAt: new Date("2024-07-01"),
    updatedAt: new Date("2024-07-01"),
  },
];

// Card Schema
export interface Card {
  cardId: string;
  cardlinkedAccountid: string;
  Cardlinkeddate: Date;
  Isfreezed: boolean;
  Is_card_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const CARDS: Card[] = [
  {
    cardId: "CARD001",
    cardlinkedAccountid: "USR001",
    Cardlinkeddate: new Date("2024-06-01"),
    Isfreezed: false,
    Is_card_active: true,
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    cardId: "CARD002",
    cardlinkedAccountid: "USR001",
    Cardlinkeddate: new Date("2024-07-01"),
    Isfreezed: false,
    Is_card_active: true,
    createdAt: new Date("2024-07-01"),
    updatedAt: new Date("2024-07-01"),
  },
  {
    cardId: "CARD003",
    cardlinkedAccountid: "USR002",
    Cardlinkeddate: new Date("2024-06-15"),
    Isfreezed: true,
    Is_card_active: true,
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15"),
  },
];

// Topup Card Schema
export interface TopupCard {
  topup_card_id: string;
  topup_card_number: string;
  product_batch_id: string;
  balance: number;
  is_used: boolean;
  used_by_user_id: string | null;
  generated_on: Date;
  expiry_date: Date;
  generated_by_admin_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const TOPUP_CARDS: TopupCard[] = [
  {
    topup_card_id: "TC001",
    topup_card_number: "12345678",
    product_batch_id: "15891000",
    balance: 100,
    is_used: true,
    used_by_user_id: "USR001",
    generated_on: new Date("2024-05-01"),
    expiry_date: new Date("2026-05-01"),
    generated_by_admin_id: "ADM001",
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-06-01"),
  },
  {
    topup_card_id: "TC002",
    topup_card_number: "23456789",
    product_batch_id: "15891000",
    balance: 200,
    is_used: false,
    used_by_user_id: null,
    generated_on: new Date("2024-05-01"),
    expiry_date: new Date("2026-05-01"),
    generated_by_admin_id: "ADM001",
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    topup_card_id: "TC003",
    topup_card_number: "34567890",
    product_batch_id: "15891001",
    balance: 500,
    is_used: true,
    used_by_user_id: "USR002",
    generated_on: new Date("2024-06-01"),
    expiry_date: new Date("2026-06-01"),
    generated_by_admin_id: "ADM001",
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-06-15"),
  },
  {
    topup_card_id: "TC004",
    topup_card_number: "45678901",
    product_batch_id: "15891001",
    balance: 100,
    is_used: false,
    used_by_user_id: null,
    generated_on: new Date("2024-06-01"),
    expiry_date: new Date("2026-06-01"),
    generated_by_admin_id: "ADM001",
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-06-01"),
  },
];

// Transaction Schema
export interface Transaction {
  transactionId: string;
  userId: string;
  cardId: string | null;
  transaction_type: "topup" | "travel";
  amount: number;
  payment_mode: "rfid_card" | "topup_card";
  reference_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const TRANSACTIONS: Transaction[] = [
  {
    transactionId: "TXN001",
    userId: "USR001",
    cardId: "CARD001",
    transaction_type: "topup",
    amount: 100,
    payment_mode: "topup_card",
    reference_id: "12345678",
    createdAt: new Date("2024-06-01T10:30:00"),
    updatedAt: new Date("2024-06-01T10:30:00"),
  },
  {
    transactionId: "TXN002",
    userId: "USR001",
    cardId: "CARD001",
    transaction_type: "travel",
    amount: 30,
    payment_mode: "rfid_card",
    reference_id: "TRV001",
    createdAt: new Date("2024-06-02T08:15:00"),
    updatedAt: new Date("2024-06-02T08:15:00"),
  },
  {
    transactionId: "TXN003",
    userId: "USR002",
    cardId: "CARD003",
    transaction_type: "topup",
    amount: 500,
    payment_mode: "topup_card",
    reference_id: "34567890",
    createdAt: new Date("2024-06-15T14:00:00"),
    updatedAt: new Date("2024-06-15T14:00:00"),
  },
];

// Route Schema
export interface Route {
  routeId: number;
  bus_number: string;
  from: string;
  to: string;
  route_map_polyline: string | null;
  created_by_admin_id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ROUTES: Route[] = [
  {
    routeId: 1,
    bus_number: "BUS-101",
    from: "Koteshwor",
    to: "Kalanki",
    route_map_polyline: null,
    created_by_admin_id: "ADM001",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    routeId: 2,
    bus_number: "BUS-102",
    from: "Budhanilkantha",
    to: "Sundhara",
    route_map_polyline: null,
    created_by_admin_id: "ADM001",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    routeId: 3,
    bus_number: "BUS-103",
    from: "Chabahil",
    to: "Ratnapark",
    route_map_polyline: null,
    created_by_admin_id: "ADM001",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    routeId: 4,
    bus_number: "BUS-104",
    from: "Bhaktapur",
    to: "Lagankhel",
    route_map_polyline: null,
    created_by_admin_id: "ADM001",
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
];

// Travel History Schema
export interface TravelHistory {
  travelId: string;
  userId: string;
  cardId: string;
  bus_id: string;
  routeId: number;
  from: string;
  to: string;
  price: number;
  payment_mode: "rfid_card";
  travelled_on: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const TRAVEL_HISTORY: TravelHistory[] = [
  {
    travelId: "TRV001",
    userId: "USR001",
    cardId: "CARD001",
    bus_id: "BUS-101",
    routeId: 1,
    from: "Koteshwor",
    to: "Kalanki",
    price: 30,
    payment_mode: "rfid_card",
    travelled_on: new Date("2024-06-02T08:15:00"),
    createdAt: new Date("2024-06-02T08:15:00"),
    updatedAt: new Date("2024-06-02T08:15:00"),
  },
  {
    travelId: "TRV002",
    userId: "USR001",
    cardId: "CARD001",
    bus_id: "BUS-102",
    routeId: 2,
    from: "Budhanilkantha",
    to: "Sundhara",
    price: 40,
    payment_mode: "rfid_card",
    travelled_on: new Date("2024-06-03T09:00:00"),
    createdAt: new Date("2024-06-03T09:00:00"),
    updatedAt: new Date("2024-06-03T09:00:00"),
  },
  {
    travelId: "TRV003",
    userId: "USR002",
    cardId: "CARD003",
    bus_id: "BUS-103",
    routeId: 3,
    from: "Chabahil",
    to: "Ratnapark",
    price: 25,
    payment_mode: "rfid_card",
    travelled_on: new Date("2024-06-16T07:30:00"),
    createdAt: new Date("2024-06-16T07:30:00"),
    updatedAt: new Date("2024-06-16T07:30:00"),
  },
  {
    travelId: "TRV004",
    userId: "USR001",
    cardId: "CARD002",
    bus_id: "BUS-104",
    routeId: 4,
    from: "Bhaktapur",
    to: "Lagankhel",
    price: 50,
    payment_mode: "rfid_card",
    travelled_on: new Date("2024-07-05T10:00:00"),
    createdAt: new Date("2024-07-05T10:00:00"),
    updatedAt: new Date("2024-07-05T10:00:00"),
  },
];

// Emergency SOS Schema
export interface EmergencySOS {
  sosId: string;
  bus_id: string;
  route_number: string;
  bus_location_name: string;
  latitude: number;
  longitude: number;
  driver_name: string;
  driver_phone: string;
  pressed_at: Date;
  is_resolved: boolean;
  resolved_at: Date | null;
  resolved_by_admin_id: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const EMERGENCY_SOS: EmergencySOS[] = [
  {
    sosId: "SOS001",
    bus_id: "BUS-101",
    route_number: "Route-1",
    bus_location_name: "Tinkune",
    latitude: 27.6839,
    longitude: 85.3394,
    driver_name: "Krishna Tamang",
    driver_phone: "+977-9801234567",
    pressed_at: new Date("2024-07-10T14:30:00"),
    is_resolved: false,
    resolved_at: null,
    resolved_by_admin_id: null,
    createdAt: new Date("2024-07-10T14:30:00"),
    updatedAt: new Date("2024-07-10T14:30:00"),
  },
  {
    sosId: "SOS002",
    bus_id: "BUS-102",
    route_number: "Route-2",
    bus_location_name: "Baluwatar",
    latitude: 27.7286,
    longitude: 85.3283,
    driver_name: "Binod Shrestha",
    driver_phone: "+977-9811234567",
    pressed_at: new Date("2024-07-09T11:00:00"),
    is_resolved: true,
    resolved_at: new Date("2024-07-09T11:45:00"),
    resolved_by_admin_id: "ADM001",
    createdAt: new Date("2024-07-09T11:00:00"),
    updatedAt: new Date("2024-07-09T11:45:00"),
  },
];

// Harassment Schema
export interface Harassment {
  harrassmentId: string;
  bus_id: string;
  route_number: string;
  customer_id: string;
  customer_contact: string;
  travelling_id: string;
  driver_name: string;
  driver_number: string;
  message: string;
  evidence_file_url: string | null;
  status: "pending" | "resolved" | "rejected";
  filed_at: Date;
  resolved_at: Date | null;
  resolved_by_admin_id: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const HARASSMENTS: Harassment[] = [
  {
    harrassmentId: "HAR001",
    bus_id: "BUS-101",
    route_number: "Route-1",
    customer_id: "USR001",
    customer_contact: "+977-9841234567",
    travelling_id: "TRV001",
    driver_name: "Krishna Tamang",
    driver_number: "+977-9801234567",
    message: "The driver was rude and refused to stop at the designated bus stop.",
    evidence_file_url: null,
    status: "pending",
    filed_at: new Date("2024-06-02T12:00:00"),
    resolved_at: null,
    resolved_by_admin_id: null,
    createdAt: new Date("2024-06-02T12:00:00"),
    updatedAt: new Date("2024-06-02T12:00:00"),
  },
  {
    harrassmentId: "HAR002",
    bus_id: "BUS-103",
    route_number: "Route-3",
    customer_id: "USR002",
    customer_contact: "+977-9851234567",
    travelling_id: "TRV003",
    driver_name: "Ramesh Gurung",
    driver_number: "+977-9821234567",
    message: "Overcrowding issue and conductor misbehavior.",
    evidence_file_url: "/evidence/har002.jpg",
    status: "resolved",
    filed_at: new Date("2024-06-16T15:00:00"),
    resolved_at: new Date("2024-06-17T10:00:00"),
    resolved_by_admin_id: "ADM001",
    createdAt: new Date("2024-06-16T15:00:00"),
    updatedAt: new Date("2024-06-17T10:00:00"),
  },
];

// Bus Live Location (for map display)
export interface BusLocation {
  bus_id: string;
  bus_number: string;
  routeId: number;
  driver_name: string;
  driver_phone: string;
  current_location: string;
  latitude: number;
  longitude: number;
  heading: number;
  speed: number;
  safety_rating: number; // Rating out of 9 (higher = safer)
  current_passengers: number;
  max_capacity: number;
  last_updated: Date;
}

export const BUS_LOCATIONS: BusLocation[] = [
  {
    bus_id: "BUS-101",
    bus_number: "BUS-101",
    routeId: 1,
    driver_name: "Krishna Tamang",
    driver_phone: "+977-9801234567",
    current_location: "Thapathali",
    latitude: 27.6947,
    longitude: 85.3206,
    heading: 270,
    speed: 25,
    safety_rating: 8,
    current_passengers: 18,
    max_capacity: 40,
    last_updated: new Date(),
  },
  {
    bus_id: "BUS-102",
    bus_number: "BUS-102",
    routeId: 2,
    driver_name: "Binod Shrestha",
    driver_phone: "+977-9811234567",
    current_location: "Lazimpat",
    latitude: 27.7219,
    longitude: 85.3222,
    heading: 180,
    speed: 30,
    safety_rating: 7,
    current_passengers: 35,
    max_capacity: 35,
    last_updated: new Date(),
  },
  {
    bus_id: "BUS-103",
    bus_number: "BUS-103",
    routeId: 3,
    driver_name: "Ramesh Gurung",
    driver_phone: "+977-9821234567",
    current_location: "Boudha",
    latitude: 27.7215,
    longitude: 85.3620,
    heading: 225,
    speed: 20,
    safety_rating: 9,
    current_passengers: 42,
    max_capacity: 38,
    last_updated: new Date(),
  },
  {
    bus_id: "BUS-104",
    bus_number: "BUS-104",
    routeId: 4,
    driver_name: "Sanjay Maharjan",
    driver_phone: "+977-9831234567",
    current_location: "Thimi",
    latitude: 27.6742,
    longitude: 85.3875,
    heading: 270,
    speed: 35,
    safety_rating: 6,
    current_passengers: 50,
    max_capacity: 40,
    last_updated: new Date(),
  },
  {
    bus_id: "BUS-105",
    bus_number: "BUS-105",
    routeId: 1,
    driver_name: "Dipak Rai",
    driver_phone: "+977-9841234567",
    current_location: "Koteshwor",
    latitude: 27.6787,
    longitude: 85.3494,
    heading: 90,
    speed: 28,
    safety_rating: 8,
    current_passengers: 50,
    max_capacity: 40,
    last_updated: new Date(),
  },
  {
    bus_id: "BUS-106",
    bus_number: "BUS-106",
    routeId: 2,
    driver_name: "Anil Lama",
    driver_phone: "+977-9851234567",
    current_location: "Kalanki",
    latitude: 27.6934,
    longitude: 85.2817,
    heading: 90,
    speed: 32,
    safety_rating: 7,
    current_passengers: 30,
    max_capacity: 40,
    last_updated: new Date(),
  },
  {
    bus_id: "BUS-107",
    bus_number: "BUS-107",
    routeId: 3,
    driver_name: "Suresh Adhikari",
    driver_phone: "+977-9861234567",
    current_location: "Chabahil",
    latitude: 27.7193,
    longitude: 85.3464,
    heading: 180,
    speed: 22,
    safety_rating: 8,
    current_passengers: 40,
    max_capacity: 35,
    last_updated: new Date(),
  },
  {
    bus_id: "BUS-108",
    bus_number: "BUS-108",
    routeId: 4,
    driver_name: "Kamal Shrestha",
    driver_phone: "+977-9871234567",
    current_location: "Bhaktapur Durbar Square",
    latitude: 27.6710,
    longitude: 85.4298,
    heading: 270,
    speed: 18,
    safety_rating: 9,
    current_passengers: 20,
    max_capacity: 30,
    last_updated: new Date(),
  },
  {
    bus_id: "BUS-109",
    bus_number: "BUS-109",
    routeId: 1,
    driver_name: "Nabin Karki",
    driver_phone: "+977-9881234567",
    current_location: "Pulchowk",
    latitude: 27.6820,
    longitude: 85.3190,
    heading: 0,
    speed: 26,
    safety_rating: 8,
    current_passengers: 34,
    max_capacity: 40,
    last_updated: new Date(),
  },
  {
    bus_id: "BUS-110",
    bus_number: "BUS-110",
    routeId: 5,
    driver_name: "Roshan KC",
    driver_phone: "+977-9891234567",
    current_location: "Gongabu",
    latitude: 27.7347,
    longitude: 85.3146,
    heading: 180,
    speed: 29,
    safety_rating: 7,
    current_passengers: 50,
    max_capacity: 45,
    last_updated: new Date(),
  },
  {
    bus_id: "BUS-111",
    bus_number: "BUS-111",
    routeId: 6,
    driver_name: "Bikram Thapa",
    driver_phone: "+977-9802234567",
    current_location: "Suryabinayak",
    latitude: 27.6626,
    longitude: 85.4330,
    heading: 225,
    speed: 24,
    safety_rating: 6,
    current_passengers: 28,
    max_capacity: 40,
    last_updated: new Date(),
  },
  {
    bus_id: "BUS-112",
    bus_number: "BUS-112",
    routeId: 2,
    driver_name: "Prakash Joshi",
    driver_phone: "+977-9812234567",
    current_location: "Balaju",
    latitude: 27.7326,
    longitude: 85.3028,
    heading: 135,
    speed: 21,
    safety_rating: 8,
    current_passengers: 40,
    max_capacity: 35,
    last_updated: new Date(),
  },
  {
    bus_id: "BUS-113",
    bus_number: "BUS-113",
    routeId: 3,
    driver_name: "Hari Pandey",
    driver_phone: "+977-9822234567",
    current_location: "Jorpati",
    latitude: 27.7321,
    longitude: 85.3783,
    heading: 90,
    speed: 27,
    safety_rating: 9,
    current_passengers: 31,
    max_capacity: 40,
    last_updated: new Date(),
  },
  {
    bus_id: "BUS-114",
    bus_number: "BUS-114",
    routeId: 5,
    driver_name: "Manish Bista",
    driver_phone: "+977-9832234567",
    current_location: "Satdobato",
    latitude: 27.6588,
    longitude: 85.3247,
    heading: 315,
    speed: 33,
    safety_rating: 7,
    current_passengers: 50,
    max_capacity: 45,
    last_updated: new Date(),
  },
  {
    bus_id: "BUS-115",
    bus_number: "BUS-115",
    routeId: 6,
    driver_name: "Arjun Basnet",
    driver_phone: "+977-9842234567",
    current_location: "Tokha",
    latitude: 27.7576,
    longitude: 85.3269,
    heading: 180,
    speed: 19,
    safety_rating: 8,
    current_passengers: 16,
    max_capacity: 30,
    last_updated: new Date(),
  },
];

// Kathmandu Valley Locations
export const KATHMANDU_LOCATIONS = [
  { name: "Koteshwor", lat: 27.6787, lng: 85.3494 },
  { name: "Kalanki", lat: 27.6939, lng: 85.2817 },
  { name: "Budhanilkantha", lat: 27.7773, lng: 85.3646 },
  { name: "Sundhara", lat: 27.7019, lng: 85.3127 },
  { name: "Chabahil", lat: 27.7179, lng: 85.3486 },
  { name: "Ratnapark", lat: 27.7047, lng: 85.3150 },
  { name: "Bhaktapur", lat: 27.6710, lng: 85.4298 },
  { name: "Lagankhel", lat: 27.6686, lng: 85.3210 },
  { name: "Tinkune", lat: 27.6839, lng: 85.3394 },
  { name: "Baluwatar", lat: 27.7286, lng: 85.3283 },
  { name: "Thapathali", lat: 27.6947, lng: 85.3206 },
  { name: "Lazimpat", lat: 27.7219, lng: 85.3222 },
  { name: "Boudha", lat: 27.7215, lng: 85.3620 },
  { name: "Thimi", lat: 27.6742, lng: 85.3875 },
  { name: "New Baneshwor", lat: 27.6875, lng: 85.3414 },
  { name: "Maharajgunj", lat: 27.7367, lng: 85.3342 },
];

// Developer Info
export const DEVELOPER_INFO = {
  name: "Gobinda Prasad Paudel",
  role: "Full Stack Developer",
  email: "developer@voltanex.com",
  github: "https://github.com/gobinda-prasad-paudel",
  linkedin: "https://www.linkedin.com/in/gobinda-prasad-paudel-aa9485218/",
  bio: "Passionate about building technology solutions for developing nations. This project was initially developed during Trinity Intra College Hackathon as MVP (Minimum Viable Product) and later completed fully under Voltanex.",
};

// Project Info
export const PROJECT_INFO = {
  name: "Project Sahaj",
  tagline: "Making Public Transportation Accessible for All",
  description: "A web app for making public transportation easily accessible, fast, reliable, predictable and safe for the general public. This project is developed especially for developing nations like Nepal.",
  hackathon: "Trinity Intra College Hackathon",
  organization: "Voltanex",
  organizationDescription: "An e-club open to electronics, computer science, and AI enthusiasts, dedicated to collectively revolutionizing society through technology.",
  websiteLink: "https://voltanex.gobindapoudel.com.np",
};

// Counter for auto-incrementing IDs
export let BATCH_ID_COUNTER = 15891002;
export let ROUTE_ID_COUNTER = 5;

export const incrementBatchId = () => {
  BATCH_ID_COUNTER++;
  return BATCH_ID_COUNTER.toString();
};

export const incrementRouteId = () => {
  ROUTE_ID_COUNTER++;
  return ROUTE_ID_COUNTER;
};

// Generate unique 8 digit number
export const generateUniqueId = (): string => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

// User credentials for login (hardcoded)
export const USER_CREDENTIALS = {
  email: "user@email.com",
  phone_number: "9841234567",
  date_of_birth: "2000-05-15",
};

// User RFID Cards (for display in user dashboard)
export interface UserRFIDCard {
  cardId: string;
  cardNumber: string; // 8 digit XXXX-XXXX format
  userId: string;
  balance: number;
  issuedOn: Date;
  isActive: boolean;
}

export const USER_RFID_CARDS: UserRFIDCard[] = [
  {
    cardId: "CARD001",
    cardNumber: "4523-8971",
    userId: "USR001",
    balance: 350.00,
    issuedOn: new Date("2024-06-01"),
    isActive: true,
  },
  {
    cardId: "CARD002",
    cardNumber: "7892-3456",
    userId: "USR001",
    balance: 150.00,
    issuedOn: new Date("2024-07-01"),
    isActive: true,
  },
];

// Sample Topup Cards for display
export interface SampleTopupCard {
  id: string;
  cardNumber: string;
  amount: number;
  expiryDate: Date;
  status: "used" | "unused";
  usedBy?: string;
  usedOn?: Date;
}

export const SAMPLE_TOPUP_CARDS: SampleTopupCard[] = [
  {
    id: "STC001",
    cardNumber: "1234-5678",
    amount: 100,
    expiryDate: new Date("2026-05-01"),
    status: "unused",
  },
  {
    id: "STC002",
    cardNumber: "2345-6789",
    amount: 200,
    expiryDate: new Date("2026-05-01"),
    status: "used",
    usedBy: "Ram Thapa",
    usedOn: new Date("2024-08-15"),
  },
  {
    id: "STC003",
    cardNumber: "3456-7890",
    amount: 500,
    expiryDate: new Date("2026-06-01"),
    status: "unused",
  },
  {
    id: "STC004",
    cardNumber: "4567-8901",
    amount: 1000,
    expiryDate: new Date("2026-06-01"),
    status: "used",
    usedBy: "Sita Sharma",
    usedOn: new Date("2024-09-01"),
  },
];

// Bus Schema (for admin bus management)
export interface Bus {
  busId: string;
  busName: string;
  driverName: string;
  driverPhone: string;
  driverDOB: Date;
  driverLicenseNumber: string;
  routeId: number;
  createdAt: Date;
  updatedAt: Date;
}

export const BUSES: Bus[] = [
  {
    busId: "BUS-101",
    busName: "Sajha Yatayat 101",
    driverName: "Krishna Tamang",
    driverPhone: "+977-9801234567",
    driverDOB: new Date("1985-03-15"),
    driverLicenseNumber: "DL-12345-KTM",
    routeId: 1,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    busId: "BUS-102",
    busName: "Sajha Yatayat 102",
    driverName: "Binod Shrestha",
    driverPhone: "+977-9811234567",
    driverDOB: new Date("1990-07-20"),
    driverLicenseNumber: "DL-23456-KTM",
    routeId: 2,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    busId: "BUS-103",
    busName: "Sajha Yatayat 103",
    driverName: "Ramesh Gurung",
    driverPhone: "+977-9821234567",
    driverDOB: new Date("1988-11-10"),
    driverLicenseNumber: "DL-34567-BKT",
    routeId: 3,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    busId: "BUS-104",
    busName: "Sajha Yatayat 104",
    driverName: "Sanjay Maharjan",
    driverPhone: "+977-9831234567",
    driverDOB: new Date("1992-05-25"),
    driverLicenseNumber: "DL-45678-LTP",
    routeId: 4,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    busId: "BUS-105",
    busName: "Sajha Yatayat 105",
    driverName: "Dipak Rai",
    driverPhone: "+977-9841234567",
    driverDOB: new Date("1987-09-05"),
    driverLicenseNumber: "DL-56789-KTM",
    routeId: 1,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
];

// Bus ID Counter
export let BUS_ID_COUNTER = 106;
export const generateBusId = () => {
  const id = `BUS-${BUS_ID_COUNTER}`;
  BUS_ID_COUNTER++;
  return id;
};

// Alias exports for compatibility with UI components
export const MOCK_USERS = USERS.map((user) => ({
  id: user.userId,
  name: user.full_name,
  email: user.email,
  phone: user.phone_number,
  type: "regular" as const,
  balance: user.balance,
  rfidCard: `RFID-${user.userId}`,
  status: user.is_active ? ("active" as const) : ("inactive" as const),
  createdAt: user.createdAt.toISOString().split("T")[0],
}));

export const MOCK_TRANSACTIONS = TRANSACTIONS.map((txn) => ({
  id: txn.transactionId,
  type: txn.transaction_type === "topup" ? ("topup" as const) : ("fare" as const),
  amount: txn.amount,
  description:
    txn.transaction_type === "topup"
      ? `Top up via ${txn.payment_mode}`
      : `Travel fare - ${txn.reference_id}`,
  date: txn.createdAt.toISOString().split("T")[0],
  status: "completed" as const,
}));

export const MOCK_ROUTES = ROUTES.map((route) => ({
  id: `R${String(route.routeId).padStart(3, "0")}`,
  name: `Route ${route.routeId}`,
  start: route.from,
  end: route.to,
  stops: [route.from, "Mid Stop 1", "Mid Stop 2", route.to],
  duration: "45 mins",
  fare: 30,
  vehiclesOnRoute: 3,
  status: "active" as const,
}));
