---
categories:
- azure
- cloud
- network
dependencies: []
description: Surveillez des métriques clés d'Azure Data Explorer.
doc_link: https://docs.datadoghq.com/integrations/azure_data_explorer/
draft: false
git_integration_title: azure_data_explorer
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Data Explorer
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_data_explorer
public_title: Intégration Datadog/Microsoft Azure Data Explorer
short_description: Surveillez des métriques clés d'Azure Data Explorer.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure Data Explorer est un service d'analyse hautement évolutif et sécurisé qui vous permet d'explorer en profondeur des données structurées et non structurées pour obtenir des informations instantanées. Optimisé pour les requêtes ad hoc, Azure Data Explorer permet l'exploration de données brutes, structurées et semi-structurées pour des analyses extrêmement rapides. Utilisez Datadog pour surveiller les performances et l'utilisation d'Azure Data Explorer par rapport au reste de vos applications et de votre infrastructure.

Recueillez des métriques d'Azure Data Explorer pour :

* suivre les performances d'ingestion, de traitement et de latence de vos instances Data Explorer ;
* surveiller l'utilisation des ressources de calcul, de mémoire et réseau Data Explorer.

## Formule et utilisation
### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring
### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_data_explorer" >}}


### Aide
L'intégration Azure Data Explorer n'inclut aucun événement.

### Aide
L'intégration Azure Data Explorer n'inclut aucun check de service.

## Aide
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_data_explorer/azure_data_explorer_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/