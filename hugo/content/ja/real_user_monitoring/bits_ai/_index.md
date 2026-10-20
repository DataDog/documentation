---
aliases:
- /ja/real_user_monitoring/ai_investigations/
description: RUM の Bits Investigation と Bits Chat を使用して、アプリケーションのパフォーマンスを最適化し、回帰の根本原因を特定し、フロントエンドに関する質問を行います。
further_reading:
- link: /bits_ai/bits_investigation/
  tag: ドキュメント
  text: Bits Investigation
- link: /bits_ai/bits_chat/
  tag: ドキュメント
  text: Bits Chat
- link: /real_user_monitoring/operations_monitoring/
  tag: ドキュメント
  text: オペレーションモニタリング
title: RUM における Bits
---
## 概要 {#overview}

Real User Monitoring (RUM) は [Bits AI][1] と統合されています。RUM から [Bits Investigation][2] を開始し、任意の RUM ページで [Bits Chat][3] を使用できます。RUM は、Core Web Vitals、ビュー読み込みタイムライン、操作の健全性、セッションレベルのシグナルなど、フロントエンド固有のコンテキストを Bits に提供します。Bits はそのコンテキストを、APM トレース、ログ、プロファイル、ソースコードなどの他のテレメトリと関連付けて、根本原因を特定します。

これらの調査は Bits Investigation 上で実行されるため、RUM から開始したすべての調査は [Bits Investigation リスト][4] に保存され、チームと共有することができ、過去のフィードバックが考慮され、[Bits Code][5] に送信して修正を生成することができます。

RUM の Bits は、次の 3 つの方法で使用できます。

| ユースケース | 説明 | Bits の機能 |
|---|---|---|
| [パフォーマンスの最適化][6] | アプリケーションのパフォーマンスに影響を与える可能性のある問題に関する推奨事項を取得し、それらについて調査を開始します。| Bits Investigation |
| [回帰とアラートを調査する][7] | パフォーマンスメトリクスの異常を調査するか、アラートモニターで自動調査を有効にします。| Bits Investigation |
| [質問とタスクの実行][8] | RUM ページのどこからでも `Why is this view slow?` や `Which pages have the worst INP?` のような質問を行い、Bits に代行させることができます。| Bits Chat |

## 前提条件 {#prerequisites}

- 組織で Bits AI が有効になっている必要があります。
- Bits Investigation を開始するには、**Bits Investigations Write** 権限が必要です。詳細については、[Bits Investigation を構成する][9]を参照してください。
- コードレベルの検出結果を取得するには、GitHub で [ソースコードインテグレーション][10]を設定してください。
- Bits がフロントエンドの問題をバックエンドサービスに起因するものとして特定できるようにするには、[RUM と APM トレースを関連付ける][11]必要があります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/bits_ai/
[2]: /ja/bits_ai/bits_investigation/
[3]: /ja/bits_ai/bits_chat/
[4]: https://app.datadoghq.com/bits-ai/investigations
[5]: /ja/bits_ai/bits_code/
[6]: /ja/real_user_monitoring/bits_ai/optimize_performance/
[7]: /ja/real_user_monitoring/bits_ai/investigate_regressions/
[8]: /ja/real_user_monitoring/bits_ai/bits_chat/
[9]: /ja/bits_ai/bits_investigation/configure/
[10]: /ja/source_code/
[11]: /ja/real_user_monitoring/correlate_with_other_telemetry/apm/