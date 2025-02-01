import { v2 } from '@google-cloud/translate';

const { Translate } = v2;
import dotenv from 'dotenv';

dotenv.config();

const translate = new Translate({ key: process.env.GOOGLE_TRANSLATION_API_KEY });

export async function translateText(text, targetLang) {
  try {
    const [translation] = await translate.translate(text, targetLang);
    return translation;
  } catch (error) {
    console.error('Language Translation error:', error?.message);
    console.log("----- Check your .env file and ensure GOOGLE_TRANSLATION_API_KEY is correct -----\n");
    return text;
  }
}
