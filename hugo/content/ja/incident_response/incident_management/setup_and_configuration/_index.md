---
aliases:
- /ja/monitors/incident_management/notification_rules
- /ja/monitors/incident_management/incident_settings
- /ja/service_management/incident_management/incident_settings/
- /ja/incident_response/incident_management/incident_settings
description: Incident Management のエクスペリエンスの構成とカスタマイズ
title: セットアップと構成
---
## 概要{#overview}

[インシデント設定][1]を使用して、組織全体の Incident Management のエクスペリエンスをカスタマイズします。これらの設定により、Incident Management の使用方法を既存のプロセスに合わせることができます。

## インシデントタイプ{#incident-types}

インシデントタイプを使用すると、インシデントのクラスごとに異なる設定を適用できます。セキュリティインシデントへの対応は、サービス停止への対応とは大きく異なる場合があります。インシデントタイプを使用すると、各対応をカスタマイズできます。

インシデントタイプを作成するには:
1. [インシデント設定][1]ページに移動します。
1. [**Add Incident Type**] (インシデントタイプの追加) をクリックします。
1. インシデントタイプの名前を指定します。
1. (オプション) 説明を追加します。

## グローバル設定{#global-settings}

| 設定     | 説明    |
| ---  | ----------- |
| Analytics Dashboard (Analytics ダッシュボード) | Incidents ホームページの [Analytics] ボタンのダッシュボードをカスタマイズします。デフォルトでは、[Analytics][1] 用のテンプレートの Incident Management Overview ダッシュボードにリンクしています。|
| Monitor Automations (モニターの自動化)| モニターがトリガーされたときに自動的にインシデントを作成するために[モニターの通知メッセージ][2]で使用できるインシデントの @- メンションを作成します。|

## インシデント対応のカスタマイズ{#customize-incident-response}

{{< whatsnext desc="次の内容について、追加のカスタマイズを設定します。">}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/information" >}}情報{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/integrations" >}}インテグレーション{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/post_incident/follow-ups" >}}フォローアップ{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/notification_rules" >}}通知ルール{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/property_fields" >}}プロパティフィールド{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/transition_forms" >}}移行フォーム{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/responder_types" >}}対応者タイプ{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/templates" >}}テンプレート{{< /nextlink >}}
    {{< nextlink href="/incident_response/incident_management/setup_and_configuration/automations" >}}自動化{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents/settings
[2]: /ja/monitors/notify/