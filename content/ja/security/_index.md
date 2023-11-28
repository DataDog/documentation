---
aliases:
- /ja/compliance_monitoring
- /ja/cloud_siem
- /ja/security_platform
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance
  tag: リリースノート
  text: Datadog Security の最新リリースをチェック！ (アプリログインが必要です)。
- link: https://www.datadoghq.com/guided-tour/security/
  tag: ガイドツアー
  text: 製品ガイドツアーを見る
- link: /getting_started/cloud_siem
  tag: ドキュメント
  text: Cloud SIEM で脅威の検出を開始
- link: /security/cspm/setup
  tag: ドキュメント
  text: Cloud Security Posture Management で構成ミスの追跡を開始
- link: /security/cloud_workload_security/setup
  tag: Documentation
  text: Cloud Workload Security でカーネルレベルの脅威を解明する
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Datadog の Security Labs ブログでセキュリティ関連のトピックを読む
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: セキュリティと脅威検出を高めるインタラクティブなセッションに参加できます
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: ブログ
  text: Stratus Red Team で AWS の脅威検出を高度化する
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: ブログ
  text: Kubernetes アプリケーションを保護するためのベストプラクティス
- link: https://www.datadoghq.com/blog/securing-cloud-native-infrastructure-network-perimeter/
  tag: ブログ
  text: クラウドネイティブ環境におけるネットワーク境界セキュリティのベストプラクティス
- link: https://www.datadoghq.com/blog/securing-data-in-cloud-native-infrastructure/
  tag: ブログ
  text: クラウドネイティブインフラストラクチャーにおけるデータセキュリティのベストプラクティス
kind: documentation
title: Datadog Security
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
クラウドセキュリティポスチャ管理は、現在 US1-FED では利用できません。
</div>
{{< /site-region >}}

## 概要

実稼働セキュリティ運用にスピードとスケールを。Datadog Security は、リアルタイムの脅威検出と、アプリケーション、ホスト、コンテナ、クラウドインフラストラクチャー全体にわたる継続的なコンフィギュレーション監査を提供します。Datadog の可観測性プラットフォームと組み合わせることで、Datadog Security は、組織の共有目標に沿ったセキュリティと運用の間にかつてないインテグレーションをもたらします。

Datadog Security は、[Application Security Management](#application-security-management)、[Cloud SIEM](#cloud-siem)、[Cloud Security Posture Management (CSPM)](#cloud-security-posture-management)、[クラウドワークロードセキュリティ (CWS)](#cloud-workload-security) を含んでいます。

詳しくは [30 秒製品ガイドツアー](https://www.datadoghq.com/guided-tour/security/)をご覧ください。

## Application Security Management

[Application Security Management][1] (ASM) は、SSRF (Server-Side-Request-Forgery) や SQL インジェクション、Log4Shell、XSS (Reflected Cross-Site-Scripting) など、コードレベルの脆弱性を悪用しようとするアプリケーションレベルの攻撃に対する観測可能性を提供します。ASM は、Datadog [APM][2]、[Datadog Agent][3]、およびアプリ内検出ルールを活用して、アプリケーション環境における脅威を検出します。詳しくは製品[ガイドツアー](https://www.datadoghq.com/guided-tour/security/application-security-management/)をご確認ください。

{{< img src="/security/application_security/app-sec-landing-page.png" alt="攻撃フローとフレームグラフが表示された Datadog のセキュリティシグナルパネル" width="75%">}}

## Cloud SIEM

[Cloud SIEM][4] (Security Information and Event Management) は、標的型攻撃、脅威情報リストに一致する IP 通信、安全でない構成など、アプリケーションやインフラストラクチャーに対する脅威をリアルタイムに検出します。Cloud SIEM は、[Datadog ログ管理][5]を利用しています。これらを組み合わせることで、[Datadog Cloud SIEM で検出した脅威の対処を自動化][6]し、脅威対応のワークフローを加速させることができます。詳しくは専用の[ガイドツアー](https://www.datadoghq.com/guided-tour/security/cloud-siem/)をご確認ください。

{{< img src="security/security_monitoring/cloud_siem_overview.png" alt="Cloud SIEM のホームページには、重要なシグナル、疑わしいアクター、影響を受けるリソース、脅威インテル、シグナルの傾向などのウィジェットを備えた Security Overview セクションが表示されています" width="100%">}}

## Cloud Security Posture Management

[Cloud Security Posture Management (CSPM)][7] は、本番環境のセキュリティ衛生とコンプライアンス状況を追跡し、監査証拠の収集を自動化し、組織が攻撃に対して脆弱な状態にある構成ミスを検出することができます。インフラストラクチャー全体のセキュリティポスチャーのスコアを確認し、各スコアを該当するベンチマークまたはフレームワークの基準にまで遡ることができます。詳しくは専用の[ガイドツアー](https://www.datadoghq.com/guided-tour/security/cloud-security-management/)をご確認ください。

{{< img src="security/cspm_overview.png" alt="Datadog の Cloud Security Posture Management スコア" width="100%">}}

## Cloud Workload Security

[Cloud Workload Security (CWS)][8] は、環境全体のファイルやプロセスの活動を監視し、AWS EC2 インスタンスなどのインフラストラクチャーや Kubernetes クラスターなどのワークロードに対する脅威を、カーネルレベルでリアルタイムに検出します。Cloud Workload Security は、統合された Datadog Agent を使用するため、すでに Datadog を使用して環境を監視している場合、追加のリソースをプロビジョニングする必要はありません。詳しくは専用の[ガイドツアー](https://www.datadoghq.com/guided-tour/security/cloud-security-management/)をご確認ください。

{{< img src="security/cws_overview.png" alt="Datadog における Cloud Workload Security のカバレッジビュー" width="100%">}}

Datadog Security を使い始めるには、Datadog アプリの [Setup & Configuration][9] セクションに移動し、単一構成または複数構成の詳細情報を参照するか、以下のスタートアップセクションに従って、プラットフォームの各エリアの詳細について学びます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/
[2]: /ja/tracing/
[3]: /ja/agent/
[4]: /ja/security/cloud_siem
[5]: /ja/logs/
[6]: https://www.datadoghq.com/blog/automated-vulnerability-remediation-datadog/
[7]: /ja/security/cspm/
[8]: /ja/security/cloud_workload_security/
[9]: https://app.datadoghq.com/security/configuration