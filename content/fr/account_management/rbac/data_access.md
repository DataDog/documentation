---
description: Définir un ensemble de données restreint pour le contrôle d'accès
further_reading:
- link: /data_security/
  tag: Documentation
  text: Réduction des risques liés à vos données
is_public: true
title: Contrôle d'accès aux données
---
{{< callout url="#" header="false" btn_hidden="true">}}
  Le contrôle d'accès aux données est en disponibilité limitée
{{< /callout >}}

## Section Overview

Vos données dans Datadog peuvent contenir des informations sensibles et doivent être manipulées avec précaution. Si vous ingérez des données sensibles dans Datadog, le contrôle d'accès aux données permet aux administrateurs et aux responsables des accès d'une organisation Datadog de réglementer l'accès à ces données. Utilisez le contrôle d'accès aux données pour identifier les données sensibles à l'aide d'une requête et restreindre l'accès à certains [équipes][1] ou [rôles][2] uniquement.

Lorsque vous définissez un _ensemble de données restreint_, toutes les données comprises dans les limites de cet ensemble de données sont restreintes. Les données en dehors de tout jeu de données restreint restent non restreintes et accessibles aux utilisateurs disposant des autorisations appropriées. Le contrôle d'accès aux données fournit une interface intuitive permettant aux responsables des accès d'accorder l'accès aux données sensibles incluses dans les ensembles de données uniquement aux utilisateurs autorisés.

## Prérequis

### Configurer les contrôles d'accès

