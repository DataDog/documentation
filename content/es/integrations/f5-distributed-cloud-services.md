---
aliases:
- /es/integrations/f5-distributed-cloud
app_id: f5-distributed-cloud-services
categories:
- nube
- configuración y despliegue
- notificaciones
custom_kind: integración
description: Transmite y visualice logs de eventos de F5 Distributed Cloud Services.
further_reading:
- link: https://www.f5.com/cloud
  tag: otros
  text: Distributed Cloud Services
integration_version: 1.0.0
media:
- caption: Receptor de logs global de F5 Distributed Cloud Services
  image_url: images/logreceiver-config.png
  media_type: imagen
- caption: Dashboard con información general de logs de acceso de F5 Distributed Cloud
    Services.
  image_url: images/dashboard_image.png
  media_type: imagen
- caption: Dashboard de eventos WAF de F5 Distributed Cloud Services.
  image_url: images/waf_events_overview.png
  media_type: imagen
- caption: Dashboard con información general de eventos BOT Defense de F5 Distributed
    Cloud Services.
  image_url: images/defense_events_overview.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: F5 Distributed Cloud Services
---
## Información general

F5 Distributed Cloud (XC) Services proporciona a los clientes una plataforma nativa global en la nube que puede desplegar, gestionar y proteger sus aplicaciones en entornos híbridos (nube pública, centros de datos privados o colocaciones). También están disponibles los servicios ADN y CDN.

