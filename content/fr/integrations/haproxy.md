---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/haproxy/README.md'
description: L'intégration HAProxy vous permet de recueillir des métriques sur les performances et la disponibilité. metrics from HAProxy instances.
display_name: HAProxy
git_integration_title: haproxy
guid: cd935030-131f-4545-8b6a-a4ca21b8565b
integration_id: haproxy
integration_title: HAProxy
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: haproxy.
metric_to_check: haproxy.frontend.bytes.in_rate
name: haproxy
process_signatures:
  - haproxy
  - haproxy-master
  - haproxy-controller
public_title: Intégrations Datadog/HAProxy
short_description: 'Surveillez des métriques clés concernant les requêtes, les réponses, les erreurs, les octets traités, etc. and more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard HAProxy par défaut][1]

## Présentation

Enregistrez l'activité HAProxy dans Datadog pour :

* Visualiser les performances de répartition de charge de HAProxy
* Être informé lorsqu'un serveur tombe en panne
* Corréler les performances de HAProxy avec le reste de vos applications

## Implémentation

### Installation

Le check HAProxy est fourni avec l'Agent. Pour commencer à recueillir vos logs et métriques HAProxy, vous devez suivre les étapes suivantes :

1. [Installez l'Agent][2] sur vos serveurs HAProxy.
2. Assurez-vous d'activer les statistiques dans votre configuration HAPRoxy. [Lisez notre article de blog sur la collecte de métriques HAProxy pour en savoir plus][3].

### Configuration

Modifiez le fichier `haproxy.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) HAProxy.
Consultez le [fichier d'exemple haproxy.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

#### Préparer HAPRoxy

L'Agent recueille des métriques via un endpoint stats :

1. Configurez un endpoint dans votre fichier `haproxy.conf` :

```
    listen stats # Définir une section d'écoute intitulée « stats »
    bind :9000 # Effectuer une écoute sur localhost:9000
    mode http
    stats enable  # Activer la page des statistiques
    stats hide-version  # Masquer la version de HAProxy
    stats realm Haproxy\ Statistics  # Texte du titre de la fenêtre contextuelle
    stats uri /haproxy_stats  # URI des statistiques
    stats auth NomUtilisateur:MotdePasse # Identifiants d'authentification
```

2. [Redémarrez HAProxy pour activer le endpoint stats][6].

#### Collecte de métriques

Ajoutez ce bloc de configuration à votre fichier `haproxy.d/conf.yaml` pour commencer à recueillir vos [métriques HAProxy](#metriques) :

```
  init_config:

  instances:
      - url: https://localhost:9000/haproxy_stats
        username: <votre_nomutilisateur>
        password: <votre_motdepasse>
```

Consultez le [fichier d'exemple haproxy.yaml][5] pour découvrir toutes les options de configuration disponibles.

*  [Redémarrez l'Agent][7].

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

* La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

  ```
    logs_enabled: true
  ```

* Ajoutez ce blog de configuration à votre fichier `haproxy.d/conf.yaml` pour commencer à recueillir vos logs HAProxy ;

  ```
    logs:
        - type: udp
          port: 514
          service: haproxy
          source: haproxy
          sourcecategory: http_web_access
  ```

  Modifiez la valeur du paramètre `service` et configurez-le pour votre environnement. Consultez le [fichier d'exemple haproxy.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

* [Redémarrez l'Agent][7].

**Pour en savoir plus sur la collecte de logs, consultez [la documentation relative aux logs][8].**

### Validation

[Lancez la sous-commande `status` de l'Agent][9] et cherchez `haproxy` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "haproxy" >}}


### Événements
Le check HAProxy n'inclut aucun événement.

### Checks de service
**haproxy.backend_up**

Convertit la page de statut HAProxy en des checks de service. Renvoie `CRITICAL` pour un service donné si HAProxy le signale `down`.
Renvoie `OK` pour les états `maint`, `ok` et tout autre état.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][11].

## Pour aller plus loin

* [Surveillance des métriques de performance HAProxy][12]
* [Comment recueillir des métriques HAProxy][13]
* [Surveiller HAProxy avec Datadog][14]
* [Configuration multi-processus de HAProxy][15]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/39f2cb0977c0e0446a0e905d15d2e9a4349b3b5d/haproxy/images/haproxy-dash.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[6]: https://www.haproxy.org/download/1.7/doc/management.txt
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/logs
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/haproxy/metadata.csv
[11]: https://docs.datadoghq.com/fr/help
[12]: https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics
[13]: https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics
[14]: https://www.datadoghq.com/blog/monitor-haproxy-with-datadog
[15]: https://docs.datadoghq.com/fr/integrations/faq/haproxy-multi-process


{{< get-dependencies >}}