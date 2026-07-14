---
aliases:
- /ja/sensitive_data_scanner/setup
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/scanning_rules/
  tag: ドキュメント
  text: スキャンルールについて詳しく学ぶ
title: セットアップ
---
## 概要 {#overview}

Sensitive Data Scannerを設定して、次のものをスキャンします：

- テレメトリデータをスキャンし、ログ、APMスパン、RUMイベント、及びEvent Managementのイベントに含まれるセンシティブデータを特定できるようにします。手順については、[テレメトリデータの設定][1]を参照してください。
- Agent Observabilityデータをスキャンし、LLMトレース、プロンプト、completionsに含まれるセンシティブデータを特定できるようにします。スキャンを設定するには、[Agent Observability Settings page][3]に移動してください。
- クラウドストレージデータをスキャンし、Amazon S3バケットにおけるセンシティブデータを特定できるようにします。手順については、[クラウドストレージの設定][2]を参照してください。
- コードリポジトリをスキャンし、ソースコードにおける漏洩したシークレットを検出できるようにします。手順については、[Secret Scanning][4]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/sensitive_data_scanner/setup/telemetry_data/
[2]: /ja/security/sensitive_data_scanner/setup/cloud_storage/
[3]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[4]: /ja/security/code_security/secret_scanning/