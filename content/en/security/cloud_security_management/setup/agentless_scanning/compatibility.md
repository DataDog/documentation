---
title: Agentless Scanning Compatibility
aliases:
 - /security/cloud_security_management/agentless_scanning/compatibility
---

## Availability

Agentless Scanning is supported on AWS, Azure, GCP, and OCI.

The following table provides a summary of Agentless Scanning technologies in relation to their corresponding components for each supported cloud provider:

| Component                                       | AWS                                                                                                      | Azure                                                                                                                                                                             | GCP                                                                                                                                                                                                                       |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Operating System                                | Linux; Windows Server 2016 or later; Windows 10 or later                                                 | Linux; Windows Server 2016 or later; Windows 10 or later                                                                                                                          | Linux; Windows Server 2016 or later; Windows 10 or later                                                                                                                                                                  |
| Host File System                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                       | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                                                        |
| Package Manager                                 | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine)                   | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                          | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                                                                  |
| Encryption                                      | AWS </br> Unencrypted </br> Encrypted - Platform Managed Key (PMK) and Customer Managed Key (CMK)        | Encrypted - Platform Managed Key (PMK): Azure Disk Storage Server-Side Encryption, Encryption at host </br> **Note**: Encrypted - Customer Managed Key (CMK) is **not** supported | Encrypted - Platform Managed Key (PMK): Persistent Disk Encryption, Confidential VM </br> **Note**: Encrypted - Customer Managed Encryption Key (CMEK) and Customer-Supplied Encryption Keys (CSEK) are **not** supported |
| Container runtime                               | Docker, containerd </br> **Note**: CRI-O is **not** supported                                            | Docker, containerd </br> **Note**: CRI-O is **not** supported                                                                                                                     | Docker, containerd </br> **Note**: CRI-O is **not** supported                                                                                                                                                             |
| Serverless                                      | AWS Lambda <br> AWS Fargate for ECS                                                                      | Azure Container Apps and Azure Container Instances (in Preview; to join, contact [Datadog Support][16])                                                                           | Cloud Run (container deployment only — not from GitHub repos or inline editors)                                                                                                                                           |
| Kubernetes                                      | EKS on EC2 nodes only </br> **Note**: Fargate-backed EKS nodes are **not** supported                     | AKS on virtual machines and Virtual Machine Scale Sets (VMSS) </br> **Note**: AKS on ACI is **not** supported                                                                     | GKE Standard only </br> **Note**: GKE Autopilot and image streaming are **not** supported                                                                                                                                 |
| Application languages (in hosts and containers) | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                      | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                               | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                                                                       |
| Container Registries                            | Amazon ECR (public and private): scans running container images and the last 1,000 pushed images at rest | ACR: coming soon for running container images only<br />**Note:** To request at-rest registry scanning, contact [Datadog Support][16]                                             | Google Artifact Registry: scans images from running workloads only<br />**Note:** To request at-rest registry scanning, contact [Datadog Support][16]                                                                     |
| Host Images                                     | AMI                                                                                                      | Not supported                                                                                                                                                                     | Not supported                                                                                                                                                                                                             |
| Sensitive Data (SDS)                            | S3, RDS (private beta)                                                                                   | Not supported                                                                                                                                                                     | Not supported                                                                                                                                                                                                             |

**Note**: AMIs must be stored in an account that uses Datadog's AWS integration. Otherwise, Datadog can't read the AMI's underlying Amazon Elastic Block Store (EBS) snapshot, so it can't scan or report on the AMI.

## Linux distributions

The following Linux distributions are supported for hosts and containers scans:

| Operating System         | Supported Versions                                  | Package Managers | Security Advisories                                                                                       |
|--------------------------|-----------------------------------------------------|------------------|-----------------------------------------------------------------------------------------------------------|
| Alpine Linux             | 2.2-2.7, 3.0-3.19 (edge is not supported)           | apk              | [https://secdb.alpinelinux.org/][1]                                                                       |
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
| Debian GNU/Linux         | 7, 8, 9, 10, 11, 12 (unstable/sid is not supported) | apt/dpkg         | [https://security-tracker.debian.org/tracker/][13] and [https://www.debian.org/security/oval/][14]        |
| Ubuntu                   | All versions supported by Canonical                 | apt/dpkg         | [https://ubuntu.com/security/cve][15]                                                                     |

## Application libraries

The following application languages and libraries are supported for vulnerability scans on container images, Lambda functions, and containers running in hosts:

| Language | Supported Package Manager | Supported Files                                                      |
|----------|---------------------------|----------------------------------------------------------------------|
| Ruby     | bundler                   | Gemfile.lock, gemspec                                                |
| .NET     | nuget                     | packages.lock.json, packages.config, .deps.json, *packages.props     |
| Go       | mod                       | Binaries built by Go, go.mod                                         |
| Java     | Gradle, Maven             | pom.xml, *gradle.lockfile, JAR/WAR/PAR/EAR (with pom.properties)     |
| Node.js  | npm, pnpm, yarn           | package-lock.json, yarn.lock, pnpm-lock.yaml, package.json           |
| PHP      | composer                  | composer.lock                                                        |
| Python   | pip, poetry               | pipfile.lock, poetry.lock, egg package, wheel package, conda package |

## Container image registries

The following container image registries are supported for container image scans:

| Registry                        | Support level | Notes                                                                                                                                                                          |
|---------------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon ECR (public and private) | GA            | Scans running container images **and** the last 1,000 pushed images at rest (by date). This is the only registry with at-rest scanning support                                 |
| Google Artifact Registry (GAR)  | GA            | Scans images tied to running workloads (Cloud Run, GKE) only<br />**Note**: To request at-rest registry scanning, contact [Datadog Support][16]                                |
| Azure Container Registry (ACR)  | Coming soon   | Scans running container images from Azure Container Apps and Azure Container Instances only<br />**Note**: To request at-rest registry scanning, contact [Datadog Support][16] |

**Note**: Container image scanning from registry is only supported if you have installed Agentless with:
  - CloudFormation Integrations >= v2.0.8
  - Terraform Agentless Module >= v0.11.7

## Container runtimes

The following container runtimes are supported:

- containerd: v1.5.6 or later
- Docker

**Note for container observations**: Agentless Scanning requires uncompressed container image layers. As a workaround, you can set the configuration option `discard_unpacked_layers=false` in the containerd configuration file.

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
[16]: /help
