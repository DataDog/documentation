---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/README.md'
display_name: "Redis\_Sentinel"
git_integration_title: redis_sentinel
guid: 8efe0a8c-88c6-4a2f-aa04-60d92051c458
integration_id: redis-sentinel
integration_title: "Redis\_Sentinel"
is_public: true
kind: integration
maintainer: '@krasnoukhov'
manifest_version: 1.0.0
metric_prefix: redis.
metric_to_check: redis.sentinel.known_sentinels
name: redis_sentinel
public_title: "Intégration Datadog/Redis\_Sentinel"
short_description: "Redis\_Sentinel optimise la disponibilité de Redis."
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Sentinel de Redis en temps réel pour :

* Visualiser et surveiller les états de Sentinel
* Être informé des failovers


## Implémentation

Le check Sentinel de Redis n'est **PAS** inclus avec le paquet de l'[Agent Datadog][1].

### Installation

Si vous utilisez la version 6.8 ou ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Redis Sentinel sur votre host. Consultez notre guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. Installez le [kit de développement][5].
2. Clonez le dépôt integrations-extras :

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. Mettez à jour votre configuration `ddev` avec le chemin `integrations-extras/` :

    ```
    ddev config set extras ./integrations-extras
    ```

4. Pour générer le paquet `redis_sentinel`, exécutez :

    ```
    ddev -e release build redis_sentinel
    ```

5. [Téléchargez et lancez l'Agent Datadog][6].
6. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

    ```
    datadog-agent integration install -w <PATH_OF_REDIS_SENTINEL_ARTIFACT_>/<REDIS_SENTINEL_ARTIFACT_NAME>.whl
    ```

7. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][7].

### Configuration

1. Modifiez le fichier `redis_sentinel.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][8] pour commencer à recueillir vos [métriques](#metrics) Redis Sentinel.
  Consultez le [fichier d'exemple upsc.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][10].

## Validation

[Lancez la sous-commande `status` de l'Agent][11] et cherchez `redis_sentinel` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "redis_sentinel" >}}


### Événements
Le check Redis Sentinel n'inclut aucun événement.

### Checks de service
**`redis.sentinel.master_is_down`**

Le check renvoie :

* `OK` si le serveur maître est disponible.
* `CRITICAL` si le serveur maître est indisponible.


**`redis.sentinel.master_is_disconnected`**

Le check renvoie :

* `OK` si le serveur maître n'est pas déconnecté.
* `CRITICAL` si le serveur maître est déconnecté.


**`redis.sentinel.slave_master_link_down`**

Le check renvoie :

* `OK` si la connexion au serveur maître est fonctionnelle.
* `CRITICAL` si la connexion au serveur maître n'est pas fonctionnelle.


**`redis.sentinel.slave_is_disconnected`**

Le check renvoie :

* `OK` si l'instance esclave n'est pas déconnectée.
* `CRITICAL` si l'instance esclave est déconnectée.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][13].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/fr/getting_started/integrations
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/datadog_checks/redis_sentinel/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/metadata.csv
[13]: http://docs.datadoghq.com/help


{{< get-dependencies >}}