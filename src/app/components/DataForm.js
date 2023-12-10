import { useState, useEffect, React } from "react";
import { useForm, Controller } from "react-hook-form";
import markdownStyles from './markdown-styles.module.css'
import { remark } from 'remark';
import html from 'remark-html';
import * as matter from 'gray-matter';

const DataForm = ({ onProgress, onReturn }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const [dataFromBackend, setDataFromBackend] = useState(null);
  const [htmlContent, setHtmlContent] = useState(null);

  const onSubmit = async (data) => {
    try {
      // Replace 'YOUR_BACKEND_URL' with the actual URL of your Node.js backend
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // Use NEXT_PUBLIC_ prefix for client-side access
      const date = new Date();
      console.log(date);

      // Initialize dataFromBackend with an empty string or other suitable default value
      setDataFromBackend("");

      const params = new URLSearchParams({
        name: data.name,
        email: data.email,
        dob: data.dob,
        tob: data.time,
        location: data.place,
        today: date,
      });

      const response = await fetch(
        `${backendUrl}/generateCompletion?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      let content = await processMarkdown(responseData.completion.message.content)
      setHtmlContent(content);
      setDataFromBackend(responseData.completion.message.content);
      console.log(responseData.completion.message.content);
      console.log(dataFromBackend);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }

    setTimeout(() => {
      console.log(data);
      console.log(dataFromBackend);

    }, 1000);
  };
  const processMarkdown = async (markdown) => {
    try {
    const matterResult = matter(markdown);
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
    return contentHtml;
    } catch (error) {
        console.error("Error processing markdown:", error.message);
        // Handle the error accordingly
        return { contentHtml: "",};
    }

  };
  return (
    <div className="bg-apricot-700 h-full w-full flex flex-col justify-center items-center gap-3 border-2 border-onyx rounded-lg text-center ">
      <div className={"w-full" + dataFromBackend != null ? "text-start overflow-x-hidden overflow-y-hidden px-10" : "overflow-x-hidden overflow-y-scroll text-center h-1/2"}>
        {dataFromBackend != null ?  
            <div className="w-full h-full flex flex-col justify-start items-center overflow-y-scroll overflow-x-hidden gap-2">
                <div className={"h-1/2 " + markdownStyles['markdown']} dangerouslySetInnerHTML={{ __html: htmlContent }}/>
                {/* <div className="flex flex-row justify-between gap-2">
                    <button
                    type="button"
                    onClick={onReturn}
                    className="w-3/4 h-3/4 px-2 bg-gray-500 rounded"
                    >
                    <h3>Back</h3>
                    </button>
                    <button
                    className="w-3/4 h-3/4 p-2 bg-blue-500 rounded"
                    >
                        <h3>Email My Reading</h3>
                    </button>
                </div> */}
            </div>
         : <h2>Enter your details 🌔</h2>}
      </div>
      
      {dataFromBackend == null && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          {/* Name */}
          <div className="col-span-2">
            <label htmlFor="name" className="block text-left">
              Name:
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
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
            <label htmlFor="email" className="block text-left">
              Email:
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
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
            <label htmlFor="dob" className="block text-left">
              Date of Birth:
            </label>
            <Controller
              name="dob"
              control={control}
              rules={{ required: "Date of Birth is required" }}
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
            <label htmlFor="time" className="block text-left">
              Time of Birth:
            </label>
            <Controller
              name="time"
              control={control}
              rules={{ required: "Time of Birth is required" }}
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
            <label htmlFor="place" className="block text-left">
              Place of Birth (Include the country):
            </label>
            <Controller
              name="place"
              control={control}
              rules={{ required: "Place of Birth is required" }}
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
            <button
              type="button"
              onClick={onReturn}
              className="w-3/4 h-3/4 px-2 bg-gray-500 rounded"
            >
              <h3>Back</h3>
            </button>
            <button
              type="submit"
              className="w-3/4 h-3/4 p-2 bg-blue-500 rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? <h3>Submitting...</h3> : <h3>Submit</h3>}
            </button>
          </div>
        </form>
      )}
      {dataFromBackend == null && (
        <div>
          {Object.keys(errors).length > 0 && (
            <span>
              🛑 Please fill out all required fields:{" "}
              {Object.keys(errors).join(", ")}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default DataForm;
