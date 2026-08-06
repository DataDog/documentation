---
algolia:
  tags:
  - tagging
aliases:
- /ja/getting_started/getting_started_with_tags
- /ja/guides/getting_started/tagging/
- /ja/developers/getting_started/tagging/
- /ja/tagging
- /ja/guides/tagging/
- /ja/faq/when-i-query-can-i-use-wildcards-in-metric-names-and-events/
description: Datadog でタグを割り当て、使用する方法について説明します。
further_reading:
- link: /getting_started/tagging/assigning_tags/
  tag: ドキュメント
  text: タグの割り当て方法
- link: /getting_started/tagging/unified_service_tagging/
  tag: ドキュメント
  text: 統合サービスタグ付けの構成方法を学ぶ
- link: /getting_started/tagging/using_tags/
  tag: ドキュメント
  text: タグの使用方法について
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Datadog を使用した効果的なタグ付けに関するインタラクティブセッションに参加する。
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: ブログ
  text: Datadog を使用して効果的なエグゼクティブ向けダッシュボードを設計する
- link: https://learn.datadoghq.com/courses/tagging-best-practices
  tag: ラーニングセンター
  text: タグ付けのベストプラクティス
title: タグの使用を開始する
---
## 概要 {#overview}

タグは、Datadog のテレメトリに次元を追加するための手段であり、これにより Datadog の可視化においてフィルタリング、集約、比較が可能になります。[タグを使用することにより][1]、複数のホストにわたる集約パフォーマンスを観察することができ、さらには (オプションとして) 特定の要素に基づいてセットをさらに絞り込むことができます。要約すると、タグ付けは集約データポイントを観察するための 1 つの手段です。

タグの形式には、`<key>:<value>` と `<value>` があります。Datadog では `<key>:<value>` 形式の使用を推奨しています。そのほうが意味がより明確であり、より豊かなクエリ機能 (たとえば、キーによるグルーピング) が可能です。`<key>:<value>` ペアを使用する場合:

- タグ**キー**は識別子です。一般的に使用されるタグキーとして `env`、`instance`、および `name` があります。
- タグの**値** は、キーに関連付けられた特定のデータまたは情報です。タグ値はリソースごとに一意ではなく、`<key>:<value>` ペア内の多くのリソースで使用できます。

タグ付けにより、Datadog のさまざまなデータタイプをバインドし、メトリクス、トレース、ログの間でアクションを関連付け、呼び出すことができます。これは **予約済み** タグキーを使用して実現されます。
| タグキー   | 可能になる機能                                                             |
|-----------|------------------------------------------------------------------------|
| `host`    | メトリクス、トレース、プロセス、ログの間の関連付け。             |
| `device`  | デバイスまたはディスクごとのメトリクス、トレース、プロセス、ログの分離。|
| `source`  | Log Management のためのスパンの絞り込みと自動パイプライン。    |
| `service` | メトリクス、トレース、ログにおけるアプリケーション固有データのスコーピング。|
| `env`     | メトリクス、トレース、ログにおけるアプリケーション固有データのスコーピング。|
| `version` | メトリクス、トレース、ログにおけるアプリケーション固有データのスコーピング。|
| `team`    | リソースに所有権を割り当てる。                                 |

Datadog では、`service` レベルでコンテナ、VM、およびクラウドインフラストラクチャーを集約して見ることを推奨しています。たとえば、サーバー A やサーバー B の CPU 使用率を個別に見るのではなく、サービスを表すホストコレクション全体の CPU 使用率を見るということです。

コンテナやクラウド環境では、定期的にホストが入れ替わるため、タグを使用してメトリクスを集計することが重要です。

## タグの定義 {#define-tags}

タグ文字列 (`<key>:<value>` または `<value>` の内容全体) は、以下の要件を満たす必要があります。

