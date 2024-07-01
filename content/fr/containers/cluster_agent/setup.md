---
algolia:
  tags:
  - cluster agent
aliases:
- /fr/agent/cluster_agent/setup
- /fr/agent/cluster_agent/event_collection
- /fr/containers/cluster_agent/event_collection
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Présentation de l'Agent de cluster Datadog
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Mettre à l'échelle vos charges de travail Kubernetes en fonction d'une métrique
    Datadog
- link: /agent/cluster_agent/clusterchecks/
  tag: Documentation
  text: Exécuter des checks de cluster avec Autodiscovery
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentation
  text: Dépanner l'Agent de cluster Datadog
title: Configurer l'Agent de cluster Datadog
---

Si vous déployez l'Agent Datadog à l'aide du chart Helm v2.7.0+ ou de l'Operator Datadog v0.7.0+, l'Agent de cluster est désactivé par défaut.

{{< tabs >}}
{{% tab "Helm" %}}

Depuis la version 2.7.0 du chart Helm, l'Agent de cluster est activé par défaut.

Pour activer l'Agent de cluster si vous utilisez une version antérieure du chart ou un fichier [datadog-values.yaml][1] personnalisé remplaçant la clé `clusterAgent`, modifiez le fichier [datadog-values.yaml][1] en indiquant la configuration d'Agent de cluster suivante.

  ```yaml
  clusterAgent:
    # clusterAgent.enabled -- Définir sur false pour désactiver l'Agent de cluster Datadog
    enabled: true
  ```

Mettez ensuite à niveau votre chart Helm Datadog :

Cela modifie automatiquement les fichiers RBAC nécessaires pour l'Agent de cluster et l'Agent Datadog. Ces deux Agents utilisent la même clé d'API.

Un token aléatoire est également automatiquement généré dans un `Secret` commun à l'Agent de cluster et l'Agent Datadog. Il permet de sécuriser les communications. Vous pouvez définir manuellement ce token avec le paramètre `clusterAgent.token`. Il est également possible de faire référence au nom du `Secret` existant qui comporte une valeur `token` avec l'option `clusterAgent.tokenExistingSecret`.

Lorsque le token est défini manuellement, il doit être composé de 32 caractères alphanumériques.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Operator" %}}

Depuis la version 1.0.0 de l'Operator Datadog, l'Agent de cluster est activé par défaut. L'Operator crée les autorisations RBAC requises, déploie l'Agent de cluster et modifie la configuration du DaemonSet de l'Agent.

Un token aléatoire est également automatiquement généré dans un `Secret` commun à l'Agent de cluster et l'Agent Datadog. Il permet de sécuriser les communications. Vous pouvez définir manuellement ce token avec le champ `global.clusterAgentToken`. Il est également possible de faire référence au nom du `Secret` existant et à la clé de données contenant le token en question.

  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <CLÉ_API_DATADOG>
      clusterAgentTokenSecret:
        secretName: <NOM_SECRET>
        keyName: <NOM_CLÉ>
  ```

Lorsque le token est défini manuellement, il doit être composé de 32 caractères alphanumériques.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Configuration manuelle (DaemonSet)" %}}

Pour configurer l'Agent de cluster Datadog avec un DaemonSet, procédez comme suit :
1. [Configurez les autorisations RBAC de l'Agent de cluster](#configurer-les-autorisations-rbac-de-l-agent-de-cluster).
2. [Sécurisez les communications entre l'Agent de cluster et l'Agent](#securiser-les-communications-entre-l-agent-de-cluster-et-l-agent).
3. [Créez l'Agent de cluster et son service](#creer-l-agent-de-cluster-et-son-service).
4. [Configurez l'Agent de nœud de façon à ce qu'il communique avec l'Agent de cluster](#configurer-les-communications-de-l-agent-datadog).

### Configurer les autorisations RBAC de l'Agent de cluster

L'Agent de cluster Datadog a besoin des autorisations RBAC adéquates pour fonctionner :

1. Examinez les manifestes dans le [dossier RBAC de l'Agent de cluster Datadog][1]. **Remarque** : lorsque vous utilisez l'Agent de cluster, vos Agents de nœud ne peuvent pas interagir avec le serveur d'API Kubernetes ; seul l'Agent de cluster peut y parvenir.

2. Pour configurer les autorisations RBAC de l'Agent de cluster, appliquez les manifestes suivants. Il se peut que vous ayez déjà effectué cette opération lors de la configuration du [daemonset de l'Agent de nœud][2].

  ```shell
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/rbac.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml"
  ```

  Cela permet de créer les objets `ServiceAccount`, `ClusterRole` et `ClusterRoleBinding` appropriés pour l'Agent de cluster, et de mettre à jour l'objet `ClusterRole` pour l'Agent de nœud.

Si vous utilisez Azure Kubernetes Service (AKS), vous aurez besoin de permissions supplémentaires. Consultez la FAQ dédiée pour les [RBAC sur AKS][3] pour le DCA.

### Sécuriser les communications entre l'Agent de cluster et l'Agent

L'Agent Datadog et l'Agent de cluster requièrent un token pour sécuriser leurs communications. Il est conseillé d'enregistrer ce token dans un `Secret` auquel l'Agent Datadog et l'Agent de cluster peuvent se référer par l'intermédiaire de la variable d'environnement `DD_CLUSTER_AGENT_AUTH_TOKEN`. Cette approche permet d'assurer une certaine cohérence et d'éviter que le token puisse être consulté dans le `PodSpec`.

Pour créer ce token, exécutez la commande suivante. Cela génère un `Secret` du nom de `datadog-cluster-agent` et définit un `token`. Remplacez le paramètre `<TOKEN>` par un token composé de 32 caractères alphanumériques.
  ```shell
  kubectl create secret generic datadog-cluster-agent --from-literal=token='<TOKEN>' --namespace="default"
  ```
**Remarque** : cette opération crée un `Secret` dans l'espace de nommage par défaut. SI vous utilisez un espace de nommage personnalisé, modifiez le paramètre namespace de la commande avant de l'exécuter.

Le fichier `cluster-agent-deployment.yaml` fourni par défaut pour l'Agent de cluster est configuré de sorte que ce `Secret` soit accessible avec la configuration de variable d'environnement suivante :
  ```yaml
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

