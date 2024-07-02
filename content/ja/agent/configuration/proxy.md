---
title: Agent Proxy Configuration
aliases:
- /account_management/faq/can-i-use-a-proxy-to-connect-my-servers-to-datadog/
- /agent/proxy
further_reading:
- link: /logs/
  tag: Documentation
  text: Collect your logs
- link: /infrastructure/process/
  tag: Documentation
  text: Collect your processes
- link: /tracing/
  tag: Documentation
  text: Collect your traces and profiles
- link: /agent/configuration/agent-fips-proxy
  tag: Documentation
  text: Datadog FIPS Compliance
algolia:
  tags: [agent proxy]
---

## 概要

ご使用のネットワーク構成がアウトバウンドトラフィックを制限している場合は、より許容度の高いアウトバウンドポリシーを持つ 1 つ以上のホストを経由して、すべての Agent トラフィックをプロキシ転送します。

インターネットに直接接続していないホストから、SSL/TLS 経由で Datadog にトラフィックを送信するための方法はいくつかあります。

1. Squid、Microsoft Web Proxy など、既にネットワークにデプロイされている Web プロキシを使用する
2. HAProxy を使用する (**16～20 以上の Agent** に対して同じプロキシを使用する場合)
3. Agent をプロキシとして使用する (プロキシあたり**最大 16 Agent**、**Agent v5 のみ**)

## FIPS コンプライアンス

For information on setting up the Datadog Agent FIPS Proxy with the Datadog Agent, see [Datadog FIPS Compliance][1]. The FIPS proxy is only available in the US1-FED region. The Datadog Agent FIPS Proxy cannot be used together with a regular proxy.

## Web プロキシ

Squid に関する具体的な情報は、本ページの [Squid](#squid) のセクションを参照してください。

Agent は従来の Web プロキシをネイティブにサポートします。プロキシ経由でインターネットに接続する必要がある場合は、Agent コンフィギュレーションファイルを編集します。

**Agent v6 & v7**

Agent `datadog.yaml` コンフィギュレーションファイルで、`https` リクエスト用と `http` リクエスト用にそれぞれプロキシサーバーを設定します。Agent は `https` を使用して Datadog にデータを送信しますが、インテグレーションは `http` を使用してメトリクスを収集することがあります。プロキシ転送されたいずれのリクエストでも、プロキシサーバーで SSL を有効化することができます。`datadog.yaml` ファイルの構成例は以下の通りです。

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

デフォルトで、`no_proxy`/`NO_PROXY` は Agent HTTP(S) リクエストのエンドポイントに一致する必要があります (Agent のインテグレーションにより実行されたリクエストを除く)。Agent で `NO_PROXY` の値がインテグレーションに使用した同じルール (下記) と一致するようにするため、`no_proxy_nonexact_match` を有効にすることをおすすめします。

```yaml
no_proxy_nonexact_match: true
```

Agent のインテグレーション (および `no_proxy_nonexact_match` が有効の場合は Agent 全体) に以下のルールが適用されます。
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

**Agent v5**

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

Do not forget to [restart the Agent][2] for the new settings to take effect.

### Squid

[Squid][3] is a forward proxy for the web supporting HTTP, HTTPS, FTP, and more. It runs on most available operating systems, including Windows, and is licensed under the GNU GPL license. Squid is a straightforward option if you do not already have a running web proxy in your network.

#### Squid によるプロキシ転送

##### Squid が Datadog にのみトラフィックを送信するように構成する

Install Squid on a host that has connectivity to both your internal Agents and Datadog. Use your operating system's package manager, or install the software directly from [Squid's project page][3].

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

**Agent v6 & v7**

Agent のコンフィギュレーションファイル (`datadog.yaml`) に以下を含めるように修正します。

```yaml
proxy:
  http: http://127.0.0.1:3128
  https: http://127.0.0.1:3128
```

After saving these changes, [restart the Agent][2].

Verify that Datadog is able to receive the data from your Agent(s) by checking your [Infrastructure Overview][4].

**Agent v5**

Agent のコンフィギュレーションファイル (`datadog.conf`) に以下を含めるように修正します。

```conf
proxy_host: 127.0.0.1
proxy_port: 3128
```

After saving these changes, [restart the Agent][2].

Verify that Datadog is able to receive the data from your Agent(s) by checking your [Infrastructure Overview][4].

