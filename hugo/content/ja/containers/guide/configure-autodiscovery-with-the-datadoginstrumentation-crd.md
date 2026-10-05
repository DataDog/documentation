---
description: Pod のアノテーションではなく DatadogInstrumentation カスタムリソースを使用して、Kubernetes ワークロードの
  Autodiscovery のチェックおよびログ収集を設定します。
further_reading:
- link: /containers/kubernetes/integrations/
  tag: ドキュメント
  text: Autodiscovery によるインテグレーションの設定
- link: /getting_started/containers/autodiscovery/
  tag: ドキュメント
  text: Autodiscovery の利用を開始する
- link: /containers/guide/autodiscovery-examples/
  tag: ドキュメント
  text: Autodiscovery のシナリオと例
- link: /containers/cluster_agent/
  tag: ドキュメント
  text: Datadog Cluster Agent
title: DatadogInstrumentation CRD を使用した Autodiscovery の設定
---
## 概要{#overview}

`DatadogInstrumentation` カスタムリソース (CR) を使用すると、[Pod アノテーション][2] ではなく、単一の Kubernetes リソースで [Autodiscovery][1] のチェックとログ収集を設定できます。このアプローチでは、Agent やアプリケーションを編集してロールアウトをトリガーすることなく、インテグレーション設定の有効化、更新、削除を行うことができます。

次のような場合に `DatadogInstrumentation` CR を使用します。

- ワークロードマニフェストを変更したりアノテーションを追加したりせずに、チェックとログ収集を設定する場合。
- アノテーション内の生の JSON ではなく、検証機能を持つ構造化されたリソース仕様を使用する場合。
- ワークロードごとの Autodiscovery 設定を、専用のバージョン管理された Kubernetes リソースとして一元管理する場合。
- アプリケーション Pod を再起動せずに、Autodiscovery 設定を更新または削除する場合。

`DatadogInstrumentation` リソースを作成または更新すると、[Datadog Cluster Agent][3] がターゲットを検証し、リソースのステータスを報告して、ターゲットのワークロードに Autodiscovery 設定を適用します。

## 要件 {#requirements}

Datadog Agent および Cluster Agent を **v7.82 以降**にアップグレードし、以下のいずれかの方法で `DatadogInstrumentation` CRD をインストールします。
- Datadog Operator **v1.29** 以降。
- Datadog Helm chart **v3.236.0** 以降。

## セットアップ {#setup}

`DatadogInstrumentation` コントローラーは Cluster Agent 内で実行され、デフォルトでは無効になっています。Datadog Operator または Helm を使用して有効にします。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Helm リポジトリを更新します。

```shell
helm repo update
```

2. Datadog Operator をアップグレードします。

```shell
helm upgrade datadog-operator datadog/datadog-operator
```

3. `DatadogAgent` リソースに `agent.datadoghq.com/instrumentation-crd-enabled` アノテーションを追加します。Cluster Agent は v7.82.0 以降である必要があります。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/instrumentation-crd-enabled: "true"
spec:
  global:
    [...]
```

4. 変更を適用します。

```shell
kubectl apply -f datadog-agent.yaml
```

Operator は、必要な Cluster Agent および Node Agent の環境変数を設定し、Cluster Agent に必要な RBAC を自動的に構成します。

{{% /tab %}}
{{% tab "Helm" %}}

1. Helm リポジトリを更新します。

```shell
helm repo update
```

2. `datadog-values.yaml` ファイルで、コントローラーを有効にします。

```yaml
datadog:
  instrumentationCrd:
    enabled: true
```

3. リリースをアップグレードします。

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

リソースを作成する前に、`DatadogInstrumentation` CRD がインストールされていることを確認してください。

```shell
kubectl get crd datadoginstrumentations.datadoghq.com
```

Datadog CRD を個別に管理している場合は、Datadog CRD Helm チャートをインストールまたはアップグレードしてください。

```shell
helm upgrade --install datadog-crds datadog/datadog-crds
```

## 対象ワークロード {#target-workloads}

Autodiscovery 用の `DatadogInstrumentation` (DDI) は、次の 3 つの要素で構成されます。

- `spec.targetRef`:  `apiVersion`、`kind`、および `name` を指定して、構成するワークロードを特定します。カスタムリソースと対象ワークロードは、同じ名前空間に存在する必要があります。
- `spec.config.checks`:  ワークロードに対して実行するインテグレーションチェックを定義します。
- `spec.config.logs`:  ワークロードから収集するログを定義します。

次の Kubernetes リソースを対象に指定できます。

| 対象 | グループ/バージョン/リソース | 最小 Agent バージョン | 注 |
|---|---|---|---|
| Deployment | `apps/v1/deployments` | 7.82.0 | |
| DaemonSet | `apps/v1/daemonsets` | 7.82.0 | |
| StatefulSet | `apps/v1/statefulsets` | 7.82.0 | |
| CronJob | `batch/v1/cronjobs` | 7.82.0 | |
| Job | `batch/v1/jobs` | 7.82.0 | |
| Service | `core/v1/services` | 7.82.0 | チェックのみをサポートします。「[対象 Service](#target-services)」を参照してください。|
| Rollout | `argoproj.io/v1alpha1/rollouts` | 7.83.0 | [Argo Rollouts][7] が必要です。|

この例では、`redis` という名前の `StatefulSet` に対して [Redis インテグレーション][4] を設定します。これは [アノテーションベースの例][2] と同じ設定です。

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: <YOUR_CR_NAME>
  namespace: <YOUR_TARGETS_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: StatefulSet
    name: redis
  config:
    checks:
      - integration: redisdb
        containerName: redis
        initConfig: {}
        instances:
          - host: "%%host%%"
            port: "6379"
            password: "%%env_REDIS_PASSWORD%%"
    logs:
      - containerName: redis
        tags:
          - env:demo
```

リソースを適用します。

```shell
kubectl apply -f redis-instrumentation.yaml
```

リソースのステータスを確認します。

```shell
kubectl describe datadoginstrumentation <YOUR_CR_NAME> -n <YOUR_TARGETS_NAMESPACE>
```

`checks` の各エントリは、次のフィールドを受け入れます。

`integration`
: 必須。実行する Datadog インテグレーションの名前 (例: `redisdb`)。

`containerName`
: ワークロードを対象とする場合は必須。値は、Pod 内のコンテナ名と一致する必要があります。Service を対象とする場合は、このフィールドを省略します。

`initConfig`
: 任意。インテグレーションの `init_config` セクション。

`instances`
: 任意。チェックのインスタンス設定。各インスタンスは、`%%host%%` を含む [Autodiscovery テンプレート変数][5] を使用できます。

`logs` の各エントリでは、`tags`、`type`、`path` など、Autodiscovery のログアノテーションと同じログ収集オプションを指定できます。各エントリには、Pod 内のコンテナと一致する `containerName` が必要です。

### 対象 Service{#target-services}

`Service` を対象にすると、Kubernetes Service のアノテーションと同様の [エンドポイントチェック][6] が設定されます。

- Datadog は、Service の各エンドポイントに対して 1 つずつエンドポイントチェックをスケジュールします。
- `%%host%%`はエンドポイントの IP に解決されます。
- エンドポイントが Kubernetes Pod によってバックアップされている場合、Datadog はその Pod について収集された Pod タグを追加します。
- エンドポイントが Pod によってバックアップされていない場合、Datadog はそのチェックを Pod 固有のタグを持たない通常のクラスターチェックに変換します。

<div class="alert alert-info">

Service を対象とする場合、`containerName` は使用しません。このフィールドは省略してください。

</div>

以下は、Kubernetes の `Service` に対して nginx チェックを設定する例です。

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: <YOUR_CR_NAME>
  namespace: <YOUR_SERVICES_NAMESPACE>
spec:
  targetRef:
    apiVersion: v1
    kind: Service
    name: nginx
  config:
    checks:
      - integration: nginx
        initConfig: {}
        instances:
          - name: "My NGINX Service Endpoints"
            nginx_status_url: "http://%%host%%:%%port%%/status/"
```

## 優先順位{#precedence}

複数の設定ソースがワークロードに適用される場合、Datadog Agent は次の順序で解決します (優先順位が高い順):

1. Pod アノテーション
2. `DatadogInstrumentation` カスタムリソース
3. 静的設定 (自動設定やマウントされたファイルなど)

ワークロードにチェックやログ収集のためのアノテーションベースの Autodiscovery 設定がすでに存在する場合、`DatadogInstrumentation` の設定によって上書きされることはありません。

## 対象ごとに 1 つのリソース {#one-resource-per-target}

1 つのワークロードまたは Service は、1 つの名前空間内の 1 つの`DatadogInstrumentation`リソースのみを対象にできます。検証 Webhook は、`targetRef` がすでに別のリソースに属しているか、`targetRef` がサポートされていない種類を指しているリソースを拒否します。

## スケジュールされたチェックを確認する {#verify-scheduled-checks}

リソースのステータスには、Cluster Agent が構成を受け入れたかどうかが表示されます。チェックがスケジュールされていることを確認するには、対象ワークロードが実行されている Node Agent で`agent configcheck` を実行します。

`DatadogInstrumentation` リソースを通じて構成されたチェックには、構成プロバイダーとして `instrumentation-checks`、構成ソースとして`datadoginstrumentation:<NAMESPACE>/<CR_NAME>` が一覧表示されます。次の例は、Redis ワークロードを対象とするリソースからスケジュールされた `redisdb` チェックの出力を示しています。

```text
> agent configcheck
# other configs...

=== redisdb check ===
Configuration provider: instrumentation-checks
Configuration source: datadoginstrumentation:cache/redis-instrumentation
Config for instance ID: redisdb:d5dd267b580bc10e
host: 10.244.0.7
password: "********"
port: 6379
Init Config:
{}
Log Config:
- tags:
  - env:demo
Auto-discovery IDs:
* redis
```

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/containers/autodiscovery/
[2]: /ja/containers/kubernetes/integrations/
[3]: /ja/containers/cluster_agent/
[4]: /ja/integrations/redisdb/
[5]: /ja/containers/guide/template_variables/
[6]: /ja/containers/cluster_agent/endpointschecks/
[7]: https://argoproj.github.io/rollouts/