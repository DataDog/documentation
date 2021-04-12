---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Gatekeeper base dashboard: assets/dashboards/gatekeeper_overview.json
  logs:
    source: gatekeeper
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - セキュリティ
  - コンテナ
  - 構成 & デプロイ
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/README.md'
display_name: Gatekeeper
draft: true
git_integration_title: gatekeeper
guid: a68c72bd-a16a-4fcf-8911-43575dd722b9
integration_id: gatekeeper
integration_title: Gatekeeper
is_public: false
kind: インテグレーション
maintainer: ara.pulido@datadoghq.com
manifest_version: 1.0.0
metric_prefix: gatekeeper.
metric_to_check: gatekeeper.constraints
name: gatekeeper
public_title: Gatekeeper
short_description: Gatekeeper インテグレーション
support: contrib
supported_os:
  - linux
---
## 概要

このチェックは、[OPA Gatekeeper][1] からメトリクスを収集します。

## セットアップ

Kubernetes クラスターで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。[オートディスカバリーのインテグレーションテンプレート][2]のガイドも参照してこの手順を行ってください。

### インストール

gatekeeper チェックを Kubernetes クラスターにインストールするには:

1. [開発ツールキット][3]をインストールします。
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

5. [Agent マニフェストをダウンロードして、Datadog Agent を DaemonSet としてインストールします][4]。
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

### コンフィギュレーション

1. gatekeeper のパフォーマンスデータの収集を開始するには、Agent ポッドに追加した `/confd` フォルダーの `gatekeeper/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル cert_manager.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `gatekeeper` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "gatekeeper" >}}


### サービスのチェック

`gatekeeper.health`
Agent が gatekeeper ヘルスエンドポイントへの接続に失敗した場合は、`CRITICAL` を返します。200 を受信した場合は `OK`、それ以外の場合は `WARNING` を返します。

### イベント

Gatekeeper には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://github.com/open-policy-agent/gatekeeper
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile
[5]: https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/datadog_checks/gatekeeper/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/gatekeeper/metadata.csv