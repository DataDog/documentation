---
further_reading:
- link: /error_tracking/regression_detection/
  tag: ドキュメント
  text: 回帰検出
title: Error Tracking における問題の状態
---
## 概要{#overview}

Error Tracking のすべての問題には、問題のトリアージや優先順位付け、ノイズの排除に役立つステータスが割り当てられています。ステータスは 5 つあります。

- {{< ui >}}FOR REVIEW{{< /ui >}}: 注意が必要な新規または回帰した問題。
- {{< ui >}}REVIEWED{{< /ui >}}: 今後修正が必要な、トリアージ済みの問題。
- {{< ui >}}RESOLVED{{< /ui >}}: 修正済みで発生しなくなった問題。
- {{< ui >}}IGNORED{{< /ui >}}: これ以上の調査や対応が不要な問題。
- {{< ui >}}EXCLUDED{{< /ui >}}: これ以上の調査が不要で、新しいエラーの収集を停止し、使用量や請求の対象から除外された問題。

すべての問題は FOR REVIEW ステータスから始まります。Error Tracking は、以下に説明するケースでステータスを自動更新します。また、[手動でステータスを更新](#updating-an-error-status)することもできます。また、特定のエラーのステータス変更の[履歴を表示](#issue-history)することもできます。

以下の図は、Error Tracking のステータスが自動および手動でどのように更新されるかを示しています。
{{< img src="error_tracking/issue-states-diagram.png" alt="Error Tracking の問題ステータス" style="width:75%;" >}}

## 自動レビュー {#automatic-review}

Error Tracking は、次のいずれかの操作が行われた場合、問題を自動的に {{< ui >}}REVIEWED{{< /ui >}} マークします。

- 問題が割り当てられた
- 問題からワークアイテムが作成された

{{< img src="error_tracking/auto-review-actions-2.png" alt="エラートラッキングの自動レビューアクション" style="width:75%;" >}}

## 自動解決 {#automatic-resolution}

直近のエラーが発生していないなどの理由で、非アクティブまたは解決済みと思われる問題は、Error Tracking により自動的に {{< ui >}}RESOLVED{{< /ui >}} マークされます。

- 問題が最後に報告されたバージョンが 14 日以上前のものであり、同じエラーを報告しない新しいバージョンがリリースされている場合、Error Tracking は自動的にその問題を解決します。自動解決でサービスのバージョンが考慮されるように、バージョンタグを使用してサービスを構成します ([APM][1]、[RUM][2]、および [Logs][3] の手順を参照)。
- `version` タグが設定されていない場合、過去 14 日以内にその問題に対する新しいエラーが報告されていなければ、Error Tracking はその問題を自動的に解決します。

**注**: 自動解決ロジックは `version` を考慮しません。

## 回帰検出による自動再オープン {#automatic-re-opening-through-regression-detection}

詳細は[回帰検出][4]を参照してください。

## 問題のステータスの更新 {#updating-the-issue-status}

問題のステータスは、問題一覧や特定の問題の詳細パネルなど、問題が表示されるあらゆる場所に表示されます。問題のステータスを手動で更新するには、ステータスをクリックし、ドロップダウンメニューから別のステータスを選択します。

{{< img src="error_tracking/updating-issue-status.png" alt="Error Tracking の問題のアクティビティタイムライン" style="width:100%;" >}}

## 問題の除外 {#excluding-an-issue}

`EXCLUDED` ステータスを使用すると、特定のエラーが追跡されないように設定でき、収集や課金対象としてのカウントを防ぐことができます。これにより、複雑な除外ルールを設定することなく、対応不要なエラーや予期された障害によって発生した問題を除外できます。

問題を除外するには、そのステータスをクリックし、ドロップダウンメニューから {{< ui >}}EXCLUDED{{< /ui >}} を選択します。除外された問題には、引き続き {{< ui >}}IGNORED{{< /ui >}} タブからアクセスできます。履歴はいつでも確認できます。

{{< img src="error_tracking/issue-states-excluded.png" alt="問題のステータスドロップダウンで除外" style="width:100%;" >}}

除外された問題のエラー収集を再開するには、{{< ui >}}EXCLUDED{{< /ui >}} 以外のステータスを選択します。


## 問題の履歴 {#issue-history}
{{< ui >}}Activity Timeline{{< /ui >}} を使用して、問題のアクティビティの履歴を表示します。Error Tracking の問題の詳細パネルで、{{< ui >}}Activity{{< /ui >}} タブをクリックしてアクティビティタイムラインを表示します。

{{< img src="error_tracking/issue-status-history-3.png" alt="Error Tracking の問題のアクティビティタイムライン" style="width:80%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/services/deployment_tracking
[2]: /ja/real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
[3]: /ja/getting_started/tagging/unified_service_tagging/
[4]: /ja/error_tracking/regression_detection/