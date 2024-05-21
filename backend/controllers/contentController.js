import Content from '../models/Content.js'
import User from '../models/User.js';
import FeaturedContents from '../models/FeaturedContents.js';

export const getContent = async (req, res) => {
    res.send(res.paginatedResults)
}

export const getMovies = async (req, res) => {
    const movies = await FeaturedContents.find({ isSeries: false }).populate('contentList');
    res.send(movies);
}

export const getSeries = async (req, res) => {
    const series = await FeaturedContents.find({ isSeries: true }).populate('contentList');
    res.send(series);
}

export const getMyList = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).populate('contentList');
        const contentList = { name: "My List", contentList: user.contentList };
        res.send(contentList);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export const addToMyList = async (req, res) => {
    const { userId, contentId } = req.body;
    const user = await User.findById(userId);
    const content = await Content.findById(contentId);
    const index = user.contentList.indexOf(content['_id']);
    if (index === -1) {
        user.contentList.push(content);
        await user.save();
        res.status(202).send(content);
    }
    else {
        res.status(409).send(`This movie already in your list`);
    }
}

export const removeFromMyList = async (req, res) => {
    const { userId, contentId } = req.body;
    const user = await User.findById(userId);
    const content = await Content.findById(contentId);
    const index = user.contentList.indexOf(content._id);
    if (index > -1) {
        user.contentList.splice(index, 1);
        await user.save();
        res.status(202).send(content);
    }
    else {
        res.status(404).send('The given content was not found in your list')
    }
}

export const getContentByQuery = async (req, res) => {

    try {
        const { q } = req.query;
        if (q === "") {
            const result = await Content.find({});
            res.status(200).send(result);
        } else if (!q) {
            return res.status(400).send({ error: 'Query parameter "q" is required.' });
        } else {
            const result = await Content.find({ title: { $regex: new RegExp(q, 'i') } });

            if (!result) {
                return res.status(404).send({ message: 'No content found with the specified title.' });
            }

            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

export const getContentById = async (req, res) => {
    const { id } = req.params;

    const content = await Content.findById(id);
    res.send(content);
}

export const getCategories = async (req, res) => {
    const categories = await Content.find().distinct("genre");
    res.send(categories);
}