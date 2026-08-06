---
aliases:
- /ja/agent/guide/changing_container_registry
description: デプロイ環境や要件に応じて、Datadog のコンテナイメージレジストリを切り替えます。
title: コンテナレジストリを変更する
---
Datadog では、Datadog Container Registry、Google Artifact Registry (GAR)、Amazon ECR、Azure ACR、および Docker Hub にコンテナイメージを公開しています。

{{% container-images-table %}}

## コンテナレジストリの選択{#choosing-a-container-registry}

コンテナレジストリを選択する際は、Datadog は以下のアプローチを推奨しています。

1. **プライベートプルスルーキャッシュ**: 独自のインフラストラクチャーにプルスルーキャッシュを設定します。これにより、イメージの依存関係を最も適切に制御できます。クラウドプロバイダーのドキュメントを参照してください。
   - AWS: [Amazon ECR プルスルーキャッシュ][12]
   - GCP: [Artifact Registry リモートリポジトリ][13]
   - Azure: [Azure Container Registry キャッシュ][14]

2. **クラウドプロバイダーのレジストリ**: 特定のクラウドプロバイダー (AWS、GCP、または Azure) にデプロイする場合は、対応する Datadog パブリックレジストリを使用してください。
   - AWS デプロイ: `public.ecr.aws/datadog`
   - GCP デプロイ: `gcr.io/datadoghq`、`eu.gcr.io/datadoghq`、または `asia.gcr.io/datadoghq`
   - Azure デプロイ: `datadoghq.azurecr.io`

3. **Datadog Container Registry**: シンプルにするには `registry.datadoghq.com` を使用してください。このレジストリは追加のセットアップが不要で、非常に高いレート制限が設定されています。このレジストリはリクエストをこの URL にリダイレクトすることがあるため、ファイアウォールで `us-docker.pkg.dev/datadog-prod/public-images` へのトラフィックが許可されていることを確認してください。

4. **Docker Hub**: Docker Hub のサブスクリプションを利用していない場合は、レート制限の対象となるため、使用を避けてください。

<div class="alert alert-info">Datadog Agent Helm チャートは、Datadog サイト、クラスタータイプ、および <code>registryMigrationMode</code>に基づいて、デフォルトの Agent イメージレジストリを決定します。Datadog Operator チャートは、デフォルトで Datadog Agent Helm チャートの依存関係として含まれています。Datadog Operator チャートのバージョン 2.19.0 以降では、その依存関係を通じて Operator をインストールする場合、Datadog Agent Helm チャートの <code>registryMigrationMode</code> が、Operator によって管理される Agent イメージに適用されます。Operator Helm チャート自体は <code>registryMigrationMode</code>を定義していません。Operator Pod のイメージは、Operator チャートの <code>image.repository</code> の値によって個別に制御されます。</div>

レジストリを更新するには、デプロイ先のコンテナ環境の種類に応じて、レジストリの値を更新してください。プライベートレジストリを使用することもできますが、イメージをプルするには [プルシークレットを作成][1] する必要があります。

## Docker {#docker}

### レジストリを更新する {#updating-your-registry}

コンテナレジストリを更新するには、新しいレジストリのプルコマンドを実行します。さまざまなコンテナレジストリの Docker プルコマンドを確認するには、[Docker ドキュメントページの概要][2] にある例を参照してください。

## Kubernetes と Helm チャート {#kubernetes-with-helm-chart}

Kubernetes (GKE、EKS、AKS、OpenShift を含む) 上で Datadog Helm チャートを使用して Datadog Agent (または Datadog Cluster Agent) をデプロイする際にコンテナレジストリを更新するには、`values.yaml` を更新して別のレジストリを指定してください。

### Datadog Helm チャート >= v2.7.0 {#datadog-helm-chart-v270}

1. `values.yaml` を更新します。たとえば、Amazon ECR を使用する場合は次のようにします。
    ```yaml
    registry: public.ecr.aws/datadog
    ```
2. `values.yaml` から、`agents.image.repository`、`clusterAgent.image.repository`、または `clusterChecksRunner.image.repository` のオーバーライドを削除します。

### Datadog Helm チャート < v2.7.0 {#datadog-helm-chart-v270-1}

リポジトリを任意のレジストリに変更します。例として、Datadog Container Registry を使用する場合:

```yaml
agents:
  image:
    repository: registry.datadoghq.com/agent

clusterAgent:
  image:
    repository: registry.datadoghq.com/cluster-agent

clusterChecksRunner:
  image:
    repository: registry.datadoghq.com/agent
```

Datadog Helm チャートの使用方法については、[Datadog Kubernetes のドキュメント][3] とサンプル [`values.yaml`][4] ファイルを参照してください。

プライベートレジストリを使用する場合は、各イメージの `[key].image.pullSecrets` フィールドにプルシークレットを追加する必要があります。

```yaml
agents:
  image:
    pullSecrets:
      - name: PrivateRegistrySecret

clusterAgent:
  image:
    pullSecrets:
    - name: PrivateRegistrySecret

clusterChecksRunner:
  image:
    pullSecrets:
    - name: PrivateRegistrySecret
```

## Kubernetes と Datadog Operator {#kubernetes-with-the-datadog-operator}

