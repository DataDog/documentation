---
aliases:
- /ja/security_platform/guide/aws-config-guide-for-cloud-siem
- /ja/security_platform/cloud_siem/guide/aws-config-guide-for-cloud-siem
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: Documentation
  text: Explore Cloud SIEM default detection rules
- link: /security/cloud_siem/investigate_security_signals
  tag: Documentation
  text: Learn about the Security Signals Explorer
- link: /security/cloud_siem/log_detection_rules/
  tag: Documentation
  text: Create new detection rules
- link: /getting_started/integrations/aws/
  tag: Documentation
  text: Getting Started with AWS
- link: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
  tag: Documentation
  text: Send AWS services logs with the Datadog Lambda function
- link: /logs/explorer/
  tag: Documentation
  text: See how to explore your logs
title: AWS Configuration Guide for Cloud SIEM
---

## 概要

Cloud SIEM は、Datadog で処理されたすべてのログに検出ルールを適用し、標的型攻撃や脅威インテリジェンスに記載された IP がシステムと通信している、あるいは安全でない構成などの脅威を検出します。この脅威は、トリアージするために[セキュリティシグナルエクスプローラー][1]でセキュリティシグナルとして表面化されます。

このガイドでは、AWS CloudTrail のログから脅威の検出を開始できるように、次の手順を説明します。

1. [Datadog の AWS インテグレーションを設定する](#set-up-aws-integration-using-cloudformation)
2. [AWS CloudTrail のログを有効にする](#enable-aws-cloudtrail-logging)
3. [AWS CloudTrail のログを Datadog に送信する](#send-aws-cloudtrail-logs-to-datadog)
4. [Cloud SIEM でセキュリティシグナルのトリアージを行う](#use-cloud-siem-to-triage-security-signals)

## CloudFormation を使った AWS インテグレーションの設定

1. Datadog の [AWS インテグレーションタイル][2]にアクセスし、インテグレーションをインストールします。
2. **Automatically Using CloudFormation** をクリックします。すでに AWS アカウントが設定されている場合は、まず **Add Another Account** をクリックします。
3. CloudFormation スタックを起動する AWS リージョンを選択します。
4. AWS アカウントから Datadog へのデータ送信に使用される Datadog API キーを選択または作成します。
5. *Send Logs to Datadog* で **Yes** を選択します。これで、AWS CloudTrail のログを Datadog に送信するために、後で使用する Datadog Lambda Forwarder がセットアップされます。
6. **Launch CloudFormation Template** をクリックします。これで AWS コンソールが開き、CloudFormation スタックがロードされます。パラメーターは、事前の Datadog フォームでの選択に基づいて入力されています。

   **注:** `DatadogAppKey` パラメーターは、CloudFormation スタックが Datadog に API コールを行い、この AWS アカウントに対して Datadog の構成を追加・編集できるようにするものです。キーは自動的に生成され、Datadog アカウントに結びつけられます。

7. AWS から必要な項目にチェックを入れ、**Create stack** をクリックします。
8. CloudFormation スタック作成後、Datadog の AWS インテグレーションタイルに戻り、**Ready!** をクリックします。

Datadog の AWS インテグレーションと CloudFormation テンプレートの詳細については、[AWS の概要][3]を参照してください。AWS インテグレーションを手動で設定する必要がある場合は、[AWS 手動設定手順][4]を参照してください。

## AWS CloudTrail のログを有効にする

AWS CloudTrail のログを有効にし、S3 バケットにログが送信されるようにします。すでに設定している場合は、[AWS CloudTrail のログを Datadog に送信する](#send-aws-cloudtrail-logs-to-datadog)にスキップしてください。

1. [CloudTrail ダッシュボード][5]の **Create Trail** をクリックします。
2. トレイルの名前を入力します。
3. 新しい S3 バケットを作成するか、既存の S3 バケットを使用して CloudTrail のログを保存します。
4. 新しい AWS KMS キーを作成するか、既存の AWS KMS キーを使用します。**Next** をクリックします。
5. イベントタイプは、デフォルトの管理用読み書きイベントのまま、または Datadog に送信したいイベントタイプを追加で選択します。**Next** をクリックします。
6. 確認後、**Create trail** をクリックします。

## AWS CloudTrail のログを Datadog に送信する

Datadog Forwarder の Lambda 関数にトリガーを設定し、S3 バケットに保存されている CloudTrail ログを Datadog に送信してモニタリングします。

1. AWS インテグレーションのセットアップ時に作成した [Datadog Forwarder Lambda][6] にアクセスします。
2. **Add trigger** をクリックします。
3. トリガーに **S3** を選択します。
4. AWS CloudTrail のログを収集するために使用する S3 バケットを選択します。
5. イベントタイプで、**All object create events** を選択します。
6. **Add** をクリックします。
7. Datadog の[ログエクスプローラー][7]で CloudTrail のログをご覧ください。

ログの検索やフィルタリング、グループ化、視覚化の方法については、[ログエクスプローラー][8]を参照してください。

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
[2]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ja/getting_started/integrations/aws/
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=roledelegation#manual
[5]: https://console.aws.amazon.com/cloudtrail/home
[6]: https://console.aws.amazon.com/lambda/home
[7]: https://app.datadoghq.com/logs?query=service%3Acloudtrail
[8]: https://docs.datadoghq.com/ja/logs/explorer/
[9]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc&product=siem
[10]: /ja/security/cloud_siem/investigate_security_signals
[11]: https://app.datadoghq.com/dash/integration/30459/aws-cloudtrail
[12]: https://docs.datadoghq.com/ja/security/default_rules/#cat-cloud-siem
[13]: https://docs.datadoghq.com/ja/security/detection_rules/
[14]: https://app.datadoghq.com/security/configuration?detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=security_monitoring
[15]: https://docs.datadoghq.com/ja/integrations/kubernetes_audit_logs/
[16]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service