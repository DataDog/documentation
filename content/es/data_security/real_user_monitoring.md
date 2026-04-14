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
- link: /session_replay/browser/privacy_options/
  tag: Documentación
  text: Opciones de privacidad de Session Replay
- link: https://www.datadoghq.com/blog/default-privacy-session-replay/
  tag: Blog
  text: Enmascarar los datos de usuarios con los parámetros de privacidad predeterminados
    de Session Replay
title: Seguridad de los datos en Real User Monitoring (RUM)
---

<div class="alert alert-info">En esta página hablamos sobre la seguridad de los datos que se envían a Datadog. Si estás buscando productos y funciones para proteger las aplicaciones y las soluciones en la nube, consulta la sección <a href="/security/" target="_blank">Seguridad</a>.</div>

## Información general
Real User Monitoring (RUM) proporciona controles para aplicar los requisitos de privacidad y garantizar que las organizaciones de cualquier escala no expongan información confidencial ni personal. Los datos se almacenan en instancias en la nube gestionadas por Datadog y se cifran en reposo. Los comportamientos predeterminados y las opciones configurables que se describen en esta page (página) están diseñados para proteger la privacidad del usuario final y evitar que se recopile información confidencial de la organización. Más información sobre [Privacidad en Datadog][1].

## Responsabilidad compartida

La responsabilidad de mantener seguros los datos de los usuarios la comparten Datadog y los desarrolladores que aprovechan los SDK de RUM.

Datadog es responsable de:

- Proporcionar un producto fiable que gestione los datos de forma segura cuando se transmiten a la plataforma Datadog y se almacenan en ella.
- Garantizar que los problemas de seguridad se identifiquen de acuerdo con las políticas internas.

Los desarrolladores son responsables de:
- Aprovechar los valores de configuración y las opciones de privacidad de los datos que ofrece Datadog.
- Garantizar la integridad del código en sus entornos.

## Frameworks de cumplimiento
RUM puede configurarse para cumplir numerosas normas y frameworks normativos como, por ejemplo:

- RGPD
- HIPAA
- ISO
- Leyes CCPA/CPRA

## Restricciones de privacidad
Por defecto, existen algunas restricciones de privacidad que protegen los datos de los usuarios para ayudar a cumplir los frameworks regulatorios y normativos.

### Uso de cookies del navegador RUM
El navegador RUM requiere que las cookies de origen estén habilitadas en el navegador del usuario final para recopilar datos. Si así lo requieren las jurisdicciones en las que operas, eres responsable de configurar tus páginas para que cumplan las leyes de dichas jurisdicciones, incluyendo la recepción del consentimiento para recopilar cookies antes de inicializar RUM.

### Gestión del consentimiento de Mobile RUM
El rastreo móvil de RUM sólo se ejecuta previo consentimiento del usuario. Si el usuario final acepta el rastreo de RUM, Datadog rastrea su actividad y experiencia de sesión. Si el usuario rechaza el rastreo de RUM, Datadog no rastrea su actividad ni su experiencia de sesión.

## Opciones de privacidad
Existen varias opciones y herramientas a la hora de recopilar y ocultar los datos recopilados por RUM.

### Token de cliente
El navegador RUM [token de cliente][2] se utiliza para hacer coincidir los datos del navegador del usuario final con una aplicación RUM específica en Datadog. No está cifrado y es visible desde el lado del cliente de una aplicación.

Dado que el token de cliente sólo se utiliza para enviar datos a Datadog, no existe riesgo de pérdida de datos debido a este token. Sin embargo, Datadog recomienda realizar algunas acciones para garantizar una buena gestión de los tokens de cliente y así evitar otros tipos de uso indebido, entre ellas:

- Regularmente [rotar el token de cliente][3] para asegurarse de que sólo sea utilizado por tu aplicación.
- Automáticamente [filtrar bots][4] al capturar datos de RUM

#### Proxy autentificado
Un método de utilizar el token de cliente para filtrar bots es un proxy autenticado. En este método, se sustituye el `clientToken` por una cadena de marcador de posición al inicializar el SDK del navegador Datadog RUM. El proxy conoce el token de cliente real, pero el usuario final no.

