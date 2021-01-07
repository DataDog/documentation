---
title: TCP Agent のログ用プロキシ
kind: documentation
further_reading:
  - link: /logs/
    tag: ドキュメント
    text: ログの収集
  - link: /infrastructure/process/
    tag: ドキュメント
    text: プロセスの収集
  - link: /tracing/
    tag: ドキュメント
    text: トレースの収集
---
## 概要

ログの収集には、Datadog Agent v6.0 以上が必要です。古いバージョンの Agent には、`log collection` インターフェイスが含まれていません。

Agent v6.14/v7.14 では、Datadog は **HTTPS** トランスポートの使用と適用を推奨しています ([ログのエージェントトランスポート][1]を参照)。
ログに HTTPS トランスポートを使用している場合は、[Agent プロキシのドキュメント][2]を参照し、他のデータタイプと同じプロキシ設定のセットを使用してください。

{{< tabs >}}
{{% tab "TCP" %}}

TCP 通信用のプロキシを使用する場合は、`datadog.yaml` 構成ファイルで次のパラメーターを使用して、TCP 経由でプロキシにログを送信するように Datadog Agent を構成します。

```yaml
logs_config:
  logs_dd_url: "<プロキシエンドポイント>:<プロキシポート>"
  logs_no_ssl: true
```

上記のパラメーターを次の環境変数で設定することもできます。

* `DD_LOGS_CONFIG_LOGS_DD_URL`
* `DD_LOGS_CONFIG_LOGS_NO_SSL`

**注**: パラメーター `logs_no_ssl` は、Agent が SSL 証明書のホスト名 ({{< region-param key="tcp_endpoint" code="true" >}}) とプロキシホスト名との不一致を無視するために必要です。プロキシと Datadog インテークエンドポイントの間では SSL 暗号化接続を使用することをお勧めします。

* 次に、`<PROXY_PORT>` をリッスンし、受信したログを転送するようにプロキシを構成します。{{< region-param key="dd_site" code="true" >}} の場合、ポート {{< region-param key="tcp_endpoint_port" code="true" >}} で {{< region-param key="tcp_endpoint" code="true" >}} を使用し、SSL 暗号化をアクティブにします。

* 以下のコマンドを使用して、SSL 暗号化用の TLS 暗号化の `CA 証明書`をダウンロードします。
  - `sudo apt-get install ca-certificates` (Debian、Ubuntu)
  - `yum install ca-certificates` (CentOS、Redhat)

  および `/etc/ssl/certs/ca-certificates.crt`(Debian、Ubuntu) または `/etc/ssl/certs/ca-bundle.crt` (CentOS、Redhat) にある証明書ファイルを使用

{{% /tab %}}
{{% tab "SOCKS5" %}}

SOCKS5 プロキシサーバーを使用して Datadog アカウントにログを送信するには、`datadog.yaml` 構成ファイルで次の設定を使用します。

```yaml
logs_config:
  socks5_proxy_address: "<MY_SOCKS5_プロキシ_URL>:<MY_SOCKS5_プロキシポート>"
```

上記のパラメーターを次の環境変数で設定することもできます。

* `DD_LOGS_CONFIG_SOCKS5_PROXY_ADDRESS`

{{% /tab %}}
{{< /tabs >}}

## TCP プロキシの例

{{< tabs >}}
{{% tab "HAProxy" %}}
### ログの TCP プロキシとしての HAProxy の使用

この例では、HAProxy がインストールされ、ポート `10514` でリッスンしているサーバーに TCP でログを送信し、ログを Datadog に転送するように Datadog Agent を構成する方法について説明します。

`agent ---> haproxy ---> Datadog`

暗号化は Agent と HAProxy の間で無効にされており、Datadog に送信する前にデータを暗号化するように構成されています。

#### Agent の構成

`datadog.yaml` Agent コンフィギュレーションファイルを編集し、`logs_no_ssl` を `true` に設定します。これが必要なのは、HAProxy はトラフィックを転送せず、Datadog バックエンドではないため、同じ証明書を使用することができないからです。

**注**: HAProxy はデータを暗号化するように構成されているため、`logs_no_ssl` を true に設定する場合があります。それ以外の場合は、このパラメーターを `true` に設定しないでください。

```
logs_config:
  use_tcp: true
  logs_dd_url: "<プロキシサーバードメイン>:10514"
  logs_no_ssl: true
```

#### HAProxy コンフィギュレーション

Datadog への接続があるホストに HAProxy をインストールする必要があります。次の構成ファイルを使用します (まだ構成していない場合)。

{{< site-region region="us" >}}

