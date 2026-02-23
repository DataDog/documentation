---
further_reading:
- link: /service_management/on-call/
  tag: ドキュメント
  text: On-Call ドキュメント
- link: /integrations/pagerduty/
  tag: ドキュメント
  text: PagerDuty インテグレーション
title: PagerDuty リソースを Datadog On-Call に移行する
---

## 概要

この移行ワークフローに沿って、PagerDuty のオン コール 体制を Datadog 側でチームごとに組み直します。既存の PagerDuty スケジュールとエスカレーション ポリシーを土台として再利用できるため、本番に反映する前に各リソースを確認し、調整するか、不要なら破棄できます。

現時点で必要な PagerDuty データだけからオン コール 設定を再構築することで、過去の遺産的な設定や不要物を Datadog に持ち込まずに済み、シンプルで運用しやすい構成からスタートできます。

## 前提条件

1. Datadog で [PagerDuty インテグレーション][1] を設定します。
1. PagerDuty の API キーがない場合は作成します。スケジュール、エスカレーション ポリシー、チームなどの PagerDuty 資産を読み取れる権限が必要です。
1. 対象ユーザーに `on_call_write` と `teams_manage` の権限があることを確認します。

## 移行手順

### 移行するチームを選択する

1. [On-Call Teams list][2] にアクセスし、**Add Team to On-Call** > **Import team from PagerDuty** を選択します。Datadog が PagerDuty からすべてのチームを読み込みます。
1. 移行するチームを選び、**Next** を選択します。プレビュー ペインに、チームのメンバーと設定が表示されます。

{{< img src="service_management/oncall/pagerduty_migration_import_team.png" alt="PagerDuty のチーム一覧を表示し、選択したチームのプレビューを示す UI" style="width:95%;" >}}

### チームとメンバーをマッピングする

1. 次のいずれかを選択します。

   - **Map with another Datadog team**: 一覧から適切な Datadog チームを選択します。

   - **Create a new team**: 画面の案内に従ってチーム名を入力します。Datadog が PagerDuty チームの構成とメンバーを基に、新しいチームを作成します。

   {{< img src="service_management/oncall/pagerduty_migration_map_users.png" alt="PagerDuty ユーザーを Datadog ユーザーにマッピングする、または新しいユーザーを招待するための UI" style="width:95%;" >}}

1. 未マップのユーザーを扱う

   Datadog はメール アドレスでユーザーを照合します。一致しなかったユーザーは、次のいずれかで対応できます。
   - Datadog に招待する (UI が招待メールを送信します)
   - すでにアクセス不要であればスキップする

1. マッピング内容が正しければ、**Import team** を選択します。

### ルーティング ルールを設定する

アラートをチームへ届ける方法を決めるため、テンプレートを選択します。

- **All alerts to escalation policy**: すべてのアラートを、指定したエスカレーション ポリシーへ転送します。
- **Business hours**: 指定した時間帯のみチームへ通知し、フォールバックとしてチャット チャンネルを利用します。
- **Alert priority**: 優先度と影響度に応じてアラートを振り分けます。
- **Start from scratch**: チームの運用に合わせて、ルーティング ルールを一からカスタマイズします。

{{< img src="service_management/oncall/pagerduty_migration_select_routing_rule_template.png" alt="ルーティング ルール テンプレート ('All alerts to escalation policy'、'Business hours'、'Alert priority' など) を表示する UI" style="width:95%;" >}}

### エスカレーション ポリシーとスケジュールを再利用する

ルーティング ルールの編集時に、作り直す代わりに既存の PagerDuty エスカレーション ポリシーとスケジュールをインポートできます。

{{< img src="service_management/oncall/pagerduty_migration_migrate_escalation_policies_and_schedules.png" alt="既存の PagerDuty エスカレーション ポリシーとスケジュールを選択する UI" style="width:95%;" >}}

インポートした設定は Datadog が自動的に適用します。ポリシーとスケジュールは、後からいつでも変更できます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/integrations/pagerduty
[2]: https://app.datadoghq.com/on-call/teams