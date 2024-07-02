---
title: プライベートロケーションコンフィギュレーション
kind: ドキュメント
description: プライベートロケーションを構成します。
aliases:
- /synthetics/private_locations/configuration
further_reading:
- link: getting_started/incident_management/
  tag: ドキュメント
  text: プライベートロケーションの概要
- link: synthetics/private_locations/dimensioning
  tag: ドキュメント
  text: プライベートロケーションのディメンション化
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
synthetics-private-location.exe --help
```
{{% /tab %}}
{{< /tabs >}}

## プライベートロケーションをカスタマイズする
利用可能なパラメーターを以下に示します。
プライベートロケーションのこれらの構成オプションは、**JSON コンフィギュレーションファイルにパラメーター**として渡したり、**起動コマンドの引数**として渡すことができます。例:

{{< tabs >}}
{{% tab "Docker" %}}
```shell
docker run --rm -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest --logFormat=json
```
{{% /tab %}}
{{% tab "Windows" %}}
```cmd
synthetics-private-location.exe --config=<PathToYourConfiguration> --logFormat=json
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

### プロキシのコンフィギュレーション

`proxyDatadog`
: **種類**: 文字列 <br>
**デフォルト**: `none`<br>
Datadog にリクエストを送信するためにプライベートロケーションで使用されるプロキシ URL (例: `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`)。

**注:** HTTPS プロキシをセットアップする場合、プロキシへの `HTTP CONNECT` リクエストはプライベートロケーションと Datadog 間の最初の TCP 接続を確立します。HAProxy のように `HTTP CONNECT` リクエストを Datadog に送るリバースプロキシはサポートされていません。プライベートロケーションに代わって Datadog への接続を開くフォワードプロキシをセットアップします。

`proxyTestRequests`
: **型**: 文字列 <br>
**デフォルト**: `none`<br>
エンドポイントにテストリクエストを送信するためにプライベートロケーションで使用されるプロキシ URL。PAC ファイルは `pac+https://...` または `pac+http://...` の構文でサポートされています。

`proxyIgnoreSSLErrors`
: **種類**: ブール値<br>
**デフォルト**: `false`<br>
プライベートロケーションがプロキシを使用して Datadog にリクエストを送信している場合は、SSL エラーを破棄します。

**注:** `proxy` パラメーターは非推奨であるため、`proxyDatadog` に置き換える必要があります。

### 高度なコンフィギュレーション

`concurrency`
: **種類**: 数字<br>
**デフォルト**: `10`<br>
並列で実行されるテストの最大数。

`maxNumberMessagesToFetch`
: **タイプ**: 数字 <br>
**デフォルト**: `10`<br>
Datadog から取得されるテストの最大数。

**注**: プライベートロケーションのコンテナは、コンテナ内に保存せずに `stdout` と `stderr` へ出力します。

## すべてのコンフィギュレーションオプション

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
テスト構成の復号化に使用される非公開キー。

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

`--disableFipsCompliance`
: **型:** ブール値 <br>
**デフォルト**: `false`<br>
`ddog-gov.com` を使用するプライベートロケーションでの FIPS 準拠を無効にします。
デフォルトでは、`ddog-gov.com` にレポートするプライベートロケーションは、FIPS 準拠の暗号化を使用して Datadog と通信します。この通信は、FIPS 140-2 で検証された [Cryptographic Module - Certificate #4282][3] を使用することで準拠します。このオプションは、`ddog-gov.com` にレポートする Windows プライベートロケーションを使用している場合に必要です。

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
: **タイプ**: 文字列 <br>
**デフォルト**: `/etc/datadog/synthetics-check-runner.json`<br>
JSON コンフィギュレーションファイルへのパス。

`--proxyTestRequests`
: **型**: 文字列 <br>
**デフォルト**: `none`<br>
エンドポイントにテストリクエストを送信するためにプライベートロケーションで使用されるプロキシ URL。PAC ファイルは `pac+https://...` または `pac+http://...` の構文でサポートされています。

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
: **タイプ**: 文字列 <br>
プライベートロケーションで実行するテストで使用する変数を環境変数でオーバーライドします。環境変数がコンテナ環境でインポートされている必要があります。
Docker の場合、例えば `docker run --env VARIABLE gcr.io/datadoghq/synthetics-private-location-worker --environmentVariableOverride VARIABLE` とします。
この方法でインポートされた変数はすべて難読化されます。

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
: **Type**: Number <br>
**Default**: `3`<br>
Verbosity level from `1` (errors only) to `4` (debug logs and above). Setting the verbosity from the command line is done with `-v`, `-vv`, `-vvv`, and `-vvvv` arguments.<br><br>
Verbosity level | CLI argument | JSON config option
-- | -- | --
DEBUG | `-vvvv` | `"verbosity": 4`
INFO (default) | `-vvv` | `"verbosity": 3`
WARNING | `-vv` | `"verbosity": 2`
ERROR | `-v` | `"verbosity": 1`

`--help`
: **タイプ**: ブール値 <br>
**デフォルト**: `none`<br>
help コマンドの出力を表示します。

## 環境変数
コマンドオプションは、`DATADOG_API_KEY="...", DATADOG_WORKER_CONCURRENCY="15", DATADOG_DNS_USE_HOST="true"` のような環境変数を使用しても設定できます。複数の引数を受け付けるオプションの場合は、JSON 文字列配列記法 (`DATADOG_TESTS_DNS_SERVER='["8.8.8.8", "1.1.1.1"]'`) を使用します
### 対応環境変数:
`DATADOG_ACCESS_KEY`、`DATADOG_API_KEY`、`DATADOG_PRIVATE_KEY`、`DATADOG_PUBLIC_KEY_PEM`、`DATADOG_SECRET_ACCESS_KEY`、`DATADOG_SITE`、`DATADOG_WORKER_CONCURRENCY`、`DATADOG_WORKER_LOG_FORMAT`、`DATADOG_WORKER_LOG_VERBOSITY`、`DATADOG_WORKER_MAX_NUMBER_MESSAGES_TO_FETCH`、`DATADOG_WORKER_PROXY`、`DATADOG_TESTS_DNS_SERVER`、`DATADOG_TESTS_DNS_USE_HOST`、`DATADOG_TESTS_PROXY`、`DATADOG_TESTS_PROXY_IGNORE_SSL_ERRORS`、`DATADOG_ALLOWED_IP_RANGES_4`、`DATADOG_ALLOWED_IP_RANGES_6`、`DATADOG_BLOCKED_IP_RANGES_4`, `DATADOG_BLOCKED_IP_RANGES_6`、`DATADOG_ENABLE_DEFAULT_WINDOWS_FIREWALL_RULES`、`DATADOG_ALLOWED_DOMAIN_NAMES`、`DATADOG_BLOCKED_DOMAIN_NAMES`、`DATADOG_WORKER_ENABLE_STATUS_PROBES`、`DATADOG_WORKER_STATUS_PROBES_PORT`

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[2]: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config
[3]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[4]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[5]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
