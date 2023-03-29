import React from "react";
import { RiReactjsFill } from "react-icons/ri";
import { SiTailwindcss } from "react-icons/si";
import { GrNode } from "react-icons/gr";

const Home = (props) => {
  return (
    <>
      <div className="w-full min-h-fit p-10">
        <div className="w-full mt-12 mr-auto mb-0 ml-auto md:max-w-lg lg:max-w-4xl">
          <div>
            <h1 className="text-2xl font-bold text-gray-300">{props.title}</h1>
            <p className="text-lg mt-1 mr-0 mb-0 ml-0 font-semi-bold text-gray-500">
              {props.desc}
            </p>
            <div className="ml-1 text-md mt-5 mr-0 mb-0 ml-0 font-semi-bold text-gray-400">
              <p>
                D'ici vous pouvez modifier l'ensemble des contenus présent sur
                votre site.
              </p>
            </div>
            <div className="mt-5 lg:mt-16 md:mt-16 mx-auto block md:flex md:flex-row lg:flex lg:flex-row flex-column md:space-x-5 lg:space-x-10 my-auto">
              <RiReactjsFill
                size={140}
                className="text-blue-400 mx-auto md:mx-0 lg:mx-0"
              />
              <SiTailwindcss
                size={140}
                className="text-blue-300 mx-auto md:mx-0 lg:mx-0"
              />
              <GrNode
                size={110}
                className="text-green-600 mx-auto md:mx-0 lg:mx-0"
              />
            </div>
            <div className="justify-right text-sm text-gray-400 mt-2 lg:mt-0">
              <p>#React #Tailwind #NodeJs</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
