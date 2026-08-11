---
aliases:
- /fr/agent/cluster_agent/admission_controller
description: Injectez automatiquement les variables d'environnement et les balises
  standard dans les pods Kubernetes à l'aide du contrôleur d'admission Datadog
further_reading:
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentation
  text: Dépannage de l'Agent de cluster Datadog
- link: /containers/troubleshooting/admission-controller
  tag: Documentation
  text: Dépannage du contrôleur d'admission
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: Blog
  text: Utilisez l'injection de bibliothèque pour auto-instrumenter le traçage des
    applications Kubernetes avec Datadog APM
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: Blog
  text: Apportez une observabilité haute performance aux environnements Kubernetes
    sécurisés avec le pilote CSI de Datadog
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Centre d'architecture
  text: Instrumentez votre application à l'aide de l'opérateur Datadog et du contrôleur
    d'admission
- link: /containers/guide/cluster_agent_disable_admission_controller
  tag: Documentation
  text: Désactivez le contrôleur d'admission Datadog avec l'Agent de cluster.
title: Contrôleur d'admission Datadog
---
## Aperçu {#overview}
Le contrôleur d'admission Datadog est un composant de l'Agent de cluster Datadog. Le principal avantage du contrôleur d'admission est de simplifier la configuration de vos pods d'application. Pour cela, il dispose de deux fonctionnalités principales :

- Injectez des variables d'environnement (`DD_AGENT_HOST`, `DD_TRACE_AGENT_URL`, `DD_ENTITY_ID` et `DD_EXTERNAL_ENV`) pour configurer DogStatsD et les SDK Datadog dans les conteneurs d'application de l'utilisateur.
- Injectez les balises standard Datadog (`env`, `service`, `version`) à partir des étiquettes d'application dans les variables d'environnement du conteneur.

Le contrôleur d'admission de Datadog est de type `MutatingAdmissionWebhook`. Pour plus de détails sur les contrôleurs d'admission, consultez le [guide Kubernetes sur les contrôleurs d'admission][1].

## Exigences {#requirements}

- Agent de cluster Datadog v7.40+

## Configuration {#configuration}
{{< tabs >}}
{{% tab "Operator Datadog" %}}

L'opérateur Datadog active le contrôleur d'admission Datadog par défaut. Aucune configuration supplémentaire n'est nécessaire pour activer le contrôleur d'admission.


Si vous avez désactivé le contrôleur d'admission, vous pouvez le réactiver en définissant le paramètre `features.admissionController.enabled` sur `true` dans votre configuration `DatadogAgent` :

{{< code-block lang="yaml" filename="datadog-agent.yaml" disable_copy="false" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    admissionController:
      enabled: true
      mutateUnlabelled: false
{{< /code-block >}}
{{% /tab %}}
{{% tab "Helm" %}}
À partir de la version 2.35.0 du chart Helm, le contrôleur d'admission Datadog est activé par défaut. Aucune configuration supplémentaire n'est nécessaire pour activer le contrôleur d'admission.

Pour activer le contrôleur d'admission pour le chart Helm v2.34.6 et les versions antérieures, définissez le paramètre `clusterAgent.admissionController.enabled` sur `true` :

{{< code-block lang="yaml" filename="datadog-values.yaml" disable_copy="false" >}}
#(...)
clusterAgent:
  #(...)
  ## @param admissionController - object - required
  ## Enable the admissionController to automatically inject APM and
  ## DogStatsD config and standard tags (env, service, version) into
  ## your pods
  #
  admissionController:
    enabled: true

    ## @param mutateUnlabelled - boolean - optional
    ## Enable injecting config without having the pod label:
    ## admission.datadoghq.com/enabled="true"
    #
    mutateUnlabelled: false
{{< /code-block >}}
{{% /tab %}}
{{% tab "DaemonSet" %}}

Pour activer le contrôleur d'admission sans utiliser Helm ou l'Operator Datadog, ajoutez ce qui suit à votre configuration :

Tout d'abord, téléchargez le manifeste des [permissions RBAC de l'Agent de Cluster][1], et ajoutez ce qui suit sous `rules` :

{{< code-block lang="yaml" filename="cluster-agent-rbac.yaml" disable_copy="true" >}}
- apiGroups:
  - admissionregistration.k8s.io
  resources:
  - mutatingwebhookconfigurations
  verbs: ["get", "list", "watch", "update", "create"]
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "list", "watch", "update", "create"]
- apiGroups: ["batch"]
  resources: ["jobs", "cronjobs"]
  verbs: ["get"]
- apiGroups: ["apps"]
  resources: ["statefulsets", "replicasets", "deployments"]
  verbs: ["get"]
{{< /code-block >}}

Ajoutez ce qui suit en bas de `agent-services.yaml` :

{{< code-block lang="yaml" filename="agent-services.yaml" disable_copy="true" >}}

apiVersion: v1
kind: Service
metadata:
  name: datadog-cluster-agent-admission-controller
  labels:
    app: "datadog"
    app.kubernetes.io/name: "datadog"
spec:
  selector:
    app: datadog-cluster-agent
  ports:
  - port: 443
    targetPort: 8000

{{< /code-block >}}

Ajoutez les variables d'environnement qui activent le contrôleur d'admission au fichier de déploiement de l'Agent de cluster :

{{< code-block lang="yaml" filename="cluster-agent-deployment.yaml" disable_copy="true" >}}
- name: DD_ADMISSION_CONTROLLER_ENABLED
  value: "true"
- name: DD_ADMISSION_CONTROLLER_SERVICE_NAME
  value: "datadog-cluster-agent-admission-controller"

# Uncomment this to configure Datadog SDKs automatically (see below)
# - name: DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED
#   value: "true"
{{< /code-block >}}

Enfin, exécutez les commandes suivantes :

- `kubectl apply -f cluster-agent-rbac.yaml`
- `kubectl apply -f agent-services.yaml`
- `kubectl apply -f cluster-agent-deployment.yaml`

[1]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml
{{% /tab %}}
{{< /tabs >}}

### Injection de bibliothèque d'instrumentation APM {#apm-instrumentation-library-injection}
Vous pouvez configurer l'Agent de Cluster (version 7.39 et supérieure) pour injecter des bibliothèques d'instrumentation en utilisant l'instrumentation par étape unique. Consultez [l'instrumentation APM par étape unique][2] pour plus d'informations.

