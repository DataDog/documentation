---
beta: true
description: 機能フラグの健全性と使用状況を表示して理解します。
disable_toc: false
further_reading:
- link: /real_user_monitoring/feature_flag_tracking/setup/
  tag: ドキュメント
  text: 機能フラグデータ収集の設定
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM エクスプローラーについて
- link: https://www.datadoghq.com/blog/feature-flag-tracking/
  tag: ブログ
  text: Datadog RUM の Feature Flag Tracking によるリリースの安全性の確保
title: Feature Flag Tracking を使用する
---
機能フラグのデータ収集を設定したら、RUM 内の [[{{< ui >}}Feature Flag Tracking{{< /ui >}}]][1] タブに移動します。

このビューから、機能フラグの健全性や使用状況について疑問点を調査することができます。
- 各バリアントを体験しているユーザー数をモニターし、機能フラグのサマリー統計を見る
- 機能フラグの[ステータス](#feature-flag-status)を確認し、コードクリーンアップのために削除できるものがあるかどうかを確認する
- 機能フラグがどのページで評価されているかを確認する

機能フラグは、それが評価されるイベントのコンテキストに表示されます。つまり、機能フラグのコードロジックが実行されるビューに表示されるはずです。

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-2.png" alt="機能フラグのリストを表示し、健全性と使用状況に関する疑問を調べます。" style="width:90%;" >}}

## 検索とフィルター {#search-and-filter}
検索バーに入力することで、機能フラグを検索し、フィルターをかけることができます。また、ファセット検索を使えば、興味のある機能フラグのサブセットを絞り込んだり、広げたり、フォーカスを移すことができます。

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-search-filter.png" alt="Feature Flag リストの検索バーとフィルタリング" style="width:90%;" >}}

## 機能フラグのステータス {#feature-flag-status}
機能フラグのステータスは 3 種類あります。

Active
: 機能フラグは過去 2 週間、さまざまなバリアントを評価してています。

Inactive
: 過去 2 週間、コントロールバリアントについての機能フラグ評価のみです。

Out to 100%
: 過去 2 週間、_非コントロール_バリアントの 1 つについての機能フラグ評価のみです。


## 機能フラグを分析する {#analyze-your-feature-flags}
機能フラグの健全性とパフォーマンスに関する詳細を確認するには、リスト内のフラグをクリックして、専用の Feature Flag 分析ダッシュボードに移動します。Feature Flag 分析ダッシュボードには、ユーザーセッション、Core Web Vitals の変化、エラー率に関する情報が表示され、機能フラグのパフォーマンスの概要が示されます。

すぐに利用可能なこれらのグラフは、フラグバリアント全体で集計されるため、機能リリースの問題が深刻化する前に簡単に発見できます。このダッシュボードでは、機能リリースを簡単に監視でき、問題を発見した際にすぐにロールバックできるため、否定的なユーザー体験を回避できます。

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-details-page.mp4" alt="Feature Flag 詳細ページ - ユーザーの概要" video=true width=90% >}}

- [{{< ui >}}Users{{< /ui >}}] (ユーザー) タブでは、機能フラグの全体的な要約統計を確認でき、各機能フラグバリアントを表示しているユーザーを任意の属性でさらに分析できます。あるバリアントのユーザー体験と別のバリアントのユーザー体験を理解したい場合は、それぞれのケースでの [Session Replay][2] を確認できます。

- [{{< ui >}}Issues{{< /ui >}}] (問題) タブでは、機能フラグを持つユーザーセッションに対してアプリケーションで発生しているエラーを確認できます。[Error Tracking][3] によって検出された問題が、機能フラグの特定のバリアントで発生しており、変更に関連している可能性があるかどうかを確認します。

- [{{< ui >}}Performance{{< /ui >}}] (パフォーマンス) タブでは、機能フラグのバリアントのいずれかによってパフォーマンスの低下が引き起こされているかどうかを確認します。各バリアントの Core Web Vitals と読み込み時間を表示して、いずれかのバリアントがアプリケーションのパフォーマンスに悪影響を及ぼしている可能性があるかどうかを判断できます。

## RUM エクスプローラーを使用して機能フラグデータからカスタムビューを構築する{#build-custom-views-from-feature-flag-data-using-the-rum-explorer}
[RUM エクスプローラー][4]で RUM が収集したすべてのデータを検索し、機能フラグの傾向を把握したり、より大きな文脈でパターンを分析したり、[ダッシュボード][5]や[モニター][6]にエクスポートしたりすることができます。

RUM エクスプローラーでは、`@feature_flags.{flag_name}` 属性でセッション、ビュー、またはエラーを検索して、ユーザーが特定のユーザー体験を表示されたイベントにスコープダウンして焦点を当てることができます。

クエリを `@feature_flags.{flag_name}` でグループ化することで、自分やチームにとって重要なメトリクスを比較できます。たとえば、新しいチェックアウトフローが、チェックアウトページからユーザーが購入するまでのコンバージョン率にどのような影響を与えているかを理解したい場合、コンバージョン率グラフに "Group by" を追加することができます。

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-rum-explorer.png" alt="Feature Flag リストの検索バーとフィルタリング" style="width:90%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/feature-flags
[2]: /ja/session_replay/
[3]: /ja/real_user_monitoring/error_tracking/explorer/#explore-your-issues
[4]: https://app.datadoghq.com/rum/explorer
[5]: /ja/dashboards/
[6]: /ja/monitors/#create-monitors