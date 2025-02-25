// import React, { useEffect, useState } from 'react';
// import { ChevronLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const UserProfile = () => {
//   const navigate = useNavigate();

//   // State for user data and errors
//   const [user, setUser] = useState({
//     name: '',
//     mobile: '',
//     email: '',
//     dob: '',
//     image: '',
//     address: '',
//     address1: ''
//   });

//   const [errors, setErrors] = useState({
//     name: '',
//     address: '',
//     dob: '',
//     mobile: '',
//     address1: ''
//   });

//   const [previewImage, setPreviewImage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   // Calculate age from date of birth
//   const calculateAge = (birthDate) => {
//     const today = new Date();
//     const birth = new Date(birthDate);
//     let age = today.getFullYear() - birth.getFullYear();
//     const monthDiff = today.getMonth() - birth.getMonth();

//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
//       age--;
//     }
//     return age;
//   };

//   // Validation rules
//   const validateField = (name, value) => {
//     let errorMessage = '';
//     switch (name) {
//       case 'name':
//         if (value.length < 2) {
//           errorMessage = 'Name must be at least 2 characters long';
//         } else if (value.length > 25) {
//           errorMessage = 'Name cannot exceed 25 characters';
//         }
//         break;
//       case 'address':
//         if (value.length > 150) {
//           errorMessage = 'Address cannot exceed 100 characters';
//         }
//         break;
//       case 'dob':
//         if (!value) {
//           errorMessage = 'Date of birth is required';
//         } else {
//           const age = calculateAge(value);
//           if (age < 13) {
//             errorMessage = 'You must be at least 13 years old to use this service';
//           }
//         }
//         break;
//       default:
//         break;
//     }
//     return errorMessage;
//   };

//   // Handle input change with validation
//   const handleInputChange = (field, value) => {
//     setUser({ ...user, [field]: value });

//     // Validate fields that have constraints
//     if (['name', 'address', 'dob', 'mobile', 'address1'].includes(field)) {
//       const errorMessage = validateField(field, value);
//       setErrors(prev => ({ ...prev, [field]: errorMessage }));
//     }
//   };

//   // Fetch user data from API
//   useEffect(() => {
//     const fetchUser = async () => {
//       const user_id = localStorage.getItem('id');
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/getuser/${user_id}`);
//         const userData = response.data.user;

//         setUser({
//           name: userData.first_name,
//           email: userData.email1,
//           dob: userData.dob,
//           mobile: userData.mobile,
//           image: userData.image || '',
//           address: userData.address,
//           address1: userData.address1,
//           id: user_id
//         });

//         // Validate age when loading user data
//         if (userData.dob) {
//           const dobError = validateField('dob', userData.dob);
//           setErrors(prev => ({ ...prev, dob: dobError }));
//         }

//         setPreviewImage(userData.image || '');
//         setLoading(false);
//       } catch (err) {
//         console.error('Failed to fetch user ', err);
//         setError('Failed to load user data.');
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Handle image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     setUser({ ...user, profileImage: file });
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   // Handle form submission with validation
//   const handleSubmit = async () => {
//     // Validate all fields before submission
//     const nameError = validateField('name', user.name);
//     const addressError = validateField('address', user.address);
//     const address1Error = validateField('address1', user.address1);
//     const dobError = validateField('dob', user.dob);
//     const mobileError = validateField('mobile', user.mobile);

//     setErrors({
//       name: nameError,
//       address: addressError,
//       address1: address1Error,
//       dob: dobError,
//       mobile: mobileError
//     });

//     // Check if there are any validation errors
//     if (nameError || addressError || dobError || mobileError || address1Error) {
//       toast.error('Please fix the validation errors before submitting');
//       return;
//     }

//     const formData = new FormData();
//     Object.keys(user).forEach((key) => {
//       formData.append(key, user[key]);
//     });

//     try {
//       await axios.post(`${process.env.REACT_APP_API_BASE_URL}/update/`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       toast.success('Profile updated successfully!');
//         navigate('/')

//       // Clear success message after 3 seconds
//       setTimeout(() => {
//         setSuccessMessage('');
//       }, 3000);
//     } catch (err) {
//       console.error('Failed to update user data:', err);
//       setError('Failed to update profile.');
//       toast.error('Failed to update profile');
//     }
//   };

//   // Render form fields with specific conditions
//   const renderFormField = (field) => {
//     const isReadOnly = field === 'email';

//     if (field === 'dob') {
//       return (
//         <div>
//           <input
//             type="date"
//             value={user.dob}
//             onChange={(e) => handleInputChange(field, e.target.value)}
//             className={`w-full p-3 border rounded-lg ${errors.dob ? 'border-red-500' : ''}`}
//             max={new Date().toISOString().split('T')[0]} // Prevent future dates
//           />
//           {errors.dob && (
//             <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
//           )}
//         </div>
//       );
//     }

//     return (
//       <div>
//         <input
//           type="text"
//           value={user[field] || ''}
//           onChange={(e) => handleInputChange(field, e.target.value)}
//           className={`w-full p-3 border rounded-lg ${isReadOnly ? 'bg-gray-100' : ''} 
//             ${errors[field] ? 'border-red-500' : ''}`}
//           readOnly={isReadOnly}
//           maxLength={field === 'name' ? 25 : field === 'address' ? 100 : undefined}
//           placeholder={`Enter your ${field}`}
//         />
//         {errors[field] && (
//           <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
//         )}
//       </div>
//     );
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-xl text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-xl text-red-600">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="flex items-center justify-center p-4 bg-red-600 relative">
//         <ChevronLeft
//           className="w-6 h-6 text-white cursor-pointer absolute left-4"
//           onClick={() => navigate('/profile')}
//         />
//         <h1 className="text-xl text-white">Your Profile</h1>
//       </div>


