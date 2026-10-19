---
aliases:
- /fr/data_observability/datasets/?tab=databricks
description: Connectez Databricks à Datadog Data Observability pour surveiller la
  qualité des données, suivre l'utilisation et détecter les problèmes.
further_reading:
- link: /data_observability/
  tag: Documentation
  text: Vue d'ensemble de Data Observability
- link: /monitors/types/data_observability/
  tag: Documentation
  text: Monitors Data Observability
title: Databricks
---
## Présentation {#overview}

L'intégration Databricks connecte Datadog à votre espace de travail Databricks pour synchroniser les métadonnées et les métriques au niveau des tables. Utilisez-la pour surveiller la fraîcheur des données, détecter les anomalies et tracer le lignage dans votre pile de données.

**Remarque** : Les instructions ci-dessous concernent Quality Monitoring. Pour Jobs Monitoring, consultez [Activez Data Observability : Jobs Monitoring pour Databricks][1].

## Prérequis {#prerequisites}

Si votre espace de travail Databricks restreint l'accès réseau par IP, ajoutez les IP du webhook Datadog à votre liste d'autorisation. Pour la liste des IP, consultez la section `webhooks` de {{< region-param key="ip_ranges_url" link="true" text="IP ranges list" >}}.

## Configurez votre compte dans Databricks {#set-up-your-account-in-databricks}

### Étape 1 - Connectez la tuile d'intégration Databricks {#step-1-connect-the-databricks-integration-tile}

1. Suivez les instructions d'installation dans la [documentation de l'intégration Databricks][2] en utilisant la tuile d'intégration Datadog. Prenez note de l'ID d'application du principal de service et enregistrez-le dans un endroit sûr, car il sera référencé ultérieurement.

   **Remarque** : Les autorisations d'administrateur d'espace de travail ne sont pas requises pour Quality Monitoring.

2. Lors de la configuration de l'intégration, activez le commutateur {{< ui >}}Data Observability{{< /ui >}}.
3. Cliquez sur {{< ui >}}Save Databricks Workspace{{< /ui >}}.

### Étape 2 - Accordez l'accès {#step-2-grant-access}

Dans Databricks, ouvrez le {{< ui >}}SQL Editor{{< /ui >}} pour exécuter les commandes suivantes. Utilisez l'ID d'application (client) du principal de service, et non son nom d'affichage, partout où `<application_id>` apparaît.

Tout d'abord, accordez l'accès aux schémas système pour le lignage :

```sql
GRANT USE CATALOG ON CATALOG system TO `<application_id>`;
GRANT USE SCHEMA ON CATALOG system TO `<application_id>`;
GRANT SELECT ON CATALOG system TO `<application_id>`;
```

