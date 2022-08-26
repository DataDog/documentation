---
aliases:
- /ja/account_management/faq/can-i-use-a-proxy-to-connect-my-servers-to-datadog/
further_reading:
- link: /logs/
  tag: Documentation
  text: ログの収集
- link: /infrastructure/process/
  tag: Documentation
  text: プロセスの収集
- link: /tracing/
  tag: Documentation
  text: トレースとプロファイルを収集する
kind: documentation
title: Agent プロキシのコンフィギュレーション
---

## 概要

ご使用のネットワーク構成がアウトバウンドトラフィックを制限している場合は、より許容度の高いアウトバウンドポリシーを持つ 1 つ以上のホストを経由して、すべての Agent トラフィックをプロキシ転送します。

インターネットに直接接続していないホストから、SSL/TLS 経由で Datadog にトラフィックを送信するための方法はいくつかあります。

1. Squid、Microsoft Web Proxy など、既にネットワークにデプロイされている Web プロキシを使用する
2. HAProxy を使用する (**16～20 以上の Agent** に対して同じプロキシを使用する場合)
3. Agent をプロキシとして使用する (プロキシあたり**最大 16 Agent**、**Agent v5 のみ**)

## Web プロキシ

Agent は従来の Web プロキシをネイティブにサポートします。プロキシ経由でインターネットに接続する必要がある場合は、Agent 構成ファイルを編集します。

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

Agent `datadog.yaml` コンフィギュレーションファイルで、`https` リクエスト用と `http` リクエスト用にそれぞれプロキシサーバーを設定します。Agent は `https` を使用して Datadog にデータを送信しますが、インテグレーションは `http` を使用してメトリクスを収集することがあります。プロキシ転送されたいずれのリクエストでも、プロキシサーバーで SSL を有効化することができます。`datadog.yaml` ファイルのコンフィギュレーション例は以下の通りです。

<div class="alert alert-warning">
ログ収集が有効になっている場合は、特定のトランスポートが<a href="/agent/logs/log_transport?tab=https#enforce-a-specific-transport">強制</a>されていることを確認してください。
推奨セットアップは HTTPS を使用することです。その場合、メトリクスのプロキシに使用される <code>&ltHOST&gt;:&ltPORT&gt;</code> がログのプロキシに使用されます。
TCP トランスポートを使用している場合は、<a href="/agent/logs/proxy">ログの TCP プロキシ</a>を参照してください。
</div>

すべての `https` リクエストに対して HTTP プロキシを設定する例

```yaml
proxy:
    https: "http://<SSL_PROXY_SERVER_FOR_HTTPS>:<PORT>"
```

メモ: `https` リクエスト用に HTTP プロキシを設定する場合、Agent と Datadog の間の実際の通信は、TLS を使用してエンドツーエンドで暗号化され、プロキシが解読することはできません。暗号化されない通信は、Agent と Datadog の間の初回 TCP 接続を確立するために Agent とプロキシの間で行われる `HTTP CONNECT` リクエストだけです。そのため、`https` リクエストでプロキシを使用する場合に、Agent と Datadog の間の通信を暗号化するために HTTPS プロキシを使用する必要はありません。

`https` リクエストと `http` リクエストの両方に対して HTTPS プロキシを設定する例

```yaml
proxy:
    https: "https://<SSL_PROXY_SERVER_FOR_HTTPS>:<PORT>"
    http: "https://<SSL_PROXY_SERVER_FOR_HTTP>:<PORT>"
```

`https` リクエストと `http` リクエストの両方に対して、プロキシサーバーに接続するための `<USERNAME>` と `<PASSWORD>` を設定する例

```yaml
proxy:
    https: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>"
    http: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTP>:<PORT>"
```

`no_proxy` リストを使用して、プロキシをバイパスするホストを指定する例

```yaml
proxy:
    https: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>"
    http: "http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTP>:<PORT>"
    no_proxy:
      - host1
      - host2
```

**注**: HTTP リクエストを行うすべてのインテグレーションは、インテグレーションレベルでの指定がない場合、`datadog.yaml` コンフィギュレーションファイルに定義されたデフォルトのプロキシ設定に戻ります。これを回避したい場合は、各インスタンスの設定、もしくはインテグレーションの `init_config` フォールバックで `skip_proxy` を True に、または `use_agent_proxy` を False に設定してください。

