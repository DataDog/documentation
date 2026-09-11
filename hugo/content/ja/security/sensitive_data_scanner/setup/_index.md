---
aliases:
- /ja/sensitive_data_scanner/setup
description: Sensitive Data Scannerをセットアップして、テレメトリーデータ、Agent Observabilityトレース、Amazon
  S3クラウドストレージ、およびコードリポジトリにわたって機密データを検出し、マスク処理します。
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/
  tag: ドキュメント
  text: Sensitive Data Scanner
- link: /security/sensitive_data_scanner/scanning_rules/
  tag: ドキュメント
  text: スキャンルールの詳細はこちら
- link: /security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
  tag: ドキュメント
  text: 機密データの検出結果を調査します。
- link: /security/sensitive_data_scanner/guide/create-monitors-for-sensitive-data/
  tag: ドキュメント
  text: 機密データ用のモニターを作成します。
title: Sensitive Data Scannerのセットアップ
---
## 概要 {#overview}

スキャンする各データソースに対してSensitive Data Scannerをセットアップします。各ソースで独自のセットアッププロセスを使用するため、ニーズに関連するソースのみを構成する必要があります。

- **テレメトリーデータ:** ログ、APMスパン、RUMイベント、およびEvent Managementからのイベントをスキャンします。セットアップ手順については、[Telemetry Data][1]を参照してください。ネットワークからログが出る前にスキャンするには、[Sensitive Data Scanner processor for Observability Pipelines][5]を使用してください。
- **Agent Observabilityデータ:** LLMトレース、プロンプト、および補完をスキャンします。[Agent Observability Settings page][3]からスキャンを構成します。
- **クラウドストレージデータ:** Amazon S3バケットをスキャンします。セットアップ手順については、[Cloud Storage][2]を参照してください。
- **コードリポジトリ:** ソースコード内で公開されているシークレットを検出します。セットアップ手順については、[Secret Scanning][4]を参照してください。
- **AI Guard評価:** AI Guardが評価する会話に含まれる、資格情報やPIIなどの機密データを検出します。機密データスキャナー設定ページの[AI Guardタブ][6]から、スキャンルールを設定します。

## 参考文献 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/sensitive_data_scanner/setup/telemetry_data/
[2]: /ja/security/sensitive_data_scanner/setup/cloud_storage/
[3]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[4]: /ja/security/code_security/secret_scanning/
[5]: /ja/observability_pipelines/processors/sensitive_data_scanner
[6]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard