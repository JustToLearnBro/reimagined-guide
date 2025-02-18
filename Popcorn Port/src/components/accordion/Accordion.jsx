import { useState } from "react";
import {BiChevronDown} from 'react-icons/bi'

const Accordion = ({ heading, map }) => {
  const [isopen, setisopen] = useState(false);

  const toggleAccordion = () => {
    setisopen((prev) => !prev);
  };

  const accordionStyle = {
    maxHeight: isopen ? "1000px" : "0px",
    opacity: isopen ? "1" : "0",
    transition: "max-height 0.5s ease-out, opacity 0.5s ease-out",
  };

  return (
    <div className="w-full">
      <div className="heading flex  justify-between mb-3 select-none  cursor-pointer" onClick={toggleAccordion}>
        {heading} <div className={`${!isopen?'rotate-0':'rotate-180'}`}><BiChevronDown/></div>
      </div>
      <div style={accordionStyle} className={`${isopen?'':'hidden'}`}>
        {map}
      </div>
    </div>
  );
};

export default Accordion;
