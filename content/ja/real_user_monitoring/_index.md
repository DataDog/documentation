---
title: リアルユーザーモニタリング
kind: documentation
description: ユーザーから見たフロントエンドアプリケーションのパフォーマンスを視覚化して分析します。
disable_sidebar: true
aliases:
  - /ja/real_user_monitoring/installation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: ブログ
    text: リアルユーザーモニタリング
  - link: /logs/processing/attributes_naming_convention/
    tag: ドキュメント
    text: Datadog標準属性
---
{{< img src="real_user_monitoring/rum_full_dashboard.png" alt="RUM ダッシュボード"  >}}

## リアルユーザーモニタリングとは？


Datadog のリアルユーザーモニタリング (RUM) は、個々のユーザーのリアルタイムのアクティビティとエクスペリエンスをエンドツーエンドで可視化します。Web およびモバイルアプリケーションの 4 種類のユースケースを解決するように設計されています。

* **Performance**: Web ページ、アプリケーション画面のパフォーマンスだけでなく、ユーザーアクション、ネットワークリクエスト、フロントエンドコードのパフォーマンスも追跡します
* **Error Management**: 進行中のバグと問題を監視し、経過を追跡します
* **Analytics / Usage**: アプリケーションを使用しているユーザーを理解し (国、デバイス、OS など)、個々のユーザージャーニーを監視し、ユーザーによるアプリケーションの操作を分析します (アクセスされた最も一般的なページ、クリック、インタラクション、機能の使用...)
* **Support**: 1 つのユーザーセッションに関連するすべての情報を取得して、問題をトラブルシューティングします (セッションの継続時間、アクセスしたページ、インタラクション、読み込まれたリソース、エラー…)

{{< whatsnext desc="RUM の概要:">}}
  {{< nextlink href="/real_user_monitoring/browser">}}<u>ブラウザの監視</u>: ブラウザ SDK を構成してアプリケーションを作成します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/android">}}<u>Android の監視</u>: Android SDK を構成してアプリケーションを作成します。{{< /nextlink >}} 
  {{< nextlink href="/real_user_monitoring/dashboards">}}<u>ダッシュボード</u>: すぐに使用できるダッシュボード内で収集されたすべてのデータを利用開始後すぐに発見します。{{< /nextlink >}}
{{< /whatsnext >}}
{{< whatsnext desc="RUM イベントを探索する:">}}
  {{< nextlink href="/real_user_monitoring/explorer/">}}<u>RUM 検索</u>: ページビューを検索します。{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/explorer/analytics">}}<u>RUM 分析</u>: あらゆるイベントから情報を手に入れます。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}