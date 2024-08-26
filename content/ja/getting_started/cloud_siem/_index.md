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
- link: https://www.datadoghq.com/blog/content-packs/
  tag: ブログ
  text: Cloud SIEM Content Pack でセキュリティログの取り込みと監視が容易に
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
3. [コンテンツパック][9]を選択し、構成します。コンテンツパックは、重要なセキュリティログソースに対するすぐに使えるコンテンツを提供します。
4. Cloud SIEM に分析させたい[追加のログソース][10]を選択し、構成します。
5. **Activate** をクリックします。カスタム Cloud SIEM ログインデックス (`cloud-siem-xxxx`) が作成されます。
6. Cloud SIEM のセットアップページで「Cloud SIEM index is not in first position」(Cloud SIEM インデックスが最初の位置にありません) という警告が表示された場合は、[Cloud SIEM インデックスの並び替え](#reorder-the-cloud-siem-index)セクションの手順に従ってください。

### Cloud SIEM インデックスの並び替え

{{< img src="getting_started/cloud_siem/cloud-siem-setup-warning.png" alt="インデックス構成に注意が必要であることを示す黄色の警告ボックス" style="width:80%;">}}

1. **Reorder index in Logs Configuration** をクリックします。

2. モーダルタイトルに「Move cloud-siem-xxxx to...」と表示され、インデックス列の `cloud-siem-xxxx` テキストが薄紫色になっていることを確認します。

{{< img src="getting_started/cloud_siem/move-index-modal.png" alt="cloud-siem-xxxx インデックスが最後のインデックスであることを示すインデックスのリストを表示する Move cloud-siem-xxxx モーダル" style="width:60%;">}}

3. インデックスの新しい配置を選択するには、`cloud-siem-xxxx` を配置したいインデックスの一番上の行をクリックします。例えば、`cloud-siem-xxxx` インデックスを最初のインデックスにしたい場合、現在の最初のインデックスの*上*の行をクリックします。新しい位置は青い太い線でハイライトされます。

{{< img src="getting_started/cloud_siem/move-index-highlight.png" alt="最初のインデックスの上部に青い線を表示する Move cloud-SIEM-xxxx モーダル" style="width:65%;">}}

4. テキストは選択された位置を確認します: "Select the new placement of your index: Position 1" (インデックスの新しい配置を選択: 位置 1)。**Move** をクリックします。

5. 警告テキストを確認します。変更内容に問題がなければ、**Reorder** をクリックします。

6. インデックスの順序を確認し、`cloud-siem-xxxx` インデックスが希望の位置にあることを確認します。インデックスを移動したい場合は、**Move to** アイコンをクリックし、手順 3 から 5 を実行します。

7. [Cloud SIEM セットアップページ][11]に戻ります。

Cloud SIEM インデックスは最初のインデックス位置にあるはずです。セットアップページでインデックス位置に関する警告がまだ表示される場合は、数分待ってからブラウザを更新します。

インデックスが最初のインデックス位置に移動したら、[コンテンツパック][11]と[その他のログソース][11]の設定とステータスを確認します。警告またはエラーが表示されたインテグレーションごとに、そのインテグレーションをクリックし、指示に従って修正します。

## フェーズ 2: シグナルの確認

1. [すぐに使える検出ルール][12]を確認し、お使いの環境における脅威の検出を開始します。検出ルールは、処理されたすべてのログに適用され、検出範囲を最大化します。詳細については、[検出ルール][13]のドキュメントを参照してください。

2. [セキュリティシグナル][14]を確認します。検出ルールで脅威が検出されると、セキュリティシグナルが生成されます。詳しくは、[セキュリティシグナル][15]のドキュメントをご覧ください。

    - [通知ルールの設定][16]を行い、シグナルが発生した際にアラートを出します。Slack、Jira、メール、Webhook、および他のインテグレーションを使用してアラートを出すことができます。詳しくは[通知ルール][17]のドキュメントを参照してください。
    - 毎週の[脅威ダイジェスト][18]レポートを購読し、過去 7 日間に発見された最も重要なセキュリティ脅威の調査と対策を開始しましょう。

## フェーズ 3: 調査

1. より迅速な修復のために、[Investigator][19] を確認します。詳しくは [Investigator][20] のドキュメントをご覧ください。
2. 調査、レポート、モニタリングには、[すぐに使えるダッシュボード][21]を使用するか、または[独自のダッシュボードを作成][22]します。

## フェーズ 4: カスタマイズ

1. [抑制ルール][23]を設定し、ノイズを低減します。
2. [カスタム検出ルール][24]を作成します。[検出ルールを作成するためのベストプラクティス][25]を確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_siem/
[2]: https://app.datadoghq.com/security/configuration/siem/log-sources
[3]: /ja/logs/guide/best-practices-for-log-management/
[4]: /ja/integrations/
[5]: /ja/logs/log_configuration/pipelines/
[6]: https://www.datadoghq.com/blog/monitoring-cloudtrail-logs/
[7]: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
[8]: https://app.datadoghq.com/security/landing
[9]: https://app.datadoghq.com/security/content-packs
[10]: https://app.datadoghq.com/security/configuration/siem/log-sources
[11]: https://app.datadoghq.com/security/configuration/siem/setup
[12]: /ja/security/default_rules/#cat-cloud-siem-log-detection
[13]: /ja/security/detection_rules/
[14]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%20OR%20%22Signal%20Correlation%22%29&column=time&order=desc&product=siem&view=signal&viz=stream&start=1676321431953&end=1676407831953&paused=false
[15]: /ja/security/cloud_siem/investigate_security_signals
[16]: https://app.datadoghq.com/security/configuration/notification-rules
[17]: /ja/security/notifications/rules/
[18]: https://app.datadoghq.com/security/configuration/reports
[19]: https://app.datadoghq.com/security/investigator/
[20]: /ja/security/cloud_siem/investigator
[21]: https://app.datadoghq.com/dashboard/lists/preset/100
[22]: /ja/dashboards/#overview
[23]: /ja/security/cloud_siem/log_detection_rules/?tab=threshold#advanced-options
[24]: /ja/security/cloud_siem/log_detection_rules/
[25]: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/
