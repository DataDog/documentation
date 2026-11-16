---
algolia:
  tags:
  - cross org
  - cross-org
  - cross organization
description: Partagez des données et effectuez des requêtes entre différentes organisations
  au sein du même compte.
title: Visibilité entre organisations
---
## Présentation {#overview}

Certaines entreprises s'appuient sur plusieurs [organisations][1] Datadog pour séparer leurs données pour des raisons de conformité ou autres.

La visibilité inter-organisation permet aux clients de partager des données entre différentes organisations au sein du même compte et d'afficher des informations provenant de plusieurs organisations au même endroit.

Ce document explique :
- Ce que la visibilité inter-organisation [permet](#capabilities)
- Comment [partager](#create-a-connection) des données entre vos organisations
- Comment créer un [widget de Dashboard et de notebook](#create-a-widget-with-cross-organization-data) ou une [requête API](#in-the-api-1) avec des données provenant de vos autres organisations

## Fonctionnalités {#capabilities}

### Connexion entre organisations {#organization-connection}

Une organisation _source_ expose des données à une organisation de _destination_ via une _connexion entre organisations_. Une organisation source peut avoir plusieurs destinations, et une organisation de destination peut avoir plusieurs sources.

Les limitations suivantes s'appliquent aux connexions entre organisations :
- Les organisations source et de destination doivent se trouver dans le même [compte][1]
- Les organisations source et de destination doivent se trouver sur le même [site][11].
- Les organisations Pro peuvent partager des données avec un maximum de 5 autres organisations. Les organisations Enterprise n'ont aucune limite. Les organisations bénéficiant d'autres plans, tels que les plans Free, Trial et Startup, ne peuvent pas partager de données avec d'autres organisations.

**Remarque** : une fois la connexion établie, l'organisation de destination peut interroger les données de l'organisation source de la même manière qu'elle interroge ses propres données. Cela signifie que les données de l'organisation source, y compris les données sensibles, peuvent être interrogées et affichées conformément aux paramètres de contrôle d'accès et aux autres paramètres de l'_organisation de destination_. Cela peut inclure, par exemple, la capacité de l'organisation de destination à créer des [Dashboards publics][10] en utilisant les données de l'organisation source, même si les propres paramètres de l'organisation source n'autorisent pas la création de Dashboards publics.

Une fois que vous avez configuré une connexion entre organisations, les données exposées restent stockées dans l'organisation source et ne sont pas transférées vers la destination. Au lieu de cela, l'organisation de destination interroge les données de l'organisation source. Les connexions ne dupliquent pas les données et n'entraînent pas de frais supplémentaires. L'organisation de destination peut interroger les données sources à partir de n'importe quelle plage temporelle prise en charge par les données sources, y compris avant la date de création de la connexion. Si vous supprimez la connexion, la destination ne peut plus accéder aux données de la source et les requêtes ou Dashboards créés à partir des données de l'organisation source peuvent ne plus fonctionner.

### Périmètre {#scope}

La visibilité inter-organisation prend en charge la télémétrie suivante dans les [widgets de Dashboards et de notebook][2] :
* Métriques (tous types pris en charge, y compris les [Custom Metrics][3], les [métriques de trace][4] et les [métriques générées à partir des logs][5])
* Logs
* Pipelines CI Visibility
* Tests Test Optimization
* Audit Trail

## Configurer les connexions {#configure-connections}

### Lister les connexions {#list-connections}

Pour parcourir les connexions, accédez à la [page de visibilité inter-organisation][6] dans Organization Settings. Le tableau répertorie toutes vos connexions inter-organisation.

### Créer une connexion {#create-a-connection}

La création d'une connexion inter-organisation vous permet d'interroger des métriques de l'organisation source dans l'organisation de destination.

<div class="alert alert-info">Datadog recommande d'utiliser un <a href="/account_management/org_settings/service_accounts/">compte de service</a> pour créer et gérer les connexions inter-organisation. Les connexions sont liées au compte de leur créateur : si le compte du créateur est désactivé, la connexion est supprimée, ce qui peut interrompre le flux de données. Les comptes de service ne sont pas liés à des utilisateurs individuels et permettent d'éviter ce risque opérationnel. Les clés d'application de compte de service peuvent également être utilisées avec <a href="/account_management/org_settings/cross_org_visibility_api/">Cross-Org Connections API</a> pour créer et gérer les connexions par programmation.</div>

1. Assurez-vous d'être connecté à l'organisation _source_ qui contient les données que vous souhaitez exposer.
1. Sur la [page de visibilité inter-organisation][6], cliquez sur {{< ui >}}New Connection{{< /ui >}}. La boîte de dialogue {{< ui >}}New Connection{{< /ui >}} s'affiche.
1. Dans le menu déroulant, sélectionnez l'organisation de _destination_ où vous souhaitez voir les données.
1. Cliquez sur {{< ui >}}Connect{{< /ui >}}.

### Mettre à jour une connexion {#update-a-connection}

La mise à jour d'une connexion inter-organisation existante vous permet de modifier les types de données partagés depuis l'organisation source vers l'organisation de destination.

1. Assurez-vous d'être connecté à l'organisation _source_ de la connexion existante.
1. Passez le curseur sur la connexion que vous souhaitez mettre à jour. Une icône de crayon ({{< ui >}}Edit{{< /ui >}}) s'affiche sur la droite.
1. Cliquez sur l'icône de crayon ({{< ui >}}Edit{{< /ui >}}) sur la connexion que vous souhaitez mettre à jour. La boîte de dialogue {{< ui >}}Edit Connection{{< /ui >}} s'affiche.
1. Cochez les cases correspondant aux types de données que vous souhaitez inclure.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

### Supprimer une connexion {#delete-a-connection}

La suppression d'une connexion désactive l'interrogation inter-organisation des métriques de l'organisation source depuis l'organisation de destination.

1. Accédez à la [page de visibilité inter-organisation][6] dans Organization Settings.
1. Passez le curseur sur la connexion que vous souhaitez supprimer. Une icône de corbeille ({{< ui >}}Delete{{< /ui >}}) s'affiche sur la droite.
1. Cliquez sur l'icône de corbeille ({{< ui >}}Delete{{< /ui >}}) sur la connexion que vous souhaitez supprimer. L'invite {{< ui >}}Are you sure?{{< /ui >}} s'affiche.
1. Cliquez sur {{< ui >}}Delete{{< /ui >}}.

### Dans l'API {#in-the-api}

Pour configurer des connexions à l'aide de l'API, consultez l'[API de connexions inter-organisations][7].

## Créer un widget avec des données inter-organisations {#create-a-widget-with-cross-organization-data}

Les [widgets de Dashboard et de notebook][2] inter-organisations sont disponibles pour les organisations Datadog qui sont des organisations de _destination_ pour au moins une [connexion](#configure-connections).

Chaque requête dans un widget peut afficher des données provenant d'une seule organisation. Vous pouvez combiner des requêtes dans une requête de formule inter-organisation.

### Dans l'interface utilisateur {#in-the-ui}

Les widgets de Dashboard et de notebook vous permettent de créer des requêtes inter-organisations lorsque les conditions suivantes sont remplies :

- Vous avez activé la visibilité inter-organisation dans votre organisation
- Il existe au moins une connexion pour laquelle l'organisation actuelle est l'organisation de destination

Si les conditions précédentes sont remplies, un sélecteur déroulant d'organisation apparaît entre les menus déroulants pour le type de données et le nom de la métrique. Utilisez le sélecteur déroulant d'organisation pour choisir une organisation source pour votre requête.

La capture d'écran suivante montre un exemple de requête de formule inter-organisation. Le widget représente graphiquement le nombre d'événements ingérés par service. Pour obtenir le nombre total d'événements, la requête de formule inter-organisation additionne les données de l'organisation A (dans la requête **a**) et de l'organisation B (dans la requête **b**).

{{< img src="account_management/org_settings/cross_org_visibility/cross_org_query-1.png" alt="Capture d'écran montrant la configuration d'un widget de Dashboard avec une requête inter-organisations" >}}

### Dans l'API {#in-the-api-1}

<div class="alert alert-info">
Le <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs">Datadog Terraform Provider</a> ne prend pas en charge la création de connexions inter-organisations. Cependant, vous pouvez gérer un Dashboard contenant des widgets avec des requêtes inter-organisations via Terraform en exportant le Dashboard au format JSON.
</div>

Vous pouvez inclure des données inter-organisations dans le JSON des widgets de Dashboard et de notebook avec le champ `cross_org_uuids`. Le même champ est disponible dans les endpoints de requête de formule de Metrics API :
- [Interroger des données de séries temporelles sur plusieurs produits][8]
- [Interroger des données scalaires sur plusieurs produits][15]

Lorsque vous définissez un widget dans Dashboard API ou envoyez une requête de formule à Metrics API, utilisez le paramètre `cross_org_uuids` dans chaque objet de requête. Le paramètre identifie l'organisation source dans une requête inter-organisations.

Le paramètre `cross_org_uuids` est facultatif. Si vous omettez `cross_org_uuids`, la requête s'exécute sur la même organisation que celle dans laquelle vous avez défini le widget.

### Exemple de définition de widget JSON {#example-json-widget-definition}

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

Notez le paramètre `cross_org_uuids` dans la charge utile de définition du widget JSON.
- Ce paramètre est facultatif. S'il est omis, la requête s'exécute sur l'organisation sur laquelle le widget est défini.
- Utilisez l'identifiant de l'organisation, que vous pouvez récupérer à partir de l'[endpoint Organizations][9], pour identifier l'organisation sur laquelle la requête s'exécute.
- Bien que ce paramètre accepte un tableau, le tableau ne doit contenir qu'un seul élément. L'ajout de plusieurs éléments au tableau `cross_org_uuids` entraîne une erreur 400.

## Autorisations {#permissions}
Par défaut, seuls les utilisateurs associés à des rôles disposant de l'autorisation _Org Connection Read_ peuvent voir la liste des connexions inter-organisations. Les utilisateurs associés à des rôles disposant de l'autorisation _Org Connection Write_ peuvent créer et supprimer des connexions inter-organisations.

### Contrôles d'accès granulaires {#granular-access-controls}
Utilisez les [contrôles d'accès granulaires][12] pour limiter les équipes, les rôles ou les utilisateurs pouvant modifier ou interroger une connexion inter-organisations. Ces contrôles d'accès régissent :
- Depuis l'organisation source : qui peut modifier la connexion.
- Depuis l'organisation de destination : qui peut voir les données partagées et qui peut modifier la connexion.

Les connexions depuis l'organisation source héritent des autorisations d'accès aux données du créateur de la connexion. Si le créateur n'est pas autorisé à voir certaines données en raison de [Data Access Control][13] ou de [Log Restriction Queries][14], ces données ne sont pas accessibles depuis l'organisation de destination. Si le compte du créateur est désactivé, la connexion est supprimée. Cela interrompt le flux de données mais ne crée pas de risque de sécurité : la suppression d'une connexion ne lève pas les restrictions d'accès.

**Remarque :** Les connexions créées à partir d'organisations compatibles HIPAA peuvent permettre le partage d'informations de santé protégées (PHI) avec des organisations de destination. Les clients sont responsables de toutes les données sensibles transférées, y compris les PHI.

1. Accédez à la [page de visibilité inter-organisationnelle][6] dans Organization Settings.
1. Survolez la connexion inter-organisationnelle sur laquelle vous souhaitez définir des autorisations granulaires. Les icônes {{< ui >}}Permissions{{< /ui >}} et {{< ui >}}Delete{{< /ui >}} apparaissent sur la droite.
1. Cliquez sur l'icône de cadenas ({{< ui >}}Permissions{{< /ui >}}).
1. Sélectionnez {{< ui >}}Restrict Access{{< /ui >}}.
1. La boîte de dialogue se met à jour pour indiquer que les membres de votre organisation ont un accès {{< ui >}}Viewer{{< /ui >}} par défaut.
1. Utilisez le menu déroulant pour sélectionner une ou plusieurs équipes, un ou plusieurs rôles ou un ou plusieurs utilisateurs autorisés à modifier la connexion inter-organisationnelle.
1. Cliquez sur {{< ui >}}Add{{< /ui >}}.
1. La boîte de dialogue se met à jour pour indiquer que le rôle que vous avez sélectionné dispose de l'autorisation {{< ui >}}Editor{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

**Remarque** : Pour conserver votre accès en modification à la connexion inter-organisationnelle, le système exige que vous incluiez au moins un rôle ou une équipe dont vous êtes membre avant d'enregistrer.

Pour restaurer l'accès général à une connexion inter-organisationnelle avec accès restreint, suivez les étapes ci-dessous :

1. Sur la page de visibilité inter-organisationnelle, survolez la connexion inter-organisationnelle à laquelle vous souhaitez restaurer l'accès général. Les icônes {{< ui >}}Permissions{{< /ui >}} et {{< ui >}}Delete{{< /ui >}} apparaissent sur la droite.
1. Cliquez sur l'icône de cadenas ({{< ui >}}Permissions{{< /ui >}}).
1. Cliquez sur {{< ui >}}Restore Full Access{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

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
[15]: /fr/api/latest/metrics/#query-scalar-data-across-multiple-products