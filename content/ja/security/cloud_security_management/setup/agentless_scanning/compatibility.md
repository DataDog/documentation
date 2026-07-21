---
aliases:
- /ja/security/cloud_security_management/agentless_scanning/compatibility
title: Agentless Scanning の互換性
---

## 提供状況

Agentless Scanning は AWS、Azure、GCP でサポートされています。

次の表は、サポート対象の各クラウド プロバイダーごとに、Agentless Scanning が対応している技術と関連コンポーネントをまとめたものです。

| コンポーネント                                       | AWS                                                                                                      | Azure                                                                                                                                                                             | GCP                                                                                                                                                                                                                       |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| オペレーティング システム                                | Linux; Windows Server 2016 以降; Windows 10 以降                                                 | Linux; Windows Server 2016 以降; Windows 10 以降                                                                                                                          | Linux; Windows Server 2016 以降; Windows 10 以降                                                                                                                                                                  |
| ホスト ファイル システム                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                       | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                                                        |
| パッケージ マネージャー                                 | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine)                   | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                          | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                                                                  |
| 暗号化                                      | AWS </br> 暗号化なし </br> 暗号化あり - Platform Managed Key (PMK) および Customer Managed Key (CMK)        | 暗号化あり - Platform Managed Key (PMK): Azure Disk Storage Server-Side Encryption、Encryption at host </br> **注**: 暗号化あり - Customer Managed Key (CMK) には **対応していません** | 暗号化あり - Platform Managed Key (PMK): Persistent Disk Encryption、Confidential VM </br> **注**: 暗号化あり - Customer Managed Encryption Key (CMEK) および Customer-Supplied Encryption Keys (CSEK) には **対応していません** |
| コンテナ ランタイム                               | Docker、containerd </br> **注**: CRI-O には **対応していません**                                            | Docker、containerd </br> **注**: CRI-O には **対応していません**                                                                                                                     | Docker、containerd </br> **注**: CRI-O には **対応していません**                                                                                                                                                             |
| サーバーレス                                      | AWS Lambda <br> AWS Fargate for ECS                                                                      | Azure Container Apps および Azure Container Instances <br /> **注**: 最新バージョンの agentless scanner が必要です。[Agentless Scanning の更新][17] を参照してください。                                                                           | Cloud Run (コンテナ デプロイのみ - GitHub リポジトリやインライン エディタからのデプロイは対象外)                                                                                                                                           |
| Kubernetes                                      | EC2 ノード上の EKS のみ </br> **注**: Fargate ベースの EKS ノードには **対応していません**                     | 仮想マシンおよび Virtual Machine Scale Sets (VMSS) 上の AKS </br> **注**: ACI 上の AKS には **対応していません**                                                                     | GKE Standard のみ </br> **注**: GKE Autopilot およびイメージ ストリーミングには **対応していません**                                                                                                                                 |
| アプリケーション言語 (ホストおよびコンテナ内) | Java, .NET, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                      | Java, .NET, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                               | Java, .NET, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                                                                       |
| コンテナ レジストリ                            | Amazon ECR (public and private): 稼働中のコンテナ イメージに加え、レジストリ内に保存されている直近 1,000 件の push 済みイメージをスキャン | ACR: 稼働中のコンテナ イメージのみをスキャン <br /> **注**: レジストリ内に保存されたイメージのスキャンを希望する場合は、[Datadog サポート][16] にお問い合わせください                                             | Google Artifact Registry: 稼働中のワークロードに紐付いたイメージのみをスキャン <br /> **注**: レジストリ内に保存されたイメージのスキャンを希望する場合は、[Datadog サポート][16] にお問い合わせください                                                                     |
| ホスト イメージ                                     | AMI                                                                                                      | 非対応                                                                                                                                                                     | 非対応                                                                                                                                                                                                             |
| 機微データ (SDS)                            | S3、RDS (プライベート ベータ)                                                                                   | 非対応                                                                                                                                                                     | 非対応                                                                                                                                                                                                             |

**注**: AMI は Datadog の AWS integration を利用しているアカウントに保存されている必要があります。そうでない場合、Datadog は AMI の基盤となる Amazon Elastic Block Store (EBS) スナップショットを読み取れないため、AMI のスキャンやレポートを行えません。

## Linux ディストリビューション

ホストおよびコンテナのスキャンでは、次の Linux ディストリビューションがサポートされています。

