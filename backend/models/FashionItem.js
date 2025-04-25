// models/FashionItem.js

const mongoose = require("mongoose");

// 1. Enums
const STYLE_ENUM = [
  "chic", "sporty", "bohemian", "minimalist", "vintage",
  "casual", "formal", "edgy", "romantic", "preppy"
];

const ITEM_TYPE_DEFINITION = [
  {
    type: "clothing",
    subtypes: ["dress", "jacket", "jeans", "t-shirt", "blouse", "skirt", "shorts", "coat", "sweater", "hoodie"]
  },
  {
    type: "accessory",
    subtypes: ["belt", "bag", "scarf", "hat", "watch", "jewelry", "shoes"]
  }
];

const ITEM_TYPE_ENUM = ITEM_TYPE_DEFINITION.map(o => o.type);
const SUBTYPE_ENUM = ITEM_TYPE_DEFINITION.flatMap(o => o.subtypes);

const OCCASION_ENUM = [
  "summer", "winter", "spring", "fall",
  "office", "brunch", "party", "beach", "workout", "formal event"
];

const COLOR_PATTERN_ENUM = [
  "solid", "striped", "floral", "plaid", "polka dot",
  "animal print", "pastel", "bright", "navy", "monochrome"
];

// 2. Schema
const FashionItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    text: true
  },
  description: {
    type: String,
    default: "",
    trim: true,
    text: true
  },
  itemType: {
    type: String,
    enum: ITEM_TYPE_ENUM,
    required: true
  },
  subtype: {
    type: String,
    enum: SUBTYPE_ENUM,
    required: true
  },
  style: {
    type: String,
    enum: STYLE_ENUM,
    required: true
  },
  occasion: {
    type: String,
    enum: OCCASION_ENUM,
    required: true
  },
  colorPattern: {
    type: String,
    enum: COLOR_PATTERN_ENUM,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    default: ""
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// 3. Indexes
FashionItemSchema.index({ itemType: 1, subtype: 1, style: 1, occasion: 1, colorPattern: 1 });
FashionItemSchema.index({ name: "text", description: "text" });

// 4. Export model
module.exports = mongoose.model("FashionItem", FashionItemSchema);
