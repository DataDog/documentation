---
app_id: github-copilot
app_uuid: b976afbb-2433-4bd9-b33d-5b9856114285
assets:
  dashboards:
    Copilot Overview: assets/dashboards/github_copilot_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - github_copilot.organizations.billing.seats.total
      metadata_path: metadata.csv
      prefix: github_copilot
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 31503641
    source_type_name: GitHub Copilot
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ia/ml
- colaboración
- herramientas para desarrolladores
- métricas
- control de fuentes
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: github_copilot
integration_id: github-copilot
integration_title: GitHub Copilot
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: github_copilot
public_title: GitHub Copilot
short_description: Rastrea la distribución de licencias, monitoriza tendencias de
  adopción y analiza el compromiso de los desarrolladores con las funciones de Copilot.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Collaboration
  - Category::Developer Tools
  - Category::Metrics
  - Category::Source Control
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea la distribución de licencias, monitoriza tendencias de adopción
    y analiza el compromiso de los desarrolladores con las funciones de Copilot.
  media:
  - caption: Información general del dashboard de GitHub Copilot
    image_url: images/overview-dashboard.png
    media_type: imagen
  - caption: Finalización de GitHub Copilot Copde
    image_url: images/copilot_dashb_code-completion.png
    media_type: imagen
  - caption: Desglose de lenguajes de GitHub Copilot
    image_url: images/copilot_dsh_languages-breakdown.png
    media_type: imagen
  - caption: Chat de IDE de GitHub Copilot
    image_url: images/copilot_dash_ide-chat.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Documentación
    url: https://docs.datadoghq.com/integrations/github_copilot
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-github-copilot-with-datadog/
  support: README.md#Support
  title: GitHub Copilot
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

La integración de [GitHub Copilot][1] de Datadog te ofrece una gran visibilidad del uso de Copilot en toda tu organización, te ayuda a medir la adopción, optimizar el rendimiento del equipo y comprender el efecto de las sugerencias de código con tecnología de IA en tus workflows (UI) / procesos (generic) de desarrollo.
Con esta integración, puedes:
- **Analizar la adopción de Copilot** - Mide la frecuencia con la que los desarrolladores aceptan las sugerencias de código de Copilot e identifica qué fases de tu proceso de desarrollo aprovechan las funciones de Copilot.
- **Rastrear la distribución de licencias** - Monitoriza el estado de las licencias de Copilot asignadas en tu organización para garantizar una utilización óptima.
- **Comprender el compromiso de los usuarios** - Obtén información de la manera en que interactúan los desarrolladores con Copilot y distinge entre:
  - **Usuarios activos**: Desarrolladores que tienen cualquier actividad relacionada con Copilot, incluido recibir pasivamente una sugerencia de código o interactuar con el chat de Copilot.
  - **Usuarios comprometidos**: Desarrolladores que participan activamente con las funciones de Copilot, como aceptar una sugerencia o generar un resumen de solicitud de incorporación de cambios. Todos los usuarios comprometidos son también usuarios activos.

### Métricas recopiladas
Datadog ofrece una visibilidad exhaustiva de la adopción y el uso de Copilot con información detallada desglosada por equipo, lenguaje de programación, IDE y repositorio, incluidas:
- **Métricas de uso de Copilot**: Rastrea las interacciones clave de Copilot, incluidas las finalizaciones de código de IDE, la actividad del chat (tanto en IDE como en GitHub.com) y los resúmenes de solicitudes de incorporación de cambios. Estas métricas están disponibles diariamente y requieren al menos cinco licencias de Copilot activas en tu empresa.
  - **Finalización de código de IDE y chat** - Captura el uso en IDE, siempre que la telemetría esté activada.
  - **Chat de GitHub.com** - Mide las interacciones con el chat de Copilot en GitHub.com.
  - **Uso de solicitudes de incorporación de cambios** - Rastrea las actividades de relaciones públicas asistidas por Copilot, como los resúmenes automatizados.
- **Métricas de facturación** - Mantente al día con la visibilidad en tiempo real de las asignaciones de asientos de Copilot para el ciclo de facturación actual. Datadog actualiza continuamente estos datos para proporcionar una visión precisa y actualizada de la utilización de licencias.
Con la integración de GitHub Copilot de Datadog, puedes asegurarte de que el desarrollo asistido por IA esté impulsando la eficiencia mientras mantiene una visibilidad completa de tu adopción y efecto en todos tus equipos.


## Configuración

Para integrar GitHub Copilot con Datadog, Datadog se conecta a GitHub mediante OAuth. El usuario autenticado debe tener permisos de propietario en las organizaciones que desea integrar. 

### Instalación

1. Ve a la [Page (página) de integraciones][2] y busca la integración de "GitHub Copilot".
2. Haz clic en el ícono.
3. Para añadir una cuenta para instalar la integración, haz clic en el botón **Add GitHub Account** (Añadir Cuenta de GitHub).
4. Tras leer las instrucciones del modal, haz clic en el botón **Authorize** (Autorizar), que te redirigirá a la Page (página) de inicio de sesión de GitHub.
5. Tras iniciar sesión, se te solicitará que selecciones a qué organizaciones de GitHub deseas conceder acceso, en función de las organizaciones a las que tenga acceso tu cuenta de usuario.
6. Para organizaciones restringidas:
   - Haz clic en **Request** (Solicitar) junto al nombre de la organización
   - Administraciones de organizaciones: aprobar en **Organization settings > Third-party Access > OAuth app policy¨** (Parámetros de la organización > Acceso de terceros > Política de aplicaciones de OAuth)
   ![Acceso aprobado por GH][3]
7. Haz clic **Authorize datadog-integrations** (Autorizar integraciones de Datadog).
8. Se te redirige de nuevo al ícono de GitHub Copilot de Datadog con una nueva cuenta. Datadog recomienda cambiar el nombre de la cuenta por algo que sea más fácil de recordar. Puedes añadir varias cuentas con acceso a distintas organizaciones.

**Nota**: GitHub guarda esta selección de autorización. Para que se te solicite de nuevo o para añadir nuevas organizaciones, revoca el acceso a la aplicación en GitHub (`Integrations > Applications > Authorized OAuth Apps > Datadog - GitHub Copilot OAuth App`) y, a continuación, reinicia la configuración.
![Acceso revocado por GH][4]

## Validación

Tras la instalación, las métricas están disponibles con el prefijo `github_copilot`.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "github_copilot" >}}


### Checks de servicio

GitHub Copilot no incluye ningún check de servicio.

### Eventos

GitHub Copilot no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con la [asistencia técnica de Datadog][6].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitoriza GitHub Copilot con Datadog][7]

[1]: https://github.com/features/copilot
[2]: https://app.datadoghq.com/integrations/github-copilot
[3]: images/gh_approved_access.png
[4]: images/revoke_access_gh.png
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/github_copilot/metadata.csv
[6]: https://docs.datadoghq.com/es/help/
[7]: https://www.datadoghq.com/blog/monitor-github-copilot-with-datadog/