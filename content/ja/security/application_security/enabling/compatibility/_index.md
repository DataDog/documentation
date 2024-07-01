---
further_reading:
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Application Security Management のトラブルシューティング
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: Datadog における Application Security Management の仕組み
title: 互換性要件
type: multi-code-lang
---

各言語のトレーシングライブラリに対して、以下の ASM 機能をサポートしています。


| ASM の機能                   | Java | .NET | Node.js | Python | Go | Ruby | PHP |
| -------------------------------- | ----------------------------------|----------------------------|----------------------------|----------------------------|----------------------------|----------------------------|----------------------------|
| Threat Detection| 1.8.0 | 2.23.0 | 3.13.1 | 1.9.0   | 1.47.0  | 1.9.0| 0.84.0 |
| Threat Protection | 1.9.0 | 2.26.0 | 3.19.0| 1.10.0  |  v1.50.0|  1.11.0    | 0.86.0   |
| オープンソースソフトウェア (OSS) の脆弱性管理  | 1.1.4 | 2.16.0 |Node.js 12+ の場合は 2.23.0、Node.js 14+ の場合は 3.10.0 | 1.5.0 | 非対応| 非対応| 非対応|
| コードレベルの脆弱性管理 (ベータ版)   |1.15.0| 非公開ベータ版 | NodeJS 12+ の場合は 2.32.0、NodeJS 14+ の場合は 3.19.0 | 非公開ベータ版 | 非対応<br/>| 非対応| 非対応|


フレームワークの互換性と機能サポートの詳細については、アプリケーションの言語を選択してください。

{{< partial name="security-platform/appsec-languages.html" >}}

<br>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}