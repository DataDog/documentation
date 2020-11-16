---
aliases: []
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    CoreDNS: assets/dashboards/coredns.json
  logs:
    source: coredns
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
  - network
  - autodiscovery
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/coredns/README.md'
display_name: CoreDNS
draft: false
git_integration_title: coredns
guid: 9b316155-fc8e-4cb0-8bd5-8af270759cfb
integration_id: coredns
integration_title: CoreDNS
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: coredns.
metric_to_check: coredns.request_count
name: coredns
public_title: Intégration Datadog/CoreDNS
short_description: CoreDNS recueille des métriques relatives au DNS dans Kubernetes.
support: core
supported_os:
  - linux
---
## Présentation

Recueillez des métriques de CoreDNS en temps réel pour visualiser et surveiller les échecs de DNS et les hits et miss de cache.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check CoreDNS est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

#### Collecte de métriques

| Paramètre            | Valeur                                                                            |
| -------------------- | -------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `coredns`                                                                        |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                    |
| `<CONFIG_INSTANCE>`  | `{"prometheus_url":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}` |

**Remarques :**

- Le tag `dns-pod` surveille l'IP du pod DNS cible. Les autres tags sont associés au dd-agent qui interroge les informations à l'aide de la découverte de services.
- Les annotations de découverte de services doivent être effectuées sur le pod. En cas de déploiement, ajoutez les annotations aux métadonnées des spécifications du modèle. Ne les ajoutez pas au niveau des spécifications extérieures.

##### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][3].

| Paramètre      | Valeur                                     |
|----------------|-------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "coredns", "service": "<NOM_SERVICE>"}` |

### Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `coredns` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "coredns" >}}


### Événements

Le check CoreDNS n'inclut aucun événement.

### Checks de service

**coredns.prometheus.health** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter aux endpoints de métriques.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Développement

Consultez la [documentation sur les outils de développement][7] pour découvrir comment tester et développer des intégrations reposant sur l'Agent.

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/master/coredns/metadata.csv
[6]: http://docs.datadoghq.com/help
[7]: https://docs.datadoghq.com/fr/developers/