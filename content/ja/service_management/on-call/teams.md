---
further_reading:
- link: /service_management/on-call/
  tag: ドキュメント
  text: Datadog On-Call
title: チームをオンボーディングする
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では On-Call はサポートされていません。</div>
{{< /site-region >}}

[Datadog On-Call][2] において、チームは中心的な組織単位です。ページ (通知) はチームに送信され、チームのスケジュールやエスカレーションポリシーによって、適切なチームメンバーにルーティングされます。

On-Call チームは [Datadog Teams][1] を拡張したものです。On-Call チームは [Teams][3] の概要ページに、オンコール業務を行わないチームと並んで表示されます。可能であれば既存のチームを On-Call 設定に使用することを Datadog は推奨しています。そうすることで、On-Call チームがより見つけやすくなります。

### 新規チームまたは既存チームをオンボードする

1. [**On-Call** > **Teams**][4] に移動し、**Set Up Team** を選択します。
1. 新しいチームを作成する、既存の Datadog チームを選択する、または PagerDuty や Opsgenie のチーム設定をインポートします。
  {{< tabs >}}
  {{% tab "New Team" %}}
  - **Team Name**: チーム名を入力します。組織内で一般的に使用されていない略語は避けることを推奨します。
  - **Handle**: Datadog プラットフォーム全体でチームにページを送る際に使われるハンドルです。必要に応じていつでも変更できます。
  - **Members**: チームメンバーを追加します (オンコール業務を行わないメンバーも含みます)。
  - **Description**: チームの責務について説明を記載します。例: _私たちのチームは [主たる責任] を担当し、[主要な目的や活動] を実施し、[運用時間や条件] で稼働します。_
  {{% /tab %}}
  {{% tab "Existing Team" %}}
  ドロップダウンメニューから既存の Datadog チームを選択します。
  {{% /tab %}}
  {{< /tabs >}}
1. デフォルトのエスカレーションポリシーを追加します。
   {{< img src="service_management/oncall/escalation_policy_blank.png" alt="新しいエスカレーションポリシーのセットアップ画面。3 つの提案されたスケジュールを通知する。" style="width:80%;" >}}
   - Datadog では自動的に、_Interrupt Handler_、_Primary_、_Secondary_ というスケジュールをチーム用に提案します。これらのスケジュールは次のステップで定義できます。
   - 他のチームが所有する既存のスケジュールを通知先として指定することもできます。

   詳細は[エスカレーションポリシー][5]を参照してください。
1. 前のステップで作成したスケジュールを定義する
   {{< img src="service_management/oncall/schedule_blank.png" alt="新しいスケジュールのセットアップ画面。" style="width:80%;" >}}
   - **Schedule Time Zone**: スケジュールを運用したいタイムゾーンを選択します。引き継ぎ時刻など、そのほかの設定はこの選択に従います。
   - **Schedule Rotations**: 希望するローテーションを追加します。
   詳細は[スケジュール][6]を参照してください。

### 次のステップ

モニターやインシデント、その他のリソースを設定して、On-Call チームにページ (通知) を送信するようにします。詳細は[ページを送信][7]を参照してください。

On-Call チームメンバーがそれぞれの[プロフィール設定][8]をセットアップしているか確認してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/teams/
[2]: /ja/service_management/on-call/
[3]: https://app.datadoghq.com/organization-settings/teams
[4]: https://app.datadoghq.com/on-call/
[5]: /ja/service_management/on-call/escalation_policies
[6]: /ja/service_management/on-call/schedules
[7]: /ja/service_management/on-call/pages
[8]: /ja/service_management/on-call/profile_settings