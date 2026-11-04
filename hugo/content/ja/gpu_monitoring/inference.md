---
description: モデルデプロイメントのレイテンシー、スループット、健全性を、モデルが実行されている GPU の状態と併せて監視します。
further_reading:
- link: /gpu_monitoring/setup
  tag: ドキュメント
  text: GPU モニタリングの設定
- link: /gpu_monitoring/tracing
  tag: ドキュメント
  text: GPU モニタリングによる継続的なトレース
- link: /gpu_monitoring
  tag: ドキュメント
  text: GPU モニタリング機能の詳細
title: GPU モニタリングによる推論ワークロードの監視
---
{{< callout url="https://www.datadoghq.com/product-preview/gpu-tracing/" >}}
GPU モニタリングによる継続的なトレースを使用した推論ワークロードの最適化は、アーリーアクセスプレビュー版です。アクセスをリクエストするにはフォームに入力します。
{{< /callout >}}

## 概要 {#overview}

推論ワークロードはライブトラフィックを処理するため、応答の遅延やエラーがユーザーに直接影響します。GPU の利用率が低いことも、サービングコストが増加する原因となります。GPU モニタリングの推論ページでは、各モデルデプロイメントのパフォーマンスと、それが実行されている GPU の健全性を並べて表示します。MLOps チーム、プラットフォームチーム、ML エンジニアリングチームは、サービングの問題を 1 か所で発見し、修正できます。

推論ページでは、以下の情報を確認できます。

- **モデルデプロイメント全体のレイテンシーとスループット**: モデルデプロイメント全体の Time-to-First-Token (TTFT)、Inter-Token Latency (ITL)、および 1 秒あたりの出力トークン数を比較し、環境、デプロイメント、または Kubernetes ネームスペースでフィルタリングします。
- **デプロイメントの健全性を一目で把握**: 各モデルデプロイメントの平均同時リクエスト数、エラー率、健全性ステータス、モニター、および GPU キーバリュー (KV) キャッシュ使用量を確認し、注意が必要なデプロイメントを特定します。

{{< img src="gpu_monitoring/inference-page2.png" alt="Time-to-First-Token や出力トークンなどの特定のモデルデプロイメントの主要メトリクスが表示されている GPU モニタリングの推論ページ。" style="width:100%;" >}}

## セットアップ {#setup}

推論モニタリングは、次のデプロイメントで推論エンジンとして [vLLM][1] をサポートしています。スタンドアロン、推論ルーターとしての NVIDIA Dynamo、Ray。その他の推論エンジンおよびルーターはサポートされていません。サポートをリクエストするには、Datadog の担当者までお問い合わせください。

デプロイメントに対応するタブを選択します。

{{< tabs >}}
{{% tab "スタンドアロン vLLM" %}}

セットアップでは、エンジンメトリクスを収集する vLLM インテグレーションを使用します。

### 前提条件 {#prerequisites}

推論ワークロードの監視を開始するには、以下の条件を満たしている必要があります。
- [GPU モニタリングが有効][1]であること。
- 推論 Agent イメージ (`7.85.0-rc.5`) を実行していること。
- 推論ワークロードを Kubernetes 上で実行していること。
- vLLM を使用してモデルを提供していること。

### 0. GPU モニタリングを有効にする {#0-enable-gpu-monitoring}

まだの場合は、GPU ホストで [GPU モニタリングをセットアップ][1]してください。以下のステップでは、GPU モニタリングが有効になっている必要があります。

### 1. 推論 Agent イメージを使用する {#1-use-the-inference-agent-image}

推論 Agent イメージには vLLM チェックが含まれているため、vLLM インテグレーションを別途インストールする必要はありません。

