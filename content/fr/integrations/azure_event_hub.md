---
categories:
- azure
- cloud
- log collection
- notifications
dependencies: []
description: Surveillez des métriques clés d'Azure Event Hubs.
doc_link: https://docs.datadoghq.com/integrations/azure_event_hub/
draft: false
git_integration_title: azure_event_hub
has_logo: true
integration_id: azure-event-hub
integration_title: Microsoft Azure Event Hub
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_event_hub
public_title: Intégration Datadog/Microsoft Azure Event Hubs
short_description: Surveillez des métriques clés d'Azure Event Hubs.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure Event Hubs est un service géré de gestion de flux de données à grande échelle.

Recueillez des métriques d'Azure Event Hubs pour :

- Visualiser les performances de vos hubs d'événements
- Corréler les performances de vos hubs d'événements avec vos applications

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

### Collecte de métriques

Dans le [carré d'intégration Azure][1], assurez-vous que l'option `Event Hub` est cochée dans la section concernant la collecte des métriques.

### APM

Pour recueillir des logs à partir d'Event Hubs, suivez cette méthode globale :

- Créez un Azure Event Hubs depuis le portail Azure, l'interface de ligne de commande Azure ou Powershell.
- Configurez la fonction Datadog/Azure qui transmet les logs depuis votre Event Hub vers Datadog.
- Envoyez vos logs Event Hubs au Event Hub que vous venez de créer.

Pour obtenir des instructions détaillées, consultez la [documentation principale sur les logs Azure][2].

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure-event-hub" >}}


### Aide

L'intégration Azure Event Hubs n'inclut aucun événement.

### Aide

L'intégration Azure Event Hubs n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://docs.datadoghq.com/fr/integrations/azure/#log-collection
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_event_hub/azure_event_hub_metadata.csv
[4]: https://docs.datadoghq.com/fr/help/