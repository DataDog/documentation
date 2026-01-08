---
aliases:
- /fr/agent/cluster_agent/admission_controller
description: Injecter automatiquement des variables d'environnement et des tags standard
  dans les pods Kubernetes à l'aide du Datadog Admission Controller
further_reading:
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentation
  text: Dépanner l'Agent de cluster Datadog
- link: /containers/troubleshooting/admission-controller
  tag: Documentation
  text: Dépannage du contrôleur d'admission
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: Blog
  text: Utiliser l'injection de bibliothèque pour instrumenter automatiquement le
    tracing des applications Kubernetes avec Datadog APM
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: Blog
  text: Apporter une observabilité haute performance aux environnements Kubernetes
    sécurisés avec le driver CSI Datadog
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Architecture Center
  text: Instrumenter votre application à l'aide du Datadog Operator et du contrôleur
    d'admission
- link: /containers/guide/cluster_agent_disable_admission_controller
  tag: Documentation
  text: Désactiver le contrôleur d'admission Datadog avec l'Agent de cluster
title: Contrôleur d'admission Datadog
---

## Présentation
Le contrôleur d'admission Datadog est un composant de l'Agent de cluster Datadog dont l'intérêt principal vise à simplifier la configuration de vos pods d'application. Pour ce faire, il remplit deux fonctions clés :

- Injecter des variables d'environnement ('DD_AGENT_HOST', 'DD_TRACE_AGENT_URL', 'DD_ENTITY_ID' et 'DD_EXTERNAL_ENV') pour configurer DogStatsD et les bibliothèques de traceur APM dans les conteneurs d'application de l'utilisateur.
- Il injecte les tags standard Datadog (`env`, `service`, `version`) des étiquettes d'application dans les variables d'environnement de conteneur.

Le contrôleur d'admission Datadog est de type 'MutatingAdmissionWebhook'. Pour plus de détails sur les contrôleurs d'admission, consultez le [guide Kubernetes sur les contrôleurs d'admission][1].

## Prérequis

- Agent de cluster Datadog v7.40+

## Configuration
{{< tabs >}}
{{% tab "Operator Datadog" %}}

Le Datadog Operator active le contrôleur d'admission Datadog par défaut. Aucune configuration supplémentaire n'est nécessaire pour activer le contrôleur d'admission.


Si vous avez désactivé le contrôleur d'admission, vous pouvez le réactiver en définissant le paramètre 'features.admissionController.enabled' sur 'true' dans votre configuration 'DatadogAgent' :

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
À partir de la version v2.35.0 du chart Helm, le contrôleur d'admission Datadog est activé par défaut. Aucune configuration supplémentaire n'est nécessaire pour activer le contrôleur d'admission.

Pour activer le contrôleur d'admission pour le chart Helm v2.34.6 et versions antérieures, définissez le paramètre 'clusterAgent.admissionController.enabled' sur 'true' :

{{< code-block lang="yaml" filename="datadog-values.yaml" disable_copy="false" >}}
#(...)
clusterAgent:
  #(...)
  ## @param admissionController - objet - obligatoire
  ## Permet au admissionController d'injecter automatiquement la configuration d'APM et
  ## de DogStatsD, ainsi que les tags standard (env, service, version), dans
  ## vos pods
  #
  admissionController:
    enabled: true

    ## @param mutateUnlabelled - booléen - facultatif
    ## Permet d'injecter la configuration sans l'étiquette de pod :
    ## admission.datadoghq.com/enabled="true"
    #
    mutateUnlabelled: false
{{< /code-block >}}
{{% /tab %}}
{{% tab "DaemonSet" %}}

Pour activer le contrôleur d'admission sans utiliser Helm ou l'Operator Datadog, ajoutez ce qui suit à votre configuration :

Tout d'abord, téléchargez le manifeste des [autorisations RBAC de l'Agent de cluster][1] et ajoutez ce qui suit sous `rules` :

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

Ajoutez ce qui suit en bas du fichier `agent-services.yaml` :

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

# Supprimez la mise en commentaire de ce bloc pour configurer automatiquement les traceurs APM (voir ci-dessous)
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

### Injection de bibliothèque d'instrumentation APM
Vous pouvez configurer l'Agent de cluster (version 7.39 et ultérieure) pour injecter des bibliothèques d'instrumentation à l'aide de l'instrumentation en une étape. Consultez la section [Instrumentation APM en une étape][2] pour en savoir plus.

Si vous ne souhaitez pas utiliser l'instrumentation en une étape, le contrôleur d'admission Datadog peut être utilisé pour injecter directement les bibliothèques de traceur APM comme alternative manuelle au niveau du pod. Consultez la section [Injection de SDK locale][7] pour en savoir plus.