| オペレーティング システム         | 対応バージョン                                  | パッケージ マネージャー | セキュリティ アドバイザリ                                                                                       |
|--------------------------|-----------------------------------------------------|------------------|-----------------------------------------------------------------------------------------------------------|
| Alpine Linux             | 2.2 - 2.7、3.0 - 3.19 (edge はサポート対象外)           | apk              | [https://secdb.alpinelinux.org/][1]                                                                       |
| Wolfi Linux              | N/A                                                 | apk              | [https://packages.wolfi.dev/os/security.json][2]                                                          |
| Chainguard               | N/A                                                 | apk              | [https://packages.cgr.dev/chainguard/security.json][3]                                                    |
| Red Hat Enterprise Linux | 6、7、8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] および [https://www.redhat.com/security/data/oval/v2/][5] |
| CentOS                   | 6、7、8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] および [https://www.redhat.com/security/data/oval/v2/][5] |
| AlmaLinux                | 8、9                                                | dnf/yum/rpm      | [https://errata.almalinux.org/][6]                                                                        |
| Rocky Linux              | 8、9                                                | dnf/yum/rpm      | [https://download.rockylinux.org/pub/rocky/][7]                                                           |
| Oracle Linux             | 5、6、7、8                                          | dnf/yum/rpm      | [https://linux.oracle.com/security/oval/][8]                                                              |
| CBL-Mariner              | 1.0、2.0                                            | dnf/yum/rpm      | [https://github.com/microsoft/CBL-MarinerVulnerabilityData/][9]                                           |
| Amazon Linux             | 1, 2, 2023                                          | dnf/yum/rpm      | [https://alas.aws.amazon.com/][10]                                                                        |
| openSUSE Leap            | 42、15                                              | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| SUSE Linux Enterprise    | 11、12、15                                          | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| Photon OS                | 1.0、2.0、3.0、4.0                                  | tdnf/yum/rpm     | [https://packages.vmware.com/photon/photon_cve_metadata/][12]                                             |
| Debian GNU/Linux         | 7、8、9、10、11、12 (unstable/sid はサポート対象外) | apt/dpkg         | [https://security-tracker.debian.org/tracker/][13] および [https://www.debian.org/security/oval/][14]        |
| Ubuntu                   | Canonical がサポートするすべてのバージョン                 | apt/dpkg         | [https://ubuntu.com/security/cve][15]                                                                     |

## アプリケーション ライブラリ

コンテナ イメージ、Lambda 関数、およびホスト上で稼働するコンテナに対する脆弱性スキャンでは、次のアプリケーション言語とライブラリがサポートされています。

| 言語 | 対応パッケージ マネージャー | 対応ファイル                                                      |
|----------|---------------------------|----------------------------------------------------------------------|
| Ruby     | bundler                   | Gemfile.lock, gemspec                                                |
| .NET     | nuget                     | packages.lock.json, packages.config, .deps.json, *packages.props     |
| Go       | mod                       | Go でビルドされたバイナリ、go.mod                                         |
| Java     | Gradle, Maven             | pom.xml, *gradle.lockfile, JAR/WAR/PAR/EAR (pom.properties を含む)     |
| Node.js  | npm, pnpm, yarn           | package-lock.json, yarn.lock, pnpm-lock.yaml, package.json           |
| PHP      | composer                  | composer.lock                                                        |
| Python   | pip, poetry               | pipfile.lock, poetry.lock, egg package, wheel package, conda package |

## コンテナ イメージ レジストリ

コンテナ イメージのスキャンでは、次のコンテナ イメージ レジストリがサポートされています。

| レジストリ                        | サポート レベル | 注                                                                                                                                                                          |
|---------------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon ECR (パブリックとプライベート) | GA            | 稼働中のコンテナ イメージ **および**、日付ベースで直近 1,000 件の push 済みイメージを、レジストリに保存された状態のままスキャンします。レジストリ内の保存済みイメージ スキャンに対応している唯一のレジストリです。                                 |
| Google Artifact Registry (GAR)  | GA            | 稼働中のワークロード (Cloud Run、GKE) に紐付いたイメージのみをスキャンします <br /> **注**: レジストリ内に保存されたイメージのスキャンを希望する場合は、[Datadog サポート][16] にお問い合わせください                                |
| Azure Container Registry (ACR)  | GA            | Azure Container Apps および Azure Container Instances で稼働中のコンテナ イメージのみをスキャンします <br /> **注**: レジストリ内に保存されたイメージのスキャンを希望する場合は、[Datadog サポート][16] にお問い合わせください |

**注**: レジストリからのコンテナ イメージ スキャンは、次のバージョンで Agentless を導入している場合にのみサポートされます。
  - CloudFormation Integrations >= v2.0.8
  - Terraform Agentless Module >= v0.11.7

## コンテナ ランタイム

次のコンテナ ランタイムがサポートされています。

- containerd: v1.5.6 以降
- Docker

**コンテナの観測に関する注記**: Agentless Scanning では、圧縮されていないコンテナ イメージ レイヤーが必要です。回避策として、containerd の設定ファイルで構成オプション `discard_unpacked_layers=false` を設定できます。

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