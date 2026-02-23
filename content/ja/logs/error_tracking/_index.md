---
description: ログ管理のエラー追跡について説明します。
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: GitHub
  text: Datadog Error Tracking で、アプリケーションの問題を解明
- link: https://www.datadoghq.com/blog/error-tracking-logs/
  tag: ブログ
  text: Datadog Error Tracking でログのエラーを追跡し、トリアージする
- link: /logs/error_tracking/explorer
  tag: ドキュメント
  text: エラートラッキングエクスプローラーについて
- link: /monitors/types/error_tracking/
  tag: ドキュメント
  text: エラー追跡モニターを作成する
is_beta: true
title: ログのエラー追跡
---

## 概要

{{< img src="error_tracking/error-tracking-overview-2.png" alt="エラートラッキングエクスプローラーの問題の詳細画面" style="width:100%;" >}}

{{% error-tracking-description %}}

Error Tracking の主な機能は、[Error Tracking Explorer][3] のドキュメントで確認することができます。Datadog でログ用の Error Tracking Explorer を表示するには、[**Error Tracking**][1] に移動します。

## セットアップ

ログのエラー追跡は、適切に構成されたエラーログをスタックトレースとともに処理します。

{{< whatsnext desc="ログの Datadog エラー追跡を使い始めるには、お使いのフレームワークの対応ドキュメントをご覧ください。" >}}
    {{< nextlink href="logs/error_tracking/browser_and_mobile" >}}ブラウザとモバイル{{< /nextlink >}}
    {{< nextlink href="logs/error_tracking/backend" >}}バックエンド{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking
[2]: /ja/logs/log_collection
[3]: /ja/error_tracking/explorer