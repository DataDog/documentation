---
app_id: ibm-ace
app_uuid: 81e0df5f-8778-4558-88c3-884dcab5ce89
assets:
  dashboards:
    IBM ACE Overview: assets/dashboards/overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ibm_ace.messages.current
      metadata_path: metadata.csv
      prefix: ibm_ace.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: IBM ACE
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_ace/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_ace
integration_id: ibm-ace
integration_title: IBM ACE
integration_version: 1.1.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: ibm_ace
public_title: IBM ACE
short_description: Surveillez les statistiques de vos ressources IBM ACE et les flux
  de messages.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Surveillez les statistiques de vos ressources IBM ACE et les flux de
    messages.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: IBM ACE
---



## Présentation

Ce check permet de surveiller [IBM ACE][1] avec l'Agent Datadog.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### IBM MQ

Un serveur [IBM MQ][3] est requis pour consommer les messages de métriques à partir d'IBM ACE.

### IBM ACE

1. Assurez-vous d'avoir installé la version 12.0.2.0 au minimum.
2. Appliquez un fichier de [politique MQEndpoint][4] dont le nom respecte le format `<NOM_POLITIQUE_MQ>.policyxml`. Le contenu doit ressembler à ceci :
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <policies>
        <policy policyType="MQEndpoint" policyName="<MQ_POLICY_NAME>" policyTemplate="MQEndpoint">
            <connection>CLIENT</connection>
            <destinationQueueManagerName>...</destinationQueueManagerName>
            <queueManagerHostname>...</queueManagerHostname>
            <listenerPortNumber>1414</listenerPortNumber>
            <channelName>...</channelName>
            <securityIdentity><MQ_SECURITY_IDENTITY></securityIdentity>
        </policy>
    </policies>
    ```
3. [Définissez][5] les identifiants en exécutant : `mqsisetdbparms -n mq::<IDENTITÉ_SÉCURITÉ_MQ> -u <utilisateur> -p <motdepasse>`
4. Mettez à jour votre fichier `server.conf.yaml` avec la configuration suivante :
    ```yaml
    remoteDefaultQueueManager: '{DefaultPolicies}:<MQ_POLICY_NAME>'
    Events:
      OperationalEvents:
        MQ:
          enabled: true
      BusinessEvents:
        MQ:
          enabled: true
          outputFormat: json
    Statistics:
      Resource:
        reportingOn: true
      Snapshot:
        publicationOn: active
        outputFormat: json
        accountingOrigin: basic
        nodeDataLevel: advanced
        threadDataLevel: basic
    Monitoring:
      MessageFlow:
        publicationOn: active
        eventFormat: MonitoringEventV2
    AdminLog:
      enabled: true
      fileLog: true
      consoleLog: true
      consoleLogFormat: ibmjson
    ```
5. Redémarrez IBM ACE.

### Installation

Le check IBM ACE est inclus avec le package de l'[Agent Datadog][6].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `ibm_ace.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance ibm_ace. Consultez le [fichier d'exemple ibm_ace.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][8].

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `ibm_ace` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ibm_ace" >}}


### Événements

L'intégration IBM ACE n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "ibm_ace" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].


[1]: https://www.ibm.com/docs/en/app-connect/12.0?topic=overview-app-connect-enterprise-introduction
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://www.ibm.com/products/mq
[4]: https://www.ibm.com/docs/en/app-connect/12.0?topic=properties-mqendpoint-policy
[5]: https://www.ibm.com/docs/en/app-connect/12.0?topic=mq-connecting-secured-queue-manager
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://github.com/DataDog/integrations-core/blob/master/ibm_ace/datadog_checks/ibm_ace/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/ibm_ace/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/ibm_ace/assets/service_checks.json
[12]: https://docs.datadoghq.com/fr/help/