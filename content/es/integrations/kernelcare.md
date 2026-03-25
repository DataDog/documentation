---
app_id: kernelcare
categories:
- sistema operativo y sistema
- seguridad
custom_kind: integración
description: Monitoriza las métricas de actividad y estado del servidor de kernelcare.
media: []
supported_os:
- Linux
- Windows
- macOS
title: Kernelcare
---
## Información general

[KernelCare](https://www.kernelcare.com) es un sistema para parchear en vivo que aplica automáticamente parches de seguridad a las vulnerabilidades del kernel de Linux, sin reinicios. Se utiliza en más de 500 000 servidores y se ha utilizado para parchear servidores en funcionamiento durante más de 6 años para Dell, Zoom y otras empresas. Funciona con las principales distribuciones de Linux, como RHEL, CentOS, Amazon Linux, y Ubuntu, e interopera con los escáneres de vulnerabilidades habituales, las herramientas de monitorización en la nube y las soluciones de gestión de parches.

Esta integración te permite reenviar métricas de Kernelcare a través del Datadog Agent.

## Configuración

El check de Kernelcare no está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21+ / v6.21+, sigue las instrucciones a continuación para instalar el check de Kernelcare en tu host. Consulta [Usar integraciones comunitarias](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para realizar la instalación con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-kernelcare==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones] centrales (https://docs.datadoghq.com/getting_started/integrations/).

### Configuración

1. Edita el archivo `kernelcare.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de kernelcare. Consulta el [kernelcare.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-extras/blob/master/kernelcare/datadog_checks/kernelcare/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `kernelcare` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **kernelcare.uptodate** <br>(gauge) | El número de servidores actualizados|
| **kernelcare.outofdate** <br>(gauge) | El número de servidores desactualizados|
| **kernelcare.unsupported** <br>(gauge) | El número de servidores no compatibles|
| **kernelcare.inactive** <br>(gauge) | El número de servidores inactivos|

### Eventos

La integración de Kernelcare no incluye ningún evento.

### Checks de servicio

**kernelcare.can_connect**

Devuelve `Critical` si el Agent no puede conectarse a Kernelcare para recopilar métricas, devuelve `OK` en caso contrario.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).