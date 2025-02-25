---
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/flutter/advanced_configuration
  tag: ドキュメント
  text: RUM Flutter の高度なコンフィギュレーション
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: ソースコード
  text: dd-sdk-flutter のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog RUM を探索する
title: Flutter モニタリング
---
## 概要

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

## Flutter アプリケーションのモニタリングを開始する

Flutter 向け RUM を使い始めるには、アプリケーションを作成し、Flutter SDK を構成します。

{{< whatsnext desc="このセクションでは、以下のトピックについて説明します。">}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/flutter/setup">}}<u>セットアップ</u>: Flutter SDK のセットアップ方法、バックグラウンドイベントのトラッキング方法、およびデバイスがオフラインの場合のデータ送信方法について学びます。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/flutter/error_tracking">}}<u>クラッシュレポーティング</u>: ANR 検知とクラッシュレポートを追加し、難読化解除後のスタックトレースを取得して、実装をテストします。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/flutter/advanced_configuration">}}<u>高度な構成</u>: ユーザーセッションの拡充、イベントとデータの管理、カスタムグローバル属性やウィジェットの追跡、初期化パラメータの確認、RUM イベントの変更または破棄などについて説明します。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/flutter/mobile_vitals">}}<u>収集されるデータ</u>: RUM Flutter SDK が収集するデータを確認します。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/flutter/mobile_vitals">}}<u>モバイルバイタル</u>: モバイルアプリケーションの分析に役立つモバイルバイタルを確認します。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/flutter/web_view_tracking/?tab=flutter">}}
<u>Web View トラッキング</u>: モバイルアプリケーション内の Web View をモニタリングし、見落としを防ぎます。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/flutter/integrated_libraries">}}
<u>組み込みライブラリ</u>: Flutter アプリケーション向けの組み込みライブラリをインポートします。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/flutter/troubleshooting">}}
<u>トラブルシューティング</u>: Flutter SDK でよくある問題を解決する方法を紹介します。{{< /nextlink >}}
{{< /whatsnext >}}