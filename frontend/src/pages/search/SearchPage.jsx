import axios from 'axios';
import Title from '../../components/Shared/Title'
import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import Card from '../../components/Shared/Card/Card';
import NavBar from '../../components/Shared/NavBar/NavBar';
import './search.css'

const SearchPage = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  // const q = searchParams.get("q");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [currentData, setCurrentData] = useState();
  const [inputData, setInputData] = useState();

  console.log(search)
  console.log(currentData)
  useEffect(() => {

    const getContent = async () => {
      try {
        // console.log("search (Page)", search)

        const { data } = await axios.get(`api/v1/content/search${search}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        // console.log("data", data);
        setCurrentData(data);
        console.log("currentData ", currentData)
        
        
        setInputData(search.split('=')[1]);
        // console.log(search.split('='))

      }
      catch (error) {
        console.log(error)
      }
    }

    getContent();

  }, [search])



  if (currentData == null) {
    return null;
  }

  return (
    <div className='containerInSearch'>
      {/* <Title title={"Search Page"} /> */}
      {/* <NavBar></NavBar>  */}
      {/* <div className='containerInSearch'> */}
        <br />
        <div>
        <h1>Showing results found for "{inputData}"</h1>
          {currentData && currentData.length > 1 && currentData.map((item, index) => (
            <Card item={item} key={index}></Card>
          ))
          }
          {currentData && currentData.length === 1 &&
            <Card item={currentData}></Card>
          }
        </div>
      {/* </div> */}


    </div>
  )
}

export default SearchPage