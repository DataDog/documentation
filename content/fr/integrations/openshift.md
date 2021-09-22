---
assets:
  dashboards: {}
  logs: {}
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

> Il n'existe actuellement aucun check `openshift` distinct. Cette page décrit la configuration nécessaire pour activer la collecte des métriques propres à OpenShift dans l'Agent. Les données décrites ici sont recueillies par le [check `kubernetes_apiserver`][1]. La configuration de ce check est nécessaire pour recueillir les métriques `openshift.*`.

## Configuration

### Installation

Pour installer l'Agent, consultez les [instructions d'installation de l'Agent][2] pour Kubernetes. La configuration par défaut a été conçue pour OpenShift 3.7.0+ et OpenShift 4.0+, car elle repose sur des fonctionnalités et des endpoints ajoutés dans ces versions.

### Configuration

Depuis la version 6.1, l'Agent Datadog prend en charge la surveillance des clusters OpenShift Origin et Enterprise. En fonction de vos besoins et des [contraintes de sécurité][3] de votre cluster, trois scénarios de déploiement sont pris en charge :

- [Opérations avec SCC restreintes](#restricted-scc-operations)
- [Opérations avec SCC de réseau host](#host)
- [SCC Datadog personnalisées pour un accès à toutes les fonctionnalités](#custom-datadog-scc-for-all-features)

| Contraintes de contexte de sécurité (SCC)   | [Restreintes](#restricted-scc-operations) | [Réseau host](#host) | [Personnalisées](#custom-datadog-scc-for-all-features) |
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

{{< alert >}}
<bold>OpenShift 4.0+</bold> : si vous avez utilisé le programme d'installation OpenShift sur un fournisseur de cloud pris en charge, vous devez déployer l'Agent avec <code>hostNetwork: true</code> dans le fichier de configuration <code>datadog.yaml</code> pour récupérer les tags et alias. L'accès aux serveurs de métadonnées à partir du réseau des POD est autrement impossible.
{{< /alert >}}

#### Collecte de logs

Reportez-vous à la documentation relative à la [collecte de logs Kubernetes][4] pour en savoir plus.

#### Opérations avec SCC restreintes

Ce mode ne nécessite pas l'octroi d'autorisations spéciales au [daemonset `datadog-agent`][5], à l'exception des autorisations [RBAC][6] qui permettent d'accéder à Kubelet et à l'APIserver. Pour commencer, utilisez ce [modèle destiné à Kubelet][7].

La méthode d'ingestion conseillée pour Dogstatsd, l'APM, et les logs consiste à binder l'Agent Datadog sur un port du host. Ainsi, l'IP cible reste fixe et peut facilement être identifiée par vos applications. Comme les SCC OpenShift restreintes par défaut ne permettent pas de binder sur un port du host, vous pouvez configurer l'Agent de façon à ce qu'il effectue l'écoute sur sa propre adresse IP. Toutefois, vous devrez vous-même configurer la détection de cette IP depuis votre application.

L'Agent peut être lancé en mode `sidecar`, ce qui vous permet de l'exécuter dans le pod de votre application pour une identification simplifiée.

#### Host

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
Si SELinux est en mode strict, il est conseillé d'accorder le [type `spc_t`][8] au pod datadog-agent. Pour déployer votre Agent, Datadog a créé une [SCC datadog-agent][9] que vous pouvez appliquer après la [création du compte du service datadog-agent][6]. Cette SCC accorde les autorisations suivantes :

- `allowHostPorts: true` : permet de binder les admissions Dogstatsd/APM/Logs sur l'IP du nœud.
- `allowHostPID: true` : permet la détection de l'origine des métriques DogStatsD envoyées par le socket Unix.
- `volumes: hostPath` : accède au socket Docker et aux dossiers `proc` et `cgroup` du host afin de recueillir les métriques.
- `SELinux type: spc_t` : accède au socket Docker et aux dossiers `proc` et `cgroup` de tous les processus afin de recueillir les métriques. Pour en savoir plus, lisez [cet article de Red Hat][8] (en anglais).

{{< alert type="info" >}}
N'oubliez pas d'ajouter le <a href="https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#configure-rbac-permissions">compte de service datadog-agent</a> à la <a href="https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/openshift/scc.yaml">SCC datadog-agent</a> nouvellement créée en ajoutant <code>system:serviceaccount:<espace de nommage datadog-agent>:<nom du compte de service datadog-agent ></code> à la section <code>users</code>.
{{< /alert >}}

{{< alert >}}
<b>OpenShift 4.0+</b> : si vous avez utilisé le programme d'installation OpenShift sur un fournisseur de cloud pris en charge, vous devez déployer l'Agent avec <code>allowHostNetwork: true</code> dans le fichier de configuration <code>datadog.yaml</code> pour récupérer les tags et alias. L'accès aux serveurs de métadonnées à partir du réseau des POD est autrement impossible.
{{< /alert >}}

**Remarque** : le socket Docker appartient au groupe root. Vous devez donc élever les privilèges de l'Agent pour pouvoir récupérer les métriques Docker. Pour exécuter le processus de l'Agent en tant qu'utilisateur root, vous pouvez configurer votre SCC de la façon suivante :

```yaml
runAsUser:
  type: RunAsAny
```

### Validation

Consultez [kubernetes_apiserver][1]

## Données collectées

### Métriques
{{< get-metrics-from-git "openshift" >}}


### Événements

Le check OpenShift n'inclut aucun événement.

### Checks de service

Le check OpenShift n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/kubernetes_apiserver.d/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/
[3]: https://docs.openshift.org/latest/admin_guide/manage_scc.html
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/#log-collection
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/
[6]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile#configure-rbac-permissions
[7]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/agent-kubelet-only.yaml
[8]: https://developers.redhat.com/blog/2014/11/06/introducing-a-super-privileged-container-concept
[9]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/openshift/scc.yaml
[10]: https://github.com/DataDog/integrations-core/blob/master/openshift/metadata.csv
[11]: https://docs.datadoghq.com/fr/help/