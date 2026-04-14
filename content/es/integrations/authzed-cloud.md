---
aliases:
- /es/integrations/authzed_cloud
app_id: authzed-cloud
categories:
- herramientas de desarrollo
- seguridad
- nube
custom_kind: integración
description: AuthZed Cloud es un sistema de base de datos de núcleo abierto para crear
  y gestionar permisos de aplicaciones críticos para la seguridad.
integration_version: 1.0.0
media:
- caption: Ejemplo de dashboard
  image_url: images/dd-dashboard.png
  media_type: imagen
- caption: La interfaz de usuario de gestión de AuthZed Cloud
  image_url: images/management-ui.png
  media_type: imagen
- caption: El campo de juego del esquema SpiceDB
  image_url: images/playground.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: AuthZed Cloud
---
## Información general

[Authzed Cloud](https://authzed.com/products/authzed-dedicated) es un sistema de base de datos de núcleo abierto inspirado en [Google Zanzibar](https://authzed.com/zanzibar) para crear y gestionar permisos de aplicaciones críticos para la seguridad.

Los desarrolladores definen un esquema que modela sus requisitos de permisos. A continuación, utilizan cualquiera de las bibliotecas cliente oficiales o mantenidas por la comunidad para aplicar el esquema e insertar datos en la base de datos. Pueden consultar estos datos para comprobar eficazmente los permisos dentro de sus aplicaciones.

Las métricas de Authzed Cloud permiten a los desarrolladores y SREs monitorizar sus despliegues, incluyendo la latencia de las solicitudes, las métricas de caché (como el tamaño y las tasas de aciertos y errores), y la conexión del almacén de datos y el rendimiento de las consultas. Estas métricas ayudan a diagnosticar problemas de rendimiento y a ajustar el rendimiento de sus clústeres de SpiceDB.

El envío de estas métricas a Datadog permite a los usuarios aprovechar su stack tecnológico de observabilidad existente y correlacionar las métricas de Authzed Cloud con otros eventos del sistema.

## Configuración

La integración de Datadog está disponible en el dashboard de AuthZed, en la pestaña "Settings" (Configuración) de un sistema de permisos.

1. Ve a la página de inicio del dashboard.
1. Selecciona un Sistema de permisos para el que enviar métricas.
1. Haz clic en la pestaña **Settings" (Configuración).
1. Desplázate hasta el bloque **Datadog Metrics** (Métricas de Datadog) de la interfaz de usuario de configuración.
1. Introduce la **clave de API** de tu cuenta de Datadog.
1. Introduce tu [sitio de Datadog](https://docs.datadoghq.com/getting_started/site/) si es diferente del predeterminado.
1. Haz clic en **Save** (Guardar).

Para asegurarte de que el gráfico del dashboard de la latencia muestre correctamente las latencias p50, p95 y p99, también tendrás que establecer el parámetro **Percentiles** (Percentiles) para la métrica `authzed.grpc.server_handling` en la vista **Metrics Summary** (Resumen de métricas) en **ON** (Activado).

Poco después deberías ver cómo las métricas empiezan a fluir a Datadog. Si no es así, ponte en contacto con [nuestro servicio de asistencia](https://app.datadoghq.com/support@authzed.com).

## Desinstalación

La integración de Datadog está disponible en el dashboard de AuthZed, en la pestaña **Settings** (Configuración) de un Sistema de permisos.

1. Ve a la página de inicio del dashboard.
1. Selecciona un Sistema de permisos para el que enviar métricas.
1. Haz clic en la pestaña **Settings" (Configuración).
1. Desplázate hasta el bloque **Datadog Metrics** (Métricas de Datadog) de la interfaz de usuario de configuración.
1. Haz clic en **Remove** (Eliminar).

Esta acción desactiva la integración Datadog en tu clúster de AuthZed Cloud. Ten en cuenta que este proceso puede tardar varios minutos.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [soporte de AuthZed](mailto:support@authzed.com).