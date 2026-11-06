---
description: カスタムメトリクスのボリュームとコストを管理するために、可視性、帰属、および防止に関するベストプラクティスを適用します。
further_reading:
- link: /metrics/custom_metrics/
  tag: ドキュメント
  text: Custom Metrics について
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: ドキュメント
  text: Custom Metrics の課金
- link: /metrics/metrics-without-limits/
  tag: ドキュメント
  text: Metrics without Limits™
- link: /metrics/volume/
  tag: ドキュメント
  text: メトリクスボリューム管理
- link: https://www.datadoghq.com/blog/custom-metrics-governance/
  tag: ブログ
  text: エンドツーエンドのカスタムメトリクスガバナンスに関するベストプラクティス
- link: https://www.datadoghq.com/blog/govern-custom-metrics/
  tag: ブログ
  text: FinOps エンジニアのためのカスタムメトリクスガバナンスガイド
- link: https://learn.datadoghq.com/courses/metrics-governance
  tag: ラーニングセンター
  text: メトリクスガバナンス
title: Best Practices for Custom Metrics Governance
---
## 概要{#overview}

クラウドベースのアプリケーションは膨大な量のデータを生成し、多額の監視可能性コストを発生させる可能性があるため、最終的に組織はその予算項目を削減するよう圧力を受けることになります。監視可能性コストを削減するために、多くのチームはメトリクスの収集を減らすという手段をとります。しかし、中央集権的な SRE チームや監視可能性チームにとって、効果的なカスタムメトリクスガバナンスとは、可視性を完全に遮断するのではなく、監視の効率を高めるものであるべきです。

