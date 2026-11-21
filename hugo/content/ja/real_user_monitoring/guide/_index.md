---
cascade:
  algolia:
    category: Guide
    rank: 20
    subcategory: RUM & Session Replay Guides
description: Web およびモバイルアプリケーション向けの RUM と Session Replay の実装、最適化、ベストプラクティスに関する包括的なガイド。
disable_toc: true
private: true
title: Real User Monitoring および Session Replay についてのガイド
---
{{< whatsnext desc="一般的な RUM:" >}}
    {{< nextlink href="real_user_monitoring/guide/understanding-the-rum-event-hierarchy" >}}RUM イベントの階層を理解する{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/compute-apdex-with-rum-data" >}}RUM データによる Apdex とカスタムパフォーマンス指標の算出{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/alerting-with-rum" >}}RUM データでアラートを作成する{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/create-charts-with-rum-custom-metrics" >}}RUM カスタムメトリクスでチャートを作成する{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/monitor-your-rum-usage" >}}RUM の使用量を監視する{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/track-rum-usage-with-attribution-tags" >}}使用量属性タグで RUM の使用量を追跡する{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/getting-started-rum-deployment-tracking" >}}RUM デプロイメント追跡の概要{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-kiosk-sessions-using-rum" >}}RUM を使用したキオスクセッションの監視{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/best-practices-for-rum-sampling" >}}RUM サンプリングのベストプラクティス{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/debug-symbols" >}}RUM デバッグシンボルで難読化されたスタックトレースを調査する{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/retention_filter_best_practices" >}}保持フィルターのベストプラクティス{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/best-practices-tracing-native-ios-android-apps" >}}ネイティブ iOS および Android アプリをトレースするためのベストプラクティス{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="オペレーションモニタリング:" >}}
    {{< nextlink href="real_user_monitoring/guide/best-practices-for-operations-setup" >}}RUM オペレーションを設定するためのベストプラクティス{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/best-practices-for-creating-slos-on-operations" >}}RUM オペレーションの SLO を作成するためのベストプラクティス{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="ブラウザ RUM:" >}}
    {{< nextlink href="real_user_monitoring/guide/send-custom-user-actions" >}}カスタムユーザーアクションを送信する{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/identify-bots-in-the-ui" >}}RUM エクスプローラーでボットを識別する{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/upload-javascript-source-maps" >}}JavaScript ソースマップをアップロードする{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/upload-webassembly-symbols" >}}WebAssembly シンボルをアップロードする{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/sampling-browser-plans" >}}ブラウザ RUM およびブラウザ RUM & Session Replay のサンプリング構成を使用してセッションボリュームを制御する{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/enrich-and-control-rum-data" >}}ブラウザ RUM データを強化および制御する{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/browser-sdk-upgrade" >}}RUM ブラウザ SDK のアップグレード{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/proxy-rum-data" >}}ブラウザ RUM データをプロキシする {{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/devtools-tips" >}}ブラウザ開発ツール使用時の注意点{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/define-services-and-track-ui-components-in-your-browser-application/" >}}ブラウザアプリケーションでサービスを定義し、UI コンポーネントを追跡する {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/enable-rum-shopify-store/" >}}Shopify ストアで RUM を有効にする{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/enable-rum-squarespace-store/" >}}Squarespace ストアで RUM を有効にする{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/enable-rum-woocommerce-store/" >}}WordPress + WooCommerce ストアで RUM を有効にする{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-your-nextjs-app-with-rum/" >}}RUM を使用して Next.js アプリケーションを監視する{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-electron-applications-using-browser-sdk/" >}}ブラウザ SDK を使用して Electron アプリケーションを監視する{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-capacitor-applications-using-browser-sdk/" >}}ブラウザ SDK を使用して Capacitor アプリケーションを監視する{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="モバイル RUM:" >}}
    {{< nextlink href="real_user_monitoring/guide/mobile-sdk-deprecation-policy" >}}RUM モバイル SDK の非推奨ポリシー{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/mobile-sdk-upgrade" >}}RUM モバイル SDK をアップグレードする{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/mobile-sdk-multi-instance" >}}モバイル SDK の複数インスタンスを使用する{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/proxy-mobile-rum-data" >}}モバイル RUM データをプロキシする{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts" >}}React Native 起動前にネイティブ SDK を初期化する{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/monitor-hybrid-react-native-applications" >}}ハイブリッド React Native アプリケーションのモニタリング{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Session Replay:" >}}
    {{< nextlink href="/real_user_monitoring/guide/session-replay-service-worker" >}}サードパーティサービスワーカーによる Session Replay を許可する{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/session-replay-for-solutions" >}}サポートのワークフローに Session Replay を活用する{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/shadow-dom" >}}Shadow DOM コンポーネントでセッションリプレイ機能を強化する{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/connect-session-replay-to-your-third-party-tools" >}}Session Replay をサードパーティツールに接続する{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/using-session-replay-as-a-key-tool-in-post-mortems" >}}Session Replay をポストモーテムのキーツールとして活用する{{< /nextlink >}}
    {{< nextlink href="/synthetics/guide/rum-to-synthetics" >}}Session Replay から Synthetic テストを生成する{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/investigate-zendesk-tickets-with-session-replay" >}}Session Replay で Zendesk チケットを調査する{{< /nextlink >}}
{{< /whatsnext >}}