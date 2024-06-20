---
disable_toc: false
further_reading:
- link: https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview
  tag: Documentation
  text: クラウドコストマネジメント
private: true
title: コンテナのコストの割り当て
---

{{< jqmath-vanilla >}}

## 概要

Datadog Cloud Cost Management (CCM) は、Kubernetes および ECS クラスター内の EC2 コンピュートコストを、それらのクラスター内で実行されている個々のポッドやタスクに自動的に割り当てます。ポッド、ノード、コンテナ、タスクのタグで強化されたコストメトリクスを使用して、クラウド請求全体のコンテキストでコンテナワークロードのコストを可視化します。

{{< img src="cloud_cost/container_cost_allocation/cost_allocation_table.png" alt="過去 1 週間のリクエストとアイドルコストを示すクラウドコスト配分表" style="width:100%;" >}}

## 前提条件

1. [AWS Cloud Cost インテグレーション][1]を設定・構成します。
1. 以下のうち少なくとも 1 つが実行されている必要があります。
    - EC2 インスタンスを使用した Kubernetes 環境での [**Datadog Agent**][2]。
    - ECS タスクの [**Datadog Container Monitoring**][3]。

## コストメトリクス

前提条件を満たすと、新しい AWS コストメトリクスが自動的に表示されます。

| AWS コストメトリクス                    | 説明    |
| ---                                | ----------- |
| `aws.cost.amortized.mem.allocated`   | ポッドや ECS タスクがリクエストしたメモリによって割り当てられる EC2 コスト。 <br> *`aws.cost.amortized` に基づきます* |
| `aws.cost.net.amortized.mem.allocated` | ポッドや ECS タスクがリクエストしたメモリによって割り当てられる EC2 コストの正味額 <br> *利用可能であれば、`aws.cost.net.amortized` に基づきます* |
| `aws.cost.amortized.cpu.allocated` | ポッドや ECS タスクがリクエストした CPU によって割り当てられる EC2 コスト。 <br> *`aws.cost.amortized` に基づきます* |
| `aws.cost.net.amortized.cpu.allocated` | ポッドや ECS タスクがリクエストした CPU によって割り当てられる EC2 コストの正味額 <br> *利用可能であれば、`aws.cost.net.amortized` に基づきます* |

これらの新しいコストメトリクスには、AWS のクラウドコストがすべて含まれています。これにより、EC2 インスタンス上で動作するポッドやタスクの可視性が向上し、すべてのクラウドコストを一度に可視化し続けることができるようになりました。

例えば、S3 バケット、RDS ストア、Kubernetes ポッドに `team` というタグを付けているとします。新しいメトリクスの 1 つを使用して、コストを `team` ごとにグループ化することができます。各グループには、そのチームの S3 と RDS のコスト、およびタグ付きポッドによって予約されたコンピュートリソースのコストが含まれます。

## コスト割り当て

コスト割り当てでは、[Cost and Usage Report][4] (CUR) の EC2 コンピュートコストを、インスタンス上で動作する各ポッドやタスクの個別のコストに分割します。この分割されたコストは、ノード、ポッド、タスクのタグで強化され、関連するディメンションでコストを分解することができるようになります。

### Kubernetes

Kubernetes の割り当てでは、Kubernetes ノードが関連する EC2 インスタンスコストと結合されます。ノードのクラスター名とすべてのノードタグは、そのノードの EC2 コンピュートコスト全体に追加されます。これにより、ノードにスケジュールされているポッドを考慮せずに、インスタンスのコストにクラスターレベルのディメンションを関連付けることができます。

次に、Datadog は、その日にそのノードで実行されたすべてのポッドを調べます。ポッドが予約したリソースと実行時間に基づいて、ノードのコストの適切な部分がそのポッドに割り振られます。この計算されたコストは、ポッドのすべてのタグでリッチ化されます。

