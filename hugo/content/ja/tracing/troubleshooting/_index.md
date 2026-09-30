---
algolia:
  tags:
  - apm 問題
  - apm faq
  - トレーシング トラブルシューティング
  - apm よくある問題
aliases:
- /ja/tracing/faq/my-trace-agent-log-renders-empty-service-error/
- /ja/tracing/troubleshooting/faq_apm/
further_reading:
- link: /tracing/troubleshooting/connection_errors
  tag: Documentation
  text: 接続エラー
- link: /tracing/troubleshooting/tracer_startup_logs/
  tag: Documentation
  text: Datadog トレーサー起動ログ
- link: /tracing/troubleshooting/tracer_debug_logs/
  tag: Documentation
  text: Datadog トレーサーデバッグログ
- link: /tracing/troubleshooting/agent_apm_metrics/
  tag: ドキュメント
  text: Datadog Agent によって送信された APM メトリクス
- link: /tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
  tag: ドキュメント
  text: カスタム保持フィルター
- link: /tracing/trace_pipeline/ingestion_mechanisms/?tab=java
  tag: ドキュメント
  text: トレース取り込みサンプリング
- link: /tracing/troubleshooting/#data-volume-guidelines
  tag: ドキュメント
  text: データボリュームガイドライン
- link: /integrations/
  tag: ドキュメント
  text: Datadog の全インテグレーション一覧
- link: /tracing/guide/inferred-service-opt-in/
  tag: ドキュメント
  text: 推測されたサービス依存関係 (プレビュー版)
title: APM トラブルシューティング
---

Datadog APM を使用中に予期しない動作が発生した場合は、問題解決に役立つ情報をこのページで確認してください。各リリースには改善や修正が含まれているため、Datadog では使用している Datadog トレーシングライブラリの最新バージョンへの定期的な更新を推奨しています。問題が引き続き発生する場合は、[Datadog サポート][1]に連絡してください。

APM データを Datadog に送信する際には、以下のコンポーネントが関与します。

{{< img src="tracing/troubleshooting/troubleshooting_pipeline_info_1.png" alt="APM トラブルシューティングパイプライン">}}

