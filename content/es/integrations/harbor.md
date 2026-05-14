---
app_id: harbor
categories:
- rastreo
- recopilación de logs
custom_kind: integración
description: Monitoriza el estado del registro de contenedores de Harbor
integration_version: 6.0.0
media: []
supported_os:
- Linux
- macOS
- Windows
title: Harbor
---
## Información general

Este check monitoriza [Harbor](https://goharbor.io) a través del Datadog Agent.

## Configuración

### Instalación

El check de Harbor se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `harbor.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/) para empezar a recopilar tus datos de rendimiento de Harbor. Consulta el [ejemplo harbor.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   **Nota**: Puedes especificar cualquier tipo de usuario en la configuración, pero se requiere una cuenta con permisos de administrador para obtener las métricas del disco. La métrica `harbor.projects.count` solo refleja la cantidad de proyectos a los que puede acceder el usuario proporcionado.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `harbor.d/conf.yaml` para empezar a recopilar tus logs de Harbor:

   ```yaml
     logs:
       - type: file
         path: /var/log/harbor/*.log
         source: harbor
         service: '<SERVICE_NAME>'
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `harbor`                                                                              |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                         |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%", "username": "<USER_ID>", "password": "<USER_PASSWORD>"}` |

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada de forma predeterminada en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "harbor", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `harbor` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **harbor.disk.free** <br>(gauge) | Cantidad de espacio de almacenamiento que está libre.<br>_Se muestra en bytes_ |
| **harbor.disk.total** <br>(gauge) | Cantidad total de espacio de almacenamiento.<br>_Se muestra en bytes_ |
| **harbor.projects.count** <br>(gauge) | Número total de proyectos.|
| **harbor.registry.read_only** <br>(gauge) | Estado 'solo_lectura' de un registro.|

### Eventos

La integración de Harbor no incluye eventos.

### Checks de servicio

**harbor.can_connect**

Devuelve `OK` si se puede acceder a la API de Harbor y la autenticación se ha realizado correctamente. En caso contrario devuelve `CRITICAL`.

_Estados: ok, crítico_

**harbor.status**

Devuelve `OK` si el componente Harbor especificado está sano. En caso contrario devuelve `CRITICAL`. Devuelve `UNKNOWN` con Harbor \< 1.5.

_Estados: ok, desconocido, crítico_

**harbor.registry.status**

Devuelve `OK` si el servicio está sano. En caso contrario devuelve `CRITICAL`. Monitoriza el estado de los registros externos utilizados por Harbor para la replicación.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).