---
algolia:
  tags:
  - Datadog mobile app
  - mobile device
aliases:
- /es/service_management/mobile/
description: Haga un seguimiento de su infraestructura sobre la marcha con la aplicación
  móvil de Datadog para iOS y Android, que incluye Dashboards, alertas, incidentes
  y gestión de On-Call.
further_reading:
- link: /mobile/shortcut_configurations/
  tag: Documentación
  text: Configuraciones de atajos
- link: /monitors/
  tag: Documentación
  text: Obtenga información sobre Monitors y Alerting
- link: /dashboards/
  tag: Documentación
  text: Obtenga información sobre Dashboards
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: Blog
  text: Mejore su experiencia de guardia con los widgets del dashboard de la aplicación
    móvil de Datadog.
- link: https://www.datadoghq.com/blog/mobile-app-getting-started/
  tag: Blog
  text: Primeros pasos con la aplicación móvil de Datadog
- link: https://www.datadoghq.com/blog/mobile-app-reduce-mttr/
  tag: Blog
  text: Reduzca su tiempo medio de reparación con la aplicación móvil de Datadog
- link: https://www.datadoghq.com/blog/designing-on-call-sounds
  tag: Blog
  text: Cómo diseñamos sonidos de alerta empáticos para ingenieros On-Call
title: Aplicación móvil de Datadog
---
La aplicación móvil de Datadog le permite visualizar alertas de Datadog en su dispositivo móvil. Cuando reciba una alerta a través de On-Call, Slack o correo electrónico, puede investigar los problemas abriendo gráficos de seguimientos y Dashboards en su dispositivo móvil.

## Instalación de {#installing}

Descargue la aplicación desde [Apple App Store][1] para su dispositivo iOS, o desde [Google Play store][2] para su dispositivo Android.

### Inicio de sesión {#logging-in}

Puede iniciar sesión utilizando la autenticación estándar, la autenticación de Google o [SAML][3], tanto para la región de EE. UU. como para la de la UE.

#### Habilitación de SAML {#enabling-saml}

El inicio de sesión con SAML requiere que configure y autentique su proveedor SAML con Datadog utilizando su navegador predeterminado de iOS/Android. Para el inicio de sesión iniciado por el IdP de SAML, consulte el final de esta sección. Para autenticar SAML:

1. En la aplicación móvil, seleccione su región de centro de datos (por ejemplo, US1) en la esquina superior derecha.
2. Presione el botón de inicio de sesión.
3. Haga clic en "¿Usa inicio de sesión único (SAML)?" enlace.
4. Ingrese su correo electrónico de la empresa y envíe el correo.
5. Mientras esté en su dispositivo móvil, abra el correo electrónico y haga clic en el enlace indicado a través de su navegador predeterminado.
6. Ingrese las credenciales SAML de su organización para ser redirigido a una sesión autenticada de la aplicación móvil de Datadog.

Opcionalmente, también puede autenticarse mediante un código QR o entrada manual, como se describe a continuación.

##### Código QR {#qr-code}

1. En un navegador, navegue a su [Datadog account Personal Settings Organizations][4] y haga clic en {{< ui >}}Log in to Mobile App{{< /ui >}} para la organización en la que ha iniciado sesión actualmente. Esto abre un código QR.
2. Use la aplicación de cámara predeterminada de su teléfono para escanear el código QR y luego toque el enlace sugerido para abrir la aplicación móvil de Datadog. Se iniciará sesión automáticamente.

**Nota**: Si hace clic en el botón {{< ui >}}Log in to Mobile App{{< /ui >}} de una organización en la que no ha iniciado sesión actualmente, el UUID de la organización se inserta automáticamente en la pantalla de inicio de sesión. Aun así, debe proporcionar la autenticación mediante su método estándar.

##### Entrada manual {#manual-entry}

1. Para ingresar manualmente el ID de SAML, abra la aplicación móvil de Datadog y presione el botón {{< ui >}}Using Single Sign-On (SAML)?{{< /ui >}}.
2. Presione el botón {{< ui >}}Use another method to login{{< /ui >}} e ingrese el ID de SAML manualmente.

Al hacer clic en {{< ui >}}Authorize{{< /ui >}} al iniciar sesión, vincula el dispositivo móvil que está usando a su cuenta. Por motivos de seguridad, deberá realizar este flujo una vez al mes.

##### Inicio de sesión iniciado por el IdP de SAML {#saml-idp-initiated-login}

Si sigue recibiendo errores al intentar iniciar sesión con SAML, es posible que su proveedor de identidad exija el inicio de sesión iniciado por el IdP. Para obtener más información sobre cómo habilitar SAML iniciado por IdP, consulte nuestra página de SAML iniciado por IdP [IdP Initiated SAML page][5]

