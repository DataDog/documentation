---
aliases:
- /ko/security/cloud_security_management/agentless_scanning/compatibility
title: Agentless 스캔 호환성
---

## 이용 가능 여부

Agentless Scanning은 AWS, Azure, GCP에서 지원됩니다.

다음 표는 각 클라우드 제공업체의 컴포넌트에 Agentless Scanning 기술이 어떻게 적용되는지를 요약한 것입니다.

| 구성 요소                                       | AWS                                                                                                      | Azure                                                                                                                                                                             | GCP                                                                                                                                                                                                                       |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 운영 체제                                | Linux; Windows Server 2016 이상; Windows 10 이상                                                 | Linux; Windows Server 2016 이상; Windows 10 이상                                                                                                                          | Linux; Windows Server 2016 이상; Windows 10 이상                                                                                                                                                                  |
| 호스트 파일 시스템                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                       | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                                                        |
| 패키지 관리자                                 | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine)                   | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                          | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                                                                  |
| 암호화                                      | AWS </br> 암호화되지 않음 </br> 암호화됨 - Platform Managed Key (PMK) 및 Customer Managed Key (CMK)        | 암호화됨 - Platform Managed Key (PMK): Azure Disk Storage Server-Side Encryption, Encryption at host</br> **참고**: 암호화됨 - Customer Managed Key (CMK)는 **지원되지 않습니다**. | Encrypted - Platform Managed Key (PMK): Persistent Disk Encryption, Confidential VM </br> **참고**: Encrypted - Customer Managed Encryption Key(CMEK) 및 Customer-Supplied Encryption Keys(CSEK)는 지원되지 **않습니다** |
| 컨테이너 런타임                               | Docker, containerd </br> **참고**: CRI-O는 **지원되지 않습니다**                                            | Docker, containerd </br> **참고**: CRI-O는 **지원되지 않습니다**                                                                                                                     | Docker, containerd </br> **참고**: CRI-O는 **지원되지 않습니다**                                                                                                                                                             |
| Serverless                                      | AWS Lambda <br> ECS용 AWS Fargate                                                                      | Azure Container Apps 및 Azure Container Instances<br />**참고**: 최신 Agentless 스캐너가 필요합니다. [Agentless Scanning 업데이트][17]를 참고하세요.                                                                           | Cloud Run(컨테이너 배포만, GitHub 레포 또는 인라인 데이터 배포 불가)                                                                                                                                           |
| Kubernetes                                      | EC2 노드에 있는 EKS만 </br> **참고**: Fargate 지원 EKS 노드는 지원 **불가**                     | 가상 머신 AKS 및 VMSS(Virtual Machine Scale Sets)</br>**참고**: ACI의 AKS는 지원 **불가**                                                                     | GKE 표준만</br> **참고**: GKE Autopilot 및 스트리밍은 지원 **불가**                                                                                                                                 |
| 애플리케이션 언어(호스트 및 컨테이너에서) | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                      | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                               | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                                                                       |
| 컨테이너 레지스트리                            | Amazon ECR(퍼블릭 및 프라이빗): 실행 중인 컨테이너 이미지와 푸시된 후 보관 중인 최근 1,000개의 이미지 스캔 | ACR: 실행 중인 컨테이너 이미지만 스캔<br />**참고:** 보관 중인 레지스트리 스캔을 요청하려면 [Datadog 지원팀][16]에 문의하세요.                                             | Google Artifact Registry: 실행 중인 워크로드만 스캔<br />**참고:** 보관 중인 레지스트리 스캔을 요청하려면 [Datadog 지원팀][16]에 문의하세요.                                                                     |
| 호스트 이미지                                     | AMI                                                                                                      | 지원되지 않음                                                                                                                                                                     | 지원되지 않음                                                                                                                                                                                                             |
| SDS(Sensitive Data)                            | S3, RDS(프라이빗 베타)                                                                                   | 지원되지 않음                                                                                                                                                                     | 지원되지 않음                                                                                                                                                                                                             |

**참고**: AMI는 Datadog의 AWS 통합을 사용하는 계정에 저장해야 합니다. 그렇지 않으면 Datadog이 AMI의 기본 Amazon Elastic Block Store(EBS) 스냅샷을 읽을 수 없으므로 AMI를 스캔하거나 보고할 수 없습니다.

## Linux 배포판

다음 Linux 배포판에서 호스트 및 컨테이너 스캔이 지원됩니다.