El proxy está configurado para verificar información válida sobre el usuario antes de pasar los datos de la sesión a Datadog, confirmando así que un usuario real ha iniciado sesión y transmite el tráfico que se va a monitorizar. Al recibir tráfico, el proxy verifica que los datos incluyen la cadena de parámetros y la sustituye por el `clientToken` real, antes de reenviar los datos a Datadog.

### Seguimiento de eventos
Un [evento][5] es una interacción del usuario con elementos específicos de tu sitio o aplicación. Los eventos pueden capturarse automáticamente a través del SDK o enviarse mediante acciones personalizadas. Puedes desactivar el rastreo automático de las interacciones del usuario y las páginas vistas para capturar únicamente la interacción que elijas. De forma predeterminada, RUM utiliza el contenido de destino para generar nombres de acciones a partir de las acciones recopiladas automáticamente por el SDK. Puedes [sustituir explícitamente][6] este comportamiento con cualquier nombre dado.

Los datos que rastreamos automáticamente contienen principalmente información técnica, la mayor parte de la cual no incluye información de identificación personal (PII). Los datos que se recopilan mediante RUM pueden ocultarse aún más antes de que se envíen y almacenen en Datadog. Para ello, es necesario utilizar opciones de configuración avanzadas con los siguientes métodos:

- [API beforeSend][7]
- [iOS][8]
- [Android][9]
- [Flutter][10]
- [React Native][11]

### Transmitir eventos RUM a través de un servidor proxy
Puedes transmitir todos los eventos de RUM a través de tu propio [servidor proxy][12] de modo que los dispositivos de usuario final nunca se comuniquen directamente con Datadog.

### Seguimiento de la identidad del usuario
De modo predeterminado, no hay **rastreo de la identidad de los usuarios**. Cada sesión tiene un único `session.id` vinculado a ella, que hace anónimos los datos, pero te permite comprender las tendencias. Tienes la opción de escribir código para capturar [datos del usuario][13] como el nombre y la dirección de correo electrónico y luego usar esos datos para [enriquecer y modificar][13] las sesiones de RUM, pero esto no es obligatorio.

### Conservación de datos
Una vez configurada la captura de eventos, éstos se almacenan en Datadog. Puedes decidir cuánto tiempo se conservan en Datadog los eventos y propiedades capturados.

Por defecto, la conservación de datos para entornos de producción es:

- 30 días para sesiones, vistas, acciones, errores y grabaciones de sesiones.
- 15 días para recursos y tareas extensas.

Para ampliar la retención de datos para analizar los comportamientos de los usuarios durante periodos de tiempo más largos (sólo Sesiones, Vistas y Acciones), puedes enviar una solicitud a [unirse a Product Analytics][20] .

#### Control de acceso basado en roles
Datadog proporciona control de acceso basado en roles (RBAC) para gestionar quién consulta los datos capturados de RUM. La configuración predeterminada para el acceso a los datos depende del rol al que se añada un usuario. Hay tres tipos de roles disponibles en Datadog: Administrador, Estándar y Sólo lectura. En [Permisos de roles de Datadog][15] se definen permisos más granulares específicos de RUM. Por ejemplo, puedes conceder o revocar el acceso para ver las repeticiones de sesión.

### Eliminar datos
Si necesitas borrar datos almacenados por Datadog, por ejemplo, si se han filtrado datos potencialmente confidenciales en eventos de RUM, puedes realizar un borrado duro de datos dentro de un plazo determinado. Con un borrado duro, se borran **todos** los datos; no se puede dirigir a una aplicación específica. Si necesitas que se borre algún dato, ponte en contacto con el [equipo de asistencia técnica de Datadog][14].

### Eliminar datos personales y confidenciales
Existen varias opciones para eliminar la información de identificación personal (PII) y los datos confidenciales, incluidas las direcciones IP y la geolocalización. Las siguientes son algunas situaciones en las que la PII podría aparecer en RUM:

- Nombres de acciones en los botones (por ejemplo, "Ver el número completo de la tarjeta de crédito")
- Nombres que aparecen en las URL
- Eventos de seguimiento personalizados que instrumentan los desarrolladores de la aplicación

#### Enmascarar nombres de acciones
De manera predeterminada, si deseas enmascarar todos los nombres de acciones, puedes utilizar la opción `enablePrivacyForActionName` junto con la configuración de privacidad `mask`. Esta operación sustituye automáticamente todos los nombres de acciones no sustituidos por el marcador de posición `Masked Element`. Esta configuración también está diseñada para ser compatible con los [atributos de sustitución de HTML] existentes[16].

