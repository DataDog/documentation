---
title: Contrôle d'accès à base de rôles (RBAC) pour Log Management
kind: documentation
private: true
beta: true
further_reading:
  - link: account_management/rbac/role_api
    tag: Documentation
    text: Gérer des rôles et des autorisations avec l'API Role
---
<div class="alert alert-warning">
Cette fonctionnalité est actuellement en version bêta privée. Demandez à votre représentant commercial ou responsable du succès client d'activer cette fonctionnalité.
</div>

## Rôles

Dans Log Management, vous pouvez préciser les utilisateurs qui peuvent lire certaines données de logs, ainsi que les utilisateurs qui peuvent gérer les ressources liées aux logs, comme les pipelines, les index, les archives, etc.

Les [rôles par défaut][1] disposent des fonctionnalités de gestion de logs suivantes

| Rôle                   | Accès par défaut                                                                                                                          |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| Admin Datadog          | Peut interroger toutes les données de log, et créer ou modifier toutes les ressources liées aux logs d'un compte Datadog.                                             |
| Rôle standard Datadog  | Peut interroger toutes les données de log, et créer ou modifier toutes les ressources liées aux logs d'un compte Datadog. Modification du profil autorisée pour restreindre les autorisations. |
| Rôle Read-Only Datadog | Peut interroger toutes les données de log d'un compte Datadog. Modification du profil autorisée pour restreindre les autorisations.                                            |

## Autorisations de Log Management

Les autorisations suivantes peuvent être accordées afin de gérer l'accès en lecture pour les sous-ensembles de données des logs :

* **logs_read_index_data** : accorde un accès en lecture sur certains index de log. Cette autorisation peut être accordée à un rôle depuis [la page Processing Pipelines de l'application Datadog][2] en modifiant un index et en ajoutant un rôle au champ « Grant access of this index's content to » (voir la capture d'écran ci-dessous).

{{< img src="account_management/rbac/logs_read_index_data.png" alt="Accorder l'accès en lecture pour les index à des rôles spécifiques" responsive="true" style="width:75%;" >}}

* **logs_live_tail** : permet à un rôle d'utiliser la fonctionnalité Live Tail. Cette autorisation peut être accordée ou révoquée avec [l'API Role][3].

Les autorisations suivantes peuvent être accordées pour gérer l'accès en écriture pour différentes ressources de compte liées aux logs :

* **logs_modify_indexes** : permet à un rôle de modifier les index de log. Il peut notamment définir des filtres d'inclusion pour les logs à intégrer à un index, ce qui limite les rôles ayant accès à cet index (logs_read_index_data) et les rôles pouvant modifier les filtres d'exclusion pour cet index (logs_write_exclusion_filters). Cette autorisation peut également être accordée ou révoquée avec [l'API Role][3]. **Remarque :** cette autorisation accorde également un accès en lecture pour tous les index de log et des autorisations d'écriture pour tous les filtres d'exclusion d'index, puisque les rôles qui peuvent modifier les index peuvent également s'accorder ces autorisations supplémentaires. 

* **logs_write_exclusion_filters** : permet à un rôle de créer ou de modifier des fichiers d'exclusion dans un index. Cette autorisation peut être accordée à un rôle depuis [la page Processing Pipelines Datadog][2] en modifiant un index et en ajoutant un rôle au champ « Grant editing Exclusion Filters of this index to » (voir la capture d'écran ci-dessous).

{{< img src="account_management/rbac/logs_write_exclusion_filters.png" alt="Accorder l'accès en écriture pour les filtres d'exclusion d'index à des rôles spécifiques" responsive="true" style="width:75%;" >}}

* **logs_write_pipelines** : permet à un rôle de créer et de modifier des pipelines de traitement de logs. Il peut notamment définir des filtres de correspondance pour sélectionner les logs qui doivent intégrer le pipeline de traitement, définir le nom du pipeline et limiter les rôles ayant un accès en écriture pour les processeurs au sein de ce pipeline (`logs_write_processors`). Cette autorisation peut être accordée ou révoquée avec [l'API Role][3].

* **logs_write_processors** : permet à un rôle de créer ou de modifier des processeurs dans un pipeline de traitement. Cette autorisation peut être accordée à un rôle depuis [la page Processing Pipelines de l'application Datadog][2] en modifiant un pipeline de traitement et en ajoutant un rôle au champ « Grant editing Processors of this index to » (voir la capture d'écran ci-dessous).

{{< img src="account_management/rbac/logs_write_processors.png" alt="Accorder l'accès en écriture pour les processeurs à des rôles spécifiques" responsive="true" style="width:75%;" >}}

* **logs_write_archives** : permet de créer ou de modifier des archives de log. Cette autorisation peut être accordée ou révoquée avec [l'API Role][3].

## Débuter avec RBAC

Par défaut, les utilisateurs existants sont déjà associés à l'un des trois rôles Datadog par défaut : Admin, Standard ou Read-Only. Tous les utilisateurs sont donc déjà autorisés à lire l'ensemble des logs. Les utilisateurs avec le rôle Admin ou Standard disposent quant à eux d'un droit d'écriture sur les ressources de compte liées aux logs.

Pour commencer à limiter ces autorisations pour les utilisateurs existants, créez des rôles personnalisés et attribuez-les à des utilisateurs existants. Vous pouvez ensuite effectuer une ou plusieurs actions suivantes afin de limiter leurs autorisations à celles des rôles personnalisés :

* Retirez les utilisateurs des rôles Standard ou Read-Only Datadog via l'[API Role][3].

* Retirez les autorisations des rôles Standard et Read-Only Datadog via l'[API Role][3].

* Retirez les rôles Standard ou Read-Only Datadog via l'[API Role][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/account_management/rbac/#out-of-the-box-roles
[2]: https://app.datadoghq.com/logs/pipelines
[3]: /fr/account_management/rbac/role_api