---
aliases:
- /ja/security/cloud_security_management/agentless_scanning/compatibility
title: Agentless Scanning の互換性
---
## 可用性 {#availability}

Agentless Scanning は、AWS、Azure、GCP でサポートされています。

以下のテーブルは、Agentless Scanning 技術と、サポートされている各クラウドプロバイダーの対応するコンポーネントとの関係を示した概要です。

| コンポーネント                                       | AWS                                                                                                                           | Azure                                                                                                                                                                             | GCP                                                                                                                                                                                                                       |
|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| オペレーティングシステム                                | Linux、Windows Server 2016 以降、Windows 10 以降                                                                      | Linux、Windows Server 2016 以降、Windows 10 以降                                                                                                                          | Linux、Windows Server 2016 以降、Windows 10 以降                                                                                                                                                                  |
| ホストファイルシステム                                | Btrfs、Ext2、Ext3、Ext4、xfs、NTFS                                                                                            | Btrfs、Ext2、Ext3、Ext4、xfs、NTFS                                                                                                                                                | Btrfs、Ext2、Ext3、Ext4、xfs、NTFS                                                                                                                                                                                        |
| パッケージマネージャー                                 | Deb (debian、ubuntu) <br> RPM (amazon-linux、fedora、redhat、centos) <br> APK (alpine)                                        | Deb (debian、ubuntu) <br> RPM (fedora、redhat、centos) <br> APK (alpine)                                                                                                          | Deb (debian、ubuntu) <br> RPM (fedora、redhat、centos) <br> APK (alpine)                                                                                                                                                  |
| 暗号化                                      | AWS </br>暗号化なし </br> 暗号化済み - Platform Managed Key (PMK) および Customer Managed Key (CMK)                             | 暗号化済み - Platform Managed Key (PMK): Azure Disk Storage Server-Side Encryption、ホストでの暗号化 </br>**注**: 暗号化済み - Customer Managed Key (CMK) は**サポートされていません**| 暗号化済み - Platform Managed Key (PMK): Persistent Disk Encryption、Confidential VM </br>**注**: 暗号化済み - Customer Managed Encryption Key (CMEK) および Customer-Supplied Encryption Keys (CSEK) は**サポートされていません** |
| コンテナランタイム                               | Docker、containerd </br> **注**: CRI-O は**サポートされていません**                                                                 | Docker、containerd </br> **注**: CRI-O は**サポートされていません**                                                                                                                     | Docker、containerd </br> **注**: CRI-O は**サポートされていません**                                                                                                                                                             |
| Serverless                                      | AWS Lambda <br> AWS Fargate for ECS                                                                                           | Azure Functions ([プレビュー][20])、Azure Container Apps、Azure Container Instances<br />**注**: 最新のエージェントレススキャナーが必要です。[エージェントレススキャンの更新][17] を参照してください。                                    | Cloud Run ([プレビュー][21])                                                                                                                                           |
| Kubernetes                                      | EC2 ノード上の EKS </br> Fargate 上の EKS </br> **注**: Fargate 上の EKS には [Datadog Cluster Agent][18] のインストールが必要です | VM 上の AKS、仮想マシンスケールセット (VMSS)、および Azure Container Instances (ACI) </br> **注**: ACI 上の AKS には [Datadog Cluster Agent][18] のインストールが必要です | GKE Standard および GKE Autopilot </br> **注**: GKE Autopilot には [Datadog Cluster Agent][18] のインストールが必要です                                                              |
| アプリケーション言語 (ホストおよびコンテナ内) | Java、.Net、Python、Node.js、Go、Ruby、Rust、PHP、Swift、Dart、Elixir、Conan、Conda                                           | Java、.Net、Python、Node.js、Go、Ruby、Rust、PHP、Swift、Dart、Elixir、Conan、Conda                                                                                               | Java、.Net、Python、Node.js、Go、Ruby、Rust、PHP、Swift、Dart、Elixir、Conan、Conda                                                                                                                                       |
| コンテナレジストリ                            | Amazon ECR (パブリックおよびプライベート): 実行中のコンテナイメージと、最後にプッシュされた 1,000 個の保存済みイメージをスキャンします                      | ACR: 実行中のコンテナイメージのみをスキャンします<br />**注:** 保存済みレジストリのスキャンはサポートされていません。リクエストするには、[Datadog Support][16] にお問い合わせください   | Google Artifact Registry: 実行中のワークロードのイメージのみをスキャンします<br />**注**: Google Artifact Registry の保存済みスキャンサポートは [プレビュー版][19] です                                                                                                                                        |
| ホストイメージ                                     | AMI                                                                                                                           | サポート対象外                                                                                                                                                                     | サポート対象外                                                                                                                                                                                                             |
| 機密データ (SDS)                            | S3                                                                                                                            | サポート対象外                                                                                                                                                                     | サポート対象外                                                                                                                                                                                                             |

