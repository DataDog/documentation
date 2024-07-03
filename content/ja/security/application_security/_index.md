---
aliases:
- /ja/security_platform/application_security
description: Monitor threats targeting production system, leveraging the execution
  context provided by distributed traces.
further_reading:
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: How Application Security Management Works
- link: /security/application_security/threats/
  tag: Documentation
  text: Threat Management
- link: /security/application_security/software_composition_analysis/
  tag: Documentation
  text: Software Composition Analysis
- link: /security/application_security/enabling/#compatibility
  tag: Documentation
  text: Learn more about language and framework compatibility
- link: https://www.datadoghq.com/product/security-platform/application-security-monitoring/
  tag: Product Page
  text: Datadog Application Security Management
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: Blog
  text: Introducing Datadog Application Security
- link: https://www.datadoghq.com/blog/secure-serverless-applications-with-datadog-asm/
  tag: Blog
  text: Secure serverless applications with Datadog ASM
- link: https://www.datadoghq.com/blog/securing-cloud-native-applications/
  tag: Blog
  text: Best practices for application security in cloud-native environments
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Gain visibility into risks, vulnerabilities, and attacks with APM Security
    View
- link: https://www.datadoghq.com/blog/block-attackers-application-security-management-datadog/
  tag: Blog
  text: Block attackers in your apps and APIs with Datadog Application Security Management
- link: https://www.datadoghq.com/blog/threat-modeling-datadog-application-security-management/
  tag: Blog
  text: Threat modeling with Datadog Application Security Management
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: ブログ
  text: Monitor AWS WAF activity with Datadog
title: Application Security Management
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Application Security Management はサポートされていません。</div>
{{< /site-region >}}

{{< img src="/security/application_security/app-sec-landing-page.png" alt="攻撃フローとフレームグラフが表示された Datadog のセキュリティシグナルパネル" width="75%">}}

Datadog Application Security Management (ASM) は、サーバーサイドリクエストフォージェリー (SSRF)、SQL インジェクション、Log4Shell、反射型クロスサイトスクリプティング (XSS) など、コードレベルの脆弱性を悪用しようとするアプリケーションレベルの攻撃に対する保護を提供します。サーバー、Docker、Kubernetes、Amazon ECS、AWS Fargate (対応言語の場合のみ) で直接ホストされたアプリを監視・保護することができます。

ASM では、Datadog の[トレーシングライブラリ][1]と [Datadog Agent][2] を利用してアプリケーション攻撃にさらされているサービスを特定します。構成が完了すると、アプリ内検出ルールを利用してアプリケーション環境の脅威を検出して保護を行い、実稼働システムに影響を与える攻撃やコードによる脆弱性が発生した場合にはシグナルをトリガーします。

脅威が検出されると、Datadog でセキュリティシグナルが生成されます。重大度が `HIGH` または `CRITICAL` のセキュリティシグナルの場合、Slack、メール、または PagerDuty に通知を送信してチームに伝え、脅威に関するリアルタイムのコンテキストを提供することが可能です。

セキュリティシグナルがトリガーされたら、即座に Datadog へ移動して調査と保護を行います。ASM および APM 分散型トレーシングにより提供された詳しい観測データを 1 か所で確認しながら、アプリケーションの問題を解決します。攻撃フローの分析、フレームグラフの表示、関連するトレースおよびログデータの確認により、アプリケーションの脆弱性を特定します。アプリケーションのデータから修復・緩和手順まで、すべてを同じパネル内でスムーズに行えるため、異なるコンテキスト間を移動する手間を省けます。

ASM を使用すると、継続的なトレースデータからノイズを取り除き、環境の安全と保護のみに集中できます。

ASM ならワンクリックで攻撃者の IP を一時的または永久にブロックでき、アプリケーションコード内の潜在的な脆弱性を完全に緩和できるまで攻撃を遅らせることができます。

## Datadog に実装されたアプリケーションセキュリティの仕組みの理解

Application Security Management がどのように構成され、トレースデータをどのように使用してセキュリティ問題を特定するのかに興味がある方は、[Application Security Management の仕組み][3]をご覧ください。

## 環境を構成する

[独自の規則][4]を利用する ASM なら、手動でコンフィギュレーションをせずに脅威を検出できます。すでに Datadog [APM][1] を物理ホストまたは仮想ホストにすでに構成している場合、環境変数を 1 つ設定するだけですぐに開始できます。

環境を構成し、ASM で脅威の検出と保護を開始するには、[有効化のドキュメント][5]の手順に従います。ASM の構成が完了すると、[セキュリティシグナルエクスプローラー][6]でセキュリティシグナルの調査およびその修復を開始できます。

## セキュリティシグナルの調査と修復

[セキュリティシグナルエクスプローラー][6]でセキュリティシグナルをクリックすると、その概要と攻撃緩和の推奨手順を確認できます。同じパネル内で、その関連する攻撃フローがわかるトレースの表示や、さらにコンテキストを取得するための情報をリクエストすることができます。

## アップストリームのオープンソースライブラリや依存関係に潜むリスクの調査

[Software Composition Analysis (SCA)][8] は、サービスが、既知の脆弱性を持つオープンソースライブラリを使用している、またはそれに依存しているためにリスクにさらされている場合を示します。脆弱性の発見について調査し、修正アドバイスに従ったり、脆弱性の原因を研究したりすることで、ソフトウェアを安全に保護します。

## 次のステップ

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/
[2]: /ja/agent/
[3]: /ja/security/application_security/how-appsec-works/
[4]: /ja/security/default_rules/?category=cat-application-security
[5]: /ja/security/application_security/enabling/
[6]: https://app.datadoghq.com/security
[7]: https://dashcon.io/appsec
[8]: /ja/security/application_security/software_composition_analysis/