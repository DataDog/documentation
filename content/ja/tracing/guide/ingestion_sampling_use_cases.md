---
further_reading:
- link: /tracing/guide/trace_ingestion_volume_control/
  tag: ガイド
  text: 取り込みボリュームを制御する方法
title: トレースサンプリングのユースケース
---

## 概要

トレースデータは反復される傾向があります。アプリケーションの問題が、たった 1 つのトレースで特定され、他のトレースがないことはほとんどありません。高スループットのサービス、特に注意を要するインシデントの場合、問題は複数のトレースで繰り返し症状が現れます。その結果、サービスやエンドポイントのトレースやトレース内のスパンをすべて収集する必要はありません。Datadog APM [取り込み制御メカニズム][1]は、問題のトラブルシューティングに必要な可視性を維持しながら、ノイズを削減し、コストを管理するのに役立ちます。

取り込みの仕組みは、Datadog Agent と Datadog トレーシングライブラリ内の構成です。OpenTelemetry SDK を使用してアプリケーションのインスツルメンテーションを行っている場合は、[OpenTelemetry による取り込みサンプリング][2]をお読みください。

このガイドでは、遭遇する可能性のある主なユースケースに応じて、いつ、どのように取り込み制御の構成を使用するかを理解するのに役立ちます。本書は、以下の内容をカバーしています。

