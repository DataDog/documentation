---
aliases:
- /fr/integrations/powerdns
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    powerdns: assets/dashboards/powerdns_dashboard.json
  logs:
    source: powerdns
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    powerdns_processes: assets/saved_views/powerdns_processes.json
  service_checks: assets/service_checks.json
categories:
- web
- network
- autodiscovery
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/README.md
display_name: PowerDNS Recursor
draft: false
git_integration_title: powerdns_recursor
guid: ae533b67-a2af-45ce-8e23-235acb3a3893
integration_id: powerdns
integration_title: PowerDNS Recursor
integration_version: 2.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: powerdns.
metric_to_check: powerdns.recursor.questions
name: powerdns_recursor
process_signatures:
- pdns_server
- systemctl start pdns@
public_title: Intégration Datadog/PowerDNS Recursor
short_description: Analysez le trafic entrant et sortant de vos recursors PowerDNS
  afin d'identifier les anomalies.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Analysez les performances de votre PowerDNS Recursor et surveillez le trafic inhabituel ou préoccupant. Ce check de l'Agent recueille une multitude de métriques issues de vos recursors, vous permettant ainsi de mesurer :

- Les temps de réponse de vos requêtes : identifiez les requêtes exécutées en moins de 1 ms, 10 ms, 100 ms ou 1 s, ainsi que celles exécutées en plus de 1 s
- Les requêtes expirées
- Les hits et miss de cache
- Le nombre de réponses de chaque type (SRVFAIL, NXDOMAIN, NOERROR)
- Les paquets ignorés ou perdus

Et bien plus encore.

## Configuration

### Installation

Le check PowerDNS Recursor est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos recursors.

### Configuration

#### Préparer PowerDNS

Ce check recueille des statistiques de performance à l'aide de l'API de statistiques de PowerDNS Recursor. Cette API n'est activée par défaut qu'à partir de la version 4.1 de pdns_recursor. Si vous utilisez une version plus ancienne, activez l'API en ajoutant le code ci-dessous au fichier de configuration de votre recursor, par exemple `/etc/powerdns/recursor.conf` :

```conf
webserver=yes
api-key=changeme             # uniquement disponible à partir de la version 4.0
webserver-readonly=yes       # valeur par défaut : no
#webserver-port=8081         # valeur par défaut : 8082
#webserver-address=0.0.0.0   # valeur par défaut : 127.0.0.1
```

Si vous utilisez pdns_recursor version 3.x, ajoutez le préfixe `experimental-` à ces noms d'option. Exemple : `experimental-webserver=yes`.

Si vous utilisez pdns_recursor >= 4.1, définissez simplement le paramètre `api-key`.

Redémarrez votre recursor pour activer l'API de statistiques.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `powerdns_recursor.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple powerdns_recursor.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     ## @param host - string - required
     ## Host running the recursor.
     #
     - host: 127.0.0.1

       ## @param port - integer - required
       ## Recursor web server port.
       #
       port: 8082

       ## @param api_key - string - required
       ## Recursor web server api key.
       #
       api_key: "<POWERDNS_API_KEY>"

       ## @param version - integer - required - default: 3
       ## Version 3 or 4 of PowerDNS Recursor to connect to.
       ## The PowerDNS Recursor in v4 has a production ready web server that allows for
       ## statistics gathering. In version 3.x the server was marked as experimental.
       ##
       ## As the server was marked as experimental in version 3 many of the metrics have
       ## changed names and the API structure (paths) have also changed. With these changes
       ## there has been a need to separate the two concerns. The check now has a key value
       ## version: which if set to version 4 queries with the correct API path on the
       ## non-experimental web server.
       ##
       ## https://doc.powerdns.com/md/httpapi/api_spec/#url-apiv1serversserver95idstatistics
       #
       version: 3
   ```

2. [Redémarrez l'Agent][3].

##### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez l'utilisateur `dd-agent` au groupe `systemd-journal` en exécutant la commande :
   ```text
   usermod -a -G systemd-journal dd-agent
   ```

3. Ajoutez ce bloc de configuration à votre fichier `powerdns_recursor.d/conf.yaml` pour commencer à recueillir vos logs PowerDNS Recursor :

   ```yaml
   logs:
     - type: journald
       source: powerdns
   ```

    Consultez le [fichier d'exemple powerdns_recursor.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

4. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/datadog_checks/powerdns_recursor/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `powerdns_recursor`                                                              |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                    |
| `<CONFIG_INSTANCE>`  | `{"host":"%%host%%", "port":8082, "api_key":"<CLÉ_API_POWERDNS>", "version": 3}` |

##### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                     |
|----------------|-------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "powerdns"}`                  |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande `status` de l'Agent][2] et cherchez `powerdns_recursor` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "powerdns_recursor" >}}


### Événements

Le check PowerDNS n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "powerdns_recursor" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].



[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/fr/help/