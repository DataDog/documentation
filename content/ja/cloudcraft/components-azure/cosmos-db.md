---
title: Cosmos DB Component
---

## 概要

Cosmos DB コンポーネントを使用すると、Azure 環境のサーバーレスデータベースを表現して視覚化できます。

{{< img src="cloudcraft/components-azure/cosmos-db/component-cosmos-db-diagram.png" alt="相互接続された Azure コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **API**: データベース API を選択します。
- **Capacity mode**: データベース操作のキャパシティモードを選択します。PostgreSQL では使用できません。
- **Replicate mode**: データベースのレプリケーションモードを選択します。PostgreSQL では使用できません。
- **Request units**: 1 秒あたりのリクエスト単位数を入力します。PostgreSQL では使用できません。
- **Storage (GiB)**: データベースのトランザクションストレージの総容量をジビバイト単位で入力します。PostgreSQL では使用できません。
- **Node Count**: ワークロードで利用可能なワーカーノードの数を選択します。PostgreSQL でのみ使用できます。
- **Node vCores**: 各ノードで利用可能な仮想コア数を選択します。PostgreSQL でのみ使用できます。
- **Node Storage**: 各ノードで使用可能なストレージ量を選択します。PostgreSQL でのみ使用できます。
- **HA**: データベースを高可用性モードで実行するかどうかを選択します。PostgreSQL でのみ使用できます。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、Cosmos DB コンポーネントの JSON オブジェクトの例です。

### スキーマ

```json
{
    "type": "azurecosmosdb",
    "id": "c7fcbf73-87b1-48fd-886b-1ccdd38e0076",
    "region": "centralus",
    "mapPos": [-5,11],
    "api": "sql",
    "capacityMode": "provisioned",
    "replicationMode": "standard",
    "requestUnits": 400,
    "storageGb": 1,
    "postgresqlNodes": 1,
    "postgresqlCoordinatorCores": 4,
    "postgresqlCoordinatorStorage": 512,
    "postgresqlWorkerCores": 2,
    "postgresqlWorkerStorage": 128,
    "postgresqlHighAvailability": false,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/cosmos-db/",
    "locked": true
}

```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントには `azurecosmosdb` という文字列を指定する必要があります。
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **api: 文字列**: データベース API。[詳細は Azure の Cosmos DB ドキュメントを参照してください][2]。デフォルトは `sql` です。
- **capacityMode: 文字列**: データベース操作のキャパシティモード。`provisioned` または `serverless` の 2 つの値のいずれかを指定します。デフォルトは `provisioned` です。
- **replicationMode: 文字列**: データベースのレプリケーションモード。`standard`、`with-zones`、`multi-master` の 3 つの値のいずれかを指定します。デフォルトは `standard` です。
- **requestUnits: 数値**: 1 秒あたりのリクエストユニット数。デフォルトは `400` です。
- **storageGb: 文字列**: データベースのトランザクションストレージの総容量 (ギビバイト単位)。デフォルトは `1` です。
- **postgresqlNodes: 数値**: ワークロードで使用できるワーカーノードの数。デフォルトは `1` です。
- **postgresqlCoordinatorCores: 数値**: コーディネーターで使用できる仮想コアの数。デフォルトは `4` です。
- **postgresqlCoordinatorStorage: 数値**: コーディネーターで使用できるストレージ容量。デフォルトは `512` です。
- **postgreesqlWorkerCores: 数値**: 各ノードで使用できる仮想コアの数。デフォルトは `2` です。
- **postgreesqlWorkerStorage: 数値**: 各ノードで使用できるストレージ容量。デフォルトは `128` です。
- **postgresqlHighAvailability: ブール値**: データベースを高可用性モードで実行するかどうか。デフォルトは `false` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/azure/cosmos-db/