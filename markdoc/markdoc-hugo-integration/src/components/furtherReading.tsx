import { WhatsnextTemplate } from './whatsnext';
import { NextlinkTemplate } from './nextlink';
import { FurtherReadingConfig } from '../schemas/frontMatter';
import { HugoConfig } from '../schemas/config/hugo';
import { renderToString } from 'react-dom/server';

export function FurtherReadingTemplate(props: {
  furtherReadingConfig: FurtherReadingConfig;
  hugoConfig: HugoConfig;
}) {
  // build the list of nextlinks
  let contents = '';

  props.furtherReadingConfig.forEach((item) => {
    const jsx = NextlinkTemplate({
      attrs: {
        href: item.link,
        text: item.text,
        tag: item.tag
      },
      hugoConfig: props.hugoConfig
    });

    contents += renderToString(jsx);
  });

  // wrap the nextlinks in the whatsnext wrapper template
  return (
    <>
      <h2>Further reading</h2>
      <WhatsnextTemplate contents={contents} hugoConfig={props.hugoConfig} />
    </>
  );
}
