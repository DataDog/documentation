---
algolia:
  tags:
  - service catalog
aliases:
- /fr/tracing/service_catalog/investigating
further_reading:
- link: /tracing/service_catalog/service_definition_api/
  tag: Documentation
  text: Enregistrer des services grâce à l'API de définition de service
- link: /tracing/service_catalog/guides/understanding-service-configuration
  tag: Guide
  text: Comprendre la configuration de votre service
- link: /tracing/service_catalog/guides/upstream-downstream-dependencies
  tag: Guide
  text: Visualiser les dépendances en amont et en aval pendant un incident actif
- link: https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/
  tag: Blog
  text: Gérer les entrées du catalogue des services avec le schéma JSON de définition
    de service
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Gagner en visibilité sur les risques, vulnérabilités et attaques avec la vue
    Security APM
- link: https://www.datadoghq.com/blog/service-catalog-setup/
  tag: Blog
  text: Ajouter facilement des tags et des métadonnées à vos services à l'aide de
    la configuration simplifiée du catalogue des services
- link: https://www.datadoghq.com/blog/github-actions-service-catalog/
  tag: Blog
  text: Pourquoi les actions GitHub sont indispensables pour le catalogue des services
    Datadog
kind: documentation
title: Enquêter sur un service
---

Lorsque vous cliquez sur un service, un volet latéral comportant deux principales sections s'affiche :

## Détails du service pour chaque vue :

- **Informations sur la propriété** de la définition du service, telles que des liens vers les contacts de l'équipe, le code source et d'autres informations comme la documentation et les dashboards
- **Informations sur la fiabilité**, y compris le statut du déploiement, les SLO, les incidents en cours et les informations sur les erreurs.
- **Graphiques sur les performances** présentant les requêtes, les erreurs, la latence et le temps passé par les services en aval.
- **Informations sur la sécurité**, y compris les vulnérabilités connues détectées dans les bibliothèques du service, la chronologie et le type des attaques, l'identité des auteurs, ainsi que les menaces de sécurité affectant vos services.
- **Informations sur les coûts**, notamment les dépenses cloud d'un service, réparties par types de ressources.
- **Informations de préproduction** relatives au processus de distribution de votre logiciel, comme la durée moyenne de conception et le taux de réussite des pipelines de CI liés à votre service, ainsi que les résultats d'analyse statique des pipelines de CI.

## Détails de la configuration
- **Statut de l'avancement de la configuration** pour les solutions Datadog qui peuvent recueillir des données pour le service.
- **Bibliothèques externes utilisées**, avec possibilité de télécharger la nomenclature.
  {{< img src="tracing/service_catalog/libraries_sbom.png" alt="Service individuel issu du catalogue des services, avec l'onglet des bibliothèques mis en évidence, ainsi que l'option de téléchargement des nomenclatures SBOM" style="width:100%;" >}}
- **Définition de service** dans YAML avec un lien vers le code source du service.
- Une service map interactive affichant les services en amont et en aval de ce service.
- **Dashboards définis et associés**, avec la liste des dashboards prédéfinis et recommandés par Watchdog, le cas échéant.
- **Scorecards du service**, avec un snapshot des scores du service et le timestamp de la dernière évaluation. 
- **Bêta : configuration des bibliothèques actives** pour les services Java et .NET. Avec la dernière version de l'Agent et la fonctionnalité de [configuration à distance][1] activée sur celui-ci, vous pouvez ajuster le [taux d'échantillonnage des traces][3] (entre 0.0 et 1.0), activer l'[injection de logs][2] pour mettre en corrélation les données des traces et des logs, et définir l'application de tags d'en-tête HTTP à toutes les traces envoyées à Datadog à partir de ce service. Dans l'onglet « Setup Guidance », en regard de **Active Library Configuration**, cliquez sur **Edit** pour modifier ces paramètres et les appliquer directement sans avoir à redémarrer le service.

  {{< img src="tracing/service_catalog/service_details_remote_config.png" alt="Options de configuration du service dans l'IU de Datadog" style="width:80%;" >}}

Cliquez sur **View Related** et sélectionnez une page dans le menu déroulant pour accéder aux pages associées dans Datadog, telles que la page Service APM et la service map pour ce service, ou les pages des données de télémétrie associées, telles que Distributed Tracing, Infrastructure, Network Performances, Log Management, RUM et Continuous Profiler.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/remote_config/
[2]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[3]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling