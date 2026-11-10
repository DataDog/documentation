---
aliases:
- /fr/software_catalog/set_up
- /fr/tracing/software_catalog/guides/validating-service-definition
- /fr/software_catalog/guides/validating-service-definition
- /fr/tracing/service_catalog/guides/validating-service-definition
- /fr/service_catalog/guides/validating-service-definition
- /fr/service_catalog/use_cases/validating_service_definition
- /fr/software_catalog/use_cases/validating_service_definition
- /fr/software_catalog/customize/
- /fr/software_catalog/manage_entries/
- /fr/software_catalog/enrich_default_catalog/
- /fr/service_catalog/manage_entries/
- /fr/service_catalog/enrich_default_catalog/
- /fr/service_catalog/customize/
- /fr/software_catalog/best-practices
- /fr/software_catalog/guides/best-practices
- /fr/service_catalog/guides/best-practices
- /fr/service_catalog/use_cases/best_practices
- /fr/software_catalog/use_cases/best_practices
- /fr/software_catalog/navigating
- /fr/tracing/software_catalog/browsing
- /fr/software_catalog/browsing
- /fr/tracing/service_catalog/browsing
- /fr/service_catalog/browsing
- /fr/service_catalog/navigating
- /fr/software_catalog/manage
- /fr/tracing/software_catalog/investigating
- /fr/software_catalog/investigating/
- /fr/tracing/software_catalog/guides/understanding-service-configuration
- /fr/software_catalog/guides/understanding-service-configuration/
- /fr/tracing/service_catalog/investigating
- /fr/service_catalog/investigating/
- /fr/tracing/service_catalog/guides/understanding-service-configuration
- /fr/service_catalog/guides/understanding-service-configuration/
- /fr/api_catalog/add_metadata
- /fr/api_catalog/owners_and_tags
- /fr/service_catalog/manage
- /fr/internal_developer_portal/software_catalog/set_up
description: Remplissez le catalogue en découvrant des entités à partir de la télémétrie
  Datadog, en créant des définitions d'entités manuellement ou en les important depuis
  des sources tierces comme Backstage et ServiceNow.
further_reading:
- link: https://www.datadoghq.com/blog/manage-service-catalog-categories-with-service-definition-json-schema/
  tag: Blog
  text: Gérez les entrées du Service Catalog avec le schéma JSON de définition de
    services.
- link: https://www.datadoghq.com/blog/service-catalog-setup/
  tag: Blog
  text: Ajoutez facilement des tags et des métadonnées à vos services en utilisant
    la configuration simplifiée du Service Catalog.
- link: https://www.datadoghq.com/blog/github-actions-service-catalog/
  tag: Blog
  text: J'utilise GitHub Actions pour le Datadog Service Catalog, et vous devriez
    aussi.
- link: https://www.datadoghq.com/blog/service-ownership-best-practices-datadog/
  tag: Blog
  text: Meilleures pratiques pour sʼapproprier un service de bout en bout grâce au
    Datadog Service Catalog
- link: https://learn.datadoghq.com/courses/managing-software-catalog
  tag: Centre d'apprentissage
  text: Gérer les services avec le catalogue
title: Configurer le Catalogue
---
## Présentation {#overview}

Les entités du catalogue sont définies à l'aide de [définitions d'entités][1], qui sont des fichiers de configuration au format YAML de style Kubernetes. 

Pour peupler le catalogue, vous pouvez :
- Mettez en place Datadog Application Performance Monitoring (APM), Universal Service Monitoring (USM), Real User Monitoring (RUM), les métriques d'infrastructure ou les logs, qui alimentent automatiquement le catalogue en données d'entités.
- Créez des définitions d'entités manuellement ou automatiquement. 
- Importez des définitions d'entités existantes à partir de sources tierces. 

## Découvrez automatiquement des entités depuis Datadog {#automatically-discover-entities-from-datadog}

