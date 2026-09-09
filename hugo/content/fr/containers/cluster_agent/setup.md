---
algolia:
  tags:
  - cluster agent
aliases:
- /fr/agent/cluster_agent/setup
- /fr/agent/cluster_agent/event_collection
- /fr/containers/cluster_agent/event_collection
description: Installez et configurez le Datadog Cluster Agent pour la surveillance
  et la mise à l'échelle automatique de clusters Kubernetes
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Présentation de l'Agent de cluster Datadog
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Mettre à l'échelle vos charges de travail Kubernetes avec n'importe quelle
    métrique Datadog
- link: /agent/cluster_agent/clusterchecks/
  tag: Documentation
  text: Exécuter des checks de cluster avec Autodiscovery
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentation
  text: Dépannage de l'Agent de cluster Datadog
- link: https://www.datadoghq.com/architecture/kubernetes-workload-autoscaling-with-datadog/
  tag: Centre d'architecture
  text: Mise à l'échelle automatique des charges de travail Kubernetes avec Datadog
- link: https://www.datadoghq.com/architecture/efficient-kubernetes-monitoring-with-the-datadog-cluster-agent/
  tag: Centre d'architecture
  text: Surveillance efficace de Kubernetes avec le Datadog Cluster Agent
- link: https://www.datadoghq.com/architecture/real-world-applications-of-the-datadog-cluster-agent-part-one/
  tag: Centre d'architecture
  text: Applications concrètes du Datadog Cluster Agent (Partie 1)
title: Configurer l'Agent de cluster Datadog
---
Si vous déployez le Datadog Agent à l'aide du chart Helm v2.7.0+ ou de Datadog Operator v0.7.0+, l'Agent de cluster est désactivé par défaut.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Depuis la version 1.0.0 du Datadog Operator, l'Agent de cluster est activé par défaut. L'Operator crée les autorisations RBAC requises, déploie l'Agent de cluster et modifie la configuration du DaemonSet de l'Agent.

Cela génère également automatiquement un jeton aléatoire dans un `Secret` partagé par le Cluster Agent et le Datadog Agent pour sécuriser la communication. Vous pouvez spécifier manuellement ce jeton en définissant le champ `global.clusterAgentToken`. Vous pouvez également le définir en référençant le nom d'un `Secret` existant et la clé de données contenant ce jeton.

  ```yaml
  apiVersion: datadoghq.com/v2alpha1
  kind: DatadogAgent
  metadata:
    name: datadog
  spec:
    global:
      credentials:
        apiKey: <DATADOG_API_KEY>
      clusterAgentTokenSecret:
        secretName: <SECRET_NAME>
        keyName: <KEY_NAME>
  ```

Lorsqu'il est défini manuellement, ce jeton doit comporter 32 caractères alphanumériques.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

Depuis la version 2.7.0 du chart Helm, l'Agent de cluster est activé par défaut.

Pour l'activer sur des versions antérieures, ou si vous utilisez un fichier [datadog-values.yaml][1] personnalisé qui remplace la clé `clusterAgent`, mettez à jour votre fichier [datadog-values.yaml][1] avec la configuration suivante du Cluster Agent :

  ```yaml
  clusterAgent:
    # clusterAgent.enabled -- Set this to false to disable Datadog Cluster Agent
    enabled: true
  ```

Mettez ensuite à niveau votre chart Helm Datadog :

Cela met automatiquement à jour les fichiers RBAC nécessaires pour le Cluster Agent et le Datadog Agent. Les deux agents utilisent la même clé d'API.

Cela génère également automatiquement un jeton aléatoire dans un `Secret` partagé par le Cluster Agent et le Datadog Agent pour sécuriser la communication. Vous pouvez spécifier manuellement ce jeton en utilisant la configuration `clusterAgent.token`. Vous pouvez également le définir en référençant le nom d'un `Secret` existant contenant une valeur `token` via la configuration `clusterAgent.tokenExistingSecret`.

Lorsqu'il est défini manuellement, ce jeton doit comporter 32 caractères alphanumériques.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Manuel (DaemonSet)" %}}

