---
aliases:
- /ja/service_management/events/correlation/maintenance_windows/
further_reading:
- link: events/correlation/
  tag: ドキュメント
  text: イベント相関について学ぶ
title: メンテナンスウィンドウ
---
## 概要{#overview}
Datadog Event Management は、計画的なシステムメンテナンス中に作業項目の通知を抑制するためのメンテナンスウィンドウをサポートしています。メンテナンス条件に合致し、かつメンテナンスウィンドウの期間内に発生した作業項目は、自動的にアーカイブされます。

## メンテナンスウィンドウを作成する{#create-a-maintenance-window}
<div class="alert alert-danger">[Work Management Shared Settings Write] (cases_shared_settings_write) 権限が必要です。詳細については、「<a href="https://docs.datadoghq.com/account_management/rbac/permissions/#case_management">Datadog のロールと権限</a>」を参照してください。</div>

[メンテナンスウィンドウ][2]を作成するには、次の手順に従います。
1. {{< ui >}}Event Management Settings{{< /ui >}} に移動します。
1. 左側のナビゲーションバーにある [**Work Item Attributes**] の横にある [{{< ui >}}Maintenance Windows{{< /ui >}}] を選択します。
1. 右上の [{{< ui >}}New Maintenance Window{{< /ui >}}] をクリックします。
1. メンテナンスウィンドウの名前を入力します。
1. タグまたは属性を使用して、このメンテナンスウィンドウの影響を受ける作業項目の条件を設定します。デフォルトでは、Event Management の作業項目は、相関付けられたアラートからタグを継承します。
1. メンテナンスウィンドウの開始日時と終了日時を選択します。
1. メンテナンスウィンドウの詳細を確認し、[{{< ui >}}Save{{< /ui >}}] をクリックします。

保存後、メンテナンスウィンドウがメンテナンスウィンドウリストに追加されます。このリストでは、詳細の確認、行を選択しての更新、または行の右側にあるゴミ箱アイコンを選択しての削除を行うことができます。

## ServiceNow の変更とメンテナンスウィンドウを同期する{#sync-maintenance-windows-with-servicenow-changes}

メンテナンスウィンドウを ServiceNow の変更と同期させ、ServiceNow の変更によって作業項目のメンテナンスウィンドウを作成、更新、または削除できるようにするには、以下を行います。
1. 「[変更リクエストを Datadog に転送する][3]」を参照し、ServiceNow の変更を取り込むための手順を実行します。
1. {{< ui >}}Event Management Settings{{< /ui >}} に移動します。
1. 左側のナビゲーションバーにある [{{< ui >}}Maintenance Windows{{< /ui >}}Work Item Attributes**] の横にある [**] を選択します。
1. 右上の [{{< ui >}}Sync from ServiceNow{{< /ui >}}] をクリックします。
1. 必要に応じて、メンテナンスウィンドウの作成、更新、または削除の対象となる ServiceNow の変更を絞り込むためのフィルターを定義します。
1. タグまたは属性を使用して、このメンテナンスウィンドウの影響を受ける作業項目の条件を設定します。属性の前に `$` を付けることで、ServiceNow の変更から値を動的に参照できます。
1. メンテナンスウィンドウの開始時刻および終了時刻として使用する、ServiceNow の変更日時フィールドを設定します。


[1]: https://docs.datadoghq.com/ja/account_management/rbac/permissions/#case_management
[2]: https://app.datadoghq.com/event/settings/maintenance-windows
[3]: https://docs.datadoghq.com/ja/integrations/servicenow/?tab=changerequesteventforwarding#forward-change-request-events-to-datadog