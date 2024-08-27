---
algolia:
  tags:
  - metrics without limits
aliases:
- /ja/metrics/faq/metrics-without-limits/
- /ja/metrics/guide/metrics-without-limits-getting-started/
further_reading:
- link: https://www.datadoghq.com/blog/metrics-without-limits
  tag: ブログ
  text: Metrics without LimitsTM でカスタムメトリクスのボリュームをダイナミックにコントロール
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: インタラクティブなセッションに参加して、メトリクスの可能性を最大限に引き出しましょう
title: Metrics without LimitsTM
---

## 概要

Metrics without LimitsTM は、カスタムメトリクスの取り込みとインデックス作成を切り離すことで、カスタムメトリクスのボリュームを柔軟にコントロールすることができます。組織にとって価値のあるカスタムメトリクスタグにのみ料金を支払います。

Metrics without LimitsTM は、アプリ内ですべてのメトリクスタイプのタグを構成する機能を提供します。また、コードを再デプロイまたは変更することなく、カウント、レート、ゲージの集計をカスタマイズできます。Metrics without LimitsTM を使用すると、アプリ内でタグの許可リストを構成して、Datadog プラットフォーム全体でクエリ可能な状態を維持することができます。これは、アプリケーションレベルまたはビジネスメトリクス (例えば、`host`) に関連付けられた不要なタグを自動的に削除します。また、アプリ内でタグのブロックリストを構成して、タグを迅速に削除して除外することもできます。これらの構成機能は [Metrics Summary][1] ページにあります。

このページでは、観測可能な予算内でカスタムメトリクス量を管理するのに役立つ Metrics without LimitsTM の主要コンポーネントを確認します。

### タグの構成

#### タグの許可リスト
1. 任意のメトリクス名をクリックして、その詳細サイドパネルを開きます。
2. **Manage Tags** -> **"Include Tags..."** をクリックして、ダッシュボード、ノートブック、モニター、その他の Datadog 製品でクエリ可能にしておきたいタグを構成します。
3. タグの許可リストを定義します。
デフォルトでは、タグ構成モーダルには、過去 30 日間にダッシュボード、ノートブック、モニター、または API でアクティブにクエリされたタグの Datadog 推奨許可リストが事前に入力されます。推奨タグは、グラフ線アイコンで区別されます。
4. この潜在的なタグ構成から得られる、インデックス化されたカスタムメトリクスの*推定新規ボリューム*を確認します。
5. **Save** をクリックします。

{{< img src="metrics/mwl_example_include_tags-compressed.mp4" alt="許可リストによるタグの構成" video=true style="width:100%" >}}

メトリクス API を通じて、タグの構成を[作成][2]、[編集][3]、[削除][4]、および[影響を見積もる][5]ことができます。

#### タグのブロックリスト
1. 任意のメトリクス名をクリックして、その詳細サイドパネルを開きます。
2. **Manage Tags** -> **"Exclude Tags..."** をクリックして、クエリしたくないタグを削除します。
3. タグのブロックリストを定義します。ブロックリストに定義されたタグは、ダッシュボードやモニターでクエリ**できません**。過去 30 日間にダッシュボード、ノートブック、モニター、API でアクティブにクエリされたタグは、グラフ線アイコンで区別されます。
5. この潜在的なタグ構成から得られる、インデックス化されたカスタムメトリクスの*推定新規ボリューム*を確認します。
6. **Save** をクリックします。

{{< img src="metrics/mwl-example-tag-exclusion-compressed.mp4" alt="タグ除外によるタグの構成" video=true style="width:100%" >}}

メトリクス API でパラメーター `exclude_tags_mode: true` を設定して、タグのブロックリストを[作成][2]および[編集][3]します。

カウント、レート、ゲージのタグを構成する場合、デフォルトで最も頻繁にクエリされる時間/空間集計の組み合わせがクエリに使用できます。

### 複数のメトリクスを一度に構成する

[一括メトリクスタグ構成機能][7]を使用して、カスタムメトリクスのボリュームを最適化します。メトリクスのネームスペースを指定するには、Metrics Summary の **Configure Tags** をクリックします。そのネームスペースのプレフィックスに一致するすべてのメトリクスを、**Include tags...** の下にある同じ許可リストまたは **Exclude tags...** の下にある同じブロックリストで構成できます。

API を介して、複数のメトリクスに対してタグを[構成][13]および[削除][14]できます。複数のメトリクスに対して[タグのブロックリストを構成][13]するには、API 上でパラメーター `exclude_tags_mode: true` を設定します。

### 集計の精緻化と最適化

