// controllers/listController.js
import List from '../models/list.model.js';

export class ListController {
    static async create(req, res) {
        try {
            const { label } = req.body;
            const newList = await List.create({ label });
            res.status(201).json(newList);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { label } = req.body;
            const list = await List.findByPk(id);
            if (list) {
                await list.update({ label });
                res.json(list);
            } else {
                res.status(404).json({ error: 'List not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async toggleArchive(req, res) {
        try {
            const { id } = req.params;
            const { is_archived } = req.body; // Expected: { "is_archived": true } or { "is_archived": false }
            const list = await List.findByPk(id);
            if (list) {
                await list.update({ is_archived });
                res.json({ message: `List has been ${is_archived ? 'archived' : 'unarchived'}.` });
            } else {
                res.status(404).json({ error: 'List not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const list = await List.findByPk(id);
            if (list) {
                await list.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'List not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async findAll(req, res) {
        try {
            const lists = await List.findAll();
            res.json(lists);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async findOne(req, res) {
        try {
            const { id } = req.params;
            const list = await List.findByPk(id, {
                include: ['gifts'],
            });
            if (list) {
                res.json(list);
            } else {
                res.status(404).json({ error: 'List not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async findActive(req, res) {
        try {
            const activeLists = await List.findAll({
                where: { is_archived: false },
                include: ['gifts'],
            });
            res.json(activeLists);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default ListController;
