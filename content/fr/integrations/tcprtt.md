---
integration_title: Check TCP RTT
name: tcp_rtt
kind: integration
newhlevel: true
is_public: true
public_title: Intégration Datadog/TCP RTT
short_description: "Surveillez la connectivité TCP vers les hosts à distance."
categories:
- network
ddtype: check
dependencies: ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/tcprtt.md"]
---
## Présentation

Le check TCP RTT transmet les durées d'aller-retour entre le host sur lequel l'Agent s'exécute et tout host avec lequel il communique. Ce check est passif et ne transmet que les durées RTT pour les paquets envoyés et reçus à l'extérieur du check. Le check n'envoie aucun paquet.

Ce check est uniquement fourni avec les paquets 64 bits DEB et RPM de l'Agent de Datadog.

## Configuration

### Installation

Le check utilise les timestamps fournis par la bibliothèque PCAP pour calculer l'intervalle de temps entre tout paquet sortant et l'accusé de réception TCP correspondant. En tant que tel, PCAP doit être installé et configuré.

Les systèmes basés sur Debian doivent utiliser l'une des commandes suivantes :

```text
$ sudo apt-get install libcap
$ sudo apt-get install libcap2-bin
```

Les systèmes basés sur Redhat doivent utiliser l'une des commandes suivantes :

```text
$ sudo yum install libcap
$ sudo yum install compat-libcap1
```

Enfin, configurez PCAP :

```text
$ sudo setcap cap_net_raw+ep /opt/datadog-agent/bin/go-metro
```

### Configuration

Modifiez le fichier `go-metro.yaml` dans le dossier `conf.d` de votre Agent. Voici un fichier d'exemple qui affichera les durées TCP RTT pour app.datadoghq.com et 192.168.0.22 :

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

{{< insert-example-links conf="go-metro" check="none" >}}

### Validation

Pour vérifier que le check fonctionne correctement, consultez les métriques `system.net.tcp.rtt` dans l'interface Datadog. En outre, si vous exécutez `sudo /etc/init.d/datadog-agent status`, le message suivant devrait s'afficher :

```shell
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

Il s'agit d'un check passif. Ainsi, les métriques sont uniquement transmises si des paquets sont activement envoyés aux hosts mentionnés dans le fichier yaml.

## Données recueillies

### Métriques

{{< get-metrics-from-git "system" "system.net.tcp.rtt" >}}
