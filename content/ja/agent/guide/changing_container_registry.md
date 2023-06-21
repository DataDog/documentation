---
kind: ガイド
title: コンテナのレジストリを変更する
---

Datadog は、Google の gcr.io、AWS の ECR、および Docker Hub でコンテナイメージを公開しています。

| dockerhub.io                               | gcr.io                                              | public.ecr.aws                                            |
|--------------------------------------------|-----------------------------------------------------|-----------------------------------------------------------|
| datadog/agent                              | gcr.io/datadoghq/agent                              | public.ecr.aws/datadog/agent                              |
| datadog/cluster-agent                      | gcr.io/datadoghq/cluster-agent                      | public.ecr.aws/datadog/cluster-agent                      |
| datadog/dogstatsd                          | gcr.io/datadoghq/dogstatsd                          | public.ecr.aws/datadog/dogstatsd                          |
| datadog/synthetics-private-location-worker | gcr.io/datadoghq/synthetics-private-location-worker | public.ecr.aws/datadog/synthetics-private-location-worker |


GCR または ECR レジストリからのプルは、Docker Hub からのプルと同じように動作します (Notary を除く)。同じコマンド (パラメータは異なる) を使用して、同じイメージを取得することができます。

**注**: ECR と GCR は Notary をサポートしていません。Docker から取り込んだイメージの署名を検証する場合、この機能は GCR と ECR では動作しません。

レジストリを更新するには、デプロイ先のコンテナ環境の種類に応じて、レジストリ値を更新する必要があります。

## Docker

### レジストリを更新する

コンテナレジストリを更新するには、新しいレジストリ用の pull コマンドを実行します。異なるコンテナレジストリに対する Docker pull コマンドを確認するには、[Docker ドキュメントの概要ページ][1]の例を参照してください。

## Kubernetes と Helm チャート

Kubernetes (GKE、EKS、AKS、OpenShift を含む) 上の Datadog helm チャートで Datadog Agent (または Datadog Cluster Agent) をデプロイする際にコンテナのレジストリを更新するには、 `values.yaml` を更新して異なるレジストリを指定してください。

### Datadog Helm チャート >= v2.7.0

1. `values.yaml` を更新します:
    ```yaml
    registry: gcr.io/datadoghq
    ```
2. `values.yaml` にある `agents.image.repository`、`clusterAgent.image.repository`、`clusterChecksRunner.image.repository` のオーバーライドをすべて削除します。

### Datadog Helm チャート < v2.7.0 

リポジトリを `gcr.io` に変更します:

```yaml
agents:
  image:
    repository: gcr.io/datadoghq/agent  

clusterAgent:
  image:
    repository: gcr.io/datadoghq/cluster-agent

clusterChecksRunner:
  image:
    repository: gcr.io/datadoghq/agent
```

Datadog Helm チャートの使い方については、[Datadog Kubernetes のドキュメント][2] とサンプル [`values.yaml`][3] ファイルを参照してください。

## Kubernetes と Datadog Operator

Datadog Operator で Datadog Agent (または Datadog Cluster Agent) をデプロイする際に、レジストリを更新するには:

1. Datadog Agent のマニフェストファイルを更新し、デフォルトのレジストリ (`gcr.io/datadoghq`) をオーバーライドします。例えば、`public.ecr.aws/datadog` の場合:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    registry: gcr.io/datadoghq
  // ..
```
2. `spec.override.nodeAgent.image.name`、`spec.override.clusterAgent.image.name` および `spec.override.clusterChecksRunner.image.name` フィールドに対するすべてのオーバーライドを削除します。

Datadog Operator の詳細については、[Operator を使用して Agent をデプロイする][4]を参照してください。


### Helm で public.ecr.aws/datadog のレジストリを使用する

また、Helm チャートで Operator をインストールする際に、デフォルトの `gcr.io/datadoghq` レジストリから `public.ecr.aws/datadog` レジストリに変更することもできます。レジストリを `public.ecr.aws/datadog` に切り替えるには、次のようにします。

新しいイメージで [`values.yaml`][5] を更新します:

```yaml
image:
  repository: public.ecr.aws/datadog
```

## ECS

ECS にデプロイする際にレジストリを更新するには、`datadog-agent-ecs.json` ファイルで、`containerDefinitions` の `"image"` キーの値を `"public.ecr.aws/datadog/agent:latest"` へと変更します:

```json
"image": "public.ecr.aws/datadog/agent:latest",
```

ECS 上での Datadog のデプロイについては、[Datadog ECS のドキュメント][6]とサンプル [`datadog-agent-ecs` ファイル][6]を参照してください。

## Fargate

Fargate でデプロイする際にレジストリを更新するには、Fargate のタスク定義でイメージを更新して `public.ecr.aws` を使用するようにします:

```json
"image": "public.ecr.aws/datadog/agent:latest"
```

次にタスクを起動するときは、Docker Hub ではなく `public.ecr.aws` からプルするようにします。Fargate でのデプロイについては、[ECS での Agent のデプロイ][7]、[EKS での Agent のデプロイ][8]を参照してください。


## Cluster Agent

Datadog Agent と Datadog Cluster Agent のデプロイに Helm チャートを使用している場合は、[Kubernetes と Helm チャート](#kubernetes-with-helm-chart)の説明に従い、他の更新は必要ありません。上記の Helm `values.yaml` の変更により、Cluster Agent と Datadog Agent の両方が引き出されるリポジトリが変更されます。

Datadog Operator を使用して Datadog Cluster Agent をデプロイしている場合は、[Kubernetes と Datadog Operator](#kubernetes-with-the-datadog-operator)の説明に従い、他の更新は必要ありません。Operator の設定を更新する手順は、Cluster Agent と Datadog Agent の両方が引き出されるリポジトリを更新します。

Datadog Cluster Agent の詳細については、[Cluster Agent のドキュメント][9]および[セットアップのドキュメント][10]を参照してください。

## Datadog Private Location ワーカーに対する Kubernetes Helm

Private Location ワーカーのレジストリを更新するには、`datadog/synthetics-private-location-worker` イメージを `public.ecr.aws/datadog/synthetics-private-location-worker` または `gcr.io/datadoghq/synthetics-private-location-worker` イメージへ更新します。

デフォルトのリポジトリ (`gcr.io/datadoghq`) を変更するには、新しいイメージで `values.yaml` を更新します。

```yaml
image:
  repository: gcr.io/datadoghq/synthetics-private-location-worker
```

[1]: https://docs.datadoghq.com/ja/agent/docker/?tab=standard
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/?tab=helm
[3]: https://github.com/DataDog/helm-charts/blob/dae884481c5b3c9b67fc8dbd69c944bf3ec955e9/charts/datadog/values.yaml#L19
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/?tab=operator#deploy-an-agent-with-the-operator
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/values.yaml#L28
[6]: https://docs.datadoghq.com/ja/agent/amazon_ecs/?tab=awscli
[7]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-ecs
[8]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-eks
[9]: https://docs.datadoghq.com/ja/agent/cluster_agent/
[10]: https://docs.datadoghq.com/ja/agent/cluster_agent/setup/?tab=helm