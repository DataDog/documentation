---
aliases:
- /ja/cloud-siem/getting_started/
- /ja/security_monitoring/getting_started/
- /ja/security_platform/security_monitoring/
- /ja/security_platform/security_monitoring/getting_started
- /ja/security_platform/getting_started/
- /ja/security_platform/cloud_siem/getting_started/
- /ja/security/cloud_siem/getting_started/
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-cloud-siem
  tag: ラーニングセンター
  text: Cloud SIEM 入門コース
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: ブログ
  text: Datadog Workflows と Cloud SIEM で、一般的なセキュリティタスクを自動化し、脅威の先を行く
- link: https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY
  tag: App
  text: Workflows のセキュリティ設計図で応答を自動化する
- link: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
  tag: Documentation
  text: Cloud SIEM の AWS 構成ガイド
- link: /security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/
  tag: Documentation
  text: Cloud SIEM のための Google Cloud 構成ガイド
- link: /security/cloud_siem/guide/azure-config-guide-for-cloud-siem/
  tag: Documentation
  text: Cloud SIEM の Azure 構成ガイド
- link: /security/notifications/variables/
  tag: Documentation
  text: 通知をカスタマイズするための通知変数について
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: セキュリティと脅威検出を高めるインタラクティブなセッションに参加できます
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Datadog の Security Labs でセキュリティ関連のトピックを読む
title: Cloud SIEM の概要
---

## 概要

[Datadog Cloud SIEM][1] は、アプリケーションやインフラストラクチャーに対する脅威をリアルタイムに検出します。これらの脅威には、標的型攻撃、脅威情報が記載された IP がシステムと通信している場合、または安全でない構成が含まれる場合があります。検出されるとシグナルが生成され、チームに通知することができます。

このガイドでは、Cloud SIEM を使い始めるためのベストプラクティスを説明します。

## フェーズ 1: セットアップ

1. [ログ取り込み][2]を構成して、ソースからログを収集します。[ログ管理のベストプラクティス][3]を確認してください。

   [すぐに使えるインテグレーションパイプライン][4]を使って {{< translate key="integration_count" >}} 以上のインテグレーションのログを収集したり、[カスタムログパイプラインを作成][5]して以下を送信したりすることができます。

    - [クラウド監査ログ][6]。
    - [ID プロバイダーログ][7]
    - SaaS と Workspace のログ
    - サードパーティセキュリティインテグレーション (例: Amazon GuardDuty)

2. [Cloud SIEM][8] を有効にします。

## フェーズ 2: シグナルの確認

1. [すぐに使える検出ルール][9]を確認し、お使いの環境における脅威の検出を開始します。検出ルールは、処理されたすべてのログに適用され、検出範囲を最大化します。詳細については、[検出ルール][10]のドキュメントを参照してください。

2. [セキュリティシグナル][11]を確認します。検出ルールで脅威が検出されると、セキュリティシグナルが生成されます。詳しくは、[セキュリティシグナル][12]のドキュメントをご覧ください。

    - [通知ルールの設定][13]を行い、シグナルが発生した際にアラートを出します。Slack、Jira、メール、Webhook、および他のインテグレーションを使用してアラートを出すことができます。詳しくは[通知ルール][14]のドキュメントを参照してください。

## フェーズ 3: 調査

1. より迅速な修復のために、[Investigator][15] を確認します。詳しくは [Investigator][16] のドキュメントをご覧ください。
2. 調査、レポート、モニタリングには、[すぐに使えるダッシュボード][17]を使用するか、または[独自のダッシュボードを作成][18]します。

## フェーズ 4: カスタマイズ

1. [抑制ルール][19]を設定し、ノイズを低減します。
2. [カスタム検出ルール][20]を作成します。[検出ルールを作成するためのベストプラクティス][21]を確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_siem/
[2]: https://app.datadoghq.com/security/configuration
[3]: /ja/logs/guide/best-practices-for-log-management/
[4]: /ja/integrations/
[5]: /ja/logs/log_configuration/pipelines/
[6]: https://www.datadoghq.com/blog/monitoring-cloudtrail-logs/
[7]: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
[8]: https://app.datadoghq.com/security/getting-started
[9]: /ja/security/default_rules/#cat-cloud-siem-log-detection
[10]: /ja/security/detection_rules/
[11]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%20OR%20%22Signal%20Correlation%22%29&column=time&order=desc&product=siem&view=signal&viz=stream&start=1676321431953&end=1676407831953&paused=false
[12]: /ja/security/explorer
[13]: https://app.datadoghq.com/security/configuration/notification-rules
[14]: /ja/security/notifications/rules/
[15]: https://app.datadoghq.com/security/investigator/
[16]: /ja/security/cloud_siem/investigator
[17]: https://app.datadoghq.com/dashboard/lists/preset/100
[18]: /ja/dashboards/#overview
[19]: /ja/security/cloud_siem/log_detection_rules/?tab=threshold#advanced-options
[20]: /ja/security/cloud_siem/log_detection_rules/
[21]: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/