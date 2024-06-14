---
kind: ドキュメント
title: クラウドアカウントに対して CSM Enterprise を有効にする
---

以下の手順を使用して、クラウドアカウントに対して [CSM Misconfigurations][2] と [CSM Identity Risks][3] を有効にします。各 CSM 機能でサポートされるデプロイメントタイプの詳細については、[Cloud Security Management のセットアップ][9]を参照してください。

## リソーススキャンを有効にする

クラウドアカウントのリソーススキャンを有効にするには、まずインテグレーションを設定し、各 AWS アカウント、Azure サブスクリプション、および Google Cloud プロジェクトで CSM を有効にする必要があります。

{{< tabs >}}
{{% tab "AWS" %}}

{{% csm-setup-aws %}}

{{% /tab %}}

{{% tab "Azure" %}}

{{% csm-setup-azure %}}

{{% /tab %}}

{{% tab "Google Cloud" %}}

{{% csm-setup-google-cloud %}}

{{% /tab %}}

{{< /tabs >}}

## CloudTrail ログの転送をセットアップする

### Datadog AWS インテグレーションのセットアップ

[Amazon Web Services インテグレーション][18]をまだセットアップしていない場合は、セットアップします。

### AWS CloudTrail のログを有効にする

ログが S3 バケットに送信されるように、AWS CloudTrail ロギングを有効にします。

1. [CloudTrail ダッシュボード][19]の **Create Trail** をクリックします。
2. トレイルの名前を入力します。
3. 新しい S3 バケットを作成するか、既存の S3 バケットを使用して CloudTrail のログを保存します。
4. 新しい AWS KMS キーを作成するか、既存の AWS KMS キーを使用します。**Next** をクリックします。
5. イベントタイプはデフォルトの管理読み書きイベントにしておくか、Datadog に送信したい追加イベントタイプを選択してください。
6. **Next** をクリックします。
7. 確認後、**Create trail** をクリックします。

### AWS CloudTrail のログを Datadog に送信する

Datadog Forwarder の Lambda 関数にトリガーを設定し、S3 バケットに保存されている CloudTrail ログを Datadog に送信してモニタリングします。

1. AWS インテグレーションのセットアップ時に作成した [Datadog Forwarder Lambda][20] にアクセスします。
2. **Add trigger** をクリックします。
3. トリガーに **S3** を選択します。
4. AWS CloudTrail のログを収集するために使用する S3 バケットを選択します。
5. イベントタイプで、**All object create events** を選択します。
6. **Add** をクリックします。
7. Datadog の[ログエクスプローラー][21]で CloudTrail のログをご覧ください。

[1]: /ja/security/threats
[2]: /ja/security/cloud_security_management/misconfigurations/
[3]: /ja/security/cloud_security_management/identity_risks
[4]: /ja/security/cloud_security_management/vulnerabilities
[5]: https://app.datadoghq.com/security/configuration/csm/setup
[6]: /ja/agent/remote_config
[7]: /ja/agent/remote_config/?tab=environmentvariable#enabling-remote-configuration
[8]: /ja/security/cloud_security_management/setup
[9]: /ja/security/cloud_security_management/setup#supported-deployment-types-and-features
[11]: https://www.cisa.gov/sbom
[12]: /ja/security/cloud_security_management
[14]: /ja/agent
[15]: /ja/security/cloud_security_management/troubleshooting
[16]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/
[17]: /ja/containers/kubernetes/installation/?tab=helm
[18]: /ja/integrations/amazon_web_services/
[19]: https://console.aws.amazon.com/cloudtrail/home
[20]: https://console.aws.amazon.com/lambda/home
[21]: https://app.datadoghq.com/logs?query=service%3Acloudtrail
[22]: /ja/security/cloud_security_management/setup/csm_enterprise/cloud_accounts