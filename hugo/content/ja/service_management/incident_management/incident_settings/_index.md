---
aliases:
- /ja/monitors/incident_management/notification_rules
- /ja/monitors/incident_management/incident_settings
description: インシデント管理機能の設定とカスタマイズ
title: インシデント設定
---

## 概要

[Incident Settings][1] を使用して、組織全体のインシデント管理体験における各要素をカスタマイズします。これらの設定により、既存のプロセスに合わせてインシデント管理を運用できます。

## インシデントタイプ

インシデントタイプを使用すると、インシデントの種類ごとに異なる設定を適用できます。セキュリティインシデントへの対応はサービス停止への対応とは大きく異なる場合がありますが、インシデントタイプによって各対応をカスタマイズできます。

インシデントタイプを作成するには
1. [Incidents Settings][1] ページに移動します。
1. **Add Incident Type** をクリックします。
1. Incident Type Name を指定します。
1. (任意) 説明を追加します。

## グローバル設定

| 設定     | 説明    |
| ---  | ----------- |
| Analytics Dashboard | Incidents ホームページの Analytics ボタンで表示されるダッシュボードをカスタマイズします。既定では、[Analytics][1] のテンプレート「Incident Management Overview」ダッシュボードにリンクします。 |

## インシデントレスポンスのカスタマイズ

{{< whatsnext desc="以下の項目に追加のカスタマイズを設定します。" >}}
{{< nextlink href="/service_management/incident_management/incident_settings/information" >}}情報{{< /nextlink >}}
{{< nextlink href="/service_management/incident_management/incident_settings/integrations" >}}インテグレーション{{< /nextlink >}}
{{< nextlink href="/service_management/incident_management/incident_settings/notification_rules" >}}通知ルール{{< /nextlink >}}
{{< nextlink href="/service_management/incident_management/incident_settings/property_fields" >}}プロパティフィールド{{< /nextlink >}}
{{< nextlink href="/service_management/incident_management/incident_settings/responder_types" >}}対応者タイプ{{< /nextlink >}}
{{< nextlink href="/service_management/incident_management/incident_settings/templates" >}}テンプレート{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents/settings