##### NO_PROXY 許容値

デフォルトで、`no_proxy`/`NO_PROXY` は Agent HTTP(S) リクエストのエンドポイントに一致する必要があります（Agent のインテグレーションにより実行されたリクエストを除く）。Agent で `NO_PROXY` の値がインテグレーションに使用した同じルール（下記）と一致するようにするため、`no_proxy_nonexact_match` を有効にすることをおすすめします。

```yaml
no_proxy_nonexact_match: true
```

Agent のインテグレーション（および `no_proxy_nonexact_match` が有効の場合は Agent 全体）に以下のルールが適用されます。
* ドメイン名は同じ名称およびすべてのサブドメインに一致します。例:
  - `datadoghq.com` は `app.agent.datadoghq.com`、`www.datadoghq.com`、`datadoghq.com` に一致しますが、 `www.notdatadoghq.com` は**例外**となります。 
  - `datadoghq` は `frontend.datadoghq`、`backend.datadoghq` に一致しますが、`www.datadoghq.com` および `www.datadoghq.eu` は**例外**となります。 
* 先頭に "." がつくドメイン名はサブドメインのみに一致します。例:
  - `.datadoghq.com` は `app.agent.datadoghq.com`、 `www.datadoghq.com` に一致しますが、`datadoghq.com` は **例外**となります。
* CIDR 範囲は サブネット内の IP アドレスに一致します。例:
  - `192.168.1.0/24` は、`192.168.1.1` から `192.168.1.254` までの IP 範囲に一致します。
* 正確な IP アドレス。例:
  - `169.254.169.254`
* ホスト名。例:
  - `webserver1`

#### 環境変数

Agent v6.4 より、以下の環境変数を使用してプロキシ設定を行えるようになりました。

* `DD_PROXY_HTTPS`: `https` リクエスト用のプロキシサーバーを設定します。
* `DD_PROXY_HTTP`: `http` リクエスト用のプロキシサーバーを設定します。
* `DD_PROXY_NO_PROXY`: プロキシをバイパスするホストのリストを設定します。リストはスペース区切りです。

環境変数は、`datadog.yaml` ファイルの値より優先されます。 ``DD_PROXY_HTTP=""`` など、値が空の環境変数がある場合、Agent は優先度が低いオプションではなく空の値を使用します。

Unix ホストでは、`HTTPS_PROXY`、`HTTP_PROXY`、`NO_PROXY` などの標準環境変数を使用して、システム全体のプロキシが指定されることがあります。標準環境変数がある場合は、それらが使用されます。これらの変数は、Docker、ECS、Kubernetes などのオーケストレーションツールを含むインテグレーションからのすべてのリクエストに影響するため、注意が必要です。

Agent は、これらの値を以下の優先順で使用します。

1. 環境変数 `DD_PROXY_HTTPS`、`DD_PROXY_HTTP`、`DD_PROXY_NO_PROXY`
2. 環境変数 `HTTPS_PROXY`、`HTTP_PROXY`、`NO_PROXY`
3. `datadog.yaml` 内の値

{{% /tab %}}
{{% tab "Agent v5" %}}

<div class="alert alert-warning">
メトリクスのプロキシで使われる <code>&ltHOST&gt;:&ltPORT&gt;</code> はログのプロキシで使うことは**できません**。<a href="/agent/logs/proxy">ログ用プロキシ</a>ページを参照してください。
</div>

`datadog.conf` ファイルを編集してプロキシ情報を設定します。

```text
# インターネットに接続するためのプロキシが必要である場合は、ここで設定します
proxy_host: my-proxy.example.com
proxy_port: 3128
proxy_user: my_user
proxy_password: my_password
```

新しい設定を有効にするために、[Agent を再起動する][1]ことを忘れないでください。

[1]: /ja/agent/guide/agent-commands/
{{% /tab %}}
{{< /tabs >}}

## HAProxy

[HAProxy][1] は、TCP アプリケーションと HTTP アプリケーションのプロキシを提供する、無料で高速、そして信頼性の高いソリューションです。通常、HAProxy はロードバランサーとして着信リクエストをプールサーバーに分散するために使われますが、Agent トラフィックを外部接続がないホストから Datadog にプロキシするために使うこともできます。

