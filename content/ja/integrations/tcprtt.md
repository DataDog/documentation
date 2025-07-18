---
integration_title: TCP RTT
name: tcp_rtt
kind: インテグレーション
newhlevel: true
is_public: true
public_title: Datadog-TCP RTT インテグレーション
short_description: リモートホストへの TCP 接続を監視。
categories:
  - network
ddtype: check
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/tcprtt.md'
integration_id: tcp-rtt
---
## 概要

TCP RTT チェックは、Agent のホストと Agent の通信相手のホストの間のラウンドトリップ回数を報告します。このチェックは受動的で、チェックの外部から送信されて受信したパケットの RTT 回数のみを報告します。チェック自身はパケットを送信しません。

このチェックは、64 ビットの DEB および RPM Datadog Agent v5 パッケージにのみ付属しています。Agent の他のバージョンで go-metro バイナリをビルドする方法については、[Datadog/go-metro の使用法][1]を参照してください。

## セットアップ

### インストール

このチェックは、発信パケットから対応する TCP 受信確認までの時間を計算するために、PCAP ライブラリで提供されているタイムスタンプを使用します。そのため、PCAP をインストールして構成する必要があります。

Debian ベースのシステムでは、以下のいずれかを使用します。

```text
$ sudo apt-get install libcap
$ sudo apt-get install libcap2-bin
```

Redhat ベースのシステムでは、以下のいずれかを使用します。

```text
$ sudo yum install libcap
$ sudo yum install compat-libcap1
```

最後に、PCAP を構成します。

```text
$ sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

### コンフィギュレーション

[Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーの `go-metro.d/conf.yaml` を編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル go-metro.d/conf.yaml][3] を参照してください。

次の例では、`app.datadoghq.com` と `192.168.0.22` の TCP RTT 回数を取得します。

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

チェックが正しく実行されているかを検証するには、Datadog インターフェイスに表示される `system.net.tcp.rtt` メトリクスを確認します。また、`sudo /etc/init.d/datadog-agent status` を実行した場合は、以下のような結果が表示されます。

```shell
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

これは受動チェックなので、yaml ファイルで指定されているホストにパケットがアクティブに送信されない限り、メトリクスは報告されません。

## 収集データ

### メトリクス

{{< get-metrics-from-git "system" "system.net.tcp.rtt" >}}

[1]: https://github.com/DataDog/go-metro#usage
[2]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/go-metro/datadog_checks/go-metro/data/conf.yaml.example