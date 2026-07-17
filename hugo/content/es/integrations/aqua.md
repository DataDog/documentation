---
app_id: aqua
categories:
- rastreo
- recopilación de logs
- seguridad
custom_kind: integración
description: Solución de seguridad completa desde el desarrollo hasta la producción
  para contenedores y aplicaciones nativas de la nube
integration_version: 1.0.1
media: []
supported_os:
- Linux
- Windows
- macOS
title: Aqua
---
## Información general

Este check monitoriza [Aqua](https://www.aquasec.com).

El check de Aqua alerta al usuario si se alcanza una vulnerabilidad de alta gravedad total o si un contenedor se está ejecutando dentro de un host no registrado por Aqua. Aqua también envía alertas de datos sobre eventos bloqueados en tiempo de ejecución y es posible activar un webhook para escalar la infraestructura si se requieren más analizadores de Aqua.

## Configuración

El check de Aqua no está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21 o posterior/v6.21 o posterior, sigue las instrucciones siguientes para instalar el check de Aqua en tu host. Consulta [Uso de integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para realizar la instalación con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-aqua==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones](https://docs.datadoghq.com/getting_started/integrations/) centrales.

### Configuración

#### Recopilación de métricas

1. Edita el archivo `aqua.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/faq/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus [métricas](#metrics) de Aqua. Consulta el [ejemplo de conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/aqua/datadog_checks/aqua/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   instances:
     - url: http://your-aqua-instance.com
       api_user: "<API_USERNAME>"
       password: "<API_USER_PASSWORD>"
   ```

   Cambia los valores de los parámetros `api_user` y `password` y configúralos para tu entorno.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent).

#### Recopilación de logs

Hay dos tipos de logs generados por Aqua:

- Logs de auditoría de Aqua
- Logs de Aqua Enforcer

Para recopilar los logs de auditoría de Aqua:

1. Conéctate a tu cuenta de Aqua.
1. Ve a la sección `Log Management` de la página `Integration`.
1. Activa la integración del webhook.
1. Habilítala y añade el siguiente endpoint: `{{< region-param key="http_endpoint" code="true" >}}/v1/input/<DATADOG_API_KEY>?ddsource=aqua`.
   - Sustituye `<DATADOG_API_KEY>` por tu [clave de API Datadog](https://app.datadoghq.com/organization-settings/api-keys).

Para los logs de Aqua Enforcer: **Disponible para Agent 6.0 o posteriores**

5. La recopilación de logs está deshabilitada por defecto en el Datadog Agent. Habilítala en la [configuración de tu daemonset](https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/#log-collection):

   ```yaml
     # (...)
     env:
       # (...)
       - name: DD_LOGS_ENABLED
           value: "true"
       - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
           value: "true"
     # (...)
   ```

   Asegúrate de que el socket Docker está montado en el Datadog Agent. Consulta la documentación de Kubernetes para ver [manifiestos de ejemplo](https://docs.datadoghq.com/agent/kubernetes/?tab=daemonset#installation).

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent).

### Validación

[Ejecuta el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#service-status) y busca `aqua` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aqua.images** <br>(gauge) | Número de imágenes vistas por Aqua<br>_Se muestra como unidad_ |
| **aqua.vulnerabilities** <br>(gauge) | Número y categorías de vulnerabilidades detectadas por Aqua<br>_Se muestra como caso_ |
| **aqua.running_containers** <br>(gauge) | Número de contenedores en ejecución vistos por Aqua<br>_Se muestra como contenedor_ |
| **aqua.audit.access** <br>(gauge) | Número de eventos de auditoría por categoría<br>_Se muestra como evento_ |
| **aqua.scan_queue** <br>(gauge) | Número de colas de análisis por tipo<br>_Se muestra como caso_ |
| **aqua.enforcers** <br>(gauge) | Número de ejecutores de host por estado<br>_Se muestra como host_ |

### Eventos

Aqua no incluye ningún evento.

### Checks de servicio

**aqua.can_connect**

Devuelve CRITICAL si el Agent no puede conectarse a Aqua para recopilar métricas. En caso contrario, devuelve OK.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).