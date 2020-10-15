---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - security
  - 構成 & デプロイ
  - コンテナ
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/cert_manager/README.md'
display_name: cert-manager
draft: true
git_integration_title: cert_manager
guid: c9bdaf11-fe15-4892-ae30-47c5124144e5
integration_id: cert-manager
integration_title: cert-manager
is_public: false
kind: インテグレーション
maintainer: ara.pulido@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cert_manager.
metric_to_check: cert_manager.prometheus.health
name: cert_manager
public_title: Datadog-cert-manager インテグレーション
short_description: cert-manager のすべてのメトリクスを Datadog で追跡
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、[cert-manager][1] からメトリクスを収集します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

cert_manager チェックをホストにインストールするには

1. [開発ツールキット][3]をインストールします。
2. `integrations-extras` リポジトリを複製します。

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. `cert_manager` パッケージをビルドします。

   ```shell
   ddev -e release build cert_manager
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
    kubectl exec $(kubectl get pods -l app=datadog-agent -o jsonpath='{.items[0].metadata.name}') -- agent integration install -w <PATH_OF_CERT_MANAGER_ARTIFACT_>/<CERT_MANAGER_ARTIFACT_NAME>.whl
    ```

11. 以下のコマンドを実行して、チェックと構成を対応する PVC にコピーします。

    ```shell
    kubectl exec $(kubectl get pods -l app=datadog-agent -o jsonpath='{.items[0].metadata.name}') -- cp -R /opt/datadog-agent/embedded/lib/python2.7/site-packages/datadog_checks/* /checksd
    kubectl exec $(kubectl get pods -l app=datadog-agent -o jsonpath='{.items[0].metadata.name}') -- cp -R /etc/datadog-agent/conf.d/* /confd
    ```

12. Datadog Agent ポッドを再起動します。

### コンフィギュレーション

1. cert_manager のパフォーマンスデータの収集を開始するには、Agent ポッドに追加した `/confd` フォルダーの `cert_manager.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル cert_manager.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `cert_manager` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cert_manager" >}}


### サービスのチェック

`cert_manager.prometheus.health`:
Agent が Prometheus エンドポイントへの接続に失敗した場合は、CRITICAL を返します。それ以外の場合は、UP を返します。

### イベント

cert_manager には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://github.com/jetstack/cert-manager
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile
[5]: https://github.com/DataDog/integrations-extras/blob/master/cert_manager/datadog_checks/cert_manager/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/cert_manager/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/