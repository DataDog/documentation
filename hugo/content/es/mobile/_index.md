---
algolia:
  tags:
  - Datadog mobile app
  - mobile device
aliases:
- /es/service_management/mobile/
description: Monitorea tu infraestructura dondequiera que estés con la aplicación
  móvil de Datadog para iOS y Android, que cuenta con tableros, alertas, incidentes
  y gestión de guardias.
further_reading:
- link: /mobile/shortcut_configurations/
  tag: Documentación
  text: Configuraciones de accesos directos
- link: /monitors/
  tag: Documentación
  text: Aprende sobre Seguimiento y Alerting
- link: /dashboards/
  tag: Documentación
  text: Aprende sobre Dashboards
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: Blog
  text: Mejora tu experiencia de guardia con los widgets de tableros móviles de Datadog
- link: https://www.datadoghq.com/blog/mobile-app-getting-started/
  tag: Blog
  text: Comenzando con la aplicación móvil de Datadog
- link: https://www.datadoghq.com/blog/mobile-app-reduce-mttr/
  tag: Blog
  text: Reduce tu tiempo medio de reparación con la aplicación móvil de Datadog
- link: https://www.datadoghq.com/blog/designing-on-call-sounds
  tag: Blog
  text: Cómo diseñamos sonidos de alerta empáticos para ingenieros de guardia
title: Aplicación Móvil de Datadog
---
La aplicación móvil de Datadog te permite ver alertas de Datadog en tu dispositivo móvil. Al recibir una alerta a través de On-Call, Slack o correo electrónico, puedes investigar problemas abriendo gráficos de seguimiento y tableros en tu dispositivo móvil.

## Instalando {#installing}

Descarga la aplicación desde la [Apple App Store][1] para tu dispositivo iOS, o desde la [Google Play Store][2] para tu dispositivo Android.

### Iniciando sesión {#logging-in}

Puedes iniciar sesión utilizando autenticación estándar, autenticación de Google o [SAML][3] - tanto para la región de EE. UU. como para la de la UE.

#### Habilitando SAML {#enabling-saml}

El inicio de sesión SAML requiere que configures y autentiques tu proveedor SAML con Datadog utilizando tu navegador predeterminado de iOS/Android. Para el inicio de sesión iniciado por IdP de SAML, consulta el final de esta sección. Para autenticar SAML:

1. En la aplicación móvil, selecciona la región de tu centro de datos (por ejemplo, US1) en la esquina superior derecha.
2. Presiona el botón de inicio de sesión.
3. Haz clic en "¿Usando inicio de sesión único (SAML)?" enlace.
4. Ingresa tu correo electrónico de la empresa y envía el correo.
5. Mientras estés en tu dispositivo móvil, abre el correo electrónico y haz clic en el enlace indicado a través de tu navegador predeterminado.
6. Ingresa las credenciales SAML de tu organización para ser redirigido a una sesión autenticada de la aplicación móvil de Datadog.

Opcionalmente, también puedes autenticarte a través de un código QR o entrada manual, como se detalla a continuación.

##### Código QR {#qr-code}

1. En un navegador, navega a tu página de [Configuraciones Personales de la Cuenta de Datadog][4] y haz clic en **Iniciar sesión en la aplicación móvil** para la organización en la que estás actualmente conectado. Esto hace que aparezca un código QR.
2. Usa la aplicación de cámara predeterminada de tu teléfono para escanear el código QR y luego toca el enlace sugerido para abrir la aplicación móvil de Datadog. Se iniciará sesión automáticamente.

**Nota**: Si haces clic en el botón **Iniciar sesión en la aplicación móvil de Datadog** de una organización en la que no estás actualmente conectado, el UUID de la organización se inserta automáticamente en la pantalla de inicio de sesión. Aún debes proporcionar autenticación utilizando tu método estándar.

##### Entrada manual {#manual-entry}

1. Para ingresar manualmente el ID SAML, abre la aplicación móvil de Datadog y presiona "¿Usando inicio de sesión único (SAML)?" botón.
2. Presiona el botón "Usar otro método para iniciar sesión" e ingresa el ID SAML manualmente.

Al hacer clic en **Autorizar** al iniciar sesión, vinculas el dispositivo móvil que estás utilizando a tu cuenta. Por motivos de seguridad, deberás pasar por este proceso una vez al mes.

##### Inicio de sesión iniciado por IdP SAML {#saml-idp-initiated-login}

Si sigues recibiendo errores al intentar iniciar sesión con SAML, tu proveedor de identidad puede forzar el inicio de sesión iniciado por IdP. Para más información sobre cómo habilitar SAML iniciado por IdP, consulta nuestra página de SAML iniciado por IdP [página de SAML Iniciado por IdP][5]

##### Inicio de sesión en subdominio {#subdomain-login}

1. Toca subdominio e ingresa tu [subdominio][29] personalizado.
2. Continúa con los pasos de inicio de sesión según se indique.

### Cambiar organizaciones {#switch-organizations}

Para cambiar de organizaciones, navega a la página de **Configuración** en la aplicación móvil y haz clic en **Organización**. 

**Nota**: Puede que necesites reautenticarte al cambiar de organizaciones.

### Cerrar sesión {#log-out}
Para cerrar sesión, navega a la página de **Configuración** en la aplicación móvil y haz clic en **Cerrar sesión**. Confirma **Sí** que estás seguro. 

## De guardia {#on-call}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/on_call_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de guardia de iOS mostrando turnos, horarios y opciones de escalación">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_On_Call.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de guardia de Android mostrando turnos, horarios y opciones de escalación">}}

{{% /tab %}}
{{< /tabs >}}

La página de guardia proporciona una vista completa de los turnos de guardia, horarios, páginas y políticas de escalación. Puedes filtrar la información por usuario, equipo, urgencia, estado o fecha para encontrar rápidamente los detalles relevantes. Tocar **Escalar** te solicita confirmar la escalación al siguiente nivel de política. Tocar **Declarar Incidente** te solicita ingresar un título y proporcionar los atributos relevantes del incidente.

Puedes enviar una notificación a un individuo o equipo, y también sobrescribir turnos existentes tocando el turno que deseas sobrescribir. Puedes ver las investigaciones del monitor Bits Investigation para los hallazgos y conclusiones iniciales. Para más información, consulta [Datadog On-Call][20].

Para configurar las notificaciones de On-Call en tu dispositivo móvil, consulta la guía para [Configurar tu Dispositivo Móvil para Datadog On-Call][21].

<div class="alert alert-info">
Si solo necesitas acceder a On-Call en móvil y deseas restringir el acceso a datos de telemetría sensibles en dispositivos móviles, contacta al soporte de Datadog.
</div>

## Incidentes {#incidents}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/incident_may_2025.png" alt="Página de Incidentes en la aplicación móvil de Datadog On-call" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Incident.png" alt="Página de Incidentes en la aplicación móvil de Datadog On-call" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{< /tabs >}}

En la página de Incidentes, puedes ver, buscar y filtrar todos los incidentes a los que tienes acceso en tu cuenta de Datadog para asegurar la respuesta y resolución desde cualquier lugar. También puedes declarar y editar incidentes, y comunicarte sin problemas con tus equipos a través de integraciones con Slack, Zoom y muchos más. Para más información sobre Incidentes, consulta [Datadog Incident Management][12].

### Crear un incidente {#create-an-incident}

1. Navega a la lista de incidentes tocando la pestaña de Incidentes en la barra inferior.
2. Toca el botón **+** en la esquina superior derecha.
3. Dale a tu incidente un título, severidad y comandante.

