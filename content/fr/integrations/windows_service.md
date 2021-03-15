---
aliases:
  - /fr/integrations/winservices
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/windows_service/README.md'
display_name: Windows Service
draft: false
git_integration_title: windows_service
guid: 2289acf0-e413-4384-83f7-88157b430805
integration_id: windows-service
integration_title: Windows Services
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: windows_service.
name: windows_service
public_title: Intégration Datadog/Services Windows
short_description: Surveillez l'état de vos services Windows.
support: core
supported_os:
  - windows
---
## Présentation

Ce check surveille l'état de n'importe quel service Windows et envoie un check de service à Datadog.

## Configuration

### Installation

Le check Service Windows est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos hosts Windows.

### Configuration

Modifiez le fichier `windows_service.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple windows_service.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles. Vous trouverez ci-dessous un exemple de configuration.

```yaml
init_config:

instances:

    ## @param services  - liste de chaînes, obligatoire
    ## Liste des services à surveiller, p. ex. Dnscache, wmiApSrv, etc.
    ##
    ## Si un service est défini sur `ALL`, tous les services enregistrés avec le SCM sont surveillés.
    ##
    ## Cela renvoie tous les services qui commencent par service, comme si service.* était configuré.
    ## Pour une correspondance exacte, utilisez ^service$
    #
    # - services:
    #    - <NOM_SERVICE_1>
    #    - <NOM_SERVICE_2>
  - services:
      - wmiApSrv
      - SNMPTRAP

    ## @param disable_legacy_service_tag - booléen, facultatif, valeur par défaut : false
    ## Indique si l'envoi du tag dont le nom `service` a été remplacé `windows_service` doit s'arrêter
    ## et si l'avertissement d'obsolescence doit être désactivé
    #
    # disable_legacy_service_tag: false
    disable_legacy_service_tag: true

    ## @param tags - liste de paires key:value, facultatif
    ## Liste de tags à ajouter à chaque check de service envoyé par cette intégration.
    ##
    ## Pour en savoir plus sur le tagging, consultez la page https://docs.datadoghq.com/tagging
    #
    # tags:
    #   - <KEY_1>:<VALUE_1>
    #   - <KEY_2>:<VALUE_2>
    tags:
      - provider:amazon
```

Entrez les noms de service tels qu'ils apparaissent dans le champ Propriétés de `services.msc` (p. ex. `wmiApSrv`), **PAS** le nom d'affichage (p. ex. `WMI Performance Adapter`). Pour les noms contenant des espaces : mettez le nom entier entre guillemets (p. ex. "Bonjour Service"). **Remarque** : les espaces sont remplacées par des underscores dans Datadog.

[Redémarrez l'Agent][4] pour commencer à surveiller les services et à envoyer des checks de service à Datadog.

#### Collecte de métriques

Le check Windows Service peut potentiellement générer des [métriques custom][5], ce qui peut avoir une incidence sur votre [facture][6]. 

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `windows_service` dans la section Checks.

## Données collectées

### Métriques

Le check Service Windows n'inclut aucune métrique.

### Événements

Le check Service Windows n'inclut aucun événement.

### Checks de service

**windows_service.state** :<br>
L'Agent envoie ce check de service pour chaque service Windows configuré dans `services`, et applique le tag service:<nom_service> au check de service. Ce dernier prend les statuts suivants, en fonction du statut Windows :

| Statut Windows   | windows_service.state |
| ---------------- | --------------------- |
| Stopped          | CRITICAL              |
| Start Pending    | WARNING               |
| Stop Pending     | WARNING               |
| Running          | OK                    |
| Continue Pending | WARNING               |
| Pause Pending    | WARNING               |
| Paused           | WARNING               |
| Unknown          | UNKNOWN               |

Si l'Agent ne parvient pas à accéder au service, en raison d'un problème d'autorisation ou d'une erreur de nom, le check de service renvoie `UNKNOWN`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

- [Surveillance de Windows Server 2012][9]
- [Comment recueillir des métriques de Windows Server 2012][10]
- [Surveillance de Windows Server 2012 avec Datadog][11]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/windows_service/datadog_checks/windows_service/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics/
[6]: https://docs.datadoghq.com/fr/account_management/billing/custom_metrics/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/fr/help/
[9]: https://www.datadoghq.com/blog/monitoring-windows-server-2012
[10]: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
[11]: https://www.datadoghq.com/blog/windows-server-monitoring