- タグ文字列は**英字**で始まる必要があります (タグの形式が `<key>:<value>` かそれとも `<value>` かに関係なく適用)。先頭の文字の後、タグ文字列には以下の文字を含めることができます。

    - 英字 (a、ó、気、녕、ك、ดีなど、すべての Unicode 英字がサポートされます)
    - 数字
    - アンダースコア (先頭と末尾のアンダースコアは削除され、連続するアンダースコアは1つにまとめられます)
    - マイナス
    - コロン
    - ピリオド
    - スラッシュ
    - ([HTTP 経由で取り込まれた][28]ログのタグのみ) アットマーク (`@`)

    他のすべての文字 (カンマ、絵文字、バックスラッシュ、スペースなど) はアンダースコアに変換されます。
    
    **注**:
    - Agent レベルで設定された `env` タグなど、一部のコンテキストでは、数字で始まるタグが受け入れられる場合があります。ただし、標準の命名規則に従わないタグは、すべての Datadog 製品で一貫して機能しない可能性があり、タグのカーディナリティが増加する可能性があります。特定の製品で明示的にサポートされているのでない限り、タグは英字で始めてください。
    - `DD_TAGS` 環境変数では、タグ間の区切りとして空白が使用されます。`DD_TAGS` の値に含まれる空白は**アンダースコア**に変換されません。たとえば、`DD_TAGS="test:this is a test"` では `test:this`、`is`、`a`、および `test` の 4 つの別々のタグが生成されます。スペースを含むタグ値を設定するには、YAML 構成ファイルまたは統合アノテーションを使用してください。その場合、空白がアンダースコアに変換されます。

- タグは**最大200文字**まで使用できます。タグが `<key>:<value>` 形式の場合、キー、`:`、および値は、すべて文字制限のカウントに含まれます。
- [スパンタグ][26]およびメトリックタグは小文字に正規化されるため、タグキーにはキャメルケースを使用しないでください。さまざまなクラウドプロバイダーを通じて、キャメルケースの正規化は一貫していません。たとえば、AWS では `TestTag` を `testtag` に変換し、Alibaba Cloud では `TestTag` を `test_tag` に変換します。
    - タグとは異なり、[スパン属性][27]とログ属性では大文字と小文字が区別され、正規化されません。
- 形式 `<key>:<value>` を使用する場合、常にグローバルタグ定義の最初のコロンまでがキーです。たとえば、以下のとおりです。
    
    | タグ                | キー           | 値          |
    | ------------------ | ------------- | -------------- |
    | `env:staging:east` | `env`         | `staging:east` |
    | `env_staging:east` | `env_staging` | `east`         |

- エポックタイムスタンプ、ユーザー ID、リクエスト ID などを、むやみにタグの生成源として採用しないようにしてください。そのようにすると、[メトリクス][2]の数が無制限に増加する可能性があります。


## タグの付け方 {#assign-tags}

### タグ付けの方法 {#tagging-methods}

タグ付けは、次のいずれか (またはすべて) の方法を使用して実行できます。

| 方法                   | タグ付けの方法                                                     |
| ------------------------ | --------------------------------------------------------------- |
| [構成ファイル][3] | メインの Agent または統合構成ファイルで手動。|
| [UI][4]                  | Datadog サイトで。                                            |
| [API][5]                 | Datadog の API を使用する場合。                                       |
| [DogStatsD][6]           | DogStatsD でメトリクスを送信する際。                         |

詳しくは、[タグの付け方][7]をご覧ください。

#### 統合サービスタグ付け {#unified-service-tagging}

ベストプラクティスとして、Datadog はタグを割り当てるときに統合サービスタグ付けを使用することをお勧めします。unified service tagging は、`env`、`service`、および `version` の 3 つの標準タグを使用して Datadog テレメトリを結び付けます。unified service tagging で環境を構成する方法については、[統合サービスタグ付け][8]を参照してください。

### タグの継承 {#tag-inheritance}

すべてのメトリクス、ログ、トレース、および統合は、データが Datadog に取り込まれる際に `host-tag` 継承のプロセスを経ます。データは特定のホスト名に関連付けられているため、それらのコンポーネントは、そのホストに関連付けられているすべての `host-level` タグを継承します。これらのタグは、クラウドプロバイダーまたは Datadog Agent に由来する特定のホストの [インフラストラクチャーリスト][12] に表示されます.詳細については、[新しいホストまたはノードの `host-level` タグが欠落][25] を参照してください。

タグは複数のソースから継承される可能性があるため、ソース間で重複しないように固有かつ具体的なキー名を選択してください。たとえば、ホスト (`service:my-host`) で `service` キーを設定し、そのホスト上で実行されている Pod (`service:my-service`)で `service` キーを設定した場合、データは両方のタグを継承します。タグキーの重複を避けるために、より差別化されたキー名 (`infra_service` など) を選択してください。

### タグの優先度 {#tag-precedence}

Datadog Agent では、さまざまなソースに由来するタグについて優先順位が強制適用**されません**。その代わり、Agent はあらゆる利用可能なソースからすべてのタグを収集し、特定のタグキーに対してそれぞれ固有の値を保存し、それらすべてをテレメトリと共に送信します。

したがって、単一のタグキーの設定が複数ソース間で異なる場合、値が複数個になる可能性があります。たとえば、`service` タグが環境変数の中では `payments` に、Agent YAML では `checkout` に、トレースクライアント構成では `orders` に設定されている場合、そのサービスのテレメトリには次の内容が含まれる可能性があります。

