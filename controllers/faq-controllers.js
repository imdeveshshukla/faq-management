import FAQ from '../models/faq-models.js';

import { translateText } from '../services/translation-services.js';
import cache from '../utils/cache.js';

const faqController = {
    async getFAQsByLang(req, res) {
        const lang = req.query.lang || "en";
        try {
            const cacheKey = `faqs:${lang}`;
            const cachedFAQs = await cache.get(cacheKey);
            if (cachedFAQs) {
                return res.json(cachedFAQs);
            }

            const faqs = await FAQ.find();

            if (!faqs.length) {
                return res.status(404).json({ message: "No FAQs found" });
            }
            
            const translatedFAQs = faqs.map((faq) => faq.getTranslation(lang));
            await cache.set(cacheKey, translatedFAQs);
            
            res.json(translatedFAQs);
        } catch (error) {
            console.error("Error fetching FAQs:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    async getAllFAQs(req, res) {
        try {
            const cachedFAQs = await cache.get(`faqs`);
            if (cachedFAQs) {
                return res.json(cachedFAQs);
            }

            const faqs = await FAQ.find();
            await cache.set(`faqs:`, faqs);
            
            res.json(faqs);
        } catch (error) {
            console.error("Error fetching all FAQs:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    async createFAQ(req, res) {
        try {
            const { question, answer } = req.body;
            const langs = ['hi', 'bn'];

            const translations = {};
            for (const lang of langs) {
                translations[lang] = {
                    question: await translateText(question, lang),
                    answer: await translateText(answer, lang)
                };
            }

            const faq = new FAQ({ question, answer, translations });
            await faq.save();
            
            await cache.del('faqs:*');
            res.json(faq);
        } catch (error) {
            console.error("Error creating FAQ:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    async deleteFAQ(req, res) {
        try {
            await FAQ.findByIdAndDelete(req.params.id);
            await cache.del('faqs:*');
            
            res.json({ message: 'FAQ deleted' });
        } catch (error) {
            console.error("Error deleting FAQ:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

export default faqController;