Ces autorisations couvrent l'intégralité du catalogue `system`, qui inclut la [table système de l'historique des requêtes][4] (`system.query.history`). Datadog lit l'historique des requêtes à partir de cette table pour établir le lignage entre vos tables et vous donner une visibilité sur les requêtes qui s'exécutent sur celles-ci. Pour lire le texte de la requête dans cette table, le principal de service a également besoin de l'appartenance au groupe décrite à l'[Étape 3](#step-3---grant-access-to-query-text).

Ensuite, accordez un accès en lecture seule au périmètre des données que vous souhaitez surveiller :

{{< tabs >}}
{{% tab "Accès complet au catalogue" %}}

Utilisez l'option d'accès complet au catalogue pour une configuration plus simple. Il inclut automatiquement les futures tables sans avoir besoin de mettre à jour les autorisations.


```sql
GRANT USE CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE SCHEMA ON CATALOG <catalog_name> TO `<application_id>`;
GRANT SELECT ON CATALOG <catalog_name> TO `<application_id>`;
```

{{% /tab %}}
{{% tab "Tables spécifiques" %}}

Utilisez l'option des tables spécifiques pour respecter le principe du moindre privilège, ou si vous n'avez besoin de surveiller qu'un sous-ensemble de vos données. Vous devez mettre à jour les autorisations lors de l'ajout de nouvelles tables.

```sql
GRANT USE CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE SCHEMA ON SCHEMA <catalog_name>.<schema_name> TO `<application_id>`;
GRANT SELECT ON TABLE <catalog_name>.<schema_name>.<table_name> TO `<application_id>`;
```

{{% /tab %}}
{{< /tabs >}}

Ces autorisations sont nécessaires pour les raisons suivantes :

- `GRANT USE CATALOG` est requis pour naviguer dans le catalogue et découvrir les schémas.
- `GRANT USE SCHEMA` est requis pour énumérer les tables et surveiller l'état de santé au niveau du schéma.
- `GRANT SELECT` est requis pour la surveillance de la qualité des données, telle que le SQL personnalisé ou les vérifications de distribution.

### Étape 3 - Accorder l'accès au texte de la requête {#step-3-grant-access-to-query-text}

Databricks masque le texte des requêtes SQL pour tout principal qui n'est pas administrateur de compte ou membre du groupe `databricks_pii_access` au niveau du compte. Pour un principal masqué, le texte de la requête est renvoyé sous la forme `<Redacted>` dans la colonne `statement_text` de `system.query.history`, l'[API d'historique des requêtes][5], l'[API de liste des requêtes][6] et les événements de log d'audit qui capturent le texte des instructions SQL.

Ajoutez le principal de service à `databricks_pii_access` pour utiliser les fonctionnalités suivantes, qui lisent le texte des requêtes :

- **Lignage des données** : Complété par le parsing du texte des requêtes à partir de l'historique des requêtes Databricks.
- **Surveillance des jobs serverless Databricks** : Surveillance des jobs qui s'exécutent sur [calcul serverless][7], où aucun Datadog Agent ne s'exécute sur le cluster.
- **Surveillance des entrepôts SQL et des requêtes** : Visibilité sur les requêtes exécutées sur vos entrepôts SQL et recommandations d'optimisation générées par Datadog.

Les métriques au niveau de la table, telles que la fraîcheur, le nombre de lignes et les statistiques de colonnes, lisent les données et les métadonnées de la table plutôt que le texte de la requête ; elles fonctionnent donc sans cette appartenance.

L'appartenance au groupe est requise en plus des `system` octrois de catalogue dans l'[étape 2](#step-2---grant-access). Un principal qui fait partie du groupe mais qui ne dispose pas de `SELECT` sur `CATALOG system` ne peut toujours pas lire l'historique des requêtes.

Pour créer le groupe et ajouter le principal de service :

1. Le groupe `databricks_pii_access` n'existe pas par défaut dans un compte Databricks, et les administrateurs d'espace de travail n'en sont pas membres automatiquement. Créez-le avec le nom exact `databricks_pii_access`, qui est sensible à la casse.
   - Si vous ne gérez pas les groupes avec SCIM ou un fournisseur d'identité externe, accédez à {{< ui >}}Account Console{{< /ui >}} > {{< ui >}}User Management{{< /ui >}} > {{< ui >}}Groups{{< /ui >}} > {{< ui >}}Add Group{{< /ui >}}.
   - Si vous gérez les groupes avec SCIM ou un fournisseur d'identité externe, créez plutôt le groupe à cet endroit.
1. Ajoutez le principal de service de l'[étape 1](#step-1---connect-the-databricks-integration-tile) au groupe.

Pour plus de détails, consultez la documentation Databricks sur la [gestion des groupes au niveau du compte][8].

## Étapes suivantes {#next-steps}

Une fois l'intégration configurée, Datadog commence à synchroniser vos métadonnées et votre lignage au niveau des colonnes en arrière-plan. Les synchronisations initiales peuvent prendre plusieurs heures selon la taille de votre déploiement Databricks.

Une fois la synchronisation initiale terminée, créez un [monitor Data Observability][3] pour commencer à recevoir des alertes sur la fraîcheur, le nombre de lignes, les métriques au niveau des colonnes et les métriques SQL personnalisées.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/data_observability/jobs_monitoring/databricks/
[2]: /fr/integrations/databricks/
[3]: /fr/monitors/types/data_observability/
[4]: https://docs.databricks.com/aws/en/admin/system-tables/query-history
[5]: https://docs.databricks.com/api/workspace/queryhistory/list
[6]: https://docs.databricks.com/api/workspace/queries/list
[7]: https://docs.databricks.com/aws/en/compute/serverless/
[8]: https://docs.databricks.com/aws/en/admin/users-groups/groups