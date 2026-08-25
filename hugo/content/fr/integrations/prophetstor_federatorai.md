---
algolia:
  subcategory: Intégrations du Marketplace
app_id: prophetstor-federatorai-license
app_uuid: 965e6142-3b99-4999-a7c6-09a00775e511
assets:
  integration:
    auto_install: false
    configuration:
      spec: ''
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: federatorai.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10187
    source_type_name: Federator.ai.license
author:
  homepage: https://www.prophetstor.com/
  name: ProphetStor
  sales_email: dd_subscription@prophetstor.com
  support_email: support@prophetstor.com
  vendor_id: prophetstor
categories:
- containers
- kubernetes
- marketplace
- orchestration
- ai/ml
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: prophetstor_federatorai
integration_id: prophetstor-federatorai-license
integration_title: ProphetStor Federator.ai
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: prophetstor_federatorai
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: federatorai-license
  short_description: 2 000 $ par mois
  unit_price: 2000
public_title: ProphetStor Federator.ai
short_description: Licence Federator.ai pour optimiser vos applications Kubernetes
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Marketplace
  - Category::Orchestration
  - Category::AI/ML
  - Offering::Software License
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Licence Federator.ai pour optimiser vos applications Kubernetes
  media:
  - caption: Le dashboard ProphetStor Federator.ai Cluster Overview affiche l'utilisation
      prévue des ressources et des recommandations pour les nœuds et clusters Kubernetes,
      ainsi que leur utilisation passée.
    image_url: images/Federator_ai_Datadog_Cluster_Overview.png
    media_type: image
  - caption: Le dashboard ProphetStor Federator.ai Application Overview affiche l'utilisation
      prévue du processeur et de la mémoire ainsi que des recommandations pour chaque
      application.
    image_url: images/Federator_ai_Datadog_Application_Overview.png
    media_type: image
  - caption: Le dashboard ProphetStor Federator.ai Kafka Overview affiche des données
      d'utilisation et des recommandations sur les réplicas de consommateurs Kafka.
    image_url: images/Federator_ai_Datadog_Kafka_Overview.png
    media_type: image
  - caption: Le dashboard ProphetStor Federator.ai Cost Analysis Overview affiche
      le coût de déploiement d'un cluster Kubernetes, des recommandations concernant
      la configuration du cluster, ainsi qu'une estimation des coûts et économies
      associés au déploiement du cluster sur différents fournisseurs de cloud publics.
    image_url: images/Federator_ai_Datadog_Cost_Analysis_Overview.png
    media_type: image
  - caption: Le dashboard Federator.ai affiche la charge prévue ainsi que des recommandations
      pour les ressources des clusters et applications Kubernetes ou VMware.
    image_url: images/Federator_ai_Dashboard.png
    media_type: image
  - caption: Federator.ai offre des prédictions et des recommandations pour les ressources
      de vos clusters, nœuds, espaces de nommage, applications et contrôleurs
    image_url: images/Federator_ai_Workload_Prediction.png
    media_type: image
  - caption: En fonction de la charge prévue d'un cluster, Federator.ai vous recommande
      la configuration la plus économique à utiliser pour chaque fournisseur de cloud
      public.
    image_url: images/Federator_ai_Multicloud_Cost_Analysis.png
    media_type: image
  - caption: Federator.ai est capable d'analyser et de prévoir l'évolution des coûts
      pour chaque espace de nommage.
    image_url: images/Federator_ai_Cost_Allocation.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: ProphetStor Federator.ai
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Présentation

[ProphetStor Federator.ai][1] est une solution basée sur l'IA conçue pour améliorer la gestion des ressources de calcul dans les clusters Kubernetes et de machines virtuelles (VM). Grâce à une observabilité holistique des opérations IT, notamment l'entraînement multi-tenant de modèles LLM, les ressources destinées aux applications critiques, aux espaces de nommage, aux nœuds et aux clusters peuvent être allouées efficacement, et les indicateurs de performance peuvent être atteints avec un minimum de gaspillage de ressources.

* Prédiction de charge de travail basée sur l'IA pour les applications conteneurisées dans les clusters Kubernetes, ainsi que les VM dans VMware, Amazon Web Services (AWS) Elastic Compute Cloud (EC2), Azure Virtual Machine et Google Compute Engine
* Recommandations intelligentes de ressources issues des prédictions de charge de travail, produites par des moteurs d'IA à partir des métriques opérationnelles
* Un provisionnement automatique du CPU et de la mémoire pour les contrôleurs et espaces de nommage génériques des applications Kubernetes
* Un autoscaling des conteneurs d'application Kubernetes, des groupes de consommateurs Kafka et des services en amont NGINX Ingress
* Analyse des coûts MultiCloud optimale et recommandations basées sur les prédictions de charge de travail pour les clusters Kubernetes et les clusters de VM
* Un système de calcul des coûts réels et des réductions de coûts potentielles reposant sur les recommandations de clusters, d'applications Kubernetes, de VM et d'espaces de nommage Kubernetes
* Observabilité de l'entraînement LLM multi-tenants et optimisations de ressources exploitables sans compromettre les performances

[ProphetStor Federator.ai][1] fournit une observabilité full-stack via ses API intégrées aux Agents Datadog, depuis les charges applicatives, y compris l'entraînement LLM, jusqu'à la consommation de ressources au niveau du cluster. Cette intégration favorise une boucle dynamique entre supervision en temps réel et analytique prédictive, améliorant en continu la gestion des ressources, optimisant les coûts et garantissant un fonctionnement efficace des applications. Avec une licence ProphetStor Federator.ai, vous pouvez appliquer une solution basée sur l'IA pour suivre et prédire l'utilisation des ressources des conteneurs Kubernetes, des espaces de nommage et des nœuds de cluster, afin de formuler des recommandations permettant d'éviter à la fois la surprovisionnement coûteux et le sous-provisionnement néfaste pour les performances. En s'appuyant sur les prédictions de charge applicative, Federator.ai adapte automatiquement l'échelle des conteneurs au bon moment et optimise les performances avec le bon nombre de réplicas grâce à HPA Kubernetes ou au [Watermark Pod Autoscaling (WPA)][3] de Datadog.

Outre cette licence Federator.ai, Datadog propose également une [intégration officielle][9] comprenant des dashboards prêts à l'emploi et des monitors recommandés. Pour en savoir plus sur Federator.ai, consultez la [vidéo de démonstration de ProphetStor Federator.ai][2].

## Agent

Pour obtenir de l'aide ou communiquer une demande, contactez l'[assistance ProphetStor](mailto:support@prophetstor.com).


[1]: https://prophetstor.com/federator_ai/
[2]: https://youtu.be/AeSH8yGGA3Q
[3]: https://github.com/DataDog/watermarkpodautoscaler
[4]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20Installation%20Guide.pdf
[5]: images/add_cluster_window.png
[6]: https://www.datadoghq.com/
[7]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[8]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20User%20Guide.pdf
[9]: https://app.datadoghq.com/integrations/federatorai

---
Cette application est disponible via le Marketplace de Datadog et est prise en charge par un partenaire technologique de Datadog. Pour l'utiliser, <a href="https://app.datadoghq.com/marketplace/app/prophetstor-federatorai-license" target="_blank">achetez cette application dans le Marketplace</a>.