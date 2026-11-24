---
algolia:
  tags:
  - metrics without limits
aliases:
- /ja/metrics/faq/metrics-without-limits/
- /ja/metrics/guide/metrics-without-limits-getting-started/
- /ja/metrics/faq/why-is-my-save-button-disabled/
description: カスタムメトリクスの取り込みとインデックス作成を切り離して、どのタグをクエリ可能にするかを選択することでボリュームとコストを管理します。
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: ブログ
  text: Metrics without Limits™ でカスタムメトリクスのボリュームをダイナミックにコントロール
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: インタラクティブなセッションに参加して、メトリクスの可能性を最大限に引き出す
title: Metrics without Limits™
---
## 概要 {#overview}

Metrics without Limits™ は、カスタムメトリクスの取り込みとインデックス作成を切り離すことで、カスタムメトリクスのボリュームを柔軟にコントロールすることができます。組織にとって価値のあるカスタムメトリクスタグにのみ料金を支払います。

Metrics without Limits™ は、Datadog 全体でクエリ可能にしておくタグの許可リストを選択することでアプリ内のすべてのメトリクスタイプにタグを構成できるようにします。これにより、アプリケーションレベルまたはビジネスメトリクス (例: `host`) に付けられた非必須タグが自動的に削除されます。また、アプリ内でタグのブロックリストを構成して、タグを削除および除外することもできます。これにより、チームにビジネス価値を提供する残りの必須タグが自動的に保持されます。いずれも [[Metrics Catalog] ページ][1]で設定できます。

このページでは、観測可能な予算内でカスタムメトリクス量を管理するのに役立つ Metrics without Limits™ の主要コンポーネントを確認します。

### 単一メトリクスのタグの構成 {#configuration-of-tags-for-a-single-metric}

#### タグの許可リスト {#allowlist-of-tags}

1. 任意のメトリクス名をクリックして、その詳細サイドパネルを開きます。
2. [{{< ui >}}Manage Tags{{< /ui >}}] (タグの管理)、[{{< ui >}}Include tags{{< /ui >}}] (タグを含める) の順にクリックして、ダッシュボード、ノートブック、モニター、その他の Datadog 製品でクエリ可能なままにするタグを設定します。
3. タグの許可リストを定義します。
デフォルトでは、タグ構成モーダルには、過去 30 日間にダッシュボード、ノートブック、モニター、または API でアクティブにクエリされたタグの Datadog 推奨許可リストが事前に入力されます。推奨タグは、グラフ線アイコンで区別されます。
   a. さらに、アセットで使用されるタグを含めます (ダッシュボード、モニター、ノートブック、SLO)。これらのタグはアセットで使用されますが、アクティブにクエリされることはなく、ターゲットアイコンでマークされます。これらを追加することで、重要なアセットの可視性を失わないようにできます。
4. この潜在的なタグ構成から得られる、インデックス化されたカスタムメトリクスの*推定新規ボリューム*を確認します。
5. [{{< ui >}}Save{{< /ui >}}] をクリックします。

{{< img src="metrics/mwl_example_include_tags-compressed_03182025.mp4" alt="許可リストを使用したタグの構成" video=true style="width:100%" >}}

{{< img src="metrics/tags_used_assets.png" alt="MWL 構成のアセットで使用されるタグを追加できるお客様の表示" style="width:100%" >}}

メトリクス API を通じて、タグの構成を[作成][2]、[編集][3]、[削除][4]、および[影響を見積もる][5]ことができます。

#### タグのブロックリスト {#blocklist-of-tags}

1. 任意のメトリクス名をクリックして、その詳細サイドパネルを開きます。
2. [{{< ui >}}Manage Tags{{< /ui >}}] (タグ)、[{{< ui >}}Exclude Tags{{< /ui >}}] (タグを除外) の順にクリックします。
3. タグのブロックリストを定義します。ブロックリストに定義されたタグは、ダッシュボードとモニターでクエリ**できません**。過去 30 日間にダッシュボード、ノートブック、モニター、API でアクティブにクエリされたタグは、グラフ線アイコンで区別されます。
4. この潜在的なタグ構成から得られる、インデックス化されたカスタムメトリクスの*推定新規ボリューム*を確認します。
5. [{{< ui >}}Save{{< /ui >}}] をクリックします。

