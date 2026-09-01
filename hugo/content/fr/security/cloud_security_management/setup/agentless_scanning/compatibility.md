---
aliases:
- /fr/security/cloud_security_management/agentless_scanning/compatibility
title: Compatibilité de l'Agentless Scanning
---
## Disponibilité {#availability}

L'Agentless Scanning est prise en charge sur AWS, Azure et GCP.

Le tableau suivant fournit un résumé des technologies d'Agentless Scanning par rapport à leurs composants correspondants pour chaque fournisseur cloud pris en charge :

| Composant                                       | AWS                                                                                                                           | Azure                                                                                                                                                                             | GCP                                                                                                                                                                                                                       |
|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Système d'exploitation                                | Linux ; Windows Server 2016 ou version ultérieure ; Windows 10 ou version ultérieure                                                                      | Linux ; Windows Server 2016 ou version ultérieure ; Windows 10 ou version ultérieure                                                                                                                          | Linux ; Windows Server 2016 ou version ultérieure ; Windows 10 ou version ultérieure                                                                                                                                   |
| Système de fichiers host                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                            | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                | Btrfs, Ext2, Ext3, Ext4, xfs, NTFS                                                                                                                                                         |
| Gestionnaire de paquets                                 | Deb (debian, ubuntu) <br> RPM (amazon-linux, fedora, redhat, centos) <br> APK (alpine)                                        | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                          | Deb (debian, ubuntu) <br> RPM (fedora, redhat, centos) <br> APK (alpine)                                                                                                                                                  |
| Chiffrement                                      | AWS </br> Non chiffré </br> Chiffré - Clé gérée par la plateforme (PMK) et clé gérée par le client (CMK)                             | Chiffré - Clé gérée par la plateforme (PMK) : Chiffrement côté serveur du stockage disque Azure, chiffrement sur l'host </br> **Remarque** : Le chiffrement - Clé gérée par le client (CMK) n'est **pas** pris en charge | Chiffré - Clé gérée par la plateforme (PMK) : Chiffrement de disque persistant, machine virtuelle confidentielle </br> **Remarque** : Le chiffrement - Clé de chiffrement gérée par le client (CMEK) et les clés de chiffrement fournies par le client (CSEK) ne sont **pas** pris en charge |
| Environnement d'exécution de Containers                               | Docker, containerd </br> **Remarque** : CRI-O n'est **pas** pris en charge                                                                 | Docker, containerd </br> **Remarque** : CRI-O n'est **pas** pris en charge                                                                                                                     | Docker, containerd </br> **Remarque** : CRI-O n'est **pas** pris en charge                                                                                                                                                             |
| Serverless                                      | AWS Lambda <br> AWS Fargate pour ECS                                                                                           | Azure Functions ([Aperçu][20]), Azure Container Apps, Azure Container Instances<br />**Remarque** : Nécessite le dernier agentless scanner. Voir [Mettre à jour l'Agentless Scanning][17].                                     | Cloud Run ([Preview][21]) |
| Kubernetes                                      | EKS sur nœuds EC2 </br> EKS sur Fargate </br> **Remarque** : EKS sur Fargate nécessite l'installation du [Datadog Cluster Agent][18] | AKS sur machines virtuelles et ensembles de machines virtuelles à l'échelle (VMSS) </br> **Remarque** : AKS sur ACI n'est **pas** pris en charge                                                                     | GKE Standard uniquement </br> **Remarque** : GKE Autopilot et le streaming d'images ne sont **pas** pris en charge |
| Langages d'application (dans les hôtes et les conteneurs)                                 | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                        | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                                          | Java, .Net, Python, Node.js, Go, Ruby, Rust, PHP, Swift, Dart, Elixir, Conan, Conda                                                                                                                                                  |
| Registres de Container                                      | Amazon ECR (public et privé) : Analyse les images de conteneurs en cours d'exécution et les 1 000 dernières images poussées au repos                      | ACR : Analyse uniquement les images de conteneurs en cours d'exécution<br />**Remarque :** L'analyse au repos du registre n'est pas prise en charge. Pour le demander, contactez [Datadog Support][16]   | Google Artifact Registry : Analyse uniquement les images provenant des charges de travail en cours d'exécution<br />**Remarque** : La prise en charge de l'analyse au repos de Google Artifact Registry est en [Preview][19]                                                                                                                                        |
| Images d'host                                     | AMI                                                                                                                           | Non pris en charge                                                                                                                                                                     | Non pris en charge                                                                                                                                                                                                             |
| Données sensibles (SDS)                            | S3                                                                                                                            | Non pris en charge                                                                                                                                                                     | Non pris en charge                                                                                                                                                                                                             |

**Remarque** : Les AMI doivent être stockées dans un compte utilisant l'intégration AWS de Datadog. Sinon, Datadog ne peut pas lire l'instantané Amazon Elastic Block Store (EBS) sous-jacent de l'AMI, et ne peut donc pas analyser ou signaler l'AMI.

## Distributions Linux {#linux-distributions}

Les distributions Linux suivantes sont prises en charge pour les analyses d'hôtes et de conteneurs :

| Système d'exploitation         | Versions prises en charge                                  | Gestionnaires de paquets | Bulletins de sécurité                                                                                       |
|--------------------------|-----------------------------------------------------|------------------|-----------------------------------------------------------------------------------------------------------|
| Alpine Linux             | 2.2-2.7, 3.0-3.19 (edge n'est pas pris en charge)           | apk              | [https://secdb.alpinelinux.org/][1]                                                                       |
| Wolfi Linux              | N/A                                                 | apk              | [https://packages.wolfi.dev/os/security.json][2]                                                          |
| Chainguard               | N/A                                                 | apk              | [https://packages.cgr.dev/chainguard/security.json][3]                                                    |
| Red Hat Enterprise Linux | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] et [https://www.redhat.com/security/data/oval/v2/][5] |
| CentOS                   | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/][4] et [https://www.redhat.com/security/data/oval/v2/][5] |
| AlmaLinux                | 8, 9                                                | dnf/yum/rpm      | [https://errata.almalinux.org/][6]                                                                        |
| Rocky Linux              | 8, 9                                                | dnf/yum/rpm      | [https://download.rockylinux.org/pub/rocky/][7]                                                           |
| Oracle Linux             | 5, 6, 7, 8                                          | dnf/yum/rpm      | [https://linux.oracle.com/security/oval/][8]                                                              |
| CBL-Mariner              | 1.0, 2.0                                            | dnf/yum/rpm      | [https://github.com/microsoft/CBL-MarinerVulnerabilityData/][9]                                           |
| Amazon Linux             | 1, 2, 2023                                          | dnf/yum/rpm      | [https://alas.aws.amazon.com/][10]                                                                        |
| openSUSE Leap            | 42, 15                                              | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| SUSE Linux Enterprise    | 11, 12, 15                                          | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/][11]                                                     |
| Photon OS                | 1.0, 2.0, 3.0, 4.0                                  | tdnf/yum/rpm     | [https://packages.vmware.com/photon/photon_cve_metadata/][12]                                             |
| Debian GNU/Linux         | 7, 8, 9, 10, 11, 12 (unstable/sid n'est pas pris en charge) | apt/dpkg         | [https://security-tracker.debian.org/tracker/][13] et [https://www.debian.org/security/oval/][14]        |
| Ubuntu                   | Toutes les versions prises en charge par Canonical                 | apt/dpkg         | [https://ubuntu.com/security/cve][15]                                                                     |

## Bibliothèques d'applications {#application-libraries}

Les langages et bibliothèques d'application suivants sont pris en charge pour les analyses de vulnérabilité sur les images de conteneur, les fonctions Lambda et les conteneurs exécutés sur des hôtes :

| Langage | Gestionnaire de paquets pris en charge | Fichiers pris en charge                                                      |
|----------|---------------------------|----------------------------------------------------------------------|
| Ruby     | bundler                   | Gemfile.lock, gemspec                                                |
| .NET     | nuget                     | packages.lock.json, packages.config, .deps.json, *packages.props     |
| Go       | mod                       | Binaires créés par Go, go.mod                                         |
| Java     | Gradle, Maven             | pom.xml, *gradle.lockfile, JAR/WAR/PAR/EAR (avec pom.properties)     |
| Node.js  | npm, pnpm, yarn           | package-lock.json, yarn.lock, pnpm-lock.yaml, package.json           |
| PHP      | composer                  | composer.lock                                                        |
| Python   | pip, poetry               | pipfile.lock, poetry.lock, egg package, wheel package, conda package |

## Registres d'images de Container {#container-image-registries}

Les registres d'images de conteneur suivants sont pris en charge pour les analyses d'images de conteneur :

| Registre                        | Niveau de prise en charge | Remarques                                                                                                                                                                                                                                         |
|---------------------------------|---------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon ECR (public et privé) | GA            | Analyse les images de conteneur en cours d'exécution **et** les 1 000 dernières images poussées au repos (par date). Il s'agit du seul registre prenant en charge l'analyse au repos<br />**Remarque&nbsp;:** Pour augmenter le nombre d'images au repos à analyser, contactez le [Support Datadog][16] |
| Google Artifact Registry (GAR)  | Aperçu       | Analyse uniquement les images liées aux charges de travail en cours d'exécution (Cloud Run, GKE)<br />**Remarque**&nbsp;: La prise en charge de l'analyse au repos de Google Artifact Registry est en [Aperçu][19]                                                                                             |
| Azure Container Registry (ACR)  | GA            | Analyse uniquement les images de conteneur en cours d'exécution provenant d'Azure Container Apps et d'Azure Container Instances<br />**Remarque**&nbsp;: L'analyse de registre au repos n'est pas prise en charge. Pour en faire la demande, contactez le [Datadog Support][16]                                                                |

**Remarque**&nbsp;: L'analyse d'images de Container à partir du registre n'est prise en charge que si vous avez installé Agentless avec :
  - CloudFormation Integrations >= v2.0.8
  - Module Terraform Agentless >= v0.11.7

## Runtimes de Container{#container-runtimes}

Les environnements d'exécution de conteneur suivants sont pris en charge :

- containerd : v1.5.6 ou version ultérieure
- Docker

**Remarque pour les observations de conteneur** : l'Agentless Scanning nécessite des couches d'image de conteneur non compressées. En guise de solution de contournement, vous pouvez définir l'option de configuration `discard_unpacked_layers=false` dans le fichier de configuration de containerd.

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
[18]: /fr/containers/cluster_agent/setup/
[19]: https://www.datadoghq.com/product-preview/google-artifact-registry-at-rest-scanning/
[20]: https://www.datadoghq.com/product-preview/azure-functions-vulnerability-scanning/
[21]: https://www.datadoghq.com/product-preview/google-cloud-run-functions-vulnerability-scanning/