import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const DataForm = ({ onProgress, onReturn }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate an asynchronous fetch request
    // Replace the setTimeout with your actual API call
    setTimeout(() => {
      console.log(data);
      onProgress();
    }, 1000);
  };

  return (
    <div className="bg-apricot-700 h-full w-full flex flex-col justify-center items-center gap-3 border-2 border-onyx rounded-lg text-center">
        <h2>Enter your details 🌔</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        {/* Name */}
        <div className="col-span-2">
          <label htmlFor="name" className="block text-left">Name:</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="name"
                className="w-full p-2 border border-onyx rounded"
              />
            )}
          />
        </div>

        {/* Email */}
        <div className="col-span-2">
          <label htmlFor="email" className="block text-left">Email:</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                id="email"
                className="w-full p-2 border border-onyx rounded"
              />
            )}
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dob" className="block text-left">Date of Birth:</label>
          <Controller
            name="dob"
            control={control}
            rules={{ required: 'Date of Birth is required' }}
            render={({ field }) => (
              <input
                {...field}
                type="date"
                id="dob"
                className="w-full p-2 border border-onyx rounded"
              />
            )}
          />
        </div>

        {/* Time of Birth */}
        <div>
          <label htmlFor="time" className="block text-left">Time of Birth:</label>
          <Controller
            name="time"
            control={control}
            rules={{ required: 'Time of Birth is required' }}
            render={({ field }) => (
              <input
                {...field}
                type="time"
                id="time"
                className="w-full p-2 border border-onyx rounded"
              />
            )}
          />
        </div>

        {/* Place of Birth */}
        <div className="col-span-2">
          <label htmlFor="place" className="block text-left">Place of Birth:</label>
          <Controller
            name="place"
            control={control}
            rules={{ required: 'Place of Birth is required' }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="place"
                className="w-full p-2 border border-onyx rounded"
              />
            )}
          />
        </div>

        <div className="col-span-2 flex justify-between gap-2">
          <button type="button" onClick={onReturn} className="w-3/4 h-3/4 px-2 bg-gray-500 rounded">
            <h3>Back</h3>
          </button>
          <button type="submit" className="w-3/4 h-3/4 p-2 bg-blue-500 rounded" disabled={isSubmitting}>
            {isSubmitting ? <h3>Submitting...</h3> : <h3>Submit</h3>}
          </button>
        </div>
      </form>

      <div>
        {Object.keys(errors).length > 0 && (
          <p>🛑 Please fill out all required fields: {Object.keys(errors).join(', ')}</p>
        )}
      </div>
    </div>
  );
};

export default DataForm;