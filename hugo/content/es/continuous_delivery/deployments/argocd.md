---
description: Aprenda cómo monitor deployments from Argo CD en Datadog CD Visibility.
further_reading:
- link: /continuous_delivery/deployments
  tag: Documentación
  text: Más información sobre Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentación
  text: Aprende a consultar y visualizar las ejecuciones de despliegue
is_beta: true
title: Monitorizar los despliegues de Argo CD
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Únete a la vista previa." >}}
CD Visibility para Argo CD está en vista previa. Si te interesa esta función, completa el formulario para pedir acceso.
{{< /callout >}}

## Información general

[Argo CD][1] es una herramienta declarativa de entrega continua (CD) de GitOps para Kubernetes. Sigue el patrón de GitOps utilizando repositorios Git para definir el estado deseado de la aplicación, y automatiza el despliegue de aplicaciones en entornos de destino especificados.

Datadog CD Visibility se integra con Argo CD utilizando [Notificaciones de Argo CD][2]. Las notificaciones de Argo CD constan de dos componentes principales:
1. [Activadores][3], que definen _cuándo_ enviar una notificación.
2. [Plantillas][4], que definen _qué_ enviar en una notificación.

## Configuración mínima

La siguiente configuración utiliza el [servicio de notificación de Webhook][5] de Argo CD para enviar notificaciones a Datadog.

En primer lugar, añade tu [clave de API de Datadog][11] en el secreto `argocd-notifications-secret` con la clave `dd-api-key`. Consulta [la guía de Argo CD][2] para obtener información sobre la modificación del `argocd-notifications-secret`.

Elige uno de los siguientes métodos de configuración en función de cómo hayas instalado Argo CD:

- **Configuración regular (se aplica kubectl)**: para instalaciones estándar de Argo CD utilizando `kubectl apply`
- **Helm**: para despliegues de Argo CD basados en Helm

### Configuración regular (kubectl apply)

Modifica el ConfigMap `argocd-notifications-cm` para crear el servicio de notificación, la plantilla y el activador para enviar notificaciones a Datadog:

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

### Configuración Helm

Si utilizaste Helm para instalar Argo CD, añade la siguiente configuración a tu `values.yaml`:

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

### Resumen de la configuración

Se han añadido los siguientes recursos:
1. El servicio `cd-visibility-webhook` se dirige a la entrada de Datadog y configura los encabezados correctos para la solicitud. El encabezado `DD-API-KEY` hace referencia a la entrada `dd-api-key` añadida previamente en `argocd-notifications-secret`.
2. En `cd-visibility-template` se define qué se debe enviar en la solicitud del servicio `cd-visibility-webhook`.
3. En `cd-visibility-trigger` se define cuándo enviar la notificación y se hace referencia a `cd-visibility-template`.

El campo `commit_metadata` es opcional y puede utilizarse para enriquecer el despliegue con información Git. Debe eliminarse (junto con la coma de la línea anterior) en los siguientes casos:
- Ya estás sincronizando la información de tu repositorio con Datadog (consulta [Sincronizar los metadatos del repositorio con Datadog][20]).
- Tu fuente de aplicación de Argo CD no tiene un SHA de confirmación definido (por ejemplo, si estás utilizando repositorios Helm).

Una vez que el servicio de notificación, el activador y la plantilla se han añadido al mapa de configuración, puedes suscribir cualquiera de tus aplicaciones de Argo CD a la integración.
Modifica las anotaciones de la aplicación de Argo CD utilizando la interfaz de usuario de Argo CD o modificando la definición de la aplicación con las siguientes anotaciones:

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
1. La anotación de notificaciones suscribe la aplicación Argo CD a la configuración de notificaciones creada anteriormente. Para ver más detalles sobre la suscripción a aplicaciones, consulta la [guía oficial de Argo CD][12].
2. Puedes utilizar la anotación `dd_env` para configurar el entorno de la aplicación. Sustituye `YOUR_ENV` anterior por el entorno
   en el que se está desplegando esta aplicación (por ejemplo: `staging` o `prod`). Si no estableces esta anotación,
   el entorno por defecto es `none`.