## Centro de Notificaciones {#notification-center}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_notification_center.png" alt="Centro de notificaciones de iOS en la aplicación móvil de Datadog" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_notification_center.png" alt="Centro de notificaciones de Android en la aplicación móvil de Datadog" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{< /tabs >}}

El Centro de Notificaciones lista todas las notificaciones push recibidas para que el contexto de la notificación nunca se pierda. Puedes filtrar por tipo de notificación.

## Tableros {#dashboards}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/dashboard_may_2025_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de tableros de iOS mostrando la lista de tableros con opciones de búsqueda y filtrado">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Dashboards.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de tableros de Android mostrando la lista de tableros con opciones de búsqueda y filtrado">}}

{{% /tab %}}
{{< /tabs >}}

En la página de Tableros, puedes ver y buscar todos los tableros a los que tienes acceso en tu organización de Datadog, y filtrarlos utilizando las mismas variables de plantilla que has configurado en la aplicación web de Datadog. Filtra rápidamente tus tableros utilizando Saved Views de variables de plantilla. Para más información sobre Saved Views de variables de plantilla, consulta [Dashboard Saved Views][9]. Haz clic en un tablero individual para verlo. Haz clic en el intervalo de tiempo en la esquina inferior derecha para personalizar el rango del tablero. 

**Nota**: 
- Para configurar o editar un tablero, necesitas [iniciar sesión en la aplicación del navegador de Datadog][10]. Para más información, consulta [Tableros][11].
- Los enlaces de tablero configurados en UTC se abren en UTC en la aplicación móvil. Para más información, consulta [Configuraciones de Tablero][24].
- No todos los tipos de widgets están disponibles, lo que significa que no muestran datos en la aplicación móvil. Esto incluye Mapa de Topología, Widget de Lista (todas las fuentes de datos), widget de treemap heredado y widget de Resumen de SLO.

## Monitores {#monitors}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/monitor_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de monitores de iOS que muestra la lista de monitores con opciones de búsqueda y filtrado.">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Monitors.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de monitores de Android que muestra la lista de monitores con opciones de búsqueda y filtrado.">}}

{{% /tab %}}
{{< /tabs >}}

En la página de Monitores, puedes ver y buscar todos los monitores a los que tienes acceso en tu organización de Datadog. Puedes especificar por nombre de campo y construir consultas de búsqueda específicas basadas en tu estrategia de etiquetado. Para más información sobre la búsqueda, consulta la sección [Administrar Búsqueda de Monitores][6].

Por ejemplo, para filtrar los monitores de métricas relacionados con el equipo de SRE que está siendo alertado, utiliza la consulta `"status:Alert type:Metric team:sre"`. Haz clic en alertas individuales para ver detalles, que pueden ser filtrados por tipo y por tiempo de alerta. También puedes silenciar la alerta. Tus diez búsquedas más recientes se guardan para que tengas un acceso más rápido a consultas anteriores. Además, puedes filtrar tu lista de monitores utilizando vistas guardadas, que aparecen cuando activas la barra de búsqueda. También puedes ver y ejecutar pruebas sintéticas al visualizar tus monitores sintéticos.

**Nota**: Para configurar o editar monitores, notificaciones o vistas guardadas, debes usar la [aplicación web de Datadog][7]. Todos los monitores configurados en la aplicación web son visibles en la aplicación móvil. Para más información, consulta [Creando monitores][8].

## Notebooks {#notebooks}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/notebook_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS muestra la página de cuadernos con una lista de cuadernos y opciones de búsqueda y filtrado">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Notebooks.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Android muestra la página de cuadernos con una lista de cuadernos y opciones de búsqueda y filtrado">}}

{{% /tab %}}
{{< /tabs >}}

En la página de Notebooks, puedes ver y buscar todos los notebooks a los que tienes acceso en tu organización de Datadog, y filtrarlos por etiquetas. Las etiquetas de notebooks te permiten filtrar por favoritos, equipo y tipo. Consulta [etiquetas de notebooks][19] para más información.

