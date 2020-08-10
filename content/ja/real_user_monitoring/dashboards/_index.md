---
title: RUM ダッシュボード
kind: documentation
further_reading:
  - link: /real_user_monitoring/installation/advanced_configuration
    tag: ドキュメント
    text: RUM データ収集の高度な構成
  - link: /real_user_monitoring/explorer
    tag: ドキュメント
    text: Datadog でビューを検索する
---
[RUM アプリケーションを作成][1]すると、すべての[収集データ][2]を分析するためのダッシュボードが Datadog 内に作成されます。RUM ダッシュボードはダッシュボードリストに表示され、Datadog ロゴが付いています。

{{< img src="real_user_monitoring/dashboards/rum_dashboard_in_dashlist.png" alt="ダッシュボードリストに表示された RUM ダッシュボード" >}}

ダッシュボードには、[RUM Applications ページ][3]からアクセスできます。アプリケーションに紐付けられた **Dashboard** リンクをクリックします。

{{< img src="real_user_monitoring/dashboards/rum_applications.gif" alt="RUM アプリケーション" >}}

{{< whatsnext desc="次のダッシュボードを使用できます" >}}
  {{< nextlink href="/real_user_monitoring/dashboards/performance_overview_dashboard" >}}<u>Performance Overview</u>: Web サイトのパフォーマンスとデモグラフィック (人口動態) について総合的な意見を取得します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/resources_dashboard" >}}<u>Resources</u>: 最も遅いリソースを把握するとともに、サードパーティのリソースを調査します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/errors_dashboard" >}}<u>Errors</u>: ユーザーのコンソールに表示されるエラーをブラウザの種類やデバイスの種類別に分析します。{{< /nextlink >}}
{{< /whatsnext >}}

## ダッシュボードの相互関係

[他のダッシュボード][4]と同じようにダッシュボードをカスタマイズできます。また、[RUM エクスプローラー][2]で基礎のデータを直接検索できます。

### テンプレート変数

自動的に作成されるデフォルトのテンプレート変数セットと一緒に、すべてのアプリケーション用の RUM ダッシュボードが生成されます。RUM ダッシュボードを絞り込むには、テンプレート上部にあるテンプレート変数を使用します。たとえば、`applicationId` テンプレート変数を使用すると、特定のアプリケーションに絞り込めます。

{{< img src="real_user_monitoring/dashboards/template_variables.gif" alt="テンプレート変数" style="width:50%;" >}}

### 関連ビューの表示

すべての個別イベントを調査するには、グラフをクリックして _View related views_ を選択すれば、現在選択中のフィルターがかかった状態で RUM Explore にリダイレクトされます。

{{< img src="real_user_monitoring/dashboards/view_related_views.gif" alt="関連ビューの表示" style="width:50%;" >}}

### ダッシュボードのカスタマイズ

必要に応じて RUM ダッシュボードを複製し、カスタマイズできます。ウィジェットを追加したり、テンプレート変数を変更したりできます。

{{< img src="real_user_monitoring/dashboards/clone_dashboard.png" alt="ダッシュボードの複製" style="width:50%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/installation/
[2]: /ja/real_user_monitoring/data_collected/
[3]: https://app.datadoghq.com/rum/list
[4]: /ja/dashboards/