以下の構成を既存の `DatadogAgent` リソースにマージします。既存の資格情報、サイト、およびその他の機能は変更しないでください。

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: 7.85.0-rc.5
```

JMX 対応またはフル Agent イメージを使用するには、`tag` を `7.85.0-rc.5-jmx` または `7.85.0-rc.5-full` に設定します。

リソースを適用し、Agent DaemonSet のロールアウトを待ちます。

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. メトリクスエンドポイントおよびポートを確認する {#2-confirm-the-metrics-endpoint-and-port}

vLLM インテグレーションは、以下のエンドポイントからメトリクスを収集します。

| ターゲット | エンドポイント | インテグレーション | メトリクス |
|--------|----------|-------------|---------|
| vLLM サーバー | `:8000/metrics` | vLLM | `vllm.*` |

vLLM は、OpenAI 互換 API サーバーと同じポート (デフォルトでは `8000`) でメトリクスを提供します。vLLM を別の `--port` で起動した場合は、ステップ 3 のアノテーションでそれを置き換えます。

### 3. インテグレーションを構成する {#3-configure-the-integration}

すべての vLLM Pod テンプレートに以下の [Autodiscovery アノテーション][2]を追加します。アノテーションキーで、`<VLLM_CONTAINER_NAME>` をイメージ名ではなく `spec.template.spec.containers[]` 内のコンテナの `name` フィールドの値に置き換えます。

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<VLLM_CONTAINER_NAME>.checks: |-
      {
        "vllm": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8000/metrics",
            "histogram_buckets_as_distributions": true,
            "collect_counters_with_distributions": true
          }]
        }
      }
```

`<SERVICE_NAME>` をモデルデプロイメントの名前 (`inference-vllm-glm5.3`など) に置き換えます。推論ページでは、メトリクスが `service` ごとにグループ化されます。

更新されたワークロードリソースを適用し、Pod を再作成して、Autodiscovery が新しいアノテーションを検出できるようにします。

### 4. セットアップを検証する {#4-verify-setup}

2 つのターミナルを使用して、vLLM エンドポイントが応答すること、および Agent がチェックを実行することを確認します。ワークロードの Kubernetes ネームスペースでポートフォワードを実行するか、現在のネームスペースと異なる場合は `-n <WORKLOAD_NAMESPACE>` を追加します。

**ターミナル 1**: vLLM メトリクスエンドポイントを転送し、実行したままにします。

```shell
kubectl port-forward pod/<VLLM_POD> 18000:8000
```

**ターミナル 2**: エンドポイントと Agent チェックを検証します。

```shell
# Show vLLM metrics from the endpoint
curl -fsS http://localhost:18000/metrics | grep '^vllm:'

# Look for "vllm" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

終了したら、ターミナル 1 で **Ctrl+C** を押して転送を停止します。

セットアップが完了すると、Datadog は vLLM Pod から `vllm.*` メトリクスを収集します。

メトリクスが表示されない場合は、推論トラフィックをデプロイメントに送信します。vLLM は、最初のリクエストを処理した後にのみ一部のメトリクスを出力します。

### 5. メトリクスのパーセンタイルを有効にする {#5-enable-percentiles-on-your-metrics}

特定の vLLM メトリクスでパーセンタイルをグラフ化するには、以下の分布メトリクスに対して[高度なクエリ機能][3]を有効にする必要があります。

| メトリクス |
|--------|
| `vllm.time_to_first_token.seconds` |
| `vllm.time_per_output_token.seconds` |
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

### 6. GPU トレーシングを有効にする (オプション) {#6-enable-gpu-tracing-optional}

推論リクエストと GPU アクティビティを相関付けるには、[GPU モニタリングによる継続的なトレース][4]をセットアップし、vLLM ワークロードにラベルを付けます。継続的なトレースには、CUDA および CUDA Profiling Tools Interface (CUPTI) バージョン 13 以降が必要です。

[1]: /ja/gpu_monitoring/setup
[2]: /ja/containers/kubernetes/integrations/?tab=annotations
[3]: /ja/metrics/distributions/#enabling-advanced-query-functionality
[4]: /ja/gpu_monitoring/tracing

{{% /tab %}}
{{% tab "Dynamo を使用した vLLM" %}}

セットアップでは 2 つのインテグレーションを使用します。Dynamo インテグレーションはフロントエンドとワーカーのランタイムメトリクスを収集し、vLLM インテグレーションはエンジンメトリクスを収集します。

### 前提条件 {#prerequisites-1}

推論ワークロードの監視を開始するには、以下の条件を満たしている必要があります。
- [GPU モニタリングが有効][1]であること。
- 推論 Agent イメージ (`7.85.0-rc.5`) を実行していること。
- 推論ワークロードを Kubernetes 上で実行していること。
- NVIDIA Dynamo デプロイメントで vLLM ワーカーを使用してモデルを提供していること。

### 0. GPU モニタリングを有効にする {#0-enable-gpu-monitoring-1}

まだの場合は、GPU ホストで [GPU モニタリングをセットアップ][1]してください。以下のステップでは、GPU モニタリングが有効になっている必要があります。

### 1. 推論 Agent イメージを使用する {#1-use-the-inference-agent-image-1}

推論 Agent イメージには Dynamo および vLLM チェックの両方が含まれているため、各インテグレーションを別途インストールする必要はありません。

以下の構成を既存の `DatadogAgent` リソースにマージします。既存の資格情報、サイト、およびその他の機能は変更しないでください。

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: 7.85.0-rc.5
```

