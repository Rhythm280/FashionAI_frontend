// controllers/ai.controller.js (Fashion Version with Assistant Reply)
const OpenAI = require("openai");
const FashionItem = require("../models/FashionItem");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const STYLE_ENUM = [
  "chic", "sporty", "bohemian", "minimalist", "vintage",
  "casual", "formal", "edgy", "romantic", "preppy"
];

const OCCASION_ENUM = [
  "summer", "winter", "spring", "fall",
  "office", "brunch", "party", "beach", "workout", "formal event"
];

const COLOR_PATTERN_ENUM = [
  "solid", "striped", "floral", "plaid", "polka dot",
  "animal print", "pastel", "bright", "navy", "monochrome"
];

const ITEM_TYPE_DEFINITION = [
  {
    type: "clothing",
    subtypes: [
      "dress", "jacket", "jeans", "t-shirt", "blouse",
      "skirt", "shorts", "coat", "sweater", "hoodie"
    ]
  },
  {
    type: "accessory",
    subtypes: [
      "belt", "bag", "scarf", "hat", "watch",
      "jewelry", "shoes"
    ]
  }
];

const ITEM_TYPE_ENUM = ITEM_TYPE_DEFINITION.map(o => o.type);
const SUBTYPE_ENUM = ITEM_TYPE_DEFINITION.flatMap(o => o.subtypes);

const normalizeArray = (input, validList) =>
  Array.isArray(input)
    ? input.map(v => v.trim().toLowerCase()).filter(v => validList.includes(v))
    : [];

exports.searchFashionItems = async (req, res) => {
  const { query } = req.body;

  try {
    // 1️⃣ Extract filters
    const prompt = `
Extract these fields from the user's fashion-related query:
- style (array from: ${STYLE_ENUM.join(", ")})
- occasion (array from: ${OCCASION_ENUM.join(", ")})
- colorPattern (array from: ${COLOR_PATTERN_ENUM.join(", ")})
- itemType (array from: ${ITEM_TYPE_ENUM.join(", ")})
- subtype (array from: ${SUBTYPE_ENUM.join(", ")})

Return exactly:
{
  "style": [],
  "occasion": [],
  "colorPattern": [],
  "itemType": [],
  "subtype": []
}

User query: "${query}"
`;

    const extractResp = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Extract fashion preferences into structured JSON." },
        { role: "user", content: prompt },
      ],
    });

    const extracted = JSON.parse(extractResp.choices[0].message.content.trim());

    const styleList        = normalizeArray(extracted.style, STYLE_ENUM);
    const occasionList     = normalizeArray(extracted.occasion, OCCASION_ENUM);
    const colorPatternList = normalizeArray(extracted.colorPattern, COLOR_PATTERN_ENUM);
    const itemTypeList     = normalizeArray(extracted.itemType, ITEM_TYPE_ENUM);
    const subtypeList      = normalizeArray(extracted.subtype, SUBTYPE_ENUM);

    // 2️⃣ MongoDB query
    const mongoQuery = {};
    if (styleList.length)        mongoQuery.style        = { $in: styleList };
    if (occasionList.length)     mongoQuery.occasion     = { $in: occasionList };
    if (colorPatternList.length) mongoQuery.colorPattern = { $in: colorPatternList };
    if (itemTypeList.length)     mongoQuery.itemType     = { $in: itemTypeList };
    if (subtypeList.length)      mongoQuery.subtype      = { $in: subtypeList };

    const results = await FashionItem.find(mongoQuery).limit(8);

    // 3️⃣ Generate AI reply
    const itemNames = results.map(i => `• ${i.name} (${i.subtype}, ${i.colorPattern})`).join("\n") || "• No items matched.";
    const replyPrompt = `
You are a friendly fashion stylist. Based on this user query, generate a short, casual message recommending the items listed below. Keep it under 50 words. Sound like a personal shopper.

Filters:
Style: ${styleList.join(", ") || "any"}
Occasion: ${occasionList.join(", ") || "any"}
Color/Pattern: ${colorPatternList.join(", ") || "any"}
Type: ${itemTypeList.join(", ")} / ${subtypeList.join(", ")}

Items:
${itemNames}
`;

    const replyResp = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a friendly fashion stylist assistant." },
        { role: "user", content: replyPrompt },
      ],
    });

    const reply = replyResp.choices[0].message.content.trim();

    // 4️⃣ Send response
    return res.status(200).json({
      filters: {
        style: styleList,
        occasion: occasionList,
        colorPattern: colorPatternList,
        itemType: itemTypeList,
        subtype: subtypeList,
      },
      results,
      reply
    });

  } catch (err) {
    console.error("🛑 GPT Fashion Search Error:", err.message);
    return res.status(500).json({
      message: "Fashion recommendation failed.",
      error: err.message,
    });
  }
};
