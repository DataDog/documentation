---
description: 定義したスコープに一致する Cloud Cost Recommendations の定期的な Slack または Teams サマリーを送信する通知ルールを設定します。
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management
- link: /cloud_cost_management/recommendations/
  tag: ドキュメント
  text: Cloud Cost Recommendations
- link: /cloud_cost_management/recommendations/cost_optimization_automation/
  tag: ドキュメント
  text: コスト最適化の自動化
title: 通知
---
## 概要{#overview}

通知ルールは、定義したスコープに一致する [Cloud Cost Recommendations][1] の定期的な Slack または Teams サマリーを送信するもので、リソースに対してアクションを実行することはありません。Datadog が自動的に変更を行うように設定せずに、新しい節約の機会を可視化したい場合は、通知ルールを使用します。

通知ルールは、定期的なスケジュールで推奨事項に対して直接アクションを実行する [コスト最適化の自動化][2] とは異なります。

## 前提条件{#prerequisites}

- 通知ルールを作成または編集するための **Cloud Cost Management - Cloud Cost Management Write** 権限。
- Datadog アプリがインストールされている Slack ワークスペースまたは Teams テナント。[Slack インテグレーション][3]または[Teams インテグレーション][5]を参照してください。プライベート Slack チャンネルの場合は、送信先として選択する前に、そのチャンネルに Datadog Slack アプリを追加してください。

## 通知ルールを設定する {#set-up-a-notification-rule}

通知ルールを設定するには:

1. [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Optimize{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}][4] に移動します。
1. {{< ui >}}Notification{{< /ui >}} タブを選択します。
1. {{< ui >}}Define scope{{< /ui >}} セクションで、{{< ui >}}Team{{< /ui >}}、{{< ui >}}Recommendation Type{{< /ui >}}、および {{< ui >}}Env{{< /ui >}} フィルターを使用して、通知を一致するリソースに制限します。{{< ui >}}\+ Filter{{< /ui >}} をクリックして、フィルターを追加します。すべてのリソースを含めるには、フィルターを空のままにします。
1. {{< ui >}}Set schedule{{< /ui >}} セクションで、通知の頻度、実行日、実行時間、およびタイムゾーンを選択します。
1.  セクションで、{{< ui >}}Destination{{< /ui >}}{{< ui >}}Slack{{< /ui >}} または {{< ui >}}Microsoft Teams{{< /ui >}} を選択し、ワークスペースとチャンネル (Slack)、またはテナント、チーム、チャンネル (Teams) を選択します。
1. 通知ルールの名前を入力します。
1. (オプション) 通知メッセージで特定の Slack ユーザーにメンションします。
1. (オプション) トグル {{< ui >}}Notification enabled{{< /ui >}} をオフにすると、ルールを有効にせずに作成できます。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

## 通知ルールを管理する {#manage-notification-rules}

{{< ui >}}Notification{{< /ui >}} タブには、組織内のすべての通知ルールが一覧表示されます。このページから、次のことができます。

- ルールを削除せずにオン/オフを切り替える
- ルールのスコープ、スケジュール、送信先、または名前を編集する
- ルールを削除する

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/cloud_cost_management/recommendations/
[2]: /ja/cloud_cost_management/recommendations/cost_optimization_automation/
[3]: /ja/integrations/slack/
[4]: https://app.datadoghq.com/cost/optimize/automations
[5]: /ja/integrations/microsoft_teams/