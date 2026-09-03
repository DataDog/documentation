---
aliases:
- /fr/security/cloud_security_management/agentless_scanning/deployment_methods
further_reading:
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentation
  text: Cloud Security Agentless Scanning
- link: /security/cloud_security_management/setup/agentless_scanning/enable
  tag: Documentation
  text: Activation de Agentless Scanning
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: Documentation
  text: Mise à jour de Agentless Scanning
title: Déploiement de Agentless Scanning
---
Ce guide vous aide à choisir la topologie de déploiement adaptée à Agentless Scanning en fonction de votre environnement cloud. Pour les instructions de configuration, consultez [Activation de Agentless Scanning][3].

## Présentation {#overview}

Datadog recommande les directives suivantes :
- Utilisez un compte de scanner dédié pour les environnements multi-comptes.
- Déployez un scanner dans chaque région contenant plus de 150 hôtes.
- Si vous utilisez [Cloud Storage Scanning][1], déployez un scanner dans chaque région contenant un magasin de données (par exemple, des compartiments S3).

<div class="alert alert-info">Les scanners envoient uniquement la liste collectée des paquets et les métadonnées des host (noms d'hôte, identifiants d'instance EC2/VM/Compute Engine) à Datadog. Toutes les données analysées restent dans votre infrastructure.</div>

## Configuration du compte cloud et de la région {#cloud-account-and-region-configuration}

La topologie de déploiement que vous utilisez dépend du nombre de comptes cloud (comptes AWS, abonnements Azure ou projets GCP) que vous devez analyser et des régions qu'ils couvrent.

- **Comptes cloud** : Si vous n'avez besoin d'analyser qu'un seul compte, déployez un ou plusieurs scanners directement dans ce compte. Sinon, utilisez un compte de scanner dédié et utilisez des rôles délégués pour lui accorder l'accès à l'analyse d'autres comptes. C'est ce qu'on appelle l'**analyse inter-comptes**.
- **Régions** : Un seul scanner peut analyser des hôtes dans n'importe quelle région, y compris des régions autres que la sienne. Cependant, l'analyse inter-régions entraîne des coûts de transfert de données. Le déploiement de scanners supplémentaires dépend du nombre d'hôtes dont vous disposez dans chaque région.

Ces onglets contiennent des informations sur la façon de configurer votre topologie de déploiement. Sélectionnez l'onglet qui décrit le nombre de comptes que vous devez analyser, puis apprenez-en davantage en fonction du nombre de régions que vous devez couvrir.

{{< tabs >}}
{{% tab "Compte unique" %}}

Si vous n'avez besoin d'analyser qu'un seul compte, déployez un ou plusieurs scanners directement dans ce compte.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/single-account.png" alt="Diagramme de Agentless Scanning montrant le scanner sans agent appliqué dans un compte qui couvre plusieurs régions" width="40%" >}}

### Décidez du nombre de scanners à déployer {#decide-how-many-scanners-to-deploy}

Un seul scanner peut analyser des hôtes dans n'importe quelle région, y compris des régions autres que la sienne. L'analyse inter-régions entraîne des coûts de transfert de données ; la décision de déployer des scanners supplémentaires dépend donc du nombre d'hôtes dont vous disposez dans chaque région.

- **Moins de ~150 hôtes au total dans toutes les régions** : un seul scanner dans une région est la configuration la plus rentable. Les coûts de transfert de données inter-régions pour l'analyse d'hôtes distants sont inférieurs au coût fixe d'exécution d'un scanner supplémentaire.
- **Plus de ~150 hôtes dans une région spécifique** : déployez un scanner dédié dans cette région. À ce seuil, les économies de sortie réalisées grâce à une analyse locale l'emportent sur le coût d'exécution du scanner.
- **Plusieurs régions au-dessus du seuil** : déployez un scanner dans chaque région dépassant ~150 hôtes. Les régions en dessous du seuil peuvent être analysées de manière inter-régionale à partir du scanner le plus proche.

Datadog achemine automatiquement les analyses vers le scanner régional approprié afin de minimiser les coûts inter-régions.

#### Limites de capacité du scanner {#scanner-capacity-limits}

Chaque scanner possède des limites de débit régies par les quotas d'API du fournisseur cloud :

| Limite | Valeur |
|-------|-------|
| Nombre maximal de scanners par compte et par région | 4 (plafond strict ; les fournisseurs cloud comme AWS limitent les instantanés simultanés à 100 par compte et par région) |
| Intervalle d'analyse | Toutes les 12 heures |

