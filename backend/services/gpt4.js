const axios = require('axios');

// Function to fetch fashion search results using GPT-4
exports.fetchFashionSearchResults = async (query) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-4',  // Replace with your model ID
            prompt: query,
            max_tokens: 100,
        });

        return response.data.choices[0].text;
    } catch (err) {
        console.error('Error fetching GPT-4 response: ', err);
        throw new Error('Failed to fetch search results');
    }
};
