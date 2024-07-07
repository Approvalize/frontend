'use client';
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Generate: React.FC = () => {
  const [formData, setFormData] = useState({
    inputText: "",
    textEditorContent: "",
    selectedOption: "",
    file: null as File | null,
    dropdowns: [{ id: 1, value: "" }],
    uploads: [{ id: 1, file: null as File | null }]
  });

  //const anthropic = new Anthropic({apiKey: "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"});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTextEditorChange = (content: string) => {
    setFormData({
      ...formData,
      textEditorContent: content
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files && e.target.files[0];
    const updatedUploads = formData.uploads.map(upload =>
      upload.id === id ? { ...upload, file: file } : upload
    );
    setFormData({
      ...formData,
      uploads: updatedUploads
    });
  };

  const handleAddDropdown = () => {
    const newId = formData.dropdowns.length + 1;
    setFormData({
      ...formData,
      dropdowns: [...formData.dropdowns, { id: newId, value: "" }]
    });
  };

  const handleDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    const updatedDropdowns = formData.dropdowns.map(dropdown =>
      dropdown.id === id ? { ...dropdown, value: e.target.value } : dropdown
    );
    setFormData({
      ...formData,
      dropdowns: updatedDropdowns
    });
  };

  const handleAddUpload = () => {
    const newId = formData.uploads.length + 1;
    setFormData({
      ...formData,
      uploads: [...formData.uploads, { id: newId, file: null }]
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };
  
  console.log
  const handleGenerate = async () => {
    console.log(formData.inputText)
    const res = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"         
      },
      
      body: JSON.stringify(formData.inputText),
    });
    
      console.log(res);

      setFormData({
       ...formData,
        textEditorContent: res
      });
    };

      

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Generate" />
      <div className="mx-auto max-w-270">
        <form onSubmit={handleSubmit}>
          {/* Input Prompt */}
          <div className="mb-4">
            <label htmlFor="inputText" className="block text-sm font-medium text-black dark:text-white">
              Input Prompt
            </label>
            <input
              type="text"
              id="inputText"
              name="inputText"
              value={formData.inputText}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            className="mb-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 dark:text-white"
          >
            Generate
          </button>

          {/* Text Editor */}
          <div className="mb-4">
            <label htmlFor="textEditor" className="block text-sm font-medium text-black dark:text-white">
              Text Editor
            </label>
            <ReactQuill
              id="textEditor"
              value={formData.textEditorContent}
              onChange={handleTextEditorChange}
              modules={{
                toolbar: [
                  [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                  [{size: []}],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{'list': 'ordered'}, {'list': 'bullet'}, 
                   {'indent': '-1'}, {'indent': '+1'}],
                  ['link', 'image', 'video'],
                  ['clean']
                ],
              }}
              formats={[
                'header', 'font', 'size',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent',
                'link', 'image', 'video'
              ]}
              className="mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Dropdown Boxes */}
          {formData.dropdowns.map((dropdown, index) => (
            <div key={dropdown.id} className="mb-4">
              <label htmlFor={`dropdown-${dropdown.id}`} className="block text-sm font-medium text-black dark:text-white">
                Dropdown {index + 1}
              </label>
              <select
                id={`dropdown-${dropdown.id}`}
                value={dropdown.value}
                onChange={(e) => handleDropdownChange(e, dropdown.id)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-primary focus:border-primary"
              >
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          ))}

          {/* Button to Add Dropdown Box */}
          <button
            type="button"
            onClick={handleAddDropdown}
            className="mb-4 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 dark:text-white"
          >
            + Add Dropdown
          </button>

          {/* Upload Boxes */}
          {formData.uploads.map((upload, index) => (
            <div key={upload.id} className="mb-4">
              <label htmlFor={`fileUpload-${upload.id}`} className="block text-sm font-medium text-black dark:text-white">
                Upload Document {index + 1}
              </label>
              <input
                type="file"
                id={`fileUpload-${upload.id}`}
                onChange={(e) => handleFileChange(e, upload.id)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-primary focus:border-primary dark:text-white"
              />
            </div>
          ))}

          {/* Button to Add Upload Box */}
          <button
            type="button"
            onClick={handleAddUpload}
            className="mb-4 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 dark:text-white"
          >
            + Add Upload
          </button>
          
          {/* Line break */}
          <br />

          {/* Submit Button */}
          <button
            type="submit"
            className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-opacity-50 dark:text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Generate;
