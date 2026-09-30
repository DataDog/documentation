---
app_id: f5-distributed-cloud-services
app_uuid: 74c33838-0310-4ef3-95db-c378aece9d8b
assets:
  dashboards:
    f5xc_access: assets/dashboards/f5xc_access.json
    f5xc_bot_defense_events_overview: assets/dashboards/f5xc_bot_defense_events_overview.json
    f5xc_waf_events_overview: assets/dashboards/f5xc_waf_events_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 22988204
    source_type_name: F5 Distributed Cloud Services
  logs:
    source: f5xc
  saved_views:
    f5xc_all: assets/saved_views/all.json
author:
  homepage: https://www.f5.com/cloud
  name: F5 Distributed Cloud Services
  sales_email: sales@f5.com
  support_email: g.coward@f5.com
categories:
- nube
- configuración y despliegue
- notificaciones
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/f5-distributed-cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: f5-distributed-cloud
integration_id: f5-distributed-cloud-services
integration_title: F5 Distributed Cloud Services
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: f5-distributed-cloud
public_title: F5 Distributed Cloud Services
short_description: Transmite y visualiza logs de eventos de F5 Distributed Cloud Services.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Notifications
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Transmite y visualiza logs de eventos de F5 Distributed Cloud Services.
  media:
  - caption: El receptor global de logs de F5 Distributed Cloud Services
    image_url: images/logreceiver-config.png
    media_type: imagen
  - caption: El dashboard de información general de logs de acceso a F5 Distributed
      Cloud Services.
    image_url: images/dashboard_image.png
    media_type: imagen
  - caption: El dashboard de eventos de F5 Distributed Cloud Services WAF.
    image_url: images/waf_events_overview.png
    media_type: imagen
  - caption: El dashboard de información general de eventos de F5 Distributed Cloud
      Services BOT Defense.
    image_url: images/defense_events_overview.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: otros
    url: https://www.f5.com/cloud
  support: README.md#Support
  title: F5 Distributed Cloud Services
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->
## Información general

F5 Distributed Cloud (XC) Services proporciona a los clientes una plataforma nativa en la nube global que puede desplegar, gestionar y proteger sus aplicaciones en entornos híbridos (nube pública, centros de datos privados o colocaciones). También están disponibles servicios de ADN y CDN.

La plataforma de F5 XC incluye el receptor global de logs, que puede configurarse para enviar de forma segura logs a un endpoint de logs HTTPS de Datadog. La configuración puede realizarse a través de la [interfaz de usuario de la consola de F5 XC][1].


Esta integración incluye:

- Dashboard: *Información general de logs de acceso*, *Información general de eventos WAF*, *Información general de eventos de BOT Defense*
- Vista guardada: *incluye facetas para los campos más consultados*.
- Reglas de detección: *reglas de detección para eventos de F5 WAF y Bot Defense*
    - F5, WAF, Alto número de tráfico bloqueado: identifica el alto volumen de tráfico bloqueado por el Web Application Firewall (WAF).
    - F5, WAF, Tráfico inusual desde una única IP de origen: identifica patrones de tráfico inusuales originados desde una única dirección IP de origen.
    - F5, Bot Defense, Host único afectado por múltiples dominios: detecta cuando un único host dentro de la red es objetivo de múltiples dominios, indicando una potencial actividad de bot.
    - F5, Bot Defense, Múltiples hosts afectados por un único cliente bot: identifica cuando múltiples hosts son afectados por el tráfico de un único cliente bot.
    - F5, Bot Defense, Tráfico anormal observado en un país específico: identifica y responde a patrones de tráfico anormales observados en un país concreto en los últimos 30 minutos.

## Configuración

La transmisión global de logs está disponible para el espacio de nombres del sistema o en un espacio de nombres compartido:
- Los espacios de nombres compartidos admiten la transmisión de logs desde todos los espacios de nombres compartidos de tu cuenta, o de una lista específica de espacios de nombres compartidos que puedes especificar.
- Los espacios de nombres de sistema sólo admiten la transmisión de logs desde los espacios de nombres de sistema.

A continuación, se muestra un ejemplo de configuración de un receptor global de logs en un espacio de nombres de sistema. Para ver un vídeo paso a paso, consulta las [instrucciones de Configuración del registro remoto en Datadog en el canal oficial de Youtube de Datadog][2].

**Paso 1: Crear un receptor global de logs**

1. En la consola de F5® Distributed Cloud, ve al servicio Shared Configuration (Configuración compartida).
2. Selecciona Manage > Global Log Receiver (Gestionar > Receptor global de logs).
3. Selecciona Global Log Receiver (Receptor global de logs) en caso de sitios Cloud y Edge.
4. Haz clic en el botón Add Global Log Receiver (Añadir receptor global de logs)



**Paso 2: Configurar propiedades globales del receptor de logs**

Haz lo siguiente en la sección Global Log Receiver (Receptor global de logs):

