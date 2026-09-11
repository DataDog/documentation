---
description: Despliega y gestiona recursos personalizados de DatadogPodAutoscaler
  para el escalado automático de Kubernetes utilizando ArgoCD y GitOps
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-autoscaling-datadog/
  tag: Blog
  text: 'Guía de escalado automático de Kubernetes: determina qué solución es adecuada
    para tu caso de uso'
- link: https://docs.datadoghq.com/containers/monitoring/autoscaling/
  tag: Documentación
  text: Datadog Kubernetes Autoscaling
- link: https://docs.datadoghq.com/agent/cluster_agent/
  tag: Documentación
  text: Datadog Cluster Agent
- link: https://argo-cd.readthedocs.io/
  tag: Sitio externo
  text: Documentación de ArgoCD
- link: https://argo-cd.readthedocs.io/en/stable/user-guide/sync-waves/
  tag: Sitio externo
  text: Olas de sincronización de ArgoCD
- link: https://argo-cd.readthedocs.io/en/stable/user-guide/diffing/
  tag: Sitio externo
  text: Personalización de diferencias de ArgoCD
- link: https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/
  tag: Sitio externo
  text: Opciones de sincronización de ArgoCD
title: Gestionando DatadogPodAutoscaler con ArgoCD
---
## Resumen {#overview}

El DatadogPodAutoscaler (DPA) es una definición de recurso personalizado (CRD) de Kubernetes que permite el escalado automático de cargas de trabajo de Kubernetes utilizando [Datadog Kubernetes Autoscaling (DKA)][1]. Esta guía demuestra cómo gestionar recursos de DatadogPodAutoscaler utilizando ArgoCD y principios de GitOps para desplegar una configuración de escalado automático.

ArgoCD es una herramienta de entrega continua declarativa de GitOps para Kubernetes. Monitorea repositorios de Git que contienen manifiestos de Kubernetes y mantiene su clúster sincronizado con el estado deseado definido en Git. Este enfoque proporciona control de versiones, auditorías y despliegue automatizado de su infraestructura de escalado automático.

**Activando el escalado automático a gran escala:** Para implementar el escalado automático en muchas cargas de trabajo o espacios de nombres con una política compartida, etiquete las cargas de trabajo o espacios de nombres con `autoscaling.datadoghq.com/profile` en lugar de crear uno `DatadogPodAutoscaler` por carga de trabajo. Consulta [Perfiles de clúster][2] en la visión general del escalado automático de Kubernetes.

## Requisitos previos {#prerequisites}

Antes de comenzar, asegúrese de tener lo siguiente:

- **Clúster de Kubernetes**: Un clúster de Kubernetes en funcionamiento (1.20 o posterior) con acceso utilizando `kubectl`
- **ArgoCD instalado**: ArgoCD desplegado en su clúster y accesible a través de CLI o UI
- **Credenciales de API de Datadog**: Clave de API de Datadog válida y clave de aplicación
- **Git repository**: Un repositorio de Git para almacenar sus manifiestos

## Estructura del proyecto {#project-structure}

Esta guía utiliza el patrón de App of Apps con ondas de sincronización de ArgoCD para asegurar la creación adecuada de dependencias y el orden de despliegue.

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

## Etapas de despliegue {#deployment-stages}

Un enfoque de despliegue en múltiples etapas es esencial al trabajar con definiciones de recursos personalizados de Kubernetes (CRDs) y ArgoCD. Este enfoque ordenado es necesario para asegurar que cree e instale las dependencias requeridas para cada etapa en el proceso.

Las CRDs de Kubernetes deben ser instaladas en el clúster antes de que puedas crear recursos personalizados que las utilicen. La CRD DatadogPodAutoscaler se crea cuando instala el Datadog Operator en la Etapa 1. ArgoCD necesita que estas CRDs estén presentes antes de que pueda sincronizar con éxito los recursos que dependen de ellas.

ArgoCD utiliza **ondas de sincronización** para controlar el orden de despliegue a través de anotaciones. Las ondas de sincronización se ejecutan en orden ascendente (números más bajos primero), y ArgoCD espera que todos los recursos en una onda estén saludables antes de proceder a la siguiente onda.

