---
app_id: wayfinder
app_uuid: a68bad83-ba55-4350-a913-2f98bb667bad
assets:
  dashboards:
    Wayfinder: assets/dashboards/wayfinder_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: wayfinder.workqueue.depth
      metadata_path: metadata.csv
      prefix: wayfinder.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10370
    source_type_name: wayfinder
  logs: {}
author:
  homepage: https://www.appvia.io/product/
  name: Appvia
  sales_email: info@appvia.io
  support_email: support@appvia.io
categories:
- incident-teams
- 開発ツール
- kubernetes
- モニター
- オーケストレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/wayfinder/README.md
display_on_public_website: true
draft: false
git_integration_title: wayfinder
integration_id: wayfinder
integration_title: Wayfinder
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: wayfinder
public_title: Wayfinder
short_description: Wayfinder メトリクスを Datadog に送信する
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Developer Tools
  - Category::Kubernetes
  - Category::Metrics
  - Category::Orchestration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Wayfinder メトリクスを Datadog に送信する
  media:
  - caption: Wayfinder サンプル Datadog ダッシュボード
    image_url: images/wayfinder-datadog-dash.png
    media_type: image
  - caption: Wayfinder UI
    image_url: images/wayfinder-ui.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Wayfinder
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Wayfinder][1] は、一元構成によって開発者のセルフサービスを可能にするインフラストラクチャー管理プラットフォームです。このチェックでは、Datadog Agent を通じて Wayfinder のキー管理コンポーネントを監視します。 


インテグレーションは Wayfinder API サーバー、コントローラー、Webhook コンポーネントからキーメトリクスを収集します。これらのメトリクスは、管理されたワークスペースの問題を明らかにします。

## 計画と使用

以下の手順に従って、Wayfinder Kubernetes 管理クラスターにインテグレーションをインストールしてください。

### インフラストラクチャーリスト

コンテナ環境では、Docker Agent とこのインテグレーションを使用する最善の方法は、Wayfinder インテグレーションをインストールした Agent をビルドすることです。

### 前提条件:

Datadog Agent が Wayfinder コンポーネントに接続できるようにするには、 ネットワークポリシーを構成する必要があります。以下のネットワークポリシーは、 Datadog が Datadog ネームスペースに、 Wayfinder が Wayfinder ネームスペースにデプロイされていることを前提としています。

```yaml
apiVersion: networking.k8s.io/v1
metadata:
  name: datadog-agent
  namespace: wayfinder
spec:
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: datadog
      podSelector:
        matchLabels:
          app: datadog-agent
    ports:
    - port: 9090
      protocol: TCP
  podSelector:
    matchExpressions:
    - key: name
      operator: In
      values:
      - wayfinder-controllers
      - wayfinder-apiserver
      - wayfinder-webhooks
  policyTypes:
  - Ingress
```

Agent のアップデート版をビルドするには

1. 以下の Dockerfile を使用します。

    ```dockerfile
    FROM gcr.io/datadoghq/agent:latest

    ARG INTEGRATION_VERSION=1.0.0

    RUN agent integration install -r -t datadog-wayfinder==${INTEGRATION_VERSION}
    ```

2. イメージをビルドし、プライベート Docker レジストリにプッシュします。

3. Datadog Agent コンテナイメージをアップグレードします。Helm チャートを使用している場合は、
   `values.yaml` ファイルの `agents.image` セクションを変更して、
   デフォルトの Agent イメージを置き換えます。

    ```yaml
    agents:
      enabled: true
      image:
        tag: <NEW_TAG>
        repository: <YOUR_PRIVATE_REPOSITORY>/<AGENT_NAME>
    ```

4. 新しい `values.yaml` ファイルを使用して Agent をアップグレードします。

    ```shell
    helm upgrade -f values.yaml <RELEASE_NAME> datadog/datadog
    ```

### ブラウザトラブルシューティング

1. Agent の構成ディレクトリの root にある `conf.d/` フォルダーの `wayfinder/conf.yaml` ファイルを編集して、
   Wayfinder データの収集を開始します。
   使用可能なすべての構成オプションの詳細については、[サンプル wayfinder/conf.yaml][4] を参照してください
   。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `wayfinder` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "wayfinder" >}}


### ヘルプ

Wayfinder には、サービスのチェック機能は含まれません。

### ヘルプ

Wayfinder には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[4]:
    https://github.com/DataDog/integrations-extras/blob/master/wayfinder/datadog_checks/wayfinder/data/conf.yaml.example
[5]:
    https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]:
    https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]:
    https://github.com/DataDog/integrations-extras/blob/master/wayfinder/metadata.csv
[8]:
    https://github.com/DataDog/integrations-extras/blob/master/wayfinder/assets/service_checks.json

[1]: https://www.appvia.io/product/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/