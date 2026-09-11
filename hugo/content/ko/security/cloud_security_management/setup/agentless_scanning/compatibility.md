---
aliases:
- /ko/security/cloud_security_management/agentless_scanning/compatibility
title: Agentless 스캔 호환성
---
## 가용성 {#availability}

Agentless Scanning은 AWS, Azure 및 GCP에서 지원됩니다.

다음 표는 각 지원되는 클라우드 제공업체의 컴포넌트와 관련하여 Agentless Scanning 기술에 대해 요약하여 제공합니다:

| 컴포넌트                                       | AWS                                                                                                                           | Azure                                                                                                                                                                             | GCP                                                                                                                                                                                                                       |
|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 운영 체제                                | Linux; Windows Server 2016 이상; Windows 10 이상                                                                      | Linux; Windows Server 2016 이상; Windows 10 이상                                                                                                                          | Linux; Windows Server 2016 이상; Windows 10 이상                                                                                                                                                                  |
| 호스트 파일 시스템                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                            | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                                                        |
| 패키지 관리자                                 | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine)                                        | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                          | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                                                                  |
| 암호화                                      | AWS </br> 암호화되지 않음 </br> 암호화됨 - 플랫폼 관리형 키(PMK) 및 고객 관리형 키(CMK)                             | 암호화됨 - 플랫폼 관리형 키(PMK): Azure Disk Storage 서버 측 암호화, 호스트에서의 암호화 </br> **참고**: 암호화됨 - 고객 관리형 키(CMK)는 **지원되지** 않습니다 | 암호화됨 - 플랫폼 관리형 키(PMK): Persistent Disk 암호화, Confidential VM </br> **참고**: 암호화됨 - 고객 관리형 암호화 키(CMEK) 및 고객 제공 암호화 키(CSEK)는 **지원되지** 않습니다 |
| Container 런타임                               | Docker, containerd </br> **참고**: CRI-O는 **지원되지** 않습니다                                                                 | Docker, containerd </br> **참고**: CRI-O는 **지원되지** 않습니다                                                                                                                     | Docker, containerd </br> **참고**: CRI-O는 **지원되지** 않습니다                                                                                                                                                             |
| Serverless                                      | AWS Lambda <br> AWS Fargate for ECS                                                                                           | Azure Functions ([Preview][20]), Azure Container Apps, Azure Container Instances<br />**참고**: 최신 agentless 스캐너가 필요합니다. [Agentless Scanning 업데이트][17]를 참조하십시오.                                     | Cloud Run ([Preview][21])                                                                                                                                           |
| Kubernetes                                      | EC2 노드의 EKS </br> Fargate의 EKS </br> **참고**: Fargate의 EKS는 [Datadog Cluster Agent][18]가 설치되어 있어야 합니다 | 가상 머신 및 가상 머신 확장 집합(VMSS)의 AKS </br> **참고**: ACI의 AKS는 **지원되지** 않습니다 | GKE Standard 전용 </br> **참고**: GKE Autopilot 및 이미지 스트리밍은 **지원되지** 않습니다 |
| 애플리케이션 언어(호스트 및 컨테이너 내) | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                           | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                               | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                                                                       |
| Container 레지스트리                            | Amazon ECR(공용 및 비공용): 실행 중인 Container 이미지와 마지막으로 푸시된 1,000개의 저장된 이미지를 스캔합니다                      | ACR: 실행 중인 Container 이미지만 스캔합니다<br />**참고:** 저장된 레지스트리 스캔은 지원되지 않습니다. 요청하려면 [Datadog 지원][16]에 문의하십시오   | Google Artifact Registry: 실행 중인 워크로드의 이미지만 스캔합니다<br />**참고**: Google Artifact Registry 저장된 스캔 지원은 [Preview][19] 상태입니다                                                                                                                                        |
| 호스트 이미지                                     | AMI                                                                                                                           | 지원되지 않음                                                                                                                                                                     | 지원되지 않음                                                                                                                                                                                                             |
| 민감한 데이터(SDS)                            | S3                                                                                                                            | 지원되지 않음                                                                                                                                                                     | 지원되지 않음                                                                                                                                                                                                             |

**참고**: AMI는 Datadog의 AWS 통합을 사용하는 계정에 저장되어야 합니다. 그렇지 않으면 Datadog이 AMI의 기본 Amazon Elastic Block Store(EBS) 스냅샷을 읽을 수 없으므로 AMI를 스캔하거나 보고할 수 없습니다.

## Linux distributions {#linux-distributions}

다음 Linux 배포판에서 호스트 및 컨테이너 스캔이 지원됩니다.

