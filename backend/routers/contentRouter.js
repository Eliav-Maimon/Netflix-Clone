import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { getContentByQuery, addToMyList, removeFromMyList, getContentById, getMovies, getSeries, getMyList, getContent } from '../controllers/contentController.js';
import { isAuth, paginatedResults } from '../utils.js';
import Content from '../models/Content.js';
import FeaturedContents from '../models/FeaturedContents.js';

const contentRouter = express.Router();

contentRouter.get("/", isAuth, paginatedResults(FeaturedContents, null, 'contentList'), expressAsyncHandler(getContent));
contentRouter.get("/movies", isAuth, paginatedResults(FeaturedContents, { isSeries: false }, 'contentList'), expressAsyncHandler(getContent));
contentRouter.get("/series", isAuth, paginatedResults(FeaturedContents, { isSeries: true }, 'contentList'), expressAsyncHandler(getContent));
// contentRouter.get("/getContents", isAuth, paginatedResults(Content), expressAsyncHandler(getContents));
// contentRouter.get("/movies", isAuth, paginatedResults(FeaturedContents, { isSeries: false }, 'contentList'), expressAsyncHandler(getMovies));
// contentRouter.get("/series", isAuth, expressAsyncHandler(getSeries));
contentRouter.post("/add", isAuth, expressAsyncHandler(addToMyList));
contentRouter.post("/remove", isAuth, expressAsyncHandler(removeFromMyList));
contentRouter.get("/search", isAuth, expressAsyncHandler(getContentByQuery));
contentRouter.get("/myList/:id", isAuth, expressAsyncHandler(getMyList));
contentRouter.get("/getById/:id", isAuth, expressAsyncHandler(getContentById));

export default contentRouter;