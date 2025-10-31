---
disable_toc: false
private: true
title: Agent 5 プロキシの構成
---

## 概要

このページでは、Agent 5 のプロキシ構成について説明します。Agent の最新バージョンについては、[Agent Proxy 構成][1]を参照してください。

ご使用のネットワーク構成がアウトバウンドトラフィックを制限している場合は、より許容度の高いアウトバウンドポリシーを持つ 1 つ以上のホストを経由して、すべての Agent トラフィックをプロキシ転送します。

インターネットに直接接続していないホストから、SSL/TLS 経由で Datadog にトラフィックを送信するための方法はいくつかあります。

1. すでにネットワークにデプロイされている Squid や Microsoft Web Proxy などの Web プロキシを使用する。
2. HAProxy を使用する (**16～20 以上の Agent** に対して同じプロキシを使用する場合)。
3. Agent をプロキシとして使用する (プロキシあたり最大 16 Agent)。**Agent をプロキシとして使用することは、Agent 5 のみでサポートされています**。

## FIPS コンプライアンス

Datadog Agent FIPS Proxy の設定については、[Datadog FIPS コンプライアンス][1]を参照してください。FIPS プロキシは US1-FED リージョンでのみ利用可能です。Datadog Agent FIPS Proxy は、通常のプロキシと併用することはできません。

## Web プロキシ

