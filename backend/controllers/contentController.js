import Content from '../models/Content.js'
import User from '../models/User.js';
import FeaturedContents from '../models/FeaturedContents.js';

export const getContents = async (req, res) => {
    const content = await Content.find({});
    res.send(content);
}

//info
export const getContentById = async (req, res) => {
    const { id } = req.params;

    const content = await Content.findById(id);
    res.send(content);
}

// export const getMovies = async (req, res) => {
//     const movies = await Content.find({ isSeries: false });
//     res.send(movies);
// }

// export const getSeries = async (req, res) => {
//     const series = await Content.find({ isSeries: true });
//     res.send(series);
// }
export const getAll = async (req, res) => {
    const content = await FeaturedContents.find({}).populate('contentList');
    res.send(content);
}

export const getMovies = async (req, res) => {
        const movies = await FeaturedContents.find({ isSeries: false }).populate('contentList');
        res.send(movies);
}
export const getSeries = async (req, res) => {
    const series = await FeaturedContents.find({ isSeries: true }).populate('contentList');
    res.send(series);
}







export const getCategories = async (req, res) => {
    const categories = await Content.find().distinct("genre");
    res.send(categories);
}

export const getMyList = async (req, res) => {
    const { id } = req.params;
    console.log('id: ', id)
    try {
        const user = await User.findById(id).populate('contentList');
        console.log('contentList: ', user.contentList)
        res.send(user.contentList);
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
        // res.status(202).send('Added to the list successfully');
    }
    else{
        res.status(409).send(`This movie already in your list`);
    }
}

export const removeFromMyList = async (req, res) => {
    const { userId, contentId } = req.body;
    console.log("userid: " + userId + " contentId: " + contentId);
    const user = await User.findById(userId);
    console.log("user" , user);
    const content = await Content.findById(contentId);
    console.log("content" , content);
    const index = user.contentList.indexOf(content._id);
    console.log("index", index)
    if (index > -1) {
        user.contentList.splice(index, 1);
        await user.save();
        // res.status(202).send('Content removes from the list successfully');
        res.status(202).send(content);
    }
    else{
        res.status(404).send('The given content was not found in your list')
    }
}

export const getMoviesWithGenre = async (req, res) => {
    
}