---
title: プライベートロケーションコンフィギュレーション
kind: ドキュメント
description: プライベートロケーションを構成する
further_reading:
- link: getting_started/synthetics/private_location
  tag: Documentation
  text: プライベートロケーションの概要
- link: /synthetics/private_locations/
  tag: Documentation
  text: Synthetic テストをプライベートロケーションから実行する
---

## 概要

Synthetic プライベートロケーションには、環境要件に合わせて構成できる一連のオプションが付属しています。これらのオプションはすべて、以下の `help` コマンドを実行すると確認できます。

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```

次に、プライベートロケーションのコンフィギュレーションオプションを**パラメーターとして JSON コンフィギュレーションファイル**に渡すか、以下のように**起動コマンドの引数**として渡すことができます。

```shell
docker run --rm -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest --logFormat=json
```

**注:** 起動コマンドで設定された引数は、コンフィギュレーションファイルよりも優先されます。ただし、これらのオプションは保存されないため、特定の起動でのみ使用されます。

## コンフィギュレーションオプション

### Datadog サイトコンフィギュレーション

`site`
: **種類**: 文字列 <br>
**デフォルト**: `datadoghq.com`<br>
プライベートロケーションがテストコンフィギュレーションをプルし、テスト結果をプッシュする Datadog サイト。`site` は {{< region-param key="dd_site" code="true" >}} です。

### DNS コンフィギュレーション

以下 2 つのパラメーターは **API テスト**で DNS 解決をカスタマイズするために使用されます。

`dnsUseHost`
: **種類**: ブール値 <br>
**デフォルト**: `true`<br>
最初にホストのローカル DNS コンフィギュレーション (たとえば、`etc/resolv.conf` ファイルのコンフィギュレーション) を使用し、次に DNS サーバーがある場合は、`dnsServer` パラメーターで指定します。

`dnsServer`
: **種類**: 文字列の配列 <br>
**デフォルト**: `["8.8.8.8","1.1.1.1"]`<br>
指定した順序で使用する DNS サーバーの IP (例: `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`)。

**ブラウザテスト**の場合、DNS 解決はブラウザにより直接行われ、ホストから DNS サーバーが読み込まれます。また、コンテナレベルでこの構成を行うこともできます (例: [Docker][1] の `--dns` フラグ、または [Kubernetes][2] の `dnsConfig.nameservers` を使用する) 。

### 予約済み IP コンフィギュレーション

`enableDefaultBlockedIpRanges`
: **種類**: ブール値 <br>
**デフォルト**: `false`<br>
`allowedIPRanges` パラメーターで明示的に設定されていない限り、ユーザーが予約済み IP 範囲 (IANA [IPv4][3] および [IPv6][4] 専用アドレスレジストリ) を使用しているエンドポイントで Synthetic テストを作成できないようにします。

`allowedIPRanges`
: **種類**: 文字列の配列 <br>
**デフォルト**: `none`<br>
`enableDefaultBlockedIpRanges` または `blockedIPRanges` によってブロックされた IP 範囲のうち、特定の IP または CIDR あるいはその両方へのアクセスを許可します (例: `"allowedIPRanges.4": "10.0.0.0/8"`)。**注:** `allowedIPRanges` は `blockedIPRanges` よりも優先されます。

`blockedIPRanges`
: **種類**: 文字列の配列 <br>
**デフォルト**: `none`<br>
`enableDefaultBlockedIpRanges` パラメーターを `true` に設定すると、ブロックされた IP 範囲に加えて、特定の IP または CIDR あるいはその両方へのアクセスをブロックします (例: `--blockedIPRanges.4="127.0.0.0/8" --blockedIPRanges.6="::1/128"`)。

**注:** `whitelistedRange` および `blacklistedRange` パラメーターは非推奨になったため、上記のパラメーターに置き換える必要があります。

### プロキシのコンフィギュレーション

`proxyDatadog`
: **種類**: 文字列 <br>
**デフォルト**: `none`<br>
Datadog にリクエストを送信するためにプライベートロケーションで使用されるプロキシ URL (例: `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`)。

`proxyTestRequests`
: **種類**: 文字列 <br>
**デフォルト**: `none`<br>
エンドポイントにテストリクエストを送信するためにプライベートロケーションで使用されるプロキシ URL。

`proxyIgnoreSSLErrors`
: **種類**: ブール値<br>
**デフォルト**: `false`<br>
プライベートロケーションがプロキシを使用して Datadog にリクエストを送信している場合は、SSL エラーを破棄します。

**注:** `proxy` パラメーターは非推奨になったため、`proxyDatadog` に置き換える必要があります。

### 高度なコンフィギュレーション

`concurrency`
: **種類**: 数字<br>
**デフォルト**: `10`<br>
並列で実行されるテストの最大数。

`maxTimeout`
: **種類**: 数字<br>
**デフォルト**: `60000`<br>
API テストのテストの最大実行時間 (ミリ秒)。

## プライベートルート証明書

カスタムルート証明書をプライベートロケーションにアップロードして、API とブラウザのテストで独自の `.pem` ファイルを使用して SSL ハンドシェイクを実行することができます。プライベートロケーションコンテナを起動するときは、プライベートロケーションコンフィギュレーションファイルをマウントするのと同じ方法で、関連する証明書 `.pem` ファイルを `/etc/datadog/certs` にマウントします。これらの証明書は信頼できる CA と見なされ、テストの実行時にそのように使用されます。

**注**: この機能は、プライベートロケーション Docker イメージのバージョン 1.5.3 以降でサポートされています。

## プライベートロケーション管理者

`config`
: **種類**: 文字列 <br>
**デフォルト**: `/etc/datadog/synthetics-check-runner.json`<br>
JSON コンフィギュレーションファイルへのパス。

`logFormat`
: **種類**: 文字列 <br>
**デフォルト**: `pretty`<br>
`"pretty"` と `"json"` 間でログ出力をフォーマットします。ログフォーマットを `json` に設定すると、ログが Datadog によって収集された時点で自動的に解析できます。

`verbosity`
: **種類**: 数字<br>
**デフォルト**: `3`<br>
冗長レベル (例: `-v`、`-vv`、`-vvv`)。

`dumpConfig`
: **種類**: ブール値<br>
**デフォルト**: `none`<br>
シークレットなしでワーカーコンフィギュレーションパラメーターを表示します。

`dumpFullConfig`
: **種類**: ブール値<br>
**デフォルト**: `none`<br>
完全なワーカーコンフィギュレーションパラメーターを表示します。

`help`
: **種類**: ブール値<br>
**デフォルト**: `none`<br>
ヘルプを表示します。

**注**: プライベートロケーションのコンテナは、コンテナ内に保存せずに stdout/stderr へ出力します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/config/containers/container-networking/#dns-services
[2]: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config
[3]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[4]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
