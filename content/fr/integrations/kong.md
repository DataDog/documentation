---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kong/README.md'
display_name: Kong
git_integration_title: kong
guid: f1098d6f-b393-4374-81c0-47c0a142aeef
integration_id: kong
integration_title: Kong
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kong.
metric_to_check: kong.total_requests
name: kong
process_signatures:
  - kong start
public_title: Intégration Datadog/Kong
short_description: 'Surveillez le nombre total de requêtes, les codes de réponse, les connexions client et bien plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Le check Kong de l'Agent surveille le nombre total de requêtes, les codes de réponse, les connexions client et bien plus encore.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Kong est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs Kong.

### Configuration

Modifiez le fichier `kong.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3].

#### Collecte de métriques

1. Ajoutez ce bloc de configuration à votre fichier `kong.d/conf.yaml` pour commencer à recueillir vos [métriques Kong](#metriques) :

    ```yaml
      init_config:

      instances:
        # Each instance needs a `kong_status_url`. Tags are optional.
        - kong_status_url: http://example.com:8001/status/
          tags:
            - instance:foo
        - kong_status_url: http://example2.com:8001/status/
          tags:
            - instance:bar
    ```

   Consultez le [fichier d'exemple kong.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

Les logs d'accès Kong sont générés par NGINX. L'emplacement par défaut est donc identique à celui des fichiers NGINX.

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `kong.d/conf.yaml` pour commencer à recueillir vos logs Kong :

    ```
      logs:
        - type: file
          path: /var/log/nginx/access.log
          service: <SERVICE>
          source: kong

        - type: file
          path: /var/log/nginx/error.log
          service: <SERVICE>
          source: kong
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.
   Consultez le [fichier d'exemple kong.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `kong` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "kong" >}}


### Événements
Le check Kong n'inclut aucun événement.

### Checks de service

**kong.can_connect** :<br>
renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à Kong pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

* [Surveiller Kong avec notre nouvelle intégration Datadog][9]


[1]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/kong/datadog_checks/kong/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kong/metadata.csv
[8]: https://docs.datadoghq.com/fr/help
[9]: https://www.datadoghq.com/blog/monitor-kong-datadog


{{< get-dependencies >}}