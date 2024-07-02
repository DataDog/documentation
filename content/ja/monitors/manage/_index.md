---
title: Manage Monitors
aliases:
    - /monitors/manage_monitor/
description: "Send notifications to your teams when monitors trigger alerts"
further_reading:
- link: /monitors/
  tag: Documentation
  text: Create monitors
- link: /monitors/notify/
  tag: Documentation
  text: Monitor Notifications
- link: "https://www.datadoghq.com/blog/tagging-best-practices-monitors/"
  tag: Blog
  text: Best practices for tagging your monitors
---

[モニターの管理][1]ページではモニターの一括検索、削除、ミュート、解決、およびモニタータグの編集が可能です。検索結果に含まれるモニターを個別に複製したり、編集することもできます。

{{< img src="monitors/manage_monitor/monitor_page.jpg" alt="モニターの管理ページ" >}}

## 検索

[モニターを検索][2]するには、左側のファセットパネルまたは上部の検索バーを使用してクエリを作成します。

## 管理

検索が完了したら、各結果の隣にあるチェックボックスを使用して更新するモニターを選択します。*STATUS* 列の見出しの隣にある一番上のチェックボックスを選択すると、すべての結果を一度に選択できます。その上で、検索結果の右上にあるボタンを使用して一括操作が可能です。

| オプション     | 説明                                                                      |
|------------|----------------------------------------------------------------------------------|
| ミュート       | 選択したモニターを `1h`、`4h`、`12h`、`1d`、`1w`、または `Forever` の間[ミュート][3]にします。 |
| ミュート解除     | 選択されたモニターがミュート状態の場合、ミュートを解除します。                                 |
| 解決    | 選択されたモニターのアラートを[解決][4]します。                                |
| 削除     | 選択したモニターを削除します。                                                    |
| タグを編集  | 選択したモニターのタグを編集します。                                 |
| チームの編集 | 選択したモニターの[チーム][5]を編集します。                                  |

個別のモニターを編集するには、該当する行にカーソルを合わせて右端にある Edit、Clone、Mute、Delete の各ボタンを選択します。モニターの詳細を表示するには、名前をクリックしてステータスページを参照します。

**注**: [Apple App Store][7] および [Google Play Store][8] で入手できる [Datadog モバイルアプリ][6]をダウンロードすると、モバイルデバイスのホーム画面からモニター保存表示を表示したり、モニターの表示やミュートを行ったりすることができます。

### トリガー構成済のモニター

[トリガー構成済のモニター][9]ページから、トリガーされたモニターを一括で[ミュート][3]または[解決][4]できます。このページにはトリガー済のステータス (Alert、Warn、No Data) にあるモニターのみが表示されます。

#### グループ結果

トリガー構成済のモニターページには、それぞれのモニターのグループ (報告元ソース) に対応する個別の行が表示されます。たとえば、ホストでグルーピングされたモニターにトリガー済のステータスを持つホストが 14 台あった場合、ページには 14 行が表示されます。このページから特定の報告元ソースに対応するモニターをミュートまたは[解決][3]することができます。

検索クエリの記述には、モニターの管理ページにあるものと同じ属性が利用可能です。トリガー構成済のページにチェックボックスとして表示されていないものも利用できます。

トリガー構成済のページにおける属性の差異:

* `status` ではなく `group_status` 属性が使用されます。
* `triggered` 属性を利用して、トリガーされている期間でモニターのフィルタリングが可能です。
* `group` 属性を使用して、複数のタグでグループ化されたモニターの検索結果を絞り込むことができます。たとえば、`host` と `env` によってグループ化されたモニターがあるとします。このモニターをタイトルで検索すると、`host:web01,env:dev`、`host:web02,env:dev`、`host:web01,env:prod`、`host:web02,env:prod` という 4 つの行が取得されます。この場合、`group` フィールドを使用すると、prod ホスト (`group:"env:prod"`) や web02 ホスト (`group:"host:web02"`) のみを表示できます。

### モニタータグ

モニタータグは Agent またはインテグレーションから送信されたタグとは別の独立したタグです。モニターに最大 80 個のタグを直接追加して、[モニターの管理][1]、[トリガー構成済のモニター][9]、[ダウンタイムの管理][10]ページのフィルタリングが可能です。モニタータグについての詳細は、[UI へのタグの割り当て][11]をご参照ください。

**注**: モニタータグは、モニターにより生成されたアラートイベントに追加されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /monitors/manage/search/
[3]: /monitors/manage/status/#mute
[4]: /monitors/manage/status/#resolve
[5]: /account_management/teams/
[6]: /service_management/mobile/#monitors
[7]: https://apps.apple.com/app/datadog/id1391380318
[8]: https://play.google.com/store/apps/details?id=com.datadog.app
[9]: https://app.datadoghq.com/monitors/triggered
[10]: https://app.datadoghq.com/monitors#downtime
[11]: /getting_started/tagging/assigning_tags/?tab=monitors#ui