{{< img src="metrics/mwl-example-tag-exclusion-compressed_04032025.mp4" alt="タグの除外を使用したタグの構成" video=true style="width:100%" >}}

メトリクス API でパラメーター `exclude_tags_mode: true` を設定して、タグのブロックリストを[作成][2]および[編集][3]します。

**注:** メトリクスのタグを管理するには、そのメトリクスのタイプが宣言されている必要があります。タイプの宣言は通常、メトリクスの送信時に行われますが、[Metrics Catalog] ページでメトリクスの [{{< ui >}}Edit{{< /ui >}}] (編集) ボタンを使用して手動で設定することもできます。

#### API を使用する {#use-the-api}

メトリクス API を通じて、タグの構成を[作成][2]、[編集][3]、[削除][4]、および[影響を見積もる][5]ことができます。

### 複数のメトリクスを一度に構成する {#configure-multiple-metrics-at-a-time}

ネームスペース内のすべてのメトリクスなど、複数のメトリクスについてタグを構成するには、[Tag Indexing Rules][16] を使用します。Tag Indexing Rules は、メトリクス名、ネームスペース、またはすべてのカスタムメトリクスに適用され、ルールに一致する新しいメトリクスを自動的に管理します。既存の Metrics without Limits™ の構成は、タグインデックスルールよりも優先されます。

Tag Indexing Rules をプログラムで管理するには、[Tag Indexing Rules API][17] を使用します。

## Metrics without Limits™ の請求 {#metrics-without-limits-billing}

タグを構成すると、どのカスタムメトリクスがクエリ可能かを制御できるので、請求対象となるカスタムメトリクスの数を減らすことができます。Metrics without Limits™ は、インジェストコストとインデキシングコストを分離します。Datadog にすべてのデータを送り続けることができ (すべてインジェストされます)、Datadog プラットフォームでクエリ可能にするタグの許可リストを指定することができます。ユーザーが構成したメトリクスについて Datadog が取り込むデータ量が、インデックスを作成した、より少ない残りのデータ量と異なる場合、[Usage] (使用量) ページや [Metrics Catalog] ページに 2 つの異なるデータ量が表示されることがあります。

- [{{< ui >}}Ingested Custom Metrics{{< /ui >}}] (取り込まれたカスタムメトリクス): 取り込まれたすべてのタグに基づくカスタムメトリクスの元のボリューム。
- [{{< ui >}}Indexed Custom Metrics{{< /ui >}}] (カスタムメトリクス): Datadog プラットフォームでクエリ可能なカスタムメトリクスのボリューム (Metrics without Limits™ の構成に基づく)。

**注: カーディナリティ料金では、構成されたメトリクスのみがインジェストされたカスタムメトリクスのボリュームに寄与します。**メトリクスが Metrics without Limits™ で構成されていない場合、そのインデックスされたカスタムメトリクスのボリュームのみに課金されます。

[カスタムメトリクスの請求][8]の詳細はこちら。

### メトリクス名の料金 {#under-metric-name-pricing}

組織がカーディナリティ料金の代わりに[メトリクス名の料金][15]を使用している場合、取り込みとインデックスの関係は異なります。

| 側面                                       | カーディナリティ料金                                             | メトリクス名の料金                                                                  |
|----------------------------------------------|------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| 取り込みボリュームに寄与するメトリクス   | Metrics without Limits™ で構成されたメトリクスのみ             | すべてのメトリクス (送信されたすべてのデータポイント)                                              |
| ディストリビューションメトリクスの乗数               | 動作は Metrics without Limits™ の構成に依存する        | 構成に関係なく取り込みおよびインデックスの両方に適用される                     |

モデルの詳細については、[Custom Metrics のメトリクス名の料金][15]を参照してください。

## Metrics without Limits™ 入門 {#getting-started-with-metrics-without-limits}

