---
app_id: workday
app_uuid: 011547b7-572e-481a-988a-69c1ad8c6779
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10381
    source_type_name: Workday
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: workday
integration_id: workday
integration_title: Logs de actividad de usuarios de Workday
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: workday
public_title: Logs de actividad de usuarios de Workday
short_description: Visualiza logs de Workday en Datadog para análisis de conformidad
  y Cloud SIEM.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Tipo de datos enviados::Logs
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Visualiza logs de Workday en Datadog para análisis de conformidad y
    Cloud SIEM.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Logs de actividad de usuarios de Workday
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Esta integración permite recopilar logs de actividad de usuarios de Workday para observar la actividad de los usuarios dentro de un inquilino de Workday. Esta integración te permite:

- Controlar la conservación de tus datos de Workday.
- Crear widgets y dashboards personalizados.
- Configurar reglas de detección de [Cloud SIEM][1] utilizando [pipelines de logs predefinidos][2].
- Realiza una referencia cruzada de eventos de Workday con datos de otros servicios de tu stack tecnológico.

La integración Workday de Datadog recopila logs utilizando la [API de generación de logs de actividad de usuarios de Workday][3], que genera logs que permiten obtener información sobre:

- Qué usuarios realizan solicitudes en Workday
- Qué tipo de solicitudes se realizan
- El número total de solicitudes realizadas
- Otros metadatos relacionados con eventos, como el tipo de dispositivo y la dirección IP

## Configuración

### Instalación

**Paso 1: Activar la generación de logs de actividad de usuarios a nivel de inquilino**

1. Accede a la tarea **Editar configuración del inquilino - Sistema** y asegúrate de que la casilla **Activar generación de logs de actividad de usuarios** está seleccionada.
2. Accede a la tarea **Editar configuración del inquilino - Sistema** y asegúrate de que la casilla **Clientes OAuth 2.0 habilitados** está seleccionada.

**Paso 2: Crear un usuario del sistema de la integración**

1. Accede a la tarea **Crear usuario del sistema de la integración**.
   - Nombre de usuario: < ISU_Datadog >.
   - Minutos para la expiración de sesión: 0 (desactivar la expiración de la sesión).
   - No permitir sesiones de interfaz de usuario: Sí (selecciona esta casilla).
2. Accede a la tarea **Crear grupo de seguridad**.
   - Tipo de grupo de seguridad arrendado: Grupo de seguridad del sistema de la integración (sin restricciones).
   - Nombre: < ISSG_Datadog_Monitoring >.
3. Accede a la tarea **Editar grupo de seguridad del sistema de la integración** (sin restricciones) para el grupo que acabas de crear.
   - Usuarios del sistema de la integración: < ISU_Datadog >.
4. Accede a la tarea **Ver Dominio** para ver el dominio Auditoría del sistema.
5. Ve a Select Domain > Edit Security Policy Permissions (Seleccionar dominio > Editar permisos de la política de seguridad) en el menú de acciones relacionadas con Auditoría del sistema.
6. Añade el grupo que creaste, Monitorización de seguridad remota, a ambas tablas:
   - Tabla de permisos de informe/tarea: ver acceso
   - Tabla de permisos de integración: obtener acceso
7. Accede a la tarea Activar cambios pendientes de la política de seguridad y activa los cambios que realizaste.

**Paso 3: Registrar el cliente API para las integraciones de tu inquilino**

1. Accede a la tarea **Registrar clientes API para las integraciones** y registra el cliente.
   - Nombre del cliente: < Datadog User Activity Monitor >.
   - Tokens de actualización que no expiran: Sí
   - Contexto: Sistema

**Paso 4: Obtener los valores de configuración necesarios para configurar el monitor en Datadog**

1. Accede a la tarea Ver clientes API, selecciona la pestaña Clientes API para integraciones, y confirma estos parámetros:
   - Tipo de concesión a clientes: Concesión de código de autorización
   - Tipo de token de acceso: Portador
2. Copia y guarda estos cuatro valores (los dos primeros están en la parte superior de la página):
   - Endpoint de API REST Workday
   - Endpoint de token
   - ID de cliente
   - Secreto de cliente
3. Selecciona **API Client > Manage Refresh Token for Integrations** (Cliente API > Gestionar tokens de actualización para integraciones) en el menú de acciones relacionadas con el cliente.
   - Cuenta de Workday: < ISU_Datadog >.
4. Selecciona la casilla **Generar nuevo token de actualización** y guarda el token.
5. Crear la integración Datadog
   - Introduce los valores que guardaste en la pestaña de configuración de Datadog.
   - Introduce la parte del dominio de la URL: **https://DOMAIN/**.

## Datos recopilados

### Métricas

La integración Workday no incluye métricas.

### Logs

### Eventos

La integración Workday no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "workday" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://app.datadoghq.com/security/siem/home
[2]: https://app.datadoghq.com/logs/pipelines?search=workday
[3]: https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#privacy/v1/get-/activityLogging
[4]: https://github.com/DataDog/integrations-internal-core/blob/master/workday/assets/service_checks.json
[5]: https://docs.datadoghq.com/es/help/