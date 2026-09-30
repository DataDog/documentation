---
description: トラブルシューティング能力は保ちながら、取り込み量を最適化するためのさまざまなトレースサンプリングユースケースと戦略について説明します。
further_reading:
- link: /tracing/guide/trace_ingestion_volume_control/
  tag: ガイド
  text: 取り込み量を制御する方法
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Architecture Center
  text: '分散トレースの習得: データ量の課題と Datadog による効率的なサンプリング方法'
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Architecture Center
  text: '分散トレースの最適化: 予算内に収め、重要なトレースをキャプチャするためのベストプラクティス'
title: トレースサンプリングのユースケース
---
## 概要 {#overview}

トレースデータは反復される傾向があります。アプリケーションの問題が、1 つのトレースでのみ特定され、他のトレースでは特定されないということはほとんどありません。高スループットのサービス、特に注意を要するインシデントの場合、問題の症状は複数のトレースで繰り返し現れます。したがって通常は、サービスやエンドポイントのあらゆるトレースや、トレース内のあらゆるスパンをすべて収集する必要はありません。Datadog APM の[取り込み制御メカニズム][1]は、問題のトラブルシューティングに必要な可視性を維持しながら、ノイズを削減し、コストを管理するうえで役立ちます。

取り込みメカニズムは、Datadog Agent および Datadog SDK 内の構成です。OpenTelemetry SDK を使用してアプリケーションをインスツルメントしている場合は、「[OpenTelemetry による取り込みサンプリング][2]」をお読みください。

このガイドを利用すると、発生する可能性のある主なユースケースに応じて、いつ、どのように取り込み制御の構成を使用するかを理解することができます。ガイドの内容は以下のとおりです。

