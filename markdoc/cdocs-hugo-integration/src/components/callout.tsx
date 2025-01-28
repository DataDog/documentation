import { CustomHtmlComponent } from '../helperModules/renderer';
import { renderToString } from 'react-dom/server';

export const calloutDefinition = {
  render: 'Callout',
  attributes: {
    url: {
      type: String,
      required: true
    },
    header: {
      type: String,
      default: 'Join the Beta!'
    },
    btn_hidden: {
      type: Boolean,
      default: false
    }
  }
};

export class Callout extends CustomHtmlComponent {
  render() {
    const attrs = this.tag.attributes;

    const jsx = CalloutTemplate({
      url: attrs.url,
      header: attrs.header,
      btn_hidden: attrs.btn_hidden,
      htmlContents: this.contents
    });

    return renderToString(jsx);
  }
}

function CalloutTemplate(props: {
  url: string;
  header: string;
  btn_hidden: boolean;
  htmlContents: string;
}): JSX.Element {
  return (
    <div className="card callout-card mb-4">
      <div className="card-body d-flex flex-column">
        {props.header !== 'false' && (
          <h5 className="card-title text-black mt-0 mb-1">{props.header}</h5>
        )}
        <p className="card-text">
          <span dangerouslySetInnerHTML={{ __html: props.htmlContents }}></span>
        </p>
        {props.btn_hidden !== true && (
          <a
            href={props.url}
            target="_blank"
            className={`btn btn-outline-primary pb-1 align-self-end d-flex flex-column justify-content-center`}
          >
            Request Access
          </a>
        )}
      </div>
    </div>
  );
}
