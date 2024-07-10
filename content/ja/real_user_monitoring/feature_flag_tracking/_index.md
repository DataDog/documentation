---
disable_toc: false
further_reading:
- link: /real_user_monitoring/guide/setup-feature-flag-data-collection/
  tag: Documentation
  text: 機能フラグデータ収集の設定
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: RUM エクスプローラーについて
- link: https://www.datadoghq.com/blog/feature-flag-tracking/
  tag: ブログ
  text: Datadog RUM の機能フラグ追跡によるリリースの安全性の確保
title: 機能フラグ追跡
---

## 概要

機能フラグデータにより、どのユーザーに特定の機能が表示されているか、導入した変更がユーザー体験に影響を与えているか、パフォーマンスに悪影響を与えているかを判断できるため、ユーザー体験やパフォーマンス監視の可視性が高まります。

RUM データを機能フラグデータでリッチ化することで、以下のことが可能になります。
- 意図せずバグやパフォーマンスの低下を引き起こすことなく、機能が正常に起動することを確信できる
- 機能リリースとパフォーマンスを関連付け、問題を特定のリリースに特定し、トラブルシューティングを迅速に行うことができる
- データの収集と分析を効率化し、トラブルシューティングに注力することができる

## 機能フラグデータ収集の設定

詳しい設定方法は、[機能フラグデータ収集の概要][1]のガイドをご覧ください。

機能フラグの追跡は、RUM ブラウザ SDK で利用可能です。開始するには、[RUM ブラウザモニタリング][2]をセットアップします。ブラウザ RUM SDK バージョン >= 4.25.0 が必要です。

機能フラグデータの収集は、[カスタム機能フラグ管理ソリューション][3]、またはインテグレーションパートナーのいずれかを使用して開始することができます。

以下とのインテグレーションをサポートしています。

{{< partial name="rum/rum-feature-flag-tracking.html" >}}

</br>

機能フラグは、それが評価されるイベントのコンテキストに表示されます。つまり、機能フラグのコードロジックが実行されるビューに表示されるはずです。

## 機能フラグを表示する

機能フラグデータ収集をセットアップしたら、RUM 内の [**Feature Flags**][4] タブに移動します。

このビューから、機能フラグの健全性や使用状況について疑問点を調査することができます。
- 各バリアントを体験しているユーザー数をモニターし、機能フラグのサマリー統計を見る
- 機能フラグのステータスを確認し、コードクリーンアップのために削除できるものがあるかどうかを確認する
- 機能フラグがどのページで評価されているかを確認する

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-2.png" alt="機能フラグの一覧を表示し、機能フラグの健全性や使用状況について疑問点を調査することができます" style="width:90%;" >}}


### 検索とフィルター
検索バーに入力することで、機能フラグを検索し、フィルターをかけることができます。また、ファセット検索を使えば、興味のある機能フラグのサブセットを絞り込んだり、広げたり、フォーカスを移すことができます。

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-search-filter.png" alt="機能フラグリストの検索バーとフィルター" style="width:90%;" >}}

### 機能フラグのステータス
機能フラグのステータスは 3 種類あります。
- **Active**: 機能フラグは過去 2 週間、さまざまなバリアントを評価してきました
- **Inactive**: 過去 2 週間、コントロールバリアンについての機能フラグ評価のみです
- **Out to 100%**: 過去 2 週間、非コントロールバリアントの 1 つについての機能フラグ評価のみです

## 機能フラグを分析する
機能フラグの健全性とパフォーマンスの詳細を確認するには、リスト内のフラグをクリックして、専用の機能フラグ分析ダッシュボードに移動することができます。機能フラグ分析ダッシュボードでは、ユーザーセッション、Core Web Vitals の変化、エラー率に関する情報が表示され、機能フラグのパフォーマンスの概要を知ることができます。

すぐに使えるグラフは、フラグバリアント全体に集計されるので、機能リリースの問題が深刻な問題に発展する前に、簡単に発見することができます。このダッシュボードは、機能リリースを監視する簡単な方法を提供し、問題を発見したらすぐにロールバックすることができるので、ネガティブなユーザー体験を避けることができます。

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-details-page.mp4" alt="機能フラグ詳細ページ - ユーザー概要" video=true width=90% >}}


**Users** タブでは、機能フラグの概要統計が表示され、さらに機能フラグの各バリアントを閲覧しているユーザーを任意の属性で分析することが可能です。あるバリアントと別のバリアントを経験した人がどのように見えるかを理解したい場合は、各ケースの[セッションリプレイ][5] を見ることができます。

**Issues** タブでは、機能フラグを持つユーザーセッションに対してアプリケーションで発生しているエラーを確認することができます。[エラー追跡][6]で検出された問題が、あなたの機能フラグの特定のバリエーションで発生し、あなたの変更に関連している可能性があるかどうかを確認します。

**Performance** タブでは、機能フラグバリアントの 1 つがパフォーマンス低下を引き起こしているかどうかを把握することができます。Core Web Vitals と各バリアントのロード時間を表示し、バリアントの 1 つがアプリケーションのパフォーマンスに悪影響を及ぼしているかどうかを判断することができます。

### RUM エクスプローラーを使用して機能フラグデータからカスタムビューを構築する
[RUM エクスプローラー][7]で RUM が収集したすべてのデータを検索し、機能フラグの傾向を把握したり、より大きな文脈でパターンを分析したり、[ダッシュボード][8]や[モニター][9]にエクスポートしたりすることができます。

RUM エクスプローラーでは、`@feature_flags.{flag_name}` 属性でセッション、ビュー、またはエラーを検索して、ユーザーが特定のユーザー体験を表示されたイベントにスコープダウンして焦点を当てることができます。

クエリを `@feature_flags.{flag_name}` でグループ化することで、自分やチームにとって重要なメトリクスを比較することができます。例えば、新しいチェックアウトフローが、チェックアウトページからユーザーが購入するまでのコンバージョン率にどのような影響を与えているかを理解したい場合、コンバージョン率グラフに "Group by" を追加することができます。

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-rum-explorer.png" alt="機能フラグリストの検索バーとフィルター" style="width:90%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/guide/setup-feature-flag-data-collection/
[2]: /ja/real_user_monitoring/browser#setup
[3]: /ja/real_user_monitoring/guide/setup-feature-flag-data-collection/?tab=npm#custom-feature-flag-management
[4]: https://app.datadoghq.com/rum/feature-flags
[5]: /ja/real_user_monitoring/session_replay/browser/
[6]: /ja/real_user_monitoring/error_tracking/explorer/#explore-your-issues
[7]: https://app.datadoghq.com/rum/explorer
[8]: /ja/dashboards/
[9]: /ja/monitors/#create-monitors