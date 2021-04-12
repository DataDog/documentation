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
  - languages
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/go-metro/README.md'
display_name: Go-Metro
draft: false
git_integration_title: go-metro
guid: 6d00688b-32b1-4755-98cd-44bd1bd40428
integration_id: go-metro
integration_title: Go-Metro
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.net.tcp.rtt
name: go-metro
public_title: Datadog-Go-Metro インテグレーション
short_description: ホスト間の TCP RTT を受動的に計算
support: コア
supported_os:
  - linux
---
## 概要

TCP RTT チェックは、Agent が実行されているホストと Agent の通信相手のホストの間のラウンドトリップ回数を報告します。このチェックは受動的で、チェックの外部から送信されて受信したパケットの RTT 回数のみを報告します。チェック自身はパケットを送信しません。

このチェックは、64 ビットの DEB および RPM Datadog Agent v5 パッケージにのみ付属しています。現在、このチェックは Datadog Agent v6 では**使用できません**。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

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

### コンフィギュレーション

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

*注*: go-metro を権限のない状態で実行するには、バイナリで CAP_NET_RAW 機能を設定する必要があります。
```
# 必要なライブラリをインストール
$ sudo apt-get install libcap  # Debian
$ sudo apt-get install libcap2-bin  # Debian の代替alternative
$ sudo yum install libcap  # Redhat
$ sudo yum install compat-libcap1  # Redhat の代替

# 機能を設定
$ sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

製品ごとにパッケージの名称が異なるため、上記の説明に従っても
上手く操作できない場合には、`apt-cache search libcap` もしくは `yum search libcap` を発行してください。
バイナリを提供するパッケージのショートリストが表示されます。
サポートが必要な場合は、お気軽にお問い合わせください。

また、go-metro は独自のファイルにログを記録することにご注意ください。ログは `/var/log/datadog/go-metro.log` にあります。
さらに、go-metro はスタンドアロンで機能するため、現状では Agent の情報ページには表示 *されません*。

最後に、go-metro バイナリは、Datadog Agent の 64-ビット RPM と DEB 製品のみに同梱されているため
パッケージ化されたバージョンでのみ使用できます
(つまり、go-metro は現在ソースインストールや 32-ビットパッケージでは利用できません)。

### 検証

チェックが正しく実行されているかを検証するには、Datadog インターフェイスに表示される `system.net.tcp.rtt` メトリクスを確認します。また、[Agent の `status` サブコマンドを実行][4]すると、以下のような表示になります。

```text
 datadog-agent.service - "Datadog Agent"
    Loaded: loaded (/lib/...datadog-agent.service; enabled; vendor preset: enabled)
    Active: active (running) since Thu 2016-03-31 20:35:27 UTC; 42min ago
  Process: 10016 ExecStop=/opt/.../supervisorctl -c /etc/dd-....conf shutdown (code=exited, status=0/SUCCESS)
  Process: 10021 ExecStart=/opt/.../start_agent.sh (code=exited, status=0/SUCCESS)
  Main PID: 10025 (supervisord)
    CGroup: /system.slice/datadog-agent.service
            ├─10025 /opt/datadog-...python /opt/datadog-agent/bin/supervisord -c /etc/dd-agent/supervisor.conf
            ├─10043 /opt/datadog-...python /opt/datadog-agent/agent/dogstatsd.py --use-local-forwarder
            ├─10044 /opt/datadog-agent/bin/go-metro -cfg=/etc/dd-agent/conf.d/go-metro.yaml
            ├─10046 /opt/datadog-.../python /opt/datadog-agent/agent/ddagent.py
            └─10047 /opt/datadog-.../python /opt/datadog-agent/agent/agent.py foreground --use-local-forwarder
```

TCP RTT チェックが開始している場合は、上のような go-metro 行が表示されます。

**これは受動チェックなので、yaml ファイルで指定されているホストにパケットがアクティブに送信されない限り、メトリクスは報告されません。**

## 収集データ

### メトリクス
{{< get-metrics-from-git "go-metro" >}}


### イベント

Go-metro チェックには、イベントは含まれません。

### サービスのチェック

Go-metro チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/go-metro
[3]: https://github.com/DataDog/integrations-core/blob/master/go-metro/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/go-metro/metadata.csv
[6]: https://docs.datadoghq.com/ja/help/