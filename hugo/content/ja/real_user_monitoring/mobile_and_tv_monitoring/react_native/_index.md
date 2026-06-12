---
aliases:
- /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/react_native/
description: React Native プロジェクトから RUM とエラートラッキングのデータを収集します。
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/react_native/advanced_configuration
  tag: ドキュメント
  text: RUM React Native の高度な構成
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: ソースコード
  text: dd-sdk-reactnative のソースコード
- link: /real_user_monitoring
  tag: ドキュメント
  text: Datadog RUM を探索する
title: React Native のモニタリング
---
## 概要

Datadog Real User Monitoring (RUM) を使用すると、アプリケーションの個々のユーザーのリアルタイムパフォーマンスとユーザージャーニーを視覚化して分析できます。

## React Native アプリケーションのモニタリングを開始する

React Native 向け RUM を使い始めるには、アプリケーションを作成し、React Native SDK を構成します。

{{< whatsnext desc="このセクションでは、以下のトピックについて説明します。">}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup">}}<u>セットアップ</u>: React Native SDK のセットアップ方法、バックグラウンドイベントのトラッキング、およびデバイスがオフラインの場合のデータ送信方法について学びます。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/error_tracking/">}}<u>クラッシュレポーティング</u>: ANR 検知とクラッシュレポートを追加し、難読化解除済みのスタックトレースを取得し、実装をテストする方法を学びます。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/advanced_configuration">}}<u>高度な構成</u>: ユーザーセッションの拡充、イベントやデータの管理、カスタムグローバル属性やウィジェットのトラッキング、初期化パラメータの確認、RUM イベントの変更や除外などについて説明します。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/mobile_vitals">}}<u>収集されるデータ</u>: RUM React Native SDK が収集するデータを確認します。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/mobile_vitals">}}<u>モバイルバイタル</u>: モバイルアプリケーションに関するインサイトを得るために役立つモバイルバイタルを確認します。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/web_view_tracking/?tab=reactnative">}}<u>Web View トラッキング</u>: モバイルアプリケーション内の Web View をモニタリングし、見落としを防ぎます。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/integrated_libraries">}}
<u>組み込みライブラリ</u>: React Native アプリケーション向けの組み込みライブラリをインポートします。{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/mobile_and_tv_monitoring/react_native/troubleshooting">}}
<u>トラブルシューティング</u>: React Native SDK でよくある問題を解決します。{{< /nextlink >}}
{{< /whatsnext >}}