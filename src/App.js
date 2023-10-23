import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from "./components/Header";

import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import CountryList from "./components/CountryList";
import PopupDetails from "./components/PopupDetails";
import PopupImg from "./components/PopupImg";

function App() {
  const [activeTheme, setActiveTheme] = useState("light");
  const [singleCountry, setSingleCountry] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isImgOpen, setIsImgOpen] = useState(false);
  const [flag, setFlag] = useState("");
  const theme = createTheme({
    palette: {
      mode: activeTheme,
    },
  });

  const handleRowClick = async (params, e) => {
    if (
      e.target.hasAttribute("data-field") &&
      e.target.getAttribute("data-field") === "flag"
    ) {
      return;
    }
    const { name } = params.row;
    console.log(name);
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not fetch , status: ${response.status}`);
        }
        return response.json();
      })
      .then((dat) => {
        const data = dat[0];
        const currentCountry = {
          alt: data.altSpellings,
          capital: data.capital ? data.capital : "unknown",
          flag: data.flags,
          population: data.population,
          currencies: data.currencies
            ? data.currencies
            : { cur: { name: "unknown" } },
          region: data.region,
          subregion: data.subregion ? data.subregion : "unknown",
          area: data.area,
          name: data.name.common,
        };
        setSingleCountry(currentCountry);
        setIsOpenModal(true);
      })
      .catch((e) => console.log(e));
  };

  const handleCellClick = (params, e) => {
    if (
      e.target.hasAttribute("data-field") &&
      e.target.getAttribute("data-field") === "flag"
    ) {
      setFlag(params.formattedValue);
      setIsImgOpen(true);
    }
  };

  const toggleTheme = () => {
    setActiveTheme(activeTheme === "light" ? "dark" : "light");
  };

  const toggleModal = () => {
    setIsOpenModal(false);
  };

  const closeImgModal = () => {
    setIsImgOpen(false);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header toggleTheme={toggleTheme} activeTheme={activeTheme} />
        <CountryList
          handleRowClick={handleRowClick}
          handleCellClick={handleCellClick}
        />
        {isOpenModal && (
          <PopupDetails
            isOpenModal={isOpenModal}
            toggleModal={toggleModal}
            {...singleCountry}
          />
        )}
        {isImgOpen && (
          <PopupImg
            isImgOpen={isImgOpen}
            closeImgModal={closeImgModal}
            flag={flag}
          />
        )}
      </ThemeProvider>
    </Box>
  );
}

export default App;
