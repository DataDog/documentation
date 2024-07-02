---
title: Synthetic Monitoring & Continuous Testing メトリクス
description: これらのメトリクスは Synthetic モニタリングテストによって生成されます。
aliases:
- /synthetics/metrics/
further_reading:
- link: /synthetics/guide/api_test_timing_variations/
  tag: ドキュメント
  text: API テストのタイミングとバリエーションについて
- link: /synthetics/guide/using-synthetic-metrics/
  tag: ドキュメント
  text: Synthetic メトリクスのモニターでの使用について
- link: /continuous_testing/settings
  tag: ドキュメント
  text: Continuous Testing のための並列化について
---

## 概要

次のメトリクスは、Synthetic Monitoring テストと Continuous Testing 設定によって生成されます。

メトリクスが

* `synthetics.test_runs` で始まる場合、すべての Synthetic テストから取得されます
* `datadog.estimated_usage.synthetics.*` で始まる場合、Synthetic テストから関連する使用状況データを返します
* `synthetics.on_demand` は、[Continuous Testing](#continuous-testing) に関連する使用量データを返します。

メトリクスが

* `synthetics.api.*` で始まる場合、[API テスト][1]から取得されます
    * `synthetics.http.*` で始まる場合、API [HTTP テスト][2]から取得されます
    * `synthetics.ssl.*` で始まる場合、API [SSL テスト][3]から取得されます
    * `synthetics.dns.*` で始まる場合、API [DNS テスト][4]から取得されます
    * `synthetics.websocket.*` で始まる場合、API [WebSocket テスト][5]から取得されます
    * `synthetics.tcp.*` で始まる場合、API [TCP テスト][6]から取得されます
    * `synthetics.udp.*` で始まる場合、API [UDP テスト][7]から取得されます
    * `synthetics.icmp.*` で始まる場合、API [ICMP テスト][8]から取得されます
* `synthetics.multi.*` で始まる場合、[マルチステップ API テスト][9]から取得されます
* `synthetics.browser.*` で始まる場合、[ブラウザテスト][10]から取得されます
* `synthetics.pl.*` で始まる場合、[プライベートロケーション][11]から取得されます

### 一般的なメトリクス

{{< get-metrics-from-git "synthetics" "synthetics.test_runs synthetics.test_run_steps datadog.estimated_usage.synthetics" >}}

### API テスト

{{< get-metrics-from-git "synthetics" "synthetics.api" >}}

#### HTTP テスト

{{< get-metrics-from-git "synthetics" "synthetics.http" >}}

#### SSL テスト

{{< get-metrics-from-git "synthetics" "synthetics.ssl" >}}

#### DNS テスト

{{< get-metrics-from-git "synthetics" "synthetics.dns" >}}

#### WebSocket テスト

{{< get-metrics-from-git "synthetics" "synthetics.websocket" >}}

#### TCP テスト

{{< get-metrics-from-git "synthetics" "synthetics.tcp" >}}

#### UDP テスト

{{< get-metrics-from-git "synthetics" "synthetics.udp" >}}

#### ICMP テスト

{{< get-metrics-from-git "synthetics" "synthetics.icmp" >}}

API テストのタイミングについて、詳しくは [API テストのタイミングとバリエーション][12]のガイドをご参照ください。

### マルチステップ API テスト

{{< get-metrics-from-git "synthetics" "synthetics.multi" >}}

### ブラウザテスト

{{< get-metrics-from-git "synthetics" "synthetics.browser" >}}

### プライベートロケーション

{{< get-metrics-from-git "synthetics" "synthetics.pl.worker" >}}

### Continuous Testing

{{< get-metrics-from-git "synthetics" "synthetics.on_demand.concurrency" >}}

並列化については、[Continuous Testing の設定][13]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/
[2]: /synthetics/api_tests/http_tests
[3]: /synthetics/api_tests/ssl_tests
[4]: /synthetics/api_tests/dns_tests
[5]: /synthetics/api_tests/websocket_tests
[6]: /synthetics/api_tests/tcp_tests
[7]: /synthetics/api_tests/udp_tests
[8]: /synthetics/api_tests/icmp_tests
[9]: /synthetics/multistep/
[10]: /synthetics/browser_tests/
[11]: /synthetics/private_locations/
[12]: /synthetics/guide/api_test_timing_variations/
[13]: /continuous_testing/settings/#parallelization