このガイドでは、効果的なメトリクスガバナンスの 3 つの主要コンポーネントである **Visibility and Attribution**、**Actionable Custom Metrics Governance**、および **Monitoring and Prevention** を通じて、カスタムメトリクスのボリュームを管理するためのベストプラクティスを提供します。これらの主要コンポーネントに対して費用対効果の高い監視可能性を維持するために、利用可能な Datadog ツールを使用する方法を学びます。
- [メトリクスの使用状況とコストの確認と理解](#visibility-and-attribution)
- [最大のコスト要因の特定](#account-level-visibility)
- [最大のコスト要因を担当チームまたはサービスへ帰属](#team-level-visibility-and-attribution)
- [価値の低い未使用メトリクスのコスト削減](#value-based-metrics-governance)
- [請求超過が発生する前の使用量監視と制御](#monitoring-and-prevention)

Datadog のカスタムメトリクスガバナンスツールに関するこちらの[インタラクティブなウォークスルー][17]をご覧ください。

## 前提条件 {#prerequisites}

<div class="alert alert-danger">一部の製品機能には管理者アクセス権が必要です。</div>

{{< whatsnext desc="このガイドは、カスタムメトリクスにおける以下の概念を理解していることを前提としています。" >}}
    {{< nextlink href="/metrics/custom_metrics/" >}}カスタムメトリクスとは何か{{< /nextlink >}}
    {{< nextlink href="/account_management/billing/custom_metrics/?tab=countrate" >}}カスタムメトリクスの課金方法{{< /nextlink >}}
{{< /whatsnext >}}


## 可視性と帰属 {#visibility-and-attribution}

カスタムメトリクスのボリュームとコストを管理するための最初のステップは、主要なメトリクスのコスト要因を把握し、それらの要因をそれぞれの担当者に帰属させることです。

このセクションのステップを参照して、アカウント全体の月間メトリクス使用量を確認し、チーム別または選択したタグキー別の使用内訳を確認してください。

### アカウントレベルの可視性 {#account-level-visibility}

<div class="alert alert-danger">プランと使用方法ページにアクセスするには、<a href="https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication">Datadog Admin Role</a> が必要です。</div>

[プランと使用方法][1]では、アカウントの月間請求対象カスタムメトリクス使用量の概要をすぐに確認でき、コスト、バーンレート、上位のカスタムメトリクス名に関する詳細な情報が得られます。

   1. [プランと使用方法ページ][2]から、*Usage Summary* セクションまでスクロールダウンします。
   1. {{< ui >}}Custom Metrics{{< /ui >}} タブをクリックして、組織の請求対象カスタムメトリクス使用量、使用量の傾向、上位のカスタムメトリクス名を確認します。
   1. *Top Custom Metrics for <MONTH YEAR\>* までスクロールして、上位のメトリクス名と、カスタムメトリクスのコストに対する貢献度 (%) を確認します。

どのメトリクスがアカウントの月間使用量とコストの最大の要因であるかを把握することが、[Metrics without Limits™][4] を使用する際の推奨出発点です。この情報を基に、チーム、サービス、組織、その他のタグ属性のいずれによるメトリクス送信であるか、その送信元を特定できます。

さらに、[使用属性][3]情報を確認して、タグキーごとのアカウントの請求対象使用量の合計内訳を確認します。ここから、チーム、サービス、アプリケーションなどのタグによって、最大のコスト要因を特定できます。

**注**: 使用属性は Enterprise プランに含まれる高度な機能です。その他のプランをご利用の場合は、アカウント担当者またはカスタマーサクセスまでご連絡のうえ、この機能をリクエストしてください。

#### メトリクスレベルの可視性 {#metric-level-visibility}

{{< img src="metrics/tagsexplorer.png" alt="急増しているメトリクス名の Custom Metrics Tags Cardinality Explorer" style="width:80%;">}}

アカウントの月間使用量とコストを押し上げているメトリクス名を特定したら、そのメトリクスの詳細サイドパネルへ移動して Custom Metrics Tags Cardinality Explorer を確認します。これにより、特定のメトリクスのカーディナリティを急増させているタグキーを確認できます。ユニークなタグ値の数が大幅に増加しているスパムタグキーや制限のないタグキーが原因である可能性が高いです。Metrics without Limits™ を使用してそれらを除外することで、すぐにコストを削減できます。

### チームレベルの可視性と属性 {#team-level-visibility-and-attribution}

チームレベルの可視性により、アカウント管理者はチームに責任を持たせることができます。さらに重要な点として、チームがメトリクスボリュームへの影響を理解し、削減する機会を提供します。

各チームは、自分たちが送信しているメトリクスやタグのコストについて、十分な情報を把握できていない可能性があります。その結果、チームは使用量を制御したり、使用量の増加を制限したりする意欲が低下してしまいます。全員が自分たちの使用量を可視化し、それらのボリュームと関連コストの管理に対して主体性を持つことが不可欠です。

#### 使用量が最も多いカスタムメトリクスのソースを特定する {#find-the-source-of-your-largest-custom-metrics}
<div class="alert alert-danger">プランと使用方法ページにアクセスするには、<a href="https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication">Datadog Admin Role</a> が必要です。</div>

{{< img src="metrics/guide/custom_metrics_governance/team_attribution_plan_usage_table.png" alt="プランと使用方法ページの Top Custom Metrics テーブルから Metrics Summary に移動します。" style="width:90%;" >}}

どのチームまたはサービスが上位のカスタムメトリクス名に責任を負っているかを特定するには、

1. [プランと使用方法ページ][2]から、*Usage Summary* セクションまでスクロールダウンします。
1. {{< ui >}}Custom Metrics{{< /ui >}} タブをクリックして、組織の請求対象となる使用量、使用量の傾向、上位のカスタムメトリクスを確認します。
1. *Top Custom Metrics for <MONTH YEAR>* テーブルの下にある上位カスタムメトリクスの {{< ui >}}See in Metrics Summary{{< /ui >}} アイコンをクリックします。これにより、メトリクス詳細サイドパネルが開いた状態で *Metrics Summary* ページに移動します。
1. サイドパネルで *Tags* セクションまでスクロールし、チームやサービスなどの関連タグを確認します。

#### チームのカスタムメトリクスの確認 {#view-your-teams-custom-metrics}

すべてのチームが、どのメトリクスがリアルタイムで請求額の急増を引き起こしているかを可視化し、自分たちのコスト最適化の取り組みが他チームの可視性に影響を与えないと確信できる必要があります。

チームが送信しているアクティブなメトリクス名をすべて確認するには、[Metrics Summary ページ][6]に移動し、{{< ui >}}Filter by Tag Value{{< /ui >}} フィールドにタグキーと値のペア (例: `team:dev` や `service:demo`) を入力します。

#### 請求額に最も影響を与えているチームのメトリクス特定 {#identify-any-teams-metrics-that-have-the-biggest-impact-on-your-bill}

組織内のすべてのユーザーは、[メトリクスボリューム管理ページ][7]で、OOTB で提供されるリアルタイムのカスタムメトリクス推定使用量を確認できます。Datadog のインテリジェントなインサイトは、どのメトリクスにコスト最適化の取り組みを集中させるべきかを特定するのに役立ちます。Metrics without Limits™ とともにメトリクスボリューム管理を使用して、インデックス化されたカスタムメトリクスの使用量を制御し、精度を犠牲にすることなくコストを削減します。

メトリクスボリューム管理を使用すると、組織で最大の使用量を占めるメトリクスや、急激にボリュームが増加しているメトリクス名 (予期しない超過料金の主な原因である可能性が高いもの) を特定できます。

{{< img src="metrics/guide/custom_metrics_governance/volume_management_page_2025-01-27.png" alt="メトリクスボリューム管理ページ" style="width:90%;" >}}

詳細については、[メトリクスボリューム管理][8]のドキュメントを参照してください。

## 価値ベースのメトリクスガバナンス {#value-based-metrics-governance}

効果的なカスタムメトリクスガバナンスは、監視効率を向上させるはずです。使用状況を把握し、その使用量をソースに属性付けした後、メトリクスを削減するためのアクションを実行します。

このセクションでは、チームが日常的に頼りにしている監視可能性を犠牲にすることなく、監視可能性への投資から得られる ROI と価値を最大化するために実行できるアクションについて説明します。

### Metrics without Limits™ {#metrics-without-limits}

Datadog の [Metrics without Limits™][4] は、メトリクスの取り込みとインデックス化を分離する、業界初のコスト管理機能です。すべてのメトリクスが常に同じ価値を持つわけではなく、Metrics without Limits™ を使用すれば、価値のあるメトリクスに対してのみ料金が発生します。

クエリ用に保持したいタグ構成を設定することで、任意のメトリクス名におけるインデックス化されたカスタムメトリクスのボリュームを削減できます。これにより、コストが削減され、構成したメトリクスの数学的精度が維持されます (すべてコードレベルの変更なしで、プラットフォーム内で行われます)。

{{< img src="metrics/volume/reduce_metric_vol_cost_tags_03142025.png" alt="タグ構成を通じて許可リストを制限し、ボリュームを削減するためのメトリクスボリューム管理と Metrics without Limits™ の使用例" style="width:80%;" >}}

Metrics without Limits™ を使用すると、Datadog は自動的に以下を提供します。
- インテリジェントなクエリインサイトを活用し、アクティブにクエリされているタグやアセットで使用されているタグに基づいて、監視可能性への投資から得られる ROI と価値を最大化するための最新の推奨タグ構成を提供します。
- 推奨されるタグ構成が常に適切な状態に保たれるよう、Datadog に送信されたあらゆるメトリクスに対するすべてのユーザーの操作 (アプリ内および API 経由の両方) を継続的に計算・分析するインテリジェントなクエリインサイト。
- いつでも変更をロールバックし、新しいデータのタグの可視性を復元する機能。ロールバックを行っても、以前に除外されたタグがバックフィルされることはありません。

Datadog のメトリクスガバナンスのベストプラクティスの一環として、まずは [Top Custom Metrics](#identify-metrics-that-have-the-biggest-impact-on-monthly-bill) に対して Metrics without Limits を使用することから始めてください。

詳細については、[Metrics without Limits™][4] のドキュメントを参照してください。

### RBAC を使用して監視可能性を低下させる意図しない構成を防止する {#prevent-unintentional-configurations-that-reduce-observability-with-rbac}

Metrics without Limits™ を使用すると、ユーザーはインデックス化するデータを減らすことでメトリクスのコストを削減できます。構成を誤ると、意図しない使用量の急増や、インデックス化されなくなったタグによる可視性の喪失につながる可能性があります。予期せぬ変更を防ぐには、[RBAC 権限][9]を使用してください。既存のユーザーロールを編集して `metrics_tags_write` 権限を含めるか、カスタムロールを作成できます。これにより、組織は、どのメンバーがメトリクスの[カーディナリティ][10]に影響を与えられるか、また誰が Metrics without Limits™ のタグ構成を変更できるかをより適切に制御できるようになります。

Datadog は、すべての Metrics without Limits™ 構成の[監査証跡][11]を提供します。構成内容と構成を行ったユーザーが詳細に記録されるため、カスタムメトリクスの使用量に急増または急減があった場合にその原因を特定できます。監査証跡イベントを確認するには、[Event Explorer][12] に次のクエリを入力します。

```
tags:audit "Queryable tag configuration" 
```

{{< img src="/metrics/guide/custom_metrics_governance/metrics_rbac_audit_trail_query.png" alt="メトリクス監査証跡クエリを使用した Event Explorer" style="width:90%;" >}}

### クエリされていないメトリクスや未使用のメトリクスによるコストの削減 {#reduce-costs-from-unqueried-and-unused-metrics}

#### クエリされていないメトリクス {#unqueried-metrics}

コストを削減しつつ、貴重な可視性を損なわないようにするには、{{< ui >}}Query Activity{{< /ui >}} ファセットを使用してください。これにより、チームが依存しているアクティブにクエリされるメトリクスと、Datadog 内でも API 経由でもクエリされていないメトリクスを区別できます。Datadog のインテリジェントなクエリインサイトは、すべてのユーザーによるメトリクスへのインタラクション (Datadog 内または API 経由) を継続的に計算・分析し、クエリされていないメトリクスの特定を支援します。

**注**: クエリされていないメトリクスは、アセット (ダッシュボード、ノートブック、モニター、SLO) のクエリで使用されている可能性があります。指定された期間内にアセットが使用されていない場合、それらはクエリされていないと見なされます。

#### 未使用のメトリクス {#unused-metrics}

[Related Assets ファセット][16]を使用することで、意図しない副作用なしにコストを削減することもできます。これにより、どのアセット (ダッシュボード、ノートブック、モニター、SLO) にも使用されていないメトリクスを特定できます。これにより、メトリクス構成について十分な情報に基づいた決定を下すことができます。

#### クエリされていないメトリクスや未使用のメトリクスのすべてを特定する {#identify-all-unqueried-and-unused-metrics}

[Related Assets ファセット][16]を使用して、Datadog 内で未使用のメトリクスを可視化することで、アセットを誤って壊すことなくコストを削減できます。このファセットを使用すると、どのメトリクスがダッシュボード、ノートブック、モニター、SLO で使用されているかを確認できるため、メトリクス構成について十分な情報に基づいた決定を下すことができます。

組織内でクエリも使用もされていないメトリクスの全リストを特定するには、

1. [Metrics Summary ページ][6]で、左側にある {{< ui >}}Query Activity{{< /ui >}} ファセットを確認します。対象の期間 (30 日、60 日、または 90 日) を選択します。
2. 左側にある {{< ui >}}Related Assets{{< /ui >}} ファセットを確認し、{{< ui >}}Not used in any asset{{< /ui >}} を選択します。
3. 左側にある {{< ui >}}Configuration{{< /ui >}} ファセットを確認し、{{< ui >}}All Tags{{< /ui >}} を選択します。これら 3 つのファセットを組み合わせることで、アセット上でクエリも使用もされておらず、カスタムタグ構成がまだ行われていないメトリクスのリストが得られます。

4. 結果として表示されたメトリクス名のテーブルを確認します。パターンはありますか、それとも特定のサービスから送信されていますか?これらのクエリされていないメトリクスに関連付けられているタグを確認します。
5. (オプション) このリストをエクスポートするには、メトリクステーブルの上にある [{{< ui >}}Export as CSV{{< /ui >}}] をクリックします。

   開発者が必要としていないメトリクスを特定した後、Metrics without Limits™ を使用して、これらの未使用メトリクスのカスタムメトリクスボリュームと関連コストを安全に削減できます。

{{< img src="metrics/guide/custom_metrics_governance/manage_tags_fm_metrics_summary_2025-01-27.png" alt="タグの管理が強調表示された [Configure Metrics] ドロップダウンメニュー" style="width:90%;" >}}

6. [Metrics Summary ページ][6]の上部で、{{< ui >}}Configure Metrics{{< /ui >}} ドロップダウンメニューをクリックします。
7. {{< ui >}}Manage tags{{< /ui >}} を選択して [Metrics without Limits™ タグ構成モーダル][13]を開き、複数のメトリクスを一括構成します。
8. 構成するメトリクスのメトリクス名前空間プレフィックスを指定します。
9. {{< ui >}}Include tags{{< /ui >}} を選択したままにします。これには、アセット (ダッシュボード、ノートブック、モニター、SLO)、Metrics Explorer、または API を通じてアクティブにクエリされたすべてのタグが含まれます。
10. [{{< ui >}}Save{{< /ui >}}] をクリックします。

数千のカスタムメトリクスのお客様に対する Datadog のインテリジェントなクエリインサイトに基づくと、クエリされていないメトリクスに **Metrics without Limits™ を使用することで、平均的なお客様のカスタムメトリクス使用量を最大 70% 削減できる**ことが分かりました。

### メトリクスの相対的な有用性の把握 {#understand-the-relative-utility-of-your-metrics}

メトリクスが過去 30 日、60 日、または 90 日間クエリされていなくても、チームがインシデント管理や障害復旧のためにそのメトリクスを活用できる可能性があります。逆に、チームが既存の、アクティブにクエリされているメトリクスを十分に活用できていない可能性があります。そのため、メトリクスの相対的な有用性を把握することが、ガバナンスワークフローにおける次の推奨ステップとなります。

Datadog の Metrics without Limits™ は、[Metrics Related Assets][15] サイドパネルを使用して、アクティブにクエリされているメトリクスの価値を評価するための OOTB のインサイトも提供する一連の機能です。メトリクス関連アセットとは、特定のメトリクスをクエリするダッシュボード、ノートブック、モニター、SLO など、Datadog のあらゆるアセットを指します。{{< ui >}}Tags{{< /ui >}} 列を使用して、アセットで使用されている特定のタグを特定し、Metrics without Limits™ で最適化する際に可視性を維持できるようにします。関連アセットの注目度や数量を活用して組織内におけるメトリクスの有用性を評価し、データに基づく意思決定を可能にします。チームが既存のメトリクスを使用して監視可能性への投資からより多くの価値を得る方法について、理解を深めることができます。

{{< img src="metrics/related_assets_08_05_2025.png" alt="Related Assets セクションを表示したメトリクス詳細サイドパネル。このメトリクスの例は、3 つのダッシュボードに適用されています" style="width:100%;" >}}

メトリクスの関連アセットを確認するには、
1. メトリクス名をクリックして、その詳細サイドパネルを開きます。
1. サイドパネルの {{< ui >}}Related Assets{{< /ui >}} というタイトルのセクションまでスクロールします。
1. ドロップダウンボタンをクリックして、確認したい関連アセットのタイプ (ダッシュボード、モニター、ノートブック、SLO) を表示します。検索バーを使用して、特定のアセットを検証できます。
   

## 監視と防止 {#monitoring-and-prevention}
このセクションでは、以下の方法について説明します。
- アカウント全体のカスタムメトリクス使用量の超過や急増についてアラートを送信する
- 将来のメトリクスの増加を予測し、全体的な予期しない逸脱についてアラートを送信する
- 特定のメトリクスのカーディナリティがユーザー定義のしきい値を超えた場合、または異常に急増した場合にアラートを送信する
アカウントのメトリクス使用量とそれらのコストを担当するチームを把握したら、カスタムメトリクスの使用量が特定のしきい値を超えたときにアラートを送信するモニターを作成します。カスタムメトリクスの使用量が急増した際にアラートを受け取ることで、意図しない請求額の急増を防ぐことができます。

Datadog は、[推定カスタムメトリクス使用量][15]を測定する OOTB メトリクスを提供しています。これらのメトリクスは、ダッシュボードの視覚化やモニターのアラートで使用できます。

| 使用タイプ                    | メトリクス                                   | 説明 |
|-------------------------------|------------------------------------------| ----------- |
| Indexed Custom Metrics        | `datadog.estimated_usage.metrics.custom`、`datadog.estimated_usage.metrics.custom.by_metric`、  `datadog.estimated_usage.metrics.custom.by_tag` | 過去 1 時間に確認された一意の Indexed Custom Metrics。|
| Ingested Custom Metrics       | `datadog.estimated_usage.metrics.custom.ingested`、`datadog.estimated_usage.metrics.custom.ingested.by_metric`、`datadog.estimated_usage.metrics.custom.ingested.by_tag` | 過去 1 時間に確認された一意の Ingested Custom Metrics。|

### カスタムメトリクス使用量の急増を監視して超過を防ぐ {#monitor-spikes-in-custom-metric-usage-to-prevent-overages}

{{< img src="metrics/guide/custom_metrics_governance/estimated_usage_metric_monitor.png" alt="推定使用量メトリクスとしきい値 700,000 を使用したメトリクスモニター構成の例" style="width:80%;" >}}

また、ダッシュボードの時系列ウィジェットまたはメトリクスモニターを使用して、メトリクス名ごとのリアルタイムの推定カスタムメトリクス使用量の内訳を確認することもできます。`datadog.estimated_usage.metrics.custom.by_metric` メトリクスを使用してモニターを作成し、各メトリクス名のボリュームを常に最新の状態で把握できるようにします。

### その他の監視のユースケース {#additional-monitoring-use-cases}
アラートを受け取った後は、メトリクスボリューム管理ページを使用して、急増しているメトリクスのタグキーを調査し、Metrics without Limits™ を使用して、メトリクスの急増を引き起こしている異常なタグキーを直ちに除外します。これにより、意図しない請求額の急増を直ちに解決できます。
{{< whatsnext desc="推定使用量メトリクスを使用してモニターを作成するためのその他のユースケース:" >}}
    {{< nextlink href="/monitors/types/change-alert/" >}}ボリュームが一定の割合を超えて変化したときにアラートを送信します。{{< /nextlink >}}
    {{< nextlink href="/monitors/types/anomaly/" >}}使用量の異常な変化に対してアラートを送信します。{{< /nextlink >}}
    {{< nextlink href="/monitors/types/forecasts/" >}}将来のメトリクスの増加を予測し、予期しない全体的な偏差についてアラートを送信します。{{< /nextlink >}}

{{< /whatsnext >}}

## ベストプラクティスの概要 {#summary-of-best-practices}

1. まず、最も使用量の多いメトリクス名 (Top Custom Metrics テーブルまたはメトリクスボリューム管理ページ) を特定し、Metrics without Limits™ を使用して、これらの上位メトリクスを最も費用対効果の高いボリュームに最適化してください。
2. メトリクスボリューム管理ページを使用して、既存のカスタムメトリクス使用量の急増について、その原因となっている上位のメトリクス名を特定してください。
3. すぐにコストを削減するには、クエリされていないカスタムメトリクスを特定し、Metrics without Limits™ を使用して、これらのメトリクスを空のタグ構成で構成してください。
4. Datadog の OOTB の推定カスタムメトリクス使用量メトリクスのいずれかを使用して、カスタムメトリクスの使用量を監視するモニターを設定してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/plan_and_usage/
[2]: https://app.datadoghq.com/billing/usage
[3]: /ja/account_management/billing/usage_attribution/
[4]: /ja/metrics/metrics-without-limits/
[5]: https://app.datadoghq.com/billing/usage-attribution?view=table
[6]: https://app.datadoghq.com/metric/summary
[7]: https://app.datadoghq.com/metric/volume
[8]: /ja/metrics/volume/
[9]: https://docs.datadoghq.com/ja/account_management/rbac/permissions/?tab=ui#metrics
[10]: /ja/glossary/#cardinality
[11]: /ja/account_management/audit_trail/
[12]: https://app.datadoghq.com/event/explorer
[13]: https://app.datadoghq.com/metric/volume?bulk_manage_tags=true&facet.query_activity=-queried&sort=volume_total
[14]: https://docs.datadoghq.com/ja/metrics/metrics-without-limits/#configuration-of-tags-for-a-single-metric
[15]: /ja/metrics/summary/#metrics-related-assets
[16]: /ja/metrics/summary/#facet-panel
[17]: https://tour.datadoghq.com/psl/swa0y11