---
title: Agent プロキシの構成
kind: documentation
further_reading:
  - link: logs/
    tag: Documentation
    text: ログの収集
  - link: graphing/infrastructure/process
    tag: Documentation
    text: プロセスの収集
  - link: tracing
    tag: Documentation
    text: トレースの収集
---
## プロキシを使用する理由

ご使用のネットワーク構成がアウトバウンドトラフィックを制限している場合は、より許容度の高いアウトバウンドポリシーを持つ 1 つ以上のホストを経由して、すべての Agent トラフィックをプロキシ転送します。

インターネットに直接接続していないホストから、SSL/TLS 経由で Datadog にトラフィックを送信するための方法はいくつかあります。

1. 既にネットワークにデプロイされている Web プロキシ (Squid、Microsoft Web Proxy など) を使用する
2. HAProxy を使用する (**16～20 以上の Agent** に対して同じプロキシを使用する場合)
3. Agent をプロキシとして使用する (プロキシあたり**最大 16 Agent**、**Agent v5 のみ**)

## Web プロキシをプロキシとして使用する

Agent は従来の Web プロキシをネイティブにサポートします。プロキシ経由でインターネットに接続する必要がある場合は、Agent 構成ファイルを編集します。

{{< tabs >}}
{{% tab "Agent v6" %}}

Agent `datadog.yaml` 構成ファイルで、`https` リクエスト用と `http` リクエスト用にそれぞれプロキシサーバーを設定します。
Agent は `https` を使用して Datadog にデータを送信しますが、インテグレーションは `http` を使用してメトリクスを収集することがあります。プロキシ転送されたリクエストでも、プロキシサーバーで SSL をアクティブにできます。`datadog.yaml` ファイルの構成例を以下にいくつか挙げます。

<div class="alert alert-warning">
メトリクスのプロキシ転送に使用される <code>&ltHOST&gt;:&ltPORT&gt;</code> をログのプロキシ転送に使用することはできません。「<a href="/agent/logs/proxy">ログのプロキシ</a>」セクションを参照してください。
</div>

すべての `https` リクエストに対して HTTP プロキシを設定する例

```
proxy:
    https: http://<SSL_PROXY_SERVER_FOR_HTTPS>:<PORT>
```

メモ: `https` リクエスト用に HTTP プロキシを設定する場合、Agent と Datadog の間の実際の通信は、TLS を使用してエンドツーエンドで暗号化され、プロキシが解読することはできません。暗号化されない通信は、Agent と Datadog の間の初回 TCP 接続を確立するために Agent とプロキシの間で行われる `HTTP CONNECT` リクエストだけです。そのため、`https` リクエストでプロキシを使用する場合に、Agent と Datadog の間の通信を暗号化するために HTTPS プロキシを使用する必要はありません。

`https` リクエストと `http` リクエストの両方に対して HTTPS プロキシを設定する例

```
proxy:
    https: https://<SSL_PROXY_SERVER_FOR_HTTPS>:<PORT>
    http: https://<SSL_PROXY_SERVER_FOR_HTTP>:<PORT>
```

`https` リクエストと `http` リクエストの両方に対して、プロキシサーバーに接続するための `<USERNAME>` と `<PASSWORD>` を設定する例

```
proxy:
    https: http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>
    http: http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>
```

`no_proxy` リストを使用して、プロキシをバイパスするホストを指定する例

```
proxy:
    https: http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>
    http: http://<USERNAME>:<PASSWORD>@<PROXY_SERVER_FOR_HTTPS>:<PORT>
    no_proxy:
      - host1
      - host2
```

**環境変数を使用したプロキシ**:

Agent v6.4 より、以下の環境変数を使用してプロキシ設定を行えるようになりました。

* `DD_PROXY_HTTPS`: `https` リクエスト用のプロキシサーバーを設定します。
* `DD_PROXY_HTTP`: `http` リクエスト用のプロキシサーバーを設定します。
* `DD_PROXY_NO_PROXY`: プロキシをバイパスするホストのリストを設定します。リストはスペース区切りです。

環境変数は、`datadog.yaml` ファイルの値より優先されます。値が空の環境変数がある場合 (``DD_PROXY_HTTP=""`` など)、Agent は、優先度が低いオプションではなく空の値を使用します。

