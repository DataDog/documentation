---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    cisco_aci: assets/dashboards/cisco_aci_dashboard.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
  - autodiscovery
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cisco_aci/README.md'
display_name: Cisco ACI
draft: false
git_integration_title: cisco_aci
guid: 8a20f56b-2e25-4a0b-a252-f5187dddeeef
integration_id: cisco-aci
integration_title: CiscoACI
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cisco_aci.
metric_to_check: cisco_aci.fabric.node.health.cur
name: cisco_aci
public_title: "Intégration Datadog/Cisco\_ACI"
short_description: "Surveillez l'utilisation et les performances de Cisco\_ACI."
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Grâce à l'intégration Cisco ACI, vous pouvez :

- Faire un suivi de l'état et de la santé de votre réseau
- Faire un suivi de la capacité de votre ACI
- Surveiller les commutateurs et les contrôleurs

## Configuration

### Installation

Le check Cisco ACI est fourni avec l'Agent : il vous suffit donc d'[installer l'Agent][1] sur un serveur au sein de votre réseau.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `cisco_aci.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple cisco_aci.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
        ## @param aci_url - string - required
        ## URL to query to gather metrics.
        #
      - aci_url: http://localhost

        ## @param username - string - required
        ## Authentication can use either a user auth or a certificate.
        ## If using the user auth, enter the `username` and `pwd` configuration.
        #
        username: datadog

        ## @param pwd - string - required
        ## Authentication can use either a user auth or a certificate.
        ## If using the user auth, enter the `username` and `pwd` configuration.
        #
        pwd: <PWD>

        ## @param tenant - list of strings - optional
        ## List of tenants to collect metrics data from.
        #
        # tenant:
        #   - <TENANT_1>
        #   - <TENANT_2>
   ```

   *Remarque* : assurez-vous de spécifier les tenants pour que l'intégration recueille les métriques à partir de vos applications, EPG, etc.

2. [Redémarrez l'Agent][3] pour commencer à envoyer vos métriques Cisco ACI à Datadog.

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/cisco_aci/datadog_checks/cisco_aci/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `cisco_aci`                                                            |
| `<CONFIG_INIT>`      | vide ou `{}`                                                          |
| `<CONFIG_INSTANCE>`  | `{"aci_url":"%%host%%", "username":"<NOMUTILISATEUR>", "pwd": "<MOTDEPASSE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande `status` de l'Agent][2] et cherchez `cisco_aci` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cisco_aci" >}}


### Événements

Le check Cisco ACI envoie les défaillances de locataire sous la forme d'événements.

### Checks de service

**cisco_aci.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'API Cisco ACI pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/fr/help/