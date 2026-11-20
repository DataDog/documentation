---
aliases:
- /ja/synthetics/private_locations/configuration
description: プライベートロケーションを構成します。
further_reading:
- link: getting_started/synthetics/private_location
  tag: ドキュメント
  text: プライベートロケーションの概要
- link: synthetics/private_locations/dimensioning
  tag: ドキュメント
  text: プライベートロケーションのディメンション
- link: synthetics/platform/private_locations/network_security
  tag: ドキュメント
  text: プライベートロケーションネットワークのセキュリティ強化
title: プライベートロケーションの構成
---
## 概要 {#overview}

<div class="alert alert-warning">新しいプライベートロケーションは、デフォルトで予約済み IP 範囲をブロックします。古い構成ファイルを使用しているプライベートロケーションは、構成しない限りアウトバウンドネットワークアクセスを制限しません。アクセスを確認および制限するには、<a href="/synthetics/platform/private_locations/network_security">プライベートロケーションネットワークのセキュリティ強化</a>を参照してください。</div>

Synthetic プライベートロケーションには、環境要件に合わせて構成できる一連のオプションが用意されています。[プライベートロケーションワーカー][1]のすべてのオプションは、`help` コマンドを実行することで確認できます。

{{< tabs >}}
{{% tab "Docker" %}}

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```
{{% /tab %}}
{{% tab "Windows" %}}

```
synthetics-pl-worker.exe --help
```
{{% /tab %}}
{{% tab "Kubernetes" %}}

[Datadog Helm リポジトリ][1]の例を参照してください。

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location

{{% /tab %}}
{{< /tabs >}}

## プライベートロケーションをカスタマイズする {#customize-your-private-location}
利用可能なパラメーターを以下に示します。
プライベートロケーションのこれらの構成オプションは、**JSON 構成ファイルへのパラメーター**として、または**起動コマンドでの引数**として渡すことができます。例:

{{< tabs >}}
{{% tab "Docker" %}}

```shell
docker run -d --restart always -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest --logFormat=json
```
{{% /tab %}}
{{% tab "Windows" %}}

```cmd
synthetics-pl-worker.exe --config=<PathToYourConfiguration> --logFormat=json
```
{{% /tab %}}
{{< /tabs >}}

起動コマンドで設定された引数は、構成ファイルよりも優先されます。ただし、これらのオプションは保存されないため、特定の起動に対してのみ有効です。

## 主な構成オプション {#top-configuration-options}

### Datadogサイトの構成 {#datadog-site-configuration}

`site`
: **タイプ**: 文字列 <br>
**デフォルト**: `datadoghq.com`<br>
プライベートロケーションがテスト構成を取得し、テスト結果を送信する Datadog サイト。ご使用の `site` は {{< region-param key="dd_site" code="true" >}}です。

### DNS 構成 {#dns-configuration}

以下のパラメーターを使用して、API テストでの DNS 解決をカスタマイズできます。

`dnsUseHost`
: **タイプ**: ブール値 <br>
**デフォルト**: `true`<br>
まずホストのローカル DNS 構成 (例: `etc/resolv.conf` ファイルの構成) を使用し、次に `dnsServer` パラメーターで指定された DNS サーバーを使用します。

`dnsServer`
: **タイプ**: 文字列の配列 <br>
**デフォルト**: `["8.8.8.8","1.1.1.1"]`<br>
指定された順序で使用する DNS サーバーの IP (例: `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`)。

ブラウザテストでは、DNS 解決はブラウザによって直接行われ、通常はホストから DNS サーバーを読み取ります。あるいは、コンテナレベルで構成することもできます (例: [Docker][1] では `--dns` フラグ、[Kubernetes][2] では `dnsConfig.nameservers` を使用)。

### プロキシ構成 {#proxy-configuration}

Datadog への接続にプロキシを構成するには、以下のパラメーターを使用できます。

`proxyDatadog`
: **タイプ**: 文字列 <br>
**デフォルト**: `none`<br>
プライベートロケーションが Datadog にリクエストを送信するために使用するプロキシ URL (例: `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`)。

`proxyIgnoreSSLErrors`
: **タイプ**: ブール値 <br>
**デフォルト**: `false`<br>
プライベートロケーションが Datadog にリクエストを送信するためにプロキシを使用している場合、SSL エラーを無視します。

`proxyEnableConnectTunnel`
: **タイプ**: ブール値 <br>
**デフォルト**: `none`<br>
HTTP プロキシの `HTTP CONNECT` トンネリングを有効にします。このオプションが設定されていない場合、`HTTP CONNECT` トンネリングは HTTPS プロキシに対してのみ使用されます。

**注:** Squid のような HTTP 転送プロキシでは、プライベートロケーションと Datadog 間の初期 TCP コネクションを確立するために `HTTP CONNECT` リクエストが必要になる場合があります。そのため、`proxyEnableConnectTunnel` パラメーターを `true` に設定する必要があります。ただし、`HTTP CONNECT` リクエストを Datadog に転送する HAProxy のようなリバースプロキシは、このオプションを有効にすると機能しない可能性があります。

**注:** `proxy` パラメーターは非推奨で、`proxyDatadog` に置き換える必要があります。

以下のパラメーターを使用して、Synthetic Monitoring テストで使用するデフォルトプロキシを構成できます。

`proxyTestRequests`
: **タイプ**: 文字列 <br>
**デフォルト**: `none`<br>
プライベートロケーションがエンドポイントにテストリクエストを送信するために使用するプロキシ URL。これは、`pac+http://...`、`pac+https://...`、`pac+file://...`、または `pac+data:...` の構文で、HTTP(S)、SOCKS、および PAC ファイルをサポートしています。

