---
aliases:
- /ja/security_platform/application_security
description: 分散型トレースにより提供された実行コンテキストを利用して、実稼働システムをターゲットとした脅威を監視します。
further_reading:
- link: /security/application_security/how-appsec-works/
  tag: ドキュメント
  text: Application Security Management の仕組み
- link: /security/application_security/threats/
  tag: ドキュメント
  text: Threat Monitoring and Protection
- link: /security/application_security/risk_management/
  tag: ドキュメント
  text: Application Vulnerability Management
- link: /security/application_security/enabling/#compatibility
  tag: ドキュメント
  text: 言語およびフレームワークの互換性に関する詳細
- link: https://www.datadoghq.com/product/security-platform/application-security-monitoring/
  tag: 製品ページ
  text: Datadog の Application Security Management
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: ブログ
  text: Datadog アプリケーションセキュリティのご紹介
- link: https://www.datadoghq.com/blog/secure-serverless-applications-with-datadog-asm/
  tag: ブログ
  text: Datadog ASM でサーバーレスアプリケーションのセキュリティを強化する
- link: https://www.datadoghq.com/blog/securing-cloud-native-applications/
  tag: ブログ
  text: クラウドネイティブ環境におけるアプリケーションセキュリティのベストプラクティス
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: ブログ
  text: APM セキュリティビューでリスク、脆弱性、攻撃を可視化する
- link: https://www.datadoghq.com/blog/block-attackers-application-security-management-datadog/
  tag: ブログ
  text: Datadog Application Security Management でアプリや API の攻撃者をブロックする
kind: documentation
title: Application Security Management
---

{{< img src="/security/application_security/app-sec-landing-page.png" alt="攻撃フローとフレームグラフが表示された Datadog のセキュリティシグナルパネル" width="75%">}}

Datadog Application Security Management (ASM) は、サーバーサイドリクエストフォージェリー (SSRF)、SQL インジェクション、Log4Shell、反射型クロスサイトスクリプティング (XSS) など、コードレベルの脆弱性を悪用しようとするアプリケーションレベルの攻撃に対する保護機能を提供します。サーバー、Docker、Kubernetes、AWS ECS、AWS Fargate (対応言語の場合のみ) で直接ホストされたアプリを監視・保護することができます。

ASM では、Datadog の[トレーシングライブラリ][1]と [Datadog Agent][2] を利用してアプリケーション攻撃にさらされているサービスを特定します。構成が完了すると、アプリ内検出ルールを利用してアプリケーション環境の脅威を検出して保護を行い、実稼働システムに影響を与える攻撃やコードによる脆弱性が発生した場合にはシグナルをトリガーします。

脅威が検出されると、Datadog でセキュリティシグナルが生成されます。重大度が `HIGH` または `CRITICAL` のセキュリティシグナルの場合、Slack、メール、または PagerDuty に通知を送信してチームに伝え、脅威に関するリアルタイムのコンテキストを提供することが可能です。

セキュリティシグナルがトリガーされたら、即座に Datadog へ移動して調査と保護を行います。ASM および APM 分散型トレーシングにより提供された詳しい観測データを 1 か所で確認しながら、アプリケーションの問題を解決します。攻撃フローの分析、フレームグラフの表示、関連するトレースおよびログデータの確認により、アプリケーションの脆弱性を特定します。アプリケーションのデータから修復・緩和手順まで、すべてを同じパネル内でスムーズに行えるため、異なるコンテキスト間を移動する手間を省けます。

ASM を使用すると、継続的なトレースデータからノイズを取り除き、環境の安全と保護のみに集中できます。

ASM ならワンクリックで攻撃者の IP を一時的または永久にブロックでき、アプリケーションコード内の潜在的な脆弱性を完全に緩和できるまで攻撃を遅らせることができます。ワンクリックブロッキングはベータ版です。

## Datadog に実装されたアプリケーションセキュリティの仕組みの理解

Application Security Management がどのように構成され、トレースデータをどのように使用してセキュリティ問題を特定するのかに興味がある方は、[Application Security Management の仕組み][3]をご覧ください。

## 環境を構成する

[独自の規則][4]を利用する ASM なら、手動でコンフィギュレーションをせずに脅威を検出できます。すでに Datadog [APM][1] を物理ホストまたは仮想ホストにすでに構成している場合、環境変数を 1 つ設定するだけですぐに開始できます。

環境を構成し、ASM で脅威の検出と保護を開始するには、[有効化のドキュメント][5]の手順に従います。ASM の構成が完了すると、[セキュリティシグナルエクスプローラー][6]でセキュリティシグナルの調査およびその修復を開始できます。

## セキュリティシグナルの調査と修復

[セキュリティシグナルエクスプローラー][6]でセキュリティシグナルをクリックすると、その概要と攻撃緩和の推奨手順を確認できます。同じパネル内で、その関連する攻撃フローがわかるトレースの表示や、さらにコンテキストを取得するための情報をリクエストすることができます。

## アップストリームのオープンソースライブラリや依存関係に潜むリスクの調査

<div class="alert alert-info">Application Vulnerability Management はベータ版です。</a></div>

[Application Vulnerability Management][8] は、既知の脆弱性を持つオープンソースライブラリを使用または依存することで、サービスがリスクにさらされる場合を示しています。発見された脆弱性を調査し、修正アドバイスに従うか、脆弱性の原因を調査することで、ソフトウェアの安全性を確保します。

## 次のステップ

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/
[2]: /ja/agent/
[3]: /ja/security/application_security/how-appsec-works/
[4]: /ja/security/default_rules/#cat-application-security
[5]: /ja/security/application_security/enabling/
[6]: /ja/security/explorer/
[7]: https://dashcon.io/appsec
[8]: /ja/security/application_security/risk_management/