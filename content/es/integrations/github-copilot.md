---
aliases:
- /es/integrations/github_copilot
app_id: github-copilot
categories:
- ia/ml
- colaboración
- herramientas de desarrollo
- métricas
- control de fuentes
custom_kind: integración
description: Realiza un seguimiento de la distribución de licencias, monitoriza tendencias
  de adopción y analiza el compromiso de los desarrolladores con las funciones de
  Copilot.
further_reading:
- link: https://docs.datadoghq.com/integrations/github_copilot
  tag: documentación
  text: Documentación de GitHub Copilot
- link: https://www.datadoghq.com/blog/monitor-github-copilot-with-datadog/
  tag: blog
  text: Monitorizar GitHub Copilot con Datadog
media:
- caption: Dashboard con información general de GitHub Copilot
  image_url: images/overview-dashboard.png
  media_type: imagen
- caption: Código de finalización de GitHub Copilot
  image_url: images/copilot_dashb_code-completion.png
  media_type: imagen
- caption: Desglose de lenguajes de GitHub Copilot
  image_url: images/copilot_dsh_languages-breakdown.png
  media_type: imagen
- caption: Chat de GitHub Copilot en el IDE
  image_url: images/copilot_dash_ide-chat.png
  media_type: imagen
title: GitHub Copilot
---
## Información general

