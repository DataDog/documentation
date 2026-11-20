---
description: Synthetic Monitoring テストを論理的なグループに整理します。
further_reading:
- link: /synthetics/
  tag: ドキュメント
  text: Synthetic Monitoring について
- link: /monitors/types/synthetic_monitoring/
  tag: ドキュメント
  text: Synthetic テストモニターを設定する
- link: /synthetics/bits_testing/
  tag: ドキュメント
  text: Bits Testing
- link: /synthetics/troubleshooting/
  tag: ドキュメント
  text: Synthetic Monitoring のトラブルシューティング
- link: https://www.datadoghq.com/blog/test-suites/
  tag: ブログ
  text: 複雑なテスト環境から、整理された実用的なインサイトを取得する
- link: /synthetics/guide/how-synthetics-monitors-trigger-alerts/
  tag: ガイド
  text: Synthetic モニターのアラートの理解
title: テストスイート
---
## 概要{#overview}

Synthetic Monitoring テストスイートを使用すると、複数のテストを 1 つのコレクションに整理して、管理とトラブルシューティングを簡素化できます。ユーザージャーニー、環境、場所、サービス、チーム、またはワークフローに合ったその他のディメンションでテストをグループ化します。1 つの統合されたビューから、集計された結果の表示、失敗しているコンポーネントの特定、関連するテスト全体でのアプリケーションパフォーマンスの把握のあらゆる操作を行えます。スイートレベルのアラートを設定すると、テストの重大な部分が失敗したときに、通知をまとめて受け取れます。

## 主な特徴 {#key-features}

- **影響度に基づくアラート**: テストスイートの重大な部分が失敗したときに、アラートをまとめて受け取ります。
- **一元的な可視化**: スイート内のすべてのテストとその結果を 1 か所で確認できます。
- **簡素化された管理**: 個々のテストを個別に管理するのではなく、テストグループを作成して実行します。
- **メンテナンスの容易化**: アプリケーションに変更が加えられた際に、更新が必要なテストを特定します。

## テストスイートを作成する {#create-a-test-suite}

Synthetic Monitoring テストスイートを作成するには、次のようにします。
1. Datadog で、[{{< ui >}}Digital Experience{{< /ui >}}] (デジタルエクスペリエンス) に移動します。
2. [{{< ui >}}New Test Suite{{< /ui >}}] (新規テストスイート) をクリックします。
3. 必要に応じて、[[Synthetic Monitoring tests] (Synthetic Monitoring テスト)][1] ページに移動し、[{{< ui >}}\+ New Suite{{< /ui >}}] (+ 新規スイート) をクリックします。

