---
description: Déployez et gérez les ressources personnalisées DatadogPodAutoscaler
  pour l'autoscaling Kubernetes en utilisant ArgoCD et GitOps
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-autoscaling-datadog/
  tag: Blog
  text: 'Guide de l''autoscaling Kubernetes : déterminez quelle solution convient
    le mieux à votre cas d''utilisation'
- link: https://docs.datadoghq.com/containers/monitoring/autoscaling/
  tag: Documentation
  text: Datadog Kubernetes Autoscaling
- link: https://docs.datadoghq.com/agent/cluster_agent/
  tag: Documentation
  text: Agent de cluster Datadog
- link: https://argo-cd.readthedocs.io/
  tag: Site externe
  text: Documentation d'ArgoCD
- link: https://argo-cd.readthedocs.io/en/stable/user-guide/sync-waves/
  tag: Site externe
  text: Vagues de synchronisation d'ArgoCD
- link: https://argo-cd.readthedocs.io/en/stable/user-guide/diffing/
  tag: Site externe
  text: Personnalisation du diff d'ArgoCD
- link: https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/
  tag: Site externe
  text: Options de synchronisation d'ArgoCD
title: Gestion de DatadogPodAutoscaler avec ArgoCD
---
## Aperçu {#overview}

Le DatadogPodAutoscaler (DPA) est une définition de ressource personnalisée Kubernetes (CRD) qui permet l'autoscaling des charges de travail Kubernetes en utilisant [Datadog Kubernetes Autoscaling (DKA)][1]. Ce guide démontre comment gérer les ressources DatadogPodAutoscaler en utilisant ArgoCD et les principes GitOps pour déployer une configuration d'autoscaling.

ArgoCD est un outil de livraison continue déclaratif et GitOps pour Kubernetes. Il surveille les dépôts Git contenant des manifests Kubernetes et maintient votre cluster synchronisé avec l'état souhaité défini dans Git. Cette approche fournit un contrôle de version, des pistes d'audit et un déploiement automatisé de votre infrastructure d'autoscaling.

**Activation de l'autoscaling à grande échelle :** Pour déployer l'autoscaling sur de nombreuses charges de travail ou espaces de noms avec une politique partagée, étiquetez les charges de travail ou espaces de noms avec `autoscaling.datadoghq.com/profile` au lieu de rédiger un `DatadogPodAutoscaler` par charge de travail. Voir [Profils de cluster][2] dans l'aperçu de l'autoscaling Kubernetes.

## Prérequis {#prerequisites}

Avant de commencer, assurez-vous d'avoir ce qui suit :

- **Cluster Kubernetes** : Un cluster Kubernetes fonctionnel (1.20 ou version ultérieure) avec accès via `kubectl`
- **ArgoCD installé** : ArgoCD déployé dans votre cluster et accessible via CLI ou UI
- **Identifiants de l'API Datadog** : Clé API Datadog valide et clé d'application
- **Dépôt Git** : Un dépôt Git pour stocker vos manifestes

## Structure du projet {#project-structure}

Ce guide utilise le modèle App of Apps avec des vagues de synchronisation ArgoCD pour garantir la création et l'ordre de déploiement appropriés des dépendances.

```
.
├── argocd/
│   ├── root-app.yaml              # App of Apps controller
│   └── apps/
│       ├── datadog-operator.yaml  # ArgoCD Application for Operator
│       ├── datadog-agent.yaml     # ArgoCD Application for Agent
│       └── nginx-dka-demo.yaml    # ArgoCD Application for workload
├── manifests/
│   └── stage2-agent/
│       └── datadog-agent.yaml     # DatadogAgent custom resource
└── charts/
    └── nginx-dka-demo/
        ├── Chart.yaml
        ├── values.yaml
        └── templates/
            ├── deployment.yaml
            └── pod-autoscaler.yaml
```

## Étapes de déploiement {#deployment-stages}

