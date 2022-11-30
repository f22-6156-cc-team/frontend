import React, { useState, useEffect } from 'react'
import { getValidatedAddress } from '../../utils/api'

const AddressVerifier = () => {
  const [addressLines, setAddressLines] = useState([]);
  const [verifiedData, setVerifiedData] = useState([]);
  const [init, setInit]= useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`The address you entered was: ${addressLines}`);
    const data = getValidatedAddress(addressLines);
    data.then((value) => {
        setVerifiedData(value);
        value?.result?.verdict.validationGranularity === 'PREMISE' ? 
        alert(`Please use the suggested address: ${value.result.address.formattedAddress}`)
        : alert(`Please check your address again`);
    });
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