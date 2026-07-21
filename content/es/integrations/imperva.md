---
app_id: imperva
categories:
- seguridad
- recopilación de logs
custom_kind: integración
description: Registros de auditoría Imperva y eventos WAF
integration_version: 1.0.0
media:
- caption: Dashboard de Imperva
  image_url: images/imperva_dashboard.png
  media_type: imagen
supported_os:
- Linux
- Windows
- macOS
title: Imperva
---
## Información general

Imperva ofrece soluciones de seguridad para redes y aplicaciones destinadas a proteger las aplicaciones y las API de ataques y a monitorizar incidentes. También actúa como red de distribución de contenido (CDN) global para almacenar páginas en caché y reducir el uso de ancho de banda.

La integración de Datadog con Imperva recopila logs y métricas de la [API de Attack Analytics](https://docs.imperva.com/bundle/cloud-application-security/page/cloud-v1-api-definition.htm), de la [API de Audit Trail](https://docs.imperva.com/bundle/cloud-application-security/page/audit-trail-api-definition.htm) y de la [API de métricas de Cloud Application Security Stats](https://docs.imperva.com/bundle/cloud-application-security/page/cloud-v1-api-definition.htm), que generan:

**Logs de Attack Analytics**
Estos logs representan incidentes de ciberataque contra tu cuenta y te ofrecen una visión completa de los ataques y atacantes que tienen como objetivo tus recursos. Se forman agregando y analizando alertas de seguridad, para luego agruparlas en incidentes de seguridad.

**Logs de Audit Trail**
Estos logs contienen las acciones realizadas en tu cuenta por usuarios de la cuenta, procesos del sistema, administradores del sistema y personal de asistencia técnica de Imperva.

**Métricas de Cloud Application Security Statistics**
Estas métricas de cortafuegos de aplicaciones web (WAF) miden eventos, visitas, rendimiento del almacenamiento en caché y uso de ancho de banda de los sitios protegidos por Imperva.

## Configuración

### Instalación

**Paso 1: Obtener tu clave de API y tu ID de API de Imperva**

1. Inicia sesión en tu cuenta de Imperva en https://management.service.imperva.com/ y haz clic en **Account/My Profile** (Cuenta/Mi perfil).
1. En la parte inferior de la página, haz clic en **Add API key** (Añadir clave de API) y sigue las instrucciones.
1. Después de crear la clave de API, copia y guarda los valores de **Clave de API** e **ID de API**.
1. Asegúrate de que el campo **Status** (Estado) de tu clave API está **activado**.

**Paso 2: Obtener tu ID de cuenta de Imperva**

1. En la consola de Imperva, selecciona la cuenta que quieres monitorizar.
1. Haz clic en el botón **Account** (Cuenta) y copia el ID de la cuenta actual. Es el número que aparece entre paréntesis después del nombre de la cuenta.

**Paso 3: Crear la integración Datadog**

1. Pega el ID de cuenta, el ID de API y la clave de API en los campos siguientes.
1. Introduce un nombre para la cuenta.

**Paso 4 (opcional): Añadir ID de sitio**

Para obtener métricas más detalladas por sitio, añade ID de sitio a tu cuenta.

1. Recupera el ID del sitio de la consola de gestión de Imperva.
1. Pega el ID del sitio y la URL del sitio en los campos siguientes.
1. El ID y la URL del sitio se utilizarán para etiquetar las métricas de Imperva de modo que puedan filtrarse por sitio en Datadog.

### Configuración

### Validación

Una vez instalada la integración, tus logs de Imperva estarán disponibles para su consulta en logs de Datadog utilizando `source:imperva`. Las métricas de Cloud Application Security Stats estarán disponibles con el prefijo `imperva.`.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **imperva.visits_human** <br>(count) | Visitas humanas<br>_Se muestra como evento_ |
| **imperva.visits_bot** <br>(count) | Visitas de bots<br>_Se muestra como evento_ |
| **imperva.hits_human** <br>(count) | Solicitudes humanas<br>_Se muestra como solicitud_ |
| **imperva.hits_human_per_second** <br>(rate) | Solicitudes humanas por segundo<br>_Se muestra como solicitud_ |
| **imperva.hits_bot** <br>(count) | Solicitudes de bots<br>_Se muestra como solicitud_ |
| **imperva.hits_bot_per_second** <br>(rate) | Solicitudes de bots por segundo<br>_Se muestra como solicitud_ |
| **imperva.hits_blocked** <br>(count) | Solicitudes bloqueadas<br>_Se muestra como solicitud_ |
| **imperva.hits_blocked_per_second** <br>(rate) | Solicitudes bloqueadas por segundo<br>_Se muestra como solicitud_ |
| **imperva.caching_hits_standard** <br>(count) | Almacenamiento en caché de solicitudes estándar<br>_Se muestra como solicitud_ |
| **imperva.caching_bytes_standard** <br>(count) | Almacenamiento en caché del ancho de banda estándar<br>_Se muestra en bytes_ |
| **imperva.caching_hits_advanced** <br>(count) | Almacenamiento en caché de solicitudes avanzadas<br>_Se muestra como solicitud_ |
| **imperva.caching_bytes_advanced** <br>(count) | Almacenamiento en caché del ancho de banda avanzado<br>_Se muestra en bytes_ |
| **imperva.caching_hits_total** <br>(count) | Almacenamiento en caché de solicitudes total<br>_Se muestra como solicitud_ |
| **imperva.caching_bytes_total** <br>(count) | Almacenamiento en caché del ancho de banda avanzado<br>_Se muestra en bytes_ |
| **imperva.bandwidth_bandwidth** <br>(count) | Ancho de banda<br>_Se muestra en bytes_ |
| **imperva.bandwidth_bits_per_second** <br>(rate) | Bits por segundo<br>_Se muestra en bits_ |
| **imperva.incapsula_rule_incidents** <br>(count) | Incidentes de reglas de Incapsula<br>_Se muestra como evento_ |

### Checks de servicio

Imperva no incluye checks de servicio.

### Eventos

Imperva no incluye eventos.

### Logs

La integración de Datadog con Imperva recopila logs y métricas de la API de Imperva, lo que genera:

- Eventos de seguridad WAF: Logs que capturan eventos de seguridad detectados por el cortafuegos de aplicaciones web (WAF) de Imperva, que incluyen amenazas, actividad maliciosa e infracciones de políticas que afectan a tus aplicaciones.

- Logs de Attack Analytics: Alertas de seguridad agregadas y agrupadas en incidentes, que proporcionan una visión completa de los ciberataques dirigidos a tu cuenta.

- Logs de acceso WAF: Logs de todas las solicitudes y respuestas entre los usuarios y el proxy de Imperva, que incluye el tráfico desde la caché de Imperva, lo que proporciona una visibilidad completa del tráfico de las aplicaciones.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).