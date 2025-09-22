---
aliases:
- /ja/real_user_monitoring/guide/getting-started-feature-flags/
- /ja/real_user_monitoring/guide/setup-feature-flag-data-collection/
beta: true
description: 機能フラグの健全性と使用状況を確認して把握します。
disable_toc: false
further_reading:
- link: /real_user_monitoring/guide/setup-feature-flag-data-collection/
  tag: ドキュメント
  text: 機能フラグデータ収集の設定
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM エクスプローラーについて
- link: https://www.datadoghq.com/blog/feature-flag-tracking/
  tag: ブログ
  text: Datadog RUM の機能フラグ追跡によるリリースの安全性の確保
title: Using Feature Flags
---

機能フラグのデータ収集を設定したら、RUM 内の [**Feature Flags**][1] タブに移動します。

このビューから、機能フラグの健全性や使用状況について疑問点を調査することができます。
- 各バリアントに割り当てられているユーザー数を監視し、機能フラグの概要統計を確認します。
- 機能フラグの[ステータス](#feature-flag-status)を確認し、コード クリーンアップのために不要となり削除できるものがないか判断します。
- 機能フラグの評価がどのページで行われているかを確認します。

機能フラグは、それが評価されるイベントのコンテキストに表示されます。つまり、機能フラグのコードロジックが実行されるビューに表示されるはずです。

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-2.png" alt="機能フラグの一覧を表示し、健全性や使用状況に関する疑問を調べます" style="width:90%;" >}}

## 検索とフィルター
検索バーに入力することで、機能フラグを検索し、フィルターをかけることができます。また、ファセット検索を使えば、興味のある機能フラグのサブセットを絞り込んだり、広げたり、フォーカスを移すことができます。

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-search-filter.png" alt="機能フラグリストの検索バーとフィルター" style="width:90%;" >}}

## 機能フラグのステータス
機能フラグのステータスは 3 種類あります。

Active
: 過去 2 週間にわたり、複数のバリアントの評価が行われています。

Inactive
: 過去 2 週間は、コントロール バリアントの評価のみが行われています。

Out to 100%
: 過去 2 週間は、_非コントロール_ バリアントのいずれか 1 つの評価のみが行われています。


## 機能フラグを分析する
機能フラグの健全性とパフォーマンスの詳細を確認するには、リスト内のフラグをクリックして、専用の Feature Flag 分析ダッシュボードに移動できます。Feature Flag 分析ダッシュボードでは、ユーザー セッション、Core Web Vitals の変化、エラー率などの情報が表示され、機能フラグのパフォーマンスの概要を把握できます。

すぐに使えるグラフは、フラグバリアント全体に集計されるので、機能リリースの問題が深刻な問題に発展する前に、簡単に発見することができます。このダッシュボードは、機能リリースを監視する簡単な方法を提供し、問題を発見したらすぐにロールバックすることができるので、ネガティブなユーザー体験を避けることができます。

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-details-page.mp4" alt="機能フラグ詳細ページ - ユーザー概要" video=true width=90% >}}

- **Users** タブでは、機能フラグの概要統計が表示され、各バリアントに割り当てられているユーザーを任意の属性でさらに分析できます。特定のバリアントを体験したユーザーの画面が別のバリアントとどう異なるかを把握したい場合は、各ケースの [セッション リプレイ][2] を再生できます。

- **Issues** タブでは、機能フラグが適用されたユーザー セッションにおいてアプリケーションで発生しているエラーを確認できます。[Error Tracking][3] で検出された問題が、機能フラグの特定のバリアントで発生しており、変更内容に関連している可能性がないか確認できます。

- **Performance** タブでは、機能フラグバリアントの 1 つがパフォーマンス低下を引き起こしているかどうかを把握することができます。Core Web Vitals と各バリアントのロード時間を表示し、バリアントの 1 つがアプリケーションのパフォーマンスに悪影響を及ぼしているかどうかを判断することができます。

## RUM エクスプローラーを使用して機能フラグデータからカスタムビューを構築する
[RUM Explorer][4] で RUM が収集したすべてのデータを検索し、機能フラグの傾向を把握したり、より広い文脈でパターンを分析したり、[ダッシュボード][5] や [モニター][6] にエクスポートできます。

RUM エクスプローラーでは、`@feature_flags.{flag_name}` 属性でセッション、ビュー、またはエラーを検索して、ユーザーが特定のユーザー体験を表示されたイベントにスコープダウンして焦点を当てることができます。

クエリを `@feature_flags.{flag_name}` でグループ化することで、自分やチームにとって重要なメトリクスを比較することができます。例えば、新しいチェックアウトフローが、チェックアウトページからユーザーが購入するまでのコンバージョン率にどのような影響を与えているかを理解したい場合、コンバージョン率グラフに "Group by" を追加することができます。

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-rum-explorer.png" alt="機能フラグリストの検索バーとフィルター" style="width:90%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/feature-flags
[2]: /ja/real_user_monitoring/session_replay/browser/
[3]: /ja/real_user_monitoring/error_tracking/explorer/#explore-your-issues
[4]: https://app.datadoghq.com/rum/explorer
[5]: /ja/dashboards/
[6]: /ja/monitors/#create-monitors