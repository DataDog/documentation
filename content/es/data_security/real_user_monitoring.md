---
aliases:
- /es/real_user_monitoring/security/
further_reading:
- link: /data_security/
  tag: Documentación
  text: Revisar las principales categorías de datos enviados a Datadog
- link: /data_security/synthetics/
  tag: Documentación
  text: Seguridad de los datos en la monitorización Synthetic
- link: /real_user_monitoring/session_replay/browser/privacy_options/
  tag: Documentación
  text: Opciones de privacidad de Session Replay
- link: https://www.datadoghq.com/blog/default-privacy-session-replay/
  tag: Blog
  text: Enmascarar los datos de usuario con los parámetros de privacidad predeterminados
    de Session Replay
kind: Documentación
title: Seguridad de los datos en Real User Monitoring (RUM)
---

<div class="alert alert-info">En esta página hablamos sobre la seguridad de los datos que se envían a Datadog. Si estás buscando productos y funciones para proteger las aplicaciones y las soluciones en la nube, consulta la sección <a href="/security/" target="_blank">Seguridad</a>.</div>

## Información general
Real User Monitoring (RUM) proporciona controles para implementar requisitos de privacidad y garantizar que organizaciones del tamaño que sean no expongan información confidencial o personal. Los datos se almacenan en instancias en la nube gestionadas por Datadog y se cifran mientras permanecen en reposo. Los comportamientos predeterminados y las opciones configurables que se describen en esta página están diseñados para proteger la privacidad del usuario final y evitar que se recopile información confidencial de la organización. Para obtener más información, consulta [Privacidad en Datadog][13].

## Responsabilidad compartida

La responsabilidad de mantener seguros los datos de los usuarios la comparten Datadog y los desarrolladores que aprovechan los SDK de RUM.

Datadog es responsable de:

- Proporcionar un producto fiable que gestione los datos de forma segura cuando se transmiten a la plataforma Datadog y se almacenan en ella.
- Garantizar que los problemas de seguridad se identifican de acuerdo con las políticas internas.

Los desarrolladores son responsables de:
- Aprovechar los valores de configuración y las opciones de privacidad de los datos que ofrece Datadog.
- Garantizar la integridad del código dentro de sus entornos.

## Marcos de cumplimiento
RUM puede configurarse para cumplir numerosas normas y marcos normativos como, por ejemplo:

- RGPD
- HIPAA 
- ISO
- Leyes CCPA/CPRA

## Restricciones de privacidad
Por defecto, existen algunas restricciones de privacidad que protegen los datos de los usuarios para ayudar a cumplir con los marcos regulatorios y normativos.

### Uso de cookies del navegador RUM
El navegador RUM requiere que las cookies de origen estén habilitadas en el navegador del usuario final para recopilar datos. Si así lo requieren las jurisdicciones en las que operas, eres responsable de configurar tus páginas para que cumplan las leyes de dichas jurisdicciones, incluyendo la recepción del consentimiento para recopilar cookies antes de inicializar RUM.

### Gestión del consentimiento de Mobile RUM
El seguimiento de Mobile RUM solo se ejecuta si el usuario da su consentimiento. Si el usuario final acepta el seguimiento de RUM, hacemos un seguimiento de su actividad y experiencia de sesión. Si el usuario rechaza el seguimiento de RUM, no haremos ningún seguimiento de su actividad ni de su experiencia de sesión.

## Opciones de privacidad
Existen varias opciones y herramientas a la hora de recopilar y eliminar los datos recopilados por RUM.

### Token de cliente
El navegador RUM [token de cliente][17] se utiliza para hacer coincidir los datos del navegador del usuario final con una aplicación RUM específica en Datadog. No está cifrado y es visible para el cliente de una aplicación.

Dado que el token de cliente sólo se utiliza para enviar datos a Datadog, no existe riesgo de pérdida de datos debido a este token. Sin embargo, Datadog recomienda realizar algunas acciones para garantizar una buena gestión de los tokens de cliente y así evitar otros tipos de uso indebido, entre ellas:

- [Rotar el token de cliente][18] con regularidad para asegurarse de que sólo es utilizado por tu aplicación
- [Filtrar bots][19] automáticamente al capturar datos de RUM

