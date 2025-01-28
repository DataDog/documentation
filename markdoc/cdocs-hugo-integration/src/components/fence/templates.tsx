/**
 * JSX templates for fenced code blocks. These cannot hold state,
 * as they're converted to static HTML at compile time.
 */

export const CodeBlockTemplate = (props: {
  highlightedContents: string;
  language: string;
  attrs: {
    filename?: string;
    wrap: boolean;
    collapsible: boolean;
    disable_copy: boolean;
  };
}) => {
  const { highlightedContents, attrs } = props;

  let filenameWrapperClasses = 'd-flex';
  if (attrs.filename) {
    filenameWrapperClasses += ' justify-content-between';
  } else {
    filenameWrapperClasses += ' justify-content-end';
  }
  if (attrs.collapsible) {
    filenameWrapperClasses += ' collapsible';
  }

  let codeSnippetClasses = '';
  if (attrs.wrap) {
    codeSnippetClasses = 'wrap';
  }

  return (
    <div className="code-snippet-wrapper">
      <div className={`code-filename-wrapper ${filenameWrapperClasses}`}>
        {attrs.filename && <CodeFilename filename={attrs.filename} />}
        {attrs.collapsible && <CollapseToggle />}
      </div>
      <div className={`code-snippet ${codeSnippetClasses}`}>
        {!attrs.disable_copy && <CopyButton />}
        <CodeSnippet contents={highlightedContents} language={props.language} />
      </div>
    </div>
  );
};

function CodeSnippet(props: { contents: string; language: string }) {
  return (
    <div
      className={`cdoc-code-snippet cdoc-language-${props.language}`}
      dangerouslySetInnerHTML={{ __html: props.contents }}
    ></div>
  );
}

function CollapseToggle() {
  return (
    <div className="js-code-block-visibility-toggle">
      <div className="chevron chevron-down d-none"></div>
      <div className="chevron chevron-up"></div>
    </div>
  );
}

function CopyButton() {
  return (
    <div className="code-button-wrapper position-absolute">
      <button className="btn text-primary js-copy-button">Copy</button>
    </div>
  );
}

function CodeFilename(props: { filename: string }) {
  return <p className="code-filename my-0">{props.filename}</p>;
}
