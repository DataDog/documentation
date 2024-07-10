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
  text: Metrics without Limits™ でカスタムメトリクスのボリュームをダイナミックにコントロール
- link: /observability_pipelines/guide/custom-metrics-governance
  tag: ドキュメント
  text: 観測可能性パイプラインを使用したカスタムメトリクスの管理
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: メトリクスの可能性を最大限に引き出すインタラクティブなセッションに参加できます
title: Metrics without Limits™
---

## 概要

Metrics without Limits™ は、カスタムメトリクスの取り込みとインデックス作成を切り離すことで、カスタムメトリクスのボリュームを柔軟にコントロールすることができます。組織にとって価値のあるカスタムメトリクスタグにのみ料金を支払います。

Metrics without Limits™ は、アプリ内ですべてのメトリクスタイプのタグを構成する機能を提供します。また、カウント、レート、ゲージの集計を、再デプロイやコード変更の必要なくカスタマイズできます。Metrics without Limits™ では、アプリ内でタグの許可リストを構成し、Datadog プラットフォーム全体でクエリ可能な状態を維持することができます。これは、アプリケーションレベルまたはビジネスメトリクス (例えば、`host`) に付けられた非必須タグを自動的に除外します。この機能は、[Metrics Summary][1] ページにあります。

このページでは、観測可能な予算内でカスタムメトリクス量を管理するのに役立つ Metrics without Limits™ の主要コンポーネントを確認します。

### タグの構成

任意のメトリクス名をクリックすると、その詳細サイドパネルが表示されます。次に、**Manage Tags** -> **"Include Tags..."** をクリックして、ダッシュボードとモニターでクエリ可能にするタグを構成します。タグの構成モーダルには、過去 30 日間にダッシュボード、ノートブック、モニター、および API を介してアクティブにクエリされたタグの許可リストがデフォルトであらかじめ入力されています (アイコンが付いた青で表示されます)。また、独自の追加タグを含めることもできます。**Save** を選択する前に、この潜在的なタグの構成から生じる、インデックスされたカスタム メトリクスの新しい推定量が表示されます。

{{< img src="metrics/mwl_tag_config.mp4" alt="タグのコンフィギュレーション" video=true >}}


また、API も用意されており、タグの設定を[作成][2]、[編集][3]、[削除][4]することが可能です。また、コンフィギュレーションの潜在的な影響を推定するための [API][5] も用意されています。

カウント、レート、ゲージのタグを構成する場合、デフォルトで最も頻繁にクエリされる時間/空間集計の組み合わせがクエリに使用できます。

### 集計の精緻化と最適化

カウント、ゲージ、またはレートメトリクスのより多くの[メトリクス集計][6]を選択することで、カスタムメトリクスフィルタをさらに調整することができます。クエリの数学的精度を維持するために、Datadog は与えられたメトリクスタイプに対して最も頻繁にクエリされた時間/空間集計の組み合わせのみを保存します。

- 構成されたカウントとレートは、SUM で時間/空間でクエリ可能です
- 構成したゲージは、AVG で時間/空間でクエリ可能です

Agent やコードレベルの変更を必要とせず、いつでも集計の追加や削除が可能です。

タグの構成モーダルには、過去 30 日間にダッシュボード、ノートブック、モニター、および API を介してアクティブにクエリされた集計の許可リストがあらかじめ入力されています (アイコンが付いた青で表示されます)。また、独自の追加集計を含めることもできます。


### 複数のメトリクスを一度に構成する

[メトリクスタグの一括構成機能][7]を利用して、カスタムメトリックのボリュームを最適化することができます。Metrics Summary で **Include Tags...** をクリックすると、メトリクスのネームスペースを指定することができます。そして、そのネームスペースの接頭辞に一致するすべてのメトリクスに、同じ許可リストのタグを構成することができます。

## Metrics without Limits™ の請求

