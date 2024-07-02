---
"app_id": "calico"
"app_uuid": "9e361f97-5332-4c86-8119-e1594b83841e"
"assets":
  "dashboards":
    "[calico] dashboard overview": ./assets/dashboards/calico_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": calico.felix.active.local_endpoints
      "metadata_path": metadata.csv
      "prefix": calico.
    "process_signatures":
    - calico-node
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10236"
    "source_type_name": Calico
  "monitors":
    "[calico] monitor dataplane failures": assets/monitors/dataplane_failures.json
    "[calico] monitor ipsets error": assets/monitors/ipset_error.json
    "[calico] monitor iptables restore errors": assets/monitors/iptables_restore_errors.json
    "[calico] monitor iptables save errors": assets/monitors/iptables_save_errors.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- metrics
- network
- security
- kubernetes
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/calico/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "calico"
"integration_id": "calico"
"integration_title": "calico"
"integration_version": "2.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "calico"
"public_title": "calico"
"short_description": "Calico is a networking and network security solution for containers."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Metrics"
  - "Category::Network"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Security"
  - "Category::Kubernetes"
  - "Submitted Data Type::Metrics"
  - "Submitted Data Type::Logs"
  "configuration": "README.md#Setup"
  "description": Calico is a networking and network security solution for containers.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": calico
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Calico][1] を監視します。

Calico チェックは、Calico で設定した Kubernetes クラスターのネットワークやセキュリティに関するメトリクスを送信します。

## セットアップ

### インストール

Calico チェックは [Datadog Agent][2] パッケージに含まれています。

#### Kubernetes クラスターベースの Agent でのインストール

アノテーションを使用する:

1. クラスターに Calico をセットアップします。

2. [Calico コンポーネントのメトリクスを監視する][3]の手順で、Prometheus のメトリクスを有効にします。
   有効にすると、クラスター内で `felix-metrics-svc` と `prometheus-pod` サービスが動作します。

3. オートディスカバリーを使用するには、`prometheus-pod` を修正します。Prometheus の YAML コンフィギュレーションファイルに以下のスニペットを追加してください。

   ```
   metadata:
     [...]
     annotations:
      ad.datadoghq.com/prometheus-pod.check_names: |
      ["openmetrics"]
      ad.datadoghq.com/prometheus-pod.init_configs: |
      [{}]
      ad.datadoghq.com/prometheus-pod.instances: |
        [
           {
              "prometheus_url": "http://<FELIX-SERVICE-IP>:<FELIX-SERVICE-PORT>/metrics",
              "namespace": "calico",
              "metrics": ["*"]
           }
        ]
     spec:
       [....]
   ```

`kubectl get all -all-namespaces` を実行して、 `<FELIX-SERVICE-IP>` と `<FELIX-SERVICE-PORT>` の値を見つけることができます。

#### OS ベースの Agent でのインストール

1. `kubectl get all --all-namespaces` を使って `felix-metrics-svc` サービスが実行するまで [Calico コンポーネントのメトリクスを監視する][3]に従います。

2. minikube を使用している場合は、`felix-metrics-svc` にポート 9091 を転送する必要があります。
   `kubectl port-forward service/felix-metrics-svc 9091:9091 -n kube-system` を実行します。

   minikube を使用していない場合は、`felix-metrics-svc` が外部 IP を持っているかを確認してください。サービスが外部 IP を持っていない場合は、`kubectl edit svc` を使用して、そのタイプを `ClusterIP` から `LoadBalancer` に変更してください。


### 構成

ホストで実行中の Agent でこのチェックを構成する場合は、手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

1. Calico のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `calico.d/conf.yaml` ファイルを編集します。
   必須パラメーターは `openmetrics_endpoint` の URL のみです。利用可能なすべての構成オプションは [sample calico.d/conf.yaml][1] を参照してください。

2. minikube を使用している場合は、`openmetrics_endpoint` の URL として 'http://localhost:9091/metrics' を使用してください。
   minikube を使用していない場合は、 `openmetrics_endpoint` の URL として `http://<FELIX-METRICS-SVC-EXTERNAL-IP>:<PORT>/metrics` を使用してください。

3. [Agent を再起動します][2]。

##### メトリクスの収集

1. The default configuration of your `calico.d/conf.yaml` file activate the collection of your [Calico metrics](#metrics). See the [sample calico.d/conf.yaml][1] for all available configuration options.

2. [Agent を再起動します][2]。

##### ログ収集

Calico の構造は Kubernetes クラスターで設定されているため、デプロイメント、ポッド、サービスなどで構築されています。Kubernetes インテグレーションでは、コンテナからログを取得します。

[Kubernetes][3] インテグレーションを設定すると、Datadog ログエクスプローラーで Calico のログが利用できるようになります。

Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

[1]: https://github.com/DataDog/integrations-core/blob/master/calico/datadog_checks/calico/data/conf.yaml.example
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/agent/kubernetes
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `calico`                                                   |
| `<INIT_CONFIG>`      | 空白または `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{openmetrics_endpoint: <OPENMETRICS_ENDPOINT>}`           |

##### ログ収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "calico", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `calico` を探します。

### メトリクス
{{< get-metrics-from-git "calico" >}}


### イベント

Calico インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "calico" >}}



## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog での Calico モニタリング][6]


[1]: https://www.tigera.io/project-calico/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.tigera.io/calico/3.25/operations/monitor/monitor-component-metrics
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/monitor-calico-with-datadog/