##### Inicio de sesión con subdominio {#subdomain-login}

1. Toque subdominio e ingrese su [subdominio][29] personalizado.
2. Continúe con los pasos de inicio de sesión según se le indique.

### Cambiar de organización {#switch-organizations}

Para cambiar de organización, navegue a la página {{< ui >}}Settings{{< /ui >}} en la aplicación móvil de Datadog y haga clic en {{< ui >}}Organization{{< /ui >}}.

**Nota**: Es posible que deba volver a autenticarse cuando cambie de organización.

### Cerrar sesión {#log-out}
Para cerrar sesión, navegue a la página {{< ui >}}Settings{{< /ui >}} en la aplicación móvil de Datadog y haga clic en {{< ui >}}Log Out{{< /ui >}}. Confirme {{< ui >}}Yes{{< /ui >}} que está seguro.

## On-Call {#on-call}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/on_call_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de On-Call en iOS que muestra turnos, horarios y opciones de escalamiento">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_On_Call.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de On-Call en Android que muestra turnos, horarios y opciones de escalamiento">}}

{{% /tab %}}
{{< /tabs >}}

La página de On-Call proporciona una vista integral de los turnos, horarios, páginas y políticas de escalamiento de On-Call. Puede filtrar la información por usuario, equipo, urgencia, estado o fecha para encontrar rápidamente detalles relevantes. Al tocar {{< ui >}}Escalate{{< /ui >}} se le solicitará que confirme el escalamiento al siguiente nivel de la política. Al tocar {{< ui >}}Declare Incident{{< /ui >}} se le solicitará que ingrese un título y proporcione los atributos relevantes del incidente.

Puede iniciar un page a un individuo o equipo, y también anular los turnos existentes tocando el turno que desea anular. Puede ver las investigaciones del seguimiento Bits Investigation para obtener hallazgos y conclusiones iniciales. Para obtener más información, consulte [Datadog On-Call][20].

Para configurar las notificaciones de On-Call en su dispositivo móvil, consulte la guía para [Configurar su dispositivo móvil para Datadog On-Call][21].

<div class="alert alert-info">
Si solo necesita acceder a On-Call en el móvil y desea restringir el acceso a datos de telemetría confidenciales en dispositivos móviles, comuníquese con el soporte de Datadog.
</div>

## Incidentes {#incidents}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/incident_may_2025.png" alt="Página de incidentes en la aplicación móvil de Datadog On-Call" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_Incident.png" alt="Página de incidentes en la aplicación móvil de Datadog On-Call" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{< /tabs >}}

En la página de Incidentes, puede visualizar, buscar y filtrar todos los incidentes a los que tiene acceso en su cuenta de Datadog para garantizar la respuesta y la resolución desde cualquier lugar. También puede declarar y editar incidentes, y comunicarse sin problemas con sus equipos a través de integraciones con Slack, Zoom y muchas más. Para obtener más información sobre los incidentes, consulte [Datadog Incident Management][12].

### Crear un incidente {#create-an-incident}

1. Navegue a la lista de incidentes tocando la pestaña {{< ui >}}Incidents{{< /ui >}} en la barra inferior.
2. Toque el botón {{< ui >}}\+{{< /ui >}} en la esquina superior derecha.
3. Asigne a su incidente un título, una gravedad y un comandante.

## Centro de notificaciones {#notification-center}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/ios_notification_center.png" alt="Centro de notificaciones de iOS en la aplicación móvil de Datadog" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/android_notification_center.png" alt="Centro de notificaciones de Android en la aplicación móvil de Datadog" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

{{% /tab %}}
{{< /tabs >}}

El Centro de notificaciones enumera todas las notificaciones push recibidas para que nunca se pierda el contexto de las notificaciones. Puede filtrar por tipo de notificación.

## Dashboards {#dashboards}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/dashboard_may_2025_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de dashboards de iOS que muestra una lista de dashboards con opciones de búsqueda y filtro">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_Dashboards.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de dashboards de Android que muestra una lista de dashboards con opciones de búsqueda y filtro">}}

{{% /tab %}}
{{< /tabs >}}

En la página de Dashboards, puede visualizar y buscar todos los dashboards a los que tiene acceso en su Datadog org, y filtrarlos usando las mismas variables de plantilla que ha configurado en la aplicación web de Datadog. Filtre rápidamente sus Dashboards usando Saved Views de variables de plantilla. Para obtener más información sobre Saved Views de variables de plantilla, consulte [Dashboard Saved Views][9]. Haga clic en un Dashboard individual para visualizarlo. Haga clic en el marco de tiempo en la parte inferior derecha para personalizar el rango del Dashboard.