`proxyTestRequestsBypassList`
: **タイプ**: 文字列の配列 <br>
**デフォルト**: `none`<br>
`proxyTestRequests` で定義されたプロキシを使用しないホスト。例: `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`。

### 高度な構成 {#advanced-configuration}

`concurrency`
: **タイプ**: 数値 <br>
**デフォルト**: `10`<br>
並列実行されるテストの最大数。

`maxNumberMessagesToFetch`
: **タイプ**: 数値 <br>
**デフォルト**: `10`<br>
Datadog から取得されるテストの最大数。

`maxAPIDownloadBodySize`
: **タイプ**: 数値 <br>
**デフォルト**: `52428800`<br>
ダウンロードの最大 HTTP ボディサイズ (バイト単位)。デフォルトは 50 MB (50 * 1024 * 1024) です。

`maxAPIBodySizeIfProcessed`
: **タイプ**: 数値 <br>
**デフォルト**: `5242880`<br>
アサーションの最大 HTTP ボディサイズ (バイト単位)。デフォルトは 5 MB (5 * 1024 * 1024) です。

`apiRequestMaxTimeout`
: **タイプ**: 数値 <br>
**デフォルト**: `60000`<br>
API テストの最大実行時間 (ミリ秒単位)。デフォルトは 1 分 (60 * 1000) です。

**注**: プライベートロケーションのコンテナは、ログをコンテナ内に保存せずに、`stdout` および `stderr` に出力します。

### ネットワークセキュリティ構成 {#network-security-configuration}

プライベートロケーションは、構成でエグレスが制限されていない限り、そのホストがリーチ可能なあらゆるネットワークアドレスにリーチできます。新しいプライベートロケーション用に生成された構成ファイルでは、`enableDefaultBlockedIpRanges` が `true` に設定されます。ワーカーのデフォルトは `false` です。以下のオプションでエグレスを制限します。

`allowedIPRanges`、`blockedIPRanges`、`enableDefaultBlockedIpRanges`、`allowedDomainNames`、`blockedDomainNames`

Datadog では、`enableDefaultBlockedIpRanges` を `true` に設定したままにし、テストに必要なアドレスのみを許可することを推奨しています。推奨設定と例については、[プライベートロケーションネットワークのセキュリティ強化][6]を参照してください。

## すべての構成オプション {#all-configuration-options}

`--accessKey`
: **タイプ**: 文字列 <br>
**デフォルト**: `none`<br>
Datadog API 認証用のアクセスキー。

`--secretAccessKey`
: **タイプ**: 文字列 <br>
**デフォルト**: `none`<br>
Datadog API 認証用のシークレットアクセスキー。

`--datadogApiKey`
: **タイプ**: 文字列 <br>
**デフォルト**: `none`<br>
ブラウザテストのアーティファクト (スクリーンショットなど) を送信するための Datadog API キー。

`--privateKey`
: **タイプ**: 配列 <br>
**デフォルト**: `none`<br>
テスト構成の復号化に使用する秘密鍵。

`--publicKey`
: **タイプ**: 配列 <br>
**デフォルト**: `none`<br>
テスト結果の暗号化に Datadog が使用する公開鍵。`--publicKey.pem` で構成されています。

`--site`
: **タイプ**: 文字列 <br>
**デフォルト**: `datadoghq.com`<br>
プライベートロケーションがテスト構成を取得し、テスト結果を送信する Datadog サイト。ご利用のサイトは {{< region-param key="dd_site" code="true" >}}です。

`--concurrency`
: **タイプ**: 数値 <br>
**デフォルト**: `10`<br>
並列実行されるテストの最大数。

`--maxNumberMessagesToFetch`
: **タイプ**: 数値 <br>
**デフォルト**: `10`<br>
Datadog から取得されるテストの最大数。

`--proxyDatadog`
: **タイプ**: 文字列 <br>
**デフォルト**: `none`<br>
プライベートロケーションが Datadog にリクエストを送信するために使用するプロキシ URL (例: `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`)。

