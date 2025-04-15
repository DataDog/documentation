
### CSM Threats

CSM Threats は、以下の Linux ディストリビューションをサポートしています。

| Linux ディストリビューション        | 対応バージョン                    |
| ---------------------------| --------------------------------------|
| Ubuntu LTS                 | 18.04、20.04、22.04                   |
| Debian                      | 10 以降                           |
| Amazon Linux 2              | カーネル 4.15、5.4、5.10、および 2023      |
| SUSE Linux Enterprise Server| 12 および 15                              |
| Red Hat Enterprise Linux    | 7、8、および 9                            |
| Oracle Linux                | 7、8、および 9                            |
| CentOS                      | 7                                     |

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

[102]: /security/cloud_security_management/troubleshooting
[103]: /containers/kubernetes/installation/?tab=helm
[104]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/
[105]: /integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[106]: /security/cloud_security_management/setup/csm_enterprise?tab=aws#enable-resource-scanning-for-cloud-accounts
[107]: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#enable-cloudtrail-logs-forwarding
