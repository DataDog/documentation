---
description: 回帰検知によって解決済みのエラーが自動で再オープンされる仕組みを学びましょう。
further_reading:
- link: /error_tracking/issue_states/
  tag: ドキュメント
  text: Issue States in Error Tracking
title: 回帰検出
---

## 概要

回帰 (regression) とは、以前に修正されたバグや問題が意図せず再出現することを指します。Datadog では、解決済みの問題は回帰検知によって自動的に再オープンされるため、情報を重複させることなく問題のコンテキストをすべて確認できます。

## Automatic re-opening through regression detection

**RESOLVED** 状態のエラーがコードの新しいバージョンで再発した場合、またはバージョン情報のないコードで再発生した場合、Error Tracking が回帰をトリガーします。問題は **FOR REVIEW** 状態に移動し、**Regression** タグが付与されます:

{{< img src="error_tracking/regression-detection.png" alt="Error Tracking における回帰の詳細" style="width:90%;" >}}

回帰検知では、エラーが既知のバージョンで発生しているかどうかを考慮し、問題が **RESOLVED** とマークされた後は新しいバージョンでのみトリガーされます。サービスにバージョンタグを設定 (APM、RUM、Logs の手順を参照) することで、同じエラーがサービスの新しいバージョンで発生した場合のみ自動解決されるようにできます。

バージョンタグを設定していない場合、**RESOLVED** にマークされた問題でエラーが再発すると、問題には **Regression** タグが付与されます。

回帰が発生した際に通知を受け取れるように、[モニター][4]を設定することも可能です。

## Updating the issue status

The issue status appears anywhere the issue can be viewed, such as in the issues list or on the details panel for a given issue. To manually update the status of an issue, click the status and choose a different one in the dropdown menu.

{{< img src="error_tracking/updating-issue-status.png" alt="The Activity Timeline in the Error Tracking Issue" style="width:100%;" >}}

## Issue history
View a history of your issue activity with the **Activity Timeline**. On the details panel of any Error Tracking issue, view the Activity Timeline by clicking the **Activity** tab. 

{{< img src="error_tracking/issue-status-history.png" alt="The Activity Timeline in the Error Tracking Issue" style="width:80%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/services/deployment_tracking
[2]: /ja/real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
[3]: /ja/getting_started/tagging/unified_service_tagging/
[4]: /ja/monitors/types/error_tracking/