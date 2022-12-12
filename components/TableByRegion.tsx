import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'region' | 'subregion' | 'country' | 'capital' | 'population';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'region', label: 'Region', minWidth: 170 },
  { id: 'subregion', label: 'Subregion', minWidth: 170 },
  { id: 'country', label: 'Country', minWidth: 100 },
  {
    id: 'capital',
    label: 'Capital',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

interface Data {
  region: string;
  subregion: string;
  country: string;
  capital: string;
  population: number,
}

const createData = (
  region: string,
  subregion: string,
  country: string,
  capital: string, 
  population: number,
): Data => {
  return { region, subregion, country, capital, population };
};

type TableByRegionProps = {
  rawCountriesData: any[];
  selectedRegion: string;
}

const TableByRegion = ({ rawCountriesData, selectedRegion } : TableByRegionProps) => {
  const [rows, setRows] = useState<Data[]>([]);
 
  //console.log(rawCountriesData, "rawCountriesData")
  useEffect(() => {
    if (selectedRegion) {
        const filteredData = rawCountriesData.filter(
          item => item.region === selectedRegion
        );
        //console.log(filteredData, "filteredData")
        createRows(filteredData);
      }    
  }, [rawCountriesData, selectedRegion]);


  const createRows = (dataRow:any) : void => {
    const rows = dataRow.map(row => {
      return createData(row.region, row.subregion, row.name, row.capital, row.population);
    });
    setRows(rows);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default TableByRegion;
