---
kind: faq
title: AWS インテグレーションを使用せずに EC2 タグを引き出すにはどうすればよいですか？
---

AWS インテグレーションを使用せずに、Datadog Agent を通じて EC2 インスタンスのカスタム AWS タグを引き出すには、以下の手順を実行します。

{{< tabs >}}
{{% tab "Agent v6 & v7 と IMDS" %}}

Datadog では、EC2 Instance Metadata Service を通じてインスタンスタグを収集することを推奨しています。

このメカニズムは、Datadog Agent v7.35.0 で利用可能です。

1. EC2 インスタンスが、インスタンスメタデータのタグへのアクセスを許可するように構成されていることを確認します。[AWS ドキュメント][1]を参照してください。
2. `datadog.yaml` ファイルで、`collect_ec2_tags: true` と `collect_ec2_tags_use_imds: true` を設定します。
3. [Agent を再起動します][2]。

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Using_Tags.html#allow-access-to-tags-in-IMDS
[2]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Agent v6 & v7 と EC2 API" %}}

EC2 Instance Metadata Service を通じてタグが利用できない場合、Datadog Agent は EC2 API を使用してタグを収集します。

1. [AWS ドキュメント][1]を参照して、EC2 **インスタンス**に IAM ロールが割り当てられていることを確認します。必要であれば、作成します。
2. IAM ロールに、`ec2:DescribeTags`の権限を含むポリシーをアタッチします。
3. `datadog.yaml` で、`collect_ec2_tags: true` を設定します。
4. [Agent を再起動します][2]。

[1]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[2]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Agent v5" %}}

1. [AWS ドキュメント][1]を参考に、**インスタンス**用の IAM ロールを作成します。
2. ポリシーセクションには、権限 `"ec2:Describe*"`、`"ec2:Get*"` を指定します。
3. `datadog.conf` で、**collect_ec2_tags: true** を設定します。
4. オプション: `collect_security_groups` を有効にして、security-groups タグを追加します。
5. [Agent を再起動します][2]。

[1]: http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
[2]: /ja/agent/guide/agent-commands/?tab=agentv5#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

1. [AWS ドキュメント][1]を参照して、Agent タスクに IAM ロールが割り当てられていることを確認します。必要であれば、作成します。
2. IAM ロールに、`ec2:DescribeTags`の権限を含むポリシーをアタッチします。
3. 環境変数 `DD_COLLECT_EC2_TAGS=true` を指定して、Datadog Agent コンテナを起動します。

**注**: 後方互換性のため、ECS タスクのロールが使用できないか、十分な権限がない場合、Agent は EC2 インスタンスのロールの使用も試行します。

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html
{{% /tab %}}
{{< /tabs >}}

このオプションは、AWS コンソールの **Tags** タブで EC2 ホストに設定されたカスタムタグのみを引き込みます。

{{< img src="integrations/faq/ec2_tags.png" alt="ec2_tags" >}}

`availability_zone`、`region`、`instance_type` などのタグは、[AWS インテグレーション][1]を介して EC2 ホストを引き込むことで初めて利用可能になります。

[1]: /ja/integrations/amazon_web_services/?tab=allpermissions