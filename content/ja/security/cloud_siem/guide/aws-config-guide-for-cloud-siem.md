---
aliases:
- /ja/security_platform/guide/aws-config-guide-for-cloud-siem
- /ja/security_platform/cloud_siem/guide/aws-config-guide-for-cloud-siem
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: ドキュメント
  text: Cloud SIEM のデフォルト検出ルールの確認
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: ドキュメント
  text: セキュリティシグナルエクスプローラーについて学ぶ
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/
  tag: ドキュメント
  text: 新しい検出ルールの作成
- link: /getting_started/integrations/aws/
  tag: ドキュメント
  text: AWS の概要
- link: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
  tag: ドキュメント
  text: Datadog の Lambda 関数で AWS サービスのログを送信する
- link: /logs/explorer/
  tag: ドキュメント
  text: ログの調査方法
title: Cloud SIEM のための AWS 構成ガイド
---

## 概要

Cloud SIEM は、Datadog で処理されたすべてのログに検出ルールを適用し、標的型攻撃や脅威インテリジェンスに記載された IP がシステムと通信している、あるいは安全でない構成などの脅威を検出します。この脅威は、トリアージするために[セキュリティシグナルエクスプローラー][1]でセキュリティシグナルとして表面化されます。

このガイドでは、AWS CloudTrail のログから脅威の検出を開始できるように、次の手順を説明します。

1. [Datadog の AWS インテグレーションを設定する](#set-up-aws-integration-using-cloudformation)
2. [AWS CloudTrail のログを有効にする](#enable-aws-cloudtrail-logging)
3. [AWS CloudTrail のログを Datadog に送信する](#send-aws-cloudtrail-logs-to-datadog)
4. [Cloud SIEM でセキュリティシグナルのトリアージを行う](#use-cloud-siem-to-triage-security-signals)

## CloudFormation を使った AWS インテグレーションの設定

{{% cloud-siem-aws-setup-cloudformation %}}

## AWS CloudTrail のログを有効にする

{{% cloud-siem-aws-cloudtrail-enable %}}

## AWS CloudTrail のログを Datadog に送信する

{{% cloud-siem-aws-cloudtrail-send-logs %}}

## Cloud SIEM でセキュリティシグナルのトリアージを行う

Cloud SIEM は、設定した CloudTrail のログを含む、処理されたすべてのログに対して、すぐに検出ルールを適用します。検出ルールで脅威が検出されると、セキュリティシグナルが生成され、セキュリティシグナルエクスプローラーで確認することができます。

- [Cloud SIEM シグナルエクスプローラー][9]にアクセスして、脅威の表示とトリアージを行います。詳細は[セキュリティシグナルエクスプローラー][10]をご覧ください。
- また、[AWS CloudTrail ダッシュボード][11]を使って、異常なアクティビティを調査することも可能です。
- ログに適用される[すぐに使える検出ルール][12]をご覧ください。
- [新しいルール][13]を作成し、特定のユースケースにマッチした脅威を検出することができます。

Cloud SIEM は処理されたすべてのログに検出ルールを適用するため、脅威検出のために [Kubernetes 監査ログ][15]や他のソースからのログを収集する方法については[アプリ内説明書][14]を参照してください。また、異なる [AWS サービス][16]を有効にして S3 バケットにログを記録し、脅威監視のために Datadog に送信することも可能です。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Log%20Detection%22
[9]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc&product=siem
[10]: /ja/security/cloud_siem/triage_and_investigate/investigate_security_signals
[11]: https://app.datadoghq.com/dash/integration/30459/aws-cloudtrail
[12]: https://docs.datadoghq.com/ja/security/default_rules/#cat-cloud-siem
[13]: https://docs.datadoghq.com/ja/security/detection_rules/
[14]: https://app.datadoghq.com/security/configuration?detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=security_monitoring
[15]: https://docs.datadoghq.com/ja/integrations/kubernetes_audit_logs/
[16]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service