これが最高のオプションになるのは、ネットワークにすぐに使えるウェブプロキシがなく、大量の Agent をプロキシしたい場合です。各プロキシは 1000 以上の Agent に対応できるため、場合によっては、1 つの HAProxy インスタンスだけでネットワーク内のローカル Agent トラフィックを十分処理できます。**注**: この数値は、m3.xl インスタンスのパフォーマンスに基づく控えめな見積もりである点にご注意ください。膨大なネットワーク関連の変数がプロキシの負荷に影響を与える場合があります。いつも通り、注意深く見守りながらデプロイしてください。詳しくは、[HAProxy のドキュメント][2]を参照してください。

`agent -> haproxy -> Datadog`

### HAProxy によるプロキシ転送

#### HAProxy コンフィギュレーション

Datadog への接続があるホストに HAProxy をインストールする必要があります。次の構成ファイルを使用します (まだ構成していない場合)。

```conf
# 基本構成
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# まともなデフォルト値
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# HAProxy の統計情報をポート 3833 で表示することを宣言しています
# このページを表示するために認証情報は必要ありません。また、
# セットアップが完了したら、このページをオフにすることができます。
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# DNS レコードを再読み込みするセクションです
#  <DNS_SERVER_IP> と <DNS_SECONDARY_SERVER_IP> を DNS Server IP アドレスに置き換えます
# HAProxy 1.8 以降の場合
resolvers my-dns
    nameserver dns1 <DNS_SERVER_IP>:53
    nameserver dns2 <DNS_SECONDARY_SERVER_IP>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s

# これは、Agent がメトリクスを送信するために接続する
# エンドポイントを宣言します (例えば、"dd_url “ の値です)。
frontend metrics-forwarder
    bind *:3834
    mode http
    option tcplog
    default_backend datadog-metrics

    use_backend datadog-api if { path_beg -i  /api/v1/validate }
    use_backend datadog-flare if { path_beg -i  /support/flare/ }

# これは、Agent がトレースを送信するために接続する
# エンドポイントを宣言します (例えば、APM 構成
# セクションの "endpoint "の値です)。
frontend traces-forwarder
    bind *:3835
    mode tcp
    option tcplog
    default_backend datadog-traces

# これは、Agent がプロファイルを送信するために接続する
# エンドポイントを宣言します (例えば、"apm_config.profiling_dd_url" の値です)。
frontend profiles-forwarder
    bind *:3836
    mode tcp
    option tcplog
    default_backend datadog-profiles

# これは、Agent がプロセスを送信するために接続する
# エンドポイントを宣言します (例えば、プロセス構成
# セクションの “url" の値です)。
frontend processes-forwarder
    bind *:3837
    mode tcp
    option tcplog
    default_backend datadog-processes

# これは、Agent がログを送信するために接続する
# エンドポイントを宣言します (例えば、"logs.config.logs_dd_url" の値です)
# use_http: true でログを送信する場合
frontend logs_http_frontend
    bind *:3838
    mode http
    option tcplog
    default_backend datadog-logs-http

# use_tcp: true でログを送信する場合
# frontend logs_frontend
#    bind *:10514
#    mode tcp
#    option tcplog
#    default_backend datadog-logs

# これは、Agent がデータベースモニタリングのメトリクスと
# アクティビティを送信するために接続するエンドポイントを宣言します (例えば、"database_monitoring.metrics.dd_url "と "database_monitoring.activity.dd_url" の値です)。
frontend database_monitoring_metrics_frontend
    bind *:3839
    mode http
    option tcplog
    default_backend datadog-database-monitoring-metrics

# これは、Agent がデータベースモニタリングサンプルを
# 送信するために接続するエンドポイントを宣言します (例えば、"database_monitoring.samples.dd_url" の値です)
frontend database_monitoring_samples_frontend
    bind *:3840
    mode http
    option tcplog
    default_backend datadog-database-monitoring-samples

# これは、Agent がネットワークデバイスモニタリングの
# メタデータを送信するために接続するエンドポイントを宣言します (例えば、"network_devices.metadata.dd_url" の値です)
frontend network_devices_metadata_frontend
    bind *:3841
    mode http
    option tcplog
    default_backend datadog-network-devices-metadata

#これは、Agent がネットワークデバイスの SNMP トラップデータを
# 送信するために接続するエンドポイントを宣言します (例えば、"network_devices.snmp_traps.forwarder.dd_url" の値です)
frontend network_devices_snmp_traps_frontend
bind *:3842
mode http
option tcplog
default_backend datadog-network-devices-snmp-traps

# これは、Agent が appsec イベントを
# 送信するために接続するエンドポイントを宣言します (非推奨)
frontend appsec-events-frontend
    bind *:3842
    mode tcp
    option tcplog
    default_backend datadog-appsec-events

# これは Datadog のサーバーです。事実上、上記で定義した
# フォワーダーフロントエンドに来る全ての TCP リクエストは、
# Datadog のパブリックエンドポイントにプロキシされます。
backend datadog-metrics
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none

backend datadog-api
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none

backend datadog-flare
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none

backend datadog-traces
    balance roundrobin
    mode tcp
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none

backend datadog-profiles
    balance roundrobin
    mode tcp
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 intake.profile.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership profile.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none

backend datadog-processes
    balance roundrobin
    mode tcp
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none

backend datadog-logs-http
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 agent-http-intake.logs.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none

backend datadog-database-monitoring-metrics
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 dbm-metrics-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none

backend datadog-database-monitoring-samples
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 dbquery-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none

backend datadog-network-devices-metadata
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 ndm-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none

backend datadog-network-devices-metadata
balance roundrobin
mode http
# 以下の構成は、HAProxy 1.8 以降の場合です
server-template mothership 5 ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
# 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
# server mothership ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none

backend datadog-network-devices-snmp-traps
balance roundrobin
mode http
# 以下の構成は、HAProxy 1.8 以降の場合です
server-template mothership 5 snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
# 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
# server mothership snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none

backend datadog-instrumentations-telemetry
balance roundrobin
mode tcp
# 以下の構成は、HAProxy 1.8 以降の場合です
server-template mothership 5 instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
# 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
# server mothership instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none

backend datadog-appsec-events # 非推奨
    balance roundrobin
    mode tcp
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 appsecevts-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership appsecevts-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify none
```


