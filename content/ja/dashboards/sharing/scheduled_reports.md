---
aliases:
- /ja/dashboards/reporting/
- /ja/dashboards/scheduled_reports/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: ブログ
  text: Datadog のダッシュボードを誰とでも安全に共有する
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: ブログ
  text: 関連するテンプレート変数を使用してダッシュボードを調整
title: スケジュールされたレポート
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Scheduled Reports are not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## 概要

Scheduled reports enable Datadog users to share dashboards as high-density PDFs by email on a recurring basis.

{{< img src="dashboards/scheduled_reports/report_email.png" alt="Example report email with PDF attachment" style="width:90%;" >}}

The report PDF is included as an email attachment or as a link, depending on its size.

{{< img src="dashboards/scheduled_reports/report_pdf.png" alt="Example report PDF attachment" style="width:90%;" >}}

## レポートのスケジュール

Create a report from any [dashboard or timeboard][1] that has at least one [supported widget](#unsupported-widget-types).

Click the **Share** button at the top of your dashboard and select **Schedule a Report**.

{{< img src="dashboards/scheduled_reports/report_configuration_modal.png" alt="The configuration modal for an individual dashboard report, with sections to set a schedule, add recipients, and customize email. At the bottom of the modal are buttons to edit template variables, delete report, send preview, cancel, and save" style="width:90%;" >}}

### スケジュールの設定

開いた構成モーダルで、レポートのスケジュールを設定し、レポートを送信するタイミングと頻度を決定します。結果レポートに表示される時間の範囲を決定するために、時間枠を設定します。レポートの時間枠は、ダッシュボードに表示される時間枠と異なる場合があります。

### 受信者の追加

Add recipients to your report by entering their email addresses. The email associated with your Datadog account is automatically added as a recipient. You can remove yourself as a recipient by hovering over your email and clicking the **X** that appears next to it.

**Note:** Enterprise and Pro accounts can send reports to recipients outside of their organizations.

### レポートのカスタマイズ

Finally, customize the report to provide recipients with more context or a tailored view. The optional description is included in the report email body.

Click **Edit Template Variables** to modify the filters applied when the report is sent. These values do not affect the dashboard's default template variable values.

スケジュールを保存する前にレポートを確認するには、**Send Preview** をクリックします。レポートスケジュールはいつでも一時停止することができます。

## レポートの管理
A single dashboard can have multiple scheduled reports with different settings, which allows you to inform different groups of stakeholders interested in the same dashboard. To see the reports on an existing dashboard, click the **Share** button and select **Configure Reports**.

開いた構成モーダルから、既存のレポートを一時停止したり、新しいレポートを作成したりすることができます。既存のレポートの詳細を確認・編集したり、レポートを削除するには、**Edit** をクリックします。

{{< img src="dashboards/scheduled_reports/scheduled_reports_configuration_modal.png" alt="The configuration modal for scheduled reports, with two reports displayed, each showing their titles, tags, recipients, frequency, an option to toggle the report on or off, and a button to edit the report. At the bottom is a button to add a new report and a done button" style="width:90%;" >}}

## 権限

Users need the **Dashboards Report Write** [permission][2] to create and edit report schedules.
This permission can be granted by another user with the **User Access Manage** permission.

{{< img src="dashboards/scheduled_reports/permissions.png" alt="A screenshot of an individual user's permissions from within the organization settings page. The dashboards report write permission is highlighted under the dashboards section" style="width:90%;" >}}

Users with the **Org Management** permission can enable or disable the scheduled reports feature for their organization from the **Settings** tab under [Public Sharing][3] in **Organization Settings**.

{{< img src="dashboards/scheduled_reports/org_preference.png" alt="The Report Management setting under the Settings tab in Public Sharing within Organization Settings in Datadog with the setting Enabled" style="width:90%;" >}}

## Unsupported widget types

The following widget types are **not** supported and will be shown as empty in the report:
- [Iframe][4]
- [Image][5]
- [Hostmap][6]
- [Run Workflow][7]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/#get-started
[2]: /ja/account_management/rbac/permissions/
[3]: /ja/account_management/org_settings/#public-sharing
[4]: /ja/dashboards/widgets/iframe/
[5]: /ja/dashboards/widgets/image/
[6]: /ja/dashboards/widgets/hostmap/
[7]: /ja/dashboards/widgets/run_workflow/