Pour configurer l'Agent de cluster Datadog avec un DaemonSet, procédez comme suit :
1. [Configurez les autorisations RBAC du Cluster Agent](#configure-cluster-agent-rbac-permissions).
2. [Sécurisez la communication entre le Cluster Agent et l'Agent](#secure-cluster-agent-to-agent-communication).
3. [Créez le Cluster Agent et son service](#create-the-cluster-agent-and-its-service).
4. [Configurez l'Agent de nœud pour communiquer avec le Cluster Agent](#configure-datadog-agent-communication).

### Configurez les autorisations RBAC du Cluster Agent {#configure-cluster-agent-rbac-permissions}

L'Agent de cluster Datadog a besoin d'une autorisation RBAC adéquate pour être opérationnel :

1. Examinez les manifestes dans le [dossier RBAC de l'Agent de cluster Datadog][1]. **Remarque** : Lorsque vous utilisez le Cluster Agent, vos node Agents ne peuvent pas interagir avec le serveur d'API Kubernetes — seul le Cluster Agent peut le faire.

2. Pour configurer les autorisations RBAC du Cluster Agent, appliquez les manifestes suivants. (Vous l'avez peut-être déjà fait lors de la configuration du [node Agent daemonset][2].)

  ```shell
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/rbac.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml"
  ```

  Ceci crée les `ServiceAccount`, `ClusterRole` et `ClusterRoleBinding` appropriés pour le Cluster Agent et met à jour le `ClusterRole` pour le node Agent.

Si vous utilisez Azure Kubernetes Service (AKS), vous pourriez avoir besoin d'autorisations supplémentaires. Consultez la FAQ [RBAC pour DCA sur AKS][3].

### Sécurisez la communication entre le Cluster Agent et le Datadog Agent{#secure-cluster-agent-to-agent-communication}

Le Datadog Agent et le Cluster Agent nécessitent un jeton pour sécuriser leur communication. Il est recommandé d'enregistrer ce jeton dans un `Secret` auquel le Datadog Agent et le Cluster Agent peuvent faire référence dans la variable d'environnement `DD_CLUSTER_AGENT_AUTH_TOKEN`. Cela permet de maintenir la cohérence et d'éviter que le jeton ne soit lisible dans le `PodSpec`.

Pour créer ce jeton, exécutez cette commande d'une ligne afin de générer un `Secret` nommé `datadog-cluster-agent` avec une `token` définie. Remplacez le `<TOKEN>` par 32 caractères alphanumériques.
  ```shell
  kubectl create secret generic datadog-cluster-agent --from-literal=token='<TOKEN>' --namespace="default"
  ```
**Remarque :** Ceci crée un `Secret` dans l'espace de nom par défaut. Si vous utilisez un espace de nom personnalisé, mettez à jour le paramètre d'espace de nom de la commande avant de l'exécuter.

Le `cluster-agent-deployment.yaml` par défaut fourni pour le Cluster Agent est déjà configuré pour voir ce `Secret` avec la configuration de variable d'environnement :
  ```yaml
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

Cette variable d'environnement doit être configurée (à l'aide des mêmes options) lors de la [configuration du Datadog Agent][4].

### Créez le Cluster Agent et son service {#create-the-cluster-agent-and-its-service}

1. Téléchargez les manifestes suivants :

    * [`agent-services.yaml` : Le manifeste du Cluster Agent Service][5]
    * [`secret-api-key.yaml` : Le secret contenant la clé d'API Datadog][6]
    * [`secret-application-key.yaml` : Le secret contenant la clé d'application Datadog][7]
    * [`cluster-agent-deployment.yaml` : Manifeste du Cluster Agent][8]
    * [`install_info-configmap.yaml` : Configmap des informations d'installation][9]

2. Dans le manifeste `secret-api-key.yaml`, remplacez `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` par [votre clé d'API Datadog][10] encodée en base64. Pour obtenir la version base64 de votre clé d'API, vous pouvez exécuter :

    ```shell
    echo -n '<Your API key>' | base64
    ```
3. Dans le manifeste `secrets-application-key.yaml`, remplacez `PUT_YOUR_BASE64_ENCODED_APP_KEY_HERE` par [votre clé d'application Datadog][11] encodée en base64.
4. Par défaut, le manifeste `cluster-agent-deployment.yaml` fait référence au jeton créé précédemment dans le `Secret` `datadog-cluster-agent`. Si vous stockez ce jeton d'une autre manière, configurez votre variable d'environnement `DD_CLUSTER_AGENT_AUTH_TOKEN` en conséquence.
5. Déployez ces ressources pour que le déploiement du Cluster Agent puisse les utiliser :
    ```shell
    kubectl apply -f agent-services.yaml
    kubectl apply -f secret-api-key.yaml
    kubectl apply -f secret-application-key.yaml
    kubectl apply -f install_info-configmap.yaml
    ```
6. Enfin, déployez le Datadog Cluster Agent :
    ```shell
    kubectl apply -f cluster-agent-deployment.yaml
    ```

**Remarque** : Dans votre Datadog Cluster Agent, définissez la variable d'environnement `DD_SITE` sur votre site Datadog : {{< region-param key="dd_site" code="true" >}}. La valeur par défaut est le site `US` `datadoghq.com`

### Vérification {#verification}

À ce stade, vous devez voir ce qui suit :

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

**Remarque** : Si vous exécutez déjà le Datadog Agent, vous devrez peut-être appliquer le [manifeste `rbac.yaml` de l'Agent][12] avant que le Cluster Agent puisse démarrer.

## Configurer la communication du Datadog Agent {#configure-datadog-agent-communication}

Modifiez la configuration de votre Datadog Agent de façon à ce qu'il communique avec l'Agent de cluster Datadog.

Dans votre fichier [manifeste][2] DaemonSet existant, définissez la variable d'environnement `DD_CLUSTER_AGENT_ENABLED` sur `true`. Ensuite, définissez `DD_CLUSTER_AGENT_AUTH_TOKEN` en utilisant la même syntaxe que celle utilisée dans [Sécuriser la communication entre le Cluster Agent et l'Agent][13].

  ```yaml
  - name: DD_CLUSTER_AGENT_ENABLED
    value: "true"
  - name: DD_CLUSTER_AGENT_AUTH_TOKEN
    valueFrom:
      secretKeyRef:
        name: datadog-cluster-agent
        key: token
  ```

Après avoir redéployé votre DaemonSet avec ces configurations en place, le Datadog Agent est en mesure de communiquer avec le Cluster Agent. Vous pouvez consulter le [`daemonset.yaml` manifeste][14] du Cluster Agent fourni pour un exemple complet.

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

### Vérification {#verification-1}

Pour vérifier que les pods du Datadog Agent et de l'Agent de cluster sont en cours d'exécution, utilisez la commande suivante :

```shell
kubectl get pods | grep agent
```

Vous devez voir ce qui suit :

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

Pour vérifier que le Datadog Agent est bien connecté à l'Agent de cluster, consultez la [sortie de la commande status de l'Agent][1].

```shell
kubectl exec -it <AGENT_POD_NAME> agent status
[...]
=====================
Datadog Cluster Agent
=====================

  - Datadog Cluster Agent endpoint detected: https://10.104.246.194:5005
  Successfully connected to the Datadog Cluster Agent.
  - Running: 1.11.0+commit.4eadd95
```

La transmission des événements Kubernetes à votre compte Datadog commence alors. Les métriques pertinentes recueillies par vos Agents se voient assigner le tag correspondant dans les métadonnées de cluster.

## Conteneurs Windows {#windows-containers}

L'Agent de cluster Datadog ne peut être déployé que sur des nœuds Linux.

Pour surveiller les conteneurs Windows, utilisez deux installations du Helm chart dans un cluster mixte. Le premier Helm chart déploie le Datadog Cluster Agent et l'Agent DaemonSet pour les nœuds Linux (avec `targetSystem: linux`). Le second Helm chart (avec `targetSystem: windows`) déploie l'Agent uniquement sur les nœuds Windows et se connecte au Cluster Agent existant déployé dans le cadre du premier Helm chart.

Utilisez le fichier `datadog-values.yaml` suivant pour configurer la communication entre les Agents déployés sur les nœuds Windows et le Cluster Agent.

```yaml
targetSystem: windows
existingClusterAgent:
  join: true
  serviceName: "<EXISTING_DCA_SECRET_NAME>" # from the first Datadog Helm chart
  tokenSecretName: "<EXISTING_DCA_SERVICE_NAME>" # from the first Datadog Helm chart

# Disable datadogMetrics deployment since it should have been already deployed with the first chart.
datadog-crds:
  crds:
    datadogMetrics: false
# Disable kube-state-metrics deployment
datadog:
  kubeStateMetricsEnabled: false
```

Pour en savoir plus, consultez la documentation relative au [dépannage des problèmes avec les conteneurs Windows][2].

## Surveillance des services gérés AWS {#monitoring-aws-managed-services}

Pour surveiller un service géré AWS comme Amazon Managed Streaming for Apache Kafka (MSK), ElastiCache ou Relational Database Service (RDS), définissez `clusterChecksRunner` dans votre Helm chart pour créer un Pod avec un rôle IAM attribué via `serviceAccountAnnotation`. Ensuite, définissez les configurations d'intégration sous `clusterAgent.confd`.

{{< code-block lang="yaml" filename="datadog-values.yaml">}}
clusterChecksRunner:
  enabled: true
  rbac:
    # clusterChecksRunner.rbac.create -- If true, create & use RBAC resources
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

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/agent/configuration/agent-commands/?tab=agentv6v7#agent-information
[2]: https://docs.datadoghq.com/fr/agent/troubleshooting/windows_containers/#mixed-clusters-linux--windows