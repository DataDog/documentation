---
description: Installer et configurer Database Monitoring pour Oracle auto-hébergé
further_reading:
- link: /integrations/oracle/
  tag: Documentation
  text: Intégration Oracle de base
title: Configurer Database Monitoring pour Oracle auto-hébergé
---

{{% dbm-oracle-definition %}}

L'Agent recueille les données de télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule.

## Avant de commencer

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

Impact sur la performance
: La configuration par défaut de l'Agent pour Database Monitoring est conservative, mais vous pouvez ajuster des paramètres tels que l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des workloads, l'Agent représente moins d'un pour cent du temps d'exécution des requêtes sur la base de données et moins d'un pour cent du CPU. <br/><br/> Database Monitoring fonctionne comme une intégration au-dessus de la base Agent ([voir les références][6]).

Proxies, répartiteurs de charge et connection poolers
: L'Agent doit se connecter directement au host surveillé. L'Agent ne doit pas se connecter à la base de données via un proxy, un répartiteur de charge ou un connection pooler. Chaque Agent doit connaître le hostname sous-jacent et doit rester connecté à un seul host pendant toute sa durée de vie, même en cas de basculement. Si l'Agent Datadog se connecte à différents hosts pendant son exécution, les valeurs des métriques seront incorrectes.

Considérations relatives à la sécurité des données
: Consultez la section [Informations sensibles][5] pour en savoir plus sur les données que l'Agent collecte depuis vos bases de données et sur la façon de garantir leur sécurité.

## Configuration

Effectuez les opérations suivantes pour activer Database Monitoring avec votre base de données Oracle :

1. [Créer l'utilisateur Datadog](#créer-lutilisateur-datadog)
1. [Accorder à l'utilisateur l'accès à la base de données](#accorder-à-lutilisateur-laccès-à-la-base-de-données)
1. [Créer une vue](#créer-une-vue)
1. [Installer l'Agent](#installer-l-agent)
1. [Configurer l'Agent](#configurer-lagent)
1. [Installer ou vérifier l'intégration Oracle](#installer-ou-vérifier-lintégration-oracle)
1. [Valider la configuration](#valider-la-configuration)

### Créer l'utilisateur Datadog

Si l'ancienne intégration Oracle est déjà installée, ignorez cette étape, car l'utilisateur existe déjà.

Créez une connexion en lecture seule pour vous connecter au serveur et attribuez les autorisations requises :

{{< tabs >}}
{{% tab "Multi-tenant" %}}
```SQL
CREATE USER c##datadog IDENTIFIED BY &password CONTAINER = ALL ;

ALTER USER c##datadog SET CONTAINER_DATA=ALL CONTAINER=CURRENT;
```
{{% /tab %}}

{{% tab "Non-CDB" %}}
```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```
{{% /tab %}}

{{% tab "Oracle 11" %}}
```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```
{{% /tab %}}
{{< /tabs >}}

### Accorder à l'utilisateur l'accès à la base de données

Connectez-vous en tant que `sysdba` et accordez les autorisations suivantes :

{{< tabs >}}

{{% tab "Multi-tenant" %}}
{{% dbm-oracle-multitenant-permissions-grant-sql %}}
{{% /tab %}}

{{% tab "Non-CDB" %}}
{{% dbm-oracle-non-cdb-permissions-grant-sql %}}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{{% dbm-oracle-11-permissions-grant-sql %}}
{{% /tab %}}

{{< /tabs >}}

### Stocker votre mot de passe en toute sécurité
{{% dbm-secret %}}

### Créer une vue

Connectez-vous en tant que `sysdba`, créez une nouvelle `view` dans le schéma `sysdba` et accordez à l'utilisateur de l'Agent l'accès à cette vue :

{{< tabs >}}

{{% tab "Multi-tenant" %}}
{{% dbm-multitenant-view-create-sql %}}
{{% /tab %}}

{{% tab "Non-CDB" %}}
{{% dbm-non-cdb-view-create-sql %}}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{{% dbm-oracle-11-view-create-sql %}}
{{% /tab %}}

{{< /tabs >}}

### Installer l'Agent

Pour les étapes d'installation, consultez les [instructions d'installation de l'Agent][1].

### Configurer l'Agent

Créez le fichier de configuration Oracle de l'Agent `/etc/datadog-agent/conf.d/oracle.d/conf.yaml`. Consultez l'[exemple de fichier de configuration][4] pour connaître toutes les options de configuration disponibles.

**Remarque :** le sous-répertoire de configuration pour les versions de l'Agent comprises entre `7.50.1` et `7.53.0` est `oracle-dbm.d`. Consultez la section [Configurer l'intégration Oracle sur l'Agent 7.50.1+][10] pour plus de détails. 

{{< tabs >}}
{{% tab "Multi-tenant" %}}
```yaml
init_config:
instances:
  - server: '<HOSTNAME_1>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # The Oracle CDB service name
    username: 'c##datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<HOSTNAME_2>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # The Oracle CDB service name
    username: 'c##datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

L'Agent se connecte uniquement à la base de données conteneur racine multitenant (CDB). Il interroge les informations sur les PDB tout en étant connecté à la CDB racine. Ne créez pas de connexions vers des PDB individuels.
{{% /tab %}}

{{% tab "Non-CDB" %}}
{{% dbm-oracle-selfhosted-config %}}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{{% dbm-oracle-selfhosted-config %}}

{{% /tab %}}
{{< /tabs >}}

Une fois la configuration de l'Agent terminée, [redémarrez l'Agent Datadog][9].

### Valider la configuration

[Exécutez la sous-commande status de l'Agent][8] et cherchez `oracle` dans la section **Checks**. Accédez à la page [Dashboard][2] et [Databases][3] dans Datadog pour commencer.

## Requêtes personnalisées

Database Monitoring prend en charge les requêtes custom pour les bases de données Oracle. Consultez le fichier [conf.yaml.example][4] pour en savoir plus sur les options de configuration disponibles.

<div class="alert alert-danger">L'exécution de requêtes custom peut entraîner des coûts ou des frais supplémentaires facturés par Oracle.</div>

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[3]: https://app.datadoghq.com/databases
[4]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[5]: /fr/database_monitoring/data_collected/#sensitive-information
[6]: /fr/database_monitoring/agent_integration_overhead/?tab=oracle
[7]: https://app.datadoghq.com/integrations/oracle
[8]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[9]: /fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: /fr/integrations/guide/oracle-check-upgrade-7.50.1/

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}