---
title: ECS Task コンポーネント
---
## Overview

ECS Task コンポーネントを使用して、Amazon Web Services アーキテクチャから Amazon ECS タスクを視覚化します。

{{< img src="cloudcraft/components-aws/ecs-task/component-ecs-task-diagram.png" alt="相互接続された AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: コンポーネント本体の塗りつぶし色を選択します。2D ビューと 3D ビューで同じ色を使用することも、それぞれ異なる色を使用することもできます。
- **Launch type**: スタンドアロンタスクの起動タイプを選択します。サポートされているオプションは Fargate と EC2 です。
- **CPU**: タスクレベルで CPU を選択します。このオプションは EC2 では利用できません。
- **Memory (GB)**: タスクレベルで利用可能なメモリの量を選択します。このオプションは EC2 では利用できません。
- **Storage (GiB)**: タスクにプロビジョニングされるストレージの量をジビバイト単位で入力します。このオプションは EC2 では利用できません。

## API

Use the [Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. 

### Schema

以下は、ECS Task コンポーネントの JSON オブジェクトの例です。

```json
{
    "type": "ecstask",
    "id": "d76098b3-0d07-4362-80c9-018e474bb910",
    "arn": "arn:aws:ecs:us-east-1:746399320916:task/ecs-cluster/9790893504785954834",
    "region": "us-west-2",
    "mapPos": [7.5,3],
    "launchType": "fargate",
    "cpu": "256",
    "memoryGB": "0.5",
    "storageGB": 20,
    "color": {
        "isometric": "#ffeb3b",
        "2d": "#ffeb3b"
    },
    "link": "https://aws.amazon.com/ecs/",
    "locked": true
}
```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `ecstask` の文字列でなければなりません。
- **id: string, uuid**: The unique identifier for the component. The API uses a UUID v4 internally but accepts any unique string.
- **arn: string**: The globally unique identifier for the component within AWS, known as the [Amazon Resource Names][2].
- **region: string**: The AWS region for the component. The API supports all global regions, [except for AWS China][3].
- **mapPos: array**: The position of the component in the blueprint, expressed as an x- and y-coordinate pair.
- **launchType: 文字列**: スタンドアロンタスクの起動タイプ。`fargate` と `ec2` の値のいずれかを指定します。デフォルトは `ec2` です。
- **cpu: 数値**: タスクレベルの vCPU の数。詳しくは [cpu で許容される値](#accepted-values-for-cpu)を参照してください。デフォルトは `256` です。
- **memoryGB: 数値**: タスクレベルのメモリの量。詳しくは [memoryGB で許容される値](#accepted-values-for-memorygb)を参照してください。デフォルトは `0.5` です。
- **storageGB: 数値**: タスクにプロビジョニングされるストレージの量。`20` から `200` までの値を指定します。デフォルトは `20` です。
- **color: object**: The fill color for the component body.
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。EC2 のデフォルトは `#ececed`、Fargate のデフォルトは `#3c3c3c` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#d86613` です。
- **link: string, uri**: A URI that links the component to another diagram or an external website. Accepts one of the following formats: `blueprint://` or `https://`.
- **locked: boolean**: Whether to allow changes to the position of the component through the web interface. Defaults to `false`.

## Accepted values for `cpu`

The `cpu` key accepts the following values:

```
256, 512, 1024, 2048, 4096
```

**注**: このキーは `launchType` を `ec2` に設定すると何もしません。

## Accepted values for `memoryGB`

The `memoryGB` key accepts the following values:

```
0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
```

**注**: このキーは `launchType` を `ec2` に設定すると何もしません。

## Valid combinations for `cpu` and `memoryGB`

`cpu` キーと `memoryGB` キーを合わせて、タスクのサイズが決まりますが、有効な値の組み合わせを指定する必要があります。

The table below shows which combinations are valid.

CPU  | memoryGB
---- | ---------
256  | 0.5, 1, 2
512  | {1..4}
1024 | {2..8}
2048 | {4..16}
4096 | {8..30}

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ja/cloudcraft/faq/scan-error-aws-china-region/