---
title: Déployer Datadog dans Kubernetes avec Helm
kind: documentation
further_reading:
  - link: agent/kubernetes/daemonset_setup
    tag: documentation
    text: Exécuter l'Agent avec un DaemonSet Kubernetes
  - link: agent/kubernetes/host_setup
    tag: documentation
    text: Exécuter l'Agent sur un host avec Kubernetes
  - link: agent/kubernetes/metrics
    tag: documentation
    text: Métriques Kubernetes
---
Helm est un outil de gestion de paquets pour Kubernetes.

## Installer Helm

### Installer le client Helm

{{< tabs >}}
{{% tab "macOS (Homebrew)" %}}

```bash
brew install kubernetes-helm
```

{{% /tab %}}
{{% tab "Linux (Snap)" %}}

```bash
sudo snap install helm --classic
```

{{% /tab %}}
{{% tab "Windows (Chocolatey)" %}}

```bash
choco install kubernetes-helm
```

{{% /tab %}}
{{< /tabs >}}

Pour installer Helm sur une autre plateforme ou avec une autre méthode, consultez la [documentation Helm][1].

### Installer le serveur Helm (Tiller)

**Remarque** : cette étape n'est pas nécessaire si vous utilisez Helm 3.0.0 ou une version ultérieure. Dans ce cas, vous n'avez pas besoin d'[Installer le chart Helm Datadog](#installer-le-chart-helm-datadog).

Si votre environnement Kubernetes n'utilise pas la fonction RBAC, la commande suivante permet d'installer Tiller dans votre cluster :

```bash
helm init
```

Consultez la [documentation de Helm sur Tiller][2] pour en savoir plus.

Si la fonction RBAC est activé sur votre cluster Kubernetes, utilisez la configuration RBAC suivante pour déployer Tiller.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
 name: tiller
 namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
 name: tiller
roleRef:
 apiGroup: rbac.authorization.k8s.io
 kind: ClusterRole
 name: cluster-admin
subjects:
 - kind: ServiceAccount
   name: tiller
   namespace: kube-system
```

Une fois cette configuration définie en tant que `tiller-rbac-config.yaml`, exécutez :

```bash
kubectl create -f tiller-rbac-config.yaml

helm init --service-account tiller
```

Consultez la [documentation de Helm sur Tiller/RBAC][3] pour en savoir plus.

### Vérifier l'installation

Pour vérifier votre installation, exécutez :

```bash
kubectl get pods -n kube-system -l app=helm
```

Cela renvoie quelque chose semblable à ce qui suit :

```bash
NAME READY STATUS RESTARTS AGE
tiller-deploy-f54b67464-jl5gm 1/1 Running 0 3h16m
```

## Installer le chart Helm Datadog

Pour installer le chart avec le nom de version `<NOM_VERSION>`, récupérez votre clé d'API Datadog à partir des [instructions d'installation de l'Agent][4] et exécutez :

{{< tabs >}}
{{% tab "Helm v1/v2" %}}

```bash
helm install --name <NOM_VERSION> --set datadog.apiKey=<CLÉ_API_DATADOG> stable/datadog
```

{{% /tab %}}

{{% tab "Helm v3+" %}}

```bash
helm install <NOM_VERSION> --set datadog.apiKey=<CLÉ_API_DATADOG> stable/datadog
```

{{% /tab %}}
{{< /tabs >}}

Ce chart ajoute l'Agent Datadog à l'ensemble des nœuds dans votre cluster via un DaemonSet. Il peut également déployer le [chart kube-state-metrics][5] et l'utiliser comme source supplémentaire de métriques concernant le cluster. Quelques minutes après l'installation, Datadog commence à transmettre les hosts et les métriques.

**Remarque** : pour obtenir la liste complète des paramètres disponibles pour le chart Datadog et leurs valeurs par défaut, consultez le [README du référentiel Helm Datadog][6].

## Configurer le chart Helm Datadog

Pour configurer le chart, il est conseillé d'utiliser un fichier YAML spécifiant les valeurs des paramètres du chart :

1.  **Copiez le fichier [`datadog-values.yaml`][7] par défaut.**
2.  Définissez le paramètre `apiKey` avec votre [clé d'API Datadog][4].
3.  Mettez à niveau le chart Helm Datadog avec le nouveau fichier `datadog-values.yaml` :

```bash
helm upgrade -f datadog-values.yaml <NOM_VERSION> stable/datadog --recreate-pods
```

### Activer la collecte de logs

Mettez à jour votre fichier [datadog-values.yaml][7] avec la configuration de collecte de logs suivante, puis mettez à niveau votre chart Helm Datadog :

```text
datadog:
  (...)
 logsEnabled: true
 logsConfigContainerCollectAll: true
