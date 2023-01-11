import { createElement, FC, memo } from 'react';
import memoizeOne from 'memoize-one';

import { findAll } from './core';

type Props = {
  autoEscape?: boolean;
  caseSensitive?: boolean;
  highlightClassName?: string;
  text: string;
  highlightWords: string[];
};

const highlightText = 'b';
const unHighlightText = 'span';

const TextHighlight: FC<Props> = ({ autoEscape, caseSensitive = false, text, highlightWords, highlightClassName }) => {
  const chunks = findAll({
    autoEscape,
    caseSensitive,
    searchWords: highlightWords,
    textToHighlight: text,
  });

  const lowercaseProps = (object: any) => {
    const mapped: any = {};
    for (let key in object) {
      mapped[key.toLowerCase()] = object[key];
    }
    return mapped;
  };

  const memoizedLowercaseProps = memoizeOne(lowercaseProps);

  return (
    <>
      {chunks.map((chunk, index) => {
        const chunkText = text.substr(chunk.start, chunk.end - chunk.start);

        if (chunk.highlight) {
          let highlightClass;
          if (typeof highlightClassName === 'object') {
            if (!caseSensitive) {
              highlightClassName = memoizedLowercaseProps(highlightClassName);
              highlightClass = [chunkText.toLowerCase()];
            } else {
              highlightClass = highlightClassName[chunkText];
            }
          } else {
            highlightClass = highlightClassName;
          }

          const props = {
            children: chunkText,
            className: highlightClass,
            key: index,
          };
          return createElement(highlightText, props);
        } else {
          const props = {
            children: chunkText,
            key: index,
          };
          return createElement(unHighlightText, props);
        }
      })}
    </>
  );
};

export default memo(TextHighlight);