Par défaut, le catalogue est automatiquement peuplé avec des entrées découvertes à partir d'APM, d'USM et de RUM. Vous pouvez également importer manuellement des entrées depuis d'autres télémétries Datadog, comme les logs. 

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum" >}}Découvrir à partir d'APM, d'USM et de RUM{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/discover_entities#import-entities-from-infrastructure-and-logs" >}}Importer à partir de l'infrastructure et des logs{{< /nextlink >}}
{{< /whatsnext >}}

### APM {#apm}

Lorsque vous instrumentez votre code d'application avec des SDK Datadog ou OpenTelemetry, vos applications émettent des traces et génèrent des métriques de trace non échantillonnées. Ces traces et métriques alimentent les capacités de découverte d'entités et de cartographie des dépendances dans l'IDP. Vos choix en matière d'instrumentation (par exemple, votre version du Datadog Agent, votre version du SDK et l'utilisation d'une instrumentation personnalisée ou de remplacements de service) affectent la qualité et la précision de vos cartes de dépendances. Consultez [Découverte à partir d'APM, d'USM et de RUM][5] pour en savoir plus.

### USM {#usm}

USM détecte les métriques Golden Signal (par exemple, les requêtes, les erreurs et les durées) et cartographie les dépendances des applications en se basant sur eBPF. Il ne nécessite pas d'instrumentation de votre code d'application.

### RUM {#rum}

RUM fournit des données sur l'expérience utilisateur frontend, notamment les performances des pages, les erreurs, les événements de session et les vues. Si vous avez des applications RUM, elles apparaissent dans le catalogue sous **Frontend Apps** dans le sélecteur de composants. 

### Autres télémétries Datadog {#other-datadog-telemetries}

Vous pouvez également importer des entités identifiées à partir de télémétries Datadog telles que les logs, les métriques de host, les métriques de conteneur, les métriques réseau et les métriques de processus. 

Lorsque vous utilisez [**Importer des entités**][10] et choisissez une source de données, Datadog interroge cette source et recherche des tags `DD_SERVICE` valides. Les entités sont marquées avec l'attribut `kind:service`.

**Remarque** : Vous ne devez le faire que si les tags `DD_SERVICE` sont bien tenus à jour et ne contiennent pas de valeurs de tag non pertinentes ou incorrectes.

## Créer des entités {#create-entities}

