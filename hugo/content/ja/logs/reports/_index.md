---
title: スケジュールされた CSV レポート
---
## 概要 {#overview}

スケジュールされた CSV レポートを使用すると、定期的な構造化データのエクスポートをメール、Slack、または Microsoft Teams 経由で自動的に受け取ることができます。この機能は、主要なメトリクスの定期的なスナップショットを Datadog へのログイン不要で提供して、運用、コンプライアンス、およびエグゼクティブのステークホルダーをサポートします。

## クエリを定義する {#define-a-query}

CSV レポートをスケジュールするには、クエリが以下の条件を満たしている必要があります。

* クエリが [Log Explorer][1] から作成されていること  
* クエリ結果が {{< ui >}}List{{< /ui >}} または {{< ui >}}Table{{< /ui >}} として表示されること (他の可視化タイプはサポートされていません)  
* クエリが複合条件クエリではないこと ([サブクエリ][2]を含まない)
* クエリに[計算フィールド][3]や[リファレンステーブル][4]が含まれていないこと
* CSV は 50k 行までに制限されています

## CSV レポートをスケジュールする {#schedule-a-csv-report}

1. [Log Explorer][1] で、エクスポートするクエリを実行します。
2. クエリ結果の上部にある [{{< ui >}}Download as CSV{{< /ui >}}] (CSV としてダウンロード) の横の矢印をクリックし、[{{< ui >}}Schedule CSV Report{{< /ui >}}] (CSV レポートをスケジュール) を選択します。

   <!-- TODO: recapture screenshot once the NEW badge is removed from Schedule CSV Report -->
   {{< img src="logs/reports/schedule_csv_report_menu.png" alt="[Download as CSV] の横のドロップダウンが展開され、[Copy] (コピー)、[Copy as cURL] (cURL としてコピー)、[Share event] (イベントを共有)、[Schedule CSV Report] の各オプションが表示されている Log Explorer の結果ツールバー" style="width:80%;" >}}

3. 表示された設定モーダルで、レポートの送信日時と頻度を決定するスケジュールを設定します。 
4. レポートを設定します。レポートのタイトルを定義し、結果のレポートに表示される期間を決定する時間枠を設定します。レポートの時間枠は、Log Explorer に表示されている時間枠と同じにする必要はありません。 
5. 受信者を追加します。
   1. {{< ui >}}Email recipients{{< /ui >}} (メールの受信者): レポートにメールの受信者を追加するには、メールアドレスを入力します。自分の Datadog アカウントに関連付けられているメールアドレスは自動的に受信者として追加されます。自分を受信者から削除するには、自分のメールアドレスにカーソルを合わせ、その横に表示されるゴミ箱アイコンをクリックします。 
   2. {{< ui >}}Slack recipients{{< /ui >}} (Slack の受信者): Slack の受信者を追加するには、利用可能なドロップダウンから Slack のワークスペースとチャンネルを選択します。Slack ワークスペースが表示されない場合は、Datadog [Slack インテグレーション][5]がインストールされていることを確認してください。Slack ワークスペース内のすべてのパブリックチャンネルが自動的にリスト表示されます。プライベート Slack チャンネルを選択するには、Slack で Datadog Slack ボットをそのチャンネルに招待してください。Slack にテストメッセージを送信するには、チャンネルの受信者を追加して [{{< ui >}}Send Test Message{{< /ui >}}] (テストメッセージを送信) をクリックします。
   3. {{< ui >}}Microsoft Teams recipients{{< /ui >}} (Microsoft Teams の受信者): [{{< ui >}}Microsoft Teams{{< /ui >}}] タブを選択し、利用可能なドロップダウンから [{{< ui >}}Tenant{{< /ui >}}] (テナント)、[{{< ui >}}Team{{< /ui >}}] (チーム)、および [{{< ui >}}Channel{{< /ui >}}] (チャネル) を選択します。[Microsoft Teams インテグレーション][7]が Datadog 組織にインストールされており、Datadog アプリが Microsoft Teams の対象チームに追加されていることを確認してください。テストメッセージを送信するには、チャネルの受信者を追加して [{{< ui >}}Send Test Message{{< /ui >}}] をクリックします。

## レポートの管理{#managing-reports}

CSV レポートを表示するには、[[Log Explorer]][1] に移動し、[{{< ui >}}Reports{{< /ui >}}] (レポート) タブをクリックします。

**注**: レポートは [Saved Views][6] と関連付けられておらず、[Reports] タブからのみアクセスできます。

* 独自のレポートスケジュールを作成するには、`CSV Report Schedules Write` 権限が必要です。
* 他のユーザーのレポートスケジュールを変更するには、`CSV Report Schedules Manage` 権限が必要です。

レポート作成後は、適切な権限があれば、レポートのサブスクライブ、サブスクライブ解除、スケジュールの編集、削除を行うことができます。`CSV Report Schedules Write` または `CSV Report Schedules Manage` の権限がない場合でも、メールから直接レポートのサブスクライブを解除できます。

## レポートビュー{#reports-views}

| レポートビュー                         | 説明                                                                     | 必要な権限           |
| ----------------------------------- | ------------------------------------------------------------------------------- | ----------------------------- |
| {{< ui >}}Created by you{{< /ui >}} (自分が作成) | 自分が Log Explorer から作成したすべてのスケジュール済み CSV レポートを表示します。              | `CSV Report Schedules Write`  |
| {{< ui >}}All Reports{{< /ui >}} (すべてのレポート)    | Log Explorer にある自分の組織のすべてのスケジュール済み CSV レポートを表示します。 | `CSV Report Schedules Manage` |
| {{< ui >}}Subscribed{{< /ui >}} (サブスクライブ済み)     | サブスクライブしているすべてのスケジュール済み CSV レポートを表示します。                      | `CSV Report Schedules Write`  |

[1]: https://app.datadoghq.com/logs
[2]: /ja/logs/explorer/advanced_search/#filter-logs-with-subqueries
[3]: /ja/logs/explorer/calculated_fields/
[4]: /ja/reference_tables/?tab=manualupload
[5]: /ja/integrations/slack/?tab=datadogforslack
[6]: /ja/logs/explorer/saved_views/#saved-views
[7]: /ja/integrations/microsoft_teams/