Le contrôle d'accès aux données s'appuie sur la configuration de contrôle d'accès existante de votre organisation dans Datadog. Configurez d'abord les [contrôles d'accès][3] avant de configurer le contrôle d'accès aux données.

### Appliquer un tag aux données entrantes

Le contrôle d'accès aux données repose sur les tags et les attributs présents dans vos données, qui permettent de définir une limite d'accès. Si aucun tag n'est défini, consultez la section [Démarrer avec les tags](#demarrer-avec-les-tags) avant de configurer le contrôle d'accès aux données.

## Configurer l'accès aux données

Le contrôle d'accès aux données permet de créer un ensemble de données restreint, en spécifiant les données accessibles uniquement aux utilisateurs appartenant à des équipes ou des rôles désignés.

Pour afficher tous vos ensembles de données restreints, accédez aux [paramètres de l'organisation][6], puis sélectionnez [Data Access Controls][7] dans le menu de gauche, sous l'intitulé **Access**.

### Site Datadog

Connectez-vous en tant qu'utilisateur auquel est attribué le rôle d'administrateur Datadog, ou tout utilisateur disposant d'un rôle dans votre organisation avec l'autorisation [`user_access_manage`][5].

1. Accédez à [Organization Settings][6].
1. Sur le côté gauche de la page, sélectionnez [Data Access Controls][7].
1. Cliquez sur **New Restricted Dataset**.

Pour créer un ensemble de données à accès restreint, identifiez les données à restreindre à l'aide d'une requête.

{{< img src="/account_management/rbac/restricted_dataset-2.png" alt="Boîte de dialogue de création d'un ensemble de données restreint. Sélectionne les données dans RUM, APM, logs et métriques correspondant au tag service:hr. Accorde l'accès à une équipe à accès privilégié.">}}

Name Dataset
: un nom descriptif pour aider les utilisateurs à comprendre quelles données sont contenues dans l'ensemble de données

Select data to be included in this Dataset
: Définition de la limite qui décrit quelles données restreindre à un ensemble spécifique d'utilisateurs. Les limites sont des instructions de requête avec des restrictions qui permettent à un responsable des accès de définir la portée des données sensibles à protéger. Les [types de données de télémétrie pris en charge][10] sont les métriques custom, les sessions RUM, les traces APM, les logs, les coûts cloud, les problèmes d'Error Tracking et les informations de référentiel Software Delivery (pipelines CI Visibility).

Grant access
: Sélectionnez une ou plusieurs équipes ou rôles autorisés à accéder au contenu défini dans l'ensemble de données restreint. Tout utilisateur ne faisant pas partie de ces groupes sera bloqué.

Vous pouvez créer un maximum de 10 paires clé:valeur par ensemble de données restreint. Envisagez de définir un ensemble de données restreint supplémentaire si vous avez besoin de paires supplémentaires.

Après avoir rempli tous les champs pour définir l'ensemble de données, cliquez sur **Create Restricted Dataset** pour l'appliquer à votre organisation.

Vous pouvez créer un maximum de 100 ensembles de données restreints. Si vous avez besoin d'une limite plus élevée, contactez l'assistance.

### API
L'API Data Access Control est en cours de développement et doit être considérée comme instable. Les versions futures pourraient ne pas être rétrocompatibles.

La prise en charge de Terraform sera annoncée une fois que Data Access Control sera généralement disponible.

### Types de données de télémétrie pris en charge {#donnees-de-telemetrie-prises-en-charge}

- Les traces APM
- Informations du référentiel de livraison logicielle (pipelines CI Visibility)
- Coûts cloud
- Métriques custom
    - **Remarque :** les métriques standard et OpenTelemetry (OTel) ne sont pas prises en charge.
- Les problèmes issus de la fonctionnalité de suivi des erreurs
- Logs
- Sessions RUM
- LLM Observability

## Contraintes d'utilisation

Une fois le contrôle d'accès aux données activé, Datadog désactive ou limite certaines fonctionnalités afin de contrôler l'accès aux données sensibles. Consultez la liste des fonctionnalités concernées ci-dessous pour savoir comment elles sont restreintes.

### Real User Monitoring (RUM)

#### Session Replay : Rétention prolongée
Par défaut, les données de Session Replay sont conservées pendant 30 jours. Pour prolonger la durée de conservation à 15 mois, vous pouvez activer la rétention prolongée sur des replays de session individuels. Lorsque vous vous inscrivez à l'aperçu du contrôle d'accès aux données, Datadog désactive l'option de rétention prolongée. La rétention prolongée est incompatible avec le contrôle d'accès aux données, car le stockage utilisé pour conserver les données prolongées ne prend pas en charge les restrictions d'accès.

#### Session Replay : Listes de lecture

Les playlists sont des collections de Session Replays que vous pouvez regrouper dans une structure semblable à un dossier. Les playlists peuvent permettre à un utilisateur de contourner involontairement les contrôles d'accès. Lorsqu'un client s'inscrit à l'aperçu du contrôle d'accès aux données, Datadog désactive les playlists de Session Replay.

### Logs
Le contrôle d'accès aux données est distinct de la fonctionnalité existante [Logs RBAC permissions][11], également connue sous le nom de requêtes de restriction des logs. Pour utiliser le contrôle d'accès aux données avec Log Management, commencez par demander l'accès au contrôle d'accès aux données. Ensuite, migrez manuellement votre configuration des autorisations de Log Management vers le contrôle d'accès aux données.

### Informations du référentiel de livraison logicielle (pipelines CI Visibility)

* **Données de télémétrie prises en charge** : seuls les pipelines CI Visibility sont pris en charge. Les tests Test Optimizations ne sont pas pris en charge.
* **Logs CI** : les logs CI sont stockés dans le produit Log Management. Pour restreindre l'accès aux logs CI, créer un ensemble de données Logs.
* **Tags d'ensemble de données pris en charge** : seuls les tags suivants sont pris en charge :
  * `@git.repository_url`
  * `@git.repository.id`
  * `@gitlab.groups`


## Sélectionner les tags pour l'accès

Chaque ensemble de données restreint peut contrôler l'accès à plusieurs types de données, comme les métriques. Vous êtes libre d'utiliser les mêmes tags ou des tags différents pour plusieurs types de données de télémétrie. Pour chaque type de télémétrie, vous devez utiliser un _seul_ tag ou attribut pour définir votre stratégie d'accès.

Si vous avez trop de combinaisons de tags ou d'attributs pour respecter ces contraintes, envisagez de [revoir votre stratégie de tagging][4] afin de définir un nouveau tag qui reflète mieux votre stratégie d'accès.

### Exemple pris en charge

#### Ensemble de données restreint 1
- Type de télémétrie : RUM
   - Filtres : `@application.id:ABCD`

#### Ensemble de données restreint 2
* Type de télémétrie : RUM
    * Filtres : `@application.id:EFGH`
* Type de télémétrie : Métriques
    * Filtres : `env:prod`

### Exemple non pris en charge

#### Ensemble de données restreint 1 :
* Type de télémétrie : RUM
    * Filtres : `@application.id:ABCD`

#### Ensemble de données restreint 2 :
* Type de télémétrie : RUM
    * Filtres : `env:prod`

L'ensemble de données restreint 1 utilise `@application.id` comme tag pour les données RUM, il n'est donc pas possible de sélectionner un tag différent dans un nouvel ensemble de données restreint. Envisagez plutôt de reconfigurer l'ensemble de données restreint 2 pour utiliser `@application.id`, ou de modifier tous vos ensembles de données restreints contenant des données RUM pour qu'ils utilisent un autre tag.

### Exemple non pris en charge

#### Ensemble de données restreint 1 :
* Type de télémétrie : RUM
    * Filtres : `@application.id:ABCD`

#### Ensemble de données restreint 2 :
* Type de télémétrie : RUM
    * Filtres : `@application.id:IJKL` `env:prod`

Cet exemple utilise correctement le tag `@application.id` pour RUM, comme dans l'ensemble de données restreint 1. Toutefois, la limite est d’un seul tag par type de données de télémétrie. Envisagez plutôt de créer un ensemble de données restreint avec _soit_ `application.id`, _soit_ `env`, ou d’identifier un autre tag combinant mieux ces attributs.

## Meilleures pratiques

### Stratégie d'accès

Avant de configurer Data Access Control, il est important d’évaluer votre stratégie d’accès. Envisagez de consulter la rubrique relative à [la réduction des risques liés aux données][8] lors de la définition de votre stratégie d’accès. Supprimer ou réduire les données sensibles ou inutiles avant qu’elles n’arrivent dans Datadog réduit le besoin de mettre en place des contrôles d’accès supplémentaires.

#### Protéger les données sensibles connues

Si vous avez déjà identifié les données devant être protégées, vous pouvez construire votre configuration Data Access Control autour de ces données spécifiques. Cela garantit que les données non sensibles restent généralement accessibles à vos utilisateurs, ce qui leur permet de collaborer et de comprendre les problèmes ou incidents en cours.

Par exemple, si vous avez une seule application instrumentée avec le Real User Monitoring (RUM) et qui capture des données sensibles saisies par les utilisateurs, envisagez de créer un ensemble de données restreint uniquement pour cette application :
* **Nom de l'ensemble de données :** Données RUM restreintes
* **Sélectionner les données à inclure dans cet ensemble de données :**
    * Type de télémétrie : RUM
        * Filtres : `@application.id:<rum-app-id>`
* **Autoriser l'accès :**
    * Équipes ou rôles des utilisateurs pouvant voir ces données RUM

Cet exemple de configuration permettrait de protéger les données RUM de cette application, tout en laissant les autres données de cette application accessibles aux utilisateurs existants de votre organisation.

#### Protéger toutes les données d'un service

Si vous souhaitez plutôt protéger les données d'un service spécifique, vous pouvez construire votre configuration Data Access Control autour du tag `service:`.

Par exemple, si vous avez un service `NewService` instrumenté avec Real User Monitoring (RUM) et collectant des données sensibles saisies par les utilisateurs, envisagez de créer un ensemble de données restreint uniquement pour cette application :

* **Nom de l'ensemble de données :** Données restreintes de NewService
* **Sélectionner les données à inclure dans cet ensemble de données :**
    * Type de télémétrie : RUM
        * Filtres : `@service:NewService`
    * Type de télémétrie : Métriques
        * Filtres : `@service:NewService`
    * Type de télémétrie : APM
        * Filtres : `@service:NewService`
    * Type de télémétrie : Logs
        * Filtres : `@service:NewService`
* **Autoriser l'accès :**
    * Équipe propriétaire du service

Cet exemple de configuration protège toutes les données prises en charge provenant de `NewService`.

### Équipes et rôles

Le contrôle d'accès aux données permet d'accorder l'accès aux utilisateurs via les rôles ou les équipes Datadog. Lors de l'attribution des accès, tenez compte de votre configuration actuelle du contrôle d'accès et de votre stratégie d'accès. Si vous adoptez une approche basée sur les services et que vous avez déjà [personnalisé le Software Catalog][9], tirez parti du modèle de propriété des services en utilisant les équipes dans votre configuration du contrôle d'accès aux données.

**Remarque :** les équipes utilisées pour le contrôle d'accès aux données doivent être configurées de manière à ce que seuls les membres de l'équipe ou un administrateur puissent ajouter ou supprimer des utilisateurs, et non pas « N'importe qui dans l'organisation ».

## Application du contrôle d'accès

Les utilisateurs d'une organisation Datadog avec Data Access Control activé ne peuvent voir les résultats de requêtes que pour les données auxquelles ils ont accès, par exemple dans un dashboard, un explorateur ou via l'API. Un ensemble de données restreint supprime l'accès aux données définies dans cet ensemble pour les utilisateurs non autorisés, dans toutes les expériences et points d'entrée Datadog.

### Explorers de données

Lors de l'exploration de Datadog avec des restrictions activées, les utilisateurs sans autorisation peuvent toujours parcourir la liste des noms de ressources (applications ou métriques), mais ils ne peuvent pas voir les résultats de requêtes, les tags principaux ni les détails de facettes restreints par les ensembles de données. Par exemple, une requête sur une métrique contenant des données restreintes renvoie un graphique vide, donnant l'impression que la requête ne correspond à aucune donnée.

### Dashboards et notebooks

Comme lors de l'exploration des données dans un explorateur tel que le RUM Explorer ou le Metrics Explorer, l'affichage des données dans des dashboards au sein d'une organisation ayant activé les ensembles de données restreints ne montre que les données auxquelles l'utilisateur a accès. Étant donné que les dashboards sont des objets partagés pouvant être consultés par plusieurs personnes, il est possible que deux utilisateurs ayant des accès différents consultent le même dashboard ou carnet en même temps et voient des données différentes.

**Remarque** : les personnes consultant des [dashboards partagés][12] verront toutes les données de télémétrie affichées dans le dashboard, conformément aux autorisations du créateur. Veillez à vérifier le contenu de votre dashboard avant de le partager afin de vous assurer qu'aucune donnée sensible ou confidentielle n'y figure.

### API

Lors de requêtes de données via les API de Datadog avec les restrictions activées, les utilisateurs sans autorisation **ne** voient **pas** les résultats des requêtes qui ont été restreints par des ensembles de données restreints.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/teams/
[2]: /fr/account_management/rbac/?tab=datadogapplication#role-based-access-control
[3]: /fr/account_management/rbac/
[4]: /fr/getting_started/tagging/
[5]: /fr/account_management/rbac/permissions/#access-management
[6]: https://app.datadoghq.com/organization-settings/
[7]: https://app.datadoghq.com/organization-settings/data-access-controls/
[8]: /fr/data_security/
[9]: /fr/software_catalog/customize/
[10]: /fr/account_management/rbac/data_access/#supported-telemetry
[11]: /fr/logs/guide/logs-rbac/?tab=ui#restrict-access-to-logs
[12]: /fr/dashboards/sharing/shared_dashboards/