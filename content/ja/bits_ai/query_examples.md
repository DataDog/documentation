---
disable_toc: false
further_reading:
- link: bits_ai/
  tag: ドキュメント
  text: Bits AI 概要
- link: bits_ai/getting_started
  tag: ドキュメント
  text: Bits AI の使用を開始する
- link: bits_ai/managing_incidents/"
  tag: ドキュメント
  text: インシデントの管理
title: 自然言語クエリの例
---

## 概要

{{&lt; beta-callout url="https://docs.google.com/forms/d/e/1FAIpQLSfBuPfdyhgqjjduDYpOM5twJdkdDnTTxJdCCWonauaBxWTCnQ/viewform" &gt;}}自然言語クエリは、非公開ベータ版です。このフォームに記入して、ウェイトリストにご登録ください。{{&lt; /beta-callout &gt;}}

Bits AI は、サービスの健全性と所有権に関する自然言語クエリを可能にし、関連する Datadog リソースの取得を可能にします。オンコール担当者、ダッシュボード、サービスステータス、依存関係について自然言語で質問をすることができます。このガイドでは、以下のクエリ例を紹介します。
- [ログ](#logs)
- [APM トレース](#apm-traces)
- [インフラストラクチャーデータ (DDSQL エディター)](#infrastructure-data-ddsql-editor)
- [クラウドコスト](#cloud-cost)
- [RUM](#rum)

## Logs

`Find errors in AWS CloudTrail where a user is assuming a different user's role` (他のユーザーのロールを引き受けたユーザーに関連する AWS CloudTrail のエラーを見つけてください)
{{< img src="bits_ai/query_examples/cloudtrail-user-role-errors.png" alt="ユーザーロールの変更に関するクエリ結果" style="width:90%;">}}

`Create a pie chart of error logs by service` (サービスごとのエラーログの円グラフを作成してください)
{{< img src="bits_ai/query_examples/logs-pie-chart.png" alt="サービスごとのエラーログの円グラフのクエリ結果" style="width:90%;">}}

`Show me patterns of errors for users checking out` (ユーザーのチェックアウトエラーのパターンを示してください)
{{< img src="bits_ai/query_examples/checkout-error-patterns.png" alt="ユーザーチェックアウトエラーのクエリ結果" style="width:90%;">}}

## APM トレース

`Show me traces for web-store that are slower than 1s` (web-store の 1 秒以上の遅いトレースを示してください)
{{< img src="bits_ai/query_examples/slow-web-store-traces.png" alt="遅いトレースのクエリ結果" style="width:90%;">}}

## インフラストラクチャーデータ (DDSQL エディター) 

<div class="alert alert-info">Bits AI には、非公開ベータ版の [DDSQL エディター][1]へのアクセスが含まれます。</div>

Most Common Instance Types (最も一般的なインスタンスタイプ)
{{< img src="ddsql_editor/query-ui-overview.png" alt="最も一般的なインスタンスタイプのクエリ結果" style="width:90%;">}}

DDSQL エディターでインフラストラクチャーリソースデータをクエリする方法の詳細については、この[ページ][2]を参照してください。

## クラウドコスト

`Show me how much each team spends on the web-store service` (web-store サービスに各チームが費やした金額を示してください)
{{< img src="bits_ai/query_examples/web-store-spend-by-team.png" alt="チームごとのサービス支出のクエリ結果" style="width:90%;">}}

`AWS products with >5% increase in costs` (コストが 5% 以上増加した AWS プロダクト)
{{< img src="bits_ai/query_examples/aws-product-cost-increase.png" alt="コストが増加した AWS プロダクトのクエリ結果" style="width:90%;">}}

## RUM

`Crashes in the iOS app over the past 1 week` (過去 1 週間の iOS アプリのクラッシュ)
{{< img src="bits_ai/query_examples/rum_ios_crashes_query.png" alt="iOS アプリのクラッシュのクエリ結果" style="width:90%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ddsql/editor
[2]: https://docs.datadoghq.com/ja/ddsql_editor/