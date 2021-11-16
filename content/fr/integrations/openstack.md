---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    OpenStack Controller Overview: assets/dashboards/openstack-controller.json
    openstack: assets/dashboards/openstack_dashboard.json
  logs:
    source: openstack
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    openstack_processes: assets/saved_views/openstack_processes.json
  service_checks: assets/service_checks.json
categories:
  - cloud
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/openstack/README.md'
display_name: OpenStack
draft: false
git_integration_title: openstack
guid: 944452d0-208e-4d1c-8adb-495f517ce2c2
integration_id: openstack
integration_title: OpenStack
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: openstack.
metric_to_check: openstack.nova.hypervisor_load.1
name: openstack
process_signatures:
  - stack.sh
public_title: Intégration Datadog/OpenStack
short_description: 'Surveillez l''utilisation des ressources de vos hyperviseurs et machines virtuelles, ainsi que vos métriques Neutron.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
<div class="alert alert-warning">
<b>Remarque importante</b> : cette intégration s'applique uniquement à OpenStack version 12 et versions antérieures (OpenStack non conteneurisé). Si vous souhaitez recueillir des métriques depuis OpenStack v13 ou une version ultérieure (OpenStack conteneurisé), utilisez l'<a href="https://docs.datadoghq.com/integrations/openstack_controller/">intégration OpenStack Controller.</a>
</div>

![Dashboard par défaut OpenStack][1]

## Présentation

Recueillez des métriques du service OpenStack en temps réel pour :

- Visualiser et surveiller les états OpenStack
- Être informé des failovers et des événements OpenStack

## Configuration

### Installation

Pour recueillir vos métriques OpenStack, vous devez [installer l'Agent][2] sur vos hosts exécutant des hyperviseurs.

### Configuration

#### Préparer OpenStack

Configurez un rôle et un utilisateur Datadog avec votre serveur d'identité :

```console
openstack role create datadog_monitoring
openstack user create datadog \
    --password my_password \
    --project my_project_name
openstack role add datadog_monitoring \
    --project my_project_name \
    --user datadog
```

Mettez ensuite à jour vos fichiers `policy.json` afin d'accorder les autorisations nécessaires. `role:datadog_monitoring` doit pouvoir accéder aux opérations suivantes :

**Nova**

```json
{
  "compute_extension": "aggregates",
  "compute_extension": "hypervisors",
  "compute_extension": "server_diagnostics",
  "compute_extension": "v3:os-hypervisors",
  "compute_extension": "v3:os-server-diagnostics",
  "compute_extension": "availability_zone:detail",
  "compute_extension": "v3:availability_zone:detail",
  "compute_extension": "used_limits_for_admin",
  "os_compute_api:os-aggregates:index": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-aggregates:show": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-hypervisors": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-server-diagnostics": "rule:admin_api or role:datadog_monitoring",
  "os_compute_api:os-used-limits": "rule:admin_api or role:datadog_monitoring"
}
```

**Neutron**

```json
{
  "get_network": "rule:admin_or_owner or rule:shared or rule:external or rule:context_is_advsvc or role:datadog_monitoring"
}
```

**Keystone**

```json
{
  "identity:get_project": "rule:admin_required or project_id:%(target.project.id)s or role:datadog_monitoring",
  "identity:list_projects": "rule:admin_required or role:datadog_monitoring"
}
```

Vous devrez peut-être redémarrer vos services d'API Keystone, Neutron et Nova pour que les modifications apportées au fichier policy.json prennent effet.

**Remarque** : l'installation de l'intégration OpenStack est susceptible d'augmenter le nombre de machines virtuelles surveillées par Datadog, ce qui peut avoir une incidence sur votre facturation. Pour en savoir plus, consultez la section Facturation de la FAQ.

#### Configuration de l'Agent

1. Configurez l'Agent Datadog pour le connecter à votre serveur Keystone, puis spécifiez les projets à surveiller. Modifiez le fichier `openstack.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] avec la configuration ci-dessous. Consultez le [fichier d'exemple openstack.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:
     ## @param keystone_server_url - string - required
     ## Where your identity server lives.
     ## Note that the server must support Identity API v3
     #
     keystone_server_url: "https://<KEYSTONE_SERVER_ENDPOINT>:<PORT>/"

   instances:
     ## @param name - string - required
     ## Unique identifier for this instance.
     #
     - name: "<INSTANCE_NAME>"

       ## @param user - object - required
       ## User credentials
       ## Password authentication is the only auth method supported.
       ## `user` object expects the parameter `username`, `password`,
       ## and `user.domain.id`.
       ##
       ## `user` should resolve to a structure like:
       ##
       ##  {'password': '<PASSWORD>', 'name': '<USERNAME>', 'domain': {'id': '<DOMAINE_ID>'}}
       #
       user:
         password: "<PASSWORD>"
         name: datadog
         domain:
           id: "<DOMAINE_ID>"
   ```

2. [Redémarrez l'Agent][5].

##### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous pouvez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `openstack.d/conf.yaml` pour commencer à recueillir vos logs Openstack :

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: openstack
   ```

    Modifiez la valeur du paramètre `path` et configurez-le pour votre environnement. Consultez le [fichier d'exemple openstack.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.


### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `openstack` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "openstack" >}}


### Événements

Le check OpenStack n'inclut aucun événement.

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
Renvoie `UNKNOWN` si l'Agent ne parvient pas à obtenir l'état du réseau, renvoie `CRITICAL` si le réseau est indisponible ou renvoie `OK` pour les autres cas.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

Pour mieux comprendre comment (ou pourquoi) intégrer le service de calcul Nova d'OpenStack à Datadog, lisez la [série d'articles de blog][9] de Datadog à ce sujet.

Consultez également ces autres articles du blog de Datadog :

- [Installer OpenStack en deux commandes pour le développement et le testing][10]
- [OpenStack : agrégats de hosts, gabarits et zones de disponibilité][11]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/openstack/images/openstack_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/openstack/datadog_checks/openstack/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/openstack/metadata.csv
[8]: https://docs.datadoghq.com/fr/help/
[9]: https://www.datadoghq.com/blog/openstack-monitoring-nova
[10]: https://www.datadoghq.com/blog/install-openstack-in-two-commands
[11]: https://www.datadoghq.com/blog/openstack-host-aggregates-flavors-availability-zones