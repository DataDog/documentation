---
app_id: cloudsmith
categories:
- nube
- métricas
custom_kind: integración
description: Monitorización del uso, rendimiento, eventos de seguridad y actividad
  de usuario de Cloudsmith con métricas y alertas detalladas
media:
- caption: 'Cloudsmith: dashboard'
  image_url: images/Cloudsmith_example.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Cloudsmith
---
## Información general

Cloudsmith es una plataforma de gestión de paquetes nativa en la nube totalmente gestionada, utilizada para almacenar, gestionar y distribuir de forma segura artefactos de software para equipos de DevOps. Es compatible con los principales formatos, incluidos Docker, npm, Maven, Python, RubyGems, etc., con control de acceso, aplicación de políticas y auditoría de nivel empresarial.

Esta integración mejora la visibilidad de tu organización de Cloudsmith recopilando datos de observabilidad en tiempo real y mostrándolos en la plataforma de Datadog. Teams puede monitorizar el uso de recursos, reforzar el cumplimiento de la seguridad y auditar la actividad de los usuarios, directamente desde los dashboards y monitores de Datadog.

La integración recopila datos de las API de Cloudsmith y los asigna a los siguientes tipos de telemetría de Datadog:

- **Métricas**: uso de almacenamiento y ancho de banda, actividad de tokens y métricas de usuarios activos.
- **Eventos**: detección de vulnerabilidades de seguridad, actividad de logs de auditoría, infracciones de las políticas de licencias y vulnerabilidades, resúmenes de miembros y snapshots de uso de cuotas.
- **Checks de servicio**: estado del consumo de cuotas y conectividad de la API.

Con esta integración, los clientes obtienen una capacidad de observación centralizada de su infraestructura de paquetes de Cloudsmith, lo que les ayuda a cumplir las normativas, solucionar problemas más rápidamente y optimizar la planificación de recursos.

## Configuración

La comprobación de Cloudsmith no está incluida en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que es necesario instalarlo.

### Instalación

