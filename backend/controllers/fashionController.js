const Fashion = require('../models/fashionModel');

// Controller to create a new fashion item
exports.createFashionItem = async (req, res) => {
    try {
        const { name, category, description, imageUrl } = req.body;

        // Validate data if needed
        if (!name || !category) {
            return res.status(400).json({ message: 'Name and category are required' });
        }

        const newFashionItem = new Fashion({
            name,
            category,
            description,
            imageUrl,
        });

        await newFashionItem.save();
        res.status(201).json(newFashionItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating fashion item' });
    }
};

// Controller to get all fashion items
exports.getAllFashionItems = async (req, res) => {
    try {
        const fashionItems = await Fashion.find();
        res.status(200).json(fashionItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching fashion items' });
    }
};
