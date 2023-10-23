import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { Box, darken, lighten } from "@mui/material";
import { useTheme } from "@emotion/react";

const CountryList = ({ handleRowClick, handleCellClick }) => {
  const [data, setData] = useState([]);
  const [filterModel, setFilterModel] = useState({ items: [] });
  const [sortModel, setSortModel] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not fetch , status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const newData = data.map((country) => {
          const newCountry = {
            id: country.altSpellings[0],
            name: country.name.common,
            flag: country.flags.png,
            region: country.region,
            capital:
              country.capital && country.capital[0]
                ? country.capital[0]
                : "unknown",
            population: country.population,
          };
          return newCountry;
        });

        setData(newData);
      })
      .catch((e) => console.log(e));

    const storedData = JSON.parse(localStorage.getItem("myDataKey")) || [];
    const storedFilterModel = JSON.parse(
      localStorage.getItem("filterModelKey")
    ) || { items: [] };
    const storedSortModel =
      JSON.parse(localStorage.getItem("sortModelKey")) || [];

    setData(storedData);
    setFilterModel(storedFilterModel);
    setSortModel(storedSortModel);
  }, []);

  const handleDataChange = (newData) => {
    localStorage.setItem("myDataKey", JSON.stringify(newData));
    setData(newData);
  };

  const handleFilterModelChange = (newFilterModel) => {
    localStorage.setItem("filterModelKey", JSON.stringify(newFilterModel));
    setFilterModel(newFilterModel);
  };

  const handleSortModelChange = (newSortModel) => {
    localStorage.setItem("sortModelKey", JSON.stringify(newSortModel));
    setSortModel(newSortModel);
  };

  const mode = useTheme().palette.mode;

  const getBackgroundColor = (color) =>
    mode === "dark" ? darken(color, 0.7) : lighten(color, 0.1);

  const columns = [
    {
      field: "id",
      cellClassName: "gridId",
      hide: true,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "name",
      headerName: "name",
      flex: 1,
      cellClassName: "gridName",

      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "population",
      headerName: "population",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "region",
      headerName: "region",
      cellClassName: "gridRegion",

      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "capital",
      headerName: "capital",
      cellClassName: "gridCapital",

      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "flag",
      headerName: "flag",
      renderCell: (params) => (
        <img
          src={params.row.flag}
          alt="Flag"
          style={{
            width: "40px",
            height: "30px",
            cursor: "pointer",
            border: "1px solid black",
          }}
        />
      ),
      align: "center",
      headerAlign: "center",
      minWidth: 150,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
  ];

  return (
    <Box
      sx={{
        position: "sticky",
        height: "100vh",
        width: "100%",
        overflow: "auto",
        "& .gridName": {
          backgroundColor: getBackgroundColor("#eeeeee"),
          fontWeight: 600,
        },
        "& .gridId": {
          backgroundColor: getBackgroundColor("#90a4ae"),
          fontFamily: "Rajdhani",
          fontWeight: 500,
          fontSize: "13px",
        },
        "& .gridRegion": {
          backgroundColor: getBackgroundColor("#bcaaa4"),
          fontFamily: "Bangers",
          fontSize: "18px",
        },
        "& .gridCapital": {
          backgroundColor: getBackgroundColor("#d1c4e9"),
          fontFamily: "Comfortaa Variable",
          fontWeight: 700,
          fontSize: "16px",
        },
        "& .MuiDataGrid-columnHeader": {
          fontSize: "18px",
        },
      }}
    >
      <DataGrid
        columns={columns}
        rows={data}
        rowHeight={100}
        maxRowHeight={300}
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
          sorting: {
            sortModel: [{ field: "name", sort: "asc" }],
          },
        }}
        pageSizeOptions={[10, 25, 100]}
        onRowClick={handleRowClick}
        onCellClick={handleCellClick}
        filterModel={filterModel}
        onFilterModelChange={handleFilterModelChange}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        onRowsChange={handleDataChange}
      ></DataGrid>
    </Box>
  );
};

export default CountryList;