## HAProxy

[HAProxy][5] は、TCP アプリケーションと HTTP アプリケーションのプロキシを提供する、無料で高速、そして信頼性の高いソリューションです。通常、HAProxy はロードバランサーとして着信リクエストをプールサーバーに分散するために使われますが、Agent トラフィックを外部接続がないホストから Datadog にプロキシするために使うこともできます。

`agent ---> haproxy ---> Datadog`

これは、ネットワーク内に容易に利用できる Web プロキシがなく、多数の Agent をプロキシしたい場合に、もう一つの良い選択肢です。場合によっては、1 つのプロキシが 1000 以上の Agent を収容できるため、ネットワーク内のローカル Agent のトラフィックを処理するには、1 つの HAProxy インスタンスで十分なことがあります。

**Note**: This figure is a conservative estimate based on the performance of `m3.xl` instances specifically. Numerous network-related and host-related variables can influence throughput of HAProxy, so you should keep an eye on your proxy deployment both before and after putting it into service. See the [HAProxy documentation][5] for additional information.

The communication between HAProxy and Datadog is always encrypted with TLS. The communication between the Agent host and the HAProxy host is not encrypted by default, because the proxy and the Agent are assumed to be on the same host. However, it is recommended that you secure this communication with TLS encryption if the HAproxy host and Agent host are not located on the same isolated local network.
To encrypt data between the Agent and HAProxy, you need to create an x509 certificate with the Subject Alternative Name (SAN) extension for the HAProxy host. This certificate bundle (*.pem) should contain both the public certificate and private key. See this [HAProxy blog post][6] for more information.


**注**: 次のコマンドで Datadog 証明書をダウンロードしてください:

```shell
sudo apt-get install ca-certificates # (Debian, Ubuntu)
yum install ca-certificates # (CentOS, Red Hat)
```

証明書のパスは、Debian と Ubuntu の場合は `/etc/ssl/certs/ca-certificates.crt`、CentOS と Red Hat の場合は `/etc/ssl/certs/ca-bundle.crt` になります。

### HAProxy によるプロキシ転送

#### HAProxy 構成

HAProxy should be installed on a host that has connectivity to Datadog. You can use one of the following configuration files if you do not already have it configured. The configuration is dependent on the Datadog service and site. To see configurations based on your [Datadog site][7], use the `DATADOG SITE` selector on the right.

**注**: Agent と HAProxy が同じ孤立したローカルネットワークの一部でない場合、`HTTPS` コンフィギュレーションファイルを使用することが推奨されます。

##### HTTP

