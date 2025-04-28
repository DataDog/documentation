---
further_reading:
- link: /error_tracking/regression_detection/
  tag: ドキュメント
  text: 回帰検出
title: エラートラッキングにおける Issue ステータス
---

## 概要

エラートラッキングのすべての Issue には、問題を選別・優先順位付けしたり、ノイズとして除外したりする際に役立つステータスがあります。ステータスは 4 種類あります。

- **FOR REVIEW** (レビュー対象): 新規または回帰が発生しており、対応が必要な状態
- **REVIEWED** (レビュー済み): 優先度を判断済みで、今すぐまたは後で修正すべき状態
- **IGNORED** (無視): 追加の調査や対応が不要な状態
- **RESOLVED** (解決済み): 修正され、エラーが発生しなくなった状態

すべての Issue は、まず FOR REVIEW のステータスから始まります。エラートラッキングでは、以下のケースでステータスを自動的に更新しますが、[手動でステータスを更新する](#updating-an-error-status)こともできます。また、[特定のエラーの状態変更の履歴を表示](#issue-history)することも可能です。

以下の図は、エラートラッキングにおける Issue ステータスが自動および手動でどのように更新されるかを示しています。
{{< img src="error_tracking/issue-states-diagram.png" alt="エラートラッキングの Issue ステータス" style="width:75%;" >}}

## 自動レビュー

次のいずれかの操作が行われた場合、エラートラッキングは Issue を自動的に **REVIEWED** に設定します。

- Issue がアサインされた
- Issue からケースが作成された

{{< img src="error_tracking/auto-review-actions.png" alt="エラートラッキングの自動レビューアクション" style="width:75%;" >}}

## 自動解決

直近のエラーが発生していないなど、非アクティブまたは解決済みと思われる Issue は、エラートラッキングにより自動的に **RESOLVED** に設定されます。

- Issue が最後に報告されたバージョンから 14 日以上経過しており、新しいバージョンがリリースされても同じエラーが報告されていない場合、エラートラッキングは自動的にその Issue を解決済みとしてマークします。サービスをバージョンタグ ([APM][1]、[RUM][2]、[Logs][3]) で設定すると、自動解決がサービスのバージョンを考慮するようになります。
- `version` タグが設定されていない場合、過去 14 日以内にその Issue に対する新しいエラーが報告されていない場合、エラートラッキングはその Issue を自動的に RESOLVED とマークします。

## 回帰検出による自動再オープン

詳細は[回帰検出][4]を参照してください。

## Issue ステータスの更新

Issue ステータスは、Issue が表示されるリストや詳細パネルなど、あらゆる場所で確認できます。Issue のステータスを手動で更新するには、ステータスをクリックしてドロップダウンメニューから別のステータスを選択します。

{{< img src="error_tracking/updating-issue-status.png" alt="エラートラッキング Issue のアクティビティタイムライン" style="width:100%;" >}}

## Issue の履歴
**Activity Timeline** では、Issue のアクティビティ履歴を確認できます。エラートラッキングの任意の Issue の詳細パネルで、**Activity** タブをクリックするとアクティビティタイムラインが表示されます。

{{< img src="error_tracking/issue-status-history.png" alt="エラートラッキング Issue のアクティビティタイムライン" style="width:80%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/services/deployment_tracking
[2]: /ja/real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
[3]: /ja/getting_started/tagging/unified_service_tagging/
[4]: /ja/error_tracking/regression_detection/