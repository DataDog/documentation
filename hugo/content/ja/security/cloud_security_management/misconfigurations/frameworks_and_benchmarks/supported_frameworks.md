---
aliases:
- /ja/security/misconfigurations/supported_frameworks
- /ja/security/misconfigurations/frameworks_and_benchmarks/supported_frameworks
further_reading:
- link: security/cspm/setup
  tag: ドキュメント
  text: Cloud Security Misconfigurations の概要
- link: security/default_rules
  tag: ドキュメント
  text: デフォルトの Cloud Security Misconfigurations クラウド構成コンプライアンスルールを調べる
- link: security/cspm/findings
  tag: ドキュメント
  text: 誤構成の検索と調査
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: ブログ
  text: Datadog Security による Google Cloud のコンプライアンスと脅威対策機能の拡張
title: サポートされるフレームワーク
---
Cloud Security Misconfigurations には、クラウドリソースの構成を評価して潜在的な誤設定を特定する、1,000 以上のすぐに使えるコンプライアンスルールが付属しています。各 [コンプライアンスルール][1] は、以下のコンプライアンス基準および業界ベンチマーク内の 1 つ以上のコントロールに対応しています。

{{% cloud-sec-cloud-infra %}}

| フレームワーク                                       | サポートされているバージョン             | フレームワークタグ                       | ルールタイプ                |
|-------------------------------------------------|--------------------------------|-------------------------------------|--------------------------|
| [AICPA SOC 2][7]                                | 2017 TSC w/ rev POF - 2022     | `soc-2`                             | Cloud                    |
| [Australia APRA CPS 234][39]                    | 2019                           | `cps234`                            | Cloud                    |
| [Australia ASD Essential 8][40]                 | 2024                           | `essential8`                        | Cloud                    |
| [AWS Foundational Security Best Practices][13]  | v1.0.0                         | `aws-fsbp`                          | Cloud                    |
| [Brazil LGPD][44]                               | 2018                           | `lgpd`                              | Cloud                    |
| [California CCPA/CPRA][38]                      | Nov 2022                       | `ccpa`                              | Cloud                    |
| [CIS AlmaLinux 9][16]                           | v2.0.0                         | `cis-almalinux9`                    | インフラストラクチャー           |
| [CIS Amazon Linux 2023][25]                     | v1.0.0                         | `cis-al2023`                        | インフラストラクチャー           |
| [CIS Amazon Linux 2][25]                        | v3.0.0                         | `cis-amzn2`                         | インフラストラクチャー           |
| [CIS AWS Foundations Benchmark*][2]             | v5.0.0、v4.0.0、v3.0.0、v1.5.0 | `cis-aws`                           | Cloud                    |
| [CIS Azure Foundations Benchmark][3]            | v4.0.0、v2.0.0                 | `cis-azure`                         | Cloud                    |
| [CIS Docker Benchmark][4]                       | v1.2                           | `cis-docker`                        | インフラストラクチャー           |
| [CIS GCP Foundations Benchmark][22]             | v3.0.0                         | `cis-gcp`                           | Cloud                    |
| [CIS GKE][34]                                   | v1.6.0                         | `cis-gke`                           | Cloud                    |
| [CIS Kubernetes (AKS) Benchmark**][5]           | v1.4.0                         | `cis-aks`                           | Cloud およびインフラストラクチャー |
| [CIS Kubernetes (EKS) Benchmark**][5]           | v1.7.0、v1.4.0                 | `cis-eks`                           | Cloud およびインフラストラクチャー |
| [CIS Kubernetes Benchmark**][5]                 | v1.9.0                         | `cis-kubernetes`                    | インフラストラクチャー           |
| [CIS Red Hat Linux 7][24]                       | v3.1.1                         | `cis-rhel7`                         | インフラストラクチャー           |
| [CIS Red Hat Linux 8][24]                       | v3.0.0                         | `cis-rhel8`                         | インフラストラクチャー           |
| [CIS Red Hat Linux 9][24]                       | v2.0.0                         | `cis-rhel9`                         | インフラストラクチャー           |
| [CIS Ubuntu 20.04][23]                          | v1.0.0                         | `cis-ubuntu2004`                    | インフラストラクチャー           |
| [CIS Ubuntu 22.04][23]                          | v2.0.0                         | `cis-ubuntu2204`                    | インフラストラクチャー           |
| [CIS Ubuntu 24.04][23]                          | v1.0.0                         | `cis-ubuntu2404`                    | インフラストラクチャー           |
| [CMMC][37]                                      | v2.0                           | `cmmc-level-2`                      | Cloud                    |
| [Digital Operational Resilience Act (DORA)][35] | C(2024) 1532                   | `dora`                              | Cloud                    |
| [Essential Cloud Security Controls][33]         | v2                             | `essential-cloud-security-controls` | Cloud                    |
| [EU Cyber Resilience Act][43]                   | 2024                           | `cyber-resilience-act`              | Cloud                    |
| [FedRAMP High][36]                              | v5                             | `fedramp-high`                      | Cloud                    |
| [FedRAMP Moderate][36]                          | v5                             | `fedramp-moderate`                  | Cloud                    |
| [FedRAMP Low][36]                               | v5                             | `fedramp-low`                       | Cloud                    |
| [GDPR][10]                                      | 2016/679                       | `gdpr`                              | Cloud                    |
| [HIPAA][9]                                      | 800-66-r2                      | `hipaa`                             | Cloud                    |
| [ISO/IEC 27001][8]                              | 2022、2013                     | `iso-27001`                         | Cloud                    |
| [NIS2 Directive (EU)][14]                       | 2022/2555                      | `nis2`                              | Cloud                    |
| [NIST 800-171][31]                              | v3                             | `nist-800-171`                      | Cloud                    |
| [NIST 800-53][30]                               | v5                             | `nist-800-53`                       | Cloud                    |
| [NIST AI Risk Management Framework][15]         | v1.0                           | `nist-ai-rmf`                       | Cloud                    |
| [NIST Cybersecurity Framework][32]              | v2.0、v1.1                     | `nist-csf`                          | Cloud                    |
| [PCI DSS][6]                                    | v4.0                           | `pci-dss`                           | Cloud                    |
| [UK Cyber Essentials][42]                       | 2024                           | `cyber-essentials`                  | Cloud                    |
| [Singapore MAS TRM][41]                         | 2021                           | `mas-trm`                           | Cloud                    |

