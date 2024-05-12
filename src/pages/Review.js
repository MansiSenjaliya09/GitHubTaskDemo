import * as React from 'react';
import { Container, Stack, Typography } from '@mui/material';

export default function Review() {
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Simple Page 2
          </Typography>
        </Stack>
      </Container>
    </>
  );
}