1. En la sección Global Log Receiver (Receptor global de logs), introduce un nombre en la sección de metadatos. Opcional: establece etiquetas y añade una descripción.
2. Selecciona Request Logs (Logs de solicitud) o Security Events (Eventos de seguridad) para el campo Log Type (Tipo de logs). Nota: Los logs de solicitud están configurados por defecto.
3. Selecciona eventos que se transmitirán en función del espacio de nombres entre las siguientes opciones:  
    a. Selecciona logs del espacio de nombres actual: transmite logs desde el espacio de nombres compartido.
    b. Selecciona logs de todos los espacios de nombres: transmite logs desde todos los espacios de nombres.
    c. Selecciona logs en espacios de nombres específicos: transmite logs de espacios de nombres especificados. Introduce el nombre de espacio de nombres en la lista de espacios de nombres mostrados. Para añadir más de un espacio de nombres, selecciona Add item (Añadir elemento). Nota: Los espacios de nombres proporcionan agrupación lógica y aislamiento de objetos dentro de un inquilino de nube distribuida.
4. Selecciona Datadog para la casilla Receiver Configuration (Configuración del receptor). Configura lo siguiente para el receptor de Datadog: 
    a. Establece el nombre del sitio como datadoghq.com.  
    b. Ve a Datadog y [crea una clave de API][3] en los parámetros de organización. 
    c. Copia la clave de API.  
    d. Navega de nuevo a F5 y pega la clave de API de Datadog en los campos del receptor de Datadog.  

**Opcional, Paso 3: Configurar parámetros avanzados**

Los ajustes avanzados incluyen la configuración de las opciones de lote y TLS. Puedes aplicar límites como un número máximo de bytes de mensajes o un tiempo de espera para que un lote de logs se envíe al receptor.

1. Selecciona la opción Show Advanced Fields (Mostrar campos avanzados)
2. Dentro de la sección Batch Options (Opciones de lote):
    a. Selecciona Timeout Seconds (Segundos de tiempo de espera) para las Batch Timeout Options (Opciones de tiempo de espera de lote) e introduce un valor de tiempo de espera en el cuadro Timeout Seconds (Segundos de tiempo de espera).
    b. Selecciona Max events (Máximo de eventos) para Batch Max Events (Máximo de eventos de lote) e introduce un valor entre 32 y 2000 en la casilla Max events (Máximo de eventos). 
    c. Selecciona Max Bytes (Máximo de bytes) para Batch Bytes (Lote de bytes) e introduce un valor entre 4096 y 1048576 en el cuadro Batch Bytes (Lote de bytes). Los logs se envían cuando el tamaño del lote iguala o supera el tamaño de byte especificado.  
3. Dentro de la sección TLS:
    a. Selecciona Use TLS (Usar TLS) para el campo TLS.  
    b. Selecciona Server CA Certificates (Certificados de autorización del servidor) en el campo Trusted CA (Certificados de certificación de confianza). Introduce los certificados en formato PEM o Base64 en el cuadro Server CA Certificates (Certificados de autorización del servidor).
    c. Selecciona Enable mTLS (Activar mTLS) para la configuración mTLS e introduce el certificado de cliente en formato PEM o Base64 en el cuadro Client Certificate (Certificado de cliente).
    d. Selecciona Configure (Configurar) en el campo Client Private Key (Clave privada del cliente) e introduce el secreto en el cuadro con el tipo seleccionado como Text (Texto).
    e. Selecciona Blindfold, espera a que se complete la operación y haz clic en Apply (Aplicar).

**Paso 4: Terminar la instalación del F5XC**.

- Selecciona Save & Exit (Guardar y salir) para completar la creación del receptor global de logs. Comprueba que los [Logs][4] se reciben en tu cuenta de Datadog.

**Paso 5: Crear facetas de logs de Datadog**
Una vez que los logs empiecen a llegar, será necesario crear [facetas de log][5] para el análisis de datos y la visualización de dashboard. La creación de facetas de log es sencilla y se puede realizar desde el panel lateral de logs de Datadog con la orientación disponible [aquí][6].

Crea facetas para los siguientes campos:

- espacio de nombres
- dominio
- país
- ip_src_
- sitio_dst
- instancia_dst_
- método
- tamaño_solicitud
- tamaño_rsp
- ruta
- estado_conexión

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7] o [soporte de F5][8].

## Referencias adicionales

Más información sobre [F5 Distributed Cloud Services][9].

[1]: https://www.f5.com/cloud/products/distributed-cloud-console
[2]: https://youtu.be/VUtXCUngiw8
[3]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[4]: https://app.datadoghq.com/logs
[5]: https://docs.datadoghq.com/es/logs/explorer/facets/
[6]: https://docs.datadoghq.com/es/logs/explorer/facets/#create-facets
[7]: http://docs.datadoghq.com/help/
[8]: https://docs.cloud.f5.com/docs/support/support
[9]: https://www.f5.com/cloud