```conf
# 基本的なコンフィギュレーション
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
    timeout connect 5
# ポート 3833 で HAProxy 統計情報の表示を宣言します
# このページを表示するための資格情報は不要です
# 一度セットアップを行うとオフにできます。
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /
# このセクションは、DNS レコードをリロードするためのものです
# <DNS_SERVER_IP> と <DNS_SECONDARY_SERVER_IP> を DNS サーバーの IP アドレスに置き換えます。
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
# これは、ログを送信するために Agent が接続するエンドポイントを
# 宣言します (例: "logs.config.logs_dd_url" の値)
frontend logs_frontend
    bind *:10514
    mode tcp
    option tcplog
    default_backend datadog-logs
# これは Datadog サーバーです。実際、上記で定義された
# Forwarderのフロントエンドに着信する TCP リクエストは、
# Datadog のパブリックエンドポイントにプロキシされます。
backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.com:10516 ssl verify required ca-file /etc/ssl/certs/ca-certificates.crt check port 10516
```

**注**: 次のコマンドで証明書をダウンロードしてください:
        * `sudo apt-get install ca-certificates` (Debian、Ubuntu)
        * `yum install ca-certificates` (CentOS、Redhat)
成功した場合、CentOS、Redhat の場合、ファイルは `/etc/ssl/certs/ca-bundle.crt` にあります。

HAProxy コンフィギュレーションが完成したら、リロードするか、HAProxy を再起動できます。`app.datadoghq.com` が別の IP にフェールオーバーした場合のために、**`cron` ジョブで 10 分ごとに HAProxy を再読み込みする**ことで (例: `service haproxy reload`)、HAProxy の DNS キャッシュを強制的に更新することをお勧めします。

{{< /site-region >}}
{{< site-region region="eu" >}}

```conf
# 基本的なコンフィギュレーション
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
# これは、ポート 3833 で HAProxy 統計の表示を宣言します
# このページを表示するために資格情報は必要ありません。
# セットアップが完了したら、このページをオフにすることができます。
listen stats
    bind *:3833
    mode http
    stats enable
    stats uri /
# このセクションは、DNS レコードをリロードするためのものです
# <DNS_SERVER_IP> と <DNS_SECONDARY_SERVER_IP> を DNS サーバーの IP アドレスに置き換えます。
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
# これは、ログを送信するために Agent が接続するエンドポイントを
# 宣言します (例: "logs.config.logs_dd_url" の値)
frontend logs_frontend
    bind *:10514
    mode tcp
    default_backend datadog-logs
# これは Datadog サーバーです。実際、上記で定義された
# フォワーダーのフロントエンドに着信する TCP リクエストは、
# Datadog のパブリックエンドポイントにプロキシされます。
backend datadog-logs
    balance roundrobin
    mode tcp
    option tcplog
    server datadog agent-intake.logs.datadoghq.eu:443 ssl verify required ca-file /etc/ssl/certs/ca-bundle.crt check port 443
```

コマンド `sudo apt-get install ca-certificates` (Debian、Ubuntu) または `yum install ca-certificates` (CentOS、Redhat) を使用して証明書をダウンロードします。成功すると、ファイルは CentOS、Redhat の `/etc/ssl/certs/ca-bundle.crt` に配置されます。

HAProxy コンフィギュレーションが完成したら、リロードするか、HAProxy を再起動できます。`app.datadoghq.eu` が別の IP にフェールオーバーした場合のために、**`cron` ジョブで 10 分ごとに HAProxy を再読み込みする**ことで (例: `service haproxy reload`)、HAProxy の DNS キャッシュを強制的に更新することをお勧めします。

{{< /site-region >}}

{{% /tab %}}

{{% tab "NGINX" %}}
### ログの TCP プロキシとしての NGINX の使用

#### Agent の構成

`datadog.yaml` Agent コンフィギュレーションファイルを編集し、Datadog と直接接続を確立する代わりに新しく作成されたプロキシを使用するように `logs_config.logs_dd_url` を設定します。

```yaml
logs_config:
  use_tcp: true
  logs_dd_url: myProxyServer.myDomain:10514
```

**注**: NGINX はトラフィックを Datadog に転送しており、トラフィックの解読または暗号化は行わないため、`logs_no_ssl` パラメーターを変更しないでください。

#### NGINX コンフィギュレーション

この例では、`nginx.conf` を使用して、Agent のトラフィックを Datadog にプロキシ転送できます。このコンフィギュレーションにおける最後のサーバーブロックで TLS ラップを行うことで、プロキシと Datadog のログインテーク API エンドポイントとの間で内部的なプレーンテキストログを暗号化します。

{{< site-region region="us" >}}

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
events {
    worker_connections 1024;
}
# Datadog Agent の TCP プロキシ
stream {
    server {
        listen 10514; #listen for logs
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.com:10516;
    }
}
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
events {
    worker_connections 1024;
}
# Datadog Agent の TCP プロキシ
stream {
    server {
        listen 10514; #listen for logs
        proxy_ssl on;
        proxy_pass agent-intake.logs.datadoghq.eu:443;
    }
}
```

{{< /site-region >}}
{{% /tab %}}
{{< /tabs >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/logs/log_transport?tab=https
[2]: /ja/agent/proxy/