JMX 対応またはフル Agent イメージを使用するには、`tag` を `7.85.0-rc.5-jmx` または `7.85.0-rc.5-full` に設定します。

リソースを適用し、Agent DaemonSet のロールアウトを待ちます。

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. メトリクスエンドポイントおよびポートを確認する {#2-confirm-the-metrics-endpoints-and-ports}

インテグレーションは、以下のエンドポイントからメトリクスを収集します。

| ターゲット | エンドポイント | インテグレーション | メトリクス |
|--------|----------|-------------|---------|
| Dynamo フロントエンド | `:8000/metrics` | Dynamo | `dynamo.frontend.*` |
| Dynamo ワーカー | `:9090/metrics` | Dynamo | `dynamo.component.*` |
| vLLM エンジン | `:9090/metrics` | vLLM | `vllm.*` |

デフォルトでは、Dynamo ワーカーと vLLM エンジンはエンドポイントを共有します。Dynamo は vLLM エンジンメトリクスをワーカーのメトリクスエンドポイント経由で公開し、各インテグレーションはそのエンドポイントから独自のメトリクスを収集します。

<div class="alert alert-info">vLLM エンジンを Dynamo ワーカーとは別に (サイドカーなどで) 実行している場合、ワーカーとエンジンはそれぞれ別のエンドポイントでメトリクスを公開します。この場合、 <code>dynamo</code> チェックの参照先をワーカーのメトリクスエンドポイントに、 <code>vllm</code> チェックの参照先をエンジンのメトリクスエンドポイントにステップ 3 で設定します。</div>

Dynamo Kubernetes Operator はデフォルトで `DYN_SYSTEM_PORT=9090` を設定します。ワーカーを直接起動する場合は、ポートを明示的に設定します。

```yaml
env:
  - name: DYN_SYSTEM_PORT
    value: "9090"
```

ワーカーが `9090` 以外のポートを使用している場合は、ステップ 3 のワーカーアノテーションで置き換えてください。

### 3. インテグレーションを構成する {#3-configure-the-integrations}

対応するワークロードの Pod テンプレートに以下の [Autodiscovery アノテーション][2]を追加します。各アノテーションキーで、プレースホルダーをイメージ名ではなく `spec.template.spec.containers[]` 内のコンテナの `name` フィールドの値に置き換えます。

Dynamo フロントエンド Pod テンプレートに以下のアノテーションを追加します。

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<FRONTEND_CONTAINER_NAME>.checks: |-
      {
        "dynamo": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8000/metrics"
          }]
        }
      }
```

`<SERVICE_NAME>` をモデルデプロイメントの名前 (`inference-vllm-glm5.3`など) に置き換えます。推論ページでは、メトリクスが `service` ごとにグループ化されます。

すべての vLLM ワーカー Pod テンプレートに以下のアノテーションを追加します。どちらのインテグレーションもポート `9090` でワーカーのメトリクスエンドポイントを使用します。

```yaml
metadata:
  annotations:
    ad.datadoghq.com/<WORKER_CONTAINER_NAME>.checks: |-
      {
        "dynamo": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:9090/metrics"
          }]
        },
        "vllm": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:9090/metrics",
            "histogram_buckets_as_distributions": true,
            "collect_counters_with_distributions": true
          }]
        }
      }
```

更新されたワークロードリソースを適用し、Pod を再作成して、Autodiscovery が新しいアノテーションを検出できるようにします。

### 4. セットアップを検証する {#4-verify-setup-1}

3 つのターミナルを使用して、各エンドポイントが応答すること、および Agent が両方のチェックを実行することを確認します。ワークロードの Kubernetes ネームスペースでポートフォワードを実行するか、現在のネームスペースと異なる場合は `-n <WORKLOAD_NAMESPACE>` を追加します。

**ターミナル 1**: フロントエンドメトリクスエンドポイントを転送し、実行したままにします。

```shell
kubectl port-forward pod/<FRONTEND_POD> 18000:8000
```

**ターミナル 2**: ワーカーメトリクスエンドポイントを転送し、実行したままにします。ワーカーが別のメトリクスポートを使用する場合は、`9090` をそのポートに置き換えます。

```shell
kubectl port-forward pod/<WORKER_POD> 19090:9090
```

**ターミナル 3**: 両方のエンドポイントと Agent チェックを検証します。

```shell
# Show the first ten lines of frontend metrics
curl -fsS http://localhost:18000/metrics | sed -n '1,10p'

