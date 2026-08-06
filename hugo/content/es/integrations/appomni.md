---
app_id: appomni
categories:
- nube
- conformidad
- seguridad
- ia/ml
- colaboración
custom_kind: integración
description: AppOmni evita las filtraciones de datos de SaaS protegiendo las aplicaciones
  que impulsan a la empresa.
integration_version: 1.0.0
media:
- caption: Dashboard de AppOmni en Datadog
  image_url: images/AppOmni-Datadog-Dashboard.png
  media_type: imagen
- caption: Destino AppOmni en Datadog
  image_url: images/AppOmni-Datadog-Destination.png
  media_type: imagen
- caption: Eventos AppOmni en Datadog
  image_url: images/AppOmni-Datadog-Log-Explorer.png
  media_type: imagen
- caption: Pipeline de logs AppOmni en Datadog
  image_url: images/AppOmni-Datadog-Logs-Configuration.png
  media_type: imagen
supported_os:
- linux
- Windows
- macOS
title: AppOmni
---
## Información general

**AppOmni** es una plataforma de seguridad SaaS líder que proporciona una visibilidad, una monitorización y un control profundos de las aplicaciones SaaS empresariales. Ayuda a las organizaciones a proteger sus datos detectando errores de configuración, accesos no autorizados y amenazas potenciales en las aplicaciones SaaS en la nube.

La integración de **AppOmni** centraliza tus logs de seguridad SaaS en Datadog, lo que te proporciona una visión unificada de eventos y alertas de seguridad. AppOmni normaliza los eventos de seguridad de las distintas aplicaciones SaaS, lo que garantiza la coherencia de la estructura de logs y facilita la correlación de actividades entre plataformas.

AppOmni genera alertas basadas en múltiples métodos de detección:

- **Análisis del Comportamiento de Usuarios y Entidades (UEBA)**: Detecta anomalías en la actividad de los usuarios estableciendo líneas de base e identificando desviaciones que puedan indicar cuentas comprometidas o amenazas internas.
- **Alertas basadas en umbrales**: Activa notificaciones cuando se superan los límites predefinidos (por ejemplo, exceso de intentos fallidos de inicio de sesión, exportaciones de gran volumen de datos).
- **Detección basada en secuencias:** Identifica patrones de ataque complejos analizando el orden y la relación de los eventos, como la escalada de privilegios seguida del acceso a datos confidenciales.

Al integrarse con Datadog, estos conocimientos permiten a los equipos de seguridad detectar, investigar y responder a las amenazas en tiempo real, lo que mejora la postura general de seguridad de sus entornos SaaS.

## Configuración

### Crear una clave de API Datadog

Crea una [clave de API Datadog](https://docs.datadoghq.com/account_management/api-app-keys/). Consulta los pasos a continuación:

1. Inicia sesión en Datadog.
1. Ve a **Organization settings** (Parámetros de la organización) y luego haz clic en **API Keys** (Claves de API).
1. Haz clic en **New Key** (Nueva clave).
1. Proporciona un nombre para la clave de API.
1. Haz clic en **Copy API key** (Copiar clave de API) y guarda esta clave para más tarde.

### Crear un destino AppOmni en Datadog

1. Inicia sesión en AppOmni.
1. Ve a **Threat Detection** (Detección de amenazas) y selecciona **Destinations** (Destinos).
1. Haz clic en **Add New Destination** (Añadir nuevo destino).
1. Haz clic en la tarjeta **Datadog Logs** (Logs de Datadog).
1. Introduce un **Nombre** y una **Descripción** (opcional).
1. Asegúrate de que las siguientes opciones están marcadas: **SSL Verification**, **Hash Original Field**, **Gzip Compress Payloads** (Verificación SSL, Hash de campo original, Comprimir cargas útiles Gzip).
1. Introduce tu **Clave de API Datadog**.
1. Selecciona tu **sitio Datadog**. Identifica el sitio en el que te encuentras utilizando [la tabla de sitios](https://docs.datadoghq.com/getting_started/site/).
1. Haz clic en **Save** (Guardar).

## Desinstalación

1. En Datadog, ve a **Organization settings** (Parámetros de la organización) y luego haz clic en **API Keys** (Claves de API).

1. Haz clic en **Revoke Key** (Revocar clave) para la clave de API que quieres eliminar.

### En AppOmni

1. Ve a **Threat Detection** (Detección de amenazas) y selecciona **Destinations** (Destinos).

1. Localiza el destino **Datadog** y haz clic en él.

1. Haz clic en **Configuration** (Configuración).

1. Haz clic en **Delete** (Borrar).

## Soporte

Póngase en contacto con support@appomni.com para solicitar asistencia.