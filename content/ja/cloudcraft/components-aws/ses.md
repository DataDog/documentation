---
title: SES コンポーネント
---
## Overview

SES コンポーネントを使用して、Amazon Web Services アーキテクチャのトランザクションメールおよびマーケティングメールサービスを表現します。

{{< img src="cloudcraft/components-aws/ses/component-ses-diagram.png" alt="'SES' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Emails/month (K)**: ひと月ごとに送信されるメールメッセージ数を千単位で入力します。

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

以下は、SES コンポーネントの JSON の例です。

```json
{
  "type": "ses",
  "id": "11f3e4bc-f827-48b6-9d9c-73e99ca3e289",
  "region": "us-west-2",
  "mapPos": [0,10],
  "emailsOut": 400,
  "color": {
    "isometric": "#0a1538",
    "2d": "#0a1538"
  },
  "accentColor": {
    "isometric": "#2457f2",
    "2d": "#2457f2"
  },
  "link": "https://aws.amazon.com/ses/",
  "locked": true
}
```

- **type: ses**: コンポーネントのタイプ。
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: 文字列**: SES がデプロイされる AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **emailsOut: 数値**: 1 か月間で送信されるメールメッセージ数 (千件単位)。デフォルトは `10` です。
- **color: object**: The fill color for the component body.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **accentColor: object**: The accent color used to display the component logo on the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**. If `true`, changes made to the component using the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/