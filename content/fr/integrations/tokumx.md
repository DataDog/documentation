---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    tokumx: assets/dashboards/tokumx_dashboard.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    tokumx_processes: assets/saved_views/tokumx_processes.json
  service_checks: assets/service_checks.json
categories:
- data store
- autodiscovery
creates_events: true
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tokumx/README.md
display_name: TokuMX
draft: false
git_integration_title: tokumx
guid: 7785939b-bfb6-4d3e-acc2-94c1f5fb33e7
integration_id: tokumx
integration_title: TokuMX
integration_version: 3.2.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: tokumx.
metric_to_check: tokumx.uptime
name: tokumx
process_signatures: []
public_title: Intégration Datadog/TokuMX
short_description: Surveillez des métriques sur le nombre d'opérations effectuées,
  le délai de réplication, la taille d'une table de cache, et plus encore.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check recueille des métriques TokuMX comme :

- Le nombre d'opérations effectuées
- Le délai de réplication
- L'utilisation et la taille d'une table de cache

## Configuration

### Installation

Le check TokuMX est inclus avec le package de l'[Agent Datadog][1]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

#### Préparer TokuMX

1. Installez le module Python pour MongoDB sur votre serveur MongoDB avec la commande suivante :

   ```shell
   sudo pip install --upgrade "pymongo<3.0"
   ```

2. Vous pouvez vérifier que le module est installé avec cette commande :

   ```shell
   python -c "import pymongo" 2>&1 | grep ImportError && \
   echo -e "\033[0;31mpymongo python module - Missing\033[0m" || \
   echo -e "\033[0;32mpymongo python module - OK\033[0m"
   ```

3. Lancez le shell Mongo, puis créez un utilisateur en lecture seule pour l'Agent Datadog dans la base de données `admin` :

   ```shell
   # Authenticate as the admin user.
   use admin
   db.auth("admin", "<YOUR_TOKUMX_ADMIN_PASSWORD>")
   # Add a user for Datadog Agent
   db.addUser("datadog", "<UNIQUEPASSWORD>", true)
   ```

4. Vérifiez que vous avez créé l'utilisateur avec la commande suivante (en dehors du shell Mongo).

   ```shell
   python -c 'from pymongo import Connection; print Connection().admin.authenticate("datadog", "<UNIQUEPASSWORD>")' | \
   grep True && \
   echo -e "\033[0;32mdatadog user - OK\033[0m" || \
   echo -e "\033[0;31mdatadog user - Missing\033[0m"
   ```

Pour en savoir plus sur la création et la gestion des utilisateurs dans MongoDB, consultez [documentation MongoDB sur la sécurité][2] (en anglais).

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `tokumx.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1].
   Consultez le [fichier d'exemple tokumx.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     - server: "mongodb://<USER>:<PASSWORD>@localhost:27017"
   ```

2. [Redémarrez l'Agent][3] pour commencer à envoyer des métriques TokuMX à Datadog.

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/tokumx/datadog_checks/tokumx/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                      |
| -------------------- | ---------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `tokumx`                                                   |
| `<CONFIG_INIT>`      | vide ou `{}`                                              |
| `<CONFIG_INSTANCE>`  | `{"server": "mongodb://<UTILISATEUR>:<MOTDEPASSE>@%%host%%:27017"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande `status` de l'Agent][3] et cherchez `tokumx` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "tokumx" >}}


### Événements

**Changements d'état de réplication** :

Ce check émet un événement à chaque fois que l'état de réplication d'un nœud TokuMX change.

### Checks de service
{{< get-service-checks-from-git "tokumx" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

- [Surveiller des métriques clés de TokuMX pour des applications MongoDB][5].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.mongodb.com/manual/security/
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/
[5]: https://www.datadoghq.com/blog/monitor-key-tokumx-metrics-mongodb-applications