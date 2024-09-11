---
app_id: cisco-aci
app_uuid: fab40264-45aa-434b-9f9f-dc0ab609dd49
assets:
  dashboards:
    cisco_aci: assets/dashboards/cisco_aci_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cisco_aci.fabric.node.health.cur
      metadata_path: metadata.csv
      prefix: cisco_aci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Cisco ACI
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_aci/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_aci
integration_id: cisco-aci
integration_title: CiscoACI
integration_version: 2.2.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: cisco_aci
public_title: CiscoACI
short_description: Surveillez l'utilisation et les performances de Cisco ACI.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Network
  configuration: README.md#Setup
  description: Surveillez l'utilisation et les performances de Cisco ACI.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CiscoACI
---



## Présentation

Grâce à l'intégration Cisco ACI, vous pouvez :

- Faire un suivi de l'état et de la santé de votre réseau
- Faire un suivi de la capacité de votre ACI
- Surveiller les commutateurs et les contrôleurs

## Implémentation

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

   *Remarque* : assurez-vous de spécifier les locataires pour que l'intégration recueille les métriques à partir de vos applications, EPG, etc.

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
{{< get-service-checks-from-git "cisco_aci" >}}


## Dépannage

### Métriques `cisco_aci.tenant.*` manquantes
S'il vous manque des métriques `cisco_aci.tenant.*`, vous pouvez exécuter le script `test/cisco_aci_query.py` pour interroger manuellement l'endpoint du locataire.

Remplacez les valeurs `apic_url`, `apic_username` et `apic_password` par celles de votre configuration, puis saisissez l'URL du locataire pour `apic_url`.

Vérifiez que la sortie obtenue après avoir utilisé cURL sur l'endpoint correspond à l'une des métriques recueillies dans `datadog_checks/cisco_aci/aci_metrics.py`. Si aucune des statistiques ne correspond, cela signifie que l'endpoint ne génère pas de statistiques pouvant être recueillies par l'intégration. 


Besoin d'aide ? Contactez [l'assistance Datadog][3].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/fr/help/