Datadog Operator チャートバージョン 2.19.0 以降では、Datadog Agent Helm チャートの依存関係を通じて Operator がインストールされた場合、Datadog Agent Helm チャートの `registryMigrationMode` は Operator によって管理される Agent イメージに `registry.datadoghq.com` を使用できます。以前のバージョンでは、サイト固有のレジストリ (`gcr.io/datadoghq`、`eu.gcr.io/datadoghq`、`asia.gcr.io/datadoghq`、または `datadoghq.azurecr.io`) から Agent イメージを取得していました。このデプロイメントパスで Agent イメージに以前のサイト固有のレジストリを引き続き使用するには、Datadog Agent Helm チャートの `values.yaml` で `registryMigrationMode: ""` を設定してください。この設定は、レジストリを明示的に設定している場合は効果がありません。また、スタンドアロンの Operator Helm チャートの設定ではありません。Operator Pod イメージに別のレジストリを使用するには、Operator Helm の `values.yaml` で `image.repository` を設定してください。

Datadog Operator で Datadog Agent (または Datadog Cluster Agent) をデプロイする際に、レジストリを更新するには:

1. Datadog Agent マニフェストファイルを更新して、解決済みのレジストリをオーバーライドします。例として、`public.ecr.aws/datadog` を使用する場合:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    registry: public.ecr.aws/datadog
  // ..
```

2. `spec.override.nodeAgent.image.name`、`spec.override.clusterAgent.image.name`、および `spec.override.clusterChecksRunner.image.name` フィールドのオーバーライドをすべて削除します。
3. プライベートレジストリを使用する場合は、各イメージの `[key].image.pullSecrets` フィールドにプルシークレットを追加する必要があります。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      image:
        pullSecrets:
          - name: PrivateRegistrySecret
    clusterAgent:
      image:
        pullSecrets:
          - name: PrivateRegistrySecret
    clusterChecksRunner:
      image:
        pullSecrets:
          - name: PrivateRegistrySecret
  // ..
```

Datadog Operator の詳細については、[Operator を使用して Agent をデプロイする][5] を参照してください。


### Helm で別のコンテナレジストリを使用する {#using-another-container-registry-with-helm}

スタンドアロンの Operator Helm チャートをインストールする際に、`public.ecr.aws/datadog` などの別のレジストリを Operator Pod イメージに使用するには:

[`values.yaml`][6] を新しいイメージで更新します。

```yaml
image:
  repository: public.ecr.aws/datadog
```

## ECS {#ecs}

ECS 上でデプロイする際にレジストリを更新するには、`datadog-agent-ecs.json` ファイル内の `containerDefinitions` 配下にある `"image"` キーの値を `"public.ecr.aws/datadog/agent:latest"` に変更します。

```json
"image": "public.ecr.aws/datadog/agent:latest",
```

ECS 上での Datadog のデプロイについては、[Datadog ECS のドキュメント][7] とサンプル [`datadog-agent-ecs.json`][7] ファイルを参照してください。

## Fargate {#fargate}

Fargate でデプロイする際にレジストリを更新するには、Fargate タスク定義のイメージを更新して `public.ecr.aws` を使用するようにします。

```json
"image": "public.ecr.aws/datadog/agent:latest"
```

次回タスクが開始される際には、Docker Hub ではなく `public.ecr.aws` からプルされます。Fargate 上でのデプロイの詳細については、[ECS 上での Agent のデプロイ][8] および [EKS 上での Agent のデプロイ][9] を参照してください。

## Cluster Agent {#cluster-agent}

Helm チャートを使用して Datadog Agent と Datadog Cluster Agent をデプロイしている場合は、[Kubernetes と Helm チャート](#kubernetes-with-helm-chart)の手順に従ってください。その他の更新は不要です。上記で説明した Helm `values.yaml` への変更により、Cluster Agent と Datadog Agent の両方がプルされるリポジトリが変更されます。

Datadog Operator を使用して Datadog Cluster Agent をデプロイしている場合は、[Kubernetes と Datadog Operator](#kubernetes-with-the-datadog-operator)の手順に従ってください。その他の更新は不要です。Operator 設定を更新する手順により、Cluster Agent と Datadog Agent の両方がプルされるリポジトリが更新されます。

Datadog Cluster Agent の詳細については、[Cluster Agent のドキュメント][10] および [セットアップのドキュメント][11] を参照してください。

## Datadog Private Location ワーカー向け Kubernetes Helm {#kubernetes-helm-for-the-datadog-private-location-worker}

Private Location ワーカーのレジストリを更新するには、`datadog/synthetics-private-location-worker` イメージを `public.ecr.aws/datadog/synthetics-private-location-worker` や `gcr.io/datadoghq/synthetics-private-location-worker` などの別のレジストリを使用するように更新してください。

デフォルトのリポジトリ (`gcr.io/datadoghq`) を変更するには、`values.yaml` を新しいイメージで更新してください。

```yaml
image:
  repository: public.ecr.aws/datadog/synthetics-private-location-worker
```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials
[2]: https://docs.datadoghq.com/ja/agent/docker/?tab=standard
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/?tab=helm
[4]: https://github.com/DataDog/helm-charts/blob/dae884481c5b3c9b67fc8dbd69c944bf3ec955e9/charts/datadog/values.yaml#L19
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/?tab=operator#deploy-an-agent-with-the-operator
[6]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/values.yaml#L28
[7]: https://docs.datadoghq.com/ja/agent/amazon_ecs/?tab=awscli
[8]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-ecs
[9]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-eks
[10]: https://docs.datadoghq.com/ja/agent/cluster_agent/
[11]: https://docs.datadoghq.com/ja/agent/cluster_agent/setup/?tab=helm
[12]: https://docs.aws.amazon.com/AmazonECR/latest/userguide/pull-through-cache.html
[13]: https://cloud.google.com/artifact-registry/docs/repositories/remote-repo
[14]: https://learn.microsoft.com/en-us/azure/container-registry/container-registry-artifact-cache