//       <div className="max-w-xl mx-auto p-4">
//         {/* Profile Avatar */}
//         <div className="flex justify-center mb-8">
//           <div className="relative">
//             {previewImage ? (
//               <img
//                 src={previewImage}
//                 alt="Profile"
//                 className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
//               />
//             ) : (
//               <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center border-2 border-gray-200">
//                 <span className="text-4xl text-blue-600">
//                   {user.name ? user.name.charAt(0).toUpperCase() : '?'}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Form Fields */}
//         <div className="space-y-5">
//           {['name', 'mobile', 'email', 'dob', 'address','address1'].map((field) => (
//             <div key={field}>

//               {renderFormField(field)}
//             </div>
//           ))}
//         </div>

//         {/* Submit Button */}
//         <button
//           onClick={handleSubmit}
//           className="w-full mt-8 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 
//             transition-colors duration-200 focus:outline-none focus:ring-2 
//             focus:ring-red-500 focus:ring-offset-2"
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;





import React, { useEffect, useState } from 'react';
import { ChevronLeft, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const navigate = useNavigate();

  // State for user data and errors
  const [user, setUser] = useState({
    name: '',
    mobile: '',
    email: '',
    dob: '',
    image: '',
    address: '',
    address1: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    address: '',
    dob: '',
    mobile: '',
    address1: ''
  });

  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  localStorage.setItem('image', previewImage);
  const set = localStorage.getItem('image');
  console.log("set", set);
  // Calculate age from date of birth
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };
  const img = process.env.REACT_APP_PROFILE_IMAGE_GET
  console.log(img);
  // Validation rules
  const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'name':
        if (value.length < 2) {
          errorMessage = 'Name must be at least 2 characters long';
        } else if (value.length > 25) {
          errorMessage = 'Name cannot exceed 25 characters';
        }
        break;
      case 'address':
        if (value.length > 150) {
          errorMessage = 'Address cannot exceed 100 characters';
        }
        break;
      case 'dob':
        if (!value) {
          errorMessage = 'Date of birth is required';
        } else {
          const age = calculateAge(value);
          if (age < 13) {
            errorMessage = 'You must be at least 13 years old to use this service';
          }
        }
        break;
      default:
        break;
    }
    return errorMessage;
  };

  // Handle input change with validation
  const handleInputChange = (field, value) => {
    setUser({ ...user, [field]: value });

    // Validate fields that have constraints
    if (['name', 'address', 'dob', 'mobile', 'address1'].includes(field)) {
      const errorMessage = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: errorMessage }));
    }
  };

  // Fetch user data from API
  useEffect(() => {
    const fetchUser = async () => {
      const user_id = localStorage.getItem('id');
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/getuser/${user_id}`);
        const userData = response.data.user;
        console.log("userData", userData);

        setUser({
          name: userData.first_name,
          email: userData.email1,
          dob: userData.dob,
          mobile: userData.mobile,
          image: userData.image || '',
          address: userData.address,
          address1: userData.address1,
          id: user_id
        });

        // Validate age when loading user data
        if (userData.dob) {
          const dobError = validateField('dob', userData.dob);
          setErrors(prev => ({ ...prev, dob: dobError }));
        }

        setPreviewImage(userData?.image || '');
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch user ', err);
        setError('Failed to load user data.');
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should not exceed 5MB');
        return;
      }

      setUser({ ...user, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission with validation
  const handleSubmit = async () => {
    // Validate all fields before submission
    const nameError = validateField('name', user.name);
    const addressError = validateField('address', user.address);
    const address1Error = validateField('address1', user.address1);
    const dobError = validateField('dob', user.dob);
    const mobileError = validateField('mobile', user.mobile);

    setErrors({
      name: nameError,
      address: addressError,
      address1: address1Error,
      dob: dobError,
      mobile: mobileError
    });

    // Check if there are any validation errors
    if (nameError || addressError || dobError || mobileError || address1Error) {
      toast.error('Please fix the validation errors before submitting');
      return;
    }

    const formData = new FormData();
    Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/update/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Profile updated successfully!');
      navigate('/')

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Failed to update user data:', err);
      setError('Failed to update profile.');
      toast.error('Failed to update profile');
    }
  };

  // Render form fields with specific conditions
  const renderFormField = (field, label) => {
    const isReadOnly = field === 'email';

    if (field === 'dob') {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label || 'Date of Birth'}
          </label>
          <input
            type="date"
            value={user.dob}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className={`w-full p-3 border rounded-lg ${errors.dob ? 'border-red-500' : ''}`}
            max={new Date().toISOString().split('T')[0]} // Prevent future dates
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
          )}
        </div>
      );
    }

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label || field.charAt(0).toUpperCase() + field.slice(1)}
        </label>
        <input
          type="text"
          value={user[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className={`w-full p-3 border rounded-lg ${isReadOnly ? 'bg-gray-100' : ''} 
            ${errors[field] ? 'border-red-500' : ''}`}
          readOnly={isReadOnly}
          maxLength={field === 'name' ? 25 : field === 'address' ? 100 : undefined}
          placeholder={`Enter your ${field}`}
        />
        {errors[field] && (
          <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
        )}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-center p-4 bg-red-600 relative">
        <ChevronLeft
          className="w-6 h-6 text-white cursor-pointer absolute left-4"
          onClick={() => navigate('/profile')}
        />
        <h1 className="text-xl text-white">Your Profile</h1>
      </div>

      <div className="max-w-xl mx-auto p-4">
        {/* Profile Avatar with Upload Button */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {previewImage ? (
              <img
                src={`${process.env.REACT_APP_PROFILE_IMAGE_GET}/${previewImage}`}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center border-2 border-gray-200">
                <span className="text-4xl text-blue-600">
                  {user.name ? user.name.charAt(0).toUpperCase() : '?'}
                </span>
              </div>
            )}

            {/* Camera icon overlay for image upload */}
            <label className="absolute bottom-0 right-0 bg-red-600 rounded-full p-1 cursor-pointer shadow-md hover:bg-red-700 transition-colors">
              <Camera className="w-4 h-4 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="profile-image-upload"
              />
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {renderFormField('name', 'Name')}
          {renderFormField('mobile', 'Mobile Number')}
          {renderFormField('email', 'Email')}
          {renderFormField('dob', 'Date of Birth')}
          {renderFormField('address', 'Address')}
          {renderFormField('address1', 'Address Line 2')}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-8 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 
            transition-colors duration-200 focus:outline-none focus:ring-2 
            focus:ring-red-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserProfile;