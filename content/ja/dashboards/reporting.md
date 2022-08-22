---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: ブログ
  text: Datadog のダッシュボードを誰とでも安全に共有する
- link: https://www.datadoghq.com/blog/template-variable-associated-values/
  tag: ブログ
  text: 関連するテンプレート変数を使用してダッシュボードを調整
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: ラーニングセンター
  text: ダッシュボードをより効果的に活用する
is_public: true
kind: documentation
title: レポート
---

## 概要

レポーティングは、ダッシュボードの視覚化された要約を、スケジュールに従って選択した受信者に自動的に送信します。生成されたレポートには、ダッシュボードのウィジェットの画像がリニアな HTML フォーマットで表示されます。

{{< img src="dashboards/reporting/report_example.png" alt="Checkout KPI Report というタイトルのレポートの例で、日付、説明、ダッシュボードリンク、Datadog の組織名、ダッシュボードウィジェットの画像 3 枚が表示されています" style="width:70%;" >}}

## レポートのスケジュール

グリッドベースまたは自動レイアウトの任意のダッシュボードから新しいレポートを作成します。ダッシュボードの歯車アイコンをクリックし、**Schedule a Report** を選択します。

以下のウィジェットタイプに対応しています。

- [Change][1]
- [Distribution][2]
- [Geomap][3]
- [Group][4]
- [Heat Map][5]
- [Monitor Summary][6]
- [Notes and Links][7]
- [Query Value][8]
- [Scatter Plot][9]
- [Table][10]
- [Timeseries][11]
- [Top List][12]

### スケジュールの設定

開いた構成モーダルで、レポートのスケジュールを設定し、レポートを送信するタイミングと頻度を決定します。結果レポートに表示される時間の範囲を決定するために、時間枠を設定します。レポートの時間枠は、ダッシュボードに表示される時間枠と異なる場合があります。

### 受信者の追加

受信者のメールアドレスを入力し、レポートに受信者を追加します。Datadog アカウントに関連付けられたメールは、自動的に受信者として追加されます。自分の電子メールにカーソルを合わせて、その横に表示される **X** をクリックすると、受信者として自分を削除することができます。

**注:** Enterprise および Pro アカウントは、組織外の受信者にレポートを送信することができます。

{{< img src="dashboards/reporting/report_configuration_modal.png" alt="個々のダッシュボードレポートの構成モーダル。スケジュールを設定し、受信者を追加し、メールをカスタマイズするセクションがある。モーダルの下部には、テンプレート変数の編集、レポートの削除、プレビューの送信、キャンセル、および保存のボタンがある" style="width:100%;" >}}

### レポートのカスタマイズ

最後に、レポートをカスタマイズして、受信者により多くのコンテキストを提供したり、カスタマイズされたビューを提供することができます。オプションの説明は、各レポートの上部に表示され、ダッシュボードでより多くのコンテキストを提供します。

レポート送信時に適用されるフィルターを変更するには、**Edit Template Variables** をクリックします。これらの値は、基礎となるダッシュボードのデフォルトには影響しません。

スケジュールを保存する前にレポートを確認するには、**Send Preview** をクリックします。レポートスケジュールはいつでも一時停止することができます。

## レポートの管理
同じダッシュボードに関心を持つ異なるグループの関係者をサポートするためなどに、1 つのダッシュボードに異なる設定で複数のスケジュールレポートを設定することができます。既存のダッシュボードのレポートを確認するには、ダッシュボードの歯車メニューを開き、**Configure Reports** を選択します。

{{< img src="dashboards/reporting/dashboard_cog_menu.png" alt="ダッシュボードで歯車のアイコンにカーソルを合わせたときに表示されるメニューに、レポートを構成するオプションが表示された様子" style="width:50%;" >}}

開いた構成モーダルから、既存のレポートを一時停止したり、新しいレポートを作成したりすることができます。既存のレポートの詳細を確認・編集したり、レポートを削除するには、**Edit** をクリックします。

{{< img src="dashboards/reporting/reporting_configuration_modal.png" alt="レポート用の構成モーダル。2 つのレポートが表示され、それぞれのタイトル、タグ、受信者、頻度、レポートのオン/オフを切り替えるオプション、レポートを編集するボタンが表示されている。下部には、新しいレポートを追加するためのボタンと完了ボタンがある" style="width:100%;" >}}

## アクセス許可

レポートを作成できるのは、**Dashboard Report Write** 権限を持つユーザーのみです。この権限は、Admins ではデフォルトでオンに、その他のすべてのロールではオフに設定されています。

レポートで生成される画像は、粒度の細かい読み取り制限に関係なく、すべてのデータを表示します。レポートの権限は、データの詳細な読み取り制限を持たないユーザーに限定することをお勧めします。ユーザーに **Dashboard Report Write** 権限を付与するには、**Dashboards Report Write** 権限をオンにした新しいロールを作成し、そのユーザーをこのロールに割り当てます。または、このユーザーに **Admin** ロールを割り当ててください。ロールと権限の管理の詳細については、[アカウント管理に関するドキュメント][13]をお読みください。

{{< img src="dashboards/reporting/dashboard_permissions.png" alt="組織の設定ページ内にある個々のユーザーの権限のスクリーンショット。ダッシュボードセクションの下にあるダッシュボードレポートの書き込み権限が強調表示されている" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/widgets/change/
[2]: /ja/dashboards/widgets/distribution/
[3]: /ja/dashboards/widgets/geomap/
[4]: /ja/dashboards/widgets/group/
[5]: /ja/dashboards/widgets/heat_map/
[6]: /ja/dashboards/widgets/monitor_summary/
[7]: /ja/dashboards/widgets/note/
[8]: /ja/dashboards/widgets/query_value/
[9]: /ja/dashboards/widgets/scatter_plot/
[10]: /ja/dashboards/widgets/table/
[11]: /ja/dashboards/widgets/timeseries/
[12]: /ja/dashboards/widgets/top_list/
[13]: /ja/account_management/users/#edit-a-user-s-roles