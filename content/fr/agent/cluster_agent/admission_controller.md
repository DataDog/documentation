---
title: Contrôleur d'admission Datadog
kind: documentation
further_reading:
  - link: /agent/cluster_agent/clusterchecks/
    tag: Documentation
    text: Exécuter des checks de cluster avec Autodiscovery
  - link: /agent/cluster_agent/troubleshooting/
    tag: Documentation
    text: Dépanner l'Agent de cluster Datadog
---
## Présentation
Le contrôleur d'admission Datadog est un composant de l'Agent de cluster Datadog dont l'intérêt principal vise à simplifier la configuration des pods d'application de l'utilisateur. Pour ce faire, il remplit deux fonctions clés :

- Il injecte des variables d'environnement (`DD_AGENT_HOST` et `DD_ENTITY_ID`) pour configurer DogStatsD ainsi que les bibliothèques de traceurs de l'APM dans les conteneurs d'application de l'utilisateur.
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

#### Remarques

- Le contrôleur d'admission doit être déployé et configuré avant de créer les nouveaux pods d'application. Il ne peut pas mettre à jour des pods existants.
- Le contrôleur d'admission n'injecte pas les variables d'environnement `DD_VERSION, DD_ENV`, et `DD_SERVICE` si elles existent déjà.
- Pour désactiver la fonctionnalité d'injection du contrôleur d'admission, configurez l'Agent de cluster comme suit : `DD_ADMISSION_CONTROLLER_INJECT_CONFIG_ENABLED=false`
- Si vous utilisez le contrôleur d'admission Datadog, vous n'avez plus besoin de configurer les pods d'application via l'API Downward ([étape 2 de la configuration de la collecte de traces Kubernetes][3]).
- Si vous utilisez un cluster privé et que votre configuration n'est pas injectée dans vos pods, ouvrez une règle de pare-feu afin que le plan de contrôle puisse communiquer avec le webhook Datadog. Vérifiez que les règles de pare-feu ouvrent le port 443, tel que décrit dans la rubrique [Ajouter des règles de pare-feu dans GCP][4].


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/
[2]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/apm/?tab=helm#setup
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules