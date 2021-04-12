---
title: Synthetics メトリクス
kind: ドキュメント
description: これらのメトリクスは Synthetic モニタリングテストによって生成されます。
---
## メトリクス

次のメトリクスは、Synthetics モニタリングテストによって生成されます。

メトリクスが

* `synthetics.browser.*` で始まる場合、[ブラウザテスト][1]から取得されます
* `synthetics.api.*` で始まる場合、API テストから取得されます
* `synthetics.http.*` で始まる場合、API [HTTP テスト][2]から取得されます
* `synthetics.tcp.*` で始まる場合、API [TCP テスト][3]から取得されます
* `synthetics.dns.*` で始まる場合、API [DNS テスト][4]から取得されます
* `synthetics.ssl.*` で始まる場合、API [SSL テスト][5]から取得されます

### ブラウザテスト

{{< get-metrics-from-git "synthetics" "synthetics.browser" >}}

### API テスト

{{< get-metrics-from-git "synthetics" "synthetics.api" >}}

#### HTTP テスト

{{< get-metrics-from-git "synthetics" "synthetics.http" >}}

#### TCP テスト

{{< get-metrics-from-git "synthetics" "synthetics.tcp" >}}

#### DNS テスト

{{< get-metrics-from-git "synthetics" "synthetics.dns" >}}

#### SSL テスト

{{< get-metrics-from-git "synthetics" "synthetics.ssl" >}}

[1]: /ja/synthetics/browser_tests/
[2]: /ja/synthetics/api_tests/?tab=httptest
[3]: /ja/synthetics/api_tests/?tab=tcptest
[4]: /ja/synthetics/api_tests/?tab=dnstest
[5]: /ja/synthetics/api_tests/?tab=ssltest