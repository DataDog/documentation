---
aliases:
- /fr/events/guides/migrating_from_stream_to_explorer
- /fr/events/guides/migrating_to_new_events_features
further_reading:
- link: https://www.datadoghq.com/blog/datadog-events/
  tag: Blog
  text: Dépannage plus rapide grâce aux événements Datadog améliorés

title: Migration vers les nouvelles fonctionnalités dédiées aux événements
---

<div class="alert alert-warning">
À partir du <strong>30 juin 2022</strong>, Datadog cessera de prendre en charge les anciens monitors d'événements et le flux d'événements et proposera à la place une nouvelle expérience améliorée pour tous ses clients. Cette page contient des informations importantes concernant cette migration. Suivez les étapes qui y sont présentées avant la date de fin de la prise en charge pour que vos monitors et visualisations d'événements existants continuent de fonctionner correctement.</div>


## Pourquoi changer les fonctionnalités dédiées aux événements ?

Lancé il y a plus de 10 ans, le flux d'événements est l'une des plus anciennes fonctionnalités de Datadog. La nouvelle expérience propose de nombreuses fonctionnalités inédites pour vous permettre de tirer le meilleur parti de vos événements. Ces fonctionnalités incluent notamment l'analyse des événements, la possibilité de générer des métriques à partir de vos événements, la possibilité de créer des pipelines pour le post-traitement d'événements, ainsi qu'une syntaxe de requête plus pratique et intuitive qui reprend les codes des autres produits Datadog, tels que Log Management et l'APM.

## Calendrier de migration

<strong>Mars 2022</strong> – Lancement du nouvel Events Explorer et de la nouvelle fonctionnalité d'analyse d'événements. Datadog commence à migrer les dashboards et monitors qui ne sont pas gérés avec les API.

<strong>5 mai 2022</strong> – Arrêt de la prise en charge du flux d'événements, qui est remplacé par l'Events Explorer.

<strong>19 mai 2022</strong> – Les monitors d'événements qui n'ont pas encore été migrés sont encore évalués par Datadog, mais ils ne peuvent plus être modifiés. Les nouveaux monitors d'événements doivent utiliser la nouvelle syntaxe.

<strong>30 juin 2022</strong> – Arrêt de l'évaluation des monitors d'événements qui n'ont pas été migrés. Les anciens monitors d'événements cessent de fonctionner.

## Mesures à prendre

Si vous ne gérez <strong>pas</strong> votre dashboard ou vos monitors à l'aide d'outils basés sur une API externe (comme Terraform ou des scripts), <strong>aucune mesure n'est requise de votre part</strong>. Datadog procédera à la migration de vos dashboards et monitors avant le 30 avril 2022. Vos anciens monitors ne seront pas supprimés, mais ils seront désactivés et Datadog cessera de les évaluer au plus tard le 30 juin 2022.

<strong>Si vous utilisez Terraform ou d'autres scripts basés sur une API</strong> pour gérer une partie ou l'intégralité de vos <strong>dashboards</strong>, Datadog procèdera à la migration des requêtes dans vos widgets et superpositions d'événements vers la nouvelle syntaxe. Vous devrez toutefois mettre à jour vos scripts afin qu'ils reflètent ces changements avant le 30 juin 2022.

<strong>Si vous utilisez Terraform ou d'autres scripts basés sur une API</strong> pour gérer une partie ou l'intégralité de vos <strong>monitors</strong>, vous avez jusqu'au 30 juin 2022 pour les mettre à jour. Après cette date, Datadog créera de nouvelles versions des monitors non migrés et désactivera les monitors existants pour s'assurer que vous continuez à recevoir des alertes.

Datadog peut également vous aider à migrer vos monitors en vous proposant des mises à jour ou en appliquant ces mises à jour à vos monitors.

## Nouveautés

### Events Explorer

L'Events Explorer affiche les événements les plus récents générés par votre infrastructure et vos services, ou vos alertes liées à la surveillance. Il remplace le flux d'événements et offre une syntaxe de requête plus pratique et intuitive. Consultez la section [Events Explorer][1] pour en savoir plus.

### Analyse d'événements

{{< img src="service_management/events/events-analytics.png" alt="Écran d'analyse d'événements avec le filtre « source:cloudtrail »" >}}