Unix ホストでは、`HTTPS_PROXY`、`HTTP_PROXY`、`NO_PROXY` などの標準環境変数を使用して、システム全体のプロキシが指定されることがあります。標準環境変数がある場合は、それらが使用されます。これらの変数は、Docker、ECS、Kubernetes などのオーケストレーションツールを含むインテグレーションからのすべてのリクエストに影響するため、注意が必要です。

Agent は、これらの値を以下の優先順で使用します。

1. 環境変数 `DD_PROXY_HTTPS`、`DD_PROXY_HTTP`、`DD_PROXY_NO_PROXY`
2. 環境変数 `HTTPS_PROXY`、`HTTP_PROXY`、`NO_PROXY`
3. `datadog.yaml` 内の値

{{% /tab %}}
{{% tab "Agent v5" %}}

<div class="alert alert-warning">
メトリクスのプロキシ転送に使用される <code>&ltHOST&gt;:&ltPORT&gt;</code> をログのプロキシ転送に使用することはできません。「<a href="/agent/logs/proxy">ログのプロキシ</a>」セクションを参照してください。
</div>

`datadog.conf` ファイルを編集してプロキシ情報を設定します。

```
# インターネットに接続するためのプロキシが必要である場合は、ここで設定します
proxy_host: my-proxy.example.com
proxy_port: 3128
proxy_user: my_user
proxy_password: my_password
```

新しい設定を有効にするために、[Agent を再起動する][1]ことを忘れないでください。


[1]: /ja/agent/guide/agent-commands
{{% /tab %}}
{{< /tabs >}}

## ログのプロキシ

ログコレクションには、バージョン 6.0 以降の Agent が必要です。古いバージョンの Agent には、ログの収集に使用される `Log collection` インターフェイスが含まれません。

ログは、Datadog Agent によって転送される他のデータの種類とは異なるプロキシ設定を利用します。ログは TCP/SSL 経由で転送され、その他の機能は HTTPS 経由でデータを送信するからです。

{{< tabs >}}
{{% tab "TCP" %}}

TCP 通信にプロキシを使用する場合は、`datadog.yaml` 構成ファイルの次のパラメーターを使用して、TCP 経由でプロキシにログを送信するように Datadog Agent を構成します。

```
logs_config:
  logs_dd_url: <PROXY_ENDPOINT>:<PROXY_PORT>
  logs_no_ssl: true
```

これらのパラメーターを次の環境変数で設定することもできます。

* `DD_LOGS_CONFIG_LOGS_DD_URL`
* `DD_LOGS_CONFIG_LOGS_NO_SSL`

**重要**: パラメーター `logs_no_ssl` は、Agent が SSL 証明書のホスト名 (`agent-intake.logs.datadoghq.com` または `agent-intake.logs.datadoghq.eu`) とプロキシホスト名との不一致を無視するために必要です。ただし、プロキシと Datadog インテークエンドポイントの間では SSL 暗号化接続を使用する必要があります。

* 次に、`<PROXY_PORT>` をリスニングし、受信されたログを以下に転送するようにプロキシを構成します。
    * `app.datadoghq.com` の場合: `agent-intake.logs.datadoghq.com` のポート `10516`。SSL 暗号化をアクティブにします。
    * `app.datadoghq.eu` の場合: `agent-intake.logs.datadoghq.eu` のポート `443`。SSL 暗号化をアクティブにします。

* SSL 暗号化には、TLS 暗号化の公開鍵を使用します。
    * [app.datadoghq.com][1] の場合 
    * [app.datadoghq.eu][2] の場合

    一部のシステムでは、証明書チェーン全体が必要になることがあります。その場合は、代わりにこの公開鍵を使用します。

    * [app.datadoghq.com][3] の場合
    * [app.datadoghq.eu][4] の場合


[1]: /resources/crt/intake.logs.datadoghq.com.crt
[2]: /resources/crt/intake.logs.datadoghq.eu.crt
[3]: /resources/crt/FULL_intake.logs.datadoghq.com.crt
[4]: /resources/crt/FULL_intake.logs.datadoghq.eu.crt
{{% /tab %}}
{{% tab "SOCKS5" %}}

SOCKS5 プロキシサーバー経由で Datadog アカウントにログを送信するには、`datadog.yaml` 構成ファイルで次の設定を使用します。

