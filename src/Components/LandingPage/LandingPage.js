import Nav from '../Nav/Nav';
import ListingContainer from '../ListingContainer/ListingContainer';
import Box from '@mui/material/Box';

function LandingPage() {
  return (
    <div>
      <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}>
        <ListingContainer/>
      </Box>
      
    </div>
  );
}

export default LandingPage;