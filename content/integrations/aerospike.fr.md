---
ddtype: check
description: L'intégration Aerospike aide à récupérer les performances et la disponibilité
  metrics from Aerospike cluster instances.
doc_link: https://docs.datadoghq.com/integrations/aerospike/
git_integration_title: aerospike
has_logo: true
integration_title: Aerospike
is_public: true
kind: integration
maintainer: r.guo@aerospike.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: aerospike
public_title: Intégration Datadog-Aérospike
short_description: Collecter les statistiques de cluster et de namespaces
support: contrib
supported_os:
- linux
- mac_os
version: 0.1.0
---



## Aperçu

Obtenir des métriques de Aerospike Database en temps réel pour:

* Visualiser et monitorer les états de Aerospike
* Être informé des failovers et des événements d'aerospike.

## Installation

Installer le paquet `dd-check-aerospike` manuellement ou avec votre gestionnaire de configuration favori

## Configuration

Modifiez le fichier `aerospike.yaml` pour pointer vers votre serveur et votre port, définissez les masters à monitorer

## Validation

Lorsque vous exécutez `info datadog-agent`, vous devriez voir quelque chose comme ceci:

    Checks
    ======

        aerospike
        -----------
          - instance #0 [OK]
          - Collected 269 metrics, 0 events & 1 service checks

## Compatibilité

Le check Aerospike est compatible avec toutes les principales plateformes et Aerospike Community Edition.

