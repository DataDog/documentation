---
further_reading:
- link: /service_management/on-call/
  tag: ドキュメント
  text: Datadog On-Call
title: スケジュール
---

Datadog On-Call では、チームメンバーがページ (呼び出し) に対応できる特定の時間をスケジュールで定義します。スケジュールは、異なるタイムゾーンやシフトにわたるチームメンバーの対応可否を整理し、管理します。

### 概念

On-Call のスケジュールはレイヤー構造になっており、各レイヤーが週の異なる部分や特定の責任範囲をカバーします。

次の例となるスケジュールを見てみましょう:

{{< img src="service_management/oncall/schedule.png" alt="複数のレイヤー (JP、EU、US の営業時間) で構成されたサンプルスケジュール。" style="width:100%;" >}}

4 つのレイヤーがあります:
- **JP Business Hours**: DM が日本の営業時間 (UTC から見た場合の各日) を担当します。月曜日から金曜日まで毎日繰り返されます。
- **EU Business Hours**: 次に、DB がヨーロッパの営業時間を担当します。月曜日から金曜日まで毎日繰り返されます。
- **US Business Hours**: 最後に、BS がアメリカの営業時間 (UTC から見て各日の終わり) を担当します。月曜日から金曜日まで毎日繰り返されます。
- **Overrides**: 一時的なシフト調整や休日など、スケジュールの変更に対応します。詳細は[オーバーライド](#overrides)を参照してください。

**最終的なスケジュール (Final Schedule)** はすべてのレイヤーで構成されます。下にあるレイヤーほど優先され、上位レイヤーを上書きします。

### スケジュールを作成する

1. [**On-Call** > **Schedules**][1] に移動します。
1. [**+ New Schedule**][2] を選択します。
1. スケジュールの **Name** を入力し、使用する **Schedule Time Zone** とこのスケジュールを管理する **Teams** を選択します。
1. レイヤーを追加します:
   - **Starts**: スケジュールが有効になる日時です。この日時より前にはシフトは表示されません。
   - **Shift length**: 各シフトの長さ (つまり、スケジュールが繰り返される間隔) を指定します。以下のオプションがあります:
      - _One Day_ (24 時間)
      - _One Week_ (168 時間)
      - _Custom_
   - **Handoff Time**: シフトが次の担当者に切り替わる日時です。
   - **End time**: このレイヤーにおいて、これ以降のシフトがスケジュールされない日時です。
   - **Conditions**: 各シフトに適用される時間条件を設定します。たとえば、月曜から金曜の午前 9 時から午後 5 時まで、などが指定できます。
   - **Members**: On-Call の任務を実行するメンバーのリストです。リストに追加した順序でシフトを担当します。
1. **Create** を選択します。

### エスカレーションポリシーにスケジュールを参照する
特定のスケジュールの当番者にページを送信するには、そのスケジュールをエスカレーションポリシー内で参照します。エスカレーションポリシーを作成または編集するときに、エスカレーションステップの **Notify** ドロップダウンメニューから目的のスケジュールを検索して選択します。エスカレーションポリシーはページがトリガーされたときに、当番の人物にページを送信します。

### オーバーライド {#overrides}
オーバーライドは、スケジュールされた On-Call シフトに対して行われる修正のことです。一時的なシフト調整や休日などの変更に対応できます。

{{< img src="service_management/oncall/schedule_override.png" alt="スケジュールを編集するとき、シフトが選択される。ダイアログが表示され、Override ボタンがある。" style="width:100%;" >}}

シフトを完全または部分的に上書きするには、シフトを選択し、**Override** をクリックします。

#### Slack または Microsoft Teams でオーバーライドをリクエストする

On-Call のローテーションに参加していて、シフト中に席を外すことが事前にわかっている場合は、Slack または Microsoft Teams でオーバーライドをリクエストできます。`/dd override` と入力し、上書きしたい時間枠を選択して説明を追加します。これにより、チャンネルにリクエストが送信されます:

{{< img src="service_management/oncall/schedule_override_request.png" alt="Slack のメッセージ例: Datadog Staging が『@Daljeet がオーバーライドをリクエストしました: スケジュール [Primary] Payments & Transactions (payments-transactions)。開始: 今日13時、終了: 今日15時、所要時間2時間。メモ: Doctor's appointment. Will offer cookies for override.』と表示。末尾に 'Take it' ボタンがある。" style="width:80%;" >}}

ほかのチャンネルメンバーは **Take it** を選択することで、あなたのシフトをオーバーライドするよう自分のシフトに組み込めます。

### スケジュールをエクスポートする

Export Shifts 機能を使うと、`.webcal` リンクを利用してお好みのカレンダーアプリ (たとえば Google カレンダー、Apple カレンダー、Outlook など) に On-Call スケジュールを統合できます。**自分のシフトのみ**を同期するか、**スケジュール全体**を同期するかを選択できます。

---

##### 📆 *自分のシフト*をエクスポートする

1. [**On-Call** > **Schedules**][1] セクションに移動します。
2. **Export My Shifts** を選択します。個人用の `.webcal` リンクが自動的に生成されます。
3. **Copy Link** をクリックします。
4. 生成されたリンクをカレンダーアプリに貼り付けます。例:
    - **Google カレンダー**: [リンクを使用して公開カレンダーを追加する][3]
    - **Outlook**: [インターネットカレンダーを購読する][4]
    - **Apple カレンダー**: [Mac または iPhone で購読する][5]

On-Call シフトに変更があった場合、カレンダーは自動的に更新されます。以前共有したリンクへのアクセスを無効にしたい場合は新しいリンクを生成してください。前のリンクは無効化されます。

---

##### 🌐 *スケジュール全体*をエクスポートする

1. [**On-Call** > **Schedules**][1] セクションに移動します。
2. エクスポートしたいスケジュールを開きます。
3. **Export Schedule** を選択します。これにより、全参加者とシフトを含むスケジュール全体用の `.webcal` リンクが生成されます。
4. **Copy Link** をクリックします。
5. 生成されたリンクをカレンダーアプリに貼り付けます:
    - **Google カレンダー**: [リンクを使用して公開カレンダーを追加する][3]
    - **Outlook**: [インターネットカレンダーを購読する][4]
    - **Apple カレンダー**: [Mac または iPhone で購読する][5]

---

##### 🔔 通知を受け取る

カレンダーアプリで、これから始まるシフトのリマインダーを有効にできます。また、[Datadog On-Call のプロフィール設定][6]で、SMS やプッシュ通知、メールによるカスタムシフト通知を設定できます。


#### スケジュールエクスポートのトラブルシューティング

Google カレンダーに On-Call のスケジュールフィードをエクスポートする際 (「URL を取得できませんでした」など) や、Outlook でのエラー (「カレンダーをインポートできません。再試行してください」など) が発生する場合、URL で初期購読を行う際に以下の対処を試してください:

- URL の先頭を `webcal://` から `http://` または `https://` に変更します。たとえば、`webcal://<your_personal_link>` を `http://<your_personal_link>` に変更します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/schedules
[2]: https://app.datadoghq.com/on-call/schedules/create
[3]: https://support.google.com/calendar/answer/37100?hl=en&co=GENIE.Platform%3DDesktop
[4]: https://support.microsoft.com/en-us/office/import-or-subscribe-to-a-calendar-in-outlook-com-or-outlook-on-the-web-cff1429c-5af6-41ec-a5b4-74f2c278e98c
[5]: https://support.apple.com/en-us/102301
[6]: /ja/service_management/on-call/profile_settings/