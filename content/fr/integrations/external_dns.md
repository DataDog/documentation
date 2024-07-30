---
app_id: external-dns
app_uuid: b41539a6-8222-4d6e-92f9-0a9f8496acdd
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: external_dns.source.endpoints.total
      metadata_path: metadata.csv
      prefix: external_dns.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: ExternalDNS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- web
- network
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/external_dns/README.md
display_on_public_website: true
draft: false
git_integration_title: external_dns
integration_id: external-dns
integration_title: ExternalDNS
integration_version: 2.3.2
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: external_dns
public_title: ExternalDNS
short_description: Surveillez toutes vos métriques ExternalDNS avec Datadog.
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
  - Category::Web
  - Category::Network
  configuration: README.md#Setup
  description: Surveillez toutes vos métriques ExternalDNS avec Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ExternalDNS
---



## Présentation

Recueillez des métriques sur le service ExternalDNS en temps réel pour visualiser et surveiller les métriques recueillies avec le plug-in Prometheus ExternalDNS pour Kubernetes.

Pour en savoir plus sur le service ExternalDNS, consultez le [référentiel Github][1].

## Configuration

### Installation

Le check ExternalDNS est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

Modifiez le fichier `external_dns.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] afin de spécifier votre serveur et votre port et de définir les masters à surveiller. Consultez le [fichier d'exemple external_dns.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

#### Utilisation de la découverte de services

Si vous utilisez un pod Agent Datadog pour chaque nœud worker Kubernetes, utilisez les exemples d'annotation ci-dessous sur votre pod external-dns pour récupérer automatiquement les données :

```yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    ad.datadoghq.com/external-dns.check_names: '["external_dns"]'
    ad.datadoghq.com/external-dns.init_configs: '[{}]'
    ad.datadoghq.com/external-dns.instances: '[{"prometheus_url":"http://%%host%%:7979/metrics", "tags":["externaldns-pod:%%host%%"]}]'
```

- Le tag `externaldns-pod` correspond à l'IP du pod DNS cible. Les autres tags sont associés à l'Agent Datadog qui interroge les informations à l'aide de la fonctionnalité Autodiscovery de l'Agent.
- Les annotations Autodiscovery doivent être effectuées sur le pod. Pour réaliser un déploiement, ajoutez les annotations aux métadonnées des spécifications du modèle.

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `external_dns` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "external_dns" >}}


### Événements

Le check ExternalDNS n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "external_dns" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://github.com/kubernetes-incubator/external-dns
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/external_dns/datadog_checks/external_dns/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/external_dns/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/external_dns/assets/service_checks.json
[8]: https://docs.datadoghq.com/fr/help/