**注**: AMI は Datadog の AWS インテグレーションを使用しているアカウントに保存する必要があります。そうでない場合、Datadog は AMI の基盤となる Amazon Elastic Block Store (EBS) スナップショットを読み取ることができないため、AMI のスキャンやレポート作成を行うことができません。

## Linux ディストリビューション {#linux-distributions}

ホストおよびコンテナのスキャンについては、以下の Linux ディストリビューションがサポートされています。

| オペレーティングシステム         | 対応バージョン                                  | パッケージマネージャー | セキュリティアドバイザリ                                                                                       |
|--------------------------|-----------------------------------------------------|------------------|-----------------------------------------------------------------------------------------------------------|
| Alpine Linux             | 2.2-2.7、3.0-3.19 (edge はサポート対象外)           | apk              | [https://secdb.alpinelinux.org/][1]                                                                       |
| Wolfi Linux              | N/A                                                 | apk              | [https://packages.wolfi.dev/os/security.json][2]                                                          |
| Chainguard               | N/A                                                 | apk              | [https://packages.cgr.dev/chainguard/security.json][3]                                                    |
| Red Hat Enterprise Linux | 6、7、8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] および [https://www.redhat.com/security/data/oval/v2/][5] |
| CentOS                   | 6、7、8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] および [https://www.redhat.com/security/data/oval/v2/][5] |
| AlmaLinux                | 8、9                                                | dnf/yum/rpm      | [https://errata.almalinux.org/][6]                                                                        |
| Rocky Linux              | 8、9                                                | dnf/yum/rpm      | [https://download.rockylinux.org/pub/rocky/][7]                                                           |
| Oracle Linux             | 5、6、7、8                                          | dnf/yum/rpm      | [https://linux.oracle.com/security/oval/][8]                                                              |
| CBL-Mariner              | 1.0、2.0                                            | dnf/yum/rpm      | [https://github.com/microsoft/CBL-MarinerVulnerabilityData/][9]                                           |
| Amazon Linux             | 1、2、2023                                          | dnf/yum/rpm      | [https://alas.aws.amazon.com/][10]                                                                        |
| openSUSE Leap            | 42、15                                              | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| SUSE Linux Enterprise    | 11、12、15                                          | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| Photon OS                | 1.0、2.0、3.0、4.0                                  | tdnf/yum/rpm     | [https://packages.vmware.com/photon/photon_cve_metadata/][12]                                             |
| Debian GNU/Linux         | 7、8、9、10、11、12 (unstable/sid はサポート対象外) | apt/dpkg         | [https://security-tracker.debian.org/tracker/][13] および [https://www.debian.org/security/oval/][14]        |
| Ubuntu                   | Canonical によってサポートされるすべてのバージョン                 | apt/dpkg         | [https://ubuntu.com/security/cve][15]                                                                     |

## アプリケーションライブラリ {#application-libraries}

コンテナイメージ、Lambda 関数、およびホストで実行されているコンテナの脆弱性スキャンでは、以下のアプリケーション言語とライブラリがサポートされています。

| 言語 | サポートされているパッケージマネージャー | サポートされているファイル                                                      |
|----------|---------------------------|----------------------------------------------------------------------|
| Ruby     | bundler                   | Gemfile.lock、gemspec                                                |
| .NET     | nuget                     | packages.lock.json、packages.config、.deps.json、*packages.props     |
| Go       | mod                       | Go でビルドされたバイナリ、go.mod                                         |
| Java     | Gradle、Maven             | pom.xml、*gradle.lockfile、JAR/WAR/PAR/EAR (pom.properties を含む)     |
| Node.js  | npm、pnpm、yarn           | package-lock.json、yarn.lock、pnpm-lock.yaml、package.json           |
| PHP      | composer                  | composer.lock                                                        |
| Python   | pip、poetry               | pipfile.lock、poetry.lock、egg パッケージ、wheel パッケージ、conda パッケージ |

## コンテナイメージレジストリ {#container-image-registries}

コンテナイメージスキャンでは、以下のコンテナイメージレジストリがサポートされています。

| レジストリ                        | サポートレベル | メモ                                                                                                                                                                                                                                         |
|---------------------------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon ECR (パブリックおよびプライベート) | GA            | 実行中のコンテナイメージ**および**最後にプッシュされた 1,000 個の保存済みイメージ (日付順) をスキャンします。これは、保存済みスキャンをサポートする唯一のレジストリです。<br />**注:** スキャンする保存済みイメージの数を増やすには、[Datadog サポート][16] にお問い合わせください。|
| Google Artifact Registry (GAR)  | プレビュー       | 実行中のワークロード (Cloud Run、GKE) に関連付けられたイメージのみをスキャンします。<br />**注**: Google Artifact Registry の保存済みスキャンサポートは [プレビュー版][19] です。                                                                                             |
| Azure Container Registry (ACR)  | GA            | Azure Container Apps および Azure Container Instances で実行中のコンテナイメージのみをスキャンします。<br />**注**: レジストリの保存済みスキャンはサポートされていません。リクエストするには、[Datadog サポート][16] にお問い合わせください                                                                |

**注**: レジストリからのコンテナイメージスキャンは、Agentless を以下でインストールしている場合にのみサポートされます。
  - CloudFormation Integrations >= v2.0.8
  - Terraform Agentless Module >= v0.11.7

## コンテナランタイム {#container-runtimes}

以下のコンテナランタイムがサポートされています。

- containerd: v1.5.6 以降
- Docker

**コンテナ観測に関する注記**: Agentless Scanning には、圧縮されていないコンテナイメージレイヤーが必要です。回避策として、containerd 構成ファイルで構成オプション `discard_unpacked_layers=false` を設定できます。

[1]: https://secdb.alpinelinux.org/
[2]: https://packages.wolfi.dev/os/security.json
[3]: https://packages.cgr.dev/chainguard/security.json
[4]: https://www.redhat.com/security/data/metrics/
[5]: https://www.redhat.com/security/data/oval/v2/
[6]: https://errata.almalinux.org/
[7]: https://download.rockylinux.org/pub/rocky/
[8]: https://linux.oracle.com/security/oval/
[9]: https://github.com/microsoft/CBL-MarinerVulnerabilityData/
[10]: https://alas.aws.amazon.com/
[11]: http://ftp.suse.com/pub/projects/security/cvrf/
[12]: https://packages.vmware.com/photon/photon_cve_metadata/
[13]: https://security-tracker.debian.org/tracker/
[14]: https://www.debian.org/security/oval/
[15]: https://ubuntu.com/security/cve
[16]: /ja/help
[17]: /ja/security/cloud_security_management/setup/agentless_scanning/update
[18]: /ja/containers/cluster_agent/setup/
[19]: https://www.datadoghq.com/product-preview/google-artifact-registry-at-rest-scanning/
[20]: https://www.datadoghq.com/product-preview/azure-functions-vulnerability-scanning/
[21]: https://www.datadoghq.com/product-preview/google-cloud-run-functions-vulnerability-scanning/