カウント、ゲージ、またはレートメトリクスのより多くの[メトリクス集計][6]を選択することで、カスタムメトリクスフィルタをさらに調整することができます。クエリの数学的精度を維持するために、Datadog は与えられたメトリクスタイプに対して最も頻繁にクエリされた時間/空間集計の組み合わせのみを保存します。

- 構成されたカウントとレートは、SUM で時間/空間でクエリ可能です
- 構成したゲージは、AVG で時間/空間でクエリ可能です

Agent やコードレベルの変更を必要とせず、いつでも集計の追加や削除が可能です。

タグの構成モーダルには、過去 30 日間にダッシュボード、ノートブック、モニター、および API を介してアクティブにクエリされた集計の許可リストがあらかじめ入力されています (アイコンが付いた青で表示されます)。また、独自の追加集計を含めることもできます。

## Metrics without LimitsTM の請求

Configuring your tags and aggregations gives you control over which custom metrics can be queried -- ultimately reducing your billable count of custom metrics. Metrics without LimitsTM decouples ingestion costs from indexing costs. You can continue sending Datadog all of your data (everything is ingested) and you can specify an allowlist of tags you want to remain queryable in the Datadog platform. If the volume of data Datadog is ingesting for your configured metrics differs from the smaller, remaining volume you index, you can see two distinct volumes on your Usage page as well as the Metrics Summary page. 

- **Ingested Custom Metrics**: 取り込まれたすべてのタグに基づいたカスタムメトリクスの元のボリューム。
- **Indexed Custom Metrics**: Datadog プラットフォームでクエリ可能なカスタムメトリクスの量 (Metrics without LimitsTM のコンフィギュレーションに基づく) 

**注: 構成されたメトリクスのみが、Ingested custom metrics ボリュームに寄与します。**Metrics without LimitsTM でメトリクスが構成されていない場合、そのインデックスされたカスタムメトリクスボリュームに対してのみ課金されます。

[カスタムメトリクスの請求][8]の詳細はこちら。

## Metrics without LimitsTM 入門

1. [Plan & Usage ページ][9]の Metrics Summary ページ、または[API][2] から上位 20 のメトリクスを構成することができます。
   一括メトリクス構成 (`*` 構文) を使用すると、複数のメトリクスにタグを素早く構成することができます。Datadog は、一括構成ジョブが完了すると通知します。

**Note:** If you're using the [Create Tag Configuration API][2], use the [tag configuration cardinality estimator API][5] first to validate the potential impact of your tag configurations prior to creating tag configurations. If the UI or the estimator API returns a resulting number of indexed that is larger than ingested, do not save your tag configuration.

2. クエリされていないメトリクスを空のタグコンフィギュレーションで構成します。

   Datadog プラットフォームでクエリされることのないノイズの多いメトリクスをクリーンアップし続けるチームは、タグの空の許可リストでメトリクスを構成することによって、これらのクエリされないメトリクスのコストを即座に最小化することができます。

   未クエリのメトリクスレポートは、カスタマーサクセスマネージャーにお尋ねください。

3. 使用量と請求を確認します。メトリクスの構成後、3 つの方法で変更の影響を検証することができます。

   - コンフィギュレーションを保存する前に、タグコンフィギュレーションカーディナリティ推定機能は、インデックス付けされたカスタム メトリクスの結果 の推定数を返しますが、これはインジェストされたカスタム メトリクス ボリュームよりも少なくなるはずです。
   - コンフィギュレーションを保存すると、Metrics Summary の詳細サイドパネルに、インデックスされたカスタムメトリクスがインジェストされたカスタムメトリクスボリュームよりも低いことが表示されます。
   - コンフィギュレーションを保存してから 24 時間後に、Plan & Usage ページの **Top Custom Metrics** テーブルでその影響を確認することもできます。このテーブルの **Month-to-Date** タブと **Most Recent Day** タブの間で、カスタムメトリクスのボリュームが減少しているはずです。

## ベストプラクティス

- リアルタイムの[推定カスタムメトリクス使用量][10]メトリクスにアラートを設定して、カスタムメトリクスのスパイクをコンフィギュレーションと関連付けることができます。

- Metrics without LimitsTM 用の[ロールベースのアクセス制御][11]を使用して、課金に影響するこの機能を使用するアクセス許可を持つユーザーを制御することもできます。

- 監査イベントを使用すると、カスタムメトリクスのスパイクと相関する可能性のある、作成されたタグコンフィギュレーションまたはパーセンタイル集計を追跡できます。[Events Stream][12] で "tags:audit" および "queryable tag configuration" または "percentile aggregations" を検索します。

\*Metrics without Limits は Datadog, Inc. の商標です。

## 参考資料

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