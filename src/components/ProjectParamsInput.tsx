import { Divider, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import projectParams from '../json/projectParams.json';
import { useEffect, useState } from 'react';
import { SmallTableCell as TC } from './SmallTableCell';
import { PROJECT_PARAM_MAX_VALUE, PROJECT_PARAM_MIN_VALUE, ProjectParam } from '../model/ProjectParam';
import NumericSelector from './NumericSelector';
import { readable } from '../model/Misc';

export interface ProjectParamsInputProps {
    fp: number;
    nfp: number;
    setNfp: (nfp: number) => void;
}

function ProjectParamsInput(props: ProjectParamsInputProps) {
    const updateNfp = (params: ProjectParam[]) => {
        const paramsSum = params.map(e => e.value).reduce((a, b) => a + b, 0);
        const c = 0.65 + 0.01 * paramsSum;
        props.setNfp(c * props.fp);
    };

    const [params, setParams] = useState<ProjectParam[]>(
        projectParams.map((e): ProjectParam => ({ ...e })));

    const onValueChange = (index: number, value: number) => {
        const res = params.map((v): ProjectParam => ({ ...v }));
        res[index].value = value;
        updateNfp(res);
        setParams(res);
    };

    useEffect(() => updateNfp(params), [props.fp]);

    return (
        <TableContainer component={Paper}>
            <Typography variant='h5' align='center'>
                Параметры проекта
            </Typography>
            <Divider />
            <Table>
                <TableHead>
                    <TableRow>
                        <TC><b>Наименование</b></TC>
                        <TC><b>Значение</b></TC>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {params.map((value, index) => {
                        return (
                            <TableRow key={`project-param${index}`}>
                                <TC>{value.displayName}</TC>
                                <TC>
                                    <NumericSelector
                                        minVal={PROJECT_PARAM_MIN_VALUE}
                                        maxVal={PROJECT_PARAM_MAX_VALUE}
                                        setValue={n => onValueChange(index, n)}
                                        value={params[index].value}
                                    />
                                </TC>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
      <Typography align='center'>
        <b>Нормированное число функциональных точек:</b> {readable(props.nfp)}
      </Typography>
        </TableContainer>
    );
}

export default ProjectParamsInput;