次のコマンドで証明書をダウンロードしてください:

```shell
sudo apt-get install ca-certificates # (Debian, Ubuntu)
yum install ca-certificates # (CentOS, Red Hat)
```

CentOS、Red Hat の場合、ファイルは `/etc/ssl/certs/ca-bundle.crt` にある場合があります。

HAProxy 1.8 以降では、DNS サービスの検出によりサーバーの変更を検出し、構成に自動的に適用することができます。
古いバージョンの HAProxy を使用している場合は、HAProxy を再読み込みまたは再起動する必要があります。もし {{< region-param key="dd_full_site" code="true" >}} が別の IP にフェイルオーバーした場合、HAProxy の DNS キャッシュをリフレッシュするために、`cron` **ジョブで 10 分毎に HAProxy をリロードさせることが推奨されています** (`service haproxy reload` など)。

#### Datadog Agent 構成

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

`haproxy.example.com` などの `dd_url` を HAProxy のアドレスに設定して、HAProxy をポイントするように各 Agent を編集します。この `dd_url` 設定は、`datadog.yaml` ファイルにあります。

`dd_url: http://haproxy.example.com:3834`

プロキシ経由でトレース、プロファイル、プロセス、ログを送信するには、`datadog.yaml` ファイルで次のように設定します。

```yaml
apm_config:
    apm_dd_url: http://haproxy.example.com:3835
    profiling_dd_url: http://haproxy.example.com:3836
    telemetry:
        dd_url: http://haproxy.example.com:3843

process_config:
    process_dd_url: http://haproxy.example.com:3837

logs_config:
    use_http: true
    logs_dd_url: haproxy.example.com:3838
    logs_no_ssl: true

database_monitoring:
    metrics:
        logs_dd_url: haproxy.example.com:3839
        logs_no_ssl: true
    activity:
        logs_dd_url: haproxy.example.com:3839
        logs_no_ssl: true
    samples:
        logs_dd_url: haproxy.example.com:3840
        logs_no_ssl: true

network_devices:
    metadata:
        logs_dd_url: haproxy.example.com:3841
        logs_no_ssl: true
    snmp_traps:
        forwarder:
            logs_dd_url: haproxy.example.com:3842
            logs_no_ssl: true
```