Une approche de déploiement multi-étapes est essentielle lors de l'utilisation des définitions de ressources personnalisées Kubernetes (CRDs) et d'ArgoCD. Cette approche ordonnée est nécessaire pour garantir que vous créez et installez les dépendances requises pour chaque étape du processus.

Les CRDs Kubernetes doivent être installées dans le cluster avant que vous puissiez créer des ressources personnalisées qui les utilisent. La CRD DatadogPodAutoscaler est créée lorsque vous installez l'Opérateur Datadog à l'Étape 1. ArgoCD a besoin que ces CRDs soient présentes avant de pouvoir synchroniser avec succès les ressources qui en dépendent.

ArgoCD utilise **vagues de synchronisation** pour contrôler l'ordre de déploiement via des annotations. Les vagues de synchronisation sont exécutées dans l'ordre croissant (les numéros les plus bas en premier), et ArgoCD attend que toutes les ressources d'une vague soient saines avant de passer à la vague suivante.

1. **Étape 1 (Vague 0)** : Opérateur Datadog utilisant Helm (crée les CRDs)
2. **Étape 2 (Vague 1)** : Agent Datadog configuré pour Datadog Kubernetes Autoscaling
   - Ressource personnalisée DatadogAgent avec les exigences d’autoscaling activées
3. **Étape 3 (Vague 2)** : Charge de travail de l’application avec DatadogPodAutoscaler
   - Déploiement NGINX dans l’espace de noms de démonstration
   - Ressource DatadogPodAutoscaler pour l’autoscaling du déploiement NGINX

## Configurer les fichiers de configuration {#set-up-configuration-files}

Tout d'abord, créez un dépôt Git. Vous devez mettre à jour toutes les `repoURL` références dans les manifestes de l’application ArgoCD pour pointer vers votre dépôt, car ArgoCD tire les manifestes de Git.

Configurez les fichiers de configuration suivants pour chaque étape du processus.

### Étape 1 : Application racine (App des Apps) {#stage-1-root-application-app-of-apps}

L'application racine est le contrôleur App des Apps qui gère toutes les applications enfants.

