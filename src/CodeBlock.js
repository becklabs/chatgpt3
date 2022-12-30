import PropTypes from 'prop-types';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function CodeBlock({ language = null, value }) {
  return (
    <SyntaxHighlighter language={language} style={solarizedLight}>
      {value}
    </SyntaxHighlighter>
  );
}

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
}