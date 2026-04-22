---
app_id: dns
categories:
- network
custom_kind: integración
description: Monitoriza la posibilidad de resolución y los tiempos de búsqueda de
  cualquier registro DNS.
integration_version: 5.1.0
media: []
supported_os:
- Linux
- macOS
- Windows
title: Check DNS
---
## Información general

Monitoriza la posibilidad de resolución y los tiempos de búsqueda de cualquier registro DNS utilizando los servidores de nombres que elijas.

## Configuración

### Instalación

El check DNS se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor.

Aunque la mejor forma de ejecutar checks dirigidos a métricas sea en los mismos hosts que los servicios monitorizados, es posible que prefieras ejecutar este check dirigido al estado, desde un host que no ejecuta el servicio DNS monitorizado.

### Configuración

1. Edita el archivo `dns_check.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para empezar a recopilar datos de DNS.
   Consulta el [ejemplo dns_check.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/dns_check/datadog_checks/dns_check/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles:

   ```yaml
   init_config:

   instances:
     ## @param name - string - required
     ## Name of your DNS check instance.
     ## To create multiple DNS checks, create multiple instances with unique names.
     #
     - name: '<INSTANCE_NAME>'

       ## @param hostname - string - required
       ## Hostname to resolve.
       #
       hostname: '<HOSTNAME>'
   ```

   Si omites la opción `nameserver`, el check utilizará el servidor de nombres que se haya configurado en los parámetros de red locales.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) para empezar a enviar checks y tiempos de respuesta del servicio DNS a Datadog.

### Validación

[Ejecuta el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `dns_check` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **dns.response_time** <br>(gauge) | Tiempo de respuesta de la consulta DNS de un registro determinado, etiquetado por nombre de host, por ejemplo, 'hostname:example.com'.<br>_Se muestra en segundos_ |

### Eventos

El check de DNS no incluye eventos.

### Checks de servicio

**dns.can_resolve**

Devuelve Critical, si los tiempos de resolución DNS se exceden o si falla, y devuelve OK en caso contrario.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).