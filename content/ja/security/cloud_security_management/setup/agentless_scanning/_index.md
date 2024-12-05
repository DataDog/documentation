---
title: Setting up Agentless Scanning for Cloud Security Management
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Agentless Scanning for Cloud Security Management is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

エージェントレススキャンは、Datadog Agent をインストールすることなく、AWS ホスト、実行中のコンテナ、Lambda 関数、Amazon Machine Images (AMI) 内に存在する脆弱性を視覚化します。


{{% csm-agentless-prereqs %}}

## デプロイ方法

エージェントレススキャナを環境にデプロイするには、クロスアカウントスキャンまたは同一アカウントスキャンの 2 つの方法が推奨されます。

**注**: エージェントレススキャンを使用する場合、クラウド環境でスキャナを実行するための追加コストが発生します。12 時間ごとに確実にスキャンを行いながらコストを最適化するために、Datadog では Terraform をデフォルトテンプレートとしてエージェントレススキャンをセットアップすることを推奨しています。

スキャナコストの見積もりについては、[Datadog カスタマーサクセスマネージャー][8]までお問い合わせください。

{{< tabs >}}
{{% tab "クロスアカウントスキャン" %}}

クロスアカウントスキャンでは、エージェントレススキャナは単一のクラウドアカウント内の複数のリージョンにデプロイされます。デプロイされたエージェントレススキャナは、実際にコストがかかるクロスリージョンスキャンを実行せずに、複数のアカウントに対する可視性を付与されます。

250 ホスト以上の大規模アカウントの場合、これが最も費用対効果の高いオプションです。クロスリージョンスキャンを回避し、エージェントレススキャナの管理の摩擦を軽減するためです。エージェントレススキャナ専用のアカウントを作成するか、既存のアカウントを選択できます。エージェントレススキャナが配置されているアカウントもスキャンできます。

次の図は、中央のクラウドアカウントにデプロイされた場合のエージェントレススキャンの動作を示しています。


{{< img src="/security/agentless_scanning/agentless_advanced_2.png" alt="中央のクラウドアカウントにデプロイされているエージェントレススキャナを示すエージェントレススキャンの図" width="90%" >}}

{{% /tab %}}
{{% tab "同一アカウントスキャン" %}}

同一アカウントスキャンでは、アカウントごとに 1 つのエージェントレススキャナがデプロイされます。この方法は、各エージェントレススキャナがアカウントごとにクロスリージョンスキャンを実行する必要があるため、より多くのコストが発生する可能性がありますが、クロスアカウント権限を付与したくない場合、Datadog はこのオプションを推奨しています。

以下の図は、各クラウドアカウント内でデプロイされた場合のエージェントレススキャンの動作を示しています。

{{< img src="/security/agentless_scanning/agentless_quickstart_2.png" alt="各クラウドアカウントにデプロイされているエージェントレススキャナを示すエージェントレススキャンの図" width="90%" >}}

[3]: https://app.datadoghq.com/security/csm/vm
[4]: /ja/agent/remote_config/?tab=configurationyamlfile#setup

{{% /tab %}}
{{< /tabs >}}


**注**: 実際にスキャンされたデータはインフラストラクチャー内に残り、収集されたパッケージのリストと、収集されたホスト (ホスト名/EC2 インスタンス) に関連する情報のみが Datadog に報告されます。

## インストール

クラウド環境にエージェントレススキャンをインストールして構成するには、Terraform を使って手動で行う方法と、AWS インテグレーションで CloudFormation テンプレートを使う方法があります。

### Terraform

{{< tabs >}}
{{% tab "エージェントレススキャン (新しい AWS アカウント) " %}}

1. AWS クラウドアカウントを Cloud Security Management に追加するためのセットアップ手順に従ってください。
1. [Cloud Security Management Setup][1] ページで、**Cloud accounts > AWS** をクリックします。
1. エージェントレススキャナをデプロイする AWS アカウントの **Edit scanning** ボタンをクリックします。
1. **Enable Resource Scanning** は既に有効になっているはずです。**Agentless scanning** セクションで監視したいクラウドリソースのスキャンを有効にします。
1. [Terraform][4] のセットアップの指示に従ってください。
1. テンプレートが正常に実行されたことを確認したら、**Done** をクリックしてスキャンを開始します。

{{< img src="/security/agentless_scanning/agentless_scanning_setup.png" alt="リソーススキャンのトグルオプションを表示するエージェントレススキャンのセットアップページ" width="90%" >}}


[1]: https://app.datadoghq.com/security/configuration/csm/setup
[3]: /ja/security/cloud_security_management/setup/csm_enterprise/cloud_accounts/?tab=aws
[4]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md