```

### Activer la collecte de métriques custom

Pour recueillir des métriques custom avec [DogStatsD][8], activez le trafic non local en modifiant votre fichier [datadog-values.yaml][7].

```text
datadog:
  (...)
  nonLocalTraffic: true
```

### Activer l'APM et le tracing distribué

**Remarque** : si vous souhaitez déployer l'Agent Datadog en tant que déploiement et non via un DaemonSet, la configuration de l'APM avec Helm n'est pas prise en charge.

Mettez à jour votre fichier [datadog-values.yaml][7] avec la configuration d'APM suivante :

```text
datadog:
  (...)
  apmEnabled: true
  nonLocalTraffic: true

(...)

daemonset:
  (...)
  useHostPort: true
```

Mettez à jour la section `env` du manifeste de votre application avec le bloc suivant :

```yaml
env:
  - name: DD_AGENT_HOST
    valueFrom:
      fieldRef:
        fieldPath: status.hostIP
```

Ensuite, mettez à niveau votre chart Helm Datadog.

Enfin, indiquez aux traceurs d'application l'IP du host via la variable d'environnement `DD_AGENT_HOST`. Par exemple, en Python :

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_TRACE_AGENT_PORT'],
)
```

Consultez la [documentation sur l'APM propre à votre langage][9] pour obtenir davantage d'exemples.

### Activer la collecte de processus

Mettez à jour votre fichier [datadog-values.yaml][7] avec la configuration de collecte de processus suivante, puis mettez à niveau votre chart Helm Datadog :

```text
datadog:
  (...)
  processAgentEnabled: true
```

### Activer les intégrations avec Helm

Le [point d'entrée][10] Datadog copie les fichiers avec l'extension `.yaml` trouvés dans `/conf.d` et les fichiers avec l'extension `.py` dans `/check.d` vers `/etc/datadog-agent/conf.d` et `/etc/datadog-agent/checks.d`, respectivement. Les clés pour `datadog.confd` et `datadog.checksd` doivent correspondre au contenu trouvé dans leurs ConfigMaps respectives, c'est à dire :

```yaml
datadog:
  confd:
    redisdb.yaml: |-
      ad_identifiers:
        - redis
        - bitnami/redis
      init_config:
      instances:
        - host: "%%host%%"
          port: "%%port%%"
    jmx.yaml: |-
      ad_identifiers:
        - openjdk
      instance_config:
      instances:
        - host: "%%host%%"
          port: "%%port_0%%"
```

## Désinstaller le chart Helm Datadog

Pour désinstaller ou supprimer un déploiement appelé `<NOM_VERSION>` :

```bash
helm delete <NOM_VERSION>
```

Cette commande supprime tous les composants Kubernetes associés au chart et supprime la version.

[1]: https://docs.helm.sh/using_helm/#installing-the-helm-client
[2]: https://docs.helm.sh/using_helm/#installing-tiller
[3]: https://docs.helm.sh/using_helm/#role-based-access-control
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://github.com/helm/charts/tree/master/stable/kube-state-metrics
[6]: https://github.com/helm/charts/tree/master/stable/datadog#configuration
[7]: https://github.com/helm/charts/blob/master/stable/datadog/values.yaml
[8]: /fr/developers/metrics/dogstatsd_metrics_submission
[9]: /fr/tracing/setup
[10]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/entrypoint/89-copy-customfiles.sh