**Nota**: Para configurar o editar un notebook, necesitas [iniciar sesión en la aplicación del navegador de Datadog][10]. Para más información, consulta [Notebooks][18].

## Trazas {#traces}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/trace_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de trazas de iOS que muestra una lista de trazas con opciones de búsqueda y filtrado">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Traces.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de trazas de Android que muestra una lista de trazas con opciones de búsqueda y filtrado">}}

{{% /tab %}}
{{< /tabs >}}

En la página de Trazas, puedes ver y buscar todas las trazas a las que tienes acceso en tu organización de Datadog. Puedes reducir la lista a través de vistas guardadas o construir consultas de búsqueda específicas basadas en tu estrategia de etiquetado. Para más información sobre la búsqueda, consulta [Sintaxis de Consulta del Explorador de Rastros][16].

Por ejemplo, para filtrar trazas con la etiqueta `#env:prod` o la etiqueta `#test`, utiliza la consulta `"env:prod" OR test`. Haz clic en servicios individuales para expandir los tramos asociados y selecciona tramos para ver información, errores y registros relacionados. También puedes abrir trazas desde servicios y registros.

**Solo disponible en iOS**: Watchdog Insights señala valores anómalos de latencia y valores anómalos de errores. Para más información, consulta [Watchdog Insights][26].


## Registros {#logs}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/iOS_logs_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de registros de iOS que muestra una lista de registros con opciones de búsqueda y filtrado">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Logs.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de registros de Android que muestra una lista de registros con opciones de búsqueda y filtrado">}}

{{% /tab %}}
{{< /tabs >}}

En la página de Registros, puedes ver y buscar todos los registros o registros flexibles a los que tienes acceso en tu organización de Datadog. Puedes reducir la lista a través de vistas guardadas o filtros de consulta. Para más información sobre la búsqueda, consulta [Sintaxis de Búsqueda de Registros][23].

También puedes agrupar por patrones de registro y seleccionar diferentes atributos de registro para agrupar o clasificar resultados. Para más información sobre patrones de registros, consulte [Agrupación de Registros en Patrones][22].

**Nota**: Para activar los registros flexibles, navegue a la lista de registros y toque en la parte superior derecha para seleccionar habilitar registros flexibles.

**Solo disponible en iOS**: Watchdog Insights señala anomalías y valores anómalos en los registros. Para más información, consulte [Watchdog Insights para Registros][25].


## Servicios {#services}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/service_may_2025_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de servicios de iOS que muestra la lista de servicios con opciones de búsqueda y filtrado.">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Services.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de servicios de Android que muestra la lista de servicios con opciones de búsqueda y filtrado.">}}

{{% /tab %}}
{{< /tabs >}}

En la página de Servicios, puede ver, buscar y filtrar todos los servicios a los que tiene acceso en su cuenta de Datadog desde la aplicación móvil de Datadog para asegurar la salud de su servicio desde cualquier lugar. También puede ver implementaciones recientes, recursos, SLOs y monitores asociados con ese servicio. Para más información sobre herramientas de investigación para sus servicios, consulte [gestionar Catálogo][17].

## Bits AI {#bits-ai}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_bits_chat.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Interfaz del chatbot de Bits AI en iOS donde un usuario pregunta sobre un servicio.">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_bits_chat.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Interfaz del chatbot de Bits AI en Android donde un usuario pregunta sobre un servicio.">}}

{{% /tab %}}
{{< /tabs >}}

En la página de inicio de Bits AI, puede hacer preguntas sobre la salud del sistema de su organización. Bits AI admite consultas en lenguaje natural para registros y trazas de APM. Para más información, consulte [Bits Chat][27].

### Investigación de Bits {#bits-investigation}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_bits_sre.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Resultados de la Investigación de Bits mostrados en una página de On-Call.">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_bits_sre.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Resultados de la Investigación de Bits mostrados en una página de On-Call.">}}

{{% /tab %}}
{{< /tabs >}}

