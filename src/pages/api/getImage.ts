import { NextApiRequest, NextApiResponse } from "next";
const axios = require('axios');
const cheerio = require('cheerio');

export default async function csComp(req: NextApiRequest, res: NextApiResponse) {
    
    const url = `https://steamcommunity.com/sharedfiles/filedetails/?id=3084291314`

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
    
        // Extract the image URL
        const imageUrl = $('meta[property="og:image"]').attr('content');
        return res.status(200).json(imageUrl)
      } catch (error) {
        console.error('Error fetching the page:', error);
        return res.status(500).json({err: error})
      }
}