### Injection de variables d'environnement APM et DogStatsD

Pour configurer des clients DogStatsD ou d'autres bibliothèques APM qui ne prennent pas en charge l'injection de bibliothèque, injecter les variables d'environnement 'DD_AGENT_HOST' et 'DD_ENTITY_ID' en effectuant l'une des opérations suivantes :
- Ajoutez l'étiquette 'admission.datadoghq.com/enabled: "true"' à votre Pod 
- Configurez le contrôleur d'admission de l'Agent de cluster en définissant `mutateUnlabelled` (ou `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`, en fonction de votre méthode de configuration) sur `true`.

L'ajout d'une configuration d'Agent 'mutateUnlabelled: true' dans le chart Helm fait en sorte que l'Agent de cluster tente d'intercepter chaque Pod sans étiquette.

Pour empêcher les pods de recevoir les variables d'environnement, ajoutez l'étiquette `admission.datadoghq.com/enabled: "false"`. Cette opération fonctionne même si vous définissez `mutateUnlabelled: true`.

Si 'mutateUnlabelled' est défini sur 'false', l'étiquette du Pod doit être définie sur 'admission.datadoghq.com/enabled: "true"'.

Options possibles :

| mutateUnlabelled | Étiquette de pod                               | Injection |
| ---------------- | --------------------------------------- | --------- |
| `true`           | Aucune étiquette                                | Oui       |
| `true`           | `admission.datadoghq.com/enabled=true`  | Oui       |
| `true`           | `admission.datadoghq.com/enabled=false` | Non        |
| `false`          | Aucune étiquette                                | Non        |
| `false`          | `admission.datadoghq.com/enabled=true`  | Oui       |
| `false`          | `admission.datadoghq.com/enabled=false` | Non        |


#### Ordre de priorité
Le contrôleur d'admission Datadog n'injecte pas les variables d'environnement `DD_VERSION`, `DD_ENV` ou `DD_SERVICE` si elles existent déjà.

Si ces variables d'environnement ne sont pas définies, le contrôleur d'admission utilise la valeur des tags standard dans l'ordre suivant (en commençant par le premier élément) :

- Étiquettes sur le pod
- Étiquettes sur la `ownerReference` (ReplicaSets, DaemonSets, déploiements, etc.)

#### Configurer le mode de communication entre APM et DogStatsD
Depuis la version 1.20.0 de l'Agent de cluster Datadog, il est possible de configurer le contrôleur d'admission Datadog afin d'injecter différents modes de communication entre l'application et l'Agent Datadog.

Cette fonctionnalité peut être configuré en définissant `admission_controller.inject_config.mode` ou en configurant un mode propre à un pod à l'aide de l'étiquette de pod `admission.datadoghq.com/config.mode`.

À partir de la version v3.22.0 du chart Helm et de la version v1.1.0 du Datadog Operator, le mode de communication est automatiquement défini sur 'socket' si le socket APM ou le socket DSD est activé.

Options possibles :
| Mode               | Description                                                                                                                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hostip` (par défaut) | Injecter l'adresse IP de l'host dans la variable d'environnement 'DD_AGENT_HOST'                                                                                                                                                                          |
| `service`          | Injecter le nom DNS du service local Datadog dans la variable d'environnement 'DD_AGENT_HOST' (disponible avec Kubernetes v1.22+)                                                                                                                  |
| `socket`           | Injecter le chemin Unix Domain Socket dans la variable d'environnement 'DD_TRACE_AGENT_URL' et la définition de volume pour accéder au chemin correspondant. Injecter l'URL à utiliser pour se connecter à l'Agent Datadog pour les métriques DogStatsD dans 'DD_DOGSTATSD_URL'. |
| `csi`              | Injecter les chemins Unix Domain Socket dans les variables d'environnement 'DD_TRACE_AGENT_URL' et 'DD_DOGSTATSD_URL' et la définition de volume CSI Datadog pour accéder aux chemins correspondants. Ce mode est disponible pour l'Agent de cluster de Datadog v7.67+.                                                    |

**Remarque** : le mode spécifique au Pod a priorité sur le mode global défini au niveau du contrôleur d'admission.

## Dépannage

Consultez la section [Dépannage du contrôleur d'admission][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/
[2]: https://docs.datadoghq.com/fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/apm/?tab=helm#setup
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[5]: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-components
[6]: /fr/containers/troubleshooting/admission-controller
[7]: https://docs.datadoghq.com/fr/tracing/guide/local_sdk_injection/