```
logs_config:
  socks5_proxy_address: <MY_SOCKS5_PROXY_URL>:<MY_SOCKS5_PROXY_PORT>
```

このパラメーターを次の環境変数で設定することもできます。

* `DD_LOGS_CONFIG_SOCKS5_PROXY_ADDRESS`

{{% /tab %}}
{{< /tabs >}}

### ポート 443

パラメーター `use_port_443` は、プロキシから送信されるログに影響しません。ログを `agent-443-intake.logs.datadoghq.com:443` に転送するには、プロキシ自体を構成する必要があります。

## HAProxy をプロキシとして使用する

[HAProxy][1] は、TCP および HTTP アプリケーションにプロキシを提供する、無料、高速、高信頼性のソリューションです。通常、HAProxy は、プールサーバーへの着信リクエストを分散するためのロードバランサーとして使用されますが、外部接続がないホストから Datadog への Agent トラフィックをプロキシ転送するためにも使用されます。

ネットワークにすぐに使用できる Web プロキシがなく、多数の Agent をプロキシ転送する場合は、最適なオプションです。ケースによっては、1 つの HAProxy インスタンスで、ネットワーク内のローカル Agent トラフィックを十分に処理できます。各プロキシは約 1,000 の Agent に対応できます。(これは、特に m3.xl インスタンスのパフォーマンスに基づき、控えめに見積もった数字です。ネットワーク関連のさまざまな変数がプロキシの負荷に影響します。デプロイの際は常に注意を払ってください。詳細については、[HAProxy ガイド][2]をご参照ください。)

`agent ---> haproxy ---> Datadog`

### HAProxy によるメトリクスのプロキシ転送
#### HAProxy 構成

Datadog への接続があるホストに HAProxy をインストールする必要があります。次の構成ファイルを使用します (まだ構成していない場合)。

{{< tabs >}}
{{% tab "Datadog US site" %}}

```
# 基本的な構成
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# 妥当なデフォルト値
defaults
    ログ     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# ポート 3833 で HAProxy 統計情報の表示を宣言します
# このページを表示するための資格情報は不要です
# 一度セットアップ行うとオフにできます
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# Agent がメトリクスを送信するために接続する
# エンドポイントを宣言します (例: "dd_url" の値)。
frontend metrics-forwarder
    bind *:3834
    mode tcp
    default_backend datadog-metrics

# Agent がトレースを送信するために接続する
# エンドポイントを宣言します (例: APM 構成セクションの "endpoint" 
# の値)。
frontend traces-forwarder
    bind *:3835
    mode tcp
    default_backend datadog-traces

# Agent がプロセスを送信するために接続する
# エンドポイントを宣言します (例: プロセス構成セクションの "url" 
# の値)。
frontend processes-forwarder
    bind *:3836
    mode tcp
    default_backend datadog-processes

# Agent がログを送信するために接続する
# エンドポイントを宣言します (例: "logs.config.logs_dd_url" の値)。
frontend logs_frontend
    bind *:10514
    mode tcp
    default_backend datadog-logs

# これは Datadog サーバーです。実際には、上で定義されたフォワーダーフロントエンドに
# 着信するすべての TCP リクエストが Datadog の
# 公開エンドポイントにプロキシ転送されます。
backend datadog-metrics
    balance roundrobin
    mode tcp
    option tcplog
    server mothership haproxy-app.agent.datadoghq.com:443 check port 80

backend datadog-traces
    balance roundrobin
    mode tcp
    option tcplog
    server mothership trace.agent.datadoghq.com:443 check port 80

backend datadog-processes
    balance roundrobin
    mode tcp
    option tcplog
    server mothership process.datadoghq.com:443 check port 80

backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.com:10516 ssl verify required ca-file /etc/ssl/certs/ca-certificates.crt
```

HAProxy 構成が完成したら、リロードするか、HAProxy を再起動できます。

`app.datadoghq.com` が別の IP にフェールオーバーした場合のために、**`cron` ジョブで 10 分ごとに HAProxy を再読み込みすることで** (通常は `service haproxy reload` などで実行)、HAProxy の DNS キャッシュを強制的に更新することをお勧めします。

{{% /tab %}}
{{% tab "Datadog EU site" %}}

