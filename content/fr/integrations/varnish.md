---
assets:
  dashboards: {}
  monitors: {}
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
git_integration_title: varnish
guid: d2052eae-89b8-4cb1-b631-f373010da4b8
integration_id: varnish
integration_title: Varnish
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: varnish.
metric_to_check: varnish.n_backend
name: varnish
process_signatures:
  - service varnish start
public_title: Intégration Datadog/Varnish
short_description: 'Suivez les connexions client et backend, les expulsions et les miss du cache, et plus encore. and more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard par défaut Varnish][1]

## Présentation

Ce check recueille des métriques varnish concernant :

* Clients : connexions et requêtes
* Performances du cache : hits, expulsions, etc.
* Threads : créations, échecs et threads en attente
* Backends : connexions réussies, échouées et réessayées

Il envoie également des checks de service pour contrôler la santé de chaque backend.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Varnish est inclus avec le paquet de l'[Agent Datadog][3]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `varnish.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et vos [logs](#collecte-de-logs) Varnish. Consultez le [fichier d'exemple varnish.d/conf.yaml][5] pour découvrir toutes les options disponibles.

2. [Redémarrez l'Agent][6].

#### Préparer Varnish

Si vous utilisez Varnish 4.1+, ajoutez l'utilisateur système `dd-agent` au groupe Varnish avec :

```
sudo usermod -G varnish -a dd-agent
```

#### Collecte de métriques

* Ajoutez ce bloc de configuration à votre fichier `varnish.d/conf.yaml` pour commencer à recueillir vos [métriques Varnish](#metriques) :

  ```
  init_config:

  instances:
    - varnishstat: /usr/bin/varnishstat        # or wherever varnishstat lives
      varnishadm: <PATH_TO_VARNISHADM_BIN>     # to submit service checks for the health of each backend
  #   secretfile: <PATH_TO_VARNISH_SECRETFILE> # if you configured varnishadm and your secret file isn't /etc/varnish/secret
  #   tags:
  #     - instance:production
  ```

  Si vous ne définissez pas `varnishadm`, l'Agent ne surveillera pas la santé du backend. Si vous le définissez, l'Agent doit être autorisé à exécuter le binaire en mode root. Ajoutez la ligne suivante à votre fichier `/etc/sudoers` :

  ```
  dd-agent ALL=(ALL) NOPASSWD:/usr/bin/varnishadm
  ```

  Consultez le [fichier d'exemple varnish.yaml][5] pour découvrir toutes les options de configuration disponibles.

* [Redémarrez l'Agent][6] pour commencer à envoyer vos métriques et checks de service Varnish à Datadog.

##### Autodiscovery

La configuration du check Varnish en utilisant Autodiscovery dans les environnements conteneurisés n'est pas prise en charge. La collecte de métriques dans ce type d'environnement est envisageable en envoyant des métriques vers DogStatsD à l'aide du plug-in StatsD. Les plug-ins tiers suivants sont disponibles :

* [libvmod-statsd][7]
* [prometheus_varnish_exporter][8]

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. Pour activer le logging Varnish, supprimez la mise en commentaires suivante dans `/etc/default/varnishncsa` :

    ```
      VARNISHNCSA_ENABLED=1
    ```

2. Ajoutez le bloc suivant à la fin du même fichier :

    ```
      LOG_FORMAT="{\"date_access\": \"%{%Y-%m-%dT%H:%M:%S%z}t\", \"network.client.ip\":\"%h\", \"http.auth\" : \"%u\", \"varnish.x_forwarded_for\" : \"%{X-Forwarded-For}i\", \"varnish.hit_miss\":  \"%{Varnish:hitmiss}x\", \"network.bytes_written\": %b, \"http.response_time\": %D, \"http.status_code\": \"%s\", \"http.url\": \"%r\", \"http.ident\": \"%{host}i\", \"http.method\": \"%m\", \"varnish.time_first_byte\" : %{Varnish:time_firstbyte}x, \"varnish.handling\" : \"%{Varnish:handling}x\", \"http.referer\": \"%{Referer}i\", \"http.useragent\": \"%{User-agent}i\" }"

      DAEMON_OPTS="$DAEMON_OPTS -c -a -F '${LOG_FORMAT}'"
    ```

3. Redémarrez Varnishncsa pour prendre en compte les changements.


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
          sourcecategory: http_web_access
          service: varnish
    ```
    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
    Consultez le [fichier d'exemple varnish.yaml][5] pour découvrir toutes les options de configuration disponibles.

6. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `varnish` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "varnish" >}}


### Événements
Le check Varnish n'inclut aucun événement.

### Checks de service
**varnish.backend_healthy** :<br>
L'Agent envoie ce check de service si vous configurez `varnishadm`. Il envoie un check de service pour chaque backend Varnish, en appliquant à chaque fois le tag `backend:<nom_backend>`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][12].

## Pour aller plus loin
Documentation, liens et articles supplémentaires utiles :

* [Meilleures métriques de performance Varnish][13]
* [Comment recueillir des métriques Varnish][14]
* [Surveiller Varnish avec Datadog][15]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/varnish/images/varnish.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/varnish/datadog_checks/varnish/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://github.com/jib/libvmod-statsd
[8]: https://github.com/jonnenauha/prometheus_varnish_exporter
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/varnish/metadata.csv
[12]: https://docs.datadoghq.com/fr/help
[13]: https://www.datadoghq.com/blog/top-varnish-performance-metrics
[14]: https://www.datadoghq.com/blog/how-to-collect-varnish-metrics
[15]: https://www.datadoghq.com/blog/monitor-varnish-using-datadog


{{< get-dependencies >}}