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

{{< site-region region="gov" >}}
<div class="alert alert-warning">La visibilidad de CD no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}) en este momento.</div>
{{< /site-region >}}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Join the Preview!" >}}
CD Visibility para Argo CD está en Preview. Si está interesado en esta función, rellene el formulario para solicitar acceso.
{{< /callout >}}

## Visión general

[Argo CD][1] es una herramienta declarativa de entrega continua (CD) GitOps para Kubernetes. Sigue el patrón GitOps utilizando repositorios Git para definir el estado deseado de la aplicación, y automatiza el despliegue de aplicaciones en el destino especificado entornos.

Datadog CD Visibility se integra con Argo CD mediante [Argo CD notificaciones][2]. Argo CD notificaciones consta de dos componentes principales:
1. 1. [Triggers][3], que definen _cuándo_ enviar un mensaje notificación.
2. 2. [Plantillas][4], que definen _qué_ enviar en un notificación.

## Configuración mínima

La siguiente configuración utiliza el [Webhook notificación servicio ][5] de Argo CD para enviar notificaciones a Datadog.

Primero, añada su [Datadog API Key][11] en el secreto `argocd-notifications-secret` con la clave `dd-api-key`. Consulte [la guía de CD Argo][2] para obtener información sobre la modificación de la `argocd-notifications-secret`.

A continuación, modifique el `argocd-notifications-cm` ConfigMap para crear el notificación servicio , la plantilla y el disparador para enviar notificaciones a Datadog:

```yaml
apiVersion: v1
tipo: ConfigMap
metadatos:
  nombre: argocd-notificaciones-cm
data:
 servicio.webhook.cd-visibilidad-webhook: |
    url: https://webhook-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/webhook
    headers:
    - name: "DD-CD-PROVIDER-ARGOCD"
      value: "true"
    - nombre: "DD-API-KEY"
      valor: $dd-api-key
    - name: "Tipo de contenido"
      valor: "application/json"
  plantilla.cd-visibilidad-plantilla: |
    webhook:
      cd-visibility-webhook:
        method: POST
        cuerpo: |
            {
              "app": {{toJson .app}},
              "context": {{toJson .context}},
              "service_type": {{toJson .serviceType}},
              "recipient": {{toJson .recipient}},
              "commit_metadata": {{toJson (call .repo.GetCommitMetadata .app.status.operationState.syncResult.revision)}}
            }
  trigger.cd-visibilidad-trigger: |
    - cuando: app.status.operationState.phase esté en ['Exitoso', 'Fallido', 'Error'] y app.status.health.status esté en ['Sano', 'Degradado'].
      enviar: [cd-visibilidad-plantilla]
    - when: app.status.operationState.phase == 'Running' and app.status.health.status in ['Healthy', 'Degraded']
      enviar: [cd-visibility-template]
```

Se han añadido los siguientes recursos:
1. El `cd-visibility-webhook` servicio hace referencia a la entrada Datadog y configura las cabeceras correctas para la petición. La cabecera `DD-API-KEY` hace referencia a la entrada `dd-api-key` añadida previamente en `argocd-notifications-secret`.
2. El `cd-visibility-template` define qué enviar en la petición para el `cd-visibility-webhook` servicio .
3. La `cd-visibility-trigger` define cuándo enviar la notificación, y hace referencia a la `cd-visibility-template`.

<div class="alert alert-warning">
La llamada para rellenar el campo <code>commit_metadata</code> no es necesaria. El campo se utiliza para enriquecer la carga útil con información de Git.
Si el origen de tu aplicación Argo CD no es un SHA de commit definido (por ejemplo, si estás utilizando repositorios Helm), ajusta el cuerpo eliminando esa línea y la coma de la línea anterior.
</div>

Una vez que el servicio de notificación, el activador y la plantilla se han añadido al mapa de configuración, puedes suscribir cualquiera de tus aplicaciones de Argo CD a la integración.
Modifica las anotaciones de la aplicación de Argo CD utilizando la interfaz de usuario de Argo CD o modificando la definición de la aplicación con las siguientes anotaciones:

```yaml
apiVersion: argoproj.io/v1alpha1
tipo: Aplicación
metadatos:
  anotaciones:
   notificaciones.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_service: <YOUR_SERVICE>
    dd_customtags: "region:us1-east, team:backend"
```

Del fragmento anterior:
1. La anotación notificaciones suscribe la aplicación Argo CD a la configuración notificación creada anteriormente. Consulte la [Guía oficial de Argo CD][12] para más detalles sobre la suscripción de aplicaciones.
2. Puede utilizar la anotación `dd_env` para Configurar el entorno de la aplicación. Sustituya `YOUR_ENV` por la anotación entorno
   en el que se está desplegando esta aplicación (por ejemplo: `staging` o `prod`). Si no estableces esta anotación,
   el entorno por defecto es `none`.
