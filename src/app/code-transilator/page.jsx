import React from "react";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/toaster";
import CodeBox from "./_components/codeEditor/CodeBox";
import SupportedLang from "./_components/SupportedLang";

const CodeTransilatePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="mt-32 md:mt-36 lg:mt-40 mb-8">
        <Header />
      </div>
      <div className="mt-14 md:mt-20 lg:mt-24">
        <SupportedLang />
      </div>
      <div className="mt-24 md:mt-28 lg:mt-32 mb-20">
        <CodeBox />
      </div>
      <Toaster />
    </div>
  );
};

export default CodeTransilatePage;