Para Agent v7.21+/v6.21+, sigue las instrucciones a continuación para instalar el check de Cloudsmith en tu host. Consulta [Use Community Integrations](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para instalar con el Docker Agent o versiones anteriores de Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-cloudsmith==1.1.0
   ```

1. Configura tu integración de forma similar a las [integraciones] centrales (https://docs.datadoghq.com/getting_started/integrations/).

### Configuración

1. Edita el archivo `cloudsmith.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de Cloudsmith. Consulta el [cloudsmith.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/datadog_checks/cloudsmith/data/conf.yaml.example de ejemplo) para ver todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `cloudsmith` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **cloudsmith.storage_used** <br>(gauge) | El porcentaje de almacenamiento utilizado<br>_Se muestra en porcentaje_. |
| **cloudsmith.bandwidth_used** <br>(gauge) | El porcentaje de ancho de banda utilizado<br>_Se muestra en porcentaje_ |
| **cloudsmith.token_count** <br>(gauge) | El número de tokens de una organización<br>_Se muestra como elemento_ |
| **cloudsmith.token_bandwidth_total** <br>(gauge) | El ancho de banda total utilizado por los tokens<br>_Se muestra como byte_ |
| **cloudsmith.token_download_total** <br>(gauge) | El total de descargas utilizadas por los tokens<br>_Se muestra como elemento_ |
| **cloudsmith.storage_used_bytes** <br>(gauge) | La cantidad de almacenamiento utilizado en bytes<br>_Se muestra como byte_ |
| **cloudsmith.bandwidth_used_bytes** <br>(gauge) | La cantidad de ancho de banda utilizado en bytes<br>_Se muestra como byte_ |
| **cloudsmith.member.active** <br>(gauge) | El número de miembros activos en la organización<br>_Se muestra como elemento_ |
| **cloudsmith.license_policy_violation.count** <br>(gauge) | El número de violaciones de la política de licencias<br>_Se muestra como elemento_ |
| **cloudsmith.vulnerability_policy_violation.count** <br>(gauge) | El número de violaciones de la política de vulnerabilidad<br>_Se muestra como elemento_ |
| **cloudsmith.member.has_2fa.count** <br>(gauge) | El número de miembros con 2FA activado<br>_Se muestra como elemento_ |
| **cloudsmith.member.saml.count** <br>(gauge) | El número de miembros que iniciaron sesión con SAML<br>_Se muestra como elemento_ |
| **cloudsmith.member.password.count** <br>(gauge) | El número de miembros que se conectaron con la contraseña<br>_Se muestra como elemento_ |
| **cloudsmith.member.owner.count** <br>(gauge) | El número de usuarios con rol 'Propietario'<br>_Se muestra como elemento_ |
| **cloudsmith.member.manager.count** <br>(gauge) | El número de usuarios con rol 'Administrador'<br>_Se muestra como elemento_ |
| **cloudsmith.member.readonly.count** <br>(gauge) | El número de usuarios con rol 'Solo lectura'<br>_Se muestra como elemento_ |
| **cloudsmith.member.admin.count** <br>(gauge) | El número de usuarios con rol 'Admin'<br>_Se muestra como elemento_ |
| **cloudsmith.bandwidth_plan_limit_bytes** <br>(gauge) | El límite de ancho de banda en bytes definido por el plan<br>_Se muestra como byte_ |
| **cloudsmith.bandwidth_plan_limit_gb** <br>(gauge) | El límite de ancho de banda en gigabytes definido por el plan<br>_Se muestra como byte_ |
| **cloudsmith.bandwidth_used_gb** <br>(gauge) | El ancho de banda utilizado en gigabytes<br>_Se muestra como byte_ |
| **cloudsmith.storage_plan_limit_bytes** <br>(gauge) | El límite de almacenamiento en bytes definido por el plan<br>_Se muestra como byte_ |
| **cloudsmith.storage_plan_limit_gb** <br>(gauge) | El límite de almacenamiento en gigabytes definido por el plan<br>_Se muestra como byte_ |
| **cloudsmith.storage_used_gb** <br>(gauge) | El almacenamiento utilizado en gigabytes<br>_Se muestra como byte_ |
| **cloudsmith.storage_configured_bytes** <br>(gauge) | El almacenamiento configurado en bytes, incluido el plan y el exceso<br>_Se muestra como byte_ |
| **cloudsmith.storage_configured_gb** <br>(gauge) | El almacenamiento configurado en gigabytes, incluido el plan y el exceso<br>_Se muestra como byte_ |
| **cloudsmith.bandwidth_configured_gb** <br>(gauge) | El ancho de banda configurado en gigabytes, incluido el plan y el exceso<br>_Se muestra como byte_ |
| **cloudsmith.bandwidth_configured_bytes** <br>(gauge) | El ancho de banda configurado en bytes, incluido el plan y el exceso<br>_Se muestra como byte_ |

### Checks de servicio

**cloudsmith.storage**

Devuelve `CRITICAL` si el uso es superior al 85 %, `WARNING` si el uso es superior al 75 %, en caso contrario devuelve `OK`.

_Estados: ok, warning, critical, unknown_

**cloudsmith.bandwidth**

Devuelve `CRITICAL` si el uso es superior al 85 %, `WARNING` si el uso es superior al 75 %, en caso contrario devuelve `OK`

_Estados: ok, warning, critical, unknown_

**cloudsmith.can_connect**

Devuelve CRITICAL si el Agent no puede conectarse a Cloudsmith para recopilar métricas, en caso contrario devuelve `OK`

_Estados: ok, critical_

### Eventos

Todos los eventos recopilados relacionados con Cloudsmith aparecen en Datadog Event Explorer con la etiqueta `source (fuente):cloudsmith`. Los eventos se recopilan cada cinco minutos para reducir el número de solicitudes enviadas a la API de Cloudsmith.

Hay varios tipos de eventos disponibles:

- Evento de logs de auditoría
- Evento de exploración de seguridad
- Evento de violación de la política de vulnerabilidad
- Acto de violación de la política de licencias
- Resumen de los miembros de la organización
- Resumen de cuotas (uso bruto)

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [soporte de Cloudsmith](https://support.cloudsmith.com/hc/en-us).