---
title: Integrating Monitors With Statuspage
description: Learn how to integrate Datadog monitors with Atlassian Statuspage.
further_reading:
- link: /integrations/statuspage
  tag: Documentation
  text: Learn about the Statuspage integration
- link: /synthetics/guide/synthetic-test-monitors/
  tag: Documentation
  text: Learn about Synthetic test monitors
---

## 概要

[Atlassian Statuspage][1] は、アプリケーションやサービスのアップタイムを可視化する、ステータスおよびインシデント管理ツールです。ステータスページでは、Datadog のカスタムメトリクスやイベントを表示でき、Datadog のモニター通知でシステムのステータスを更新できます。

## Datadog イベントとして Statuspage アラートを追加する

[Statuspage インテグレーション][2]を構成して、[イベントエクスプローラー][3]で Statuspage アラートを追跡することができます。

1. [インテグレーション][4]に移動し、インテグレーションの一覧から `statuspage` を探します。
2. StatusPage インテグレーションタイルを選択し、**Add New** をクリックします。
3. ステータス URL と監視したいカスタムタグを追加します (例: `https://status.datadoghq.com` または `https://datadogintegrations.statuspage.io/` と `datadog`、`test`、`test1` タグ)。各ページに最低 1 つのカスタムタグを含める必要があります。
3. **Save** アイコンをクリックします。

5 分後、[イベントエクスプローラー][5]に Statuspage からのモニターアラートが表示されることを確認します。右上の[タイムフレーム][6]を設定し、**Core** の下にあるソースのリストから **Statuspage** を選択します。

{{< img src="monitors/guide/statuspage_integration_configuration.png" alt="Datadog の Statuspage インテグレーションのセットアップ" style="width:90%;" >}}

アラートをクリックすると、イベントのメッセージ、タグ、属性を含むサイドパネルが表示されます。

{{< img src="monitors/guide/statuspage_side_panel.png" alt="イベントのソース、メッセージ、タグ、属性を含むイベントのサイドパネル" style="width:90%;" >}}

## Datadog のモニターに Statuspage アラートを追加する

### Statuspage のメールアドレスを生成する

コンポーネント固有のメールアドレスを生成するには、[Statuspage ドキュメント][7]を参照してください。

### メトリクスモニターの作成

Statuspage アラートでトリガーする[メトリクスモニター][8]を作成するには

1. [**Monitors** > **New Monitor**][9] の順に移動し、**Metric** をクリックします。
2. 検出方法の選択、メトリクスの定義、アラート条件の設定、高度なモニターオプションの構成については、[メトリクスモニターのドキュメント][8]を参照してください。
3. テストの状態に応じて、`UP` または `DOWN` を返すようにモニター名をカスタマイズします。例: `{{#is_alert}}DOWN{{/is_alert}}{{#is_recovery}}UP{{/is_recovery}}`
4. In the **Configure notifications and automations** section, add the generated email address such as `@custom-statuspage-email@notifications.statuspage.io` in the message. This automatically populates the `Notify your services and your team members` field above **Renotification**.
5. モニター通知セクションに必要事項を記入し、モニター名にサマリーを追加します。例: `Shopist Checkout Functionality`
6. モニターの再通知条件を設定し、`service:status-page` などのタグを追加します。
7. チームを選択し、モニターに優先順位を割り当てます。
8. モニターの編集権限と通知条件を定義します。
9. モニターの構成が完了したら、**Create** をクリックします。

{{< img src="monitors/guide/statuspage_alerts_metric_monitor.png" alt="Statuspage からのアラートを含むメトリクスモニターの作成" style="width:90%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.atlassian.com/software/statuspage
[2]: /integrations/statuspage
[3]: /service_management/events/explorer/
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/event/explorer
[6]: /dashboards/guide/custom_time_frames/
[7]: https://support.atlassian.com/statuspage/docs/get-started-with-email-automation/
[8]: /monitors/types/metric/
[9]: https://app.datadoghq.com/monitors/create/metric
