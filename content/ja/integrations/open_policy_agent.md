---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    OPA base dashboard: assets/dashboards/open_policy_agent_overview.json
  logs:
    source: opa
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - security
  - containers
  - 構成 & デプロイ
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/open_policy_agent/README.md'
display_name: open_policy_agent
draft: false
git_integration_title: open_policy_agent
guid: 73fdfc40-51ea-11eb-ae93-0242ac130002
integration_id: open-policy-agent
integration_title: Open Policy Agent
is_public: true
kind: integration
maintainer: ara.pulido@datadoghq.com
manifest_version: 1.0.0
metric_prefix: open_policy_agent.
metric_to_check: open_policy_agent.policies
name: open_policy_agent
public_title: Open Policy Agent
short_description: OPA インテグレーション
support: contrib
supported_os:
  - linux
---
## 概要

このチェックは、[Open Policy Agent][1] からメトリクスを収集します。

## セットアップ

Kubernetes クラスターで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。[オートディスカバリーのインテグレーションテンプレート][2]のガイドも参照してこの手順を行ってください。

### インストール

open_policy_agent チェックを Kubernetes クラスターにインストールするには:

1. [開発ツールキット][3]をインストールします。
2. `integrations-extras` リポジトリを複製します。

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. `open_policy_agent` パッケージをビルドするには、以下を実行します:

   ```shell
   ddev -e release build open_policy_agent
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

9. インテグレーションアーティファクトの .whl ファイルを Kubernetes ノードにコピーするか、パブリック URL にアップロードします。

10. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```shell
    kubectl exec ds/datadog -- agent integration install -w <PATH_OF_OPEN_POLICY_AGENT_ARTIFACT_>/<OPEN_POLICY_AGENT_ARTIFACT_NAME>.whl
    ```

11. 以下のコマンドを実行して、チェックと構成を対応する PVC にコピーします。

    ```shell
    kubectl exec ds/datadog -- sh
    # cp -R /opt/datadog-agent/embedded/lib/python2.7/site-packages/datadog_checks/* /checksd
    # cp -R /etc/datadog-agent/conf.d/* /confd
    ```

12. Datadog Agent ポッドを再起動します。

### ログ生成メトリクス

デフォルトのダッシュボードには、OPA の決定メトリクス `open_policy_agent.decisions` に関連するグラフがいくつか表示されます。このメトリクスは OPA の "Decision Log" に基づいて作成されます。このメトリクスを生成してダッシュボードの該当する部分に入力するには、Datadog でログ生成メトリクスを新規作成します。

ログエントリの "Decision Log" タイプに対応するメトリクスのみを生成するために、まず OPA ログの `msg` フィールドに対応するファセットを作成します。OPA を起点とするログエントリのいずれかを選択し、`msg` フィールド付近にあるエンジンログをクリックして "Create facet for @msg" を選択します。

![Message ファセット][5]

`input.request.kind.kind` フィールドと `result.response.allowed` フィールド用に合計 2 つのファセットを作成します。どちらのフィールドも "Decision Log" タイプのすべてのログエントリで利用可能です。

![Kind ファセット][6]
![Allowed ファセット][7]

ファセットを作成したら、ダッシュボードを完成させるために必要なメトリクスを生成します。メニューで "Logs -> Generate Metrics" をクリックし、"Add a new metric" をクリックして以下のデータをフォームに入力してください。

![OPA 決定メトリクス][8]

### コンフィギュレーション

1. OPA パフォーマンスデータの収集を開始するには、Agent ポッドに追加した `/confd` フォルダーの `open_policy_agent/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル open_policy_agent/conf.yaml][9] を参照してください。

2. [Agent を再起動します][10]。

### 検証

[Agent の status サブコマンドを実行][11]し、Checks セクションで `open_policy_agent` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "open_policy_agent" >}}


### サービスのチェック

**`open_policy_agent.prometheus.health`**:<br>
Agent が Prometheus エンドポイントへの接続に失敗した場合は、CRITICAL を返します。それ以外の場合は、UP を返します。

**`open_policy_agent.health`**:<br>
Agent が OPA ヘルスエンドポイントへの接続に失敗した場合は、`CRITICAL` を返します。200 を受信した場合は `OK`、それ以外の場合は `WARNING` を返します。

**`open_policy_agent.bundles_health`**:<br>
Agent が OPA バンドルのヘルスエンドポイントへの接続に失敗した場合は `CRITICAL` を返します。200 を受信した場合は `OK`、それ以外の場合は `WARNING` を返します。

**`open_policy_agent.plugins_health`**:<br>
Agent が OPA プラグインのヘルスエンドポイントへの接続に失敗した場合は、`CRITICAL` を返します。200 を受信した場合は `OK`、それ以外の場合は `WARNING` を返します。

### イベント

open_policy_agent には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

[1]: https://www.openpolicyagent.org/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/msg_facet.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/kind_facet.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/allowed_facet.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/open_policy_agent/images/metric.png
[9]: https://github.com/DataDog/integrations-extras/blob/master/open_policy_agent/datadog_checks/open_policy_agent/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/open_policy_agent/metadata.csv
[13]: https://docs.datadoghq.com/ja/help/