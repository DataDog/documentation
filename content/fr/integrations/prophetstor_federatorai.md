---
app_id: prophetstor-federatorai-license
app_uuid: 965e6142-3b99-4999-a7c6-09a00775e511
assets:
  integration:
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
    source_type_name: Federator.ai.license
author:
  homepage: https://www.prophetstor.com/
  name: ProphetStor
  sales_email: dd_subscription@prophetstor.com
  support_email: support@prophetstor.com
  vendor_id: prophetstor
categories:
- containers
- orchestration
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: prophetstor_federatorai
integration_id: prophetstor-federatorai-license
integration_title: ProphetStor Federator.ai
integration_version: ''
is_public: true
custom_kind: integration
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
  - Supported OS::Linux
  - Category::Containers
  - Category::Orchestration
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: Licence Federator.ai pour optimiser vos applications Kubernetes
  media:
  - caption: Le dashboard ProphetStor Federator.ai Cluster Overview affiche l'utilisation
      prévue des ressources et des recommandations pour les nœuds et clusters Kubernetes,
      ainsi que leur utilisation passée.
    image_url: assets/images/Federator_ai_Datadog_Cluster_Overview.png
    media_type: image
  - caption: Le dashboard ProphetStor Federator.ai Application Overview affiche l'utilisation
      prévue du processeur et de la mémoire ainsi que des recommandations pour chaque
      application.
    image_url: assets/images/Federator_ai_Datadog_Application_Overview.png
    media_type: image
  - caption: Le dashboard ProphetStor Federator.ai Kafka Overview affiche des données
      d'utilisation et des recommandations sur les réplicas de consommateurs Kafka.
    image_url: assets/images/Federator_ai_Datadog_Kafka_Overview.png
    media_type: image
  - caption: Le dashboard ProphetStor Federator.ai Cost Analysis Overview affiche
      le coût de déploiement d'un cluster Kubernetes, des recommandations concernant
      la configuration du cluster, ainsi qu'une estimation des coûts et économies
      associés au déploiement du cluster sur différents fournisseurs de cloud publics.
    image_url: assets/images/Federator_ai_Datadog_Cost_Analysis_Overview.png
    media_type: image
  - caption: Le dashboard Federator.ai affiche la charge prévue ainsi que des recommandations
      pour les ressources des clusters et applications Kubernetes ou VMware.
    image_url: assets/images/Federator_ai_Dashboard.png
    media_type: image
  - caption: Federator.ai offre des prédictions et des recommandations pour les ressources
      de vos clusters, nœuds, espaces de nommage, applications et contrôleurs
    image_url: assets/images/Federator_ai_Workload_Prediction.png
    media_type: image
  - caption: En fonction de la charge prévue d'un cluster, Federator.ai vous recommande
      la configuration la plus économique à utiliser pour chaque fournisseur de cloud
      public.
    image_url: assets/images/Federator_ai_Multicloud_Cost_Analysis.png
    media_type: image
  - caption: Federator.ai est capable d'analyser et de prévoir l'évolution des coûts
      pour chaque espace de nommage.
    image_url: assets/images/Federator_ai_Cost_Allocation.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: ProphetStor Federator.ai
  uninstallation: README.md#Uninstallation
---



## Présentation

[Federator.ai de ProphetStor][1] est une solution basée sur l'IA qui permet aux entreprises de gérer, optimiser et redimensionner automatiquement les ressources de toutes les applications sur Kubernetes. En utilisant des algorithmes d'apprentissage automatique avancés pour prévoir la charge de travail des applications, Federator.ai déploie la bonne quantité de ressources au bon moment pour optimiser les performances des applications.

* Un système de prédiction de la charge de travail basé sur l'IA pour les applications conteneurisées dans les clusters Kubernetes et les machines virtuelles dans les clusters VMware 
* Des recommandations de ressources basées sur des métriques relatives à la prédiction des charges, aux applications ou encore à Kubernetes
* Un autoscaling des conteneurs d'application
* Des analyses de coûts pour des environnements avec plusieurs clouds, ainsi que des recommandations reposant sur les prédictions de charge pour les clusters Kubernetes et clusters de VM
* Un système de calcul des coûts réels et des réductions de coûts potentielles reposant sur les recommandations de clusters, d'applications Kubernetes, de VM et d'espaces de nommage Kubernetes

Avec une licence ProphetStor Federator.ai, vous bénéficiez d'une solution basée sur l'IA pour surveiller et prédire l'utilisation des ressources de vos conteneurs Kubernetes, espaces de nommage et nœuds de cluster. Vous pouvez ainsi formuler des recommandations pertinentes afin d'éviter tout coût supplémentaire lié à un surprovisionnement ou tout problème de performance lié à un sous-provisionnement. À l'aide de ses prédictions de charge pour les applications, Federator.ai effectue au moment opportun l'autoscaling des conteneurs d'application. Cette solution optimise également vos performances en utilisant le nombre optimal de réplicas de conteneurs, par l'intermédiaire de l'Autoscaler de pods horizontaux de Kubernetes ou de la solution [Watermark Pod Autoscaling (WPA) de Datadog][3].

Outre cette licence Federator.ai, Datadog propose également une [intégration officielle][9] comprenant des dashboards prêts à l'emploi et des monitors recommandés. Pour en savoir plus sur Federator.ai, consultez la [vidéo de démonstration de ProphetStor Federator.ai][2].

## Assistance

Pour obtenir de l'aide ou communiquer une demande, contactez l'[assistance ProphetStor](mailto:support@prophetstor.com).


[1]: https://prophetstor.com/federator_ai/
[2]: https://youtu.be/AeSH8yGGA3Q
[3]: https://github.com/DataDog/watermarkpodautoscaler
[4]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20Installation%20Guide.pdf
[5]: images/add_cluster_window.png
[6]: https://www.datadoghq.com/
[7]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[8]: https://prophetstor.com/wp-content/uploads/documentation/Federator.ai/Latest%20Version/ProphetStor%20Federator.ai%20User%20Guide.pdf
[9]: /fr/integrations/federatorai

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/prophetstor-federatorai-license" target="_blank">Cliquez ici</a> pour l'acheter.