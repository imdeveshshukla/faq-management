const FAQ = require('../models/faq-models');
const translationService = require('../services/translation-services');
const cache = require('../utils/cache');


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
        
        const cachedFAQs = await cache.get(`faqs`);
        if (cachedFAQs) {
                return res.json(cachedFAQs);
        }
        const faqs = await FAQ.find();

        await cache.set(`faqs:`, faqs);
        res.json(faqs);
    },

    async createFAQ(req, res) {
        const { question, answer } = req.body;
        const langs = ['hi', 'bn'];

        const translations = {};
        for (const lang of langs) {
        translations[lang] = {
            question: await translationService.translateText(question, lang),
            answer: await translationService.translateText(answer, lang)
        };
        }

        const faq = new FAQ({ question, answer, translations });
        await faq.save();
        
        await cache.del('faqs:*');
        res.json(faq);
    },

    async deleteFAQ(req, res) {
        await FAQ.findByIdAndDelete(req.params.id);
        await cache.del('faqs:*');
        res.json({ message: 'FAQ deleted' });
    }
};

module.exports = faqController;