次に、`datadog.yaml` Agent コンフィギュレーションファイルを編集して、`skip_ssl_validation` を `true` に設定します。これは、SSL 証明書のホスト名 ({{< region-param key="dd_full_site" code="true" >}}) と HAProxy のホスト名との間の不一致を Agent が無視できるようにするために必要な設定です。

```yaml
skip_ssl_validation: true
```

最後に、[Agent を再起動][1]します。

すべてが正しく機能していることを確認するには、HAProxy 統計情報 (`http://haproxy.example.com:3833`) と[インフラストラクチャーの概要][2]を確認します。

[1]: /ja/agent/guide/agent-commands/#restart-the-agent
[2]: https://app.datadoghq.com/infrastructure
{{% /tab %}}
{{% tab "Agent v5" %}}

`haproxy.example.com` などの `dd_url` を HAProxy のアドレスに設定して、HAProxy をポイントするように各 Agent を編集します。この `dd_url` 設定は、`datadog.conf` ファイルにあります。

`dd_url: http://haproxy.example.com:3834`

プロキシ経由でトレースまたはプロセスを送信するには、`datadog.conf` ファイルで次のように設定します。

```conf
[trace.api]
endpoint = http://haproxy.example.com:3835

[process.api]
endpoint = http://haproxy.example.com:3837
```

Supervisor コンフィギュレーションを編集して SSL 証明書の検証を無効にします。これは、SSL 証明書 (`app.datadoghq.com`) のホスト名と HAProxy のホスト名の不一致を Python が訴えることを避けるために必要です。Supervisor コンフィギュレーションは次の場所にあります:

* Debian ベースのシステムの場合、`/etc/dd-agent/supervisor_ddagent.conf`
* Red Hat ベースのシステムの場合、`/etc/dd-agent/supervisor.conf`
* SmartOS の場合、`/opt/local/datadog/supervisord/supervisord.conf`
* FreeBSD の場合、`/usr/local/etc/datadog/supervisord/supervisord.conf`
* macOS の場合、`~/.datadog-agent/supervisord/supervisord.conf`

Supervisor ファイルが `<SUP_FILE>` にあると仮定すると、

```bash
sed -i 's/ddagent.py/ddagent.py --sslcheck=0/' <SUP_FILE>
```

Windows Agent の場合は、構成ファイル `datadog.conf` を編集してこのオプションを追加します:

```conf
skip_ssl_validation: yes
```

最後に、[Agent を再起動][1]します。

すべてが正しく機能していることを確認するには、HAProxy 統計情報 (`http://haproxy.example.com:3833`) と[インフラストラクチャーの概要][2]を確認します。

[1]: /ja/agent/guide/agent-commands/#restart-the-agent
[2]: https://app.datadoghq.com/infrastructure
{{% /tab %}}
{{< /tabs >}}

## NGINX

[NGINX][3] は、リバースプロキシ、ロードバランサー、メールプロキシ、HTTP キャッシュとしても使用できる Web サーバーです。NGINX を Datadog Agent のプロキシとして使用することも可能です。

`agent ---> nginx ---> Datadog`

### NGINX によるプロキシ転送

#### NGINX コンフィギュレーション