1. **Etapa 1 (Onda 0)**: Datadog Operator utilizando Helm (crea CRDs)
2. **Etapa 2 (Onda 1)**: Datadog Agent configurado para Datadog Kubernetes Autoscaling
   - Recurso personalizado DatadogAgent con requisitos de escalado automático habilitados
3. **Etapa 3 (Onda 2)**: Carga de trabajo de aplicación con DatadogPodAutoscaler
   - Despliegue de NGINX en el espacio de nombres de demostración
   - Recurso DatadogPodAutoscaler para el escalado automático del despliegue de NGINX

## Configure los archivos de configuración {#set-up-configuration-files}

Primero, cree un repositorio de Git. Necesita actualizar todas las referencias `repoURL` en los manifiestos de la aplicación ArgoCD para que apunten a su repositorio, ya que ArgoCD obtiene los manifiestos de Git.

Configure los siguientes archivos de configuración para cada etapa del proceso.

### Etapa 1: Aplicación raíz (App de Apps) {#stage-1-root-application-app-of-apps}

La aplicación raíz es el controlador App de Apps que gestiona todas las aplicaciones secundarias.

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

### Etapa 2: Aplicación de Datadog Operator {#stage-2-datadog-operator-application}

Esta aplicación de ArgoCD despliega Datadog Operator utilizando Helm, que crea los CRDs necesarios.

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

### Etapa 3: Aplicación de Datadog Agent {#stage-3-datadog-agent-application}

Esta aplicación de ArgoCD despliega el recurso personalizado DatadogAgent.

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

Cree el manifiesto del recurso personalizado DatadogAgent:

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

### Etapa 4: Aplicación de NGINX con DatadogPodAutoscaler {#stage-4-nginx-application-with-datadogpodautoscaler}

Esta aplicación de ArgoCD despliega una carga de trabajo de NGINX con un DatadogPodAutoscaler utilizando un gráfico de Helm.

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

