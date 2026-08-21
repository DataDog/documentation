---
description: Définir un jeu de données restreint pour le contrôle d'accès
further_reading:
- link: /data_security/
  tag: Documentation
  text: Réduction des risques liés à vos données
is_public: true
title: Data Access Control
---
## Présentation {#overview}

Vos données dans Datadog peuvent contenir des données sensibles et doivent être traitées avec précaution. Si vous ingérez des données sensibles dans Datadog, le Data Access Control permet aux administrateurs et aux gestionnaires d'accès au sein d'une organisation Datadog de réguler l'accès à ces données. Utilisez le Data Access Control pour identifier les données sensibles avec une requête et restreindre l'accès à des [Équipes][1] ou [Rôles][2] spécifiques uniquement.

Lorsque vous définissez un _Jeu de données restreint_, toutes les données situées dans la limite de ce jeu de données sont restreintes. Les données en dehors de tout jeu de données restreint restent non restreintes et accessibles aux utilisateurs disposant des autorisations appropriées. Le Data Access Control fournit une interface intuitive qui permet aux gestionnaires d'accès d'accorder l'accès aux données sensibles contenues dans les jeux de données uniquement aux utilisateurs autorisés.

## Prérequis {#prerequisites}

### Configurer les contrôles d'accès {#configure-access-controls}

Le Data Access Control s'appuie sur la configuration de contrôle d'accès Datadog existante de votre organisation. Configurez d'abord les [Contrôles d'accès][3] avant de configurer le Data Access Control.

### Étiqueter les données entrantes {#tag-incoming-data}

Le Data Access Control repose sur des tags et des attributs dans vos données qui peuvent être utilisés pour définir une limite d'accès. Si vous n'avez pas défini de tags, envisagez de [Démarrer avec les tags][4] avant de configurer le Data Access Control.

## Configurer l'accès aux données {#configure-data-access}

Le Data Access Control vous permet de créer un jeu de données restreint, en spécifiant les données auxquelles seuls les utilisateurs des équipes ou rôles désignés peuvent accéder.

Pour afficher tous vos jeux de données restreints, accédez à [Paramètres de l'organisation][6] et sélectionnez [Contrôles d'accès aux données][7] sur la gauche, sous la rubrique {{< ui >}}Access{{< /ui >}}.

### Site Datadog {#datadog-site}

Connectez-vous en tant qu'utilisateur doté du rôle Datadog Admin, ou tout utilisateur disposant d'un rôle dans votre organisation avec l'autorisation [`user_access_manage`][5].

