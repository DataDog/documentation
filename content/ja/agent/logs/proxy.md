---
title: Agent のログ用プロキシ
kind: documentation
further_reading:
  - link: logs/
    tag: ドキュメント
    text: ログの収集
  - link: graphing/infrastructure/process
    tag: ドキュメント
    text: プロセスの収集
  - link: tracing
    tag: ドキュメント
    text: トレースの収集
---
ログの収集には、Datadog Agent v6.0 以上が必要です。古いバージョンの Agent には、`log collection` インターフェイスが含まれていません。

Datadog は、デフォルトで、ログを TCP/SSL 経由で転送します。そのため、Datadog Agent によって HTTPS で転送される他のデータタイプとは異なるプロキシ設定があります。
他のデータタイプと同じプロキシ設定を使用して、Agent がログを HTTPS で送信するように構成します。

{{< tabs >}}
{{% tab "TCP" %}}

TCP 通信用のプロキシを使用する場合は、`datadog.yaml` 構成ファイルで次のパラメーターを使用して、TCP 経由でプロキシにログを送信するように Datadog Agent を構成します。

```
logs_config:
  logs_dd_url: <PROXY_ENDPOINT>:<PROXY_PORT>
  logs_no_ssl: true
```

上記のパラメーターを次の環境変数で設定することもできます。

* `DD_LOGS_CONFIG_LOGS_DD_URL`
* `DD_LOGS_CONFIG_LOGS_NO_SSL`

**注**: パラメーター `logs_no_ssl` は、Agent が SSL 証明書のホスト名 (`agent-intake.logs.datadoghq.com` または `agent-intake.logs.datadoghq.eu`) とプロキシホスト名との不一致を無視するために必要です。プロキシと Datadog インテークエンドポイントの間では SSL 暗号化接続を使用することをお勧めします。

* 次に、`<PROXY_PORT>` をリスニングし、受信されたログを以下に転送するようにプロキシを構成します。
    * `app.datadoghq.com` の場合: `agent-intake.logs.datadoghq.com` のポート `10516`。SSL 暗号化をアクティブにします。
    * `app.datadoghq.eu` の場合: `agent-intake.logs.datadoghq.eu` のポート `443`。SSL 暗号化をアクティブにします。

* 以下のコマンドを使用して、SSL 暗号化用の TLS 暗号化の `CA 証明書`をダウンロードします。
    * `sudo apt-get install ca-certificates` (Debian、Ubuntu)
    * `yum install ca-certificates` (CentOS、Redhat)
  および `/etc/ssl/certs/ca-certificates.crt`(Debian、Ubuntu) または `/etc/ssl/certs/ca-bundle.crt` (CentOS、Redhat) にある証明書ファイルを使用

{{% /tab %}}
{{% tab "SOCKS5" %}}

SOCKS5 プロキシサーバーを使用して Datadog アカウントにログを送信するには、`datadog.yaml` 構成ファイルで次の設定を使用します。

```
logs_config:
  socks5_proxy_address: <MY_SOCKS5_PROXY_URL>:<MY_SOCKS5_PROXY_PORT>
```

上記のパラメーターを次の環境変数で設定することもできます。

* `DD_LOGS_CONFIG_SOCKS5_PROXY_ADDRESS`

{{% /tab %}}
{{% tab "HTTPS" %}}

Agent を [HTTPS 経由でログを送信するように構成][1]した場合は、Web プロキシ経由でログを送信するために、他のデータタイプと同じ[プロキシ設定][2]を使用します。

[1]: /ja/agent/logs/?tab=tailexistingfiles#send-logs-over-https
[2]: /ja/agent/proxy
{{% /tab %}}
{{< /tabs >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
[1]: /ja/agent/proxy