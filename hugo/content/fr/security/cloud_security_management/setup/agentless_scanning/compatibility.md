---
aliases:
- /fr/security/cloud_security_management/agentless_scanning/compatibility
title: Compatibilité d'Agentless Scanning
---

## Disponibilité

Agentless Scanning est pris en charge sur AWS, Azure et GCP.

Le tableau suivant récapitule les technologies Agentless Scanning en relation avec leurs composants correspondants pour chaque fournisseur cloud pris en charge :

| Composant                                       | AWS                                                                                                      | Azure                                                                                                                                                                             | GCP                                                                                                                                                                                                                       |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Système d'exploitation                                | Linux ; Windows Server 2016 ou version ultérieure ; Windows 10 ou version ultérieure                                                 | Linux ; Windows Server 2016 ou version ultérieure ; Windows 10 ou version ultérieure                                                                                                                          | Linux ; Windows Server 2016 ou version ultérieure ; Windows 10 ou version ultérieure                                                                                                                                                                  |
| Host File System                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                       | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                                                        |
| Gestionnaire de paquets                                 | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine)                   | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                          | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                                                                  |
| Chiffrement                                      | AWS </br> Non chiffré </br> Chiffré - Clé gérée par la plateforme (PMK) et clé gérée par le client (CMK)        | Chiffré - Clé gérée par la plateforme (PMK) : Azure Disk Storage Server-Side Encryption, chiffrement sur le host </br> **Remarque** : Chiffré - Clé gérée par le client (CMK) n'est **pas** pris en charge | Chiffré - Clé gérée par la plateforme (PMK) : Persistent Disk Encryption, Confidential VM </br> **Remarque** : Clé de chiffrement gérée par le client (CMEK) et clés de chiffrement fournies par le client (CSEK) ne sont **pas** prises en charge |
| Runtime de conteneur                               | Docker, containerd </br> **Remarque** : CRI-O n'est **pas** pris en charge                                            | Docker, containerd </br> **Remarque** : CRI-O n'est **pas** pris en charge                                                                                                                     | Docker, containerd </br> **Remarque** : CRI-O n'est **pas** pris en charge                                                                                                                                                             |
| Serverless                                      | AWS Lambda <br> AWS Fargate pour ECS                                                                      | Azure Container Apps et Azure Container Instances<br />**Remarque** : nécessite la dernière version du scanner agentless. Consultez la section [Mettre à jour Agentless Scanning][17].                                                                           | Cloud Run (déploiement de conteneur uniquement, pas depuis des référentiels GitHub ni des éditeurs en ligne)                                                                                                                                           |
| Kubernetes                                      | EKS sur nœuds EC2 uniquement </br> **Remarque** : les nœuds EKS basés sur Fargate ne sont **pas** pris en charge                     | AKS sur machines virtuelles et groupes de machines virtuelles identiques (VMSS) </br> **Remarque** : AKS sur ACI n'est **pas** pris en charge                                                                     | GKE Standard uniquement </br> **Remarque** : GKE Autopilot et le streaming d'images ne sont **pas** pris en charge                                                                                                                                 |
| Langages d'application (dans les hosts et conteneurs) | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                      | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                               | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                                                                       |
| Registres de conteneurs                            | Amazon ECR (public et privé) : scanne les images de conteneur en cours d'exécution et les 1 000 dernières images envoyées au repos | ACR : scanne uniquement les images de conteneur en cours d'exécution<br />**Remarque :** pour demander le scan de registre au repos, contactez l'[assistance Datadog][16]                                             | Google Artifact Registry : scanne uniquement les images des workloads en cours d'exécution<br />**Remarque :** pour demander le scan de registre au repos, contactez l'[assistance Datadog][16]                                                                     |
| Host Images                                     | AMI                                                                                                      | Non prise en charge                                                                                                                                                                     | Non prise en charge                                                                                                                                                                                                             |
| Sensitive Data (SDS)                            | S3, RDS (bêta privée)                                                                                   | Non prise en charge                                                                                                                                                                     | Non prise en charge                                                                                                                                                                                                             |

**Remarque** : les AMI doivent être stockées dans un compte qui utilise l'intégration AWS de Datadog. Sinon, Datadog ne peut pas lire l'instantané Amazon Elastic Block Store (EBS) sous-jacent de l'AMI, et ne peut donc pas scanner ou générer de rapport sur l'AMI. 

## Distributions Linux

Les distributions Linux suivantes sont prises en charge pour les scans de hosts et de conteneurs :