3. Puede utilizar la anotación `dd_service` para Configurar el servicio de la aplicación. Sustituya `YOUR_SERVICE` por la anotación servicio
   que la aplicación de Argo CD está desplegando (por ejemplo: `transaction-service`). Cuando se utiliza esta anotación, el nombre del servicio
   se añade a todas las ejecuciones de despliegue generadas a partir de la aplicación. Además, si tu servicio
   está registrado en el [Catálogo de servicios][13], el nombre del equipo también se añade a todas las ejecuciones de despliegue. Si tu aplicación de Argo CD
   está configurada para desplegar más de un servicio, consulta [Etiquetar una aplicación de Argo CD con despliegues de múltiples servicios](#tag-an-argo-cd-application-deploying-multiple-services).
4. Puede utilizar la anotación `dd_customtags` para añadir opcionalmente etiquetas (tags) personalizado a las ejecuciones de despliegue generadas para esta aplicación Argo CD.
   El valor debe ser un lista separado por comas de etiquetas (tags), estructurado como pares `key:value`.

Una vez que haya suscrito su aplicación Argo CD añadiendo las anotaciones anteriores, empezarán a aparecer nuevos despliegues de la aplicación en Datadog.

La sección [recomendado Setup](#recomendado-setup) a continuación contiene recomendado acciones para mejorar el Monitorización reportado en CD Visibility.

## recomendado Configurar

### Modificar la duración de la espera de la salud de los recursos
La duración reportada en el despliegue eventos coincide con la duración de la sincronización en Argo CD. Sin embargo, la duración de la sincronización generalmente representa el tiempo empleado por Argo CD para sincronizar el estado del repositorio Git y el estado de Kubernetes clúster .
Esto significa que lo que ocurre después de la sincronización (por ejemplo, el tiempo empleado por los recursos de Kubernetes para arrancar) no está incluido en la duración.

Para cambiar la duración reportada para esperar hasta que los recursos configurados hayan arrancado y alcanzado un estado saludable, añada un nuevo recurso no-op monitorizado por su aplicación Argo CD, con una anotación [PostSync Hook][19].
El PostSync Hook se ejecutará después de que todos los recursos hayan alcanzado un estado saludable, y la sincronización de Argo CD esperará al resultado del PostSync Hook para actualizar el estado de la aplicación como saludable.

A continuación se representa un ejemplo de un PostSync Hook Job que ejecuta un simple comando `echo`.

```yaml
apiVersion: batch/v1
tipo: Trabajo
metadata:
  name: cdvisibility-postsync-job # Asegura que la duración de la sincronización del CD de Argo espera la salud de los recursos
  anotaciones:
    argocd.argoproj.io/hook: PostSync
    argocd.argoproj.io/hook-delete-política: HookSucceeded
spec:
  template:
    spec:
      contenedores:
        - nombre: noop-echo
          imagen: alpine:latest
          comando: ["echo", "todos los recursos de sincronización han alcanzado un estado saludable"]
      restartPolicy: Nunca
  backoffLimit: 0
```

### Correlacionar los despliegues con los pipelines de CI

Por defecto, los metadatos de Git reportados en los eventos de despliegue están asociados con el repositorio que monitoriza Argo CD. Sin embargo, una configuración común es:
- Ten un repositorio de aplicaciones, almacenando el código fuente, y un repositorio de configuración, almacenando los manifiestos de Kubernetes. Luego, configura Argo CD para monitorizar el repositorio de configuración, como se indica en la [página de prácticas recomendadas de Argo CD][17].
- Cuando se produzca un cambio en el repositorio de aplicaciones, realiza una confirmación automatizada que actualice el repositorio de configuración (por ejemplo, cambiando la imagen actual de un recurso de Kubernetes ).

El siguiente diagrama representa un ejemplo de este tipo de configuración:

{{< img src="ci/diagram_argo-cd-deployment_240910.png" alt="Activación de despliegues de Argo CD mediante Git" style="width:100%;">}}

El [ comando`datadog-ci deployment correlate` ][14] puede utilizarse para correlacionar una o más confirmaciones del repositorio de configuración con una confirmación del repositorio de aplicaciones. Cuando se produce un despliegue de Argo CD, la información de la confirmación de configuración en el evento de despliegue es reemplazada por la confirmación del repositorio de la aplicación relacionada, si existe. Hay dos formas posibles de realizar la correlación con el comando: configuración automática y manual. Ambos métodos requieren la versión `2.44.0` o posterior de la CLI `datadog-ci`.

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

<div class="alert alert-warning">
La detección automática de servicios no es compatible cuando se utiliza <a href="https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#server-side-apply">Server-Side Apply</a>.
</div>

Para habilitar el etiquetado automático de servicios, necesitas [monitorizar tu infraestructura de Kubernetes utilizando el Datadog Agent][15] y tus recursos de Kubernetes deben tener las siguientes etiquetas:
- `tags.datadoghq.com/service` (obligatorio): especifica el servicio de Datadog de este recurso. Para más información, consulta [etiquetado unificado de servicios][18].
- `team` (opcional): especifica el equipo de Datadog de este recurso. Si se omite esta etiqueta, el equipo se recupera automáticamente del [Catálogo de servicios][13] basándose en la etiqueta (label) de servicio.

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

Las páginas [**Despliegues**][6] y [**Ejecuciones**][7] se rellenan con datos una vez finalizado el despliegue. Para obtener más información, consulte [Buscar y Gestionar][9] y [Explorador de visibilidad de CD][10].

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
[13]: /es/tracing/service_catalog
[14]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/deployment#correlate
[15]: /es/containers/kubernetes
[16]: https://app.datadoghq.com/orchestration/explorer
[17]: https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/#separating-config-vs-source-code-repositories
[18]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[19]: https://argo-cd.readthedocs.io/en/stable/user-guide/resource_hooks/#resource-hooks