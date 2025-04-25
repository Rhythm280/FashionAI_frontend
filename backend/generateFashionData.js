require("dotenv").config();
const mongoose = require("mongoose");
const { OpenAI } = require("openai");
const FashionItem = require("./models/FashionItem");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined. Please check your .env file.");
  process.exit(1);
}

const TARGET_COUNT = 100;
const BATCH_SIZE = 10;
const MAX_RETRIES = 3;

const promptTemplate = `
Generate a JSON array of 10 unique fashion items. Each item must have:

- name: string
- description: string
- garmentType: one of ["jacket", "skirt", "hoodie", "blouse", "jeans", "t-shirt"]
- style: one of ["chic", "sporty", "bohemian", "minimalist", "vintage"]
- occasion: one of ["summer", "winter", "party", "office"]
- colorPattern: one of ["floral", "solid", "striped", "pastel", "bright"]
- itemType: "clothing"
- subtype: same as garmentType
- price: number between 30 and 200
- imageUrl: realistic image URL (unsplash or placeholder)
- created_at: today's date

Return only JSON array.
`;

async function fetchBatchFromGPT() {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a fashion data generator." },
      { role: "user", content: promptTemplate },
    ],
  });

  const json = response.choices[0].message.content.trim();
  return JSON.parse(json);
}

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    let inserted = 0;

    while (inserted < TARGET_COUNT) {
      let retries = 0;
      while (retries < MAX_RETRIES) {
        try {
          const data = await fetchBatchFromGPT();
          if (!Array.isArray(data)) throw new Error("Invalid data format from GPT");
          await FashionItem.insertMany(data);
          inserted += data.length;
          console.log(`✅ Inserted ${inserted}/${TARGET_COUNT}`);
          break;
        } catch (err) {
          retries++;
          console.error(`❌ GPT error: ${err.message} (Retry ${retries})`);
          if (retries === MAX_RETRIES) {
            console.error("⚠️ Skipping this batch.");
          }
        }
      }
    }
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  } finally {
    mongoose.connection.close();
    console.log("✅ Done seeding.");
  }
}

seed();
