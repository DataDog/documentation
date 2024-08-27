---
title: "Configuration de Database Monitoring pour MySQL avec une gestion sur Google\_Cloud\_SQL"
description: "Installez et configurez Database Monitoring pour MySQL avec une gestion sur Google\_Cloud\_SQL."
further_reading:
  - link: /integrations/mysql/
    tag: Documentation
    text: Intégration MySQL basique
---
{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}


La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données MySQL, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, des données sur les connexions, des métriques système et des données de télémétrie à propos du moteur de stockage InnoDB.

L'Agent recueille la télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule. Suivez les étapes ci-dessous pour activer Database Monitoring avec votre base de données MySQL :

1. [Configurer les paramètres de base de données](#configurer-les-parametres-mysql)
1. [Autoriser l'Agent à accéder à la base de données](#accorder-un-acces-a-l-agent)
1. [Installer l'Agent](#installer-l-agent)
1. [Installer l'intégration Cloud SQL](#installer-l-integration-cloud-sql)

## Avant de commencer

Versions de MySQL prises en charge
: 5.6, 5.7 et 8.0+

Versions de l'Agent prises en charge
: 7.33.0+

Incidence sur les performances
: La configuration par défaut de l'Agent pour Database Monitoring est relativement souple. Néanmoins, vous pouvez ajuster certains paramètres comme l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des workloads, l'Agent monopolise moins d'un pour cent du temps d'exécution des requêtes sur la base de données, et moins d'un pour cent du CPU. <br/><br/>
La solution Database Monitoring de Datadog fonctionne comme une intégration et vient compléter l'Agent de base ([voir les benchmarks][1]).

Proxies, répartiteurs de charge et outils de regroupement de connexions
: L'Agent doit se connecter directement au host surveillé, si possible via l'adresse IP fournie dans la console GCP. L'Agent ne doit pas se connecter aux bases de données via un proxy, un répartiteur de charge ni un outil de groupement de connexions. Bien qu'il puisse s'agir d'un antipattern pour des applications client, chaque Agent doit connaître le hostname sous-jacent et rester sur un seul host pendant toute sa durée de vie, même en cas de failover. Si l'Agent Datadog se connecte à plusieurs hosts pendant son exécution, les valeurs des métriques seront incorrectes.

Considérations relatives à la sécurité des données
: Consultez la rubrique [Informations sensibles][2] pour découvrir les données recueillies par l'Agent à partir de vos bases de données et la méthode à suivre pour garantir leur sécurité.

## Configurer les paramètres MySQL


Configurez les [flags de base de données][3] suivants. **Redémarrez ensuite le serveur** pour appliquer la configuration :

{{< tabs >}}
{{% tab "MySQL 5.6" %}}
| Paramètre | Valeur | Description |
| --- | --- | --- |
| `performance_schema` | `on` | Requis. Active le [schéma de performance][1]. |
| `max_digest_length` | `4096` | Requis pour la collecte de requêtes volumineuses. Augmente la taille du texte de synthèse SQL dans les tables `events_statements_*`. Si vous conservez la valeur par défaut, les requêtes comportant plus de `1024` caractères ne seront pas recueillies. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Doit correspondre à la valeur de `max_digest_length`. |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}

{{% tab "MySQL ≥ 5.7" %}}
| Paramètre | Valeur | Description |
| --- | --- | --- |
| `performance_schema` | `on` | Requis. Active le [schéma de performance][1]. |
| `max_digest_length` | `4096` | Requis pour la collecte de requêtes volumineuses. Augmente la taille du texte de synthèse SQL dans les tables `events_statements_*`. Si vous conservez la valeur par défaut, les requêtes comportant plus de `1024` caractères ne seront pas recueillies. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Doit correspondre à la valeur de `max_digest_length`. |
| <code style="word-break:break-all;">`performance_schema_max_sql_text_length`</code> | `4096` | Doit correspondre à la valeur de `max_digest_length`. |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{< /tabs >}}

## Accorder un accès à l'Agent

L'Agent Datadog requiert un accès en lecture seule pour la base de données, afin de pouvoir recueillir les statistiques et requêtes.

Les instructions suivantes autorisent l'Agent à se connecter depuis n'importe quel host à l'aide de `datadog@'%'`. Vous pouvez restreindre l'utilisateur `datadog` avec `datadog@'localhost'`, de façon à ce qu'il soit uniquement autorisé à se connecter depuis localhost. Consultez la [documentation MYSQL][4] (en anglais) pour en savoir plus.

{{< tabs >}}
{{% tab "MySQL ≥ 8.0" %}}

Créez l'utilisateur `datadog` et accordez-lui des autorisations de base :

```sql
CREATE USER datadog@'%' IDENTIFIED WITH mysql_native_password by '<MOT_DE_PASSE_UNIQUE>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6 et 5.7" %}}

Créez l'utilisateur `datadog` et accordez-lui des autorisations de base :

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<MOT_DE_PASSE_UNIQUE>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

Créez le schéma suivant :

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
GRANT CREATE TEMPORARY TABLES ON datadog.* TO datadog@'%';
```

Créez la procédure `explain_statement` afin d'activer la collecte de plans d'exécution par l'Agent :

```sql
DELIMITER $$
CREATE PROCEDURE datadog.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
```

Créez également la procédure suivante **dans chaque schéma** pour lesquels vous souhaitez recueillir des plans d'exécution. Remplacez `<VOTRE_SCHÉMA>` par le schéma de votre base de données :

```sql
DELIMITER $$
CREATE PROCEDURE <VOTRE_SCHÉMA>.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE <VOTRE_SCHÉMA>.explain_statement TO datadog@'%';
```

### Exécuter les consommateurs de configuration
Nous vous recommandons de créer la procédure suivante afin d'autoriser l'Agent à activer les consommateurs `performance_schema.events_statements_*` lors de l'exécution.

```SQL
DELIMITER $$
CREATE PROCEDURE datadog.enable_events_statements_consumers()
    SQL SECURITY DEFINER
BEGIN
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name LIKE 'events_statements_%';
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE datadog.enable_events_statements_consumers TO datadog@'%';
```

### Vérification

Vérifiez que l'utilisateur a bien été créé à l'aide des commandes ci-dessous. Remplacez `<MOTDEPASSEUNIQUE>` par le mot de passe que vous avez créé ci-dessus :

```shell
mysql -u datadog --password=<MOTDEPASSEUNIQUE> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"
```
```shell
mysql -u datadog --password=<MOTDEPASSEUNIQUE> -e "show slave status" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"
```


## Installation de l'Agent

Pour surveiller les hosts Cloud SQL, installez l'Agent Datadog dans votre infrastructure et configurez-le de façon à ce qu'il se connecte à distance à chaque instance. L'Agent n'a pas besoin de s'exécuter sur la base de données : il doit simplement s'y connecter. Pour obtenir d'autres méthodes d'installation de l'Agent, consultez les [instructions d'installation de l'Agent][4].


{{< tabs >}}
{{% tab "Host" %}}

Pour configurer ce check pour un Agent s'exécutant sur un host, par exemple si vous provisionnez une petite instance GCE pour l'Agent afin de recueillir des données depuis une base de données Google Cloud SQL, procédez comme suit :

Modifiez le fichier `mysql.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple mysql.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles, notamment pour les métriques custom.

Ajoutez ce bloc de configuration à votre fichier `mysql.d/conf.yaml` pour recueillir des métriques MySQL :

```yaml
init_config:

instances:
  - dbm: true
    host: '<ADRESSE_INSTANCE>'
    port: 3306
    username: datadog
    password: '<MOTDEPASSEUNIQUE>' # from the CREATE USER step earlier
```

**Remarque** : ajoutez des guillemets simples autour de votre mot de passe s'il contient un caractère spécial.

[Redémarrez l'Agent][3] pour commencer à envoyer des métriques MySQL à Datadog.


[1]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Pour configurer l'Agent Database Monitoring qui s'exécute dans un conteneur Docker, par exemple dans Google Cloud Run, définissez des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur le conteneur de votre Agent.

**Remarque** : pour que le processus de découverte automatique des étiquettes fonctionne, l'Agent doit être autorisé à lire le socket Docker.

### Ligne de commande

Pour exécuter rapidement l'Agent depuis une interface de ligne de commande, utilisez la commande suivante. Modifiez les valeurs de façon à indiquer votre compte et votre environnement :

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.32.0

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["mysql"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<ADRESSE_INSTANCE>",
    "port": 3306,
    "username": "datadog",
    "password": "<MOTDEPASSEUNIQUE>"
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

### Dockerfile

Vous pouvez également spécifier des étiquettes dans un `Dockerfile`. Cette approche vous permet de concevoir et de déployer un Agent personnalisé sans avoir à modifier la configuration de l'infrastructure :

```Dockerfile
FROM gcr.io/datadoghq/agent:7.32.0

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<ADRESSE_INSTANCE>", "port": 3306,"username": "datadog","password": "<MOTDEPASSEUNIQUE>"}]'
```

Pour éviter d'exposer le mot de passe de l'utilisateur `datadog` en clair, utilisez le [package de gestion des secrets][2] de l'Agent et déclarez le mot de passe à l'aide de la syntaxe `ENC[]`. Sinon, consultez la section [Template variables Autodiscovery][3] pour découvrir comment transmettre le mot de passe en tant que variable d'environnement.


[1]: /fr/agent/docker/integrations/?tab=docker
[2]: /fr/agent/guide/secrets-management
[3]: /fr/agent/faq/template_variables/
{{% /tab %}}
{{% tab "Kubernetes" %}}

Pour surveiller des bases de données sur un cluster Kubernetes, utilisez [l'Agent de cluster Datadog][1].

Si vous n'avez pas encore activé les checks de cluster dans votre cluster Kubernetes, suivez [ces instructions][2]. Vous pouvez déclarer la configuration MySQL avec des fichiers statiques montés dans le conteneur de l'Agent de cluster, ou avec des annotations de service :

### Ligne de commande avec Helm

Exécutez la commande [Helm][3] suivante pour installer [l'Agent de cluster Datadog][1] sur votre cluster Kubernetes. Modifiez les valeurs de façon à indiquer votre compte et votre environnement :

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm install <NOM_VERSION> \
  --set 'datadog.apiKey=<CLÉ_API_DATADOG>' \
  --set 'clusterAgent.enabled=true' \
  --set "clusterAgent.confd.mysql\.yaml=cluster_check: true
init_config:
instances:
  - dbm: true
    host: <ADRESSE_INSTANCE>
    port: 3306
    username: datadog
    password: <MOT_DE_PASSE_UNIQUE" \
  datadog/datadog
```

### Configuration avec des fichiers montés

Pour configurer un check de cluster avec un fichier de configuration monté, montez le fichier de configuration dans le conteneur de l'Agent de cluster à l'emplacement suivant : `/conf.d/mysql.yaml`.

```yaml
cluster_check: true  # Bien inclure ce flag
init_config:
instances:
  - dbm: true
    host: '<ADRESSE_INSTANCE>'
    port: 3306
    username: datadog
    password: '<MOTDEPASSEUNIQUE>'
```

### Configuration avec les annotations de service Kubernetes

Au lieu de monter un fichier, vous pouvez déclarer la configuration d'instance en tant que service Kubernetes. Pour configurer ce check pour un Agent s'exécutant sur Kubernetes, créez un service dans le même espace de nommage que l'Agent de cluster Datadog :

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
  labels:
    tags.datadoghq.com/env: '<ENVIRONNEMENT>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.check_names: '["mysql"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<ADRESSE_INSTANCE>",
          "port": 3306,
          "username": "datadog",
          "password": "<MOTDEPASSEUNIQUE>"
        }
      ]
spec:
  ports:
  - port: 3306
    protocol: TCP
    targetPort: 3306
    name: mysql
```
L'Agent de cluster enregistre automatiquement cette configuration et commence à exécuter le check MySQL.

Pour éviter d'exposer le mot de passe de l'utilisateur `datadog` en clair, utilisez le [package de gestion des secrets][4] de l'Agent et déclarez le mot de passe à l'aide de la syntaxe `ENC[]`.

[1]: /fr/agent/cluster_agent
[2]: /fr/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /fr/agent/guide/secrets-management
{{% /tab %}}

{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `mysql` dans la section Checks. Vous pouvez également visiter la page [Databases][6] pour commencer à surveiller vos bases de données.

## Installer l'intégration Cloud SQL

Pour recueillir des métriques de base de données plus complètes depuis GCP, installez l'[intégration Cloud SQL][7] (facultatif).


## Dépannage

Si vous avez respecté les instructions d'installation et de configuration des intégrations et de l'Agent, mais que vous rencontrez un problème, consultez la section [Dépannage][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema
[2]: /fr/database_monitoring/data_collected/#sensitive-information
[3]: https://cloud.google.com/sql/docs/mysql/flags
[4]: https://app.datadoghq.com/account/settings#agent
[5]: /fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: /fr/integrations/google_cloudsql
[8]: /fr/database_monitoring/troubleshooting/?tab=mysql