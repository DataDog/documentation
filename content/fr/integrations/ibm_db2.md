---
assets:
  dashboards:
    IBM Db2 Overview: assets/dashboards/overview.json
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

Le check IBM Db2 est inclus avec le paquet de l'[Agent Datadog][3].

#### Dépendances

La bibliothèque client [ibm_db][4] est requise. Pour l'installer, veillez à avoir un compilateur en fonctionnement et exécutez :

##### Unix :

```
/opt/datadog-agent/embedded/bin/pip install ibm_db==3.0.1
```

##### Windows :

Pour les versions <= 6.11 de l'Agent :
```
"C:\Program Files\Datadog\Datadog Agent\embedded\Scripts\python.exe" -m pip install ibm_db==3.0.1
```

Pour les versions >= 6.12 de l'Agent :
```
"C:\Program Files\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\Scripts\python.exe" -m pip install ibm_db==3.0.1
```

Des fonctionnalités XML peuvent être requises sur Linux. Si vous rencontrez des erreurs durant
le processus de création, installez `libxslt-dev` (ou `libxslt-devel` pour RPM).

#### Privilèges

Pour interroger les métriques de certains tableaux, des privilèges spécifiques doivent être attribués à l'utilisateur Db2 choisi.
Basculez sur l'utilisateur principal de l'instance et exécutez ces commandes dans l'invite `db2` :

```
update dbm cfg using HEALTH_MON on
update dbm cfg using DFT_MON_STMT on
update dbm cfg using DFT_MON_LOCK on
update dbm cfg using DFT_MON_TABLE on
update dbm cfg using DFT_MON_BUFPOOL on
```

Si vous exécutez désormais `get dbm cfg`, voici ce qui s'affiche :

```
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
#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

##### Collecte de métriques

1. Modifiez le fichier `ibm_db2.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance `ibm_db2`. Consultez le [fichier d'exemple ibm_db2.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

##### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

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

3. [Redémarrez l'Agent][6].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][7] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                                                         |
|----------------------|---------------------------------------------------------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `ibm_db2`                                                                                                     |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                                 |
| `<CONFIG_INSTANCE>`  | `{"db": "<NOM_BASEDEDONNÉES>", "username":"<NOMUTILISATEUR>", "password":"<MOTDEPASSE>", "host":"%%host%%", "port":"%%port%%"}` |

##### Collecte de logs

**Disponible à partir des versions > 6.5 de l'Agent**

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][8].

| Paramètre      | Valeur                                                                                                                                                                                                |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "ibm_db2", "service": "<NOM_SERVICE>", "log_processing_rules": {"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])"}}` |

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `ibm_db2` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ibm_db2" >}}


### Checks de service

**ibm_db2.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à la base de données IBM Db2 qu'il surveille. Si ce n'est pas le cas, renvoie `OK`.

**ibm_db2.status** :<br>
Renvoie `CRITICAL` si la base de données IBM Db2 surveillée est en veille, `WARNING` pour l'attente de mise en veille ou les restaurations ou renvoie `OK` pour les autres cas.

### Événements

- `ibm_db2.tablespace_state_change` se déclenche à chaque changement d'état d'un tablespace.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller IBM DB2 avec Datadog][12]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/ibm_db2/assets/images/dashboard_overview.png
[2]: https://www.ibm.com/analytics/us/en/db2
[3]: https://docs.datadoghq.com/fr/agent
[4]: https://github.com/ibmdb/python-ibmdb/tree/master/IBM_DB/ibm_db
[5]: https://github.com/DataDog/integrations-core/blob/master/ibm_db2/datadog_checks/ibm_db2/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[8]: https://docs.datadoghq.com/fr/agent/docker/log/
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/ibm_db2/metadata.csv
[11]: https://docs.datadoghq.com/fr/help
[12]: https://www.datadoghq.com/blog/monitor-db2-with-datadog