En plus de visualiser et rechercher des événements dans l'Events Explorer, vous pouvez désormais créer des graphiques sous forme de séries temporelles, de top list ou de tableau et regrouper les événements associés à une requête donnée. Consultez la section sur l'[analyse d'événements][2] pour en savoir plus.

Vous pouvez également [générer des métriques][3] avec une période de rétention de 15 mois à partir de n'importe quelle requête de recherche d'événements pour créer des monitors et des alertes en fonction des événements historiques.

{{< img src="service_management/events/generate-metrics.png" alt="Image de métriques avec la requête de recherche d'événements." >}}


### Créer des graphiques d'événements dans les dashboards

{{< img src="service_management/events/graph-events.png" alt="Analyse d'événements">}}

Vous pouvez désormais créer des graphiques d'événements pour une requête donnée au sein de vos dashboards sous forme de série temporelle, de valeur de requête, de top list, de tableau, et plus encore.

Par exemple, le dashboard [Monitor Notifications Overview][4] permet d'analyser les tendances des événements d'alerte de monitor afin de vous aider à améliorer votre configuration et à réduire les alertes superflues.

### Nouvelle expérience d'utilisation des monitors d'événement

Les nouveaux monitors d'événement ont été conçus pour offrir les mêmes fonctionnalités standard que d'autres produits (comme Logs, RUM ou APM), mais aussi des fonctionnalités supplémentaires.

Lorsque vous créez des monitors d'événement, le nouveau champ de requête de recherche prend désormais en charge l'autocomplétion : vous n'avez plus besoin de tout saisir manuellement.

{{< img src="service_management/events/guides/events-migration-monitor-new.png" alt="Nouvelle interface pour la syntaxe de requête de monitor" style="width:100%;" >}}

La nouvelle syntaxe de recherche vous permet d'utiliser des requêtes complexes dans des monitors d'événement, notamment grâce à la prise en charge des opérateurs booléens ou des wildcards.

### Pipelines

Datadog parse automatiquement les événements au format JSON. Si un événement n'est pas au format JSON, il est assemblé de façon séquentielle par l'intermédiaire d'un pipeline de traitement afin d'être parsé et enrichi. Les processeurs extraient des informations ou des attributs utiles à partir de texte semi-structuré, afin de les réutiliser sous la forme de facettes. Lorsqu'un événement passe par les pipelines, tous les filtres de pipeline lui sont appliqués. S'il répond aux critères d'un filtre, tous les processeurs associés lui sont appliqués de façon séquentielle. Il passe ensuite au prochain pipeline.

## Attributs réservés

Cette liste décrit les attributs réservés qui sont automatiquement ingérés avec les événements.

| Attribut | Description                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | Le nom du host d'origine, tel que défini dans les métriques. Datadog récupère automatiquement les tags de host correspondants à partir du host associé dans Datadog et les applique ensuite à vos événements. L'Agent définit automatiquement cette valeur.                          |
| `source`  | Cet attribut correspond au nom de l'intégration, ou à la technologie à l'origine de l'événement. Lorsqu'il a pour valeur le nom d'une intégration, Datadog installe automatiquement les parsers et les facettes correspondants. Par exemple : `nginx`, `postgresql`, etc. |
| `status`  | Cela correspond au niveau ou à la gravité d'un événement.      |
| `service` | Le nom de l'application ou du service qui a généré les événements. |
| `message` | Par défaut, Datadog ingère la valeur de l'attribut `message` comme corps de l'entrée de l'événement. |                     

## Ce qui change

**Remarque :** le processus d'envoi d'événements reste le même. Vous pouvez continuer à envoyer des événements à l'aide de l'API, de l'Agent ou par e-mail comme auparavant.

### Les agrégations d'événements ne sont plus effectuées ni affichées dans l'interface utilisateur
Datadog n'effectue plus automatiquement l'agrégration d'événements et ne regroupe plus les événements en fonction de l'attribut `aggregation_key`. L'interface utilisateur n'affiche plus les agrégations d'événements.

### Les commentaires d'événements ne sont plus pris en charge ni affichés dans l'interface utilisateur
Les commentaires créés via l'API avec le type d'événement `user_update` seront affichés en tant qu'événements normaux.

### Remappage des statuts dans les requêtes
Certaines valeurs de statut ont changé :

| Ancien statut | Nouveau statut |
|---------------|------------|
| success       | ok         |
| warning       | warn       |
| info          | info       |
| error         | error      |

### Remappage des sources dans les requêtes
De nombreux noms de source d'événements ont changé. Découvrez la liste complète des [noms de source][5] concernés.

### La fenêtre d'évaluation des monitors est limitée à 48 heures.
Vos monitors ne seront pas évalués au-delà d'une fenêtre de 48 heures. Si vous avez besoin d'une fenêtre d'évaluation plus longue, vous pouvez [générer des métriques custom][3] à partir d'événements et utiliser un monitor de métriques, qui offre une fenêtre d'évaluation allant jusqu'à 1 mois.

### Les regroupements ne peuvent être effectués qu'en fonction de 4 facettes.
(Auparavant : groupes illimités) Les valeurs les plus élevées, c'est-à-dire les plus hautes valeurs de fréquence d'un groupe, sont limitées en fonction du nombre total de groupes. Par exemple, si un monitor se déclenche plus de fois que la limite des facettes, seuls les N premiers groupes sont affichés. Exemple : N = 30 hosts s'ils sont regroupés en deux facettes et que l'une d'entre elles correspond à `host`.
  * Une facette = Limite de 1 000 valeurs les plus élevées.
  * Deux facettes = Limite de 30 valeurs les plus élevées par facette (900 groupes maximum)
  * Trois facettes = Limite de 10 valeurs les plus élevées par facette (1 000 groupes maximum)
  * Quatre facettes = Limite de 5 valeurs les plus élevées par groupe (625 groupes maximum)

### Les seuils de rétablissement ne sont plus pris en charge par les monitors
Les seuils de monitor d'événement ne prennent plus en charge les types de seuil `warning_recovery` et `critical_recovery`. Les nouveaux monitors d'événement ne doivent pas inclure de seuil de rétablissement.

Si vous utilisez ces fonctionnalités, [contactez l'assistance][6]. Nous vous aiderons à trouver une solution alternative.

## Exemples

### Exemples de syntaxe de recherche d'événements (avant et après)

Afficher les événements issus de GitHub ou Chef
: Ancienne syntaxe</br>
`sources:github,chef`
: Nouvelle syntaxe </br>
`source:(github OR chef)`

Afficher les événements qui présentent le tag `env-prod`
: Ancienne syntaxe</br>
`tags:env-prod`
: Nouvelle syntaxe </br>
`tags:env-prod`

Afficher les événements qui présentent le tag `#env-prod` ou `#db`
: Ancienne syntaxe</br>
`tags:env-prod,db`, `tags:env-prod OR db`
: Nouvelle syntaxe </br>
`tags:(env-prod OR db)`

Afficher les événements qui présentent les tags `#security-group:sg-123` et `#role:common-node`
: Ancienne syntaxe</br>
`tags:security-group:sg-123 AND role:common-node`
: Nouvelle syntaxe </br>
`tags:(security-group:sg-123 AND role:common-node)`

Utiliser des wildcards pour rechercher des préfixes et des suffixes
: Ancienne syntaxe</br>
Non disponible
: Nouvelles syntaxe </br>
`*web` permet de rechercher tous les messages d'événement se terminant par `web`</br>
`source:amazon*` permet de rechercher tous les événements dont la source commence par `amazon`

### Exemples de syntaxe de recherche de monitors d'événement via l'API (avant et après)

L'[API des monitors d'événement][7] utilise une nouvelle syntaxe de requête (voir la section « Requête d'alerte d'événement V2 »). Cette syntaxe accepte les méthodes de rollup « average » et « cardinality » tout en nécessitant moins d'attributs.

Aucun événement Slack au cours des dernières 24 heures
: Ancienne syntaxe </br>
`events('priority:all sources:slack').rollup('count').last('1d') < 1`
: Nouvelle syntaxe </br>
`events("source:slack").rollup("count").last("1d") < 1`

Maintenance prévue sur une instance EC2
: Ancienne syntaxe </br>
`events('priority:all "Upcoming AWS maintenance event"').by('name,host').rollup('count').last('2d') >= 1`
: Nouvelle syntaxe </br>
`events("Upcoming AWS maintenance event").rollup("count").by("name,host").last("2d") >= 1`

Zabbix ou Prometheus a déclenché une alerte pour un service aujourd'hui
: Ancienne syntaxe </br>
`events('tags:service priority:all status:error sources:prometheus sources:zabbix).rollup('count').last('1d') > 0`
: Nouvelle syntaxe </br>
`events("source:(prometheus OR zabbix) status:error tags:service").rollup("count").last("1d") > 0`

Aucun événement reçu dans un centre de données pour le service `datadog-agent`
: Ancienne syntaxe </br>
Les anciens monitors d'événement ne prennent pas en charge la méthode de rollup « cardinality ».
: Nouvelle syntaxe </br>
`events("service:datadog-agent").rollup("cardinality", "datacenter").by("service").last("15m") < 1`

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/service_management/events/explorer
[2]: /fr/service_management/events/explorer/analytics
[3]: /fr/service_management/events/#generate-custom-metrics-from-events
[4]: https://app.datadoghq.com/dash/integration/30532/monitor-notifications-overview
[5]: /fr/service_management/events/guides/new_events_sources/
[6]: /fr/help/
[7]: /fr/api/latest/monitors/#create-a-monitor