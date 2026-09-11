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

Metrics without Limits™ は、Datadog 全体でクエリ可能にしておくタグの許可リストを選択することでアプリ内のすべてのメトリクスタイプにタグを構成できるようにします。これにより、アプリケーションレベルまたはビジネスメトリクス (例: `host`) に付けられた非必須タグが自動的に削除されます。また、アプリ内でタグのブロックリストを構成して、タグを削除および除外することもできます。これにより、チームにビジネス価値を提供する残りの必須タグが自動的に保持されます。これらの構成機能は、[Metrics Summary][1]ページにあります。

このページでは、観測可能な予算内でカスタムメトリクス量を管理するのに役立つ Metrics without Limits™ の主要コンポーネントを確認します。

### 単一メトリクスのタグの構成 {#configuration-of-tags-for-a-single-metric}

#### タグの許可リスト {#allowlist-of-tags}

1. 任意のメトリクス名をクリックして、その詳細サイドパネルを開きます。
2. **Manage Tags**、**Include Tags** の順にクリックして、ダッシュボード、ノートブック、モニター、その他の Datadog 製品でクエリ可能にしておきたいタグを構成します。
3. タグの許可リストを定義します。
デフォルトでは、タグ構成モーダルには、過去 30 日間にダッシュボード、ノートブック、モニター、または API でアクティブにクエリされたタグの Datadog 推奨許可リストが事前に入力されます。推奨タグは、グラフ線アイコンで区別されます。
   a. さらに、アセットで使用されるタグを含めます (ダッシュボード、モニター、ノートブック、SLO)。これらのタグはアセットで使用されますが、アクティブにクエリされることはなく、ターゲットアイコンでマークされます。これらを追加することで、重要なアセットの可視性を失わないようにできます。
4. この潜在的なタグ構成から得られる、インデックス化されたカスタムメトリクスの*推定新規ボリューム*を確認します。
5. **保存**をクリックします。

{{< img src="metrics/mwl_example_include_tags-compressed_03182025.mp4" alt="許可リストを使用したタグの構成" video=true style="width:100%" >}}

{{< img src="metrics/tags_used_assets.png" alt="MWL 構成のアセットで使用されるタグを追加できるお客様の表示" style="width:100%" >}}

メトリクス API を通じて、タグの構成を[作成][2]、[編集][3]、[削除][4]、および[影響を見積もる][5]ことができます。

#### タグのブロックリスト {#blocklist-of-tags}

1. 任意のメトリクス名をクリックして、その詳細サイドパネルを開きます。
2. **タグの管理**、**タグの除外**の順にクリックします。
3. タグのブロックリストを定義します。ブロックリストに定義されたタグは、ダッシュボードとモニターでクエリ**できません**。過去 30 日間にダッシュボード、ノートブック、モニター、API でアクティブにクエリされたタグは、グラフ線アイコンで区別されます。
4. この潜在的なタグ構成から得られる、インデックス化されたカスタムメトリクスの*推定新規ボリューム*を確認します。
5. **保存**をクリックします。

{{< img src="metrics/mwl-example-tag-exclusion-compressed_04032025.mp4" alt="タグの除外を使用したタグの構成" video=true style="width:100%" >}}

メトリクス API でパラメーター `exclude_tags_mode: true` を設定して、タグのブロックリストを[作成][2]および[編集][3]します。

**注**: メトリクス上でタグを管理するには、メトリクスにタイプが宣言されている必要があります。これは通常、メトリクスを送信するときに行われますが、Metrics Summary でメトリクスを選択して `Edit` ボタンから手動で設定することも可能です。

#### API を使用する {#use-the-api}

メトリクス API を通じて、タグの構成を[作成][2]、[編集][3]、[削除][4]、および[影響を見積もる][5]ことができます。

### 複数のメトリクスを一度に構成する {#configure-multiple-metrics-at-a-time}

