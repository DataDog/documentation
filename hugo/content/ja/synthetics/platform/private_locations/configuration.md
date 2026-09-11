---
aliases:
- /ja/synthetics/private_locations/configuration
description: プライベートロケーションを構成します。
further_reading:
- link: getting_started/incident_management/
  tag: ドキュメント
  text: プライベートロケーションの概要
- link: synthetics/private_locations/dimensioning
  tag: ドキュメント
  text: プライベートロケーションのディメンション化
title: プライベートロケーションコンフィギュレーション
---

## 概要

Synthetic プライベートロケーションには、環境要件に合わせて構成できる一連のオプションが付属しています。[プライベートロケーションワーカー][1]のオプションはすべて、`help` コマンドを実行すると確認できます。

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

例については [Datadog Helm リポジトリ][1] を参照してください。

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location

{{% /tab %}}
{{< /tabs >}}

## プライベートロケーションをカスタマイズする
利用可能なパラメーターを以下に示します。
プライベートロケーションのこれらの構成オプションは、**JSON コンフィギュレーションファイルにパラメーター**として渡したり、**起動コマンドの引数**として渡すことができます。例:

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

起動コマンドで設定された引数は、コンフィギュレーションファイルよりも優先されます。ただし、これらのオプションは保存されないため、特定の起動にのみ関連します。

## トップ構成オプション

### Datadog サイトコンフィギュレーション

`site`
: **種類**: 文字列 <br>
**デフォルト**: `datadoghq.com`<br>
プライベートロケーションがテストコンフィギュレーションをプルし、テスト結果をプッシュする Datadog サイト。`site` は {{< region-param key="dd_site" code="true" >}} です。

### DNS コンフィギュレーション

以下のパラメーターは API テストで DNS 解決をカスタマイズするために使用されます。

`dnsUseHost`
: **種類**: ブール値 <br>
**デフォルト**: `true`<br>
最初にホストのローカル DNS コンフィギュレーション (たとえば、`etc/resolv.conf` ファイルのコンフィギュレーション) を使用し、次に `dnsServer` パラメーターで指定した DNS サーバーを使用します。

`dnsServer`
: **種類**: 文字列の配列 <br>
**デフォルト**: `["8.8.8.8","1.1.1.1"]`<br>
指定した順序で使用する DNS サーバーの IP (例: `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`)。

ブラウザテストの場合、DNS 解決はブラウザにより直接行われ、ホストから DNS サーバーが読み込まれます。また、コンテナレベルでこの構成を行うこともできます (例: [Docker][1] の `--dns` フラグ、または [Kubernetes][2] の `dnsConfig.nameservers` を使用する) 。

### プロキシ構成

次のパラメーターを使って、Datadog への接続に使用するプロキシを設定できます:

`proxyDatadog`
: **種類**: 文字列 <br>
**デフォルト**: `none`<br>
Datadog にリクエストを送信するためにプライベートロケーションで使用されるプロキシ URL (例: `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`)。

`proxyIgnoreSSLErrors`
: **種類**: ブール値<br>
**デフォルト**: `false`<br>
プライベートロケーションがプロキシを使用して Datadog にリクエストを送信している場合は、SSL エラーを破棄します。

`proxyEnableConnectTunnel`
: **タイプ**: Boolean <br>
**デフォルト**: `none`<br>
HTTP プロキシ向けに `HTTP CONNECT` トンネリングを有効にします。このオプションを設定しない場合、`HTTP CONNECT` トンネリングは HTTPS プロキシでのみ使用されます。

**注**: Squid のような HTTP フォワード プロキシでは、プライベート ロケーションと Datadog の間で初期 TCP 接続を確立するために `HTTP CONNECT` リクエストが必要になることがあります。そのため、`proxyEnableConnectTunnel` パラメーターを `true` に設定してください。ただし、`HTTP CONNECT` リクエストを Datadog に中継する HAProxy のようなリバース プロキシでは、このオプションを有効にすると動作しない場合があります。

