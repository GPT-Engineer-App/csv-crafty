import React, { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import { CSVLink } from 'react-csv';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus, Download } from 'lucide-react';

const Index = () => {
  const [csvData, setCSVData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const { CSVReader } = useCSVReader();

  const handleUpload = (results) => {
    const { data } = results;
    setHeaders(data[0]);
    setCSVData(data.slice(1));
  };

  const handleEdit = (rowIndex, colIndex, value) => {
    const newData = [...csvData];
    newData[rowIndex][colIndex] = value;
    setCSVData(newData);
  };

  const handleAddRow = () => {
    const newRow = new Array(headers.length).fill('');
    setCSVData([...csvData, newRow]);
  };

  const handleDeleteRow = (rowIndex) => {
    const newData = csvData.filter((_, index) => index !== rowIndex);
    setCSVData(newData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">CSV Editor</h1>
      
      <CSVReader onUploadAccepted={handleUpload}>
        {({ getRootProps }) => (
          <div className="mb-4">
            <Button {...getRootProps()} variant="outline">
              Upload CSV
            </Button>
          </div>
        )}
      </CSVReader>

      {csvData.length > 0 && (
        <>
          <div className="overflow-x-auto mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {csvData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, colIndex) => (
                      <TableCell key={colIndex}>
                        <Input
                          value={cell}
                          onChange={(e) => handleEdit(rowIndex, colIndex, e.target.value)}
                          className="w-full"
                        />
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        onClick={() => handleDeleteRow(rowIndex)}
                        variant="ghost"
                        size="icon"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between mb-4">
            <Button onClick={handleAddRow} variant="outline">
              <Plus className="h-4 w-4 mr-2" /> Add Row
            </Button>
            <CSVLink
              data={[headers, ...csvData]}
              filename="edited_data.csv"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              <Download className="h-4 w-4 mr-2" /> Download CSV
            </CSVLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