1. [[Plan & Usage] (プランと使用量) ページ][9]で上位 20 個のメトリクスを特定し、[Metrics Catalog] ページから、または [API][2] を使用してそれらを構成します。
   複数のメトリクスでタグを構成するには、[Tag Indexing Rules][16] を使用します。

**注:** [タグコンフィギュレーション API を作成する][2]を使用している場合、タグコンフィギュレーションを作成する前に、まず[タグコンフィギュレーションカーディナリティ推定 API][5] を使用して、タグコンフィギュレーションの潜在的な影響を検証してください。UI または推定 API が、取り込みよりも大きいインデックスの結果の数を返す場合は、タグコンフィギュレーションを保存しないでください。

2. クエリ対象外のメトリクスについてタグのインデックスを解除します。

   チームは、Datadog プラットフォームでクエリされることのない、ノイズの多いメトリクスのタグのインデックスを解除してメトリクスを整理して、そのようなクエリ対象外メトリクスのコストを最小化できます。インデックス化されていないタグはクエリできなくなりますが、Datadog は引き続きそれらを取り込みます。多数のクエリ対象外メトリクスすべてについてタグのインデックスを解除するには、メトリクス名またはネームスペースにスコープを設定した [Tag Indexing Rule][16] を作成します。単一のメトリクスを構成するには、空のタグの許可リストを指定します。

3. 使用量と請求を確認します。メトリクスの構成後、3 つの方法で変更の影響を検証することができます。

   - コンフィギュレーションを保存する前に、タグコンフィギュレーションカーディナリティ推定機能は、インデックスされたカスタムメトリクスの結果の推定数を返しますが、これは取り込まれたカスタムメトリクスボリュームよりも少なくなるはずです。
   - コンフィギュレーションを保存すると、[Metrics Catalog] ページのメトリクスの詳細サイドパネルに、インデックス化されたカスタムメトリクスの量が取り込まれたカスタムメトリクスの量より少ないことが表示されるはずです。
   - コンフィギュレーションを保存してから 24 時間後に、[Plan & Usage] (計画と使用) ページの [{{< ui >}}Top Custom Metrics{{< /ui >}}] (上位カスタムメトリクス) テーブルでその影響を確認することもできます。このテーブルの [{{< ui >}}Month-to-Date{{< /ui >}}] (月初から今日まで) タブと [{{< ui >}}Most Recent Day{{< /ui >}}] (直近の日) タブの間で、カスタムメトリクスのボリュームが減少しているはずです。

## ベストプラクティス {#best-practices}

- リアルタイムの[推定カスタムメトリクス使用量][10]メトリクスにアラートを設定して、カスタムメトリクスのスパイクをコンフィギュレーションと関連付けることができます。

- Metrics without Limits™ 用の[ロールベースのアクセス制御][11]を使用して、課金に影響するこの機能を使用するアクセス許可を持つユーザーを制御することもできます。

- 監査イベントを使用すると、カスタムメトリクスのスパイクと相関する可能性のある、作成されたタグコンフィギュレーションまたはパーセンタイル集計を追跡できます。[イベントストリーム][12]で "tags:audit" および "queryable tag configuration" または "percentile aggregations" を検索します。

\*Metrics without Limits は Datadog, Inc. の商標です。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/catalog
[2]: /ja/api/latest/metrics/#create-a-tag-configuration
[3]: /ja/api/latest/metrics/#update-a-tag-configuration
[4]: /ja/api/latest/metrics/#delete-a-tag-configuration
[5]: /ja/api/latest/metrics/#tag-configuration-cardinality-estimator
[6]: /ja/metrics/#time-and-space-aggregation
[8]: /ja/account_management/billing/custom_metrics/
[9]: https://app.datadoghq.com/billing/usage
[10]: /ja/account_management/billing/usage_metrics/
[11]: /ja/account_management/rbac/permissions/?tab=ui#metrics
[12]: https://app.datadoghq.com/event/stream
[15]: /ja/account_management/billing/metric_name_pricing/
[16]: /ja/metrics/guide/tag-indexing-rules/
[17]: /ja/api/latest/metrics/#create-a-tag-indexing-rule