```conf
# Basic configuration
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# Some sane defaults
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# This declares a view into HAProxy statistics, on port 3833
# You do not need credentials to view this page and you can
# turn it off once you are done with setup.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# This section is to reload DNS Records
# Replace <DNS_SERVER_IP> and <DNS_SECONDARY_SERVER_IP> with your DNS Server IP addresses.
# For HAProxy 1.8 and newer
resolvers my-dns
    nameserver dns1 <DNS_SERVER_IP>:53
    nameserver dns2 <DNS_SECONDARY_SERVER_IP>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s

# This declares the endpoint where your Agents connects for
# sending metrics (for example, the value of "dd_url").
frontend metrics-forwarder
    bind *:3834
    mode http
    option tcplog
    default_backend datadog-metrics

    use_backend datadog-api if { path_beg -i  /api/v1/validate }
    use_backend datadog-flare if { path_beg -i  /support/flare/ }

# This declares the endpoint where your Agents connects for
# sending traces (for example, the value of "endpoint" in the APM
# configuration section).
frontend traces-forwarder
    bind *:3835
    mode tcp
    option tcplog
    default_backend datadog-traces

# This declares the endpoint where your Agents connects for
# sending profiles (for example, the value of "apm_config.profiling_dd_url").
frontend profiles-forwarder
    bind *:3836
    mode tcp
    option tcplog
    default_backend datadog-profiles

# This declares the endpoint where your agents connects for
# sending processes (for example, the value of "url" in the process
# configuration section).
frontend processes-forwarder
    bind *:3837
    mode tcp
    option tcplog
    default_backend datadog-processes

# This declares the endpoint where your Agents connects for
# sending Logs (e.g the value of "logs.config.logs_dd_url")
# If sending logs with force_use_http: true
frontend logs_http_frontend
    bind *:3838
    mode http
    option tcplog
    default_backend datadog-logs-http

# If sending logs with force_use_tcp: true
# frontend logs_frontend
#    bind *:10514
#    mode tcp
#    option tcplog
#    default_backend datadog-logs

# This declares the endpoint where your Agents connects for
# sending database monitoring metrics and activity (e.g the value of "database_monitoring.metrics.dd_url" and "database_monitoring.activity.dd_url")
frontend database_monitoring_metrics_frontend
    bind *:3839
    mode http
    option tcplog
    default_backend datadog-database-monitoring-metrics

# This declares the endpoint where your Agents connects for
# sending database monitoring samples (e.g the value of "database_monitoring.samples.dd_url")
frontend database_monitoring_samples_frontend
    bind *:3840
    mode http
    option tcplog
    default_backend datadog-database-monitoring-samples

# This declares the endpoint where your Agents connects for
# sending Network Devices Monitoring metadata (e.g the value of "network_devices.metadata.dd_url")
frontend network_devices_metadata_frontend
    bind *:3841
    mode http
    option tcplog
    default_backend datadog-network-devices-metadata

# This declares the endpoint where your Agents connects for
# sending Network Devices SNMP Traps data (e.g the value of "network_devices.snmp_traps.forwarder.dd_url")
frontend network_devices_snmp_traps_frontend
    bind *:3842
    mode http
    option tcplog
    default_backend datadog-network-devices-snmp-traps

# This declares the endpoint where your Agents connect for
# sending Instrumentation Telemetry data (e.g. the value of "apm_config.telemetry.dd_url")
frontend instrumentation_telemetry_data_frontend
    bind *:3843
    mode tcp
    option tcplog
    default_backend datadog-instrumentations-telemetry

# This declares the endpoint where your Agents connects for
# sending Network Devices Monitoring NetFlow flows (for example, the value of "network_devices.netflow.dd_url")
frontend network_devices_netflow_frontend
    bind *:3845
    mode http
    option tcplog
    default_backend datadog-network-devices-netflow

# This declares the endpoint where your Agents connects for
# receiving Remote Configurations (for example, the value of "remote_configuration.rc_dd_url")
frontend remote_configuration_frontend
    bind *:3846
    mode http
    option tcplog
    default_backend datadog-remote-configuration

# This is the Datadog server. In effect, any TCP request coming
# to the forwarder frontends defined above are proxied to
# Datadog's public endpoints.
backend datadog-metrics
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-api
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-flare
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-traces
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-profiles
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 intake.profile.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership profile.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-processes
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-logs-http
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-database-monitoring-metrics
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 dbm-metrics-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-database-monitoring-samples
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 dbquery-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-metadata
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-snmp-traps
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-instrumentations-telemetry
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-network-devices-netflow
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>

backend datadog-remote-configuration
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_CERTIFICATES>
```

##### HTTPS

この構成では、Agent と HAProxy 間の通信に SSL/TLS の暗号化を追加します。変数 `<PATH_TO_PROXY_CERTIFICATE_PEM>` をプロキシ証明書バンドルへのパス (*.pem) に置き換えてください。

