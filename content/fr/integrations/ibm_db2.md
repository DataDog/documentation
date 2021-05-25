---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    IBM Db2 Overview: assets/dashboards/overview.json
  logs:
    source: ibm_db2
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ibm_db2/README.md'
display_name: IBM Db2
draft: false
git_integration_title: ibm_db2
guid: 67378f79-e72b-4f49-8ec2-57053706523d
integration_id: ibm-db2
integration_title: IBM Db2
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ibm_db2.
metric_to_check: ibm_db2.connection.active
name: ibm_db2
public_title: "Intégration Datadog/IBM\_Db2"
short_description: "Surveillez les métriques de tablespace et de pool de mémoires tampon ainsi que d'autres métriques depuis votre base de données IBM\_Db2."
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard par défaut][1]

## Présentation

Ce check surveille [IBM Db2][2] avec l'Agent Datadog.

## Configuration

### Installation

Le check IBM Db2 est inclus avec le package de l'[Agent Datadog][3].

#### Dépendances

La bibliothèque client [ibm_db][4] est requise. Pour l'installer, veillez à avoir un compilateur opérationnel et exécutez :

##### Unix

```text
/opt/datadog-agent/embedded/bin/pip install ibm_db==3.0.1
```

##### Windows

Pour les versions <= 6.11 de l'Agent :

```text
"C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" -m pip install ibm_db==3.0.1
```

Pour les versions >= 6.12 de l'Agent :

```text
"C:\Program Files\Datadog\Datadog Agent\embedded<VERSION_MAJEURE_PYTHON>\python.exe" -m pip install ibm_db==3.0.1
```

Des fonctionnalités XML peuvent être requises sur Linux. Si vous rencontrez des erreurs durant
le processus de création, installez `libxslt-dev` (ou `libxslt-devel` pour RPM).

#### Privilèges

Pour interroger les métriques de certains tableaux, des privilèges spécifiques doivent être attribués à l'utilisateur Db2 choisi.
Basculez sur l'utilisateur principal de l'instance et exécutez ces commandes dans l'invite `db2` :

```text
update dbm cfg using HEALTH_MON on
update dbm cfg using DFT_MON_STMT on
update dbm cfg using DFT_MON_LOCK on
update dbm cfg using DFT_MON_TABLE on
update dbm cfg using DFT_MON_BUFPOOL on
```

Si vous exécutez désormais `get dbm cfg`, voici ce qui s'affiche :

```text
 Default database monitor switches
   Buffer pool                         (DFT_MON_BUFPOOL) = ON
   Lock                                   (DFT_MON_LOCK) = ON
   Sort                                   (DFT_MON_SORT) = OFF
   Statement                              (DFT_MON_STMT) = ON
   Table                                 (DFT_MON_TABLE) = ON
   Timestamp                         (DFT_MON_TIMESTAMP) = ON
   Unit of work                            (DFT_MON_UOW) = OFF
 Monitor health of instance and databases   (HEALTH_MON) = ON
```

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `ibm_db2.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance `ibm_db2`. Consultez le [fichier d'exemple ibm_db2.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][2].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `ibm_db2.d/conf.yaml` pour commencer à recueillir vos logs IBM Db2 :

   ```yaml
   logs:
     - type: file
       path: /home/db2inst1/sqllib/db2dump/db2diag.log
       source: ibm_db2
       service: db2sysc
       log_processing_rules:
         - type: multi_line
           name: new_log_start_with_date
           pattern: \d{4}\-(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])
   ```

3. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/ibm_db2/datadog_checks/ibm_db2/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `ibm_db2`                                                                                                     |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                                 |
| `<CONFIG_INSTANCE>`  | `{"db": "<NOM_BASEDEDONNÉES>", "username":"<NOMUTILISATEUR>", "password":"<MOTDEPASSE>", "host":"%%host%%", "port":"%%port%%"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                                                                                                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "ibm_db2", "service": "<NOM_SERVICE>", "log_processing_rules": {"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])"}}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `ibm_db2` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ibm_db2" >}}


### Checks de service

**ibm_db2.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à la base de données IBM Db2 qu'il surveille. Si ce n'est pas le cas, renvoie `OK`.

**ibm_db2.status** :<br>
Renvoie `CRITICAL` si la base de données IBM Db2 surveillée est en veille, `WARNING` pour l'attente de mise en veille ou les restaurations ou renvoie `OK` pour les autres cas.

### Événements

- `ibm_db2.tablespace_state_change` se déclenche à chaque changement d'état d'un tablespace.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller IBM DB2 avec Datadog][7]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/ibm_db2/images/dashboard_overview.png
[2]: https://www.ibm.com/analytics/us/en/db2
[3]: https://docs.datadoghq.com/fr/agent/
[4]: https://github.com/ibmdb/python-ibmdb/tree/master/IBM_DB/ibm_db
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://www.datadoghq.com/blog/monitor-db2-with-datadog