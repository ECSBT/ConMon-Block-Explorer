import React, { useRef } from 'react';
import PropTypes from 'prop-types';

function DataSlide({ children }) {
    return (
      <div className="scroll-box">
        <div className="scroll-box__wrapper">
          <div className="scroll-box__container" role="list">
            {children.map((child, i) => (
              <div className="scroll-box__item" role="listitem" key={`scroll-box-item-${i}`}>
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  DataSlide.propTypes = {
    children: PropTypes.node.isRequired,
  };

  export default DataSlide;