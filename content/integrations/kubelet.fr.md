---
git_integration_title: kubelet
guid: 55039e21-7e89-41fb-968c-ab8bf8f25da0
integration_title: ''
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.2.0
max_agent_version: 7.0.0
min_agent_version: 6.0.0
name: kubelet
short_description: Collecte les statistiques du conteneur de kubelet.
support: core
supported_os:
- linux
---



## Aperçu

Cette intégration collecte les métriques du conteneur depuis kubelet.

* Visualiser et monitorer les états de kublet
* Être informé des failovers et des événements kubelet.

## Installation

Installer le paquet `dd-check-kubelet` manuellement ou avec votre gestionnaire de configuration favori

## Configuration

Modifiez le fichier `kubelet.yaml` afin d'indiquer votre serveur et votre port, définissez les tags à envoyer avec vos métriques.

## Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) and look for `kubelet` under the Checks section:

    Checks
    ======

        kubelet
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Compatibilité

Le check Kubelet peut être exécuté suivant deux modes:

- Le mode prometheus par défaut est compatible avec la version de Kubernetes 1.7.6 ou supérieur.
- Le mode cAdvisor (activé en définissant l'option `cadvisor_port`) devrait être compatible avec les versions 1.3 et supérieures. Un tagging et  filtrage cohérents requièrent au moins la version 6.2 de l'agent.

