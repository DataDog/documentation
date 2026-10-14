---
algolia:
  tags:
  - software catalog
  - catalog
aliases:
- /fr/tracing/faq/software_catalog/
- /fr/tracing/services/services_list/
- /fr/tracing/visualization/services_list/
- /fr/tracing/software_catalog/
- /fr/tracing/faq/service_catalog/
- /fr/tracing/service_catalog/
- /fr/service_catalog/
- /fr/software_catalog/
- /fr/internal_developer_portal/software_catalog/
description: Catalog fournit une vue centralisée et dynamique de votre écosystème
  logiciel et de vos ressources d'infrastructure, en intégrant des outils d'observabilité,
  de sécurité et de gestion des coûts.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: Blog
  text: Transformez les retours en actions au sein de votre organisation d'ingénierie
    avec Datadog Forms
- link: /internal_developer_portal/use_cases
  tag: Documentation
  text: En savoir plus sur les cas d'utilisation de Catalog
- link: https://learn.datadoghq.com/courses/managing-software-catalog
  tag: Centre d'apprentissage
  text: Gestion des services avec Catalog
title: Catalog
---
## Vue d'ensemble
 {#overview}

[Catalog][1] fournit une vue centralisée et dynamique de votre écosystème logiciel et de vos ressources d'infrastructure, vous offrant un point d'entrée unique pour comprendre chaque couche de votre pile. Basé sur la télémétrie en temps réel et la collecte automatisée de métadonnées, Catalog s'intègre aux outils d'observabilité, de sécurité et de gestion des coûts. Cela permet aux équipes d'ingénierie, SRE, de sécurité et de plateforme de maintenir la visibilité, d'optimiser les opérations et de promouvoir la fiabilité des services à grande échelle.

{{< img src="tracing/internal_developer_portal/catalog/tour.mp4" video=true alt="Navigation dans le Catalog IDP" style="width:100%;" >}}

## Ce que vous pouvez faire dans Catalog 
 {#what-you-can-do-in-catalog}

Catalog propose plusieurs vues pour vous aider à explorer et à gérer vos entités. Pour trouver rapidement ce dont vous avez le plus besoin, épinglez les vues fréquemment consultées à l'aide des Saved Views.

- [**Ownership**][8] : Accédez aux informations Slack, au dépôt ou aux informations d'astreinte de votre équipe.
- **Reliability** : Gérez les risques en faisant apparaître les entités ayant fait l'objet de déploiements récents, d'une augmentation des taux d'erreur, d'incidents ouverts ou de monitors en échec.
- **Performance** : Comparez la latence, le trafic, le taux d'erreur et l'Apdex par environnement.
- **Security** : Trouvez les bibliothèques vulnérables et les attaques en direct à partir d'une liste unique pour renforcer votre posture de sécurité.
- **Costs** : Suivez les coûts AWS liés aux changements de code et d'infrastructure pour contrôler les dépenses cloud.
- **Software Delivery** : Surveillez l'état des pipelines CI, les violations d'analyse statique et les métriques DORA pour raccourcir les cycles de livraison.
- **Relationships** : Visualisez le graphe de dépendances des services et survolez n'importe quelle carte de service pour voir les ressources d'infrastructure sur lesquelles il s'exécute.
- **Infrastructure** : Parcourez vos ressources d'infrastructure cloud dans une section dédiée du Catalog. Les ressources d'infrastructure sont liées aux entités logicielles qui s'exécutent sur celles-ci. Vous pouvez cliquer sur n'importe quel service dans le graphe de dépendances pour accéder directement à l'infrastructure sur laquelle il s'exécute.

Consultez la [documentation sur les cas d'utilisation][4] pour découvrir comment les équipes utilisent le Catalog Datadog pour centraliser les connaissances, rationaliser les processus, améliorer l'efficacité opérationnelle, et plus encore.

## Ce qui apparaît dans le Catalog
 {#what-appears-in-catalog}

Le Catalog inclut une entité lorsque :
- Datadog [la détecte à partir de la télémétrie][5],
- Vous [la déclarez dans une définition d'entité][6], ou
- Vous [l'importez depuis une source tierce][7] telle que Backstage ou ServiceNow.

Vous pouvez afficher les ressources d'infrastructure lorsque vous [activez la collecte de ressources][9]. La collecte de ressources est gratuite pour tout client Infrastructure Monitoring.

[En savoir plus][3] sur les types d'entités et sur la façon de les configurer selon vos besoins.

**Notes**: 
- Utilisez le type d'entité pour un filtrage plus précis que le filtre `type` hérité (issu de l'attribut `span.type`). Par exemple, utilisez la facette `datastore type` pour filtrer par technologie de magasin de données spécifique.
- Les résumés de spans ainsi que les statistiques de service et de ressource sont conservés jusqu'à 30 jours. Pour une analyse plus approfondie des métriques de trace APM, utilisez Metric Explorer. [En savoir plus sur la rétention des données pour l'APM][2].

{{< site-region region="gov,gov2" >}}
### Service types
 {#service-types}

Chaque service surveillé est associé à un type. Datadog détermine automatiquement le type en fonction de l'attribut `span.type` associé aux données de spans entrantes. Le type spécifie le nom de l'application ou du framework avec lequel le Datadog Agent s'intègre.

Par exemple, si vous utilisez l'intégration Flask officielle, le `Type` est défini sur « Web ». Si vous surveillez une application personnalisée, le `Type` apparaît comme « Custom ».

Le type de service peut être l'un des suivants :

*  Cache
*  Custom
*  DB
*  Serverless function
*  Web

Certaines intégrations utilisent des alias pour certains types. Par exemple, Postgres, MySQL et Cassandra sont associés au type « DB ». Les intégrations Redis et Memcache sont associées au type « Cache ».

{{< /site-region >}}

## Query Catalog data in dashboards
 {#query-catalog-data-in-dashboards}

Utilisez la source de données **Developer Portal** pour intégrer directement les données du Catalog dans les [Dashboards][10]. Vous pouvez interroger des entités à travers les services, les files d'attente, les applications frontend, les API et les systèmes, et les regrouper ou les filtrer par métadonnées telles que l'ownership, le niveau, le cycle de vie et la version de définition. 


Pour utiliser la source de données, ajoutez un widget à votre dashboard, sélectionnez **Developer Portal** comme source de données et choisissez un type d'entité à interroger. Les types de widgets Query Value, Top List, Table, Treemap, Pie et Bar sont pris en charge. 

{{< img src="tracing/internal_developer_portal/catalog/catalog_datasource.png" alt="Interrogation des données du Catalog dans les Dashboards" style="width:100%;" >}}

## Pour aller plus loin
 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services

[2]: /fr/data_security/data_retention_periods/

[3]: /fr/internal_developer_portal/catalog/entity_model/native_entities/

[4]: /fr/internal_developer_portal/use_cases

[5]: /fr/internal_developer_portal/catalog/set_up/discover_entities

[6]: /fr/internal_developer_portal/catalog/set_up/create_entities

[7]: /fr/internal_developer_portal/catalog/set_up/import_entities

[8]: /fr/internal_developer_portal/catalog/set_up/ownership

[9]: /fr/infrastructure/

[10]: /fr/dashboards/