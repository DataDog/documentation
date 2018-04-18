---
categories:
- logging
- log collection
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/logstash/
git_integration_title: logstash
guid: 9d110885-cbdf-44e5-83b8-7a6514724e98
has_logo: false
integration_title: Logstash
is_public: true
kind: integration
maintainer: ervansetiawan@gmail.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: logstash
public_title: Intégration Datadog-Logstash
short_description: Monitorer et collecter des métriques d'exécution à partir d'une instance de Logstash
support: contrib
supported_os:
- linux
- mac_os
- windows
version: 1.0.0
---



## Aperçu

Obtenir les métriques du service Logstash en temps réel pour:

* Visualiser et monitorer les états de Logstash
* Etre informé des événements Logstash

## Implémentation

### Configuration

Créez un fichier `logstash.yaml` dans le répertoire` conf.d` de l'Agent:

#### Collecte de métrique

* Ajoutez cette configuration à votre fichier `logstash.yaml` pour commencer à rassembler vos [métriques Logstash](#metriques):

```
init_config:

instances:
  #   The URL where Logstash provides its monitoring API. This will be used to fetch various runtime metrics about Logstash.
  #
  - url: http://localhost:9600
```

Configurez le pour pointer vers votre serveur et votre port.

Consultez l'exemple du [canevas logstash.yaml](https://github.com/DataDog/integrations-extras/blob/master/logstash/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:
* [Redémarrez l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent) pour commencer à envoyer vos métriques Logstash à Datadog

#### Collecte de log

Suivez ces [instructions](https://docs.datadoghq.com/logs/faq/how-to-send-logs-to-datadog-via-external-log-shippers/#logstash) pour commencer à envoyer des logs à Datadog avec Logstash.

### Validation

[Lancez la commande `info`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) vous devriez observer la réponse suivante:

    Checks
    ======

      logstash 
      -----------------
        - instance #0 [OK]
        - Collected 61 metrics, 0 events & 1 service check

## Compatibilité

Le check Logstash est compatible avec Logstash 5.6 et peut être des versions antérieures. Actuellement il ne supporte pas les nouveaux pipelines de métriques dans Logstash 6.0. 

## Données collectées
### Métriques
{{< get-metrics-from-git "logstash" >}}


### Evénements
Le check Logstash n'inclut aucun événement pour le moment.

### Checks de Service

`logstash.can_connect`:

Renvoie CRITICAL si l'agent ne peut pas se connecter à Logstash pour collecter des métriques, sinon OK.

## Troubleshooting

### L'agent ne peut pas se connecter
```
    logstash
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 1 service check
```

Vérifiez que le paramètre `url` dans `logstash.yaml` est correcte.

## En apprendre plus

Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