#### Datos no estructurados
La PII incluida inadvertidamente en datos no estructurados, como el nombre de una persona en un cuadro de texto, sólo puede eliminarse mediante una solicitud de supresión de datos durante un plazo determinado.

Con respecto a las URL, tienes la opción de rastrear las páginas vistas manualmente para eliminar cualquier PII o utilizar beforeSend para cambiar el texto de la URL.

También puedes transmitir todos los eventos RUM a través de tu propio servidor (proxy), para que los dispositivos del usuario final nunca se comuniquen directamente con Datadog.

#### Dirección IP
Después de inicializar tu aplicación RUM, puedes elegir si deseas o no incluir datos de IP o geolocalización desde la pestaña **Recopilación de datos del usuario**:

{{< img src="data_security/data-security-rum-privacy-compliance-user-data-collection-1.png" alt="Puedes incluir o excluir datos de geolocalización y de IP del cliente desde la page (página) de gestión de aplicaciones RUM" style="width:100%;" >}}

Después de desactivar la recopilación de datos de IP, el cambio se aplica inmediatamente. Cualquier evento recopilado antes de la desactivación no elimina los datos de IP. Se realiza en el backend, lo que significa que el SDK del navegador sigue enviando datos, pero las direcciones IP son omitidas por los pipelines del backend de Datadog y eliminadas en el momento del procesamiento.

#### Geolocalización
Además de eliminar las IP de los clientes, también puedes optar por desactivar la recopilación de geolocalización (país, ciudad, condado), o GeoIP, de todos los datos recopilados en el futuro. Si desmarcas la casilla **Recopilar datos de geolocalización**, el cambio se aplica inmediatamente. Cualquier evento recopilado antes de la desactivación no elimina los datos de geolocalización correspondientes. La omisión de datos se realiza a nivel de backend, lo que significa que el SDK del navegador sigue enviando datos, pero los datos de geolocalización son omitidos por los pipelines del backend de Datadog y eliminados en el momento del procesamiento.

### Búsqueda proactiva de datos confidenciales con Sensitive Data Scanner
[Sensitive Data Scanner][17] te permite buscar en forma proactiva y depurar los datos confidenciales en el momento de su ingesta por Datadog. Los eventos de RUM se digitalizan en el flujo (stream) antes de que se almacene ningún dato en Datadog. La herramienta tiene la capacidad de depurar, convertir en hash o redactar parcialmente los datos de PII antes de que se almacenen. Funciona aplicando reglas de concordancia de patrones predefinidos o desarrollados por el cliente. Si has activado esta función, puedes encontrarla en la page (página) [**Gestión de datos confidenciales**][18].

## Opciones de privacidad específicas de Session Replay
Consulta [opciones de privacidad específicas de la Repetición de sesión][19].

### Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/privacy/
[2]: /es/real_user_monitoring/application_monitoring/browser/setup/#configuration
[3]: /es/account_management/api-app-keys/#add-an-api-key-or-client-token
[4]: /es/real_user_monitoring/guide/identify-bots-in-the-ui/#filter-out-bot-sessions-on-intake
[5]: /es/real_user_monitoring/explorer/search/
[6]: /es/real_user_monitoring/application_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[7]: /es/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event#event-and-context-structure
[8]: /es/real_user_monitoring/ios/advanced_configuration/?tab=swift#modify-or-drop-rum-events
[9]: /es/real_user_monitoring/application_monitoring/android/advanced_configuration/?tab=kotlin#modify-or-drop-rum-events
[10]: /es/real_user_monitoring/application_monitoring/flutter/advanced_configuration/#modify-or-drop-rum-events
[11]: /es/real_user_monitoring/reactnative/advanced_configuration/#modify-or-drop-rum-events
[12]: /es/real_user_monitoring/guide/proxy-rum-data/?tab=npm
[13]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#user-session
[14]: /es/help/
[15]: /es/account_management/rbac/permissions/#real-user-monitoring
[16]: /es/session_replay/privacy_options#override-an-html-element
[17]: /es/security/sensitive_data_scanner/
[18]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[19]: /es/session_replay/browser/privacy_options
[20]: https://www.datadoghq.com/private-beta/product-analytics/