3. Puedes utilizar la anotación `dd_service` para configurar el servicio de la aplicación. Sustituye `YOUR_SERVICE` anterior por el servicio
   que la aplicación de Argo CD está desplegando (por ejemplo: `transaction-service`). Cuando se utiliza esta anotación, el nombre del servicio
   se añade a todas las ejecuciones de despliegue generadas a partir de la aplicación. Además, si tu servicio
   registrado en [Catálogo de software][13], el nombre del equipo también se añade a todas las ejecuciones de despliegues. Si tu Argo CD
   está configurada para desplegar más de un servicio, consulta [Etiquetar una aplicación de Argo CD con despliegues de múltiples servicios](#tag-an-argo-cd-application-deploying-multiple-services).
4. Puedes utilizar la anotación `dd_customtags` para añadir opcionalmente etiquetas (tags) personalizadas a las ejecuciones de despliegues generadas para esta aplicación Argo CD.
   El valor debe ser una lista de etiquetas (tags) separada por comas, estructuradas como pares `key:value`.

Una vez que hayas suscrito tu aplicación Argo CD añadiendo las anotaciones anteriores, empezarán a aparecer nuevos despliegues de la aplicación en Datadog.

La sección [Configuración recomendada](#recommended-setup) a continuación contiene las acciones recomendadas para mejorar la monitorización informada en CD Visibility.

## Configuración recomendada

### Modificar la duración de la espera del estado de los recursos
La duración informada en eventos de despliegue coincide con la duración de la sincronización en Argo CD. Sin embargo, la duración de la sincronización generalmente representa el tiempo empleado por Argo CD para sincronizar el estado del repositorio Git y el estado del clúster Kubernetes.
Esto significa que lo que ocurre después de la sincronización (por ejemplo, el tiempo empleado por los recursos Kubernetes para arrancar) no está incluido en la duración.

Para cambiar la duración informada de la espera hasta que los recursos configurados arranquen y alcancen un estado saludable, añade un nuevo recurso no-op monitorizado por tu aplicación Argo CD, con una anotación de [hook PostSync][19].
El hook PostSync se ejecutará después de que todos los recursos hayan alcanzado un estado saludable y la sincronización de Argo CD esperará el resultado del hook PostSync para actualizar el estado de la aplicación como saludable.

A continuación se representa un ejemplo de un trabajo de hook PostSync que ejecuta un simple comando `echo`.

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

### Correlacionar los despliegues con los pipelines de CI

Por defecto, los metadatos de Git reportados en los eventos de despliegue están asociados con el repositorio que monitoriza Argo CD. Sin embargo, una configuración común es:
- Ten un repositorio de aplicaciones, almacenando el código fuente, y un repositorio de configuración, almacenando los manifiestos de Kubernetes. Luego, configura Argo CD para monitorizar el repositorio de configuración, como se indica en la [página de prácticas recomendadas de Argo CD][17].
- Cuando se produzca un cambio en el repositorio de aplicaciones, realiza una confirmación automatizada que actualice el repositorio de configuración (por ejemplo, cambiando la imagen actual de un recurso de Kubernetes ).

El siguiente diagrama representa un ejemplo de este tipo de configuración:

{{< img src="ci/diagram_argo-cd-deployment_240910.png" alt="Activación de despliegues de Argo CD mediante Git" style="width:100%;">}}

El comando [`datadog-ci deployment correlate-image`][14] puede utilizarse para correlacionar una imagen con una confirmación de repositorio de aplicaciones. Cuando se produce un despliegue de Argo CD, la información de la confirmación de configuración en el evento de despliegue se reemplaza con la confirmación del repositorio de aplicaciones relacionado obtenido mirando las imágenes desplegadas, si las hay.

Para habilitar esta correlación, también debes añadir la anotación `dd_k8s_cluster` a tu aplicación de Argo CD, especificando el nombre del clúster de Kubernetes en el que se despliega la aplicación. El nombre debe coincidir con el nombre indicado en el [producto de Datadog Kubernetes][16]. El nombre de la imagen también debe contener el nombre del servicio con el que se relaciona. Esto nos ayuda a descartar imágenes irrelevantes en un despliegue.

A continuación se muestra un ejemplo de cómo ejecutar el comando al generar la imagen que posteriormente será desplegada por Argo CD:
```yaml
 steps:
    - name: Correlate image with Datadog
      shell: bash
      run: |
        echo "Correlating image: ${{ inputs.image-name }} with Datadog"
        datadog-ci deployment correlate-image --image ${{ inputs.image-name }} --repository-url ${{ inputs.repository-url }} --commit-sha ${{ inputs.commit-sha }}
        echo "Successfully correlated ${{ inputs.image-name }} with Datadog"
```


Este comando correlaciona imágenes de recursos de despliegue. Cuando Datadog recibe un despliegue, si hay varias imágenes presentes y más de una de ellas está correlacionada, Datadog toma la imagen que contiene el nombre del servicio. La correlación solo funciona para los recursos de despliegue.



#### Validación

Si el comando se ha ejecutado correctamente, los despliegues contienen metadatos de Git del repositorio de la aplicación en lugar del repositorio de configuración. Además, la vista de ejecuciones de despliegue contiene ahora una nueva pestaña **Pipeline** que representa la traza de pipeline de CI relacionada.

## Etiquetar una aplicación de Argo CD que despliega múltiples servicios

Si tu aplicación de Argo CD despliega más de un servicio, Datadog puede inferir automáticamente los servicios desplegados desde una sincronización de la aplicación. Datadog infiere los servicios basándose en los recursos de Kubernetes que fueron modificados.

<div class="alert alert-danger">
La detección automática de servicios no es compatible cuando se utiliza <a href="https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#server-side-apply">Server-Side Apply</a>.
</div>

Para habilitar el etiquetado automático de servicios, necesitas [monitorizar tu infraestructura de Kubernetes utilizando el Datadog Agent][15] y tus recursos de Kubernetes deben tener las siguientes etiquetas (labels):
- `tags.datadoghq.com/service` (obligatorio): especifica el servicio de Datadog de este recurso. Para más información, consulta [Etiquetado unificado de servicios][18].
- `team` (opcional): especifica el equipo Datadog de este recurso. Si se omite esta etiqueta (label), el equipo se recupera automáticamente del [Catálogo de software][13] en función de la etiqueta (label) de servicio.

Solo son admisibles los recursos de Kubernetes con los siguientes tipos: `Deployment`, `Rollout`, `ReplicaSet`, `StatefulSet`, `Service`, `DaemonSet`, `Pod`, `Job` y `CronJob`.

Añade las siguientes anotaciones a tu aplicación de Argo CD:
- `dd_multiservice`: `true`. Esta anotación especifica si Datadog infiere automáticamente los servicios desplegados en una sincronización basándose en los recursos de Kubernetes modificados.
- `dd_k8s_cluster`: establecido en el nombre del clúster de Kubernetes en el que se despliega la aplicación de Argo CD. El nombre debe coincidir con el nombre informado en el [producto de Datadog Kubernetes][16].

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

## Visualizar los despliegues en Datadog

Las páginas [**Despliegues**][6] y [**Ejecuciones**][7] se rellenan con datos una vez finalizado el despliegue. Para obtener más información, consulta [Explorar despliegues en CD Visibility][10].

## Solucionar problemas

Si no se envían notificaciones, examina los logs del pod `argocd-notification-controller`. El controlador loguea cuando envía una notificación (por ejemplo: `Sending notification ...`) y cuando no notifica a un destinatario
(por ejemplo: `Failed to notify recipient ...`). Para escenarios de solución de problemas adicionales, ve la [documentación oficial de Argo CD][8].

### Discrepancias de estado entre Argo CD y Datadog

Es posible que observe una discrepancia en la forma en que se informa del estado de un despliegue, que en Argo CD es correcto pero en Datadog se muestra como un error. La diferencia clave radica en la forma en que cada plataforma evalúa el éxito del despliegue:
- **Argo CD** considera que una sincronización se ha realizado correctamente siempre que pueda aplicar los cambios a los manifiestos de Kubernetes, independientemente del estado de ejecución de los recursos.
- **Datadog CD Visibility** evalúa el resultado del despliegue de forma más exhaustiva. Si alguno de los recursos modificados durante la sincronización termina en un estado degradado (por ejemplo, debido a una mala imagen o a un problema de configuración), el despliegue se marca como fallido o degradado en Datadog, aunque Argo CD lo reporte como exitoso.

## Referencias adicionales

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
[13]: /es/tracing/software_catalog
[14]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#correlate
[15]: /es/containers/kubernetes
[16]: https://app.datadoghq.com/orchestration/explorer
[17]: https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/#separating-config-vs-source-code-repositories
[18]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[19]: https://argo-cd.readthedocs.io/en/stable/user-guide/resource_hooks/#resource-hooks
[20]: /es/continuous_delivery/features/code_changes_detection#synchronize-repository-metadata-to-datadog