この例 `nginx.conf` を使用して、Agent のトラフィックを Datadog にプロキシ転送できます。このコンフィギュレーションにおける最後のサーバーブロックで TLS ラップを行うことで、プロキシと Datadog のログインテーク API エンドポイントとの間で内部的なプレーンテキストログを暗号化します。

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}
# Datadog Agent の HTTP プロキシ
http {
    server {
        listen 3834; #メトリクスのリッスン
        access_log off;

        location /api/v1/validate {
            proxy_pass https://api.{{< region-param key="dd_site" >}}:443/api/v1/validate;
        }
        location /support/flare/ {
            proxy_pass https://flare.{{< region-param key="dd_site" >}}:443/support/flare/;
        }
        location / {
            proxy_pass https://haproxy-app.agent.{{< region-param key="dd_site" >}}:443/;
        }
    }
}
# Datadog Agent の TCP プロキシ
stream {
    server {
        listen 3835; #トレースのリッスン
        proxy_ssl on;
        proxy_pass trace.agent.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3836; #プロファイルのリッスン
        proxy_ssl on;
        proxy_pass intake.profile.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3837; #プロセスのリッスン
        proxy_ssl on;
        proxy_pass process.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3838; #use_http: true でログのリッスン
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3839; #データベースモニタリングメトリクスのリッスン
        proxy_ssl on;
        proxy_pass dbm-metrics-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3840; #データベースモニタリングサンプルのリッスン
        proxy_ssl on;
        proxy_pass dbquery-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3841; #ネットワークデバイスメタデータのリッスン
        proxy_ssl on;
        proxy_pass ndm-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3842; #ネットワークデバイストラップのリッスン
        proxy_ssl on;
        proxy_pass snmp-traps-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3843; #インスツルメンテーションテレメトリーデータのリッスン
        proxy_ssl on;
        proxy_pass instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {    
        listen 3844; #appsec イベントのリッスン (非推奨)
        proxy_ssl on;
        proxy_pass appsecevts-intake.{{< region-param key="dd_site" >}}:443;
    }
}
```

#### Datadog Agent 構成

各 Agent のコンフィギュレーションファイルを編集し、`dd_url` に Nginx のアドレス、例えば `nginx.example.com` を設定し、Nginx を指すようにします。
この `dd_url` 設定は `datadog.yaml` ファイルに記述されています。

`dd_url: http://nginx.example.com:3834`

Datadog Agent v6/7.16 以降をログコレクターとして使用するには、`datadog.yaml` を更新して、ログインテークと直接接続を確立する代わりに、新しく作成されたプロキシを使用するように Agent に指示します。

```yaml
apm_config:
    apm_dd_url: http://nginx.example.com:3835
    profiling_dd_url: http://nginx.example.com:3836
    telemetry:
        dd_url: http://nginx.example.com:3843

process_config:
    process_dd_url: http://nginx.example.com:3837

logs_config:
    use_http: true
    logs_dd_url: nginx.example.com:3838
    logs_no_ssl: true

database_monitoring:
    metrics:
        logs_dd_url: nginx.example.com:3839
        logs_no_ssl: true
    activity:
        logs_dd_url: nginx.example.com:3839
        logs_no_ssl: true
    samples:
        logs_dd_url: nginx.example.com:3840
        logs_no_ssl: true

network_devices:
    metadata:
        logs_dd_url: nginx.example.com:3841
        logs_no_ssl: true
    snmp_traps:
        forwarder:
            logs_dd_url: nginx.example.com:3842
            logs_no_ssl: true

appsec_config (deprecated):
    appsec_dd_url: "<PROXY_SERVER_DOMAIN>:3842"

```

TCP 経由でログを送信する場合は、<a href="/agent/logs/proxy">ログの TCP プロキシ</a>を参照してください。


## Datadog Agent

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

**この機能は、Agent v5 でのみ使用できます**。

{{% /tab %}}
{{% tab "Agent v5" %}}

トラフィックを Datadog に転送するには、実際のプロキシ (Web プロキシまたは HAProxy) を使用することをお勧めしますが、これらのオプションを使用できない場合は、**Agent v5** のインスタンスをプロキシとして機能するように構成できます。

1. **datadog-agent を実行している** 1 つノードをプロキシとして指定します。
    この例では、プロキシ名が `proxy-node` であるとします。このノードは、`https://app.datadoghq.com` に到達できる**必要**があります。

2. `proxy-node` の SSL 接続を検証します。

    ```shell
    curl -v https://app.datadoghq.com/account/login 2>&1 | grep "200 OK"
    ```

3. `proxy-node` 上の非ローカルトラフィックを許可するために、`datadog.conf` の 
     `# non_local_traffic: no` の行を `non_local_traffic: yes` に変更します。

4. ポート 17123 経由で他のノードから `proxy-node` に到達できることを確認します。`proxy-node` で Agent を起動し、他のノードでも Agent を実行します。

    `curl -v http://proxy-node:17123/status 2>&1 | grep "200 OK"`

5. `proxy-node` に転送するように非プロキシノードを更新します。`datadog.conf` の

    `dd_url: https://app.datadoghq.com`
   の行を
    `dd_url: http://proxy-node:17123` のように変更します。

6. [インフラストラクチャーページ][1]で、すべてのノードがデータを Datadog に報告していることを確認します。


[1]: https://app.datadoghq.com/infrastructure#overview
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://haproxy.1wt.eu
[2]: http://www.haproxy.org/#perf
[3]: https://www.nginx.com