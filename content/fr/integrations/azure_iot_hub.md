---
categories:
- azure
- cloud
- iot
- provisioning
dependencies: []
description: Surveillez des métriques clés d'Azure IoT Hub.
doc_link: https://docs.datadoghq.com/integrations/azure_iot_hub/
draft: false
git_integration_title: azure_iot_hub
has_logo: true
integration_id: azure-iot-hub
integration_title: Microsoft Azure IoT Hub
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_iot_hub
public_title: Intégration Datadog/Microsoft Azure IoT Hub
short_description: Surveillez des métriques clés d'Azure IoT Hub.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Azure IoT Hub est un service entièrement géré qui permet d'établir des communications fiables, sécurisées et bidirectionnelles entre des millions d'appareils IoT.

Recueillez des métriques d'Azure IoT Hub pour :

- Visualiser les performances de vos hubs IoT
- Corréler les performances de vos hubs IoT avec vos applications

Azure Provisioning Service est un service d'assistance pour IoT Hub qui permet un approvisionnement juste à temps et sans intervention sur le bon hub IoT. Aucune intervention humaine n'est requise, ce qui permet aux clients d'approvisionner des millions de périphériques de manière sécurisée et évolutive.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_iot_hub" >}}


### Aide

L'intégration Azure IoT Hub n'inclut aucun événement.

### Aide

L'intégration Azure IoT Hub n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_iot_hub/azure_iot_hub_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/