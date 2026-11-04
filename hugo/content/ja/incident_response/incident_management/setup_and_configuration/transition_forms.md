---
description: インシデント対応者がステータスの変更時に特定のフィールドに入力するよう促します。
title: トランジションフォーム
---
## 概要 {#overview}

インシデントのステータスが変更されるたびに、トランジションフォームを使用して、インシデントのフィールドに入力するよう対応者をガイドできます。これらのフォームは、インシデント対応プロセスにおいて適切なタイミングでインシデントに関する情報が収集されるようにするのに役立ちます。たとえば、インシデントが解決される前に、対応者がチームとポストモーテムのオーナーを選択することを必須とするフォームを作成できます。このフォームは、Datadog、Slack、または Microsoft Teams でインシデントを解決する際に、対応者に表示されます。

{{< img src="/incident_response/incident_management/setup_and_configuration/status_transition_form.png" alt="インシデントを「解決済み」に移行する際、必須の「Teams」および「ポストモーテムのオーナー」フィールドへの入力をユーザーに促すステータス変更フォーム" style="width:70%;" >}}

<div class="alert alert-info">トランジションフォームの必須フィールドは、人間が行ったステータスの変更にのみ適用されます。API や <a href="/incident_response/incident_management/setup_and_configuration/automations">インシデント自動化</a> を通じてトリガーされるような自動ステータス変更はブロックされません。</div>

## 前提条件 {#prerequisites}

トランジションフォームを設定するには、`Incident Settings Write` 権限が必要です。詳しくは、[Datadog ロール権限][1]を参照してください。

## トランジションフォームを構成する {#configure-a-transition-form}

1. Datadog で、**Incidents** > [**Settings**][2] に移動します。
1. **Incident Types** で、編集するインシデントタイプを展開します。
1. **Transition Forms** タブをクリックします。
1. 設定するステータスを選択してください。
1. フォームに表示するフィールドを選択してください。[プロパティフィールド][3]と[対応者ロール][4]を追加できます。すべてのフィールドを必須または任意として指定できます。
1. **Save** をクリックします。

[1]: /ja/account_management/rbac/permissions/#case-and-incident-management
[2]: https://app.datadoghq.com/incidents/settings
[3]: /ja/incident_response/incident_management/setup_and_configuration/property_fields
[4]: /ja/incident_response/incident_management/setup_and_configuration/responder_roles