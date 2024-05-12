import * as React from 'react';
import { Container, Stack, Typography, Tooltip, Button } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import './css/pcard.css';

export default function UserP2() {
  const { name } = useParams();
  const [mydata, setMyData] = React.useState([]);
  const [follower, setfollower] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`https://api.github.com/users/${name}`)
      .then((response) => {
        setMyData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  React.useEffect(() => {
    axios
      .get(`https://api.github.com/users/${name}/followers`)
      .then((response) => {
        setfollower(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const breadcrumbs = [
    <NavLink to="/" underline="hover" key="1" color="inherit">
      Home
    </NavLink>,
    <Typography key="3" color="text.primary">
      User Profile
    </Typography>,
  ];

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User Profile
          </Typography>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <div className="container mt-5 mb-5">
          <div className="row no-gutters">
            <div className="col-md-4 col-lg-4">
              <img src={mydata.avatar_url} alt="img" />
            </div>
            <div className="col-md-8 col-lg-8">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                  <h3 className="display-5">{mydata.login}</h3>
                  <i className="fa fa-facebook" /> <i className="fa fa-google" /> <i className="fa fa-youtube-play" />{' '}
                  <i className="fa fa-dribbble" /> <i className="fa fa-linkedin" />
                </div>
                <div className="p-3 bg-black text-white">
                  <h6>
                    followers : {mydata.followers} | following : {mydata.following}
                  </h6>
                </div>
                <div className="mt-4">
                  <a href={mydata.html_url} target="_blank" rel="noreferrer">
                    <Button variant="contained">GitHub</Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <Typography variant="h4" gutterBottom>
          followers :
        </Typography>
      </Container>
      <div className="row gap-5 d-flex justify-content-center">
        {follower.map((val, index) => (
          <div className="Usercard col-sm-5" key={index}>
            <div className="infos">
              <img src={val.avatar_url} alt="Avatar" className="image" />
              <div className="info">
                <div>
                  <Tooltip title={val.login}>
                    <p
                      className="name"
                      style={{
                        maxWidth: '200px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {val.login}
                    </p>
                  </Tooltip>
                  <Tooltip title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, nesciunt?">
                    <p
                      className="function"
                      style={{
                        maxWidth: '200px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, nesciunt?
                    </p>
                  </Tooltip>
                </div>

                <a href={mydata.html_url} target="_blank" rel="noreferrer">
                  <Button variant="contained">GitHub</Button>
                </a>
              </div>
            </div>
            <NavLink to={`/dashboard/f/${val.login}`}>
              <button className="request" type="button">
                Show More
              </button>
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
}
