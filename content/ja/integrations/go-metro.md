---
app_id: go-metro
app_uuid: 77c9906a-9579-4014-95c3-42b4536dc17d
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.net.tcp.rtt
      metadata_path: metadata.csv
      prefix: system.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Go-Metro
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- languages
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/go-metro/README.md
display_on_public_website: true
draft: false
git_integration_title: go-metro
integration_id: go-metro
integration_title: Go-Metro
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: go-metro
public_title: Go-Metro
short_description: ホスト間の TCP RTT を受動的に計算
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::言語
  configuration: README.md#Setup
  description: ホスト間の TCP RTT を受動的に計算
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Go-Metro
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

TCP RTT チェックは、Agent が実行されているホストと Agent の通信相手のホストの間のラウンドトリップ回数を報告します。このチェックは受動的で、チェックの外部から送信されて受信したパケットの RTT 回数のみを報告します。チェック自身はパケットを送信しません。

このチェックは、64 ビットの DEB および RPM Datadog Agent v5 パッケージにのみ付属しています。このチェックは Datadog Agent v6 では**使用できません**。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

[go-metro][2] とも呼ばれる TCP RTT チェックは、Agent にパッケージ化されていますが、追加のシステムライブラリが必要です。このチェックは、発信パケットから対応する TCP 受信確認までの時間を計算するために、PCAP ライブラリで提供されているタイムスタンプを使用します。そのため、PCAP をインストールして構成する必要があります。

Debian ベースのシステムでは、以下のいずれかを使用します。

```bash
sudo apt-get install libcap
sudo apt-get install libcap2-bin
```

Redhat ベースのシステムでは、以下のいずれかを使用します。

```bash
sudo yum install libcap
sudo yum install compat-libcap1
```

最後に、PCAP を構成します。

```bash
sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

### ブラウザトラブルシューティング

Agent の `conf.d` ディレクトリで、`go-metro.yaml` ファイルを編集します。利用可能なすべてのコンフィギュレーションのオプションについては、[サンプル go-metro.yaml][3] を参照してください。
app.datadoghq.com と 192.168.0.22 について、TCP RTT 時間を示すファイルの例を以下に挙げます。

```yaml
init_config:
  snaplen: 512
  idle_ttl: 300
  exp_ttl: 60
  statsd_ip: 127.0.0.1
  statsd_port: 8125
  log_to_file: true
  log_level: info
instances:
  - interface: eth0
    tags:
      - env:prod
    ips:
      - 45.33.125.153
    hosts:
      - app.datadoghq.com
```

*注*: go-metro を権限のない状態で実行するには、バイナリで `CAP_NET_RAW` 機能を設定する必要があります。
```
# 必要なライブラリをインストール
$ sudo apt-get install libcap  # Debian
$ sudo apt-get install libcap2-bin  # Debian の代替alternative
$ sudo yum install libcap  # Redhat
$ sudo yum install compat-libcap1  # Redhat の代替

# 機能を設定
$ sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

ディストリビューションによってパッケージ名が異なるため、上記の手順がうまくいかない場合は、`apt-cache search libcap` または `yum search libcap` を実行して、バイナリを提供するパッケージのショートリストを入手してください。サポートが必要な場合は、[Datadog サポート][4]に連絡してください。

**注**: go-metro は専用のファイルにログを記録します。このファイルは `/var/log/datadog/go-metro.log` で見つけることができます。また、go-metro はスタンドアロンで実行されるため、Agent のステータス出力には表示されません。

最後に、go-metro バイナリは、Datadog Agent の 64-ビット RPM と DEB 製品のみに同梱されているためパッケージ化されたバージョンでのみ使用できます。つまり、go-metro はソースインストールや 32-ビットパッケージでは利用できません。

### 検証

チェックが正しく実行されているかを検証するには、Datadog インターフェイスに表示される `system.net.tcp.rtt` メトリクスを確認します。また、[Agent の `status` サブコマンドを実行][5]すると、以下のような表示になります。

```text
 datadog-agent.service - "Datadog Agent"
    Loaded: loaded (/lib/...datadog-agent.service; enabled; vendor preset: enabled)
    Active: active (running) since Thu 2016-03-31 20:35:27 UTC; 42min ago
  Process: 10016 ExecStop=/opt/.../supervisorctl -c /etc/dd-....conf shutdown (code=exited, status=0/SUCCESS)
  Process: 10021 ExecStart=/opt/.../start_agent.sh (code=exited, status=0/SUCCESS)
  Main PID: 10025 (supervisord)
    CGroup: /system.slice/datadog-agent.service
            |_10025 /opt/datadog-...python /opt/datadog-agent/bin/supervisord -c /etc/dd-agent/supervisor.conf
            |_10043 /opt/datadog-...python /opt/datadog-agent/agent/dogstatsd.py --use-local-forwarder
            |_10044 /opt/datadog-agent/bin/go-metro -cfg=/etc/dd-agent/conf.d/go-metro.yaml
            |_10046 /opt/datadog-.../python /opt/datadog-agent/agent/ddagent.py
            |_10047 /opt/datadog-.../python /opt/datadog-agent/agent/agent.py foreground --use-local-forwarder
```

TCP RTT チェックが開始している場合は、上のような go-metro 行が表示されます。

**これは受動チェックなので、yaml ファイルで指定されているホストにパケットがアクティブに送信されない限り、メトリクスは報告されません。**

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "go-metro" >}}


### ヘルプ

Go-metro チェックには、イベントは含まれません。

### ヘルプ

Go-metro チェックには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/go-metro
[3]: https://github.com/DataDog/integrations-core/blob/master/go-metro/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/go-metro/metadata.csv