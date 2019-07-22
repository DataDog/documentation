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

Pour installer le check Redis Sentinel sur votre host :

1. Installez le [kit de développement][7] sur n'importe quelle machine.
2. Exécutez `ddev release build redis_sentinel` pour générer le paquet.
3. [Téléchargez l'Agent Datadog][1].
4. Importez l'artefact du build sur tous les hosts avec un Agent et exécutez `datadog-agent integration install -w chemin/vers/redis_sentinel/dist/<NOM_ARTEFACT>.whl`.

### Configuration

Pour configurer le check Redis Sentinel :

1. Créez un dossier `redis_sentinel.d/` dans le dossier `conf.d/` à la racine du répertoire de votre Agent.
2. Créez un fichier `conf.yaml` dans le dossier `redis_sentinel.d/` précédemment créé.
3. Consultez le [fichier d'exemple redis_sentinel.yaml][2] et copiez son contenu dans le fichier `conf.yaml`.
4. Modifiez le fichier `conf.yaml` afin de spécifier votre serveur et votre port. Définissez ensuite les masters à surveiller.
5. [Redémarrez l'Agent][3].

## Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `redis_sentinel` dans la section Checks.

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
Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/datadog_checks/redis_sentinel/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-extras/blob/master/redis_sentinel/metadata.csv
[6]: http://docs.datadoghq.com/help/
[7]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit


{{< get-dependencies >}}