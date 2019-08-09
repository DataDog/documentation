---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/tokumx/README.md'
display_name: TokuMX
git_integration_title: tokumx
guid: 7785939b-bfb6-4d3e-acc2-94c1f5fb33e7
integration_id: tokumx
integration_title: TokuMX
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: tokumx.
metric_to_check: tokumx.uptime
name: tokumx
process_signatures:
  - mongod --config /etc/tokumx.conf
public_title: Intégration Datadog/TokuMX
short_description: 'Suivez des métriques sur le nombre d''opérations effectuées, le délai de réplication, la taille d''une table de cache, et plus encore. and more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check recueille des métriques TokuMX comme :

* Le nombre d'opérations effectuées
* Le délai de réplication
* L'utilisation et la taille d'une table de cache

Et plus encore.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check TokuMX est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs TokuMX.

### Configuration
#### Préparer TokuMX

1.  Installez le module Python pour MongoDB sur votre serveur MongoDB avec la commande suivante :

        sudo pip install --upgrade "pymongo<3.0"


2.  Vous pouvez vérifier que le module est installé avec cette commande :

        python -c "import pymongo" 2>&1 | grep ImportError && \
        echo -e "\033[0;31mpymongo python module - Missing\033[0m" || \
        echo -e "\033[0;32mpymongo python module - OK\033[0m"


3.  Lancez le shell mongo, puis créez un utilisateur read-only pour l'Agent Datadog dans la base de données `admin` :

        # Authentification en tant qu'utilisateur administrateur.
        use admin
        db.auth("admin", "<VOTRE_MOTDEPASSE_ADMINISTRATEUR_TOKUMX>")
        # Ajouter en tant qu'utilisateur pour l'Agent Datadog
        db.addUser("datadog", "<MOTDEPASSEUNIQUE>", true)


4.  Vérifiez que vous avez créé l'utilisateur avec la commande suivante (en dehors du shell mongo).

        python -c 'from pymongo import Connection; print Connection().admin.authenticate("datadog", "<MOTDEPASSEUNIQUE>")' | \
        grep True && \
        echo -e "\033[0;32mdatadog user - OK\033[0m" || \
        echo -e "\033[0;31mdatadog user - Missing\033[0m"

Pour en savoir plus sur la création et la gestion des utilisateurs dans MongoDB, consultez [la documentation MongoDB][3].

#### Associer l'Agent

1. Modifiez le fichier `tokumx.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4].
    Consultez le [fichier d'exemple tokumx.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

    ```yaml
        init_config:

        instances:
            - server: mongodb://datadog:<UNIQUEPASSWORD>@localhost:27017
    ```

2. [Redémarrez l'Agent][6] pour commencer à envoyer des métriques TokuMX à Datadog.

### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `tokumx` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "tokumx" >}}


### Événements
**Changements d'état de réplication** :

Ce check émet un événement à chaque fois que l'état de réplication d'un nœud TokuMX change.

### Checks de service

`tokumx.can_connect` :

Renvoie CRITICAL si l'Agent n'est pas capable de se connecter à TokuMX pour recueillir des métriques. Si ce n'est pas le cas, renvoie OK.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin

* [Surveiller des métriques clés de TokuMX pour des applications MongoDB][10]


[1]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://www.mongodb.org/display/DOCS/Security+and+Authentication
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/tokumx/datadog_checks/tokumx/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/tokumx/metadata.csv
[9]: https://docs.datadoghq.com/fr/help
[10]: https://www.datadoghq.com/blog/monitor-key-tokumx-metrics-mongodb-applications


{{< get-dependencies >}}