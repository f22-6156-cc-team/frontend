import Listing from '../Listing/Listing';
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
        <Listing/>
      </Box>
      
    </div>
  );
}

export default LandingPage;