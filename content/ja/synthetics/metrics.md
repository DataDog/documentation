---
title: Synthetics メトリクス
kind: ドキュメント
description: これらのメトリクスは Synthetic モニタリングテストによって生成されます。
---
## メトリクス

次のメトリクスは、Synthetics モニタリングテストによって生成されます。

メトリクスが

* `synthetics.api.*` で始まる場合、[API テスト][1]から取得されます
* `synthetics.http.*` で始まる場合、API [HTTP テスト][2]から取得されます
* `synthetics.ssl.*` で始まる場合、API [SSL テスト][3]から取得されます
* `synthetics.dns.*` で始まる場合、API [DNS テスト][4]から取得されます
* `synthetics.tcp.*` で始まる場合、API [TCP テスト][5]から取得されます
* `synthetics.browser.*` で始まる場合、[ブラウザテスト][6]から取得されます

### API テスト

{{< get-metrics-from-git "synthetics" "synthetics.api" >}}

#### HTTP テスト

{{< get-metrics-from-git "synthetics" "synthetics.http" >}}

#### SSL テスト

{{< get-metrics-from-git "synthetics" "synthetics.ssl" >}}

#### DNS テスト

{{< get-metrics-from-git "synthetics" "synthetics.dns" >}}

#### TCP テスト

{{< get-metrics-from-git "synthetics" "synthetics.tcp" >}}

#### ICMP テスト

{{< get-metrics-from-git "synthetics" "synthetics.icmp" >}}

API テストのタイミングについて、詳しくは [API テストのタイミングとバリエーション][7]のガイドをご参照ください。

### ブラウザテスト

{{< get-metrics-from-git "synthetics" "synthetics.browser" >}}

[1]: /ja/synthetics/api_tests/
[2]: /ja/synthetics/api_tests/http_tests
[3]: /ja/synthetics/api_tests/ssl_tests
[4]: /ja/synthetics/api_tests/dns_tests
[5]: /ja/synthetics/api_tests/tcp_tests
[6]: /ja/synthetics/browser_tests/
[7]: /ja/synthetics/guide/api_test_timing_variations/