{{% /tab %}}

{{% tab "エージェントレススキャン (既存の AWS アカウント) " %}}

1. [Cloud Security Management Setup][1] ページで、**Cloud accounts > AWS** をクリックします。
1. エージェントレススキャナをデプロイする AWS アカウントの **Edit scanning** ボタンをクリックします。
1. **Enable Resource Scanning** は既に有効になっているはずです。**Agentless Scanning** セクションで監視したいクラウドリソースのスキャンを有効にします。
1. [Terraform][4] のセットアップの指示に従ってください。
1. テンプレートが正常に実行されたことを確認したら、**Done** をクリックしてスキャンを開始します。

{{< img src="/security/agentless_scanning/agentless_scanning_setup.png" alt="リソーススキャンのトグルオプションを表示するエージェントレススキャンのセットアップページ" width="90%" >}}

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md


{{% /tab %}}
{{< /tabs >}} </br>

### AWS インテグレーション

{{< tabs >}}
{{% tab "エージェントレススキャン (新しい AWS アカウント) " %}}

1. [Amazon Web Services][1] インテグレーションをセットアップし、リソース収集に必要な[権限][2]を追加してください。

   新しい AWS アカウントを追加すると、以下の画面が表示されます。

{{< img src="/security/agentless_scanning/agentless_scanning_aws_2.png" alt="1 つの AWS アカウントを選択した状態で、新しい AWS アカウントを追加するためのエージェントレススキャンのセットアップページ" width="90%" >}}
</br>

1. **Cloud Security Management** で **Yes** をクリックし、**Agentless scanning** セクションで監視したいクラウドリソースのスキャンを有効にします。
1. リモート構成に構成済みの API キーを選択します。リモート構成が有効になっていない API キーを入力すると、選択時に自動的に有効になります。
1. **Launch CloudFormation Template** をクリックします。テンプレートにはエージェントレススキャナのデプロイと管理に必要なすべての[権限][3]が含まれており、スキャンを受信するにはテンプレートが正常に実行される必要があります。

[1]: /ja/integrations/amazon_web_services/
[2]: /ja/integrations/amazon_web_services/?tab=roledelegation#resource-collection
[3]: /ja/security/cloud_security_management/setup/agentless_scanning/?tab=agentlessscanningnewawsaccount#permissions

{{% /tab %}}

{{% tab "エージェントレススキャン (既存の AWS アカウント) " %}}

1. [Cloud Security Management Setup][1] ページで、**Cloud accounts > AWS** をクリックします。
1. エージェントレススキャナをデプロイする AWS アカウントの **Edit scanning** ボタンをクリックします。
1. **Enable Resource Scanning** は既に有効になっているはずです。**Agentless scanning** セクションで監視したいクラウドリソースのスキャンを有効にします。
1. AWS コンソールに移動し、[このテンプレート][2]を使用して新しい CloudFormation Stack を作成し、それを実行します。
1. テンプレートが正常に実行されたことを確認したら、**Done** をクリックしてスキャンを開始します。

{{< img src="/security/agentless_scanning/agentless_scanning_setup.png" alt="リソーススキャンのトグルオプションを表示するエージェントレススキャンのセットアップページ" width="90%" >}}

[1]: https://app.datadoghq.com/security/configuration/csm/setup
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/cloudformation/main.yaml

{{% /tab %}}
{{< /tabs >}}

## リソースの除外

AWS ホスト、コンテナ、Lambda 関数 (該当する場合) に、`DatadogAgentlessScanner:false` タグを設定して、スキャンから除外します。このタグをリソースに追加するには、[AWS ドキュメント][3]に従ってください。

## エージェントレススキャンの無効化

AWS アカウントでエージェントレススキャンを無効にするには、各クラウドリソースのスキャンを無効にします。
1. [Cloud Security Management Setup][10] ページで、**Cloud accounts > AWS** をクリックします。
1. エージェントレススキャナをデプロイした AWS アカウントの **Edit scanning** ボタンをクリックします。
1. **Agentless Scanning** セクションで、監視を停止したいクラウドリソースのスキャンを無効にします。
1. **Done** をクリックします。

### CloudFormation によるアンインストール

AWS コンソールにアクセスし、エージェントレススキャン用に作成した CloudFormation スタックを削除します。

### Terraform でのアンインストール

[Terraform][9] のアンインストールの手順に従ってください。

[1]: /ja/security/vulnerabilities
[3]: https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging.html
[4]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md
[8]: mailto:success@datadoghq.com
[9]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/blob/main/README.md#uninstall
[10]: https://app.datadoghq.com/security/configuration/csm/setup