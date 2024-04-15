---
further_reading:
- link: /integrations/java/
  tag: Documentation
  text: Java インテグレーション
- link: https://www.datadoghq.com/blog/easy-jmx-discovery-browsing-open-source-agent/
  tag: ブログ
  text: オープンソース Agent で JMX を簡単に検出し、参照する

title: jConsole の JMX データを表示し、収集するように jmx.yaml をセットアップするには
---

この記事では、jConsole からのメトリクスデータを有効な Datadog Agent 構成ファイル (`jmx.yaml`) に変換する例を 2 つご紹介します。

1 つ目の例は、`domain -> type -> bean -> attribute` の変換を示します。

{{< img src="integrations/faq/jConsolejmx.png" alt="jConsolejmx" >}}

2 つ目の例は、 `domain -> bean -> attribute` の変換を示します。

{{< img src="integrations/faq/jConsolejmx2.png" alt="jConsolejmx" >}}

Datadog Agent で JMX メトリクスを送信するように設定できたら、[メトリクスエクスプローラー][1]を使用して、メトリクスが Datadog に送信されていることを確認します。下の例では、メトリクスをタグでフィルタリングする方法をご紹介しています。

{{< img src="integrations/faq/jmxGraphMetric.png" alt="jmxGraphMetric" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/metrics/explorer/
