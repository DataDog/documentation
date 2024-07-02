---
title: Run Workflow Widget
widget_type: run_workflow
disable_toc: false
further_reading:
- link: /service_management/workflows/
  tag: Documentation
  text: Workflow Automation
---

## 概要

Run Workflow ウィジェットを使用すると、ダッシュボードから重要なタスクを自動化できます。システムの健全性に影響する問題に気づいた時点で、ダッシュボードからワークフローをトリガーします。これにより、解決までの時間が短縮され、エラーの可能性が低減されるため、システムの稼働が維持されます。

## 構成

1. **Select the workflow** の下にあるドロップダウンメニューから、ワークフローを探します。
1. ダッシュボードテンプレート変数をワークフロー入力パラメーターにマッピングします。これにより、ワークフローを実行する際に、ダッシュボードテンプレート変数の値が入力パラメーターに直接マッピングされます。
1. ウィジェットのタイトルを入力し、**Save** をクリックします。

{{< img src="service_management/workflows/trigger-from-dashboard2.png" alt="Run Workflow をクリックすると、ダッシュボードウィジェットからワークフローをトリガーすることができます。" >}}

ワークフローを実行するには
1. ダッシュボードウィジェットの **Run Workflow** をクリックします。
1. **Execution parameters** の下には、ワークフローの入力にマッピングされたテンプレート変数が自動的に入力されます。マップされていない実行パラメーターの値を入力するか、必要であれば既存の値を編集します。
1. ワークフローを実行するには、**Run** をクリックします。

## API

このウィジェットは **[Dashboards API][1]** で使用できます。[ウィジェット JSON スキーマ定義][2]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dashboards/
[2]: /dashboards/graphing_json/widget_json/