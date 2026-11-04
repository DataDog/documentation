---
aliases:
- /ja/opentelemetry/collector_exporter/hostname_tagging
description: Datadog に送信される OpenTelemetry テレメトリの一貫したホスト識別とタグ付けを設定します。
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: ドキュメント
  text: OpenTelemetry Collector のセットアップ
- link: /opentelemetry/mapping/hostname/
  tag: ドキュメント
  text: OpenTelemetry セマンティック規約をホスト名にマッピングする
title: ホスト名とタグ付け
---
{{< img src="opentelemetry/collector_exporter/hostname_tagging.png" alt="OpenTelemetry から収集されたホスト名情報" style="width:100%;" >}}

## 概要 {#overview}

Datadog では、OpenTelemetry リソース属性を使用して、メトリクス、トレース、ログをホストと照合します。ホストからのすべてのテレメトリが同様にホストを識別する場合、そのホストからのシグナルを関連付けることができ、テレメトリはそのホストのタグを継承します。

ホスト名の解決順序とサポートされているリソース属性の完全なリストについては、「[OpenTelemetry セマンティック規約をホスト名にマッピングする][8]」を参照してください。

## ホスト名の推奨事項{#hostname-recommendations}

適切な設定は、Datadog へのテレメトリの送信方法によって異なります。ご使用のテレメトリパスで各セットアップを見つけ、そのセクションに従ってください。たとえば、ノードレベルのコレクターがゲートウェイ経由でテレメトリを送信する場合は、ノードレベルのコレクターとゲートウェイ両方の推奨事項に従ってください。