`--dumpConfig`
: **タイプ**: ブール値 <br>
**デフォルト**: `none`<br>
シークレットなしのワーカー構成パラメーターを表示します。

`--enableStatusProbes`
: **タイプ**: ブール値 <br>
プライベートロケーションプローブのレディネスおよびライブネスを有効にします。これにより、: `http://127.0.0.1:8080/liveness` と `http://127.0.0.1:8080/readiness` の 2 つのエンドポイントが有効になります。

`--statusProbesPort`
: **タイプ**: 数値 <br>
**デフォルト**: `8080`<br>
プライベートロケーションのステータスプローブのポートを上書きします。

`--config`
: **タイプ**: 文字列 <br>
**デフォルト**: `/etc/datadog/synthetics-check-runner.json`</br>
**Windows**: `C:\ProgramData\Datadog-Synthetics\worker-config.json`</br>
JSON 構成ファイルへのパス。

`--proxyTestRequests`
: **タイプ**: 文字列 <br>
**デフォルト**: `none`<br>
プライベートロケーションがエンドポイントにテストリクエストを送信するために使用するプロキシ URL。PAC ファイルは、`pac+https://...` または `pac+http://...` の構文でサポートされています。

`proxyTestRequestsBypassList`
: **タイプ**: 文字列の配列 <br>
**デフォルト**: `none`<br>
`proxyTestRequests` で定義されたプロキシを使用しないホスト。例: `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`。

`--proxyIgnoreSSLErrors`
: **タイプ**: ブール値 <br>
**デフォルト**: `false`<br>
プライベートロケーションが Datadog にリクエストを送信するためにプロキシを使用している場合、SSL エラーを無視します。

`--dnsUseHost`
: **タイプ**: ブール値 <br>
**デフォルト**: `true`<br>
まずホストのローカル DNS 構成 (例: `etc/resolv.conf` ファイルの構成) を使用し、次に `dnsServer` パラメーターで指定された DNS サーバーを使用します。

`--dnsServer`
: **タイプ**: 文字列の配列 <br>
**デフォルト**: `["8.8.8.8","1.1.1.1"]`<br>
指定された順序で使用する DNS サーバーの IP (例: `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`)。

`--variableOverride`
: **タイプ**: 文字列 <br>
プライベートロケーションで実行されるテストで使用される変数を上書きします。形式: `VARIABLE=value`。
この方法でインポートされたすべての変数は難読化されます。

`--environmentVariableOverride`
: **タイプ**: 文字列 <br>
プライベートロケーションで実行されるテストで使用される変数を環境変数で上書きします。これには、コンテナ化環境で環境変数をインポートする必要があります。
例えば、Docker の場合、`docker run --env VARIABLE gcr.io/datadoghq/synthetics-private-location-worker --environmentVariableOverride VARIABLE` となります。
この方法でインポートされたすべての変数は難読化されます。

`--retryAPIErrors`
: **タイプ**: ブール値 <br>
**デフォルト**: `false`<br>
API テストで発生したエラーを再試行する

`--allowedIPRanges`
: **タイプ**: 文字列の配列 <br>
**デフォルト**: `none`<br>
`--enableDefaultBlockedIpRanges` または `blockedIPRanges` を通じてブロックされた IP 範囲のうち、特定の IP アドレスおよび/または CIDR へのアクセスを許可します (例: `"allowedIPRanges.4": "10.0.0.0/8"`)。**注:** `allowedIPRanges` は `blockedIPRanges` よりも優先されます。[プライベートロケーションネットワークのセキュリティ強化][6]を参照してください。

`--blockedIPRanges`
: **タイプ**: 文字列の配列 <br>
**デフォルト**: `none`<br>
`--enableDefaultBlockedIpRanges` パラメーターを `true` に設定してブロックされる IP 範囲に加える場合も加えない場合も、特定の IP アドレスや CIDR へのアクセスをブロックします (例: `--blockedIPRanges.4="127.0.0.0/8" --blockedIPRanges.6="::1/128"`)。`--allowedDomainNames` パラメーターで設定された許可ドメイン名は、`--blockedIPRanges` によってブロックされた IP 範囲をバイパスします。[プライベートロケーションネットワークのセキュリティ強化][6]を参照してください。

`--enableDefaultBlockedIpRanges`
: **タイプ**: ブール値 <br>
**デフォルト**: `false`<br>
`--allowedIPRanges` または `--allowedDomainNames` パラメーターで明示的に設定されたものを除き、予約済み IP 範囲 (IANA [IPv4][4] および [IPv6][5] Special-Purpose Address Registry) を使用するエンドポイントに対してユーザーが Synthetic テストを作成できないようにします。新しいプライベートロケーション用に生成された構成ファイルでは、このパラメーターが `true` に設定されます。ワーカーのデフォルトは `false` です。[プライベートロケーションネットワークのセキュリティ強化][6]を参照してください。

