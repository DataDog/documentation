---
title: EFS コンポーネント
---
## 概要

Amazon Web Services アーキテクチャの Elastic File System を表現するために、EFS ブロックコンポーネントを使用します。

{{< img src="cloudcraft/components-aws/efs/component-efs-diagram.png" alt="「EFS」AWS コンポーネントを表示するアイソメトリックな Cloudcraft ダイアグラムのスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Storage**: ファイルシステムワークロードに使用されるストレージクラス。
- **Storage (GiB)**: 月あたりに保存されるデータ量。
- **Access Requests (GiB)**: 月あたりにリクエストされるデータ量。Infrequent Access ストレージクラスでのみ利用可能です。
- **Throughput mode**: ファイルシステムのスループットモードを選択します。
- **Throughput (MiB/s)**: 提供される追加のスループット量。Provisioned Throughput モードでのみ利用可能です。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は EFS コンポーネントの JSON の例です。

```json
{
  "type": "efs",
  "id": "c7031016-107f-4bc7-a18a-b86321a135b7",
  "region": "us-east-1",
  "availabilityZone": "us-east-1a",
  "mapPos": [1,2],
  "usageGb": 10,
  "readWriteGb": 0,
  "infrequentAccess": false,
  "throughputMode": "bursting",
  "throughput": 0,
  "color": {
    "isometric": "#e05243",
    "2d": "#3f8624"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "link": "blueprint://33a8bf46-7326-4999-ba0a-789bcd94f0a2",
  "locked": true
}
```

- **type: efs**: コンポーネントの種類。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: EFS コンポーネントがデプロイされている AWS リージョン。`cn-` リージョンを除くすべてのグローバルリージョンがサポートされています。
- **availabilityZone: 文字列**: Elastic File System がデプロイされている AWS アベイラビリティゾーン。1 ゾーンストレージにのみ適用されます。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **usageGb: 数値**: EFS に月あたり保存されるデータ量 (GiB)。
- **readWriteGb: 数値**: 月あたりにリクエストされるデータ量。`infrequentAccess` が `true` に設定されている場合にのみ適用されます。
- **infrequentAccess: ブール値**: `true` の場合、Elastic File System は Infrequent Access ストレージクラスを使用します。デフォルトは `false` です。
- **throughputMode: 文字列**: Elastic File System のスループットモードを選択します。受け入れられる値は `bursting` または `provisioned` です。
- **throughput: 数値**: ファイルシステムのサイズに基づいて月あたりにファイルシステムにプロビジョニングされる追加のスループット量 (MiB/s)。`throughputMode` が `provisioned` に設定されている場合にのみ適用されます。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上のコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

EFS コンポーネントは [VPC][2]、[セキュリティグループ][3]、[サブネット][4]に追加できます。

[1]: https://developers.cloudcraft.co/
[2]: /ja/cloudcraft/components-aws/vpc/
[3]: /ja/cloudcraft/components-aws/security-group/
[4]: /ja/cloudcraft/components-aws/subnet/