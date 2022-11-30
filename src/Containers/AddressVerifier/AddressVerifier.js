import React, { useState } from 'react'
import { getValidatedAddress } from '../../utils/api'

const AddressVerifier = () => {
  const [addressLines, setAddressLines] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`The address you entered was: ${addressLines}`);
    const rsp = getValidatedAddress(addressLines);
    console.log('handle', rsp);
    const verdict = rsp['result']['verdict']['validationGranularity'];
    if (verdict === 'PREMISE') {
        const verified = rsp['result']['address']['formattedAddress']
        alert(`Please use the suggested address: ${verified}`);
        // call put to update BE address info 
    } else {
        alert(`Please check your address again`);
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your listing address:
        <input 
          type="text" 
          value={addressLines}
          onChange={(e) => setAddressLines([e.target.value])}
        />
      </label>
      <input type="submit"/>
    </form>
  );
}

export default AddressVerifier;