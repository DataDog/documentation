---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: openstack
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/openstack_controller/README.md'
display_name: Openstack_controller
draft: false
git_integration_title: openstack_controller
guid: 49979592-9096-460a-b086-f173f26c6626
integration_id: openstack-controller
integration_title: Openstack Controller
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: openstack.
metric_to_check: openstack.controller
name: openstack_controller
public_title: Openstack Controller
short_description: 'Surveillez l''utilisation des ressources de vos hyperviseurs et machines virtuelles, ainsi que vos métriques Neutron.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
<div class="alert alert-warning">
<b>Remarque importante</b> : cette intégration s'applique uniquement à OpenStack version 13 et versions ultérieures (OpenStack conteneurisé). Si vous souhaitez recueillir des métriques depuis OpenStack v12 ou une version antérieure (OpenStack non conteneurisé), utilisez l'<a href="https://docs.datadoghq.com/integrations/openstack/">intégration OpenStack.</a>
</div>

## Présentation

Ce check permet de surveiller [OpenStack][1] depuis le nœud de contrôleur.

## Configuration

### Installation

Le check OpenStack Controller est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

L'intégration OpenStack Controller est conçue pour recueillir des informations auprès de tous vos nœuds de calcul ainsi que des serveurs exécutés sur ceux-ci. Elle doit être exécutée à partir d'un seul Agent afin de surveiller votre environnement OpenStack. Ce déploiement peut être effectué sur votre nœud de contrôleur ou sur un serveur adjacent ayant accès aux endpoints Keystone et Nova.

#### Préparer OpenStack

Créez un utilisateur `datadog` afin de l'utiliser dans votre fichier `openstack_controller.d/conf.yaml`. Cet utilisateur doit disposer des autorisations admin en lecture seule sur tout votre environnement : il pourra ainsi être exécuté à partir d'un seul nœud et lire les informations système de haut niveau sur tous vos serveurs et nœuds.

#### Configuration de l'Agent

1. Modifiez le fichier `openstack_controller.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance OpenStack Controller. Consultez le [fichier d'exemple openstack_controller.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     ## @param name - string - required
     ## Unique identifier for this instance.
     #
     - name: "<INSTANCE_NAME>"

       ## @param user - object - required
       ## Password authentication is the only auth method supported
       ## User expects username, password, and user domain id
       ## `user` should resolve to a structure like
       ## {'password': '<PASSWORD>', 'name': '<USER_NAME>', 'domain': {'id': '<DOMAIN_ID>'}}
       ## The check uses the Unscoped token method to collect information about
       ## all available projects to the user.
       #
       user:
         password: "<PASSWORD>"
         name: "<USER_NAME>"
         domain:
           id: "<DOMAIN_ID>"
   ```

2. [Redémarrez l'Agent][3].

##### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous pouvez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `openstack_controller.d/conf.yaml` pour commencer à recueillir vos logs Openstack :

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: openstack
   ```

    Modifiez la valeur du paramètre `path` et configurez-le pour votre environnement. Consultez le [fichier d'exemple openstack_controller.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.


### Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `openstack_controller` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "openstack_controller" >}}


### Checks de service

**openstack.neutron.api.up** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à interroger l'API Neutron, renvoie `UNKNOWN` en cas de problème avec l'API Keystone ou renvoie `OK` pour les autres cas.

**openstack.nova.api.up** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à interroger l'API Nova, renvoie `UNKNOWN` en cas de problème avec l'API Keystone ou renvoie `OK` pour les autres cas.

**openstack.keystone.api.up** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à interroger l'API Keystone. Si ce n'est pas le cas, renvoie `OK`.

**openstack.nova.hypervisor.up** :<br>
Renvoie `UNKNOWN` si l'Agent ne parvient pas à obtenir l'état de l'hyperviseur, renvoie `CRITICAL` si l'hyperviseur est indisponible ou renvoie `OK` pour les autres cas.

**openstack.neutron.network.up** :<br>
Renvoie `CRITICAL` si le réseau est indisponible ou `OK` pour les autres cas.

### Événements

OpenStack Controller n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://www.openstack.org
[2]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/datadog_checks/openstack_controller/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/openstack_controller/metadata.csv
[6]: https://docs.datadoghq.com/fr/help/