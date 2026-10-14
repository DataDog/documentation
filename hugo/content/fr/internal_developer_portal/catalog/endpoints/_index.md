---
aliases:
- /fr/tracing/api_catalog/get_started
- /fr/tracing/api_catalog/
- /fr/api_catalog/
- /fr/api_catalog/endpoint_discovery/
- /fr/software_catalog/endpoints/discover_endpoints
- /fr/service_catalog/endpoints/discover_endpoints
- /fr/service_catalog/endpoints/
- /fr/software_catalog/endpoints
- /fr/internal_developer_portal/software_catalog/endpoints
description: Surveillez et gérez les endpoints d'API HTTP avec des métriques de performance,
  le suivi de la propriété, les alertes et la couverture des tests depuis une vue
  unique.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: Blog
  text: Gérez les performances, la sécurité et la propriété des API avec Datadog API
    Catalog
- link: /internal_developer_portal/catalog/
  tag: Documentation
  text: Catalogue d'API Datadog
- link: /synthetics/api_tests/http_tests/
  tag: Documentation
  text: Tests API Synthetic
- link: /security/application_security/how-it-works/#api-security
  tag: Documentation
  text: Sécurité des API AAP
- link: https://www.datadoghq.com/blog/primary-risks-to-api-security/
  tag: Blog
  text: Atténuez les principaux risques liés à la sécurité des API
title: Observabilité des endpoints
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
 L'observabilité des endpoints n'est pas prise en charge pour votre <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

{{< img src="tracing/software_catalog/endpoints-list.png" alt="Liste des endpoints dans le catalogue, affichant les informations relatives aux performances pour chaque endpoint." style="width:100%;" >}}

## Présentation {#overview}

La [liste des endpoints][12] du catalogue consolide tout ce que vous devez savoir sur vos endpoints d'API. Il offre une vue complète des performances, de la fiabilité et de la propriété de toutes vos API, qu'elles servent des équipes internes ou des utilisateurs externes. Cela vous aide, vous et vos équipes, à surveiller efficacement les fonctionnalités critiques pilotées par API et à garantir qu'elles répondent aux attentes en matière de performance.

## Cas d'utilisation {#use-cases}

La liste des endpoints combine des données issues de l'ensemble de Datadog afin de fournir des workflows préconçus. Vous pouvez effectuer les opérations suivantes :

- **Découvrez les API automatiquement** : Maintenez un inventaire complet de vos API publiques, privées et partenaires, organisé par endpoint.
- **Affichez les données corrélées** : Naviguez des endpoints vers les traces, les logs et les métriques provenant de différentes sources Datadog.
- **Identifiez les problèmes de performance** : Utilisez des métriques telles que *« Dernier relevé »*, *Requêtes*, *Latence* et *Erreurs* pour suivre l'état de santé de l'API.
- **Recevez des alertes** : Définissez des attentes de performance et des seuils qui déclenchent des alertes.
- **Attribuez des informations de propriété** : Attribuez aux endpoints les informations relatives à la propriété, notamment les équipes responsables, la personne d'astreinte et le canal de communication, afin de savoir qui contacter en cas d'erreur.
- **Assurez une couverture complète** : Suivez le statut des monitors d'API, des tests Synthetic et des signaux de sécurité, avec des liens directs vers des informations détaillées pour les investigations.

## Mise en route {#getting-started}

Vos endpoints sont automatiquement renseignés dans la liste des endpoints si vous utilisez [Datadog APM][8] pour surveiller les services HTTP.

### Explorer les endpoints {#exploring-endpoints}

Parcourez et interrogez les propriétés et les métriques liées à vos endpoints.

Lisez [Exploring Endpoints][11] pour plus d'informations.

### Surveiller les endpoints {#monitoring-endpoints}

Gérez et surveillez vos API et endpoints pour :

- Trouvez et corrigez les endpoints peu performants.
- Suivez leur fiabilité par rapport aux normes et aux objectifs :
- Surveillez les anomalies :
- Enquêtez sur les erreurs :
- Assurez la couverture des tests :
- Comblez les failles de sécurité :

Lisez [Monitoring Endpoints][7] pour plus d'informations.

### Attribuez des propriétaires aux endpoints {#assigning-owners-to-endpoints}

Ajoutez des informations de propriété aux endpoints pour rationaliser les enquêtes et la communication au sein de l'équipe.

Lisez [Assigning Owners][6] pour plus d'informations.

### Ajoutez des endpoints à la liste {#adding-endpoints-to-the-list}

Attribuez les endpoints détectés automatiquement à des groupes d'API pour suivre l'utilisation, définir la propriété et configurer les politiques de surveillance à partir d'un emplacement centralisé. Alternativement, téléchargez un fichier OpenAPI ou Swagger pour débloquer toutes les fonctionnalités de la liste des endpoints.

Lisez [Adding Entries][9] pour plus d'informations.

### Ajoutez des métadonnées aux API {#adding-metadata-to-apis}

Ajoutez des métadonnées aux API via l'interface utilisateur ou la Datadog API, ou utilisez des pipelines automatisés via l'intégration GitHub, l'intégration GitLab ou Terraform.

Lisez [Ajout de métadonnées aux API][10] pour plus d'informations.

## Terminologie clé {#key-terminology}

| Terme : | Définition : |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API : | Un ensemble de protocoles et d'outils qui permet à deux applications de communiquer.                                                                                                                                                      |
| Endpoint d'API : | L'adresse (URL) d'une ressource d'un serveur ou d'un service qui implémente les règles définies dans l'API, souvent via une interface HTTP ou RESTful. L'endpoint d'API traite les requêtes et fournit les réponses correspondantes. |
| API publiques : | Endpoints d'API destinés aux clients et accessibles depuis Internet.                                                                                                                                                          |
| API privées : | Également appelées *API internes*. Elles sont conçues exclusivement pour un usage interne au sein d'une organisation et sont principalement utilisées pour la communication entre services backend. Il s'agit du type d'API le plus courant.                                                   |
| API partenaires : | Également appelées *API tierces*. Il s'agit d'endpoints publics fournis par une autre organisation (par exemple, Stripe, Google ou Facebook) que votre organisation utilise pour fournir ses services.                                             |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[3]: /fr/api_catalog/explore_apis/
[6]: /fr/internal_developer_portal/catalog/set_up/
[7]: /fr/internal_developer_portal/catalog/endpoints/monitor_endpoints/
[8]: /fr/tracing/trace_collection/
[9]: /fr/internal_developer_portal/catalog/set_up/create_entities/
[10]: /fr/internal_developer_portal/catalog/entity_model/
[11]: /fr/internal_developer_portal/catalog/endpoints/explore_endpoints/
[12]: https://app.datadoghq.com/services?selectedComponent=endpoint