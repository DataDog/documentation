---
aliases:
- /ja/product_analytics/experimentation/
description: Datadog Experiments を使用して、新しいエクスペリエンスや機能がビジネス成果、ユーザー行動、アプリケーションパフォーマンスに与える因果関係を測定します。
further_reading:
- link: https://www.datadoghq.com/blog/experiments
  tag: ブログ
  text: Datadog Experiments を使用してすべての製品変更がビジネスに与える影響を測定する
- link: https://www.datadoghq.com/blog/datadog-product-analytics
  tag: ブログ
  text: Product Analytics を活用してデータに基づく設計の意思決定を行う
title: 実験の計画と開始
---
## 概要{#overview}

[実験][8]を計画および開始して、新しい機能がビジネス成果、ユーザー行動、アプリケーションパフォーマンスにどのように影響するかを測定します。

## 前提条件{#prerequisites}

<div class="alert alert-info">実験を作成および開始するには、適切な <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#product-analytics">Product Analytics</a> および <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#feature-flags">Feature Flags</a> 権限が必要です。</div>

始める前に、以下があることを確認してください。

- テストする実験バリアントをデプロイおよび管理するための[機能フラグ][4]。
- 実験の結果を測定するための少なくとも 1 つの[実験メトリクス][2]。
- Datadog が実験をランダム化するレベルを設定するための[サブジェクトタイプ][6]。

## 実験を計画する{#plan-your-experiment}

実験に名前と仮説を付け、設定を定義します。

### 実験のドラフトを作成する{#draft-your-experiment}

ドラフト実験を作成するには、以下の手順に従います。