La plataforma F5 XC incluye el receptor global de logs que puede configurarse para enviar logs de forma segura a un endpoint de generación de logs HTTPS de Datadog. La configuración puede realizarse a través de la [interfaz de usuario de la consola de F5 XC](https://www.f5.com/cloud/products/distributed-cloud-console).

Esta integración incluye:

- Dashboard - *Información general de logs de acceso*, *Información general de eventos WAF*, *Información general de eventos de BOT Defense*
- Vista guardada - *Incluye facetas para los campos más consultados*.
- Reglas de detección - *Reglas de detección para eventos WAF y BOT Defense de F5*.
  - F5 - WAF - Elevado volumen de tráfico bloqueado: Identifica el elevado volumen de tráfico bloqueado por el Web Application Firewall (WAF).
  - F5 - WAF - Tráfico inusual desde una IP de origen único: Identifica patrones de tráfico inusuales originados desde una dirección IP de origen único.
  - F5 - Bot Defense - Host único afectado por varios dominios : Detecta cuando un único host de la red es objetivo de varios dominios, lo que indica una posible actividad de bots.
  - F5 - Bot Defense - Varios hosts afectados por un único cliente bot : Identifica cuándo varios hosts se ven afectados por el tráfico de un único cliente bot.
  - F5 - Bot Defense- Tráfico anormal observado en un país específico : Identifica y responde a patrones de tráfico anormales observados en un país específico en los últimos 30 minutos.

## Configuración

La transmisión global de logs está disponible tanto para el espacio de nombres del sistema como en el espacio de nombres compartido:

- Los espacios de nombres compartidos admiten la transmisión de logs desde todos los espacios de nombres compartidos de tu cuenta o desde una lista específica de espacios de nombres compartidos que puedes especificar.
- Los espacios de nombres del sistema solo admiten la transmisión de logs desde los espacios de nombres del sistema.

A continuación se muestra un ejemplo de configuración de un receptor global de logs en un espacio de nombres del sistema. Para ver un vídeo paso a paso, consulta las [instrucciones en Youtube para configurar la generación remota de logs en Datadog](https://youtu.be/VUtXCUngiw8).

**Paso 1: Para crear un receptor global de logs**

1. En la consola de F5® Distributed Cloud, ve al servicio Shared Configuration (Configuración compartida).
1. Selecciona Manage > Global Log Receiver (Gestionar > Receptor global de logs).
1. Selecciona Global Log Receiver (Receptor global de logs) en caso de un servicio Cloud and Edge Sites.
1. Haz clic en el botón Add Global Log Receiver (Añadir receptor global de logs).

**Paso 2: Configurar las propiedades del receptor global de logs**

Haz lo siguiente en la sección Global Log Receiver (Receptor global de logs):

1. En la sección Global Log Receiver (Receptor global de logs), introduce un nombre en la sección de metadatos. Opcional: Configura etiquetas (labels) y añade una descripción.
1. Selecciona Request Logs o Security Events (Solicitar logs o Eventos de seguridad) para el campo Log Type (Tipo de log). Nota: Request Logs está configurado por defecto.
1. Selecciona los eventos que se transmitirán en función del espacio de nombres a partir de las siguientes opciones:\
   a. Selecciona logs del espacio de nombres actual - Transmite logs del espacio de nombres compartido.\
   b. Selecciona logs de todos los espacios de nombres - Transmite logs de todos los espacios de nombres.\
   c. Selecciona logs de espacios de nombres específicos - Transmite logs de espacios de nombres especificados. Introduce el nombre del espacio de nombres en la lista de espacios de nombres que aparece. Para añadir más de un espacio de nombres, selecciona Add item (Añadir elemento). Nota: Los espacios de nombres proporcionan una agrupación y un aislamiento lógicos de objetos dentro de un inquilino de nube distribuida.
1. Selecciona Datadog para el cuadro Receiver Configuration (Configuración del receptor). Configura lo siguiente para el receptor de Datadog:\
   a. Configura el nombre del sitio como datadoghq.com.\
   b. Ve a Datadog y [crea una clave de API](https://docs.datadoghq.com/account_management/api-app-keys/) en los parámetros de la organización.\
   c. Copia la clave de API.\
   d. Ve de nuevo a F5 y pega la clave de API Datadog en los campos del receptor de Datadog.

**Paso 3 (opcional): Configurar parámetros avanzados**

Los parámetros avanzados incluyen la configuración de las opciones de organización en lotes y TLS. Puedes aplicar límites como un número máximo de bytes de mensajes o un tiempo de espera para que un lote de logs se envíe al receptor.

1. Selecciona la opción Show Advanced Fields (Mostrar campos avanzados).
1. Dentro de la sección Batch Options (Opciones de organización en lotes):\
   a. Selecciona Timeout Seconds (Segundos de tiempo de espera) para las opciones de tiempo de espera de organización en lotes e introduce un valor de tiempo de espera en el cuadro Timeout Seconds.\
   b. Selecciona Max Events (Máximo de eventos) para la cantidad máxima de eventos por lote e introduce un valor entre 32 y 2000 en el cuadro Max Events.
   c. Selecciona Max Bytes (Máximo de bytes) para la cantidad de bytes por lote e introduce un valor entre 4096 y 1048576 en el cuadro Batch Bytes (Bytes por lote). Los logs se envían una vez que el tamaño del lote iguala o supera el tamaño en bytes especificado.
1. Dentro de la sección TLS:\
   a. Selecciona Use TLS (Utilizar TLS) para el campo TLS.\
   b. Selecciona Server CA Certificates (Certificados de autoridad de certificación de servidor) en el campo Trusted CA (Autoridad de certificación de confianza). Introduce los certificados en formato PEM o Base64 en el cuadro Server CA Certificates.\
   c. Selecciona Enable mTLS (Activar mTLS) para configurar mTLS e introduce el certificado del cliente en formato PEM o Base64 en el cuadro Client Certificate (Certificado del cliente).\
   d. Selecciona Configure (Configurar) en el campo Client Private Key (Clave privada del cliente) e introduce el secreto en el cuadro con el tipo seleccionado como Text (Texto).\
   e. Selecciona Blindfold, espere a que finalice la operación y haz clic en Apply (Aplicar).

**Paso 4: Finalizar la configuración de F5XC**

- Selecciona Save & Exit (Guardar y Salir) para finalizar la creación del receptor global de logs. Comprueba que se reciben [logs](https://app.datadoghq.com/logs) en tu cuenta de Datadog.

**Paso 5: Crear facetas de logs en Datadog**
Una vez que los logs empiecen a llegar, será necesario crear [facetas de logs](https://docs.datadoghq.com/logs/explorer/facets/) para el análisis de datos y la visualización en el dashboard. La creación de facetas de logs es sencilla y puede realizarse desde el panel lateral de logs de Datadog utilizando una guía disponible [aquí](https://docs.datadoghq.com/logs/explorer/facets/#create-facets).

Crea facetas para los siguientes campos:

- espacio de nombres
- domain
- country
- src_ip
- dst_site
- dst_instance
- method
- req_size
- rsp_size
- path
- connection_state

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](http://docs.datadoghq.com/help/) o con el [servicio de asistencia de F5](https://docs.cloud.f5.com/docs/support/support).

## Referencias adicionales

Más información sobre [F5 Distributed Cloud Services](https://www.f5.com/cloud).