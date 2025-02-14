import { CustomHtmlComponent } from '../renderer';
import { HugoConfig } from '../../schemas/config/hugo';
import { HugoFunctions } from '../../hugoUtils/HugoFunctions';
import { renderToString } from 'react-dom/server';

export const whatsnextDefinition = {
  render: 'Whatsnext',
  attributes: {
    desc: {
      type: String
    }
  }
};

export class Whatsnext extends CustomHtmlComponent {
  render() {
    const jsx = WhatsnextTemplate({
      desc: this.tag.attributes.desc,
      hugoConfig: this.hugoConfig,
      contents: this.contents
    });

    return renderToString(jsx);
  }
}

export function WhatsnextTemplate(props: {
  desc?: string;
  hugoConfig: HugoConfig;
  contents: string;
}) {
  const desc =
    props.desc ||
    HugoFunctions.i18n({ hugoConfig: props.hugoConfig, key: 'additional_sentence' });

  return (
    <>
      <div className="whatsnext">
        <p>{desc}:</p>
        <ul
          className="list-group"
          dangerouslySetInnerHTML={{ __html: props.contents }}
        ></ul>
      </div>
    </>
  );
}
