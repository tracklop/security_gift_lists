// controllers/giftController.js
import Gift from '../models/gift.model.js';

export class GiftController {
    static async create(req, res) {
        try {
            const { label, current_price, original_price, is_reserved = false } = req.body;
            const newGift = await Gift.create({ label, current_price, original_price, is_reserved });
            res.status(201).json(newGift);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { label, current_price } = req.body;
            const gift = await Gift.findByPk(id);
            if (gift) {
                await gift.update({ label, current_price });
                res.json(gift);
            } else {
                res.status(404).json({ error: 'Gift not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const gift = await Gift.findByPk(id);
            if (gift) {
                await gift.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Gift not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async toggleReservation(req, res) {
        try {
            const { id } = req.params;
            const { reserve } = req.body; // Expected to be a boolean

            const gift = await Gift.findByPk(id);
            if (!gift) {
                return res.status(404).json({ error: 'Gift not found' });
            }

            await gift.update({ is_reserved: reserve });
            res.json({ message: `Gift has been ${reserve ? 'reserved' : 'reservation cancelled'}.` });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async updatePrice(req, res) {
        try {
            const { id } = req.params;
            const { current_price } = req.body;
            const gift = await Gift.findByPk(id);
            if (gift) {
                await gift.update({ current_price });
                res.json(gift);
            } else {
                res.status(404).json({ error: 'Gift not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async findAll(req, res) {
        try {
            const gifts = await Gift.findAll();
            res.json(gifts);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async findOne(req, res) {
        try {
            const { id } = req.params;
            const gift = await Gift.findByPk(id);
            if (gift) {
                res.json(gift);
            } else {
                res.status(404).json({ error: 'Gift not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default GiftController;
