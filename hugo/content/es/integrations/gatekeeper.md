---
app_id: gatekeeper
categories:
- nube
- conformidad
- configuración y despliegue
- rastreo
- seguridad
custom_kind: integración
description: Integración de Gatekeeper
integration_version: 1.0.0
media: []
supported_os:
- Linux
title: Gatekeeper
---
## Información general

Este check recopila métricas de [OPA Gatekeeper](https://github.com/open-policy-agent/gatekeeper).

![Dashboard de información general de Gatekeeper](https://raw.githubusercontent.com/DataDog/integrations-extras/master/gatekeeper/images/gatekeeper_dashboard.png)

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un clúster de Kubernetes. Consulta también las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

#### Versiones 7.26.0 y 6.26.0 o posteriores del Agent

Para usar una integración de `integrations-extra` con el Docker Agent, Datadog recomienda crear el Agent con la integración instalada. Usa el siguiente archivo de Docker para crear una versión actualizada del Agent que incluya la integración `gatekeeper` desde `integrations-extras`:

```
FROM gcr.io/datadoghq/agent:latest
RUN agent integration install -r -t datadog-gatekeeper==<INTEGRATION_VERSION>
```

#### Versiones 7.26.0 y 6.26.0 o anteriores del Agent

Para instalar el check de Gatekeeper en tu clúster de Kubernetes:

1. Instala el [kit de herramientas para desarrolladores](https://docs.datadoghq.com/developers/integrations/python/).

1. Clona el repositorio `integrations-extras`:

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

1. Actualiza la configuración de `ddev` con la ruta de `integrations-extras/`:

   ```shell
   ddev config set repos.extras ./integrations-extras
   ```

1. Para crear el paquete de `gatekeeper`, ejecuta:

   ```shell
   ddev -e release build gatekeeper
   ```

1. [Descarga el manifiesto del Agent para instalar el Datadog Agent como DaemonSet](https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile).

1. Crea dos `PersistentVolumeClaim`, uno para el código de checks y otro para la configuración.

1. Añádelos como volúmenes a tu plantilla de pods del Agent y úsalos para los checks y configuración:

   ```yaml
        env:
          - name: DD_CONFD_PATH
            value: "/confd"
          - name: DD_ADDITIONAL_CHECKSD
            value: "/checksd"
      [...]
        volumeMounts:
          - name: agent-code-storage
            mountPath: /checksd
          - name: agent-conf-storage
            mountPath: /confd
      [...]
      volumes:
        - name: agent-code-storage
          persistentVolumeClaim:
            claimName: agent-code-claim
        - name: agent-conf-storage
          persistentVolumeClaim:
            claimName: agent-conf-claim
   ```

1. Despliega el Datadog Agent en tu clúster de Kubernetes:

   ```shell
   kubectl apply -f agent.yaml
   ```

1. Copia el archivo .whl del artefacto de la integración en tus nodos de Kubernetes o súbelo a una URL pública.

1. Ejecuta el siguiente comando para instalar la rueda de integraciones con el Agent:

   ```shell
   kubectl exec ds/datadog -- agent integration install -w <PATH_OF_GATEKEEPER_ARTIFACT_>/<GATEKEEPER_ARTIFACT_NAME>.whl
   ```

1. Ejecuta los siguientes comandos para copiar los checks y la configuración en los PVCs correspondientes:

   ```shell
   kubectl exec ds/datadog -- sh
   # cp -R /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/* /checksd
   # cp -R /etc/datadog-agent/conf.d/* /confd
   ```

1. Reinicia los pods del Datadog Agent.

### Configuración

1. Edita el archivo `gatekeeper/conf.yaml`, en la carpeta `/confd` que añadiste al pod del Agent para empezar a recopilar los datos de rendimiento de tu gatekeeper. Ve el [gatekeeper/conf.yaml de ejemplo](https://github.com/DataDog/integrations-extras/blob/master/gatekeeper/datadog_checks/gatekeeper/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `gatekeeper` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gatekeeper.audit.duration.seconds.sum** <br>(count) | Latencia de la operación de auditoría en segundos<br>_Se muestra como segundo_ |
| **gatekeeper.audit.duration.seconds.count** <br>(count) | Latencia de la operación de auditoría en segundos<br>_Se muestra como segundo_ |
| **gatekeeper.audit.last_run_time** <br>(gauge) | Marca de tiempo de la última operación de auditoría|
| **gatekeeper.constraint_template_ingestion.duration.seconds.sum** <br>(count) | Distribución del tiempo que se tardó en ingerir una plantilla de restricciones en segundos<br>_Se muestra como segundo_ |
| **gatekeeper.constraint_template_ingestion.duration.seconds.count** <br>(count) | Distribución del tiempo que se tardó en ingerir una plantilla de restricciones en segundos<br>_Se muestra como segundo_ |
| **gatekeeper.constraint_template_ingestion.count** <br>(count) | Número total de acciones de ingesta de plantillas de restricciones|
| **gatekeeper.violations** <br>(gauge) | Número total de infracciones por restricción|
| **gatekeeper.constraints** <br>(gauge) | Número actual de restricciones conocidas|
| **gatekeeper.constraint_templates** <br>(gauge) | Número de plantillas de restricciones observadas|
| **gatekeeper.request.duration.seconds.sum** <br>(count) | \[Obsoleto desde Gatekeeper v3.4.0\] El tiempo de respuesta en segundos<br>_Se muestra como segundo_ |
| **gatekeeper.request.duration.seconds.count** <br>(count) | \[Obsoleto desde Gatekeeper v3.4.0\] El tiempo de respuesta en segundos<br>_Se muestra como segundo_ |
| **gatekeeper.request.count** <br>(count) | \[Obsoleto desde Gatekeeper v3.4.0\] Número total de solicitudes que se dirigen al webhook|
| **gatekeeper.sync** <br>(gauge) | Número total de recursos de cada tipo que se almacenan en caché|
| **gatekeeper.sync.duration.seconds.sum** <br>(count) | Latencia de la operación de sincronización en segundos<br>_Se muestra como segundo_ |
| **gatekeeper.sync.duration.seconds.count** <br>(count) | Latencia de la operación de sincronización en segundos<br>_Se muestra como segundo_ |
| **gatekeeper.sync.last_run_time** <br>(gauge) | Marca de tiempo de la última operación de sincronización|
| **gatekeeper.watch.intended** <br>(gauge) | El número total de Grupos/Versiones/Tipos que el gestor de vigilancia tiene instrucciones de vigilar.|
| **gatekeeper.watch.watched** <br>(gauge) | El número total de Grupos/Versiones/Tipos vigilados actualmente por el gestor de vigilancia.|
| **gatekeeper.validation.request.count** <br>(count) | Número de solicitudes enviadas al webhook de validación|
| **gatekeeper.validation.request.duration.seconds.sum** <br>(count) | El tiempo de respuesta en segundo<br>_Se muestra como segundo_ |
| **gatekeeper.validation.request.duration.seconds.count** <br>(count) | El tiempo de respuesta en segundo<br>_Se muestra como segundo_ |
| **gatekeeper.mutator.ingestion.count** <br>(count) | Número total de acciones de ingesta de Mutator|
| **gatekeeper.mutator.ingestion.duration.seconds.sum** <br>(count) | La distribución de las duraciones de ingesta de Mutator<br>_Se muestra como segundo_ |
| **gatekeeper.mutator.ingestion.duration.seconds.count** <br>(count) | La distribución de las duraciones de ingesta de Mutator<br>_Se muestra como segundo_ |
| **gatekeeper.mutators** <br>(gauge) | Número actual de objetos de Mutator|
| **gatekeeper.mutator.conflicting.count** <br>(gauge) | Número actual de objetos de Mutator en conflicto|

### Eventos

Gatekeeper no incluye eventos.

### Checks de servicio

**gatekeeper.prometheus.health**

Devuelve `CRITICAL` si el agent no consigue conectarse al endpoint de métricas de Prometheus, en caso contrario, devuelve `OK`.

_Estados: ok, critical_

**gatekeeper.health**

Devuelve `CRITICAL` si el agent no consigue conectar con el endpoint de estado del gatekeeper, `OK` si devuelve 200, `WARNING` en caso contrario.

_Estados: ok, warning, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).