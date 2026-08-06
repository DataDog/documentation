---
algolia:
  tags:
  - agent proxy
aliases:
- /ja/account_management/faq/can-i-use-a-proxy-to-connect-my-servers-to-datadog/
- /ja/agent/proxy
description: Datadog Agent を構成して、認証およびバイパスオプションで HTTP/HTTPS プロキシを介してトラフィックを送信します。
further_reading:
- link: /logs/
  tag: ドキュメント
  text: ログの収集
- link: /infrastructure/process/
  tag: ドキュメント
  text: プロセスの収集
- link: /tracing/
  tag: ドキュメント
  text: トレースとプロファイルの収集
- link: /agent/configuration/fips-compliance
  tag: ドキュメント
  text: Datadog FIPS コンプライアンス
title: Datadog Agent プロキシの構成
---
Datadog Agent を構成して、HTTP/HTTPS プロキシを介してトラフィックを送信できます。プロキシは通常、公共インターネットに直接接続されていないホストからトラフィックを送信するために使用されます。

## Datadog Agent を構成する {#configure-the-datadog-agent}

Datadog Agent を構成してプロキシを使用する方法には 2 つのオプションがあります。
- Agent 構成ファイルを使用できます。
- 環境変数を使用できます。環境変数は構成ファイルの設定をオーバーライドします。

### 構成ファイル {#configuration-file}

構成ファイルを使用してプロキシを構成するには、メインの Agent 構成ファイル (`datadog.yaml`) を編集するか `proxy` セクションに追加し、その後 [Datadog Agent を再起動][1]します。

```yaml
proxy:
  # Required: Proxy endpoint for HTTP connections
  http: http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>
  # Required: Proxy endpoint for HTTPS connections (most Datadog traffic)
  https: http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>

  # Optional: List of hosts or CIDR ranges to bypass the proxy
  # Example:
  # no_proxy:
  #   - 192.168.0.0/24
  #   - localhost
  #   - .myinternaldomain.com
  no_proxy:
    - <HOST_TO_BYPASS_1>
    - <HOST_TO_BYPASS_2>

# Recommended: Set to true to ensure no_proxy behaves in a standard way
no_proxy_nonexact_match: true

# Recommended: Force the Agent to use HTTP to send logs (if logs is enabled)
logs_config:
  force_use_http: true
```

* `<USER>`、`<PASSWORD>`、`<PROXY_HOST>`、および `<PROXY_PORT>` を、プロキシの資格情報とアドレスに置き換えます。
* ユーザー名とパスワードは任意です。
* プロキシの設定とニーズに応じて、`http`、`https`、またはその両方を指定します。ほとんどの Datadog トラフィックは HTTPS を使用します。
* `no_proxy` を使用して、エージェントがプロキシをバイパスして直接接続するホストを指定します。
* **[Datadog Agent を再起動][1]**して変更を有効にします。

オペレーティングシステムにおける構成ファイルの場所の詳細については、[Agent 構成ファイル][2]を参照してください。

### 環境変数 {#environment-variables}

または、次の環境変数を設定することでプロキシを構成することができます。完了したら、[Datadog Agent を再起動][1]します。

```bash
DD_PROXY_HTTP="http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>"
DD_PROXY_HTTPS="http://<USER>:<PASSWORD>@<PROXY_HOST>:<PROXY_PORT>"

DD_PROXY_NO_PROXY="<HOST_TO_BYPASS_1> <HOST_TO_BYPASS_2>"
DD_NO_PROXY_NONEXACT_MATCH=true

DD_LOGS_CONFIG_FORCE_USE_HTTP=true
```

## プロキシサーバーのセットアップの例 {#proxy-server-setup-examples}

既存のプロキシサーバーがない場合、Datadog は **Squid** のような HTTP プロキシの使用を推奨します。

1. **Squid (推奨)**: すべてのアウトバウンド HTTP/HTTPS Agent トラフィックを透過的にプロキシすることで構成を簡素化する堅牢な HTTP/HTTPS プロキシです。[Squid プロキシの使用][3]。
2. **HAProxy (非推奨)**: Datadog にトラフィックを転送できますが、これには Datadog ドメインのリストを最新の状態に保つ必要があり、管理がより複雑になります。[HAProxy のセットアップの例を参照][4]してください。
3. **NGINX (非推奨)**: HAProxy と同様、NGINX を使用して Datadog にトラフィックを転送することはドメインリストを最新の状態に保つためのメンテナンスオーバーヘッドがあるため、推奨されません。[NGINX のセットアップの例を参照][5]してください。

Datadog は、HAProxy または NGINX のようなソフトウェアを使用してトラフィックを転送することを推奨しません。なぜなら、エージェントがリーチする必要のある特定の Datadog エンドポイントのリストを手動で構成して維持する必要があるからです。このリストは変更される可能性があり、最新の状態に保たれないとデータを損失するリスクがあります。唯一の例外は深層パケット検査 (DPI) 機能が必要な場合で、その場合は HAProxy または NGINX の使用を検討するとよいかもしれません。これにより、TLS を無効にしたり、独自の TLS 証明書を使用してトラフィックを検査したりすることができます。

## 検証 {#verification}

Agent のステータスコマンドを確認し、再始動後に接続エラーがないか Agent ログ (`agent.log`、`trace-agent.log` など) を確認します。

## FIPS プロキシ (US1-FED) {#fips-proxy-us1-fed}

Datadog Agent FIPS Proxy の設定については、[Datadog FIPS コンプライアンス][6]を参照してください。FIPS プロキシは US1-FED リージョンでのみ利用可能です。Datadog Agent FIPS Proxy は、通常のプロキシと併用することはできません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/configuration/agent-commands/#restart-the-agent
[2]: /ja/agent/configuration/agent-configuration-files/#main-configuration-file
[3]: /ja/agent/configuration/proxy_squid/
[4]: /ja/agent/faq/proxy_example_haproxy/
[5]: /ja/agent/faq/proxy_example_nginx/
[6]: /ja/agent/configuration/fips-compliance/