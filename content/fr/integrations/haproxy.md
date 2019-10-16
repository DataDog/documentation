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

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check HAProxy est fourni avec l'Agent. Pour commencer à recueillir vos logs et métriques HAProxy, suivez ces étapes :

1. [Installez l'Agent][3] sur vos serveurs HAProxy.
2. Assurez-vous d'activer les statistiques dans votre configuration HAProxy. [Lisez notre article de blog sur la collecte de métriques HAProxy pour en savoir plus][4].

### Configuration

Modifiez le fichier `haproxy.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][5] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) HAProxy.
Consultez le [fichier d'exemple haproxy.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

#### Préparer HAProxy

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

2. [Redémarrez HAProxy pour activer l'endpoint stats][7].

#### Collecte de métriques

Ajoutez ce bloc de configuration à votre fichier `haproxy.d/conf.yaml` pour commencer à recueillir vos [métriques HAProxy](#metriques) :

```
  init_config:

  instances:
      - url: https://localhost:9000/haproxy_stats
        username: <votre_nomutilisateur>
        password: <votre_motdepasse>
```

Consultez le [fichier d'exemple haproxy.yaml][6] pour découvrir toutes les options de configuration disponibles.

*  [Redémarrez l'Agent][8].

#### Collecte de logs

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

    Modifiez la valeur du paramètre `service` et configurez-le pour votre environnement. Consultez le [fichier d'exemple haproxy.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][8].

### Validation

[Lancez la sous-commande du statut de l'Agent][10] et cherchez `haproxy` dans la section Checks.

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
Besoin d'aide ? Contactez [l'assistance Datadog][12].

## Pour aller plus loin

* [Surveillance des métriques de performance HAProxy][13]
* [Comment recueillir des métriques HAProxy][14]
* [Surveiller HAProxy avec Datadog][15]
* [Configuration multi-processus de HAProxy][16]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/39f2cb0977c0e0446a0e905d15d2e9a4349b3b5d/haproxy/images/haproxy-dash.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example
[7]: https://www.haproxy.org/download/1.7/doc/management.txt
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/haproxy/metadata.csv
[12]: https://docs.datadoghq.com/fr/help
[13]: https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics
[14]: https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics
[15]: https://www.datadoghq.com/blog/monitor-haproxy-with-datadog
[16]: https://docs.datadoghq.com/fr/integrations/faq/haproxy-multi-process


{{< get-dependencies >}}