| テレメトリの送信方法 | 推奨事項 |
|---|---|
| [Datadog Agent による OTLP の取り込み](#otlp-ingestion-by-the-datadog-agent) | テレメトリを生成するすべてのホストで Agent を実行します。ホスト名属性は省略するか、Agent のホスト名に設定します。|
| [Datadog に直接エクスポートする DDOT コレクター](#ddot-collector-exporting-directly-to-datadog) | DDOT は、デフォルトで Datadog Exporter パイプラインに`infraattributes` プロセッサーを追加します。ホストで、`allow_hostname_override` を有効にします。Fargate で、プラットフォームリソース属性を指定します。|
| [OTLP 経由で Datadog にエクスポートする OpenTelemetry コレクター](#opentelemetry-collector-exporting-to-datadog-over-otlp) | 各ホストまたは Kubernetes ノードでコレクターを実行します。推奨設定の `resource_detection` プロセッサーを保持します。Kubernetes ではその `k8s_attributes` プロセッサーを保持します。|
| [コレクターを使用しない直接の OTLP 取り込み](#direct-otlp-intake-without-a-collector) | エクスポート前に、SDK または管理対象プラットフォームでホストまたはプラットフォームのリソース属性を設定します。|
| [ゲートウェイ経由でエクスポートするコレクター](#collector-exporting-through-a-gateway) | ノードレベルのコレクターでホスト情報を付加し、それらのリソース属性をゲートウェイ経由で保持します。|
| [Datadog Exporter を使用する既存の構成](#existing-configurations-using-the-datadog-exporter) | 各ホストまたは Kubernetes ノードでコレクターを実行し、推奨設定と同じプロセッサーを設定します。|

### Datadog Agent による OTLP の取り込み {#otlp-ingestion-by-the-datadog-agent}

OTLP テレメトリを生成するすべてのホストに Datadog Agent をデプロイします。Datadog では、あるホストから別のホスト上の Agent へのテレメトリ送信をサポートしていません。セットアップ手順については、「[Datadog Agent による OTLP の取り込み][11]」を参照してください。

受信テレメトリに有効な[ホスト名属性][8]がない場合、Datadog は Agent のホスト名を使用します。`host.name`、`host.id`、またはその他のホスト名属性を設定する場合は、ホストの重複を避けるために Agent のホスト名に設定してください。ホスト名の解決をオーバーライドするには、`datadog.host.name` リソース属性を Agent のホスト名に設定します。

### Datadog に直接エクスポートする DDOT コレクター {#ddot-collector-exporting-directly-to-datadog}

DDOT コレクターの `infraattributes` プロセッサーは、OTLP テレメトリにインフラストラクチャー属性とタグを追加します。デフォルトでは、DDOT は Datadog Exporter を使用するパイプラインにこのプロセッサーを追加します。このプロセッサーには、インフラストラクチャータグを検索できるように、ソースコンテナを識別するリソース属性が必要です。サポートされている属性とトラブルシューティングの手順については、「[インフラストラクチャータグがテレメトリから欠落している][10]」を参照してください。

構成の残りの部分は、DDOT コレクターがホスト上で実行されているかどうかによって異なります。

#### ホストベースのデプロイメント {#host-based-deployments}

これは、[Kubernetes DaemonSet][9] として実行される DDOT コレクターと、[Linux][14] および [Windows][15] ホスト上で実行される DDOT コレクターの場合に該当します。

DDOT コレクターは Datadog Agent 内で実行されるため、受信テレメトリのホスト名属性が Agent のホスト名とは異なる名前に解決される場合があります。その結果、単一のノードが 2 つのホストとして表示されます。代わりに Agent のホスト名を使用するには、次のようにして `allow_hostname_override` を有効にします。

```yaml
processors:
  infraattributes:
    allow_hostname_override: true
```

各パイプラインの `processors` リストに `infraattributes` を追加します (まだ追加されていない場合)。DDOT は、プロセッサーが一覧表示されていないパイプラインに独自のコピーを自動的に追加し、そのコピーはデフォルト設定を使用します。

#### Fargate サイドカーデプロイメント {#fargate-sidecar-deployments}

これは、[ECS Fargate][16] および [EKS Fargate][17] 上の DDOT コレクターの場合に該当します。この場合、Datadog Agent はアプリケーションと同じタスクまたは Pod 内のサイドカーコンテナとして実行されます。

Fargate はホストベースのデプロイメントをサポートしていないため、[ホストベースのガイダンス](#host-based-deployments)は適用されません。代わりに、`infraattributes` が必要とするプラットフォームリソース属性を指定してください。

- ECS Fargate で、ECS リソース検出器を OpenTelemetry SDK に追加して、`aws.ecs.task.arn` 属性を提供します。
- EKS Fargate で、EKS リソース検出器を SDK に追加するか、`[env, eks]` 検出器を含むリソース検出プロセッサーを DDOT コレクター構成に追加します。例については、[EKS Fargate インストールガイド][17]を参照してください。

### OTLP 経由で Datadog にエクスポートする OpenTelemetry コレクター {#opentelemetry-collector-exporting-to-datadog-over-otlp}

これは、[OpenTelemetry コレクターの推奨セットアップ][21]を使用する場合に該当します。この場合、コレクターは OTLP HTTP エクスポーターを使用して Datadog にテレメトリを送信します。

各ホストまたは Kubernetes ノードで 1 つのコレクターを実行し、同じホストまたはノード上のコレクターにテレメトリを送信します。推奨される構成では、各環境のホスト検出がすでに設定されています。これらを調整する場合は、以下の設定を維持してください。

- **ホストおよび VM**: `resource_detection` プロセッサーと `system` 検出器。クラウドプロバイダーの場合は、その検出器を追加します。
- **Docker**: コレクターはコンテナ内からホストを検出できません。コレクターの `OTEL_RESOURCE_ATTRIBUTES` 環境変数に `host.name` を設定します。
- **Kubernetes**: `k8s_attributes` プロセッサーと `resource_detection` プロセッサー。クラウド以外の Kubernetes では、コレクターの `OTEL_RESOURCE_ATTRIBUTES` 環境変数に `k8s.node.name` を設定します。クラウド Kubernetes では、環境変数の代わりにクラウドプロバイダー用の検出器を使用します。

ホスト検出が含まれていないコレクター構成にホスト検出を追加するには、「[コレクターでホスト名プロセッサーを構成する](#collector-configuration)」を参照してください。

推奨されるセットアップの `span_metrics` コネクタはホスト属性をディメンションとして使用するため、APM トレースメトリクスはホストタグを保持します。構成を調整する場合は、ディメンションをすべて保持してください。詳細については、「[スパンメトリクスコネクタ][24]」を参照してください。

推奨されるセットアップでは、AWS Lambda、ECS Fargate、EKS Fargate などのサーバーレスランタイムやタスクベースのランタイムをサポートしていません。これらについては、「[コレクターを使用しない直接の OTLP 取り込み](#direct-otlp-intake-without-a-collector)」を参照してください。

<div class="alert alert-info">ホスト名リソース属性はテレメトリを識別しますが、<a href="/infrastructure/list/">インフラストラクチャーホストリスト</a>にホストを追加することはありません。推奨される構成には<a href="/opentelemetry/integrations/host_metrics/">ホストメトリクスレシーバー</a>が含まれており、これがインフラストラクチャーホストリストにデータを取り込みます。これを削除すると、ホストは表示されなくなります。GKE Autopilot および AKS Automatic の構成例では、これは省略されています。</div>

### コレクターを使用しない直接の OTLP 取り込み {#direct-otlp-intake-without-a-collector}

これは、Datadog Agent や OpenTelemetry コレクターを使用せずに、テレメトリが [Datadog OTLP インテーク][22]に直接送信される場合に該当します。例:

- OpenTelemetry SDK を使用してエクスポートするホスト上のアプリケーション
- [サーバーレスプラットフォーム][12] (AWS Lambda、ECS Fargate、Azure Functions、Cloud Run など)
- [マネージドプラットフォーム][13]

テレメトリをエクスポートする前に、環境のリソース属性を設定します。SDK の組み込みリソース検出機能が利用可能な場合は有効にするか、自分で属性を設定します。サーバーレスプラットフォームやマネージドプラットフォームでは、`host.name` の代わりにプラットフォームリソース属性を使用してワークロードを識別します。

ECS Fargate または EKS Fargate で DDOT コレクターをサイドカーとして実行する場合は、代わりに「[Fargate サイドカーデプロイメント](#fargate-sidecar-deployments)」を参照してください。

### ゲートウェイ経由でエクスポートするコレクター {#collector-exporting-through-a-gateway}

これは、OpenTelemetry コレクターゲートウェイのデプロイメント、および [Kubernetes 上のゲートウェイとしての DDOT コレクター][18]の場合に該当します。

ゲートウェイデプロイメントでは、Datadog にエクスポートするコレクターは、テレメトリを生成したホスト上では実行されません。テレメトリがホスト情報なしでゲートウェイに到達した場合、多数のホストからのテレメトリがゲートウェイのホストに集中したり、各ゲートウェイ Pod が独自のホストとして登録されたりする可能性があります。

ノードレベルのコレクターでホスト情報を追加します。次に、リソース属性を再度検出するのではなく、それらを保持するようにゲートウェイを構成します。

- **OpenTelemetry コレクター**: Kubernetes で、ノードレベルのコレクターに `k8s_attributes`プロセッサー (パススルーモード) と `resource_detection` プロセッサーを追加します。クラウド Kubernetes では、クラウドプロバイダー用の検出器を使用します。「[コレクターでホスト名プロセッサーを構成する](#collector-configuration)」の「**Kubernetes DaemonSet -> ゲートウェイ**」の例を参照してください。
- **DDOT コレクター**: [DDOT ゲートウェイのインストールガイド][18]に記載されているように、DaemonSet 構成で `infraattributes` プロセッサーを保持します。

ゲートウェイデプロイメントで誤ったホストが報告される場合は、「[ゲートウェイコレクターがホストメタデータを転送していない][19]」を参照してください。

### Datadog Exporter を使用する既存の構成 {#existing-configurations-using-the-datadog-exporter}

これは、[Datadog Exporter を使用する既存の OpenTelemetry コレクター構成][20]に該当します。新しいコレクター構成の場合は、[推奨される OpenTelemetry コレクターセットアップ][21]を使用してください。

各ホストまたは Kubernetes ノードでコレクターを実行し、[推奨されるセットアップ](#opentelemetry-collector-exporting-to-datadog-over-otlp)と同じ方法でホスト検出器を構成します。このページの[プロセッサーの例](#collector-configuration)は、Datadog Exporter で機能します。Amazon EKS での Datadog Exporter の完全な例については、[`k8s-values.yaml`][4] を参照してください。

コレクターがゲートウェイに転送する場合は、[ゲートウェイの推奨事項](#collector-exporting-through-a-gateway)にも従ってください。

## ホスト名の問題を診断する {#diagnose-hostname-issues}

APM トレースのホスト名が欠落している、エフェメラル Kubernetes Pod と類似している、あるいは Datadog Agent によって報告されるホスト名と異なる場合、Datadog は `datadog.apm.hostname_issue` ゲージを出力します。このメトリクスは課金に影響しません。

<div class="alert alert-info"> <code>issue_type</code> 値はヒューリスティックから得られるため、構成が正しくても生成されることがあります。1 つのノードが 2 つのホストとして表示される、トレースがホストにリンクされていない、ホストタグが欠落しているなど、すでに確認済みのホスト名の問題を調査する場合にこのメトリクスを使用します。</div>

1 つのトレースには最大で 1 つの `issue_type` が含まれます。以下の表を使用して、考えられる原因と修正方法を見つけてください。

| `issue_type` | 意味 | 推奨されるアクション |
|---|---|---|
| `pod_like_gateway_mismatch` | トレースのホスト名が Agent のホスト名と異なり、Kubernetes Pod 名に類似しています。| [ゲートウェイの推奨事項](#collector-exporting-through-a-gateway)に従ってください。ノードレベルのコレクターで Kubernetes ノードをアタッチし、ゲートウェイを通じてそれらのリソース属性を保持します。|
| `gateway_hostname_mismatch` | トレースのホスト名が Agent のホスト名と異なります。| [ゲートウェイの推奨事項](#collector-exporting-through-a-gateway)に従い、ゲートウェイを通じてホスト名のリソース属性を保持します。|
| `empty_hostname` | Datadog が、トレース用の使用可能なホスト名を受信しませんでした。| [ご使用のセットアップの推奨事項](#hostname-recommendations)に従って、必要なホストまたはプラットフォームリソース属性を指定します。|
| `pod_like_hostname` | トレースのホスト名が、エフェメラル Kubernetes Pod 名に類似しています。| テレメトリが Pod ではなく、ノード、ホスト、またはプラットフォームを識別するように、[ご使用のセットアップ](#hostname-recommendations)のホスト検出を構成します。|

使用可能なメトリクスタグには、`issue_type`、`host`、`env`、`service`、`version`、`span_source` があります。影響を受けるスパンには同じ `issue_type` タグが付与されます。これを使用して、サンプルトレースを見つけ、そのリソース属性を調べられます。

Pod に類似しているという問題タイプでは、ヒューリスティックとして一般的な Kubernetes Pod の命名パターンを使用します。構成を更新したら、新しいトレースを調べて、問題タイプが解決されたことを確認してください。

## コレクターでホスト名プロセッサーを構成する {#collector-configuration}

[リソース検出プロセッサー][2]を使用してホスト属性およびクラウド属性を検出し、[Kubernetes 属性プロセッサー][3]を使用して Kubernetes メタデータを追加します。トレース、メトリクス、およびログのパイプラインにプロセッサーを追加します。Kubernetes では、`resource_detection` の前に `k8s_attributes` を追加します。これらの例は、OTLP HTTP エクスポーターと Datadog Exporter の両方で機能します。

推奨されるセットアップのホスト、Docker、および Kubernetes 構成には、これらのプロセッサーがすでに含まれています。含まれているプロセッサーをこれらの例で置き換えないでください。推奨される `k8s_attributes` プロセッサーは、Pod メタデータから `service.name` およびその他のサービス属性も設定します。これらの例は、ゲートウェイ、既存の Datadog Exporter 構成、およびホスト検出を行わないその他のコレクター構成に使用してください。

コンポーネント名の `resource_detection` および `k8s_attributes` には、OpenTelemetry Collector Contrib v0.153.0 以降が必要です。それより前のバージョンでは `resourcedetection` および `k8sattributes` を使用しています。以降のバージョンでは両方の名前が受け入れられます。

テスト済みの完全な構成については、[推奨される OpenTelemetry コレクターセットアップ][21]を参照してください。

{{< tabs >}}
{{% tab "ホスト" %}}

コレクターの構成に以下を追加します。

```yaml
processors:
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        # Optional: send CPU and OS details to the Infrastructure Host List
        os.description:
          enabled: true
        host.arch:
          enabled: true
        host.cpu.vendor.id:
          enabled: true
        host.cpu.family:
          enabled: true
        host.cpu.model.id:
          enabled: true
        host.cpu.model.name:
          enabled: true
        host.cpu.stepping:
          enabled: true
        host.cpu.cache.l2.size:
          enabled: true
```

クラウドプロバイダーでは、その検出器を `detectors` のリストの先頭に追加します。

- Amazon EC2: `[ec2, env, system]`
- Google Cloud: `[gcp, env, system]`
- Azure: `[azure, env, system]`

{{% /tab %}}

{{% tab "Docker" %}}

コレクターは、コンテナ内からホスト情報を検出できません。コレクターコンテナの `OTEL_RESOURCE_ATTRIBUTES` 環境変数に `host.name` を設定します (例: `OTEL_RESOURCE_ATTRIBUTES=host.name=<YOUR_HOST_NAME>`)。次に、`env` 検出器を使用してそれを読み取ります。

```yaml
processors:
  resource_detection:
    detectors: [env]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
```

{{% /tab %}}

{{% tab "Kubernetes DaemonSet" %}}

これらの例では、[OpenTelemetry コレクター Helm チャート][101]を使用しています。

`values.yaml` に以下を追加します。サービスアカウントとクラスターロールにより、`k8s_attributes` プロセッサーに Pod メタデータへの読み取りアクセス権が付与されます。非クラウド Kubernetes では、`OTEL_RESOURCE_ATTRIBUTES` によってノード名がホストとして設定されます。Helm チャートでは `OTEL_K8S_NODE_NAME` が設定されます。

```yaml
extraEnvs:
  # Non-cloud Kubernetes only
  - name: OTEL_RESOURCE_ATTRIBUTES
    value: "k8s.node.name=$(OTEL_K8S_NODE_NAME)"
serviceAccount:
  create: true
clusterRole:
  create: true
  rules:
    - apiGroups: [""]
      resources: ["pods", "namespaces", "nodes"]
      verbs: ["get", "watch", "list"]
    - apiGroups: ["apps"]
      resources: ["replicasets"]
      verbs: ["get", "list", "watch"]
    - apiGroups: ["extensions"]
      resources: ["replicasets"]
      verbs: ["get", "list", "watch"]
```

この構成では、チャートの `kubernetesAttributes` プリセットを有効にしないでください。このプリセットは、`k8sattributes` という名前の 2 つ目のプロセッサーを追加します。

コレクター構成に以下を追加します。

```yaml
processors:
  k8s_attributes:
    passthrough: false
    auth_type: "serviceAccount"
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.uid
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
      - sources:
          - from: resource_attribute
            name: k8s.pod.name
          - from: resource_attribute
            name: k8s.namespace.name
      - sources:
          - from: connection
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.node.name
        - k8s.namespace.name
        - k8s.pod.start_time
        - k8s.replicaset.name
        - k8s.replicaset.uid
        - k8s.daemonset.name
        - k8s.daemonset.uid
        - k8s.job.name
        - k8s.job.uid
        - k8s.cronjob.name
        - k8s.statefulset.name
        - k8s.statefulset.uid
        - container.image.name
        - container.image.tag
        - container.id
        - k8s.container.name
      labels:
        - tag_name: kube_app_name
          key: app.kubernetes.io/name
          from: pod
        - tag_name: kube_app_instance
          key: app.kubernetes.io/instance
          from: pod
        - tag_name: kube_app_version
          key: app.kubernetes.io/version
          from: pod
        - tag_name: kube_app_component
          key: app.kubernetes.io/component
          from: pod
        - tag_name: kube_app_part_of
          key: app.kubernetes.io/part-of
          from: pod
        - tag_name: kube_app_managed_by
          key: app.kubernetes.io/managed-by
          from: pod
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        host.name:
          enabled: false # Containers report inaccurate host names
```

マネージド Kubernetes ディストリビューションでは、`resource_detection` プロセッサーをご使用の環境のバリアントに置き換え、`OTEL_RESOURCE_ATTRIBUTES` を省略してください。Amazon EKS、EKS Auto Mode、Google GKE、および Azure AKS のバリアントについては、[マネージド Kubernetes ディストリビューション][102]を参照してください。

[101]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector
[102]: /ja/opentelemetry/setup/collector_exporter/#managed-kubernetes-distributions
{{% /tab %}}

{{% tab "Kubernetes DaemonSet -> ゲートウェイ" %}}

DaemonSet とゲートウェイの両方の `values.yaml` ファイルに、「**Kubernetes DaemonSet**」タブに示されているサービスアカウントとクラスターロールを追加します。チャートの `kubernetesAttributes` プリセットは有効にしないでください。

DaemonSet:

```yaml
processors:
  k8s_attributes:
    passthrough: true
    auth_type: "serviceAccount"
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        host.name:
          enabled: false # Containers report inaccurate host names
```

非クラウド Kubernetes では、「**Kubernetes DaemonSet**」タブに示されているように、DaemonSet の `OTEL_RESOURCE_ATTRIBUTES` を設定します。マネージド Kubernetes ディストリビューションでは、`resource_detection` プロセッサーを「[マネージド Kubernetes ディストリビューション][201]」に記載されているご使用の環境のバリアントに置き換えます。

パススルーモードでは、DaemonSet の `k8s_attributes` プロセッサーは Pod の IP アドレスのみを追加します。ゲートウェイの `k8s_attributes` プロセッサーは、そのアドレスを使用して Kubernetes API から Pod メタデータを検出します。

ゲートウェイ:

```yaml
processors:
  k8s_attributes:
    passthrough: false
    auth_type: "serviceAccount"
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.node.name
        - k8s.namespace.name
        - k8s.pod.start_time
        - k8s.replicaset.name
        - k8s.replicaset.uid
        - k8s.daemonset.name
        - k8s.daemonset.uid
        - k8s.job.name
        - k8s.job.uid
        - k8s.cronjob.name
        - k8s.statefulset.name
        - k8s.statefulset.uid
        - container.image.name
        - container.image.tag
        - container.id
        - k8s.container.name
      labels:
        - tag_name: kube_app_name
          key: app.kubernetes.io/name
          from: pod
        - tag_name: kube_app_instance
          key: app.kubernetes.io/instance
          from: pod
        - tag_name: kube_app_version
          key: app.kubernetes.io/version
          from: pod
        - tag_name: kube_app_component
          key: app.kubernetes.io/component
          from: pod
        - tag_name: kube_app_part_of
          key: app.kubernetes.io/part-of
          from: pod
        - tag_name: kube_app_managed_by
          key: app.kubernetes.io/managed-by
          from: pod
```

[201]: /ja/opentelemetry/setup/collector_exporter/#managed-kubernetes-distributions
{{% /tab %}}

{{% tab "Kubernetes ゲートウェイ" %}}

DaemonSet コレクターを使用せずに、アプリケーションが直接ゲートウェイにテレメトリを送信する場合に、この構成を使用します。ゲートウェイの `values.yaml` に、「**Kubernetes DaemonSet**」タブに示されているサービスアカウントとクラスターロールを追加します。チャートの `kubernetesAttributes` プリセットは有効にしないでください。

コレクター構成に以下を追加します。

```yaml
processors:
  k8s_attributes:
    passthrough: false
    auth_type: "serviceAccount"
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.node.name
        - k8s.namespace.name
        - k8s.pod.start_time
        - k8s.replicaset.name
        - k8s.replicaset.uid
        - k8s.daemonset.name
        - k8s.daemonset.uid
        - k8s.job.name
        - k8s.job.uid
        - k8s.cronjob.name
        - k8s.statefulset.name
        - k8s.statefulset.uid
        - container.image.name
        - container.image.tag
        - container.id
        - k8s.container.name
      labels:
        - tag_name: kube_app_name
          key: app.kubernetes.io/name
          from: pod
        - tag_name: kube_app_instance
          key: app.kubernetes.io/instance
          from: pod
        - tag_name: kube_app_version
          key: app.kubernetes.io/version
          from: pod
        - tag_name: kube_app_component
          key: app.kubernetes.io/component
          from: pod
        - tag_name: kube_app_part_of
          key: app.kubernetes.io/part-of
          from: pod
        - tag_name: kube_app_managed_by
          key: app.kubernetes.io/managed-by
          from: pod
```

{{% /tab %}}
{{< /tabs >}}

### 収集データ {#data-collected}

次の表に、これらのプロセッサーが追加できるリソース属性の一覧を示します。「**Datadog タグ**」列には、属性から Datadog が作成するタグが示されています (存在する場合)。

{{% collapse-content title="リソース属性と Datadog タグ" level="p" %}}

| OpenTelemetry 属性 | Datadog タグ | プロセッサー |
|---|---|---|
| `host.arch` |  | `resource_detection` (`system`) |
| `host.name` |  | `resource_detection` (`system` またはクラウド検出器) |
| `host.id` |  | `resource_detection` (クラウド検出器) |
| `host.cpu.vendor.id` |  | `resource_detection` (`system`) |
| `host.cpu.family` |  | `resource_detection` (`system`) |
| `host.cpu.model.id` |  | `resource_detection` (`system`) |
| `host.cpu.model.name` |  | `resource_detection` (`system`) |
| `host.cpu.stepping` |  | `resource_detection` (`system`) |
| `host.cpu.cache.l2.size` |  | `resource_detection` (`system`) |
| `os.description` |  | `resource_detection` (`system`) |
| `os.type` |  | `resource_detection` (`system`) |
| `cloud.provider` | `cloud_provider` | `resource_detection` (クラウド検出器) |
| `cloud.platform` |  | `resource_detection` (クラウド検出器) |
| `cloud.account.id` |  | `resource_detection` (クラウド検出器) |
| `cloud.region` | `region` | `resource_detection` (クラウド検出器) |
| `cloud.availability_zone` | `zone` | `resource_detection` (クラウド検出器) |
| `host.type` |  | `resource_detection` (クラウド検出器) |
| `gcp.gce.instance.hostname` |  | `resource_detection` (`gcp`) |
| `gcp.gce.instance.name` |  | `resource_detection` (`gcp`) |
| `k8s.cluster.name` | `kube_cluster_name` | `resource_detection` (クラウド Kubernetes 検出器) |
| `host.image.id` |  | `resource_detection` (`ec2`) |
| `aws.ecs.cluster.arn` | `ecs_cluster_name` | `resource_detection` (`ecs`) |
| `aws.ecs.task.arn` | `task_arn` | `resource_detection` (`ecs`) |
| `aws.ecs.task.family` | `task_family` | `resource_detection` (`ecs`) |
| `aws.ecs.task.revision` | `task_version` | `resource_detection` (`ecs`) |
| `aws.ecs.launchtype` |  | `resource_detection` (`ecs`) |
| `aws.log.group.names` |  | `resource_detection` (`ecs`) |
| `aws.log.group.arns` |  | `resource_detection` (`ecs`) |
| `aws.log.stream.names` |  | `resource_detection` (`ecs`) |
| `aws.log.stream.arns` |  | `resource_detection` (`ecs`) |
| `azure.vm.name` |  | `resource_detection` (`azure`) |
| `azure.vm.size` |  | `resource_detection` (`azure`) |
| `azure.vm.scaleset.name` |  | `resource_detection` (`azure`) |
| `azure.resourcegroup.name` |  | `resource_detection` (`azure`) |
| `k8s.namespace.name` | `kube_namespace` | `k8s_attributes` |
| `k8s.pod.name` | `pod_name` | `k8s_attributes` |
| `k8s.pod.uid` |  | `k8s_attributes` |
| `k8s.pod.start_time` |  | `k8s_attributes` |
| `k8s.deployment.name` | `kube_deployment` | `k8s_attributes` |
| `k8s.replicaset.name` | `kube_replica_set` | `k8s_attributes` |
| `k8s.replicaset.uid` |  | `k8s_attributes` |
| `k8s.daemonset.name` | `kube_daemon_set` | `k8s_attributes` |
| `k8s.daemonset.uid` |  | `k8s_attributes` |
| `k8s.statefulset.name` | `kube_stateful_set` | `k8s_attributes` |
| `k8s.statefulset.uid` |  | `k8s_attributes` |
| `k8s.container.name` | `kube_container_name` | `k8s_attributes` |
| `k8s.job.name` | `kube_job` | `k8s_attributes` |
| `k8s.job.uid` |  | `k8s_attributes` |
| `k8s.cronjob.name` | `kube_cronjob` | `k8s_attributes` |
| `k8s.node.name` |  | `k8s_attributes` |
| `container.id` | `container_id` | `k8s_attributes` |
| `container.image.name` | `image_name` | `k8s_attributes` |
| `container.image.tag` | `image_tag` | `k8s_attributes` |

{{% /collapse-content %}}

## カスタムタグの追加 {#custom-tagging}

### カスタムホストタグ {#custom-host-tags}

#### OTLP リソース属性として {#as-otlp-resource-attributes}

カスタムホストタグを追加するには、`datadog.host.tag.` プレフィックスを使用してリソース属性を設定します。

[OpenTelemetry SDK][5] では、`OTEL_RESOURCE_ATTRIBUTES` 環境変数を使用して設定します。

```shell
OTEL_RESOURCE_ATTRIBUTES=datadog.host.tag.<CUSTOM_TAG_NAME>=<CUSTOM_TAG_VALUE>
```

コレクターでは、リソースプロセッサーを使用して設定します。

```yaml
processors:
  resource:
    attributes:
    - key: datadog.host.tag.<CUSTOM_TAG_NAME>
      action: upsert
      from_attribute: <SOURCE_ATTRIBUTE>
```

**注**: Datadog Exporter を使用する場合、カスタムホストタグには「[インフラストラクチャーリストのホスト情報][7]」で説明されているオプトインが必要です。

#### Datadog Exporter で {#in-the-datadog-exporter}

[Datadog Exporter][20] を使用する既存の構成では、Exporter の `host_metadata` セクションでカスタムホストタグを設定することもできます。

```yaml
exporters:
  datadog:
    host_metadata:
      tags: ["team:infra", "<TAG_KEY>:<TAG_VALUE>"]
```

これらのタグは、ホスト名が Exporter のホストメタデータのホスト名と一致するテレメトリにのみ適用されます。任意のホストからのテレメトリにタグを付けるには、プロセッサーを使用します。すべてのオプションについては、[Datadog Exporter 構成の例][6]を参照してください。

### ホストのエイリアス {#host-aliases}

ホストのエイリアスを設定するには、`datadog.host.aliases` リソース属性を設定します。たとえば、transform プロセッサーを使用します。

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.aliases"], ["alias1", "alias2", "alias3"])
```

**注**: Datadog Exporter を使用する場合、ホストのエイリアスには「[インフラストラクチャーリストのホスト情報][7]」で説明されているオプトインが必要です。

### カスタムコンテナタグ {#custom-container-tags}

カスタムコンテナタグを追加するには、`datadog.container.tag.` プレフィックスを使用してリソース属性を設定します。

[OpenTelemetry SDK][5] では、`OTEL_RESOURCE_ATTRIBUTES` 環境変数を使用して設定します。

```shell
OTEL_RESOURCE_ATTRIBUTES=datadog.container.tag.<CUSTOM_TAG_NAME>=<CUSTOM_TAG_VALUE>
```

コレクターでは、リソースプロセッサーを使用して設定します。

```yaml
processors:
  resource:
    attributes:
    - key: datadog.container.tag.<CUSTOM_TAG_NAME>
      action: upsert
      from_attribute: <SOURCE_ATTRIBUTE>
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/k8s-chart/k8s-values.yaml
[5]: https://opentelemetry.io/docs/languages/js/resources/
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml
[7]: /ja/opentelemetry/mapping/host_metadata/
[8]: /ja/opentelemetry/mapping/hostname/
[9]: /ja/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset/
[10]: /ja/opentelemetry/troubleshooting/#infrastructure-tags-are-missing-from-telemetry
[11]: /ja/opentelemetry/setup/otlp_ingest_in_the_agent/
[12]: /ja/opentelemetry/setup/otlp_ingest/serverless/
[13]: /ja/opentelemetry/setup/otlp_ingest/managed_platforms/
[14]: /ja/opentelemetry/setup/ddot_collector/install/linux/
[15]: /ja/opentelemetry/setup/ddot_collector/install/windows/
[16]: /ja/opentelemetry/setup/ddot_collector/install/ecs_fargate/
[17]: /ja/opentelemetry/setup/ddot_collector/install/eks_fargate/
[18]: /ja/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
[19]: /ja/opentelemetry/troubleshooting/#gateway-collector-not-forwarding-host-metadata
[20]: /ja/opentelemetry/setup/collector_exporter/datadog_exporter/
[21]: /ja/opentelemetry/setup/collector_exporter/
[22]: /ja/opentelemetry/setup/otlp_ingest/
[24]: /ja/opentelemetry/setup/collector_exporter/#span-metrics-connector