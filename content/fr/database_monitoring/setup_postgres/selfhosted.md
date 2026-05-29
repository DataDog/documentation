---
description: Installez et configurez la surveillance de la base de données pour Postgres
  auto-hébergé.
further_reading:
- link: /integrations/postgres/
  tag: Documentation
  text: Intégation Postgres basique
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentation
  text: Capturer les valeurs des paramètres de requête SQL
- link: https://www.datadoghq.com/blog/database-monitoring-explain-analyze
  tag: Blog
  text: Déboguer la latence des requêtes PostgreSQL plus rapidement avec EXPLAIN ANALYZE
    dans la surveillance de base de données Datadog
title: Configurer la surveillance de base de données pour Postgres auto-hébergé
---
La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données Postgres, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, des états, des failovers et des événements de base de données.

L'Agent recueille les données de télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule. Effectuez la configuration suivante pour activer la surveillance de base de données avec votre base de données Postgres :

1. [Configurer les paramètres de la base de données](#configure-postgres-settings)
1. [Accorder l'accès à l'Agent à la base de données](#grant-the-agent-access)
1. [Installer l'Agent](#install-the-agent)

## Avant de commencer {#before-you-begin}

Versions PostgreSQL prises en charge
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17, 18

Prérequis
: Des modules supplémentaires fournis par Postgres doivent être installés. Pour la plupart des installations, cela est inclus par défaut, mais les installations moins conventionnelles peuvent nécessiter une installation supplémentaire de votre version du [package `postgresql-contrib`][1].

Versions de l'Agent prises en charge
: 7.36.1+

Impact sur la performance
: La configuration par défaut de l'Agent pour la surveillance de base de données est conservatrice, mais vous pouvez ajuster des paramètres tels que l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des charges de travail, l'Agent représente moins d'un pour cent du temps d'exécution des requêtes sur la base de données et moins d'un pour cent du CPU. <br/><br/>
La surveillance de base de données fonctionne comme une intégration au-dessus de l'Agent de base ([voir les benchmarks][2]).

Proxies, équilibreurs de charge et gestionnaires de connexions
: L'Agent Datadog doit se connecter directement à l'hôte surveillé. Pour les bases de données auto-hébergées, utilisez `127.0.0.1` ou le socket. L'Agent ne doit pas se connecter à la base de données via un proxy, un équilibreur de charge ou un pool de connexions tel que `pgbouncer`. Si l'Agent se connecte à différents hôtes pendant son fonctionnement (comme dans le cas d'un basculement, d'un équilibrage de charge, etc.), l'Agent calcule la différence de statistiques entre deux hôtes, produisant des métriques inexactes.

Considérations relatives à la sécurité des données
: Voir [Informations sensibles][3] pour des informations sur les données que l'Agent collecte de vos bases de données et comment s'assurer qu'elles sont sécurisées.

## Configurer les paramètres Postgres {#configure-postgres-settings}

Configurez les [paramètres][4] suivants dans le fichier `postgresql.conf` puis **redémarrez le serveur** pour que les paramètres prennent effet. Pour plus d'informations sur ces paramètres, consultez la [documentation Postgres][5].

**Paramètres requis**

| Paramètre | Valeur | Description |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Requis pour `postgresql.queries.*` les métriques. Active la collecte des métriques de requête à l'aide de l'extension [pg_stat_statements][5]. |
| `track_activity_query_size` | `4096` | Requis pour la collecte de requêtes plus volumineuses. Augmente la taille du texte SQL dans `pg_stat_activity`. Si laissé à la valeur par défaut, les requêtes de plus de `1024` caractères ne seront pas collectées. |

**Paramètres optionnels**

| Paramètre | Valeur | Description |
| --- | --- | --- |
| `pg_stat_statements.track` | `ALL` | Active le suivi des instructions dans les procédures stockées et les fonctions. |
| `pg_stat_statements.max` | `10000` | Augmente le nombre de requêtes normalisées suivies dans `pg_stat_statements`. Recommandé pour les bases de données à fort volume, qui reçoivent de nombreux types de requêtes issues de divers clients. |
| `pg_stat_statements.track_utility` | `off` | Désactive les commandes utilitaires comme PREPARE et EXPLAIN. Définir cette valeur à `off` signifie que seules les requêtes comme SELECT, UPDATE et DELETE sont suivies. |
| `track_io_timing` | `on` | Active la collecte des temps de lecture et d'écriture des blocs pour les requêtes. |

## Accorder l'accès à l'Agent {#grant-the-agent-access}

L'Agent Datadog requiert un accès en lecture seule pour le serveur de la base de données, afin de pouvoir recueillir les statistiques et requêtes.

Exécutez les commandes SQL suivantes sur le serveur de base de données **principal** (le nœud d'écriture) dans le cluster, si Postgres est répliqué. L'Agent peut collecter la télémétrie de toutes les bases de données sur le serveur, peu importe à quelle base de données il se connecte. Utilisez la base de données par défaut `postgres` à moins que vous n'ayez besoin que l'Agent exécute [des requêtes personnalisées sur des données uniques à une autre base de données][6].

Connectez-vous à votre base de données choisie en tant que superutilisateur (ou un autre utilisateur avec des autorisations suffisantes). Par exemple, pour se connecter à la base de données `postgres` en utilisant [psql][7] :

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Créez l'utilisateur `datadog` :

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}

{{% tab "Postgres ≥ 15" %}}

Donnez à l'utilisateur `datadog` la permission sur les tables pertinentes :

```SQL
ALTER ROLE datadog INHERIT;
```

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Créez des fonctions **dans chaque base de données** pour permettre à l'Agent de lire le contenu complet de `pg_stat_activity` et `pg_stat_statements` :

```SQL
CREATE OR REPLACE FUNCTION datadog.pg_stat_activity() RETURNS SETOF pg_stat_activity AS
  $$ SELECT * FROM pg_catalog.pg_stat_activity; $$
LANGUAGE sql
SECURITY DEFINER;
CREATE OR REPLACE FUNCTION datadog.pg_stat_statements() RETURNS SETOF pg_stat_statements AS
    $$ SELECT * FROM pg_stat_statements; $$
LANGUAGE sql
SECURITY DEFINER;
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Pour la collecte de données ou des métriques personnalisées nécessitant des requêtes sur des tables supplémentaires, vous devrez peut-être accorder le <code>SELECT</code> permission sur ces tables au <code>datadog</code> utilisateur. Exemple : <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. Voir <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">la collecte de métriques personnalisées PostgreSQL</a> pour plus d'informations. </div>

### Créez la fonction de plan d'explication {#create-the-explain-plan-function}

Créez la fonction suivante **dans chaque base de données** pour permettre à l'Agent de collecter des plans d'explication :

```SQL
CREATE OR REPLACE FUNCTION datadog.explain_statement(
   l_query TEXT,
   OUT explain JSON
)
RETURNS SETOF JSON AS
$$
DECLARE
curs REFCURSOR;
plan JSON;

BEGIN
   SET TRANSACTION READ ONLY;

   OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
   FETCH curs INTO plan;
   CLOSE curs;
   RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER;
```

### Stockez votre mot de passe en toute sécurité {#securely-store-your-password}
{{% dbm-secret %}}

### Vérifiez les autorisations de la base de données {#verify-database-permissions}

Pour vérifier que les permissions sont correctes, exécutez les commandes suivantes pour confirmer que l'utilisateur Agent est capable de se connecter à la base de données et lire les tables principales :

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from datadog.pg_stat_activity() limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from datadog.pg_stat_statements() limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{< /tabs >}}

Lorsqu'il vous demande un mot de passe, utilisez le mot de passe que vous avez saisi lors de la création de l'utilisateur `datadog`.

## Installez l'Agent {#install-the-agent}

L'installation de l'Agent Datadog installe également le contrôle Postgres, qui est requis pour la surveillance des bases de données sur Postgres.
Si vous n'avez pas installé l'Agent, consultez les [instructions d'installation de l'Agent][8]. Ensuite, continuez avec les instructions pour votre méthode d'installation.

Modifiez le fichier `conf.d/postgres.d/conf.yaml` de l'Agent pour pointer vers l'instance Postgres que vous souhaitez surveiller. Pour une liste complète des options de configuration, consultez [l'exemple postgres.d/conf.yaml][9].

```yaml
init_config:
instances:
 - dbm: true
   host: localhost
   port: 5432
   username: datadog
   password: 'ENC[datadog_user_database_password]'

  ## Optional: Connect to a different database if needed for `custom_queries`
  # dbname: '<DB_NAME>'
```

**Remarque** : Si votre mot de passe contient des caractères spéciaux, entourez-le de guillemets simples.

[Redémarrez l'Agent][10] pour appliquer les modifications.

### Collecte des journaux (optionnel) {#collecting-logs-optional}

La journalisation par défaut de PostgreSQL est à `stderr`, et les journaux ne contiennent pas d'informations détaillées. Enregistrez dans un fichier avec des détails supplémentaires spécifiés dans le préfixe de la ligne de journal. Consultez la [documentation][11] de PostgreSQL pour plus de détails.

1. La journalisation est configurée dans le fichier `/etc/postgresql/<VERSION>/main/postgresql.conf`. Pour des résultats de journal réguliers, y compris les sorties des instructions, définissez les paramètres suivants dans la section des journaux :
   ```conf
     logging_collector = on
     log_line_prefix = '%m [%p] %d %a %u %h %c ' # this pattern is required to correlate metrics in the Datadog product
     log_file_mode = 0644

     ## For Windows
     #log_destination = 'eventlog'
   ```
2. Pour recueillir des métriques de durée détaillées et les rendre consultables dans l'interface Datadog, configurez-les en ligne avec l'instruction. La configuration recommandée ci-dessous journalise toutes les instructions et leurs durées. Pour réduire la sortie aux instructions dépassant une certaine durée, définissez `log_min_duration_statement` sur le minimum souhaité en millisecondes. Vérifiez que l'enregistrement de l'instruction SQL complète respecte les exigences de confidentialité de votre organisation.

   **Remarque** : Les options `log_statement` et `log_duration` sont commentées. Voir la discussion sur ce sujet [ici][12].

   ```conf
     log_min_duration_statement = 0    # -1 is disabled, 0 logs all statements
                                       # and their durations, > 0 logs only
                                       # statements running at least this number
                                       # of milliseconds
     #log_statement = 'all'
     #log_duration = on
   ```
3. La collecte des journaux est désactivée par défaut dans l'Agent Datadog. Activez-le dans votre fichier `datadog.yaml` :
   ```yaml
   logs_enabled: true
   ```
4. Ajoutez et modifiez ce bloc de configuration dans votre fichier `conf.d/postgres.d/conf.yaml` pour commencer à collecter vos journaux PostgreSQL:
   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: postgresql
       service: "<SERVICE_NAME>"
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       #    name: new_log_start_with_date
   ```
   Changez les valeurs des paramètres `service` et `path` pour configurer votre environnement. Consultez [l'exemple postgres.d/conf.yaml][9] pour toutes les options de configuration disponibles.
5. [Redémarrez l'Agent][10].

### Collecte des plans avec `auto_explain` (optionnel) {#collecting-plans-with-auto-explain-optional}

Par défaut, l'agent ne collecte que les plans [`EXPLAIN`][17] pour un échantillonnage de requêtes en cours d'exécution. Ces plans sont de nature plus générale, surtout lorsque le code de l'application utilise des instructions préparées.

Pour collecter des plans `EXPLAIN ANALYZE` complets issus de toutes les requêtes, vous devez utiliser [`auto_explain`][18], une extension de première partie fournie avec PostgreSQL disponible chez tous les principaux fournisseurs. _La collecte des journaux est une condition préalable à la collecte de `auto_explain`_, donc activez-la avant de continuer.

<div class="alert alert-danger">
  <strong>Important :</strong> <code>auto_explain</code> produit des lignes de journaux qui peuvent contenir des informations sensibles de votre application, similaires aux valeurs brutes qui apparaissent dans des SQL non obfusqués. Vous pouvez utiliser le <a href="/account_management/rbac/permissions/#database-monitoring"><code>dbm_parameterized_queries_read</code></a>Autorisation pour contrôler qui peut voir les plans résultants, mais les lignes de journaux elles-mêmes <i>sont</i> visibles par tous les utilisateurs au sein de votre organisation Datadog. L'utilisation de <a href="/logs/guide/logs-rbac">RBAC pour les journaux</a> aide à garantir que ces journaux ne sont visibles que par les bons utilisateurs.
</div>

Après avoir activé la collecte des journaux :

1. Ajoutez `auto_explain` à votre liste de `shared_preload_libraries` dans `postgresql.conf`. Par exemple, si `shared_preload_libraries` est défini sur `pg_stat_statements`, changez-le en `pg_stat_statements,auto_explain`.

2. Changez le `log_line_prefix` pour activer une corrélation d'événements plus riche. Ce modèle est requis pour ingérer des plans auto_explain.
   ```conf
     log_line_prefix = '%m:%r:%u@%d:[%p]:%l:%e:%s:%v:%x:%c:%q%a:'
   ```

3. Configurez les paramètres de `auto_explain`. Le format de journal _ doit_ être `json`, mais d'autres paramètres peuvent varier en fonction de votre application. Cet exemple enregistre un plan `EXPLAIN ANALYZE` pour toutes les requêtes de plus d'une seconde, y compris les informations de tampon, mais omettant le timing (qui peut entraîner un surcoût).

   ```conf
    auto_explain.log_format: "json"
    auto_explain.log_min_duration: "1000"
    auto_explain.log_analyze: "on"
    auto_explain.log_buffers: "on"
    auto_explain.log_timing: "off"
    auto_explain.log_triggers: "on"
    auto_explain.log_verbose: "on"
    auto_explain.log_nested_statements: "on"
    auto_explain.sample_rate: "1"
   ```

4. [Redémarrez l'Agent][10].

### Vérifiez la configuration de l'Agent {#verify-agent-setup}

[Exécutez la sous-commande d'état de l'Agent][13] et recherchez `postgres` dans la section Vérifications. Ou visitez la page [Bases de données][14] pour commencer !

## Exemples de configurations d'Agent {#example-agent-configurations}
{{% dbm-postgres-agent-config-examples %}}

## Dépannage {#troubleshooting}

Si vous avez installé et configuré les intégrations et l'Agent comme décrit et que cela ne fonctionne pas comme prévu, consultez [Dépannage][15].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.postgresql.org/docs/current/contrib.html
[2]: /fr/database_monitoring/agent_integration_overhead/?tab=postgres
[3]: /fr/database_monitoring/data_collected/#sensitive-information
[4]: https://www.postgresql.org/docs/current/config-setting.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /fr/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[10]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[11]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[12]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
[13]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[14]: https://app.datadoghq.com/databases
[15]: /fr/database_monitoring/troubleshooting/?tab=postgres
[17]: https://www.postgresql.org/docs/current/sql-explain.html
[18]: https://www.postgresql.org/docs/current/auto-explain.html