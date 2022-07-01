---
further_reading:
- link: /agent/cluster_agent/clusterchecks/
  tag: Documentation
  text: Exécuter des checks de cluster avec Autodiscovery
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentation
  text: Dépanner l'Agent de cluster Datadog
kind: documentation
title: Contrôleur d'admission Datadog
---

## Présentation
Le contrôleur d'admission Datadog est un composant de l'Agent de cluster Datadog dont l'intérêt principal vise à simplifier la configuration de vos pods d'application. Pour ce faire, il remplit deux fonctions clés :

- Il injecte des variables d'environnement (`DD_AGENT_HOST`, `DD_TRACE_AGENT_URL` et `DD_ENTITY_ID`) pour configurer DogStatsD ainsi que les bibliothèques de traceur APM dans les conteneurs d'application de l'utilisateur.
- Il injecte les tags standard Datadog (`env`, `service`, `version`) des étiquettes d'application dans les variables d'environnement de conteneur.

Le contrôleur d'admission de Datadog est de type `MutatingAdmissionWebhook`. Pour en savoir plus sur les contrôleurs d'admission, consultez le [guide Kubernetes][1].

## Prérequis

- Agent de cluster Datadog v1.7.0+

## Configuration

### Chart Helm

Pour utiliser le contrôleur d'admission avec le chart Helm, définissez le paramètre `clusterAgent.admissionController.enabled` sur `true` :

{{< code-block lang="yaml" filename="values.yaml" disable_copy="true" >}}
[...]
 clusterAgent:
[...]
  ## @param admissionController - objet - obligatoire
  ## Permet au admissionController d'injecter automatiquement la configuration de l'APM et
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
[...]
{{< /code-block >}}

### Operator Datadog

Pour utiliser le contrôleur d'admission avec l'Operator Datadog, définissez le paramètre `clusterAgent.config.admissionController.enabled` sur `true` dans la ressource personnalisée :

```yaml
[...]
 clusterAgent:
[...]
    config:
      admissionController:
        enabled: true
        mutateUnlabelled: false
[...]
```

### Configuration manuelle

Pour activer le contrôleur d'admission sans utiliser Helm ou l'Operator Datadog, ajoutez ce qui suit à votre configuration :

Tout d'abord, téléchargez le manifeste des [autorisations RBAC de l'Agent de cluster][2] et ajoutez ce qui suit sous `rules` :

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

Ajoutez ce qui suit au bas du fichier `agent-services.yaml` :

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

# Supprimez la mise en commentaire de ce bloc pour configurer automatiquement les traceurs de l'APM (voir ci-dessous)
# - name: DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED
#   value: "true"
{{< /code-block >}}

Enfin, exécutez les commandes suivantes :

- `kubectl apply -f cluster-agent-rbac.yaml`
- `kubectl apply -f agent-services.yaml`
- `kubectl apply -f cluster-agent-deployment.yaml`

### APM et DogStatsD

Pour configurer automatiquement les clients DogStatsD et les traceurs d'APM, injectez les variables d'environnement `DD_AGENT_HOST` et `DD_ENTITY_ID` en procédant de l'une ou l'autre des façons suivantes :

- Ajoutez l'étiquette `admission.datadoghq.com/enabled: "true"` à votre pod.
- Configurez le contrôleur d'admission de l'Agent de cluster en définissant `mutateUnlabelled` (ou `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`, en fonction de votre méthode de configuration) sur `true`.

Pour empêcher les pods de recevoir les variables d'environnement, ajoutez l'étiquette `admission.datadoghq.com/enabled: "false"`. Cette opération fonctionne même si vous définissez `mutateUnlabelled: true`.

Options possibles :

| mutateUnlabelled | Étiquette de pod                               | Injection |
|------------------|-----------------------------------------|-----------|
| `true`           | Aucune étiquette                                | Oui       |
| `true`           | `admission.datadoghq.com/enabled=true`  | Oui       |
| `true`           | `admission.datadoghq.com/enabled=false` | Non        |
| `false`          | Aucune étiquette                                | Non        |
| `false`          | `admission.datadoghq.com/enabled=true`  | Oui       |
| `false`          | `admission.datadoghq.com/enabled=false` | Non        |


#### Ordre de priorité
Le contrôleur d'admission Datadog n'injecte pas les variables d'environnement `DD_VERSION`, `DD_ENV` et `DD_SERVICE` si elles existent déjà.

Si ces variables d'environnement ne sont pas définies, le contrôleur d'admission utilise la valeur des tags standard dans l'ordre suivant (en commençant par le premier élément) :

- Étiquettes sur le pod
- Étiquettes sur la `ownerReference` (ReplicaSets, DaemonSets, déploiements, etc.)

#### Configurer le mode de communication APM et DogStatsD
Depuis la version 1.20.0 de l'Agent de cluster Datadog, il est possible de configurer le contrôleur d'admission Datadog afin d'injecter différents modes de communication entre l'application et l'Agent Datadog.

Cette fonctionnalité peut être configuré en définissant `admission_controller.inject_config.mode` ou en configurant un mode propre à un pod à l'aide de l'étiquette de pod `admission.datadoghq.com/config.mode`.

Options disponibles :
| Mode               | Description                                                                                                       |
|--------------------|-------------------------------------------------------------------------------------------------------------------|
| `hostip` (par défaut) | Injecte l'IP du host dans la variable d'environnement `DD_AGENT_HOST`.                                                        |
| `service`          | Injecte le nom DNS du service local Datadog dans la variable d'environnement `DD_AGENT_HOST` (disponible à partir de la version 1.22 de Kubernetes). |
| `socket`           | Injecte le chemin du domaine de socket Unix dans la variable d'environnement `DD_TRACE_AGENT_URL` et la définition du volume, afin d'accéder au chemin correspondant. |

**Remarque** : le mode propre à un pod est prioritaire sur le mode global défini au niveau du contrôleur d'admission.

#### Remarques

- Le contrôleur d'admission doit être déployé et configuré avant de créer de nouveaux pods d'application. Il ne peut pas mettre à jour des pods existants.
- Pour désactiver la fonctionnalité d'injection du contrôleur d'admission, configurez l'Agent de cluster comme suit : `DD_ADMISSION_CONTROLLER_INJECT_CONFIG_ENABLED=false`
- Si vous utilisez le contrôleur d'admission Datadog, vous n'avez plus besoin de configurer les pods d'application via l'API Downward ([étape 2 de la configuration de la collecte de traces Kubernetes][3]).
- Dans un cluster privé Google Kubernetes Engine (GKE), vous devez [ajouter une règle de pare-feu pour le plan de contrôle][4]. Le webhook qui traite les connexions entrantes reçoit la requête sur le port `443` et la transmet à un service implémenté sur le port `8000`. Par défaut, le réseau du cluster doit contenir une règle de pare-feu intitulée `gke-<NOM_CLUSTER>-master`. Les filtres sources de la règle correspondent à la plage d'adresses du plan de contrôle du cluster. Modifiez cette règle de pare-feu de façon à autoriser les entrées sur le port TCP `8000`.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/
[2]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/apm/?tab=helm#setup
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules