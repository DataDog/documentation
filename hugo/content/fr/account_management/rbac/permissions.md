---
algolia:
  category: Documentation
  rank: 80
  subcategory: Datadog Role Permissions
aliases:
- /fr/account_management/faq/managing-global-role-permissions
description: Référence complète des autorisations Datadog, incluant les rôles gérés,
  les rôles personnalisés, les autorisations sensibles et la liste des autorisations.
disable_toc: true
further_reading:
- link: /account_management/rbac/
  tag: Documentation
  text: Créer, mettre à jour et supprimer un rôle
- link: /api/v2/roles/#list-permissions
  tag: Documentation
  text: Gérer vos autorisations avec l'API Permission
title: Autorisations des rôles Datadog
---
## Autorisations {#permissions}

Les autorisations définissent le type d'accès dont dispose un utilisateur pour une ressource donnée. Généralement, les autorisations donnent à un utilisateur le droit de lire, modifier ou supprimer un objet. Les autorisations sous-tendent les droits d'accès de tous les rôles, y compris les trois rôles gérés et les rôles personnalisés.

### Autorisations sensibles {#sensitive-permissions}

Certaines autorisations Datadog donnent accès à des fonctionnalités plus privilégiées dont il est important d'avoir connaissance, telles que :

- Accès pour modifier les paramètres de l'organisation
- Accès pour lire des données potentiellement sensibles
- Accès pour effectuer des opérations privilégiées

Les autorisations sensibles sont signalées dans les interfaces Rôles et autorisations pour indiquer qu'elles peuvent nécessiter une attention accrue. En guise de bonne pratique, les administrateurs configurant des rôles doivent accorder une attention particulière à ces autorisations et confirmer lesquelles de ces autorisations sont attribuées à leurs rôles et utilisateurs.

### Autorisations en mode aperçu {#preview-mode-permissions}

Certaines autorisations apparaissent en « mode aperçu » avant d'être pleinement appliquées. Durant cette période :

- Les autorisations en aperçu sont marquées dans l'application avec un badge « Aperçu »
- Elles ne restreignent pas l'accès tant que la période d'aperçu n'est pas terminée
- L'aperçu dure généralement 2 à 4 semaines avant que l'application des autorisations ne commence
- Les administrateurs doivent configurer les rôles de manière appropriée durant cette période

Le mode aperçu donne aux administrateurs de votre organisation la possibilité d'opter pour certaines nouvelles autorisations, afin qu'ils puissent éviter de perdre l'accès à des ressources qui n'étaient auparavant pas restreintes. Les notes de version associées à chaque autorisation en mode aperçu indiquent quand l'autorisation est créée et quand elle sera appliquée. Bien que ces autorisations ne restreignent pas l'accès pendant la prévisualisation, Datadog recommande de mettre à jour les configurations de rôle avant qu'elles ne soient appliquées afin d'éviter toute interruption.

### Autorisations restreintes {#restricted-permissions}

Les autorisations restreintes prennent en charge des parties essentielles de l'expérience Datadog et sont automatiquement attribuées à chaque rôle par défaut. La suppression de ces autorisations par défaut peut affecter la façon dont les utilisateurs interagissent avec Datadog. Par exemple, les utilisateurs pourraient être dans l'incapacité de consulter ou de modifier leur profil, ou d'accéder aux fonctionnalités standard de la plateforme.

Les autorisations suivantes peuvent être supprimées directement dans l'interface utilisateur. Pour les exclure lors de l'utilisation des API [Créer un rôle][4] et [Mettre à jour un rôle][5], définissez `default_permissions_opt_out: true` dans le corps de la requête :

| Autorisation | Identifiant |
|---|---|
| Lecture des dashboards | `dashboards_read` |
| Lecture des monitors | `monitors_read` |
| Lecture APM | `apm_read` |
| Lecture des incidents | `incident_read` |
| Lecture des applications RUM | `rum_apps_read` |
| Lecture des Notebooks | `notebooks_read` |
| Lecture des SLOs | `slos_read` |
| Lecture de CI Visibility | `ci_visibility_read` |
| Lecture de CD Visibility | `cd_visibility_read` |
| Lecture de Vulnerability Management | `appsec_vm_read` |

