---
app_id: gatekeeper
app_uuid: 9c48b05d-ee74-4557-818e-14456c6f427b
assets:
  dashboards:
    Gatekeeper base dashboard: assets/dashboards/gatekeeper_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: gatekeeper.constraints
      metadata_path: metadata.csv
      prefix: gatekeeper.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10148
    source_type_name: Gatekeeper
  logs:
    source: gatekeeper
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: ara.pulido@datadoghq.com
  support_email: ara.pulido@datadoghq.com
categories:
- クラウド
- コンプライアンス
- 構成 & デプロイ
- コンテナ
- セキュリティ
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/README.md
display_on_public_website: true
draft: false
git_integration_title: gatekeeper
integration_id: gatekeeper
integration_title: Gatekeeper
integration_version: 1.0.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: gatekeeper
public_title: Gatekeeper
short_description: Gatekeeper インテグレーション
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - カテゴリ::コンプライアンス
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Security
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Gatekeeper インテグレーション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Gatekeeper
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは、[OPA Gatekeeper][1] からメトリクスを収集します。

![Gatekeeper 概要ダッシュボード][2]

## 計画と使用

Kubernetes クラスターで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。[オートディスカバリーのインテグレーションテンプレート][3]のガイドも参照してこの手順を行ってください。

### インフラストラクチャーリスト

#### Agent バージョン >=7.26.0 または >=6.26.0

`integrations-extra` からのインテグレーションを Docker Agent と使用するには、Datadog はインテグレーションがインストールされた状態で Agent を構築することをお勧めします。次の Dockerfile を使用して、`integrations-extras` からの `gatekeeper` インテグレーションを含む Agent の更新バージョンをビルドします。

```
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-gatekeeper==<INTEGRATION_VERSION>
```

#### Agent バージョン <7.26.0 または <6.26.0

gatekeeper チェックを Kubernetes クラスターにインストールするには:

1. [開発ツールキット][4]をインストールします。
2. `integrations-extras` リポジトリを複製します。

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. `gatekeeper` パッケージをビルドするには、次を実行します。

   ```shell
   ddev -e release build gatekeeper
   ```

5. [Agent マニフェストをダウンロードして、Datadog Agent を DaemonSet としてインストールします][5]。
6. チェックコード用と構成用の 2 つの `PersistentVolumeClaim` を作成します。
7. それらをボリュームとして Agent ポッドテンプレートに追加し、チェックと構成に使用します。

   ```yaml
        env:
          - name: DD_CONFD_PATH
            value: "/confd"
          - name: DD_ADDITIONAL_CHECKSD
            value: "/checksd"
      [...]
        volumeMounts:
          - name: agent-code-storage
            mountPath: /checksd
          - name: agent-conf-storage
            mountPath: /confd
      [...]
      volumes:
        - name: agent-code-storage
          persistentVolumeClaim:
            claimName: agent-code-claim
        - name: agent-conf-storage
          persistentVolumeClaim:
            claimName: agent-conf-claim
   ```

8. Kubernetes クラスターに Datadog Agent をデプロイします。

   ```shell
   kubectl apply -f agent.yaml
   ```

9. インテグレーションアーティファクトの .whl ファイルを Kubernetes ノードにコピーするか、パブリック URL にアップロードします

10. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```shell
    kubectl exec ds/datadog -- agent integration install -w <PATH_OF_GATEKEEPER_ARTIFACT_>/<GATEKEEPER_ARTIFACT_NAME>.whl
    ```

11. 以下のコマンドを実行して、チェックと構成を対応する PVC にコピーします。

    ```shell
    kubectl exec ds/datadog -- sh
    # cp -R /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/* /checksd
    # cp -R /etc/datadog-agent/conf.d/* /confd
    ```

12. Datadog Agent ポッドを再起動します。

### ブラウザトラブルシューティング

1. gatekeeper のパフォーマンスデータの収集を開始するには、Agent ポッドに追加した `/confd` フォルダーの `gatekeeper/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル cert_manager.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `gatekeeper` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "gatekeeper" >}}


### ヘルプ

Gatekeeper には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "gatekeeper" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://github.com/open-policy-agent/gatekeeper
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/gatekeeper/images/gatekeeper_dashboard.png
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/ja/developers/integrations/python/
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile
[6]: https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/datadog_checks/gatekeeper/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/