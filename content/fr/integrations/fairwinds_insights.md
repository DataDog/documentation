---
algolia:
  subcategory: Intégrations du Marketplace
app_id: fairwinds-insights
app_uuid: a488d774-fd45-4765-b947-e48792c6ab32
assets:
  dashboards:
    Insights Overview: assets/dashboards/overview.json
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: fairwinds.insights.action_items
      metadata_path: metadata.csv
      prefix: fairwinds.insights.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Fairwinds Insights
author:
  homepage: https://www.fairwinds.com
  name: Fairwinds
  sales_email: datadog-marketplace@fairwinds.com
  support_email: insights@fairwinds.com
  vendor_id: fairwinds
categories:
- containers
- gestion des coûts
- kubernetes
- marketplace
- provisioning
- security
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: fairwinds_insights
integration_id: fairwinds-insights
integration_title: Fairwinds Insights
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: fairwinds_insights
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.fairwinds.insights
  product_id: insights
  short_description: Logiciel de gouvernance et de sécurité pour Kubernetes
  tag: insights_node
  unit_label: Nœud Kubernetes
  unit_price: 100
public_title: Fairwinds Insights
short_description: Protège et optimise vos applications Kubernetes critiques
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Cost Management
  - Category::Kubernetes
  - Category::Marketplace
  - Category::Provisioning
  - Category::Security
  - Offering::Integration
  - Offering::Software License
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Protège et optimise vos applications Kubernetes critiques
  media:
  - caption: Fairwinds Insights est un logiciel de gouvernance et de sécurité pour
      Kubernetes qui vous permet de définir des alertes de sécurité, de mettre en
      place des garde-fous, d'analyser la conformité et de suivre des recommandations
      pour optimiser vos coûts. Fairwinds Insights s'intègre à Datadog afin que vous
      puissiez consulter tous vos rapports depuis une interface unique.
    image_url: images/Video_Front_Cover.png
    media_type: video
    vimeo_id: 619368230
  - caption: Le contrôleur d'admission Fairwinds Insights s'exécute chaque fois qu'une
      nouvelle ressource est ajoutée au cluster. Si cette ressource va à l'encontre
      des stratégies de votre organisation, le contrôleur d'admission la rejette et
      prévient le client.
    image_url: images/Fairwinds_Insights_Admission_Controller_Image_v1.png
    media_type: image
  - caption: Fairwinds Insights vérifie constamment que vos clusters respectent les
      configurations de sécurité, afin d'atténuer les risques et de veiller à l'application
      des bonnes pratiques. Cette solution identifie les risques liés à Kubernetes
      et à vos conteneurs, les hiérarchise, fournit des conseils pour la résolution
      de vos problèmes et offre un suivi des différents statuts.
    image_url: images/Fairwinds_Insights_Automate_Kubernetes_Policies_Image_v1.png
    media_type: image
  - caption: Vos équipes peuvent concevoir et appliquer des stratégies personnalisées
      via OPA et les intégrer à chaque composant de Fairwinds Insights, y compris
      les pipelines de CI/CD, le contrôleur d'admission et l'Agent dans le cluster.
      Fairwinds Inisghts comprend une bibliothèque de modèles OPA.
    image_url: images/Fairwinds_Insights_Customize_Open_Policy_Agent_Image_v1.png
    media_type: image
  - caption: Fairwinds Insights surveille l'utilisation du CPU et de la mémoire, afin
      d'émettre des recommandations à propos des requêtes et des limites des ressources.
      Vous pouvez ainsi optimiser votre utilisation du CPU et de la mémoire pour vos
      workloads Kubernetes.
    image_url: images/Fairwinds_Insights_Optimize_Kubernetes_Resources_Image_v1.png
    media_type: image
  - caption: Fairwinds Insights s'intègre parfaitement à vos pipelines de CI/CD, afin
      que la sécurité soit plus en amont. Les équipes DevOps peuvent éviter les erreurs
      de configuration par le biais du CI/CD et fournir des conseils aux développeurs
      afin de résoudre plus facilement les problèmes, sans nécessiter d'intervention
      manuelle. Grâce aux protections mises en place, les développeurs disposent de
      toute la liberté dont ils ont besoin pour travailler efficacement.
    image_url: images/Fairwinds_Insights_Shift_Left_Security_Image_v1.png
    media_type: image
  - caption: Fairwinds Insights propose des fonctionnalités de surveillance du runtime
      des conteneurs et s'intègre au processus de CI/CD. La solution surveille les
      vulnérabilités connues dans les conteneurs, hiérarchise les découvertes en fonction
      de la gravité du problème et propose des options de résolution. Elle s'intègre
      aux workflows de gestion de tickets et d'attribution, pour un meilleur suivi
      des statuts de résolution.
    image_url: images/Fairwinds_Insights_VulnerabilityScanning_Image_v1.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Fairwinds Insights
  uninstallation: README.md#Uninstallation
---



## Présentation

Conçu pour protéger et optimiser vos applications Kubernetes critiques

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

Pour obtenir de l'aide ou transmettre une demande, contactez Fairwinds aux coordonnées suivantes :

- Téléphone : +1 617-202-3659 
- E-mail : [sales@fairwinds.com][2]

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

### Politique de remboursement

Politique d'annulation et de remboursement d'Insights :

Fairwinds Insights est proposé sous forme d'abonnement mensuel que vous, le client, pouvez interrompre à tout moment par les moyens mis à votre disposition via votre compte Marketplace Datadog. Si vous choisissez de mettre fin à votre abonnement, seul le reste de la période de facturation mensuelle en cours vous sera facturé. Insights n'émettra aucun remboursement pour les frais déjà payés.

### Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller Kubernetes avec la solution Fairwinds Insights du Marketplace Datadog][2]
- [Documentation Fairwinds Insights][3]

[1]: https://insights.fairwinds.com
[2]: https://www.datadoghq.com/blog/fairwinds-insights-datadog-marketplace/
[3]: https://insights.docs.fairwinds.com/
---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/fairwinds-insights" target="_blank">Cliquez ici</a> pour l'acheter.