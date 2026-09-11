---
algolia:
  subcategory: Integraciones de Marketplace
app_id: embrace-mobile-license
app_uuid: 2996b6e0-1aed-46cc-9fe5-4ea72aeae636
assets: {}
author:
  homepage: https://embrace.io
  name: Embrace
  sales_email: datadogsupport@embrace.io
  support_email: datadogsupport@embrace.io
  vendor_id: embrace
categories:
- marketplace
- mobile
- la red
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: embrace_mobile_license
integration_id: embrace-mobile-license
integration_title: Licencia móvil de Embrace
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: embrace_mobile_license
pricing:
- billing_type: recuento_etiquetas(tags)
  includes_assets: true
  metric: datadog.marketplace.embrace.mobile_license
  product_id: licencia-móvil
  short_description: El plan Pro incluye acceso completo a la plataforma Embrace.
    Puedes discutir precios personalizados de aplicaciones de gran volumen con el
    equipo de ventas. Si tienes preguntas sobre descuentos, ponte en contacto con
    datadogsupport@embrace.io.
  tag: sesión
  unit_label: 500.000 sesiones
  unit_price: 500
public_title: Licencia móvil de Embrace
short_description: Capacidad de observación móvil para iOS, Android, React Native
  y Unity
supported_os:
- android
- ios
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Marketplace
  - Categoría::Móvil
  - Categoría::Red
  - Oferta::Licencia de software
  - Sistema operativo compatible::Android
  - Sistema operativo compatible::iOS
  configuration: README.md#Configuración
  description: Capacidad de observación móvil para iOS, Android, React Native y Unity
  media:
  - caption: Conoce Embrace, la única plataforma de observabilidad y de datos creada
      exclusivamente para móviles. Con datos procesables e informaciones derivadas
      de cada experiencia de usuario, las empresas pueden tomar decisiones comerciales
      óptimas, ya que pueden comprender cuáles son los verdaderos impulsores de la
      retención de clientes y de los ingresos.
    image_url: images/video_thumbnail.jpg
    media_type: vídeo
    vimeo_id: 619368139
  - caption: Monitoriza los datos de fallos y de red de Embrace directamente desde
      Datadog añadiendo widgets.
    image_url: images/datadog_dashboard.jpg
    media_type: imagen
  - caption: Investiga los fallos accediendo a las trazas (traces) de stack tecnológico
      de cada sesión de usuario afectada, junto con los detalles de la aplicación
      y la sesión. Para obtener más contexto, navega directamente a la repetición
      completa de una sesión de usuario en Embrace.
    image_url: images/datadog_side_panel.jpg
    media_type: imagen
  - caption: Las repeticiones de sesiones de usuarios de Embrace proporcionan todos
      los detalles técnicos y de comportamiento de cada sesión de usuario en una visualización
      basada en el tiempo. Identifica al instante la causa original, sin tener que
      reproducir manualmente los problemas.
    image_url: images/embrace_session.jpg
    media_type: imagen
  - caption: Optimiza los flujos de usuarios clave mediante el seguimiento de los
      tiempos, de los resultados y de las acciones de los usuarios. Identifica rápidamente
      dónde los usuarios frustrados abandonan experiencias lentas o congeladas y soluciónalas
      para aumentar la participación y los ingresos.
    image_url: images/embrace_app_performance.jpg
    media_type: imagen
  - caption: Monitoriza métricas clave con dashboards en tiempo real. Realiza un seguimiento
      del rendimiento, la estabilidad, la participación, la monetización y mucho más
      de forma simple, para que los equipos puedan centrarse en los datos que les
      interesan.
    image_url: images/embrace_dashboard.jpg
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/mobile-application-monitoring-embrace-datadog/
  - resource_type: Documentación
    url: https://embrace.io/docs/
  support: README.md#Soporte
  title: Licencia móvil de Embrace
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

### ¿Qué es Embrace?