すべてのポッドにリソース予約に基づくコストが割り当てられると、いくつかのノードコストが残ります。これは予約されていないリソースのコストで、**クラスターアイドルコスト**と呼ばれます。このコストには `is_cluster_idle` タグが割り当てられており、スケジュール可能だがどのポッドにも予約されていないリソースのコストを表しています。詳細については、[クラスターアイドルコストの理解](#understanding-cluster-idle-cost)セクションを参照してください。

### EC2 上の ECS

ECS の割り当てについては、Datadog が ECS に使用する各 EC2 インスタンスでどのタスクが実行されたかを判断しています。

Datadog は、各タスクの CPU またはメモリ使用量 (CUR で報告されている) に基づいて、インスタンスのコンピュートコストの適切な部分をそのタスクに割り当てます。計算されたコストは、タスクのすべてのタグと、タスクで実行されているコンテナのすべてのコンテナタグ (コンテナ名を除く) でリッチ化されます。

すべてのタスクにリソース予約に基づくコストが割り当てられると、いくつかのインスタンスコストが残ります。これは予約されていないリソースのコストで、**クラスターアイドル**コストと呼ばれます。このコストには `is_cluster_idle` タグが割り当てられており、どの ECS タスクによっても予約されていないリソースのコストを表しています。詳細については、[クラスターアイドルコストの理解](#understanding-cluster-idle-cost)セクションを参照してください。

### Fargate 上の ECS

Fargate 上で実行される ECS タスクは、すでに CUR で完全に割り当てられています。CCM は、AWS Fargate のコストにすぐに使えるタグやコンテナタグを追加して、そのデータをリッチ化します。

### その他すべて

Kubernetes ポッドや ECS タスクをホストするインスタンスで計算される EC2 以外のコストは、ソースメトリクスの `aws.cost.amortized` と同じ値やタグが与えられます。

## 新しいメトリクスの理解

EC2 インスタンスはバンドルされたスペック一式に基づいて価格が決定されるため、CPU とメモリに関連する特定のコストは存在しません。これに対処するため、Datadog はコスト割り当てを 2 回実行します。
  - 1 回は CPU リクエストのみに基づいて、`aws.cost.amortized.cpu.allocated` を生成します。
  - 1 回はメモリリクエストのみに基づいて、`aws.cost.amortized.mem.allocated` を生成します。

### どのメトリクスがコストを最もよく知ることができるかを理解する

- ワークロードが CPU に制約されている場合は、`cpu.allocated` のみを使用するのが効果的かもしれません。
- ワークロードがメモリに制約されている場合は、`mem.allocated` のみを使用することがユースケースに合致する可能性があります。
- CPU とメモリを多用するワークロードが混在している場合や、単にすべてのリソースを考慮した場合のコストを一貫して視覚化したい場合は、数式や関数を使用して、CPU とメモリのコストを組み合わせた独自の式を作成することができます。例えば、50/50 の分割の場合、以下をプロットすることができます。

$$\text"a " = \text" sum(aws.cost.amortized.cpu.allocated) by {team}"$$

$$\text"b" = \text"sum(aws.cost.amortized.mem.allocated) by {team}"$$

$$\text"mixed_cost" = (0.5 * \text"a") + (0.5 * \text"b")$$

乗数が正で合計が 1 である限り、計算式は首尾一貫したコストを生成します。

**注**: EC2 上のコンテナに関連しないコストについては、3 つのメトリクスはすべて等しくなります。
  - `aws.cost.amortized`
  - `aws.cost.amortized.cpu.allocated`
  - `aws.cost.amortized.mem.allocated`

## クラスターアイドルコストの理解

クラスターアイドルコストとは、どのワークロードによっても予約されていない CPU やメモリリソースのコストです。

このコストは、Kubernetes ノード、ECS ホスト、クラスターのいずれかのレベルで、`is_cluster_idle` タグを使用して可視化することができます。スケジュールされたポッドやタスクに割り当てられたすべてのコストには `is_cluster_idle: N/A` が、どのポッドやタスクにも割り当てられていないすべての計算コストには `is_cluster_idle: true` というタグがあります。

以下は、すべての Kubernetes クラスターコストを、クラスター名とクラスターアイドルコストに分けて表示するサンプルクエリです。

`sum:aws.cost.amortized.cpu.allocated{is_kubernetes:true} by {kube_cluster_name, is_cluster_idle}`

  {{< img src="/cloud_cost/container_cost_allocation/cost_allocation_editor_config.png" alt="クラスター名とクラスターアイドルコストタグによる内訳が混在するリソースの構成例" style="width:100%;" >}}

## タグ

Datadog は、コンテナコストが割り当てられるコストメトリクスに、追加のタグを適用します。

### Kubernetes

Kubernetes ポッド、Kubernetes ノードのタグに加え、以下のすぐに使えるタグがコストメトリクスに適用されます。

| すぐに使えるタグ  |  説明 |
| ---                 | ------------ |
| `kube_cluster_name` | Kubernetes クラスターの名前。 |
| `is_kubernetes`     | Kubernetes ノードの実行に関連するすべての EC2 コンピュートコスト。 |
| `is_cluster_idle`   | Kubernetes ノードで予約されていない CPU やメモリのコスト。 |

### ECS

ECS タスクのタグに加え、以下のすぐに使えるタグがコストメトリクスに適用されます。**注**: ECS コンテナ (`container_name` を除く) からのほとんどのタグが適用されます。

| すぐに使えるタグ      |  説明 |
| ---                     | ------------ |
| `ecs_cluster_name`      | ECS クラスターの名前。 |
| `is_aws_ecs`            | ECS の実行に関連するすべてのコスト。 |
| `is_aws_ecs_on_ec2`     | EC2 上の ECS の実行に関連するすべての EC2 コンピュートコスト。 |
| `is_cluster_idle`       | ECS タスクを実行する EC2 インスタンスで予約されていない CPU やメモリのコスト。 |
| `is_aws_ecs_on_fargate` | Fargate 上の ECS の実行に関連するすべてのコスト。 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/setup
[2]: /ja/containers/kubernetes/installation/?tab=operator
[3]: /ja/containers/amazon_ecs/?tab=awscli
[4]: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html