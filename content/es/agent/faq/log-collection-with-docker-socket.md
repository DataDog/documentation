---
aliases:
- /es/agent/faq/kubernetes-docker-socket-log-collection
further_reading:
- link: /agent/autodiscovery/
  tag: documentación
  text: Autodiscovery del Docker Agent
- link: /agent/kubernetes/host_setup/
  tag: documentación
  text: Configuración del host de Kubernetes
- link: /agent/kubernetes/integrations/
  tag: documentación
  text: Integraciones personalizadas
kind: faq
title: Recopilación de logs con el socket de Docker
---

El Datadog Agent tiene dos maneras de recoger logs: desde archivos de log de Kubernetes, o desde el socket de Docker. Datadog recomienda el uso de Kubernetes para loguear archivos cuando:

* Docker no sea el tiempo de ejecución, **o**
* se usen más de 10 contenedores en cada nodo.

La API de Docker está optimizada para obtener logs de un contenedor a la vez. Cuando hay muchos contenedores en el mismo nodo, recoger logs a través del socket de Docker puede requerir el uso de más recursos que hacerlo mediante archivos de logs de Kubernetes.

Esta página trata sobre recoger logs con el socket de Docker. Para utilizar los archivos de logs de Kubernetes, consulta [Recoger logs de Kubernetes][1].

## Dashboards

Monta el socket de Docker en el Datadog Agent:

```yaml
  # (...)
    env:
      - {name: "DD_CRI_SOCKET_PATH", value: "/host/var/run/docker.sock"}
      - {name: "DOCKER_HOST", value: "unix:///host/var/run/docker.sock"}
  # (...)
    volumeMounts:
    #  (...)
      - name: dockersocketdir
        mountPath: /host/var/run
  # (...)
  volumes:
    # (...)
    - hostPath:
        path: /var/run
      name: dockersocketdir
  # (...)
```

**Nota**: Montar solo el socket `docker.sock` en lugar del directorio completo que lo contiene impedirá que el Agent se recupere tras reiniciar el daemon de Docker.

### Guías

Para utilizar el socket de Docker para recoger logs en un entorno de Kubernetes, asegúrate de que Docker sea el tiempo de ejecución y que `DD_logs_CONFIG_K8S_CONTAINER_USE_FILE` se ha establecido en `false`.

### Contenedores de corta duración {#short-lived-container-socket}

En un entorno de Docker, el Agent recibe actualizaciones de los contenedores en tiempo real a través de eventos de Docker. El Agent extrae y actualiza la configuración de las etiquetas de contenedores (Autodiscovery) una vez por segundo.
A partir de la versión 6.14, el Agent recopila logs de todos los contenedores (tanto en ejecución como detenidos). Esto significa que los logs de contenedores de corta duración que se iniciaran y detuvieran en el último segundo se seguirán recopilando, salvo que se eliminen.

## Cluster Agent
{{< tabs >}}
{{% tab "Local files" %}}
El Agent busca plantillas de Autodiscovery en el directorio `/conf.d` montado.

La ventaja de almacenar las plantillas como archivos locales (y montarlos dentro de contenedores del Agent) es que esto no requiere un servicio externo o una plataforma de orquestación específica.

La desventaja es que debes reiniciar tus contenedores de Agent cada vez que cambies, añadas o elimines plantillas.

##### Archivos personalizados de configuración automática

Si necesitas una configuración de integración personalizada con Datadog para habilitar opciones adicionales, utiliza diferentes identificadores de contenedor, o utiliza la indexación de variables de plantilla y escribe tu propio archivo de configuración automática:

1. Crea un archivo `conf.d/<INTEGRATION_NAME>.d/conf.yaml` en tu host y añade tu autoconfiguración personalizada.
   ```text
   ad_identifiers:
     <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

   logs:
     <LOGS_CONFIG>
   ```
   Consulta la documentación [Identificadores de contenedor de Autodiscovery][1] para obtener información sobre `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`.
2. Monta tu carpeta host `conf.d/` en la carpeta contenedorizada del Agent `conf.d`.

[1]: /es/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "ConfigMaps" %}}
En Kubernetes, puedes utilizar [ConfigMaps][1]. Consulta la plantilla a continuación y la documentación de [Integraciones personalizadas de Kubernetes][2].

```text
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
  namespace: default
data:
  <INTEGRATION_NAME>-config: |-
    ad_identifiers:
      <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
    logs:
      <LOGS_CONFIG>
```

Consulta la documentación acerca de [Identificadores de contenedor de Autodiscovery][3] para obtener más información sobre el `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`.

[1]: /es/agent/kubernetes/integrations/#configmap
[2]: /es/agent/kubernetes/integrations/
[3]: /es/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "Helm" %}}

Puedes personalizar la recopilación de logs por integración dentro de `confd`. Este método monta la configuración deseada en el contenedor del Agent.

  ```yaml
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
      init_config:
      instances:
        (...)
      logs:
        <LOGS_CONFIG>
  ```

{{% /tab %}}
{{< /tabs >}}

[1]: /es/containers/kubernetes/log