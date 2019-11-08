---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - languages
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/go-metro/README.md'
display_name: Go-Metro
git_integration_title: go-metro
guid: 6d00688b-32b1-4755-98cd-44bd1bd40428
integration_id: go-metro
integration_title: Go-Metro
is_public: true
kind: integration
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
$ sudo apt-get install libcap
$ sudo apt-get install libcap2-bin
```

Redhat ベースのシステムでは、以下のいずれかを使用します。

```bash
$ sudo yum install libcap
$ sudo yum install compat-libcap1
```

最後に、PCAP を構成します。

```bash
$ sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

### コンフィグレーション

Agent の ```conf.d``` ディレクトリにある ```go-metro.yaml``` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[go-metro.yaml のサンプル][10]を参照してください。以下のサンプルファイルは、app.datadoghq.com と 192.168.0.22 の TCP RTT 回数を表示します。

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

### 検証

チェックが正しく実行されているかを検証するには、Datadog インターフェイスに表示される `system.net.tcp.rtt` メトリクスを確認します。また、[Agent の `status` サブコマンドを実行][4]すると、以下のような表示になります。

```
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

[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://github.com/DataDog/go-metro
[3]: https://github.com/DataDog/integrations-core/blob/master/go-metro/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/go-metro/metadata.csv
[6]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}