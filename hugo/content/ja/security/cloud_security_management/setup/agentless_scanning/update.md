---
further_reading:
- link: /security/cloud_security_management/setup/agentless_scanning/enable
  tag: ドキュメント
  text: Agentless Scanning の有効化
- link: /security/cloud_security_management/agentless_scanning
  tag: ドキュメント
  text: Cloud Security における Agentless Scanning
title: Agentless Scanning の更新
---

## CloudFormation スタックを更新する

Datadog では、新機能やバグ修正がリリースされたらすぐに利用できるよう、CloudFormation スタックを定期的に更新することを推奨しています。

1. AWS コンソールにログインし、**CloudFormation Stacks** ページに移動します。
1. 親スタック **DatadogIntegration** を展開して、ネストされたサブ スタックを表示します。**DatadogIntegration-DatadogAgentlessScanning-...** サブ スタックを選択し、**Update** をクリックしてから **Update nested stack** をクリックします。
1. **Replace existing template** をクリックします。
1. 次の S3 URL: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml` の `<VERSION>` を、[aws_quickstart/version.txt][1] に記載されているバージョンに置き換えます。その URL を **Amazon S3 URL** フィールドに貼り付けます。
1. 以降の数ページは内容を変更せずに **Next** をクリックして進み、最後にフォームを送信します。

## Terraform モジュールを更新する

Agentless Scanner モジュールの `source` で指定している参照先を最新リリースへ更新します。最新バージョンは [GitHub Releases][2] で確認できます。

利用例については、[GitHub リポジトリ][3] を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases
[3]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples