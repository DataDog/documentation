---
app_id: cfssl
categories:
- red
custom_kind: integración
description: Monitorización de una instancia de cfssl
integration_version: 1.0.0
media: []
supported_os:
- linux
- macOS
- Windows
title: cfssl
---
## Información general

Este check monitoriza [cfssl](https://github.com/cloudflare/cfssl) a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

Para el Agent v7.21 o posterior/v6.21 o posterior, sigue las instrucciones siguientes para instalar el check de cfssl en tu host. Consulta [Uso de integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para realizar la instalación con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-cfssl==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones](https://docs.datadoghq.com/getting_started/integrations/) centrales.

### Configuración

1. Edita el archivo `cfssl.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de cfssl. Consulta [el ejemplo exim.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/cfssl/datadog_checks/cfssl/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `cfssl` en la sección Checks.

## Datos recopilados

### Métricas

La integración de cfssl no incluye ninguna métrica.

### Eventos

La integración de cfssl no incluye ningún evento.

### Checks de servicio

**cfssl.health**

Devuelve el `status` del [endpoint de salud](https://github.com/cloudflare/cfssl/blob/master/doc/api/endpoint_health.txt) de cfssl.

_Estados: ok, crítico_

**cfssl.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse a la instancia cfssl monitorizada. Devuelve `OK` en caso contrario.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesita ayuda? Póngase en contacto con [Datadog support](https://www.datadoghq.com/support/).