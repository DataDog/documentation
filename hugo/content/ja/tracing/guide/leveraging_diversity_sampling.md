---
further_reading:
- link: /tracing/trace_pipeline/trace_retention/
  tag: ドキュメント
  text: トレースインデックスの保持を制御する
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Architecture Center
  text: '分散型トレーシングの習得: データ量の課題と、Datadog の効率的なサンプリングのアプローチ'
title: Datadog の保持ポリシーを理解し、トレースデータを効率的に保持する
---
## 大切なトレースの取り込みと保持 {#ingesting-and-retaining-the-traces-you-care-about}

アプリケーションによって生成されるトレースのほとんどは反復的なものであり、それらすべてを取り込んで保持することが必ずしも適切であるとは限りません。成功したリクエストについては、アプリケーションのトラフィックの**代表的なサンプル**を保持すれば十分です。これは、トレースされた個々のリクエストを毎秒数十回もスキャンすることはできないからです。

最も重要なのは、インフラストラクチャーの潜在的な問題の症状を含むトレース、つまり、**エラーや異常なレイテンシーを含むトレース**です。さらに、ビジネスにとって重要な特定の**エンドポイント**については、顧客の問題を詳細に調査してトラブルシューティングできるように、トラフィックを 100% 保持することが望ましいでしょう。

{{< img src="/tracing/guide/leveraging_diversity_sampling/relevant_traces.png" alt="レイテンシーの高いトレース、エラーのトレース、ビジネスクリティカルなトレースなどを組み合わせて保存することで、関連するトレースを保持します。" style="width:80%;" >}}


## Datadog の保持ポリシーで重要なものを保持できるようにする方法 {#how-datadogs-retention-policy-helps-you-retain-what-matters}

Datadog では、15 分以上経過したデータを保持する方法として、主に 2 つの方法を提供しています。
- 常に有効な[インテリジェント保持フィルター](#diversity-sampling-algorithm-intelligent-retention-filter)。
- [カスタムタグベース保持フィルター](#tag-based-retention-filters) (手動で構成可能)。

{{< img src="/tracing/guide/leveraging_diversity_sampling/datadog_captures_relevant_traces.png" alt="Datadog は、インテリジェント保持フィルターによって関連するエラーとレイテンシーのトレースを、カスタム保持フィルターによってビジネスクリティカルなトレースをキャプチャします。" style="width:80%;" >}}


### 多様性サンプリングアルゴリズム: インテリジェント保持フィルター {#diversity-sampling-algorithm-intelligent-retention-filter}

デフォルトでは、インテリジェント保持フィルターは、何十ものカスタム保持フィルターを作成する必要なく、トレースの代表的なセレクションを保持します。

`environment`、`service`、`operation`、`resource` の各組み合わせについて、最大 15 分ごとに少なくとも 1 つのスパン (および関連する分散型トレース) を、レスポンスのステータスコードごとに、`p75`、`p90`、`p95` のレイテンシパーセンタイルおよびエラーの代表例として保持します。

詳しくは、[インテリジェント保持フィルタードキュメント][1] をお読みください。

### タグベースの保持フィルター {#tag-based-retention-filters}

[タグベースの保持フィルター][2] により、ビジネスにとって最も重要なトレースを柔軟に保持することができます。保持フィルターでスパンをインデックス化する場合、関連するトレースも保存されるため、リクエスト全体とその分散型コンテキストを確実に可視化することができます。

## インデックス化されたスパンデータを効果的に検索・分析する {#searching-and-analyzing-indexed-span-data-effectively}

多様性サンプリングでキャプチャされたデータセットは、**一様にサンプリングされていません** (つまり、全トラフィックを比例的に代表していません)。エラーやレイテンシーの高いトレースに偏ります。一様にサンプリングされたデータセットの上にのみ分析を構築したい場合は、Trace Explorer で `-retained_by:diversity_sampling` クエリパラメーターを追加して、多様性の理由からサンプリングされたこれらのスパンを除外します。

たとえば、アプリケーションでマーチャント層ごとにグループ化されたチェックアウト操作の数を測定する場合、**多様性サンプリングデータセットを除外する**ことで、代表的なデータセットでこの分析を行うことができ、`basic`、`enterprise`、`premium`のチェックアウト比率が現実的になります。

{{< img src="/tracing/guide/leveraging_diversity_sampling/checkout_ops_by_tier.png" alt="階層別のチェックアウト操作数、多様性サンプリングデータを除外した分析結果" style="width:80%;" >}}

一方、マーチャント層ごとにユニークなマーチャントの数を測定したい場合は、**多様性サンプリング**データセットを含めると、カスタム保持フィルターで捕らえられなかった追加のマーチャント ID をキャプチャすることができます。

{{< img src="/tracing/guide/leveraging_diversity_sampling/nb_merchants_by_merchant_tier.png" alt="階層別のユニークなマーチャントの数。多様性サンプリングデータを含む分析結果" style="width:80%;" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_pipeline/trace_retention#datadog-intelligent-retention-filter
[2]: /ja/tracing/trace_pipeline/trace_retention