# Show Dynamo and vLLM metrics from the worker
curl -fsS http://localhost:19090/metrics | grep -E '^(dynamo_|vllm:)'

# Look for "dynamo" and "vllm" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

ワーカーの出力に `dynamo_` と `vllm:` のメトリクス名が含まれていること、および Agent ステータスに両方のチェックがリストされていることを確認します。終了したら、ターミナル 1 と 2 で **Ctrl+C** を押して転送を停止します。

セットアップが完了すると、Datadog は以下を収集します。
- `dynamo.frontend.*` メトリクス (フロントエンド Pod)
- `dynamo.component.*` メトリクス (ワーカー Pod)
- `vllm.*` メトリクス (ワーカー Pod)

メトリクスが表示されない場合は、推論トラフィックをデプロイメントに送信します。Dynamo と vLLM は、最初のリクエストを処理した後にのみ一部のメトリクスを出力します。

### 5. メトリクスのパーセンタイルを有効にする {#5-enable-percentiles-on-your-metrics-1}

特定の vLLM および Dynamo メトリクスでパーセンタイルをグラフ化するには、以下の分布メトリクスに対して[高度なクエリ機能][3]を有効にする必要があります。

| メトリクス |
|--------|
| `dynamo.frontend.time_to_first_token.seconds` |
| `dynamo.frontend.inter_token_latency.seconds` |
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

### 6. GPU トレーシングを有効にする (オプション) {#6-enable-gpu-tracing-optional-1}

推論リクエストと GPU アクティビティを相関付けるには、[GPU モニタリングによる継続的なトレース][4]をセットアップし、vLLM ワーカーワークロードにラベルを付けます。継続的なトレースには、CUDA および CUDA Profiling Tools Interface (CUPTI) バージョン 13 以降が必要です。

[1]: /ja/gpu_monitoring/setup
[2]: /ja/containers/kubernetes/integrations/?tab=annotations
[3]: /ja/metrics/distributions/#enabling-advanced-query-functionality
[4]: /ja/gpu_monitoring/tracing

{{% /tab %}}
{{% tab "Ray を使用した vLLM" %}}

セットアップでは 2 つのインテグレーションを使用します。[Ray インテグレーション][5]は Ray クラスターメトリクスを収集し、[vLLM インテグレーション][6]はエンジンメトリクスを収集します。

### 前提条件 {#prerequisites-2}

推論ワークロードの監視を開始するには、以下の条件を満たしている必要があります。
- 推論 Agent イメージ (`7.85.0-rc.5`) で [GPU モニタリングが有効][1]になっていること。
- 推論ワークロードは Kubernetes で実行され、Ray クラスターは KubeRay によって管理されていること。
- Ray 内で vLLM を使用してモデルを提供していること (例: Ray Serve を使用)。

### 1. 推論 Agent イメージを使用する {#1-use-the-inference-agent-image-2}

推論 Agent イメージには Ray および vLLM チェックの両方が含まれているため、各インテグレーションを別途インストールする必要はありません。

