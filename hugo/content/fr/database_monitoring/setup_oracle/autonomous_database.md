---
description: Installer et configurer Database Monitoring pour Oracle Autonomous Database
further_reading:
- link: /integrations/oracle/
  tag: Documentation
  text: Intégration Oracle de base
title: Configurer Database Monitoring pour Oracle Autonomous Database
---

{{% dbm-oracle-definition %}}

L'Agent recueille les données de télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule.

## Avant de commencer

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

Incidence sur les performances
: La configuration par défaut de l'Agent pour Database Monitoring est relativement souple. Néanmoins, vous pouvez ajuster certains paramètres comme l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des workloads, l'Agent monopolise moins d'un pour cent du temps d'exécution des requêtes sur la base de données, et moins d'un pour cent du CPU. <br/><br/>
La solution Database Monitoring de Datadog fonctionne comme une intégration et vient compléter l'Agent de base ([voir les benchmarks][1]).

Proxies, répartiteurs de charge et poolers de connexion
: L'Agent doit se connecter directement au host surveillé. L'Agent ne doit pas se connecter à la base de données via un proxy, un répartiteur de charge ou un pooler de connexion. Chaque Agent doit connaître le nom d'hôte sous-jacent et doit rester associé à un seul host pendant toute sa durée de vie, même en cas de basculement. Si l'Agent Datadog se connecte à différents hosts pendant son exécution, les valeurs des métriques seront incorrectes.

Considérations relatives à la sécurité des données
: Consultez la rubrique [Informations sensibles][2] pour découvrir les données recueillies par l'Agent à partir de vos bases de données et la méthode à suivre pour garantir leur sécurité.

## Configuration

Effectuez les opérations suivantes pour activer Database Monitoring avec votre base de données Oracle :

1. [Créer l'utilisateur Datadog](#créer-lutilisateur-datadog)
1. [Accorder à l'utilisateur l'accès à la base de données](#accorder-à-lutilisateur-laccès-à-la-base-de-données)
1. [Installer l'Agent](#installer-l-agent)
1. [Configurer l'Agent](#configurer-lagent)
1. [Installer ou vérifier l'intégration Oracle](#installer-ou-vérifier-lintégration-oracle)
1. [Valider la configuration](#valider-la-configuration)

### Créer l'utilisateur Datadog 

{{% dbm-create-oracle-user %}}

### Accorder à l'utilisateur l'accès à la base de données

```SQL
grant create session to datadog ;
grant select on v$session to datadog ;
grant select on v$database to datadog ;
grant select on v$containers to datadog;
grant select on v$sqlstats to datadog ;
grant select on v$instance to datadog ;
grant select on dba_feature_usage_statistics to datadog ;
grant select on V$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V$PROCESS to datadog ;
grant select on V$SESSION to datadog ;
grant select on V$CON_SYSMETRIC to datadog ;
grant select on CDB_TABLESPACE_USAGE_METRICS to datadog ;
grant select on CDB_TABLESPACES to datadog ;
grant select on V$SQLCOMMAND to datadog ;
grant select on V$DATAFILE to datadog ;
grant select on V$SYSMETRIC to datadog ;
grant select on V$SGAINFO to datadog ;
grant select on V$PDBS to datadog ;
grant select on CDB_SERVICES to datadog ;
grant select on V$OSSTAT to datadog ;
grant select on V$PARAMETER to datadog ;
grant select on V$SQLSTATS to datadog ;
grant select on V$CONTAINERS to datadog ;
grant select on V$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V$SQL to datadog ;
grant select on V$PGASTAT to datadog ;
grant select on v$asm_diskgroup to datadog ;
grant select on v$rsrcmgrmetric to datadog ;
grant select on v$dataguard_config to datadog ;
grant select on v$dataguard_stats to datadog ;
grant select on v$transaction to datadog;
grant select on v$locked_object to datadog;
grant select on dba_objects to datadog;
grant select on cdb_data_files to datadog;
grant select on dba_data_files to datadog;
```

### Stocker votre mot de passe de manière sécurisée
{{% dbm-secret %}}

### Installer l'Agent

Consultez la documentation [Architecture de configuration DBM][12] pour déterminer où installer l'Agent. L'Agent ne nécessite aucun client Oracle externe.

Pour les étapes d'installation, consultez les [instructions d'installation de l'Agent][8].

### Configurer l'Agent

Téléchargez le fichier zip du wallet depuis Oracle Cloud et décompressez-le.

Créez le fichier de configuration Oracle de l'Agent `/etc/datadog-agent/conf.d/oracle.d/conf.yaml`. Consultez l'[exemple de fichier de configuration][11] pour toutes les options de configuration disponibles.

**Remarque :** le sous-répertoire de configuration pour les versions de l'Agent comprises entre `7.50.1` et `7.53.0` est `oracle-dbm.d`. Consultez la section [Configurer l'intégration Oracle sur l'Agent 7.50.1+][13] pour en savoir plus.

Définissez les paramètres de configuration `protocol` et `wallet`.

```yaml
init_config:
instances:
  - server: '<HOST_1>:<PORT>'
    service_name: "<SERVICE_NAME>" # The Oracle CDB service name
    username: 'datadog'
    password: 'ENC[datadog_user_database_password]'
    protocol: TCPS
    wallet: <YOUR_WALLET_DIRECTORY>
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<HOST_2>:<PORT>'
    service_name: "<SERVICE_NAME>" # The Oracle CDB service name
    username: 'datadog'
    password: 'ENC[datadog_user_database_password]'
    protocol: TCPS
    wallet: <YOUR_WALLET_DIRECTORY>
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

Une fois toute la configuration de l'Agent terminée, [redémarrez l'Agent Datadog][4].

### Valider la configuration

[Exécutez la sous-commande status de l'Agent][5] et recherchez `oracle` dans la section **Checks**. Accédez au dashboard [DBM Oracle Database Overview][7] et à la page [Databases][6] dans Datadog pour commencer.

## Requêtes personnalisées

Database Monitoring prend en charge les requêtes custom pour les bases de données Oracle. Consultez le fichier [conf.yaml.example][12] pour en savoir plus sur les options de configuration disponibles.

<div class="alert alert-danger">L'exécution de requêtes custom peut entraîner des coûts ou des frais supplémentaires facturés par Oracle.</div>

[1]: /fr/database_monitoring/agent_integration_overhead/?tab=oracle
[2]: /fr/database_monitoring/data_collected/#sensitive-information
[3]: /fr/getting_started/tagging/unified_service_tagging
[4]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[5]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://app.datadoghq.com/integrations/oracle
[11]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[12]: /fr/database_monitoring/architecture/
[13]: /fr/integrations/guide/oracle-check-upgrade-7.50.1/

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}