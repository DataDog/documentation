---
further_reading:
- link: /security/application_security/terms
  tag: Documentation
  text: Application Security の用語と概念
- link: /security/application_security/how-appsec-works
  tag: Documentation
  text: Application Security Management の仕組み
- link: /security/application_security/enabling/
  tag: Documentation
  text: ASM の有効化
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: セキュリティと脅威検出を高めるインタラクティブなセッションに参加できます
- link: /getting_started/application_security/vulnerability_management
  tag: ガイド
  text: Application Vulnerability Management を始める
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Datadog のセキュリティリサーチ、レポート、ヒント、ビデオ
title: Application Security Management を始める
---

## 概要

Datadog Application Security Management (ASM) は、本番環境における Web アプリケーションや API の安全性を確保します。ASM は、サービス内のアプリケーションレベルの脆弱性を視覚化し、これらの脆弱性を悪用しようとする攻撃や攻撃者からリアルタイムで保護します。

このガイドでは、ASM の導入と運用のためのベストプラクティスを説明します。

## セキュリティリスクのあるサービスの特定


ASM が有効であると思われる、**攻撃にさらされやすいサービスを特定します**。[ASM Setup ページ][1]に移動し、そこで推奨されるサービスを選択します。

{{< img src="getting_started/appsec/ASM_activation_service_selection.png" alt="Vulnerabilities を表示し、Suspicious requests 列でソートされた ASM Services ページビュー。" style="width:100%;" >}}

これらのセキュリティに関する洞察は、APM によって報告されたデータから検出されます。このインサイトは、セキュリティ対策に優先順位をつけるのに役立ちます。ASM は、サービス上のすべてのセキュリティリスクを特定し、優先順位を付け、修復を支援します。

**注**: 脆弱性や不審なリクエストが報告されない場合、サービスが最新の Datadog トレーシングライブラリバージョンを使用していることを確認します。[APM Service Catalog][2] から、任意のサービスのサイドパネルを開き、その **Tracing Configuration** を見てください。


{{< img src="getting_started/appsec/ASM_Tracing_Configuration.png" alt="APM Service Catalog ページビューの Tracer Configuration タブ。Datadog Agent、Datadog トレーシングライブラリのどのバージョンがサービスで使用されているかをハイライトしています。" style="width:100%;" >}}


## ASM の有効化

### アプリ内の指示で ASM を有効化

[ASM Setup ページ][1]にアクセスし、指示に従ってセットアップを開始します。これには以下が含まれます。
- ASM が有効であると思われるサービスの選定を指導します。
- 環境変数で Datadog トレーシングライブラリを構成します。
- サービスを再起動します。</br>

1. [ASM に移動][18]し、**Get Started with ASM** をクリックします。
2. Datadog が推奨するリスクにさらされているサービスを選択します。
3. ASM を使い始めるには、指示に従ってください。

### リモート構成で ASM を有効にする
#### 前提条件:
- Datadog Agent バージョン 7.42.0 以上がホストまたはコンテナにインストールされていること。
- Datadog トレーサーのバージョンが、[リモート構成と互換性がある][16]こと。

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

さらなるベストプラクティスにご興味がおありですか？[製品内クイックスタートガイド][19]をご覧ください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/asm/services-setup/services-selection?services=recommended
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
[16]: https://docs.datadoghq.com/fr/security/application_security/enabling/compatibility/
[17]: https://app.datadoghq.com/organization-settings/remote-config
[18]: https://app.datadoghq.com/security/appsec/landing
[19]: https://app.datadoghq.com/security/configuration/asm/onboarding
[20]: /ja/getting_started/application_security/#setup-asm
[21]: /ja/agent/remote_config?tab=configurationyamlfile#setup