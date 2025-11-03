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

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Únete a la Vista previa" >}}
CD Visibility para Argo CD está en vista previa. Si te interesa esta función, rellena el formulario para solicitar acceso.
{{< /callout >}}

## Información general

[Argo CD][1] es una herramienta declarativa de entrega continua (CD) GitOps para Kubernetes. Sigue el patrón GitOps utilizando repositorios Git para definir el estado deseado de la aplicación y automatiza el despliegue de aplicaciones en entornos de destino especificados.

Datadog CD Visibility se integra con Argo CD mediante [notificaciones de Argo CD][2]. Las notificaciones de Argo CD constan de dos componentes principales:
1. [Activadores][3], que definen _cuándo_ enviar un mensaje de notificación.
2. [Plantillas][4], que definen _qué_ enviar en una notificación.

## Configuración mínima

La siguiente configuración utiliza el [servicio de notificación de webhooks][5] de Argo CD para enviar notificaciones a Datadog.

Primero, añade tu [clave de API Datadog][11] en el secreto `argocd-notifications-secret` con la clave `dd-api-key`. Para obtener información sobre la modificación del `argocd-notifications-secret`, consulta [la guía de Argo CD][2] .

A continuación, modifica el ConfigMap `argocd-notifications-cm` para crear el servicio, la plantilla y el activador de notificaciones para enviar notificaciones a Datadog:

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

Se han añadido los siguientes recursos:
1. El servicio `cd-visibility-webhook` hace referencia a la admisión en Datadog y configura las cabeceras correctas para la solicitud. La cabecera `DD-API-KEY` hace referencia a la admisión `dd-api-key` añadida previamente en `argocd-notifications-secret`.
2. La `cd-visibility-template` define qué enviar en la solicitud para el servicio`cd-visibility-webhook`.
3. El `cd-visibility-trigger` define cuándo enviar la notificación y hace referencia a la `cd-visibility-template`.

<div class="alert alert-danger">
La llamada para rellenar el campo <code>commit_metadata</code> no es necesaria. El campo se utiliza para enriquecer la carga útil con información de Git.
Si el origen de tu aplicación Argo CD no es un algoritmo de hash seguro (SHA) de commit definido (por ejemplo, si estás utilizando repositorios Helm), ajusta el cuerpo eliminando esa línea y la coma de la línea anterior.
</div>

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

El [comando`datadog-ci deployment correlate`][14] puede utilizarse para correlacionar una o más confirmaciones del repositorio de configuración con una confirmación del repositorio de aplicaciones. Cuando se produce un despliegue de Argo CD, la información de la confirmación de configuración en el evento de despliegue es reemplazada por la confirmación del repositorio de la aplicación relacionada, si existe. Hay dos formas posibles de realizar la correlación con el comando: configuración automática y manual. Ambos métodos requieren la versión `2.44.0` o posterior de la CLI `datadog-ci`.

{{< tabs >}}
{{% tab "Configuración automática" %}}
En este método, el comando infiere automáticamente la confirmación actual de la aplicación (es decir, la confirmación del pipeline en el que se está ejecutando el comando) y las confirmaciones del repositorio de configuración basándose en el entorno de Git actual. Para que esto funcione correctamente, el comando debe ejecutarse entre la confirmación de los cambios y su envío al repositorio de configuración:
```yaml
- job: JobToUpdateConfigurationRepository
  run: |
    # Update the configuration files
    ...
    git commit
    # Correlate the deployment with the CI pipeline
    export DD_BETA_COMMANDS_ENABLED=1
    datadog-ci deployment correlate --provider argocd
    git push
```
{{% /tab %}}
{{% tab "Configuración manual" %}}
Si la configuración automática es demasiado limitada para tu caso de uso, puedes proporcionar la URL del repositorio de configuración y los SHA manualmente:
```yaml
- job: JobToUpdateConfigurationRepository
  run: |
    # Correlate the deployment with the CI pipeline
    export DD_BETA_COMMANDS_ENABLED=1
    datadog-ci deployment correlate --provider argocd --config-repo <CONFIG_REPO_URL> --config-shas <COMMIT_SHA>
```
Puedes omitir la opción `--config-repo` si CI se comprueba en el repositorio de configuración. Consulta la [sintaxis del comando][1] para obtener más detalles.

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/deployment#correlate
{{% /tab %}}
{{< /tabs >}}

**Nota**: Aunque se utilice un único repositorio para almacenar tanto el código fuente como el manifiesto de Kubernetes, es necesario ejecutar este comando para asociar correctamente los despliegues y los pipelines de CI.

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

Sólo son admisibles los recursos de Kubernetes con los siguientes tipos: `Deployment`, `ReplicaSet`, `StatefulSet`, `Service`, `DaemonSet`, `Pod`, `Job` y `CronJob`.

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

Las páginas [**Despliegues**][6] y [**Ejecuciones**][7] se rellenan con datos una vez finalizado el despliegue. Para obtener más información, consulta [Buscar y gestionar][9] y [Explorador de CD Visibility][10].

## Resolución de problemas

Si no se envían notificaciones, examina los logs del pod `argocd-notification-controller`. El controlador loguea cuando envía una notificación (por ejemplo: `Sending notification ...`) y cuando no notifica a un destinatario
(por ejemplo: `Failed to notify recipient ...`). Para escenarios de solución de problemas adicionales, ve la [documentación oficial de Argo CD][8].

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
[14]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/deployment#correlate
[15]: /es/containers/kubernetes
[16]: https://app.datadoghq.com/orchestration/explorer
[17]: https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/#separating-config-vs-source-code-repositories
[18]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[19]: https://argo-cd.readthedocs.io/en/stable/user-guide/resource_hooks/#resource-hooks