Squid に関する具体的な情報は、本ページの [Squid](#squid) のセクションを参照してください。

Agent は従来の Web プロキシをネイティブにサポートします。プロキシ経由でインターネットに接続する必要がある場合は、Agent コンフィギュレーションファイルを編集します。

<div class="alert alert-danger">
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

新しい設定を有効にするために、[Agent を再起動する][2]ことを忘れないでください。

### Squid

[Squid][3] は、HTTP、HTTPS、FTP などをサポートする Web 用転送プロキシです。Windows を含むほとんどのオペレーティングシステムで動作し、GNU GPL ライセンスの下でライセンスされています。Squid は、ネットワーク上で動作する Web プロキシがまだない場合、簡単な選択肢となります。

#### Squid によるプロキシ転送

##### Squid が Datadog にのみトラフィックを送信するように構成する

内部 Agent と Datadog の両方に接続可能なホストに Squid をインストールします。オペレーティングシステムのパッケージマネージャーを使用するか、[Squid のプロジェクトページ][3]から直接ソフトウェアをインストールします。

Squid を構成するには、コンフィギュレーションファイルを編集します。このファイルは通常、Linuxでは `/etc/squid/squid.conf`、Windows では `C:\squid\etc\squid.conf` にあります。

Squid がローカルトラフィックを受け入れ、必要な Datadog インテークに転送できるように、`squid.conf` コンフィギュレーションファイルを編集します。

```conf
http_port 0.0.0.0:3128

acl local src 127.0.0.1/32

acl Datadog dstdomain .{{< region-param key="dd_site" >}}

http_access allow Datadog
http_access allow local manager
```

##### Squid の起動

新しい構成が適用されるように、Squid を起動 (または再起動) します。

{{< tabs >}}
{{% tab "Linux" %}}

```bash
sudo systemctl start squid
```

Squid がすでに起動している場合は、代わりに以下のコマンドで Squid を再起動します。

```bash
sudo systemctl restart squid
```

{{% /tab %}}
{{% tab "Windows" %}}

Windows で Squid を構成する場合、最初に [Squid をシステムサービスとして構成する][1]必要があります。その後、Administrator コマンドプロンプトで以下を実行します。

```bash
net start squid
```

Squid がすでに起動している場合は、代わりに以下のコマンドで Squid を再起動します。

```bash
net stop squid
net start squid
```

[1]: https://wiki.squid-cache.org/KnowledgeBase/Windows
{{% /tab %}}
{{< /tabs >}}

##### Datadog Agent 構成

Agent のコンフィギュレーションファイル (`datadog.conf`) に以下を含めるように修正します。

```conf
proxy_host: 127.0.0.1
proxy_port: 3128
```

変更内容を保存したら、[Agent を再起動][2]します。

[インフラストラクチャーの概要][4]を確認し、Datadog が Agent からデータを受信できることを確認します。

## HAProxy

[HAProxy][5] は、TCP アプリケーションと HTTP アプリケーションのプロキシを提供する、無料で高速、そして信頼性の高いソリューションです。通常、HAProxy はロードバランサーとして着信リクエストをプールサーバーに分散するために使われますが、Agent トラフィックを外部接続がないホストから Datadog にプロキシするために使うこともできます。

`agent ---> haproxy ---> Datadog`

これは、ネットワーク内に容易に利用できる Web プロキシがなく、多数の Agent をプロキシしたい場合に、もう一つの良い選択肢です。場合によっては、1 つのプロキシが 1000 以上の Agent を収容できるため、ネットワーク内のローカル Agent のトラフィックを処理するには、1 つの HAProxy インスタンスで十分なことがあります。

**注**: この数字は、特に `m3.xl` インスタンスの性能に基づいた保守的な見積もりです。多くのネットワーク関連やホスト関連の変数が HAProxy のスループットに影響を与える可能性があるので、サービスを開始する前と後の両方でプロキシの配置に目を光らせておく必要があります。詳しい情報は [HAProxy ドキュメント][5]を参照してください。

HAProxy と Datadog 間の通信は、常に TLS で暗号化されています。Agent ホストと HAProxy ホスト間の通信は、プロキシと Agent が同じホスト上にあると想定されるため、デフォルトでは暗号化されません。しかし、HAproxy ホストと Agent ホストが同じ孤立したローカルネットワーク上に配置されていない場合、この通信を TLS 暗号化で保護することをお勧めします。
Agent と HAProxy 間のデータを暗号化するには、HAProxy ホスト用の Subject Alternative Name (SAN) 拡張機能を持つ x509 証明書を作成する必要があります。この証明書バンドル (*.pem) には、公開証明書と秘密鍵の両方が含まれている必要があります。詳しくは、こちらの [HAProxy のブログ記事][6]をご覧ください。


**注**: 次のコマンドで Datadog 証明書をダウンロードしてください:

```shell
sudo apt-get install ca-certificates # (Debian, Ubuntu)
yum install ca-certificates # (CentOS, Red Hat)
```

証明書のパスは、Debian と Ubuntu の場合は `/etc/ssl/certs/ca-certificates.crt`、CentOS と Red Hat の場合は `/etc/ssl/certs/ca-bundle.crt` になります。

### HAProxy によるプロキシ転送

#### HAProxy 構成

HAProxy は、Datadog に接続可能なホストにインストールする必要があります。まだ構成していない場合は、以下のコンフィギュレーションファイルのいずれかを使用することができます。構成は Datadog サービスとサイトに依存します。[Datadog サイト][7]に基づいた構成を見るには、右側の `DATADOG SITE` セレクタを使用します。

**注**: Agent と HAProxy が同じ孤立したローカルネットワークの一部でない場合、`HTTPS` コンフィギュレーションファイルを使用することが推奨されます。

##### HTTP

```conf
# 基本構成
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# 妥当なデフォルト値
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# HAProxy の統計情報をポート 3833 で表示することを定義します
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
# エンドポイントを定義します (例えば、"dd_url “ の値です)。
frontend metrics-forwarder
    bind *:3834
    mode http
    option tcplog
    default_backend datadog-metrics

    use_backend datadog-api if { path_beg -i  /api/v1/validate }
    use_backend datadog-flare if { path_beg -i  /support/flare/ }

# これは、Agent がトレースを送信するために接続する
# エンドポイントを定義します (例えば、APM 構成
# セクションの "endpoint "の値です)。
frontend traces-forwarder
    bind *:3835
    mode tcp
    option tcplog
    default_backend datadog-traces

# これは、Agent がプロファイルを送信するために接続する
# エンドポイントを定義します (例えば、"apm_config.profiling_dd_url" の値です)。
frontend profiles-forwarder
    bind *:3836
    mode tcp
    option tcplog
    default_backend datadog-profiles

# これは、Agent がプロセスを送信するために接続する
# エンドポイントを定義します (例えば、プロセス構成
# セクションの “url" の値です)。
frontend processes-forwarder
    bind *:3837
    mode tcp
    option tcplog
    default_backend datadog-processes

# これは、Agent がログを送信するために接続する
# エンドポイントを定義します (例えば、"logs.config.logs_dd_url" の値です)
# force_use_http: true でログを送信する場合
frontend logs_http_frontend
    bind *:3838
    mode http
    option tcplog
    default_backend datadog-logs-http

# force_use_tcp: true でログを送信する場合
# frontend logs_frontend
#    bind *:10514
#    mode tcp
#    option tcplog
#    default_backend datadog-logs

# これは、Agent がデータベースモニタリングのメトリクスと
# アクティビティを送信するために接続するエンドポイントを定義します (例えば、"database_monitoring.metrics.dd_url "と "database_monitoring.activity.dd_url" の値です)。
frontend database_monitoring_metrics_frontend
    bind *:3839
    mode http
    option tcplog
    default_backend datadog-database-monitoring-metrics

# これは、Agent がデータベースモニタリングサンプルを
# 送信するために接続するエンドポイントを定義します (例えば、"database_monitoring.samples.dd_url" の値です)
frontend database_monitoring_samples_frontend
    bind *:3840
    mode http
    option tcplog
    default_backend datadog-database-monitoring-samples

# これは、Agent がネットワークデバイスモニタリングの
# メタデータを送信するために接続するエンドポイントを定義します (例えば、"network_devices.metadata.dd_url" の値です)
frontend network_devices_metadata_frontend
    bind *:3841
    mode http
    option tcplog
    default_backend datadog-network-devices-metadata

#これは、Agent がネットワークデバイスの SNMP トラップデータを
# 送信するために接続するエンドポイントを定義します (例えば、"network_devices.snmp_traps.forwarder.dd_url" の値です)
frontend network_devices_snmp_traps_frontend
    bind *:3842
    mode http
    option tcplog
    default_backend datadog-network-devices-snmp-traps

# これは、Agent がインスツルメンテーションのテレメトリーデータを
# 送信するために接続するエンドポイントを定義します (例えば、"apm_config.telemetry.dd_url" の値)
frontend instrumentation_telemetry_data_frontend
    bind *:3843
    mode tcp
    option tcplog
    default_backend datadog-instrumentations-telemetry

# これは、Agent がネットワークデバイスモニタリングの NetFlow フローを
# 送信するために接続するエンドポイントを定義します (例えば、"network_devices.netflow.forwarder.dd_url" の値)。
frontend network_devices_netflow_frontend
    bind *:3845
    mode http
    option tcplog
    default_backend datadog-network-devices-netflow

# これは、Agent がリモート構成を受信するために接続する
# エンドポイントを定義します (例えば、"remote_configuration.rc_dd_url" の値)
frontend remote_configuration_frontend
    bind *:3846
    mode http
    option tcplog
    default_backend datadog-remote-configuration

# これは、Agent が Network Path データを送信するために接続する
# エンドポイントを定義します (例えば、"network_path.forwarder.dd_url" の値)
frontend network_path_frontend
    bind *:3847
    mode http
    option tcplog
    default_backend datadog-network-path

# これは Datadog のサーバーです。実質的に、上記で定義した
# フォワーダーフロントエンドに来るすべての TCP リクエストは、
# Datadog のパブリックエンドポイントにプロキシされます。
backend datadog-metrics
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 metrics.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership metrics.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-api
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-flare
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-traces
    balance roundrobin
    mode tcp
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-profiles
    balance roundrobin
    mode tcp
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 intake.profile.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership profile.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-processes
    balance roundrobin
    mode tcp
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-logs-http
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-database-monitoring-metrics
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 dbm-metrics-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-database-monitoring-samples
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 dbquery-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-metadata
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-metadata
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-instrumentations-telemetry
    balance roundrobin
    mode tcp
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-netflow
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-remote-configuration
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-path
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 netpath-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership netpath-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>
```

##### HTTPS

この構成では、Agent と HAProxy 間の通信に SSL/TLS の暗号化を追加します。変数 `<PATH_TO_PROXY_CERTIFICATE_PEM>` をプロキシ証明書バンドルへのパス (*.pem) に置き換えてください。

```conf
# 基本構成
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# 妥当なデフォルト値
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# HAProxy の統計情報をポート 3833 で表示することを定義します
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
# エンドポイントを定義します (例えば、"dd_url “ の値です)。
frontend metrics-forwarder
    bind *:3834 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-metrics

    use_backend datadog-api if { path_beg -i  /api/v1/validate }
    use_backend datadog-flare if { path_beg -i  /support/flare/ }

# これは、Agent がトレースを送信するために接続する
# エンドポイントを定義します (例えば、APM 構成
# セクションの "endpoint "の値です)。
frontend traces-forwarder
    bind *:3835 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-traces

# これは、Agent がプロファイルを送信するために接続する
# エンドポイントを定義します (例えば、"apm_config.profiling_dd_url" の値です)。
frontend profiles-forwarder
    bind *:3836 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-profiles

# これは、Agent がプロセスを送信するために接続する
# エンドポイントを定義します (例えば、プロセス構成
# セクションの “url" の値です)。
frontend processes-forwarder
    bind *:3837 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-processes

# これは、Agent がログを送信するために接続する
# エンドポイントを定義します (例えば、"logs.config.logs_dd_url" の値です)
# force_use_http: true でログを送信する場合
frontend logs_http_frontend
    bind *:3838 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-logs-http

# force_use_tcp: true でログを送信する場合
# frontend logs_frontend
#    bind *:10514 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
#    mode tcp
#    option tcplog
#    default_backend datadog-logs

# これは、Agent がデータベースモニタリングのメトリクスと
# アクティビティを送信するために接続するエンドポイントを定義します (例えば、"database_monitoring.metrics.dd_url "と "database_monitoring.activity.dd_url" の値です)。
frontend database_monitoring_metrics_frontend
    bind *:3839 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-database-monitoring-metrics

# これは、Agent がデータベースモニタリングサンプルを
# 送信するために接続するエンドポイントを定義します (例えば、"database_monitoring.samples.dd_url" の値です)
frontend database_monitoring_samples_frontend
    bind *:3840 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-database-monitoring-samples

# これは、Agent がネットワークデバイスモニタリングの
# メタデータを送信するために接続するエンドポイントを定義します (例えば、"network_devices.metadata.dd_url" の値です)
frontend network_devices_metadata_frontend
    bind *:3841 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-devices-metadata

#これは、Agent がネットワークデバイスの SNMP トラップデータを
# 送信するために接続するエンドポイントを定義します (例えば、"network_devices.snmp_traps.forwarder.dd_url" の値です)
frontend network_devices_snmp_traps_frontend
    bind *:3842 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-devices-snmp-traps


# これは、Agent がインスツルメンテーションのテレメトリーデータを
# 送信するために接続するエンドポイントを定義します (例えば、"apm_config.telemetry.dd_url" の値)
frontend instrumentation_telemetry_data_frontend
    bind *:3843 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-instrumentations-telemetry

# これは、Agent がネットワークデバイスモニタリングの NetFlow フローを
# 送信するために接続するエンドポイントを定義します (例えば、"network_devices.netflow.forwarder.dd_url" の値)。
frontend network_devices_netflow_frontend
    bind *:3845 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-devices-netflow

# これは、Agent がリモート構成を受信するために接続する
# エンドポイントを定義します (例えば、"remote_configuration.rc_dd_url" の値)
frontend remote_configuration_frontend
    bind *:3846 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-remote-configuration

# これは、Agent が Network Path データを送信するために接続する
# エンドポイントを定義します (例えば、"network_path.forwarder.dd_url" の値)
frontend network_path_frontend
    bind *:3847 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-path

# これは Datadog のサーバーです。実質的に、上記で定義した
# フォワーダーフロントエンドに来るすべての TCP リクエストは、
# Datadog のパブリックエンドポイントにプロキシされます。
backend datadog-metrics
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 metrics.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership metrics.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-api
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-flare
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-traces
    balance roundrobin
    mode tcp
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-profiles
    balance roundrobin
    mode tcp
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 intake.profile.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership profile.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-processes
    balance roundrobin
    mode tcp
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-logs-http
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-database-monitoring-metrics
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 dbm-metrics-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-database-monitoring-samples
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 dbquery-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-network-devices-metadata
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-network-devices-snmp-traps
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-instrumentations-telemetry
    balance roundrobin
    mode tcp
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-network-devices-netflow
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-remote-configuration
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-network-path
    balance roundrobin
    mode http
    # 以下の構成は、HAProxy 1.8 以降の場合です
    server-template mothership 5 netpath-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # 古いバージョンの HAProxy では、以下の構成のコメント解除を行います
    # server mothership netpath-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>
```

**注**: プロキシホストで証明書を取得できない場合、`verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>` の代わりに `verify none` を使用できますが、その場合 HAProxy は Datadog のインテーク証明書を確認できないので注意が必要です。

HAProxy 1.8 以降では、DNS サービスの検出によりサーバーの変更を検出し、構成に自動的に適用することができます。
古いバージョンの HAProxy を使用している場合は、HAProxy を再読み込みまたは再起動する必要があります。もし {{< region-param key="dd_full_site" code="true" >}} が別の IP にフェイルオーバーした場合、HAProxy の DNS キャッシュをリフレッシュするために、`cron` **ジョブで 10 分毎に HAProxy をリロードさせることが推奨されています** (`service haproxy reload` など)。

#### Datadog Agent 構成

Agent と HAProxy 間で暗号化を使用する場合、Agent がプロキシ証明書にアクセスできない、証明書を検証できない、または検証が必要ない場合、`datadog.yaml` Agent コンフィギュレーションファイルを編集して `skip_ssl_validation` を `true` に設定することができます。
このオプションを `true` に設定すると、Agent は証明書の検証ステップをスキップし、プロキシの身元を検証しませんが、通信は SSL/TLS で暗号化されます。

```yaml
skip_ssl_validation: true
```

最後に、[Agent を再起動][2]します。

すべてが正しく機能していることを確認するには、HAProxy 統計情報 (`http://haproxy.example.com:3833`) と[インフラストラクチャーの概要][4]を確認します。

`haproxy.example.com` などの `dd_url` を HAProxy のアドレスに設定して、HAProxy をポイントするように各 Agent を編集します。この `dd_url` 設定は、`datadog.conf` ファイルにあります。

`dd_url: http://haproxy.example.com:3834`

プロキシ経由でトレースまたはプロセスを送信するには、`datadog.conf` ファイルで次のように設定します。

```conf
[trace.api]
endpoint = http://haproxy.example.com:3835

[process.api]
endpoint = http://haproxy.example.com:3837
```

Supervisor 構成を編集して SSL 証明書の検証を無効にします。これは、SSL 証明書 (`app.datadoghq.com`) のホスト名と HAProxy のホスト名の不一致を Python が訴えることを避けるために必要です。Supervisor 構成は次の場所にあります。

* Debian ベースのシステムの場合、`/etc/dd-agent/supervisor_ddagent.conf`
* Red Hat ベースのシステムの場合、`/etc/dd-agent/supervisor.conf`
* SmartOS の場合、`/opt/local/datadog/supervisord/supervisord.conf`
* FreeBSD の場合、`/usr/local/etc/datadog/supervisord/supervisord.conf`
* macOS の場合、`~/.datadog-agent/supervisord/supervisord.conf`

Supervisor ファイルが `<SUP_FILE>` にあると仮定すると、

```bash
sed -i 's/ddagent.py/ddagent.py --sslcheck=0/' <SUP_FILE>
```

Windows Agent の場合は、コンフィギュレーションファイル `datadog.conf` を編集してこのオプションを追加します。

```conf
skip_ssl_validation: yes
```

最後に、[Agent を再起動][2]します。

すべてが正しく機能していることを確認するには、HAProxy 統計情報 (`http://haproxy.example.com:3833`) と[インフラストラクチャーの概要][4]を確認します。

## NGINX

[NGINX][8] は、リバースプロキシ、ロードバランサー、メールプロキシ、HTTP キャッシュとしても使用できる Web サーバーです。NGINX を Datadog Agent のプロキシとして使用することも可能です。

`agent ---> nginx ---> Datadog`

NGINX と Datadog 間の通信は、常に TLS で暗号化されています。Agent ホストと NGINX ホスト間の通信は、プロキシと Agent が同じホスト上にあると想定されるため、デフォルトでは暗号化されません。しかし、このホストたちが同じ孤立したローカルネットワーク上に配置されていない場合、この通信を TLS 暗号化で保護することをお勧めします。
Agent と NGINX 間のデータを暗号化するには、NGINX ホストの Subject Alternative Name (SAN) 拡張機能を持つ x509 証明書を作成する必要があります。

**注**: 次のコマンドで Datadog 証明書をダウンロードしてください:

```shell
sudo apt-get install ca-certificates # (Debian, Ubuntu)
yum install ca-certificates # (CentOS, Red Hat)
```

証明書のパスは、Debian と Ubuntu の場合は `/etc/ssl/certs/ca-certificates.crt`、CentOS と Red Hat の場合は `/etc/ssl/certs/ca-bundle.crt` になります。

### NGINX によるプロキシ転送

#### NGINX コンフィギュレーション

NGINX は、Datadog に接続可能なホストにインストールする必要があります。まだ構成していない場合は、以下のコンフィギュレーションファイルのいずれかを使用することができます。構成は Datadog サービスとサイトに依存します。[Datadog サイト][7]に基づいた構成を見るには、右側の `DATADOG SITE` セレクタを使用します。

**注**: Agent と NGINX が同じ孤立したローカルネットワークの一部でない場合、`HTTPS` コンフィギュレーションファイルを使用することが推奨されます。

##### HTTP

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

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    server {
        listen 3834; #メトリクス用の待ち受け
        access_log off;

        location /api/v1/validate {
            proxy_ssl_verify on;
            proxy_pass https://api.{{< region-param key="dd_site" >}}:443/api/v1/validate;
        }
        location /support/flare/ {
            proxy_ssl_verify on;
            proxy_pass https://flare.{{< region-param key="dd_site" >}}:443/support/flare/;
        }
        location / {
            proxy_ssl_verify on;
            proxy_pass https://metrics.agent.{{< region-param key="dd_site" >}}:443/;
        }
    }
}
# Datadog Agent の TCP プロキシ
stream {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    server {
        listen 3835; #トレース用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass trace.agent.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3836; #プロファイル用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass intake.profile.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3837; #プロセス用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass process.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3838; #force_use_http: true でログ用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3839; #データベースモニタリングメトリクス用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbm-metrics-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3840; #データベースモニタリングサンプル用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbquery-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3841; #ネットワークデバイスメタデータ用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndm-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3842; #ネットワークデバイストラップ用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass snmp-traps-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3843; #インスツルメンテーションテレメトリーデータ用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3845; # ネットワークデバイスネットフロー用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndmflow-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3846; #リモート構成リクエスト用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass config.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3847; #ネットワークパス用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass netpath-intake.{{< region-param key="dd_site" >}}:443;
    }
}
```

##### HTTPS

この構成では、Agent と NGINX 間の通信に SSL/TLS の暗号化を追加します。`<PATH_TO_PROXY_CERTIFICATE>` をプロキシ公開証明書へのパスに、`<PATH_TO_PROXY_CERTIFICATE_KEY>` を秘密鍵へのパスに置き換えてください。

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

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    ssl_certificate     <PATH_TO_PROXY_CERTIFICATE>;
    ssl_certificate_key <PATH_TO_PROXY_CERTIFICATE_KEY>;

    server {
        listen 3834 ssl; #メトリクス用の待ち受け
        access_log off;

        location /api/v1/validate {
            proxy_ssl_verify on;
            proxy_pass https://api.{{< region-param key="dd_site" >}}:443/api/v1/validate;
        }
        location /support/flare/ {
            proxy_ssl_verify on;
            proxy_pass https://flare.{{< region-param key="dd_site" >}}:443/support/flare/;
        }
        location / {
            proxy_ssl_verify on;
            proxy_pass https://metrics.agent.{{< region-param key="dd_site" >}}:443/;
        }
    }
}
# Datadog Agent の TCP プロキシ
stream {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    ssl_certificate     <PATH_TO_PROXY_CERTIFICATE>;
    ssl_certificate_key <PATH_TO_PROXY_CERTIFICATE_KEY>;

    server {
        listen 3835 ssl; #トレース用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass trace.agent.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3836 ssl; #プロファイル用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass intake.profile.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3837 ssl; #プロセス用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass process.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3838 ssl; #force_use_http: true でログ用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3839 ssl; #データベースモニタリングメトリクス用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbm-metrics-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3840 ssl; #データベースモニタリングサンプル用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbquery-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3841 ssl; #ネットワークデバイスメタデータ用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndm-intake.{{< region-param key="dd_site" >}}:443;
    } 
    server {
        listen 3842 ssl; #ネットワークデバイストラップ用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass snmp-traps-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3843 ssl; #インスツルメンテーションテレメトリーデータ用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3845 ssl; # ネットワークデバイスネットフロー用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndmflow-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3846 ssl; #リモート構成リクエスト用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass config.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3847 ssl; #ネットワークパス用の待ち受け
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass netpath-intake.{{< region-param key="dd_site" >}}:443;
    }
}
```

