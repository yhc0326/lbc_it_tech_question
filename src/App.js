import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';

import './App.css';

import MonthPicker from './components/monthPicker';
import Country from './components/country';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);

  const key = "d9658b9d-4f86-491f-bd67-86af0c547a5c";

  useEffect(() => {
    let mounted = true;

    axios.get(`https://www.lbcit.ca/demo/api/?key=${key}`).then(res => {
      console.log("Response from server", res);
      if(mounted) {
        setCategories(res.data.categories);
        setSeries(res.data.series);
      }

    }).catch(err => {
      console.log("Error while digesting response", err);
      alert("Oops, there is an error on the page! Please refresh the page!");
    });

    return () => mounted = false;
  }, []);

  const onSelectMonth = (month, index) => {
    console.log(month, `selected, index: ${index}`);
    setSelectedIndex(index);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="md">
          <MonthPicker
            categories={categories}
            onSelectMonth={onSelectMonth}
            selectedIndex={selectedIndex}
          />
          <Country
            series={series}
            selectedIndex={selectedIndex}
            selectedMonth={categories[selectedIndex]}
            categories={categories}
          />
        </Container>
      </header>
    </div>
  );
}

export default App;
