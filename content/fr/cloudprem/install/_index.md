---
description: Découvrir comment déployer CloudPrem sur différentes plateformes et environnements
title: Installer CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en Preview" >}}
  Rejoignez la Preview CloudPrem pour accéder aux nouvelles fonctionnalités de Log Management auto-hébergé.
{{< /callout >}}

## Présentation

CloudPrem peut être déployé dans différents environnements, des services Kubernetes gérés dans le cloud aux serveurs bare metal. Les instructions d'installation fournies sont spécifiques aux **distributions Kubernetes**.

## Prérequis

<div class="alert alert-info">
Si l'entrée CloudPrem n'apparaît pas dans le menu Logs, cela signifie que CloudPrem n'est pas activé sur votre compte. Rejoignez la <a href="https://www.datadoghq.com/product-preview/cloudprem/">Preview CloudPrem</a> pour activer CloudPrem sur votre compte.
</div>

### Prérequis du cluster Kubernetes

| Prérequis            | Détails                                                                                  |
|------------------------|------------------------------------------------------------------------------------------|
| **Version Kubernetes** | 1.25 ou supérieure                                                                           |
| **Plateformes recommandées** | - AWS EKS<br>- Google GKE<br>- Azure AKS<br>- Kubernetes auto-géré (contrôleur Nginx) |
| **Stockage des métadonnées**   | Base de données PostgreSQL                                                                      |
| **Options PostgreSQL recommandées** | - AWS : RDS PostgreSQL<br>- GCP : Cloud SQL for PostgreSQL<br>- Azure : Azure Database for PostgreSQL<br>- Auto-hébergé : PostgreSQL avec stockage persistant |

### Stockage objet
CloudPrem prend en charge les types de stockage objet suivants :
- Amazon S3
- Google Cloud Storage (GCS)
- Azure Blob Storage
- MinIO
- Ceph Object Storage
- Tout stockage compatible S3

## Kubernetes géré dans le cloud

{{< whatsnext desc="Sélectionnez le guide d'installation correspondant à votre environnement :">}}
  {{< nextlink href="/cloudprem/install/aws_eks" >}}Installer sur AWS EKS{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/azure_aks" >}}Installer sur Azure AKS{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/gcp_gke" >}}Installer sur GCP GKE{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/docker" >}}Installer localement avec Docker à des fins de test{{< /nextlink >}}
  {{< nextlink href="/cloudprem/install/custom_k8s" >}}Installer sur Kubernetes avec PostgreSQL et MinIO{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://www.datadoghq.com/product-preview/cloudprem/