#### Proxy autentificado
Un método que utiliza el token de cliente para filtrar bots es el proxy autenticado. Con este método, una cadena de parámetros se sustituye por el `clientToken` al inicializar el SDK del navegador RUM Datadog. El proxy conoce el token real de cliente, pero el usuario final no lo conoce. 

El proxy está configurado para verificar información válida sobre el usuario antes de pasar los datos de la sesión a Datadog, confirmando así que un usuario real ha iniciado sesión y transmite el tráfico que se va a monitorizar. Al recibir tráfico, el proxy verifica que los datos incluyen la cadena de parámetros y la sustituye por el `clientToken` real, antes de reenviar los datos a Datadog.

### Seguimiento de eventos
Un [evento][14] es una interacción del usuario con elementos específicos de tu sitio o aplicación. Los eventos pueden capturarse automáticamente a través del SDK o enviarse mediante acciones personalizadas. Puedes desactivar el seguimiento automático de las interacciones del usuario y de las páginas vistas para capturar únicamente la interacción que elijas. De forma predeterminada, RUM utiliza contenido de destino para generar nombres de acciones a partir de acciones recopiladas de forma automática por el SDK. Puedes [anular explícitamente][5] este comportamiento con cualquier nombre específico.

Los datos que rastreamos automáticamente contienen principalmente información técnica, la mayor parte de la cual no incluye información de identificación personal. Los datos que se recopilan mediante RUM pueden ocultarse aún más antes de que se envíen y almacenen en Datadog, para ello, es necesario utilizar opciones de configuración avanzadas con los siguientes métodos:

- [API de beforeSend][1]
- [iOS][2]
- [Android][3]
- [Flutter][4]
- [React Native][16]

### Transmitir eventos RUM a través de un servidor proxy
Puedes transmitir todos los eventos RUM a través de tu propio [servidor proxy][15] para que los dispositivos del usuario final nunca se comuniquen directamente con Datadog.

### Seguimiento de la identidad del usuario
De forma predeterminada, no se realiza **ningún seguimiento de la identidad de los usuarios**. Cada sesión tiene un identificador `session.id` único, que mantiene el anonimato de los datos, pero permite conocer las tendencias. Sin embargo, existe la posibilidad de escribir código para capturar [datos del usuario][6], como el nombre y la dirección de correo electrónico, y utilizarlos para [enriquecer y modificar][7] las sesiones de RUM, aunque no es obligatorio.

### Conservación de datos
Una vez configurada la captura de eventos, éstos se almacenan en Datadog. Puedes decidir cuánto tiempo se conservan en Datadog los eventos y propiedades capturados.

Por defecto, la conservación de datos para entornos de producción es:

- 30 días para sesiones, vistas, acciones, errores y grabaciones de sesiones.
- 15 días para recursos y tareas extensas.

Dicha conservación puede ampliarse hasta un máximo de 90 días sin coste adicional mediante [la apertura de un ticket de asistencia][8]. Recuerda que esta posibilidad no se aplica a las Session Replays, los recursos ni las tareas extensas.

#### Control de acceso basado en roles
Datadog ofrece el control de acceso basado en roles (RBAC) para gestionar quién ve los datos RUM capturados. La configuración predeterminada para acceder a los datos depende del rol al que se añada un usuario. Datadog dispone de tres tipos de roles: Administrador, Estándar y Solo lectura. En la sección [Permisos de rol de Datadog][10] se pueden definir permisos más específicos para RUM. Por ejemplo, puedes autorizar o revocar el acceso para ver las Session Replays.

### Eliminar datos
Si necesitas eliminar datos almacenados por Datadog, por ejemplo, si se han filtrado datos potencialmente confidenciales en eventos RUM, puedes hacer un borrado permanente de los datos dentro de un marco de tiempo determinado. En este caso, se borran **todos** los datos; no se pueden seleccionar para una aplicación específica. Si quieres eliminar algún dato, ponte en contacto con el [equipo de asistencia de Datadog][9].

### Eliminar datos personales y confidenciales
Existen varias opciones para eliminar la información de identificación personal (IIP) y los datos confidenciales, incluidas las direcciones IP y la geolocalización. Algunas situaciones en las que la IIP podría aparecer en RUM:

