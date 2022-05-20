---
title: RUM ダッシュボード
kind: documentation
further_reading:
  - link: /real_user_monitoring/explorer
    tag: ドキュメント
    text: Datadog でビューを検索する
---
RUM アプリケーションを作成すると、すべての[収集データ][1]を分析するためのダッシュボードが Datadog 内に作成されます。RUM ダッシュボードはダッシュボードリストに表示され、Datadog ロゴが付いています。

{{< img src="real_user_monitoring/dashboards/rum_dashboard_in_dashlist.png" alt="ダッシュボードリストに表示された RUM ダッシュボード" >}}

ダッシュボードには、[RUM Applications ページ][2]からアクセスできます。アプリケーションに紐付けられた **Dashboard** リンクをクリックします。

{{< img src="real_user_monitoring/dashboards/rum_applications.mp4" alt="RUM アプリケーション" video=true >}}

{{< whatsnext desc="次のダッシュボードを使用できます" >}}
  {{< nextlink href="/real_user_monitoring/dashboards/performance_overview_dashboard" >}}<u>Performance Overview</u>: Web サイトのパフォーマンスとデモグラフィック (人口動態) について総合的な意見を取得します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/resources_dashboard" >}}<u>Resources</u>: 最も遅いリソースを把握するとともに、サードパーティのリソースを調査します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/errors_dashboard" >}}<u>Errors</u>: ユーザーのコンソールに表示されるエラーをブラウザの種類やデバイスの種類別に分析します。{{< /nextlink >}}
{{< /whatsnext >}}

## ダッシュボードの相互関係

[他のダッシュボード][3]と同じようにダッシュボードをカスタマイズできます。また、[RUM エクスプローラー][1]で基礎のデータを直接検索できます。

### テンプレート変数

自動的に作成されるデフォルトのテンプレート変数セットと一緒に、すべてのアプリケーション用の RUM ダッシュボードが生成されます。RUM ダッシュボードを絞り込むには、テンプレート上部にあるテンプレート変数を使用します。たとえば、`applicationId` テンプレート変数を使用すると、特定のアプリケーションに絞り込めます。

{{< img src="real_user_monitoring/dashboards/template_variables.mp4" alt="テンプレート変数" video=true style="width:50%;" >}}

### RUM イベントの表示

すべての個別イベントを調査するには、グラフをクリックして _View RUM views_ を選択すると、現在選択中のフィルターで RUM Explore にリダイレクトされます。

{{< img src="real_user_monitoring/dashboards/view_rum_events.mp4" alt="RUM イベントの表示" video=true style="width:80%;" >}}

### ダッシュボードのカスタマイズ

必要に応じて RUM ダッシュボードを複製し、カスタマイズできます。ウィジェットを追加したり、テンプレート変数を変更したりできます。

{{< img src="real_user_monitoring/dashboards/clone_dashboard.png" alt="ダッシュボードの複製" style="width:50%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/data_collected/
[2]: https://app.datadoghq.com/rum/list
[3]: /ja/dashboards/