| 운영 체제         | 지원 버전                                  | 패키지 관리자 | 보안 권고 사항                                                                                       |
|--------------------------|-----------------------------------------------------|------------------|-----------------------------------------------------------------------------------------------------------|
| Alpine Linux             | 2.2-2.7, 3.0-3.19 (edge는 지원되지 않음)           | apk              | [https://secdb.alpinelinux.org/][1]                                                                       |
| Wolfi Linux              | N/A                                                 | apk              | [https://packages.wolfi.dev/os/security.json][2]                                                          |
| Chainguard               | N/A                                                 | apk              | [https://packages.cgr.dev/chainguard/security.json][3]                                                    |
| Red Hat Enterprise Linux | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] 및 [https://www.redhat.com/security/data/oval/v2/][5] |
| CentOS                   | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] 및 [https://www.redhat.com/security/data/oval/v2/][5] |
| AlmaLinux                | 8, 9                                                | dnf/yum/rpm      | [https://errata.almalinux.org/][6]                                                                        |
| Rocky Linux              | 8, 9                                                | dnf/yum/rpm      | [https://download.rockylinux.org/pub/rocky/][7]                                                           |
| Oracle Linux             | 5, 6, 7, 8                                          | dnf/yum/rpm      | [https://linux.oracle.com/security/oval/][8]                                                              |
| CBL-Mariner              | 1.0, 2.0                                            | dnf/yum/rpm      | [https://github.com/microsoft/CBL-MarinerVulnerabilityData/][9]                                           |
| Amazon Linux             | 1, 2, 2023                                          | dnf/yum/rpm      | [https://alas.aws.amazon.com/][10]                                                                        |
| openSUSE Leap            | 42, 15                                              | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| SUSE Linux Enterprise    | 11, 12, 15                                          | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| Photon OS                | 1.0, 2.0, 3.0, 4.0                                  | tdnf/yum/rpm     | [https://packages.vmware.com/photon/photon_cve_metadata/][12]                                             |
| Debian GNU/Linux         | 7, 8, 9, 10, 11, 12 (unstable/sid는 지원되지 않음) | apt/dpkg         | [https://security-tracker.debian.org/tracker/][13] 및 [https://www.debian.org/security/oval/][14]        |
| Ubuntu                   | Canonical에서 지원하는 버전 전체                 | apt/dpkg         | [https://ubuntu.com/security/cve][15]                                                                     |

## 애플리케이션 라이브러리 {#application-libraries}

Container 이미지, Lambda 함수 및 호스트에서 실행 중인 Container 의 취약점 스캔을 위해 다음 애플리케이션 언어 및 라이브러리가 지원됩니다:

| 언어 | 지원되는 패키지 관리자 | 지원되는 파일                                                      |
|----------|---------------------------|----------------------------------------------------------------------|
| Ruby     | bundler                   | Gemfile.lock, gemspec                                                |
| .NET     | nuget                     | packages.lock.json, packages.config, .deps.json, *packages.props     |
| Go       | mod                       | Binaries built by Go, go.mod                                         |
| Java     | Gradle, Maven             | pom.xml, *gradle.lockfile, JAR/WAR/PAR/EAR (with pom.properties)     |
| Node.js  | npm, pnpm, yarn           | package-lock.json, yarn.lock, pnpm-lock.yaml, package.json           |
| PHP      | composer                  | composer.lock                                                        |
| Python   | pip, poetry               | pipfile.lock, poetry.lock, egg package, wheel package, conda package |

## Container 이미지 레지스트리 {#container-image-registries}

다음은 이미지 스캔을 지원하는 컨테이너 이미지 레지스트리입니다.

| 레지스트리                        | 지원 수준 | 참고 사항                                                                                                                                                                                                                                         |
|---------------------------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon ECR (공용 및 비공용) | GA            | 실행 중인 Container 이미지와 **마지막으로 푸시된 1,000개의 보관(정지) 이미지(날짜 기준)를 스캔합니다.** 이것은 저장소 내 스캔을 지원하는 유일한 레지스트리입니다.<br />**참고:** 스캔할 저장소 내 이미지 수를 늘리려면 [Datadog 지원팀][16]에 문의하세요. |
| Google Artifact Registry (GAR)  | Preview       | 실행 중인 워크로드(Cloud Run, GKE)에 연결된 이미지만 스캔합니다.<br />**참고**: Google Artifact Registry 저장소 내 스캔 지원은 [Preview][19] 상태입니다.                                                                                             |
| Azure Container Registry (ACR)  | GA            | Azure Container Apps 및 Azure Container Instances에서 실행 중인 Container 이미지만 스캔합니다.<br />**참고**: 저장소 내 레지스트리 스캔은 지원되지 않습니다. 요청하려면 [Datadog Support][16]에 문의하십시오.                                                                |

**참고**: 레지스트리에서 Container 이미지 스캔은 다음 조건의 Agentless가 설치된 경우에만 지원됩니다.
  - CloudFormation Integrations >= v2.0.8
  - Terraform Agentless Module >= v0.11.7

## Container 런타임 {#container-runtimes}

다음 컨테이너 런타임이 지원됩니다.

- containerd: v1.5.6 이상
- Docker

**Container 관찰 참고 사항**: Agentless 스캔을 사용하려면 압축되지 않은 Container 이미지 레이어가 필요합니다. 해결 방법으로 containerd 구성 파일에서 `discard_unpacked_layers=false` 구성 옵션을 설정할 수 있습니다.

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
[18]: /ko/containers/cluster_agent/setup/
[19]: https://www.datadoghq.com/product-preview/google-artifact-registry-at-rest-scanning/
[20]: https://www.datadoghq.com/product-preview/azure-functions-vulnerability-scanning/
[21]: https://www.datadoghq.com/product-preview/google-cloud-run-functions-vulnerability-scanning/