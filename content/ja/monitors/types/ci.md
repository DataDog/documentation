---
aliases:
- /ja/monitors/monitor_types/ci_pipelines/
- /ja/monitors/create/types/ci_pipelines/
- /ja/monitors/create/types/ci/
further_reading:
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/manage/status/
  tag: ドキュメント
  text: モニターステータスを確認
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: GitHub
  text: Datadog CI モニターによるパイプラインアラートの構成
title: CI モニター
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 概要

[CI Visibility を有効にする][1]と、CI Pipeline または CI Test モニターを作成することができます。

CI モニターでは、CI データを視覚化し、それに対するアラートを設定することができます。例えば、CI Pipeline モニターを作成し、パイプラインやジョブが失敗した場合のアラートを受信します。CI Test モニターを作成し、失敗したテストや遅いテストに関するアラートを受信します。

## モニターの作成

Datadog で [CI モニター][2]を作成するには、メインナビゲーションで *Monitors -> New Monitor --> CI* の順に進みます。

<div class="alert alert-info"><strong>注</strong>: アカウント当たり上限 1000 件の CI モニターがデフォルトで設定されています。この制限を解除するには、<a href="/help/">サポートまでお問い合わせ</a>ください。</div>

**Pipelines** または **Tests** のどちらかのモニターを選択します。

{{< tabs >}}
{{% tab "Pipelines" %}}

### 検索クエリを定義する

1. CI エクスプローラーでの検索と同じロジックを使用して検索クエリを作成します。
2. CI パイプラインイベントのレベルを選択します。
    * **Pipeline**: 通常、1 つ以上のジョブで構成されるパイプライン全体の実行を評価します。
    * **Stage**: 1 つ以上のジョブのグループをサポートする CI プロバイダーでの実行を評価します。
    * **Job**: コマンド群の実行を評価します。
    * **Command**: ジョブで実行される個々のコマンドである、手動でインスツルメントされた[カスタムコマンド][1]イベントを評価します。
    * **All**: あらゆる種類のイベントを評価します。
3. CI パイプラインのイベント数、ファセット、またはメジャーのモニタリングを選択します。
    * **CI Pipeline event count**: 検索バーを使用し (任意)、ファセットまたはメジャーは選択**しません**。選択されたタイムフレームで Datadog が CI パイプラインイベント数を評価し、それをしきい値の条件と比較します。
    * **Dimension**: ディメンション (質的ファセット) を選択し、そのファセットの `Unique value count` に対してアラートを表示します。
    * **Measure**: CI Pipeline メジャーの数値に対してアラートを出すためのメジャー (定量ファセット) を選択します (メトリクスモニターに似ています)。集計方法 (`min`、`avg`、`sum`、`median`、`pc75`、`pc90`、`pc95`、`pc98`、`pc99`、または `max`) を選択します。
4. 複数のディメンションで CI パイプラインイベントをグループ化する (オプション):
    * クエリに一致するすべての CI パイプラインイベントは、最大 4 つのファセットの値に基づいてグループに集約されます。
5. アラート設定のグループ化方法を構成します（任意）:
   * クエリに `group by` が含まれる場合、グループパラメーターに従い、複数のアラートを各ソースに適用します。アラートイベントは、設定された条件を満たすと各グループに生成されます。たとえば、クエリを `@ci.pipeline.name` でグループ化すると、エラーの数が多い場合に CI パイプラインごとに個別のアラートを受信することができます。