**Nota**:
- Para configurar o editar un Dashboard, debe [iniciar sesión en la aplicación de navegador de Datadog][10]. Para obtener más información, consulte [Dashboards][11].
- Los enlaces de Dashboard configurados en UTC se abren en UTC en la aplicación móvil. Para obtener más información, consulte [Dashboard Configurations][24].
- No todos los tipos de widgets están disponibles, lo que significa que no muestran datos en la aplicación móvil. Esto incluye el mapa de topología, el widget de lista (todas las fuentes de datos), el widget de mapa de árbol heredado y el widget de resumen de SLO.

## Seguimientos {#monitors}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/monitor_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de seguimientos en iOS que muestra una lista de seguimientos con opciones de búsqueda y filtro.">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_Monitors.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de seguimientos en Android que muestra una lista de seguimientos con opciones de búsqueda y filtro.">}}

{{% /tab %}}
{{< /tabs >}}

En la página de seguimientos, puede visualizar y buscar todos los seguimientos a los que tiene acceso en su organización de Datadog. Puede especificar por nombre de campo y crear consultas de búsqueda específicas basadas en su estrategia de etiquetado. Para obtener más información sobre la búsqueda, consulte la [sección de gestión de búsqueda de seguimientos][6].

Por ejemplo, para filtrar por seguimientos de métricas relacionados con el equipo SRE que reciben alertas, utilice la consulta `"status:Alert type:Metric team:sre"`. Haga clic en las alertas individuales para ver los detalles, los cuales se pueden filtrar por tipo y por hora de alerta. También puede silenciar la alerta. Sus diez búsquedas más recientes se guardan para que tenga un acceso más rápido a consultas anteriores. Además, puede filtrar su lista de seguimientos utilizando vistas guardadas, que aparecen cuando activa la barra de búsqueda. También puede ver y ejecutar pruebas Synthetic al ver sus seguimientos sintéticos.

**Nota**: Para configurar o editar seguimientos, notificaciones o vistas guardadas, debe usar la [aplicación web de Datadog][7]. Todos los seguimientos configurados en la aplicación web son visibles en la aplicación móvil de Datadog. Para obtener más información, consulte [Creación de seguimientos][8].

## Notebooks {#notebooks}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/notebook_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de Notebooks de iOS que muestra una lista de Notebooks con opciones de búsqueda y filtro">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_Notebooks.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de Notebooks de Android que muestra una lista de Notebooks con opciones de búsqueda y filtro">}}

{{% /tab %}}
{{< /tabs >}}

En la página Notebooks, puede ver y buscar todos los Notebooks a los que tiene acceso en su organización de Datadog y filtrarlos por etiquetas. Las etiquetas de notebook le permiten filtrar por favoritos, equipo y tipo. Consulte [etiquetas de notebook][19] para obtener más información.

**Nota**: Para configurar o editar un notebook, debe [iniciar sesión en la aplicación de navegador de Datadog][10]. Para obtener más información, consulte [Notebooks][18].

## Trazas {#traces}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/trace_may_2025.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de trazas de iOS que muestra una lista de trazas con opciones de búsqueda y filtro">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_Traces.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de trazas de Android que muestra una lista de trazas con opciones de búsqueda y filtro">}}

{{% /tab %}}
{{< /tabs >}}

En la página Trazas, puede ver y buscar todas las trazas a las que tiene acceso en su organización de Datadog. Puede restringir la lista mediante vistas guardadas o crear consultas de búsqueda específicas basadas en su estrategia de etiquetado. Para obtener más información sobre la búsqueda, consulte [Sintaxis de consulta de Trace Explorer][16].

Por ejemplo, para filtrar trazas con la etiqueta `#env:prod` o la etiqueta `#test`, use la consulta `"env:prod" OR test`. Haga clic en servicios individuales para expandir los tramos asociados y seleccione tramos para ver información, errores y registros relacionados. También puede abrir traces desde servicios y registros.

**Solo disponible en iOS**: Watchdog Insights señala valores atípicos de latencia y valores atípicos de error. Para obtener más información, consulte [Watchdog Insights][26].


## Logs {#logs}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/iOS_logs_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de registros de iOS que muestra una lista de registros con opciones de búsqueda y filtro">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_Logs.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de registros de Android que muestra una lista de registros con opciones de búsqueda y filtro">}}

{{% /tab %}}
{{< /tabs >}}

En la página de Registros, puede ver y buscar todos los registros o flex logs a los que tiene acceso en su organización de Datadog. Puede restringir la lista mediante vistas guardadas o filtros de consulta. Para obtener más información sobre la búsqueda, consulte [Log Search Syntax][23].

