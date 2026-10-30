---
aliases:
- /ja/synthetics/faq/uptime-check-internal-website/
cascade:
  algolia:
    category: Guide
    rank: 20
    subcategory: Synthetic Monitoring Guides
disable_toc: true
private: true
title: Synthetic Monitoring ガイド
---
{{< whatsnext desc="一般的なガイド:" >}}
    {{< nextlink href="synthetics/guide/identify_synthetics_bots/" >}}Synthetic ボットの特定{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/clone-test" >}}Synthetic テストの複製{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/otp-email-synthetics-test" >}}Synthetic ブラウザテストを使用してメール本文からワンタイムパスコードを抽出する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/version_history" >}}Synthetic Monitoring のバージョン履歴{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/kerberos-authentication/" >}}Synthetic Monitoring の Kerberos 認証{{< /nextlink >}}
     {{< nextlink href="synthetics/guide/step-duration/" >}}ブラウザテストにおけるステップ実行時間の決定方法{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/export-tests-to-terraform" >}}Synthetic テストを Terraform にエクスポートする{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Alerting:" >}}
    {{< nextlink href="monitors/types/synthetic_monitoring/" >}}Synthetic テストモニターを使用する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/synthetic-test-retries-monitor-status/" >}}Synthetic テストの再試行がモニターのステータスをどのように決定するかを理解する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/uptime-percentage-widget" >}}SLO を使用してウェブサイトのアップタイムを監視する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/how-synthetics-monitors-trigger-alerts" >}}Synthetic モニターがどのようにアラートをトリガーするかを理解する{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="API:" >}}
    {{< nextlink href="synthetics/guide/create-api-test-with-the-api" >}}API を使用して API テストを作成する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/manage-browser-tests-through-the-api/" >}}ブラウザテストをプログラムで管理する{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="ベストプラクティス:" >}}
    {{< nextlink href="synthetics/guide/synthetic-tests-caching" >}}Synthetic テストでキャッシュの問題を回避する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/monitor-https-redirection" >}}HTTP リクエストが HTTPS にリダイレクトされることを監視する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/reusing-browser-test-journeys/" >}}テストスイートでブラウザテストジャーニーを再利用する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/conditional-logic-subtests/" >}}Synthetic テストで条件付きロジックを実装する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/custom-javascript-assertion/" >}}ブラウザテストでカスタム JavaScript アサーションを使用する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/email-validation/" >}}ブラウザテストでメール検証を使用する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/testing-file-upload-and-download/" >}}テストファイルのアップロードとダウンロード{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/popup/" >}}ブラウザテストでポップアップを処理する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/recording-custom-user-agent/" >}}カスタムユーザーエージェントで手順を記録{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/manually-adding-chrome-extension/" >}}ブラウザテスト用に Chrome 拡張機能を手動で追加する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/browser-tests-using-shadow-dom/" >}}Shadow DOM を使用するアプリケーションでテストを実行する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/http-tests-with-hmac/" >}}ハッシュベースのメッセージ認証コード (HMAC) 認証を使用して HTTP テストを作成する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/canvas-content-javascript/" >}}JavaScript を使用してキャンバスコンテンツをアサートする{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Datadog Integrations:" >}}
    {{< nextlink href="logs/guide/ease-troubleshooting-with-cross-product-correlation" >}}クロスプロダクト相関で容易にトラブルシューティング{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/explore-rum-through-synthetics/" >}}Synthetic Monitoring で RUM 機能のプレビューを確認する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/rum-to-synthetics" >}}Session Replay から Synthetic テストを生成する{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="メトリクス:" >}}
    {{< nextlink href="synthetics/guide/monitor-usage/" >}}推定使用量メトリクスを使用する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/using-synthetic-metrics/" >}}Synthetic メトリクスをモニターで使用する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/api_test_timing_variations/" >}}API テストのタイミングとトラブルシュートのバリエーションを理解する{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Security:" >}}
    {{< nextlink href="synthetics/guide/authentication-protocols/" >}}API テストおよびマルチステップ API テストで認証を使用する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/browser-tests-totp/" >}}ブラウザテストで多要素認証 (MFA) に時間ベースのワンタイムパスワード (TOTP) を使用する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/browser-tests-passkeys/" >}}ブラウザテストでパスキー (FIDO2) を使用する{{< /nextlink >}}
    {{< nextlink href="synthetics/guide/mobile-test-auth-tokens/" >}}モバイルアプリケーションテストで認証トークンを挿入し、自動更新する{{< /nextlink >}}
{{< /whatsnext >}}