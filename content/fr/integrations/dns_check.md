---
aliases:
- /fr/integrations/dnscheck
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- network
- web
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/dns_check/README.md
display_name: DNS
draft: false
git_integration_title: dns_check
guid: 31e4c84c-fc4b-4cd4-97ed-0331bf4e2023
integration_id: dns
integration_title: DNS Check
integration_version: 2.3.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: dns.
metric_to_check: dns.response_time
name: dns_check
public_title: Intégration Datadog/Check DNS
short_description: Surveillez les délais de recherche et la résolution des enregistrements
  DNS.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Surveillez les délais de résolution et de correspondance des enregistrements DNS à l'aide des serveurs de noms de votre choix.

## Configuration

### Installation

Le check DNS est inclus avec le package de l'[Agent Datadog][1]. Vous n'avez donc rien d'autre à installer sur votre serveur.

Bien qu'il soit généralement préférable d'exécuter les checks axés sur des métriques sur le même host que celui du service surveillé, ce check axé sur des statuts peut être lancé sur des hosts qui n'exécutent pas les services DNS surveillés.

### Configuration

1. Modifiez le fichier `dns_check.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2] pour commencer à recueillir vos données DNS.
   Consultez le [fichier d'exemple dns_check.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     ## @param name - string - required
     ## Name of your DNS check instance.
     ## To create multiple DNS checks, create multiple instances with unique names.
     #
     - name: '<INSTANCE_NAME>'

       ## @param hostname - string - required
       ## Hostname to resolve.
       #
       hostname: '<HOSTNAME>'
   ```

    Si vous ne définissez pas l'option `nameserver`, le check utilise le serveur de noms configuré dans les paramètres de réseau local.

2. [Redémarrez l'Agent][4] pour commencer à envoyer vos checks de service et délais de réponse DNS à Datadog.

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `dns_check` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "dns_check" >}}


### Événements

Le check DNS n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "dns_check" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/dns_check/datadog_checks/dns_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/dns_check/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/dns_check/assets/service_checks.json
[8]: https://docs.datadoghq.com/fr/help/