---
title: "EFS Component"
---
## 概要

Use the EFS block component to represent elastic file systems from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/efs/component-efs-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing the 'EFS' AWS component." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Storage**: The storage class used for the file system workload.
- **Storage (GiB)**: Amount of data stored per month.
- **Access Requests (GiB)**: Amount of data requested per month. Only available for Infrequent Access storage classes.
- **Throughput mode**: Select a throughput mode for the file system.
- **Throughput (MiB/s)**: Amount of additional throughput provided. Only available for the provisioned throughput mode.

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON of a EFS component:

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

- **type: efs**: The type of component.
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: string**: The AWS region the EFS component is deployed in. All global regions are supported except `cn-` regions.
- **availabilityZone: string**: The AWS availability zone the elastic file system is deployed in. Only applicable for one zone storage.
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **usageGb: number**: The amount of data stored in EFS per month, in gibibytes.
- **readWriteGb: number**: The amount of data requested per month. Only applicable if `infrequentAccess` is set to `true`.
- **infrequentAccess: boolean**: If `true`, the elastic file system uses the Infrequent Access storage class. Defaults to `false`.
- **throughputMode: string**: Select a throughput mode for the elastic file system. Accepted values are `bursting` or `provisioned`.
- **throughput: number**: The amount of additional throughput in mebibyte per seconds per month provisioned to the file system, based on its size. Only applicable if `throughputMode` is set to `provisioned`.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上のコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

The EFS component can be added to [VPCs][2], [security groups][3], and [subnets][4].

[1]: https://developers.cloudcraft.co/
[2]: /cloudcraft/components-aws/vpc/
[3]: /cloudcraft/components-aws/security-group/
[4]: /cloudcraft/components-aws/subnet/
