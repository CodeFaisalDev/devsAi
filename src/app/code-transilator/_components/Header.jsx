import React from "react";

const Header = () => {
  return (
    <div className="max-md:h-fit flex flex-col gap-5 w-[90vw] md:w-[70vw] lg:w-[80vw] text-center ">
      <h1 className="text-4xl md:text-4xl xl:m-5 lg:text-[2.75rem] xl:text-6xl font-extrabold">
        Transilate Your Code Flowlessly
      </h1>
      <p className="lg:px-28 xl:px-40 text-gray-400 ">
        A platform that translates code between languages (e.g., C++, Java,
        Python) using the OpenAI API. It optimizes code performance during
        translation by suggesting improvements, ensuring clean, efficient
        outputs. The tool offers a user-friendly interface with live code
        previews, enhancing the coding workflow for developers.
      </p>
    </div>
  );
};

export default Header;