詳細については、[追加サポート](#additional-support)を参照してください。

## トレースの保持

このセクションでは、Datadog 全体におけるトレースデータの保持とフィルタリングに関する問題について説明します。

{{% collapse-content title="Trace Explorer に Monitors ページよりも多くのスパンが表示される" level="h4" %}}

[カスタム保持フィルター][19]をセットアップしていない場合、これは想定された動作です。その理由は以下の通りです。

[Trace Explorer][20] ページでは、取り込まれたスパンやインデックス化されたスパンを任意のタグを使って検索できます。ここで任意のトレースをクエリすることが可能です。

デフォルトでは、スパンは取り込まれた後、[Datadog インテリジェントフィルター][21]によって保持されます。Datadog には、デフォルトで有効になっている他の[保持フィルター][22]もあり、サービスやエンドポイント、エラー、遅延の大きいトレースに対する可視性を提供します。

ただし、これらのトレースをモニターで使用するには、[カスタム保持フィルター][19]を設定する必要があります。

カスタム保持フィルターを使用すると、タグに基づいて追加のフィルターを作成、変更、無効化し、どのスパンがインデックス化および[保持][23]されるかを決定できます。また、各フィルターに一致するスパンの保持率を設定することも可能です。その後、インデックス化されたこれらのトレースはモニターで使用できます。

| 製品                                                | スパンソース                                                      |
|--------------------------------------------------------|------------------------------------------------------------------|
| モニター                                               | カスタム保持フィルターからのスパン                              |
| その他の製品 <br><i>(ダッシュボード、ノートブックなど)</i> | カスタム保持フィルター + Datadog インテリジェントフィルターからのスパン |

{{% /collapse-content %}}

## トレースメトリクス

このセクションでは、トレースメトリクスにおける不一致や不整合のトラブルシューティングについて説明します。

{{% collapse-content title="トレースメトリクスとカスタムスパンベースのメトリクスが異なる値を持つ" level="h4" %}}

トレースメトリクスとカスタムスパンベースのメトリクスは、異なるデータセットに基づいて計算されるため、異なる値を持つことがあります。

- [トレースメトリクス][24]は、[トレース取り込みサンプリング][25]の構成に関係なく、アプリケーションのトラフィックの 100% に基づいて計算されます。トレースメトリクスのネームスペースは次の形式に従います: `trace.<SPAN_NAME>.<METRIC_SUFFIX>`。
- [カスタムスパンベースのメトリクス][26]は、取り込まれたスパンに基づいて生成されます。これらのスパンは、[トレース取り込みサンプリング][25]の設定によって異なります。例えば、トレースの 50% を取り込んでいる場合、カスタムスパンベースのメトリクスは取り込まれた 50% のスパンに基づきます。

トレースメトリクスとカスタムスパンベースのメトリクスの値を一致させるためには、アプリケーションまたはサービスに対して 100% の取り込み率を構成する必要があります。

<div class="alert alert-info">メトリクス名は、<a href="/metrics/custom_metrics/#naming-custom-metrics">メトリクス命名規則</a>に従う必要があります。<code>trace.*</code> で始まるメトリクス名は許可されず、保存されません。</div>

{{% /collapse-content %}}

## サービス

このセクションでは、サービスに関連する問題のトラブルシューティング方法について説明します。

{{% collapse-content title="Datadog で 1 つのサービスが複数のサービスとして表示される" level="h4" %}}

これは、すべてのスパンでサービス名が一貫していない場合に発生する可能性があります。

例えば、`service:test` という単一のサービスが Datadog で以下の複数のサービスとして表示される場合が考えられます。
- `service:test`
- `service:test-mongodb`
- `service:test-postgresdb`

[推測されたサービス依存関係 (プレビュー版)][30] を使用できます。推測された外部 API は、デフォルトの命名スキーム `net.peer.name` を使用します。例えば、`api.stripe.com`、`api.twilio.com`、`us6.api.mailchimp.com` などです。推測されたデータベースは、デフォルトの命名スキーム `db.instance` を使用します。

または、`DD_SERVICE_MAPPING` や `DD_TRACE_SERVICE_MAPPING` などの環境変数を使用して、サービス名をマージすることもできます (言語に応じて異なります)。

詳細は、[Datadog トレーシングライブラリの構成][27]を参照するか、またはこちらで使用する言語を選択してください。

{{< tabs >}}
{{% tab "Java" %}}

`dd.service.mapping`
: **環境変数**: `DD_SERVICE_MAPPING`<br>
**デフォルト**: `null`<br>
**例**: `mysql:my-mysql-service-name-db, postgresql:my-postgres-service-name-db`<br>
構成でサービス名を動的に変更します。異なるサービス間でデータベースに異なる名前を付ける場合に便利です。

{{% /tab %}}

{{% tab "Python" %}}

`DD_SERVICE_MAPPING`
: サービス名のマッピングを定義し、トレース内におけるサービスの名前変更を許可します (例: `postgres:postgresql,defaultdb:postgresql`)。バージョン 0.47 以降で利用可能。

{{% /tab %}}
{{% tab "Go" %}}

`DD_SERVICE_MAPPING`
: **デフォルト**: `null` <br>
構成により、サービス名を動的に変更することができます。サービス名はカンマやスペースで区切ることができ、例えば `mysql:mysql-service-name,postgres:postgres-service-name`、`mysql:mysql-service-name postgres:postgres-service-name` のようにすることができます。

{{% /tab %}}
{{% tab "Node.js" %}}

`DD_SERVICE_MAPPING`
: **構成**: `serviceMapping`<br>
**デフォルト**: N/A<br>
**例**: `mysql:my-mysql-service-name-db,pg:my-pg-service-name-db`<br>
各プラグインのサービス名を提供します。カンマ区切りの `plugin:service-name` ペア (スペースありまたはなし) を許容します。

{{% /tab %}}
{{% tab ".NET" %}}

`DD_TRACE_SERVICE_MAPPING`
: コンフィギュレーションを使用してサービスの名前を変更します。名前を変更するサービス名（キー）と、代わりに使う名前（値）のペアを `[from-key]:[to-name]` の形式で指定したカンマ区切りのリストを受け入れます。<br>
**例**: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
`from-key` はインテグレーションタイプに固有で、アプリケーション名のプレフィックスは取り除く必要があります。たとえば、`my-application-sql-server` の名前を `main-db` に変更するには、`sql-server:main-db` を使用します。バージョン 1.23.0 で追加されました。

{{% /tab %}}
{{% tab "PHP" %}}

`DD_SERVICE_MAPPING`
: **INI**: `datadog.service_mapping`<br>
**デフォルト**: `null`<br>
APM インテグレーションのデフォルト名を変更します。例えば、`DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db` のように、1つまたは複数のインテグレーションを一度に名前変更します ([インテグレーション名][1000]を参照してください)。

[1000]: https://docs.datadoghq.com/ja/tracing/trace_collection/library_config/php#integration-names

{{% /tab %}}
{{% tab "Ruby" %}}

Ruby は `DD_SERVICE_MAPPING` または `DD_TRACE_SERVICE_MAPPING` をサポートしていません。サービス名を変更するためのコードオプションについては、[追加の Ruby 構成][2000]を参照してください。

[2000]: https://docs.datadoghq.com/ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#advanced-configuration

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Plan and Usage ページで取り込まれたスパン/インデックス化されたスパンが予期せず増加している" level="h4" %}}

データの取り込みやインデックス化の急増は、さまざまな要因によって引き起こされることがあります。増加の原因を調査するには、[APM トレース推定使用量メトリクス][31]を使用してください。

| 使用量タイプ | メトリクス | 説明 |
| ------- | ------------ |------------ |
| APM インデックス化スパン     | `datadog.estimated_usage.apm.indexed_spans` | タグ付ベースの保持フィルターによってインデックス化されたスパンの総数。|
| APM 取り込みスパン     | `datadog.estimated_usage.apm.ingested_spans`| 取り込みスパンの総数。 |

[APM Traces Usage ダッシュボード][28]には、大まかな KPI と追加の使用情報を表示する複数のウィジェットグループが含まれています。

{{% /collapse-content %}}

{{% collapse-content title="エラーメッセージとスタックトレースが欠落している" level="h4" %}}

エラーステータスを持つ一部のトレースでは、**Errors** タブに例外の詳細ではなく `Missing error message and stack trace` (エラーメッセージとスタックトレースが欠落している) と表示されます。

スパンがこのメッセージを表示する理由は、以下の 2 つが考えられます。
- スパンが未処理の例外を含んでいる。
- スパン内の HTTP レスポンスが 400 から 599 の間の HTTP ステータスコードを返した。

try/catch ブロックで例外が処理される場合、`error.message`、`error.type`、および `error.stack` スパンタグは設定されません。詳細なエラースパンタグを設定するには、[カスタムインスツルメンテーション][18]コードを使用します。

{{% /collapse-content %}}

## データボリュームガイドライン

以下の問題が発生している場合、[Datadog の容量ガイドライン][29]を超過している可能性があります。

- Datadog プラットフォームで、トレースメトリクスが期待通りにレポートされていない。
- Datadog プラットフォームで、期待通りに表示されるはずのリソースの一部が表示されていない。
- サービスからのトレースは表示されているが、[サービスカタログページ][32]でこのサービスを見つけることができない。

{{% collapse-content title="データ容量のガイドライン" level="h4" %}}

インスツルメント済みのアプリケーションは、現時点から最大過去18時間および未来2時間までのタイムスタンプのスパンを送信できます。

Datadog は、40 分間隔で以下の組み合わせを受け入れます。

- 5000 個の一意な `環境` と `サービス` の組み合わせ
- 環境ごとに 30 個の一意な `秒単位のプライマリタグ値`
- 環境およびサービスごとに 100 個の一意な `オペレーション名`
- 環境、サービス、および操作名ごとに 1000 個の一意な `リソース`
- 環境およびサービスごとに 30 個の一意な `バージョン`

より大きな容量に対応する必要がある場合は、[Datadog サポート][1]に連絡してユースケースを伝えてください。

Datadog では、以下の文字列が指定された文字数を超えた場合、切り捨てられます。

| 名前            | 文字 |
|-----------------|------------|
| [サービス][6]    |  100       |
| オペレーション       |  100       |
| type            |  100       |
| [リソース][7]   |  5000      |
| [タグキー][8]    |  200       |
| [タグの値][8]  |  25000     |

また、スパンに存在する[スパンタグ][8]の数が、1024 以上にならないようにしてください。

{{% /collapse-content %}}

{{% collapse-content title="サービスの数がデータ容量のガイドラインで指定された数を超えている" level="h4" %}}

サービス数が[データ量ガイドライン](#data-volume-guidelines)で指定されている数を超える場合は、サービスの命名規則について以下のベストプラクティスを試してみてください。

### サービス名から環境タグの値を除外する

デフォルトでは、環境 (`env`) は [Datadog APM][17] のプライマリタグになります。

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-3.png" alt="Environment はデフォルトのプライマリタグです" style="width:100%;" >}}

サービスは通常、`prod`、`staging`、`dev` などの複数の環境にデプロイされます。リクエスト数、レイテンシー、エラー率などのパフォーマンスメトリクスは、さまざまな環境間で異なっています。サービスカタログの環境ドロップダウンを使用すると、**Performance** タブのデータを特定の環境にスコープすることができます。

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-2.png" alt="サービスカタログの `env` ドロップダウンを使って、特定の環境を選択します" style="width:100%;" >}}

サービスの数が増えすぎて問題になりがちなのが、サービス名に環境値を含めるパターンです。例えば、`prod-web-store` と `dev-web-store` のように 2 つの環境で動作しているため、1 つではなく 2 つのユニークなサービスがある場合です。

Datadog では、サービス名を変更することでインスツルメンテーションを調整することを推奨しています。

トレースメトリクスはアンサンプリングされるため、インスツルメンテーションされたアプリケーションでは、部分的なデータではなく、すべてのデータが表示されます。また、[ボリュームガイドライン](#data-volume-guidelines)も適用されます。

### メトリクスパーティションを置いたり、変数をサービス名にグループ化する代わりに、第 2 プライマリタグを使用する

第 2 のプライマリタグは、トレースメトリクスのグループ化および集計に使用できる追加タグです。ドロップダウンを使用して、指定されたクラスター名またはデータセンターの値にパフォーマンスデータをスコープすることができます。

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-1.png" alt="ドロップダウンメニューを使用して、特定のクラスターまたはデータセンターの値を選択します" style="width:100%;" >}}

第 2 のプライマリタグを適用せず、サービス名にメトリクスパーティションやグループ化変数を含めると、アカウント内のユニークなサービス数が不必要に増加し、遅延やデータ損失の可能性があります。

例えば、サービス `web-store` の代わりに、サービス `web-store-us-1`、`web-store-eu-1`、`web-store-eu-2` という異なるインスタンス名を指定して、これらのパーティションのパフォーマンスメトリクスを並べて確認することができます。Datadog では、**リージョン値** (`us-1`、`eu-1`、`eu-2`) を 2 番目のプライマリタグとして実装することを推奨しています。

{{% /collapse-content %}}

## 接続エラー

このセクションでは、アプリケーションと Datadog Agent 間の接続および通信の問題の診断と解決方法について説明します

{{% collapse-content title="インスツルメンテーションされたアプリケーションが Datadog Agent と通信していない" level="h4" %}}

これらの問題の検出と解決方法については、[接続エラー][4]を参照してください。

{{% /collapse-content %}}

## リソース使用量

このセクションでは、リソース使用量に関連するパフォーマンスの問題のトラブルシューティングに関する情報を記載しています。

{{% collapse-content title="メモリ不足エラー" level="h4" %}}

トレースコレクションの CPU 使用率の検出と Agent の適切なリソース制限の計算については、[Agent のリソース使用量][10]を参照してください。

{{% /collapse-content %}}

{{% collapse-content title="レート制限または最大イベントエラーメッセージ" level="h4" %}}

Datadog Agent ログで、レート制限や 1 秒あたりの最大イベント数に関するエラーメッセージが表示される場合、[以下の手順][9]に従い制限を変更します。ご不明な点は、Datadog [サポートチーム][1]までお問い合わせください。

{{% /collapse-content %}}

## セキュリティ

このセクションでは、機密データの保護やトラフィックの管理など、APM のセキュリティに関する懸念に対処するためのアプローチを説明します。

{{% collapse-content title="スパンを変更、破棄、または難読化する" level="h4" %}}

Datadog Agent または一部の言語でトレースクライアント内で構成可能な、ヘルスチェックやその他不要なトラフィックに関連する機密データのスクラブやトレースの破棄に関しては、複数の構成オプションが用意されています。利用可能なオプションについては、[セキュリティと Agent のカスタマイズ][11]を参照してください。本文では代表的な例をご紹介していますが、これらのオプションをお使いの環境に適用する際にサポートが必要な場合は、[Datadog サポート][1]までお問い合わせください。

{{% /collapse-content %}}

## デバッグとログ

このセクションでは、デバッグログと起動ログを使用して、Datadog トレーサーの問題を特定し解決する方法について説明します。

{{% collapse-content title="デバッグログ" level="h4" %}}

Datadog トレーサーの詳細をすべて取得するには、`DD_TRACE_DEBUG` 環境変数を使いトレーサーのデバッグモードを有効にします。独自の調査のために有効にしたり、Datadog サポートもトリアージ目的で推奨している場合に、有効にしたりできます。ただし、ログのオーバーヘッドが発生するのを避けるため、テストが終わったらデバッグログを必ず無効にしてください。

これらのログは、インスツルメンテーションエラーやインテグレーション固有のエラーを明らかにすることができます。デバッグログの有効化と取得に関する詳細は、[デバッグモードのトラブルシューティングページ][5]を参照してください。

{{% /collapse-content %}}

{{% collapse-content title="起動ログ" level="h4" %}}

起動時、Datadog トレースライブラリは、JSON オブジェクトに適用された設定を反映するログおよび発生したエラーを出力します。それには、対応する言語で Agent に到達できるかも含まれます。一部の言語では、この起動ログが環境変数 `DD_TRACE_STARTUP_LOGS=true` で有効化されている必要があります。詳しくは[起動ログ][3]を参照してください。

{{% /collapse-content %}}

## 追加サポート

追加サポートが必要な場合は、Datadog サポートにチケットを開いてください。

{{% collapse-content title="Datadog サポートチケット" level="h4" %}}

[サポートチケット][1]を開くと、Datadog サポートチームは以下の情報を求める場合があります。

1. **問題のトレースへのリンクまたはスクリーンショット**: トラブルシューティングの目的で問題を再現するのに役立ちます。

2. **トレーサーの起動ログ**: 起動ログは、トレーサーの誤構成やトレーサーと Datadog Agent 間の通信の問題を特定するのに役立ちます。トレーサーの構成とアプリケーションまたはコンテナの設定を比較することで、サポートチームは不適切に適用された設定を特定できます。

3. **トレーサーのデバッグログ**: トレーサーのデバッグログは、起動ログよりも詳細な情報を提供し、以下を明らかにします。
   - アプリケーションのトラフィックフロー中の適切なインテグレーションインスツルメンテーション
   - トレーサーによって作成されたスパンの中身
   - スパンを Agent に送信する際の接続エラー

4. **Datadog Agent フレア**: [Datadog Agent フレア][12]により Datadog Agent 内で起きていること (例えば、トレースが拒否または不正な形式にされているか) を確認できます。これはトレースが Datadog Agent に到達していない場合は役に立ちませんが、問題の原因やメトリクスの不一致を特定することはできます。

5. **お客様の環境の説明**: お客様のアプリケーションのデプロイ構成を理解することで、サポートチームはトレーサーと Agent 間の通信の問題の可能性を特定し、誤構成を特定できます。複雑な問題の場合、サポートは Kubernetes マニフェスト、ECS タスク定義、または同様のデプロイコンフィギュレーションファイルを求めることがあります。

6. **カスタムトレースコード**: カスタムインスツルメンテーション、構成、およびスパンタグの追加は、Datadog でのトレースの視覚化に大きな影響を与える可能性があります。

7. **バージョン情報**: 使用している言語、フレームワーク、Datadog Agent、Datadog トレーサーのバージョンを把握することで、サポートは[互換性要件][15]の確認、既知の問題の確認、またはバージョンアップグレードの推奨を行うことができます。例:

{{% /collapse-content %}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/tracing/metrics/metrics_namespace/
[3]: /ja/tracing/troubleshooting/tracer_startup_logs/
[4]: /ja/tracing/troubleshooting/connection_errors/
[5]: /ja/tracing/troubleshooting/tracer_debug_logs/
[6]: /ja/tracing/glossary/#services
[7]: /ja/tracing/glossary/#resources
[8]: /ja/glossary/#span-tag
[9]: /ja/tracing/troubleshooting/agent_rate_limits
[10]: /ja/tracing/troubleshooting/agent_apm_resource_usage/
[11]: /ja/tracing/custom_instrumentation/agent_customization
[12]: /ja/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[13]: /ja/agent/troubleshooting/debug_mode/?tab=agentv6v7
[14]: /ja/tracing/custom_instrumentation/
[15]: /ja/tracing/compatibility_requirements/
[16]: /ja/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-a-second-primary-tag-in-datadog
[17]: /ja/tracing/guide/setting_primary_tags_to_scope/
[18]: /ja/tracing/trace_collection/custom_instrumentation/?tab=datadogapi
[19]: /ja/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[20]: https://app.datadoghq.com/apm/traces
[21]: /ja/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
[22]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[23]: /ja/developers/guide/data-collection-resolution-retention/
[24]: /ja/tracing/metrics/metrics_namespace/
[25]: /ja/tracing/trace_pipeline/ingestion_mechanisms/?tab=java
[26]: /ja/tracing/trace_pipeline/generate_metrics/
[27]: /ja/tracing/trace_collection/library_config/
[28]: https://app.datadoghq.com/dash/integration/apm_estimated_usage
[29]: /ja/tracing/troubleshooting/#data-volume-guidelines
[30]: /ja/tracing/guide/inferred-service-opt-in/?tab=java
[31]: /ja/tracing/trace_pipeline/metrics/#apm-traces-estimated-usage-dashboard
[32]: https://app.datadoghq.com/services