**注**: プロキシホストで証明書を取得できない場合、`proxy_ssl_verify on` を削除できますが、その場合 NGINX は Datadog のインテーク証明書を確認できないので注意が必要です。

#### Datadog Agent 構成

各 Agent のコンフィギュレーションファイルを編集し、`dd_url` に Nginx のアドレス、例えば `nginx.example.com` を設定し、Nginx を指すようにします。
この `dd_url` 設定は `datadog.yaml` ファイルに記述されています。

`dd_url: "<SCHEME>://nginx.example.com:3834"`

`<SCHEME>` を、HAProxy の HTTPS 構成を選択していた場合は `https` に、HTTPS を選択していなかった場合は `http` に置き換えてください。

プロキシ経由でトレース、プロファイル、プロセス、ログを送信するには、`datadog.yaml` ファイルで次のように設定します。

```yaml
apm_config:
    apm_dd_url: <SCHEME>://nginx.example.com:3835
    profiling_dd_url: <SCHEME>://nginx.example.com:3836/api/v2/profile
    telemetry:
        dd_url: <SCHEME>://nginx.example.com:3843

process_config:
    process_dd_url: <SCHEME>://nginx.example.com:3837

logs_config:
    force_use_http: true
    logs_dd_url: nginx.example.com:3838
    # Agent と NGINX の間で暗号化を使用する場合は、以下の行をコメント化します
    logs_no_ssl: true

database_monitoring:
    metrics:
        logs_dd_url: nginx.example.com:3839
        # Agent と NGINX の間で暗号化を使用する場合は、以下の行をコメント化します
        logs_no_ssl: true
    activity:
        logs_dd_url: nginx.example.com:3839
        # Agent と NGINX の間で暗号化を使用する場合は、以下の行をコメント化します
        logs_no_ssl: true
    samples:
        logs_dd_url: nginx.example.com:3840
        # Agent と NGINX の間で暗号化を使用する場合は、以下の行をコメント化します
        logs_no_ssl: true

network_devices:
    metadata:
        logs_dd_url: nginx.example.com:3841
        # Agent と NGINX の間で暗号化を使用する場合は、以下の行をコメント化します
        logs_no_ssl: true
    snmp_traps:
        forwarder:
            logs_dd_url: nginx.example.com:3842
            # Agent と NGINX の間で暗号化を使用する場合は、以下の行をコメント化します
            logs_no_ssl: true
    netflow:
       forwarder:
           logs_dd_url: nginx.example.com:3845
           # Agent と NGINX の間で暗号化を使用する場合は、以下の行をコメント化します
           logs_no_ssl: true

remote_configuration:
    rc_dd_url: nginx.example.com:3846
    # Agent と NGINX の間で暗号化を使用する場合は、以下の行をコメント化します
    no_tls: true
```


Agent と NGINX 間で暗号化を使用する場合、Agent がプロキシ証明書にアクセスできない、証明書を検証できない、または検証が必要ない場合、`datadog.yaml` Agent コンフィギュレーションファイルを編集して `skip_ssl_validation` を `true` に設定することができます。
このオプションを `true` に設定すると、Agent は証明書の検証ステップをスキップし、プロキシの身元を検証しませんが、通信は SSL/TLS で暗号化されます。

```yaml
skip_ssl_validation: true
```

TCP 経由でログを送信する場合は、[ログの TCP プロキシ][9]を参照してください。

## Datadog Agent

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

[1]: /ja/agent/configuration/fips-compliance
[2]: /ja/agent/guide/agent-5-commands
[3]: http://www.squid-cache.org/
[4]: https://app.datadoghq.com/infrastructure
[5]: http://haproxy.1wt.eu
[6]: https://www.haproxy.com/blog/haproxy-ssl-termination/
[7]: /ja/getting_started/site/
[8]: https://www.nginx.com
[9]: /ja/agent/logs/proxy