```
# 基本的な構成
global
    log 127.0.0.1 local0
    maxconn 4096
    stats socket /tmp/haproxy

# 妥当なデフォルト値
defaults
    ログ     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# ポート 3833 で HAProxy 統計情報の表示を宣言します
# このページを表示するための資格情報は不要です
# 一度セットアップ行うとオフにできます
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /

# Agent がメトリクスを送信するために接続する
# エンドポイントを宣言します (例: "dd_url" の値)。
frontend metrics-forwarder
    bind *:3834
    mode tcp
    default_backend datadog-metrics

# Agent がトレースを送信するために接続する
# エンドポイントを宣言します (例: APM 構成セクションの "endpoint" 
# の値)。
frontend traces-forwarder
    bind *:3835
    mode tcp
    default_backend datadog-traces

# Agent がプロセスを送信するために接続する
# エンドポイントを宣言します (例: プロセス構成セクションの "url" 
# の値)。
frontend processes-forwarder
    bind *:3836
    mode tcp
    default_backend datadog-processes

# Agent がログを送信するために接続する
# エンドポイントを宣言します (例: "logs.config.logs_dd_url" の値)。
frontend logs_frontend
    bind *:10514
    mode tcp
    default_backend datadog-logs

# これは Datadog サーバーです。実際には、上で定義されたフォワーダーフロントエンドに
# 着信するすべての TCP リクエストが Datadog の
# 公開エンドポイントにプロキシ転送されます。
backend datadog-metrics
    balance roundrobin
    mode tcp
    option tcplog
    server mothership haproxy-app.agent.datadoghq.eu:443 check port 80

backend datadog-traces
    balance roundrobin
    mode tcp
    option tcplog
    server mothership trace.agent.datadoghq.eu:443 check port 80

backend datadog-processes
    balance roundrobin
    mode tcp
    option tcplog
    server mothership process.datadoghq.eu:443 check port 80

backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.eu:443 ssl verify required ca-file /etc/ssl/certs/ca-certificates.crt
```

HAProxy 構成が完成したら、リロードするか、HAProxy を再起動できます。

`app.datadoghq.eu` が別の IP にフェールオーバーした場合のために、**`cron` ジョブで 10 分ごとに HAProxy を再読み込みすることで** (通常は `service haproxy reload` などで実行)、HAProxy の DNS キャッシュを強制的に更新することをお勧めします。

{{% /tab %}}
{{< /tabs >}}

#### Datadog Agent 構成

{{< tabs >}}
{{% tab "Agent v6" %}}

`dd_url` を HAProxy のアドレスに設定して (例: `haproxy.example.com`)、HAProxy をポイントするように各 Agent を編集します。
この `dd_url` 設定は、`datadog.yaml` ファイルにあります。

`dd_url: https://haproxy.example.com:3834`

プロキシ経由でトレースまたはプロセスを送信するには、`datadog.yaml` ファイルで次のように設定します。

```
apm_config:
    apm_dd_url: https://haproxy.example.com:3835

process_config:
    process_dd_url: https://haproxy.example.com:3836
```

次に、`datadog.yaml` Agent 構成ファイルを編集して、`skip_ssl_validation` を `true` に設定します。これは、SSL 証明書 (`app.datadoghq.com` または `app.datadoghq.eu`) のホスト名と HAProxy のホスト名の不一致を Agent が無視するようにするために必要です。

```
skip_ssl_validation: true
```

最後に、[Agent を再起動][1]します。

すべてが正しく機能していることを確認するには、HAProxy 統計情報 (`http://haproxy.example.com:3833`) と[インフラストラクチャーの概要][2]を確認します。

[1]: /ja/agent/guide/agent-commands/#restart-the-agent
[2]: https://app.datadoghq.com/infrastructure
{{% /tab %}}
{{% tab "Agent v5" %}}

`dd_url` を HAProxy のアドレスに設定して (例: `haproxy.example.com`)、HAProxy をポイントするように各 Agent を編集します。
この `dd_url` 設定は、`datadog.conf` ファイルにあります。

`dd_url: https://haproxy.example.com:3834`

プロキシ経由でトレースまたはプロセスを送信するには、`datadog.conf` ファイルで次のように設定します。

```
[trace.api]
endpoint = https://haproxy.example.com:3835

[process.api]
endpoint = https://haproxy.example.com:3836
```

