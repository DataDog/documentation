---
last_modified: 2017/02/24
translation_status: complete
language: ja
title_org: Officially Integrating with Datadog
title: 公式インテグレーションのリクエストについて
kind: guide
listorder: 15
---

<!-- Being able to see all of your metrics from across your infrastructure is key within Datadog. While we do have guides to submit [custom metrics][1] via our [API][2] and [code instrumentation][3], it's possible you might want to see a certain source become an official integration. Overall, the largest deciding factor in what integrations we build is what our clients request.
-->

全てのメトリックをインフラ全体から収集できるようにすることは、Datadog を使う上で重要なことです。
[API][2] と最小限の[コード修正][3]で、[カスタム メトリクス][1]を送信できるようにするためのガイドを提供しているのは、そのためです。しかし、特定のソース(サービスやミドルウェアなど)にむけた公式のインテグレーションが存在すればよいのにと思うこともあるでしょう。我々が開発するインテグレーションの選定の最大要因は、クライアントからのリクエストの状況になります。


<!-- If you would like to propose an integration, please reach out to support@datadoghq.com and tell us what metrics you would like to see from that given source.
 -->

公式インテグレーションの開発をリクエストしたい場合は、[support@datadoghq.com](mailto:support@datadoghq.com)に連絡して、ターゲットとなるソースからどのようなメトリクスを収集したいかを教えてください。


<!-- If you manage or work with a service and would like to see Datadog integrate it, the following information is needed:

  * How will data get into Datadog? There are currently three options:
    1. Push data from the source to Datadog
    2. Crawl the data source's API
    3. Have the Datadog Agent pick up the information from the source
  * What are the metrics and tags should be picked up from the source?
  * What metrics should be included on the default dashboard that we generate for each integration?

We will also need a short blurb describing the integration as well as the correct image to use across our site. -->

もしも、 特定のサービスやアプリを管理していたり開発していて、それに対するインテグレーションを Datadog に開発して欲しい場合は、以下の情報が必要です。

  * Datadog へ、データはどのように提供まれますか? 現在、3つのオプションがあります。
    1. データを、ソース(サービスサイトなど)から Datadog へプッシュする
    2. データソースの API を、 Datadog からクロールする
    3. Datadog Agent がソースから情報を取得するようにする
  * ソースから集取するべきメトリックとタグは、何ですか?
  * インテグレーションのデフォルトのダッシュボードには、どのようなメトリックを含める必要がありますか?

更に、サイト全体で使用するロゴなどのイメージや、そのインテグレーションについて説明するための短い文章も必要になります。


   [1]: http://docs.datadoghq.com/guides/metrics/
   [2]: http://docs.datadoghq.com/api/
   [3]: http://docs.datadoghq.com/libraries/


