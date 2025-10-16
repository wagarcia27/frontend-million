// MongoDB Atlas Seed Data Script
// Run this script using: mongosh "mongodb+srv://williamgarcia27wg_db_user:FMpj5c8BSOgQA4hW@million-cluster.mwokgyb.mongodb.net/PropertyDb?retryWrites=true&w=majority&appName=Million-cluster" < seed-atlas-data.js

use PropertyDb;

// Clear existing data
db.Owners.deleteMany({});
db.Properties.deleteMany({});

// Insert Owners
const owners = [
  {
    idOwner: "owner1",
    name: "John Smith",
    address: "123 Main Street, New York, NY 10001",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    birthday: new Date("1980-05-15")
  },
  {
    idOwner: "owner2",
    name: "Maria Garcia",
    address: "456 Oak Avenue, Los Angeles, CA 90001",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    birthday: new Date("1985-08-22")
  },
  {
    idOwner: "owner3",
    name: "Robert Johnson",
    address: "789 Pine Road, Chicago, IL 60601",
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    birthday: new Date("1975-11-30")
  },
  {
    idOwner: "owner4",
    name: "Emily Davis",
    address: "321 Elm Street, Miami, FL 33101",
    photo: "https://randomuser.me/api/portraits/women/4.jpg",
    birthday: new Date("1990-03-10")
  }
];

db.Owners.insertMany(owners);

// Insert Properties
const properties = [
  {
    idProperty: "prop1",
    name: "Modern Downtown Apartment",
    address: "100 Broadway, New York, NY 10005",
    price: 850000,
    codeInternal: "NYC-001",
    year: 2020,
    idOwner: "owner1",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600"
  },
  {
    idProperty: "prop2",
    name: "Luxury Beach House",
    address: "200 Ocean Drive, Miami, FL 33139",
    price: 2500000,
    codeInternal: "MIA-002",
    year: 2019,
    idOwner: "owner4",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600"
  },
  {
    idProperty: "prop3",
    name: "Suburban Family Home",
    address: "300 Maple Avenue, Chicago, IL 60614",
    price: 450000,
    codeInternal: "CHI-003",
    year: 2015,
    idOwner: "owner3",
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600"
  },
  {
    idProperty: "prop4",
    name: "Hollywood Hills Villa",
    address: "400 Sunset Boulevard, Los Angeles, CA 90028",
    price: 3200000,
    codeInternal: "LA-004",
    year: 2021,
    idOwner: "owner2",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600"
  },
  {
    idProperty: "prop5",
    name: "Cozy Studio Loft",
    address: "500 5th Avenue, New York, NY 10018",
    price: 425000,
    codeInternal: "NYC-005",
    year: 2018,
    idOwner: "owner1",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600"
  },
  {
    idProperty: "prop6",
    name: "Waterfront Condo",
    address: "600 Lake Shore Drive, Chicago, IL 60611",
    price: 675000,
    codeInternal: "CHI-006",
    year: 2022,
    idOwner: "owner3",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600"
  },
  {
    idProperty: "prop7",
    name: "Mountain Retreat Cabin",
    address: "700 Mountain View Road, Denver, CO 80202",
    price: 580000,
    codeInternal: "DEN-007",
    year: 2017,
    idOwner: "owner2",
    imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600"
  },
  {
    idProperty: "prop8",
    name: "Penthouse Suite",
    address: "800 Brickell Avenue, Miami, FL 33131",
    price: 1850000,
    codeInternal: "MIA-008",
    year: 2023,
    idOwner: "owner4",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600"
  }
];

db.Properties.insertMany(properties);

print("✅ Database seeded successfully!");
print("Inserted " + owners.length + " owners and " + properties.length + " properties.");

// Verify data
print("\n📊 Database Summary:");
print("Owners count: " + db.Owners.countDocuments());
print("Properties count: " + db.Properties.countDocuments());

print("\n🏠 Sample Properties:");
db.Properties.find({}, {name: 1, price: 1, address: 1}).forEach(printjson);