- [あるサービスに対して、どの取り込みメカニズムを使用するかを判断する](#determining-which-ingestion-mechanisms-are-used)
- [特定の種類のトレースを保持することに重点を置いたユースケース](#keeping-certain-types-of-traces)
- [取り込みトレースの低減に重点を置いたユースケース](#reducing-ingestion-for-high-volume-services)


## どの取り込みメカニズムを使用するかを判断する {#determining-which-ingestion-mechanisms-are-used}

Datadog 環境で現在使用されている取り込みメカニズムを確認するには、[[Ingestion Control] ページ][3]に移動してください。

{{< img src="/tracing/guide/ingestion_sampling_use_cases/ingestion_control_page.png" alt="[Ingestion Control] ページ" style="width:90%;" >}}

このテーブルは、取り込み量に関する情報を*サービス別に*示します。[Configuration](構成) 列は、現在のセットアップの最初の指標となります。これには、次のことが示されます。
- `AUTOMATIC`: Datadog Agent で計算したサンプリングレートを、サービスから開始されるトレースに適用する場合。[Datadog Agent の取り込みロジック][5]の詳細をご確認ください。
- `CONFIGURED`:SDK で構成されたカスタムトレースサンプリングレートを、サービスから開始されるトレースに適用する場合。

サービスをクリックすると、各サービスで使用されているサンプリングの決定要因 (Agent または SDK、ルール、サンプルレートなど) や、取り込みスパンのサービスで利用されている[取り込みサンプリングメカニズム][1]の詳細を確認できます。

{{< img src="/tracing/guide/ingestion_sampling_use_cases/service-ingestion-summary.png" alt="[Service Ingestion Summary](サービス取り込みの概要)" style="width:90%;" >}}

上に示している [Service Ingestion Summary](サービス取り込みの概要) の例では、[{{< ui >}}Ingestion reasons breakdown{{< /ui >}}](取り込み理由の内訳) テーブルに、このサービスの取り込み理由のほとんどが `rule` ([ユーザー定義サンプリングルール][6]) に由来することが示されています。

このサービスの上位サンプリング決定要因を見ると、`web-store` サービスのサンプリングに関する決定は、`web-store`、`shopist-web-ui`、`shipping-worker`、`synthetics-browser`、および `product-recommendation` に由来することがわかります。これら 5 つのサービスはすべて、`web-store` のサービススパンに影響を与える全体的なサンプリング決定に寄与しています。Web ストアの取り込みを微調整する方法を決定する場合、5 つのサービスすべてを考慮する必要があります。

## 特定の種類のトレースを保持する {#keeping-certain-types-of-traces}

### トランザクションのトレースをすべて保持する {#keeping-entire-transaction-traces}

トランザクショントレース全体を取り込むことで、個々のリクエストに対する**エンドツーエンドのサービスリクエストの流れ**を可視化することができます。

#### ソリューション: ヘッドベースサンプリング {#solution-head-based-sampling}

トレース全体を取り込む場合は、[ヘッドベースサンプリング][4]メカニズムを使用します。トレース作成時のトレースを保持するか削除するかの決定は、トレースの最初のスパン (*ヘッド*) を基に行われます。この決定は、リクエストコンテキストを通じてダウンストリームサービスに伝搬されます。

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="ヘッドベースサンプリング" style="width:100%;" >}}

Datadog Agent は、トレースを保持するか削除するかを決定するために、アプリケーショントラフィックに基づいて、トレース作成時に適用する各サービスの[デフォルトサンプリングレート][5]を計算します。
- トラフィックの少ないアプリケーションでは、100% のサンプリングレートが適用されます。
- トラフィックの多いアプリケーションでは、Agent あたり毎秒 10 個の完全なトレースを目標に、低いサンプリングレートが適用されます。

また、サービスごとにサンプリングレートを構成することで、Agent のデフォルトサンプリングレートをオーバーライドすることもできます。詳細については、[特定のサービスについて保持するトレース数を増やす方法](#keeping-more-traces-for-specific-services-or-resources)を参照してください。

#### ヘッドベースサンプリングの構成 {#configuring-head-based-sampling}

デフォルトのサンプリングレートは、Agent ごとに 1 秒間に 10 個の完全なトレースを目標に計算されています。これはトレースの*目標*数であり、一定期間のトレース数の平均を求めることで得られます。これは絶対的な制限では*ありません*。トラフィックの急増により、短時間のうちに Datadog に送信されるトレース数が大幅に増加することがあります。

Datadog Agent のパラメータ `target_traces_per_second` または環境変数 `DD_APM_TARGET_TPS` を構成することで、この目標を増減させることができます。[ヘッドベースサンプリングの取り込みメカニズム][5]の詳細をご確認ください。

**注:** Agent の構成を変更すると、この Datadog Agent にトレースを報告する*すべてのサービス*のパーセントサンプリングレートに影響します。

ほとんどのシナリオで、この Agent レベルの構成は割り当てられたクォータ内にとどまり、アプリケーションのパフォーマンスを十分に可視化し、ビジネスのための適切な意思決定を支援します。

### 特定のサービスやリソースについて保持するトレース数を増やす {#keeping-more-traces-for-specific-services-or-resources}

自社のビジネスにとって重要なサービスやリクエストでは、その可視性を高める必要があります。関連するすべてのトレースを Datadog に送信して、個々のトランザクションを詳しく調べることができるようにすることをお勧めします。

#### ソリューション: サンプリングルール {#solution-sampling-rules}

デフォルトでは、サンプリングレートは、Datadog Agent あたり、毎秒 10 トレースを目標に計算されます。SDK で[サンプリングルール][6]を構成すると、デフォルトで計算されたサンプリングレートをオーバーライドすることができます。

サンプリングルールはサービスごとに構成できます。ルールで指定されたサービスから開始されるトレースの場合は、Agent のデフォルトサンプリングレートの代わりに、定義されたパーセントのサンプリングレートが適用されます。

#### サンプリングルールを構成する {#configuring-a-sampling-rule}

環境変数 `DD_TRACE_SAMPLING_RULES` を設定して、サンプリングルールを構成することができます。

たとえば、`my-service` という名前のサービスのトレースの 20% を送信するには、次のようにします。

```
DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.2}]'
```

[サンプリングルールの取り込みメカニズム][6]の詳細をご確認ください。

### 保持するエラー関連のトレース数を増やす {#keeping-more-error-related-traces}

エラースパンを含むトレースは、一般にシステム障害の兆候です。エラーのあるトランザクションの割合を高く保つことで、個別の関連するリクエストに常にアクセスできるようにすることができます。

#### ソリューション: エラーサンプリングレート {#solution-error-sampling-rate}

ヘッドベースサンプリングによるトレースに加え、エラーサンプリングレートを高めることで、ヘッドベースサンプリングによって関連トレースが保持されない場合でも、各 Agent が追加のエラースパンを保持できるようにすることができます。

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="エラーサンプリング" style="width:100%;" >}}