Exemple de requête pour créer un rôle sans autorisations restreintes :

```sh
curl -X POST "https://api.datadoghq.com/api/v2/roles" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "attributes": {
      "name": "developers",
      "default_permissions_opt_out": true
    },
    "type": "roles"
  }
}'
```

Les autorisations suivantes ont longtemps été implicitement attribuées à chaque rôle, mais n'étaient pas auparavant exposées pour une configuration via l'interface utilisateur ou l'API. Désormais, vous pouvez activer [Rôles d'accès minimal (aperçu)](#minimal-access-roles-preview) pour rendre ces autorisations supprimables et les exclure par défaut lorsque `default_permissions_opt_out: true` est défini :

| Autorisation | Identifiant |
|---|---|
| Fonctionnalités intégrées | `built_in_features` |
| Lecture des métriques | `metrics_read` |
| Requête de séries temporelles | `timeseries_query` |
| Lecture des événements | `events_read` |
| Lecture des hosts | `hosts_read` |
| Lecture du profil utilisateur | `user_self_profile_read` |
| Écriture du profil utilisateur | `user_self_profile_write` |
| Lecture des paramètres d'analyse statique | `static_analysis_settings_read` |
| Lecture de la Application Security Management Vulnerability Management Library | `appsec_vm_library_read` |

## Rôles {#roles}

### Rôles gérés {#managed-roles}

Par défaut, les utilisateurs existants sont associés à l'un des trois rôles gérés :

- Rôle Datadog Admin
- Rôle standard Datadog
- Rôle Datadog Read Only

Tous les utilisateurs disposant de l'un de ces rôles peuvent lire les données, à l'exception des ressources [individuellement restreintes en lecture][1]. Les utilisateurs administrateurs et standard disposent d'autorisations d'écriture sur les ressources. Les utilisateurs administrateurs disposent d'autorisations de lecture et d'écriture supplémentaires pour les ressources sensibles relatives à la gestion des utilisateurs, à la gestion de l'organisation, à la facturation et à l'utilisation.

Les rôles gérés sont créés et maintenus par Datadog. Leurs autorisations peuvent être automatiquement mises à jour par Datadog à mesure que de nouvelles fonctionnalités sont ajoutées ou que les autorisations changent. Les utilisateurs ne peuvent pas modifier directement les rôles gérés, mais ils peuvent les cloner pour créer des [rôles personnalisés](#custom-roles) avec des autorisations spécifiques. Si nécessaire, les utilisateurs peuvent supprimer les rôles gérés de leur compte.

### Rôles personnalisés {#custom-roles}

Créez un rôle personnalisé pour combiner des autorisations dans de nouveaux rôles. Un rôle personnalisé vous donne la possibilité de définir un profil, par exemple un administrateur de facturation, puis d'attribuer les autorisations appropriées pour ce rôle. Après avoir créé un rôle, attribuez ou supprimez des autorisations pour ce rôle directement en [mettant à jour le rôle dans Datadog][2], ou via l'[API d'autorisation Datadog][3]. Vous pouvez également ajouter une autorisation à plusieurs rôles personnalisés à la fois en sélectionnant ces rôles sur la page Rôles et en cliquant sur {{< ui >}}Add Permission{{< /ui >}}.

Contrairement aux rôles gérés, les rôles personnalisés ne reçoivent pas de nouvelles autorisations lorsque Datadog lance de nouveaux produits et fonctionnalités, sauf s'ils sont configurés pour recevoir des mises à jour automatiques. Si les mises à jour automatiques sont désactivées, les rôles personnalisés ne reçoivent de nouvelles autorisations que pour maintenir la compatibilité lorsque Datadog lance une nouvelle autorisation qui limite l'accès à une fonctionnalité existante.

Pour configurer les mises à jour automatiques pour les rôles personnalisés :

1. Accédez à la page Paramètres de l'organisation et cliquez sur l'onglet {{< ui >}}Roles{{< /ui >}}.
2. Cliquez sur le rôle que vous souhaitez mettre à jour et cliquez sur {{< ui >}}Edit Role{{< /ui >}}.
3. Sous {{< ui >}}Automatically Receives Permissions{{< /ui >}}, choisissez une option dans le menu déroulant : Aucun, Rôle Datadog Read Only, Rôle Datadog standard ou Rôle Datadog Admin.

Si le rôle personnalisé est configuré pour recevoir des mises à jour automatiques, votre rôle personnalisé reçoit toutes les nouvelles autorisations dès qu'elles sont publiées pour le modèle de rôle sélectionné. Aucune autorisation déjà publiée n'est ajoutée. Vous pouvez ajouter ou supprimer n'importe quelle autorisation de ce rôle et continuer à recevoir des mises à jour automatiques.

**Remarque** : Lors de l'ajout d'un nouveau rôle personnalisé à un utilisateur, assurez-vous de supprimer le rôle Datadog géré associé à cet utilisateur pour appliquer strictement les autorisations du nouveau rôle.

### Rôles d'accès minimal (aperçu) {#minimal-access-roles-preview}

<div class="alert alert-info">Les rôles d'accès minimal sont en mode aperçu. Contactez votre représentant Datadog pour demander l'accès.</div>

Les rôles d'accès minimal offrent à votre organisation un contrôle plus granulaire sur ce que les utilisateurs peuvent faire dans Datadog.

Par défaut, chaque rôle inclut un ensemble fondamental de [autorisations restreintes](#restricted-permissions) qui ne peuvent pas être supprimées car elles prennent en charge les fonctionnalités principales dans Datadog. L'activation des rôles d'accès minimal rend ces autorisations supprimables dans les rôles personnalisés de toute votre organisation. Les utilisateurs disposant uniquement d'un rôle d'accès minimal peuvent rencontrer des fonctionnalités limitées ou des erreurs inattendues sur certaines pages de Datadog.

Une fois activées, les autorisations suivantes deviennent supprimables, vous permettant de créer des rôles restreints pour des workflows spécialisés :

| Autorisation | Identifiant |
|---|---|
| Fonctionnalités intégrées | `built_in_features` |
| Lecture des métriques | `metrics_read` |
| Requête de séries temporelles | `timeseries_query` |
| Lecture des événements | `events_read` |
| Lecture des hosts | `hosts_read` |
| Lecture du profil utilisateur | `user_self_profile_read` |
| Écriture du profil utilisateur | `user_self_profile_write` |
| Lecture des paramètres d'analyse statique | `static_analysis_settings_read` |
| Lecture de la Application Security Management Vulnerability Management Library | `appsec_vm_library_read` |

Si vous utilisez `default_permissions_opt_out` dans [des ressources de rôle Terraform][6] ou des appels d'API directs, mettez à jour votre automatisation pour prendre en compte ces autorisations supplémentaires avant d'activer les rôles d'accès minimal.

## Liste des autorisations {#permissions-list}

Le tableau suivant répertorie le nom, la description et le rôle par défaut de toutes les autorisations disponibles dans Datadog. Chaque type d'actif dispose d'autorisations de lecture et d'écriture correspondantes.

Chaque rôle géré hérite de toutes les autorisations des rôles moins puissants. Par conséquent, le rôle Datadog Standard possède toutes les autorisations listées dans le tableau avec le rôle Datadog Read Only par défaut. De plus, le rôle Datadog Admin contient toutes les autorisations du rôle Datadog Standard et du rôle Datadog Read Only.

{{% permissions %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration est une marque de commerce de Datadog, Inc.

[1]: /fr/account_management/rbac/granular_access
[2]: /fr/account_management/users/#edit-a-user-s-roles
[3]: /fr/api/latest/roles/#list-permissions
[4]: /fr/api/latest/roles/#create-role
[5]: /fr/api/latest/roles/#update-a-role
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/role