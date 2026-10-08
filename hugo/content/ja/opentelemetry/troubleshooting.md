---
further_reading:
- link: https://opentelemetry.io/docs/collector/troubleshooting/
  tag: 外部サイト
  text: OpenTelemetry トラブルシューティング
title: トラブルシューティング
---
Datadog で OpenTelemetry を使用して予期しない動作が発生した場合は、このガイドが問題の解決に役立つ可能性があります。引き続き問題が発生する場合は、[Datadog サポート][1]にお問い合わせください。

## 正確でないまたは予期しないホスト名 {#incorrect-or-unexpected-hostnames}

OpenTelemetry を Datadog で使用する場合、ホスト名に関連するさまざまな問題が発生することがあります。以下のセクションでは、一般的なシナリオとその解決策について説明します。

### 異なる Kubernetes のホスト名とノード名 {#different-kubernetes-hostname-and-node-name}

**症状**: Kubernetes にデプロイする際、Datadog によって報告されるホスト名が期待されるノード名と一致しません。

**原因**: これは通常、`k8s.node.name` (およびオプションで `k8s.cluster.name`) タグが欠落していることが原因です。

**解決**:

1. アプリケーションデプロイメントに `k8s.pod.ip` 属性を構成します。

   ```yaml
   env:
     - name: MY_POD_IP
       valueFrom:
         fieldRef:
           apiVersion: v1
           fieldPath: status.podIP
     - name: OTEL_RESOURCE_ATTRIBUTES
       value: k8s.pod.ip=$(MY_POD_IP)
   ```

2. コレクターで `k8sattributes` プロセッサーを有効にします。

   ```yaml
   k8sattributes:
   [...]
   processors:
     - k8sattributes
   ```

または、`datadog.host.name` 属性を使用してホスト名をオーバーライドできます。

   ```yaml
   processors:
     transform:
       trace_statements:
         - context: resource
           statements:
             - set(attributes["datadog.host.name"], "${NODE_NAME}")
   ```

ホストを識別する属性の詳細については、[OpenTelemetry のセマンティック規約をホスト名にマッピングする][2]を参照してください。セットアップの推奨ホスト名構成については、[ホスト名とタグ付け][9]を参照してください。

### AWS Fargate デプロイメントでの予期しないホスト名 {#unexpected-hostnames-with-aws-fargate-deployment}

**症状**: AWS Fargate 環境では、トレースに対して誤ったホスト名が報告される場合があります。

**原因**: Fargate 環境では、デフォルトのリソース検出が ECS メタデータを正しく識別できず、誤ったホスト名が割り当てられることがあります。

**解決**:

Collector 構成で `resourcedetection` プロセッサーを構成し、`ecs` 検出機能を有効にします。

```yaml
processors:
  resourcedetection:
    detectors: [env, ecs]
    timeout: 2s
    override: false
```

### ゲートウェイコレクターがホストメタデータを転送しない {#gateway-collector-not-forwarding-host-metadata}

**症状**: ゲートウェイデプロイメントにおいて、複数のホストからのテレメトリが単一のホストからのものとして表示される、またはホストメタデータが正しく転送されない場合があります。

**原因**: これは、ゲートウェイコレクターの構成が Agent collector からのホストメタデータ属性を保持または適切に転送しない場合に発生します。

**解決**:

1. エージェントコレクターを構成してホストメタデータを収集し、転送します。

   ```yaml
   processors:
     resourcedetection:
       detectors: [system, env]
     k8sattributes:
       passthrough: true
   ```

2. ゲートウェイコレクターを構成して必要なメタデータを抽出し、転送します。

   ```yaml
   processors:
     k8sattributes:
       extract:
         metadata: [node.name, k8s.node.name]
     transform:
       trace_statements:
         - context: resource
           statements:
             - set(attributes["datadog.host.use_as_metadata"], true)
   
   exporters:
     datadog:
       hostname_source: resource_attribute
   ```

詳細については、[OpenTelemetry のセマンティック規約をインフラストラクチャーリストのホスト情報にマッピングする][3]を参照してください。

### 同じホストが異なる名前で複数回表示される {#the-same-host-shows-up-multiple-times-under-different-names}

**症状**: 単一のホストが Datadog 内で複数の名前で表示されます。たとえば、OpenTelemetry Collector からのエントリ (OTel ロゴ付き) と、Datadog Agent からの別のエントリが表示される場合があります。

**原因**: 単一のホスト名リソース属性に合わせることなく、複数の取り込み方法 (例: OTLP + Datadog Agent、または DogStatsD + OTLP) を通じてホストが監視されている場合、Datadog は各パスを個別のホストとして扱います。

**解決**:
1. 同じマシンから Datadog にデータを送信しているすべてのアクティブなテレメトリ取り込みパスを特定します。
2. 単一のホスト名ソースを選択し、Datadog Agent のホスト名に依存するか、特定のホスト名リソース属性 (例: `k8s.node.name`) に依存するかを決定します。
3. 各パス (Agent、Collector など) を構成して、一貫したホスト名を報告するようにします。たとえば、OTLP 属性でホスト名を設定している場合は、変換プロセッサーを次のように構成します。
    ```yaml
    processors:
      transform:
        trace_statements:
          - context: resource
            statements:
              - set(attributes["datadog.host.name"], "shared-hostname")
    ```
4. Datadog (インフラストラクチャリスト、ホストマップなど) で検証し、ホストが単一の名前で表示されるようになったことを確認します。

## 起動後のホストタグの遅延 {#host-tag-delays-after-startup}

**症状**: Datadog Agent または OpenTelemetry Collector の起動後、テレメトリデータにホストタグが表示されるまでに遅延が発生することがあります。この遅延は通常 10 分未満ですが、場合によっては 40 〜 50 分まで長引くことがあります。

**原因**: この遅延は、タグをテレメトリデータに関連付ける前にホストメタデータを Datadog のバックエンドで処理およびインデックス化する必要があるために発生します。

**解決**:

Datadog exporter 構成 (`host_metadata::tags`) または Datadog Agent の `tags` セクションで構成されたホストタグは、テレメトリデータにすぐには適用されません。タグは、バックエンドがホストメタデータを解決した後に最終的に表示されます。

セットアップを選択して、具体的な手順を確認してください。

{{< tabs >}}
{{% tab "Datadog Agent OTLP Ingestion" %}}

ホストタグが解決されるまでの間を埋めるために、`datadog.yaml` で `expected_tags_duration` を設定します。

```yaml
expected_tags_duration: "15m"
```

この設定により、指定された時間 (この例では 15 分間) ですべてのテレメトリに期待されるタグが追加されます。

{{% /tab %}}

{{% tab "OpenTelemetry Collector" %}}

`transform` プロセッサーを使用して、ホストタグを OTLP 属性として設定します。たとえば、environment タグと team タグを追加するには、以下の手順を実行します。

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          # OpenTelemetry semantic conventions
          - set(attributes["deployment.environment.name"], "prod")
          # Datadog-specific host tags
          - set(attributes["ddtags"], "env:prod,team:backend")