[一括メトリクスタグ構成機能][7]を使用して、カスタムメトリクスのボリュームを最適化します。構成されるメトリクスを指定するには、**メトリクスを構成**をクリックし、Metrics Summary ページで**タグを管理**をクリックします。構成するメトリクスまたはメトリクスネームスペースを選択し、次のいずれかを選択します。
   - [すべてのタグを許可](#allow-all-tags)して以前のタグ構成を上書きし、すべてのタグをクエリ可能にします。
   - [タグを含めるまたは除外する](#include-or-exclude-tags)ことで、クエリ可能なタグとクエリ不可能なタグをそれぞれ定義します。

#### すべてのタグを許可 {#allow-all-tags}

{{< img src="metrics/bulk_allow_all_tags.png" alt="タグの構成セクションで「すべてのタグを許可」が選択されている状態のタグの管理オプション" style="width:100%" >}}

このオプションはデフォルトで選択されており、以前に設定されたタグの構成を上書きしてすべてのタグをクエリ可能にします。

#### タグを含めるまたは除外する {#include-or-exclude-tags}

含めるまたは除外するタグを選択する際には、[既存のタグの構成を上書きする](#override-existing-tag-configurations)、または[既存のタグの構成を保持する](#keep-existing-tag-configurations)を選択します。

##### 既存のタグの構成を上書きする {#override-existing-tag-configurations}

{{< img src="metrics/bulk_include_tags.png" alt="タグの構成セクションで「タグを含める」と「上書きする」が選択されている状態のタグの管理オプション過去 90 日間にダッシュボードやモニターでアクティブにクエリされたタグと特定のタグを含めるオプションが選択されている状態" style="width:100%" >}}

選択されたメトリクスの既存のタグの構成はすべて上書きされ、新しいタグの構成を定義することになります。これにより、すべてのメトリクス名ですべてのタグをクエリ可能にします。**タグを含める**ことを選択している場合、次のいずれかまたは両方を含めることを選択できます。
   - 過去 30 日間、60 日間、または 90 日間に Datadog でアクティブにクエリされたタグ。
   - 定義する特定のタグのセット。

##### 既存のタグの構成を保持する {#keep-existing-tag-configurations}

{{< img src="metrics/bulk_exclude_tags.png" alt="タグの構成セクションで「タグを除外する」と「保持する」が選択されている状態のタグの管理オプション" style="width:100%" >}}

既存のタグの構成は保持され、構成に追加される新しいタグを定義することになります。

#### API を使用する {#use-the-api-1}

API を介して、複数のメトリクスに対してタグを[構成][13]および[削除][14]できます。

**注**: `include_actively_queried_tags_window` 属性を使用して、特定の時間枠内でアクティブにクエリされたタグのみを含めます。

## Metrics without Limits™ の請求 {#metrics-without-limits-billing}

タグを構成することで、どのカスタムメトリクスをクエリできるかを制御でき、最終的にカスタムメトリクスの請求対象数を減らすことができます。Metrics without Limits™ は、インジェストコストとインデキシングコストを分離します。Datadog に全てのデータを送り続けることができ (全てインジェストされます)、Datadog プラットフォームでクエリ可能にするタグの許可リストを指定することができます。Datadog が構成したメトリクスにインジェストするデータ量と、インデックスを作成した残りのデータ量が異なる場合、Usage ページや Metrics Summary ページに 2 つの異なるボリュームが表示されることがあります。

- **Ingested Custom Metrics**: 取り込まれたすべてのタグに基づいたカスタムメトリクスの元のボリューム。
- **Indexed Custom Metrics**: Datadog プラットフォームでクエリ可能なカスタムメトリクスの量 (Metrics without Limits™ の構成に基づく)。

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

1. [Plan & Usage ページ][9]の Metrics Summary ページ、または[API][2] から上位 20 のメトリクスを構成することができます。
   複数のメトリクスのタグを構成するには、一括メトリクスコンフィギュレーション (`*` 構文) を使用できます。Datadog は、一括コンフィギュレーションジョブが完了すると通知します。

**注:** [タグコンフィギュレーション API を作成する][2]を使用している場合、タグコンフィギュレーションを作成する前に、まず[タグコンフィギュレーションカーディナリティ推定 API][5] を使用して、タグコンフィギュレーションの潜在的な影響を検証してください。UI または推定 API が、取り込みよりも大きいインデックスの結果の数を返す場合は、タグコンフィギュレーションを保存しないでください。

2. クエリされていないメトリクスを空のタグコンフィギュレーションで構成します。

   Datadog プラットフォームでクエリされることのないノイズの多いメトリクスをクリーンアップし続けるチームは、タグの空の許可リストでメトリクスを構成することによって、これらのクエリされないメトリクスのコストを即座に最小化することができます。

3. 使用量と請求を確認します。メトリクスの構成後、3 つの方法で変更の影響を検証することができます。

   - コンフィギュレーションを保存する前に、タグコンフィギュレーションカーディナリティ推定機能は、インデックスされたカスタムメトリクスの結果の推定数を返しますが、これは取り込まれたカスタムメトリクスボリュームよりも少なくなるはずです。
   - コンフィギュレーションを保存すると、Metrics Summary の詳細サイドパネルに、インデックスされたカスタムメトリクスが取り込まれたカスタムメトリクスボリュームよりも低いことが表示されます。
   - コンフィギュレーションを保存してから 24 時間後に、Plan & Usage ページの **Top Custom Metrics** テーブルでその影響を確認することもできます。このテーブルの **Month-to-Date** タブと **Most Recent Day** タブの間で、カスタムメトリクスのボリュームが減少しているはずです。

## ベストプラクティス {#best-practices}

- リアルタイムの[推定カスタムメトリクス使用量][10]メトリクスにアラートを設定して、カスタムメトリクスのスパイクをコンフィギュレーションと関連付けることができます。

- Metrics without Limits™ 用の[ロールベースのアクセス制御][11]を使用して、課金に影響するこの機能を使用するアクセス許可を持つユーザーを制御することもできます。

- 監査イベントを使用すると、カスタムメトリクスのスパイクと相関する可能性のある、作成されたタグコンフィギュレーションまたはパーセンタイル集計を追跡できます。[イベントストリーム][12]で "tags:audit" および "queryable tag configuration" または "percentile aggregations" を検索します。

\*Metrics without Limits は Datadog, Inc. の商標です。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: /ja/api/latest/metrics/#create-a-tag-configuration
[3]: /ja/api/latest/metrics/#update-a-tag-configuration
[4]: /ja/api/latest/metrics/#delete-a-tag-configuration
[5]: /ja/api/latest/metrics/#tag-configuration-cardinality-estimator
[6]: /ja/metrics/#time-and-space-aggregation
[7]: /ja/metrics/summary/#configuration-of-multiple-metrics
[8]: /ja/account_management/billing/custom_metrics/
[9]: https://app.datadoghq.com/billing/usage
[10]: /ja/account_management/billing/usage_metrics/
[11]: /ja/account_management/rbac/permissions/?tab=ui#metrics
[12]: https://app.datadoghq.com/event/stream
[13]: /ja/api/latest/metrics/#configure-tags-for-multiple-metrics
[14]: /ja/api/latest/metrics/#delete-tags-for-multiple-metrics
[15]: /ja/account_management/billing/metric_name_pricing/