```conf
# Basic configuration
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# Some sane defaults
defaults
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# This declares a view into HAProxy statistics, on port 3833
# You do not need credentials to view this page and you can
# turn it off once you are done with setup.
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# This section is to reload DNS Records
# Replace <DNS_SERVER_IP> and <DNS_SECONDARY_SERVER_IP> with your DNS Server IP addresses.
# For HAProxy 1.8 and newer
resolvers my-dns
    nameserver dns1 <DNS_SERVER_IP>:53
    nameserver dns2 <DNS_SECONDARY_SERVER_IP>:53
    resolve_retries 3
    timeout resolve 2s
    timeout retry 1s
    accepted_payload_size 8192
    hold valid 10s
    hold obsolete 60s

# This declares the endpoint where your Agents connect for
# sending metrics (for example, the value of "dd_url").
frontend metrics-forwarder
    bind *:3834 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-metrics

    use_backend datadog-api if { path_beg -i  /api/v1/validate }
    use_backend datadog-flare if { path_beg -i  /support/flare/ }

# This declares the endpoint where your Agents connect for
# sending traces (for example, the value of "endpoint" in the APM
# configuration section).
frontend traces-forwarder
    bind *:3835 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-traces

# This declares the endpoint where your Agents connect for
# sending profiles (for example, the value of "apm_config.profiling_dd_url").
frontend profiles-forwarder
    bind *:3836 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-profiles

# This declares the endpoint where your Agents connect for
# sending processes (for example, the value of "url" in the process
# configuration section).
frontend processes-forwarder
    bind *:3837 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-processes

# This declares the endpoint where your Agents connect for
# sending Logs (e.g the value of "logs.config.logs_dd_url")
# If sending logs with force_use_http: true
frontend logs_http_frontend
    bind *:3838 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-logs-http

# If sending logs with force_use_tcp: true
# frontend logs_frontend
#    bind *:10514 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
#    mode tcp
#    option tcplog
#    default_backend datadog-logs

# This declares the endpoint where your Agents connect for
# sending database monitoring metrics and activity (e.g the value of "database_monitoring.metrics.dd_url" and "database_monitoring.activity.dd_url")
frontend database_monitoring_metrics_frontend
    bind *:3839 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-database-monitoring-metrics

# This declares the endpoint where your Agents connect for
# sending database monitoring samples (e.g the value of "database_monitoring.samples.dd_url")
frontend database_monitoring_samples_frontend
    bind *:3840 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-database-monitoring-samples

# This declares the endpoint where your Agents connect for
# sending Network Devices Monitoring metadata (e.g the value of "network_devices.metadata.dd_url")
frontend network_devices_metadata_frontend
    bind *:3841 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-devices-metadata

# This declares the endpoint where your Agents connect for
# sending Network Devices SNMP Traps data (e.g the value of "network_devices.snmp_traps.forwarder.dd_url")
frontend network_devices_snmp_traps_frontend
    bind *:3842 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-devices-snmp-traps


# This declares the endpoint where your Agents connect for
# sending Instrumentation Telemetry data (e.g. the value of "apm_config.telemetry.dd_url")
frontend instrumentation_telemetry_data_frontend
    bind *:3843 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode tcp
    option tcplog
    default_backend datadog-instrumentations-telemetry

# This declares the endpoint where your Agents connect for
# sending Network Devices Monitoring NetFlow flows (for example, the value of "network_devices.netflow.dd_url")
frontend network_devices_netflow_frontend
    bind *:3845 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-network-devices-netflow

# This declares the endpoint where your Agents connects for
# receiving Remote Configurations (for example, the value of "remote_configuration.rc_dd_url")
frontend remote_configuration_frontend
    bind *:3846 ssl crt <PATH_TO_PROXY_CERTIFICATE_PEM>
    mode http
    option tcplog
    default_backend datadog-remote-configuration

# This is the Datadog server. In effect any TCP request coming
# to the forwarder frontends defined above are proxied to
# Datadog's public endpoints.
backend datadog-metrics
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership haproxy-app.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-api
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership api.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-flare
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership flare.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-traces
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership trace.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-profiles
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 intake.profile.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership profile.agent.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-processes
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership process.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-logs-http
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 agent-http-intake.logs.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-database-monitoring-metrics
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 dbm-metrics-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-database-monitoring-samples
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 dbquery-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server datadog agent-http-intake.logs.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-network-devices-metadata
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 ndm-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership ndm-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-network-devices-snmp-traps
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership snmp-traps-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-instrumentations-telemetry
    balance roundrobin
    mode tcp
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-network-devices-netflow
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 ndmflow-intake.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership ndmflow-intake.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

backend datadog-remote-configuration
    balance roundrobin
    mode http
    # The following configuration is for HAProxy 1.8 and newer
    server-template mothership 5 config.{{< region-param key="dd_site" >}}:443  check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT> check resolvers my-dns init-addr none resolve-prefer ipv4
    # Uncomment the following configuration for older HAProxy versions
    # server mothership config.{{< region-param key="dd_site" >}}:443 check port 443 ssl verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>

```

**Note**: You can use `verify none` instead of `verify required ca-file <PATH_TO_DATADOG_CERTIFICATES_CRT>` if you are unable to get the certificates on the proxy host, but be aware that HAProxy will not be able to verify Datadog's intake certificate in that case.