- あるサービスに対して、[どの取り込みメカニズムを使用するかを判断する](#determining-which-ingestion-mechanisms-are-used)
- [特定の種類のトレースを保持することに重点を置いたユースケース](#keeping-certain-types-of-traces)
- [取り込みトレースの低減に重点を置いたユースケース](#reducing-ingestion-for-high-volume-services)


## どの取り込みメカニズムを使用するかを判断する

Datadog 環境で現在使用されている取り込みメカニズムを確認するには、[Ingestion Control ページ][3]に移動してください。

{{< img src="/tracing/guide/ingestion_sampling_use_cases/ingestion_control_page.png" alt="Ingestion Control ページ" style="width:90%;" >}}

この表は、*サービス別*の取り込みボリュームに関する洞察を提供します。構成列は、現在のセットアップの最初の指標となります。これは、次のことを示しています。
- Datadog Agent で計算したサンプリングレートをサービスから始まるトレースに適用する場合は `AUTOMATIC` となります。[Datadog Agent の取り込みロジック][5]の仕様については、こちらをご覧ください。
- サービスから開始するトレースにトレーシングライブラリで構成したカスタムトレースサンプリングレートが適用される場合は `CONFIGURED` となります。

サービスをクリックすると、各サービスで使用されているサンプリングの決定要因 (Agent やトレーシングライブラリ、ルールやサンプルレートなど) や、取り込みスパンのサービスで利用されている[取り込みサンプリングメカニズム][1]の詳細を確認できます。

{{< img src="/tracing/guide/ingestion_sampling_use_cases/service-ingestion-summary.png" alt="Service Ingestion Summary" style="width:90%;" >}}

上記の Service Ingestion Summary の例では、**Ingestion reasons breakdown** テーブルに、このサービスの取り込み理由のほとんどが `rule` ([ユーザー定義サンプリングルール][6]) に由来することが示されています。

このサービスのトップサンプリング決定要因は、`web-store` サービスが、`web-store`、`shopist-web-ui`、`shipping-worker`、`synthetics-browser`、`product-recommendation` からサンプリング決定を受けることを示しています。これらの 5 つのサービスはすべて、`web-store` のサービススパンに影響を与える全体的なサンプリング決定に寄与しています。Web ストアの取り込みを微調整する方法を決定する場合、5 つのサービスすべてを考慮する必要があります。

## 特定の種類のトレースを保持する

### トランザクションのトレースをすべて保持する

トランザクショントレース全体を取り込むことで、個々のリクエストに対する**エンドツーエンドのサービスリクエストの流れ**を可視化することができます。

#### ソリューション: ヘッドベースサンプリング

完全なトレースは、[ヘッドベースサンプリング][4]メカニズムで取り込むことができます。トレースが作成されたときに、トレースを維持するか削除するかの決定は、トレースの最初のスパン、*ヘッド*から決定されます。この決定は、リクエストコンテキストを通じてダウンストリームサービスに伝搬されます。

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="ヘッドベースサンプリング" style="width:100%;" >}}

Datadog Agent は、トレースの保持と削除を決定するために、アプリケーショントラフィックに基づいて、トレース作成時に適用する各サービスの[デフォルトサンプリングレート][5]を計算します。
- トラフィックの少ないアプリケーションでは、サンプリング率 100% が適用されます。
- トラフィックの多いアプリケーションでは、Agent あたり毎秒 10 個の完全なトレースを目標に、低いサンプリングレートが適用されます。

また、サービスごとにサンプリングレートを構成することで、Agent のデフォルトサンプリングレートをオーバーライドすることができます。詳しくは、[特定のサービスに対してより多くのトレースを保持する](#keeping-more-traces-for-specific-services-or-resources)方法を参照してください。

#### ヘッドベースサンプリングの構成

デフォルトのサンプリングレートは、Agent ごとに 1 秒間に 10 個の完全なトレースを目標に計算されています。これはトレースの*目標*数であり、一定期間のトレースを平均化した結果です。これはハード的な制限では*ありません*。また、トラフィックの急増により、短時間のうちに Datadog に送信されるトレースが大幅に増加することがあります。

Datadog Agent のパラメーター `max_traces_per_second` または環境変数 `DD_APM_MAX_TPS` を構成することで、この目標を増減することができます。ヘッドベースサンプリングの取り込みメカニズム][5]の詳細はこちらをご覧ください。

**注:** Agent の構成を変更すると、この Datadog Agent にトレースを報告する*すべてのサービス*のパーセントサンプリングレートに影響します。

ほとんどのシナリオで、この Agent レベルの構成は割り当てられたクォータ内にとどまり、アプリケーションのパフォーマンスを十分に可視化し、ビジネスのための適切な意思決定を支援します。

### 特定のサービスやリソースに対してより多くのトレースを保持する

サービスやリクエストがビジネスにとって重要なものである場合、その可視性を高めたいと思うものです。Datadog に関連するすべてのトレースを送信して、個々のトランザクションを調べることができるようにするとよいでしょう。

#### ソリューション: サンプリングルール

デフォルトでは、サンプリングレートは、Datadog Agent あたり 1 秒あたり 10 トレースを目標に計算されます。トレーシングライブラリで[サンプリングルール][6]を構成することで、デフォルトで計算されたサンプリングレートをオーバーライドすることができます。

サービス別にサンプリングルールを構成することができます。ルールの指定したサービスから始まるトレースには、Agent のデフォルトサンプリングレートの代わりに、定義されたパーセンテージサンプリングレートが適用されます。

#### サンプリングルールの構成

環境変数 `DD_TRACE_SAMPLING_RULES` を設定することで、サンプリングルールを構成することができます。

例えば、`my-service` という名前のサービスのトレースの 20% を送信するには

```
DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.2}]'
```

[サンプリングルールの取り込みメカニズム][6]について詳しくはこちら。

### エラー関連のトレースをより多く保持する

エラースパンを持つトレースは、しばしばシステム障害の症状です。エラーのあるトランザクションの割合を高く保つことで、常にいくつかの関連する個々のリクエストにアクセスすることができます。

#### ソリューション: エラーサンプリングレート

ヘッドベースサンプリングされたトレースに加えて、エラーサンプリングレートを上げることで、ヘッドベースサンプリングで関連トレースが保持されない場合でも、各 Agent が追加のエラースパンを保持することができます。

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="エラーサンプリング" style="width:100%;" >}}

**注:**
- Datadog Agent レベルでローカルにサンプリングが行われるため、トレースチャンクの分散された断片は取り込まれない可能性があります。
- **Datadog Agent 6/7.41.0 以降**では、`DD_APM_FEATURES=error_rare_sample_tracer_drop` を設定することで、トレーシングライブラリルールまたは `manual.drop` でドロップしたスパンが含まれます。詳細は、[取り込みのメカニズムのドキュメントのエラートレースセクション][9]に記載されています。