**注:** `proxy` パラメーターは非推奨であるため、`proxyDatadog` に置き換える必要があります。

次のパラメーターを使って、Synthetic Monitoring テストで使用するデフォルトのプロキシを設定できます:

`proxyTestRequests`
: **タイプ**: String <br>
**デフォルト**: `none`<br>
プライベート ロケーションがエンドポイントにテスト リクエストを送信する際に使用するプロキシ URL です。HTTP(S), SOCKS, および PAC ファイルに対応しており、次の構文を使用します: `pac+http://...`, `pac+https://...`, `pac+file://...`, `pac+data:...`。

`proxyTestRequestsBypassList`
: **タイプ**: Array of Strings <br>
**デフォルト**: `none`<br>
`proxyTestRequests` で定義したプロキシを使用しないホストの一覧です。例: `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`。

### 高度なコンフィギュレーション

`concurrency`
: **種類**: 数字<br>
**デフォルト**: `10`<br>
並列で実行されるテストの最大数。

`maxNumberMessagesToFetch`
: **タイプ**: 数字 <br>
**デフォルト**: `10`<br>
Datadog から取得されるテストの最大数。

`maxAPIDownloadBodySize`
: **タイプ**: Number <br>
**デフォルト**: `52428800`<br>
ダウンロード時の HTTP ボディの最大サイズ (バイト) です。デフォルトは 50 MB (50 * 1024 * 1024) です。

`maxAPIBodySizeIfProcessed`
: **タイプ**: Number <br>
**デフォルト**: `5242880`<br>
アサーションで扱う HTTP ボディの最大サイズ (バイト) です。デフォルトは 5 MB (5 * 1024 * 1024) です。

`apiRequestMaxTimeout`
: **タイプ**: Number <br>
**デフォルト**: `60000`<br>
API テストの実行時間の上限 (ミリ秒) です。デフォルトは 1 分 (60 * 1000) です。

**注**: プライベートロケーションのコンテナは、コンテナ内に保存せずに `stdout` と `stderr` へ出力します。

## すべてのコンフィギュレーションオプション

`--accessKey`
: **タイプ**: 文字列 <br>
**デフォルト**: `none`<br>
Datadog API 認証用のアクセスキー。

`--secretAccessKey`
: **タイプ**: String <br>
**デフォルト**: `none`<br>
Datadog API 認証に使用するシークレット アクセス キーです。

`--datadogApiKey`
: **タイプ**: String <br>
**デフォルト**: `none`<br>
ブラウザ テストのアーティファクト (スクリーンショットなど) を送信するための Datadog API キーです。

`--privateKey`
: **タイプ**: Array <br>
**デフォルト**: `none`<br>
テスト設定の復号に使用する秘密鍵です。

`--publicKey`
: **タイプ**: 配列 <br>
**デフォルト**: `none`<br>
Datadog がテスト結果の暗号化に使用する公開キー。`--publicKey.pem` で構成されます。

`--site`
: **タイプ**: 文字列 <br>
**デフォルト**: `datadoghq.com`<br>
プライベートロケーションがテスト構成をプルし、テスト結果をプッシュする Datadog サイト。あなたのサイトは {{< region-param key="dd_site" code="true" >}} です。

`--concurrency`
: **タイプ**: 数字 <br>
**デフォルト**: `10`<br>
並列で実行されるテストの最大数。

`--maxNumberMessagesToFetch`
: **タイプ**: 数字 <br>
**デフォルト**: `10`<br>
Datadog からフェッチされるテストの最大数。

`--proxyDatadog`
: **タイプ**: 文字列 <br>
**デフォルト**: `none`<br>
プライベートロケーションが Datadog にリクエストを送信するために使用するプロキシ URL (例: `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`)。

`--dumpConfig`
: **タイプ**: ブール値 <br>
**デフォルト**: `none`<br>
シークレットなしでワーカーの構成パラメーターを表示します。

`--enableStatusProbes`
: **タイプ**: ブール値 <br>
プライベートロケーションプローブの readiness と liveness を有効にします。これは 2 つのエンドポイント、`http://127.0.0.1:8080/liveness` と `http://127.0.0.1:8080/readiness` を有効にします。

