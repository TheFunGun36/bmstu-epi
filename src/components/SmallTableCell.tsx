import { TableCell } from "@mui/material";
import { PropsWithChildren } from "react";

export interface SmallTableCellProps {
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    p?: number;
    pl?: number;
    pr?: number;
}

export function SmallTableCell(p: PropsWithChildren<SmallTableCellProps>) {
    return (
        <TableCell
            sx={{ padding: p.p || 0.5, pl: p.pl, pr: p.pr }}
            align={p.align}
        >
            {p.children}
        </TableCell>);
}

export default SmallTableCell;
