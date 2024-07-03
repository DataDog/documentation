---
title: Database for PostgreSQL Component
---

## 概要

You can use the Database for PostgreSQL component to represent and visualize PostgreSQL databases from your Azure environment.

{{< img src="cloudcraft/components-azure/database-for-postgresql/component-database-for-postgresql-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected Azure components." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Deployment option**: データベースのデプロイのタイプを選択します。
- **Tier**: データベースのパフォーマンス階層を選択します。
- **Instance**: データベースのインスタンスタイプを選択します。インスタンスのタイプを変更すると、ツールバーに表示されるハードウェアの詳細も変更され、ハイパーバイザーによって使用されるものが反映されます。
- **High availability**: データベースの高可用性オプションを選択します。**Deployment option** が **Flexible server** に設定されている場合のみ利用可能です。
- **Storage (GiB)**: データベースで利用可能なストレージの総量をジビバイト単位で入力します。

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Database for Postgresql component:

### スキーマ

```json
{
    "type": "azurepostgresql",
    "id": "db7da7f6-9d1a-46df-808c-6979e02d5182",
    "region": "northcentralus",
    "mapPos": [5,0],
    "deploymentOption": "Single",
    "tier": "GeneralPurpose",
    "instance": "GP_Gen5_2",
    "storageMB": 20480,
    "haEnabled": false,
    "backupRetention": 7,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/postgresql",
    "locked": true
}
```

- **type: string**: The type of component. Must be a string of value `azurepostgresql` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **deploymentOption: 文字列**: データベースのデプロイのタイプ。デフォルトは `Single` です。
- **tier: 文字列**: データベースのパフォーマンス階層。デフォルトは `GeneralPurpose` です。
- **instance: 文字列**: データベースのインスタンスタイプ。デフォルトは `GP_Gen5_2` です。
- **storageMB: 文字列**: データベースで利用可能なストレージの総容量 (メガバイト単位)。デフォルトは `20480` です。
- **haEnabled: ブール値**: 高可用性を有効にするかどうか。デフォルトは `false.` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#CEE0F5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#0078D4` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/