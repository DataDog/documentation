---
aliases:
- /ja/security/security_monitoring/getting_started/
further_reading:
- link: /security/application_security/terms
  tag: Documentation
  text: Application Security の用語と概念
- link: /security/application_security/how-appsec-works
  tag: Documentation
  text: Application Security Management の仕組み
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: セキュリティと脅威検出を高めるインタラクティブなセッションに参加できます
- link: /getting_started/application_security/software_composition_analysis
  tag: ガイド
  text: Software Composition Analysis を始める
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Datadog のセキュリティリサーチ、レポート、ヒント、ビデオ
title: Application Security Management を始める
---

## 概要

Datadog Application Security Management (ASM) は、本番環境における Web アプリケーションや API の安全性を確保します。ASM は、サービス内のアプリケーションレベルの脆弱性を視覚化し、これらの脆弱性を悪用しようとする攻撃や攻撃者からリアルタイムで保護します。

このガイドでは、ASM の導入と運用のためのベストプラクティスを説明します。

## セキュリティリスクのあるサービスの特定


ASM を活用できる、**攻撃に対して脆弱なサービスまたは攻撃にさらされているサービスを特定します**。[**Service Catalog > Security ページ**][1]で、有効にしたいサービスを表示して選択します。

{{< img src="getting_started/appsec/ASM_activation_service_selection_v2.png" alt="Vulnerabilities を表示し、Suspicious requests 列でソートされた ASM Services ページビュー。" style="width:100%;" >}}

これらのセキュリティに関する洞察は、APM によって報告されたデータから検出されます。このインサイトは、セキュリティ対策に優先順位をつけるのに役立ちます。ASM は、サービス上のすべてのセキュリティリスクを特定し、優先順位を付け、修復を支援します。

**注**: 脆弱性や不審なリクエストが報告されない場合、サービスが最新の Datadog トレーシングライブラリのバージョンを使用していることを確認してください。[Security Service Catalog][2] から、任意のサービスのサイドパネルを開き、その **Tracing Configuration** を見てください。


{{< img src="getting_started/appsec/ASM_Tracing_Configuration.png" alt="APM Service Catalog ページビューの Tracer Configuration タブ。Datadog Agent、Datadog トレーシングライブラリのどのバージョンがサービスで使用されているかをハイライトしています。" style="width:100%;" >}}


## ASM の有効化

### アプリ内の指示で ASM を有効化

[ASM ランディングページ][18]で、指示に従ってセットアップを開始します。これには以下が含まれます。
- ASM が有効であると思われるサービスの選定を指導します。
- 環境変数で Datadog トレーシングライブラリを構成します。
- サービスを再起動します。</br>

1. **Get Started with ASM** をクリックします。
2. オープンソースライブラリの脆弱性を検出する (Software Composition Analysis)、コードレベルの脆弱性を検出して修正する (Code Security)、サービスの脅威検出を発見して有効化する (Threat Management) ためには、**Get Started** を選択してください。
3. ASM を使い始めるには、指示に従ってください。

   {{< img src="getting_started/appsec/asm_sca_setup.png" alt="Software Composition Analysis セットアップページ。" style="width:100%;" >}}


### リモート構成で ASM を有効にする
#### 前提条件:
- Datadog Agent バージョン 7.42.0 以上がホストまたはコンテナにインストールされていること。
- Datadog Tracer versions are [compatible with Remote Configuration][17].

#### リモート構成の設定 (まだ有効になっていない場合)
Datadog UI で[リモート構成][17]を有効にする手順に従ってください。これには以下が含まれます。
  1. 組織のリモート構成機能を有効にします。
  2. 既存の API キーにリモート構成機能を追加するか、新しい API キーを作成します。
  3. Datadog Agent 構成を更新して、リモート構成機能で API キーを使用します。

  詳しくは[リモート構成の設定][21]をご覧ください。

### ASM のテスト
ASM を有効にすると、アプリケーションの脆弱性を即座に識別し、サービスを標的とする攻撃や攻撃者を検出します。

1. **脆弱性の検証**: [Vulnerabilities タブ][14]に移動し、脆弱性のトリアージと修復を行います。
2. **攻撃の検証**: テスト検出ルールをトリガーする攻撃パターンを送信します。ターミナルから以下のスクリプトを実行します。

  {{< code-block lang="sh" >}}
  for ((i=1;i<=250;i++)); do
  # 既存サービスのルートをターゲットにする
  curl https://your-application-url/<EXISTING ROUTE> -A
  'dd-test-scanner-log';
  # 既存サービス外のルートをターゲットにする
  curl https://your-application-url/<NON-EXISTING ROUTE> -A
  'dd-test-scanner-log';
  done{{< /code-block >}}

3. [セキュリティシグナルエクスプローラー][6]で、数秒後に発生するシグナルを確認してください。

## レポートと通知

1. [通知ルール][23]を設定して、Slack、Jira、メールなどを使用してアラートを受け取るようにします。
3. 毎週の[脅威ダイジェスト][22]レポートを購読して、過去 7 日間に発見された最も重要なセキュリティ脅威の調査と対処を開始してください。


さらなるベストプラクティスにご興味がおありですか？[製品内クイックスタートガイド][19]をご覧ください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?&lens=Security
[2]: https://app.datadoghq.com/services?hostGroup=%2A&lens=Security
[3]: /ja/security/application_security/threats/library_configuration/#configuring-a-client-ip-header
[4]: /ja/security/application_security/how-appsec-works/
[5]: /ja/security/application_security/threats/add-user-info/
[6]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&view=signal&viz=stream&start=1674824351640&end=1675429151640&paused=false
[7]: https://app.datadoghq.com/security/appsec
[8]: https://app.datadoghq.com/security/appsec/traces
[9]: /ja/security/application_security/threats/library_configuration/#exclude-specific-parameters-from-triggering-detections
[10]: https://app.datadoghq.com/security/appsec/reports-configuration
[11]: https://app.datadoghq.com/security/configuration/notification-rules
[12]: /ja/security/notifications/rules/
[13]: /ja/security/application_security/risk_management
[14]: https://app.datadoghq.com/security/appsec/vm?&group=vulnerability
[15]: https://docs.datadoghq.com/ja/agent/guide/how_remote_config_works/?tab=configurationyamlfile#overview
[17]: https://app.datadoghq.com/organization-settings/remote-config
[18]: https://app.datadoghq.com/security/appsec/landing
[19]: https://app.datadoghq.com/security/configuration/asm/onboarding
[20]: /ja/getting_started/application_security/#setup-asm
[21]: /ja/agent/remote_config?tab=configurationyamlfile#setup
[22]: https://app.datadoghq.com/security/configuration/reports
[23]: https://app.datadoghq.com/security/configuration/notification-rules