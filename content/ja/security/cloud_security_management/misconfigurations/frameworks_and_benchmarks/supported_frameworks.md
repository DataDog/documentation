---
aliases:
- /ja/security/misconfigurations/supported_frameworks
- /ja/security/misconfigurations/frameworks_and_benchmarks/supported_frameworks
further_reading:
- link: security/cspm/setup
  tag: ドキュメント
  text: CSM Misconfigurations の概要
- link: security/default_rules
  tag: ドキュメント
  text: デフォルトの CSM Misconfigurations クラウド構成コンプライアンスルールを調べる
- link: security/cspm/findings
  tag: ドキュメント
  text: 誤構成の検索と調査
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: ブログ
  text: Datadog Security による Google Cloud のコンプライアンスと脅威対策機能の拡張
kind: ドキュメント
title: Supported Frameworks
---

CSM Misconfigurations comes with more than 1,000 out-of-the-box compliance rules that evaluate the configuration of your cloud resources and identify potential misconfigurations. Each [compliance rule][1] maps to one or more controls within the following compliance standards and industry benchmarks:

| フレームワーク                                   | フレームワークタグ     | ルールタイプ                |
|---------------------------------------------|-------------------|--------------------------|
| [CIS AWS Foundations ベンチマーク v1.5.0*][2]  | `cis-aws`         | クラウド                    |
| [CIS Azure Foundations Benchmark v2.0.0][3] | `cis-azure`       | クラウド                    |
| [CIS GCP Foundations ベンチマーク v1.3.0][22]  | `cis-gcp`         | クラウド                    |
| [CIS Docker ベンチマーク v1.2.0][4]            | `cis-docker `     | インフラストラクチャー           |
| [CIS Kubernetes Benchmark v1.7.0**][5]      | `cis-kubernetes`  | インフラストラクチャー           |
| [CIS Kubernetes (AKS) Benchmark v1.4.0**][5]      | `cis-aks`         | Cloud and Infrastructure |
| [CIS Kubernetes (EKS) Benchmark v1.3.0 **][5]     | `cis-eks`         | Cloud and Infrastructure |
| [CIS Ubuntu 20.04 v1.0.0][23]               | `cis-ubuntu2004`  | インフラストラクチャー           |
| [CIS Ubuntu 22.04 v1.0.0][23]               | `cis-ubuntu2204 ` | インフラストラクチャー           |
| [CIS Red Hat Linux 7 v3.1.1][24]            | `cis-rhel7`       | インフラストラクチャー           |
| [CIS Red Hat Linux 8 v2.0.0][24]            | `cis-rhel8`       | インフラストラクチャー           |
| [CIS Red Hat Linux 9 v1.0.0][24]            | `cis-rhel9`       | インフラストラクチャー           |
| [CIS Amazon Linux 2 v1.0.0][25]             | `cis-amzn2`       | インフラストラクチャー           |
| [CIS Amazon Linux 2023 v1.0.0][25]          | `cis-al2023`      | インフラストラクチャー           |
| [PCI DSS v4.0][6]                           | `pci-dss`         | クラウド                    |
| [AICPA SOC 2][7]                            | `soc-2`           | クラウド                    |
| [ISO/IEC 27001 v2][8]                       | `iso-27001`       | クラウド                    |
| [HIPAA][9]                                  | `hipaa`           | クラウド                    |
| [GDPR][10]                                  | `gdpr`            | クラウド                    |
| [NIST 800-53][30]                           | `nist-800-53`     | クラウド                    |
| [NIST 800-171][31]                          | `nist-800-171`    | クラウド                    |
| [NIST Cybersecurity Framework v1.1][32]     | `nist-csf`        | クラウド                    |

*[CIS AWS Foundations ベンチマーク][2]のモニタリングセクションに合格するには、 [Cloud SIEM][11] を有効にし、[CloudTrail を Datadog][12] へ転送する**必要があります**。

**一部の [CIS Kubernetes ベンチマーク][5]のコンプライアンスルールは、セルフホスト型の Kubernetes クラスターにのみ適用されます。

**注**:

- CSM Misconfigurations は、リソースが特定のコンプライアンスルールに基づいて構成されているかを視覚化します。これらのルールは、さまざまな規制フレームワーク、ベンチマーク、標準 (セキュリティポスチャフレームワーク) などに対応します。CSM Misconfigurations はセキュリティポスチャフレームワークへの実際のコンプライアンスを評価するものでありません。また、コンプライアンスルールは特定のフレームワークに関する構成設定のすべてに対応するわけではありません。CSM Misconfigurations を導入する際には、法律顧問やコンプライアンスの専門家と相談することが推奨されます。
- CIS ベンチマークのコンプライアンスルールは、CIS の自動化された推奨事項に従っています。CIS 認証を取得する場合、Datadog では、全体的なセキュリティ評価の一環として、手動による推奨事項も確認することを推奨します。
- Datadog はまた、Datadog の社内セキュリティ専門家が開発した推奨事項である Essential Cloud Security Controls も提供しています。このルールセットは、Datadog によって観測された一般的なクラウドセキュリティリスクに基づいており、クラウドセキュリティに初めて取り組むユーザーが、クラウド環境全体で影響力の大きい誤構成を修正できるようにすることを目的としています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security_monitoring/default_rules/
[2]: https://www.cisecurity.org/benchmark/amazon_web_services/
[3]: https://www.cisecurity.org/benchmark/azure
[4]: https://www.cisecurity.org/benchmark/docker
[5]: https://www.cisecurity.org/benchmark/kubernetes/
[6]: https://www.pcisecuritystandards.org/document_library
[7]: https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html
[8]: https://www.iso.org/isoiec-27001-information-security.html
[9]: https://www.hhs.gov/hipaa/index.html
[10]: https://gdpr.eu/
[11]: /ja/security/cloud_siem/
[12]: /ja/integrations/amazon_cloudtrail/
[22]: https://www.cisecurity.org/benchmark/google_cloud_computing_platform
[23]: https://www.cisecurity.org/benchmark/ubuntu_linux
[24]: https://www.cisecurity.org/benchmark/red_hat_linux
[25]: https://www.cisecurity.org/benchmark/amazon_linux
[30]: https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final
[31]: https://csrc.nist.gov/pubs/sp/800/171/r2/upd1/final
[32]: https://www.nist.gov/cyberframework/framework