...
```

このアプローチでは、OpenTelemetry のセマンティック規約と Datadog 固有のホストタグを組み合わせることで、OpenTelemetry 環境と Datadog 環境の両方で適切な機能を確保します。

{{% /tab %}}
{{< /tabs >}}

## インフラストラクチャータグがテレメトリから欠落している {#infrastructure-tags-are-missing-from-telemetry}

**症状**: DDOT Collector 設定で `infraattributes` プロセッサーを有効にしましたが、Kubernetes レベルのタグ (`k8s.pod.name`、`k8s.namespace.name`、または Pod ラベルなど) がトレース、メトリクス、またはログに表示されません。

**原因**: `infraattributes` プロセッサーは、ソースコンテナを識別するために受信テレメトリで特定のリソース属性を必要とします。

入力に `container.id` リソース属性が存在しない場合、プロセッサーは自動的にそれを検出しようとします。以下のメソッドが、優先度の高い順に試行されます。

| リソース属性                              | 検出メソッド                  |
|--------------------------------------------------|-----------------------------------|
| `process.pid` (int)                              | コンテナの外部 PID に基づく |
| `datadog.container.cgroup_inode` (int)           | コンテナの cgroup inode に基づく |
| `k8s.pod.uid` (str) + `k8s.container.name` (str) | コンテナの Pod と名前に基づく |

テレメトリがいずれの検出メソッドの属性も提供しない場合、プロセッサーは対応する Kubernetes メタデータを検索できません。

**解決**:

以下の手順に従って、テレメトリに必要な属性が含まれていることを確認します。

1.  **SDK 自動インスツルメンテーションを使用する (推奨)**: 使用している言語の OpenTelemetry 自動インスツルメンテーションを最新バージョンにアップグレードします。`container.id` または `process.pid` が自動的に提供されることが多いため、これは推奨される最初のステップです。これらの属性が自動的に追加されない場合は、SDK のドキュメントを確認してください。一部の SDK (Go など) では、これを有効にするための特定の設定 ([resource.WithContaineID][8] など) が提供されています。

2.  **リソース属性を手動で設定する**: 自動インスツルメンテーションで必要な属性が追加されない場合は、`OTEL_RESOURCE_ATTRIBUTES` を使用して手動で設定してください。これにより、プロセッサーは `k8s.pod.uid` および `k8s.container.name` 検出メソッドを使用できるようになります。例:
    ```yaml
    env:
      - name: OTEL_SERVICE_NAME
        value: {{ .Chart.Name }}
      - name: OTEL_K8S_NAMESPACE
        valueFrom:
          fieldRef:
            apiVersion: v1
            fieldPath: metadata.namespace
      - name: OTEL_K8S_NODE_NAME
        valueFrom:
          fieldRef:
            apiVersion: v1
            fieldPath: spec.nodeName
      - name: OTEL_K8S_POD_NAME
        valueFrom:
          fieldRef:
            apiVersion: v1
            fieldPath: metadata.name
      - name: OTEL_K8S_POD_ID
        valueFrom:
          fieldRef:
            apiVersion: v1
            fieldPath: metadata.uid
      - name: OTEL_RESOURCE_ATTRIBUTES
        value: >-
          service.name=$(OTEL_SERVICE_NAME)、
          k8s.namespace.name=$(OTEL_K8S_NAMESPACE)、
          k8s.node.name=$(OTEL_K8S_NODE_NAME)、
          k8s.pod.name=$(OTEL_K8S_POD_NAME)、
          k8s.pod.uid=$(OTEL_K8S_POD_ID)、
          k8s.container.name={{ .Chart.Name }}、
          host.name=$(OTEL_K8S_NODE_NAME)、
          deployment.environment.name=$(OTEL_K8S_NAMESPACE)
    ```
3.  **Collector の `resourcedetection` プロセッサーを使用する**: SDK またはアプリケーションレベルでリソース属性を設定できない場合は、Collector の `resourcedetection` プロセッサーを使用できます。`infraattributes` の前に配置します。

4.  **属性を確認する**: DDOT Collector パイプラインで `debug` エクスポーターを使用して、必要なリソース属性 (`container.id`、`process.pid`、`k8s.pod.uid` など) がテレメトリに存在することを確認します。

このプロセッサーで使用される属性の詳細については、[Infrastructure Attribute Processor documentation][7] を参照してください。

## 'team' 属性を Datadog のチームタグにマッピングできない {#unable-to-map-team-attribute-to-datadog-team-tag}

**症状**: OpenTelemetry の設定でリソース属性として設定されているにもかかわらず、Datadog のログとトレースにチームタグが表示されません。

**原因**: これは、`ddtags` 属性を使用して Datadog のタグ形式に OpenTelemetry リソース属性を明示的にマッピングする必要があるために発生します。

**解決**:

OpenTelemetry Collector の transform プロセッサーを使用して、チームリソース属性を `ddtags` 属性にマッピングします。

```yaml
processors:
  transform/datadog_team_tag:
    metric_statements:
      - context: datapoint
        statements:
          - set(attributes["ddtags"], Concat(["team:", resource.attributes["team"]],""))
    log_statements:
      - context: log
        statements:
          - set(attributes["ddtags"], Concat(["team:", resource.attributes["team"]],""))
    trace_statements:
      - context: span
        statements:
          - set(attributes["ddtags"], Concat(["team:", resource.attributes["team"]],""))