<div class="alert alert-danger">N'augmentez pas le nombre souhaité du groupe Autoscaling (ASG) au-delà de quatre scanners par région. Des scanners supplémentaires ne peuvent pas créer d'instantanés en raison de la limite d'instantanés simultanés des fournisseurs cloud.</div>

{{% /tab %}}
{{% tab "Comptes multiples" %}}

### Décidez dans quels comptes déployer les scanners {#decide-which-accounts-to-deploy-scanners-in}

Datadog recommande d'utiliser un **compte de scanner dédié** pour déployer les scanners, et d'utiliser des **rôles de délégation inter-comptes** pour accorder aux scanners l'accès aux comptes cibles (y compris le compte de scanner).

Pour AWS Organizations, utilisez un [CloudFormation StackSet][1] pour déployer un rôle de délégation dans tous les comptes membres, automatisant ainsi l'intégration pour l'analyse inter-comptes.

Le diagramme suivant illustre l'analyse inter-comptes à partir d'un compte central (Compte 4) :

{{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="Diagramme de Agentless Scanning montrant le scanner sans agent déployé dans un compte cloud central" width="90%" >}}

**Si vous ne souhaitez pas accorder d'autorisations inter-comptes**, déployez plutôt un scanner dans chaque compte. Cela entraîne des coûts plus élevés car chaque scanner effectue des analyses inter-régions au sein de son compte.

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Diagramme de Agentless Scanning montrant le scanner sans agent déployé dans chaque compte cloud" width="90%" >}}

### Décidez du nombre de scanners à déployer {#decide-how-many-scanners-to-deploy-1}

Un seul scanner peut analyser des hôtes dans n'importe quelle région, y compris des régions autres que la sienne. L'analyse inter-régions entraîne des coûts de transfert de données ; la décision de déployer des scanners supplémentaires dépend donc du nombre d'hôtes dont vous disposez dans chaque région.

- **Moins de ~150 hôtes au total dans toutes les régions** : un seul scanner dans une région est la configuration la plus rentable. Les coûts de transfert de données inter-régions pour l'analyse d'hôtes distants sont inférieurs au coût fixe d'exécution d'un scanner supplémentaire.
- **Plus de ~150 hôtes dans une région spécifique** : déployez un scanner dédié dans cette région. À ce seuil, les économies de sortie réalisées grâce à une analyse locale l'emportent sur le coût d'exécution du scanner.
- **Plusieurs régions au-dessus du seuil** : déployez un scanner dans chaque région dépassant ~150 hôtes. Les régions en dessous du seuil peuvent être analysées de manière inter-régionale à partir du scanner le plus proche.

Datadog achemine automatiquement les analyses vers le scanner régional approprié afin de minimiser les coûts inter-régions.

#### Limites de capacité du scanner {#scanner-capacity-limits-1}

Chaque scanner possède des limites de débit régies par les quotas d'API du fournisseur cloud :

| Limite | Valeur |
|-------|-------|
| Nombre maximal de scanners par compte et par région | 4 (plafond strict ; les fournisseurs cloud comme AWS limitent les instantanés simultanés à 100 par compte et par région) |
| Intervalle d'analyse | Toutes les 12 heures |

<div class="alert alert-danger">N'augmentez pas le nombre souhaité du groupe Autoscaling (ASG) au-delà de quatre scanners par région. Des scanners supplémentaires ne peuvent pas créer d'instantanés en raison de la limite d'instantanés simultanés des fournisseurs cloud.</div>

[1]: /fr/security/cloud_security_management/setup/agentless_scanning/enable#aws-cloudformation-stackset-setup

{{% /tab %}}
{{< /tabs >}}

## Considérations sur le réseau d'entreprise {#enterprise-networking-considerations}

Par défaut, le scanner crée un nouveau VPC lors du déploiement. Si votre organisation utilise Terraform et dispose de politiques de contrôle de service (SCP) qui restreignent la création de VPC, utilisez l'option [{{< ui >}}custom VPC{{< /ui >}}][2] lors de la configuration pour utiliser un VPC existant au lieu d'en créer un nouveau.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_security_management/agentless_scanning#cloud-storage-scanning
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples/custom_vpc
[3]: /fr/security/cloud_security_management/setup/agentless_scanning/enable
[4]: /fr/security/cloud_security_management/setup/agentless_scanning/enable#setup