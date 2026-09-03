---
app_id: fluxcd
app_uuid: 11cc5047-83aa-44df-b7ca-9c6e1c32b723
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: fluxcd.gotk.suspend.status
      metadata_path: metadata.csv
      prefix: fluxcd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: fluxcd
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Communauté
  sales_email: melchior.moulin@blablacar.com
  support_email: melchior.moulin@blablacar.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/fluxcd/README.md
display_on_public_website: true
draft: false
git_integration_title: fluxcd
integration_id: fluxcd
integration_title: fluxcd
integration_version: 0.0.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: fluxcd
public_title: fluxcd
short_description: Intégration de Fluxcd avec la version 2 d'OpenMetrics
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
  description: Intégration de Fluxcd avec la version 2 d'OpenMetrics
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: fluxcd
---



## Présentation
[Flux][1] est un ensemble ouvert et extensible de solutions de diffusion continue et progressive pour Kubernetes.
Ce check permet de surveiller fluxcd avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

Pour installer le check fluxcd sur votre host, procédez comme suit :


1. Installez le [kit de developpement][3]
 sur n'importe quelle machine.

2. Exécutez `ddev release build fluxcd` pour générer le package.

3. [Téléchargez l'Agent Datadog][4].

4. Importez l'artefact du build sur tous les hosts avec un Agent et
 exécutez `datadog-agent integration install -w
 chemin/vers/fluxcd/dist/<NOM_ARTEFACT>.whl`.

### Configuration

1. Modifiez le fichier `fluxcd.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance fluxcd. Consultez le [fichier d'exemple fluxcd.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `fluxcd` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "fluxcd" >}}


### Événements

L'intégration fluxcd n'inclut aucun événement.

### Checks de service

L'intégration fluxcd n'inclut aucun check de service.


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].


[1]: https://fluxcd.io/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/fluxcd/datadog_checks/fluxcd/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/fluxcd/metadata.csv
[9]: https://docs.datadoghq.com/fr/help/