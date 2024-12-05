---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    varnish: assets/dashboards/varnish_dashboard.json
  logs:
    source: varnish
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    status_code_overview: assets/saved_views/status_code_overview.json
    varnish_processes: assets/saved_views/varnish_processes.json
  service_checks: assets/service_checks.json
categories:
  - web
  - caching
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/varnish/README.md'
display_name: Varnish
draft: false
git_integration_title: varnish
guid: d2052eae-89b8-4cb1-b631-f373010da4b8
integration_id: varnish
integration_title: Varnish
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: varnish.
metric_to_check: varnish.n_backend
name: varnish
process_signatures:
  - service varnish start
  - varnishd
public_title: Intégration Datadog/Varnish
short_description: 'Suivez les connexions client et backend, les expulsions et les miss du cache, et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard par défaut Varnish][1]

## Présentation

Ce check recueille des métriques Varnish sur les éléments suivants :

- Clients : connexions et requêtes
- Performances du cache : hits, expulsions, etc.
- Threads : créations, échecs et threads en attente
- Backends : connexions réussies, échouées et réessayées

Il envoie également des checks de service pour contrôler la santé de chaque backend.

## Configuration

### Installation

Le check Varnish est inclus avec le package de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Préparer Varnish

Si vous utilisez Varnish 4.1+, ajoutez l'utilisateur système `dd-agent` au groupe Varnish avec :

```text
sudo usermod -G varnish -a dd-agent
```

##### Collecte de métriques

1. Modifiez le fichier `varnish.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple varnish.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     - varnishstat: /usr/bin/varnishstat
       varnishadm: <PATH_TO_VARNISHADM_BIN>
   ```

    **Remarque** : si vous ne définissez pas `varnishadm`, l'Agent ne surveillera pas la santé du backend. Si vous le définissez, l'Agent doit être autorisé à exécuter le binaire en mode root. Ajoutez la ligne suivante à votre fichier `/etc/sudoers` :

   ```shell
     dd-agent ALL=(ALL) NOPASSWD:/usr/bin/varnishadm
   ```

2. [Redémarrez l'Agent][3].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. Pour activer la journalisation de Varnish, supprimez la mise en commentaires de ce qui suit dans `/etc/default/varnishncsa` :

   ```text
     VARNISHNCSA_ENABLED=1
   ```

2. Ajoutez le bloc suivant à la fin du même fichier :

   ```text
     LOG_FORMAT="{\"date_access\": \"%{%Y-%m-%dT%H:%M:%S%z}t\", \"network.client.ip\":\"%h\", \"http.auth\" : \"%u\", \"varnish.x_forwarded_for\" : \"%{X-Forwarded-For}i\", \"varnish.hit_miss\":  \"%{Varnish:hitmiss}x\", \"network.bytes_written\": %b, \"http.response_time\": %D, \"http.status_code\": \"%s\", \"http.url\": \"%r\", \"http.ident\": \"%{host}i\", \"http.method\": \"%m\", \"varnish.time_first_byte\" : %{Varnish:time_firstbyte}x, \"varnish.handling\" : \"%{Varnish:handling}x\", \"http.referer\": \"%{Referer}i\", \"http.useragent\": \"%{User-agent}i\" }"

     DAEMON_OPTS="$DAEMON_OPTS -c -a -F '${LOG_FORMAT}'"
   ```

3. Redémarrez l'utilitaire `varnishncsa` pour appliquer les changements.

4. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

5. Ajoutez ce bloc de configuration à votre fichier `varnish.d/conf.yaml` pour commencer à recueillir vos logs Varnish :

   ```yaml
   logs:
     - type: file
       path: /var/log/varnish/varnishncsa.log
       source: varnish
       service: varnish
   ```

   Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple varnish.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

6. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/varnish/datadog_checks/varnish/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

La configuration du check Varnish en utilisant Autodiscovery dans les environnements conteneurisés n'est pas prise en charge. La collecte de métriques dans ce type d'environnement est envisageable en envoyant des métriques vers DogStatsD à l'aide du plug-in StatsD. Les plug-ins tiers suivants sont disponibles :

- [libvmod-statsd][1]
- [prometheus_varnish_exporter][2]

[1]: https://github.com/jib/libvmod-statsd
[2]: https://github.com/jonnenauha/prometheus_varnish_exporter
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `varnish` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "varnish" >}}


### Événements

Le check Varnish n'inclut aucun événement.

### Checks de service

**varnish.backend_healthy** :<br>
L'Agent envoie ce check de service si vous configurez `varnishadm`. Il envoie un check de service pour chaque backend Varnish, en appliquant à chaque fois le tag `backend:<NOM_BACKEND>`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Principales métriques de performance Varnish][5]
- [Comment recueillir des métriques Varnish][6]
- [Surveiller Varnish avec Datadog][7]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/varnish/images/varnish.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/
[5]: https://www.datadoghq.com/blog/top-varnish-performance-metrics
[6]: https://www.datadoghq.com/blog/how-to-collect-varnish-metrics
[7]: https://www.datadoghq.com/blog/monitor-varnish-using-datadog