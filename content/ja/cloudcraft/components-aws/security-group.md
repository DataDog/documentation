---
title: Security Group コンポーネント
---
## Overview

Security Group コンポーネントを使用して、Amazon Web Services アーキテクチャのセキュリティグループを表現します。

{{< img src="cloudcraft/components-aws/security-group/component-security-group-diagram.png" alt="'Security group' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value of the color for the component and its accent. The component can use the same color for both the 2D and 3D view, or different colors for each.
- **Name**: セキュリティグループに名前を付けます。
- **Shape**: セキュリティグループの形状を、ダイナミックまたは長方形から選択します。
- **Padding**: セキュリティグループ内部の空間を増減します。
- **Inbound/Outbound**: このセキュリティグループ内のコンポーネントの受信および送信ルールの表示、削除、追加を行います。

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

以下は、Security Group コンポーネントの JSON の例です。

```json
{
  "type": "sg",
  "id": "a699dbeb-2fe5-49a5-beea-b24695c247e4",
  "region": "us-east-1",
  "name": "cloudcraft-sg-example",
  "shape": "dynamic",
  "padding": 1.5,
  "nodes": [
    "e99bad32-82f6-49a7-b145-11963a3d7775"
  ],
  "inboundRules": [
    {
      "portRange": "80",
      "protocol": "tcp",
      "target": "bc883fec-e97c-4c27-b9a7-64e3d154452b",
      "targetType": "sg",
      "description": "HTTP Traffic",
      "hidden": false
    },
    {
      "portRange": "443",
      "protocol": "tcp",
      "target": "bc883fec-e97c-4c27-b9a7-64e3d154452b",
      "targetType": "sg",
      "description": "HTTPS Traffic",
      "hidden": false
    },
    {
      "portRange": "22",
      "protocol": "tcp",
      "target": "65e16268-d9ee-440a-9a4d-29b92520572e",
      "targetType": "sg",
      "description": "Bastion server",
      "hidden": false
    }
  ],
  "outboundRules": [
    {
      "portRange": "25",
      "protocol": "tcp",
      "target": "199.255.192.0/22",
      "targetType": "ip",
      "description": "AWS SES",
      "hidden": false
    }
  ],
  "color": {
    "isometric": "#4286c5",
    "2d": "#4286c5"
  },
  "link": "blueprint://33a8bf46-7326-4999-ba0a-789bcd94f0a2",
  "locked": true
}
```

- **type: sg**: コンポーネントのタイプ。
- **id: string**: A unique identifier for the component in the `uuid` format.
- **region: 文字列**: セキュリティグループがデプロイされる AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **name: 文字列**: セキュリティグループの名前。
- **shape: 文字列**: セキュリティグループの形状。指定できる値は `dynamic` または `rectangular` です。
- **padding: 数値**: セキュリティグループの内部パディング。デフォルトは `1.5` です。
- **nodes: 配列**: セキュリティグループ内部のコンポーネント。詳しくは [`nodes` で許容される値](#accepted-values-for-nodes)を参照してください。
- **inboundRules: 配列**: このセキュリティグループ内のコンポーネントの受信トラフィックのルール。詳しくは [`inboundRules` と `outboundRules` で許容される値](#accepted-values-for-inboundrules-and-outboundrules)を参照してください。
- **outboundRules: 配列**: このセキュリティグループ内のコンポーネントの発信トラフィックのルール。詳しくは [`inboundRules` と `outboundRules` で許容される値](#accepted-values-for-inboundrules-and-outboundrules)を参照してください。
- **color: object**: The fill color for the component.
  - **isometric: string**: The fill color for the component in the 3D view. Must be a hexadecimal color.
  - **2d: string**: The fill color for the component in the 2D view. Must be a hexadecimal color.
- **link: uri**: Link the component to another diagram using the `blueprint://ID` format or to an external website using the `https://LINK` format.
- **locked: boolean**: If `true`, changes made to the component using the application are disabled until unlocked.

### Accepted values for `nodes`

`nodes` キーにはセキュリティグループ内のコンポーネントの一意な識別子の配列を指定します。

セキュリティグループに追加できる AWS コンポーネントは以下の通りです。

```
asg, ec2, lambda, efs, fsx, elb, rds, docdb, elasticache, redshift, es
```

AWS コンポーネントに加えて、以下の一般的なコンポーネントもセキュリティグループに追加できます。

```
block, isotext, icon, image, area
```

### `inboundRules` と `outboundRules` で許容される値

`inboundRules` キーと `outboundRules` キーには、JSON オブジェクトで表現されたルールの配列を指定します。

```json
{
  "inboundRules": [
    {
      "portRange": "22",
      "protocol": "tcp",
      "target": "192.0.2.0/24",
      "targetType": "ip",
      "description": "RFC 5737",
      "hidden": false
    }
  ],
  "outboundRules": [
    {
      "portRange": "25",
      "protocol": "tcp",
      "target": "199.255.192.0/22",
      "targetType": "ip",
      "description": "AWS SES",
      "hidden": false
    }
  ]
}

```

- **portRange: 数値**: このルールの影響を受けるポートの番号。単一のポート、または `42000-42222` のようなポートの範囲を指定します。
- **protocol: 文字列**: このルールの影響を受けるネットワークプロトコル。
- **target: 文字列**: コンポーネントへのトラフィックのソースであるセキュリティグループの CIDR または `id`。
- **targetType: 文字列**: `target` に使用するソースのタイプ。指定できる値は `ip` または `sg` です。
- **description: 文字列**: 受信または送信ルールの短い説明。
- **hidden: ブール値**: `true` の場合、受信ルールまたは送信ルールは図に表示されません。どのように表示されるかは、ページ上部のコンポーネントイメージを参照してください。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/