```

<div class="alert alert-info">セットアップで異なる場合は <code>resource.attributes["team"]</code> を実際の属性名に置き換えてください (例:<code>resource.attributes["arm.team.name"]</code>)。</div>

構成を検証するには、以下の手順を実行します。

1. OpenTelemetry Collector を再起動して変更を適用します。
2. テストログとトレースを生成します。
3. チームタグが Datadog のログとトレースに表示されるか確認します。
4. チームタグがフィルタリングやダッシュボードで想定どおりに機能することを確認します。

## コンテナタグが Containers ページに表示されない {#container-tags-not-appearing-on-containers-page}

**症状**: コンテナタグが Datadog の Containers ページに表示されず、コンテナの監視および管理機能に影響が出ています。

**原因**: これは、コンテナリソース属性が Datadog で想定されているコンテナメタデータ形式に正しくマッピングされていない場合に発生します。

**解決**:

Datadog Agent で OTLP インジェクションを使用する場合は、適切なコンテナメタデータの関連付けを確実に行うために、特定のリソース属性を設定する必要があります。詳細については、[リソース属性マッピング][4]を参照してください。

構成を検証するには、以下の手順を実行します。

1. 生のトレースデータをチェックし、コンテナ ID とタグが Datadog 形式に正しく変換されていることを確認します (例: `container.id` は `container_id` になる必要があります)。
2. コンテナメタデータが Containers ページに表示されることを確認します。

## カタログおよびダッシュボードでメトリクスが表示されない {#missing-metrics-in-catalog-and-dashboards}

**症状**: メトリクスが正しく収集されているにもかかわらず、カタログおよびダッシュボードに表示されません。

**原因**: これは通常、セマンティック規約が正しくない、または不適切にマッピングされているために発生します。

**解決**:

構成を検証するには、以下の手順を実行します。

1. メトリクスに必須の[セマンティック規約][4]が含まれていることを確認します。
2. メトリクス名が OpenTelemetry の命名規約に従っていることを確認します。
3. [メトリクスマッピングリファレンス][5]を使用して、メトリクスが Datadog 形式に正しく変換されていることを確認します。

<div class="alert alert-info">セマンティック規約を使用する際は、メトリクスの命名と属性に関する最新の OpenTelemetry 仕様に従っていることを確認します。</div>

## ポートバインドエラーおよびコネクション障害 {#port-binding-errors-and-connection-failures}

**症状**: DDOT Collector のデプロイ時にポートの競合やバインドの問題が発生し、またはアプリケーションが DDOT Collector にコネクションを確立できません。

**原因**: これは通常、ポート名の競合、誤ったポート設定、または複数のサービスが同じポートを使用しようとした場合に発生します。

**解決**:

Datadog Operator は、デフォルトで OpenTelemetry Collector をポート `4317` (名前は `otel-grpc`) および `4318` (名前は `otel-http`) に自動的にバインドします。

デフォルトのポートを明示的に上書きするには、`features.otelCollector.ports` パラメーターを使用してください。

```yaml
# Enable Features
features:
  otelCollector:
    enabled: true
    ports:
      - containerPort: 4317
        hostPort: 4317
        name: otel-grpc
      - containerPort: 4318
        hostPort: 4318
        name: otel-http
```

<div class="alert alert-danger">ポート <code>4317</code> および <code>4318</code>を設定する際は、ポートの競合を回避するためにデフォルトの名前 <code>otel-grpc</code> および <code>otel-http</code> を使用する必要があります。</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/opentelemetry/schema_semantics/hostname/
[3]: /ja/opentelemetry/schema_semantics/host_metadata/
[4]: /ja/opentelemetry/schema_semantics/semantic_mapping/
[5]: /ja/opentelemetry/schema_semantics/metrics_mapping/#metrics-mappings
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#readme
[7]: https://github.com/DataDog/datadog-agent/tree/main/comp/otelcol/otlp/components/processor/infraattributesprocessor#readme
[8]: https://pkg.go.dev/go.opentelemetry.io/otel/sdk/resource#WithContainerID
[9]: /ja/opentelemetry/config/hostname_tagging/#hostname-recommendations