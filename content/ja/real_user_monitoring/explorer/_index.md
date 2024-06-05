---
aliases:
- /ja/real_user_monitoring/rum_explorer
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: RUM Explorer での検索について
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: ブログ
  text: RUM でウェブに関する主な指標を監視
- link: https://www.datadoghq.com/blog/modern-frontend-monitoring/
  tag: ブログ
  text: シングルページアプリケーションの監視を開始
kind: documentation
title: RUM エクスプローラー
---

## 概要

[Real User Monitoring (RUM) エクスプローラー][1]では、アプリケーションから収集したデータや RUM イベントに関する詳細な情報を調べることができます。

以下が可能です。

- ユーザーセッションをナビゲートする
- ビュー、リソース、アクションに影響をおよぼすパフォーマンス問題を調査する
- アプリケーションのエラーやロングタスクのトラブルシューティング

{{< img src="real_user_monitoring/explorer/rum-explorer-2.png" alt="RUM エクスプローラー" style="width:95%;" >}}

## アプリケーション別に見る

トップナビゲーションのアプリケーションセレクターを使用して、特定のアプリケーションのすべての RUM データを選択し、表示します。

{{< img src="real_user_monitoring/explorer/application-selector-2.png" alt="アプリケーションセレクターをクリックすると、特定のアプリケーションのすべての RUM データが表示されます" style="width:95%;" >}}

## 検索とフィルター

検索バーに入力し、[RUM エクスプローラー][1]で視覚化タイプを選択することで、RUM イベントを検索・フィルタリングすることができます。興味のあるイベントのサブセットを絞り込んだり、広げたり、フォーカスを移したりすることができます。

## 認可

クエリした RUM イベントを、問題に関する情報を導き出したり統合したりするのに役立つ、より上位のエンティティにグループ化することができます。イベントのパターンを特定し、サブセットでイベントを集計するには、[RUM イベントのグループ化][2]を参照してください。

クエリの作成とファセットの使用については、[検索構文][3]を参照してください。

## 視覚化

フィルターや集計に視覚化を選択することで、RUM イベントを有用な視点で表示し、決定的な情報を発見することができます。

例えば、RUM イベントをリストで表示したり、RUM データを列で整理したり、RUM テレメトリーを時系列で表示する時系列グラフで確認したりすることができます。

RUM データを RUM エクスプローラで視覚化するには、[RUM 視覚化の作成][4]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/sessions
[2]: /ja/real_user_monitoring/explorer/group
[3]: /ja/real_user_monitoring/explorer/search_syntax
[4]: /ja/real_user_monitoring/explorer/visualize