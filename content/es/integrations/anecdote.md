---
app_id: anecdote
app_uuid: 35d64545-cee9-4eb6-98be-65cb9fdd944a
assets:
  dashboards:
    'Anecdote: Bug Reports': assets/dashboards/anecdote_bug_reports.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: anecdote.feedback.App_Store
      metadata_path: metadata.csv
      prefix: anecdote.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 27474989
    source_type_name: Anecdote
  oauth: assets/oauth_clients.json
author:
  homepage: https://anecdoteai.com/
  name: Anecdote
  sales_email: abed@anec.app
  support_email: hello@anec.app
categories:
- ia/ml
- métricas
- recopilación de logs
- gestión de eventos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/anecdote/README.md
display_on_public_website: true
draft: false
git_integration_title: anecdote
integration_id: anecdote
integration_title: Anecdote
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: anecdote
public_title: Anecdote
short_description: Monitoriza los errores informados por tus clientes mediante comentarios
  en tu dashboard de Datadog.
supported_os:
- linux
- Windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Categoría::Métricas
  - Category::Log Collection
  - Tipo de datos enviados::Métricas
  - Category::Event Management
  - Submitted Data Type::Logs
  - Tipo de datos enviados::Eventos
  - Supported OS::Linux
  - Sistema operativo compatible::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Configuración
  description: Monitoriza los errores informados por tus clientes mediante comentarios
    en tu dashboard de Datadog.
  media:
  - caption: Resumen de los errores informados por los clientes.
    image_url: images/1.png
    media_type: imagen
  - caption: Prioriza la resolución de errores.
    image_url: images/2.png
    media_type: imagen
  - caption: Metadatos sobre los comentarios de los clientes.
    image_url: images/4.png
    media_type: imagen
  - caption: Alertas de comentarios en tiempo real.
    image_url: images/3.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Anecdote
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Anecdote monitoriza continuamente los comentarios de los clientes procedentes de fuentes como las reseñas de las tiendas de aplicaciones y los tickets de asistencia al cliente. A través de esta integración, Anecdote envía cualquier comentario clasificado como error a Datadog, además de la metainformación disponible (versión, sistema operativo, etc.).

Por cada nuevo fallo informado, Anecdote envía un evento a Datadog para que puedas crear un caso o un incidente. Además, esta solución permite analizar la correlación de las señales de máquinas (como el uso de CPU) con las señales notificadas por los usuarios.
Utilizando los logs con datos de los comentarios de los clientes se puede acortar significativamente el tiempo medio de respuesta (MTTR) y detectar sistemáticamente problemas difíciles de replicar.

Anecdote monitoriza comentarios de clientes procedentes de más de 80 fuentes, entre ellas:

- Tickets de asistencia (Zendesk, Intercom, Freshdesk y otros)
- Reseñas públicas (App Store, Google Play y Trustpilot)
- Comentarios en las redes sociales Twitter, Reddit y Facebook
- Encuestas a clientes (SurveyMonkey, Typeform, Medallia y otros)

Al agregar y analizar los errores notificados por los usuarios en un dashboard unificado, los desarrolladores tienen una visión completa de los comentarios de los clientes, lo que les permite priorizar y abordar los problemas con mayor eficacia.

## Configuración

### Configuración

1. En Datadog, ve a **Integraciones** y busca Anecdote.

2. En la página de la integración Anecdote, haz clic en **Install** (Instalar) para instalar la integración.

3. Una vez finalizada la instalación, haz clic en **Connect Accounts** (Conectar cuentas) para conectar tus cuentas de Anecdote y Datadog.

4. Se te redirigirá a la página de inicio de sesión de Anecdote. Inicia sesión con tus credenciales de Anecdote.

5. Una vez que hayas iniciado sesión en Anecdote, ve a la sección Integraciones.

6. En la sección Integraciones, busca y selecciona la integración Datadog.

7. Introduce la región en la que se encuentra tu espacio de trabajo Datadog. Esto garantiza que la integración apunte al servidor Datadog correcto.

8. Se te redirigirá a Datadog para autenticar tu cuenta. Inicia sesión con tus credenciales de Datadog.

9. Luego de conectarte a Datadog, instala la aplicación Anecdote. Esto añade "Anecdote: Informes de errores" a tu lista de dashboards en Datadog.

10. En Anecdote, comprueba que la integración se ha conectado correctamente. Deberías ver un mensaje de confirmación o el estado de la integración.

11. Una vez verificada la integración, puedes empezar a utilizar Anecdote para enviar informes de errores directamente a Datadog y monitorizarlos en la página Dashboards.

### Validación

Para validar el estado de la conexión, puedes comprobar el dashboard de Anecdote en Datadog, que muestra informes de errores relacionados con tu aplicación.

## Desinstalación

- Inicia sesión en tu [cuenta Anecdote][1].
- Ve a la sección Integraciones.
- Busca la integración Datadog y haz clic en el icono de suprimir para eliminar la integración.
- Además, asegúrate de que todas las claves de API asociadas a esta integración se hayan desactivado buscando el nombre de la integración en la [página Claves de API][2].

## Datos recopilados

### Métricas
Consulta `metadata.csv` para ver una lista de las métricas proporcionadas por esta integración.

## Asistencia

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Anecdote][3].


[1]: https://app.anecdoteai.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: mailto:hello@anec.app