"use client";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Details from "@/components/getDetails/details";
import { AddFileAPI } from "@/lib/api";

interface FileInfo {
  name: string;
  size: number;
  progress: string;
}

interface Naming {
  category: string[];
  drive: string;
  id: string;
  summary: string;
  year: string;
  title: string;
  compare: string;
}

function AddFileCompare() {
  const [load, setLoad] = useState<FileInfo[] | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [newData, setNewData] = useState<Naming[] | []>([]);
  const handleChange = async (files: File[]) => {
    if (!files || files.length === 0) {
      console.log("No files selected.");
      return;
    }

    const filesInfo = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      progress: "progress",
    }));

    setLoad(filesInfo);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const data = await AddFileAPI(file);
        console.log(data);
        if (!data.success) {
          setLoad((prevState) => {
            if (prevState instanceof Array) {
              const updatedFiles = [...prevState];
              updatedFiles[i].progress = "error";
              return updatedFiles;
            }
            return null;
          });
        } else {
          setLoad((prevState) => {
            if (prevState instanceof Array) {
              setNewData(data.data);
              setSummary(data.summary);
              const updatedFiles = [...prevState];
              updatedFiles[i].progress = "success";
              return updatedFiles;
            }
            return null;
          });
        }
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="mt-8">
          {!load ? (
            <FileUploader
              handleChange={handleChange}
              name=""
              types={["pdf"]}
              multiple={true}
              maxSize={5}
            />
          ) : (
            newData.length >= 1 && (
              <div className="">
                <div className=" ml-4 p-6 md:ml-28 md:mr-20 mb-10 border-2 rounded-tl-3xl rounded-br-3xl">
                  <div className="">Summary: </div>
                  <div className="pl-4 pr-1 md:pl-20 md:pr-32">{summary}</div>
                </div>
                <div className="">
                {newData.map((item) => (
                  <Details
                    key={item.id}
                    fileName=""
                    size={0}
                    progress="success"
                    data={item}
                  />
                ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default AddFileCompare;
