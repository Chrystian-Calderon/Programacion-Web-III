import { useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from "@tanstack/react-table";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const TableData = ({ data, onEdit, onDelete }) => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    });
    const columns = useMemo(() => [
        {
            header: '#',
            cell: info => info.row.index + 1
        },
        {
          header: 'Título',
          accessorKey: 'title'
        },
        {
          header: 'Género',
          accessorKey: 'genre'
        },
        {
          header: 'Año de lanzamiento',
          accessorKey: 'realeseYear'
        },
        {
            header: 'Acciones',
            cell: ({ row }) => {
                const id = row.original.id_movie;
                return (
                    <>
                    <button
                        onClick={() => handleEdit(row.original)}
                        className="btn btn-warning btn-sm me-2"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => handleDelete(id)}
                        className="btn btn-danger btn-sm"
                    >
                        <MdDelete />
                    </button>
                    </>
                );
            }
        },
    ], []);
    const handleEdit = (movie) => {
        onEdit(movie);
    };

    const handleDelete = (id) => {
        onDelete(id);
    };
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination
        },
    });
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                        <th key={header.id} className="bg-dark text-white">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getPaginationRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </Table>
            <div className="d-flex gap-2 justify-content-center align-items-center">
                <Button
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </Button>
                <Button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </Button>
                <div className="d-flex justify-content-center gap-2">
                    {Array.from({ length: table.getPageCount() }).map((_, index) => (
                        <Button
                            key={index}
                            onClick={() => table.setPageIndex(index)}
                            variant={table.getState().pagination.pageIndex === index ? 'primary' : 'outline-primary'}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>
                <Button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </Button>
                <Button
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </Button>
                <select
                value={table.getState().pagination.pageSize}
                onChange={e => {
                    table.setPageSize(Number(e.target.value))
                }}
                >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                    {pageSize}
                    </option>
                ))}
                </select>
            </div>
        </>
    );
}

export default TableData;