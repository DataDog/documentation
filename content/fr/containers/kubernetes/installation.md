---
aliases:
- /fr/agent/kubernetes/daemonset_setup
- /fr/agent/kubernetes/helm
- /fr/agent/kubernetes/installation
further_reading:
- link: infrastructure/livecontainers/
  tag: Documentation
  text: Live containers
- link: /agent/kubernetes/configuration
  tag: Documentation
  text: Configurer l'Agent Datadog sur Kubernetes
- link: /agent/kubernetes/integrations
  tag: Documentation
  text: Configurer des intégrations
- link: /agent/kubernetes/apm
  tag: Documentation
  text: Recueillir les traces de vos applications
- link: agent/kubernetes/log
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/kubernetes/tag
  tag: Documentation
  text: Assigner des tags à toutes les données émises par un conteneur, un pod ou
    un nœud
title: Installer l'Agent Datadog sur Kubernetes
---

## Installation

Cette page décrit la marche à suivre pour installer l'Agent Datadog dans un environnement Kubernetes. Vous pouvez choisir l'une des trois ressources suivantes :

- Operator Datadog
- Chart Helm
- DaemonSet

Pour parcourir la documentation dédiée aux principales distributions Kubernetes, y compris AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher et Oracle Container Engine pour Kubernetes (OKE) et découvrir des exemples, référez-vous à la section [Distributions Kubernetes][1].

Pour parcourir la documentation dédiée à la surveillance du plan de contrôle Kubernetes ainsi que des exemples, consultez la section [Surveillance du plan de contrôle Kubernetes][2].

### Versions minimales de l'Agent et de l'Agent de cluster

Pour utiliser certaines fonctionnalités des versions récentes de Kubernetes, vous devez exécuter des versions minimales de l'Agent Datadog et de l'Agent de cluster.

| Version de Kubernetes | Version de l'Agent  | Version de l'Agent de cluster | Raison                              |
|--------------------|----------------|-----------------------|---------------------------------------|
| 1.16.0+            | 7.19.0+        | 1.9.0+                | Obsolescence des métriques Kubelet       |
| 1.21.0+            | 7.36.0+        | 1.20.0+               | Obsolescence des ressources Kubernetes    |

{{< tabs >}}
{{% tab "Operator" %}}

<div class="alert alert-warning">L'Operator Datadog est disponible pour le grand public depuis la version `1.0.0`, il prend en charge la version `v2alpha1` du `DatadogAgent` .</div>