HAProxy 1.8 以降では、DNS サービスの検出によりサーバーの変更を検出し、構成に自動的に適用することができます。
古いバージョンの HAProxy を使用している場合は、HAProxy を再読み込みまたは再起動する必要があります。もし {{< region-param key="dd_full_site" code="true" >}} が別の IP にフェイルオーバーした場合、HAProxy の DNS キャッシュをリフレッシュするために、`cron` **ジョブで 10 分毎に HAProxy をリロードさせることが推奨されています** (`service haproxy reload` など)。

#### Datadog Agent 構成

**Agent v6 & v7**

`haproxy.example.com` などの `dd_url` を HAProxy のアドレスに設定して、HAProxy をポイントするように各 Agent を編集します。この `dd_url` 設定は、`datadog.yaml` ファイルにあります。

`dd_url: <SCHEME>://haproxy.example.com:3834`

`<SCHEME>` を、HAProxy の HTTPS 構成を選択していた場合は `https` に、HTTPS を選択していなかった場合は `http` に置き換えてください。

プロキシ経由でトレース、プロファイル、プロセス、ログを送信するには、`datadog.yaml` ファイルで次のように設定します。

```yaml
apm_config:
    apm_dd_url: <SCHEME>://haproxy.example.com:3835
    profiling_dd_url: <SCHEME>://haproxy.example.com:3836/api/v2/profile
    telemetry:
        dd_url: <SCHEME>://haproxy.example.com:3843

process_config:
    process_dd_url: <SCHEME>://haproxy.example.com:3837

logs_config:
    force_use_http: true
    logs_dd_url: haproxy.example.com:3838
    # Comment the line below to use encryption between the Agent and HAProxy
    logs_no_ssl: true

database_monitoring:
    metrics:
        logs_dd_url: haproxy.example.com:3839
        # Comment the line below to use encryption between the Agent and HAProxy
        logs_no_ssl: true
    activity:
        logs_dd_url: haproxy.example.com:3839
        # Comment the line below to use encryption between the Agent and HAProxy
        logs_no_ssl: true
    samples:
        logs_dd_url: haproxy.example.com:3840
        # Comment the line below to use encryption between the Agent and HAProxy
        logs_no_ssl: true

network_devices:
    metadata:
        logs_dd_url: haproxy.example.com:3841
        # Comment the line below to use encryption between the Agent and HAProxy
        logs_no_ssl: true
    snmp_traps:
        forwarder:
            logs_dd_url: haproxy.example.com:3842
            # Comment the line below to use encryption between the Agent and HAProxy
            logs_no_ssl: true
    netflow:
        forwarder:
            logs_dd_url: haproxy.example.com:3845
            # Comment the line below to use encryption between the Agent and HAProxy
            logs_no_ssl: true

remote_configuration:
    rc_dd_url: haproxy.example.com:3846
    # Comment the line below to use encryption between the Agent and HAProxy
    no_tls: true
```

Agent と HAProxy 間で暗号化を使用する場合、Agent がプロキシ証明書にアクセスできない、証明書を検証できない、または検証が必要ない場合、`datadog.yaml` Agent コンフィギュレーションファイルを編集して `skip_ssl_validation` を `true` に設定することができます。
このオプションを `true` に設定すると、Agent は証明書の検証ステップをスキップし、プロキシの身元を検証しませんが、通信は SSL/TLS で暗号化されます。

```yaml
skip_ssl_validation: true
```

Finally [restart the Agent][2].

To verify that everything is working properly, review the HAProxy statistics at `http://haproxy.example.com:3833` as well as the [Infrastructure Overview][4].

**Agent v5**

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

Finally [restart the Agent][2].

To verify that everything is working properly, review the HAProxy statistics at `http://haproxy.example.com:3833` as well as the [Infrastructure Overview][4].

## NGINX

[NGINX][8] is a web server which can also be used as a reverse proxy, load balancer, mail proxy, and HTTP cache. You can also use NGINX as a proxy for your Datadog Agents:

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

