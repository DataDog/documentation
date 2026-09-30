
## 前提条件

AWS 環境にエージェントレススキャンをデプロイするには、[Cloud Security Management][3] を有効にすることに加えて、リモート構成を有効にする必要があります。

### リモート構成を有効にする

[リモート構成][1] (**2024 年 4 月 8 日**現在、[デフォルト][2]で有効) は、Datadog が、どのクラウドリソースをスキャンすべきかなどの情報をエージェントレススキャナーに送信できるようにするために必要です。組織でリモート構成が有効になっていない場合は、[Datadog の組織設定][4]に移動し、リモート構成のドキュメントの[ステップ 1～4][2] に従ってください。

**注**: スキャナーをデプロイした CSM 対応 AWS アカウントには、リモート構成が有効な API キーが必要です。

### 権限

**注**: 以下はエージェントレススキャンに必要な権限で、インストールプロセスの一環として自動的に適用されます。

#### IAM の権限 (ホストとコンテナの権限)

エージェントレススキャンのインスタンスは、ホストとコンテナをスキャンするために、次の IAM 権限を必要とします。

```
ec2:DescribeVolumes
ec2:CreateTags
ec2:CreateSnapshot
ec2:DeleteSnapshot
ec2:DescribeSnapshots
ec2:DescribeSnapshotAttribute
ebs:ListSnapshotBlocks
ebs:ListChangedBlocks
ebs:GetSnapshotBlock
```

#### Lambda の権限

エージェントレススキャンのインスタンスは、Lambda をスキャンするために、次の IAM 権限を必要とします。

```
lambda:GetFunction
```


[1]: /agent/remote_config/?tab=configurationyamlfile
[2]: /agent/remote_config/?tab=configurationyamlfile#setup
[3]: /security/cloud_security_management/setup
[4]: https://app.datadoghq.com/organization-settings/remote-config