以下の構成を既存の `DatadogAgent` リソースにマージします。既存の資格情報、サイト、およびその他の機能は変更しないでください。

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: 7.85.0-rc.5
```

JMX 対応またはフル Agent イメージを使用するには、`tag` を `7.85.0-rc.5-jmx` または `7.85.0-rc.5-full` に設定します。

リソースを適用し、Agent DaemonSet のロールアウトを待ちます。

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. メトリクスエンドポイントおよびポートを確認する {#2-confirm-the-metrics-endpoint-and-port-1}

vLLM が Ray 内で実行される場合、独自のメトリクスエンドポイントは提供されません。代わりに、vLLM は Ray を通じてエンジンメトリクスを記録し、各 Ray ノードが Ray の独自のメトリクスと同じエンドポイントで `ray_vllm_` プレフィックスを付けてそれらを公開します。Ray インテグレーションと vLLM インテグレーションはどちらもそのエンドポイントから収集します。

この例では、Ray の起動時に `--metrics-export-port` によって設定されるポート `8080` を使用します。Ray ノードが異なるポートを使用している場合は、ステップ 3 のアノテーション内の `8080` を置き換えます。

### 3. インテグレーションを構成する {#3-configure-the-integrations-1}

vLLM を実行するすべての KubeRay ワーカーグループの Pod テンプレートに以下の [Autodiscovery アノテーション][2]を追加します。`RayCluster` または `RayService` リソースでは、Pod テンプレートは `workerGroupSpecs[].template` の下にあります。アノテーションキーで、`<RAY_CONTAINER_NAME>` をイメージ名ではなく Ray コンテナの `name` フィールドの値に置き換えます。

vLLM インテグレーションは `extra_metrics` を使用して、各 `ray_vllm_` メトリクスを推論ページで使用される名前にマッピングします。

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<RAY_CONTAINER_NAME>.checks: |-
      {
        "ray": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8080"
          }]
        },
        "vllm": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8080",
            "histogram_buckets_as_distributions": true,
            "collect_counters_with_distributions": true,
            "exclude_metrics": ["python_.+", "process_.+"],
            "exclude_labels": ["WorkerId", "SessionName", "otel_scope_name", "otel_scope_schema_url", "otel_scope_version"],
            "extra_metrics": [{
              "ray_vllm_time_to_first_token_seconds": "time_to_first_token.seconds",
              "ray_vllm_e2e_request_latency_seconds": "e2e_request_latency.seconds",
              "ray_vllm_request_prompt_tokens": "request.prompt_tokens",
              "ray_vllm_request_generation_tokens": "request.generation_tokens",
              "ray_vllm_request_params_n": "request.params.n",
              "ray_vllm_prompt_tokens": "prompt_tokens",
              "ray_vllm_generation_tokens": "generation_tokens",
              "ray_vllm_request_success": "request.success",
              "ray_vllm_request_decode_time_seconds": "request.decode_time.seconds",
              "ray_vllm_request_prefill_time_seconds": "request.prefill_time.seconds",
              "ray_vllm_request_queue_time_seconds": "request.queue_time.seconds",
              "ray_vllm_request_prefill_kv_computed_tokens": "request.prefill_kv_computed_tokens",
              "ray_vllm_prompt_tokens_cached": "prompt_tokens.cached"
            }]
          }]
        }
      }
```

`<SERVICE_NAME>` をモデルデプロイメントの名前 (`inference-vllm-glm5.3`など) に置き換えます。推論ページでは、メトリクスが `service` ごとにグループ化されます。

`vllm` インスタンスの場合:
- `exclude_metrics` オプションは、vLLM エンジンではなく Ray プロセスを記述する Ray エンドポイント上の Python およびプロセスに関するメトリクスをスキップします。
- `exclude_labels` オプションは、ワーカーまたはクラスターが再起動するたびに変更される Ray ラベルを削除します。

<div class="alert alert-info">ご利用の <code>ray</code> チェックがすでに <code>ray_vllm_</code> メトリクスを <code>extra_metrics</code>経由で収集している場合、次の 2 つとして送信されます。 <code>ray.ray_vllm_*</code> および <code>vllm.*</code>。これらのパターンを <code>ray</code> チェックから削除します ( <code>ray.ray_vllm_*</code> の名前を使用するダッシュボードやモニターを移行した後)。</div>

更新されたワークロードリソースを適用します。KubeRay では、ワーカーグループの Pod テンプレートを変更すると、ワーカー Pod が再作成されます。`RayService` の場合、アップグレード戦略によっては KubeRay が代わりに新しい Ray クラスターを作成できます。

### 4. セットアップを検証する {#4-verify-setup-2}

2 つのターミナルを使用して、Ray エンドポイントが vLLM メトリクスを公開すること、および Agent が両方のチェックを実行しすることを確認します。ワークロードの Kubernetes ネームスペースでポートフォワードを実行するか、現在のネームスペースと異なる場合は `-n <WORKLOAD_NAMESPACE>` を追加します。

**ターミナル 1**: ワーカー Pod の Ray メトリクスエンドポイントを転送し、実行したままにします。

```shell
kubectl port-forward pod/<RAY_WORKER_POD> 18080:8080
```

**ターミナル 2**: エンドポイントと Agent チェックを検証します。

```shell
# Show vLLM metrics published by Ray
curl -fsS http://localhost:18080 | grep '^ray_vllm_'

# Look for "ray" and "vllm" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

終了したら、ターミナル 1 で **Ctrl+C** を押して転送を停止します。

セットアップが完了すると、Datadog は以下を収集します。
- `ray.*` メトリクス (Ray Pod)
- `vllm.*` メトリクス (vLLM を実行する Ray ワーカー Pod)

メトリクスが表示されない場合は、推論トラフィックをデプロイメントに送信します。vLLM は、最初のリクエストを処理した後にのみ一部のメトリクスを出力します。

<div class="alert alert-info">一部の vLLM バージョンでは、実行中および待機中のリクエスト数や KV キャッシュ使用量などのゲージメトリクスは Ray を通じて公開されません。エンドポイントに <code>ray_vllm_num_requests_running</code> または <code>ray_vllm_kv_cache_usage_perc</code> メトリクスがない場合、推論ページの<strong>リクエスト</strong>列と <strong>GPU キャッシュ</strong>列は空白のままになります。</div>

### 5. メトリクスのパーセンタイルを有効にする {#5-enable-percentiles-on-your-metrics-2}

特定の vLLM メトリクスでパーセンタイルをグラフ化するには、以下の分布メトリクスに対して[高度なクエリ機能][3]を有効にする必要があります。

| メトリクス |
|--------|
| `vllm.time_to_first_token.seconds` |
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

### 6. GPU トレーシングを有効にする (オプション) {#6-enable-gpu-tracing-optional-2}

推論リクエストと GPU アクティビティを相関付けるには、[GPU モニタリングによる継続的なトレース][4]をセットアップし、Ray ワーカーワークロードにラベルを付けます。継続的なトレースには、CUDA および CUDA Profiling Tools Interface (CUPTI) バージョン 13 以降が必要です。

[1]: /ja/gpu_monitoring/setup
[2]: /ja/containers/kubernetes/integrations/?tab=annotations
[3]: /ja/metrics/distributions/#enabling-advanced-query-functionality
[4]: /ja/gpu_monitoring/tracing
[5]: /ja/integrations/ray/
[6]: /ja/integrations/vllm/

{{% /tab %}}
{{< /tabs >}}

## 推論ページを探索する {#explore-the-inference-page}

開始するには、GPU モニタリングの[推論ページ][2]に移動します。

### モデルデプロイメントをフィルタリングする {#filter-model-deployments}

ページ上部の検索バーを使用して、モデルデプロイメント、モデル、エンジン、またはネームスペースを検索します。{{< ui >}}Env{{< /ui >}}、{{< ui >}}Deployment{{< /ui >}}、および {{< ui >}}Kube Namespace{{< /ui >}} でフィルタリングすることも、{{< ui >}}Filter{{< /ui >}} をクリックして他のフィルターを追加することもできます。

### レイテンシーとスループットについて理解する {#understand-latency-and-throughput}

ページ上部のグラフには、モデルデプロイメントのレイテンシーとスループットが表示されます。

| グラフ | 説明 |
|-------|-------------|
| Time to First Token | リクエストを受信してから最初の出力トークンが生成されるまでの時間。|
| Inter-Token Latency | 連続する出力トークン間の時間。|
| Output Tokens | 1 秒あたりに生成される出力トークン数。|

特定のデプロイメントで Time to First Token や Inter-Token Latency が急増し、他のデプロイメントで同様の変化が見られない場合は、共有インフラストラクチャーではなくそのデプロイメントに問題があることを示しています。

### モデルデプロイメントの健全性を確認する {#review-model-deployment-health}

ページ下部のテーブルには、各モデルデプロイメントが推論エンジン、環境、Kubernetes ネームスペースとともに一覧表示され、以下の列が含まれています。

| 列 | 説明 |
|--------|-------------|
| Output Tok/s | 1 秒あたりに生成される出力トークン数。|
| Requests | 選択された期間における平均同時実行リクエスト数。|
| TTFT | Time to First Token。|
| ITL | Inter-Token Latency。|
| Error Rate | エラーを返したリクエストの割合。|
| Health | デプロイメントの健全性ステータス ({{< ui >}}Warning{{< /ui >}} または {{< ui >}}Critical{{< /ui >}} など)。|
| Monitors | デプロイメントに関連付けられたモニター。|
| GPU Cache | GPU KV キャッシュの使用量。|

{{< ui >}}Column Settings{{< /ui >}} をクリックして、表示する列を選択します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/vllm/
[2]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=inference-monitoring