También puede agrupar por patrones de registro y seleccionar diferentes atributos de registro para agrupar o clasificar los resultados. Para obtener más información sobre los patrones de registro, consulte [Grouping Logs Into Patterns][22].

**Nota**: Para activar los flex logs, navegue a la lista de registros y toque en la parte superior derecha para seleccionar habilitar flex logs.

**Solo disponible en iOS**: Watchdog Insights señala anomalías y valores atípicos en los registros. Para obtener más información, consulte [Watchdog Insights for Logs][25].


## Servicios {#services}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/service_may_2025_v2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de servicios de iOS que muestra una lista de servicios con opciones de búsqueda y filtro">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/Android_Services.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de servicios de Android que muestra una lista de servicios con opciones de búsqueda y filtro">}}

{{% /tab %}}
{{< /tabs >}}

En la página de Servicios, puede ver, buscar y filtrar todos los servicios a los que tiene acceso en su cuenta de Datadog desde la aplicación móvil de Datadog para garantizar el estado de su servicio desde cualquier lugar. También puede ver implementaciones recientes, recursos, SLO y seguimientos asociados con ese servicio. Para obtener más información sobre las herramientas de investigación para sus servicios, consulte [manage Catalog][17].

## Bits AI {#bits-ai}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="/mobile/bits_chat_ios_2026.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de chat de Bits AI en la aplicación móvil de Datadog para iOS con una consulta de usuario sobre un servicio">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/bits_chat_android_2026.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de chat de Bits AI en la aplicación móvil de Datadog para Android con una consulta de usuario sobre un servicio">}}

{{% /tab %}}
{{< /tabs >}}

En la página de inicio de Bits AI, puede hacer preguntas sobre su sistema o incidente activo por voz o texto. Bits Chat tiene contexto sobre la documentación pública, la telemetría y la propiedad de Datadog. Para obtener más información, consulte [Bits Chat][27].

### Bits Investigation {#bits-investigation}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/ios_bits_sre.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Resultados de Bits Investigation mostrados en una página de On-Call">}}

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/android_bits_sre.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Resultados de Bits Investigation mostrados en una página de On-Call">}}

{{% /tab %}}
{{< /tabs >}}

Cuando está habilitado, Bits Investigation inicia investigaciones directamente en las páginas de On-Call. Estas investigaciones presentan hallazgos y conclusiones iniciales para ayudar a los respondedores a identificar posibles causas raíz y los siguientes pasos. Para obtener más información, consulte [Bits Investigation][28].

## Pregunta frecuente {#frequently-asked-question}
### ¿Cómo permanezco registrado en la aplicación móvil? {#how-do-i-remain-logged-into-the-mobile-app}
Tras una autenticación exitosa en la aplicación móvil, permanecerá registrado durante 90 días.

**Nota**: Si tiene las notificaciones habilitadas, se enviarán notificaciones proactivas 10 días antes de que expire el token.

### ¿Seguiré recibiendo notificaciones si se cierra mi sesión automáticamente? {#will-i-still-receive-notifications-if-i-am-automatically-signed-out}
Si se cierra su sesión automáticamente durante el período de 90 días del token, aún podrá recibir notificaciones y se le pedirá que inicie sesión nuevamente.

**Nota**: Si cierra sesión manualmente desde la aplicación, dejará de recibir notificaciones.

### ¿Por qué no recibo notificaciones? {#why-am-i-not-receiving-notifications}
Verifique que tenga las notificaciones habilitadas para la aplicación de Datadog en la configuración de aplicaciones de su dispositivo. Si desea asegurarse de que las notificaciones omitan el modo No molestar, verifique que Critical Alerts esté activada.

### ¿Recibiré notificaciones de todas las organizaciones en las que he iniciado sesión? {#will-i-receive-notifications-for-all-organizations-that-i-am-signed-into}
Sí, independientemente de la organización a la que cambie, recibirá notificaciones de todas las organizaciones en las que haya iniciado sesión. Esto incluye las notificaciones push críticas.

### ¿Qué sucede si un usuario está deshabilitado? {#what-happens-if-a-user-is-disabled}
El token de la aplicación móvil no será válido y obligará al usuario a cerrar sesión.

## Solución de problemas {#troubleshooting}

Para obtener ayuda con la solución de problemas, [contacte al soporte de Datadog][13]. También puede enviar un mensaje en el canal [Datadog public Slack][14] [#mobile-app][15].

## Lecturas adicionales {#further-reading}

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
[27]: /es/bits_ai/bits_chat/
[28]: /es/bits_ai/bits_investigation/
[29]: /es/account_management/multi_organization/#custom-sub-domains