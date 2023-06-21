---
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM エクスプローラーについて
kind: documentation
title: RUM ユーザーセッションダッシュボード
---

## 概要

[セッションダッシュボード][1]は、ユーザーセッション、ユーザー属性、アプリケーションの使用量に関する洞察を提供します。以下が示されます。

- **Sessions**: ユーザーセッション数、平均セッション時間、セッションあたりのページビュー数を分析します。右の 2 つのグラフは、セッション数とトップページを視覚化したものです。
- **User demographics**: 国別のセッション数、アプリケーションの上位国、デバイス、オペレーティングシステムを観測します。また、ブラウザの使用量上位のグラフを表示することもできます。
- **Application usage**: 平均セッション時間、セッションごとのページビュー、セッションごとのアクション、セッションごとのエラーのグラフを参照します。以下の表は、最初に訪問したページと最後に訪問したページに基づく使用量メトリクスをリストアップしたものです。

{{< img src="real_user_monitoring/dashboards/sessions_dashboard.png" alt="すぐに使えるユーザーセッションダッシュボード" style="width:100%;" >}}

表示されるデータの詳細については、[RUM ブラウザデータ収集][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30410/rum---user-sessions
[2]: /ja/real_user_monitoring/data_collected/