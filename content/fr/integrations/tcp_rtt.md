---
aliases:
- /fr/integrations/tcprtt
categories:
- network
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/tcp_rtt.md
integration_id: tcp-rtt
integration_title: TCP RTT
is_public: true
custom_kind: integration
name: tcp_rtt
newhlevel: true
public_title: Intégration Datadog/TCP RTT
short_description: Surveillez la connectivité TCP vers les hosts à distance.
---

## Présentation

Le check TCP RTT transmet les délais d'aller-retour entre le host de l'Agent et tout host avec lequel il communique. Ce check est passif et ne transmet que les durées RTT pour les paquets envoyés et reçus à l'extérieur du check. Le check n'envoie aucun paquet.

Ce check est uniquement fourni avec les paquets 64 bits DEB et RPM de l'Agent v5 de Datadog. Pour d'autres versions de l'Agent, consultez [la section relative à l'utilisation de Datadog avec go-metro][1] (en anglais) afin de découvrir comment créer le binaire go-metro.

## Implémentation

### Installation

Le check utilise les timestamps fournis par la bibliothèque PCAP pour calculer l'intervalle de temps entre tout paquet sortant et l'accusé de réception TCP correspondant. Pour cette raison, vous devez installer et configurer PCAP.

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

Modifiez le fichier `go-metro.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple go-metro.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles :

L'exemple suivant récupère les durées TCP RTT pour `app.datadoghq.com` et `192.168.0.22` :

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

Pour vérifier que le check fonctionne correctement, assurez-vous que les métriques `system.net.tcp.rtt` s'affichent dans l'interface Datadog. En outre, si vous exécutez `sudo /etc/init.d/datadog-agent status`, le message suivant devrait s'afficher :

```bash
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

## Données collectées

### Métriques

{{< get-metrics-from-git "system" "system.net.tcp.rtt" >}}

[1]: https://github.com/DataDog/go-metro#usage
[2]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/go-metro/datadog_checks/go-metro/data/conf.yaml.example