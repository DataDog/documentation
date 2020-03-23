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

> Il n'existe actuellement aucun check `openshift` distinct. Cette page décrit la configuration nécessaire pour activer la collecte des métriques propres à OpenShift dans l'Agent. Les données décrites ici sont recueillies par le [check `kube-apiserver-metrics`][1]. La configuration de ce check est nécessaire pour recueillir les métriques `openshift.*`.

## Configuration

### Installation

Pour installer l'Agent, consultez les [instructions d'installation de l'Agent][1] pour Kubernetes. La configuration par défaut cible OpenShift 3.7.0+ et OpenShift 4.0+, car elle repose sur des fonctionnalités et des endpoints ajoutés dans cette version.

### Configuration

Depuis la version 6.1, l'Agent Datadog prend en charge la surveillance des clusters OpenShift Origin et Enterprise. En fonction de vos besoins et des [contraintes de sécurité][3] de votre cluster, trois scénarios de déploiement sont pris en charge :

- [Opérations avec SCC restreintes](#restricted-scc-operations)
- [Opérations avec SCC de réseau host](#host-network-scc-operations)
- [SCC Datadog personnalisées pour un accès à toutes les fonctionnalités](#custom-datadog-scc-for-all-features)

| Contraintes de contexte de sécurité (SCC)   | [Restreintes](#restricted-scc-operations) | [Réseau host](#host-network-scc-operations) | [Personnalisées](#custom-datadog-scc-for-all-features) |
| ------------------------------ | ---------------------------------------- | -------------------------------------------- | ---------------------------------------------- |
| Surveillance de la couche Kubernetes    | ✅                                       | ✅                                           | ✅                                             |
| Autodiscovery basé sur Kubernetes | ✅                                       | ✅                                           | ✅                                             |
| Admission des données Dogstatsd               | 🔶                                       | ✅                                           | ✅                                             |
| Admission des traces d'APM               | 🔶                                       | ✅                                           | ✅                                             |
| Admission réseau des logs            | 🔶                                       | ✅                                           | ✅                                             |
| Métriques du réseau host           | ❌                                       | ❌                                           | ✅                                             |
| Surveillance de la couche Docker        | ❌                                       | ❌                                           | ✅                                             |
| Collecte des logs de conteneur      | ❌                                       | ❌                                           | ✅                                             |
| Surveillance des Live Containers      | ❌                                       | ❌                                           | ✅                                             |
| Surveillance des Live Processes        | ❌                                       | ❌                                           | ✅                                             |

> :warning: **OpenShift 4.0+** : si vous avez utilisé le programme d'installation OpenShift sur un fournisseur de cloud pris en charge, vous devez déployer l'Agent avec `hostNetwork: true` pour récupérer les tags/alias de host ; autrement, l'accès aux serveurs de métadonnées à partir du réseau du POD sera impossible.

#### Opérations avec SCC restreintes

Ce mode ne nécessite pas l'octroi d'autorisations spéciales au [daemonset `datadog-agent`][4], à l'exception des autorisations [RBAC][5] qui permettent d'accéder à Kubelet et à l'APIserver. Pour commencer, utilisez ce [modèle destiné à Kubelet][6].

La méthode d'ingestion conseillée pour Dogstatsd, l'APM, et les logs consiste à binder l'Agent Datadog sur un port du host. Ainsi, l'IP cible reste fixe et peut facilement être identifiée par vos applications. Comme les SCC OpenShift restreintes par défaut ne permettent pas de binder sur un port du host, vous pouvez configurer l'Agent de façon à ce qu'il effectue l'écoute sur sa propre adresse IP. Toutefois, vous devrez vous-même configurer la détection de cette IP depuis votre application.

L'Agent peut être lancé en mode `sidecar`, ce qui vous permet de l'exécuter dans le pod de votre application pour une identification simplifiée.

#### Opérations avec SCC de réseau host

Ajoutez l'autorisation `allowHostPorts` au pod (via la SCC `hostnetwork` ou `hostaccess` standard, ou en créant votre propre SCC). Dans ce cas, vous pouvez ajouter les bindings de port appropriés dans les spécifications de vos pods :

```yaml
ports:
  - containerPort: 8125
    name: dogstatsdport
    protocol: UDP
  - containerPort: 8126
    name: traceport
    protocol: TCP
```

#### SCC Datadog personnalisées pour un accès à toutes les fonctionnalités

Si SELinux est en mode permissif ou désactivé, activez la SCC `hostaccess` pour profiter de toutes les fonctionnalités.
Si SELinux est en mode strict, il est conseillé d'accorder le [type `spc_t`][7] au pod datadog-agent. Pour déployer votre Agent, Datadog a créé une [SCC datadog-agent][8] que vous pouvez appliquer après la [création du compte du service datadog-agent][5]. Cette SCC accorde les autorisations suivantes :

- `allowHostPorts: true` : permet de binder les admissions Dogstatsd/APM/Logs sur l'IP du nœud.
- `allowHostPID: true` : permet la détection de l'origine des métriques DogStatsD envoyées par le socket Unix.
- `volumes: hostPath` : accède au socket Docker et aux dossiers `proc` et `cgroup` du host afin de recueillir les métriques.
- `SELinux type: spc_t` : accède au socket Docker et aux dossiers `proc` et `cgroup` de tous les processus afin de recueillir les métriques. Pour en savoir plus, lisez [cet article de Red Hat][7] (en anglais).

> :warning: N'oubliez pas d'ajouter le [compte de service datadog-agent][5] à la [SCC datadog-agent][8] nouvellement créée en ajoutant `system:serviceaccount:<espace de nommage datadog-agent>:<nom du compte de service datadog-agent>` à la section `users`.

> :warning: **OpenShift 4.0+** : si vous avez utilisé le programme d'installation OpenShift sur un fournisseur de cloud pris en charge, vous devez modifier la SCC fournie en indiquant `allowHostNetwork: true` pour récupérer les tags/alias de host ; autrement, l'accès aux serveurs de métadonnées à partir du réseau du POD sera impossible.

### Validation

Consultez [kube_apiserver_metrics][1]

## Données collectées

### Métriques

Consultez [metadata.csv][10] pour découvrir la liste des métriques propres à OpenShift.

### Événements

Le check OpenShift n'inclut aucun événement.

### Checks de service

Le check OpenShift n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://github.com/DataDog/integrations-core/tree/master/kube_apiserver_metrics
[2]: https://docs.datadoghq.com/fr/agent/kubernetes
[3]: https://docs.openshift.org/latest/admin_guide/manage_scc.html
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile#configure-rbac-permissions
[6]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/agent-kubelet-only.yaml
[7]: https://developers.redhat.com/blog/2014/11/06/introducing-a-super-privileged-container-concept
[8]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/openshift/scc.yaml
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/openshift/metadata.csv
[11]: https://docs.datadoghq.com/fr/help