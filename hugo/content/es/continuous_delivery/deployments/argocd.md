---
description: Aprenda a hacer un seguimiento de las implementaciones desde Argo CD
  en Datadog CD Visibility.
further_reading:
- link: /continuous_delivery/deployments
  tag: Documentación
  text: Aprenda sobre Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentación
  text: Aprenda a consultar y visualizar ejecuciones de implementación
is_beta: true
title: Hacer un seguimiento de las implementaciones de Argo CD
---
{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="¡Únase a la vista previa!" >}}
CD Visibility para Argo CD está en versión preliminar. Si le interesa esta función, complete el formulario para solicitar acceso.
{{< /callout >}}

## Descripción general {#overview}

[Argo CD][1] es una herramienta de entrega continua (CD) GitOps declarativa para Kubernetes. Sigue el patrón GitOps mediante el uso de repositorios Git para definir el estado deseado de la aplicación y automatiza la implementación de aplicaciones en entornos de destino especificados.

Datadog CD Visibility se integra con Argo CD mediante el uso de [Argo CD Notifications][2]. Argo CD Notifications consta de dos componentes principales:
1. [Disparadores][3], que definen _cuándo_ enviar una notificación.
2. [Plantillas][4], que definen _qué_ enviar en una notificación.

## Configuración mínima {#minimal-setup}

La configuración a continuación utiliza el [servicio de webhook de notificaciones][5] de Argo CD para enviar notificaciones a Datadog.

Primero, agregue su [Clave de Datadog API][11] en el secreto `argocd-notifications-secret` con la clave `dd-api-key`. Consulte [la guía de Argo CD][2] para obtener información sobre cómo modificar el `argocd-notifications-secret`.

Elija uno de los siguientes métodos de configuración según cómo haya instalado Argo CD:

- **Configuración regular (kubectl apply)**: Para instalaciones estándar de Argo CD que utilizan `kubectl apply`
- **Helm**: Para implementaciones de Argo CD basadas en Helm

### Configuración regular (kubectl apply) {#regular-setup-kubectl-apply}

Modifique el ConfigMap `argocd-notifications-cm` para crear el servicio de notificaciones, la plantilla y el disparador para enviar notificaciones a Datadog:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  service.webhook.cd-visibility-webhook: |
    url: https://webhook-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/webhook
    headers:
    - name: "DD-CD-PROVIDER-ARGOCD"
      value: "true"
    - name: "DD-API-KEY"
      value: $dd-api-key
    - name: "Content-Type"
      value: "application/json"
  template.cd-visibility-template: |
    webhook:
      cd-visibility-webhook:
        method: POST
        body: |
            {
              "app": {{toJson .app}},
              "context": {{toJson .context}},
              "service_type": {{toJson .serviceType}},
              "recipient": {{toJson .recipient}},
              "commit_metadata": {{toJson (call .repo.GetCommitMetadata .app.status.operationState.syncResult.revision)}}
            }
  trigger.cd-visibility-trigger: |
    - when: app.status.operationState.phase in ['Succeeded', 'Failed', 'Error'] and app.status.health.status in ['Healthy', 'Degraded']
      send: [cd-visibility-template]
    - when: app.status.operationState.phase == 'Running' and app.status.health.status in ['Healthy', 'Degraded']
      send: [cd-visibility-template]
```

### Configuración de Helm {#helm-setup}

Si utilizó Helm para instalar Argo CD, agregue la siguiente configuración a su `values.yaml`:

```yaml
notifications:
  notifiers:
    service.webhook.cd-visibility-webhook: |
      url: https://webhook-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/webhook
      headers:
        - name: "DD-CD-PROVIDER-ARGOCD"
          value: "true"
        - name: "Content-Type"
          value: "application/json"
        - name: "DD-API-KEY"
          value: $dd-api-key
  templates:
    template.cd-visibility-template: |
      webhook:
        cd-visibility-webhook:
          method: POST
          body: |
            {
              "app": {{toJson .app}},
              "context": {{toJson .context}},
              "service_type": {{toJson .serviceType}},
              "recipient": {{toJson .recipient}},
              "commit_metadata": {{toJson (call .repo.GetCommitMetadata .app.status.operationState.syncResult.revision)}}
            }
  triggers:
    trigger.cd-visibility-trigger: |
      - when: app.status.operationState.phase in ['Succeeded', 'Failed', 'Error'] and app.status.health.status in ['Healthy', 'Degraded']
        send: [cd-visibility-template]
      - when: app.status.operationState.phase == 'Running' and app.status.health.status in ['Healthy', 'Degraded']
        send: [cd-visibility-template]
