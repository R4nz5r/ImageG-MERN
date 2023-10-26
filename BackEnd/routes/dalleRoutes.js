import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const aiResponse = await openai.completions.create({
      prompt,
       
      n: 1, // Number of completions
      size: '1024x1024',
      response_format: 'b64_json',
    });
    
    const generatedImage = aiResponse.choices[0].text;
    
    res.status(200).json({ photo: generatedImage });
    
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;
