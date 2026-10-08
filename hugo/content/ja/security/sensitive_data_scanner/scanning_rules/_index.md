---
aliases:
- /ja/sensitive_data_scanner/scanning_rules
description: Sensitive Data Scanner が、テレメトリやクラウドストレージに対して、あらかじめ定義されたライブラリルールやカスタム正規表現ルールを使用して、どのように機密データを照合するかを説明します。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: ブログ
  text: Sensitive Data Scanner の ML を使用してログ内の人名を検出する
- link: https://www.datadoghq.com/blog/cloudcraft-security/
  tag: ブログ
  text: Cloudcraft を使用して、セキュリティリスクを視覚的に特定し、優先順位を付ける
title: 機密データのスキャンルール
---
## テレメトリデータ{#telemetry-data}
テレメトリデータ用の Sensitive Data Scanner は、スキャンルールを使用して、データ内のどの機密情報を照合するかを決定します。このデータは、アプリケーションログ、APM スパン、RUM イベント、および Event Management からのイベントである可能性があります。Datadog の[スキャンルールライブラリ][1]を使用してルールを作成するか、[カスタムルール][2]を作成することができます。

Datadog のスキャンルールライブラリには、メールアドレス、クレジットカード番号、API キー、認可トークン、ネットワークおよびデバイス情報など、一般的なパターンを検出する、あらかじめ定義されたスキャンルールが含まれています。詳細については、[ライブラリルール][1]を参照してください。

また、正規表現 (regex) パターンを使用してカスタムスキャンルールを作成して、照合したい機密情報を定義することもできます。詳細については、[カスタムルール][2] を参照してください。

## クラウドストレージ{#cloud-storage}

クラウドストレージ用の Sensitive Data Scanner も、スキャンルールを使用して、データ内のどの機密情報を照合するかを決定します。Datadog スキャンライブラリのすべてのルールが適用され、編集することはできません。詳細については、[ライブラリルール][1]を参照してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/sensitive_data_scanner/scanning_rules/library_rules/
[2]: /ja/security/sensitive_data_scanner/scanning_rules/custom_rules/