---
further_reading:
- link: /logs/workspaces/
  tag: ドキュメント
  text: Log Workspaces について詳しく知る
- link: /dashboards/guide/custom_time_frames/
  tag: ドキュメント
  text: カスタム タイム フレーム
title: Workspaces におけるタイム セレクション
---

## 概要

Log Workspaces は、特定の固定タイム レンジでの調査や分析を行うために設計されています。最新データを随時表示するローリング タイム レンジとは異なり、Workspaces では静的な期間にフォーカスすることを想定しています。そのため、Workspaces のタイム セレクションは自動では進まず、Workspace 作成時にデフォルトのタイム レンジが設定されます。これにより、ユーザーが手動で変更しない限り、調査全体を通じてデータの一貫性が保たれます。

## Workspaces における 静的 タイム セレクション

過去 15 分間などのタイム レンジを選択すると、次に手動で別のタイム レンジを選択するまで、そのレンジは固定されたままになります。たとえば 1:05 p.m. に「過去 15 分」を選択した場合、タイム レンジは 12:50 p.m.–1:05 p.m. のまま維持されます。最新のデータを表示するには、タイム レンジ セレクション ドロップダウンを開き、同じレンジまたは別のレンジを選択してください。

{{< img src="/logs/workspace/time_selection/time_selector_more.png" alt="カスタム タイム フレームを含むタイム セレクション オプション" style="width:80%;" >}}

## デフォルト タイムを設定

既定では、Workspaces は過去 15 分間のデータを表示するように設定されています。たとえば 2024 年 10 月 1 日の 3:03 p.m. に Workspace を作成した場合、デフォルトのタイム レンジは 2:48 p.m.–3:03 p.m. になります。このタイム レンジは、手動で新しいデフォルトを設定しない限り、Workspace を開くたびに使用されます。

デフォルト タイムを変更するには:

1. ドロップダウン メニューから新しいタイム フレームを選択します。
2. タイム セレクション ドロップダウンの左にある **Set Default Time** をクリックします。

{{< img src="/logs/workspace/time_selection/set_default_time.png" alt="Workspace 上部の Set Default Time オプション" style="width:90%;" >}}

この選択が、その Workspace のデフォルト タイム フレームになります。

<div class="alert alert-warning">タイム セレクションを変更しても新しいデフォルトを設定しなかった場合、次回 Workspace を開いたときに元のデフォルト タイムに戻ります。選択したタイム セレクションを保持するには、選択後に <strong>Set Default Time</strong> をクリックしてください。</div>

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}