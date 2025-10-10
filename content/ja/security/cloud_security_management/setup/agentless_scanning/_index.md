---
further_reading:
- link: /security/cloud_security_management/setup
  tag: ドキュメント
  text: Cloud Security Management の設定
- link: /security/cloud_security_management/agentless_scanning
  tag: ドキュメント
  text: Cloud Security Management Agentless Scanning
title: Agentless Scanning の有効化
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では、Cloud Security Management 向けの Agentless Scanning はサポートされていません。</div>
{{< /site-region >}}

Agentless Scanning を使用すると、Datadog Agent をインストールする必要なくクラウドインフラに存在する脆弱性を可視化できます。Agentless Scanning の機能と仕組みについて詳しくは、[Agentless Scanning][12] のドキュメントを参照してください。

## 前提条件

Agentless Scanning をセットアップする前に、以下の前提条件が満たされていることを確認してください。

- **Remote Configuration**: [Remote Configuration][3] が必要です。これは Datadog がスキャン対象のクラウドリソースなどの情報を Agentless スキャナーへ送信するために必須となります。
- **クラウドの権限**: Agentless Scanning インスタンスがホスト、コンテナ、および関数をスキャンするためには特定の権限が必要です。これらの権限はインストールプロセスの一部として自動的に適用されます。<br><br>
{{< collapse-content title="AWS ホストおよびコンテナのスキャン権限" level="h5" >}}
<ul>
<li><code>ec2:DescribeVolumes</code></li>
<li><code>ec2:CreateTags</code></li>
<li><code>ec2:CreateSnapshot</code></li>
<li><code>ec2:DeleteSnapshot</code></li>
<li><code>ec2:DescribeSnapshots</code></li>
<li><code>ec2:DescribeSnapshotAttribute</code></li>
<li><code>ebs:ListSnapshotBlocks</code></li>
<li><code>ebs:ListChangedBlocks</code></li>
<li><code>ebs:GetSnapshotBlock</code></li>
</ul>
{{< /collapse-content >}}

{{< collapse-content title="AWS Lambda のスキャン権限" level="h5" >}}
<ul><li><code>lambda:GetFunction</code></li></ul>
{{< /collapse-content >}}

{{< collapse-content title="Azure ホストのスキャン権限" level="h5" >}}
<ul>
<li><code>Microsoft.Compute/virtualMachines/read</code></li>
<li><code>Microsoft.Compute/virtualMachines/instanceView/read</code></li>
<li><code>Microsoft.Compute/virtualMachineScaleSets/read</code></li>
<li><code>Microsoft.Compute/virtualMachineScaleSets/instanceView/read</code></li>
<li><code>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/read</code></li>
<li><code>Microsoft.Compute/virtualMachineScaleSets/virtualMachines/instanceView/read</code></li>
<li><code>Microsoft.Compute/disks/read</code></li>
<li><code>Microsoft.Compute/disks/beginGetAccess/action</code></li>
<li><code>Microsoft.Compute/disks/endGetAccess/action</code></li>
</ul>
{{< /collapse-content >}}

## セットアップ

<div class="alert alert-danger">Agentless スキャナーを実行すると追加のコストが発生します。コストを最適化しつつ、12 時間ごとのスキャンを確実に行うために、Datadog ではデフォルトのテンプレートとして <a href="/security/cloud_security_management/setup/agentless_scanning/terraform/">Terraform を用いた Agentless Scanning のセットアップ</a>を推奨しています。</div>

Agentless Scanning を有効にするには、以下のいずれかのワークフローを使用してください。

### クイックスタート

新規ユーザー向けに設計された[クイックスタートワークフロー][5]では、Cloud Security Management の効率的なセットアッププロセスが提供され、AWS リソースの即時モニタリングを可能にします。このワークフローでは AWS CloudFormation を使用して構成を自動化します。

### Terraform

[Terraform Datadog Agentless Scanner module][6] を使用すると、Datadog Agentless Scanner をインストールするためのシンプルで再利用可能な設定を行うことができます。詳細については、[Terraform を使用した Agentless Scanning のセットアップ][7]を参照してください。

### AWS CloudFormation

AWS CloudFormation テンプレートを使用して、CloudFormation スタックを作成します。このテンプレートには、Agentless Scanner をデプロイおよび管理するために必要な IAM 権限が含まれています。詳細については、[AWS CloudFormation を使用した Agentless Scanning のセットアップ][11]を参照してください。

### Azure Resource Manager

Azure Resource Manager テンプレートを使用して、Agentless Scanner をデプロイします。このテンプレートには、Agentless Scanner をデプロイおよび管理するために必要なロール定義が含まれています。詳細については、[Azure Resource Manager を使用した Agentless Scanning のセットアップ][13]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/agentless_scanning
[2]: /ja/integrations/amazon_web_services/
[3]: /ja/agent/remote_config/?tab=configurationyamlfile#setup
[4]: https://app.datadoghq.com/security/csm/intro
[5]: /ja/security/cloud_security_management/setup/agentless_scanning/quick_start
[6]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner
[7]: /ja/security/cloud_security_management/setup/agentless_scanning/terraform
[8]: mailto:success@datadoghq.com
[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall
[10]: https://app.datadoghq.com/security/configuration/csm/setup
[11]: /ja/security/cloud_security_management/setup/agentless_scanning/cloudformation
[12]: /ja/security/cloud_security_management/agentless_scanning
[13]: /ja/security/cloud_security_management/setup/agentless_scanning/azure_resource_manager