```

### Resumen de configuración {#configuration-summary}

Se han agregado los siguientes recursos:
1. El servicio `cd-visibility-webhook` apunta a la ingesta de Datadog y configura los encabezados correctos para la solicitud. El encabezado `DD-API-KEY` hace referencia a la entrada `dd-api-key` agregada anteriormente en el `argocd-notifications-secret`.
2. El `cd-visibility-template` define qué enviar en la solicitud para el servicio `cd-visibility-webhook`.
3. El `cd-visibility-trigger` define cuándo enviar la notificación y hace referencia al `cd-visibility-template`.

El campo `commit_metadata` es opcional y se puede utilizar para enriquecer la implementación con información de Git. Debe eliminarse (junto con la coma en la línea anterior) en los siguientes casos:
- Ya está sincronizando la información de su repositorio con Datadog (consulte [Sincronizar metadatos del repositorio con Datadog][20]).
- La fuente de su aplicación de Argo CD no tiene un SHA de confirmación definido (por ejemplo, si está utilizando repositorios de Helm).

Después de agregar el servicio de notificación, el activador y la plantilla al mapa de configuración, puede suscribir cualquiera de sus aplicaciones de Argo CD a la integración.
Modifique las anotaciones de la aplicación de Argo CD utilizando la interfaz de usuario de Argo CD o modificando la definición de la aplicación con las siguientes anotaciones:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_service: <YOUR_SERVICE>
    dd_customtags: "region:us1-east, team:backend"
```

Del fragmento anterior:
1. La anotación de notificaciones suscribe la aplicación de Argo CD a la configuración de notificaciones creada anteriormente. Consulte la [guía oficial de Argo CD][12] para obtener más detalles sobre las suscripciones de aplicaciones.
2. Puede utilizar la anotación `dd_env` para configurar el entorno de la aplicación. Reemplace `YOUR_ENV` arriba con el entorno
   al cual esta aplicación se está implementando (por ejemplo: `staging` o `prod`). Si no establece esta anotación,
   El entorno tiene como valor predeterminado `none`.
3. Puede usar la anotación `dd_service` para configurar el servicio de la aplicación. Reemplace `YOUR_SERVICE` arriba con el servicio
   que la aplicación de Argo CD está implementando (por ejemplo: `transaction-service`). Cuando se usa esta anotación, el nombre del servicio se agrega a todas las ejecuciones de implementación generadas a partir de la aplicación.
   El nombre del servicio se agrega a todas las ejecuciones de implementación generadas a partir de la aplicación. Además, si su servicio está
   registrado en [Catalog][13], el nombre del equipo también se agrega a todas las ejecuciones de implementación. Si su aplicación de Argo CD
   Si su aplicación de Argo CD está configurada para implementar más de un servicio, consulte [Etiquetar una aplicación de Argo CD que implementa múltiples servicios](#tag-an-argo-cd-application-deploying-multiple-services).
4. Puede usar la anotación `dd_customtags` para agregar opcionalmente etiquetas personalizadas a las ejecuciones de implementación generadas para esta aplicación de Argo CD.
   El valor debe establecerse como una lista de etiquetas separadas por comas, estructuradas como pares `key:value`.

Después de haber suscrito su aplicación de Argo CD agregando las anotaciones anteriores, las nuevas implementaciones de la aplicación comenzarán a aparecer en Datadog.

La sección [Configuración recomendada](#recommended-setup) a continuación contiene acciones recomendadas para mejorar el monitoreo reportado en CD Visibility.

## Configuración recomendada {#recommended-setup}

### Cambie la duración de espera para que los recursos alcancen un estado saludable {#change-duration-to-wait-for-resources-health}
La duración reportada en los eventos de implementación coincide con la duración de sincronización en Argo CD. Sin embargo, la duración de la sincronización generalmente representa el tiempo que dedica Argo CD a sincronizar el estado del repositorio de Git y el estado del clúster de Kubernetes.
Esto significa que lo que sucede después de la sincronización (por ejemplo, el tiempo que tardan los recursos de Kubernetes en iniciarse) no se incluye en la duración.

Para cambiar la duración reportada de espera hasta que los recursos configurados se hayan iniciado y alcanzado un estado saludable, agregue un nuevo recurso no operativo monitoreado por su aplicación de Argo CD, con una anotación [PostSync Hook][19].
El PostSync Hook se ejecutará después de que todos los recursos hayan alcanzado un estado Healthy, y la sincronización de Argo CD esperará el resultado del PostSync Hook para actualizar el estado de la aplicación como Healthy.

A continuación se representa un ejemplo de un PostSync Hook Job que ejecuta un comando `echo` simple.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: cdvisibility-postsync-job # Ensures that the Argo CD sync duration waits for resources health
  annotations:
    argocd.argoproj.io/hook: PostSync
    argocd.argoproj.io/hook-delete-policy: HookSucceeded
spec:
  template:
    spec:
      containers:
        - name: noop-echo
          image: alpine:latest
          command: ["echo", "all the sync resources have reached a healthy state"]
      restartPolicy: Never
  backoffLimit: 0
```

### Correlacione implementaciones con canalizaciones de CI {#correlate-deployments-with-ci-pipelines}

De forma predeterminada, los metadatos de Git informados en los eventos de implementación están asociados con el repositorio que monitorea Argo CD. Sin embargo, una configuración común es:
- Tener un repositorio de aplicaciones, que almacena el código fuente, y un repositorio de configuración, que almacena los manifiestos de Kubernetes. Luego, configure Argo CD para monitorear el repositorio de configuración, como se describe en la [página de mejores prácticas de Argo CD][17].
- Cuando ocurre un cambio en el repositorio de la aplicación, realice una confirmación automatizada que actualice el repositorio de configuración (por ejemplo, cambiando la imagen actual de un recurso de Kubernetes).

El siguiente diagrama representa un ejemplo de este tipo de configuración:

{{< img src="ci/diagram_argo-cd-deployment_240910.png" alt="Activación de implementaciones de Argo CD mediante git" style="width:100%;">}}

<div class="alert alert-info">La correlación de imágenes requiere Argo CD v3.1.0 o posterior.</div>

El [`datadog-ci deployment correlate-image` comando][14] se puede utilizar para correlacionar una imagen con una confirmación del repositorio de la aplicación. Cuando ocurre una implementación de Argo CD, la información de confirmación de configuración en el evento de implementación se reemplaza con la confirmación del repositorio de la aplicación relacionada obtenida al observar las imágenes implementadas, si las hay.

Para habilitar esta correlación, también debe agregar la anotación `dd_k8s_cluster` a su aplicación de Argo CD, especificando el nombre del clúster de Kubernetes en el que se implementa la aplicación. El nombre debe coincidir con el nombre informado en el [producto de Kubernetes de Datadog][16]. El nombre de la imagen también debe contener el nombre del servicio con el que se relaciona. Esto nos ayuda a descartar imágenes irrelevantes en una implementación.

Aquí hay un ejemplo de cómo puede ejecutar el comando al generar la imagen que luego será implementada por Argo CD:

```yaml
 steps:
    - name: Correlate image with Datadog
      shell: bash
      run: |
        echo "Correlating image: ${{ inputs.image-name }} with Datadog"
        datadog-ci deployment correlate-image --image ${{ inputs.image-name }} --repository-url ${{ inputs.repository-url }} --commit-sha ${{ inputs.commit-sha }}
        echo "Successfully correlated ${{ inputs.image-name }} with Datadog"
```


Este comando correlaciona imágenes de recursos de implementación. Cuando Datadog recibe una implementación, si hay varias imágenes presentes y más de una de las imágenes está correlacionada, Datadog toma la imagen que contiene el nombre del servicio. La correlación solo funciona para recursos de implementación.



#### Validación {#validation}

Si el comando se ha ejecutado correctamente, las implementaciones contienen metadatos de Git del repositorio de la aplicación en lugar del repositorio de configuración. Además, la vista de ejecuciones de implementación ahora contiene una nueva pestaña {{< ui >}}Pipeline{{< /ui >}} que representa la traza de la canalización de CI relacionada.

## Etiquete una aplicación de Argo CD que despliegue múltiples servicios {#tag-an-argo-cd-application-deploying-multiple-services}

Si su aplicación de Argo CD despliega más de un servicio, Datadog puede inferir automáticamente los servicios desplegados a partir de una sincronización de la aplicación. Datadog infiere los servicios según los recursos de Kubernetes que se modificaron.

<div class="alert alert-danger">
La detección automática de servicios no es compatible cuando se utiliza <a href="https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#server-side-apply">Server-Side Apply</a>.
</div>

Para habilitar el etiquetado automático de servicios, debe [hacer un seguimiento de su infraestructura de Kubernetes usando el Datadog Agent][15] y sus recursos de Kubernetes deben tener las siguientes etiquetas:
- `tags.datadoghq.com/service` (obligatorio): especifica el servicio de Datadog de este recurso. Para obtener más información, consulte [Unified Service Tagging][18].
- `team` (opcional): especifica el equipo de Datadog de este recurso. Si se omite esta etiqueta, el equipo se recupera automáticamente de [Catalog][13] según la etiqueta del servicio.

Solo los recursos de Kubernetes con los siguientes tipos son elegibles: `Deployment`, `Rollout`, `ReplicaSet`, `StatefulSet`, `Service`, `DaemonSet`, `Pod`, `Job` y `CronJob`.

Agregue las siguientes anotaciones a su aplicación de Argo CD:
- `dd_multiservice`: `true`. Esta anotación especifica si Datadog infiere automáticamente los servicios desplegados en una sincronización según los recursos de Kubernetes modificados.
- `dd_k8s_cluster`: establézcalo en el nombre del clúster de Kubernetes en el que se despliega la aplicación de Argo CD. El nombre debe coincidir con el nombre informado en el [producto de Kubernetes de Datadog][16].

Por ejemplo:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_multiservice: true
    dd_k8s_cluster: example-cluster
```

## Visualice los despliegues en Datadog {#visualize-deployments-in-datadog}

Las páginas [**Deployments**][6] y [**Executions**][7] se completan con datos después de que una implementación ha finalizado. Para obtener más información, consulte [Explore CD Visibility Deployments][10].

## Solución de problemas {#troubleshooting}

Si no se envían las notificaciones, examine los registros del pod `argocd-notification-controller`. El controlador registra cuándo está enviando una notificación (por ejemplo: `Sending notification ...`) y cuándo no logra notificar a un destinatario.
(por ejemplo: `Failed to notify recipient ...`). Para escenarios de solución de problemas adicionales, consulte la [documentación oficial de Argo CD][8].

### Discrepancias de estado entre Argo CD y Datadog {#status-discrepancies-between-argo-cd-and-datadog}

Es posible que note una discrepancia en cómo se reporta el estado de una implementación, donde es exitosa en Argo CD pero se muestra como un error en Datadog. La diferencia clave radica en cómo cada plataforma evalúa el éxito de la implementación:
- **Argo CD** considera que una sincronización es exitosa siempre que pueda aplicar los cambios a los manifiestos de Kubernetes, independientemente del estado de ejecución de los recursos.
- **Datadog CD Visibility** evalúa el resultado de la implementación de manera más integral. Si alguno de los recursos modificados durante la sincronización termina en un estado degradado (por ejemplo, debido a una imagen incorrecta o un problema de configuración), la implementación se marca como fallida o degradada en Datadog, aunque Argo CD la reporte como exitosa.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://argo-cd.readthedocs.io/en/stable/
[2]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/
[3]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/triggers/
[4]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/templates/
[5]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/services/webhook/
[6]: https://app.datadoghq.com/ci/deployments
[7]: https://app.datadoghq.com/ci/deployments/executions
[8]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/troubleshooting/
[9]: /es/continuous_delivery/search
[10]: /es/continuous_delivery/explorer
[11]: https://app.datadoghq.com/organization-settings/api-keys
[12]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/subscriptions/
[13]: /es/internal_developer_portal/catalog/
[14]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#correlate
[15]: /es/containers/kubernetes
[16]: https://app.datadoghq.com/orchestration/explorer
[17]: https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/#separating-config-vs-source-code-repositories
[18]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[19]: https://argo-cd.readthedocs.io/en/stable/user-guide/resource_hooks/#resource-hooks
[20]: /es/continuous_delivery/features/code_changes_detection#synchronize-repository-metadata-to-datadog