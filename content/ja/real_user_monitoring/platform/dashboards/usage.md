---
aliases:
- /ja/real_user_monitoring/dashboards/frustration_signals_dashboard
- /ja/real_user_monitoring/dashboards/user_sessions_dashboard
- /ja/real_user_monitoring/platform/dashboards/frustration_signals_dashboard
- /ja/real_user_monitoring/platform/dashboards/user_sessions_dashboard
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM エクスプローラーについて
title: RUM 使用量ダッシュボード
---

## Web 使用量


RUM Web アプリ使用量ダッシュボードは、顧客がどのようにアプリを使用しているかについての洞察を提供します。以下が示されます。

- **Application usage**:
  平均セッション時間、セッションごとのページビュー、セッションごとのアクション、セッションごとのエラーのグラフを確認できます。以下の表は、最初に訪問したページと最後に訪問したページに基づく使用量メトリクスをリストアップしたものです。
- **User journeys**:
  ユーザーがどのページで最も時間を費やしているか、また、アプリケーションのどこでジャーニーを始め、どこでジャーニーを終えるかを確認できます。
- **Engagement matrix**:
  ユーザーのどの部分がどのようなアクションを実行しているかを確認できます。
- **User demographics**:
  国別のセッション数、アプリケーションの上位国、デバイス、オペレーティングシステムを観測します。また、ブラウザの使用量上位のグラフを表示することもできます。

{{< img src="real_user_monitoring/dashboards/dashboard-usage-web-app.png" alt="すぐに使える RUM Web アプリ使用量ダッシュボード" style="width:100%" >}}

表示されるデータの詳細については、[RUM ブラウザデータ収集][1]を参照してください。

## モバイル使用量


RUM モバイルアプリ使用量ダッシュボードは、顧客がアプリケーションをどのように使用しているかについての洞察を提供します。

- **Application usage**:
  ユーザーが使用しているアプリケーションのバージョン、Datadog SDK、ブラウザを把握することで、ユーザー像をより明確にすることができます。今週のセッションと先週のセッションを比較します。全体のバウンス率を見ることができます。
- **User journeys**:
  ユーザーがどのページで最も時間を費やしているか、また、アプリケーションのどこでジャーニーを始め、どこでジャーニーを終えるかを確認できます。
- **Engagement matrix**:
  ユーザーのどの部分がどのようなアクションを実行しているかを確認できます。
- **User demographics**:
  国別のセッション数、アプリケーションの上位国、デバイス、オペレーティングシステムを観測します。また、ブラウザの使用量上位のグラフを表示することもできます。

{{< img src="real_user_monitoring/dashboards/dashboard-usage-mobile-app.png" alt="すぐに使える RUM モバイルアプリ使用量ダッシュボード" style="width:100%" >}}

表示されるデータの詳細については、各プラットフォームのドキュメントをご覧ください: [iOS RUM][2]、[Android RUM][3]、[React Native RUM][4]、[Flutter RUM][5]

## ユーザーデモグラフィック


RUM ユーザーデモグラフィックダッシュボードでは、アプリケーションの地理的な採用状況を把握することができます。

- **Global Data**:
  ユーザーのグローバルビューを取得し、どの国、地域、都市が最もアプリケーションを使用しているかを確認できます。
- **Compare Continents and Compare Countries**:
  ユーザーの大陸や国によって、アプリケーションの体験がどのように異なるかを確認できます。

{{< img src="real_user_monitoring/dashboards/dashboard-usage-user-demographics.png" alt="すぐに使える RUM ユーザーデモグラフィックダッシュボード" style="width:100%" >}}

表示されるデータの詳細については、[リアルユーザーモニタリングデータのセキュリティ][6]をご覧ください。

## フラストレーションシグナル


RUM フラストレーションシグナルダッシュボードは、ユーザーがワークフローのどこでフラストレーションを感じたり、イライラしたり、ブロックされたりしているのかを把握することができます。フラストレーションシグナルは、3 つのタイプに分けられます。

- **Rage Click**:
  1 秒間のスライドウィンドウの中で、ユーザーが同じボタンを 3 回以上クリックしたこと。
- **Error Click**:
  ユーザーが要素をクリックしたときに、JavaScript のエラーが発生したこと。
- **Dead Click**:
  ユーザーが静的な要素をクリックしても、そのページでは何のアクションも起こらないこと。

{{< img src="real_user_monitoring/dashboards/dashboard-usage-frustration-signals.png" alt="すぐに使える RUM フラストレーションシグナルダッシュボード" style="width:100%" >}}

表示されるデータの詳細については、[リアルユーザーモニタリングデータのセキュリティ][6]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/data_collected/
[2]: /ja/real_user_monitoring/ios/data_collected/
[3]: /ja/real_user_monitoring/android/data_collected/
[4]: /ja/real_user_monitoring/reactnative/data_collected/
[5]: /ja/real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter
[6]: /ja/data_security/real_user_monitoring/