[Embrace][1] es una plataforma móvil de observabilidad y de datos que permite a los equipos móviles ofrecer experiencias de usuario óptimas para 
optimizar el rendimiento, priorizar y corregir problemas, y monitorizar funciones, versiones y segmentos
personalizados. En esencia, Embrace convierte los complejos datos móviles en acción. Al recopilar datos exhaustivos a nivel de sesión para
cada una de las experiencias del usuario, Embrace extrae información de gran alcance para impulsar tu crecimiento.

Una vez instalada la integración, Embrace proporciona dashboards que realizan un seguimiento de las métricas clave del estado móvil. En caso de regresión, puedes inspeccionar 
los detalles completos de cada sesión de usuario afectada, sin tener que reproducirla manualmente. 

### Dashboard Embrace Datadog

El dashboard de Datadog conecta los datos de fallos y de red de Embrace del lado del cliente con tus datos del lado de tu servidor.

#### Fallos

Monitoriza tendencias de fallos e inspecciona trazas de stack tecnológico de cada fallo directamente dentro de Datadog. Para obtener más contexto, revisa todos los
detalles de la sesión de usuario en Embrace.

#### Redes

Embrace recopila todas las llamadas de red, incluso aquellas que nunca llegan a los servidores. Visualiza todos los errores de tus
endpoints, incluyendo 4xxs, 5xxs, tiempos de espera y errores de conexión.

---

Desde Datadog, navega inmediatamente a los datos procesables y a las informaciones necesarias para optimizar las experiencias móviles dentro de la
plataforma Embrace. Entre ellos se incluyen:

#### Repeticiones de sesiones de usuario

Experimenta cualquier sesión de usuario sin la molestia de tener que reproducirla. Repite todos los detalles técnicos y de comportamiento en una
visualización recorrible, para que cualquier miembro del equipo pueda responder inmediatamente a cualquier pregunta o queja.

#### Rendimiento de la aplicación

Comprende la causa de una experiencia de usuario defectuosa para medir correctamente y mejorar el estado de la aplicación móvil. Además de los cuelgues,
optimiza el rendimiento para eliminar las áreas lentas o congeladas que provocan salidas forzadas y el abandono de flujos de usuario clave.

#### Dashboards

Realiza un seguimiento de la adopción, el rendimiento, la estabilidad, la participación y la monetización con dashboards en tiempo real, para visualizar las métricas que le
interesan a tu empresa. Crea dashboards individuales o de equipo para centrarse en las funciones o experimentos que realmente interesan.

#### Registro de errores

Define propiedades de sesión y de logs para permitir un profundo filtrado que aísle la causa original. Descubre patrones en 
dispositivos, versiones, sistemas operativos, regiones, segmentos de usuarios y atributos de eventos, para que tu equipo conozca su impacto en la empresa y 
las prioridades para la corrección de problemas. 

#### Alertas proactivas

Sé la primera persona en saber cuáles son las regresiones en el rendimiento y en la estabilidad de tus funciones y versiones. Tanto si el 
fallo está en tu código, en tu backend o en un SDK o proveedor externo malintencionado, Embrace te lo notifica en tiempo real,
para que puedas tomar medidas antes de que tus usuarios se quejen.

## Soporte
Para obtener asistencia o hacer preguntas, ponte en contacto con Embrace a través del siguiente canal:

Correo electrónico: [datadogsupport@embrace.io][4]

### Leer más

Más enlaces, artículos y documentación útiles:

- [Monitorización de tus aplicaciones móviles con la oferta de Embrace en el Marketplace de Datadog][6]
- [Documentación de Embrace][2]

[1]: https://embrace.io
[2]: https://embrace.io/docs/
[3]: https://dash.embrace.io
[4]: mailto:datadogsupport@embrace.io
[5]: https://app.datadoghq.com/integrations/embrace-mobile
[6]: https://www.datadoghq.com/blog/mobile-application-monitoring-embrace-datadog/
---
Esta aplicación está disponible a través del Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/embrace-mobile-license" target="_blank">Haz clic aquí</a> para adquirir esta aplicación.