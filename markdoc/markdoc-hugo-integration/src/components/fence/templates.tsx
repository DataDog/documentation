export const CodeBlockTemplate = (props: { highlightedContents: string }) => {
  const { highlightedContents } = props;
  return (
    <div className="code-snippet-wrapper">
      <div className="code-filename-wrapper d-flex justify-content-end collapsible">
        <div className="js-code-block-visibility-toggle">
          <div className="chevron chevron-down d-none"></div>
          <div className="chevron chevron-up"></div>
        </div>
      </div>
      <div className="code-snippet">
        <div className="code-button-wrapper position-absolute">
          <button className="btn text-primary js-copy-button">Copy</button>
        </div>
        <div className="highlight code-snippet js-appended-copy-btn">
          <div className="code-button-wrapper position-absolute">
            <button className="btn text-primary js-copy-button">Copy</button>
          </div>
          <span dangerouslySetInnerHTML={{ __html: highlightedContents }}></span>
        </div>
      </div>
    </div>
  );
};
