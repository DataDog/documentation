---
title: セキュリティモニタリングの概要
kind: ドキュメント
description: Datadog のセキュリティモニタリングに関する主なコンセプトおよび脅威検出を有効にする方法、そして革新的な脅威検出ルールについて学びます。
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-runtime-security/'
    tag: ブログ
    text: Datadog ランタイムセキュリティでインフラストラクチャーを保護する
---
Datadog セキュリティモニタリングを開始するには、次の手順に従います。

* [ログの取り込み](#ingest-logs)
* [検出ルールをレビュー](#review-detection-rules)
* [セキュリティシグナルを探索](#explore-security-signals)

## ログの取り込み

すでにロギングソースがある場合は、[アプリ内のオンボーディング][1]に従い、そのソースからログの収集を始めます。

Datadog の[ログ収集ドキュメント][2]には、さまざまなソースから Datadog へログを収集するための詳細が記載されています。取り込まれたログは、まずパースされて強化されます。そして検出ルールがリアルタイムですべての処理済みログに適用され、全ログデータをインデックス化する際に生じていた従来のパフォーマンス問題やコスト面での懸念などは一切なしで、検知可能なカバレッジを純粋に広げることができます。[Datadog の Logging without Limits™ に関する詳細は、こちらをご覧ください][3]。 

{{< img src="security_monitoring/getting_started/ingest_logs_overview.png" alt="ログの取り込み" >}}

## 検出ルールをレビュー

Datadog は、環境の脅威をすばやく検出する革新的な[検出ルール][4]を採用しています。デフォルトでは、ベストプラクティスに応じて脅威を検出する検出ルールが有効になっています。より高度なセキュリティを必要とする組織では、より高度な脅威を検出するさらなるルールを有効にすることができます。さらに、カスタムアプリケーションで脅威を検出する方法を示す詳細テンプレートも含まれています。詳細は、[検出ルールドキュメント][5]を参照してください。

## セキュリティシグナルを探索

検出ルールに基づき脅威が検出されると、セキュリティシグナルが生成されます。セキュリティシグナルは、[セキュリティシグナルエクスプローラー][6]で関連付けされトリアージされます。詳細は、[セキュリティシグナルエクスプローラー][7]ドキュメントをご参照ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/onboarding
[2]: /ja/logs/log_collection/
[3]: https://www.datadoghq.com/blog/logging-without-limits/
[4]: /ja/security_monitoring/default_rules/
[5]: /ja/security_monitoring/detection_rules/
[6]: https://app.datadoghq.com/security
[7]: /ja/security_monitoring/explorer/