`--statusProbesPort`
: **タイプ**: 数字 <br>
**デフォルト**: `8080`<br>
プライベートロケーションのステータスプローブのポートをオーバーライドします。

`--config`
: **タイプ**: String <br>
**デフォルト**: `/etc/datadog/synthetics-check-runner.json`</br>
**Windows**: `C:\ProgramData\Datadog-Synthetics\worker-config.json`</br>
JSON 構成ファイルへのパスです。

`--proxyTestRequests`
: **型**: 文字列 <br>
**デフォルト**: `none`<br>
エンドポイントにテストリクエストを送信するためにプライベートロケーションで使用されるプロキシ URL。PAC ファイルは `pac+https://...` または `pac+http://...` の構文でサポートされています。

`proxyTestRequestsBypassList`
: **タイプ**: Array of Strings <br>
**デフォルト**: `none`<br>
`proxyTestRequests` で定義したプロキシを使用しないホストの一覧です。例: `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`。

`--proxyIgnoreSSLErrors`
: **タイプ**: ブール値 <br>
**デフォルト**: `false`<br>
プライベートロケーションが Datadog へのリクエスト送信にプロキシを使用している場合、SSL エラーを破棄します。

`--dnsUseHost`
: **タイプ**: ブール値 <br>
**デフォルト**: `true`<br>
最初にホストのローカル DNS の構成 (例えば、`etc/resolv.conf` ファイルの構成) を使用し、次に `dnsServer` パラメーターで指定された DNS サーバーを使用します。

`--dnsServer`
: **タイプ**: 文字列の配列<br>
**デフォルト**: `["8.8.8.8","1.1.1.1"]`<br>
指定された順序で使用する DNS サーバー IP (例: `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`)。

`--variableOverride`
: **タイプ**: 文字列 <br>
プライベートロケーションで実行するテストで使用する変数をオーバーライドします。フォーマットは `VARIABLE=value` です。
この方法でインポートされた変数はすべて難読化されます。

`--environmentVariableOverride`
: **タイプ**: String <br>
プライベート ロケーションで実行するテストで使用される変数を、環境変数で上書きします。この機能を使うには、コンテナ化された環境に環境変数を取り込んでおく必要があります。
たとえば Docker では、`docker run --env VARIABLE gcr.io/datadoghq/synthetics-private-location-worker --environmentVariableOverride VARIABLE` のように実行します。
この方法で取り込んだ変数はすべて難読化されます。

`--retryAPIErrors`
: **タイプ**: Boolean <br>
**デフォルト**: `false`<br>
API テストで発生したエラーをすべて再試行します。

`--allowedIPRanges`
: **タイプ**: 文字列の配列 <br>
**デフォルト**: `none`<br>
`--enableDefaultBlockedIpRanges` または `blockedIPRanges` によってブロックされた IP 範囲のうち、特定の IP および/または CIDR へのアクセスを許可します (例えば、`"allowedIPRanges.4": "10.0.0.0/8"`)。**注:** `allowedIPRanges` は `blockedIPRanges` よりも優先されます。

`--blockedIPRanges`
: **タイプ**: 文字列の配列 <br>
**デフォルト**: `none`<br>
`--enableDefaultBlockedIpRanges` パラメーターを `true` に設定したときにブロックされる IP 範囲に加えて (または加えずに)、特定の IP および/または CIDR へのアクセスをブロックします (例: `--blockedIPRanges.4="127.0.0.0/8" --blockedIPRanges.6="::1/128"`)。

`--enableDefaultBlockedIpRanges`
: **型**: ブール値 <br>
**デフォルト**: `false`<br>
`--allowedIPRanges` パラメーターで明示的に設定されたものを除いて、予約された IP 範囲 (IANA [IPv4][4] および [IPv6][5] Special-Purpose Address Registry) を使用しているエンドポイントでユーザーが Synthetic テストを作成できないようにします。

