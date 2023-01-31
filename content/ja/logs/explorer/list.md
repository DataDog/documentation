---
title: ログリスト
kind: documentation
description: すべてのログを検索する
further_reading:
  - link: logs/explorer/analytics
    tag: ドキュメント
    text: ログ分析の実行
  - link: logs/explorer/patterns
    tag: ドキュメント
    text: ログ内のパターン検出
  - link: logs/processing
    tag: ドキュメント
    text: ログの処理方法
  - link: logs/explorer/saved_views
    tag: ドキュメント
    text: ログエクスプローラーの自動構成
---
## 概要

ログリストにはインデックス化されたログが表示されます。また、**個々の結果**を確認するための特権ツールが提供されています。

検索クエリ (高度な使用例については、[ファセット検索][1]または[検索クエリ構文][2]を参照してください) とタイムナビゲーションを使用してログを絞り込みます。テーブル内でログを検索し、[ログサイドパネル][3] を持つログに焦点を絞ります。

## ログテーブル

ログ検索はログテーブルに表示されます。

下記のいずれかの方法によりテーブルの列を管理できます。

- _テーブル_ の 1 行目を編集できます。列の**並べ替え**、**再配置**、**削除**をする際に使用できる便利なオプションです。
- 左側の _ファセットパネル_ または右側の _ログサイドパネル_ は、フィールドに列を**追加**する際に使用できる便利なオプションです。

_Options_ ボタンから、ログイベントごとのテーブルに表示される**行数**を制御できます。

{{< img src="logs/explorer/table_controls.gif" alt="表示テーブルの構成"  style="width:80%;">}}

ログテーブルの構成は、トラブルシューティングのコンテキストの他の要素と一緒に[保存ビュー][4]に保存されます。

## ビューのエクスポート

- **モニター**へエクスポート: 新しい[ログモニター][5]用のクエリを作成するために、ログストリームに適用されるクエリをエクスポートします。
- **CSV** へエクスポート: 選択された列と共に現在のログストリームビューを CSV ファイルにエクスポートします。一度に最大 5,000 個のログをエクスポートできます。
- ビューの**共有**: 現在のビューへのリンクを、メールや Slack などを使ってチームメイトと共有します。使用可能なすべての [Datadog 通知インテグレーション][6]を参照してください。

[1]: /ja/logs/explorer/facets/
[2]: /ja/logs/search-syntax/
[3]: /ja/logs/explorer/?tab=logsearch#the-log-side-panel
[4]: /ja/logs/explorer/saved_views/
[5]: /ja/monitors/monitor_types/log/
[6]: /ja/integrations/#cat-notification
