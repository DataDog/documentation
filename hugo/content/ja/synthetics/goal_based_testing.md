---
description: プロンプトベースの非決定的なエージェント型 Synthetic テストを使用して、ユーザーがアプリケーションで目標を達成できることを確認します。
further_reading:
- link: /synthetics/bits_testing/
  tag: ドキュメント
  text: Bits Testing
- link: /synthetics/browser_tests/
  tag: ドキュメント
  text: ブラウザテスト
- link: /synthetics/test_suites/
  tag: ドキュメント
  text: テストスイート
- link: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products
  tag: 料金体系
  text: Synthetic Monitoring の料金体系
private: true
title: Goal-Based Testing
---
{{< beta-callout url="https://www.datadoghq.com/product-preview/bits-testing/" >}}
Goal-Based Testing はプレビュー版です。待機リストへの参加をリクエストします。
{{< /beta-callout >}}

## 概要 {#overview}

Goal-Based Testing は、プロンプトベースの非決定的なエージェント型テストを使用して、ユーザーがアプリケーションで特定の目標を達成できるかを確認する Synthetic テストの一種です。AI 機能のテストや、継続的なテストメンテナンスを必要としない重要なユーザージャーニーの検証に適しています。

ブラウザテストとは異なり、ゴールベーステストは固定された記録済みのステップに従いません。その代わり、エージェントがアプリケーションを探索し、記述した目標に向かって複数の経路を試します。

## ゴールベーステストを作成 {#create-a-goal-based-test}

ゴールベーステストは、以下の 2 つの方法で作成できます。

- [Bits Testing][1] で、ジャーニーのテストスイートの一部として自動生成します。
- {{< ui >}}New Test{{< /ui >}}をクリックし、[Goal-Based test] を選択して手動で作成します。

{{< img src="synthetics/goal_based_testing/goal_based_test_type_selection.png" alt="[New Synthetics Test] ダイアログで [Goal-Based Test] を選択した状態" style="width:50%;" >}}

ゴールベーステストを手動で作成する際は、以下を指定します。

- テスト対象アプリケーションの **開始 URL**。
- 平易な言葉でプロンプトとして記述する**ゴール** (例:「サポートチャットボットに製品の推奨を尋ねる」)。
- テストを実行する**場所**。[サポートされている場所](#supported-locations)を参照してください。
- オプションで、ログイン認証情報などの変数を再利用するための [Agent プロファイル][2]。

{{< img src="synthetics/goal_based_testing/goal_based_test_creation.png" alt="[New Goal-Based Test] パネルに開始 URL とゴールの入力フィールドを表示" style="width:60%;" >}}

### サポートされている場所 {#supported-locations}

ゴールベーステストは、[Bits Testing の実行][4]に記載されている Datadog 管理下の場所からのみ実行されます。

料金体系については、[Bits Testing の課金][3]を参照してください。

## Goal-Based Testing の実行評価方法 {#how-goal-based-testing-evaluates-a-run}

ゴールベーステストを開始すると、Agent は開始 URL からアプリケーションを探索し、ユーザーがゴールに向かって進む可能性のあるさまざまなパスに分岐します。

実行が終了すると、探索した分岐のいずれかがゴールに到達していれば、テストは **Pass** という結果を報告します。どの分岐もゴールに到達しなかった場合、または Agent がエラーに遭遇した場合は、**Fail** という結果を報告します。結果に加えて、Goal-Based Testing には以下が表示されます。

- Pass または Fail の結果に至った根拠を説明する概要。
- Agent が実行したアクションをステップごとにナビゲートでき、Agent が何を試みたかを正確に確認できます。

{{< img src="synthetics/goal_based_testing/goal_based_test_run_result.png" alt="探索したパス、失敗の根拠、および最終スクリーンショットを示す、Fail となったゴールベーステストの実行結果" style="width:100%;" >}}

## テストのスケジュール設定と編集 {#schedule-and-edit-a-test}

最初の実行が完了したら、{{< ui >}}Edit test{{< /ui >}} アイコンをクリックして以下の操作を行います。

- テストを定期的に実行するようスケジュールします。
- テスト名を編集します。
- タグを追加します。
- 選択した Agent プロファイルを変更します。

{{< img src="synthetics/goal_based_testing/goal_based_test_schedule.png" alt="ゴールベーステスト作成ウィザードのスケジュール設定ステップ (繰り返し間隔のオプション)" style="width:80%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/bits_testing/
[2]: /ja/synthetics/bits_testing/#agent-profiles
[3]: /ja/synthetics/bits_testing/#billing
[4]: /ja/synthetics/bits_testing/#run-bits-testing