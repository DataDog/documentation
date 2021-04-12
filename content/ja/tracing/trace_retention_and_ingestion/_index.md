---
title: トレースの取り込みと保存
kind: ドキュメント
aliases:
  - /ja/account_management/billing/usage_control_apm/
  - /ja/tracing/app_analytics/
description: Tracing without Limits で取り込み率およびインデックス化率を制御する方法。
---
{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

Tracing without Limits™ を使用すると、Datadog へのトレースの取り込みとそのトレースの 15 日間の保存の両方を完全にカスタマイズできます。

Tracing without Limits™ の使用状況を追跡または監視するには、[使用量メトリクス][1]のドキュメントを参照してください。

## Retention Filters

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-3.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

スパンが Datadog によって取り込まれた後、アカウントに設定されている保持フィルターに従って、一部は 15 日間保持されます。デフォルトでは、有効な保持フィルターは[インテリジェント保持フィルター](#datadog-intelligent-retention-filter)のみで、エラートレースとさまざまなレイテンシー分布からのトレースを保持します。

また、サービスに追加の[タグベースの保持フィルター](#create-your-own-retention-filter)をいくつでも作成できます。

**注**: 保持フィルターを作成、変更、または無効にするには、管理者権限が必要です。

{{< img src="tracing/trace_indexing_and_ingestion/RetentionFilters.png" style="width:100%;" alt="保持フィルター" >}}

Datadog アプリの [Retention Filters タブ][2]で、次の情報を確認できます。

| 列                | Data |
| ----------------------- | ---------- |
| Filter Name                | スパンのインデックス化に使用される各フィルターの名前。デフォルトでは、唯一のフィルターは [Datadog Intelligent Retention](#datadog-intelligent-retention-filter) です。   |
| Filter Query             | 各フィルターのタグベースのクエリ。      |
| Retention Rate                | Datadog によってインデックス化される一致するスパンの数の割合 (0〜100%)。 |
| Spans Indexed             | 選択した期間中にフィルターによってインデックス化されたスパンの数。   |
| Last Updated            | 最後に保持フィルターを変更したユーザーとその日付。  |
| Enabled トグル                 |  フィルターのオンとオフを切り替えることができます。  |

保持フィルターごとの 'Spans Indexed' 列に加えて、保持フィルターによってインデックス化されたスパンを追跡するために使用できるメトリクス `datadog.estimated_usage.apm.indexed_spans` もあります。

詳細については、[使用量メトリクス][1]のドキュメントを参照するか、アカウントで利用可能な[ダッシュボード][3]を参照してください。

### Datadog インテリジェント保持フィルター

インテリジェント保持は、サービスに対して常にアクティブであり、アプリケーションの健全性を監視するのに役立つトレースの割合を保持します。すべての[トップレベルスパン][4]は、インテリジェント保持フィルターによって保持されるトレースに対してインデックス化されます。

Intelligent Retention は以下を保持します。

 - エラーの代表的な選択であり、エラーの多様性を保証します (たとえば、応答コード 400、500)。
 - さまざまな四分位数 `p75`、`p90`、`p95` の高レイテンシー。
 - 任意のトラフィックを持つすべてのリソースには、任意のタイムウィンドウ選択の過去のトレースが関連付けられます。
 - 各タイムウィンドウの真の最大期間トレース。

詳細に調査したい特定のタグ、ファセット、またはトレースのグループがある場合、つまり Intelligent Retention が保持する以上のものを保持したい場合は、[独自の保持フィルターを作成](#create-your-own-retention-filter)します。たとえば、実稼働環境からの代表的なエラーの選択以上のものを保持したい場合があります。すべての実稼働エラーが保持され、15 日間検索と分析に使用できるようにするには、`env:prod` と `status:error` を対象とする 100% 保持フィルターを作成します。以下で説明するように、これは請求に影響を与える可能性があります。

### 独自の Retention Filter を作成する

{{< img src="tracing/trace_indexing_and_ingestion/IndexFilter2.gif" style="width:100%;" alt="Span Indexing" >}}

インデックス化されて 15 日間保持されるスパンをカスタマイズするには、タグに基づいて追加のフィルターを作成、変更、無効化し、保持する各フィルターに一致するスパンの割合を設定します。保持されているスパンには、対応するトレースも保存され、表示されると、完全なトレースが利用可能になります。ただし、[検索と分析][5]でタグで検索するには、検索対象のタグを直接含むスパンが保持フィルターによってインデックス化されている必要があります。

1. フィルターに名前を付けます。
2. **すべて**に一致するスパンをインデックス化するタグを設定します。
3. このフィルターが基準に一致するスパンを保持するか、[トップレベルスパン][4]のみを保持するかを選択します。
4. インデックス化するこれらのタグに一致するスパンの割合を設定します。
5. 新しいフィルターを保存します。

**注:** "Top-Level Spans for Services Only" を選択すると、指定した比率はサービスの[トップレベルのスパン][4]のみに適用され、そのスパンが保持フィルターにより保持され、インデックス化されます。一致するタグのあるトップレベルスパンのみをインデックス化する場合は、このオプションを使用します。"All Spans" を選択すると、階層にかかわらず、分散されたトレースのすべてのスパンに指定比率が適用され、そのスパンが保持、インデックス化されます。これは、請求書およびアプリ内の視覚的な指標に影響を与える可能性がありますが、保持フィルターを設定することで、一定期間に検出された一致スパンの数について知ることができます。

たとえば、フィルターを作成し、以下のすべてのトレースを保持することができます。

- $100 以上のクレジットカード取引。
- SaaS ソリューションのミッションクリティカルな機能を使用中の最重要顧客。
- オンラインのデリバリーサービスアプリケーションの特定バージョン。

## Ingestion Controls

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-1.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

Ingestion Controls により、アプリケーションから Datadog へ送信されるトレースが決定します。統計およびメトリクスは、常にすべてのトレースに基づき算出されるため、Ingestion Controls による影響を受けません。

多くのインスツルメントされたサービスは、デフォルトでトレースの 100% を Datadog に送信します。Datadog Agent では、デフォルトで 1 秒あたり最大 50 トレースのボリュームまでは、スパンを削除およびサンプリングしません。ボリュームが大きいサービスまたは断続的なトラフィックが発生するサービスは、デフォルトでスパンの 100% を送信しない可能性が高くなります。1 秒あたり最大 50 トレースという既定の取り込みは、Intelligent Retention に基づき、デフォルトで様々なトレースを保持します。

トレースを 100% 送信するようサービスを設定すると、すべてのトレースをライブ検索および分析に使用できるため、大変有用です。

{{< img src="tracing/trace_indexing_and_ingestion/IngestionControls.png" style="width:100%;" alt="保持フィルター" >}}

**注:** Ingestion Rate の数値が 100% 未満の場合は、Agent 6.19 以降または 7.19 以降を使用していることを確認してください。これらのバージョンではデフォルトの率が高くなっています。

Datadog アプリの ['Ingestion Controls' タブ][6]で、次の情報を確認できます。

| 列                | Data |
| ----------------------- | ---------- |
| Root Service                 | インスツルメントされた、Datadog にトレースを送信する各サービスの名前。   |
| Data Ingested             | 選択した期間中に Datadog によって取り込まれたデータの量。      |
| Ingestion Rate                 | サービスによって生成されたスパンのうち、Datadog が取り込んでいるスパンの割合 (0〜100%)。数値が 100% 未満の場合、Datadog により、一部のトレースが Datadog Agent から取り込まれていないことを意味し、このトレースはメトリクスおよび統計が算出された後 Datadog Agent により削除されます。      |
| 取り込み詳細             | サービスにより生成された各トレースの送信先の詳細。詳しくは、[取り込み詳細](#ingestion-breakdown) を参照。    |
| Tracers Configuration            | アプリ内の手順に従いトレーサーを構成し変更しない限り、`Default` と表示。詳しくは、[デフォルトの取り込み率の変更](#change-the-default-ingestion-rate) を参照。このサービスがデプロイされているすべてのホストが特定のボリュームのトレースを送信するよう構成されている場合は、`Fully Configured` と表示。このサービスがデプロイされているホストの一部のみが構成されている場合は、`Partially Configured` と表示。   |
| Dropped Spans                |  Datadog Agent により削除された受信スパンの割合。この数値が 0% より高い場合、そのサービスの行をクリックして構成することができます。詳しくは、[デフォルトの取り込み率の変更](#change-the-default-ingestion-rate)を参照。     |
| Traces Ingested per Second                |   サービスに対し、選択した期間中に Datadog に取り込まれたトレースの 1 秒あたりの平均数。   |
| Spans Ingested            | 選択した期間中に Datadog によって取り込まれたスパンの数。        |

各保持フィルターの Data Ingestion 列に加えて、2 つのメトリクス `datadog.estimated_usage.apm.ingested_spans` と `datadog.estimated_usage.apm.ingested_bytes` もあります。これらのメトリクスは `service` と `env` でタグ付けされており、[トレース分析ダッシュボード][3]内でトップリストを利用して、最大の取り込み量が発生している場所を示します。詳細については、[使用量メトリクス][1]のドキュメントを参照してください。

### デフォルトの取り込み率の変更

{{< img src="tracing/trace_indexing_and_ingestion/ChangeIngestRate3.gif" style="width:100%;" alt="データ取り込み率を変更する" >}}

サービスのトラフィックの特定の割合を送信するように指定するには、そのサービスのトレーサー構成に生成されたコードスニペットを追加します。

1. 取り込まれたスパンのパーセントを変更するサービスを選択します。
2. サービス言語を選択します。
3. 必要な取り込み率を選択します。
4. これらの選択から生成された適切なコンフィギュレーションを、示されたサービスに適用し、再デプロイします。
5. Data Ingestion ページで、新しい割合が適用されたことを確認します。

#### (推奨) 全体の取り込み率を 100% に設定

すべてのサービスについて、Datadog でトレースの 100% を取り込み、ライブ検索および分析に使用したり、保持フィルターを最大限に制御したりするため、Datadog ではデフォルトでトレースの 100% を送信するようすべてのサービスを構成することをおすすめしています。

Datadog トレーシングライブラリでインスツルメントされた各サービスに 100% の取り込みを構成するには、トレーサーのコンフィギュレーションで下記の環境変数を設定します。

```
DD_TRACE_SAMPLE_RATE=1.0
```

**注:** 取り込みの合計が、含まれる GB サイズを超える場合は、請求に影響を与える場合があります。詳細は [APM 料金][7]ページを参照してください。

### 取り込み詳細

Ingestion Breakdown の列には、サービスを起点とするすべてのトレースの送信先に関する詳細が表示されます。これにより、期待値を下回る取り込み率およびトレースの欠落を把握することができます。

{{< img src="tracing/trace_indexing_and_ingestion/IngestionBreakdown.png" style="width:100%;" alt="取り込まれたトレースの詳細" >}}

詳細は、以下の部分に分かれています。

- **Complete traces ingested** (緑色): Datadog により取り込まれたトレースの割合。
- **Complete traces not retained** (グレー): エージェントまたはトレーサーにより、意図的に Datadog へ転送されなかったトレースの割合。コンフィギュレーションによって、以下の 2 つの理由のいずれかにより発生します。

    1. デフォルトで、エージェントおよびトレーサーがサービスの取り込み率をインテリジェントに設定します。この動作を構成するには、[デフォルトの取り込み率の変更](#change-the-default-ingestion-rate)を参照してください。
    2. デフォルトの取り込み率を 100% 以下に変更した場合。

- **Complete traces dropped by the tracer rate limiter** (オレンジ色): [サービスの取り込み率を構成](#change-the-default-ingestion-rate) することにした場合、サービスの取り込み率を明示的に定義します。ただし、デフォルトで、1 秒当たり 100 トレースというレート制限が保護機能として自動的に有効になります。このレート制限を構成するには、[サポートチケットを作成][8]するとプロセスの案内が提供されます。

- **Traces dropped due to the agent CPU limit** (赤色): エージェントには、ユーザーに CPU 使用量の制限設定を許可するコンフィギュレーションオプションがあります。この制限に達すると、エージェントはトレーサーからのトレースの受信を停止します。エージェントに割り当てられる CPU 量を構成するには、[エージェントのコンフィギュレーション][9]を変更します。

### 取り込み前に削除されたトレース

Tracing without Limits に、環境変数コンフィギュレーション `DD_TRACE_SAMPLE_RATE=1.0` を設定しないと、トレースが 100% 取り込まれることはありません。また、以下の条件が必要です。
- アプリケーションで 1 秒当たり 50 トレース以が生成がされる
- アプリケーションにより断続的なトラフィックロードが送信される
- または、アプリケーションのトレースサイズが大きいか、複雑なトレースペイロードがある。

場合によっては、統計が算出された*後*に Datadog Agent により一部のトレースが削除され、メトリクスがトレースの 100% に基づくことがあります。

Datadog 内の取り込み率が 100% 以下で、すべてのトレースを送信したい場合は、環境変数を上記のように設定して Tracing without Limits を有効にします。ご質問がある場合は、[サポートチーム][8]までお問い合わせください。

{{< img src="tracing/trace_indexing_and_ingestion/VisualIndicator.png" style="width:100%;" alt="トレースの 100% を送信していないルートサービス" >}}


## App Analytics から Tracing Without Limits へ

2020 年 10 月 20 日まで、Datadog ではデータ分析のためのスパンのインデックス化に App Analytics を提供していました。現在、このセットアップのコンフィギュレーションは推奨ではなく、[トレースの検索と分析][10]の使用には必要ありませんが、レガシー手順は [App Analytics][11] の設定ページでご覧いただけます。

既存のすべての App Analytics フィルターは、自動的に Retention Filters に移行されています。未変更フィルターは、引き続き使用するか、必要に応じて修正してご利用ください。移行されたフィルターには、 App Analytics のレガシーフィルターであることを示す *i* が付けられています。

**注:** 既存の App Analytics フィルターは、Datadog 内で編集できますが、移行された[保持フィルター][2]を編集することによってのみ編集できます。レガシーフィルターは、アプリ内の[設定][12]ページでのみ読み取られます。

{{< img src="tracing/trace_indexing_and_ingestion/MigratedRetentionFilter.png" style="width:100%;" alt="保持フィルターに移行した App Analytics フィルターの視覚的表示" >}}

[1]: /ja/tracing/trace_retention_and_ingestion/usage_metrics
[2]: https://app.datadoghq.com/apm/traces/retention-filters
[3]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[4]: /ja/tracing/visualization/#top-level-span
[5]: /ja/tracing/trace_search_and_analytics/#historical-search-mode
[6]: https://app.datadoghq.com/apm/traces/ingestion-control
[7]: /ja/account_management/billing/apm_distributed_tracing/
[8]: /ja/help/
[9]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml#L736-L741
[10]: /ja/tracing/trace_search_and_analytics
[11]: /ja/tracing/legacy_app_analytics/
[12]: https://app.datadoghq.com/apm/settings