1. Datadog Product Analytics の [[{{< ui >}}Experiments{{< /ui >}} > {{< ui >}}Experiment List{{< /ui >}}][1]] に移動します。
1. [{{< ui >}}Create Experiment{{< /ui >}}] をクリックしてダイアログを開き、[{{< ui >}}Experiment name{{< /ui >}}] と [{{< ui >}}Hypothesis{{< /ui >}}] に入力します。
1. [{{< ui >}}Create Draft Experiment{{< /ui >}}] をクリックして実験のセットアップページを開き、[実験のセットアップ](#set-up-your-experiment)に進みます。

{{< img src="/product_analytics/experiment/exp_plan_launch_create_experiment.png" alt="「New Product Photos Experiment」という実験名、高解像度の製品写真がカートに追加コンバージョンを増加させるという仮説が表示され、[Create Draft Experiment] ボタンが強調表示された [Create new draft experiment] ダイアログ。" style="width:80%;" >}}

以下の手順に従って、機能フラグの詳細ページから直接実験を作成することもできます。

1. [[{{< ui >}}Feature Flags{{< /ui >}}][7]] ページに移動し、[{{< ui >}}Overview{{< /ui >}}] タブを選択します。
1. 実験に使用する機能フラグを選択して、その詳細ページを開きます。
1. [{{< ui >}}Targeting rules & rollouts{{< /ui >}}] セクションで [{{< ui >}}Create New Experiment{{< /ui >}}] をクリックすると、ダイアログが開きます。
1. ダイアログで [{{< ui >}}Create Experiment{{< /ui >}}] をクリックすると、実験のセットアップページが開きます。
1. 実験のセットアップページで、[{{< ui >}}Experiment name{{< /ui >}}] には機能フラグ名が Datadog により自動入力されます。必要に応じて編集します。
1. [{{< ui >}}Hypothesis{{< /ui >}}] に入力し、[実験のセットアップ](#set-up-your-experiment)に進みます。

{{< img src="/product_analytics/experiment/exp_plan_launch_ff_new_experiment.png" alt="new_product_photos というフラグの機能フラグ詳細ページ。ターゲティングルールとロールアウトが表示されており、コントロールバリアントとトリートメントバリアントの間で50対50に分割され、下部に [Create New Experiment] ボタンが強調表示されている。" style="width:80%;" >}}

### 実験のセットアップ{#set-up-your-experiment}

実験を作成した後、メトリクス、機能フラグ、およびランダム化設定を定義します。

#### 決定メトリクスの設定{#set-decision-metrics}

実験の結果を測定するメトリクスを定義するには、以下の手順に従います。

1. [{{< ui >}}Calculate metrics by{{< /ui >}}] ドロップダウンを使用して、サブジェクトタイプを選択します。
   - カスタムサブジェクトタイプを定義するには、ドロップダウンから [{{< ui >}}Create subject type{{< /ui >}}] を選択します。
1. [{{< ui >}}Primary metric{{< /ui >}}] ボタンをクリックすると、ピッカーが開きます。
   1. 測定したい結果の主要なメトリクスを選択します。
   1. (オプション) [{{< ui >}}Certified{{< /ui >}}] または [{{< ui >}}Non-certified{{< /ui >}}] タブをクリックしてリストをフィルタリングします。
   1. (オプション) [{{< ui >}}Create Metric{{< /ui >}}] をクリックして新しいメトリクスを定義します。設定手順については、[実験メトリクスの作成][2]を参照してください。
1. (オプション) [{{< ui >}}Secondary metrics{{< /ui >}}] ボタンをクリックしてガードレールメトリクスを追加します。これは、パフォーマンス、エンゲージメント、収益など、実験が他の領域に与える意図しない影響を監視するものです。
1. 「[サンプルサイズの計算を実行する (オプション)](#run-a-sample-size-calculation-optional)」に進むか、スキップして「[機能フラグを追加する](#add-a-feature-flag)」に進みます。

{{< img src="/product_analytics/experiment/exp_plan_launch_decision_metric.png" alt="実験構成ページ。[Decision metrics] (決定メトリクス) セクションが表示されており、[Calculate metrics by] (メトリクスの計算対象) ドロップダウンが [User (@usr.id)]、プライマリメトリクスが [Add to Cart Conversion] に設定され、[Secondary metrics] (セカンダリメトリクス) セクションが表示されている。" style="width:80%;" >}}

#### サンプルサイズの計算を実行する (オプション){#run-a-sample-size-calculation-optional}

サンプルサイズ計算ツールは、有意な効果を検出するために必要なユーザー数と期間を見積もります。ユーザーを実験に割り当てるイベントであるエントリポイントを選択すると、Datadog はそのイベントへのトラフィック量を使用して推定値を算出します。

計算を実行するには、以下の手順に従います。

1. [{{< ui >}}Run a sample size calculation (optional){{< /ui >}}] セクションで**サンプルサイズ計算ツール**のリンクをクリックすると、サイドパネルが開きます。
1. [{{< ui >}}Calculation details{{< /ui >}}] (計算詳細) を展開します。プライマリメトリクスとセカンダリメトリクスが [{{< ui >}}Metrics{{< /ui >}}] (メトリクス) の下に表示されます。
1. [{{< ui >}}Entry point{{< /ui >}}] (エントリポイント) ドロップダウンを使用して、実験にユーザーを割り当てるイベント (チェックアウトページの閲覧や [Add to Cart] (カートに追加) ボタンのクリック) を選択します。Datadog はこのイベントを使用してトラフィック量を推定します。
1. (オプション) [{{< ui >}}Filter entry point{{< /ui >}}] (エントリポイントのフィルタリング) の下で、エントリポイントのオーディエンスを絞り込みます。
   1. [{{< ui >}}\+ Filter{{< /ui >}}] (+フィルター) をクリックし、ピッカーからプロパティを選択します。必要なプロパティが表示されない場合は、[{{< ui >}}Custom property{{< /ui >}}] (カスタムプロパティ) フィールドにプロパティ名を入力し、[{{< ui >}}Add{{< /ui >}}] (追加) をクリックします。
   1. 表示されたフィルター行で、必要に応じて演算子を変更し、ドロップダウンから値を選択します。
   1. (オプション) [{{< ui >}}\+ Filter{{< /ui >}}] をクリックして行をさらに追加します。行の間にあるドロップダウンを使用して [{{< ui >}}or{{< /ui >}}] または [{{< ui >}}and{{< /ui >}}] を選択し、フィルターの組み合わせ方法を設定します。
1. [{{< ui >}}Number of variants{{< /ui >}}] (バリアント数) と [{{< ui >}}Traffic exposure{{< /ui >}}] (トラフィックエクスポージャー) を設定します。
1. [{{< ui >}}Additional inputs{{< /ui >}}] (追加入力) を展開し、統計的な [{{< ui >}}Power{{< /ui >}}] (検出力) を選択して、[{{< ui >}}Target experiment duration{{< /ui >}}] (目標実験期間) を週単位で入力します。
   - [{{< ui >}}Target experiment duration{{< /ui >}}] の値は、1 または偶数である必要があります。これは、計算ツールが 1、2、4、6、および 8 週間の間隔で MDE 値と予想ユーザー数を推定するためです。
1. [{{< ui >}}Run Calculation{{< /ui >}}] (計算の実行) をクリックすると、メトリクスの**経時的な[最小検出効果 (MDE)][3]**の推定値が表示されます。
1. サイドパネルを閉じ、[機能フラグの追加](#add-a-feature-flag)に進みます。

{{< img src="/product_analytics/experiment/exp_plan_launch_sample_size.png" alt="サンプルサイズ計算ツールのサイドパネル。計算の詳細が表示されており、プライマリメトリクスとして「カートに追加コンバージョン」、セカンダリメトリクス (ガードレール) として「カート閲覧数」、エントリポイントとして「[カートに追加] のクリック」、100% のトラフィックエクスポージャーでの 2 つのバリアント、および検出力と目標実験期間の追加入力が設定されている。" style="width:80%;" >}}

#### 機能フラグの追加{#add-a-feature-flag}

機能フラグを追加して、実験バリアント間で Datadog がトラフィックを分割する方法を制御するには、次の手順に従います。

1. [{{< ui >}}Feature flag{{< /ui >}}] (機能フラグ) セクションで、[{{< ui >}}Add a feature flag{{< /ui >}}] (機能フラグを追加) ボタンをクリックすると、ピッカーが開きます。
1. 実験のための機能フラグを選択します。
   - 機能フラグを作成していない場合は、[{{< ui >}}Create New Feature Flag{{< /ui >}}] (新しい機能フラグを作成) をクリックします。セットアップの手順については、[機能フラグを初めて作成する][9]を参照してください。
1. [ランダム化の構成](#configure-randomization)に進みます。

{{< img src="/product_analytics/experiment/exp_plan_launch_add_ff.png" alt="作成日順に並べられた利用可能なフラグのリストを表示する機能フラグピッカー。new_product_photos が選択されており、その詳細 (フラグキー new-product-photos、タイプ Boolean) と下部に [Create New Feature Flag] リンクが表示されている。" style="width:80%;" >}}

#### ランダム化の構成{#configure-randomization}

ユーザーをランダム化し、実験バリアント間でトラフィックを分割します。

機能フラグを選択すると、Datadog はフラグの構成に基づいてランダム化設定を事前設定します。

<div class="alert alert-info">ここで構成するランダム化設定は、実験を開始した後に次の効果をもたらします。<br><br><ul><li>Datadog は、選択した機能フラグにターゲティングルールを追加します。</li><li>複数の実験で同じフラグを共有している場合、Datadog はフラグのターゲティングルールの順序に基づいてトラフィックを評価します。実験を開始する前に、確認ダイアログでターゲティングルールの順序を変更できます。</li></ul></div>

ランダム化を構成するには、以下の手順に従います。

1. ドロップダウンから実験の [{{< ui >}}Environment{{< /ui >}}] (環境) を選択します。
1. [{{< ui >}}Targeting rules{{< /ui >}}] (ターゲティングルール) の下で、[評価コンテキスト][10]に設定したカスタム属性 (ユーザーロールやサブスクリプション階層など) に基づいてユーザーをターゲットにするフィルターを構成します。
   1. [{{< ui >}}Add Filter{{< /ui >}}] (フィルターを追加) をクリックします。`IF` 行には、属性と値を入力し、演算子をドロップダウンから選択します。
   1. (オプション) ターゲティングルールを絞り込みます。
      - 同じフィルター内に `AND` 行を追加するには、[{{< ui >}}Add Condition{{< /ui >}}] (条件を追加) をクリックします。
      - `OR` で結合される別のフィルターを追加するには、[{{< ui >}}Add Filter{{< /ui >}}] (フィルターを追加) をクリックします。
1. [{{< ui >}}Variants{{< /ui >}}] (バリアント) の [{{< ui >}}Randomize users and split traffic{{< /ui >}}] (ユーザーをランダム化しトラフィックを分割) ドロップダウンを使用して [{{< ui >}}Equally (recommended){{< /ui >}}] (均等) または [{{< ui >}}Custom{{< /ui >}}] (ランダム) を選択します。これは、バリアント間で Datadog がトラフィックをどのように分割するかを設定するものです。実験全体を通じて、各ユーザーは割り当てられたバリアントのみを見ます。
   - [{{< ui >}}Custom{{< /ui >}}] を選択した場合は、各バリアントのパーセンテージを入力します。パーセンテージの合計は 100% でなければなりません。
1. [{{< ui >}}Traffic exposure{{< /ui >}}] (トラフィックエクスポージャー) の下で、実験に含めるターゲティングルールに一致するユーザーのパーセンテージを設定します。
1. (オプション) [段階的ロールアウトをスケジュールする](#schedule-a-staged-rollout)、[追加設定を構成する](#additional-configs)、またはその両方を行います。
1. 実験の構成後、[実験を開始する](#launch-your-experiment)に進みます。

{{< img src="/product_analytics/experiment/exp_plan_launch_randomization_section.png" alt="環境が「prod」に設定されたランダム化セクション。OR で結合された 2 つのターゲティングルールフィルター (それぞれ IF と AND 条件、および [Add Condition] (条件を追加) ボタンを含む)、その下に [Add Filter] (フィルターを追加) ボタン、[Control (true)] と [Treatment (false)] のバリアント間で 50対50 の均等分割、ターゲットトラフィックの 100% に設定されたトラフィックエクスポージャー、および [Add Rollout Steps] (ロールアウトステップを追加) オプションがある。" style="width:80%;" >}}

{{% collapse-content title="追加の構成設定 (オプション)" level="h4" expanded=false id="additional-configs" %}}

##### 段階的ロールアウトをスケジュールする{#schedule-a-staged-rollout}

実験トラフィックをすべてのユーザーに一度に公開するのではなく、段階的に増やすには、以下の手順に従います。

1. [{{< ui >}}Randomization{{< /ui >}}] (ランダム化) セクションで、[{{< ui >}}Add Rollout Steps{{< /ui >}}] (ロールアウトステップを追加) をクリックし、ドロップダウンから事前設定のステップ構成 (たとえば、5% から 100% の 3 ステップ) を選択します。
1. 必要に応じて、各ステップの [{{< ui >}}Traffic exposure{{< /ui >}}] (トラフィックエクスポージャー) パーセンテージを調整します。
1. [{{< ui >}}Scheduled rollout by holding between steps for{{< /ui >}}] (ステップ間で保留されるスケジュールされたロールアウト) の横にある 2 つのドロップダウンを使用して、数値と時間単位 (たとえば、{{< ui >}}1{{< /ui >}} と {{< ui >}}days{{< /ui >}}) を選択します。これにより、次に進む前の各ステップの実行時間が設定されます。

各ロールアウトステップで、Datadog は実験に含める対象ユーザーの割合をサンプリングします。サンプルの対象外となったユーザーには引き続きデフォルト (コントロール) のエクスペリエンスが表示されますが、Datadog はそれらのユーザーを実験結果に含めません。

##### 通知を設定する{#set-notifications}

実験の進行に合わせて、適切なユーザーに通知をルーティングします。

[{{< ui >}}Notifications{{< /ui >}}] (通知) セクションで、[{{< ui >}}Recipients{{< /ui >}}] (受信者) ドロップダウンを使用して、実験ライフサイクルイベント (結果が統計的有意性に達しつつある、または Datadog が問題を検出したなど) に関する通知の受信者を選択します。

##### 統計分析プランを選択する{#choose-a-statistical-analysis-plan}

Datadog が実験の統計的有意性を計算する方法を構成します。手法の選択に関するガイダンスについては、[分析手法][11]を参照してください。

実験を作成すると、Datadog は組織のデフォルトの統計分析設定をコピーします。組織がデフォルト設定を構成している場合は、{{< ui >}}COMPANY DEFAULT{{< /ui >}} (会社のデフォルト) バッジが表示されます。組織のデフォルト設定を後から変更した場合、新しく作成された実験には適用されますが、既存の実験は変更されません。

統計分析プランを変更するには、以下の手順に従います。

1. [{{< ui >}}Statistical analysis plan{{< /ui >}}] (統計的分析プラン) セクションを展開します。
1. [{{< ui >}}Confidence interval method{{< /ui >}}] (信頼区間方式) ドロップダウンから方式を選択します。
   - [{{< ui >}}Bayesian{{< /ui >}}] (ベイズ) を選択した場合は、ドロップダウンから [{{< ui >}}Standard Deviation of Prior{{< /ui >}}] (以前の標準偏差) を選択します。
1. [{{< ui >}}Confidence level{{< /ui >}}] (信頼区間) ドロップダウンからパーセンテージを選択します。
1. [CUPED][12] を無効にするには、[{{< ui >}}CUPED calculation{{< /ui >}}] (CUPED 計算) をオフにします。CUPED はデフォルトで有効になっており、各実験対象の実験前データを使用して、メトリクスの分散を減少させ、実験の感度を向上させます。
1. ファミリーワイズエラー率を制御するには、[{{< ui >}}Multiple testing correction{{< /ui >}}] (多重検定補正) をオンにします。この設定は、複数のメトリクスおよび処理バリアントの比較を調整し、より保守的な結果を生成します。詳細については、[多重検定補正][13]を参照してください。
   - [{{< ui >}}Bayesian{{< /ui >}}] (ベイズ) 方式を使用している場合、この設定は利用できません。
1. [{{< ui >}}Reset to Default{{< /ui >}}] (デフォルトに復元) をクリックすると、実験作成時にコピーされた統計分析のデフォルト設定 (その時点で有効だった会社全体のデフォルト設定を含む) が復元されます。

##### 分割による探索ディメンションを追加する{#add-split-by-exploration-dimensions}

[評価コンテキスト][10]のプロパティ (属性とも呼ばれます) で実験結果をセグメント化します。

分割ディメンションを設定するには、以下の手順に従います。

1. [{{< ui >}}Split-by exploration dimensions{{< /ui >}}] (分割による探索ディメンション) セクションを展開します。
1. [{{< ui >}}Properties to compute for dimensional analysis{{< /ui >}}] (ディメンション分析用計算のプロパティ) ドロップダウンからプロパティを選択します。利用可能なプロパティには `context.` プレフィックスが付いています。
1. 必要なプロパティが表示されない場合、以下の手順に従います。
   1. ドロップダウンフィールドにプロパティ名を入力し、`context.` をプレフィックスとして付けます (例: `context.team`)。次に、[{{< ui >}}Add custom property{{< /ui >}}] (カスタムプロパティを追加) をクリックして、[{{< ui >}}Split-by exploration dimensions{{< /ui >}}] ダイアログを開きます。
   1. [{{< ui >}}Column Name{{< /ui >}}] (列名) が入力したプロパティ名と一致していることを確認します。
   1. ドロップダウンからプロパティ [{{< ui >}}Type{{< /ui >}}] (タイプ) を選択します。
   1. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。カスタムプロパティが [{{< ui >}}Properties to compute for dimensional analysis{{< /ui >}}] (ディメンション分析用計算のプロパティ) ドロップダウンに表示されます。

{{% /collapse-content %}}

## 実験を開始する{#launch-your-experiment}

実験を開始するには、以下の手順に従います。

1. [{{< ui >}}Start Experiment{{< /ui >}}] (実験を開始) をクリックして、[{{< ui >}}Confirm starting the experiment{{< /ui >}}] (実験の開始を確認) ダイアログを開きます。
1. ダイアログで、環境、機能フラグ、およびフラグのターゲティングルールが正確であることを確認します。
   - 複数の実験で同じ機能フラグを共有する場合は、各ターゲティングルールの上下矢印を使用して順序を変更します。
1. [{{< ui >}}Start Experiment & Enable Flag{{< /ui >}}] (実験を開始しフラグを有効にする) をクリックして、実験を開始します。

実験を開始すると、[{{< ui >}}Flag & Exposures{{< /ui >}}] (フラグとエクスポージャー) ページが開きます。設定が有効になっていることを確認します。
- [{{< ui >}}Exposure balance check{{< /ui >}}] (エクスポージャーバランスのチェック) を確認して、バリアントが設定した割合で分割されていることを確認します。
- [{{< ui >}}View Exposures Log{{< /ui >}}] (エクスポージャーログを表示) をクリックして、リアルタイムのユーザー登録を監視します。

データを確認するには、[実験結果の読み取り][5]を参照してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/experiments
[2]: /ja/experiments/defining_metrics
[3]: /ja/experiments/statistics/minimum_detectable_effect
[4]: /ja/getting_started/feature_flags
[5]: /ja/experiments/reading_results
[6]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types
[7]: https://app.datadoghq.com/feature-flags
[8]: /ja/experiments/
[9]: /ja/getting_started/feature_flags/#create-your-first-feature-flag
[10]: https://docs.datadoghq.com/ja/feature_flags/client#context-attribute-requirements
[11]: /ja/experiments/statistics/analysis_methods
[12]: /ja/experiments/statistics/cuped
[13]: /ja/experiments/statistics/multiple_testing_correction