タグと集計を構成することで、どのカスタムメトリクスをクエリできるかを制御でき、最終的にカスタムメトリクスの請求対象数を減らすことができます。Metrics without Limits™ は、インジェストコストとインデキシングコストを分離します。Datadog に全てのデータを送り続けることができ (全てインジェストされます)、Datadog プラットフォームでクエリ可能にするタグの許可リストを指定することができます。Datadog が構成したメトリクスにインジェストするデータ量と、インデックスを作成した残りのデータ量が異なる場合、Usage ページや Metrics Summary ページに 2 つの異なるボリュームが表示されることがあります。

- **Ingested Custom Metrics**: 取り込まれたすべてのタグに基づくカスタムメトリクスの元々の量。
- **Indexed Custom Metrics**: Datadog プラットフォームでクエリ可能なカスタムメトリクスの量 (Metrics without Limits™ のコンフィギュレーションに基づく) 

**注: 構成されたメトリクスのみが、Ingested custom metrics ボリュームに寄与します。**Metrics without Limits™ でメトリクスが構成されていない場合、そのインデックスされたカスタムメトリクスボリュームに対してのみ課金されます。

[カスタムメトリクスの請求][8]の詳細はこちら。

## Metrics without Limits™ 入門

1. [Plan & Usage ページ][9]の Metrics Summary ページ、または[API][2] から上位 20 のメトリクスを構成することができます。
   一括メトリクス構成 (`*` 構文) を使用すると、複数のメトリクスにタグを素早く構成することができます。Datadog は、一括構成ジョブが完了すると通知します。

**注:** [Create Tag Configuration API][2] を使用している場合、タグコンフィギュレーションを作成する前に、まず [tag configuration cardinality estimator API][5] を使用して、タグコンフィギュレーションの潜在的な影響を検証してください。UI または estimator API が、indested より大きい indexed の数を結果として返す場合、タグコンフィギュレーションを保存しないでください。

2. クエリされていないメトリクスを空のタグコンフィギュレーションで構成します。

   Datadog プラットフォームでクエリされることのないノイズの多いメトリクスをクリーンアップし続けるチームは、タグの空の許可リストでメトリクスを構成することによって、これらのクエリされないメトリクスのコストを即座に最小化することができます。

   未クエリのメトリクスレポートは、カスタマーサクセスマネージャーにお尋ねください。

3. 使用量と請求を確認します。メトリクスの構成後、3 つの方法で変更の影響を検証することができます。

   - コンフィギュレーションを保存する前に、タグコンフィギュレーションカーディナリティ推定機能は、インデックス付けされたカスタム メトリクスの結果 の推定数を返しますが、これはインジェストされたカスタム メトリクス ボリュームよりも少なくなるはずです。
   - コンフィギュレーションを保存すると、Metrics Summary の詳細サイドパネルに、インデックスされたカスタムメトリクスがインジェストされたカスタムメトリクスボリュームよりも低いことが表示されます。
   - コンフィギュレーションを保存してから 24 時間後に、Plan & Usage ページの **Top Custom Metrics** テーブルでその影響を確認することもできます。このテーブルの **Month-to-Date** タブと **Most Recent Day** タブの間で、カスタムメトリクスのボリュームが減少しているはずです。

## ベストプラクティス

- リアルタイムの[推定カスタムメトリクス使用量][10]メトリクスにアラートを設定して、カスタムメトリクスのスパイクをコンフィギュレーションと関連付けることができます。

- Metrics without Limits™ 用の[ロールベースのアクセス制御][11]を使用して、課金に影響するこの機能を使用するアクセス許可を持つユーザーを制御することもできます。

- 監査イベントを使用すると、カスタムメトリクスのスパイクと相関する可能性のある、作成されたタグコンフィギュレーションまたはパーセンタイル集計を追跡できます。[Events Stream][12] で "tags:audit" および "queryable tag configuration" または "percentile aggregations" を検索します。

\*Metrics without Limits は Datadog, Inc. の商標です。

## その他の参考資料

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