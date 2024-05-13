import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  styled,
  Container,
  Typography,
  Stack,
  Button,
  Tooltip,
  Dialog,
  Grid,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { subDays, format } from 'date-fns';

import './css/card.css';
import { NavLink } from 'react-router-dom';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

export default function DashboardAppPage() {
  const [data, setData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem('githubData'));
    return savedData || { date: '', noofdata: '' };
  });

  const [mydata, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = format(subDays(today, 1), 'yyyy-MM-dd');
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    localStorage.setItem('githubData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []); 
  const handleChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    handleClose();
  };

  const fetchData = () => {
    axios
      .get(
        `https://api.github.com/search/repositories?q=created:>${
          data.date || '2018-10-22'
        }&sort=stars&order=desc&per_page=${data.noofdata || 10}`
      )
      .then((response) => {
        setMyData(response.data.items);
        console.log(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Most Starred Github repos
          </Typography>
          <Button
            style={{ color: 'white', backgroundColor: '#3876BF' }}
            variant="contained"
            type="submit"
            onClick={handleClickOpen}
          >
            <FilterAltIcon />
          </Button>
        </Stack>

        {loading ? (
          <>
            <div className="loader" />
            <h1 className="text-center mt-5">Please select a filter.</h1>
          </>
        ) : (
          <div className="row gap-5 d-flex justify-content-center">
            {mydata.length === 0 ? (
              <Typography variant="body1">No data found.</Typography>
            ) : (
              mydata.map((val, index) => (
                <div className="Usercard col-sm-5" key={index}>
                  <div className="infos">
                    <img src={val.owner.avatar_url} alt="Avatar" className="image" />
                    <div className="info">
                      <div>
                        <Tooltip title={val.name}>
                          <p
                            className="name"
                            style={{
                              maxWidth: '200px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {val.name}
                          </p>
                        </Tooltip>
                        <Tooltip title={val.description}>
                          <p
                            className="function"
                            style={{
                              maxWidth: '200px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {val.description}
                          </p>
                        </Tooltip>
                      </div>
                      <div className="stats">
                        <p className="flex flex-col">
                          watchers
                          <span className="state-value">{val.watchers_count}</span>
                        </p>
                        <p className="flex">
                          forks
                          <span className="state-value">{val.forks}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <NavLink to={`/dashboard/d/${val.owner.login}`}>
                    <button className="request" type="button">
                      Show More
                    </button>
                  </NavLink>
                </div>
              ))
            )}
          </div>
        )}
      </Container>


      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <ValidatorForm onSubmit={handleSubmit} onError={() => null} autoComplete="off">
            <Grid container spacing={8}>
              <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
                  Filter data
                </h4>
                <TextField
                  type="date"
                  name="date"
                  label="Assignment Due Date"
                  InputLabelProps={{ shrink: true }}
                  value={data.date || ''}
                  onChange={handleChange}
                  validators={['required']}
                  inputProps={{ max: currentDate }}
                  errorMessages={['this field is required']}
                />
                <TextField
                  type="number"
                  name="noofdata"
                  id="standard-basic"
                  value={data.noofdata || ''}
                  onChange={handleChange}
                  label="No of data "
                  validators={['required', 'minNumber:1', `maxNumber:20`]}
                  errorMessages={[
                    'This field is required',
                    'Value must be greater than or equal to 1....👆',
                    'Value must be less than or equal to 20....👆',
                  ]}
                />
              </Grid>
            </Grid>
            <div className="container">
              <Button color="primary" variant="contained" type="submit" fullWidth>
                <SendIcon />
                <span> Submit</span>
              </Button>
            </div>
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button className="btn btn-outline-danger" onClick={handleClose}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
