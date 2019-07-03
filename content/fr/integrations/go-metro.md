---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - languages
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/go-metro/README.md'
display_name: Go-Metro
git_integration_title: go-metro
guid: 6d00688b-32b1-4755-98cd-44bd1bd40428
integration_id: go-metro
integration_title: Go-Metro
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.net.tcp.rtt
name: go-metro
public_title: Intégration Datadog/Go-Metro
short_description: Calculer de manière passive les durées RTT des connexions TCP entre les hosts
support: core
supported_os:
  - linux
---
## Présentation

Le check TCP RTT transmet les durées d'aller-retour entre le host sur lequel l'Agent s'exécute et tout host avec lequel il communique. Ce check est passif et ne transmet que les durées RTT pour les paquets envoyés et reçus à l'extérieur du check. Le check n'envoie aucun paquet.

Ce check est uniquement fourni avec les paquets 64 bits DEB et RPM de l'Agent v5 de Datadog. Il n'est actuellement _pas_ disponible pour l'Agent v6 de Datadog.

## Implémentation
### Installation

Le check TCP RTT, également désigné par le terme [go-metro][1], est fourni avec l'Agent, mais nécessite des bibliothèques système supplémentaires. Le check utilise les timestamps fournis par la bibliothèque PCAP pour calculer l'intervalle de temps entre tout paquet sortant et l'accusé de réception TCP correspondant. Ainsi, vous devez installer et configurer PCAP.

Les systèmes basés sur Debian doivent utiliser l'une des commandes suivantes :

```bash
$ sudo apt-get install libcap
$ sudo apt-get install libcap2-bin
```

Les systèmes basés sur Redhat doivent utiliser l'une des commandes suivantes :

```bash
$ sudo yum install libcap
$ sudo yum install compat-libcap1
```

Enfin, configurez PCAP :

```bash
$ sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

### Configuration

Modifiez le fichier ```go-metro.yaml``` dans le répertoire ```conf.d``` de votre Agent. Consultez le [fichier d'exemple go-metro.yaml][2] pour découvrir toutes les options de configuration disponibles. Voici un fichier d'exemple qui affiche les durées RTT des connexions TCP pour app.datadoghq.com et 192.168.0.22 :

  ```yaml
    init_config:
      snaplen: 512
      idle_ttl: 300
      exp_ttl: 60
      statsd_ip: 127.0.0.1
      statsd_port: 8125
      log_to_file: true
      log_level: info
    instances:
      - interface: eth0
        tags:
          - env:prod
        ips:
          - 45.33.125.153
        hosts:
          - app.datadoghq.com
  ```

### Validation

Pour vérifier que le check fonctionne correctement, consultez les métriques `system.net.tcp.rtt` dans l'interface Datadog. En outre, si vous [lancez la sous-commande `status` de l'Agent][3], le message suivant devrait s'afficher :

```
 datadog-agent.service - "Datadog Agent"
    Loaded: loaded (/lib/...datadog-agent.service; enabled; vendor preset: enabled)
    Active: active (running) since Thu 2016-03-31 20:35:27 UTC; 42min ago
  Process: 10016 ExecStop=/opt/.../supervisorctl -c /etc/dd-....conf shutdown (code=exited, status=0/SUCCESS)
  Process: 10021 ExecStart=/opt/.../start_agent.sh (code=exited, status=0/SUCCESS)
  Main PID: 10025 (supervisord)
    CGroup: /system.slice/datadog-agent.service
            ├─10025 /opt/datadog-...python /opt/datadog-agent/bin/supervisord -c /etc/dd-agent/supervisor.conf
            ├─10043 /opt/datadog-...python /opt/datadog-agent/agent/dogstatsd.py --use-local-forwarder
            ├─10044 /opt/datadog-agent/bin/go-metro -cfg=/etc/dd-agent/conf.d/go-metro.yaml
            ├─10046 /opt/datadog-.../python /opt/datadog-agent/agent/ddagent.py
            └─10047 /opt/datadog-.../python /opt/datadog-agent/agent/agent.py foreground --use-local-forwarder
```

Si le check TCP RTT a bien été initié, une ligne go-metro similaire à celle ci-dessus doit s'afficher.

**Il s'agit d'un check passif. Ainsi, les métriques sont uniquement transmises si des paquets sont activement envoyés aux hosts mentionnés dans le fichier yaml.**

## Données collectées
### Métriques
{{< get-metrics-from-git "go-metro" >}}


### Événements
Le check Go-metro n'inclut aucun événement.

### Checks de service
Le check Go-metro n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://github.com/DataDog/go-metro
[2]: https://github.com/DataDog/integrations-core/blob/master/go-metro/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/go-metro/metadata.csv
[5]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}