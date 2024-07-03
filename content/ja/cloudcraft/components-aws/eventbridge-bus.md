---
title: EventBridge Bus Component
---

## 概要

Use the EventBridge Bus component to represent serverless event buses from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/eventbridge-bus/component-eventbridge-bus-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'EventBridge Bus' AWS component." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**. Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors on 2D and 3D views or different colors for each.
- **Type**. Select the type of your event bus.
- **Event size**. Enter the size of your event in kilobytes.
- **Custom evnt./mo**. Enter the number of custom events processed per month in the millions.
- **Partner evnt./mo**. Enter the number of partner events processed per month in the millions.
- **Cross-region evnt./mo**. Enter the number of cross-region events processed per month in the millions.
- **Bus-2-bus evnt./mo**. Enter the number of bus to bus events processed per month in the millions.
- **Rotate item**. Rotate the component to change its direction.

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON of a EventBridge Bus component:

```json
{
    "type": "eventbus",
    "id": "2791cea2-f727-428f-a504-3358bfcba66f",
    "region": "us-east-1",
    "mapPos": [-2,11],
    "direction": "down",
    "eventBusType": "default",
    "eventSize": 1,
    "numCustomEvents": 0,
    "numPartnerEvents": 0,
    "numCrossRegionEvents": 0,
    "numBus2BusEvents": 0,
    "color": {
        "isometric": "#ECECED",
        "2d": "#CC2264"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/eventbridge/",
    "locked": true
}
```

- **type: string**: The type of component.
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **arn: string**: The globally unique identifier for the component within AWS, known as [Amazon Resource Names](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
- **region: string**: The AWS region the load balancer is deployed in. All global regions are supported except `cn-` regions.
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **direction: string**: The rotation of the device in the blueprint. Accepts one of two values, `down` or `right`. Defaults to `down`.
- **eventBusType: string**: The type of event bus. Accepts one of two values, `default` or `custom`. Defaults to `default`.
- **eventSize: number**: The size of the event in kilobytes. Defaults to `1`.
- **numCustomEvents: number**: The number of custom events processed per month in the millions. Defaults to `0`.
- **numPartnerEvents: number**: The number of partner events processed per month in the millions. Defaults to `0`.
- **numCrossRegionEvents: number**: The number of cross-region events processed per month in the millions. Defaults to `0`.
- **numBus2BusEvents: number**: The number of bus to bus events processed per month in the millions. Defaults to `0`.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color. Defaults to `#ECECED`.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color. Defaults to `#CC2264`.
- **accentColor: obect**: The accent color used to display the component logo on top of the block.
  - **isometric: string**: The accent color for the component in the 3D view. Must be a hexadecimal color. Defaults to `#4286C5`.
  - **2d: string**: The accent color for the component in the 2D view. Must be a hexadecimal color. Defaults to `#FFFFFF`.
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。