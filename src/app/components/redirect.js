// "use client";  // Ensure this is run client-side

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// const Redirect = () => {
//   const [isClient, setIsClient] = useState(false); // State to track if the component has mounted
//   const router = useRouter();

//   // Set the client-side flag to true once the component is mounted
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const goToPage = () => {
//     router.push('/import'); // Navigate to the import page
//   };

//   // Only render the button when on the client-side (i.e., after component has mounted)
//   if (!isClient) return null;

//   return <button onClick={goToPage}>Go to Import Page</button>;
// };

// export default Redirect;