---
aliases:
- /ja/real_user_monitoring/session_replay/developer_tools
description: セッションリプレイで利用可能な開発ツールについて説明します
further_reading:
- link: /real_user_monitoring/session_replay/browser
  tag: ドキュメント
  text: ブラウザセッションリプレイ
title: セッションリプレイブラウザ開発ツール
---

## 概要

セッションリプレイのブラウザ開発ツールは、アプリケーションの問題のトラブルシューティングに役立つ組み込みのデバッグツールです。ブラウザ開発ツールを使用するために、何かを構成する必要はありません。

## ブラウザ開発ツール

ブラウザ開発ツールにアクセスするには、**Sessions** タブのセッションの左側にある **Jump to Replay** ボタンをクリックするか、セッションをクリックして [RUM Explorer][1] の右上にある **Replay Session** をクリックします。

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-1.png" alt="開発ツールボタン" style="width:80%;">}}

**Share** ボタンの右側に、**</> Dev Tools** ボタンが表示されます。パフォーマンスデータ、コンソールログ、エラー、リプレイに関する属性などを確認することができます。

### パフォーマンス

**Performance** タブには、セッション内のイベント (アクション、エラー、リソース、ロングタスクなど) とタイムスタンプのウォーターフォールが表示されます。

Action Name や Resource Type などのフィルターを選択して適用し、表示されるリソースとイベント タイプの範囲を変更します。ウォーターフォール内のスライダーをドラッグ アンド ドロップして、時間範囲を拡大することもできます。

{{< img src="real_user_monitoring/session_replay/dev_tools/performance-filters-2.mp4" alt="パフォーマンス フィルター" video="true" style="width:60%;">}}

### コンソール

**Console** タブには、各ビューのすべての [Web ブラウザから収集したログ][2]とエラーが表示されます。

**Error**、**Warn**、**Info**、**Debug** をクリックすると、重要度に基づいてログをフィルタリングできます。[ログエクスプローラー][3]でこれらのログを検索するには、**View in Log Explorer** をクリックします。

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-console.png" alt="Console View in Log Explorer ボタン" style="width:50%;">}}

ログエクスプローラーは、あらかじめ検索クエリが入力された状態で別タブに表示されます。

### エラー

**Errors** タブには、セッションに関連する [RUM エラー][4]と[エラー追跡][5]の問題が表示されます。

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-errors.png" alt="Errors タブ" style="width:70%;">}}

### 属性

**Attributes** タブには、セッションに関連するすべての属性が表示されます。詳しくは、[デフォルトの属性][6]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/explorer/
[2]: /ja/logs/log_collection/javascript/
[3]: /ja/logs/explorer/
[4]: /ja/real_user_monitoring/browser/collecting_browser_errors/
[5]: /ja/real_user_monitoring/error_tracking/
[6]: /ja/real_user_monitoring/browser/data_collected/#default-attributes