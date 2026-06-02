---
description: Installez et configurez la surveillance Datadog pour Postgres sur Amazon RDS.
further_reading:
- link: /integrations/postgres/
  tag: Documentation
  text: Intégation Postgres basique
- link: /database_monitoring/guide/rds_autodiscovery
  tag: Documentation
  text: Autodécouverte pour RDS
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentation
  text: Capture des valeurs des paramètres de requête SQL
title: Configuration de la surveillance de base de données avec Postgres sur Amazon RDS
---
La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données Postgres, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, des états, des failovers et des événements de base de données.

L'Agent recueille les données de télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule. Effectuez la configuration suivante pour activer la surveillance de la base de données avec votre base de données Postgres :

1. [Configurer l'intégration AWS](#configure-the-aws-integration)
1. [Configurer les paramètres de la base de données](#configure-postgres-settings)
1. [Accorder à l'Agent l'accès à la base de données](#grant-the-agent-access)
1. [Installer et configurer l'Agent](#install-and-configure-the-agent)
1. [Installer l'intégration RDS](#install-the-rds-integration)

<div class="alert alert-info">
<a href="/database_monitoring/setup_postgres/rds/quick_install">Installation rapide RDS</a> est notre méthode d'installation recommandée pour les environnements plus petits (par exemple, 20 hôtes de base de données) ou ceux qui découvrent DBM et souhaitent l'essayer rapidement. Pour ceux qui gèrent de grandes flottes de bases de données où le déploiement de l'agent via l'interface utilisateur ne s'adapte pas aussi bien, nous recommandons l'installation standard, pour gérer l'agent vous-même ou intégrer vos pratiques d'automatisation.
</div>

## Avant de commencer {#before-you-begin}

Versions PostgreSQL prises en charge
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17

Versions de l'Agent prises en charge
: 7.36.1+

Impact sur la performance
: La configuration par défaut de l'Agent pour la surveillance de la base de données est conservatrice, mais vous pouvez ajuster des paramètres tels que l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des charges de travail, l'Agent représente moins d'un pour cent du temps d'exécution des requêtes sur la base de données et moins d'un pour cent du CPU. <br/><br/>
La surveillance de la base de données fonctionne comme une intégration au-dessus de l'Agent de base ([voir les benchmarks][1]).

Proxies, équilibreurs de charge et gestionnaires de connexions
: L'Agent Datadog doit se connecter directement à l'hôte surveillé. Pour les bases de données auto-hébergées, utilisez `127.0.0.1` ou le socket. L'Agent ne doit pas se connecter à la base de données via un proxy, un équilibreur de charge ou un pool de connexions tel que `pgbouncer`. Si l'Agent se connecte à différents hôtes pendant son fonctionnement (comme dans le cas d'un basculement, d'un équilibrage de charge, etc.), l'Agent calcule la différence de statistiques entre deux hôtes, produisant des métriques inexactes.

Considérations relatives à la sécurité des données
: Voir [Informations sensibles][2] pour des informations sur les données que l'Agent collecte de vos bases de données et comment garantir leur sécurité.

## Configurer l'intégration AWS {#configure-the-aws-integration}

Activez {{< ui >}}Resource Collection{{< /ui >}} dans la section {{< ui >}}Resource Collection{{< /ui >}} de votre [carte d'intégration Amazon Web Services][3] .

## Configurer les paramètres Postgres {#configure-postgres-settings}

Configurez les [paramètres][4] suivants dans le [groupe de paramètres DB][5] puis **redémarrez le serveur** pour que les paramètres prennent effet. Pour plus d'informations sur ces paramètres, consultez la [documentation Postgres][6].

**Paramètres requis**

| Paramètre | Valeur | Description |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Requis pour les métriques `postgresql.queries.*`. Active la collecte des métriques de requête en utilisant l'extension [pg_stat_statements][6]. |
| `track_activity_query_size` | `4096` | Requis pour la collecte de requêtes plus volumineuses. Augmente la taille du texte SQL dans `pg_stat_activity`. S'il est laissé à la valeur par défaut, les requêtes de plus de `1024` caractères ne seront pas collectées. |

**Paramètres optionnels**

| Paramètre | Valeur | Description |
| --- | --- | --- |
| `pg_stat_statements.track` | `ALL` | Active le suivi des instructions dans les procédures stockées et les fonctions. |
| `pg_stat_statements.max` | `10000` | Augmente le nombre de requêtes normalisées suivies dans `pg_stat_statements`. Recommandé pour les bases de données à fort volume qui reçoivent de nombreux types de requêtes de différents clients. |
| `pg_stat_statements.track_utility` | `off` | Désactive les commandes utilitaires comme PREPARE et EXPLAIN. Définir cette valeur à `off` signifie que seules les requêtes comme SELECT, UPDATE et DELETE sont suivies. |
| `track_io_timing` | `on` | Active la collecte des temps de lecture et d'écriture des blocs pour les requêtes. |

### Activer `auto_explain` (optionnel) {#enable-auto-explain-optional}

Par défaut, l'agent ne collecte que les plans [`EXPLAIN`][15] pour un échantillonnage des requêtes en cours. Ces plans sont de nature plus générale, surtout lorsque le code de l'application utilise des instructions préparées.

Pour collecter des plans `EXPLAIN ANALYZE` complets issus de toutes les requêtes, vous devez utiliser [`auto_explain`][16], une extension de première partie fournie avec PostgreSQL disponible chez tous les principaux fournisseurs. _La collecte des journaux est une condition préalable à la collecte de `auto_explain`_, donc activez-la avant de continuer.

<div class="alert alert-danger">
<strong>Important:</strong> <code>auto_explain</code> produit des lignes de journal qui peuvent contenir des données sensibles de l'application, similaires aux valeurs brutes dans un SQL non obfusqué. Utilisez le <a href="/account_management/rbac/permissions/#database-monitoring"><code>dbm_parameterized_queries_read</code></a> autorisation pour contrôler l'accès aux plans résultants. Pour restreindre la visibilité des lignes de journal elles-mêmes—qui sont visibles par défaut pour tous les utilisateurs de votre organisation Datadog—configurez également <a href="/logs/guide/logs-rbac">RBAC pour les journaux</a>. Datadog recommande d'utiliser les deux autorisations pour protéger efficacement les informations sensibles.
</div>

1. Configurer les paramètres `auto_explain`. Le format de journal _doit_ être `json`, mais d'autres paramètres peuvent varier en fonction de votre application. Cet exemple enregistre un plan `EXPLAIN ANALYZE` pour toutes les requêtes de plus d'une seconde, y compris les informations de tampon, mais omettant le timing (ce qui peut entraîner une surcharge).

| Paramètre | Valeur | Description |
| --- | --- | --- |
| `shared_preload_libraries`      | `pg_stat_statements,auto_explain` | Active l'automatisation `EXPLAIN ANALYZE` |
| `auto_explain.log_format`       | `json` | Génère des plans lisibles par machine |
| `auto_explain.log_min_duration` | `1000` | Enregistre les plans lorsque les requêtes dépassent une seconde |
| `auto_explain.log_analyze`      | `on` | Utilisez le formulaire `ANALYZE` de `EXPLAIN` |
| `auto_explain.log_buffers`      | `on` | Incluez l'utilisation de tampon dans les plans |
| `auto_explain.log_timing`       | `off` | N'incluez pas le timing (forte surcharge) |
| `auto_explain.log_triggers`     | `on` | Incluez des plans pour l'instruction de déclenchement |
| `auto_explain.log_verbose`      | `on` | Utilisez le type de plan détaillé |
| `auto_explain.log_nested_statements` | `on` | Incluez des instructions imbriquées |
| `auto_explain.sample_rate`      | `1` | Expliquez toutes les requêtes sur la durée |

2. Changez le `log_line_prefix` pour activer une corrélation d'événements plus riche. Pour plus d'informations, consultez la documentation des [groupes de paramètres RDS DB][17]. `auto_explain`L'ingestion nécessite que cela soit réglé sur `%m:%r:%u@%d:[%p]:%l:%e:%s:%v:%x:%c:%q%a`.

3. Pour vous assurer que vos instances RDS transmettent les journaux à CloudWatch et Datadog, suivez les instructions pour [la collecte de journaux Amazon RDS][18].


## Accordez l'accès à l'Agent {#grant-the-agent-access}

L'Agent Datadog requiert un accès en lecture seule pour le serveur de la base de données, afin de pouvoir recueillir les statistiques et requêtes.

Exécutez les commandes SQL suivantes sur le serveur de base de données **principal** (le primaire) dans le cluster si Postgres est répliqué. L'Agent peut collecter la télémétrie de toutes les bases de données sur le serveur, quelle que soit la base de données à laquelle il se connecte. Utilisez la base de données par défaut `postgres` à moins que vous n'ayez besoin que l'Agent exécute [des requêtes personnalisées sur des données uniques à une autre base de données][7].

Connectez-vous à votre base de données choisie en tant que superutilisateur (ou un autre utilisateur avec des autorisations suffisantes). Par exemple, pour se connecter à la base de données `postgres` en utilisant [psql][8]:

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Créez l'utilisateur `datadog` :

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

**Remarque :** L'authentification IAM est également prise en charge. Consultez [le guide][9] sur la façon de configurer cela pour votre instance RDS.

{{< tabs >}}
{{% tab "Postgres ≥ 15" %}}

Donnez à l'utilisateur `datadog` l'autorisation d'accéder aux tables pertinentes :

```SQL
ALTER ROLE datadog INHERIT;
```

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements schema public;
```
{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements schema public;
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

<div class="alert alert-info">Pour la collecte de données ou de métriques personnalisées nécessitant l'interrogation de tables supplémentaires, vous devrez peut-être accorder les permissions sur ces tables à l'utilisateur. <code>SELECT</code> permissions sur ces tables à l' <code>datadog</code> utilisateur. Exemple : <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>Consultez <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">la collecte de métriques personnalisées PostgreSQL</a> pour plus d'informations. </div>

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

### Stockez votre mot de passe de manière sécurisée {#securely-store-your-password}
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

## Installez et configurez l'Agent {#install-and-configure-the-agent}

Pour surveiller les hôtes RDS, installez l'Agent Datadog dans votre infrastructure et configurez-le pour se connecter à chaque point de terminaison d'instance à distance. L'Agent n'a pas besoin de s'exécuter sur la base de données, il doit simplement s'y connecter. Pour des méthodes d'installation supplémentaires de l'Agent non mentionnées ici, consultez les [instructions d'installation de l'Agent][10].

{{< tabs >}}
{{% tab "Host" %}}
Pour configurer la collecte de métriques de surveillance Datadog pour un Agent s'exécutant sur un host, par exemple si vous provisionnez une petite instance EC2 pour l'Agent afin de recueillir des données depuis une base de données RDS, procédez comme suit :

1. Modifiez le fichier `postgres.d/conf.yaml` pour pointer vers votre `host` / `port` et définissez les maîtres à surveiller. Consultez le [sample postgres.d/conf.yaml][1] pour toutes les options de configuration disponibles :

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AWS_INSTANCE_ENDPOINT>'
       port: 5432
       username: datadog
       password: 'ENC[datadog_user_database_password]'
       aws:
         instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
         region: '<REGION>'
       tags:
         - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

       ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
       # pg_stat_statements_view: datadog.pg_stat_statements()
       # pg_stat_activity_view: datadog.pg_stat_activity()

       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

   Pour les versions de l'Agent `≤ 7.49`, ajoutez le paramètre suivant à la configuration de l'instance où `host` et `port` sont spécifiés :

   ```yaml
   ssl: allow
   ```

   Si vous souhaitez vous authentifier avec IAM, spécifiez les paramètres `region` et `instance_endpoint`, et définissez `managed_authentication.enabled` sur `true`.

   **Remarque** : activez `managed_authentication` uniquement si vous souhaitez utiliser l'authentification IAM. L'authentification IAM a la priorité sur le champ `password`.

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AWS_INSTANCE_ENDPOINT>'
       port: 5432
       username: datadog
       aws:
         instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
         region: '<REGION>'
         managed_authentication:
           enabled: true
       tags:
         - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

       ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
       # pg_stat_statements_view: datadog.pg_stat_statements()
       # pg_stat_activity_view: datadog.pg_stat_activity()

       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```

   Pour des informations sur la configuration de l'authentification IAM sur votre instance RDS, consultez [Connexion avec l'authentification gérée][3].

2. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: /fr/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "Docker" %}}
Pour configurer une intégration pour un Agent fonctionnant dans un conteneur Docker tel que dans ECS ou Fargate, vous disposez de plusieurs méthodes, toutes couvertes en détail dans la [Documentation de configuration Docker][1].

Les exemples ci-dessous montrent comment utiliser [les étiquettes Docker][2] et [les modèles d'autodécouverte][3] pour configurer l'intégration Postgres.

**Remarque** : L'Agent doit avoir l'autorisation de lecture sur le socket Docker pour que l'autodécouverte des étiquettes fonctionne.

### Ligne de commande {#command-line}

Exécutez la commande suivante depuis votre [ligne de commande][4] pour démarrer l'Agent. Remplacez les valeurs de remplacement par celles de votre compte et de votre environnement.

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.checks='{"postgres": {
    "init_config": {},
    "instances": [{
      "dbm": true,
      "host": "<AWS_INSTANCE_ENDPOINT>",
      "port": 5432,
      "username": "datadog",
      "password": "<UNIQUEPASSWORD>",
       "aws": {
         "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
         "region": "<REGION>"
       },
      "tags": ["dbinstanceidentifier:<DB_INSTANCE_NAME>"]
    }]
  }}' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

Pour Postgres 9.6, ajoutez les paramètres suivants à la configuration d'instance où l'hôte et le port sont spécifiés :

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

### Dockerfile {#dockerfile}

Vous pouvez également spécifier des étiquettes dans un `Dockerfile`, vous permettant de créer et de déployer un Agent personnalisé sans modifier la configuration de votre infrastructure :

```Dockerfile
FROM registry.datadoghq.com/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 5432,"username": "datadog","password": "ENC[datadog_user_database_password]","aws": {"instance_endpoint": "<AWS_INSTANCE_ENDPOINT>", "region": "<REGION>"}, "tags": ["dbinstanceidentifier:<DB_INSTANCE_NAME>"]}]'
```

Pour Postgres 9.6, ajoutez les paramètres suivants à la configuration d'instance où l'hôte et le port sont spécifiés :

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

Pour éviter d'exposer le mot de passe de l'utilisateur `datadog` en texte clair, utilisez le [package de gestion des secrets de l'Agent][5] et déclarez le mot de passe en utilisant la syntaxe `ENC[]`. Alternativement, consultez la [documentation des variables de modèle d'autodécouverte][6] pour fournir le mot de passe en tant que variable d'environnement.

[1]: /fr/containers/docker/integrations/?tab=labels#configuration
[2]: https://docs.docker.com/engine/manage-resources/labels/
[3]: /fr/getting_started/containers/autodiscovery/
[4]: /fr/containers/docker/integrations/?tab=labels#using-docker-run-nerdctl-run-or-podman-run
[5]: /fr/agent/configuration/secrets-management
[6]: /fr/agent/faq/template_variables/
{{% /tab %}}

{{% tab "Kubernetes" %}}
Si vous exécutez un cluster Kubernetes, utilisez le [Datadog Cluster Agent][1] pour activer la surveillance de la base de données.

**Remarque** : Assurez-vous que les [vérifications de cluster][2] sont activées pour votre Datadog Cluster Agent avant de continuer.

Voici des instructions étape par étape pour configurer l'intégration Postgres en utilisant différentes méthodes de déploiement du Datadog Cluster Agent :

### Opérateur {#operator}

En utilisant les [instructions de l'Opérateur dans Kubernetes et Intégrations][3] comme référence, suivez les étapes ci-dessous pour configurer l'intégration Postgres :

1. Créez ou mettez à jour le fichier `datadog-agent.yaml` avec la configuration suivante :

    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      global:
        clusterName: <CLUSTER_NAME>
        site: <DD_SITE>
        credentials:
          apiSecret:
            secretName: datadog-agent-secret
            keyName: api-key

      features:
        clusterChecks:
          enabled: true

      override:
        nodeAgent:
          image:
            name: agent
            tag: <AGENT_VERSION>

        clusterAgent:
          extraConfd:
            configDataMap:
              postgres.yaml: |-
                cluster_check: true
                init_config:
                instances:
                - host: <AWS_INSTANCE_ENDPOINT>
                  port: 5432
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  dbm: true
                  aws:
                    instance_endpoint: <AWS_INSTANCE_ENDPOINT>
                    region: <REGION>
                  tags:
                  - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

    ```

    **Note**: For Postgres 9.6, add the following lines to the instance config where host and port are specified:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. Appliquez les modifications au Datadog Operator en utilisant la commande suivante :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

En utilisant les [instructions Helm dans Kubernetes et Intégrations][4] comme référence, suivez les étapes ci-dessous pour configurer l'intégration Postgres :

1. Mettez à jour votre fichier `datadog-values.yaml` (utilisé dans les instructions d'installation du Cluster Agent) avec la configuration suivante :

    ```yaml
    datadog:
      clusterChecks:
        enabled: true

    clusterChecksRunner:
      enabled: true

    clusterAgent:
      enabled: true
      confd:
        postgres.yaml: |-
          cluster_check: true
          init_config:
          instances:
          - dbm: true
            host: <AWS_INSTANCE_ENDPOINT>
            port: 5432
            username: datadog
            password: 'ENC[datadog_user_database_password]'
            aws:
              instance_endpoint: <AWS_INSTANCE_ENDPOINT>
              region: <REGION>
            tags:
            - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

    ```

    **Note**: For Postgres 9.6, add the following lines to the instance config where host and port are specified:

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. Déployez l'Agent avec le fichier de configuration ci-dessus en utilisant la commande suivante :

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Pour Windows, ajoutez <code>--set targetSystem=windows</code> à la <code>helm install</code> commande.
</div>

### Configurer avec des fichiers montés {#configure-with-mounted-files}

Pour configurer une vérification de cluster avec un fichier de configuration monté, montez le fichier de configuration dans le conteneur Cluster Agent à l'emplacement : `/conf.d/postgres.yaml` :

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: <AWS_INSTANCE_ENDPOINT>
      region: <REGION>
    tags:
    - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

    ## Required: For Postgres 9.6, uncomment these lines to use the functions created in the setup
    # pg_stat_statements_view: datadog.pg_stat_statements()
    # pg_stat_activity_view: datadog.pg_stat_activity()
```

### Configurer avec des annotations de service Kubernetes {#configure-with-kubernetes-service-annotations}

Au lieu de monter un fichier, vous pouvez déclarer la configuration de l'instance en tant que service Kubernetes. Pour configurer cette vérification pour un Agent fonctionnant sur Kubernetes, créez un service en utilisant la syntaxe suivante :

#### Annotations d'autodécouverte v2 {#autodiscovery-annotations-v2}

```yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.checks: |
      {
        "postgres": {
          "init_config": <INIT_CONFIG>,
          "instances": [
            {
              "dbm": true,
              "host": "<AWS_INSTANCE_ENDPOINT>",
              "port": 5432,
              "username": "datadog",
              "password": "ENC[datadog_user_database_password]",
              "aws": {
                "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
                "region": "<REGION>"
              },
              "tags": [
                "dbinstanceidentifier:<DB_INSTANCE_NAME>"
              ]
            }
          ]
        }
      }
spec:
  ports:
  - port: 5432
    protocol: TCP
    targetPort: 5432
    name: postgres
```

Pour plus d'informations, consultez [Annotations d'autodécouverte][5].

Si vous utilisez Postgres 9.6, ajoutez ce qui suit à la configuration de l'instance :

```json
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

L'Agent de cluster enregistre automatiquement cette configuration et commence à exécuter le check Postgres.

Pour éviter d'exposer le mot de passe de l'utilisateur `datadog` en texte clair, utilisez le [package de gestion des secrets de l'Agent][6] et déclarez le mot de passe en utilisant la syntaxe `ENC[]`.

[1]: /fr/containers/cluster_agent/setup/
[2]: /fr/containers/cluster_agent/clusterchecks/
[3]: /fr/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /fr/containers/kubernetes/integrations/?tab=helm
[5]: /fr/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /fr/agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

### Vérifiez la configuration de l'Agent {#verify-agent-setup}

[Exécutez la sous-commande d'état de l'Agent][11] et recherchez `postgres` dans la section Vérifications. Ou visitez la page [Bases de données][12] pour commencer !

## Exemples de configurations d'Agent {#example-agent-configurations}
{{% dbm-postgres-agent-config-examples %}}

## Installez l'intégration RDS {#install-the-rds-integration}

Pour voir les métriques d'infrastructure d'AWS, telles que le CPU, aux côtés de la télémétrie de la base de données dans DBM, installez l'[intégration RDS][13] (optionnelle).

## Dépannage {#troubleshooting}

Si vous avez installé et configuré les intégrations et l'Agent comme décrit et que cela ne fonctionne pas comme prévu, consultez [Dépannage][14].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/database_monitoring/agent_integration_overhead/?tab=postgres
[2]: /fr/database_monitoring/data_collected/#sensitive-information
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://www.postgresql.org/docs/current/config-setting.html
[5]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html
[6]: https://www.postgresql.org/docs/current/pgstatstatements.html
[7]: /fr/integrations/faq/postgres-custom-metric-collection-explained/
[8]: https://www.postgresql.org/docs/current/app-psql.html
[9]: /fr/database_monitoring/guide/managed_authentication
[10]: https://app.datadoghq.com/account/settings/agent/latest
[11]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[12]: https://app.datadoghq.com/databases
[13]: /fr/integrations/amazon_rds
[14]: /fr/database_monitoring/troubleshooting/?tab=postgres
[15]: https://www.postgresql.org/docs/current/sql-explain.html
[16]: https://www.postgresql.org/docs/current/auto-explain.html
[17]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.Concepts.PostgreSQL.overview.parameter-groups.html
[18]: /fr/integrations/amazon-rds/?tab=standard#log-collection