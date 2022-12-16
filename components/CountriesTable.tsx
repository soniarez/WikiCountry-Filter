import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Country } from '../types/rawCountriesDataType';

interface Column {
  id: 'region' | 'subregion' | 'country' | 'capital' | 'population' | "currency";
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
  {
    id: 'currency',
    label: 'currency',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  region: string;
  subregion: string;
  country: string;
  capital: string;
  population: number;
  currency: string;
}

const createData = (
  region: string,
  subregion: string,
  country: string,
  capital: string,
  population: number, 
  currency: string
): Data => {
  return { region, subregion, country, capital, population, currency };
};

type TableByRegionProps = {
  tableData: Country;
};


const CountriesTable = ({ tableData }: TableByRegionProps) => {
  const [rows, setRows] = useState<Data[]>([]);

  //console.log(tableData, "tableData")

  useEffect(() => {
    createRows(tableData);
  }, [tableData]);

  const createRows = (dataRow: any): void => {
    const rows = dataRow.map(row => {
      return createData(
        row.region,
        row.subregion,
        row.name,
        row.capital,
        row.population,
        row.currencies[0].name
      );
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
export default CountriesTable;