{{< code-block lang="yaml" filename="argocd/root-app.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: dka-root
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://example.com/YOUR-USERNAME/dka-argocd-example
    targetRevision: HEAD
    path: argocd/apps
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
{{< /code-block >}}

### Étape 2 : Application Datadog Operator {#stage-2-datadog-operator-application}

Cette application ArgoCD déploie le Datadog Operator en utilisant Helm, qui crée les CRDs nécessaires.

{{< code-block lang="yaml" filename="argocd/apps/datadog-operator.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: datadog-operator
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "0"
spec:
  project: default
  source:
    repoURL: https://helm.datadoghq.com
    targetRevision: 2.18.1
    chart: datadog-operator
  destination:
    server: https://kubernetes.default.svc
    namespace: datadog
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - ServerSideApply=true
{{< /code-block >}}

### Étape 3 : Application Datadog Agent {#stage-3-datadog-agent-application}

Cette application ArgoCD déploie la ressource personnalisée DatadogAgent.

{{< code-block lang="yaml" filename="argocd/apps/datadog-agent.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: datadog-agent
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "1"
spec:
  project: default
  source:
    repoURL: https://example.com/YOUR-USERNAME/dka-argocd-example
    targetRevision: HEAD
    path: manifests/stage2-agent
  destination:
    server: https://kubernetes.default.svc
    namespace: datadog
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
{{< /code-block >}}

Créez le manifeste de la ressource personnalisée DatadogAgent :

{{< code-block lang="yaml" filename="manifests/stage2-agent/datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  namespace: datadog
spec:
  features:
    autoscaling:
      workload:
        enabled: true
    eventCollection:
      unbundleEvents: true
  global:
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
    clusterName: minikube-dka-demo
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
    nodeAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
{{< /code-block >}}

### Étape 4 : Application NGINX avec DatadogPodAutoscaler {#stage-4-nginx-application-with-datadogpodautoscaler}

Cette application ArgoCD déploie une charge de travail NGINX avec un DatadogPodAutoscaler en utilisant un chart Helm.

{{< code-block lang="yaml" filename="argocd/apps/nginx-dka-demo.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: nginx-dka-demo
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "2"
spec:
  project: default
  source:
    repoURL: https:/example.com/YOUR-USERNAME/dka-argocd-example
    targetRevision: HEAD
    path: charts/nginx-dka-demo
  destination:
    server: https://kubernetes.default.svc
    namespace: nginx-dka-demo
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - RespectIgnoreDifferences=true
  ignoreDifferences:
    - group: apps
      kind: Deployment
      name: nginx
      namespace: nginx-dka-demo
      managedFieldsManagers:
        - datadog-cluster-agent
{{< /code-block >}}

L'entrée `ignoreDifferences` s'associe à `RespectIgnoreDifferences=true` pour indiquer à ArgoCD de ne pas annuler les modifications que le Datadog Cluster Agent applique à la charge de travail autoscalée. Le formulaire `managedFieldsManagers` utilise la propriété de champ d'application côté serveur de Kubernetes, donc tout champ que le Cluster Agent possède (réplicas, annotations sous `autoscaling.datadoghq.com/`, ressources de conteneur) est préservé automatiquement. Voir [Autoriser le Datadog Cluster Agent à mettre à jour les charges de travail autoscalées](#allow-the-datadog-cluster-agent-to-update-autoscaled-workloads) pour la justification complète et l'alternative de configuration globale.

Créez le Helm chart pour l'application NGINX :

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/Chart.yaml" >}}
apiVersion: v2
name: nginx-dka-demo
description: NGINX demo application with DatadogPodAutoscaler
type: application
version: 0.1.0
appVersion: "1.0"
{{< /code-block >}}

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/values.yaml" >}}
replicaCount: 3

image:
  repository: nginx
  tag: latest
  pullPolicy: IfNotPresent

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

service:
  type: ClusterIP
  port: 80

autoscaler:
  enabled: true
  minReplicas: 3
  maxReplicas: 100
  targetCPUUtilization: 70
  scaleUp:
    rules:
      - type: Percent
        value: 50
        periodSeconds: 120
    stabilizationWindowSeconds: 600
    strategy: Max
  scaleDown:
    rules:
      - type: Percent
        value: 20
        periodSeconds: 1200
    stabilizationWindowSeconds: 600
    strategy: Max
{{< /code-block >}}

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/templates/deployment.yaml" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  namespace: nginx-dka-demo
  labels:
    app: nginx
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        imagePullPolicy: {{ .Values.image.pullPolicy }}
        ports:
        - containerPort: 80
        resources:
          {{- toYaml .Values.resources | nindent 10 }}
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  namespace: nginx-dka-demo
spec:
  selector:
    app: nginx
  ports:
  - port: {{ .Values.service.port }}
    targetPort: 80
  type: {{ .Values.service.type }}
{{< /code-block >}}

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/templates/pod-autoscaler.yaml" >}}
{{- if .Values.autoscaler.enabled }}
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: nginx
  namespace: nginx-dka-demo
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  owner: Local
  constraints:
    minReplicas: {{ .Values.autoscaler.minReplicas }}
    maxReplicas: {{ .Values.autoscaler.maxReplicas }}
    containers:
    - name: nginx
      enabled: true
  objectives:
  - type: PodResource
    podResource:
      name: cpu
      value:
        type: Utilization
        utilization: {{ .Values.autoscaler.targetCPUUtilization }}
  applyPolicy:
    mode: Apply
    update:
      strategy: Auto
    scaleUp:
      strategy: {{ .Values.autoscaler.scaleUp.strategy }}
      stabilizationWindowSeconds: {{ .Values.autoscaler.scaleUp.stabilizationWindowSeconds }}
      rules:
      {{- toYaml .Values.autoscaler.scaleUp.rules | nindent 6 }}
    scaleDown:
      strategy: {{ .Values.autoscaler.scaleDown.strategy }}
      stabilizationWindowSeconds: {{ .Values.autoscaler.scaleDown.stabilizationWindowSeconds }}
      rules:
      {{- toYaml .Values.autoscaler.scaleDown.rules | nindent 6 }}
{{- end }}
{{< /code-block >}}

## Autoriser le Datadog Cluster Agent à mettre à jour les charges de travail autoscalées {#allow-the-datadog-cluster-agent-to-update-autoscaled-workloads}

Lorsque `applyPolicy.mode: Apply` est défini sur un `DatadogPodAutoscaler`, le Datadog Cluster Agent modifie directement la charge de travail cible. Il met à jour `spec.replicas`, les ressources de conteneur, et écrit des annotations sous le préfixe `autoscaling.datadoghq.com/` pour suivre ses recommandations et l'état appliqué. Sans configuration ArgoCD supplémentaire, ArgoCD interprète ces mutations comme une dérive et, avec `selfHeal: true` activé, les annule à chaque synchronisation. Cela provoque un conflit entre ArgoCD et l'autoscaler.

Deux options sont disponibles pour prévenir ce conflit :

- **Par application :** Ajoutez `ignoreDifferences` et `RespectIgnoreDifferences=true` à chaque ArgoCD `Application` qui contient une charge de travail autoscalée. Cela est montré dans [Étape 4](#stage-4-nginx-application-with-datadogpodautoscaler) ci-dessus.
- **Global :** Configurez `argocd-cm` une fois pour que la `ignoreDifferences` règle s'applique à chaque application dans l'instance.

### Types de charges de travail cibles pris en charge {#supported-target-workload-kinds}

La `ignoreDifferences` configuration doit couvrir chaque type de charge de travail qu'un `DatadogPodAutoscaler` peut cibler via `spec.targetRef` :

| Type de charge de travail | Groupe d'API | Remarque |
|---|---|---|
| `Deployment` | `apps` | |
| `StatefulSet` | `apps` | |
| `Rollout` | `argoproj.io` | S'applique uniquement si vous exécutez également Argo Rollouts |

### Configuration par application {#per-application-configuration}

Choisissez l'une des variantes suivantes en fonction de l'activation de l'application côté serveur dans votre cluster.

#### Variante 1 : `managedFieldsManagers` (recommandée) {#variant-1-managedfieldsmanagers-recommended}

L'approche `managedFieldsManagers` couvre chaque champ dont le Cluster Agent est propriétaire (`spec.replicas`, ressources de conteneur et toutes les annotations) sans les énumérer individuellement.

{{< code-block lang="yaml" >}}
syncPolicy:
  automated:
    prune: true
    selfHeal: true
  syncOptions:
    - RespectIgnoreDifferences=true
ignoreDifferences:
  - group: apps
    kind: Deployment
    managedFieldsManagers:
      - datadog-cluster-agent
  - group: apps
    kind: StatefulSet
    managedFieldsManagers:
      - datadog-cluster-agent
  - group: argoproj.io
    kind: Rollout
    managedFieldsManagers:
      - datadog-cluster-agent
{{< /code-block >}}

C'est l'approche utilisée dans l'exemple de l'Étape 4 ci-dessus. Incluez uniquement les `kind` entrées pour les types de charges de travail présents dans chaque application.

#### Variante 2 : `jqPathExpressions` (fonctionne avec l'application côté client) {#variant-2-jqpathexpressions-works-with-client-side-apply}

L'approche `jqPathExpressions` cible explicitement uniquement les annotations commençant par `autoscaling.datadoghq.com/`, ce qui la rend compatible avec l'application côté client. Utilisez cette variante si `ServerSideApply=true` n'est pas disponible dans votre environnement.

{{< code-block lang="yaml" >}}
syncPolicy:
  automated:
    prune: true
    selfHeal: true
  syncOptions:
    - RespectIgnoreDifferences=true
ignoreDifferences:
  - group: apps
    kind: Deployment
    jqPathExpressions:
      - .metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
      - .spec.template.metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
  - group: apps
    kind: StatefulSet
    jqPathExpressions:
      - .metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
      - .spec.template.metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
  - group: argoproj.io
    kind: Rollout
    jqPathExpressions:
      - .metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
      - .spec.template.metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
{{< /code-block >}}

**Limitation :** cette variante ne couvre que `autoscaling.datadoghq.com/` annotations. Si l'autoscaler modifie également `spec.replicas` ou les demandes de ressources de conteneur, ajoutez des entrées `jqPathExpressions` séparées pour ces champs. La variante 1 (`managedFieldsManagers`) évite cette lacune en couvrant automatiquement tous les champs dont le Cluster Agent est propriétaire.

### Configuration globale {#global-configuration}

Pour appliquer `ignoreDifferences` une fois à toutes les Applications dans une instance ArgoCD, configurez le ConfigMap `argocd-cm` en utilisant les clés `resource.customizations.ignoreDifferences.<group>_<kind>`.

#### ConfigMap (installations kubectl ou Kustomize) {#configmap-kubectl-or-kustomize-installs}

{{< code-block lang="yaml" filename="argocd-cm patch" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
data:
  resource.customizations.ignoreDifferences.apps_Deployment: |
    managedFieldsManagers:
      - datadog-cluster-agent
  resource.customizations.ignoreDifferences.apps_StatefulSet: |
    managedFieldsManagers:
      - datadog-cluster-agent
  resource.customizations.ignoreDifferences.argoproj.io_Rollout: |
    managedFieldsManagers:
      - datadog-cluster-agent
{{< /code-block >}}

#### Valeurs du chart Helm ArgoCD {#argocd-helm-chart-values}

Pour les utilisateurs déployant ArgoCD avec le chart Helm officiel `argo/argo-cd`, ajoutez les mêmes clés sous `configs.cm` :

{{< code-block lang="yaml" filename="values.yaml" >}}
configs:
  cm:
    resource.customizations.ignoreDifferences.apps_Deployment: |
      managedFieldsManagers:
        - datadog-cluster-agent
    resource.customizations.ignoreDifferences.apps_StatefulSet: |
      managedFieldsManagers:
        - datadog-cluster-agent
    resource.customizations.ignoreDifferences.argoproj.io_Rollout: |
      managedFieldsManagers:
        - datadog-cluster-agent
{{< /code-block >}}

Appliquez les valeurs avec :

{{< code-block lang="bash" >}}
helm upgrade --install argocd argo/argo-cd -f values.yaml -n argocd
{{< /code-block >}}

#### Important : `RespectIgnoreDifferences` est toujours requis par Application {#important-respectignoredifferences-is-still-required-per-application}

<div class="alert alert-warning">
Global <code>ignoreDifferences</code> la configuration ne fait que supprimer l'affichage des différences dans l'interface utilisateur d'ArgoCD. Cela n'empêche pas ArgoCD d'écraser ces champs lors d'une synchronisation. Chaque Application contenant une charge de travail autoscalée doit également définir <strong><code>RespectIgnoreDifferences=true</code> dans son <code>syncOptions</code></strong>. Il n'existe pas d'équivalent global pour cette option de synchronisation.
</div>

Pour éviter de définir `RespectIgnoreDifferences=true` sur chaque Application individuellement, définissez-le au niveau `AppProject` afin que toutes les Applications du projet l'héritent :

{{< code-block lang="yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: default
  namespace: argocd
spec:
  syncPolicy:
    syncOptions:
      - RespectIgnoreDifferences=true
{{< /code-block >}}

Alternativement, utilisez un modèle `ApplicationSet` pour ajouter l'option de synchronisation à toutes les Applications générées automatiquement.

### Quelle option utiliser {#which-option-to-use}

- **Peu de charges de travail autoscalées** : utilisez la configuration [par application](#per-application-configuration) La configuration reste colocalisée avec la charge de travail.
- **De nombreuses charges de travail ou une standardisation à l'échelle d'ArgoCD** : utilisez la [configuration globale](#global-configuration) combinée à une configuration au niveau du projet ou au niveau `ApplicationSet``RespectIgnoreDifferences=true`.
- **Environnements mixtes (toutes les charges de travail ne sont pas autoscalées)** : la configuration globale peut être appliquée en toute sécurité à l'instance. La règle `managedFieldsManagers` n'a aucun effet pour les charges de travail qui n'ont pas la propriété de champ Datadog Cluster Agent.

## Instructions de déploiement{#deployment-instructions}

Après avoir configuré [les fichiers de configuration](#set-up-configuration-files) et les avoir poussés dans votre dépôt Git, suivez ces étapes pour déployer les composants en utilisant ArgoCD.

### Créer un secret Datadog{#create-datadog-secret}

Créez un secret Kubernetes avec vos clés API et d'application Datadog dans le namespace `datadog` :

{{< code-block lang="bash" >}}
kubectl create namespace datadog
kubectl create secret generic datadog-secret \
  --from-literal=api-key=YOUR_API_KEY \
  --from-literal=app-key=YOUR_APP_KEY \
  -n datadog
{{< /code-block >}}

### Déployer l'application racine{#deploy-root-application}

Déployez l'application racine, qui gère toutes les applications enfants en utilisant le modèle App of Apps :

{{< code-block lang="bash" >}}
kubectl apply -f argocd/root-app.yaml
{{< /code-block >}}

ArgoCD surveille maintenant votre dépôt Git et déploie automatiquement toutes les applications dans le bon ordre en fonction des vagues de synchronisation.

### Activer l'autoscaling sur le cluster dans Datadog{#enable-autoscaling-on-the-cluster-in-datadog}

Accédez à [la page des paramètres d'autoscaling](https://app.datadoghq.com/orchestration/scaling/settings) dans l'interface utilisateur de Datadog pour activer l'autoscaling pour le cluster.

### Vérifiez la progression des vagues de synchronisation{#verify-sync-wave-progression}

Surveillez la synchronisation des applications ArgoCD dans l'ordre :

{{< code-block lang="bash" >}}
kubectl get applications -n argocd
{{< /code-block >}}

Vous devriez voir toutes les applications apparaître et se synchroniser dans l'ordre des vagues : `datadog-operator` (vague 0), puis `datadog-agent` (vague 1), et `nginx-dka-demo` (vague 2).

### Validez le déploiement{#validate-deployment}

Vérifiez que l'Opérateur Datadog et les CRDs sont déployés :

{{< code-block lang="bash" >}}
kubectl get crd | grep datadoghq
kubectl get pods -n datadog
{{< /code-block >}}

Vous devriez voir les CRDs Datadog créés et le pod `datadog-operator` en cours d'exécution.

Vérifiez que l'Agent Datadog est déployé :

{{< code-block lang="bash" >}}
kubectl get datadogagent -n datadog
{{< /code-block >}}

Vous devriez voir la ressource personnalisée DatadogAgent créée dans l'état `Running`. Vérifiez également que l'Agent Datadog et les pods `datadog-cluster-agent` sont en cours d'exécution :

{{< code-block lang="bash" >}}
kubectl get pods -n datadog
{{< /code-block >}}

Vérifiez l'état de DatadogPodAutoscaler :

{{< code-block lang="bash" >}}
kubectl get datadogpodautoscaler -n nginx-dka-demo
kubectl describe datadogpodautoscaler nginx -n nginx-dka-demo
{{< /code-block >}}

Félicitations, vous avez une charge de travail gérée par le Datadog Kubernetes Autoscaler utilisant GitOps !

## Nettoyage{#cleanup}

Pour supprimer toutes les ressources, supprimez l'application racine. Cela cascade la suppression à toutes les applications enfants :

{{< code-block lang="bash" >}}
kubectl delete application dka-root -n argocd
{{< /code-block >}}

Alternativement, supprimez les applications individuellement dans l'ordre inverse :

{{< code-block lang="bash" >}}
kubectl delete application nginx-dka-demo -n argocd
kubectl delete application datadog-agent -n argocd
kubectl delete application datadog-operator -n argocd
{{< /code-block >}}

Supprimez le secret Datadog :

{{< code-block lang="bash" >}}
kubectl delete secret datadog-secret -n datadog
{{< /code-block >}}

## Dépannage{#troubleshooting}

### Échecs de synchronisation ArgoCD {#argocd-sync-failures}

Vérifiez l'état de l'application et les erreurs de synchronisation :

{{< code-block lang="bash" >}}
kubectl describe application datadog-operator -n argocd
kubectl describe application datadog-agent -n argocd
kubectl describe application nginx-dka-demo -n argocd
{{< /code-block >}}

Consultez les journaux du contrôleur d'application ArgoCD :

{{< code-block lang="bash" >}}
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller
{{< /code-block >}}

### Problèmes de disponibilité des CRD{#crd-availability-issues}

Si ArgoCD échoue à se synchroniser parce que les CRD ne sont pas reconnus, vérifiez que l'Opérateur Datadog a été déployé avec succès dans la vague 0 :

{{< code-block lang="bash" >}}
kubectl get crd | grep datadoghq
kubectl get pods -n datadog
{{< /code-block >}}

Les annotations de vague de synchronisation garantissent un ordre approprié, mais vous pouvez actualiser manuellement l'application :

{{< code-block lang="bash" >}}
argocd app sync datadog-agent
{{< /code-block >}}

### Problèmes de configuration du secret {#secret-configuration-problems}

Vérifiez que le secret Datadog existe et contient les bonnes clés :

{{< code-block lang="bash" >}}
kubectl get secret datadog-secret -n datadog
kubectl describe secret datadog-secret -n datadog
{{< /code-block >}}

Le secret doit contenir les champs `api-key` et `app-key`.

### Événements DatadogPodAutoscaler{#datadogpodautoscaler-events}

Vérifiez les événements DatadogPodAutoscaler pour les décisions de mise à l'échelle et les erreurs :

{{< code-block lang="bash" >}}
kubectl get events -n nginx-dka-demo --sort-by='.lastTimestamp'
{{< /code-block >}}

### La charge de travail autoscalée continue de revenir en arrière{#autoscaled-workload-keeps-reverting}

Avec `selfHeal: true` activé, ArgoCD se synchronise environ toutes les 3 minutes. Si les annotations `spec.replicas` ou `autoscaling.datadoghq.com/` sur la charge de travail autoscalée sont réinitialisées de manière répétée, vérifiez l'un des éléments suivants :

1. **`RespectIgnoreDifferences=true` est absent** de l'`syncOptions` de l'application. Sans ce flag, ArgoCD ne fait que masquer la dérive dans l'interface utilisateur, tout en écrasant les champs lors de l'application.
2. **L'entrée `ignoreDifferences` ne correspond pas à la charge de travail.** Vérifiez que `group`, `kind`, `name` et `namespace` dans l'entrée correspondent exactement à la charge de travail cible.
3. **`ServerSideApply=true` n'est pas défini** lors de l'utilisation de `managedFieldsManagers`. Sans l'application côté serveur, Kubernetes ne remplit pas la base de données de propriété des champs, donc le nom du gestionnaire ne peut pas être associé.

Pour confirmer si l'application côté serveur est active et quel gestionnaire possède un champ donné, exécutez :

{{< code-block lang="bash" >}}
kubectl get deployment <name> -n <namespace> -o yaml --show-managed-fields
{{< /code-block >}}

Recherchez une entrée où `manager: datadog-cluster-agent` et `operation: Apply`. Si aucune entrée de ce type n'existe, l'application côté serveur n'est pas active pour cette ressource.

### Logs de l'Agent de Cluster{#cluster-agent-logs}

Vérifiez les logs de l'Agent de Cluster pour des messages liés à l'autoscaling :

{{< code-block lang="bash" >}}
kubectl logs -n datadog -l agent.datadoghq.com/component=cluster-agent
{{< /code-block >}}

## Lectures complémentaires{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/containers/monitoring/autoscaling/
[2]: /fr/containers/monitoring/autoscaling/#cluster-profiles