Si vous ne souhaitez pas utiliser l'instrumentation par étape unique, le contrôleur d'admission Datadog peut être utilisé pour injecter directement les SDK Datadog comme alternative manuelle au niveau des pods. Consultez [l'injection de SDK local][7] pour plus d'informations.

### Injection de variables d'environnement APM et DogStatsD {#apm-and-dogstatsd-environment-variable-injection}

Pour configurer les clients DogStatsD ou d'autres bibliothèques APM qui ne prennent pas en charge l'injection de bibliothèque, injectez les variables d'environnement `DD_AGENT_HOST` et `DD_ENTITY_ID` en procédant comme suit :
- Ajoutez l'étiquette `admission.datadoghq.com/enabled: "true"` à votre Pod.
- Configurez le contrôleur d'admission de l'Agent de Cluster en définissant `mutateUnlabelled` (ou `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`, selon votre méthode de configuration) sur `true`.

Ajouter une configuration d'Agent `mutateUnlabelled: true` dans le chart Helm amène l'Agent de Cluster à tenter d'intercepter chaque Pod non étiqueté.

Pour empêcher les Pods de recevoir des variables d'environnement, ajoutez l'étiquette `admission.datadoghq.com/enabled: "false"`. Cela fonctionne même si vous définissez `mutateUnlabelled: true`.

Si `mutateUnlabelled` est défini sur `false`, l'étiquette du Pod doit être définie sur `admission.datadoghq.com/enabled: "true"`.

Options possibles :

| mutateUnlabelled | Étiquette de Pod                               | Injection |
| ---------------- | --------------------------------------- | --------- |
| `true`           | Pas d'étiquette                                | Oui       |
| `true`           | `admission.datadoghq.com/enabled=true`  | Oui       |
| `true`           | `admission.datadoghq.com/enabled=false` | Non        |
| `false`          | Pas d'étiquette                                | Non        |
| `false`          | `admission.datadoghq.com/enabled=true`  | Oui       |
| `false`          | `admission.datadoghq.com/enabled=false` | Non        |


#### Ordre de priorité {#order-of-priority}
Le contrôleur d'admission Datadog n'injecte pas les variables d'environnement `DD_VERSION`, `DD_ENV` ou `DD_SERVICE` si elles existent déjà.

Lorsque ces variables d'environnement ne sont pas définies, le contrôleur d'admission utilise la valeur des balises standard dans l'ordre suivant (de la plus élevée à la plus basse) :

- Étiquettes sur le Pod
- Étiquettes sur le `ownerReference` (ReplicaSets, DaemonSets, Deployments, etc.)

#### Configurer le mode de communication APM et DogstatsD {#configure-apm-and-dogstatsd-communication-mode}
Depuis la version 1.20.0 de l'Agent de cluster Datadog, il est possible de configurer le contrôleur d'admission Datadog afin d'injecter différents modes de communication entre l'application et l'Agent Datadog.

Cette fonctionnalité peut être configurée en définissant `admission_controller.inject_config.mode` ou en définissant un mode spécifique au Pod en utilisant l'étiquette de Pod `admission.datadoghq.com/config.mode`.

À partir de la version 3.22.0 du chart Helm et de la version 1.1.0 de Datadog Operator, le mode de communication est automatiquement défini sur `socket` si soit le socket APM soit le socket DSD est activé.

Options possibles :
| Mode               | Description                                                                                                                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hostip` (Par défaut) | Injecter l'IP de l'hôte dans la variable d'environnement `DD_AGENT_HOST`                                                                                                                                                                          |
| `service`          | Injecter le nom DNS du service local de Datadog dans la variable d'environnement `DD_AGENT_HOST` (disponible avec Kubernetes v1.22+)                                                                                                                  |
| `socket`           | Injecter le chemin du socket de domaine Unix dans la variable d'environnement `DD_TRACE_AGENT_URL` et la définition du volume pour accéder au chemin correspondant. Injecter l'URL à utiliser pour connecter l'Agent Datadog pour les métriques DogStatsD dans `DD_DOGSTATSD_URL`. |
| `csi`              | Injecter les chemins des sockets de domaine Unix dans les variables d'environnement `DD_TRACE_AGENT_URL` et `DD_DOGSTATSD_URL` et la définition du volume CSI de Datadog pour accéder aux chemins correspondants. Ce mode est disponible pour Datadog Cluster Agent v7.67+.                                                    |

**Remarque** : Le mode spécifique au pod a la priorité sur le mode global défini au niveau du contrôleur d'admission.

## Dépannage {#troubleshooting}

Voir [Dépannage du contrôleur d'admission][6].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/
[2]: https://docs.datadoghq.com/fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/apm/?tab=helm#setup
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[5]: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-components
[6]: /fr/containers/troubleshooting/admission-controller
[7]: https://docs.datadoghq.com/fr/tracing/guide/local_sdk_injection/