Bits Testing で自動的に既存のテストがスイートとしてグループ化されるようにするには、「[Bits Testing でテストスイートを作成する](#create-test-suites-with-bits-testing)」を参照してください。

## テストスイートの設定 {#test-suite-configuration}

1. スイートの名前を入力します (例: `Checkout flow` や `API health checks`)。
2. [{{< ui >}}Add Tests{{< /ui >}}] (テストの追加) をクリックして、既存の Synthetic Monitoring テストを含めます。 
   以下が可能です。
   - **名前またはタグで検索**します。 
   - **テストタイプ (ブラウザ、API、プライベートロケーション、モバイルなど) でフィルタリング**します。
   - **含めるテストを 1 つ以上選択**します。
3. [{{< ui >}}Add Tests{{< /ui >}}] をクリックして確定します。
4. _必要に応じて、各エントリの横にある [Remove Test from Suite] (スイートからテストを削除) アイコンを使用してテストを削除します_。

5. スイートのアラートを設定します。
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">テストスイートのアラートは、この <a href="/getting_started/site">Datadog サイト</a>ではサポートされていません ({{< region-param key="dd_site_name" >}})</div>
{{% /site-region %}}

   - デフォルトでは、すべてのテストが [{{< ui >}}Critical{{< /ui >}}] (重大) としてマークされ、重大なテストのいずれかが失敗するとアラートがトリガーされます。

     **注**: スイートアラートは個別のテストアラートとは別個のものです。通知が重複することを防ぐために、スイートに含まれる個別のテストのアラートをミューとしてください。
   - 特定のテストがスイートレベルのアラートをトリガーしないようにするには、そのテストを選択して [{{< ui >}}Ignored{{< /ui >}}] (無視) とマークします。
   - アラートのしきい値を調整して、指定した割合の重大なテストが失敗した場合にのみトリガーされるようにします。

   {{< img src="synthetics/test_suites/suite_alerting.png" alt="スイートのアラート作成ページ。[Suite Alerting] (スイートアラート) ドロップダウンが展開されています。" style="width:80%;">}}

   **注**: 既存のテストスイートでは、アラートはデフォルト設定で有効になっています。必要に応じて設定を変更できます。

6. 単一のテストの場合と同様に、[モニター設定][2] (通知メッセージ、受信者、再通知) を設定します。
7. 終了したら、[{{< ui >}}Save Suite{{< /ui >}}] (スイートの保存) をクリックします。

{{< img src="synthetics/test_suites/test_suite_creation_2.png" alt="Synthetic Monitoring テストスイートの作成ページ" style="width:80%;">}}

## Bits Testing でテストスイートを作成する {#create-test-suites-with-bits-testing}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">Bits Testing によるテストスイートの作成は、この <a href="/getting_started/site">Datadog サイト</a>ではサポートされていません ({{< region-param key="dd_site_name" >}})。</div>
{{% /site-region %}}

[Bits Testing][4] では、既存の Synthetic テストをスイートにグループ化できます。テストをどのようにグループ化したいかを平易な言葉で記述すると、Bits Testing が一致するテストのスイートを提案します。各スイートを確認し、作成するスイートを選択します。これは、Bits Testing の検出ジョブで生成される、新しいテストを含むテストスイートとは別個のものです。

Bits Testing に依頼する際には、次のようにします。

- **1 つのスイート**: スイートの内容を記述します (例: 「チェックアウトフローを監視するスイートを作成してください」)。
- **一度に複数のスイート**: テストの分割方法を記述します (例: チームごとに 1 つのスイート、サービスごとに 1 つのスイート、環境ごとに 1 つのスイート、またはサービスと環境の組み合わせごとに 1 つのスイート)。

Bits Testing でテストスイートを作成するには、次のようにします。

1. [Synthetic Monitoring & Testing] (Synthetic Monitoring および Synthetic Testing) のトップナビゲーションで、[{{< ui >}}Bits Testing{{< /ui >}}] をクリックします。
2. テストをどのようにグループ化するかを記述します (例: `Create a test suite for each one of my teams` (チームごとに 1 つのテストスイートを作成してください))。提案されたプロンプトのいずれかを選択することもできます。
3. Bits Testing が生成しようとしているスイートを確認し、生成ボタン (例: [{{< ui >}}Generate 5 Suites{{< /ui >}}] (5 つのスイートを生成)、または単一スイートの場合は [{{< ui >}}Generate Suite{{< /ui >}}] (スイートの生成)) をクリックします。

   {{< img src="synthetics/test_suites/bits_testing_multiple_suites.png" alt="チームごとに 1 つのテストスイートを作成する要求に対する Bits Testing の応答。5 つのスイートプロンプトと [Generate 5 Suites] ボタンが表示されています。" style="width:100%;" >}}

4. [{{< ui >}}Review suggested suites{{< /ui >}}] (提案されたスイートを確認) パネルで、一覧の各スイートを選択して、その説明とテストを確認します。各スイートについて、次の操作を行えます。
   - [{{< ui >}}Add Tests{{< /ui >}}] (テストの追加) をクリックしてテストを追加するか、テストを選択して [{{< ui >}}Remove From Suite{{< /ui >}}] (スイートから削除) をクリックして削除します。
   - 各テストの [{{< ui >}}Suite Alerting{{< /ui >}}] (スイートのアラート) 値を設定します。デフォルトでは、すべてのテストが [{{< ui >}}Critical{{< /ui >}}] とマークされています。詳細については、「[テストスイートの設定](#test-suite-configuration)」を参照してください。
   - [{{< ui >}}Exclude Suite{{< /ui >}}] (スイートを除外) をクリックすると、そのスイートの作成がスキップされます。

   {{< img src="synthetics/test_suites/bits_testing_review_suites.png" alt="[Review suggested suites] パネル。生成された 5 つのスイート、1 つのスイートの説明、そのテストが表示され、[Suite Alerting] が [Critical] に設定されています。" style="width:100%;" >}}

5. 作成ボタン (例: [{{< ui >}}Create 5 Suites{{< /ui >}}] (5 つのスイートを作成)) をクリックします。
6. [{{< ui >}}View Suites{{< /ui >}}] (スイートを表示) をクリックして、新しいスイートを開きます。
7. 各スイートを開き、[モニター設定][2]で通知の受信者を追加してから、スイートを保存します。Bits Testing では、作成するスイートに受信者を追加しません。

Bits Testing が作成するスイートは、スイートレベルのアラートや自動生成されるサービスレベル目標など、ユーザーが手動で作成するスイートと同様に機能します。「[サービスレベル目標](#service-level-objectives)」セクションを参照してください。

### Bits Testing 用のプロンプトを作成する {#write-a-prompt-for-bits-testing}

技術的な詳細だけでなく、監視する事業領域や運用領域についても記述します。たとえば、以下のように記述します。

- `Create a suite for the checkout journey`
- `Create separate suites for each team and environment`
- `Group the tests that validate authentication`
- `Create one suite for each production service`

プロンプトでは、ユーザージャーニー、サービス、チーム、環境、共有プラットフォーム機能、リリース検証など、あらゆるグループについて記述できます。

Bits Testing から提案されるスイートは、既存のテストに含まれる情報と、グループについてどれだけ明確に記述したかによって決まります。提案された各スイートは作成する前に確認します。

## サービスレベル目標 {#service-level-objectives}

ユーザーがテストスイートを作成すると、Datadog が自動的にそのスイートの SLO (サービスレベル目標) を生成します。設定は不要です。デフォルトでは、SLO は 7 日間のローリングウィンドウを使用し、目標を 99.9% に設定します。

<div class="alert alert-info">テストスイートの権限 (表示および編集) はスイート自体に適用され、自動生成される SLO の権限とは独立しています。SLO へのアクセスは、ユーザーの <a href="/service_level_objectives/#permissions">SLO 製品権限</a>によって決定されます。テストスイートの編集権限を持たないユーザーでも、SLO の編集権限があれば、自動生成された SLO を編集できます。</div>

テストスイートの詳細ページの [SLO] パネルには、現在の SLO ステータスとエラーバジェットが表示されます。このビューでは、以下の操作を行えます。

- **[アラートを作成](#create-an-alert)**して、SLO のパフォーマンスが大幅に低下したときにアラートを生成するように設定します。アラートがすでに存在する場合は、アラートインジケーターにカーソルを合わせると詳細が表示されます。
- **[詳細を表示](#view-details)**します。目のアイコンをクリックすると、SLO の全詳細が示されたページが開きます。
- **[コントリビューターを表示](#contributors)**して、エラーバジェットを消費しているテストを確認します。
- **[SLO を編集](#edit-the-service-level-objective)**するには、 {{< img src="icons/pencil-mdi.svg" inline="true" style="width:16px;">}} 鉛筆アイコンをクリックします。

{{< img src="synthetics/test_suites/test_suite_slo_panel_v2.png" alt="[SLO] パネルが表示されているテストスイートの詳細ページ。パネルには、7 日間のローリングウィンドウとエラーバジェット、バジェット消費量の多いテストが示されている [Primary Contributors] (プライマリコントリビューター) セクション、[Global Uptime] (グローバルアップタイム) タイムライン、[Test Runs] (テスト実行) セクションが示されています。" style="width:100%;">}}

### アラートを作成する {#create-an-alert}

SLO 詳細パネルの [{{< ui >}}Create alert{{< /ui >}}] (アラートの作成) をクリックして SLO モニター設定フォームを開くと、アラートの条件と通知の設定を行うことができます。

{{< img src="synthetics/test_suites/test_suite_slo_create_alert.png" alt="アラート条件と通知設定が示されている SLO モニター作成フォーム。" style="width:80%;">}}

### 詳細を表示する {#view-details}

目のアイコンをクリックすると、SLO の全詳細が示されたページが開きます。このページでは、SLO ステータス、エラーバジェットのバーンダウン、バーンレート、およびメトリクスの時系列を確認できます。

{{< img src="synthetics/test_suites/test_suite_slo_details.png" alt="テストスイートの SLO の全詳細が示されたページ。SLO ステータス、エラーバジェットのバーンダウン、バーンレート、およびメトリクスの時系列が示されています。" style="width:90%;">}}

### コントリビューター {#contributors}

コントリビューターセクションでは、エラーバジェットの消費に最も大きな影響を与えているテストが強調表示されます。

- **[Total number of critical tests] (重大なテストの総数)**: スイートの重大なテストの総数。
- **Error budget consumed by (エラーバジェットを消費したテスト)**: エラーバジェットを消費したテストの数。
- **Top 3 contributors consumed (消費量が多い上位 3 つのコントリビューター)**: スイートがアラート状態の間に各テストがアラート状態であった時間に基づく、影響度の割合による上位 3 つのテスト。

{{< img src="synthetics/test_suites/test_suite_slo_contributors.png" alt="重大なテストの総数、エラーバジェットを消費したテスト、影響度の割合が高い上位 3 つのコントリビューターが表示されている [Primary Contributors] セクション。" style="width:90%;">}}

### サービスレベル目標を編集する {#edit-the-service-level-objective}

SLO の期間 (例: 30 日間) または目標を更新するには、 {{< img src="icons/pencil-mdi.svg" inline="true" style="width:16px;">}} [SLO] パネルの鉛筆アイコンをクリックします。この SLO はテストスイートから自動的に作成されるため、編集できるのは期間、目標、および警告しきい値のみです。

   {{< img src="synthetics/test_suites/test_suite_slo_edit.png" alt="目標と期間フィールドが表示されている、テストスイートの [Edit SLO] (SLO の編集) ページ。" style="width:90%;">}}

## テストスイートを表示および管理する {#view-and-manage-test-suites}

作成したスイートは、[[Synthetic Monitoring tests][1]] ページの [{{< ui >}}Suites{{< /ui >}}] (スイート) タブに表示されます。テストスイートには、[{{< ui >}}Digital Experience{{< /ui >}}] > [{{< ui >}}Test Suites{{< /ui >}}] (テストスイート) からもアクセスできます。

1 つ以上のテストスイートに[スケジュールされたダウンタイム][3]を適用するには、チェックボックスを使用してテストスイートを選択し、[{{< ui >}}Add to Downtime{{< /ui >}}] (ダウンタイムに追加) をクリックします。

テストスイートを表示する際には、次の 3 つのタブを使用できます。

- [{{< ui >}}Tests in the Suite{{< /ui >}}] (スイート内のテスト): スイートに含まれるすべてのテストが一覧表示されます。
- [{{< ui >}}Test Runs{{< /ui >}}] (テスト実行): グローバルなアップタイムメトリクスと関連するテスト実行が表示されます。
- [{{< ui >}}Attributes{{< /ui >}}] (属性): `team`、モニター、テストスイートの作成者などのスイート属性が表示されます。

**注**: テストが追加された日付以降のテスト実行のみがスイートに表示されます。それより前の結果を表示するには、個々のテストページをチェックしてください。テストの名前を変更した場合、以前の実行は元の名前のままで表示されます。追加できるテストは 1 つのスイートにつき最大 300 個です。

{{< img src="synthetics/test_suites/test_suite_summary_2.png" alt="Synthetic Monitoring テストスイートの概要ページ" style="width:100%;">}}

## テストスイートを実行する {#run-a-test-suite}

テスト実行は、次の 2 つの方法でトリガーできます。

- [スイート内のすべてのテストを実行する](#run-all-tests-in-the-suite)
- [選択したテストを実行する](#run-selected-tests)

### スイート内のすべてのテストを実行する {#run-all-tests-in-the-suite}

スイートの詳細ページで、右上にある [{{< ui >}}Run Suite Now{{< /ui >}}] (今すぐスイートを実行) をクリックして、スイート内のすべてのテストをトリガーします。

{{< img src="synthetics/test_suites/run_suite_now.png" alt="右上に [Run Suite Now] ボタンがあるテストスイートの詳細ページ。" style="width:100%;" >}}

### 選択したテストを実行する {#run-selected-tests}

一部のテストを実行するには、次のようにします。

1. スイートに移動し、[{{< ui >}}Tests in the Suite{{< /ui >}}] タブをクリックします。
2. チェックボックスを使用して、実行するテストを選択します。
3. [{{< ui >}}Run Tests Now{{< /ui >}}] をクリックします。

{{< img src="synthetics/test_suites/run_tests_now.png" alt="テストがまとめて選択され、[Run Tests Now] ボタンが表示されている [Tests in the Suite] タブ。" style="width:100%;" >}}

**注**: [{{< ui >}}Run Tests Now{{< /ui >}}] を使用して一度に実行できるテストは最大 50 個です。

## トラブルシューティング{#troubleshooting}

スイートに表示されないテストがある場合は、次のようにします。

- テストがアクティブであり、削除されていないことを確認します。
- それらのテストを表示するために必要な権限があることを確認します。
- テストを追加する際は、フィルターを更新するか、検索条件をクリアします。

実行結果が不完全に思われる場合は、次のようにします。

- テストの実行頻度と最近のアクティビティを確認します。
- 実行がフィルターで除外される原因となる可能性があるタグや場所の不一致がないかチェックします。
- テストスイートを保存し直して、テストとの関連付けを更新します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests
[2]: /ja/synthetics/notifications/
[3]: /ja/synthetics/platform/downtime/
[4]: /ja/synthetics/bits_testing/