La integración [GitHub Copilot](https://github.com/features/copilot) de Datadog te ofrece una amplia visibilidad del uso de Copilot en toda tu organización, te ayuda a medir la adopción, a optimizar el rendimiento de los equipos y a comprender el impacto de las sugerencias de código con tecnología de IA en tus flujos de trabajo de desarrollo.
Con esta integración, puedes:

- **Analizar la adopción de Copilot**: Mide la frecuencia con la que los desarrolladores aceptan las sugerencias de código de Copilot e identifica las fases de tu proceso de desarrollo que aprovechan las funciones de Copilot.
- **Realizar un seguimiento de la distribución de licencias**: Monitoriza el estado de las licencias Copilot asignadas dentro de tu organización para garantizar un uso óptimo.
- **Comprender el compromiso de los usuarios**: Descubre cómo interactúan los desarrolladores con Copilot y distingue entre:
  - **Usuarios activos**: Desarrolladores que tienen cualquier actividad relacionada con Copilot, incluyendo la recepción pasiva de una sugerencia de código o la interacción con el chat de Copilot.
  - **Usuarios comprometidos**: Desarrolladores que se comprometen activamente con las funciones de Copilot, por ejemplo al aceptar una sugerencia o al generar un resumen de solicitud pull. Todos los usuarios comprometidos son también usuarios activos.

### Métricas recopiladas

Datadog ofrece una amplia visibilidad de la adopción y el uso de Copilot con información detallada desglosada por equipo, lenguaje de programación, IDE y repositorio, incluyendo:

- **Métricas de uso de Copilot**: Realiza un seguimiento de las interacciones clave con Copilot, incluidas las finalizaciones de código IDE, la actividad del chat (tanto en los IDE como en GitHub.com) y los resúmenes de solicitudes pull. Estas métricas están disponibles diariamente y requieren al menos cinco licencias de Copilot activas en tu empresa.
  - **Finalización de código del IDE y chat**: Captura el uso dentro de los IDE, siempre que la telemetría esté activada.
  - **Chat de GitHub.com**: Mide las interacciones con el chat de Copilot en GitHub.com.
  - **Uso de solicitudes pull**: Realiza un seguimiento de las actividades de solicitudes pull asistidas por Copilot, como los resúmenes automatizados.
- **Métricas de facturación**: Mantente al día con la visibilidad en tiempo real de las asignaciones de asientos de Copilot del ciclo de facturación actual. Datadog actualiza continuamente estos datos para proporcionar una vista precisa y actualizada del uso de licencias.
  Con la integración GitHub Copilot de Datadog, puedes asegurarte de que el desarrollo asistido por IA incentiva la eficiencia y al mismo tiempo mantiene una visibilidad completa de su adopción y de su impacto en tus equipos.

## Configuración

Para integrar GitHub Copilot con Datadog, Datadog se conecta a GitHub mediante OAuth. El usuario autenticado debe tener permisos de propietario en las organizaciones que quieren integrarse.

### Instalación

1. Ve a la página [Integraciones)](https://app.datadoghq.com/integrations/github-copilot) y busca la integración "GitHub Copilot".
1. Haz clic en el cuadro.
1. Para añadir una cuenta para instalar la integración, haz clic en el botón **Add GitHub Account** (Añadir cuenta de GitHub).
1. Luego de leer las instrucciones del modal, haz clic en el botón **Authorize** (Autorizar), que te redirigirá a la página de inicio de sesión de GitHub.
1. Luego de iniciar sesión, se te pedirá que selecciones las organizaciones de GitHub a las que quieres conceder acceso, en función de las organizaciones a las que tenga acceso tu cuenta de usuario.
1. Para organizaciones restringidas:
   - Haz clic en **Request** (Solicitar) junto al nombre de la organización
   - Administradores de la organización: Apruébalos en **Organization settings > Third-party Access > OAuth app policy** (Configuración de la organización > Acceso de terceros > Política de la aplicación OAuth).
     ![GH acceso aprobado](images/gh_approved_access.png)
1. Haz clic en **Authorize datadog-integrations** (Autorizar datadog-integrations).
1. Se te redirigirá nuevamente al cuadro de GitHub Copilot en Datadog con una nueva cuenta. Datadog recomienda cambiar el nombre de la cuenta por una que sea más fácil de recordar. Puedes añadir varias cuentas con acceso a distintas organizaciones.

**Nota**: GitHub guarda esta selección de autorización. Para que se solicite nuevamente o para añadir nuevas organizaciones, revoca el acceso a la aplicación en GitHub (`Integrations > Applications > Authorized OAuth Apps > Datadog - GitHub Copilot OAuth App`) y, a continuación, reinicia el proceso de configuración.
![GH revocar acceso](images/revoke_access_gh.png)

## Validación

Luego de la instalación, las métricas están disponibles con el prefijo `github_copilot`.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **github_copilot.organizations.billing.seats.total** <br>(count) | Número total de asientos facturados a la organización en el ciclo de facturación actual.|
| **github_copilot.organizations.billing.seats.added_this_cycle** <br>(count) | Asientos añadidos durante el ciclo de facturación actual.|
| **github_copilot.organizations.billing.seats.pending_invitation** <br>(count) | Número de asientos asignados a usuarios que aún no han aceptado una invitación a esta organización.|
| **github_copilot.organizations.billing.seats.pending_cancellation** <br>(count) | Número de asientos pendientes de cancelación al final del ciclo de facturación actual.|
| **github_copilot.organizations.billing.seats.active_this_cycle** <br>(count) | Número de asientos que han utilizado Copilot durante el ciclo de facturación actual.|
| **github_copilot.organizations.billing.seats.inactive_this_cycle** <br>(count) | Número de asientos que no han utilizado Copilot durante el ciclo de facturación actual.|
| **github_copilot.organizations.total_active_users** <br>(count) | Número total de usuarios de Copilot con una actividad correspondiente a cualquier función de Copilot, globalmente, en un día determinado. Incluye la actividad pasiva, como recibir una sugerencia de código, así como la actividad de participación, como aceptar una sugerencia de código o interactuar con el chat. No incluye eventos de autenticación. No se limita a las funciones individuales detalladas en el endpoint.|
| **github_copilot.organizations.total_engaged_users** <br>(count) | Número total de usuarios de Copilot que se han comprometido con cualquier función de Copilot en un día determinado. Los ejemplos incluyen, entre otros, la aceptación de una sugerencia de código, la interacción con el chat de Copilot o la activación de un resumen de solicitudes pull. No incluye eventos de autenticación. No se limita a las funciones individuales detalladas en el endpoint.|
| **github_copilot.organizations.copilot_ide_code_completions.total_engaged_users** <br>(count) | Número de usuarios que han aceptado al menos una sugerencia de código de Copilot, en todos los editores activos. Incluye aceptaciones totales y parciales.|
| **github_copilot.organizations.copilot_ide_code_completions.languages.total_engaged_users** <br>(count) | Número de usuarios que han aceptado al menos una sugerencia de compleción de código de Copilot para el lenguaje dado. Incluye aceptaciones totales y parciales.|
| **github_copilot.organizations.copilot_ide_code_completions.editors.total_engaged_users** <br>(count) | Número de usuarios que han aceptado al menos una sugerencia de finalización de código de Copilot para el editor dado. Incluye aceptaciones totales y parciales.|
| **github_copilot.organizations.copilot_ide_code_completions.editors.models.total_engaged_users** <br>(count) | Número de usuarios que han aceptado al menos una sugerencia de finalización de código de Copilot para el editor, el lenguaje y el modelo dados. Incluye aceptaciones totales y parciales.|
| **github_copilot.organizations.copilot_ide_code_completions.editors.models.languages.total_engaged_users** <br>(count) | Número de usuarios que han aceptado al menos una sugerencia de finalización de código de Copilot para el editor y el lenguaje dados. Incluye aceptaciones totales y parciales.|
| **github_copilot.organizations.copilot_ide_code_completions.editors.models.languages.total_code_suggestions** <br>(count) | Número de sugerencias de código Copilot generadas para el editor y el lenguaje dados.|
| **github_copilot.organizations.copilot_ide_code_completions.editors.models.languages.total_code_acceptances** <br>(count) | Número de sugerencias de código Copilot aceptadas para el editor y el lenguaje dados. Incluye aceptaciones totales y parciales.|
| **github_copilot.organizations.copilot_ide_code_completions.editors.models.languages.total_code_lines_accepted** <br>(count) | Número de líneas de código aceptadas de las sugerencias de código de Copilot para el editor y el lenguaje dados.|
| **github_copilot.organizations.copilot_ide_code_completions.editors.models.languages.total_code_lines_suggested** <br>(count) | Número de líneas de código sugeridas por las finalizaciones de código de Copilot para el editor y el lenguaje dados.|
| **github_copilot.organizations.copilot_ide_chat.total_engaged_users** <br>(count) | Número total de usuarios que han interactuado con el chat de Copilot en el IDE.|
| **github_copilot.organizations.copilot_ide_chat.editors.total_engaged_users** <br>(count) | Número de usuarios que han interactuado con el chat de Copilot en el editor especificado.|
| **github_copilot.organizations.copilot_ide_chat.editors.models.total_engaged_users** <br>(count) | Número de usuarios que han interactuado con el chat de Copilot en el editor y el modelo dados.|
| **github_copilot.organizations.copilot_ide_chat.editors.models.total_chats** <br>(count) | Número total de chats iniciados por los usuarios en el editor y el modelo dados.|
| **github_copilot.organizations.copilot_ide_chat.editors.models.total_chat_insertion_events** <br>(count) | Número de veces que los usuarios han aceptado una sugerencia de código del chat de Copilot utilizando el elemento de interfaz de usuario "Insertar código", para el editor dado.|
| **github_copilot.organizations.copilot_ide_chat.editors.models.total_chat_copy_events** <br>(count) | Número de veces que los usuarios han copiado una sugerencia de código del chat de Copilot utilizando el teclado o el elemento de interfaz de usuario "Copiar", para el editor dado.|
| **github_copilot.organizations.copilot_dotcom_chat.total_engaged_users** <br>(count) | Número total de usuarios que han interactuado con el chat de Copilot en github.com al menos una vez.|
| **github_copilot.organizations.copilot_dotcom_chat.models.total_engaged_users** <br>(count) | Número total de usuarios que han interactuado con el chat de Copilot en github.com al menos una vez por cada modelo.|
| **github_copilot.organizations.copilot_dotcom_chat.models.total_chats** <br>(count) | Número total de chats iniciados por los usuarios en github.com.|
| **github_copilot.organizations.copilot_dotcom_pull_requests.total_engaged_users** <br>(count) | Número de usuarios que han utilizado Copilot para solicitudes pull en github.com para generar un resumen de solicitudes pull al menos una vez.|
| **github_copilot.organizations.copilot_dotcom_pull_requests.repositories.total_engaged_users** <br>(count) | Número de usuarios que han generado resúmenes de solicitudes pull utilizando Copilot para solicitudes pull en el repositorio dado.|
| **github_copilot.organizations.copilot_dotcom_pull_requests.repositories.models.total_engaged_users** <br>(count) | Número de usuarios que han generado resúmenes de solicitudes pull utilizando Copilot para solicitudes pull en el repositorio y el modelo dados.|
| **github_copilot.organizations.copilot_dotcom_pull_requests.repositories.models.total_pr_summaries_created** <br>(count) | Número de resúmenes de solicitudes pull generados utilizando Copilot para solicitudes pull en el repositorio dado.|
| **github_copilot.organizations.teams.total_active_users** <br>(count) | Número total de usuarios de Copilot con una actividad correspondiente a cualquier función de Copilot, globalmente, en un día determinado. Incluye la actividad pasiva, como recibir una sugerencia de código, así como la actividad de participación, como aceptar una sugerencia de código o interactuar con el chat. No incluye eventos de autenticación. No se limita a las funciones individuales detalladas en el endpoint.|
| **github_copilot.organizations.teams.total_engaged_users** <br>(count) | Número total de usuarios de Copilot que se han comprometido con cualquier función de Copilot en un día determinado. Los ejemplos incluyen, entre otros, la aceptación de una sugerencia de código, la interacción con el chat de Copilot o la activación de un resumen de solicitudes pull. No incluye eventos de autenticación. No se limita a las funciones individuales detalladas en el endpoint.|
| **github_copilot.organizations.teams.copilot_ide_code_completions.total_engaged_users** <br>(count) | Número de usuarios que han aceptado al menos una sugerencia de código de Copilot, en todos los editores activos. Incluye aceptaciones totales y parciales.|
| **github_copilot.organizations.teams.copilot_ide_code_completions.languages.total_engaged_users** <br>(count) | Número de usuarios que han aceptado al menos una sugerencia de compleción de código de Copilot para el lenguaje dado. Incluye aceptaciones totales y parciales.|
| **github_copilot.organizations.teams.copilot_ide_code_completions.editors.total_engaged_users** <br>(count) | Número de usuarios que han aceptado al menos una sugerencia de finalización de código de Copilot para el editor dado. Incluye aceptaciones totales y parciales.|
| **github_copilot.organizations.teams.copilot_ide_code_completions.editors.models.total_engaged_users** <br>(count) | Número de usuarios que han aceptado al menos una sugerencia de finalización de código de Copilot para el editor y el modelo dados. Incluye aceptaciones totales y parciales.|
| **github_copilot.organizations.teams.copilot_ide_code_completions.editors.models.languages.total_engaged_users** <br>(count) | Número de usuarios que han aceptado al menos una sugerencia de finalización de código de Copilot para el editor, el lenguaje y el modelo dados. Incluye aceptaciones totales y parciales.|
| **github_copilot.organizations.teams.copilot_ide_code_completions.editors.models.languages.total_code_suggestions** <br>(count) | Número de sugerencias de código de Copilot generadas para el editor, el lenguaje y el modelo dados.|
| **github_copilot.organizations.teams.copilot_ide_code_completions.editors.models.languages.total_code_acceptances** <br>(count) | Número de sugerencias de código de Copilot aceptadas para el editor, el lenguaje y el modelo dados. Incluye aceptaciones totales y parciales.|
| **github_copilot.organizations.teams.copilot_ide_code_completions.editors.models.languages.total_code_lines_accepted** <br>(count) | Número de líneas de código aceptadas de las sugerencias de código de Copilot para el editor, el lenguaje y el modelo dados.|
| **github_copilot.organizations.teams.copilot_ide_code_completions.editors.models.languages.total_code_lines_suggested** <br>(count) | Número de líneas de código sugeridas por las finalizaciones de código de Copilot para el editor, el lenguaje y el modelo dados.|
| **github_copilot.organizations.teams.copilot_ide_chat.total_engaged_users** <br>(count) | Número total de usuarios que han interactuado con el chat de Copilot en el IDE.|
| **github_copilot.organizations.teams.copilot_ide_chat.editors.total_engaged_users** <br>(count) | Número de usuarios que han interactuado con el chat de Copilot en el editor especificado.|
| **github_copilot.organizations.teams.copilot_ide_chat.editors.models.total_engaged_users** <br>(count) | Número de usuarios que han interactuado con el chat de Copilot en el editor y el modelo dados.|
| **github_copilot.organizations.teams.copilot_ide_chat.editors.models.total_chats** <br>(count) | Número total de chats iniciados por los usuarios en el editor y el modelo dados.|
| **github_copilot.organizations.teams.copilot_ide_chat.editors.models.total_chat_insertion_events** <br>(count) | Número de veces que los usuarios han aceptado una sugerencia de código del chat de Copilot utilizando el elemento de interfaz de usuario "Insertar código", para el editor dado.|
| **github_copilot.organizations.teams.copilot_ide_chat.editors.models.total_chat_copy_events** <br>(count) | Número de veces que los usuarios han copiado una sugerencia de código del chat de Copilot utilizando el teclado o el elemento de interfaz de usuario "Copiar", para el editor dado.|
| **github_copilot.organizations.teams.copilot_dotcom_chat.total_engaged_users** <br>(count) | Número total de usuarios que han interactuado con el chat de Copilot en github.com al menos una vez.|
| **github_copilot.organizations.teams.copilot_dotcom_chat.models.total_engaged_users** <br>(count) | Número total de usuarios que han interactuado con el chat de Copilot en github.com al menos una vez para cada modelo.|
| **github_copilot.organizations.teams.copilot_dotcom_chat.models.total_chats** <br>(count) | Número total de chats iniciados por los usuarios en github.com.|
| **github_copilot.organizations.teams.copilot_dotcom_pull_requests.total_engaged_users** <br>(count) | Número de usuarios que han utilizado Copilot para solicitudes pull en github.com para generar un resumen de solicitudes pull al menos una vez.|
| **github_copilot.organizations.teams.copilot_dotcom_pull_requests.repositories.total_engaged_users** <br>(count) | Número de usuarios que han generado resúmenes de solicitudes pull utilizando Copilot para solicitudes pull en el repositorio dado.|
| **github_copilot.organizations.teams.copilot_dotcom_pull_requests.repositories.models.total_engaged_users** <br>(count) | Número de usuarios que han generado resúmenes de solicitudes pull utilizando Copilot para solicitudes pull en el repositorio y el modelo dados.|
| **github_copilot.organizations.teams.copilot_dotcom_pull_requests.repositories.models.total_pr_summaries_created** <br>(count) | Número de resúmenes de solicitudes pull generados utilizando Copilot para solicitudes pull en el repositorio dado.|

### Checks de servicio

GitHub Copilot no incluye checks de servicio.

### Eventos

GitHub Copilot no incluye eventos.

## Solucionar problemas

### No aparecen las métricas

Si se producen errores al obtener datos del endpoint de métricas, como `/orgs/{org}/copilot/metrics`, comprueba que la política **API de métricas de Copilot** está activada en tu organización GitHub.

Para activar la política API de métricas de Copilot:

1. Ve a la configuración de tu organización GitHub.
1. En la barra lateral izquierda, selecciona **Copilot** > **Policies** (Copilot > Políticas).
1. Busca la sección **Copilot Metrics API** (API de métricas de Copilot) y haz clic en **Enable** (Activar).

Esta política es necesaria para que Datadog obtenga las métricas de uso de Copilot.

### ¿Aún necesitas ayuda?

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar GitHub Copilot con Datadog](https://www.datadoghq.com/blog/monitor-github-copilot-with-datadog/)