Cette variable d'environnement doit être configurée (à l'aide des mêmes options) lors de la [configuration de l'Agent Datadog][4].

### Créer l'Agent de cluster et son service

1. Téléchargez les manifestes suivants :

    * [`agent-services.yaml` : le manifeste du service de l'Agent de cluster][5]
    * [`secret-api-key.yaml` : le secret contenant la clé d'API Datadog][6]
    * [`secret-application-key.yaml` : le secret contenant la clé d'application Datadog][7]
    * [`cluster-agent-deployment.yaml` : le manifeste de l'Agent de cluster][8]
    * [`install_info-configmap.yaml`: la configmap contenant des informations sur l'installation][9]

2. Dans le manifeste `secret-api-key.yaml`, remplacez `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` par [votre clé d'API Datadog][10] encodée en base64. Pour obtenir la version base64 de votre clé d'API, exécutez la commande suivante :

    ```shell
    echo -n '<Your API key>' | base64
    ```
3. Dans le manifeste `secrets-application-key.yaml`, remplacez `PUT_YOUR_BASE64_ENCODED_APP_KEY_HERE` par [votre clé d'application Datadog][11] encodée en base64.
4. Par défaut, le manifeste `cluster-agent-deployment.yaml` récupère le token créé précédemment dans le `Secret` `datadog-cluster-agent`. Si vous stockez ce token d'une autre façon, modifiez la configuration de la variable `DD_CLUSTER_AGENT_AUTH_TOKEN` en conséquence.
5. Déployez les ressources suivantes pour l'Agent de cluster :
    ```shell
    kubectl apply -f agent-services.yaml
    kubectl apply -f secret-api-key.yaml
    kubectl apply -f secret-application-key.yaml
    kubectl apply -f install_info-configmap.yaml
    ```
6. Enfin, déployez l'Agent de cluster Datadog :
    ```shell
    kubectl apply -f cluster-agent-deployment.yaml
    ```

**Remarque** : définissez dans l'Agent de cluster Datadog la variable d'environnement `DD_SITE` sur votre site Datadog : {{< region-param key="dd_site" code="true" >}}. Par défaut, cette valeur est définie sur le site `US`, à savoir `datadoghq.com`.

### Vérification

À ce stade, vous devriez voir ce qui suit :

```shell
kubectl get deploy

NAME                    DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
datadog-cluster-agent   1         1         1            1           1d

kubectl get secret

NAME                    TYPE                                  DATA      AGE
datadog-cluster-agent   Opaque                                1         1d

kubectl get pods -l app=datadog-cluster-agent

datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h

kubectl get service -l app=datadog-cluster-agent

NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)          AGE
datadog-cluster-agent   ClusterIP      10.100.202.234   none               5005/TCP         1d
```

**Remarque** : si l'Agent Datadog est déjà en cours d'exécution, vous devrez peut-être appliquer le [manifeste `rbac.yaml` de l'Agent][12] pour que l'Agent de cluster puisse s'exécuter.

## Configurer les communications de l'Agent Datadog

Modifiez la configuration de votre Agent Datadog de façon à ce qu'il communique avec l'Agent de cluster Datadog.

Dans votre [fichier de manifeste][2] Daemonset existant, définissez la variable d'environnement `DD_CLUSTER_AGENT_ENABLED` sur `true`. Définissez ensuite le token `DD_CLUSTER_AGENT_AUTH_TOKEN` à l'aide de la même syntaxe que celle de la rubrique [Sécuriser les communications entre l'Agent de cluster et l'Agent][13].

  ```yaml
  - name: DD_CLUSTER_AGENT_ENABLED
    value: "true"
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

Après avoir redéployé votre DaemonSet avec cette configuration, l'Agent Datadog peut communiquer avec l'Agent de cluster. Vous pouvez vous référer au [manifeste `daemonset.yaml`][14] d'Agent de cluster fourni pour consulter un exemple complet de configuration.

[1]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/manifests/cluster-agent
[2]: /fr/agent/kubernetes/?tab=daemonset
[3]: /fr/agent/faq/rbac-for-dca-running-on-aks-with-helm/
[4]: /fr/agent/cluster_agent/setup/?tab=daemonset#configure-the-datadog-agent
[5]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/agent-services.yaml
[6]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/secret-api-key.yaml
[7]: https://raw.githubusercontent.com/DataDog/datadog-agent/main/Dockerfiles/manifests/cluster-agent/secret-application-key.yaml
[8]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-deployment.yaml
[9]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/install_info-configmap.yaml
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/access/application-keys
[12]: /fr/agent/cluster_agent/setup/?tab=daemonset#configure-rbac-permissions
[13]: /fr/agent/cluster_agent/setup/?tab=daemonset#secure-cluster-agent-to-agent-communication
[14]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/daemonset.yaml
{{% /tab %}}
{{< /tabs >}}

### Vérification

Pour vérifier que les pods de l'Agent Datadog et de l'Agent de cluster sont en cours d'exécution, utilisez la commande suivante :

```shell
kubectl get pods | grep agent
```

Vous devriez voir ce qui suit :

```shell
datadog-agent-4k9cd                      1/1       Running   0          2h
datadog-agent-4v884                      1/1       Running   0          2h
datadog-agent-9d5bl                      1/1       Running   0          2h
datadog-agent-dtlkg                      1/1       Running   0          2h
datadog-agent-jllww                      1/1       Running   0          2h
datadog-agent-rdgwz                      1/1       Running   0          2h
datadog-agent-x5wk5                      1/1       Running   0          2h
[...]
datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h
```

Pour vérifier que l'Agent Datadog est bien connecté à l'Agent de cluster, consultez la [sortie de la commande status de l'Agent][1].

```shell
kubectl exec -it <NOM_POD_AGENT> agent status
[...]
=====================
Datadog Cluster Agent
=====================

  - Datadog Cluster Agent endpoint detected: https://10.104.246.194:5005
  Successfully connected to the Datadog Cluster Agent.
  - Running: 1.11.0+commit.4eadd95
```

La transmission des événements Kubernetes à votre compte Datadog commence alors. Les métriques pertinentes recueillies par vos Agents se voient assignées le tag correspondant dans les métadonnées de cluster.

## Conteneurs Windows

L'Agent de cluster Datadog ne peut être déployé que sur des nœuds Linux.

Pour surveiller les conteneurs Windows, utilisez deux installations du chart Helm dans un cluster mixte. Le premier chart Helm déploie l'Agent de cluster Datadog et le DaemonSet de l'Agent pour les nœuds Linux (avec `targetSystem: linux`). Le deuxième chart Helm (avec `targetSystem: windows`) déploie l'Agent uniquement sur les nœuds Windows et se connecte à l'Agent de cluster existant déployé au sein du premier chart Helm.

Utilisez le fichier `values.yaml` suivant pour configurer les communications entre les Agents déployés sur les nœuds Windows et l'Agent de cluster.

```yaml
targetSystem: windows
existingClusterAgent:
  join: true
  serviceName: "<NOM_SECRET_EXISTANT_AGENT_CLUSTER_DATADOG>" # provenant du premier chart Helm Datadog
  tokenSecretName: "<NOM_SERVICE_EXISTANT_AGENT_CLUSTER_DATADOG>" # provenant du premier chart Helm Datadog

# Désactiver le déploiement de datadogMetrics, car il est déjà réalisé par le premier chart
datadog-crds:
  crds:
    datadogMetrics: false
# Désactiver le déploiement de kube-state-metrics 
datadog:
  kubeStateMetricsEnabled: false
```

Pour en savoir plus, consultez la documentation relative au [dépannage des problèmes avec les conteneurs Windows][2].

## Surveillance des services AWS gérés

Pour surveiller un service AWS géré comme MSK, ElastiCache ou RDS, définissez `clusterChecksRunner` afin de créer un pod avec un rôle IAM attribué via l'annotation serviceAccountAnnotation dans le chart Helm. Définissez ensuite les configurations de l'intégration dans `clusterAgent.confd`.

{{< code-block lang="yaml" >}}
clusterChecksRunner:
  enabled: true
  rbac:
    # clusterChecksRunner.rbac.create -- Si true, créer et utiliser des ressources RBAC
    create: true
    dedicated: true
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: arn:aws:iam::***************:role/ROLE-NAME-WITH-MSK-READONLY-POLICY
clusterAgent:
  confd:
    amazon_msk.yaml: |-
      cluster_check: true
      instances:
        - cluster_arn: arn:aws:kafka:us-west-2:*************:cluster/gen-kafka/*******-8e12-4fde-a5ce-******-3
          region_name: us-west-2
{{< /code-block >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[2]: https://docs.datadoghq.com/fr/agent/troubleshooting/windows_containers/#mixed-clusters-linux--windows