Cuando está habilitado, la Investigación de Bits inicia investigaciones directamente en las páginas de On-Call. Estas investigaciones presentan hallazgos y conclusiones iniciales para ayudar a los respondientes a identificar posibles causas raíz y próximos pasos. Para más información, consulte [Investigación de Bits][28].

## Preguntas Frecuentes {#frequently-asked-question}
### ¿Cómo puedo permanecer conectado en la aplicación móvil? {#how-do-i-remain-logged-into-the-mobile-app}
Una vez autenticado con éxito en la aplicación móvil, permanecerá conectado durante 90 días.  

**Nota**: Si tiene habilitadas las notificaciones, se enviarán notificaciones proactivas 10 días antes de la expiración del token.

### ¿Seguiré recibiendo notificaciones si se cierra sesión automáticamente? {#will-i-still-receive-notifications-if-i-am-automatically-signed-out}
Si se cierra sesión automáticamente durante el período de 90 días del token, aún podrá recibir notificaciones y se le pedirá que inicie sesión nuevamente.

**Nota**: Si cierra sesión manualmente en la aplicación, dejará de recibir notificaciones.

### ¿Por qué no estoy recibiendo notificaciones? {#why-am-i-not-receiving-notifications}
Verifique que tiene habilitadas las notificaciones para la aplicación Datadog en la configuración de aplicaciones de su dispositivo. Si desea asegurarse de que las notificaciones eviten No Molestar, verifique que las Alertas Críticas estén activadas.

### ¿Recibiré notificaciones para todas las organizaciones en las que estoy registrado? {#will-i-receive-notifications-for-all-organizations-that-i-am-signed-into}
Sí, independientemente de la organización a la que cambie, recibirá notificaciones para todas las organizaciones en las que está registrado. Esto incluye notificaciones push críticas. 

### ¿Qué sucede si un usuario es deshabilitado? {#what-happens-if-a-user-is-disabled}
El token de la aplicación móvil será inválido y obligará al usuario a cerrar sesión.

## Solución de problemas {#troubleshooting}

Para obtener ayuda con la solución de problemas, [contacta al soporte de Datadog][13]. También puedes enviar un mensaje en el canal [#mobile-app][15] de [Slack público de Datadog][14].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /es/account_management/saml/#pagetitle
[4]: https://app.datadoghq.com/personal-settings/organizations
[5]: /es/account_management/saml/mobile-idp-login/
[6]: /es/monitors/manage/#search
[7]: https://app.datadoghq.com/monitors
[8]: /es/monitors/types
[9]: /es/dashboards/template_variables/#saved-views
[10]: https://app.datadoghq.com/dashboard/lists
[11]: /es/dashboards/
[12]: /es/monitors/incident_management
[13]: /es/help/
[14]: https://chat.datadoghq.com/
[15]: https://datadoghq.slack.com/archives/C0114D5EHNG
[16]: /es/tracing/trace_explorer/query_syntax/
[17]: https://docs.datadoghq.com/es/internal_developer_portal/catalog/set_up/
[18]: https://docs.datadoghq.com/es/notebooks/
[19]: https://docs.datadoghq.com/es/notebooks/#notebook-tags
[20]: https://docs.datadoghq.com/es/incident_response/on-call/
[21]: /es/incident_response/on-call/guides/configure-mobile-device-for-on-call/?tab=ios
[22]: https://docs.datadoghq.com/es/logs/explorer/analytics/patterns/
[23]: https://docs.datadoghq.com/es/logs/explorer/search_syntax/
[24]: /es/dashboards/configure/#configuration-actions
[25]: /es/logs/explorer/watchdog_insights/
[26]: /es/watchdog/insights/?tab=logmanagement
[27]: /es/bits_ai/bits_assistant/
[28]: /es/bits_ai/bits_ai_sre/
[29]: /es/account_management/multi_organization/#custom-sub-domains