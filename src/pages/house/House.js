import React, { useState } from "react";
import { getHouseList } from '../../context/HouseKeeperContext';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";

const datatableData = [
  ["Joe James", "Example Inc.", "Yonkers", "NY"],
  ["John Walsh", "Example Inc.", "Hartford", "CT"],
  ["Bob Herm", "Example Inc.", "Tampa", "FL"],
  ["James Houston", "Example Inc.", "Dallas", "TX"],
  ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
  ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
  ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
  ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
  ["Meral Elias", "Example Inc.", "Hartford", "CT"],
  ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
  ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
  ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
  ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
  ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
  ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
  ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
  ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

const useStyles = makeStyles(theme => ({
    tableOverflow: {
      overflow: 'auto'
    }
  }))
  
export default function House() {

    var houses = getHouseList();
    console.log(houses);
    
    const classes = useStyles();
    return (
        <>
        <PageTitle title="하우스" />
        <Grid container spacing={4}>
            <Grid item xs={12}>
            <MUIDataTable
                title="하우스 리스트"
                data={datatableData}
                columns={["하우스 이름", "등록날짜", "수정날짜", "수정"]}
                options={{
                    filterType: "checkbox",
                }}
            />
            </Grid>
            <Grid item xs={12}>
            <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                <Table data={mock.table} />
            </Widget>
            </Grid>
        </Grid>
        </>
    );
}