---
title: "Timestream Component"
---
## 概要

Timestream コンポーネントを使用して、Amazon Web Services アーキテクチャからサーバーレス時系列データベースを表現し視覚化します。

{{< img src="cloudcraft/components-aws/timestream/component-timestream-diagram.png" alt="相互接続された AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: コンポーネント本体の塗りつぶし色とシンボルのアクセントカラーを選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Written Data (GB)**: 書き込まれたデータの総量をギガバイト単位で入力します。
- **Queried Data (GB)**: クエリされたデータの総量をギガバイト単位で入力します。
- **Memory Storage/hr (GB)**: Timestream データベースの 1 時間あたりのメモリ保存量の合計をギガバイト単位で入力します。
- **Magnetic Storage/mo (GB)**: Timestream データベース用にプロビジョニングされた磁気ストレージの月間総量をギガバイト単位で入力します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、Timestream コンポーネントの JSON オブジェクトの例です。

```json
{
    "type": "timestream",
    "id": "1d939183-0078-440a-bcf6-6418c9c2e419",
    "region": "us-east-1",
    "mapPos": [6, 6],
    "writeDataGb": 1,
    "scanDataGb": 1,
    "memoryDataGbHr": 10,
    "magneticDataGbMo": 10,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3B48CC"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/timestream/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `timestream` の文字列でなければなりません。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **arn: 文字列**: [Amazon Resource Name][2] として知られる、AWS 内でのコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの AWS リージョン。[AWS China を除く][3]、すべてのグローバルリージョンがサポートされています。
- **mapPos: 配列**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **writeDataGb: 数値**: 書き込まれたデータの総量 (ギガバイト単位)。デフォルトは `100` です。
- **scanDataGb: 数値**: クエリされたデータの総量 (ギガバイト単位)。デフォルトは `100` です。
- **memoryDataGbHr: 数値**: データベースの 1 時間あたりに使用できるメモリ容量の合計 (ギガバイト単位)。デフォルトは `1` です。
- **magneticDataGbMo: 数値**: データベースのひと月あたりに使用できる磁気ストレージの合計 (ギガバイト単位)。デフォルトは `1000` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ECECED` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `##3B48CC` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#4286C5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#FFFFFF` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /cloudcraft/faq/scan-error-aws-china-region/
