"use client"
import PathCard from "@/components/pathCards/pathCard";

import Image from "next/image";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ComparatorNav } from "@/lib/nav";
import { Grid } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function Home() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <PathCard />
      </ThemeProvider>
    </>
  );
}
