---
app_id: komodor
app_uuid: 995fe904-e761-4f2f-8dbf-148baf3f080a
assets: {}
author:
  homepage: https://komodor.com/
  name: Komodor
  sales_email: sales@komodor.com
  support_email: support@komodor.com
categories:
- rastreo
- Kubernetes
- notificaciones
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/komodor/README.md
display_on_public_website: true
draft: false
git_integration_title: komodor
integration_id: komodor
integration_title: Automatización de Komodor
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: komodor
public_title: Automatización de Komodor
short_description: Seguimiento de los cambios en todo el entorno y el stack tecnológico
  de K8s
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Notifications
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Configuración
  description: Seguimiento de los cambios en todo el entorno y el stack tecnológico
    de K8s
  media:
  - caption: Pantalla principal de servicios.
    image_url: images/Komodor_screen_01.png
    media_type: imagen
  - caption: Cronología de eventos de vista de servicio y servicios relacionados.
    image_url: images/Komodor_screen_02.png
    media_type: imagen
  - caption: Vista de servicio en la revisión de un despliegue y sus cambios.
    image_url: images/Komodor_screen_03.png
    media_type: imagen
  - caption: Revisión del conjunto de réplicas de un despliegue y sus pods y logs
    image_url: images/Komodor_screen_04.png
    media_type: imagen
  - caption: Cronología de eventos para múltiples clústeres y despliegues.
    image_url: images/Komodor_screen_05.png
    media_type: imagen
  - caption: Vista de servicio que muestra una alerta de monitorización de Datadog.
    image_url: images/Komodor_screen_06.png
    media_type: imagen
  - caption: Vista de métricas de Datadog que muestra el enlace de vuelta a Komodor.
    image_url: images/Komodor_screen_07.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Automatización de Komodor
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Komodor realiza un seguimiento de los cambios en todo el stack tecnológico de K8s, analiza su efecto dominó y te proporciona el contexto que necesitas para solucionar los problemas de forma eficaz e independiente. Komodor te brinda una visión de tus despliegues de Kubernetes en una cronología con información relevante, como qué cambió, qué código fue ingresado y quién lo hizo. También puedes ver datos de Git, mapas de configuración, tu infraestructura, alertas y otras herramientas como Datadog, en una pantalla centralizada y fácil de entender. 

Con esta integración, puedes enlazar a Datadog métricas con enlaces de despliegue dinámicos que te llevan directamente a los dashboards que necesitas. Esto permite solucionar los problemas de tus microservicios basándose en el contexto, las conexiones y las dependencias de servicio más relevantes detectadas en Datadog.

## Configuración

1. Inicia sesión en la [plataforma de Komodor][1].
2. Instala el Agent basado en pod de Komodor en cada clúster de Kubernetes utilizando un gráfico de Helm o Kustomize. Para más información, consulta los [documentos de Komodor][2] para instalar el Agent.

3. Una vez instalado el Agent, sigue los pasos que se indican a continuación para configurar la integración de Datadog:
    - Instala la [integración de la plataforma de Komodor][3]: este primer paso de integración permite a Komodor acceder a tu cuenta de Datadog a través de la clave de API y la clave token, y sugerir servicios relacionados en función de las dependencias de servicio detectadas en Datadog.
    - Instala la [integración del webhook de Datadog][4]: esto permite a Komodor recibir alertas de monitores de Datadog. Puedes ver todas las alertas en la vista de servicio de Komodor.
    - Configura una notificación de monitorización de Datadog: añadir un [enlace dinámico][5] de Komodor a [notificaciones de monitorización de Datadog][6] genera un enlace directo al servicio correspondiente en Komodor. Consulta el enlace de alerta en tu proveedor de alertas conectado a Datadog.

4. Utiliza [anotaciones][7] de Kubernetes para enriquecer el servicio de Komodor y las pantallas de despliegue con enlaces a dashboards de Datadog APM relevantes, así como enlaces dinámicos a métricas de servicio y rangos temporales específicos dentro de Datadog.

## Soporte

Si deseas más información, [visita nuestro sitio web][8] o [ponte en contacto con nosotros][9].

[1]: https://app.komodor.com/
[2]: https://docs.komodor.com/Learn/Komodor-Agent.html
[3]: https://docs.komodor.com/Integrations/Datadog.html
[4]: https://docs.komodor.com/Integrations/datadog-webhook.html
[5]: https://docs.komodor.com/Integrations/Datadog-Monitor-Notification.html
[6]: https://docs.datadoghq.com/es/monitors/notify/
[7]: https://docs.komodor.com/Learn/Annotations.html
[8]: https://komodor.com/sign-up/
[9]: https://komodor.com/contact-us/