`--allowedDomainNames`
: **タイプ**: 配列 <br>
**デフォルト**: `none`<br>
テストで使用するドメイン名へのアクセスを許可します。`--blockedDomainNames` よりも優先されます。例: `--allowedDomainNames="*.example.com"`。ドメイン名は完全なホスト名と一致し、`*` ワイルドカードをサポートします。許可されたドメイン名は、`--enableDefaultBlockedIpRanges` によってブロックされた予約済み IP 範囲を含め、IP ブロックリストをバイパスします。[プライベートロケーションネットワークのセキュリティ強化][6]を参照してください。

`--blockedDomainNames`
: **タイプ**: 配列 <br>
**デフォルト**: `none`<br>
テストで使用するドメイン名へのアクセスを拒否します。例: `--blockedDomainNames="example.org" --blockedDomainNames="*.com"`。[プライベートロケーションネットワークのセキュリティ強化][6]を参照してください。

`--enableIPv6`
: **タイプ**: ブール値 <br>
**デフォルト**: `false`<br>
IPv6 を使用してテストを実行します。**注**: Docker での IPv6 は、Linux ホストでのみサポートされています。

`--version`
: **タイプ**: ブール値 <br>
**デフォルト**: `none`<br>
ワーカーのバージョン番号を表示します。

`--logFormat`
: **タイプ**: 文字列 <br>
**デフォルト**: `pretty`<br>
ログ出力を、`"compact"`、`"pretty"`、`"pretty-compact"`、`"json"` のいずれかの形式にします。ログ形式を `json` に設定すると、Datadog で収集された際にこれらのログが自動的に解析されるようになります。

`--verbosity`
: **タイプ**: 数値 <br>
**デフォルト**: `3`<br>
詳細レベルは `1` (エラーのみ) から `4` (デバッグログ以上) までです。コマンドラインからの詳細レベルの設定は、`-v`、`-vv`、`-vvv`、および `-vvvv` 引数で行われます。<br><br>
詳細レベル | CLI 引数 | JSON 構成オプション
-- | -- | --
DEBUG | `-vvvv` | `"verbosity": 4`
INFO (デフォルト) | `-vvv` | `"verbosity": 3`
WARNING | `-vv` | `"verbosity": 2`
ERROR | `-v` | `"verbosity": 1`

`--help`
: **タイプ**: ブール値 <br>
**デフォルト**: `none`<br>
ヘルプコマンドの出力を表示します。

## 環境変数 {#environment-variables}
コマンドオプションは、`DATADOG_API_KEY="...", DATADOG_WORKER_CONCURRENCY="15", DATADOG_TESTS_DNS_USE_HOST="true"` などの環境変数を使用して設定することもできます。複数の引数を受け入れるオプションには、JSON 文字列配列表記 (`DATADOG_TESTS_DNS_SERVER='["8.8.8.8", "1.1.1.1"]'`) を使用します
### サポートされている環境変数: {#supported-environment-variables}
`DATADOG_ACCESS_KEY`、`DATADOG_API_KEY`、`DATADOG_PRIVATE_KEY`、`DATADOG_PUBLIC_KEY_PEM`、`DATADOG_SECRET_ACCESS_KEY`、`DATADOG_SITE`、`DATADOG_WORKER_CONCURRENCY`、`DATADOG_WORKER_LOG_FORMAT`、`DATADOG_WORKER_LOG_VERBOSITY`、`DATADOG_WORKER_MAX_NUMBER_MESSAGES_TO_FETCH`、`DATADOG_WORKER_PROXY`、`DATADOG_TESTS_DNS_SERVER`、`DATADOG_TESTS_DNS_USE_HOST`、`DATADOG_TESTS_PROXY`、`DATADOG_TESTS_PROXY_ENABLE_CONNECT_TUNNEL`、`DATADOG_TESTS_PROXY_IGNORE_SSL_ERRORS`、`DATADOG_ALLOWED_IP_RANGES_4`、`DATADOG_ALLOWED_IP_RANGES_6`、`DATADOG_BLOCKED_IP_RANGES_4`、`DATADOG_BLOCKED_IP_RANGES_6`、`DATADOG_ENABLE_DEFAULT_WINDOWS_FIREWALL_RULES`、`DATADOG_ALLOWED_DOMAIN_NAMES`、`DATADOG_BLOCKED_DOMAIN_NAMES`、`DATADOG_WORKER_ENABLE_STATUS_PROBES`、`DATADOG_WORKER_STATUS_PROBES_PORT`

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[2]: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config
[3]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[4]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[5]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
[6]: /ja/synthetics/platform/private_locations/network_security