- Nombres de acción en los botones (por ejemplo, "Ver el número completo de la tarjeta de crédito")
- Nombres que aparecen en las URL
- Eventos de seguimiento personalizados que instrumentan los desarrolladores de la aplicación

#### Datos no estructurados
La información de identificación personal incluida accidentalmente en datos no estructurados, como el nombre de una persona en un cuadro de texto, solo puede eliminarse con una solicitud para que se eliminen los datos durante un plazo determinado.

Con respecto a las URL, tienes la opción de hacer el seguimiento de las visitas a la página manualmente para eliminar cualquier información de identificación personal o utilizar beforeSend para cambiar el texto de la URL.

También puedes transmitir todos los eventos RUM a través de tu propio servidor (proxy) para que los dispositivos del usuario final nunca se comuniquen directamente con Datadog.

#### Dirección IP
Al configurar una aplicación RUM, se puede elegir si se desea incluir o no datos de IP o geolocalización:

{{< img src="data_security/data-security-rum-privacy-compliance-edit-rum-application.png" alt="Puedes incluir o excluir datos de geolocalización e IP de clientes desde la página de configuración de la aplicación RUM" style="width:100%;" >}}

En cuanto deshabilites la recopilación de datos IP, el cambio se aplicará inmediatamente. No se eliminarán los datos IP de ningún evento recopilado antes de la desactivación. Se realiza en el backend, lo que significa que el SDK del navegador seguirá enviando datos, pero los pipelines del backend de Datadog omitirán las direcciones IP y las eliminarán en el momento del procesamiento.

#### Geolocalización
Además de eliminar las IP de los clientes, también puedes optar por desactivar la recopilación de la geolocalización (país, ciudad, provincia), o GeoIP, de todos los datos recopilados en el futuro. Si desmarcas la casilla **Collect geolocation data** (Recopilar datos de geolocalización), el cambio se aplicará inmediatamente. No se eliminarán los datos de geolocalización de los eventos recopilados antes de desactivar la casilla. La omisión de datos se realiza a nivel de backend, lo que significa que el SDK del navegador seguirá enviando datos, pero nuestros pipelines de backend omitirán los datos de geolocalización y los eliminarán en el momento del procesamiento.

### Búsqueda proactiva de datos confidenciales con Sensitive Data Scanner
[Sensitive Data Scanner][11] te permite buscar y depurar proactivamente los datos confidenciales en el momento de su consumo por parte de Datadog. Los eventos de RUM se analizan en el flujo (stream), antes de que se almacenen datos en Datadog. La herramienta tiene la capacidad de depurar, convertir en hash o enmascarar parcialmente la información de identificación personal (PII), antes de que se almacene. Funciona aplicando reglas de concordancia de patrones listas para utilizar o desarrolladas por el cliente. Si has activado esta función, puedes encontrarla en la página [**Gestión de datos confidenciales**][20].

## Opciones de privacidad específicas de Session Replay
Consulta las [opciones de privacidad específicas de Session Replay][12].

### Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event#event-and-context-structure
[2]: /es/real_user_monitoring/ios/advanced_configuration/?tab=swift#modify-or-drop-rum-events
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tab=kotlin#modify-or-drop-rum-events
[4]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/flutter/#modify-or-drop-rum-events
[5]: /es/real_user_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[6]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#user-session
[7]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#user-session
[8]: /es/help/
[9]: /es/help/
[10]: /es/account_management/rbac/permissions/#real-user-monitoring
[11]: /es/sensitive_data_scanner/
[12]: /es/real_user_monitoring/session_replay/browser/privacy_options
[13]: https://www.datadoghq.com/privacy/
[14]: /es/real_user_monitoring/explorer/search/
[15]: /es/real_user_monitoring/guide/proxy-rum-data/?tab=npm
[16]: /es/real_user_monitoring/reactnative/advanced_configuration/#modify-or-drop-rum-events
[17]: /es/real_user_monitoring/browser/setup/#configuration
[18]: /es/account_management/api-app-keys/#add-an-api-key-or-client-token
[19]: /es/real_user_monitoring/guide/identify-bots-in-the-ui/#filter-out-bot-sessions-on-intake
[20]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration