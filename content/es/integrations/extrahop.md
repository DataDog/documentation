---
app_id: extrahop
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Obtén información sobre logs de detección e investigación de ExtraHop.
integration_version: 1.0.0
media:
- caption: ExtraHop - Detecciones
  image_url: images/extrahop_detections.png
  media_type: imagen
title: ExtraHop
---
## Información general

[ExtraHop](https://docs.extrahop.com/current/) aplica técnicas de machine learning y monitorización basadas en reglas a tus datos de cable para identificar comportamientos inusuales y riesgos potenciales para la seguridad y el rendimiento de tu red.

Esta integración ingiere los siguientes logs:

- Detección: Representa datos de comportamientos anómalos identificados por el sistema ExtraHop.
- Investigación: Representa una colección de datos relacionados con una investigación de seguridad específica, incluyendo su estado, asignación y detecciones asociadas.

Esta integración recopila de forma continua todos los logs mencionados y los canaliza a Datadog para su análisis. Aprovechando los pipelines de logs integrados, estos logs se analizan y enriquecen, lo que permite realizar búsquedas y análisis sin esfuerzo. La integración proporciona información sobre detecciones e investigaciones a través de dashboards predefinidos.

## Configuración

### Generar credenciales de API en ExtraHop

1. Inicia sesión en la plataforma ExtraHop.
1. Ve a **System Settings** > **API Access** (Configuración del sistema > Acceso API) y haz clic en **Create Credentials** (Crear credenciales) que se encuentra en la parte inferior de la página en la sección **Rest API Credentials** (Credenciales API Rest).
1. Ve a **System Settings** > **API Access** > **Rest API Credentials** (Configuración del sistema > Acceso API > Credenciales API Rest). En la esquina superior derecha, haz clic en **Create Credentials** (Crear credenciales) y especifica la configuración del nuevo ID de cliente y del secreto de cliente.
   - Nombre: Un nombre significativo que puede ayudarte a identificar el ID de cliente y el secreto de cliente.
   - Acceso al sistema: El permiso de acceso al sistema asignado al ID y al secreto. Selecciona **Full read-only** (Solo lectura total).
   - Acceso al módulo NDR: El permiso de acceso al módulo NDR asignado al ID y al secreto. Selecciona **Full Access** (Acceso total).
   - Acceso al módulo NPM: El permiso de acceso al módulo NPM asignado al ID y al secreto. Selecciona **No Access** (Sin acceso).
   - Acceso a paquetes y claves de sesión: El permiso de acceso a paquetes y claves de sesión asignado al ID y secreto. Selecciona **No Access** (Sin acceso).
1. Haz clic en **Save** (Guardar).

### Conecta tu cuenta ExtraHop a Datadog.

1. Añade tus credenciales de ExtraHop.

   | Parámetros de ExtraHop | Descripción |
   | ------------------------------------- | ------------------------------------------------------------ |
   | Subdominio | El subdominio de tu consola ExtraHop       
   | ID de cliente | El ID de cliente de tu consola ExtraHop.
   | Secreto de cliente | El secreto de cliente de tu consola ExtraHop |

1. Haz clic en el botón Save (Guardar) para guardar la configuración.

## Datos recopilados

### Logs

La integración de ExtraHop recopila y envía la detección e investigación de logs de ExtraHop a Datadog.

### Métricas

La integración ExtraHop no incluye métricas.

### Checks de servicio

ExtraHop no incluye checks de servicio.

### Eventos

La integración ExtraHop no incluye eventos.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).