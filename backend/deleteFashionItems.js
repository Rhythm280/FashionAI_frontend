require("dotenv").config();
const mongoose = require("mongoose");
const FashionItem = require("./models/FashionItem"); // Adjust the path as needed

async function deleteAllFashionItems() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const result = await FashionItem.deleteMany({});
    console.log(`🧹 Deleted ${result.deletedCount} fashion items`);

    mongoose.connection.close();
    console.log("🔌 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Deletion error:", err);
    process.exit(1);
  }
}

deleteAllFashionItems();