*[CIS AWS Foundations ベンチマーク][2] のモニタリングセクションに合格するには、[Cloud SIEM][11] を有効にし、[CloudTrail を Datadog][12] へ転送する**必要があります**。

**一部の [CIS Kubernetes ベンチマーク][5] のコンプライアンスルールは、セルフホスト型の Kubernetes クラスターにのみ適用されます。**注**:

- Cloud Security Misconfigurations は、リソースが特定のコンプライアンスルールに基づいて構成されているかを視覚化します。これらのルールは、さまざまな規制フレームワーク、ベンチマーク、および標準 (Security Posture Frameworks) に対応します。Cloud Security Misconfigurations は、Security Posture Framework への実際のコンプライアンスを評価するものではありません。また、コンプライアンスルールは特定のフレームワークに関する構成設定のすべてに対応するわけではありません。Datadog は、Cloud Security Misconfigurations を使用する際に法務顧問やコンプライアンスの専門家と相談することを推奨します。
- CIS ベンチマークのコンプライアンスルールは、CIS の自動化された推奨事項に従っています。CIS 認証を取得する場合、Datadog は、全体的なセキュリティ評価の一環として、手動の推奨事項も確認することを推奨します。
- Datadog はまた、Datadog の社内セキュリティ専門家が開発した推奨事項である Essential Cloud Security Controls も提供しています。このルールセットは、Datadog で観測した一般的なクラウドセキュリティリスクに基づいており、クラウドセキュリティに初めて取り組むユーザーがクラウド環境全体で影響力の大きい誤構成を修正できるよう支援することを目的としています。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security_monitoring/default_rules/
[2]: https://www.cisecurity.org/benchmark/amazon_web_services/
[3]: https://www.cisecurity.org/benchmark/azure
[4]: https://www.cisecurity.org/benchmark/docker
[5]: https://www.cisecurity.org/benchmark/kubernetes/
[6]: https://www.pcisecuritystandards.org/document_library
[7]: https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2
[8]: https://www.iso.org/isoiec-27001-information-security.html
[9]: https://www.hhs.gov/hipaa/index.html
[10]: https://gdpr.eu/
[11]: /ja/security/cloud_siem/
[12]: /ja/integrations/amazon_cloudtrail/
[13]: https://docs.aws.amazon.com/securityhub/latest/userguide/fsbp-standard.html
[14]: https://digital-strategy.ec.europa.eu/en/policies/nis2-directive
[15]: https://www.nist.gov/itl/ai-risk-management-framework
[16]: https://www.cisecurity.org/benchmark/almalinuxos_linux
[22]: https://www.cisecurity.org/benchmark/google_cloud_computing_platform
[23]: https://www.cisecurity.org/benchmark/ubuntu_linux
[24]: https://www.cisecurity.org/benchmark/red_hat_linux
[25]: https://www.cisecurity.org/benchmark/amazon_linux
[30]: https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final
[31]: https://csrc.nist.gov/pubs/sp/800/171/r3/final
[32]: https://www.nist.gov/cyberframework/framework
[33]: https://www.datadoghq.com/blog/essential-cloud-security-controls-ruleset-v2/
[34]: https://www.cisecurity.org/benchmark/kubernetes
[35]: https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en
[36]: https://www.fedramp.gov/
[37]: https://dowcio.war.gov/CMMC/About/
[38]: https://oag.ca.gov/privacy/ccpa
[39]: https://www.apra.gov.au/sites/default/files/cps_234_july_2019_for_public_release.pdf
[40]: https://www.cyber.gov.au/business-government/asds-cyber-security-frameworks/essential-eight
[41]: https://www.mas.gov.sg/regulation/guidelines/technology-risk-management-guidelines
[42]: https://www.ncsc.gov.uk/cyberessentials/overview
[43]: https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act
[44]: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/outros-documentos-e-publicacoes-institucionais/lgpd-en-lei-no-13-709-capa.pdf