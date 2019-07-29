---
aliases:
  - /fr/integrations/powerdns
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/README.md'
display_name: "PowerDNS\_Recursor"
git_integration_title: powerdns_recursor
guid: ae533b67-a2af-45ce-8e23-235acb3a3893
integration_id: powerdns
integration_title: "PowerDNS\_Recursor"
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: powerdns.
metric_to_check: powerdns.recursor.questions
name: powerdns_recursor
process_signatures:
  - pdns_server
  - systemctl start pdns@
public_title: "Intégration Datadog/PowerDNS\_Recursor"
short_description: Analysez le trafic entrant et sortant de vos recursors PowerDNS afin d'identifier les anomalies.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Analysez les performances de votre PowerDNS Recursor et surveillez le trafic inhabituel ou préoccupant. Ce check de l'Agent recueille une multitude de métriques issues de vos recursors, vous permettant ainsi de mesurer :

* Les temps de réponse de vos requêtes : identifiez les requêtes exécutées en moins de 1 ms, 10 ms, 100 ms ou 1 s, ainsi que celles exécutées en plus de 1 s
* Les requêtes expirées
* Les hits et miss de cache
* Le nombre de réponses de chaque type (SRVFAIL, NXDOMAIN, NOERROR)
* Les paquets ignorés ou perdus

Et bien plus encore

## Implémentation

Vous trouverez ci-dessous les instructions pour installer et configurer le check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check PowerDNS Recursor est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos recursors.

### Configuration
#### Préparer PowerDNS

Ce check recueille des statistiques de performance via l'API de statistiques de pdns_recursor. Cette API n'est activée par défaut qu'à partir de la version 4.1 de pdns_recursor. Si vous utilisez une version plus ancienne, activez l'API en ajoutant le code ci-dessous au fichier de configuration de votre recursor (p. ex. `/etc/powerdns/recursor.conf`) :

   ```
   webserver=yes
   api-key=changeme             # uniquement disponible à partir de la version 4.0
   webserver-readonly=yes       # Valeur par défaut : no
   #webserver-port=8081         # Valeur par défaut : 8082
   #webserver-address=0.0.0.0   # Valeur par défaut : 127.0.0.1
   ```

Si vous utilisez pdns_recursor version 3.x, ajoutez le préfixe `experimental-` à ces noms d'option. Exemple : `experimental-webserver=yes`.

Si vous utilisez pdns_recursor >= 4.1, définissez simplement le paramètre `api-key`.

Redémarrez votre recursor pour activer l'API de statistiques.

#### Associer l'Agent

1. Modifiez le fichier `powerdns_recursor.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3].
    Consultez le [fichier d'exemple powerdns_recursor.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles :

    ```yaml
        init_config:

        instances:
        - host: 127.0.0.1
            port: 8082
            api_key: changeme
            version: 4 # omit this line if you're running pdns_recursor version 3.x
    ```

2. [Redémarrez l'Agent][5] pour commencer à envoyer vos métriques PowerDNS Recursor à Datadog.

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `powerdns_recursor` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "powerdns_recursor" >}}


### Événements
Le check PowerDNS n'inclut aucun événement.

### Checks de service
**`powerdns.recursor.can_connect`** :

Renvoie CRITICAL si l'Agent n'est pas capable de se connecter à l'API de statistiques du recursor. Si ce n'est pas le cas, renvoie OK.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/datadog_checks/powerdns_recursor/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/powerdns_recursor/metadata.csv
[8]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}