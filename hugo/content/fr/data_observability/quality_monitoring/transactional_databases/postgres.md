---
description: Connectez PostgreSQL à Datadog Data Observability pour surveiller les
  schémas, les dimensions des tables et les volumes de lignes.
further_reading:
- link: /data_observability/
  tag: Documentation
  text: Vue d'ensemble de Data Observability
- link: /monitors/types/data_observability/
  tag: Documentation
  text: Monitors Data Observability
- link: /database_monitoring/setup_postgres/
  tag: Documentation
  text: Database Monitoring pour PostgreSQL
- link: /remote_configuration/
  tag: Documentation
  text: Remote Configuration
title: PostgreSQL
---
{{< callout url="#" btn_hidden="true" header="Preview" >}}
Data Observability pour PostgreSQL est en version Preview. Contactez votre représentant Datadog pour l'activer dans votre organisation.
{{< /callout >}}

## Présentation {#overview}

L'intégration PostgreSQL pour Datadog Data Observability suit les métadonnées des tables, offrant une visibilité sur les schémas, les dimensions des tables et les volumes de lignes dans votre environnement.

PostgreSQL est collecté via le [Datadog Agent][1] plutôt que par une connexion cloud directe comme pour les [intégrations d'entrepôts de données][7]. Cette page couvre uniquement la configuration nécessaire pour Data Observability. Pour configurer la suite complète des fonctionnalités de Database Monitoring, consultez le [guide de configuration DBM pour PostgreSQL][2].

## Prérequis {#prerequisites}

Avant de commencer, assurez-vous de disposer des éléments suivants :

- Datadog Agent `7.81.0` ou version ultérieure installé sur un host pouvant atteindre vos instances PostgreSQL. Consultez [l'installation de l'Agent][1] pour votre plateforme.
- [Remote Configuration][8] activée pour votre organisation, sur la clé d'API utilisée par l'Agent et sur l'Agent lui-même. Les monitors de qualité des données sont transmis à l'Agent via Remote Configuration ; sans cela, vos tables sont synchronisées, mais vos monitors ne s'exécutent jamais. Consultez [Activer Remote Configuration](#enable-remote-configuration).
- Accès superutilisateur à votre instance PostgreSQL, pour créer l'utilisateur Datadog et accorder les privilèges.
- Accès à la version Preview activé pour votre organisation par un représentant Datadog.

## Activer Remote Configuration {#enable-remote-configuration}

Data Observability utilise [Remote Configuration][8] pour transmettre les requêtes des monitors à l'Agent. Lorsque vous créez un monitor de qualité des données dans Datadog, sa requête est transmise à l'Agent qui gère l'instance, et le check Postgres de l'Agent l'exécute sur votre base de données selon le planning du monitor.

La collecte des métadonnées de table ne dépend pas de Remote Configuration. Si Remote Configuration n'est pas disponible, vos tables apparaissent toujours dans le catalogue, mais tout monitor que vous créez pour celles-ci reste vide car l'Agent ne reçoit jamais la requête à exécuter.

Remote Configuration est activée par défaut dans la plupart des environnements, mais elle doit être activée aux trois endroits suivants. Vérifiez chacun de ces points :

 - **Votre organisation.** Sur la page des paramètres de [Remote Configuration][9], vérifiez que Remote Configuration est activée. Son activation nécessite l'autorisation [`org_management`][11].
 - **La clé d'API de l'Agent.** La clé d'API utilisée par l'Agent doit disposer de la fonctionnalité Remote Configuration. Vérifiez-la sur la page [API Keys][10]. Cela nécessite l'autorisation [`api_keys_write`][12]. Un Agent utilisant une clé sans cette fonctionnalité signale un statut `UNAUTHORIZED`.
 - **L'Agent.** `remote_configuration.enabled` est défini par défaut sur `true` à partir de la version `7.47.0` de l'Agent ; il n'y a donc généralement rien à modifier. Définissez-le explicitement dans [`datadog.yaml`][13] (ou via `DD_REMOTE_CONFIGURATION_ENABLED`) dans deux cas :

   - Il était précédemment défini sur `false`.
   - L'Agent communique avec GovCloud (`ddog-gov.com`) ou s'exécute en mode FIPS. Remote Configuration est **désactivée par défaut** dans ces environnements et ne s'active que si vous la configurez explicitement.

   ```yaml
   remote_configuration:
     enabled: true
   ```

   [Redémarrez l'Agent][5] après avoir modifié ce paramètre.

Le statut Remote Configuration de chaque Agent est également répertorié sur la page des paramètres [Remote Configuration][9]. Pour les descriptions de statut et les exigences réseau, consultez [Statut Remote Configuration de l'Agent][14].

## Vous utilisez déjà Database Monitoring ? {#already-using-database-monitoring}

Si [Database Monitoring][2] est déjà en cours d'exécution sur cette base de données, la majeure partie de la configuration est terminée : l'utilisateur `datadog` existe et dispose de `pg_monitor`. Trois éléments sont encore nécessaires.

1. **Vérifiez la version de votre Agent.** Exécutez `datadog-agent status` et lisez la version dans l'en-tête et sur la ligne du check Postgres dans la section Collector :

   ```text
   Agent (v7.81.0)
   ...
     postgres (23.9.1)
   ```

   Si l'Agent est plus ancien que `7.81.0`, [mettez à niveau l'Agent][6]. La mise à niveau du seul check Postgres avec `datadog-agent integration install` n'est pas suffisante : le gestionnaire Remote Configuration qui transmet les requêtes des monitors est fourni avec l'Agent lui-même, et non avec le check.

   Database Monitoring ne nécessite pas Remote Configuration, qui peut donc être désactivée sur un Agent fonctionnant par ailleurs correctement. Vérifiez qu'elle est activée avant de continuer : consultez [Activer Remote Configuration](#enable-remote-configuration).

2. **Accordez `SELECT` sur vos données.** Database Monitoring accorde `pg_monitor` et `USAGE` sur le schéma `public`, mais n'accorde pas `SELECT` sur vos tables. Data Observability en a besoin pour calculer le nombre de lignes, les métriques au niveau des colonnes et les résultats SQL personnalisés. Exécutez les commandes d'attribution des privilèges dans [Configurer l'utilisateur de base de données Datadog](#set-up-the-datadog-database-user) pour chaque schéma de chaque base de données que vous souhaitez suivre, en sautant l'étape `CREATE USER`.

3. **Activez le job Data Observability.** Ajoutez ce qui suit à chaque instance existante dans `conf.d/postgres.d/conf.yaml`, en conservant `dbm: true` :

   ```yaml
   data_observability:
     enabled: true
   ```

   Si votre instance utilise déjà `database_autodiscovery`, Data Observability détecte toutes les bases de données découvertes ; assurez-vous donc que les autorisations `SELECT` les couvrent toutes.

[Redémarrez l'Agent][5] pour appliquer les modifications, puis poursuivez à partir de [Explorez les métadonnées de vos tables](#explore-your-table-metadata).

## Configurer l'utilisateur de base de données Datadog {#set-up-the-datadog-database-user}

1. Connectez-vous à votre base de données en tant que superutilisateur et créez un utilisateur dédié :

   ```sql
   CREATE USER datadog WITH PASSWORD '<SECURE_PASSWORD>';
   GRANT pg_monitor TO datadog;
   GRANT SELECT ON pg_stat_database TO datadog;
   ```

2. Connectez-vous à chaque base de données que vous souhaitez surveiller (en utilisant `\c my_database` dans `psql`) et accordez un accès en lecture à vos schémas :

   ```sql
   GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO datadog;
   GRANT SELECT ON ALL TABLES IN SCHEMA "<YOUR_SCHEMA>" TO datadog;

   -- Automatically apply read access to tables created later by <TABLE_OWNER_ROLE>
   ALTER DEFAULT PRIVILEGES FOR ROLE <TABLE_OWNER_ROLE> IN SCHEMA "<YOUR_SCHEMA>"
     GRANT SELECT ON TABLES TO datadog;
   ```

   `ALTER DEFAULT PRIVILEGES` affecte uniquement les tables créées par le rôle nommé dans `FOR ROLE`. Exécutez cette commande une fois pour **chaque rôle qui crée des tables** dans le schéma ; sinon, Data Observability perd l'accès aux nouvelles tables à mesure que votre application les crée. Pour lister les rôles qui possèdent des tables dans un schéma :

   ```sql
   SELECT DISTINCT tableowner FROM pg_tables WHERE schemaname = '<YOUR_SCHEMA>';
   ```

   Les autorisations de schéma et de table sont spécifiques à la base de données. Relancez ces commandes pour **chaque base de données** et chaque schéma que vous avez l'intention de suivre.

### Restreindre à des tables spécifiques (facultatif) {#restrict-to-specific-tables-optional}

Pour limiter la collecte à un sous-ensemble de tables, accordez des autorisations ciblées au lieu de `ALL TABLES IN SCHEMA` :

```sql
GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO datadog;
GRANT SELECT ON "<YOUR_SCHEMA>"."orders" TO datadog;
GRANT SELECT ON "<YOUR_SCHEMA>"."users" TO datadog;
```

Data Observability affiche uniquement les tables pour lesquelles l'utilisateur `datadog` dispose de privilèges `SELECT` explicites.

## Configurer l'intégration PostgreSQL {#configure-the-postgresql-integration}

Modifiez le fichier `conf.d/postgres.d/conf.yaml` de l'Agent et ajoutez une instance pour chaque host PostgreSQL que vous souhaitez surveiller. Pour une liste complète des options de configuration, consultez l'[exemple de fichier postgres.d/conf.yaml][4].

{{< tabs >}}
{{% tab "Toutes les bases de données sur le host" %}}

Activez `database_autodiscovery` pour collecter les métadonnées de chaque base de données utilisateur sur le host :

```yaml
init_config:
instances:
  - host: <POSTGRES_HOST>
    port: 5432
    username: datadog
    password: '<SECURE_PASSWORD>'

    database_autodiscovery:
      enabled: true

    ## Required for Data Observability
    data_observability:
      enabled: true
```

{{% /tab %}}
{{% tab "Une seule base de données" %}}

Définissez `dbname` pour collecter les métadonnées d'une seule base de données :

```yaml
init_config:
instances:
  - host: <POSTGRES_HOST>
    port: 5432
    username: datadog
    password: '<SECURE_PASSWORD>'
    dbname: <DATABASE_NAME>

    ## Required for Data Observability
    data_observability:
      enabled: true
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : si votre mot de passe contient des caractères spéciaux, entourez-le de guillemets simples.

La collecte de schémas (`collect_schemas`) est activée par défaut et c'est ce qui alimente vos tables dans Data Observability. `dbm: true` n'est **pas** requis pour Data Observability ; ne le définissez que si vous utilisez également [Database Monitoring][2].

[Redémarrez l'Agent][5] pour appliquer les modifications :

```shell
sudo systemctl restart datadog-agent
```

### Validez la configuration {#validate-the-configuration}

Vérifiez que le check est en cours d'exécution :

```shell
sudo datadog-agent status | grep -A 20 'postgres'
```

La sortie doit afficher le check `postgres` avec un nombre `Total Runs` supérieur à zéro et un horodatage `Last Successful Execution` récent.

Confirmez que l'Agent reçoit Remote Configuration. La section `Remote Configuration` du statut de l'Agent signale directement les checks de l'organisation et de la clé d'API :

```shell
sudo datadog-agent status | grep -A 10 'Remote Configuration'
```

Un Agent en bon état de fonctionnement indique :

```text
====================
Remote Configuration
====================
  Organization enabled: True
  API Key: Authorized
  Last error: None
```

Tout autre résultat renvoie à l'un des trois checks décrits dans [Activez Remote Configuration](#enable-remote-configuration) :

- `Organization enabled: False` : activez Remote Configuration pour votre organisation.
- `API Key: Not authorized` : ajoutez la fonctionnalité Remote Configuration à la clé d'API utilisée par cet Agent.
- `Remote Configuration is disabled because ...` : elle est désactivée sur l'Agent lui-même.

Tant que cette section n'indique pas un état satisfaisant, vos tables continuent de se synchroniser, mais vos monitors ne peuvent pas s'exécuter.

## Explorez les métadonnées de vos tables {#explore-your-table-metadata}

Prévoyez environ une heure pour que la collecte initiale des métadonnées se termine. Vous pouvez ensuite [consulter vos tables PostgreSQL][3] dans le catalogue Data Observability.

Si vos tables n'apparaissent pas, vérifiez que :

1. `sudo datadog-agent status` indique que le check `postgres` fonctionne correctement.
2. L'utilisateur `datadog` dispose des privilèges `SELECT` sur les tables cibles. Testez avec :

   ```shell
   psql -U datadog -d <DATABASE_NAME> -c 'SELECT 1 FROM <YOUR_SCHEMA>.orders LIMIT 1'
   ```

3. Un représentant Datadog a activé l'accès Preview pour votre organisation.

## Créez des monitors de qualité des données {#create-data-quality-monitors}

Une fois vos tables affichées dans le catalogue, vous pouvez créer des alertes sur leur état de santé.

Accédez à une table dans le [catalogue Data Observability][3], sélectionnez l'onglet {{< ui >}}Monitors{{< /ui >}} et cliquez sur {{< ui >}}Add Monitor{{< /ui >}}. Dans Preview, vous pouvez créer les monitors suivants :

- **Nombre de lignes** : créez des alertes sur les fluctuations de volume, telles que les baisses soudaines ou les tendances qui se stabilisent.
- **Métriques au niveau des colonnes** : surveillez les caractéristiques des colonnes, telles que les taux de valeurs nulles, les cardinalités ou les changements de distribution.
- **SQL personnalisé** : créez des alertes sur toute requête `SELECT`. La requête doit renvoyer exactement une valeur numérique sous l'alias `dd_value`.

Les monitors s'exécutent selon le planning de collecte. Maintenez les privilèges `SELECT` en place pour l'utilisateur `datadog` sur toutes les tables référencées ; les monitors échouent si l'accès est révoqué.

Si un monitor ne signale aucune donnée, vérifiez que [Remote Configuration](#enable-remote-configuration) est activée pour votre organisation, pour la clé d'API de l'Agent et sur l'Agent lui-même. L'Agent ne peut pas recevoir de requêtes de monitor sans cela.

## Limitations connues {#known-limitations}

Data Observability répertorie toutes les tables PostgreSQL des instances où `dbm` et `collect_schemas` sont activés, y compris les instances qui ne disposent pas de `data_observability.enabled: true`. La planification d'un monitor sur l'une de ces bases de données produit un monitor sans données. Si vos tables sont répertoriées mais que vos monitors restent vides :

- Suivez les instructions de [Vous utilisez déjà Database Monitoring ?](#already-using-database-monitoring) pour activer le job et accorder les privilèges `SELECT` requis.
- Vérifiez que [Remote Configuration](#enable-remote-configuration) est activée. Les listes de tables n'en dépendent pas, contrairement aux requêtes des monitors.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: /fr/database_monitoring/setup_postgres/
[3]: https://app.datadoghq.com/datasets/catalog?integration=postgres
[4]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[5]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[6]: /fr/agent/guide/upgrade_agent_fleet_automation/
[7]: /fr/data_observability/quality_monitoring/data_warehouses/
[8]: /fr/remote_configuration/
[9]: https://app.datadoghq.com/organization-settings/remote-config
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: /fr/account_management/rbac/permissions/#permissions-list
[12]: /fr/account_management/rbac/permissions/#permissions-list
[13]: /fr/agent/configuration/agent-configuration-files/#main-configuration-file
[14]: /fr/agent/guide/setup_remote_config/#agent-remote-configuration-status