`--allowedDomainNames`
: **タイプ**: 配列 <br>
**デフォルト**: `none`<br>
テスト中のドメイン名へのアクセスを許可します。--blockedDomainNames よりも優先されます。例: `--allowedDomainNames="*.example.com"`

`--blockedDomainNames`
: **タイプ**: 配列 <br>
**デフォルト**: `none`<br>
テスト中のドメイン名へのアクセスを拒否します。例: `--blockedDomainNames="example.org" --blockedDomainNames="*.com"`

`--enableIPv6`
: **タイプ**: ブール値 <br>
**デフォルト**: `false`<br>
IPv6 を使用してテストを実施します。**注**: Docker の IPv6 は Linux ホストでのみサポートされています。

`--version`
: **タイプ**: ブール値 <br>
**デフォルト**: `none`<br>
ワーカーのバージョン番号を表示します。

`--logFormat`
: **タイプ**: 文字列 <br>
**デフォルト**: `pretty`<br>
ログ出力を `"compact"`、`"pretty"`、`"pretty-compact"`、`"json"` からフォーマットします。ログのフォーマットを `json` に設定することで、Datadog がログを収集する際に、これらのログが自動的にパースされるようにできます。

`--verbosity`
: **タイプ**: Number <br>
**デフォルト**: `3`<br>
詳細度レベルは `1` (エラーのみ) から `4` (デバッグ ログ以上) までです。コマンド ラインから詳細度を設定するには、`-v`, `-vv`, `-vvv`, `-vvvv` の各引数を使用します。<br><br>
詳細度レベル | CLI 引数 | JSON 設定オプション
-- | -- | --
DEBUG | `-vvvv` | `"verbosity": 4`
INFO (デフォルト) | `-vvv` | `"verbosity": 3`
WARNING | `-vv` | `"verbosity": 2`
ERROR | `-v` | `"verbosity": 1`

`--help`
: **タイプ**: ブール値 <br>
**デフォルト**: `none`<br>
help コマンドの出力を表示します。

## 環境変数
コマンド オプションは、`DATADOG_API_KEY="...", DATADOG_WORKER_CONCURRENCY="15", DATADOG_TESTS_DNS_USE_HOST="true"` のような環境変数でも設定できます。複数の引数を受け付けるオプションでは、JSON 文字列配列の表記を使用してください (`DATADOG_TESTS_DNS_SERVER='["8.8.8.8", "1.1.1.1"]'`)。
### 対応環境変数:
`DATADOG_ACCESS_KEY`, `DATADOG_API_KEY`, `DATADOG_PRIVATE_KEY`, `DATADOG_PUBLIC_KEY_PEM`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_SITE`, `DATADOG_WORKER_CONCURRENCY`, `DATADOG_WORKER_LOG_FORMAT`, `DATADOG_WORKER_LOG_VERBOSITY`, `DATADOG_WORKER_MAX_NUMBER_MESSAGES_TO_FETCH`, `DATADOG_WORKER_PROXY`, `DATADOG_TESTS_DNS_SERVER`, `DATADOG_TESTS_DNS_USE_HOST`, `DATADOG_TESTS_PROXY`, `DATADOG_TESTS_PROXY_ENABLE_CONNECT_TUNNEL`, `DATADOG_TESTS_PROXY_IGNORE_SSL_ERRORS`, `DATADOG_ALLOWED_IP_RANGES_4`, `DATADOG_ALLOWED_IP_RANGES_6`, `DATADOG_BLOCKED_IP_RANGES_4`, `DATADOG_BLOCKED_IP_RANGES_6`, `DATADOG_ENABLE_DEFAULT_WINDOWS_FIREWALL_RULES`, `DATADOG_ALLOWED_DOMAIN_NAMES`, `DATADOG_BLOCKED_DOMAIN_NAMES`, `DATADOG_WORKER_ENABLE_STATUS_PROBES`, `DATADOG_WORKER_STATUS_PROBES_PORT`

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[2]: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config
[3]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[4]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[5]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml