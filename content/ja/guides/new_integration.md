---
last_modified: 2017/02/24
translation_status: complete
language: ja
title: Officially Integrating with Datadog
kind: guide
listorder: 15
---

<!-- Being able to see all of your metrics from across your infrastructure is key within Datadog. While we do have guides to submit [custom metrics][1] via our [API][2] and [code instrumentation][3], it's possible you might want to see a certain source become an official integration. Overall, the largest deciding factor in what integrations we build is what our clients request.
-->

インフラストラクチャ全体からすべてのメトリックを見ることができることは、Datadog内で重要です。 GoogleのAPIとコード計測ツールを使用してカスタム指標を送信するガイドがありますが、特定のソースが公式の統合になることを望む可能性があります。全体的に、我々が構築する統合における最大の決定要因は、クライアントの要求です。


<!-- If you would like to propose an integration, please reach out to support@datadoghq.com and tell us what metrics you would like to see from that given source.
 -->

統合を提案したい場合は、support@datadoghq.comに連絡して、そのソースからどのような指標を見たいか教えてください。


<!-- If you manage or work with a service and would like to see Datadog integrate it, the following information is needed:

  * How will data get into Datadog? There are currently three options:
    1. Push data from the source to Datadog
    2. Crawl the data source's API
    3. Have the Datadog Agent pick up the information from the source
  * What are the metrics and tags should be picked up from the source?
  * What metrics should be included on the default dashboard that we generate for each integration?

We will also need a short blurb describing the integration as well as the correct image to use across our site. -->

あなたがサービスを管理したり、サービスを利用していて、Datadogがそのサービスを統合して見たい場合は、以下の情報が必要です。

  * データはどのようにDatadogに取り込まれますか？現在、3つのオプションがあります。
    1. データをソースからDatadogにプッシュする
    2. データソースのAPIをクロールする
    3. Datadog Agentがソースから情報を取得するようにする
  * ソースから得られるメトリックとタグは何ですか？
  * 統合ごとに生成されるデフォルトのダッシュボードには、どのようなメトリックを含める必要がありますか？

私たちはまた、私たちのサイト全体で使用するための正しいイメージと同様に、統合について説明する短い吹き出しを必要とします。



   [1]: http://docs.datadoghq.com/guides/metrics/
   [2]: http://docs.datadoghq.com/api/
   [3]: http://docs.datadoghq.com/libraries/