NGINX should be installed on a host that has connectivity to Datadog. You can use one of the following configuration files if you do not already have it configured. The configuration is dependent on the Datadog service and site. To see configurations based on your [Datadog site][7], use the `DATADOG SITE` selector on the right.

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
# HTTP Proxy for Datadog Agent
http {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    server {
        listen 3834; #listen for metrics
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
            proxy_pass https://haproxy-app.agent.{{< region-param key="dd_site" >}}:443/;
        }
    }
}
# TCP Proxy for Datadog Agent
stream {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    server {
        listen 3835; #listen for traces
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass trace.agent.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3836; #listen for profiles
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass intake.profile.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3837; #listen for processes
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass process.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3838; #listen for logs with force_use_http: true
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3839; #listen for database monitoring metrics
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbm-metrics-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3840; #listen for database monitoring samples
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbquery-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3841; #listen for network devices metadata
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndm-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3842; #listen for network devices traps
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass snmp-traps-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3843; #listen for instrumentations telemetry data
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3845; #listen for network devices netflow
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndmflow-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3846; #listen for Remote Configuration requests
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass config.{{< region-param key="dd_site" >}}:443;
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
# HTTP Proxy for Datadog Agent
http {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    ssl_certificate     <PATH_TO_PROXY_CERTIFICATE>;
    ssl_certificate_key <PATH_TO_PROXY_CERTIFICATE_KEY>;

    server {
        listen 3834 ssl; #listen for metrics
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
            proxy_pass https://haproxy-app.agent.{{< region-param key="dd_site" >}}:443/;
        }
    }
}
# TCP Proxy for Datadog Agent
stream {

    proxy_ssl_trusted_certificate <PATH_TO_CERTIFICATES>;

    ssl_certificate     <PATH_TO_PROXY_CERTIFICATE>;
    ssl_certificate_key <PATH_TO_PROXY_CERTIFICATE_KEY>;

    server {
        listen 3835 ssl; #listen for traces
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass trace.agent.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3836 ssl; #listen for profiles
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass intake.profile.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3837 ssl; #listen for processes
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass process.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3838 ssl; #listen for logs with force_use_http: true
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass agent-http-intake.logs.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3839 ssl; #listen for database monitoring metrics
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbm-metrics-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3840 ssl; #listen for database monitoring samples
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass dbquery-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3841 ssl; #listen for network devices metadata
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndm-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3842 ssl; #listen for network devices traps
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass snmp-traps-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3843 ssl; #listen for instrumentations telemetry data
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass instrumentation-telemetry-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3845 ssl; #listen for network devices netflow
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass ndmflow-intake.{{< region-param key="dd_site" >}}:443;
    }
    server {
        listen 3846 ssl; #listen for Remote Configuration requests
        proxy_ssl_verify on;
        proxy_ssl on;
        proxy_pass config.{{< region-param key="dd_site" >}}:443;
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
    # Comment the line below to use encryption between the Agent and NGINX
    logs_no_ssl: true

database_monitoring:
    metrics:
        logs_dd_url: nginx.example.com:3839
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true
    activity:
        logs_dd_url: nginx.example.com:3839
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true
    samples:
        logs_dd_url: nginx.example.com:3840
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true

network_devices:
    metadata:
        logs_dd_url: nginx.example.com:3841
        # Comment the line below to use encryption between the Agent and NGINX
        logs_no_ssl: true
    snmp_traps:
        forwarder:
            logs_dd_url: nginx.example.com:3842
            # Comment the line below to use encryption between the Agent and NGINX
            logs_no_ssl: true
    netflow:
        forwarder:
            logs_dd_url: nginx.example.com:3845
            # Comment the line below to use encryption between the Agent and NGINX
            logs_no_ssl: true

remote_configuration:
    rc_dd_url: nginx.example.com:3846
    # Comment the line below to use encryption between the Agent and NGINX
    no_tls: true
```


Agent と NGINX 間で暗号化を使用する場合、Agent がプロキシ証明書にアクセスできない、証明書を検証できない、または検証が必要ない場合、`datadog.yaml` Agent コンフィギュレーションファイルを編集して `skip_ssl_validation` を `true` に設定することができます。
このオプションを `true` に設定すると、Agent は証明書の検証ステップをスキップし、プロキシの身元を検証しませんが、通信は SSL/TLS で暗号化されます。

```yaml
skip_ssl_validation: true
```

When sending logs over TCP, see [TCP Proxy for Logs][9].

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


[1]: /agent/configuration/agent-fips-proxy
[2]: /agent/configuration/agent-commands/
[3]: http://www.squid-cache.org/
[4]: https://app.datadoghq.com/infrastructure
[5]: http://haproxy.1wt.eu
[6]: https://www.haproxy.com/blog/haproxy-ssl-termination/
[7]: /getting_started/site/
[8]: https://www.nginx.com
[9]: /agent/logs/proxy