{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query.png" alt="テスト名でグループ化されるよう設定される CI Status:Error のクエリ" style="width:100%;" >}}

#### 数式と関数の使用

数式と関数を使用して CI パイプラインを作成できます。これは、たとえばパイプラインの失敗率(エラー率）など、イベントの発生**率**のモニターを作成する場合に使用できます。

次の例は、`ci.pipeline.name` (パイプラインごとに 1 回アラートする) でグループ化された "全パイプラインイベント数” (フィルターなし) に対する "失敗パイプラインイベント数” (`ci.status=error`) の割合を計算する式を使ったパイプラインエラー率モニターの例です。詳しくは、[関数の概要][2]を参照してください。
{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query-fnf.png" alt="モニターは、ステップ a、b、c で定義され、ステップ a と b はクエリし、ステップ c はそれらからレートを計算します。" style="width:1000%;" >}}

<div class="alert alert-info"><strong>注</strong>: 各モニターに評価数式の構築には、最大 2 つのクエリまで使用できます。</div>

[1]: /ja/continuous_integration/pipelines/custom_commands/
[2]: /ja/dashboards/functions/#overview
{{% /tab %}}
{{% tab "Tests" %}}

### 検索クエリを定義する

1. 共通モニタータイプ: (オプション) **New Flaky Test**、**Test Failures**、**Test Performance** 共通モニタータイプごとにテンプレートクエリを提供し、カスタマイズすることが可能です。この機能の詳細については、[新しい不安定なテストの追跡](#track-new-flaky-tests)を参照してください。
2. CI Test エクスプローラーの検索と同じロジックで検索クエリを作成します。たとえば、`myapp` というテストサービスの `main` ブランチに対して失敗したテストを検索するには、クエリ `@test.status:fail @git.branch:main @test.service:myapp` を使用します。
3. CI Test のイベント数、ファセット、またはメジャーのモニタリングを選択します。
    * **CI Test event count**: 検索バーを使用し (任意)、ファセットまたはメジャーは選択**しません**。選択されたタイムフレームで Datadog が CI パイプラインテストイベント数を評価し、それをしきい値の条件と比較します。
    * **Dimension**: ディメンション (質的ファセット) を選択し、そのファセットの `Unique value count` に対してアラートを表示します。
    * **Measure**: CI Pipeline ファセットの数値に対してアラートを出すためのメジャー (定量ファセット) を選択します (メトリクスモニターに似ています)。集計方法 (`min`、`avg`、`sum`、`median`、`pc75`、`pc90`、`pc95`、`pc98`、`pc99`、または `max`) を選択します。
4. 複数のディメンションで CI Test イベントをグループ化する (オプション):
    * クエリに一致するすべての CI Test イベントは、最大 4 つのファセットの値に基づいてグループに集約されます。
5. アラート設定のグループ化方法を構成します（任意）:
    * クエリに `group by` がある場合、グループパラメーターにしたがって、すべてのソースに対してアラートが送信されます。設定された条件を満たす各グループに対してアラートイベントが生成されます。例えば、クエリを `@test.full_name` でグループ化し、エラー数が多い場合に CI Test フルネーム毎に個別のアラートを受信することができます。テストのフルネームはテストスイートとテスト名の組み合わせで、例えば `MySuite.myTest` のようなものです。Swift では、テストのフルネームはテストバンドルとスイートと名前の組み合わせで、例えば `MyBundle.MySuite.myTest` のような名前になります。

{{< img src="monitors/monitor_types/ci_tests/define-the-search-query.png" alt="パイプライン名でグループ化されるよう設定される CI Status:Error のクエリ" style="width:100%;" >}}

#### 異なるパラメーターや構成でのテスト実行
同じテストのフルネームで、異なるテストパラメーターや構成のテストがある場合、モニターの `group by` で `@test.fingerprint` を使用します。こうすることで、特定のパラメーターや構成でテストを実行した場合に警告を発することができます。`@test.fingerprint` を使用すると、**Commit Overview** ページにある Test Stats, Failed and Flaky Tests セクションと同じ粒度レベルが提供されます。

例えば、同じフルネームのテストが Chrome では失敗し、Firefoxでは合格した場合、フィンガープリントを使用すると、Chrome のテスト実行時にのみアラートが発生します。

この場合、`@test.full_name` を使用すると、Firefox 上でテストに合格していても、警告が表示されます。

#### 数式と関数

数式と関数を使用して CI Test を作成できます。たとえば、これはテストの失敗率 (エラー率) など、イベントの発生**率**のモニターを作成する場合に使用できます。

以下は、テストエラー率モニターの例です。「テストイベント総数」(フィルターなし) に対する「失敗したテストイベント」(`@test.status:fail`) の割合を計算する数式を使用し、`@test.full_name` でグループ化 (テストごとにアラート) されています。詳しくは、[関数の概要][1]をご覧ください。

{{< img src="monitors/monitor_types/ci_tests/define-the-search-query-fnf.png" alt="ステップ a、b、c で定義されたモニター。ステップ a および b はクエリで、ステップ c はそこから割合を算出します。" style="width:100%;" >}}

#### CODEOWNERS を利用した通知

テストイベントで利用可能な `CODEOWNERS` の情報を使って、異なるチームに通知を送信することができます。

以下の例では、次のロジックで通知を構成しています。
* もしテストコードのオーナーが `MyOrg/my-team` ならば、`my-team-channel` Slack チャンネルに通知を送ります。
* もしテストコードのオーナーが `MyOrg/my-other-team` ならば、`my-other-team-channel` Slack チャンネルに通知を送ります。

{{< code-block lang="text" >}}
{{#is_match "citest.attributes.test.codeowners" "MyOrg/my-team"}}
  @slack-my-team-channel
{{/is_match}}
{{#is_match "citest.attributes.test.codeowners" "MyOrg/my-other-team"}}
  @slack-my-other-team-channel
{{/is_match}}
{{< /code-block >}}

モニターの `Notification message` セクションに、上記のコードスニペットのようなテキストを追加して、モニター通知の設定をします。`is_match` 句は必要なだけ追加することができます。Notification 変数については、[条件付き変数の監視][2]を参照してください

[1]: /ja/dashboards/functions/#overview
[2]: /ja/monitors/notify/variables/?tab=is_match#conditional-variables
{{% /tab %}}
{{< /tabs >}}
### アラートの条件を設定する

* メトリクスが `above`、`above or equal to`、`below`、`below or equal to` の場合にトリガーされる
* 過去 `5 minutes`、`15 minutes`、`1 hour` の間のしきい値、または `custom` に `1 minute` ～ `2 days` の値を設定します。
* アラートのしきい値 `<数値>`
* 警告のしきい値 `<数値>`

#### 高度なアラート条件

高度なアラートオプション (評価遅延など) の詳細な手順については、[モニターコンフィギュレーション][3]ページを参照してください。

### 通知

**Say what's happening** と **Notify your team** のセクションに関する詳しい説明は、[通知][4]のページを参照してください。

#### ログのサンプルと違反値トップリスト

CI テストまたはパイプラインモニターがトリガーされると、サンプルまたは値が通知メッセージに追加されます。

| モニター設定                    | 通知メッセージに追加可能な値 |
|----------------------------------|--------------------------------------|
| グループ化されていない Simple-Alert 数     | 最大 10 個のサンプル。                    |
| グループ化された Simple-Alert 数       | 最大 10 個のファセット値またはメジャー値。    |
| グループ化された Multi-Alert 数        | 最大 10 個のサンプル。                    |
| グループ化されていない Simple-Alert メジャー   | 最大 10 個のサンプル。                    |
| グループ化された Simple-Alert メジャー     | 最大 10 個のファセット値またはメジャー値。    |
| グループ化された Multi-Alert メジャー        | 最大 10 個のファセット値またはメジャー値。    |

これらの通知の送信に、Slack、Jira、webhooks、Microsoft Teams、Pagerduty、電子メールを使用することができます。**注**: サンプルはリカバリ通知には表示されません。

サンプルを無効にするには、**Say what's happening** セクションの一番下にあるチェックボックスをオフにします。チェックボックスの隣に表示されるテキストは、モニターのグループ化によって変わります（上記を参照）。

#### サンプル例

アラート通知に CI テスト 10 サンプルのテーブルを含めます。
{{< img src="monitors/monitor_types/ci_tests/10_ci_tests_samples.png" alt="CI テストサンプルトップ 10" style="width:60%;" >}}

アラート通知に CI パイプライン 10 サンプルのテーブルを含めます。
{{< img src="monitors/monitor_types/ci_pipelines/10_ci_pipelines_samples.png" alt="CI Pipeline サンプルトップ 10" style="width:60%;" >}}

#### データがない時の通知行動

評価クエリにイベントカウントを使用するモニターは、指定された評価期間の後にデータがなく解決され、通知をトリガーします。例えば、5 分の評価ウィンドウでパイプラインエラーの数にアラートするように構成されたモニターは、パイプラインの実行がない 5 分後に自動的に解決されます。

代替案として、Datadog はレートフォーミュラの使用を推奨しています。例えば、パイプラインの失敗数 (カウント) のモニターを使う代わりに、`(パイプラインの失敗数)/(全パイプライン実行数)` のようなパイプライン失敗の割合 (式) のモニターを使います。この場合、データがないときには分母の `(全パイプライン実行数)` は `0` となり、割り算 `x/0` は評価できません。モニターは `0` に評価する代わりに、以前の既知の状態を維持します。

この方法では、パイプラインの故障が多発してエラーレートがモニターのしきい値を超えたためにモニターがトリガーされた場合、エラーレートがしきい値を下回るまでクリアされません (その後、いつでもクリアできます)。

## モニター例
一般的なモニターの使用例を以下に示します。モニタークエリは、特定のブランチ、作成者、その他のアプリ内のファセットに対してフィルターをかけるように変更することができます。

### パフォーマンス低下のアラートをトリガーする
`duration` メトリクスは、パイプラインやテストのパフォーマンス低下を特定するために使うことができます。このメトリクスでアラートを出すことで、コードベースへのパフォーマンス後退を防ぐことができます。

{{< img src="ci/regression_monitor.png" alt="CI パイプラインの低下モニター" style="width:100%;">}}

### 新しい不安定なテストを追跡する
テストモニターには、`New Flaky Test`、`Test Failures`、`Test Performance` という共通のモニタータイプがあり、簡単にモニターを設定することができます。このモニターは、新しい不安定なテストがコードベースに追加されたときにアラートを送信します。クエリは `Test Full Name` によってグループ化されているので、同じ新しい不安定なテストに対して何度もアラートが送られることはありません。

テスト実行が何度か再試行された後、同じコミット内で不安定性が発生した場合、`flaky` とマークされます。もし複数回不安定性が発生した場合 (複数のリトライが実行されたため)、`is_flaky` タグは不安定として検出された最初のテストランに追加されます。

同じブランチやデフォルトブランチ内でそのテストが不安定であると検出されていない場合、そのテスト実行は `new flaky` としてマークされます。新しい不安定として検出された最初のテスト実行だけが、(再試行の回数に関係なく) `is_new_flaky` タグでマークされます。

不安定テストについては、[不安定テスト管理ガイド][6]を参照してください。

{{< img src="ci/flaky_test_monitor.png" alt="CI の不安定なテストモニター" style="width:100%;">}}

### コードカバレッジ率の維持
コードカバレッジ率などの[カスタムメトリクス][5]を作成し、モニター内で使用することができます。以下のモニターは、コードカバレッジが一定の割合以下になるとアラートを送信し、長期間にわたってテストのパフォーマンスを維持するのに役立ちます。

{{< img src="ci/codecoveragepct_monitor_light.png" alt="CI の不安定なテストモニター" style="width:100%;">}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/continuous_integration/
[2]: https://app.datadoghq.com/monitors/create/ci-pipelines
[3]: /ja/monitors/configuration/#advanced-alert-conditions
[4]: /ja/monitors/notify/
[5]: https://docs.datadoghq.com/ja/continuous_integration/pipelines/custom_tags_and_metrics/?tab=linux
[6]: https://docs.datadoghq.com/ja/continuous_integration/guides/flaky_test_management/