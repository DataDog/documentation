---
git_integration_title: kube_proxy
guid: 5cdc0363-a0df-469b-8346-2da4ab84128b
integration_title: ''
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: kube_proxy
short_description: kube_proxy description.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Aperçu

Obtenir les métriques de kube_proxy en temps réel pour:

* Visualiser et monitorer les états de kube_proxy
* Être informé des failovers et des événements kube_proxy.

## Configuration

L'intégration repose sur l'option `--metrics-bind-address` du proxy-kube, par défaut elle est liée à` 127.0.0.1: 10249`.
Vous pouvez soit démarrer l'agent sur le réseau host si le proxy-kube est également sur le réseau host (par défaut) ou démarrer le proxy-kube avec l'adresse `--metrics-bind-address = 0.0.0.0: 10249`

Modifiez le fichier `kube_proxy.yaml` pour pointer vers votre serveur et votre port, définissez les masters à monitorer

⚠️ Si vous modifiez le namespace ou le nom d'une métrique, ou si vous ajoutez d'autres métriques, elles seront considérées comme custom.

Contribuez à l'intégration si vous souhaitez ajouter une métrique pertinente.

## Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `kube_proxy` dans la section Checks:

    Checks
    ======

        kube_proxy
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 1 service checks

## Compatibilité

Le check kube_proxy est compatible avec toutes les principales plateformes.

