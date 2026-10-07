---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- orchestration
- aws
- azure
- cloud
- google cloud
- configuration & deployment
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/pulumi/README.md
display_name: Pulumi
draft: false
git_integration_title: pulumi
guid: 58481132-c79e-4659-8064-7cdaabbbc981
integration_id: pulumi
integration_title: Pulumi
integration_version: ''
is_public: true
custom_kind: integration
maintainer: team@pulumi.com
manifest_version: 1.0.0
metric_prefix: pulumi.
metric_to_check: ''
name: pulumi
public_title: Pulumi
short_description: Infrastructure en tant que code (IaC) reposant sur vos langages
  préférés pour n'importe quel cloud
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

[Pulumi][1] est une plateforme d'Infrastructure en tant que code (IaC) moderne qui permet aux équipes d'ingénierie cloud de définir, déployer et gérer dans leurs langages préférés des ressources cloud sur n'importe quel cloud.

L'intégration Pulumi est utilisée pour provisionner les ressources cloud disponibles dans Datadog. Vous devez fournir des identifiants afin de déployer et de mettre à jour des ressources dans Datadog.

## Configuration

### Installation

L'[intégration Datadog/Pulumi][2] utilise le SDK Datadog pour gérer et provisionner des ressources.

### Configuration

1. [Inscrivez-vous pour obtenir un compte Pulumi gratuit ou payant.][3]

2. [Installez Pulumi.][4]

3. Une fois que vous avez obtenu vos tokens d'autorisation Datadog pour Pulumi, vous pouvez les configurer de deux façons différentes :


Vous pouvez définir les variables d'environnement `DATADOG_API_KEY` et `DATADOG_APP_KEY` :

```
export DATADOG_API_KEY=XXXXXXXXXXXXXX && export DATADOG_APP_KEY=YYYYYYYYYYYYYY
```

Sinon, si vous préférez stocker vos tokens dans votre pile Pulumi, afin de faciliter l'accès multi-utilisateur, vous pouvez définir vos tokens dans la configuration :

```
pulumi config set datadog:apiKey XXXXXXXXXXXXXX --secret && pulumi config set datadog:appKey YYYYYYYYYYYYYY --secret
```

**Remarque** : transmettez `--secret` lorsque vous définissez `datadog:apiKey` et `datadog:appKey`, afin que vos clés soient correctement chiffrées.

4. Exécutez `pulumi new` pour initialiser un répertoire de projet pour votre pile d'infrastructure et suivez la [documentation sur l'API][5] (en anglais) pour définir des métriques, des monitors, des dashboards ou d'autres ressources.

5. Une fois vos ressources cloud définies dans le code, exécutez `pulumi up` pour créer les nouvelles ressources définies dans votre programme Pulumi. 

## Données collectées

### Métriques

Pulumi n'inclut aucune métrique.

### Checks de service

Pulumi n'inclut aucun check de service.

### Événements

Pulumi n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://pulumi.com
[2]: https://www.pulumi.com/docs/intro/cloud-providers/datadog/
[3]: https://www.pulumi.com/pricing/
[4]: https://www.pulumi.com/docs/get-started/
[5]: https://www.pulumi.com/docs/reference/pkg/datadog/
[6]: https://docs.datadoghq.com/fr/help/