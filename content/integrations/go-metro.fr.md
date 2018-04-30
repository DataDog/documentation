---
categories:
- languages
- log collection
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/go-metro/
git_integration_title: go-metro
guid: 6d00688b-32b1-4755-98cd-44bd1bd40428
has_logo: true
integration_title: Go-Metro
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: go-metro
public_title: Intégration Datadog-Go-Metro
short_description: Calculer de manière passive TCP RTT entre les hôtes
support: core
supported_os:
- linux
version: 1.0.0
---



## Aperçu

Le check TCP RTT signale les temps d'aller-retour entre l'hôte sur lequel l'agent s'exécute et tout hôte avec lequel il communique. Cette vérification est passive et ne rapporte que les temps RTT pour les paquets envoyés et reçus de l'extérieur du check. Le check lui-même n'enverra aucun paquet.

Ce check est uniquement fourni avec les packages 64 bits DEB et RPM Datadog Agent v5. Le check n'est actuellement pas disponible avec Datadog Agent v6.

## Implémentation
### Installation

Le check TCP RTT, également appelée [go-metro](https://github.com/DataDog/go-metro), est fourni avec l'Agent, mais nécessite des bibliothèques système supplémentaires. Le check utilise les timestamps fournis par la bibliothèque PCAP pour calculer l'intervalle de temps entre tout paquet sortant et l'accusé de réception TCP correspondant. En tant que tel, PCAP doit être installé et configuré.

Les systèmes basés sur Debian devraient utiliser l'un des éléments suivants:

```
$ sudo apt-get install libcap
$ sudo apt-get install libcap2-bin
```

Les systèmes basés sur Redhat devraient utiliser l'un de ceux-ci:

```
$ sudo yum install libcap
$ sudo yum install compat-libcap1
```

Enfin, configurez PCAP:

```
$ sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

### Configuration

Editez le fichier ```go-metro.yaml``` dans le dossier ```conf.d``` . onsultez l'exemple du [sample go-metro.yaml](https://github.com/DataDog/integrations-core/blob/master/go-metro/conf.yaml.example)pour apprendre toutes les options de configuration disponibles. Voici un exemple de fichier qui affichera les temps TCP RTT pour app.datadoghq.com et 192.168.0.22:

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

### Validation

Pour vérifier que le check fonctionne correctement, vous devriez voir les métriques `system.net.tcp.rtt` dans l'interface Datadog. En outre, si vous exécutez `sudo /etc/init.d/datadog-agent status`, vous devriez voir quelque chose de similaire à ce qui suit:

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

Si le check TCP RTT a démarré, vous devriez voir quelque chose de similaire à la ligne go-metro ci-dessus.

C'est un check passive, donc à moins que des paquets ne soient envoyés activement aux hôtes mentionnés dans le fichier yaml, les métriques ne seront pas rapportées.

## Compatibilité

La vérification TCP RTT est compatible avec les plateformes Linux.

## Données collectées
### Métriques
{{< get-metrics-from-git "go-metro" >}}


### Evénements
Le check Go-metro n'inclut aucun événement pour le moment.

### Checks de Service
Le check Go-metro n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

