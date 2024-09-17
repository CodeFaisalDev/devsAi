import React from "react";
import languages from "@/data/lagguages";

const SupportedLang = () => {
  return (
    <div className="flex flex-col justify-center items-center md:w-[70vw] text-center">
      <h1 className="mb-5 text-4xl lg:text-5xl">Supported Languages</h1>
      <div className="max-md:grid grid-cols-5">
        {languages.map((language) => (
          <span key={language.name} className="m-2 text-sm text-gray-400">
            {language.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SupportedLang;
