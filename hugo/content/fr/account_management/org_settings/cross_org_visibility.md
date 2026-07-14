---
algolia:
  tags:
  - cross org
  - cross-org
  - cross organization
description: Partagez des données et effectuez des requêtes entre différentes organisations
  d'un même compte.
title: Visibilité entre organisations
---

## Présentation

Certaines entreprises utilisent plusieurs [organisations][1] Datadog pour séparer les données à des fins de conformité ou pour d'autres raisons.

La visibilité inter-organisations permet aux clients de partager des données entre différentes organisations au sein d'un même compte, et d'afficher en un seul endroit des informations provenant de plusieurs organisations.

Ce document explique : 
- Ce que [permet](#fonctionnalites) la visibilité inter-organisations
- Comment [partager](#creer-une-connexion) des données entre vos organisations
- Comment créer un [widget de dashboard ou de notebook(#creer-un-widget-avec-des-donnees-inter-organisations) avec des données provenant de vos autres organisations

## Fonctionnalités

### Connexion d'organisation

Une organisation _source_ expose des données à une organisation _de destination_ via une _connexion d'organisation_. Une organisation source peut avoir plusieurs destinations, et une organisation de destination peut avoir plusieurs sources.

Les limitations suivantes s'appliquent aux connexions d'organisation :
- Les organisations source et de destination doivent appartenir au même [compte][1]
- Les organisations source et de destination doivent appartenir au même [site][11].
- Une organisation peut partager avec jusqu'à 5 autres organisations.

**Remarque :** une fois la connexion établie, l'organisation de destination peut interroger les données de l'organisation source de la même manière qu'elle interroge ses propres données. Cela signifie que les données de l'organisation source, y compris les données sensibles, peuvent être interrogées et affichées selon les paramètres de contrôle d'accès et autres réglages de l'_organisation de destination_. Cela peut inclure, par exemple, la capacité de l'organisation de destination à créer des [dashboards publics][10] à partir des données de l'organisation source, même si les paramètres de l'organisation source ne permettent pas elle-même la création de dashboards publics.

Une fois la connexion d'organisation configurée, les données exposées restent stockées dans l'organisation source et ne sont pas déplacées vers l'organisation de destination. L'organisation de destination interroge les données directement depuis la source. Les connexions ne dupliquent pas les données et n'entraînent pas de frais supplémentaires. L'organisation de destination peut interroger les données source sur n'importe quelle période prise en charge par ces données, y compris pour des dates antérieures à la création de la connexion. Si vous supprimez la connexion, l'organisation de destination ne pourra plus accéder aux données de l'organisation source et toute requête ou tout dashboard créé à partir de ces données pourra ne plus fonctionner.

### Scope

La visibilité inter-organisations prend en charge les données de télémétrie suivantes dans les [widgets de dashboard et de notebook][2] :
* Métriques (tous types pris en charge, y compris les [métriques custom][3], les [métriques de trace][4] et les [métriques générées à partir des logs][5])
* Logs
* Pipelines CI Visibility
* Tests Test Optimization

## Configurer les connexions

### Lister les connexions

Pour parcourir les connexions, accédez à la [page de visibilité inter-organisations][6] dans les paramètres d'organisation. Le tableau répertorie l'ensemble de vos connexions inter-organisations.

### Établir une connexion

Créer une connexion inter-organisations permet d'interroger des métriques de l'organisation source depuis l'organisation de destination.

1. Assurez-vous d'être connecté à l'organisation _source_ contenant les données que vous souhaitez exposer.
1. Sur la [page de visibilité inter-organisations][6], cliquez sur **New Connection**. La boîte de dialogue **New Connection** s'affiche.
1. Dans le menu déroulant, sélectionnez l'organisation _de destination_ dans laquelle vous souhaitez voir les données.
1. Cliquez sur **Connect**.

### Mettre à jour une connexion

Mettre à jour une connexion inter-organisations existante permet de modifier les types de données partagés de l'organisation source vers l'organisation de destination.

1. Assurez-vous d'être connecté à l'organisation _source_ de la connexion existante.
1. Survolez la connexion que vous souhaitez mettre à jour. Une icône de crayon (**Edit**) apparaît à droite.
1. Cliquez sur l'icône de crayon (**Edit**) de la connexion que vous souhaitez mettre à jour. La boîte de dialogue **Edit Connection** s'affiche.
1. Cochez les cases correspondant aux types de données que vous souhaitez inclure.
1. Cliquez sur **Save**.

### Supprimer une connexion

Supprimer une connexion désactive l'interrogation inter-organisations des métriques de l'organisation source depuis l'organisation de destination.

1. Accédez à la [page de visibilité inter-organisations][6] dans les paramètres d'organisation.
1. Survolez la connexion que vous souhaitez supprimer. Une icône de corbeille (**Delete**) apparaît à droite.
1. Cliquez sur l'icône de corbeille (**Delete**) de la connexion que vous souhaitez supprimer. L'invite **Are you sure?** s'affiche.
1. Cliquez sur **Delete**.

### Dans l'API

Pour configurer des connexions à l'aide de l'API, consultez l'[API de connexions inter-organisations][7].

## Créer un widget avec des données inter-organisations

Les [widgets de dashboard et de notebook][2] inter-organisations sont disponibles pour les organisations Datadog qui sont une organisation _de destination_ d'au moins une [connexion](#configurer-des-connexions).

Chaque requête dans un widget peut afficher des données d'une seule organisation. Vous pouvez combiner plusieurs requêtes dans une formule inter-organisations.

### Dans l'interface utilisateur

Les widgets de dashboard et de notebook permettent de créer des requêtes inter-organisations lorsque les conditions suivantes sont remplies :

- La visibilité inter-organisationnelle est activée dans votre organisation
- Au moins une connexion existe dans laquelle l'organisation actuelle est l'organisation de destination

Si les conditions précédentes sont remplies, un menu déroulant de sélection d'organisation apparaît entre les menus déroulants du type de données et du nom de la métrique. Utilisez ce menu pour choisir une organisation source pour votre requête.

La capture d'écran suivante montre un exemple de requête inter-organisations avec formule. Le widget affiche le nombre d'événements ingérés par service. Pour obtenir le nombre total d'événements, la formule additionne les données de l'organisation A (dans la requête **a**) et de l'organisation B (dans la requête **b**).

{{< img src="account_management/org_settings/cross_org_visibility/cross_org_query-1.png" alt="Capture d'écran montrant la configuration d'un widget de dashboard avec une requête inter-organisations" >}}

### Dans l'API

<div class="alert alert-info">
Le <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs">provider Terraform Datadog</a> ne prend pas en charge la création de connexions inter-organisations. Vous pouvez cependant gérer un dashboard contenant des widgets avec des requêtes inter-organisations via Terraform en exportant le dashboard au format JSON.
</div>

Vous pouvez définir des requêtes inter-organisations dans l'endpoint suivant :
- [Série temporelle][8]

Lorsque vous définissez un widget dans l'API Dashboard, utilisez le paramètre `cross_org_uuids` dans la charge utile JSON de définition du widget pour identifier l'organisation source dans une requête inter-organisations.

Le paramètre `cross_org_uuids` est facultatif. Si vous omettez `cross_org_uuids`, la requête s'exécute sur la même organisation que celle dans laquelle vous avez défini le widget.

### Exemple de définition d'un widget JSON

{{< highlight json "hl_lines=21 27" >}}
{
    "viz": "timeseries",
    "requests": [
        {
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            },
            "type": "line",
            "formulas": [
                {
                    "formula": "query2 + query1"
                }
            ],
            "queries": [
                {
                    "name": "query2",
                    "data_source": "metrics",
                    "query": "sum:datadog.estimated_usage.events.ingested_events{env:prod} by {service}.as_count()",
                    "cross_org_uuids": ["6434abde-xxxx-yyyy-zzzz-da7ad0900001"]
                },
                {
                    "name": "query1",
                    "data_source": "metrics",
                    "query": "sum:datadog.estimated_usage.events.ingested_events{env:prod} by {service}.as_count()",
                    "cross_org_uuids": ["74edde28-xxxx-yyyy-zzzz-da7ad0900001"]
                }
            ],
            "response_format": "timeseries"
        }
    ]
}
{{< /highlight >}}

Notez le paramètre `cross_org_uuids` dans la charge utile de la définition du widget JSON. 
- Ce paramètre est facultatif. S'il est omis, la requête est exécutée sur l'organisation sur laquelle le widget est défini.
- Utilisez l'identifiant de l'organisation, que vous pouvez récupérer à partir de [l'endpoint Organisations][9], pour identifier l'organisation sur laquelle la requête est exécutée.
- Bien que ce paramètre accepte un tableau, celui-ci ne doit contenir qu'un seul élément. L'ajout de plusieurs éléments au tableau `cross_org_uuids` entraîne une erreur 400.

## Autorisations
Par défaut, seuls les utilisateurs attachés à des rôles avec l'autorisation _Org Connection Read_ peuvent voir la liste des connexions inter-organisations. Les utilisateurs rattachés à des rôles avec l'autorisation _Org Connection Write_ peuvent créer et supprimer des connexions inter-organisations. 

### Contrôles d'accès granulaires
Utilisez les [contrôles d'accès granulaires][12] pour limiter les équipes, rôles ou utilisateurs pouvant modifier ou interroger une connexion inter-organisations. Ces contrôles d'accès régissent :
- Depuis l'organisation source : qui peut modifier la connexion.
- Depuis l'organisation de destination : qui peut voir les données partagées et qui peut modifier la connexion.

Les connexions établies depuis l'organisation source héritent des autorisations d'accès aux données du créateur de la connexion. Si le créateur est restreint dans l'accès à certaines données par le [contrôle d'accès aux données][13] ou les [requêtes de restriction de logs][14], ces données ne sont pas accessibles depuis l'organisation de destination.

**Remarque :** les connexions créées depuis des organisations compatibles HIPAA peuvent permettre le partage d'informations de santé protégées (PHI) vers des organisations de destination. Les clients sont responsables de toute donnée sensible transférée, y compris les PHI.

1. Accédez à la [page de visibilité inter-organisations][6] dans les paramètres d'organisation.
1. Survolez la connexion inter-organisations pour laquelle vous souhaitez définir des autorisations granulaires. Les icônes **Permissions** et **Delete** apparaissent à droite.
1. Cliquez sur l'icône du cadenas (**Permissions**).
1. Sélectionnez **Restrict Access**.
1. La boîte de dialogue affiche alors les membres de votre organisation disposant de l'autorisation **Viewer** par défaut.
1. Utilisez le menu déroulant pour sélectionner un ou plusieurs rôles, équipes ou utilisateurs autorisés à modifier la connexion inter-organisations.
1. Cliquez sur **Add**.
1. La boîte de dialogue indique alors que le rôle sélectionné possède l'autorisation **Editor**.
1. Cliquez sur **Save**.

**Remarque :** pour conserver votre accès en modification à la connexion inter-organisations, le système exige que vous incluiez au moins un rôle ou une équipe dont vous êtes membre avant d'enregistrer.

Pour rétablir un accès général à une connexion inter-organisations avec accès restreint, suivez les étapes ci-dessous :

1. Sur la page de visibilité inter-organisations, survolez la connexion inter-organisations pour laquelle vous souhaitez rétablir un accès général. Les icônes **Permissions** et **Delete** apparaissent à droite.
1. Cliquez sur l'icône en forme de cadenas (**Permissions**).
1. Cliquez sur **Restore Full Access**.
1. Cliquez sur **Save**.

[1]: /fr/account_management/multi_organization/
[2]: /fr/dashboards/widgets
[3]: /fr/metrics/custom_metrics/#overview
[4]: /fr/tracing/metrics/metrics_namespace/
[5]: /fr/logs/log_configuration/logs_to_metrics/
[6]: https://app.datadoghq.com/organization-settings/cross-org-visibility
[7]: /fr/account_management/org_settings/cross_org_visibility_api
[8]: /fr/api/latest/metrics/#query-timeseries-data-across-multiple-products
[9]: /fr/api/latest/organizations/#list-your-managed-organizations
[10]: /fr/dashboards/sharing/shared_dashboards/#public-shared-dashboards
[11]: /fr/getting_started/site
[12]: /fr/account_management/rbac/granular_access
[13]: /fr/account_management/rbac/data_access/
[14]: /fr/logs/guide/logs-rbac-permissions/?tab=ui#create-a-restriction-query