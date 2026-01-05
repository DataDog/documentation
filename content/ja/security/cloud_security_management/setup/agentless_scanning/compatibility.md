---
aliases:
- /ja/security/cloud_security_management/agentless_scanning/compatibility
title: エージェントレス スキャンの互換性
---

## 可用性

エージェントレス スキャンは AWS, Azure, GCP でサポートされています。Oracle Cloud Infrastructure (OCI) は現時点ではサポートされていません。

この機能はすべての商用 Datadog データ センターで利用できます。GovCloud はサポートされません。

以下の表は、サポートされている各クラウド プロバイダーについて、対応するコンポーネントに関連する Agentless Scanning の技術概要です:

| コンポーネント                                       | AWS                                                                                                                                       | Azure                                                                                                                                                                             | GCP                                                                                                                                                                             |
|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| オペレーティングシステム | Linux; Windows Server 2016, 2019, 2022; Windows 10 以降 | Linux; Windows Server 2016, 2019, 2022; Windows 10 以降 | Linux; Windows Server 2016, 2019, 2022; Windows 10 以降 |
| ホスト ファイル システム                                 | Btrfs, Ext2, Ext3, Ext4, xfs                                                                                                              | Btrfs, Ext2, Ext3, Ext4, xfs                                                                                                                                                      | Btrfs, Ext2, Ext3, Ext4, xfs                                                                                                                                                    |
| パッケージ マネージャー                                 | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine)                                                    | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                          | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                       |
| 暗号化                                      | AWS </br> 暗号化なし </br> 暗号化 - Platform Managed Key (PMK) および Customer Managed Key (CMK)                                         | 暗号化 - Platform Managed Key (PMK): Azure Disk Storage Server-Side Encryption, Encryption at host </br> **注**: 暗号化 - Customer Managed Key (CMK) は **未サポート** です | 暗号化 - Platform Managed Key (PMK): Persistent Disk Encryption, Confidential VM </br> **注**: 暗号化 - Customer Managed Encryption Key (CMEK) および Customer-Supplied Encryption Keys (CSEK) は **未サポート** です |
| コンテナ ランタイム                               | Docker, containerd </br> **注**: CRI-O は **未サポート** です                                                                             | Docker, containerd </br> **注**: CRI-O は **未サポート** です                                                                                                                     | Docker, containerd </br> **注**: CRI-O は **未サポート** です                                                                                                                   |
| サーバーレス                                      | AWS Lambda <br> ECS 向け AWS Fargate                                                                                                              | この機能の利用を希望する場合は、[Datadog サポート][16] にお問い合わせください                                                                                                                                                         | Cloud Run (コンテナ デプロイ タイプ)                                                                                                                                           |
| アプリケーション言語 (ホストおよびコンテナ) | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                       | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                               | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                            |
| コンテナ レジストリ                            | Amazon ECR (パブリックおよびプライベート) | | Google Artifact Registry |

**注**: AMI は Datadog の AWS インテグレーションを使用しているアカウントに保存されている必要があります。そうでない場合、Datadog は AMI の基盤となる Amazon Elastic Block Store (EBS) スナップショットを読み取れないため、AMI のスキャンやレポートができません。

## Linux ディストリビューション

ホストおよびコンテナのスキャンでは、次の Linux ディストリビューションがサポートされています:

| オペレーティング システム         | サポートされるバージョン                                  | パッケージ マネージャー | セキュリティ アドバイザリ                                                                                       |
|--------------------------|-----------------------------------------------------|------------------|-----------------------------------------------------------------------------------------------------------|
| Alpine Linux             | 2.2-2.7, 3.0-3.19 (edge はサポートされません)           | apk              | [https://secdb.alpinelinux.org/][1]                                                                       |
| Wolfi Linux              | 該当なし                                                 | apk              | [https://packages.wolfi.dev/os/security.json][2]                                                          |
| Chainguard               | 該当なし                                                 | apk              | [https://packages.cgr.dev/chainguard/security.json][3]                                                    |
| Red Hat Enterprise Linux | 6、7、8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] および [https://www.redhat.com/security/data/oval/v2/][5] |
| CentOS                   | 6、7、8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] および [https://www.redhat.com/security/data/oval/v2/][5] |
| AlmaLinux                | 8, 9                                                | dnf/yum/rpm      | [https://errata.almalinux.org/][6]                                                                        |
| Rocky Linux              | 8, 9                                                | dnf/yum/rpm      | [https://download.rockylinux.org/pub/rocky/][7]                                                           |
| Oracle Linux             | 5, 6, 7, 8                                          | dnf/yum/rpm      | [https://linux.oracle.com/security/oval/][8]                                                              |
| CBL-Mariner              | 1.0, 2.0                                            | dnf/yum/rpm      | [https://github.com/microsoft/CBL-MarinerVulnerabilityData/][9]                                           |
| Amazon Linux             | 1, 2, 2023                                          | dnf/yum/rpm      | [https://alas.aws.amazon.com/][10]                                                                        |
| openSUSE Leap            | 42, 15                                              | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| SUSE Linux Enterprise    | 11, 12, 15                                          | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| Photon OS                | 1.0, 2.0, 3.0, 4.0                                  | tdnf/yum/rpm     | [https://packages.vmware.com/photon/photon_cve_metadata/][12]                                             |
| Debian GNU/Linux         | 7, 8, 9, 10, 11, 12 (unstable/sid はサポートされません) | apt/dpkg         | [https://security-tracker.debian.org/tracker/][13] および [https://www.debian.org/security/oval/][14]        |
| Ubuntu                   | Canonical がサポートするすべてのバージョン                 | apt/dpkg         | [https://ubuntu.com/security/cve][15]                                                                     |

## アプリケーション ライブラリ

コンテナ イメージ、Lambda 関数、およびホスト上で動作しているコンテナの脆弱性スキャンでは、次のアプリケーション言語/ライブラリがサポートされています:

| 言語 | サポートされるパッケージ マネージャー | 対応ファイル                                                      |
|----------|---------------------------|----------------------------------------------------------------------|
| Ruby     | bundler                   | Gemfile.lock, gemspec                                                |
| .NET     | nuget                     | packages.lock.json, packages.config, .deps.json, *packages.props     |
| Go       | mod                       | Go でビルドされたバイナリ、 go.mod                                         |
| Java     | Gradle, Maven             | pom.xml, *gradle.lockfile, JAR/WAR/PAR/EAR (pom.properties を含む)     |
| Node.js  | npm, pnpm, yarn           | package-lock.json, yarn.lock, pnpm-lock.yaml, package.json           |
| PHP      | composer                  | composer.lock                                                        |
| Python   | pip, poetry               | pipfile.lock, poetry.lock, egg パッケージ, wheel パッケージ, conda パッケージ |

## コンテナ イメージ レジストリ

コンテナ イメージのスキャンでサポートされるレジストリは次のとおりです:

- Amazon ECR public
- Amazon ECR private

**注**: レジストリからのコンテナ イメージ スキャンは、次の方法で Agentless をインストールしている場合にのみサポートされます:
  - Cloudformation Integrations >= v2.0.8
  - Terraform Agentless Module >= v0.11.7

## コンテナ ランタイム

サポートされるコンテナ ランタイムは次のとおりです:

- containerd: v1.5.6 以降
- Docker

**コンテナ観測に関する注**: Agentless Scanning では、圧縮されていないコンテナ イメージ レイヤーが必要です。回避策として、containerd の設定ファイルで `discard_unpacked_layers=false` を設定できます。

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