---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - セキュリティ
  - OS & システム
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/kernelcare/README.md'
display_name: KernelCare
draft: true
git_integration_title: kernelcare
guid: 8b35942d-40cd-4c86-b584-af1837ea67ca
integration_id: kernelcare
integration_title: KernelCare
is_public: false
kind: インテグレーション
maintainer: schvaliuk@cloudlinux.com
manifest_version: 1.0.0
metric_prefix: kernelcare.
metric_to_check: kernelcare.uptodate
name: kernelcare
public_title: Datadog-KernelCare インテグレーション
short_description: KernelCare サーバーのアクティビティとステータスメトリクスを監視します。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

[KernelCare][1] は、Linux カーネルの脆弱性に対して、再起動することなく自動的にセキュリティパッチを適用するライブパッチシステムです。過去 6 年、Dell やZoom を始めとする企業の 50 万台以上のサーバーで利用されています。RHEL、CentOS、Amazon Linux、Ubuntu など主要な Linux ディストリビューションで動作し、一般的な脆弱性スキャナー、クラウドモニタリングツール、パッチ管理ソリューションと相互運用します。

このインテグレーションにより、Datadog Agent を介して KernelCare メトリクスを転送できます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Kernelcare チェックをインストールしてください。[バージョン 6.8 以前の Agent][4] または [Docker Agent][5] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][3]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][6]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-kernelcare==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。
### コンフィギュレーション

1. KernelCare のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `kernelcare.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[kernelcare.d/conf.yaml のサンプル][8]を参照してください。

2. [Agent を再起動します][9]。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `kernelcare` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kernelcare" >}}


### サービスのチェック

**`kernelcare.can_connect`**:

Agent が KernelCare に接続してメトリクスを収集できない場合は、`Critical` を返します。それ以外の場合は、`OK` を返します。

### イベント

KernelCare には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://www.kernelcare.com
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/ja/getting_started/integrations/
[8]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/datadog_checks/kernelcare/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/metadata.csv
[12]: https://docs.datadoghq.com/ja/help/