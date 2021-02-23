---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - languages
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/go-metro/README.md'
display_name: Go-Metro
draft: false
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

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check TCP RTT, également désigné par le terme [go-metro][2], est fourni avec l'Agent, mais nécessite des bibliothèques système supplémentaires. Le check utilise les timestamps fournis par la bibliothèque PCAP pour calculer l'intervalle de temps entre tout paquet sortant et l'accusé de réception TCP correspondant. De ce fait, PCAP doit être installé et configuré.

Les systèmes basés sur Debian doivent utiliser l'une des commandes suivantes :

```bash
sudo apt-get install libcap
sudo apt-get install libcap2-bin
```

Les systèmes basés sur Redhat doivent utiliser l'une des commandes suivantes :

```bash
sudo yum install libcap
sudo yum install compat-libcap1
```

Enfin, configurez PCAP :

```bash
sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

### Configuration

Modifiez le fichier `go-metro.yaml` dans le répertoire `conf.d` de votre Agent. Consultez [le fichier d'exemple go-metro.yaml][3] pour découvrir toutes les options de configuration disponibles.
Voici un exemple de fichier qui affichera les durées TCP RTT pour app.datadoghq.com et 192.168.0.22 :

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

*REMARQUE* : pour que go-metro s'exécute sans privilèges, vous devez définir les capacités CAP_NET_RAW sur le binaire :
```
# Installer les bibliothèques requises
$ sudo apt-get install libcap  # debian
$ sudo apt-get install libcap2-bin  # autre bibliothèque debian
$ sudo yum install libcap  # redhat
$ sudo yum install compat-libcap1  # autre bibliothèque redhat

# Définir les capacités
$ sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

Étant donné que les noms des packages varient selon les distributions, si les instructions ci-dessus ne fonctionnent pas dans votre environnement, exécutez `apt-cache search libcap` ou `yum search libcap` pour afficher une sélection des packages qui peuvent fournir le binaire. N'hésitez pas à nous contacter si vous avez besoin d'aide.

Veuillez également noter que go-metro enregistre ses entrées dans son propre fichier de log, qui se trouve à l'emplacement `/var/log/datadog/go-metro.log`.
De plus, go-metro s'exécute indépendamment. Il ne s'affiche donc *PAS* dans la page d'informations de l'Agent.

Enfin, puisque le binaire go-metro est inclus avec les distributions RPM et DEB 64 bits de l'Agent Datadog, il est uniquement disponible pour ces versions. Ainsi, il n'est actuellement pas disponible avec l'installation depuis les sources ou les packages 32 bits.

### Validation

Pour vérifier que le check fonctionne correctement, consultez les métriques `system.net.tcp.rtt` dans l'interface Datadog. En outre, si vous [lancez la sous-commande `status` de l'Agent][4], vous devriez voir des lignes de code similaires à ce qui suit :

```text
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

Si le check TCP RTT a démarré, une ligne go-metro similaire à celle ci-dessus doit s'afficher :

**Il s'agit d'un check passif. Ainsi, les métriques sont uniquement transmises si des paquets sont activement envoyés aux hosts mentionnés dans le fichier yaml.**

## Données collectées

### Métriques
{{< get-metrics-from-git "go-metro" >}}


### Événements

Le check Go-metro n'inclut aucun événement.

### Checks de service

Le check Go-metro n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/go-metro
[3]: https://github.com/DataDog/integrations-core/blob/master/go-metro/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/go-metro/metadata.csv
[6]: https://docs.datadoghq.com/fr/help/