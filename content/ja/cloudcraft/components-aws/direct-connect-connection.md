---
title: Direct Connect Connection Component
---
## 概要

Direct Connect 接続コンポーネントを使用して、内部ネットワークと AWS Direct Connect ロケーションとの間の接続を視覚化します。

{{< img src="cloudcraft/components-aws/direct-connect-connection/component-direct-connect-connection-diagram.png" alt="相互接続された AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: コンポーネント本体の塗りつぶし色とシンボルのアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Location**: Direct Connect ロケーションを選択します。
- **Number of Ports**: Direct Connect によって使用されるポートの数を入力します。専用接続でのみ利用できます。
- **Type**: 接続のタイプを選択します。
- **Capacity (bps)**: 接続の容量を選択します (ビット毎秒単位)。
- **Transfer from**: 転送元の AWS リージョンを選択します。
- **Data out (GB)**: アウトバウンドデータの総量をギガバイト単位で入力します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、Direct Connect 接続コンポーネントの JSON オブジェクトの例です。

```json
{
    "type": "dxconnection",
    "id": "cff376f0-b1e3-459b-af10-a7133ad10232",
    "region": "us-east-1",
    "mapPos": [36,21],
    "site": "165HS",
    "numberPorts": 1,
    "connectionType": "Dedicated",
    "capacity": "1G",
    "transferRegion1": "us-east-1",
    "transferDataGb1": 0,
    "color": {
        "isometric": "#ECECED",
        "2d": "#693CC5"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/directconnect/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `dxconnection` の文字列でなければなりません。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **arn: 文字列**: [Amazon Resource Name][2] として知られる、AWS 内でのコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの AWS リージョン。API は、[AWS China を除く][3]すべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **site: 文字列**: Direct Connect ロケーション。[詳しくは、AWS のドキュメントを参照してください][4]。デフォルトは `165HS` です。
- **numberPorts: 数値**: Direct Connect によって使用されるポートの数。デフォルトは `1` です。
- **connectionType: 文字列**: Direct Connect 接続のタイプ。`Dedicated` または `Hosted` のいずれかの値を指定できます。デフォルトは `Dedicated` です。
- **capacity: 文字列**: 接続の容量 (ビット毎秒単位)。`1G`、`10G`、または`100G` のいずれかの値を指定します。デフォルトは `1G` です。
- **transferRegion1: 文字列**: 転送元の AWS リージョン。[Cloudcraft がサポートしているすべての AWS リージョン][3]を指定できます。デフォルトは `us-east-1` です。
- **transferDataGb1: 数値**: アウトバウンドデータの総量 (ギガバイト単位)。デフォルトは `0` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ECECED` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#693CC5` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#4286C5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#FFFFFF` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ja/cloudcraft/faq/scan-error-aws-china-region/
[4]: https://aws.amazon.com/directconnect/locations/