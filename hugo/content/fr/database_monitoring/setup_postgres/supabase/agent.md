---
description: Installez et configurez Database Monitoring pour Supabase avec le Datadog
  Agent.
further_reading:
- link: /integrations/postgres/
  tag: Documentation
  text: Intégration Postgres basique
title: Configuration de Database Monitoring pour Supabase auto-hébergé
---
Database Monitoring offre une visibilité approfondie sur vos bases de données Supabase en exposant les métriques de requêtes, les échantillons de requêtes, les plans d'exécution, les états des bases de données, les basculements et les événements.

<div class="alert alert-info">Datadog recommande de configurer Database Monitoring via la tuile d'intégration Supabase Cloud. Aucune installation d'Agent requise. Consultez <a href="/database_monitoring/setup_postgres/supabase/cloud">Supabase Cloud</a> pour obtenir les instructions.</div>

L'Agent recueille les données de télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule. Effectuez la configuration suivante pour activer Database Monitoring sur votre base de données Supabase :

1. [Accordez à l'Agent l'accès à la base de données](#grant-the-agent-access)
1. [Installez l'Agent](#install-the-agent)

## Avant de commencer {#before-you-begin}

Versions de PostgreSQL prises en charge
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17

Versions de l'Agent prises en charge
: 7.69.1+

Impact sur les performances
: La configuration par défaut de l'Agent pour Database Monitoring est prudente, mais vous pouvez ajuster les paramètres tels que l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des charges de travail, l'Agent représente moins d'un pour cent du temps d'exécution des requêtes sur la base de données et moins d'un pour cent du CPU. <br/><br/>
Database Monitoring s'exécute en tant qu'intégration sur l'Agent de base ([voir les tests de performance][2]).

Proxys, équilibreurs de charge et répartiteurs de connexion
: Datadog Agent doit se connecter directement au host surveillé. Pour les bases de données auto-hébergées, `127.0.0.1` ou le socket est préférable. L'Agent ne doit pas se connecter à la base de données via un proxy, un équilibreur de charge ou un pooler de connexions tel que le Dedicated Pooler (pgbouncer) ou le Session Pooler (Supavisor) de Supabase. Si l'Agent se connecte à différents hosts pendant son exécution (comme dans le cas d'un basculement, d'un équilibrage de charge, etc.), l'Agent calcule la différence de statistiques entre deux hosts, ce qui produit des métriques inexactes.

Considérations relatives à la sécurité des données
: Consultez [Informations sensibles][3] pour en savoir plus sur les données que l'Agent collecte depuis vos bases de données et sur la manière de garantir leur sécurité.

## Accorder l'accès à l'Agent {#grant-the-agent-access}

Le Datadog Agent requiert un accès en lecture seule au serveur de base de données afin de pouvoir recueillir les statistiques et requêtes.

Les commandes SQL suivantes doivent être exécutées sur le serveur de base de données **primaire** (le serveur d'écriture) du cluster si Supabase est répliqué. Choisissez une base de données Supabase sur le serveur de base de données à laquelle l'Agent doit se connecter. L'Agent peut collecter des données de télémétrie depuis toutes les bases de données du serveur de base de données, quelle que soit celle à laquelle il se connecte ; une bonne option consiste donc à utiliser la base de données `postgres` par défaut. Choisissez une base de données différente uniquement si vous avez besoin que l'Agent exécute des [requêtes personnalisées sur des données propres à cette base de données][6].

Connectez-vous à la base de données choisie en tant que superutilisateur (ou un autre utilisateur disposant des autorisations suffisantes). Par exemple, si la base de données choisie est `postgres`, connectez-vous en tant qu'utilisateur `postgres`.

Accédez à l'onglet SQL Editor dans Supabase et exécutez :

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}

{{% tab "Postgres ≥ 15" %}}

Donnez à l'utilisateur `datadog` l'autorisation sur les tables pertinentes :

```SQL
ALTER ROLE datadog INHERIT;
```

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT USAGE ON SCHEMA extensions TO datadog;
GRANT pg_monitor TO datadog;
```

De plus, assurez-vous que l'extension `pg_stat_statements` est activée pour votre projet dans Supabase.```

{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT USAGE ON SCHEMA extensions TO datadog;
GRANT pg_monitor TO datadog;
```

De plus, assurez-vous que l'extension `pg_stat_statements` est activée pour votre projet dans Supabase.```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Pour la collecte de données ou les métriques personnalisées qui nécessitent d'interroger des tables supplémentaires, vous devrez peut-être accorder la <code>SELECT</code> autorisation sur ces tables à l' <code>datadog</code> utilisateur. Exemple : <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. Consultez <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">la collecte de métriques personnalisées PostgreSQL</a> pour plus d'informations. </div>

Créez la fonction suivante **dans chaque base de données** pour permettre à l'Agent de collecter les plans d'exécution.

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

### Créez la fonction de statistiques de colonne {#create-the-column-statistics-function}

Créez la fonction suivante **dans chaque base de données** pour permettre à l'Agent de collecter les statistiques de tableau au niveau des colonnes depuis `pg_stats` :

```SQL
CREATE OR REPLACE FUNCTION datadog.column_statistics()
RETURNS TABLE (
    schemaname name, tablename name, attname name,
    n_distinct real, avg_width integer, null_frac real,
    inherited boolean, correlation real, most_common_freqs real[]
) AS
$$ SELECT schemaname, tablename, attname, n_distinct, avg_width, null_frac,
          inherited, correlation, most_common_freqs
          FROM pg_catalog.pg_stats
          WHERE schemaname NOT IN ('pg_catalog', 'information_schema'); $$
LANGUAGE sql
SECURITY DEFINER
SET search_path = pg_catalog, pg_temp;
```

Une fois la fonction créée, activez la collecte dans la configuration de votre instance Postgres :

```yaml
instances:
  - dbm: true
    ...
    collect_column_statistics:
      enabled: true
```

Pour les options de réglage, consultez [Configuration avancée][18].

### Stockez votre mot de passe de manière sécurisée {#securely-store-your-password}

{{% dbm-secret %}}

### Vérifiez {#verify}

Pour vérifier que les autorisations sont correctes, connectez-vous à la base de données en tant qu'utilisateur `datadog` et exécutez les commandes suivantes. Par exemple, si votre base de données est `postgres`, connectez-vous en tant qu'utilisateur `datadog` à l'aide de [psql][7] et exécutez :

```shell
psql -h {SUPABASE_HOST} -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h {SUPABASE_HOST} -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h {SUPABASE_HOST} -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

Lorsque le mot de passe vous est demandé, utilisez celui que vous avez créé pour l'utilisateur `datadog`.

## Installer l'Agent {#install-the-agent}

L'installation du Datadog Agent installe également le check Postgres, requis pour Database Monitoring sur Supabase.
Si vous n'avez pas installé l'Agent, consultez les [instructions d'installation de l'Agent][8]. Ensuite, revenez ici pour poursuivre avec les instructions correspondant à votre méthode d'installation.

<div class="alert alert-info">La chaîne de connexion directe par défaut de Supabase n'est valide que sur les réseaux IPv6.
Pour connecter l'Agent à une instance Supabase en utilisant cette méthode, assurez-vous qu'IPv6 est activé sur la machine exécutant l'Agent. Consultez la documentation de votre fournisseur cloud pour plus d'informations.
Les instances Supabase avec le forfait Pro ou supérieur prennent en charge les adresses IPv4 en option.</div>

Modifiez le fichier `conf.d/postgres.d/conf.yaml` de l'Agent pour pointer vers l'instance Supabase que vous souhaitez surveiller. Pour une liste complète des options de configuration, consultez l'[exemple de fichier postgres.d/conf.yaml][9].

```yaml
init_config:
instances:
    - dbm: true
      host: <SUPABASE_INSTANCE_ENDPOINT>
      port: 5432
      username: datadog
      password: 'ENC[datadog_user_database_password]'

      ## Optional: Connect to a different database if needed for `custom_queries`
      # dbname: '<DB_NAME>'
```

**Remarque** : si votre mot de passe contient des caractères spéciaux, entourez-le d'apostrophes.

[Redémarrez l'Agent][16] pour appliquer les modifications.

### Validez {#validate}

[Exécutez la sous-commande status de l'Agent][13] et recherchez `postgres` dans la section Checks. Ou visitez la page [Databases][14] pour commencer !

## Exemples de configurations d'Agent {#example-agent-configurations}

### Avec le pooler de sessions de Supavisor {#with-supavisors-session-pooler}

Bien que nous recommandions d'avoir une connexion directe à la base de données plutôt que de passer par un proxy, vous pouvez toujours connecter l'Agent à votre instance Supabase si les options ci-dessus ne sont pas disponibles pour vous. Cela fonctionnera mieux lorsque vous n'avez qu'une seule instance dans votre projet Supabase.

Obtenez la chaîne de connexion du pool de sessions de votre projet via la boîte de dialogue Connect et copiez-la dans le fichier de configuration de l'Agent :

```yaml
init_config:
instances:
    - dbm: true
      host: <SUPABASE_POOLER_ENDPOINT>
      port: 5432
      username: datadog.some-project-id
      password: 'ENC[datadog_user_database_password]'
```

{{% dbm-postgres-agent-config-examples %}}

## Dépannage {#troubleshooting}

Si vous avez respecté les instructions d'installation et de configuration des intégrations et de l'Agent, mais que vous rencontrez un problème, consultez la section [Dépannage][15].

## Pour aller plus loin {#further-reading}

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
[16]: /fr/agent/configuration/agent-commands/#restart-the-agent
[17]: https://supabase.com/docs/guides/platform/ipv4-address
[18]: /fr/database_monitoring/setup_postgres/advanced_configuration/#configuring-column-statistics-collection