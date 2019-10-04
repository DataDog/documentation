---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
  - orchestration
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/openshift/README.md'
display_name: OpenShift
git_integration_title: openshift
guid: ea7f642f-263f-4ed1-8da0-9bb96c7df1f0
integration_id: openshift
integration_title: OpenShift
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: openshift.
metric_to_check: openshift.clusterquota.cpu.used
name: openshift
public_title: Intégration Datadog/OpenShift
short_description: La plateforme Kubernetes pour concrétiser vos plus grandes idées
support: core
supported_os:
  - linux
---
## Présentation
Red Hat OpenShift est une plateforme d'applications de conteneur open source basée sur l'orchestrateur de conteneurs Kubernetes pour le développement et le déploiement d'applications d'entreprise.

## Implémentation
Depuis la version 6.1, l'Agent Datadog prend en charge la surveillance des clusters OpenShift Origin et Enterprise. En fonction de vos besoins et des contraintes de sécurité de votre cluster, trois scénarios de déploiement sont pris en charge :

* [Opérations avec des SCC restreintes][1]
* [Opérations avec des SCC de réseau host][2]
* [SCC Datadog personnalisées pour toutes les fonctionnalités][3]

Des informations sur les contraintes de contexte de sécurité (SCC) sont disponibles dans la [documentation relative à l'Agent][4].

### Informations générales
* Reportez-vous aux instructions d'installation habituelle de l'[Agent Docker][5] et de la [section relative à Kubernetes][6].
* L'[intégration Kubernetes][7] est conçue par défaut pour OpenShift 3.7.0 ou ultérieur. Datadog repose sur des fonctionnalités et des endpoints ajoutés dans cette version. Vous devez effectuer [davantage d'étapes d'installation][8] pour les versions antérieures.
* Les métriques relatives au [quota de ressources de cluster][9] sont recueillies par l'Agent leader. Configurez [la collecte d'événements et l'élection de leader][10] de l'Agent pour envoyer des métriques à Datadog.

## Données collectées
### Métriques
{{< get-metrics-from-git "openshift" >}}


### Événements
Le check OpenShift n'inclut aucun événement.

### Checks de service
Le check OpenShift n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][12].


[1]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/OPENSHIFT.md#restricted-scc-operations
[2]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/OPENSHIFT.md#host-network-scc-operations
[3]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/OPENSHIFT.md#custom-datadog-scc-for-all-features
[4]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/OPENSHIFT.md#openshift-installation-and-configuration-instructions
[5]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/README.md
[6]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/README.md#Kubernetes
[7]: https://docs.datadoghq.com/fr/integrations/kubernetes
[8]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/README.md#legacy-kubernetes-versions
[9]: https://docs.openshift.com/container-platform/3.9/admin_guide/multiproject_quota.html
[10]: https://docs.datadoghq.com/fr/agent/kubernetes/event_collection
[11]: https://github.com/DataDog/integrations-core/blob/master/openshift/metadata.csv
[12]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}