**注:**
- Datadog Agent レベルでローカルにサンプリングが行われるため、トレースチャンクの分散された断片は取り込まれない可能性があります。
- **Datadog Agent 6/7.41.0 以降**では、`DD_APM_FEATURES=error_rare_sample_tracer_drop` を設定して、SDK ルールまたは `manual.drop` でドロップしたスパンが含まれるようにすることができます。詳細については、[取り込みメカニズムドキュメントのエラートレースセクション][9]を参照してください。

#### エラーサンプリングを構成する {#configuring-error-sampling}

環境変数 `DD_APM_ERROR_TPS` を設定して、各 Agent がキャプチャする 1 秒あたりのエラーチャンク数を構成できます。デフォルト値は 1 秒あたり `10` 個のエラーです。**すべてのエラー**を取り込む場合は、任意の大きな値を設定してください。エラーサンプリングを無効にするには、`DD_APM_ERROR_TPS` を `0` に設定します。

## ボリュームの大きいサービスの取り込みを減らす {#reducing-ingestion-for-high-volume-services}

### データベースやキャッシュサービスからの取り込み量を減らす {#reducing-volume-from-database-or-cache-services}

トレースされたデータベース呼び出しは大量の取り込みデータを表す場合がありますが、データベースの健全性を監視するには、アプリケーションのパフォーマンスメトリクス (エラー数、リクエストヒット数、レイテンシーなど) で十分です。

#### ソリューション: データベース呼び出しを含むトレースのサンプリングルール {#solution-sampling-rules-for-traces-with-database-calls}

データベース呼び出しをトレースすることで生じるスパン量を減らすために、トレースのヘッドでサンプリングを構成します。

データベースサービスがトレースを開始することはほとんどありません。通常、クライアントデータベーススパンは、インスツルメンテーションされたバックエンドサービススパンの子です。

**どのサービスがデータベーストレースを開始するか**を知るには、[Ingestion Control] ページの [Service Ingestion Summary][7] の `Top Sampling Decision Makers` トップリストグラフを使用します。これらの特定のサービスに対してヘッドベースサンプリングを構成すると、取り込まれるデータベーススパンの量を減らしながら、不完全なトレースが取り込まれないようにすることができます。分散されたトレースは、保持されるか完全に削除されます。

{{< img src="/tracing/guide/ingestion_sampling_use_cases/service-ingestion-summary-database.png" alt="上位サンプリング決定要因" style="width:90%;" >}}

たとえば、`web-store-mongo` のデータベース呼び出しのトレースでは、99% の確率で `web-store` と `shipping-worker` のサービスからトレースが発生します。そのため、`web-store-mongo` のトレース量を減らすには、`web-store` と `shipping-worker` のサービスに対してサンプリングを構成します。

#### データベーススパンをドロップするサンプリングの構成 {#configure-sampling-to-drop-database-spans}

サンプリングルールの構文については、[サンプリングルール構成セクション](#configuring-a-sampling-rule)を参照してください。

バックエンドサービスの `web-store` は、各トレースで複数回 Mongo データベースを呼び出すため、不要なスパンが大量に作成されます。

- バックエンドサービス `web-store` の**トレースサンプリングルール**を構成し、Mongo スパンを含め、すべてのトレースの 10% が保持されるようにします。

  ```
  DD_TRACE_SAMPLING_RULES='[{"service": "web-store", "sample_rate": 0.1}]'
  ```

- オプションで、すべての `web-store` スパンを保持する必要がある場合は、バックエンドサービス `web-store` のスパンの 100% を保持するように**シングルスパンサンプリングルール**を構成します。このサンプリングでは、上記の 10% 以外のデータベース呼び出しスパンは取り込まれません。

  ```
  DD_SPAN_SAMPLING_RULES='[{"service": "web-store", "sample_rate": 1}]'
  ```

  **注**: シングルスパンサンプリングルールを構成すると、取り込まれたスパンから得られる[スパンベースメトリクス][8]を使用する場合に特に役立ちます。

{{< img src="/tracing/guide/ingestion_sampling_use_cases/single-span-sampling3.png" alt="データベーススパンのサンプリング" style="width:100%;" >}}


## 参考資料 {#further-reading}

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