スーパーバイザー構成を編集して、SSL 証明書の検証を無効にします。これは、SSL 証明書 (`app.datadoghq.com`) のホスト名と HAProxy のホスト名の不一致を Python がエラーと見なさないようにするために必要です。スーパーバイザー構成は、次の場所にあります。

* `/etc/dd-agent/supervisor_ddagent.conf` (Debian ベースのシステム)
* `/etc/dd-agent/supervisor.conf` (Red Hat ベースのシステム)
* `/opt/local/datadog/supervisord/supervisord.conf` (SmartOS)
* `/usr/local/etc/datadog/supervisord/supervisord.conf` (FreeBSD)
* `~/.datadog-agent/supervisord/supervisord.conf` (macOS)

スーパーバイザーファイルが `<SUP_FILE>` にあるとします。

```bash
sed -i 's/ddagent.py/ddagent.py --sslcheck=0/' <SUP_FILE>
```

Windows Agent の場合は、構成ファイル `datadog.conf` を編集し、次のオプションを追加します。

```
skip_ssl_validation: yes
```

最後に、[Agent を再起動][1]します。

すべてが正しく機能していることを確認するには、HAProxy 統計情報 (`http://haproxy.example.com:3833`) と[インフラストラクチャーの概要][2]を確認します。


[1]: /ja/agent/guide/agent-commands/#restart-the-agent
[2]: https://app.datadoghq.com/infrastructure
{{% /tab %}}
{{< /tabs >}}

## NGINX をプロキシとして使用する

[NGINX][3] は、リバースプロキシ、ロードバランサー、メールプロキシ、HTTP キャッシュとしても使用できる Web サーバーです。NGINX をプロキシとして使用して、Datadog にログを送信できます。

`agent ---> nginx ---> Datadog`

### NGINX によるプロキシ転送
#### NGINX 構成

この例 `nginx.conf` を使用して、Datadog インテークにログをプロキシ転送できます。これは、TLS ラップを行うことで、プロキシと Datadog のログインテーク API エンドポイントの間で内部的なプレーンテキストログを暗号化します。

{{< tabs >}}
{{% tab "Datadog US site" %}}

```
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid; 

include /usr/share/nginx/modules/*.conf;
events {
    worker_connections 1024;
}
# Datadog ログの TCP プロキシ
stream {
    server {
        listen 10514; # プロキシリスニングポート
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.com:10516;
    }
}
```

{{% /tab %}}
{{% tab "Datadog EU site" %}}

```
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid; 

include /usr/share/nginx/modules/*.conf;
events {
    worker_connections 1024;
}
# Datadog ログの TCP プロキシ
stream {
    server {
        listen 10514; # プロキシリスニングポート
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.eu:443;
    }
}
```

{{% /tab %}}
{{< /tabs >}}

#### Datadog Agent 構成

Datadog Agent v6 をログコレクターとして使用するには、`datadog.yaml` を更新して、ログインテークと直接接続を確立する代わりに、新しく作成されたプロキシを使用するように Agent に指示します。

```yaml
logs_config:
  logs_dd_url: myProxyServer.myDomain:10514
  logs_no_ssl: true
```

SSL/TLS 接続の確立は NGINX の `proxy_ssl on` オプションによって処理されるため、`logs_no_ssl` パラメーターは、`true` に設定されます。**メモ**: ログインテークへの接続を暗号化できるプロキシを使用しない場合は、このオプションを `false` に設定します。

## Agent をプロキシとして使用する

**この機能は、Agent v5 でのみ使用できます**

トラフィックを Datadog に転送するには、実際のプロキシ (Web プロキシまたは HAProxy) を使用することをお勧めしますが、これらのオプションを使用できない場合は、Agent v5 のインスタンスをプロキシとして機能するように構成できます。

1. **datadog-agent を実行している** 1 つノードをプロキシとして指定します。
    この例では、プロキシ名が `proxy-node` であるとします。このノードは、`https://app.datadoghq.com` に到達できる**必要**があります。

2. `proxy-node` の SSL 接続を検証します。
    ```
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

6. [インフラストラクチャーページ][4] で、すべてのノードがデータを Datadog に報告していることを確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://haproxy.1wt.eu
[2]: http://www.haproxy.org/#perf
[3]: https://www.nginx.com
[4]: https://app.datadoghq.com/infrastructure#overview
