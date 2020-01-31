---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
  - autodiscovery
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/haproxy/README.md'
description: L'intégration HAProxy vous permet de recueillir des métriques sur les performances et la disponibilité à partir de vos instances HAProxy.
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
public_title: Intégration Datadog/HAProxy
short_description: 'Surveillez des métriques clés concernant les requêtes, les réponses, les erreurs, les octets traités, et plus encore.'
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

Le check HAProxy est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur HAProxy.

#### Préparer HAProxy

L'Agent recueille des métriques via un endpoint stats :

1. Configurez un endpoint dans votre fichier `haproxy.conf` :

    ```conf
      listen stats # Define a listen section called "stats"
      bind :9000 # Listen on localhost:9000
      mode http
      stats enable  # Enable stats page
      stats hide-version  # Hide HAProxy version
      stats realm Haproxy\ Statistics  # Title text for popup window
      stats uri /haproxy_stats  # Stats URI
      stats auth Username:Password  # Authentication credentials
    ```

2. [Redémarrez HAProxy pour activer l'endpoint stats][3].

### Configuration
#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

Modifiez le fichier `haproxy.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) HAProxy. Consultez le [fichier d'exemple haproxy.d/conf.yam][5] pour découvrir toutes les options de configuration disponibles.

##### Collecte de métriques

1. Ajoutez ce bloc de configuration à votre fichier `haproxy.d/conf.yaml` pour commencer à recueillir vos [métriques HAProxy](#metriques) :

    ```yaml
      init_config:

      instances:

          ## @param url - string - required
          ## Haproxy URL to connect to gather metrics.
          ## Set the according <USERNAME> and <PASSWORD> or use directly a unix stats
          ## or admin socket: unix:///var/run/haproxy.sock
          #
        - url: http://localhost/admin?stats

          ## @param username - string - optional
          ## The username to use if services are behind basic auth.
          #
          username: "<USERNAME>"

          ## @param password - string - optional
          ## The password to use if services are behind basic or NTLM auth.
          #
          password: "<PASSWORD>"
    ```

2. [Redémarrez l'Agent][6].

##### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Ajoutez ce blog de configuration à votre fichier `haproxy.d/conf.yaml` pour commencer à recueillir vos logs HAProxy ;

    ```yaml
      logs:
          - type: udp
            port: 514
            service: haproxy
            source: haproxy
            sourcecategory: http_web_access
    ```

    Modifiez la valeur du paramètre `service` et configurez-le pour votre environnement. Consultez le [fichier d'exemple haproxy.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][6].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][7] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                                     |
|----------------------|-------------------------------------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `haproxy`                                                                                 |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                             |
| `<CONFIG_INSTANCE>`  | `{"url": "https://%%host%%/admin?stats","username":"<NOMUTILISATEUR>","password":"<MOTDEPASSE>"}` |

##### Collecte de logs

**Disponible à partir des versions > 6.5 de l'Agent**

La collecte de logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][8].

| Paramètre      | Valeur                                                |
|----------------|------------------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "haproxy", "service": "<NOM_SERVICE>"}` |

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `haproxy` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "haproxy" >}}


### Événements

Le check HAProxy n'inclut aucun événement.

### Checks de service

**haproxy.backend_up** :<br>
Convertit la page de statut HAProxy en checks de service.
Renvoie `CRITICAL` pour un service donné si HAProxy le signale comme `down`.
Renvoie `OK` pour les états `maint`, `ok` et tout autre état.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

## Pour aller plus loin

* [Surveillance des métriques de performance HAProxy][12]
* [Comment recueillir des métriques HAProxy][13]
* [Surveiller HAProxy avec Datadog][14]
* [Configuration multi-processus de HAProxy][15]
* [Comment recueillir des métriques HAProxy][13]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/39f2cb0977c0e0446a0e905d15d2e9a4349b3b5d/haproxy/images/haproxy-dash.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://www.haproxy.org/download/1.7/doc/management.txt
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[8]: https://docs.datadoghq.com/fr/agent/docker/log/
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/haproxy/metadata.csv
[11]: https://docs.datadoghq.com/fr/help
[12]: https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics
[13]: https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics
[14]: https://www.datadoghq.com/blog/monitor-haproxy-with-datadog
[15]: https://docs.datadoghq.com/fr/integrations/faq/haproxy-multi-process


