---
app_id: lambdatest
app_uuid: 8d4556af-b5e8-4608-a4ca-4632111931c1
assets:
  dashboards:
    LambdaTest: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: lambdatest.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10243
    source_type_name: LambdaTest
  logs:
    source: lambdatest
  oauth: assets/oauth_clients.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: LambdaTest
  sales_email: prateeksaini@lambdatest.com
  support_email: prateeksaini@lambdatest.com
categories:
- automatización
- contenedores
- rum
- seguimiento de problemas
- tests
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lambdatest/README.md
display_on_public_website: true
draft: false
git_integration_title: lambdatest
integration_id: lambdatest
integration_title: LambdaTest
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: lambdatest
public_title: LambdaTest
short_description: La plataforma de tests de automatización más potente
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Automatización
  - Categoría::Contenedores
  - Categoría::Incidentes
  - Categoría::Seguimiento de problemas
  - Categoría::Tests
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: La plataforma de tests de automatización más potente
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: LambdaTest
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Realiza una integración con LambdaTest y permite a tus equipos colaborar y realizar tests de forma eficaz. LambdaTest es una plataforma de tests en la nube que permite a los usuarios ejecutar tests manuales y automatizados en sus sitios web y aplicaciones web en más de 2000 navegadores, versiones de navegadores y sistemas operativos.

LambdaTest es compatible con marcos de tests manuales y de automatización como Selenium, Cypress, TestCafe, etc.

Con la integración de LambdaTest, registra errores al realizar tests entre los navegadores de tus sitios web (y aplicaciones web) a través de la plataforma LambdaTest. LambdaTest incluye automáticamente información sobre los tests de entornos, como la versión del navegador, el sistema operativo, la resolución, los comentarios y las capturas de pantalla en Datadog.

A continuación podrás ver todo lo que puedes hacer con LambdaTest:

- Tests interactivos en vivo en más de 2.000 navegadores y máquinas reales alojadas en la infraestructura de nube.
- Una cuadrícula de tests de automatización en línea admite tests de Selenium y Cypress en cualquier pipeline de CI/CD para que los equipos de control de calidad puedan validar y enviar compilaciones de calidad con mayor rapidez.
- Un navegador de última generación fácil de utilizar por los desarrolladores que los ayuda a crear sitios web eficaces y adaptables con rapidez.
- Más de 100 integraciones con herramientas de terceros para la gestión de proyectos, la comunicación, automatización sin código, CI/CD, etc.
- La ayuda está siempre disponible gracias a la asistencia por chat las 24 horas del día, los 7 días de la semana.
- Acceso gratuito de por vida a la plataforma con 100 minutos gratuitos de tests de automatización.

## Configuración

Toda la configuración ocurre en el dashboard de LambdaTest. Consulta la documentación de configuración de la [integración de LambdaTest en Datadog][1].

### Configuración

A continuación se explica cómo realizar un seguimiento de los problemas en Datadog con LambdaTest:

1. Haz clic en **Connect Accounts** (Conectar cuentas) para iniciar la autorización de la integración de LambdaTest desde la página de inicio de sesión en LambdaTest.
2. Inicia sesión en tu cuenta de LambdaTest, en el sitio web de LambdaTest, para que se te redirija a la página de autorización de Datadog.
3. Haz clic en **Authorize** (Autorizar) para completar el proceso de integración.
4. Una vez que se haya completado la configuración de la integración se enviará un correo electrónico de confirmación.
5. Una vez que Datadog esté integrado en tu cuenta de LambdaTest, comienza a registrar errores y a realizar tests entre navegadores.

## Desinstalación

Una vez que se desinstala esta integración, se revocan todas las autorizaciones anteriores. 

Además, asegúrate de que todas las claves de API asociadas a esta integración se han deshabilitado, buscando el nombre de la integración en la [página de gestión de las claves de API][2].

## Compatibilidad

Para recibir asistencia o solicitar funciones, ponte en contacto con LambdaTest a través de los siguientes canales:

Correo electrónico: support@lambdatest.com
Teléfono: +1-(866)-430-7087
Sitio web: https://www.lambdatest.com/

[1]: https://www.lambdatest.com/support/docs/datadog-integration/
[2]: https://app.datadoghq.com/organization-settings/api-keys?filter=LambdaTest