---
app_id: rundeck
app_uuid: beb808d2-cc12-4bc5-8ff7-b63552b35e0a
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: rundeck.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10099
    source_type_name: Rundeck
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Rundeck
  sales_email: forrest@rundeck.com
  support_email: forrest@rundeck.com
categories:
- automatización
- rum
- notificaciones
- orquestación
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rundeck/README.md
display_on_public_website: true
draft: false
git_integration_title: rundeck
integration_id: rundeck
integration_title: Rundeck
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rundeck
public_title: Rundeck
short_description: Automatización de las acciones de corrección con webhooks de Rundeck
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Automatización
  - Categoría::Incidentes
  - Categoría::Notificaciones
  - Categoría::Orquestación
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Automatización de las acciones de corrección con webhooks de Rundeck
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Rundeck
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Rundeck enriquece aún más las notificaciones de Datadog con funciones de flujo de trabajo automatizado para ayudar a diagnosticar problemas y solucionarlos. 

Más información sobre la automatización de tus runbooks para reducir el tiempo de incidentes en el [sitio web de Rundeck][1].

Algunos ejemplos de casos de uso son:

- Si un servicio Windows/Linux está caído, intentar reiniciarlo
- Si la sincronización NTP está desactivada, reiniciar el servicio NTP en ese equipo
- Limpiar logs y otros residuos de archivos cuando se llena el disco
- Reiniciar servicios en respuesta a colas de trabajo colgadas
- Aprovisionar capacidades en respuesta a una alta utilización

Utiliza las siguientes instrucciones para configurar tu integración Datadog/Rundeck.

## Configuración

### Instalación
Prepare al menos una tarea Rundeck que quieras activar mediante una alerta de Datadog.

### Configuración

#### Rundeck

1. En tu proyecto de Rundeck, haz clic en la opción de navegación **Webhooks**.
2. Haz clic en **Add** (Añadir).
3. Da un nombre al webhook, por ejemplo: `Datadog-Restart Service`.
4. Haz clic en el botón **Choose Webhook Plugin** (Elegir complemento de webhook) y selecciona **Run Job** (Ejecutar tarea).
5. Selecciona la tarea que quieres ejecutar cuando se active este webhook.
6. [Opcional] En la línea **Options** (Opciones), introduce el siguiente texto:
`-raw ${raw} -event_type ${data.event_type}``
(Esto hace que la carga útil completa de Datadog esté disponible como parte de las opciones de introducción de tareas).
7. Haz clic en **Create Webhook** (Crear webhook). El campo URL se rellena automáticamente después de crear el webhook.

![rundeck-setup][2]

**Nota**: Si utilizas un cortafuegos, añade los [rangos IP de Datadog][3] a tu lista de autorizaciones.

#### Configuración de Datadog
1. Abre Datadog y ve a **Integrations** > **Integrations** (Integraciones** > Integraciones).
2. Busca "webhooks".

   ![search-dd-2024][4]

3. Haz clic en la entrada del webhook que se muestra arriba. Se abrirá la ventana de configuración.

    ![webhooks-config][5]

4. Haz clic en el botón **New** (Nuevo) y rellena el formulario:
  - Da un nombre al webhook. (a)
  - Pega la URL de tu webhook Rundeck en la línea URL. Esto corresponde al paso 7 de la sección anterior. (b)
  - Haz clic en **Save** (Guardar). (c)

    ![webhook-fill][6]

Añade esta integración a cualquier notificación de alerta en Datadog añadiendo el destinatario de `@webhook-Rundeck_Restart_Service`. El nombre varía en función del nombre que le hayas dado al webhook en el paso 4a. Cuando el monitor activa una alerta, el webhook ejecuta la tarea asociada.

También se pueden utilizar otros complementos, como Advanced Run Job, en función de tu caso de uso.

## Datos recopilados

### Métricas

La integración Rundeck no proporciona métricas.

### Checks de servicio

La integración Rundeck no incluye checks de servicio.

### Eventos

La integración Rundeck no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

[1]: https://www.rundeck.com
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/rundeck-setup.png
[3]: https://docs.datadoghq.com/es/api/latest/ip-ranges/
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/dd-search.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/webhooks-config.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/webhook-fill.png
[7]: https://docs.datadoghq.com/es/help/