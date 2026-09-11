---
aliases:
- /ja/security/cloud_security_management/agentless_scanning/compatibility
title: エージェントレススキャン互換性
---
## 可用性 {#availability}

エージェントレススキャンは、AWS、Azure、GCPでサポートされています。

以下の表は、サポートされている各クラウドプロバイダーの対応コンポーネントに関連するエージェントレススキャン技術の概要を示しています。

| コンポーネント                                       | AWS                                                                                                                           | Azure                                                                                                                                                                             | GCP                                                                                                                                                                                                                       |
|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| オペレーティングシステム                                | Linux; Windows Server 2016以降; Windows 10以降                                                                      | Linux; Windows Server 2016以降; Windows 10以降                                                                                                                          | Linux; Windows Server 2016以降; Windows 10以降                                                                                                                                                                  |
| ホストファイルシステム                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                            | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                                                        |
| パッケージマネージャー                                 | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine)                                        | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                          | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                                                                  |
| 暗号化                                      | AWS </br> 非暗号化 </br> 暗号化 - プラットフォーム管理キー (PMK) およびカスタマー管理キー (CMK)                             | 暗号化 - プラットフォーム管理キー (PMK): Azure Disk Storageサーバー側暗号化、ホストでの暗号化 </br> **注**: 暗号化 - カスタマー管理キー (CMK) は **サポートされていません** | 暗号化 - プラットフォーム管理キー (PMK): Persistent Disk暗号化、Confidential VM </br> **注**: 暗号化 - カスタマー管理暗号化キー (CMEK) およびカスタマー提供暗号化キー (CSEK) は **サポートされていません** |
| コンテナランタイム                               | Docker、containerd </br> **注**: CRI-O は **サポートされていません**                                                                 | Docker、containerd </br> **注**: CRI-O は **サポートされていません**                                                                                                                     | Docker、containerd </br> **注**: CRI-O は **サポートされていません**                                                                                                                                                             |
| サーバーレス                                      | AWS Lambda <br> AWS Fargate for ECS                                                                                           | Azure Functions（[プレビュー][20]）、Azure Container Apps、Azure Container Instances<br />**注**: 最新のエージェントレススキャナーが必要です。[エージェントレススキャンの更新][17] を参照してください。                                    | Cloud Run（[プレビュー][21]）|
| Kubernetes                                      | EKS on EC2ノード </br>EKS on Fargate </br> **注**: EKS on Fargate には [Datadog Cluster Agent][18] のインストールが必要です | AKS on 仮想マシンおよび仮想マシンスケールセット (VMSS) </br> **注**: AKS on ACI は **サポートされていません** | GKE Standard のみ </br> **注**: GKE Autopilot およびイメージストリーミングは **サポートされていません** |
| アプリケーション言語（ホストおよびコンテナ内） | Java、.Net、Python、Node.js、Go、Ruby、Rust、PHP、Swift、Dart、Elixir、Conan、Conda | Java、.Net、Python、Node.js、Go、Ruby、Rust、PHP、Swift、Dart、Elixir、Conan、Conda | Java、.Net、Python、Node.js、Go、Ruby、Rust、PHP、Swift、Dart、Elixir、Conan、Conda |
| コンテナレジストリ | Amazon ECR（パブリックおよびプライベート）：実行中のコンテナイメージおよび直近1,000件の保存済みイメージをスキャン | ACR：実行中のコンテナイメージのみスキャン<br />**注:** 保存済みレジストリのスキャンはサポートされていません。リクエストするには、[Datadogサポート][16]にお問い合わせください | Google Artifact Registry：実行中のワークロードからのイメージのみスキャン<br />**注**: Google Artifact Registry の保存済みスキャンのサポートは[プレビュー][19]です |
| ホストイメージ | AMI | サポートされていません | サポートされていません |
| 機密データ（SDS） | S3 | サポートされていません | サポートされていません |

**注**: AMIはDatadogのAWSインテグレーションを使用しているアカウントに保存する必要があります。そうでない場合、DatadogはAMIの基盤となるAmazon Elastic Block Store (EBS) スナップショットを読み取ることができないため、AMIのスキャンやレポート作成を行うことができません。

## Linuxディストリビューション {#linux-distributions}

ホストおよびコンテナのスキャンでは、以下のLinuxディストリビューションがサポートされています。