[L'Operator Datadog][1] est une fonctionnalité permettant de déployer l'Agent Datadog sur Kubernetes et OpenShift. L'Operator transmet des données sur le statut, la santé et les erreurs du déploiement dans le statut de sa ressource personnalisée. Ses paramètres de niveau supérieur permettent également de réduire les erreurs de configuration.

## Prérequis

L'utilisation de l'Operator Datadog nécessite les prérequis suivants :

- **Cluster Kubernetes version >= v1.20.X** : les tests ont été réalisés sur les versions >= `1.20.0`. Néanmoins, les versions `>= v1.11.0` devraient également fonctionner. Pour les versions plus anciennes, en raison de la prise en charge limitée de la CRD, il se peut que l'Operator ne fonctionne pas comme prévu.
- [`Helm`][2] pour le déploiement de `datadog-operator`.
- [Interface de ligne de commande `Kubectl`][3] pour l'installation de `datadog-agent`.

## Déployer un Agent avec l'Operator

Pour déployer l'Agent Datadog avec l'Operator le plus rapidement possible, consultez le chart Helm [`datadog-operator`][4]. Voici la marche à suivre :

1. Installez l'[Operator Datadog][5] :

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```

2. Créez un secret Kubernetes avec vos clés d'API et d'application.

   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   Remplacez `<DATADOG_API_KEY>` et `<DATADOG_APP_KEY>` par vos [clés d'API et d'application Datadog][6].

2. Créez un fichier avec les spécifications de la configuration de déploiement de votre Agent Datadog. Voici la configuration la plus simple :

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:latest
```

3. Déployez l'Agent Datadog avec le fichier de configuration ci-dessus :
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```

## Nettoyage

La commande suivante permet de supprimer toutes les ressources Kubernetes créées par les instructions ci-dessus :

```shell
kubectl delete datadogagent datadog
helm delete my-datadog-operator
```

Pour en savoir plus sur la configuration de l'Operator, notamment sur l'utilisation de tolérances, consultez le [guide de configuration avancée de l'Operator Datadog][7].

## Sans privilèges

(Facultatif) Pour exécuter une installation sans privilèges, ajoutez le bloc suivant à la [ressource personnalisée Datadog][8] :

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: placeholder
  namespace: placeholder
spec:
  override:
    nodeAgent:
      securityContext:
        runAsUser: 1 # <ID_UTILISATEUR>
        supplementalGroups:
          - 123 # <ID_GROUPE_DOCKER>
```

`<ID_UTILISATEUR>` correspond à l'UID utilisé pour exécuter l'agent et `<ID_GROUPE_DOCKER>` à l'ID du groupe auquel appartient le socket containerd ou Docker.

## Registres de conteneurs

Pour modifier le registre d'image de conteneur, consultez le guide [Modifier votre registre de conteneurs][9].

[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[5]: https://artifacthub.io/packages/helm/datadog/datadog-operator
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /fr/agent/guide/operator-advanced
[8]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.md
[9]: /fr/agent/guide/changing_container_registry/#kubernetes-with-the-datadog-operator
{{% /tab %}}
{{% tab "Helm" %}}

Pour installer le chart avec un nom de version `<RELEASE_NAME>` personnalisé (par exemple, `datadog-agent`) :

1. [Installez Helm][1].
2.  Créez votre fichier `values.yaml` en vous référant au [fichier de configuration `values.yaml` Datadog][2]. Datadog vous conseille d'utiliser uniquement des valeurs qui doivent être remplacées, afin de faciliter la mise à niveau du chart.
3. S'il s'agit d'une nouvelle installation, ajoutez le référentiel Helm Datadog :
    ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
4. Récupérez votre clé d'API Datadog à partir des [instructions d'installation de l'Agent][3] et exécutez ce qui suit :

- **Helm v3 et ultérieur**

    ```bash
    helm install <RELEASE_NAME> -f values.yaml  --set datadog.apiKey=<DATADOG_API_KEY> datadog/datadog --set targetSystem=<TARGET_SYSTEM>
    ```

    Remplacez `<TARGET_SYSTEM>` par le nom de votre système d'exploitation : `linux` ou `windows`.

- **Helm v1 ou v2**

    ```bash
    helm install -f values.yaml --name <RELEASE_NAME> --set datadog.apiKey=<DATADOG_API_KEY> datadog/datadog
    ```

Ce chart ajoute l'Agent Datadog à l'ensemble des nœuds dans votre cluster avec un DaemonSet. Il peut également déployer le [chart kube-state-metrics][4] et l'utiliser comme source supplémentaire de métriques concernant le cluster. Quelques minutes après l'installation, Datadog commence à transmettre les hosts et les métriques.

Activez ensuite les fonctionnalités Datadog que vous souhaitez utiliser, comme l'[APM][5] ou les [logs][6].

**Remarques** :

- Pour obtenir la liste complète des paramètres configurables pour le chart Datadog et leurs valeurs par défaut, consultez le [README du référentiel Helm Datadog][7].

### Registres de conteneurs

Si Google Container Registry ([gcr.io/datadoghq][8]) n'est pas accessible dans votre région de déploiement, utilisez un autre registre avec la configuration suivante dans le fichier `values.yaml` :

- Pour le registre AWS ECR public ([public.ecr.aws/datadog][9]), utilisez la commande suivante :

  ```yaml
  registry: public.ecr.aws/datadog
  ```

- Pour le registre Docker Hub ([docker.io/datadog][10]), utilisez la commande suivante :

  ```yaml
  registry: docker.io/datadog
  ```

**Remarques** :

- Si vous déployez le chart Datadog dans un environnement AWS, il est conseillé d'utiliser le registre AWS ECR public ([public.ecr.aws/datadog][9]).

### Mise à niveau depuis le chart v1.x

Le chart Datadog a été réusiné dans la v2.0 afin de regrouper plus logiquement les paramètres du fichier `values.yaml`.

Si vous déployez actuellement un chart antérieur à `v2.0.0`, suivez le [guide de migration][11] (en anglais) afin de mapper vos anciens paramètres avec les nouveaux champs.

### Core kube-state-metrics dans les charts v2.x

Dans les nouveaux déploiements, Datadog recommande d'utiliser le nouveau core `kube-state-metrics` avec les valeurs suivantes :

```yaml
...
datadog:
...
  kubeStateMetricsCore:
    enabled: true
...
```

Pour en savoir plus sur le core `kube-state-metrics`, consultez la [documentation dédiée][12].

### Sans privilèges

(Facultatif) Pour exécuter une installation sans privilèges, ajoutez le bloc suivant au fichier `values.yaml` :

```yaml
datadog:
  securityContext:
      runAsUser: <ID_UTILISATEUR>
      supplementalGroups:
        - <ID_GROUPE_DOCKER>
```

`<ID_UTILISATEUR>` correspond à l'UID utilisé pour exécuter l'agent et `<ID_GROUPE_DOCKER>` à l'ID du groupe auquel appartient le socket containerd ou docker.

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-state-metrics
[5]: /fr/agent/kubernetes/apm?tab=helm
[6]: /fr/agent/kubernetes/log?tab=helm
[7]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog
[8]: https://gcr.io/datadoghq
[9]: https://gallery.ecr.aws/datadog/
[10]: https://hub.docker.com/u/datadog/
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/docs/Migration_1.x_to_2.x.md
[12]: /fr/integrations/kubernetes_state_core
{{% /tab %}}
{{% tab "DaemonSet" %}}

Tirez profit des DaemonSets pour déployer l'Agent Datadog sur l'ensemble de vos nœuds (ou sur un nœud donné grâce [aux nodeSelectors][1]).

Pour installer l'Agent Datadog sur votre cluster Kubernetes :

1. **Configurez les autorisations de l'Agent** : si le contrôle d'accès basé sur des rôles (RBAC) est activé pour votre déploiement Kubernetes, configurez les autorisations RBAC pour le compte de service de votre Agent Datadog. Depuis la version 1.6 de Kubernetes, le RBAC est activé par défaut. Créez les ClusterRole, ServiceAccount et ClusterRoleBinding appropriés à l'aide de la commande suivante :

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
    ```

    **Remarque** : ces configurations RBAC sont définies pour l'espace de nommage `default`. Si vous utilisez un espace de nommage personnalisé, modifiez le paramètre `namespace` avant d'appliquer les configurations.


2. **Créez le manifeste de l'Agent Datadog**. Créez le manifeste `datadog-agent.yaml` à partir de l'un des modèles suivants :

    | Métriques                   | Logs                      | APM                       | Processus                   | NPM                       | Sécurité                       | Linux                   | Windows                 |
    |---------------------------|---------------------------|---------------------------|---------------------------|---------------------------|-------------------------|-------------------------|-------------------------|
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |  <i class="icon-check-bold"></i>                         | <i class="icon-check-bold"></i> | [Modèle de manifeste][2]  | [Modèle de manifeste][3] (sans sécurité)  |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                           |                           |                           | [Modèle de manifeste][4]  | [Modèle de manifeste][5]  |
    | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |                           |                           |                           |                           | [Modèle de manifeste][6]  | [Modèle de manifeste][7]  |
    | <i class="icon-check-bold"></i> |                           | <i class="icon-check-bold"></i> |                           |                           |                           | [Modèle de manifeste][8]  | [Modèle de manifeste][9] |
    |                           |                           |                           |                           | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> | [Modèle de manifeste][10] | Aucun modèle             |
    | <i class="icon-check-bold"></i> |                           |                           |                           |                           |                           | [Modèle de manifeste][11] | [Modèle de manifeste][12] |

     Pour activer toutes les fonctionnalités de collecte de traces, vous devez suivre [plusieurs étapes supplémentaires lors de la configuration des pods de votre application][13]. Consultez également les sections relatives aux [logs][14], à [APM][15], aux [processus][16], à [Network Performance Monitoring][17] et à la [sécurité][18] pour découvrir comment activer chacune de ces fonctionnalités.

     **Remarque** : ces manifestes sont définis pour l'espace de nommage `default`. Si vous utilisez un espace de nommage personnalisé, modifiez le paramètre `metadata.namespace` avant d'appliquer les manifestes.

3. Dans le manifeste `secret-api-key.yaml`, remplacez `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` par [votre clé d'API Datadog][19] encodée en base64. Pour obtenir la version base64 de votre clé d'API, exécutez la commande suivante :

    ```shell
    echo -n '<Your API key>' | base64
    ```
4. Dans le manifeste `secret-cluster-agent-token.yaml`, remplacez `PUT_A_BASE64_ENCODED_RANDOM_STRING_HERE` par une chaîne aléatoire encodée en base64. Pour obtenir la version base64 de cette chaîne, exécutez la commande suivante :

    ```shell
    echo -n 'Random string' | base64
    ```

    **Remarque** : la chaîne aléatoire doit inclure au moins 32 caractères alphanumériques, afin de sécuriser les communications entre l'Agent de cluster et l'Agent.

5. **Définissez votre site Datadog** sur {{< region-param key="dd_site" code="true" >}} en utilisant la variable d'environnement `DD_SITE` dans le manifeste `datadog-agent.yaml`.

    **Remarque** : si la variable d'environnement `DD_SITE` n'est pas explicitement définie, sa valeur par défaut correspond au site `US`, à savoir `datadoghq.com`. Si vous utilisez l'un des autres sites (`EU`, `US3` ou `US1-FED`), un message de clé d'API non valide s'affiche. Utilisez le [menu de sélection de site de la documentation][20] pour accéder à la documentation spécifique à votre site.

6. **Déployez le DaemonSet** avec cette commande :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

7. **Vérification** : pour vérifier que l'Agent Datadog s'exécute dans votre environnement en tant que DaemonSet, exécutez ce qui suit :

    ```shell
    kubectl get daemonset
    ```

     Si l'Agent est déployé, une sortie similaire au texte ci-dessous s'affiche. Les valeurs `DESIRED` et `CURRENT` correspondent au nombre de nœuds exécutés dans votre cluster.

    ```shell
    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          10s
    ```

8. **Configurez des métriques Kubernetes State** (facultatif) : téléchargez le [dossier de manifestes Kube-State][21], puis appliquez les manifestes à votre cluster Kubernetes pour recueillir automatiquement des [métriques kube-state][22] :

    ```shell
    kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
    ```

### Sans privilèges

(Facultatif) Pour exécuter une installation sans privilèges, ajoutez le bloc suivant à votre [modèle de pod][19] :

```yaml
  spec:
    securityContext:
      runAsUser: <ID_UTILISATEUR>
      supplementalGroups:
        - <ID_GROUPE_DOCKER>
```

`<ID_UTILISATEUR>` correspond à l'UID utilisé pour exécuter l'agent et `<ID_GROUPE_DOCKER>` à l'ID du groupe auquel appartient le socket containerd ou docker.

[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: /resources/yaml/datadog-agent-all-features.yaml
[3]: /resources/yaml/datadog-agent-windows-all-features.yaml
[4]: /resources/yaml/datadog-agent-logs-apm.yaml
[5]: /resources/yaml/datadog-agent-windows-logs-apm.yaml
[6]: /resources/yaml/datadog-agent-logs.yaml
[7]: /resources/yaml/datadog-agent-windows-logs.yaml
[8]: /resources/yaml/datadog-agent-apm.yaml
[9]: /resources/yaml/datadog-agent-windows-apm.yaml
[10]: /resources/yaml/datadog-agent-npm.yaml
[11]: /resources/yaml/datadog-agent-vanilla.yaml
[12]: /resources/yaml/datadog-agent-windows-vanilla.yaml
[13]: /fr/agent/kubernetes/apm/#setup
[14]: /fr/agent/kubernetes/log/
[15]: /fr/agent/kubernetes/apm/
[16]: /fr/infrastructure/process/?tab=kubernetes#installation
[17]: /fr/network_monitoring/performance/setup/
[18]: /fr/data_security/agent/
[19]: https://app.datadoghq.com/organization-settings/api-keys
[20]: /fr/getting_started/site/
[21]: https://github.com/kubernetes/kube-state-metrics/tree/master/examples/standard
[22]: /fr/agent/kubernetes/data_collected/#kube-state-metrics
{{% /tab %}}
{{< /tabs >}}

## Étapes suivantes

Pour configurer des live containers, consultez la section [Configuration des live containers][3].

Pour recueillir des événements, remplacer les paramètres de proxy, envoyer des métriques custom avec DogStatsD, configurer des listes d'inclusion et d'exclusion de conteneurs ou consulter la liste complète des variables d'environnement disponibles, consultez la section [Configurer l'Agent Datadog sur Kubernetes][4].

Pour configurer des intégrations, consultez la section [Intégrations Autodiscovery avec Kubernetes][5].

Pour configurer la solution APM, consultez la section [Collecte de traces Kubernetes][6].

Pour configurer la collecte de logs, consultez la section [Collecte de logs Kubernetes][7].

[1]: /fr/agent/kubernetes/distributions
[2]: /fr/agent/kubernetes/control_plane
[3]: /fr/infrastructure/livecontainers/configuration/
[4]: /fr/agent/kubernetes/configuration/
[5]: /fr/agent/kubernetes/integrations/
[6]: /fr/agent/kubernetes/apm/
[7]: /fr/agent/kubernetes/log/