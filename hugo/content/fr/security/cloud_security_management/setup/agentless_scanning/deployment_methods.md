---
aliases:
- /fr/security/cloud_security_management/agentless_scanning/deployment_methods
further_reading:
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentation
  text: Agentless Scanning Cloud Security
- link: /security/cloud_security_management/setup/agentless_scanning/enable
  tag: Documentation
  text: Activer Agentless Scanning
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: Documentation
  text: Mise à jour d'Agentless Scanning
title: Déploiement d'Agentless Scanning
---

Ce guide vous aide à choisir la bonne topologie de déploiement pour Agentless Scanning en fonction de votre environnement cloud. Pour les instructions de configuration, consultez la section [Activer Agentless Scanning][3].

## Présentation

Datadog recommande de suivre les directives suivantes :
- Utilisez un compte de scanner dédié pour les environnements multi-comptes.
- Déployez un scanner dans chaque région contenant plus de 150 hosts.
- Si vous utilisez [Cloud Storage Scanning][1], déployez un scanner dans chaque région contenant un datastore (par exemple, des compartiments S3 ou des instances RDS).

<div class="alert alert-info">Les scanners envoient uniquement à Datadog la liste collectée de packages et les métadonnées du host (hostnames, identifiants d'instances EC2/VM/Compute Engine). Toutes les données scannées restent dans votre infrastructure.</div>

## Configuration du compte cloud et de la région

La topologie de déploiement que vous utilisez dépend du nombre de comptes cloud (comptes AWS, abonnements Azure ou projets GCP) à scanner et des régions qu'ils couvrent.

- **Comptes cloud** : si vous n'avez besoin de scanner qu'un seul compte, déployez un ou plusieurs scanners directement dans ce compte. Dans le cas contraire, utilisez un compte de scanner dédié et des rôles délégués pour lui accorder l'accès nécessaire au scan des autres comptes. C'est ce qu'on appelle le **scan inter-comptes**.
- **Régions** : un scanner unique peut scanner les hosts de n'importe quelle région, y compris des régions autres que la sienne. Cependant, le scan inter-régions entraîne des coûts de transfert de données. Le déploiement de scanners supplémentaires dépend du nombre de hosts présents dans chaque région.

Ces onglets contiennent des informations sur la configuration de votre topologie de déploiement. Sélectionnez l'onglet correspondant au nombre de comptes à scanner, puis apprenez-en plus en fonction du nombre de régions à couvrir.

{{< tabs >}}
{{% tab "Single account" %}}

Si vous n'avez besoin de scanner qu'un seul compte, déployez un ou plusieurs scanners directement dans ce compte.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/single-account.png" alt="Diagramme d'Agentless Scanning montrant le scanner Agentless appliqué dans un compte couvrant plusieurs régions" width="40%" >}}

### Déterminer le nombre de scanners à déployer

Un scanner unique peut scanner les hosts de n'importe quelle région, y compris des régions autres que la sienne. Le scan inter-régions entraîne des coûts de transfert de données. La décision de déployer des scanners supplémentaires dépend donc du nombre de hosts présents dans chaque région.

- **Moins de ~150 hosts au total dans toutes les régions** : un scanner unique dans une seule région est la configuration la plus économique. Les coûts de transfert de données inter-régions pour le scan des hosts distants sont inférieurs au coût fixe d'exécution d'un scanner supplémentaire.
- **Plus de ~150 hosts dans une région spécifique** : déployez un scanner dédié dans cette région. À ce seuil, les économies réalisées sur les coûts d'egress grâce au scan local compensent le coût d'exécution du scanner.
- **Plusieurs régions au-dessus du seuil** : déployez un scanner dans chaque région dépassant ~150 hosts. Les régions en dessous du seuil peuvent être scannées en inter-régions depuis le scanner le plus proche.

Datadog achemine automatiquement les scans vers le scanner régional approprié afin de minimiser les coûts inter-régions.

#### Limites de capacité du scanner

Chaque scanner est soumis à des limites de débit régies par les quotas d'API du fournisseur cloud :

| Limite | Valeur |
|-------|-------|
| Nombre maximum de scanners par compte et par région | 4 (limite stricte ; les fournisseurs cloud tels qu'AWS limitent les snapshots simultanés à 100 par compte et par région) |
| Intervalle de scan | Toutes les 12 heures |

<div class="alert alert-danger">N'augmentez pas le nombre souhaité dans le groupe Auto Scaling (ASG) au-delà de quatre scanners par région. Les scanners supplémentaires ne peuvent pas créer de snapshots en raison de la limite de snapshots simultanés imposée par les fournisseurs cloud.</div>

{{% /tab %}}
{{% tab "Multiple accounts" %}}

### Déterminer les comptes dans lesquels déployer des scanners

Datadog recommande d'utiliser un **compte de scanner dédié** pour y déployer des scanners, et des **rôles délégués inter-comptes** pour accorder aux scanners l'accès aux comptes cibles (y compris le compte de scanner).

Pour AWS Organizations, utilisez un [CloudFormation StackSet][1] pour déployer un rôle délégué dans tous les comptes membres, ce qui automatise l'intégration pour le scan inter-comptes.

Le diagramme suivant illustre le scan inter-comptes depuis un compte central (Compte 4) :

{{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="Diagramme d'Agentless Scanning montrant le scanner Agentless déployé dans un compte cloud central" width="90%" >}}

**Si vous ne souhaitez pas accorder d'autorisations inter-comptes**, déployez plutôt un scanner dans chaque compte. Cela entraîne des coûts plus élevés, car chaque scanner effectue des scans inter-régions au sein de son propre compte.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Diagramme d'Agentless Scanning montrant le scanner Agentless déployé dans chaque compte cloud" width="90%" >}}

### Déterminer le nombre de scanners à déployer

Un scanner unique peut scanner les hosts de n'importe quelle région, y compris des régions autres que la sienne. Le scan inter-régions entraîne des coûts de transfert de données. La décision de déployer des scanners supplémentaires dépend donc du nombre de hosts présents dans chaque région.

- **Moins de ~150 hosts au total dans toutes les régions** : un scanner unique dans une seule région est la configuration la plus économique. Les coûts de transfert de données inter-régions pour le scan des hosts distants sont inférieurs au coût fixe d'exécution d'un scanner supplémentaire.
- **Plus de ~150 hosts dans une région spécifique** : déployez un scanner dédié dans cette région. À ce seuil, les économies réalisées sur les coûts d'egress grâce au scan local compensent le coût d'exécution du scanner.
- **Plusieurs régions au-dessus du seuil** : déployez un scanner dans chaque région dépassant ~150 hosts. Les régions en dessous du seuil peuvent être scannées en inter-régions depuis le scanner le plus proche.

Datadog achemine automatiquement les scans vers le scanner régional approprié afin de minimiser les coûts inter-régions.

#### Limites de capacité du scanner

Chaque scanner est soumis à des limites de débit régies par les quotas d'API du fournisseur cloud :

| Limite | Valeur |
|-------|-------|
| Nombre maximum de scanners par compte et par région | 4 (limite stricte ; les fournisseurs cloud tels qu'AWS limitent les snapshots simultanés à 100 par compte et par région) |
| Intervalle de scan | Toutes les 12 heures |

<div class="alert alert-danger">N'augmentez pas le nombre souhaité dans le groupe Auto Scaling (ASG) au-delà de quatre scanners par région. Les scanners supplémentaires ne peuvent pas créer de snapshots en raison de la limite de snapshots simultanés imposée par les fournisseurs cloud.</div>

[1]: /fr/security/cloud_security_management/setup/agentless_scanning/enable#aws-cloudformation-stackset-setup

{{% /tab %}}
{{< /tabs >}}

## Considérations relatives aux réseaux d'entreprise

Par défaut, le scanner crée un nouveau VPC lors du déploiement. Si votre organisation utilise Terraform et dispose de politiques de contrôle des services (SCP) qui restreignent la création de VPC, utilisez l'option [**VPC personnalisé**][2] lors de la configuration pour utiliser un VPC existant plutôt que d'en créer un nouveau.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_security_management/agentless_scanning#cloud-storage-scanning
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples/custom_vpc
[3]: /fr/security/cloud_security_management/setup/agentless_scanning/enable
[4]: /fr/security/cloud_security_management/setup/agentless_scanning/enable#setup