```
service:payments
service:checkout
service:orders
```

下流のフィルターやダッシュボードで、値が 1 つだけであることが期待されている場合、明示的にその値でフィルタリングする必要があります。

## 使用方法 {#usage}

ホストレベルとインテグレーションレベルで[タグを割り当てた後][9]、それらを使用することにより、メトリクス、トレース、ログのフィルタリングとグループ化を開始します。タグは、Datadog プラットフォームの以下の領域で使用されます。

| 領域                 | タグの用途                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| [イベント][10]         | イベントストリームの絞り込み。                                                                         |
| [ダッシュボード][11]     | グラフでのメトリクスの絞り込みおよびグループ化。                                                              |
| [インフラストラクチャー][12] | ホストマップ、インフラストラクチャーリスト、ライブコンテナ、ライブプロセスビューの絞り込みとグループ化。|
| [モニター][13]       | モニターの管理、モニターの作成、またはダウンタイムの管理。                                            |
| [メトリクス][14]        | メトリクスエクスプローラーでの絞り込みとグループ化。                                                       |
| [Integrations][15]   | AWS、Google Cloud、Azure のメトリクスをオプションで制限。                                       |
| [APM][16]            | サービス、トレース、プロファイルをフィルターにかける。Service Map を使って他のエリアに移動する。          |
| [RUM とセッションリプレイ][17] | RUM エクスプローラーで、イベント検索、分析、パターン、リプレイ、問題をフィルターにかける。       |
| [Synthetic Monitoring & Continuous Testing][18]     | Synthetic Monitoring & Testing Results エクスプローラーを使用して、Synthetic テストや CI パイプラインで実行中のテストをフィルタリングおよびグループ化する。  |
| [Notebooks][19]      | グラフでのメトリクスの絞り込みおよびグループ化。                                                              |
| [ログ][20]           | ログ検索、分析、パターン、テール、パイプラインの絞り込み。                               |
| [SLO][21]           | SLO、グループ化されたメトリクスベース SLO、グループ化されたモニターベース SLO の検索。                      |
| [開発者][22]     | API を使用して情報を取得、または UI のさまざまな領域をセットアップ。                               |
| [Billing][23]        | 3 つのタグを選択することで Datadog の使用量を報告します。たとえば、`env`、`team`、`account_id`のように選択できます。|
| [CI Visibility][24]  | CI Visibility エクスプローラーを使用して、テスト実行またはパイプライン実行をフィルタリングおよびグループ化します。|

詳しくは、[タグの使用方法][1]をご覧ください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/using_tags/
[2]: /ja/metrics/
[3]: /ja/getting_started/tagging/assigning_tags/#configuration-files
[4]: /ja/getting_started/tagging/assigning_tags/#ui
[5]: /ja/getting_started/tagging/assigning_tags/#api
[6]: /ja/getting_started/tagging/assigning_tags/#dogstatsd
[7]: /ja/getting_started/tagging/assigning_tags/
[8]: /ja/getting_started/tagging/unified_service_tagging
[9]: /ja/integrations/
[10]: /ja/getting_started/tagging/using_tags/#events
[11]: /ja/getting_started/tagging/using_tags/#dashboards
[12]: /ja/getting_started/tagging/using_tags/#infrastructure
[13]: /ja/getting_started/tagging/using_tags/#monitors
[14]: /ja/getting_started/tagging/using_tags/#metrics
[15]: /ja/getting_started/tagging/using_tags/#integrations
[16]: /ja/getting_started/tagging/using_tags/#apm
[17]: /ja/getting_started/tagging/using_tags/#rum--session-replay
[18]: /ja/getting_started/tagging/using_tags/#synthtics
[19]: /ja/getting_started/tagging/using_tags/#notebooks
[20]: /ja/getting_started/tagging/using_tags/#logs
[21]: /ja/getting_started/tagging/using_tags/?tab=manageslos#service-level-objectives
[22]: /ja/getting_started/tagging/using_tags/#developers
[23]: /ja/account_management/billing/usage_attribution/
[24]: /ja/getting_started/tagging/using_tags/#ci-visibility
[25]: /ja/containers/troubleshooting/log-collection?tab=datadogoperator#missing-host-level-tags-on-new-hosts-or-nodes
[26]: /ja/tracing/trace_collection/tracing_naming_convention/#span-tags
[27]: /ja/tracing/trace_collection/tracing_naming_convention/#span-attributes
[28]: /ja/api/latest/logs/#send-logs