#### エラーサンプリングの構成

環境変数 `DD_APM_ERROR_TPS` を設定することで、Agent ごとに 1 秒間に何個のエラーチャンクをキャプチャするかを構成することができます。デフォルト値は、1 秒間に `10` 個のエラーです。**すべてのエラー**を取り込みたい場合は、任意の高い値を設定してください。エラーサンプリングを無効にするには、`DD_APM_ERROR_TPS` を `0` に設定します。

## ボリュームの大きいサービスの取り込みを減らす

### データベースやキャッシュサービスからのボリュームを減らす

トレースされたデータベース呼び出しは大量の取り込みデータを表し、アプリケーションのパフォーマンスメトリクス (エラーカウント、リクエストヒットカウント、レイテンシーなど) はデータベースの健全性を監視するのに十分です。

#### ソリューション: データベース呼び出しのあるトレースのサンプリングルール

データベース呼び出しをトレースすることで生じるスパン量を減らすために、トレースの先頭でサンプリングを構成します。

データベースサービスがトレースを開始することはほとんどありません。通常、クライアントデータベーススパンは、インスツルメンテーションされたバックエンドサービススパンの子です。

**どのサービスがデータベーストレースを開始するか**を知るには、取り込み制御ページ [Service Ingestion Summary][7] の `Top Sampling Decision Makers` トップリストグラフを使用します。これらの特定のサービスに対してヘッドベースサンプリングを構成すると、取り込まれるデータベーススパンの量が減少し、不完全なトレースが取り込まれないようにすることができます。分散型トレーシングは、保持されるか、完全に削除されます。

{{< img src="/tracing/guide/ingestion_sampling_use_cases/service-ingestion-summary-database.png" alt="トップサンプリング決定要因" style="width:90%;" >}}

例えば、`web-store-mongo` のデータベース呼び出しのトレースでは、99% の確率で `web-store` と `shipping-worker` のサービスからトレースが発生します。そのため、`web-store-mongo` のトレース量を減らすには、`web-store` と `shipping-worker` のサービスに対してサンプリングを構成します。

#### データベーススパンをドロップするサンプリングの構成

サンプリングルールの構文については、[サンプリングルール構成セクション](#configuring-a-sampling-rule)を参照してください。

バックエンドサービスの `web-store` は、トレースごとに何度も Mongo データベースを呼び出しており、不要なスパンボリュームを大量に作り出しています。

- バックエンドサービス `web-store` の **トレースサンプリングルール** を構成し、Mongo スパンを含むトレース全体の 10% を保持します。

  ```
  DD_TRACE_SAMPLING_RULES='[{"service": "web-store", "sample_rate": 0.1}]'
  ```

- オプションとして、すべての `web-store` スパンを保持したい場合は、バックエンドサービス `web-store` のスパンの 100% を保持する**シングルスパンサンプリングルール**を構成してください。このサンプリングでは、上記の 10% 以外のデータベース呼び出しスパンは取り込まれません。

  ```
  DD_SPAN_SAMPLING_RULES='[{"service": "web-store", "sample_rate": 1}]'
  ```

  **注**: スパンサンプリングルールの構成は、取り込みスパンから得られる[スパンベースメトリクス][8]を使用する場合に特に有効です。

{{< img src="/tracing/guide/ingestion_sampling_use_cases/single-span-sampling.png" alt="データベーススパンサンプリング" style="width:100%;" >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_pipeline/ingestion_mechanisms/
[2]: /ja/opentelemetry/guide/ingestion_sampling_with_opentelemetry/
[3]: https://app.datadoghq.com/apm/traces/ingestion-control
[4]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[5]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[6]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[7]: /ja/tracing/trace_pipeline/ingestion_controls/#service-ingestion-summary
[8]: /ja/tracing/trace_pipeline/generate_metrics/
[9]: /ja/tracing/trace_pipeline/ingestion_mechanisms/?tab=java#error-and-rare-traces