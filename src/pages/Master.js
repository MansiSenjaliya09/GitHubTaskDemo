import * as React from 'react';
import { Container, Stack, Typography } from '@mui/material';

const Master = () => {
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Simple Page 1
          </Typography>
        </Stack>
      </Container>
    </>
  );
};

export default Master;