| オペレーティングシステム         | サポートされているバージョン                                  | パッケージマネージャー | セキュリティアドバイザリ                                                                                       |
|--------------------------|-----------------------------------------------------|------------------|-----------------------------------------------------------------------------------------------------------|
| Alpine Linux             | 2.2-2.7, 3.0-3.19 (edgeはサポートされていません)           | apk              | [https://secdb.alpinelinux.org/][1]                                                                       |
| Wolfi Linux              | N/A                                                 | apk              | [https://packages.wolfi.dev/os/security.json][2]                                                          |
| Chainguard               | N/A                                                 | apk              | [https://packages.cgr.dev/chainguard/security.json][3]                                                    |
| Red Hat Enterprise Linux | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] and [https://www.redhat.com/security/data/oval/v2/][5] |
| CentOS                   | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] and [https://www.redhat.com/security/data/oval/v2/][5] |
| AlmaLinux                | 8, 9                                                | dnf/yum/rpm      | [https://errata.almalinux.org/][6]                                                                        |
| Rocky Linux              | 8, 9                                                | dnf/yum/rpm      | [https://download.rockylinux.org/pub/rocky/][7]                                                           |
| Oracle Linux             | 5, 6, 7, 8                                          | dnf/yum/rpm      | [https://linux.oracle.com/security/oval/][8]                                                              |
| CBL-Mariner              | 1.0, 2.0                                            | dnf/yum/rpm      | [https://github.com/microsoft/CBL-MarinerVulnerabilityData/][9]                                           |
| Amazon Linux             | 1, 2, 2023                                          | dnf/yum/rpm      | [https://alas.aws.amazon.com/][10]                                                                        |
| openSUSE Leap            | 42, 15                                              | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| SUSE Linux Enterprise    | 11, 12, 15                                          | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| Photon OS                | 1.0, 2.0, 3.0, 4.0                                  | tdnf/yum/rpm     | [https://packages.vmware.com/photon/photon_cve_metadata/][12]                                             |
| Debian GNU/Linux         | 7, 8, 9, 10, 11, 12 (unstable/sidはサポート対象外です) | apt/dpkg         | [https://security-tracker.debian.org/tracker/][13] and [https://www.debian.org/security/oval/][14]        |
| Ubuntu                   | Canonicalがサポートするすべてのバージョン                 | apt/dpkg         | [https://ubuntu.com/security/cve][15]                                                                     |

## アプリケーションライブラリ {#application-libraries}

コンテナイメージ、Lambda関数、およびホストで実行されているコンテナの脆弱性スキャンでは、以下のアプリケーション言語とライブラリがサポートされています。

| 言語 | サポートされているパッケージマネージャー | サポートされているファイル |
|----------|---------------------------|----------------------------------------------------------------------|
| Ruby | bundler | Gemfile.lock, gemspec |
| .NET | nuget | packages.lock.json, packages.config, .deps.json, *packages.props |
| Go | mod | Goでビルドされたバイナリ、go.mod |
| Java | Gradle、Maven | pom.xml、*gradle.lockfile、JAR/WAR/PAR/EAR (pom.propertiesを含む) |
| Node.js | npm、pnpm、yarn | package-lock.json、yarn.lock、pnpm-lock.yaml、package.json |
| PHP | composer | composer.lock |
| Python | pip、poetry | pipfile.lock、poetry.lock、eggパッケージ、wheelパッケージ、condaパッケージ |

## コンテナイメージレジストリ {#container-image-registries}

コンテナイメージスキャンでは、以下のコンテナイメージレジストリがサポートされています。

| レジストリ | サポートレベル | 備考 |
|---------------------------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon ECR (パブリックおよびプライベート) | GA | 実行中のコンテナイメージ**および**最後にプッシュされた1,000個の保存済みイメージ（日付順）をスキャンします。これは、保存済みスキャンをサポートする唯一のレジストリです。<br />**注:** スキャンする保存済みイメージの数を増やすには、[Datadogサポート][16]にお問い合わせください。|
| Google Artifact Registry (GAR) | プレビュー | 実行中のワークロード（Cloud Run、GKE）に関連付けられたイメージのみをスキャンします。<br />**注**： Google Artifact Registryの保存済みスキャンサポートは[プレビュー][19]段階です。|
| Azure Container Registry (ACR) | GA | Azure Container AppsおよびAzure Container Instancesで実行中のコンテナイメージのみをスキャンします。<br />**注**： レジストリの保存済みスキャンはサポートされていません。リクエストするには、[Datadogサポート][16]にお問い合わせください。|

**注**： レジストリからのコンテナイメージスキャンは、Agentlessを以下でインストールしている場合にのみサポートされます。
  - CloudFormation Integrations >= v2.0.8
  - Terraform Agentlessモジュール >= v0.11.7

## コンテナランタイム {#container-runtimes}

以下のコンテナランタイムがサポートされています。

- containerd: v1.5.6以降
- Docker

**コンテナ監視に関する注記**： エージェントレススキャンには、圧縮されていないコンテナイメージレイヤーが必要です。回避策として、containerd設定ファイルで設定オプション `discard_unpacked_layers=false` を指定できます。

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