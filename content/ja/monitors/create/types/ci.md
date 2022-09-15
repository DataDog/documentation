---
aliases:
- /ja/monitors/monitor_types/ci_pipelines/
- /ja/monitors/create/types/ci_pipelines/
further_reading:
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/notify/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/manage/status/
  tag: ドキュメント
  text: モニターステータスを確認
kind: documentation
title: CI モニター
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

<div class="alert alert-info">CI モニターはアルファバージョンです。
</div>

## 概要

[CI Visibility を有効にする][1]と、CI Pipeline または CI Test モニターを作成することができます。

CI モニターでは、CI データを視覚化し、それに対するアラートを設定することができます。例えば、CI Pipeline モニターを作成し、パイプラインやジョブが失敗した場合のアラートを受信します。CI Test モニターを作成し、失敗したテストや遅いテストに関するアラートを受信します。

## モニターの作成

Datadog で [CI モニター][2]を作成するには、メインナビゲーションで *Monitors -> New Monitor --> CI* の順に進みます。

<div class="alert alert-info"><strong>注</strong>: アカウント当たり上限 1000 件の CI モニターがデフォルトで設定されています。この制限を解除するには、<a href="/help/">サポートまでお問い合わせ</a>ください。</div>


{{< tabs >}}
{{% tab "Pipelines" %}}

CI Pipeline モニターを作成するには
### 検索クエリを定義する

1. CI エクスプローラーでの検索と同じロジックを使用して検索クエリを作成します。
2. CI パイプラインイベントのレベルを選択します。
    * **Monitor over the `Pipeline` level**:: `Pipeline` レベルを選択すると、パイプラインイベントのみがモニターに含まれ評価されます（通常 1 つ以上のジョブからなるパイプライン全体の実行を表します）。
    * **Monitor over the `Stage` level**: `Stage` レベルを選択すると、ステージイベントのみがモニターに含まれ評価されます（サポートされる CI プロバイダーの 1 つ以上のジョブからなるグループの実行を表します）。
    * **Monitor over the `Job` level**: `Job` レベルを選択すると、ジョブイベントのみがモニターに含まれ評価されます（コマンドグループの実行を表します）。
    * **Monitor over the `Command` level**: `Command` レベルを選択すると、手動でインスツルメントされた[カスタムコマンド][1]イベントのみがモニターに含まれ評価されます（個別のコマンドのジョブでの実行を表します）。
    * **Monitor over all levels**: `All` レベルを選択すると、すべてのタイプのイベントがモニターに含まれ評価されます。

3. CI パイプラインのイベント数、ファセット、またはメジャーのモニタリングを選択します。
    * **Monitor over a CI Pipeline event count**: 検索バーを使用し (任意)、ファセットまたはメジャーは選択**しません**。選択されたタイムフレームで Datadog が CI パイプラインイベント数を評価し、それをしきい値の条件と比較します。
    * **Monitor over a dimension**: ディメンション（定性的ファセット）が選択されていると、モニターはファセットの `Unique value count` に対してアラートを作成します。
    * **Monitor over a measure**: メジャー (定性的ファセット) が選択されている場合、モニターは (メトリクスモニターと同様に) CI パイプラインファセットの数値に対してアラートを出します。また、集計を選択する必要があります（`min`、`avg`、 `sum`、`median`、`pc75`、`pc90`、`pc95`、`pc98`、`pc99`、または `max`）。
4. 複数のディメンションで CI パイプラインイベントをグループ化する (オプション):
   クエリに一致するすべての CI パイプラインイベントは、最大 4 つのファセットの値に基づいてグループに集約されます。
5. アラート設定のグループ化方法を構成します（任意）:
   * クエリに `group by` が含まれる場合、グループパラメーターに従い、複数のアラートを各ソースに適用します。アラートイベントは、設定された条件を満たすと各グループに生成されます。たとえば、クエリを `@ci.pipeline.name` でグループ化すると、エラーの数が多い場合に CI パイプラインごとに個別のアラートを受信することができます。

