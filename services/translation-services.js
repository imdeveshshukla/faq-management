const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config();

const translate = new Translate({ key:process.env.GOOGLE_TRANSLATION_API_KEY });

async function translateText(text, targetLang) {
  try {
    const [translation] = await translate.translate(text, targetLang);
    return translation;
  } catch (error) {
    console.error('Language Translation error:', error?.message);
    console.log("-----check env file and also check that GOOGLE_TRANSLATION_API_KEY is correct-----")
    console.log("\n");
    return text;
  }
}

module.exports = { translateText };
