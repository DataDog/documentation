---
integration_title: TCP RTT チェック
name: tcp_rtt
kind: インテグレーション
newhlevel: true
is_public: true
public_title: Datadog-TCP RTT インテグレーション
short_description: "リモートホストへの TCP 接続を監視"
categories:
- network
ddtype: check
---
## 概要

TCP RTT チェックは、Agent が実行されているホストと Agent の通信相手のホストの間のラウンドトリップ回数を報告します。このチェックは受動的で、チェックの外部から送信されて受信したパケットの RTT 回数のみを報告します。チェック自身はパケットを送信しません。

このチェックは、64 ビットの DEB および RPM Datadog Agent パッケージにのみ付属しています。

## セットアップ
### インストール

このチェックは、発信パケットから対応する TCP 受信確認までの時間を計算するために、PCAP ライブラリで提供されているタイムスタンプを使用します。そのため、PCAP をインストールして構成する必要があります。

Debian ベースのシステムでは、以下のいずれかを使用します。

    $ sudo apt-get install libcap
    $ sudo apt-get install libcap2-bin

Redhat ベースのシステムでは、以下のいずれかを使用します。

    $ sudo yum install libcap
    $ sudo yum install compat-libcap1

最後に、PCAP を構成します。

    $ sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro

### 構成

Agent の `conf.d` ディレクトリにある `go-metro.yaml` ファイルを編集します。以下のサンプルファイルは、app.datadoghq.com と 192.168.0.22 の TCP RTT 回数を表示します。

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

{{< insert-example-links conf="go-metro" check="none" >}}

### 確認

チェックが正しく実行されているかを検証するには、Datadog インターフェイスに表示される `system.net.tcp.rtt` メトリクスを確認します。また、`sudo /etc/init.d/datadog-agent status` を実行した場合は、以下のような結果が表示されます。

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

TCP RTT チェックが開始している場合は、上のような go-metro 行が表示されます。

これは受動チェックなので、yaml ファイルで指定されているホストにパケットがアクティブに送信されない限り、メトリクスは報告されません。

## 収集データ
### メトリック

{{< get-metrics-from-git "system" "system.net.tcp.rtt" >}}
