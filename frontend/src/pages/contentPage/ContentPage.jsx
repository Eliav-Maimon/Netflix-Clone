import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import SliderList from '../../components/Shared/SliderList/SliderList';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS, MY_LIST } from '../../reducers/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Billboard from '../../components/Shared/Billboard/Billboard';
import Loading from '../../components/Shared/Loading/Loading';

const ContentPage = () => {
    let includeMyList, apiEndpoint;
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo, loading } = state;
    const [myList, setMyList] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [content, setContent] = useState([]);
    const [billboardData, setBillboardData] = useState();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)
    let cancel

    const getContent = async () => {
        if (content.length <= 0) {
            ctxDispatch({ type: GET_REQUEST });
        }

        if(!hasMore)
            return

        try {
            const { data } = await axios.get(`${apiEndpoint}?page=${page}&limit=3`, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
                cancelToken: new axios.CancelToken(c => cancel = c)
            });

            setContent(prevContent => [...prevContent, ...data.result]);
            setHasMore(data.next ? true : false)

            if (includeMyList) {
                const myListFromDB = await axios.get(`/api/v1/content/myList/${userInfo['_id']}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                setMyList([myListFromDB.data])
                ctxDispatch({ type: MY_LIST, payload: myListFromDB.data })
            }

            ctxDispatch({ type: GET_SUCCESS, payload: data.result });
        } catch (err) {
            if (axios.isCancel(err)) return
            ctxDispatch({ type: GET_FAIL, payload: err });
            console.error(err);
            navigate("/signin");
        }
    };

    useEffect(() => {
        if (!userInfo) {
            navigate("/signin");
        } else if (hasMore) {
            if (location.pathname === "/") {
                includeMyList = true;
                apiEndpoint = "/api/v1/content/";
            }
            else if (location.pathname === '/movies') {
                includeMyList = false;
                apiEndpoint = "/api/v1/content/movies"
            }
            else if (location.pathname === '/series') {
                includeMyList = false;
                apiEndpoint = "/api/v1/content/series"
            }

            getContent();

            return () => {
                if (cancel)
                    cancel()
            }
        }
    }, [page]);

    useEffect(() => {
        if (!billboardData) {
            putRandomContentInBillboard();
        }
    }, [content.length])

    useEffect(() => {
        if (myList && userInfo && userInfo.myList) {
            setMyList([userInfo.myList])
        }
    }, [userInfo?.myList])

    const putRandomContentInBillboard = () => {
        if (!content || content.length == 0) {
            return;
        }
        const newRandomNumber = Math.floor(Math.random() * (content.length));
        if (content[newRandomNumber].contentList) {
            const randomInList = Math.floor(Math.random() * (content[newRandomNumber].contentList.length));
            setBillboardData(content[newRandomNumber].contentList[randomInList]);
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight || loading) return
        console.log('in bottom page')
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    // }, [loading]); // Add/remove event listener based on loading state


    return (
        loading ? <Loading /> : (
            <div style={{ overflow: "hidden" }}>
                <Billboard item={billboardData} />
                {myList &&
                    <SliderList contentList={myList} />
                }
                <SliderList contentList={content} />
            </div>
        )
    );
};

export default ContentPage;