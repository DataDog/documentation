---
description: ステータスの変更時にインシデント対応者が特定のフィールドに入力するよう促します。
title: 移行フォーム
---
## 概要 {#overview}

インシデントのステータスが変更されたときに、移行フォームを使用して、インシデントのフィールドに入力するよう対応者を誘導できます。これらのフォームは、インシデント対応プロセスにおいて適切なタイミングでインシデントに関する情報が収集されるようにするのに役立ちます。

{{< img src="/incident_response/incident_management/setup_and_configuration/status_transition_form.png" alt="インシデントを [Resolved] に移行する際に [Teams] と [Postmortem Owner] の必須フィールドに入力するようユーザーに促す [Status Change] フォーム" style="width:70%;" >}}

## 前提条件 {#prerequisites}

移行フォームをセットアップするには、`Incident Settings Write` 権限が必要です。詳細については、[Datadog ロールのアクセス許可][1]を参照してください。

## 移行フォームの構成{#configure-a-transition-form}

1. Datadog で、[**Incidents**] (インシデント) > [[**Settings**] (設定)][2] に移動します。
1. [**Incident Types**] (インシデントタイプ) で、編集するインシデントタイプを展開します。
1. [**Transition Forms**] (移行フォーム) タブをクリックします。
1. 構成するステータスを選択します。
1. フォームに表示するフィールドを選択します。[プロパティフィールド][3]と[対応者タイプ][4]を追加できます。いずれのフィールドも必須または任意としてマークできます。
1. [**Save**] (保存) をクリックします。

[1]: /ja/account_management/rbac/permissions/#case-and-incident-management
[2]: https://app.datadoghq.com/incidents/settings
[3]: /ja/incident_response/incident_management/setup_and_configuration/property_fields
[4]: /ja/incident_response/incident_management/setup_and_configuration/responder_types