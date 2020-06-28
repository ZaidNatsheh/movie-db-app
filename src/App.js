import React,{useState} from 'react';
import Search from './components/Search';
import axios from 'axios'
import Results from './components/Results';
import Popup from './components/Popup';


function App() {
  const [state, setState] = useState({
    s: "",
    results : [],
    selected : {}
  })
   const apiurl ="https://www.omdbapi.com/?apikey=6b0098f7";
  // const apiurl = "http://www.omdbapi.com/?apikey=dfe6d885"
  const search = e => {
    if(e.key === "Enter"){
      axios(apiurl + "&s=" + state.s).then(({data}) => {
        let results = data.Search;

        setState(prevState =>{
          return { ...prevState, results: results }
        })
      })}
    }
  
    const openPopup = id => {
      axios(apiurl + "&i=" + id).then(({ data }) => {
        let result = data;
  
        console.log(result);
  
        setState(prevState => {
          return { ...prevState, selected: result }
        });
      });
    }
  
    const closePopup = () => {
      setState(prevState => {
        return { ...prevState, selected: {} }
      });
    }

  const handleInput = e =>{
    let s = e.target.value
    setState(prevState =>{
      return {...prevState, s : s}
    })

  }

  return (
    <div className="App">
      <header >
        <h1>Movie Database</h1>
        <main>
          <Search handleInput={handleInput} search={search}/>
          <Results results={state.results} openPopup={openPopup} />
          {/* <Popup selected={state.selected} closePopup={closePopup} />  */}

          {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}


        </main>
      </header>
    </div>
  );
}

export default App;
