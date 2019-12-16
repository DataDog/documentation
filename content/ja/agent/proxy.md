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
Datadog Agent が <a href="/agent/logs/?tab=tailexistingfiles#send-logs-over-https">ログを HTTPS で転送する</a>ように構成されていない限り、メトリクスのプロキシで使われる <code>&ltHOST&gt;:&ltPORT&gt;</code> はログのプロキシで使うことは**できません**。<a href="/agent/logs/proxy">ログ用プロキシ</a>ページを参照してください。
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

#### 環境変数

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
メトリクスのプロキシで使われる <code>&ltHOST&gt;:&ltPORT&gt;</code> はログのプロキシで使うことは**できません**。<a href="/agent/logs/proxy">ログ用プロキシ</a>ページを参照してください。
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

## HAProxy をプロキシとして使用する

[HAProxy][1] は、TCP アプリケーションと HTTP アプリケーションのプロキシを提供する、無料で高速、そして信頼性の高いソリューションです。通常、HAProxy はロードバランサーとして着信リクエストをプールサーバーに分散するために使われますが、Agent トラフィックを外部接続がないホストから Datadog にプロキシするために使うこともできます。

これが最高のオプションになるのは、ネットワークにすぐに使えるウェブプロキシがなく、大量の Agent をプロキシしたい場合です。各プロキシは 1000 以上の Agent に対応できるため、場合によっては、1 つの HAProxy インスタンスだけでネットワーク内のローカル Agent トラフィックを十分処理できます。(この数値は、m3.xl インスタンスのパフォーマンスに基づく控えめな見積もりである点にご注意ください。膨大なネットワーク関連の変数がプロキシの負荷に影響を与える場合があります。いつも通り、注意深く見守りながらデプロイしてください。詳しくは、[HAProxy のドキュメント][2]を参照してください。)

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
    log     global
    option  dontlognull
    retries 3
    option  redispatch
    timeout client 5s
    timeout server 5s
    timeout connect 5s

# ポート 3833 で HAProxy 統計情報の表示を宣言します
# このページを表示するための資格情報は不要です
# 一度セットアップを行うとオフにできます。
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
# エンドポイントを宣言します (例: "logs.config.logs_dd_url" の値)
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
    server mothership haproxy-app.agent.datadoghq.com:443 check port 443

backend datadog-traces
    balance roundrobin
    mode tcp
    option tcplog
    server mothership trace.agent.datadoghq.com:443 check port 443

backend datadog-processes
    balance roundrobin
    mode tcp
    option tcplog
    server mothership process.datadoghq.com:443 check port 443

backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.com:10516 ssl verify required ca-file /etc/ssl/certs/ca-certificates.crt check port 10516
```

**注**: 次のコマンドで証明書をダウンロードしてください:
        * `sudo apt-get install ca-certificates` (Debian、Ubuntu)
        * `yum install ca-certificates` (CentOS、Redhat)
CentOS、Redhat の場合、ファイルは `/etc/ssl/certs/ca-bundle.crt` にある場合があります。

HAProxy 構成が完成したら、リロードするか、HAProxy を再起動できます。`app.datadoghq.com` が別の IP にフェールオーバーした場合のために、**`cron` ジョブで 10 分ごとに HAProxy を再読み込みする**ことで (通常は `service haproxy reload` などで実行)、HAProxy の DNS キャッシュを強制的に更新することをお勧めします。

`app.datadoghq.com` の場合: `agent-intake.logs.datadoghq.com` のポート `10516`。SSL 暗号化をアクティブにします。

```
# 基本的な構成
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

# ポート 3833 で HAProxy 統計情報の表示を宣言します
# このページを表示するための資格情報は不要です
# 一度セットアップを行うとオフにできます。
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
# エンドポイントを宣言します (例: "logs.config.logs_dd_url" の値)
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
    server mothership haproxy-app.agent.datadoghq.eu:443 check port 443

backend datadog-traces
    balance roundrobin
    mode tcp
    option tcplog
    server mothership trace.agent.datadoghq.eu:443 check port 443

backend datadog-processes
    balance roundrobin
    mode tcp
    option tcplog
    server mothership process.datadoghq.eu:443 check port 443

backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.eu:443 ssl verify required ca-file /etc/ssl/certs/ca-bundle.crt check port 443
```

**注**: 次のコマンドで証明書をダウンロードしてください:

        * `sudo apt-get install ca-certificates` (Debian、Ubuntu)
        * `yum install ca-certificates` (CentOS、Redhat)

CentOS、Redhat の場合、ファイルは `/etc/ssl/certs/ca-bundle.crt` にある場合があります。

HAProxy 構成が完成したら、リロードするか、HAProxy を再起動できます。`app.datadoghq.eu` が別の IP にフェールオーバーした場合のために、**`cron` ジョブで 10 分ごとに HAProxy を再読み込みする**ことで (通常は `service haproxy reload` などで実行)、HAProxy の DNS キャッシュを強制的に更新することをお勧めします。

{{% /tab %}}
{{< /tabs >}}

#### Datadog Agent 構成

[app.datadoghq.com][3] の場合

`dd_url` を HAProxy のアドレスに設定して (例: `haproxy.example.com`)、HAProxy をポイントするように各 Agent を編集します。この `dd_url` 設定は、`datadog.yaml` ファイルにあります。

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
パラメーター `use_port_443` は、プロキシから送信されるログに影響しません。ログを `agent-443-intake.logs.datadoghq.com:443` に転送するには、プロキシ自体を構成する必要があります。

`dd_url` を HAProxy のアドレスに設定して (例: `haproxy.example.com`)、HAProxy をポイントするように各 Agent を編集します。この `dd_url` 設定は、`datadog.conf` ファイルにあります。

`dd_url: https://haproxy.example.com:3834`

プロキシ経由でトレースまたはプロセスを送信するには、`datadog.conf` ファイルで次のように設定します。

```
[trace.api]
endpoint = https://haproxy.example.com:3835

[process.api]
endpoint = https://haproxy.example.com:3836
```

Supervisor 構成を編集して SSL 証明書の検証を無効にします。これは、SSL 証明書 (`app.datadoghq.com`) のホスト名と HAProxy のホスト名の不一致を Python が訴えることを避けるために必要です。Supervisor 構成は次の場所にあります:

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

`DD_LOGS_CONFIG_LOGS_DD_URL`

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
        listen 10514; #プロキシリスニングポート
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.com:10516;
    }
}
```

`app.datadoghq.com` の場合: `agent-intake.logs.datadoghq.com` のポート `10516`。SSL 暗号化をアクティブにします。

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
        listen 10514; #プロキシリスニングポート
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
```

NGINX は単にトラフィックを Datadog に転送しているだけで、トラフィックの解読または暗号化は行わないため、`logs_no_ssl` パラメーターを変更しないでください。

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