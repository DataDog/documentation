## 構成

環境内にエージェントレススキャナーをデプロイするには、[Terraform][6] を使った手動での方法、または [AWS インテグレーション][7]を使った CloudFormation テンプレートを使用する方法の 2 つがあります。

**注**: エージェントレススキャンを使用する場合、クラウド環境でスキャナを実行するための追加コストが発生します。12 時間ごとに確実にスキャンを行いながらコストを最適化するために、Datadog では Terraform をデフォルトテンプレートとしてエージェントレススキャンをセットアップすることを推奨しています。

スキャナーコストの見積もりについては、[Datadog 営業部][7] または[カスタマーサクセス][8]担当者までお問い合わせください。

### Terraform

ホスト数が 250 以上ある大規模なリージョンでは、アカウントごとに 1 つのスキャナーを構成するよりも、リージョンごとにスキャナーを作成し、クロスアカウントでスキャンする方が推奨されており、コスト効率も高くなります。

**オプション1 (推奨)**: エージェントレススキャナー専用のアカウントを作成し、スキャン可能なクラウドリソースがあるリージョンごとにスキャナーをデプロイします。このオプションでは、Datadog は中央のクラウドアカウントを作成し、スキャンインスタンスをこのアカウントに追加します。

The following diagram illustrates how Agentless scanning works when deployed in a central cloud account:

<img src="/images/security/agentless_scanning/agentless_vulnerability_advanced.png" alt="中央のクラウドアカウントにエージェントレススキャナーがデプロイされていることを示すエージェントレススキャンの図" width="90%">

**オプション 2**：エージェントレススキャナー専用のアカウントを作成すること_なく_、スキャン可能なクラウドリソースのあるすべてのリージョンにスキャナーをデプロイします。このオプションでは、環境内に中央のクラウドアカウントがすでに存在し、このアカウントにスキャンインスタンスを追加できます。

#### インストール

具体的な設定方法については、[Terraform を使ってエージェントレススキャナーを有効にする][5]を参照してください。

### AWS インテグレーション

Datadog の AWS インテグレーション内では、CloudFormation テンプレートを選択し、組織の[リモート構成][4]を有効にした後、Datadog は必要な IAM 権限でテンプレートを更新し、AWS アカウントごとに単一のスキャナーをデプロイし、このスキャナーがそのアカウントのすべてのリージョンをスキャンします。 Datadog は EBS ボリュームをスキャンして [Software Bill of Materials (SBOM)][2] を生成し、その SBOM を Datadog [Vulnerability Management][3] に送り返すので、そこで脆弱性を調査して修復することができます。 

この方法は、1 アカウントあたりのホスト数が 250 未満の場合、手動セットアップ (Terraform) オプションよりもコスト効率の良い代替方法として推奨されます。

The following diagram illustrates how Agentless scanning works when deployed within each Cloud account:

<img src="/images/security/agentless_scanning/agentless_vulnerability_quickstart.png" alt="各クラウドアカウントにエージェントレススキャナーがデプロイされていることを示すエージェントレススキャンの図" width="90%">

**注**: スキャンされた実際のデータはインフラストラクチャー内に残り、所見のみが Datadog に報告されます。

## Disabling Agentless Scanning
CloudFormation テンプレートを使用してエージェントレススキャンを無効にするには、ロールを削除するか、EC2 スキャナーインスタンスを削除します。

## Resource exclusion

AWS のボリュームまたは Lambda リソースを除外するには、`DatadogAgentlessScanner:false` タグを設定します。



[1]: /security/vulnerabilities
[2]: https://www.cisa.gov/sbom
[3]: https://app.datadoghq.com/security/csm/vm
[4]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[5]: https://github.com/DataDog/terraform-datadog-agentless-scanner/blob/main/README.md
[6]: /security/cloud_security_management/setup/agentless_scanning/#terraform
[7]: /security/cloud_security_management/setup/agentless_scanning/#aws-integration
[7]: mailto:sales@datadoghq.com
[8]: mailto:success@datadoghq.com

