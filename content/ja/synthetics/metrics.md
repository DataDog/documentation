---
title: Synthetics メトリクス
kind: ドキュメント
description: これらのメトリクスは Synthetic モニタリングテストによって生成されます。
---
## メトリクス

次のメトリクスは、Synthetics モニタリングテストによって生成されます。

メトリクスが

* `synthetics.browser.*` で始まる場合、[ブラウザテスト][1]から取得されます。
* `synthetics.http.*` で始まる場合、API [HTTP テスト][2]から取得されます。
* `synthetics.ssl.*` で始まる場合、API [SSL テスト][3]から取得されます。
* `synthetics.tcp.*` で始まる場合、API [TCP テスト][4]から取得されます。
* `synthetics.dns.*` で始まる場合、API [DNS テスト][5]から取得されます。

{{< get-metrics-from-git "synthetics" >}}

[1]: /ja/synthetics/browser_tests/
[2]: /ja/synthetics/api_tests/?tab=httptest
[3]: /ja/synthetics/api_tests/?tab=ssltest
[4]: /ja/synthetics/api_tests/?tab=tcptest
[5]: /ja/synthetics/api_tests/?tab=dnstest