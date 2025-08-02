"use client";

import React from "react";
import { Card, Typography } from "antd";
import Image from "next/image";

const { Text } = Typography;

const templates = [
  { name: "Elegant", key: "blank", preview: "/assets/img/elegant.png" },
  { name: "Modern", key: "modern", preview: "/assets/img/modern.png" },
  { name: "Classic", key: "classic", preview: "/assets/img/classic.png" },
  { name: "Clean", key: "clean", preview: "/assets/img/clean.png" },
  { name: "Minimalize", key: "minimal", preview: "/assets/img/minimal.png" },
  { name: "Colorful", key: "colorful", preview: "/assets/img/colorful.png" },
];

interface TemplateSelectorProps {
  selected: string;
  onSelect: (key: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold mb-4 text-center">Choose Template</h2>

      <div
        className="
          flex gap-4 overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6
          sm:overflow-visible no-scrollbar
        "
      >
        {templates.map((tpl) => (
          <div
            key={tpl.key}
            className="
              snap-start flex-shrink-0 w-screen px-4 sm:w-auto sm:px-0
            "
          >
            <Card
              hoverable
              className={`
                transition border rounded-lg overflow-hidden p-1 shadow-sm cursor-pointer h-full
                ${selected === tpl.key ? "border-blue-700 ring-2 ring-blue-500" : "hover:shadow-md"}
              `}
              onClick={() => onSelect(tpl.key)}
              style={{ textAlign: "center" }}
            >
              <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden rounded">
                <Image
                  src={tpl.preview}
                  alt={tpl.name}
                  fill
                  className="object-contain"
                />
              </div>
              <Text className="text-sm font-semibold block mt-2 text-gray-800">
                {tpl.name}
              </Text>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
