---
aliases:
- /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/roku/
description: Roku プロジェクトから RUM とエラートラッキングのデータを収集します。
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/roku/advanced_configuration
  tag: ドキュメント
  text: RUM Roku の高度な構成
- link: https://github.com/DataDog/dd-sdk-roku
  tag: ソースコード
  text: dd-sdk-roku のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog RUM を探索する
title: Roku Monitoring
---
## 概要

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

## Roku アプリケーションのモニタリングを開始する

Roku 向け RUM を使い始めるには、アプリケーションを作成し、Roku SDK を構成します。

{{< whatsnext desc="このセクションでは、以下のトピックについて説明します。">}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/roku/setup">}}<u>セットアップ</u>: Roku SDK のセットアップ方法、バックグラウンドイベントのトラッキング、およびデバイスがオフラインの場合のデータ送信方法について学びます。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/roku/error_tracking">}}<u>クラッシュレポーティング</u>: クラッシュレポートを追加し、難読化解除されたスタックトレースを取得して、実装をテストします。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/roku/advanced_configuration">}}<u>高度な構成</u>: ユーザーセッションの拡充、イベントとデータの管理、カスタムグローバル属性の追跡、初期化パラメータの確認、RUM イベントの変更や除外などを行います。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/roku/web_view_tracking">}}<u>Web View トラッキング</u>: モバイルアプリケーション内の Web View をモニタリングし、見落としを防ぎます。{{< /nextlink >}}
{{< /whatsnext >}}