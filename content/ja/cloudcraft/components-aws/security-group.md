---
title: "Security Group Component"
---
## 概要

Use the Security Group component to represent security groups from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/security-group/component-security-group-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'Security group' AWS component." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Name**: Give the security group a name.
- **Shape**: Select a shape for the security group, dynamic or rectangular.
- **Padding**: Increase or decrease the amount of space inside the security group.
- **Inbound/Outbound**: View, remove, or add inbound and outbound rules for components inside this security group.

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON of a Security Group component:

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

- **type: sg**: The type of component.
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: string**: The AWS region the security group is deployed in. All global regions are supported except `cn-` regions.
- **name: string**: The name for the security group.
- **shape: string**: The shape of the security group. Accepted values are `dynamic` or `rectangular`.
- **padding: number**: The internal padding for the security group. Defaults to `1.5`.
- **nodes: array**: The components inside the security group. See [Accepted values for `nodes`](#accepted-values-for-nodes) for more information.
- **inboundRules: array**: The rules for incoming traffic for the components inside this security group. See [Accepted values for `inboundRules` and `outboundRules`](#accepted-values-for-inboundrules-and-outboundrules) for more information.
- **outboundRules: array**: The rules for outgoing traffic for the components inside this security group. See [Accepted values for `inboundRules` and `outboundRules`](#accepted-values-for-inboundrules-and-outboundrules) for more information.
- **color: オブジェクト**: コンポーネントの塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

### `nodes` で許容される値

The `nodes` key accepts an array of unique identifiers for the components inside the security group.

The following AWS components can be added to a security group:

```
asg, ec2, lambda, efs, fsx, elb, rds, docdb, elasticache, redshift, es
```

In addition to the AWS components, the following common components can also be added to security groups:

```
block, isotext, icon, image, area
```

### Accepted values for `inboundRules` and `outboundRules`

The `inboundRules` and `outboundRules` keys accept an array with rules represented by JSON objects.

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

- **portRange: number**: The number of the port affected by this rule. Accepts a single port or a range of ports, for example, `42000-42222`.
- **protocol: string**: The network protocol affected by this rule.
- **target: string**: The CIDR or `id` of a security group that is the source of traffic to the components.
- **targetType: string**: The type of source used for `target`. Accepted values are `ip` or `sg`.
- **description: string**: A short description for the inbound or outbound rule.
- **hidden: boolean**: If `true`, the inbound or outbound rule is not displayed in the diagram. See the component image at the top of the page to see how it is displayed. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
