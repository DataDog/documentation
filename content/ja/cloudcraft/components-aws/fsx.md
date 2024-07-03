---
title: FSx Component
---
## 概要

FSx コンポーネントを使用して、Amazon Web Services アーキテクチャの FSx ファイルシステムを表現します。

{{< img src="cloudcraft/components-aws/fsx/component-fsx-diagram.png" alt="'FSx' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **File system**: FSx で使用されるファイルシステム。
- **Storage (GiB)**: ファイルシステム用にプロビジョニングされたストレージの量。
- **Storage type**: ファイルシステムのストレージタイプを選択します。Lustre ファイルシステムでは使用できません。
- **Throughput (MiB/s)**: 集計スループット容量。Lustre ファイルシステムでは使用できません。
- **Backup size (GiB)**: データ重複排除用にプロビジョニングされたストレージの量。Lustre ファイルシステムでは使用できません。
- **Deployment type**: ファイルシステムのデプロイのタイプ、シングル AZ またはマルチ AZ。Lustre ファイルシステムでは使用できません。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、FSx コンポーネントの JSON の例です。

```json
{
  "type": "fsx",
  "id": "df89904a-a53e-4c2d-b63c-757c7ad6b4aa",
  "region": "us-east-1",
  "mapPos": [0,10],
  "fileSystemType": "windows",
  "storageCapacity": 32,
  "storageType": "ssd",
  "throughputCapacity": 8,
  "backupCapacity": 600,
  "multiAZ": false,
  "color": {
    "isometric": "#3f8624",
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

- **type: fsx**: コンポーネントのタイプ。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: FSx コンポーネントがデプロイされている AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **fileSystemType: 文字列**: FSx コンポーネントに使用されるファイルシステム。指定できる値は `windows` と `lustre` です。
- **storageCapacity: 数値**: ファイルシステムにプロビジョニングされたデータ量 (ジビバイト単位)。
- **storageType: 文字列**: ファイルシステムのストレージタイプを選択します。指定できる値は `ssd` と `hdd` です。`fileSystemType` が `windows` に設定されている場合のみ適用できます。
- **throughputCapacity: 数値**: 集計されたスループット容量 (秒あたりのメビバイト単位)。詳しくは、[`throughputCapacity` の許容値](#accepted-values-for-throughputcapacity)を参照してください。
- **backupCapacity: 数値**: データ重複排除用にプロビジョニングされたストレージの量 (ジビバイト単位)。`fileSystemType` が `windows` に設定されている場合のみ適用できます。
- **multiAZ: ブール値**: `true` の場合、FSx ファイルシステムは複数の AWS アベイラビリティゾーンにデプロイされます。`fileSystemType` が `windows` に設定されている場合のみ適用できます。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上のコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

FSx コンポーネントは [VPC][2]、[セキュリティグループ][3]、[サブネット][4]に追加することができます。

## `throughputCapacity` で許容される値

`throughputCapacity` キーは以下の値を受け付けます。

```
8, 16, 32, 64, 128, 256, 512, 1024, 2048
```

`throughputCapacity` キーは `fileSystemType` が `windows` に設定されている場合にのみ適用できます。

[1]: https://developers.cloudcraft.co/
[2]: /ja/cloudcraft/components-aws/vpc/
[3]: /ja/cloudcraft/components-aws/security-group/
[4]: /ja/cloudcraft/components-aws/subnet/