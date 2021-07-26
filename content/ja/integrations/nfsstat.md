---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/nfsstat/README.md'
display_name: Nfsstat
git_integration_title: nfsstat
guid: 9f2fe3a7-ae19-4da9-a253-ae817a5557ab
integration_id: system
integration_title: Nfsstat
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.nfs.ops
name: nfsstat
public_title: Datadog-Nfsstat インテグレーション
short_description: nfsstat は nfsiostat-sysstat メトリクスを取得します。
support: コア
supported_os:
  - linux
---
## 概要

NFS インテグレーションは、マウントごとの NFS クライアント[統計][1]を表示する `nfsiostat` ツールを使用して、NFS クライアント上のマウントポイントに関するメトリクスを収集します。

## セットアップ

以下の手順に従って、このチェックをインストールし、ホストで実行中の Agent に対して構成します。

### インストール

NFSstat チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

[Agent のコンフィギュレーションディレクトリ][3]のルートにある `conf.d/` フォルダーの `nfsstat.d/conf.yaml` ファイルを編集して、nfsiostat バイナリスクリプトを指定するか、バイナリインストーラーに含まれているスクリプトを使用します。使用可能なすべてのコンフィギュレーションオプションについては、[nfsstat.d/conf.yaml のサンプル][4]を参照してください。

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `nfsstat` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "nfsstat" >}}


### イベント
Nfststat チェックには、イベントは含まれません。

### サービスのチェック
Nfsstat チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

## その他の参考資料

* [HTTP チェックでネットワークモニターを構築する][8]

[1]: http://man7.org/linux/man-pages/man8/nfsiostat.8.html
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/nfsstat/datadog_checks/nfsstat/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/nfsstat/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://docs.datadoghq.com/ja/monitors/monitor_types/network/
