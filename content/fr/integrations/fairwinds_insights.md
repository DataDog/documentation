---
"assets":
  "dashboards":
    "Insights Overview": assets/dashboards/overview.json
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://www.fairwinds.com"
  "name": Fairwinds
"categories":
- marketplace
- containers
- gestion des coûts
- security
"creates_events": true
"ddtype": "crawler"
"dependencies": []
"display_name": "Fairwinds Insights"
"draft": false
"git_integration_title": "fairwinds_insights"
"guid": "fd4bd190-d57d-449b-9880-76cbf8325a3e"
"integration_id": "fairwinds-insights"
"integration_title": "Fairwinds Insights"
"is_public": true
"kind": "integration"
"maintainer": "insights@fairwinds.com"
"manifest_version": "1.0.0"
"metric_prefix": "fairwinds.insights."
"metric_to_check": "fairwinds.insights.action_items"
"name": "fairwinds_insights"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.fairwinds.insights
  "tag": insights_cluster
  "unit_label": Cluster Kubernetes
  "unit_price": !!int "699"
"public_title": "Fairwinds Insights"
"short_description": "Protège et optimise vos applications Kubernetes critiques."
"support": "partner"
"supported_os":
- linux
- mac_os
- windows
"terms":
  "eula": assets/eula.pdf
  "legal_email": datadog-marketplace@fairwinds.com
---



## Présentation

{{< img src="marketplace/fairwinds_insights/images/dashboard.png" alt="Dashboard" >}}

### Conçu pour protéger et optimiser vos applications Kubernetes critiques

#### Simplifiez les transferts entre les équipes Dev et Ops

* Définissez et contrôlez des politiques personnalisées pour plusieurs clusters
* Mettez en œuvre des garde-fous et des bonnes pratiques avec un contrôleur d'admission
* Scannez les conteneurs d'intégration et validez leur déploiement dans vos processus CI/CD

#### Suivez et optimisez les coûts liés à Kubernetes

* Visualisez l'utilisation des ressources de vos workloads et les coûts estimés
* Déterminez les meilleurs paramètres de CPU et de mémoire pour vos workloads

#### Gagnez du temps

* Intégrez vos recommandations de configuration Kubernetes avec vos dashboards Datadog existants
* Stimulez la collaboration avec l'intégration Slack

#### Réduisez les risques

* Identifiez les vulnérabilités connues dans vos conteneurs
* Validez les configurations de déploiement Kubernetes

## Données collectées

### Métriques

Les Action Items de Fairwinds Insights apparaîtront dans Datadog avec des tags pour vous permettre de les analyser comme bon vous semble.

### Checks de service

Fairwinds Insights n'inclut aucun check de service.

### Événements

* Un événement initial sera généré lors de la première configuration de l'intégration
* Un événement sera généré pour chaque nouvel Action Item dans Fairwinds Insights
* Un événement sera généré pour chaque Action Item résolu dans Fairwinds Insights

## Assistance

Pour obtenir de l'aide ou communiquer une demande, contactez Fairwinds aux coordonnées suivantes :

Téléphone : +1 617-202-3659 E-mail : sales@fairwinds.com

La documentation est disponible [ici](https://insights.docs.fairwinds.com/). Vous découvrirez comment configurer, intégrer et utiliser Fairwinds Insights pour exploiter tout son potentiel.

---
Cette application est disponible sur le Marketplace et développée par un partenaire de Datadog. [Cliquez ici](https://app.datadoghq.com/marketplace/app/fairwinds-insights/pricing) pour l'acheter.

### Questions fréquentes

**Comment fonctionne Fairwinds Insights ?**

Fairwinds Insights offre une vue centralisée et multicluster sur trois catégories de problèmes de configuration Kubernetes : sécurité, efficacité et fiabilité. Le programme vous permet de déployer facilement plusieurs outils open-source via une installation helm unique, évitant ainsi aux ingénieurs de passer du temps à installer et configurer chaque outil séparément. Fairwinds Insights offre également des fonctionnalités de gestion des politiques pour permettre aux équipes d'ingénierie de définir et mettre en œuvre des garde-fous pour les déploiements au sein de clusters Kubernetes.

**Qu'est-ce qu'un plug-in ?**

Les plug-ins désignent les outils intégrés avec Fairwinds Insights.

**Qu'est-ce qu'un Agent ?**

L'Agent Fairwinds Insights désigne le chart helm inclus avec le programme.

**Comment mes données sont-elles traitées ?**

Fairwinds Insights met en commun les résultats de chaque plug-in et les affiche dans une vue multicluster pour optimiser la visualisation, la priorisation et le suivi des problèmes.

**Quels sont les plug-ins inclus avec Fairwinds Insights ?**

Fairwinds Insights offre des intégrations pour un large éventail d'outils open source couramment utilisés, tels que [Polaris](https://github.com/FairwindsOps/polaris), [Goldilocks](https://github.com/FairwindsOps/goldilocks/), [Open Policy Agent](https://www.openpolicyagent.org/) et le [scanneur de conteneurs Trivy](https://github.com/aquasecurity/trivy). Pour obtenir la liste complète, accédez au [centre de documentation de Fairwinds Insights](https://insights.docs.fairwinds.com/). Voici quelques exemples de problèmes pouvant être détectés :

* Vulnérabilités au niveau de conteneurs
* Problèmes de sécurité liés aux déploiements Kubernetes (exemple : déploiements configurés pour être exécutés avec les autorisations root)
* Risques au niveau des clusters (exemples : pods exposés, informations sensibles non protégées, etc.)
* CVE Kubernetes
* Notification automatique en cas de chart Helm obsolète
* Politiques et contrôles de configuration Kubernetes personnalisés

[1]: https://insights.fairwinds.com

### Politique de remboursement

Politique d'annulation et de remboursement d'Insights :

Fairwinds Insights est proposé sous forme d'abonnement mensuel que vous, le client, pouvez interrompre à tout moment par les moyens mis à votre disposition via votre compte DataDog Marketplace. Si vous choisissez de mettre fin à votre abonnement, seul le reste de la période de facturation mensuelle en cours vous sera facturé. Insights n'émettra aucun remboursement pour les frais déjà payés.

