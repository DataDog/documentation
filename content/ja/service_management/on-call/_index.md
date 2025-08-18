---
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://www.datadoghq.com/blog/datadog-on-call/
  tag: ブログ
  text: Datadog On-Call を使用して、オンコール体験をより豊かなものにする
- link: https://www.datadoghq.com/blog/on-call-paging/
  tag: ブログ
  text: 効果的なページング戦略を策定する方法
title: オンコール
---

Datadog On-Call は、モニタリング、ページング、インシデント対応を 1 つのプラットフォームに統合しています。

{{< img src="service_management/oncall/oncall_overview.png" alt="ページのルーティングの概要。モニター、インシデント、セキュリティシグナル、または API 呼び出しからページがチーム (例: 「payments-team」) に送信され、その後、(例えば優先度に基づく) ルーティングルールに送られ、エスカレーションポリシーに従って処理されます。そこからスケジュールに送られるか、または直接ユーザーに送信されます。" style="width:100%;" >}}

## 概念

- **ページ**とは、モニター、インシデント、セキュリティシグナルなど、アラートを受ける対象のことを指します。ページのステータスには `Triggered` (トリガー済み)、`Acknowledged` (確認済み)、`Resolved` (解決済み) があります。
- **チーム**は、専門知識や業務の役割に基づき、特定の種類のページを処理するために Datadog 内で構成されたグループです。
- **ルーティングルール**により、チームは特定の種類の受信イベントに対する対応を細かく調整できます。これらのルールでは、イベントのメタデータに基づき、ページの緊急度を設定し、異なるエスカレーションポリシーにページをルーティングすることができます。
- **エスカレーションポリシー**は、チーム内またはチーム間でページがどのようにエスカレーションされるかを決定します。
- **スケジュール**は、特定のチームメンバーがオンコールでページに対応するための時間帯を設定します。

## 仕組み

**チーム**は、Datadog On-Call の中心的な組織単位です。Datadog で通知がトリガーされると、**ページ**が指定されたオンコールチームに送信されます。

{{< img src="service_management/oncall/notification_page.png" alt="オンコールチームに言及する通知。" style="width:80%;" >}}

各チームは**エスカレーションポリシー**と**スケジュール**を所有しており、エスカレーションポリシーは、ページがさまざまなスケジュールに送信される方法を定義します (例: 以下のスクリーンショットの _Checkout Operations - Interrupt Handler_、_Primary_、_Secondary_)。また、各チームはページを異なるエスカレーションポリシーにルーティングするための**ルーティングルール**も構成できます。

{{< img src="service_management/oncall/escalation_policy.png" alt="エスカレーションポリシーのサンプル。" style="width:80%;" >}}

スケジュールは、チームメンバーがページに対応するために割り当てられた特定の時間を定義します。スケジュールは、異なるタイムゾーンやシフトにまたがるチームメンバーの対応可能時間を整理し、管理します。

{{< img src="service_management/oncall/schedule.png" alt="JP、EU、US の営業時間に対応する複数のレイヤーが設定されたサンプルスケジュール。" style="width:80%;" >}}

## Datadog On-Call の使用を開始する

On-Call を開始するには、[オンコールチームを編成][1]し、通知を受信できるようにすべてのチームメンバーが[オンコールプロファイル設定][2] を構成したことを確認してください。

{{< whatsnext desc="このセクションでは、次のトピックについて説明します。">}}
{{< nextlink href="/service_management/on-call/teams">}}<u>チームを編成</u>: 新しいオンコールチームを作成し、既存の Datadog チームをオンコールに追加するか、PagerDuty または Opsgenie からチームをインポートします。{{< /nextlink >}}
{{< nextlink href="/service_management/on-call/triggering_pages">}}<u>ページを送信</u>: チームに対して、モニター、インシデント、セキュリティシグナルなどを通じてページを送るか、Datadog、Slack、Microsoft Teams、または Datadog API を介して手動でページを送ります。 {{< /nextlink >}}
{{< nextlink href="/service_management/on-call/escalation_policies">}}<u>エスカレーションポリシー</u>: 異なるスケジュールにページを送信するためのステップを定義します。 {{< /nextlink >}}
{{< nextlink href="/service_management/on-call/schedules">}}<u>スケジュール</u>: チームメンバーのオンコールローテーションのスケジュールを設定します。{{< /nextlink >}}
{{< nextlink href="/service_management/on-call/profile_settings">}}<u>プロファイル設定</u>: 連絡方法や通知の優先設定を構成し、タイムリーかつ効果的にページを受け取れるようにします。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/on-call/teams
[2]: /ja/service_management/on-call/profile_settings