{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query.png" alt="パイプライン名でグループ化されるよう設定される CI Status:Error のクエリ" style="width:80%;" >}}

#### 数式と関数の使用

数式と関数を使用して CI パイプラインを作成できます。これは、たとえばパイプラインの失敗率(エラー率）など、イベントの発生**率**のモニターを作成する場合に使用できます。

以下は、パイプラインエラー率モニターの例です。「パイプラインイベント総数」(フィルターなし) に対する「失敗したパイプラインイベント」(`ci.status=error`) の割合を計算する数式を使用し、`ci.pipeline.name` でグループ化 (パイプラインごとにアラート) されています。

{{< img src="monitors/monitor_types/ci_pipelines/define-the-search-query-fnf.png" alt="ステップ a、b、c で定義されたモニター。ステップ a および b はクエリで、ステップ c はそこから割合を算出します。" style="width:80%;" >}}

<div class="alert alert-info"><strong>注</strong>: 各モニターに評価数式の構築には、最大 2 つのクエリまで使用できます。</div>

[1]: /ja/continuous_integration/setup_pipelines/custom_commands/
{{% /tab %}}
{{% tab "Tests" %}}

CI Test モニターを作成するには
### 検索クエリを定義する

1. CI Test エクスプローラーの検索と同じロジックで検索クエリを作成します。たとえば、`myapp` というテストサービスの `main` ブランチに対して失敗したテストを検索するには、クエリ `@test.status:fail @git.branch:main @test.service:myapp` を使用します。
2. CI Test のイベント数、ファセット、またはメジャーのモニタリングを選択します。
    * **Monitor over a CI Test event count**: 検索バーを使用し (任意)、ファセットまたはメジャーは選択**しません**。選択されたタイムフレームで Datadog が CI Test イベント数を評価し、それをしきい値の条件と比較します。
    * **Monitor over a dimension**: ディメンション（定性的ファセット）が選択されていると、モニターはファセットの `Unique value count` に対してアラートを作成します。
    * **Monitor over a measure**: メジャー (定性的ファセット) が選択されている場合、モニターは (メトリクスモニターと同様に) CI Test ファセットの数値に対してアラートを出します。また、集計を選択する必要があります（`min`、`avg`、 `sum`、`median`、`pc75`、`pc90`、`pc95`、`pc98`、`pc99`、または `max`）。

3. 複数のディメンションで CI Test イベントをグループ化する (オプション):
   クエリに一致するすべての CI Test イベントは、最大 4 つのファセットの値に基づいてグループに集約されます。
4. アラート設定のグループ化方法を構成します（任意）:
   * クエリに `group by` がある場合、グループパラメーターにしたがって、すべてのソースに対してアラートが送信されます。設定された条件を満たす各グループに対してアラートイベントが生成されます。例えば、クエリを `@test.full_name` でグループ化し、エラー数が多い場合に CI Test フルネーム毎に個別のアラートを受信することができます。テストのフルネームはテストスイートとテスト名の組み合わせで、例えば `MySuite.myTest` のようなものです。Swift では、テストのフルネームはテストバンドルとスイートと名前の組み合わせで、例えば `MyBundle.MySuite.myTest` のような名前になります。

{{< img src="monitors/monitor_types/ci_tests/define-the-search-query.png" alt="パイプライン名でグループ化されるよう設定される CI Status:Error のクエリ" style="width:80%;" >}}

#### 異なるパラメーターや構成でのテスト実行
同じテストのフルネームで、異なるテストパラメーターや構成でテストを実行する場合、モニターのグループ分けで `@test.fingerprint` を使用することを推奨します。こうすることで、特定のパラメーターや構成でテストを実行した場合に警告を発することができます。`@test.fingerprint` を使用すると、**Commit Overview** ページにある Test Stats, Failed and Flaky Tests セクションと同じ粒度レベルが提供されます。

例えば、同じフルネームのテストが Chrome では失敗し、Firefoxでは合格した場合、フィンガープリントを使用すると、Chrome のテスト実行時にのみアラートが発生します。

この場合、`@test.full_name` を使用すると、Firefox 上でテストに合格していても、警告が表示されます。

#### 数式と関数

数式と関数を使用して CI Test を作成できます。たとえば、これはテストの失敗率 (エラー率) など、イベントの発生**率**のモニターを作成する場合に使用できます。

以下は、テストエラー率モニターの例です。「テストイベント総数」(フィルターなし) に対する「失敗したテストイベント」(`@test.status:fail`) の割合を計算する数式を使用し、`@test.full_name` でグループ化 (テストごとにアラート) されています。

{{< img src="monitors/monitor_types/ci_tests/define-the-search-query-fnf.png" alt="ステップ a、b、c で定義されたモニター。ステップ a および b はクエリで、ステップ c はそこから割合を算出します。" style="width:80%;" >}}

<div class="alert alert-info"><strong>注</strong>: 各モニターに評価数式の構築には、最大 2 つのクエリまで使用できます。</div>

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

モニターの `Notification message` セクションに、上記のコードスニペットのようなテキストを追加して、モニター通知の設定をします。`is_match` 句は必要なだけ追加することができます。

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

#### データがない時の通知行動

イベント数を使用するモニター、またはその評価クエリのための数式は、データなしの指定された評価期間後に解決し、通知をトリガーします。たとえば、5 分間の評価枠のあるパイプラインエラー率にアラートを作成する数式を使用したモニターは、データがない場合 5 分後に自動的に解決します。

通常、CI パイプラインデータは疎であり、データなしの期間が比較的長いため、希望しない場合にもモニターリカバリ通知を発生することがあります。

このような場合、Datadog ではメッセージ全体を `{{#is_alert}}` および `{{/is_alert}}` の指示で囲み、アラートのみをトリガーするようモニターの通知を構成することをおすすめします。

```text
{{#is_alert}}
この通知はモニターアラートのみに送信されます！
{{/is_alert}}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/continuous_integration/
[2]: https://app.datadoghq.com/monitors/create/ci-pipelines
[3]: /ja/monitors/create/configuration/#advanced-alert-conditions
[4]: /ja/monitors/notify/