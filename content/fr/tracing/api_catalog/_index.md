---
further_reading:
- link: /tracing/service_catalog/
  tag: Documentation
  text: Service Catalog Datadog
is_beta: true
kind: documentation
title: API Catalog Datadog
---

{{< callout url="https://forms.gle/TgezmEhUPXzebvv27" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
  La solution API Catalog de Datadog est en version bêta. Utilisez ce formulaire pour demander à y accéder. 
{{< /callout >}} 

{{< img src="tracing/api_catalog/api-catalog-overview.png" alt="API Catalog affichant la liste des endpoints d'API avec leur taux d'erreur, leur latence au 99e centile, leur nombre de requêtes et l'équipe responsable. Des fonctions de recherche, de filtrage et de modification du contexte sont également proposées." style="width:100%;" >}}

## Présentation

L'API Catalog vous permet d'explorer les performances, la fiabilité et l'équipe en charge de tous vos endpoints d'API depuis un seul et même endroit. Il s'agit d'une vue unique depuis laquelle toute votre entreprise peut trouver des informations à jour sur les caractéristiques des API utilisées par les services internes (API privées) et les utilisateurs externes (API exposées publiquement).

Surveillez les services clés de votre entreprise basés sur des API, normalisez et validez les attentes en matière de performance des API, et recevez des alertes en cas de performances anormales.

Vos équipes peuvent utiliser l'API Catalog pour :
- Optimiser la disponibilité et l'uptime des API clés, ainsi que des services métier qui dépendent de ces API
- Empêcher les problèmes de régression et d'instabilité des API
- Trier rapidement les incidents

L'API Catalog réunit des données issues des différents produits Datadog pour vous offrir des workflows pratiques et vous permettre d'explorer et de surveiller vos différentes API depuis une page unique. Il offre les fonctionnalités suivantes :

- **Découverte automatique** de l'ensemble des API publiques, privées et partenaires, organisées en fonction de leurs _endpoints_.
- **Mise en corrélation de toutes les métadonnées des API** issues des différentes sources Datadog.
- **Utilisation de métriques liées aux endpoints d'API**, telles que **dernière détection**, **requêtes**, **latence** et **erreurs**, pour identifier les problèmes de performance et surveiller la santé des API.
- **Création d'alertes** en cas de performances anormales d'un endpoint par rapport aux attentes et aux seuils définis.
- Résolution plus rapide des incidents grâce aux **informations sur les personnes en charge** (équipe, ingénieur d'astreinte, canaux de communication) pour chaque endpoint, afin de savoir qui contacter en cas de problème.

<div class="alert alert-info">Consultez la liste des <a href="#key-terminology">Termes clés</a> pour en savoir plus sur les concepts associés à l'API Catalog et comprendre son utilité.</div>

## Explorer vos endpoints

La vue [API Catalog][1] affiche tous les endpoints issus de tous les environnements de votre organisation Datadog. Les données de performance affichées pour chaque endpoint sont filtrées en fonction de l'environnement et de la période que vous avez sélectionnés. Vous pouvez explorer la liste et formuler des requêtes en sélectionnant des propriétés et des métriques pour obtenir des résultats plus précis, et utiliser des facettes ou des tags pour un filtrage rapide.

Vous pouvez **trier** la liste en cliquant sur le titre de n'importe quelle colonne du tableau. Par exemple, cliquez sur **P99** pour visualiser les endpoints dont la latence se situe dans le 99e centile le plus élevé.

Le tableau affiche également **l'équipe responsable** de l'API. Ces informations sont obtenues à partir de la définition de service associée dans le [Service Catalog][2]. Le propriétaire du service est responsable de l'ensemble des endpoints connectés au service.

Pour **filtrer la liste** des endpoints ou rechercher un endpoint spécifique, formulez une requête dans le champ **Rechercher**. Vous pouvez effectuer une recherche par service, par chemin ou selon tout autre tag primaire.

Il est également possible de sélectionner une combinaison de facettes sur la gauche pour filtrer les endpoints en fonction du **service** ou de l'**équipe** auxquels ils appartiennent.

Pour **filtrer les données** affichées sur le tableau, spécifiez un environnement, un autre tag primaire (tel que datacenter) et un intervalle.

{{< img src="tracing/api_catalog/api-catalog-scope.mp4" alt="Vidéo montrant comment les métriques affichées dans l'API Catalog changent en fonction des paramètres de filtrage sélectionnés" video="true" >}}

Vous pouvez [définir des tags](#regrouper-des-api-pour-definir-une-fonctionnalite-ou-une-logique-operationnelle) à utiliser comme facettes afin de retrouver facilement les groupes d'endpoint qui vous intéressent le plus.



## Examiner les détails d'un endpoint

Lorsque vous explorez un endpoint d'API, il peut être utile d'examiner ses détails de plus près.

Cliquez sur un endpoint dans la liste pour ouvrir une page affichant ses performances, ses métadonnées et l'équipe qui en est responsable, toutes ces informations étant recueillies à partir des différents produits Datadog. De là, vous pouvez modifier le nom raccourci et la description de l'endpoint, mais aussi ajouter des tags personnalisés. Vous pouvez également lancer des enquêtes plus approfondies sur les différentes données de télémétrie à l'aide des liens vers les autres produits Datadog.

Vous pouvez par exemple :
- Examiner un endpoint spécifique à partir de son chemin (par exemple, `/checkout`) lorsqu'il affiche un taux d'erreurs élevé et un nombre de requêtes élevé.
- Consulter le graphique des taux d'erreurs/hits et le graphique des codes de réponse pour identifier les problèmes.
- Accéder aux données de télémétrie associées, comme les traces et les logs.

{{< img src="tracing/api_catalog/endpoint-details-pivot-to-traces.mp4" alt="Cliquez sur un endpoint pour consulter le graphique des erreurs, et accédez aux traces associées pour mener l'enquête." video="true" >}}

Par défaut, les graphiques de performances sont filtrés en fonction des mêmes paramètres que sur la page API Catalog. Utilisez le sélecteur de période et les autres menus déroulants sur la page des détails pour modifier ces paramètres en fonction de vos besoins et de l'enquête.


## Explorer les endpoints durant un incident

Lorsque vous enquêtez sur un incident, les données détaillées sur l'endpoint d'API peuvent vous aider à identifier la cause du problème plus rapidement.

En outre, vous pouvez rapidement identifier l'équipe responsable de chaque endpoint, l'ingénieur d'astreinte ainsi que leurs coordonnées (e-mail, Slack, PagerDuty) pour résoudre plus rapidement les incidents qui concernent un endpoint d'API spécifique.

Ces informations (équipe, ingénieur d'astreinte et coordonnées) sont récupérées à partir de la définition de service du Service Catalog.

{{< img src="tracing/api_catalog/api-catalog-team-details.png" alt="Volet des informations de l'équipe dans la page des détails de l'endpoint affichant le nom et les moyens de contact de l'équipe responsable de l'endpoint, tels que définis dans le Service Catalog" style="width:100%;" >}}

## Regrouper des API pour définir une fonctionnalité ou une logique opérationnelle

En plus de taguer un endpoint depuis sa vue détaillée, vous pouvez **ajouter des tags à plusieurs endpoints à la fois pour les regrouper**. Sélectionnez plusieurs endpoints en cliquant sur leur case, puis cliquez sur **Edit tags** pour ajouter des étiquettes qui décrivent leur logique opérationnelle, leur importance ou d'autres informations de regroupement utiles. Ces étiquettes vous aideront à retrouver rapidement vos groupes d'endpoints personnalisés, mais aussi à créer des ressources telles que des monitors et des dashboards pour les groupes d'endpoints ayant des attentes et des bases communes.

Par exemple, si vous souhaitez recevoir des alertes en cas de latence anormale sur des endpoints particulièrement sensibles aux problèmes de performance, appliquez un tag tel que `sensibilité à la latence` à ces endpoints.

<!-- screen cap of making the "Latency sensitive" group tktk  -->

Si certains endpoints traitent des données sensibles, vous pouvez également appliquer le tag `informations personnelles` et générer une alerte lorsque les endpoints associés à ce tag affichent une réponse `401 Unauthorized`. Voici d'autres exemples de tags utiles :

- `essentiel à la fonctionnalité X`
- `nouvel ajout - V2`
- `contient un mot de passe`
- `contient des infos personnelles`
- Logique opérationnelle (par exemple, `paiements`)
- Groupe de clients spécifique (`abonnés`)

Lorsque vous ajoutez un tag, il apparaît dans la liste des facettes à gauche du catalogue. Cliquez sur une facette pour filtrer la liste et ajouter le tag à la requête de recherche.


## Configuration

Étant donné qu'il s'appuie automatiquement sur les données APM, l'API Catalog ne nécessite aucune configuration et peut simplement être activé dans une instance APM existante. Seuls les services instrumentés par APM et les bibliothèques prises en charge seront visibles dans le catalogue.

Pour configurer votre liste d'endpoints dans l'API Catalog:
- [Instrumentez les services][3] avec APM.
- [Définissez les personnes responsables du service][2] via le Service Catalog.

### Termes clés

API
: Un ensemble de protocoles et d'outils qui permettent à deux applications de communiquer.

Endpoint d'API
: L'adresse d'une ressource (URL) d'un serveur ou d'un service qui met en œuvre l'ensemble de règles défini dans l'API, souvent par le biais d'une interface HTTP REST. L'endpoint d'API génère la réponse à l'appel d'API.<br /><br/>
L'API Catalog affiche les informations suivantes sur chaque endpoint d'API : la méthode HTTP (par exemple `GET`), le chemin (la structure de l'emplacement de la ressource, par exemple `/payment/{shop_id}/purchase`) et le nom du service fourni par cette ressource (par exemple `Payments`).<br /><br/>
La **bêta** de l'API Catalog prend uniquement en charge les endpoints **HTTP**. 

API publiques
: Endpoints d'API accessibles par les clients depuis Internet.

API privées
: Également connues sous le nom d'API internes. Réservées à un usage interne au sein d'une entreprise ou d'une organisation, généralement pour la communication entre les services backend. Le type d'API le plus courant.

API partenaires
: Également connues sous le nom d'API tierces. Les endpoints publics d'une autre organisation (telle que Stripe, Google ou Facebook) que votre organisation utilise pour proposer ses services.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[2]: /fr/tracing/service_catalog/
[3]: /fr/tracing/trace_collection/