1. Accédez à [Paramètres de l'organisation][6].
1. Sur le côté gauche de la page, sélectionnez [Contrôles d'accès aux données][7].
1. Cliquez sur {{< ui >}}New Restricted Dataset{{< /ui >}}.

Afin de créer un jeu de données restreint, identifiez les données à restreindre avec une requête.

{{< img src="/account_management/rbac/restricted_dataset-3.png" alt="Boîte de dialogue Créer un jeu de données restreint. Sélectionne les données dans RUM, APM, Logs et Metrics correspondant à la balise service :hr. Accorde l'accès à une équipe d'accès privilégié.">}}

Nommer le jeu de données
: Un nom descriptif pour aider les utilisateurs à comprendre quelles données sont contenues dans le jeu de données.

Sélectionnez les données à inclure dans ce jeu de données
: La définition de limite qui décrit quelles données restreindre à un ensemble spécifique d'utilisateurs. Les limites sont des instructions de requête avec des restrictions qui permettent à un gestionnaire d'accès de définir la portée des données sensibles à protéger. Les [types de télémétrie pris en charge][10] sont custom métriques, RUM sessions, APM traces, Logs, cloud costs, error tracking issues, Software Delivery repository info (CI Visibility pipelines) et Workload Protection Agent Events.

Autoriser l'accès
: Sélectionnez une ou plusieurs équipes ou rôles pouvant accéder au contenu associé à un jeu de données restreint. Tout utilisateur qui n'est pas membre de ces groupes est empêché d'accéder à ces données.

**Remarque :** Un maximum de 50 principals (rôles ou équipes) peut être associé à un jeu de données restreint donné.

Vous pouvez créer un maximum de 10 paires clé:valeur par jeu de données restreint. Envisagez de définir un jeu de données restreint supplémentaire si vous avez besoin de paires supplémentaires.

Après avoir rempli tous les champs pour définir le jeu de données, cliquez sur {{< ui >}}Create Restricted Dataset{{< /ui >}} pour l'appliquer à votre organisation.

Vous pouvez créer un maximum de 100 jeux de données restreints avec le forfait Enterprise, et un maximum de 10 jeux de données autrement. Les clients Enterprise utilisant le [Mode strict](#strict-mode) peuvent créer jusqu'à 1 000 jeux de données restreints.

### Types de télémétrie pris en charge {#supported-telemetry}

- Traces Agent Observability
- Traces APM
- Coûts cloud
- Problèmes de Error Tracking
- Logs
- RUM sessions
- Software Delivery repository info (in CI Visibility pipelines)
- Workload Protection Agent Events

Les éléments suivants sont disponibles en préversion sur demande :
- Métriques personnalisées
    - **Remarque :** Les métriques standard et OpenTelemetry (OTel) ne sont pas prises en charge

## Configuration avancée {#advanced-configuration}

### Mode strict {#strict-mode}

Par défaut, le Data Access Control fonctionne en _Mode standard_, ce qui signifie que toute donnée en dehors d'un jeu de données restreint reste visible pour les utilisateurs disposant des autorisations appropriées. _Le mode strict_ inverse cela pour un type de télémétrie spécifique : une fois activé, les utilisateurs ne voient aucune donnée pour ce type de télémétrie à moins qu'ils ne se voient explicitement accorder l'accès via un jeu de données restreint.

Le mode strict est utile pour les données particulièrement sensibles, lorsque :
- Le marquage de télémétrie est incohérent, de sorte qu'une limite de mode standard risque de laisser des enregistrements sensibles non couverts.
- De nouvelles valeurs de balise sont ajoutées fréquemment, et vous ne pouvez pas garantir que chaque nouvelle valeur correspond à un ensemble de données restreint existant.
- La posture de Compliance nécessite une position de refus par défaut pour un type de télémétrie.

Le mode strict est configuré par type de télémétrie. Un type de télémétrie doit avoir au moins un jeu de données restreint avant de pouvoir être basculé en mode strict. Cela empêche toute perte d'accès involontaire. Si tous les ensembles de données restreints sont supprimés ultérieurement d'un type de télémétrie en mode strict, seuls les [groupes d'utilisateurs non restreints](#unrestricted-user-groups) conservent l'accès jusqu'à ce que de nouveaux ensembles de données soient créés ou que le mode soit rétabli en mode standard.

Les jeux de données restreints ne peuvent pas être partagés entre les modes Standard et Strict (chaque jeu de données appartient à un seul mode).

**Avant d'activer le mode strict**, vérifiez quelles données ne sont _pas_ déjà dans un jeu de données restreint pour ce type de télémétrie. Ces données sont masquées une fois le mode strict activé. Examinez les ensembles de données restreints existants sur la page [Contrôles d'accès aux données][7] pour confirmer la couverture.

Pour modifier le mode de restriction d'un type de télémétrie, accédez à [Contrôles d'accès aux données][7]. Les utilisateurs doivent disposer de l'autorisation [`user_access_manage`][5] pour modifier les modes de restriction.

### Groupes d'utilisateurs non restreints {#unrestricted-user-groups}

Certains utilisateurs, tels que les administrateurs à privilèges élevés ou les équipes d'observabilité centrale ayant accès aux données dans toute l'organisation, ont besoin d'une visibilité complète sur un type de télémétrie, indépendamment de tout ensemble de données restreint. Plutôt que d'ajouter ces utilisateurs individuellement à chaque ensemble de données restreint, vous pouvez accorder à leur équipe ou à leur rôle un _accès non restreint_ pour un type de télémétrie spécifique.

Une équipe ou un rôle disposant d'un accès non restreint pour un type de télémétrie voit toutes les données de ce type de télémétrie, indépendamment des limites de l'ensemble de données restreint ou du mode de restriction. L'accès non restreint est accordé aux équipes ou aux rôles (et non aux utilisateurs individuels) et est configuré par type de télémétrie. Par exemple, un rôle peut avoir un accès non restreint à Logs sans affecter l'accès à RUM.

Les groupes d'utilisateurs non restreints se marient particulièrement bien avec le mode strict car ils permettent aux administrateurs désignés de continuer à travailler sans être ajoutés à chaque ensemble de données.

**Remarque:** D'autres méthodes de contrôle d'accès (telles que [Logs Restriction Queries][11] et [Permissions][3]) s'appliquent toujours aux utilisateurs des groupes d'utilisateurs non restreints.

## Contraintes d'utilisation {#usage-constraints}

Une fois le Data Access Control activé, Datadog désactive ou limite d'autres fonctionnalités pour contrôler l'accès aux données sensibles. Consultez la liste des fonctionnalités affectées ci-dessous pour voir comment elles sont restreintes.

### Real User Monitoring (RUM) {#real-user-monitoring-rum}

#### Session Replay : Rétention étendue {#session-replay-extended-retention}
Par défaut, les données Session Replay sont conservées pendant 30 jours. Pour étendre la rétention à 15 mois, vous pouvez activer la rétention étendue sur des Session Replays individuels. Lorsque vous créez un jeu de données restreint pour RUM, Datadog désactive l'option de rétention étendue.

#### Session Replay : Playlists {#session-replay-playlists}

Les playlists sont des collections de Session Replays que vous pouvez agréger dans une structure de type dossier. Lorsque vous créez un jeu de données restreint pour RUM, Datadog désactive Session Replay Playlists.

### Logs {#logs}
Le Data Access Control est distinct de la fonctionnalité [Logs RBAC permissions][11] existante, également appelée [Logs Restriction Queries][11]. Datadog recommande d'utiliser une solution unique pour restreindre les données de logs. Si vous limitez l'accès des utilisateurs à l'aide du Data Access Control et des requêtes de restriction de logs, les deux ensembles de restrictions s'appliquent.

### Monitors {#monitors}
Les utilisateurs peuvent créer des monitors qui interrogent et alertent sur la télémétrie active. Bien que l'utilisateur ne puisse interroger directement que les données auxquelles il est autorisé à accéder, le monitor fonctionne en tant qu'utilisateur système ayant un accès complet aux données.

Si vous êtes préoccupé par l'accès non autorisé aux données via les monitors, Datadog vous recommande de suivre les monitors créés par vos utilisateurs. Ensuite, restreignez l'accès à la création de monitors qui lisent des données sensibles.

### Informations sur le dépôt Software Delivery (CI Visibility pipelines) {#software-delivery-repository-info-ci-visibility-pipelines}

* **Télémétrie prise en charge** : Seuls les CI Visibility pipelines sont pris en charge. Les tests Test Optimization ne sont pas pris en charge.
* **CI Logs** : Les CI Logs sont stockés dans le produit Log Management. Pour restreindre l'accès aux CI Logs, créez un jeu de données de CI Logs.
* **Tags de jeu de données pris en charge** : Seuls les tags suivants sont pris en charge :
  * `@git.repository_url`
  * `@git.repository.id`
  * `@git.repository.id_v2`
  * `@gitlab.groups`

### Agent Observability{#agent-observability}

* **Télémétrie prise en charge** : Les traces Agent Observability sont prises en charge. Les données d'événement d'expérience (spans et métriques d'évaluation) pour les expériences dans un projet sont également restreintes par des jeux de données restreints `ml_app`-keyed. Seules les données d'événement sont restreintes ; les vues de liste d'expériences et les métadonnées ne le sont pas. Les jeux de données, les files d'attente d'annotation et les prompts gérés ne sont pas pris en charge.
* **OpenTelemetry** : Lors de l'utilisation de [l'instrumentation OpenTelemetry][13], certaines données envoyées à Agent Observability peuvent également être écrites dans les traces APM, ainsi que dans les métriques et les monitors. Si vous protégez des données sensibles avec un jeu de données restreint sur Agent Observability, envisagez également de configurer des jeux de données restreints sur l'APM, les métriques ou les monitors avec des limites de données correspondantes.


## Sélectionner des tags pour l'accès{#select-tags-for-access}

Chaque jeu de données restreint peut contrôler l'accès à plusieurs types de données, tels que les métriques. Vous êtes libre d'utiliser les mêmes tags ou des tags différents pour plusieurs types de télémétrie. Au sein de chaque type de télémétrie, vous devez utiliser un _seul_ tag ou attribut pour définir votre stratégie d'accès.

Si vous avez trop de combinaisons de tags ou d'attributs pour respecter ces contraintes, envisagez de [revoir votre tagging][4] afin de définir un nouveau tag qui reflète mieux votre stratégie d'accès.

### Exemple pris en charge{#supported-example}

#### Jeu de données restreint 1{#restricted-dataset-1}
- Type de télémétrie : RUM
   - Filtres : `@application.id:ABCD`

#### Jeu de données restreint 2 {#restricted-dataset-2}
* Type de télémétrie : RUM
    * Filtres : `@application.id:EFGH`
* Télémétrie type: Custom Metrics
    * Filtres : `env:prod`

### Exemple non pris en charge {#not-supported-example}

#### Jeu de données restreint 1 : {#restricted-dataset-1-1}
* Type de télémétrie : RUM
    * Filtres : `@application.id:ABCD`

#### Jeu de données restreint 2 : {#restricted-dataset-2-1}
* Type de télémétrie : RUM
    * Filtres : `env:prod`

Le jeu de données restreint 1 utilise `@application.id` comme tag pour les données RUM, donc un nouveau jeu de données restreint ne peut pas passer à un tag différent. Envisagez plutôt de reconfigurer le jeu de données restreint 2 pour utiliser `@application.id`, ou de modifier tous vos jeux de données restreints avec des données RUM pour utiliser un autre tag.

### Exemple non pris en charge {#not-supported-example-1}

#### Jeu de données restreint 1 : {#restricted-dataset-1-2}
* Type de télémétrie : RUM
    * Filtres : `@application.id:ABCD`

#### Jeu de données restreint 2 : {#restricted-dataset-2-2}
* Type de télémétrie : RUM
    * Filtres : `@application.id:IJKL` `env:prod`

Cet exemple utilise correctement la balise `@application.id` pour le RUM, comme cela a été fait pour le jeu de données restreint 1. Cependant, la limite est d'une balise par type de télémétrie. Envisagez plutôt de créer un jeu de données restreint avec _either_ `application.id` ou `env`, ou identifiez un tag différent qui combine mieux ces attributs.

## Bonnes pratiques {#best-practices}

### Stratégie d'accès {#access-strategy}

Avant de configurer le Data Access Control, il est important d'évaluer votre stratégie d'accès. Pensez à consulter [Réduire les risques liés aux données][8] lorsque vous réfléchissez à votre stratégie d'accès. Supprimer ou réduire les données inutiles ou sensibles avant qu'elles n'atteignent Datadog réduit le besoin de configuration d'accès supplémentaire.

#### Protéger les données sensibles connues {#protecting-known-sensitive-data}

Si vous avez déjà identifié les données à protéger, vous pouvez élaborer votre configuration de Data Access Control uniquement autour de ces données spécifiques. Cela garantit que les données non sensibles sont généralement accessibles à vos utilisateurs, leur permettant de collaborer et de comprendre les problèmes ou incidents en cours.

Par exemple, si vous disposez d'une seule application instrumentée avec le Real User Monitoring (RUM) et qui capture des entrées sensibles des utilisateurs, envisagez de créer un jeu de données restreint uniquement pour cette application :
* {{< ui >}}Name dataset:{{< /ui >}} Données RUM restreintes
* {{< ui >}}Select data to be included in this Dataset:{{< /ui >}}
    * Type de télémétrie : RUM
        * Filtres : `@application.id:<rum-app-id>`
* {{< ui >}}Grant access:{{< /ui >}}
    * Équipes ou rôles des utilisateurs pouvant voir ces données RUM

Cet exemple de configuration protégerait les données RUM de cette application et maintiendrait les autres données de cette application accessibles aux utilisateurs existants de votre organisation.

#### Protéger toutes les données d'un service {#protecting-all-data-from-a-service}

Si vous cherchez plutôt à protéger les données d'un service spécifique, vous pouvez élaborer votre configuration de Data Access Control autour du tag `service:`.

Par exemple, si vous avez un service `NewService` instrumenté avec le Real User Monitoring (RUM) et capturant des entrées sensibles des utilisateurs, envisagez de créer un jeu de données restreint uniquement pour cette application :

* {{< ui >}}Name Dataset:{{< /ui >}} Données restreintes NewService
* {{< ui >}}Select data to be included in this Dataset:{{< /ui >}}
    * Type de télémétrie : RUM
        * Filtres : `@service:NewService`
    * Télémétrie type: Custom Metrics
        * Filtres : `@service:NewService`
    * Type de télémétrie : APM
        * Filtres : `@service:NewService`
    * Type de télémétrie : Logs
        * Filtres : `@service:NewService`
* {{< ui >}}Grant access:{{< /ui >}}
    * Équipe propriétaire du service

Cet exemple de configuration protège toutes les données prises en charge provenant de `NewService`.

### Équipes et rôles {#teams-and-roles}

Le Data Access Control permet d'accorder l'accès aux utilisateurs via des rôles ou des équipes Datadog. Lors de l'octroi d'un accès, tenez compte de votre configuration de contrôle d'accès et de votre stratégie d'accès existantes. Si vous adoptez une approche basée sur les services et que vous [personnalisez déjà le catalogue][9], tirez parti du modèle de propriété des services en utilisant les équipes dans le cadre de votre configuration de Data Access Control.

**Remarque :** Les équipes utilisées pour le Data Access Control doivent être configurées de telle sorte que l'ajout ou la suppression d'utilisateurs ne puisse être effectué que par les membres de l'équipe ou par un administrateur, et non par `Anyone in the organization`.

## Application de l'accès {#access-enforcement}

Les utilisateurs d'une organisation Datadog pour laquelle le Data Access Control est activé ne peuvent voir que les résultats de requête pour les données auxquelles ils ont accès, par exemple dans un Dashboard, dans un Explorer, ou via l'API. Un jeu de données restreint supprime l'accès aux données définies dans le jeu de données restreint pour les utilisateurs qui n'y sont pas autorisés, dans toutes les expériences et tous les points d'entrée Datadog.

### Explorateurs de données {#data-explorers}

Lors de l'exploration de Datadog avec les restrictions activées, les utilisateurs sans autorisation peuvent toujours parcourir la liste des noms d'actifs (applications ou métriques), mais ils ne peuvent pas voir les résultats de requête, les tags principaux ou les détails des facettes restreints par les jeux de données. Par exemple, l'interrogation d'une métrique avec des données restreintes renvoie un graphique vide, ce qui donne l'impression que la requête ne correspond à aucune donnée.

### Dashboards et notebooks {#dashboards-and-notebooks}

De même que pour l'exploration de données dans un explorateur de données tel que RUM Explorer ou Metrics Explorer, la visualisation de données dans des tableaux de bord au sein d'une organisation ayant activé les jeux de données restreints n'affiche que les données auxquelles l'utilisateur peut accéder. Comme les tableaux de bord sont des objets partagés accessibles par d'autres personnes, il est possible que deux utilisateurs ayant des accès différents consultent le même tableau de bord ou le même notebook en même temps et voient des données différentes.

**Remarque** : Les personnes consultant des [Dashboards partagés][12] voient toutes les données de télémétrie affichées dans le Dashboard conformément aux autorisations du créateur. Examinez le contenu de votre tableau de bord avant de le partager afin de vous assurer qu'aucune donnée sensible ou confidentielle n'est exposée.

### APIs {#apis}

Lors de l'interrogation de données via les APIs Datadog avec les restrictions activées, les utilisateurs sans autorisation ne voient **pas** les résultats de requête qui ont été restreints par des jeux de données restreints.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/teams/
[2]: /fr/account_management/rbac/?tab=datadogapplication#role-based-access-control
[3]: /fr/account_management/rbac/
[4]: /fr/getting_started/tagging/
[5]: /fr/account_management/rbac/permissions/#access-management
[6]: https://app.datadoghq.com/organization-settings/
[7]: https://app.datadoghq.com/organization-settings/data-access-controls/
[8]: /fr/data_security/
[9]: /fr/internal_developer_portal/catalog/set_up/
[10]: /fr/account_management/rbac/data_access/#supported-telemetry
[11]: /fr/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs
[12]: /fr/dashboards/sharing/shared_dashboards/
[13]: /fr/llm_observability/instrumentation/otel_instrumentation/