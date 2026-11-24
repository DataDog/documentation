---
further_reading:
- link: /security/cloud_security_management/setup/agentless_scanning/enable
  tag: ドキュメント
  text: Agentless スキャンの有効化
- link: /security/cloud_security_management/agentless_scanning
  tag: ドキュメント
  text: Cloud Security Agentless スキャン
title: Agentless スキャンの更新
---
スキャナーインスタンスは 24 時間ごとに置き換えられ、デプロイメントで固定されたスキャナーバージョンの最新パッチリリースがインストールされます。デプロイメントを更新して、新しいスキャナーバージョン、権限の変更、インフラストラクチャーの修正を取得します。

## CloudFormation スタックを更新する {#update-the-cloudformation-stack}

Datadog では、新機能やバグ修正がリリースされた際に利用できるよう、CloudFormation スタックを定期的に更新することを推奨しています。

1. AWS コンソールにログインし、CloudFormation Stacks ページに移動します。
1. 親 {{< ui >}}DatadogIntegration{{< /ui >}} スタックを展開して、ネストされたサブスタックを表示します。{{< ui >}}DatadogIntegration-DatadogAgentlessScanning-...{{< /ui >}} サブスタックを選択し、{{< ui >}}Update{{< /ui >}} をクリックしてから、{{< ui >}}Update nested stack{{< /ui >}} をクリックします。
1. {{< ui >}}Replace existing template{{< /ui >}} をクリックします。
1. 次の S3 URL: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml` で、`<VERSION>` を [aws_quickstart/version.txt][1] に記載されているバージョンに置き換えます。その URL を {{< ui >}}Amazon S3 URL{{< /ui >}} フィールドに貼り付けます。
1. {{< ui >}}Next{{< /ui >}} をクリックして、次のいくつかのページを変更せずに進み、フォームを送信します。

## Terraform モジュールを更新する {#update-the-terraform-module}

Agentless スキャナーモジュールの `source` リファレンスを最新リリースに更新します。最新バージョンは [GitHub Releases][2] で確認できます。

使用例については、[GitHub リポジトリ][3]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases
[3]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples