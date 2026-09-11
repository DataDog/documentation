---
aliases:
- /es/real_user_monitoring/security/
further_reading:
- link: /data_security/
  tag: Documentación
  text: Revise las categorías principales de datos enviados a Datadog
- link: /data_security/synthetics/
  tag: Documentación
  text: Seguridad de datos de Synthetic Monitoring
- link: /session_replay/privacy_options?platform=browser
  tag: Documentación
  text: Opciones de privacidad de Session Replay
- link: https://www.datadoghq.com/blog/default-privacy-session-replay/
  tag: Blog
  text: Ofusque los datos del usuario con la configuración de privacidad predeterminada
    de Session Replay
title: Seguridad de datos de Real User Monitoring
---
<div class="alert alert-info">Esta página trata sobre la seguridad de los datos enviados a Datadog. Si busca productos y funciones de seguridad de la nube y de aplicaciones, consulte la sección <a href="/security/" target="_blank">Security</a>.</div>

## Descripción general {#overview}
Real User Monitoring (RUM) proporciona controles para implementar requisitos de privacidad y garantizar que las organizaciones de cualquier escala no expongan información confidencial o personal. Los datos se almacenan en instancias de nube administradas por Datadog y se cifran en reposo. Los comportamientos predeterminados y las opciones configurables descritos en esta página están diseñados para proteger la privacidad del usuario final y evitar que se recopile información organizacional confidencial. Obtenga más información sobre [Privacidad en Datadog][1].

## Responsabilidad compartida {#shared-responsibility}

La responsabilidad de mantener seguros los datos de los usuarios es compartida entre Datadog y los desarrolladores que utilizan los SDK de RUM.

Datadog es responsable de:

- Proporcionar un producto confiable que maneje los datos de forma segura cuando se transmiten y almacenan en la plataforma de Datadog.
- Garantizar que los problemas de seguridad se identifiquen de acuerdo con las políticas internas.

Los desarrolladores son responsables de:
- Aprovechar los valores de configuración y las opciones de privacidad de datos proporcionadas por Datadog.
- Garantizar la integridad del código dentro de sus entornos.

## Marcos de trabajo de compliance {#compliance-frameworks}
RUM se puede configurar para Compliance con muchos estándares y marcos regulatorios, incluidos, entre otros:

- GDPR
- HIPAA
- ISO
- CCPA/CPRA

## Restricciones de privacidad {#privacy-restrictions}
De forma predeterminada, existen algunas restricciones de privacidad que protegen los datos del usuario para ayudar a cumplir con los marcos normativos y de estándares.

### Uso de cookies en RUM del navegador {#browser-rum-use-of-cookies}
RUM del navegador requiere que las cookies de origen estén habilitadas en el navegador del usuario final para recopilar datos. Si lo requieren las jurisdicciones en las que opera, usted es responsable de configurar sus páginas para cumplir con las leyes de dichas jurisdicciones, lo que incluye recibir el consentimiento para recopilar cookies antes de que se inicialice RUM.

### Gestión de consentimiento de RUM móvil {#mobile-rum-consent-management}
El seguimiento de RUM móvil solo se ejecuta con el consentimiento del usuario. Si el usuario final acepta el seguimiento de RUM, Datadog rastrea su actividad y la experiencia de su sesión. Si el usuario rechaza el seguimiento de RUM, Datadog no rastrea su actividad ni la experiencia de su sesión.

## Opciones de privacidad {#privacy-options}
Usted cuenta con varias opciones y herramientas cuando se trata de recopilar y redactar datos capturados por RUM.

### Token de cliente {#client-token}
El [token de cliente][2] de RUM del navegador se utiliza para hacer coincidir los datos del navegador del usuario final con una aplicación de RUM específica en Datadog. No está cifrado y es visible desde el lado del cliente de una aplicación.

Debido a que el token de cliente solo se utiliza para enviar datos a Datadog, no existe riesgo de pérdida de datos debido a este token; sin embargo, Datadog recomienda una buena gestión del token de cliente para evitar otros tipos de uso indebido, incluyendo:

- [Rotar el token de cliente][3] regularmente para garantizar que solo sea utilizado por su aplicación
- [Filtrar bots automáticamente][4] al capturar datos de RUM

#### Proxy autenticado {#authenticated-proxy}
Un método para usar el token de cliente para filtrar bots es un proxy autenticado. En este método, se sustituye una cadena de marcador de posición por el `clientToken` al inicializar el SDK de navegador Datadog RUM. El proxy conoce el token de cliente real, pero el usuario final no.

El proxy está configurado para realizar una verificación de información de usuario válida antes de pasar los datos de la sesión a Datadog, confirmando así que un usuario real ha iniciado sesión y está transmitiendo tráfico para ser monitoreado. Al recibir tráfico, el proxy verifica que los datos incluyan la cadena de marcador de posición y la reemplaza con el `clientToken` real antes de reenviar los datos a Datadog.

### Seguimiento de eventos {#event-tracking}
Un [evento][5] es una interacción del usuario con elementos específicos de su sitio o aplicación. Los eventos pueden capturarse automáticamente a través del SDK o enviarse mediante acciones personalizadas. Puede desactivar el seguimiento automático de las interacciones del usuario y las vistas de página para capturar solo la interacción que elija. De forma predeterminada, RUM utiliza el contenido de destino para generar nombres de acción a partir de las acciones recopiladas automáticamente por el SDK. Puede [anular explícitamente][6] este comportamiento con cualquier nombre determinado.

Los datos que rastreamos automáticamente contienen principalmente información técnica, gran parte de la cual no incluye información de identificación personal. Los datos capturados por RUM pueden redactarse aún más antes de enviarse y almacenarse en Datadog mediante opciones de configuración avanzada para los siguientes métodos:

- [beforeSend API][7]
- [iOS][8]
- [Android][9]
- [Flutter][10]
- [React Native][11]

### Transmita eventos de RUM a través de un servidor proxy {#transmit-rum-events-through-a-proxy-server}
Puede transmitir todos los eventos de RUM a través de su propio [servidor proxy][12] para que los dispositivos de los usuarios finales nunca se comuniquen directamente con Datadog.

### Seguimiento de la identidad del usuario {#user-identity-tracking}
De forma predeterminada, **no hay seguimiento de la identidad de los usuarios**. Cada sesión tiene un `session.id` único vinculado a ella, lo que anonimiza los datos, pero le permite comprender las tendencias. Tiene la opción de escribir código para capturar [datos de usuario][13] como el nombre y la dirección de correo electrónico, y luego usar esos datos para [enriquecer y modificar][13] las sesiones de RUM, pero esto no es obligatorio.

### Retención de datos {#data-retention}
Después de configurar la captura de eventos, los eventos se almacenan en Datadog. Puede decidir cuánto tiempo permanecen sus eventos y propiedades capturados en Datadog.

De forma predeterminada, la retención de datos para entornos de producción es:

- 30 días para sesiones, visualizaciones, acciones, errores y grabaciones de sesiones.
- 15 días para recursos y tareas largas.

Para extender la retención de datos y analizar el comportamiento de los usuarios durante períodos más largos (solo sesiones, visualizaciones y acciones), puede enviar una solicitud para [unirse a Product Analytics][20].

#### Control de acceso basado en roles {#role-based-access-control}
Datadog proporciona control de acceso basado en roles (RBAC) para administrar quién ve los datos de RUM capturados. La configuración predeterminada para el acceso a los datos depende del rol al que se agregue a un usuario. Hay tres tipos de roles de Datadog disponibles: roles de administrador, estándar y de solo lectura. Los permisos específicos de RUM más granulares se definen en [permisos de roles de Datadog][15]. Por ejemplo, puede otorgar o revocar el acceso para visualizar las reproducciones de sesiones.

### Eliminación de datos {#data-deletion}
Si necesita eliminar datos almacenados por Datadog, por ejemplo, si se han filtrado datos potencialmente confidenciales en eventos de RUM, puede eliminar permanentemente los datos dentro de un marco de tiempo determinado. Con una eliminación permanente, **todos** los datos se eliminan; no se pueden dirigir a una aplicación específica. Si necesita que se elimine algún dato, comuníquese con el [equipo de soporte de Datadog][14].

### Eliminación de datos personales y confidenciales {#personal-and-sensitive-data-removal}
Tiene algunas opciones disponibles para eliminar información de identificación personal (PII) y datos confidenciales, incluidas direcciones IP y geolocalización. Algunos escenarios donde la PII podría aparecer en RUM:

- Nombres de acciones en botones (por ejemplo, "Visualizar número completo de tarjeta de crédito")
- Nombres mostrados en URL
- Eventos rastreados personalizados instrumentados por los desarrolladores de la aplicación

#### Enmascarar nombres de acciones {#mask-action-names}
De forma predeterminada, si desea enmascarar todos los nombres de acciones, puede usar la opción `enablePrivacyForActionName` junto con la configuración de privacidad `mask`. Esta operación sustituye automáticamente todos los nombres de acciones no anulados por el marcador de posición `Masked Element`. Esta configuración también está diseñada para ser compatible con los [atributos de anulación HTML][16] existentes.

#### Datos no estructurados {#unstructured-data}
La PII incluida inadvertidamente en datos no estructurados, como el nombre de una persona en un cuadro de texto, solo puede eliminarse mediante una solicitud de eliminación de datos para un marco de tiempo especificado.

Con respecto a las URL, tiene la opción de realizar un seguimiento manual de las visualizaciones de página para eliminar cualquier PII o usar beforeSend para cambiar el texto de la URL.

También puede transmitir todos los eventos de RUM a través de su propio servidor (proxy) para que los dispositivos de los usuarios finales nunca se comuniquen directamente con Datadog.

#### Dirección IP {#ip-address}
Después de haber inicializado su aplicación RUM, puede elegir si desea incluir o no datos de IP o geolocalización desde la pestaña {{< ui >}}User Data Collection{{< /ui >}}:

{{< img src="data_security/data-security-rum-privacy-compliance-user-data-collection-1.png" alt="Puede incluir o excluir datos de geolocalización y de IP del cliente desde la página de administración de la aplicación RUM" style="width:100%;" >}}

Después de deshabilitar la recopilación de datos de IP, el cambio se aplica de inmediato. Cualquier evento recopilado antes de la desactivación no elimina los datos de IP. Se realiza en el backend, lo que significa que el SDK del navegador sigue enviando datos, pero las direcciones IP son omitidas por las canalizaciones del backend de Datadog y descartadas en el momento del procesamiento.

#### Geolocalización {#geolocation}
Además de eliminar las IP de los clientes, también puede optar por deshabilitar la recopilación de geolocalización (país, ciudad, condado), o GeoIP, de todos los datos recopilados en el futuro. Si desmarca la casilla {{< ui >}}Collect geolocation data{{< /ui >}}, el cambio se aplica de inmediato. Cualquier evento recopilado antes de la desactivación no elimina los datos de geolocalización correspondientes. La omisión de datos se realiza a nivel de backend, lo que significa que el SDK del navegador sigue enviando datos, pero los datos de geolocalización son omitidos por las canalizaciones del backend de Datadog y descartados en el momento del procesamiento.

### Busque de forma proactiva datos confidenciales con Sensitive Data Scanner {#proactively-search-for-sensitive-data-with-sensitive-data-scanner}
[Sensitive Data Scanner][17] le permite buscar y depurar de forma proactiva datos confidenciales al momento de la ingesta por parte de Datadog. Los eventos de RUM se escanean en el flujo antes de que cualquier dato se almacene en Datadog. La herramienta tiene la capacidad de depurar, aplicar hash o redactar parcialmente datos de PII antes de que se almacenen. Funciona mediante la aplicación de reglas de coincidencia de patrones listas para usar o desarrolladas por el cliente. Si ha habilitado esta función, puede encontrarla en la [{{< ui >}}Manage Sensitive Data{{< /ui >}} página][18].

## Opciones de privacidad específicas de Session Replay {#session-replay-specific-privacy-options}
Consulte las [opciones de privacidad específicas para Session Replay][19]. El enmascaramiento en Session Replay es permanente: los valores enmascarados nunca salen del dispositivo y no se pueden desenmascarar más tarde. Esto difiere del [Sensitive Data Scanner masking][21], que ofusca los valores coincidentes en la ingesta pero permite a los usuarios con el permiso `Data Scanner Unmask` ver el valor original.

### Lecturas Adicionales {#further-reading}

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
[16]: /es/session_replay/privacy_options?platform=browser#override-an-html-element
[17]: /es/security/sensitive_data_scanner/
[18]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[19]: /es/session_replay/privacy_options?platform=browser
[20]: https://www.datadoghq.com/private-beta/product-analytics/
[21]: /es/security/sensitive_data_scanner/setup/telemetry_data/?tab=logs#mask-action