| 운영 체제         | 지원되는 버전                                  | 패키지 관리자 | 보안 권고                                                                                       |
|--------------------------|-----------------------------------------------------|------------------|-----------------------------------------------------------------------------------------------------------|
| Alpine Linux             | 2.2-2.7, 3.0-3.19 (edge는 미지원)           | apk              | [https://secdb.alpinelinux.org/][1]                                                                       |
| Wolfi Linux              | N/A                                                 | apk              | [https://packages.wolfi.dev/os/security.json][2]                                                          |
| Chainguard               | N/A                                                 | apk              | [https://packages.cgr.dev/chainguard/security.json][3]                                                    |
| 레드햇(Red Hat) 엔터프라이즈 Linux | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] and [https://www.redhat.com/security/data/oval/v2/][5] |
| CentOS                   | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] and [https://www.redhat.com/security/data/oval/v2/][5] |
| AlmaLinux                | 8, 9                                                | dnf/yum/rpm      | [https://errata.almalinux.org/][6]                                                                        |
| Rocky Linux              | 8, 9                                                | dnf/yum/rpm      | [https://download.rockylinux.org/pub/rocky/][7]                                                           |
| Oracle Linux             | 5, 6, 7, 8                                          | dnf/yum/rpm      | [https://linux.oracle.com/security/oval/][8]                                                              |
| CBL-Mariner              | 1.0, 2.0                                            | dnf/yum/rpm      | [https://github.com/microsoft/CBL-MarinerVulnerabilityData/][9]                                           |
| Amazon Linux             | 1, 2, 2023                                          | dnf/yum/rpm      | [https://alas.aws.amazon.com/][10]                                                                        |
| openSUSE Leap            | 42, 15                                              | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| SUSE Linux Enterprise    | 11, 12, 15                                          | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| Photon OS                | 1.0, 2.0, 3.0, 4.0                                  | tdnf/yum/rpm     | [https://packages.vmware.com/photon/photon_cve_metadata/][12]                                             |
| Debian GNU/Linux         | 7, 8, 9, 10, 11, 12 (unstable/sid는 미지원) | apt/dpkg         | [https://security-tracker.debian.org/tracker/][13] and [https://www.debian.org/security/oval/][14]        |
| Ubuntu                   | Canonical에서 모든 버전 지원                 | apt/dpkg         | [https://ubuntu.com/security/cve][15]                                                                     |

## 애플리케이션 라이브러리

컨테이너 이미지, Lambda 함수, 호스트에서 실행 중인 컨테이너 취약점 스캔에서 다음 애플리케이션 언어와 라이브러리가 지원됩니다.

| 언어 | 지원되는 패키지 관리자 | 지원되는 파일                                                      |
|----------|---------------------------|----------------------------------------------------------------------|
| Ruby     | bundler                   | Gemfile.lock, gemspec                                                |
| .NET     | nuget                     | packages.lock.json, packages.config, .deps.json, *packages.props     |
| Go       | mod                       | Binaries built by Go, go.mod                                         |
| Java     | Gradle, Maven             | pom.xml, *gradle.lockfile, JAR/WAR/PAR/EAR (with pom.properties)     |
| Node.js  | npm, pnpm, yarn           | package-lock.json, yarn.lock, pnpm-lock.yaml, package.json           |
| PHP      | composer                  | composer.lock                                                        |
| Python   | pip, poetry               | pipfile.lock, poetry.lock, egg package, wheel package, conda package |

## 컨테이너 이미지 레지스트리

다음은 이미지 스캔을 지원하는 컨테이너 이미지 레지스트리입니다.

| 레지스트리                        | 지원 레벨 | 참고                                                                                                                                                                          |
|---------------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon ECR(공개 및 비공개) | GA            | 실행 중인 컨테이너 이미지 **및** 푸시된 후 보관 중인 최근 1,000개의 이미지 스캔(오늘까지). 저장 시점 스캔을 지원하는 유일한 레지스트리입니다.                                 |
| GAR(Google Artifact Registry)  | GA            | 실행 중인 워크로드와 연결된 이미지만 스캔(Cloud Run, GKE)<br />**참고**: 보관 중인 레지스트리 스캔을 요청하려면 [Datadog 지원팀][16]에 문의하세요.                                |
| ACR(Azure Container Registry)  | GA            | Azure Container Apps와 Azure Container Instances에서 실행 중인 컨테이너 이미지만 스캔<br />**참고**: 보관 중인 레지스트리 스캔을 요청하려면 [Datadog 지원팀][16]에 문의하세요. |

**참고**: 레지스트리에서 컨테이너 이미지 스캔은 다음 조건의 Agentless가 설치된 경우에만 지원됩니다.
  - CloudFormation 통합 >= v2.0.8
  - Terraform Agentless Module >= v0.11.7

## 컨테이너 런타임

다음 컨테이너 런타임이 지원됩니다.

- containerd: v1.5.6 이상
- Docker

**컨테이너 관찰 시 참고**: Agentless 스캔에는 압축되지 않은 컨테이너 이미지 레이어가 필요합니다. 컨테이너화된 구성 파일에서 `discard_unpacked_layers=false` 구성 옵션을 설정하세요.

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
[16]: /ko/help
[17]: /ko/security/cloud_security_management/setup/agentless_scanning/update