---
title: Keyspaces コンポーネント
---
## Overview

Keyspaces コンポーネントを使用して、Amazon Web Services アーキテクチャの Apache Cassandra 互換のデータベースサービスを可視化します。

{{< img src="cloudcraft/components-aws/keyspaces/component-keyspaces-diagram.png" alt="相互接続された AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a fill color for the body of the component and an accent color for its symbol. You can use the same colors for the 2D and 3D view or different colors for each.
- **Capacity mode**: Keyspaces データベースのキャパシティモードを選択します。
- **Writes (millions)**: データベースへの書き込み総量を百万単位で入力します。
- **Reads (millions)**: データベースへの読み取り総量を百万単位で入力します。
- **Quorum %**: `LOCAL_QUORUM` の一貫性を使用する読み取りの割合を入力します。
- **Dataset (GB)**: データベースのデータ総量をギガバイト単位で入力します。
- **TTL Deletes (millions)**: TTL プロセスによってトリガーされた `DELETE` 操作の総量を百万単位で入力します。
- **Point-in-time recovery**: データベースのポイントインタイムリカバリーを使用するかどうか。

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects.

### Schema

以下は、Keyspaces コンポーネントの JSON の例です。

```json
{
    "type": "keyspaces",
    "id": "bd6da627-e07c-497e-bdbc-bec11655112a",
    "region": "us-east-1",
    "mapPos": [6,6],
    "capacityMode": "on-demand",
    "writeUnits": 5,
    "readUnits": 5,
    "quorumPercentage": 0,
    "datasetGb": 10,
    "ttlDeletes": 0,
    "pointInTimeRecoveryEnabled": false,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3B48CC"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/keyspaces/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `keyspaces` の文字列でなければなりません。
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**: The globally unique identifier for the component within AWS, known as the [Amazon Resource Names][2].
- **region: string**: The AWS region for the component. All global regions are supported, [except for AWS China][3].
- **mapPos: array**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **capacityMode: 文字列**: Keyspaces データベースのキャパシティモード。`on-demand` または `provisioned` の値のいずれかを指定します。デフォルトは `on-demand` です。
- **writeUnits: 数値**: データベースへの書き込み総量を百万単位で指定します。デフォルトは `5` です。
- **readUnits: 数値**: データベースへの読み取り総量を百万単位で指定します。デフォルトは `5` です。
- **quorumPercentage: 数値**: `LOCAL_QUORUM` の一貫性を使用する読み取りの割合。デフォルトは `0` です。
- **datasetGb: 数値**: データベースのデータ総量 (ギガバイト単位)。デフォルトは `10` です。
- **ttlDeletes: 数値**: TTL プロセスによってトリガーされた `DELETE` 操作の総量 (百万単位)。デフォルトは `0` です。
- **pointInTimeRecoveryEnabled: ブール値**: データベースのポイントインタイムリカバリーを使用するかどうか。デフォルトは `false` です。
- **color: object**: The fill color for the component body.
  - **isometric: string**: A hexadecimal color for the component body in the 3D view. Defaults to `#ECECED`.
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `##3B48CC`.
- **accentColor: object**: The accent color for the component logo.
  - **isometric: string**: A hexadecimal color for the component logo in the 3D view. Defaults to `#4286C5`.
  - **2d: string**: A hexadecimal color for the component logo in the 2D view. Defaults to `#FFFFFF`.
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of the following formats, `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ja/cloudcraft/faq/scan-error-aws-china-region/