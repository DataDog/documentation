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
- security
- OS & システム
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/kernelcare/README.md
display_name: KernelCare
draft: false
git_integration_title: kernelcare
guid: 8b35942d-40cd-4c86-b584-af1837ea67ca
integration_id: kernelcare
integration_title: KernelCare
integration_version: 1.0.0
is_public: true
kind: integration
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

Kernelcare チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インストール

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Kernelcare チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-kernelcare==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. KernelCare のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `kernelcare.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[kernelcare.d/conf.yaml のサンプル][5]を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンド][7]を実行し、Checks セクションで `kernelcare` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "kernelcare" >}}


### イベント

Kernelcare インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "kernelcare" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://www.kernelcare.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/datadog_checks/kernelcare/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/