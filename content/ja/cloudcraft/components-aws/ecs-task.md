---
title: ECS Task Component
---
## 概要

Use the ECS Task component to visualize Amazon ECS tasks from your Amazon Web Services architecture.

{{< img src="cloudcraft/components-aws/ecs-task/component-ecs-task-diagram.png" alt="Screenshot of an isometric Cloudcraft diagram showing interconnected AWS components." responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: Select a fill color for the body of the component. You can use the same colors for the 2D and 3D views or different colors for each.
- **Launch type**: Select the launch type for your standalone task. Supported options are Fargate and EC2.
- **CPU**: Select the CPU at the task level. This option is not available for EC2.
- **Memory (GB)**: Select the amount of memory available at the task level. This option is not available for EC2.
- **Storage (GiB)**: Enter the amount of storage provisioned for the task, in gibibytes. This option is not available for EC2.

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

The following is an example JSON object of a ECS Task component:

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

- **type: string**: The type of component. Must be a string of value `ecstask` for this component.
- **id: 文字列、uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **arn: 文字列**: [Amazon Resource Name][2] として知られる、AWS 内でのコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの AWS リージョン。API は、[AWS China を除く][3]すべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **launchType: string**: The launch type for the standalone task. Accepts one of the following values: `fargate` or `ec2`. Defaults to `ec2`.
- **cpu: number**: The number of vCPUs at the task level. See [Accepted values for cpu](#accepted-values-for-cpu) for more information. Defaults to `256`.
- **memoryGB: number**: The amount of memory at the task level. See [Accepted values for memoryGB](#accepted-values-for-memorygb) for more information. Defaults to `0.5`.
- **storageGB: number**: The amount of storage provisioned for the task, in gibibytes. Accepts a value between `20` and `200`. Defaults to `20`.
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: string**: A hexadecimal color for the component body in the 3D view. Defaults to `#ececed` for EC2 and `#3c3c3c` for Fargate.
  - **2d: string**: A hexadecimal color for the component body in the 2D view. Defaults to `#d86613`.
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

## `cpu` で許容される値

`cpu` キーは以下の値を受け付けます。

```
256, 512, 1024, 2048, 4096
```

**Note**: This key does not do anything if you set `launchType` to `ec2`.

## `memoryGB` で許容される値

`memoryGB` キーは以下の値を受け付けます。

```
0.5、1、2、3、4、5、6、7、8、9、10、11、12、13、14、15、16、17、18、19、
20、21、22、23、24、25、26、27、28、29、30
```

**Note**: This key does not do anything if you set `launchType` to `ec2`.

## `cpu` と `memoryGB` の有効な組み合わせ

The `cpu` and `memoryGB` keys together determine the size of your task, but you must provide a valid combination of values.

下の表は、どの組み合わせが有効かを示しています。

CPU  | memoryGB
---- | ---------
256  | 0.5、1、2
512  | {1..4}
1024 | {2..8}
2048 | {4..16}
4096 | {8..30}

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /ja/cloudcraft/faq/scan-error-aws-china-region/