---
aliases:
- /ja/security_platform/cloud_workload_security/getting_started
- /ja/security/cloud_workload_security/getting_started
- /ja/security/cloud_workload_security/setup
- /ja/security/threats/setup
- /ja/security_platform/cspm/getting_started
- /ja/security/cspm/getting_started
- /ja/security/cspm/setup
- /ja/security/misconfigurations/setup
- /ja/security/vulnerabilities/setup
- /ja/security/infrastructure_vulnerabilities/setup/
further_reading:
- link: /getting_started/cloud_security_management
  tag: ドキュメント
  text: Cloud Security Management の概要
- link: /security/cloud_security_management/setup/csm_enterprise
  tag: ドキュメント
  text: CSM Enterprise のセットアップ
- link: /security/cloud_security_management/setup/csm_pro
  tag: ドキュメント
  text: CSM Pro のセットアップ
- link: /security/cloud_security_management/setup/csm_cloud_workload_security
  tag: ドキュメント
  text: CSM Workload Security のセットアップ
title: Cloud Security Management の設定
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Cloud Security Management Misconfigurations は、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

## 概要

Cloud Security Management (CSM) は、クラウドインフラストラクチャー全体にわたってリアルタイムの脅威検出と継続的な構成監査を実現し、すべてを統合ビューで表示することで、シームレスなコラボレーションと迅速な修復を可能にします。

CSM は、[CSM Enterprise][1]、[CSM Pro][2]、[CSM Workload Security][3] の 3 つのパッケージで提供されています。詳細は、[Datadog Cloud Security Management の変更点][7]を参照してください。各パッケージには、次の表に示すように、特定の**機能**セットへのアクセスが含まれています。
<table>
    <tr>
        <th>パッケージ</th>
        <th>機能</th>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_enterprise">CSM Enterprise</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/threats">Threats</a></li><li style="font-size:16px"><a href="/security/cloud_security_management/misconfigurations">Misconfigurations (クラウドアカウントと Agent)</a></li><li style="font-size:16px"><a href="/security/cloud_security_management/identity_risks">Identity Risks</a></li><li style="font-size:16px"><a href="/security/cloud_security_management/vulnerabilities">Vulnerabilities (コンテナイメージとホスト)</a></li></ul></td>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_pro">CSM Pro</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/cloud_security_management/misconfigurations">Misconfigurations (クラウドアカウントと Agent)</a></li><li style="font-size:16px"><a href="/security/cloud_security_management/vulnerabilities">Vulnerabilities (コンテナイメージ)</a></li></ul></td>
    </tr>
    <tr>
        <td><a href="/security/cloud_security_management/setup/csm_cloud_workload_security">CSM Workload Security</a></td>
        <td><ul><li style="font-size:16px"><a href="/security/threats">Threats</a></li></ul></td>
    </tr>
</table>

**注**: パッケージに含まれていない機能は、[CSM セットアップページ][4]の指示に従えばいつでも有効にすることができます。

## 前提条件

- CSM に必要な Datadog Agent の**最小**バージョンは、`7.46` 以上です。

### サポートされるデプロイメントのタイプと機能

次の表に、各デプロイメントタイプで使用できる CSM の機能をまとめます。

<div class="alert alert-info">詳細については、各 CSM 機能の見出しをクリックして、その機能の追加要件を確認してください。</div>

| タイプ          | 必要な Agent  (7.46+) | CSM Misconfigurations | [CSM Threats][8]| [CSM Vulnerabilities][9] | [CSM Identity Risks][10] |
|---------------|------------------------|-----------------------|-------------|---------------------|--------------------|
| Docker        | {{< X >}}              | {{< X >}}             | {{< X >}}   |                     |                    |
| ガイド    | {{< X >}}              | {{< X >}}             | {{< X >}}   | {{< X >}}           |                    |
| Linux         | {{< X >}}              | {{< X >}}             | {{< X >}}   | {{< X >}}           |                    |
| Amazon ECS/EKS    | {{< X >}}              | {{< X >}}             | {{< X >}}   | {{< X >}}           |                    |
| AWS アカウント   |                        | {{< X >}}             |             |                     | {{< X >}}          |
| Azure アカウント |                        | {{< X >}}             |             |                     |                    |
| GCP アカウント   |                        | {{< X >}}             |             |                     |                    |
| ログの収集       | {{< X >}}              |                       |  {{< X >}}  |                     |                    |
| AWS Fargate ECS/EKS  | {{< X >}}              |                       | beta        |                     |                    |


以下の表は各 CSM 機能ごとの追加前提条件を示しています。

### CSM Threats 

CSM Threats は、以下の Linux ディストリビューションをサポートしています。

