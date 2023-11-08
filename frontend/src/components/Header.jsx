import React from "react";
import Grid from "@mui/material/Grid";
import appIcon from "../../public/appIcon.png";
import madeByIcon from "../../public/madeByIcon.png";
import githubIcon from "../../public/githubIcon.png";

export default function Header() {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          item
          xs={12}
          sm={2}
          md={2}
          lg={1}
          xl={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img className="app-icon" src={appIcon} alt="App icon" />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="header">Feed Me</div>
        </Grid>

        <Grid item xs={12} sm={2} md={1} lg={1} xl={1}>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <a
              href="https://github.com/artiomtz/feed-me"
              target="_blank"
              rel="external"
            >
              <img className="link-icon" src={githubIcon} alt="App icon" />
            </a>
            <a href="http://artiomtsimk.in/" target="_blank" rel="external">
              <img className="link-icon" src={madeByIcon} alt="App icon" />
            </a>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
