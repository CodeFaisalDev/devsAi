"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import languages from "@/data/lagguages";
import themes from "@/data/themeMode";
import CodeInput from "./CodeInput";
import { Button } from "@/components/ui/button";
import { FaExchangeAlt } from "react-icons/fa";

const mockTranslate = (code, fromLang, toLang) => {
  return `Translated code from ${fromLang} to ${toLang}: ${code}`;
};

const CodeBox = () => {
  const [language, setLanguage] = useState("javascript");
  const [translatedLanguage, setTranslatedLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [code, setCode] = useState("//Enter your code");
  const [translatedCode, setTranslatedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTranslate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tansilate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: code,
          sourceLanguage: language,
          targetLanguage: translatedLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok.`);
      }

      const data = await response.json();
      setTranslatedCode(data.translatedCode);
    } catch (error) {
      setError(`Translation Faild: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full ">
      <div className="flex justify-between md:w-full pb-5">
        <div>
          <div className="mb-5">
            <Select onValueChange={(value) => setLanguage(value)}>
              <SelectTrigger className="w-36 md:w-48">
                <SelectValue placeholder="Source language" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white">
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  {languages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.value}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select onValueChange={(value) => setTranslatedLanguage(value)}>
              <SelectTrigger className="w-36 md:w-48">
                <SelectValue placeholder="Translate language" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white">
                <SelectGroup>
                  <SelectLabel>Languages</SelectLabel>
                  {languages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.value}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <div className="mb-5">
            <Button
              variant="outline"
              className="w-36 md:w-48 justify-between"
              onClick={handleTranslate}
            >
              <span>{loading ? "Transilating..." : "Translate"}</span>
              <FaExchangeAlt />
            </Button>
          </div>

          <div>
            <Select onValueChange={(value) => setTheme(value)}>
              <SelectTrigger className="w-36 md:w-48">
                <SelectValue placeholder="Select Theme" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white">
                <SelectGroup>
                  <SelectLabel>Themes</SelectLabel>
                  {themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.value}>
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className=" justify-center grid xl:flex w-[90vw] md:w-fit lg:justify-between gap-10">
        <div>
          <CodeInput
            language={language}
            theme={theme}
            code={code}
            onCodeChange={setCode}
          />
        </div>

        <div>
          <CodeInput
            language={translatedLanguage}
            theme={theme}
            code={translatedCode || "// Translation will appear here"}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBox;