La entrada `ignoreDifferences` se empareja con `RespectIgnoreDifferences=true` para instruir a ArgoCD a no revertir los cambios que el Datadog Cluster Agent aplica a la carga de trabajo escalada automáticamente. El formulario `managedFieldsManagers` aprovecha la propiedad de campo de aplicación del lado del servidor de Kubernetes, por lo que cualquier campo que el Datadog Cluster Agent posea (réplicas, anotaciones bajo `autoscaling.datadoghq.com/`, recursos de contenedor) se preserva automáticamente. Consulta [Permitir que el Datadog Cluster Agent actualice las cargas de trabajo escaladas automáticamente](#allow-the-datadog-cluster-agent-to-update-autoscaled-workloads) para la justificación completa y la alternativa de configuración global.

Cree el gráfico de Helm para la aplicación de NGINX:

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

## Permitir que el Datadog Cluster Agent actualice las cargas de trabajo con escalado automático {#allow-the-datadog-cluster-agent-to-update-autoscaled-workloads}

Cuando `applyPolicy.mode: Apply` está configurado en un `DatadogPodAutoscaler`, el Datadog Cluster Agent muta la carga de trabajo objetivo directamente. Actualiza `spec.replicas`, recursos de contenedor, y escribe anotaciones bajo el prefijo `autoscaling.datadoghq.com/` para rastrear sus recomendaciones y estado aplicado. Sin configuración adicional de ArgoCD, ArgoCD interpreta estas mutaciones como desviaciones y, con `selfHeal: true` habilitado, las revierte en cada sincronización. Esto causa un conflicto entre ArgoCD y el escalador automático.

Hay dos opciones disponibles para prevenir este conflicto:

- **Por aplicación:** Agregue `ignoreDifferences` y `RespectIgnoreDifferences=true` a cada `Application` de ArgoCD que contenga una carga de trabajo con escalado automático. Esto se muestra en [Etapa 4](#stage-4-nginx-application-with-datadogpodautoscaler) arriba.
- **Global:** Configure `argocd-cm` una vez para que la regla `ignoreDifferences` se aplique a cada aplicación en la instancia.

### Tipos de carga de trabajo objetivo admitidos {#supported-target-workload-kinds}

La configuración `ignoreDifferences` debe cubrir cada tipo de carga de trabajo que un `DatadogPodAutoscaler` puede apuntar a través de `spec.targetRef`:

| Tipo de carga de trabajo | Grupo de API | Nota |
|---|---|---|
| `Deployment` | `apps` | |
| `StatefulSet` | `apps` | |
| `Rollout` | `argoproj.io` | Aplica solo si también ejecuta Argo Rollouts |

### Configuración por aplicación {#per-application-configuration}

Elija una de las siguientes variantes dependiendo de si la aplicación del lado del servidor está activa en su clúster.

#### Variante 1: `managedFieldsManagers` (recomendada) {#variant-1-managedfieldsmanagers-recommended}

El enfoque `managedFieldsManagers` cubre cada campo que posee el Datadog Cluster Agent (`spec.replicas`, recursos de contenedor y todas las anotaciones) sin enumerarlos individualmente.

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

Este es el enfoque utilizado en el ejemplo de la etapa 4 arriba. Incluya solo las entradas `kind` para los tipos de carga de trabajo presentes en cada aplicación.

#### Variante 2: `jqPathExpressions` (funciona con la aplicación del lado del cliente) {#variant-2-jqpathexpressions-works-with-client-side-apply}

El enfoque `jqPathExpressions` apunta explícitamente solo a las anotaciones que comienzan con `autoscaling.datadoghq.com/`, haciéndolo compatible con la aplicación del lado del cliente. Utilice esta variante si `ServerSideApply=true` no está disponible en su entorno.

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

**Limitación:** esta variante solo cubre `autoscaling.datadoghq.com/` anotaciones. Si el escalador automático también muta `spec.replicas` o solicitudes de recursos de contenedor, agregue entradas `jqPathExpressions` separadas para esos campos. La Variante 1 (`managedFieldsManagers`) evita esta brecha al cubrir automáticamente todos los campos que posee el Datadog Cluster Agent.

### Configuración global {#global-configuration}

Para aplicar `ignoreDifferences` una vez en todas las Aplicaciones en una instancia de ArgoCD, configura el ConfigMap `argocd-cm` utilizando las claves `resource.customizations.ignoreDifferences.<group>_<kind>`.

#### ConfigMap (instalaciones de kubectl o Kustomize) {#configmap-kubectl-or-kustomize-installs}

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

#### Valores del gráfico de Helm de ArgoCD {#argocd-helm-chart-values}

Para los usuarios que implementan ArgoCD con el gráfico de Helm oficial `argo/argo-cd`, agregue las mismas claves bajo `configs.cm`:

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

Aplique los valores con:

{{< code-block lang="bash" >}}
helm upgrade --install argocd argo/argo-cd -f values.yaml -n argocd
{{< /code-block >}}

#### Importante: `RespectIgnoreDifferences` sigue siendo requerido por aplicación {#important-respectignoredifferences-is-still-required-per-application}

<div class="alert alert-warning">
Global <code>ignoreDifferences</code> la configuración solo suprime la visualización de diferencias en la interfaz de usuario de ArgoCD. No impide que ArgoCD sobrescriba esos campos durante una sincronización. Cada aplicación que contenga una carga de trabajo autoescalada también debe establecer <strong><code>RespectIgnoreDifferences=true</code> en su <code>syncOptions</code></strong>. No hay un equivalente global para esta opción de sincronización.
</div>

Para evitar establecer `RespectIgnoreDifferences=true` en cada aplicación individualmente, defínelo a nivel de `AppProject` para que todas las aplicaciones en el proyecto lo hereden:

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

Alternativamente, utiliza una plantilla de `ApplicationSet` para agregar la opción de sincronización a todas las aplicaciones generadas automáticamente.

### ¿Qué opción usar {#which-option-to-use}

- **Pocas cargas de trabajo autoescaladas**: usa [configuración por aplicación](#per-application-configuration) La configuración permanece colocada junto con la carga de trabajo.
- **Muchas cargas de trabajo o estandarización en todo ArgoCD**: use [configuración global](#global-configuration) combinada con una configuración a nivel de proyecto o a nivel de `ApplicationSet``RespectIgnoreDifferences=true`
- **Entornos mixtos (no todas las cargas de trabajo están autoescaladas)**: la configuración global es segura para aplicar en toda la instancia. La regla `managedFieldsManagers` no tiene efecto para las cargas de trabajo que no tienen propiedad de campo del Datadog Cluster Agent.

## Instrucciones de implementación {#deployment-instructions}

Después de haber configurado los [archivos de configuración](#set-up-configuration-files) y haberlos enviado a su repositorio de Git, siga estos pasos para implementar los componentes utilizando ArgoCD.

### Cree secreto de Datadog {#create-datadog-secret}

Cree un secreto de Kubernetes con sus claves de API y de aplicación de Datadog en el espacio de nombres `datadog`:

{{< code-block lang="bash" >}}
kubectl create namespace datadog
kubectl create secret generic datadog-secret \
  --from-literal=api-key=YOUR_API_KEY \
  --from-literal=app-key=YOUR_APP_KEY \
  -n datadog
{{< /code-block >}}

### Implemente la aplicación raíz {#deploy-root-application}

Implemente la aplicación raíz, que gestiona todas las aplicaciones secundarias utilizando el patrón de Aplicación de Aplicaciones:

{{< code-block lang="bash" >}}
kubectl apply -f argocd/root-app.yaml
{{< /code-block >}}

ArgoCD ahora monitorea su repositorio de Git y despliega automáticamente todas las aplicaciones en el orden correcto basado en las olas de sincronización.

### Habilite autoescalado en el clúster en Datadog {#enable-autoscaling-on-the-cluster-in-datadog}

Navegue a la [página de configuración de autoescalado](https://app.datadoghq.com/orchestration/scaling/settings) en la interfaz de usuario de Datadog para habilitar el autoescalado para el clúster.

### Verifique la progresión de la ola de sincronización {#verify-sync-wave-progression}

Observe cómo las aplicaciones de ArgoCD se sincronizan en orden:

{{< code-block lang="bash" >}}
kubectl get applications -n argocd
{{< /code-block >}}

Deberá ver todas las aplicaciones aparecer y sincronizarse en orden de ola: `datadog-operator` (ola 0), luego `datadog-agent` (ola 1) y `nginx-dka-demo` (ola 2).

### Valide el despliegue {#validate-deployment}

Verifique que el Datadog Operator y los CRDs estén desplegados:

{{< code-block lang="bash" >}}
kubectl get crd | grep datadoghq
kubectl get pods -n datadog
{{< /code-block >}}

Deberá ver los CRDs de Datadog creados y el pod `datadog-operator` en ejecución.

Verifique que el Datadog Agent esté desplegado:

{{< code-block lang="bash" >}}
kubectl get datadogagent -n datadog
{{< /code-block >}}

Deberá ver el recurso personalizado DatadogAgent creado en el estado `Running`. También verifique que el Datadog Agent y los pods `datadog-cluster-agent` estén en ejecución:

{{< code-block lang="bash" >}}
kubectl get pods -n datadog
{{< /code-block >}}

Revise el estado del DatadogPodAutoscaler:

{{< code-block lang="bash" >}}
kubectl get datadogpodautoscaler -n nginx-dka-demo
kubectl describe datadogpodautoscaler nginx -n nginx-dka-demo
{{< /code-block >}}

¡Felicidades, tiene una carga de trabajo gestionada por el Datadog Kubernetes Autoscaler utilizando GitOps!

## Limpie {#cleanup}

Para eliminar todos los recursos, elimine la aplicación raíz. Esto provoca la eliminación en cascada de todas las aplicaciones hijas:

{{< code-block lang="bash" >}}
kubectl delete application dka-root -n argocd
{{< /code-block >}}

Alternativamente, elimine las aplicaciones individualmente en orden inverso:

{{< code-block lang="bash" >}}
kubectl delete application nginx-dka-demo -n argocd
kubectl delete application datadog-agent -n argocd
kubectl delete application datadog-operator -n argocd
{{< /code-block >}}

Elimine el secreto de Datadog:

{{< code-block lang="bash" >}}
kubectl delete secret datadog-secret -n datadog
{{< /code-block >}}

## Solución de problemas {#troubleshooting}

### Fallos de sincronización de ArgoCD {#argocd-sync-failures}

Revise el estado de la aplicación y los errores de sincronización:

{{< code-block lang="bash" >}}
kubectl describe application datadog-operator -n argocd
kubectl describe application datadog-agent -n argocd
kubectl describe application nginx-dka-demo -n argocd
{{< /code-block >}}

Revise los registros del Application Controller de ArgoCD:

{{< code-block lang="bash" >}}
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller
{{< /code-block >}}

### Problemas de disponibilidad de CRD {#crd-availability-issues}

Si ArgoCD no puede sincronizar porque los CRDs no son reconocidos, verifique que el Datadog Operator se haya desplegado correctamente en la ola 0:

{{< code-block lang="bash" >}}
kubectl get crd | grep datadoghq
kubectl get pods -n datadog
{{< /code-block >}}

Las anotaciones de la ola de sincronización aseguran un orden adecuado, pero puede actualizar manualmente la aplicación:

{{< code-block lang="bash" >}}
argocd app sync datadog-agent
{{< /code-block >}}

### Problemas de configuración del secreto {#secret-configuration-problems}

Verifique que el secreto de Datadog exista y contenga las claves correctas:

{{< code-block lang="bash" >}}
kubectl get secret datadog-secret -n datadog
kubectl describe secret datadog-secret -n datadog
{{< /code-block >}}

El secreto debe contener los campos `api-key` y `app-key`.

### Eventos de DatadogPodAutoscaler {#datadogpodautoscaler-events}

Revise los eventos de DatadogPodAutoscaler para decisiones de escalado y errores:

{{< code-block lang="bash" >}}
kubectl get events -n nginx-dka-demo --sort-by='.lastTimestamp'
{{< /code-block >}}

### La carga de trabajo autoescalada sigue revirtiendo {#autoscaled-workload-keeps-reverting}

Con `selfHeal: true` habilitado, ArgoCD sincroniza aproximadamente cada 3 minutos. Si las anotaciones `spec.replicas` o `autoscaling.datadoghq.com/` en la carga de trabajo autoescalada se restablecen repetidamente, verifique uno de los siguientes:

1. **`RespectIgnoreDifferences=true` está ausente** en el `syncOptions` de la aplicación. Sin esta bandera, ArgoCD solo oculta la desviación en la interfaz de usuario pero aún sobrescribe los campos durante la aplicación.
2. **La entrada `ignoreDifferences` no coincide con la carga de trabajo.** Verifique que `group`, `kind`, `name` y `namespace` en la entrada coincidan exactamente con la carga de trabajo objetivo.
3. **`ServerSideApply=true` no está configurado** al usar `managedFieldsManagers`. Sin la aplicación del lado del servidor, Kubernetes no llena la base de datos de propiedad de campo, por lo que no se puede hacer coincidir el nombre del administrador.

Para confirmar si la aplicación del lado del servidor está activa y qué administrador posee un campo dado, ejecute:

{{< code-block lang="bash" >}}
kubectl get deployment <name> -n <namespace> -o yaml --show-managed-fields
{{< /code-block >}}

Busque una entrada donde `manager: datadog-cluster-agent` y `operation: Apply`. Si no existe tal entrada, la aplicación del lado del servidor no está activa para ese recurso.

### Registros del Cluster Agent{#cluster-agent-logs}

Revise los registros del Cluster Agent en busca de mensajes relacionados con el autoescalado:

{{< code-block lang="bash" >}}
kubectl logs -n datadog -l agent.datadoghq.com/component=cluster-agent
{{< /code-block >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/monitoring/autoscaling/
[2]: /es/containers/monitoring/autoscaling/#cluster-profiles