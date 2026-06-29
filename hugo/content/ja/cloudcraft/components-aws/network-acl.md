---
title: ネットワーク ACL
---

## 概要

Amazon Web Services アーキテクチャのネットワークアクセスコントロールリストを可視化するには、ネットワーク ACL コンポーネントを使用します。

{{< img src="cloudcraft/components-aws/network-acl/component-network-acl-diagram.png" alt="『Network ACL』AWS コンポーネントを示す等角投影の Cloudcraft ダイアグラムのスクリーンショット" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Visibility**: ダイアグラム上でコンポーネントの表示/非表示を切り替えます。
- **Color**: コンポーネント本体の塗りつぶし色とシンボルのアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Name**: NACL に名前を付けます。
- **Shape**: コンポーネントの形状を選択します。
- **Padding**: コンポーネント内部の余白を増減します。
- **Rules**: NACL のインバウンドおよびアウトバウンドルールを表示します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は Network ACL コンポーネントの JSON 例です。

```json
{
    "type": "networkacl",
    "id": "acl-0mqj0d4dxpmf9iru3",
    "arn": "arn:aws:ec2:us-east-1:762056483071:network-acl/acl-0mqj0d4dxpmf9iru3",
    "region": "us-east-1",
    "visible": true,
    "name": "acl-0mqj0d4dxpmf9iru3",
    "shape": "rectangular",
    "padding": 2,
    "nodes": [
        "1ae68ef4-f3cb-4e07-8660-2a4a4bc30e36",
        "subnet-0752f314ffbf0126e"
    ],
    "inboundRules": [
        {
            "ruleNumber": 100,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "allow"
        },
        {
            "ruleNumber": 32767,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "deny"
        }
    ],
    "outboundRules": [
        {
            "ruleNumber": 100,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "allow"
        },
        {
            "ruleNumber": 32767,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "deny"
        }
    ],
    "color": {
        "isometric": "#5698ff",
        "2d": "#5698ff"
    },
    "link": "https://aws.amazon.com/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。
- **id: string**: `acl-` に続くランダムな 17 文字の英数字で構成される、コンポーネントの一意の識別子。
- **arn: 文字列**: [Amazon Resource Name][2] として知られる、AWS 内でのコンポーネントのグローバルに一意な識別子。
- **region: string**: コンポーネントの AWS リージョン。すべてのグローバルリージョンがサポートされますが、`cn-` リージョンは除きます。
- **visible: boolean**: `false` の場合、ダイアグラム上でコンポーネントが半透明になります。デフォルトは `true`。
- **name: string**: NACL の名前。
- **shape: string**: コンポーネントの形状。`dynamic` または `rectangular` を受け付けます。デフォルトは `retangular`。
- **padding: number**: コンポーネントの余白値。デフォルトは `2`。
- **nodes: array**: NACL 内にあるコンポーネント ID の配列。
- **inboundRules: array**: NACL 内のコンポーネントが受信するトラフィックに対するルール。
  - **ruleNumber: number**: NACL のルール番号。
  - **protocol: string**: ルールで使用するプロトコル。`-1` (すべて) または特定のプロトコルを指定。
  - **portRange: string**: トラフィックを受け付けるポートまたはポート範囲。
  - **target: string**: トラフィック元 (CIDR 範囲)。
  - **targetType: string**: ルールのターゲットタイプ。`ip` または `ipv6` を指定。
  - **access: string**: ルールのアクセス種別。`allow` または `deny` を指定。
- **outboundRules: array**: NACL 内のコンポーネントが送信するトラフィックに対するルール。
  - **ruleNumber: number**: NACL のルール番号。
  - **protocol: string**: ルールで使用するプロトコル。`-1` (すべて) または特定のプロトコルを指定。
  - **portRange: string**: トラフィックを送信するポートまたはポート範囲。
  - **target: string**: トラフィックの送信先 (CIDR 範囲)。
  - **targetType: string**: ルールのターゲットタイプ。`ip` または `ipv6` を指定。
  - **access: string**: ルールのアクセス種別。`allow` または `deny` を指定。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。デフォルトは `#ECECED` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。デフォルトは `#CC2264` です。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

[1]: /ja/cloudcraft/api/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html