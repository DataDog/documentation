---
app_id: azure_firewall
categories:
- azure
- cloud
- network
custom_kind: integration
description: Surveillez des métriques clés de vos pare-feux Azure.
title: Pare-feu Microsoft Azure
---
## Section Overview

Pare-feu Azure est un service de sécurité réseau basé sur le cloud pour protéger les ressources de votre réseau virtuel Azure.

Utilisez l'intégration Datadog/Azure pour recueillir les métriques de vos pare-feux.

## Configuration

### Installation

Si vous ne l'avez pas encore fait, configurez d'abord l'[intégration Microsoft Azure] (https://docs.datadoghq.com/integrations/azure/). Il n'y a pas d'autres étapes d'installation.

## Données collectées

### Métriques

| | |
| --- | --- |
| **azure.network_azurefirewalls.application_rule_hit** <br>(count) | Le nombre de fois où les règles d'application ont été atteintes<br>_Affiché comme atteint_. |
| **azure.network_azurefirewalls.count** <br>(count) | Le nombre de pare-feu Azure|
| **azure.network_azurefirewalls.data_processed** <br>(gauge) | La quantité totale de données traitées par un pare-feu<br>_Affichée en octets_. |
| **azure.network_azurefirewalls.firewall_health** <br>(jauge) | Indique la santé globale d'un pare-feu<br>_Affiché en pourcentage_. |
| **azure.network_azurefirewalls.network_rule_hit** <br>(count) | Le nombre de fois où les règles du réseau ont été atteintes<br>_Montré comme atteint_ |
| **azure.network_azurefirewalls.snat_port_utilization** <br>(gauge) | Le pourcentage de ports SNAT sortants actuellement utilisés<br>_Affiché en pourcentage_. |
| **azure.network_azurefirewalls.throughput** <br>(jauge) | Le débit traité par un pare-feu<br>_Constitué de bit_ |

### Événements

L'intégration Pare-feu Azure n'inclut aucun événement.

### Checks de service

L'intégration Pare-feu Azure n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).