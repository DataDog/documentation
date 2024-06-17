---
aliases:
- /ja/security_platform/application_security/getting_started/
- /ja/security/application_security/getting_started/
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Datadog Application Security Management で脅威から守る
- link: /security/application_security/enabling/compatibility/
  tag: Documentation
  text: プログラミング言語とフレームワークの互換性
- link: /security/application_security/add-user-info/
  tag: Documentation
  text: ユーザーアクティビティの追跡
- link: /security/default_rules/#cat-application-security
  tag: Documentation
  text: すぐに使える Application Security Management ルール
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Application Security Management のトラブルシューティング
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: Datadog における Application Security Management の仕組み
- link: https://www.datadoghq.com/blog/secure-serverless-applications-with-datadog-asm/
  tag: ブログ
  text: Datadog ASM でサーバーレスアプリケーションのセキュリティを強化する
title: ASM の有効化
type: multi-code-lang
---

アプリケーション言語用の Datadog ライブラリを使用して、本番システムを標的とした[脅威の検出と保護][1]、およびコードとそのオープンソース依存関係における[リスク管理][2]を可能にします。サーバー、Docker、Kubernetes、AWS ECS、(対応言語の) AWS Fargate でホストされているアプリの脆弱性と脅威を検出することができます。

{{% appsec-getstarted %}}

{{% appsec-getstarted-with-rc %}}

アプリケーション言語を選択すると、言語とインフラストラクチャーの種類に応じてこれらの手順を実行する方法の詳細が表示されます。

{{< partial name="security-platform/appsec-languages.html" >}}

<br>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/threats/
[2]: /ja/security/application_security/risk_management/