| Linux ディストリビューション        | 対応バージョン                    |
| ---------------------------| --------------------------------------|
| Ubuntu LTS                 | 18.04、20.04、22.04                   |
| Mac OS X                      | 10 以降                           |
| Amazon Linux 2              | カーネル 4.15、5.4、5.10、および 2023      |
| SUSE Linux Enterprise Server| 12 および 15                              |
| Red Hat Enterprise Linux    | 7、8、および 9                            |
| Oracle Linux                | 7、8、および 9                            |
| Fedora                      | 7                                     |

**注:**

- カスタムカーネルビルドはサポートされていません。
- Cilium や Calico などのカスタム Kubernetes ネットワークプラグインとの互換性については、[トラブルシューティングページ][102]をご参照ください。
- データ収集は eBPF を使用して行われるため、Datadog は最低限、基底の Linux カーネルバージョン 4.15.0 以降または eBPF 機能のバックポートを備えたプラットフォームを必要とします。

### CSM Vulnerabilities 

| コンポーネント                | バージョン/要件                     |
| ------------------------ | ----------------------------------------|
| [Helm Chart][103]            | v3.49.6 以降 (Kubernetes のみ)      |
| [containerd][104]              | v1.5.6 以降 (Kubernetes とホストのみ)|

**注**: CSM Vulnerabilities は以下のコンテナランタイムでは**利用できません**。

  - CRI-O ランタイム
  - podman ランタイム

### CSM Identity Risks 

<div class="alert alert-info"><strong>注</strong>: 現時点では、CSM Identity Risks は AWS でのみ利用可能です。</div>

CSM Identity Risks を利用するには、[AWS のリソース収集を有効にする][105]必要があります。すでにこの設定を行っている場合は、追加の設定は必要ありません。

**注**: 

- [AWS アカウントで CSM Misconfigurations を有効にしている][106]場合は、すでにクラウドリソース収集が有効になっています。
- 必須ではありませんが、[CloudTrail ログの転送を有効にする][107]と、インフラストラクチャー内のリソースの実際の使用 (または未使用) に基づき、例えばプロビジョニングされた権限と使用された権限の間に大きな差があるユーザーやロールに関する追加の洞察を得ることができます。
</br>

## 適用範囲

以下の表は、各 CSM 機能に関連する適用範囲をまとめたものです。
| リソースの種類                         | CSM Misconfigurations | CSM Threats | CSM Vulnerabilities  | CSM Identity Risks | 
| ----------------------------------------| --------------------- | ----------- | -------------------- | ------------------- |  
| AWS アカウントのリソース                | {{< X >}}             |             |                      |                     |  
| Azure サブスクリプションのリソース         | {{< X >}}             |             |                      |                     | 
| GCP プロジェクトのリソース                | {{< X >}}             |             |                      |                     |  
| Kubernetes クラスター                      | {{< X >}}             | {{< X >}}   |                      |                     |  
| Docker ホスト                             | {{< X >}}             |             |                      |                     |
| Linux ホスト                              | {{< X >}}             | {{< X >}}   |    {{< X >}}         |                     |  
| Docker コンテナ                        |                       | {{< X >}}   |                      |                     |
| コンテナイメージ                         |                       |             |    {{< X >}}         |                     |
| AWS アカウントの IAM                      |                       |             |                      |  {{< X >}}          |

**注**: CSM Misconfigurations は、さらに、EC2 インスタンス、RDS、S3、ELB など、Windows と AWS Fargate を実行しているクラウドアカウントで使用されている一般的なリソースを監視します。

## 次のステップ

CSM のセットアップを開始するには、Datadog の [**Security** > **Setup**][4] セクションに移動します。ここに、CSM の構成の詳細な手順が記載されています。詳細なセットアップ手順については、[CSM Enterprise][1]、[CSM Pro][2]、[CSM Workload Security][3] のセットアップドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/setup/csm_enterprise
[2]: /ja/security/cloud_security_management/setup/csm_pro
[3]: /ja/security/cloud_security_management/setup/csm_cloud_workload_security
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: /ja/security/identity_risks/#setup
[6]: /ja/security/cloud_security_management/setup/compatibility
[7]: https://www.datadoghq.com/blog/cloud-security-management-changes/
[8]: /ja/security/cloud_security_management/setup/#csm-threats
[9]: /ja/security/cloud_security_management/setup/#csm-vulnerabilities
[10]: /ja/security/cloud_security_management/setup/#csm-identity-risks
[102]: /ja/security/cloud_security_management/troubleshooting
[103]: /ja/containers/kubernetes/installation/?tab=helm
[104]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/
[105]: /ja/integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[106]: /ja/security/cloud_security_management/setup/csm_enterprise?tab=aws#enable-resource-scanning-for-cloud-accounts
[107]: /ja/security/cloud_security_management/setup/csm_enterprise/?tab=aws#enable-cloudtrail-logs-forwarding