---
app_id: grpc-check
app_uuid: f0317cd5-e4b9-4147-998e-25c69fad94ed
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - grpc_check.healthy
      - grpc_check.unhealthy
      metadata_path: metadata.csv
      prefix: grpc_check.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10296
    source_type_name: gRPC Check
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Communauté
  sales_email: help@datadoghq.com
  support_email: keisuke.umegaki.630@gmail.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/grpc_check/README.md
display_on_public_website: true
draft: false
git_integration_title: grpc_check
integration_id: grpc-check
integration_title: gRPC Health
integration_version: 1.0.2
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: grpc_check
public_title: gRPC Health
short_description: Surveiller des serveurs gRPC basés sur le protocole gRPC Health
  Checking
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
  configuration: README.md#Setup
  description: Surveiller des serveurs gRPC basés sur le protocole gRPC Health Checking
  media: []
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: gRPC Health
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Présentation

Ce check permet de surveiller des endpoints implémentant le [protocole gRPC Health Checking][1] par l'intermédiaire de l'Agent Datadog.

## Formule et utilisation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Liste des infrastructures

#### SLO basés sur des métriques

Pour installer le check grpc_check sur votre host, utilisez la commande suivante :

```bash
sudo -u dd-agent datadog-agent integration install -t datadog-grpc-check==1.0.2
```

#### Dockerfile

Générez l'image de l'Agent avec le Dockerfile suivant.

```Dockerfile
FROM datadog/agent:7
RUN agent integration install -r -t datadog-grpc-check==1.0.2 \
  && /opt/datadog-agent/embedded/bin/pip3 install grpcio grpcio-health-checking
```

### Dépannage de la solution Browser

1. Modifiez le fichier `grpc_check.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance grpc_check. Consultez le [fichier d'exemple grpc_check.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `grpc_check` dans la section Checks.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "grpc_check" >}}


### Aide

L'intégration grpc_check n'inclut aucun événement.

### Aide
{{< get-service-checks-from-git "grpc_check" >}}


## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://github.com/grpc/grpc/blob/master/doc/health-checking.md
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-extras/blob/master/grpc_check/datadog_checks/grpc_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-extras/blob/master/grpc_check/metadata.csv
[7]: https://github.com/DataDog/integrations-extras/blob/master/grpc_check/assets/service_checks.json
[8]: help@datadoghq.com