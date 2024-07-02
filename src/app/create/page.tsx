'use client';
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Username {
  username: string;
}

interface Dropdown {
  id: number;
  value: string;
}

interface Upload {
  id: number;
  file: File | null;
}

interface FormData {
  subject: string;
  textEditorContent: string;
  dropdowns: Dropdown[];
  uploads: Upload[];
}

const Create: React.FC = () => {
  
  const [formData, setFormData] = useState<FormData>({
    subject: "",
    textEditorContent: "",
    dropdowns: [{ id: 1, value: "" }],
    uploads: [{ id: 1, file: null }]
  });
  const [usernames, setUsernames] = useState<Username[]>([]);
  const [selectedUsernames, setSelectedUsernames] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/getapprovers");
        if (response.ok) {
          const data = await response.json();
          setUsernames(data || []);
        } else {
          console.error("Failed to fetch usernames:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    };

    fetchUsernames();
  }, []);

  const saveFormData = async (updatedFormData: FormData) => {
    try {
      const response = await fetch("http://localhost:5000//api/applications/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });
      if (response.ok) {
        console.error("Failed to save form data:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  const handleTextEditorChange = (content: string) => {
    const updatedFormData: FormData = {
      ...formData,
      textEditorContent: content,
    };
    setFormData(updatedFormData);
    saveFormData(updatedFormData);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFormData: FormData = {
      ...formData,
      subject: e.target.value,
    };
    setFormData(updatedFormData);
    saveFormData(updatedFormData);
  };

  const handleAddDropdown = () => {
    const newId = formData.dropdowns.length + 1;
    const updatedFormData: FormData = {
      ...formData,
      dropdowns: [...formData.dropdowns, { id: newId, value: "" }],
    };
    setFormData(updatedFormData);
    saveFormData(updatedFormData);
  };

  const handleDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    const updatedDropdowns = formData.dropdowns.map(dropdown =>
      dropdown.id === id ? { ...dropdown, value: e.target.value } : dropdown
    );
    const updatedFormData: FormData = {
      ...formData,
      dropdowns: updatedDropdowns,
    };
    setFormData(updatedFormData);
    setSelectedUsernames([...selectedUsernames, e.target.value]);
    saveFormData(updatedFormData);
  };

  const handleAddUpload = () => {
    const newId = formData.uploads.length + 1;
    const updatedFormData: FormData = {
      ...formData,
      uploads: [...formData.uploads, { id: newId, file: null }],
    };
    setFormData(updatedFormData);
    saveFormData(updatedFormData);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const file = e.target.files && e.target.files[0];
    const updatedUploads = formData.uploads.map(upload =>
      upload.id === id ? { ...upload, file: file } : upload
    );
    const updatedFormData: FormData = {
      ...formData,
      uploads: updatedUploads,
    };
    setFormData(updatedFormData);
    saveFormData(updatedFormData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create" />
      <div className="mx-auto max-w-270">
        <form onSubmit={handleSubmit}>
          {/* Subject Input */}
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-black dark:text-white">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleSubjectChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

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
                {usernames.map((username) => (
                  <option key={username.username} value={username.username}>
                    {username.username}
                  </option>
                ))}
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

export default Create;
