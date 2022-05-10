---
description: 分散型トレースにより提供された実行コンテキストを利用して、実稼働システムをターゲットとした脅威を監視します。
disable_sidebar: true
further_reading:
- link: /security_platform/application_security/setup_and_configure/#compatibility
  tag: ドキュメント
  text: 言語およびフレームワークの互換性に関する詳細
- link: https://www.datadoghq.com/blog/datadog-application-security/
  tag: ブログ
  text: Datadog アプリケーションセキュリティのご紹介
- link: /security_platform/guide/how-appsec-works/
  tag: ドキュメント
  text: Datadog におけるアプリケーションセキュリティモニタリングの仕組み
- link: https://www.datadoghq.com/product/security-platform/application-security-monitoring/
  tag: 製品ページ
  text: Datadog Application Security Monitoring
kind: documentation
title: アプリケーションセキュリティモニタリング
---

{{< img src="/security_platform/application_security/app-sec-landing-page.png" alt="攻撃のフローおよびフレームグラフを表示する、Datadog のセキュリティシグナルパネル" width="75%">}}

Datadog アプリケーションセキュリティモニタリング (ASM) は、Server-Side-Request-Forgery (SSRF)、SQL インジェクション、Log4Shell、Reflected Cross-Site-Scripting (XSS) などのコードレベルの脆弱性を悪用しようとするアプリケーションレベルの攻撃に対する観測可能性を提供します。Docker、Kubernetes、AWS ECS、(対応言語の場合) AWS Fargate で動作するアプリのアプリケーションセキュリティを監視することができます。

ASM では、Datadog の[トレーシングライブラリ][1]、[Datadog Agent][2]、そしてアプリ内検出ルールを利用してアプリケーション環境の脅威を検出し、実稼働システムを対象とした攻撃やコードによる脆弱性が発生した場合にシグナルをトリガーします。

脅威が検出されると、Datadog でセキュリティシグナルが生成されます。重大度が `HIGH` または `CRITICAL` のセキュリティシグナルの場合、Slack、メール、または PagerDuty に通知を送信してチームに伝え、脅威に関するリアルタイムのコンテキストを提供することが可能です。

シグナルがトリガーされたら、即座に Datadog へ移動して調査をします。ASM および APM 分散型トレーシングにより提供された詳しい観測データを 1 か所で確認しながら、アプリケーションの問題を解決します。攻撃フローの分析、フレームグラフの表示、関連するトレースおよびログデータの確認により、アプリケーションの脆弱性を特定します。アプリケーションのデータから修復手順まで、すべてを同じパネル内でスムーズに行えるため、異なるコンテキスト間を移動する手間を省けます。

ASM を使用すると、継続的なトレースデータからノイズを取り除き、環境の安全と保護のみに集中できます。

## 環境を構成する

[独自の規則][3]を利用する ASM なら、手動でコンフィギュレーションをせずに脅威を検出できます。すでに Datadog [APM][1] をご使用の場合は、環境変数を 1 つ設定するだけですぐに開始できます。

環境を構成し、ASM で脅威の検出を開始するには、『[はじめに][4]』のドキュメントの手順に従います。ASM の構成が完了すると、[セキュリティシグナルエクスプローラー][5]でセキュリティシグナルの調査およびその修復を開始できます。

## セキュリティシグナルの調査と修復

[セキュリティシグナルエクスプローラー][5]でセキュリティシグナルをクリックすると、その概要と問題修復の推奨手順を確認できます。同じパネル内で、その関連する攻撃フローが分かるトレースの表示や、さらにコンテキストを取得するための情報をリクエストすることができます。

## 次のステップ

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/
[2]: /ja/agent/
[3]: /ja/security_platform/default_rules/#cat-application-security
[4]: /ja/security_platform/application_security/getting_started/
[5]: /ja/security_platform/explorer/