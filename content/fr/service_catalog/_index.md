---
algolia:
  tags:
  - service catalog
aliases:
- /fr/tracing/faq/service_catalog/
- /fr/tracing/services/services_list/
- /fr/tracing/visualization/services_list/
- /fr/tracing/service_catalog/
further_reading:
- link: /tracing/service_catalog/service_definition_api/
  tag: Documentation
  text: Enregistrer des services grâce à l'API de définition de service
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: Site externe
  text: Créer et gérer des définitions de service avec Terraform
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
- link: https://www.datadoghq.com/blog/shift-left-datadog-service-catalog/
  tag: Blog
  text: Améliorez votre observabilité en amont avec le catalogue de services de Datadog
- link: https://www.datadoghq.com/blog/service-ownership-best-practices-datadog/
  tag: Blog
  text: Meilleures pratiques pour sʼapproprier un service de bout en bout grâce au
    catalogue de services de Datadog
kind: documentation
title: Catalogue des services Datadog
---

{{< img src="tracing/service_catalog/service_catalog_updated.mp4" video=true alt="Parcourir le catalogue des services" style="width:100%;" >}}

## Présentation

Le [catalogue des services de Datadog][1] fournit une vue consolidée de vos services, en associant métadonnées des propriétés, statistiques sur les performances, analyses de la sécurité, attributions des coûts et plus encore. Il permet aux entreprises de s'approprier leur service de bout en bout et à grande échelle, d'obtenir des informations sur les performances en temps réel, de détecter et de traiter les risques de fiabilité et de sécurité, et de gérer les dépendances des applications, le tout depuis un seul endroit. 

### Cas d'utilisation

#### Détection de service
- Le catalogue des services de Datadog inclut par défaut tous les services détectés sur lʼAPM, USM et RUM. Si vous utilisez l'un de ces produits, votre catalogue comportera déjà des entrées.
- Au fur et à mesure que vous instrumentez de nouvelles applications dans vos environnements, elles sont automatiquement ajoutées au catalogue des services.

#### Mappage et gestion des dépendances
- Documenter et suivre automatiquement toutes vos dépendances en amont et en aval grâce aux télémétries de lʼapplication collectées par lʼAPM, USM et RUM.
- Déclarer manuellement les relations de dépendance entre les composants (disponible via [le schéma de métadonnées v3.0][8]).
- Comprendre et évaluer l'impact des performances sur les équipes et les services.

#### Gouvernance et optimisation
- Proposer aux managers de lʼéquipe l'ingénierie une présentation globale des meilleures pratiques au sein des équipes et des services par le biais de [scorecards de service][9].
- Réduire les risques liés aux applications en trouvant et en corrigeant les failles de sécurité connues dans les dépendances de vos services.
- Comprendre les tendances et identifier ce qui ne fonctionne pas au niveau des coûts liés à vos services.

#### Partage des connaissances 
- Trouver des informations sans avoir parcourir un grand nombre de référentiels, de canaux ou de pages de documentation.
- Gagner du temps en recherchant des runbooks ou des pages de wiki lorsque de nouveaux membres rejoignent votre équipe.
- Exploiter les cartes topologiques générées automatiquement et en temps réel pour comprendre l'architecture du système.

#### Évaluer la couverture de la surveillance  
- Détecter les services qui ne transmettent pas de données d'observabilité ou ne font pas surveiller ces données.
- Faciliter la [pratique dʼun bon tagging][6] et vérifier les configurations recommandées afin d'optimiser [la mise en corrélation des données de télémétrie][7].
- Détecter les problèmes tels que les SLO manquants, les monitors ou les services sans propriété.

#### Simplifier les collaborations lors de la gestion dʼincidents
- Gagner en flexibilité en établissant des informations sur la propriété et en créant des canaux de communication appropriés, ainsi qu'en facilitant l'accès aux informations sur la surveillance et le dépannage.
- Intégrer des liens vers des solutions et des outils de dépannage (comme les runbooks et la documentation) directement dans les outils d'observabilité déjà utilisés par les ingénieurs.
- Accélérer la reprise après incident en renforçant la confiance et en simplifiant la localisation des propriétaires des services et dépendances en amont et en aval.


## Prise en main

{{< whatsnext desc="Explore what Service Catalog has to offer:" >}}
    {{< nextlink href="/service_catalog/navigating/" >}}Accéder au catalogue des services{{< /nextlink >}}
    {{< nextlink href="/service_catalog/investigating" >}}Enquêter sur un service{{< /nextlink >}}
{{< /whatsnext >}}

## Accès et autorisations à base de rôles

Pour obtenir des informations dʼordre général, consultez les sections [Contrôle d'accès à base de rôles (RBAC)][2] et [Autorisations des rôles Datadog][3].
### Autorisations de lecture

Tout utilisateur bénéficiant de l'autorisation de lecture du catalogue des services peut lire les données associées, ce qui permet dʼutiliser les fonctionnalités suivantes :
- Liste du catalogue des services
- UI Discover
- Endpoint de définition de service : `/api/v2/services/definition/<service_name>`@

Cette autorisation est activée par défaut pour le **rôle Read Only** et **Standard** de Datadog.

### Autorisation dʼécriture

Tout utilisateur bénéficiant de l'autorisation dʼécriture du catalogue des services peut modifier les données associées. Lʼautorisation dʼécriture est requise pour les fonctionnalités suivantes :
- Insérer ou mettre à jour une définition de service avec lʼendpoint `POST /api/v2/services/definitions` 
- Supprimer une définition de service avec lʼendpoint `DELETE /api/v2/services/definition/<service_name>` 
- Terminer le processus dʼintégration dans l'IU Discover Services
- Mettre à jour des métadonnées de service dans l'IU

Cette autorisation est activée par défaut pour le **rôle Admin** et **Standard** de Datadog.

## Types de services

Chaque service surveillé est associé à un type. Datadog détermine automatiquement ce type en fonction de l'attribut `span.type` issu des données des spans entrantes. Le type indique le nom de l'application ou du framework à laquelle/auquel l'Agent Datadog est intégré.

Par exemple, si vous utilisez l'intégration Flask officielle, le `Type` est défini sur « Web ». Si vous surveillez une application personnalisée, le `Type` s'affiche en tant que « Custom ».

Les services peuvent appartenir aux types suivants :

*  Cache
*  Personnalisées
*  BDD
*  Fonction sans serveur
*  Web

Certaines intégrations sont associées à des types. Par exemple, les intégrations Postgres, MySQL et Cassandra sont mappées au type « DB », tandis que les intégrations Redis et Memcache sont mappés au type « Cache ».

## Conservation des données
Les statistiques sur les ressources et les services, ainsi que les synthèses des spans sur la **liste des services** et la **page des services** sont conservées pendant un maximum de 30 jours. Pour obtenir des requêtes personnalisées sur les métriques des traces APM, utilisez le Metric Explorer. [En savoir plus sur la conservation des données de lʼAPM][4].


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /fr/account_management/rbac/
[3]: /fr/account_management/rbac/permissions/
[4]: /fr/developers/guide/data-collection-resolution-retention/
[5]: /fr/tracing/service_catalog/adding_metadata#service-definition-schema-v22
[6]: https://www.datadoghq.com/blog/tagging-best-practices/#assign-owners-to-services-with-tags
[7]: /fr/tracing/other_telemetry/
[8]: /fr/service_catalog/add_metadata#metadata-schema-v30-beta
[9]: /fr/service_catalog/scorecards/