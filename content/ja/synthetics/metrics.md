---
title: Synthetics メトリクス
kind: ドキュメント
description: これらのメトリクスは Synthetic モニタリングテストによって生成されます。
---
## メトリクス

次のメトリクスは、Synthetic モニタリングテストによって生成されます。

* `synthetics.browser.*` で始まるメトリクスは、[ブラウザテスト][1]から取得されます。
* `synthetics.http.*` で始まるメトリクスは、[API HTTP テスト][2]から取得されます。
* `synthetics.ssl.*` で始まるメトリクスは、[API SSL テスト][3]から取得されます。

{{< get-metrics-from-git "synthetics" >}}

[1]: /ja/synthetics/browser_tests/
[2]: /ja/synthetics/api_tests/?tab=httptest
[3]: /ja/synthetics/api_tests/?tab=ssltest