| Système d'exploitation         | Versions prises en charge                                  | Gestionnaires de paquets | Avertissements de sécurité                                                                                       |
|--------------------------|-----------------------------------------------------|------------------|-----------------------------------------------------------------------------------------------------------|
| Alpine Linux             | 2.2-2.7, 3.0-3.19 (edge n'est pas pris en charge)           | apk              | [https://secdb.alpinelinux.org/][1]                                                                       |
| Wolfi Linux              | S. O.                                                 | apk              | [https://packages.wolfi.dev/os/security.json][2]                                                          |
| Chainguard               | S. O.                                                 | apk              | [https://packages.cgr.dev/chainguard/security.json][3]                                                    |
| Red Hat Enterprise Linux | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] et [https://www.redhat.com/security/data/oval/v2/][5] |
| CentOS                   | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] et [https://www.redhat.com/security/data/oval/v2/][5] |
| AlmaLinux                | 8, 9                                                | dnf/yum/rpm      | [https://errata.almalinux.org/][6]                                                                        |
| Rocky Linux              | 8, 9                                                | dnf/yum/rpm      | [https://download.rockylinux.org/pub/rocky/][7]                                                           |
| Oracle Linux             | 5, 6, 7, 8                                          | dnf/yum/rpm      | [https://Linux.oracle.com/security/oval/][8]                                                              |
| CBL-Mariner              | 1.0, 2.0                                            | dnf/yum/rpm      | [https://github.com/microsoft/CBL-MarinerVulnerabilityData/][9]                                           |
| Amazon Linux             | 1, 2, 2023                                          | dnf/yum/rpm      | [https://alas.aws.amazon.com/][10]                                                                        |
| openSUSE Leap            | 42, 15                                              | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| SUSE Linux Enterprise    | 11, 12, 15                                          | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| Photon OS                | 1.0, 2.0, 3.0, 4.0                                  | tdnf/yum/rpm     | [https://packages.vmware.com/photon/photon_cve_metadata/][12]                                             |
| Debian GNU/Linux         | 7, 8, 9, 10, 11, 12 (unstable/sid n'est pas pris en charge) | apt/dpkg         | [https://security-tracker.debian.org/tracker/][13] et [https://www.debian.org/security/oval/][14]        |
| Ubuntu                   | Toutes les versions prises en charge par Canonical                 | apt/dpkg         | [https://ubuntu.com/security/cve][15]                                                                     |

## Bibliothèques d'application

Les langages et bibliothèques d'application suivants sont pris en charge pour les scans de vulnérabilités sur les images de conteneur, les fonctions Lambda et les conteneurs exécutés dans les hosts :

| Langage | Gestionnaire de paquets pris en charge | Fichiers pris en charge                                                      |
|----------|---------------------------|----------------------------------------------------------------------|
| Ruby     | bundler                   | Gemfile.lock, gemspec                                                |
| .NET     | nuget                     | packages.lock.json, packages.config, .deps.json, *packages.props     |
| Go       | mod                       | Binaires construits par Go, go.mod                                         |
| Java     | Gradle, Maven             | pom.xml, *gradle.lockfile, JAR/WAR/PAR/EAR (avec pom.properties)     |
| Node.js  | npm, pnpm, yarn           | package-lock.json, yarn.lock, pnpm-lock.yaml, package.json           |
| PHP      | composer                  | composer.lock                                                        |
| Python   | pip, poetry               | pipfile.lock, poetry.lock, paquet egg, paquet wheel, paquet conda |

## Registres d'images de conteneur

Les registres d'images de conteneur suivants sont pris en charge pour les scans d'images de conteneur :

| Registry                        | Niveau de prise en charge | Remarques                                                                                                                                                                          |
|---------------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon ECR (public et privé) | GA            | Scanne les images de conteneur en cours d'exécution **et** les 1 000 dernières images envoyées au repos (par date). Il s'agit du seul registre avec prise en charge du scan au repos                                 |
| Google Artifact Registry (GAR)  | GA            | Scanne uniquement les images associées aux workloads en cours d'exécution (Cloud Run, GKE)<br />**Remarque** : pour demander le scan de registre au repos, contactez l'[assistance Datadog][16]                                |
| Azure Container Registry (ACR)  | GA            | Scanne uniquement les images de conteneur en cours d'exécution depuis Azure Container Apps et Azure Container Instances<br />**Remarque** : pour demander le scan de registre au repos, contactez l'[assistance Datadog][16] |

**Remarque** : le scanning d'images de conteneur à partir du registre n'est pris en charge que si vous avez installé le scanning sans Agent avec :
  - CloudFormation Integrations >= v2.0.8
  - Terraform Agentless Module >= v0.11.7

## Runtimes de conteneur

Les runtimes de conteneur suivants sont pris en charge :

- containerd : v1.5.6 ou version ultérieure
- Docker

**Remarque pour les observations de conteneur** : Agentless Scanning nécessite des couches d'images de conteneur non compressées. Comme solution de contournement, vous pouvez définir l'option de configuration `discard_unpacked_layers=false` dans le fichier de configuration de containerd.

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
[16]: /fr/help
[17]: /fr/security/cloud_security_management/setup/agentless_scanning/update