Les [définitions d'entité][1], définies dans des fichiers YAML d'entité, constituent la source de vérité canonique dans le Catalogue. Vous pouvez effectuer les opérations suivantes : 
- Créez des définitions d'entité manuellement via Datadog.
- Stockez les définitions dans des dépôts GitHub ou GitLab, et configurez [Source Code Integration][6] pour synchroniser les définitions avec l'IDP. Les modifications apportées à vos fichiers sont répercutées dans Datadog en quelques minutes.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/create_entities#through-the-datadog-ui" >}}Créer via l'interface utilisateur Datadog{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/create_entities#through-automation" >}}Créer via l'automatisation du code{{< /nextlink >}}
{{< /whatsnext >}}

**Remarque** : Pour corréler automatiquement une entité à sa télémétrie, le champ `name` dans votre définition doit correspondre exactement à l'identifiant principal issu des données de télémétrie. Pour la plupart des services, il s'agit du tag `service` tel que défini dans Unified Service Tagging de Datadog. Voir les exemples pour [`kind:datastore`][7], [`kind:queue`][8] et d'autres [`entity types`][9].

## Importer des entités {#import-entities}

Si vous gérez des inventaires de logiciels dans Backstage ou dans la CMDB ServiceNow, vous pouvez synchroniser ces inventaires dans le Catalogue de Datadog.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/import_entities#entities-from-backstage" >}}Importer depuis Backstage{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/catalog/set_up/import_entities#import-from-servicenow" >}}Importer depuis ServiceNow{{< /nextlink >}}
{{< /whatsnext >}}

### Backstage {#backstage}

Vous pouvez intégrer vos entités Backstage dans l'IDP de Datadog de deux manières :
1. Installez le [plugin Backstage de Datadog][11]. 
1. Importez des fichiers de descripteur d'entité depuis Backstage vers l'IDP en utilisant la Datadog API, Terraform ou l'intégration GitHub de Datadog. 

### ServiceNow {#servicenow}

Synchronisez vos inventaires CMDB ServiceNow avec le Catalogue Datadog en configurant une requête régulière sur vos tables CI ServiceNow.

## Définir la propriété des entités {#define-entity-ownership}

Associez des entités à des équipes pour permettre un filtrage par équipe dans les produits Datadog, acheminer les notifications aux bons propriétaires et favoriser la responsabilisation via Scorecards et Campaigns. Pour plus de détails, consultez [Définissez la propriété des entités de Catalog][12].

## Vérifier l'exhaustivité de la configuration {#verify-configuration-completeness}

Suivre les meilleures pratiques de monitoring telles que le tracing, la journalisation et le profilage du code vous aide à garantir que vous disposez de toutes les données nécessaires lors du triage des incidents. Le catalogue fournit des checks automatiques pour ces configurations recommandées. 

Pour afficher l'exhaustivité de la configuration d'une entité, cliquez sur l'entité dans le [Catalog][2], puis recherchez l'onglet **Setup Guidance** :

{{< img src="tracing/software_catalog/software-catalog-setup-guidance.png" alt="Catalog avec l'onglet Setup Guidance mis en évidence." >}}

Le tableau Setup Guidance ne reflète pas nécessairement la facturation des produits individuels, mais plutôt l'activité de l'entité que vous examinez actuellement. Par exemple, si le service n'émet pas de métriques d'infrastructure pendant une longue période, `Infrastructure Monitoring` pourrait avoir `Not Detected` spécifié, même si vous avez des hosts ou des conteneurs exécutant le monitoring d'infrastructure. 

## Configurer l'accès et les autorisations basés sur les rôles {#configure-role-based-access-and-permissions}

Pour des informations générales, consultez [Contrôle d'accès basé sur les rôles][3] et [Autorisations des rôles][4].

### Autorisation de lecture {#read-permission}

L'autorisation de lecture du catalogue permet à un utilisateur de lire les données du catalogue, ce qui active les fonctionnalités suivantes :
- Liste Catalog
- UI Discover
- Endpoint de définition du service : `/api/v2/services/definition/<service_name>`

L'autorisation est activée par défaut dans le **Datadog Read Only Role** et le **Datadog Standard Role**.

### Write permission {#write-permission}

L'autorisation d'écriture du catalogue permet à un utilisateur de modifier les données du catalogue. L'autorisation d'écriture est requise pour les fonctionnalités suivantes :
- Insérer ou mettre à jour une définition de service avec l'endpoint `POST /api/v2/services/definitions`
- Supprimer une définition de service avec l'endpoint `DELETE /api/v2/services/definition/<service_name>`
- Terminer le processus dʼintégration dans l'IU Discover Services
- Mettre à jour des métadonnées de service dans l'IU

L'autorisation est activée par défaut dans le **Datadog Admin Role** et le **Datadog Standard Role**.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/internal_developer_portal/catalog/entity_model
[2]: https://app.datadoghq.com/software
[3]: /fr/account_management/rbac
[4]: /fr/account_management/rbac/permissions
[5]: /fr/internal_developer_portal/catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum
[6]: /fr/integrations/guide/source-code-integration/
[7]: /fr/internal_developer_portal/catalog/entity_model/native_entities/?tab=datastore#datastore-peer-tags
[8]: /fr/internal_developer_portal/catalog/entity_model/native_entities/?tab=queue#datastore-peer-tags
[9]: /fr/internal_developer_portal/catalog/entity_model?tab=v30
[10]: https://app.datadoghq.com/software/settings/get-started
[11]: https://www.npmjs.com/package/@datadog/backstage-plugin-datadog-entity-sync-backend
[12]: /fr/internal_developer_portal/catalog/set_up/ownership