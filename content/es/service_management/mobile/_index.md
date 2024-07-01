---
aliases:
- /es/mobile/
further_reading:
- link: /monitors/
  tag: Documentación
  text: Alertar
- link: /dashboards/
  tag: Documentación
  text: Dashboards
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: Blog
  text: Mejora tu prestación de servicios con los widgets de dashboard móviles de
    Datadog
title: Aplicación móvil de Datadog
---

La aplicación móvil de Datadog te permite consultar las alertas de Datadog desde tu dispositivo móvil. Por tanto, cuando recibas una alerta a través de Slack, correo electrónico, PagerDuty o cualquier otra aplicación pager, podrás abrir los dashboards y los gráficos del monitor en tu dispositivo móvil e investigar los problemas desde allí.

## Instalación

Descarga la aplicación desde el [App Store de Apple][1] si tu dispositivo es de iOS o desde [Google Play][2] si es de Android.

### Inicio de sesión

Puedes iniciar sesión utilizando la autenticación estándar, la autenticación de Google o [SAML][3], independientemente de si resides en EE. UU. o en la UE.

#### Habilitar SAML

Para iniciar sesión con SAML, es necesario que configures y autentiques tu proveedor de SAML en Datadog. Si lo que deseas es iniciar sesión con SAML mediante el proveedor de identidades (IdP), dirígete al final de esta sección. Para autenticar SAML:

1. Pulsa el botón “Using Single Sign-On (SAML)?” (¿Quieres usar el inicio de sesión único [SAML]?).
2. Introduce tu correo electrónico de empresa y envíalo.
3. Abre el correo electrónico en tu dispositivo móvil y pulsa el enlace indicado.
4. Introduce las credenciales de SAML de tu organización. Estas te redireccionarán hacia una sesión autenticada en la aplicación móvil de Datadog.

También tienes la opción de autenticarte mediante un código QR o introduciendo las credenciales manualmente, como se describe a continuación.

##### Código QR

1. Primero, inicia sesión en la [página del perfil de tu cuenta de Datadog][4] a través de un navegador y haz clic en el botón **Log in to Mobile App** (Iniciar sesión en la aplicación móvil) de la organización en la que estés conectado actualmente. Acto seguido, se te mostrará un código QR.
    {{< img src="service_management/mobile/link-device.png" alt="Vincular dispositivo móvil" style="width:80%;">}}
2. Utiliza la aplicación de cámara predeterminada de tu teléfono para escanear el código QR y, a continuación, pulsa el enlace sugerido para abrir la aplicación de Datadog. Iniciarás sesión automáticamente.

**Nota**: Si haces clic en el botón **Log in to Mobile App** (Iniciar sesión en la aplicación móvil) de una organización en la que no has iniciado sesión, el UUID de la organización se inserta automáticamente en la pantalla de inicio de sesión. Todavía tienes que proporcionar la autenticación utilizando tu método estándar.

##### Introducción manual

1. Para introducir manualmente el ID de SAML, abre la aplicación móvil de Datadog y pulsa el botón “Using Single Sign-On (SAML)?” (¿Quieres usar el inicio de sesión único [SAML]?).
2. Pulsa el botón “Use another method to login” (Usar otro método para iniciar sesión) e introduce el ID de SAML manualmente.

Si haces clic en **Authorize** (Autorizar) al iniciar sesión, vincularás el dispositivo móvil que estés usando en ese momento con tu cuenta. Por motivos de seguridad, tendrás que repetir este procedimiento una vez al mes.

##### Inicio de sesión con SAML mediante IdP

Si sigues teniendo problemas al iniciar sesión con SAML, tu proveedor de identidades puede forzar el inicio de sesión. Para más información acerca de cómo habilitar SAML mediante IdP, consulta nuestra página de [SAML mediante IdP][5].

## Monitores

{{< img src="service_management/mobile/monitors_doc2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página del monitor">}}

En la página de Monitors (Monitores), puedes consultar y buscar todos los monitores a los que tienes acceso en tu organización de Datadog. Puedes especificar el nombre del campo y realizar consultas de búsqueda definidas en función de tu estrategia de etiquetado. Para más información sobre las búsquedas, consulta la [sección Gestionar la búsqueda de monitores][6].

Por ejemplo, para filtrar los monitores de métricas relacionados con el equipo de ingeniería de fiabilidad del sitio que recibe las alertas (también conocido bajo las siglas SRE), usa la consulta `"status:Alert type:Metric team:sre"`. Haz clic en las alertas para ver los detalles concretos de cada una de ellas, las cuales se pueden filtrar según el tipo y hora de alerta; también puedes silenciar las alertas que quieras, si así lo deseas. Se guardarán tus diez últimas búsquedas para que puedas acceder más rápido a las consultas ya realizadas. Asimismo, puedes filtrar tu lista de monitores utilizando las vistas guardadas, a las que podrás acceder tan pronto como actives la barra de búsqueda. Por último, consulta y ejecuta los tests sintéticos cuando veas los monitores sintéticos.

**Nota:** Para configurar o editar los monitores, notificaciones o vistas guardadas, tienes que utilizar la [aplicación web de Datadog][7]. Todos los monitores que se configuren en la aplicación web serán visibles también en la aplicación móvil. Para más información, consulta [Crear monitores][8].

## Dashboards

{{< img src="service_management/mobile/dashboards_doc.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Página de dashboard">}}

En la página de Dashboards, puedes consultar y buscar todos los dashboards a los que tienes acceso en tu organización de Datadog y filtrarlos con las mismas variables de plantilla que hayas configurado en la aplicación web de Datadog. Filtra tus dashboards rápidamente usando las vistas guardadas de las variables de plantilla. Para más información sobre estas últimas, consulta [Vistas guardadas de los dashboards][9]. Haz clic en el dashboard que quieras para consultarlo.

**Nota:** Para configurar o editar un dashboard, tienes que [iniciar sesión en la aplicación de navegador de Datadog][10]. Para más información, consulta [Dashboards][11].

## Incidencias

{{< img src="service_management/mobile/incidents.png" alt="Página de incidencias" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

En la página Incidents (Incidencias), puedes consultar, buscar y filtrar todas las incidencias a las que tienes acceso en tu cuenta de Datadog con la aplicación móvil de Datadog para que puedan solucionarse rápidamente estés donde estés. También puedes notificar y editar incidencias y comunicarte fácilmente con tus equipos a través de las integraciones con Slack, Zoom y muchas otras herramientas. Para obtener más información sobre las incidencias, consulta la [documentación acerca de la gestión de incidencias de Datadog][12].

### Crear una incidencia

1. Haz clic en la pestaña Incidents (Incidencias), situada en la barra de la parte inferior, para ir a la lista de incidencias.
2. Haz clic en el botón “+” de la esquina superior derecha.
3. Establece el título, la gravedad y el encargado.

### Recibir notificaciones push de incidencias

1. Ve a **Account** (Cuenta).
2. Haz clic en **Notifications** (Notificaciones).
3. Activa la opción **Enable Notifications** (Habilitar notificaciones). (**Nota**: En el caso de los dispositivos de Android, las notificaciones se activarán automáticamente cuando instales la versión más reciente de la aplicación móvil de Datadog).
4. A continuación, abre la aplicación web de Datadog y dirígete a [Reglas para la notificación de incidencias][13].
5. Crea o edita una regla de notificación y escribe tu nombre en el apartado **Notify** (Notificar). Una vez hecho esto, deberían aparecer dos opciones que te permitirán elegir si prefieres recibir las notificaciones por correo electrónico o directamente en tu dispositivo móvil.
6. Selecciona el dispositivo móvil y haz clic en **Save** (Guardar).

Para más información sobre cómo configurar las reglas para la notificación de incidencias, consulta la [documentación correspondiente a los parámetros de las incidencias][14].

## Widgets

### Abrir el widget de incidencias

{{< img src="service_management/mobile/incident_widget.png" alt="Widget móvil de incidencias de Datadog que se muestra en los dispositivos Android e iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Los widgets de Datadog te permiten consultar las [incidencias que tienes abiertas][12] desde la pantalla de inicio de tu dispositivo móvil.

Para ver los problemas de una forma más detallada, pulsa sobre cualquiera de las incidencias mostradas en el widget. Esta se abrirá en la aplicación móvil de Datadog, lo que te permitirá acceder a más información.

También puedes personalizar tus widgets de incidencias abiertas aplicando los siguientes filtros:

- Organización
- Niveles de gravedad
- Clientes afectados
- Orden

#### Crear un widget de incidencias abiertas

{{< tabs >}}
{{% tab "iOS" %}}

1. Pulsa el botón **+** en la esquina superior izquierda de la pantalla.
2. Busca los widgets de “Datadog”.
3. Selecciona el tamaño que prefieras (pequeño, mediano o grande).
4. Arrastra el widget para colocarlo en la localización que prefieras de la pantalla.


{{% /tab %}}
{{% tab "Android" %}}

1. Mantén pulsada tu pantalla de inicio durante un rato.
2. Pulsa el botón **Widgets** que aparece en el editor de tu pantalla de inicio. Si tienes accesos directos a aplicaciones, es posible que solo veas un icono en la esquina superior derecha de la burbuja.
3. Arrastra el widget para colocarlo en la pantalla de inicio que prefieras.
4. Elige el tamaño del widget que prefieras.


{{% /tab %}}
{{< /tabs >}}

#### Editar un widget de incidencias abiertas

{{< tabs >}}
{{% tab "iOS" %}}

1. Mantén pulsado el widget durante un rato para configurarlo.
2. Pulsa **Edit Widget** (Editar widget).
2. Pulsa **Choose** (Elegir), junto a la etiqueta **Organization** (Organización), para recuperar las incidencias abiertas de la organización seleccionada.
3. Pulsa **SEV-1 and SEV-2**, junto a la etiqueta Severities (Gravedad), para definir los filtros de gravedad.
4. Pulsa **Both** (Ambos), junto a la etiqueta **Customer Impacted** (Clientes afectados), para filtrar las incidencias abiertas que han causado problemas a clientes.
5. Escribe en el cuadro de texto **Type additional filters** (Introduce filtros adicionales)* para indicar cualquier otro filtro.
6. Pulsa **Ordering** (Orden) para definir el orden en el que quieres que se muestren las incidencias.
7. Pulsa en cualquier lugar fuera del widget para guardar tus preferencias y salir de la pantalla de configuración.


{{% /tab %}}
{{% tab "Android" %}}

1. Pulsa sobre el título del widget para configurarlo.
2. Pulsa **Organization** (Organización) para recuperar las incidencias abiertas de la organización seleccionada.
3. Pulsa **Severities** (Gravedad) para definir los filtros de gravedad.
4. Pulsa **Customer impacted** (Clientes afectados) para filtrar las incidencias abiertas que han causado problemas a clientes.
5. Pulsa **Query** (Consulta) para indicar cualquier otro filtro.
6. Pulsa **Sorted by** (Ordenado por) para definir el orden en el que quieres que se muestren las incidencias.
7. Pulsa **Save** (Guardar) o **Apply** (Aplicar) para guardar tus preferencias y salir de la pantalla de configuración.
8. Mantén pulsado el widget durante un rato para elegir el tamaño que prefieras.


{{% /tab %}}
{{< /tabs >}}

#### Mostrar incidencias abiertas de varias organizaciones

Puedes mostrar las incidencias abiertas de varias organizaciones en la pantalla de inicio de tu dispositivo móvil.

{{< tabs >}}
{{% tab "iOS" %}}
- Pulsa **Choose** (Elegir), junto a la etiqueta Organization (Organización), para recuperar las incidencias abiertas de la organización seleccionada.



{{% /tab %}}
{{% tab "Android" %}}

1. Pulsa sobre el título del widget para configurarlo.
2. En la pantalla de configuración, pulsa **Organization** (Organización).
3. Selecciona una nueva organización (es posible que tengas que iniciar sesión).
4. Elige el tamaño del widget que prefieras.
5. Pulsa **Save** (Guardar) o **Apply** (Aplicar).


{{% /tab %}}
{{< /tabs >}}

#### Eliminar un widget de incidencias abiertas

{{< tabs >}}
{{% tab "iOS" %}}

Para eliminar un widget, pulsa el botón **-**, situado en la parte superior izquierda del widget, cuando edites tu pantalla de inicio, o bien mantén pulsado el widget durante un rato y selecciona **Remove Widget** (Eliminar widget).


{{% /tab %}}
{{% tab "Android" %}}

Para eliminar un widget, mantenlo pulsado durante un rato, arrástralo y suéltalo encima del botón **Remove** (Eliminar).


{{% /tab %}}
{{< /tabs >}}

### Widget de SLOs

{{< img src="service_management/mobile/slo_widget.png" alt="Widgets de SLO de tiempo de aplicación que se muestra en dispositivos Android e iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Consulta tus [SLOs][15] desde la pantalla de inicio de tu dispositivo móvil gracias a los widgets de Datadog. Puedes añadir cualquier SLO de tu organización en forma de widget y con un intervalo de tiempo.

Intervalos de tiempo disponibles:
- 7 días
- 30 días
- 90 días
- La semana pasada
- El mes pasado
- Última semana
- Último mes

También puedes especificar que un dashboard se abra de forma predeterminada cada vez que pulses un widget de SLOs. De este modo, podrás investigar tus métricas rápida y detalladamente.

**Nota**: Si pulsas un widget de SLOs sin haber configurado antes la apertura predeterminada de un dashboard, se abrirá la aplicación de Datadog.

#### Crear un widget de SLOs

{{< tabs >}}
{{% tab "iOS" %}}

- Mantén pulsada tu pantalla de inicio durante un rato.
- Pulsa el botón “+” de la esquina superior izquierda de la pantalla.
- Busca los widgets de “Datadog”.
- Selecciona el tamaño que prefieras (pequeño muestra un SLO y mediano muestra un SLO junto con un marco temporal visualizado de su estado).
- Arrastra el widget para colocarlo en la localización que prefieras de la pantalla.


{{% /tab %}}
{{% tab "Android" %}}

- Mantén pulsada tu pantalla de inicio durante un rato.
- Pulsa el botón “Widgets” que aparece en el editor de tu pantalla de inicio. Si tienes accesos directos a aplicaciones, es posible que solo veas un icono en la esquina superior derecha de la burbuja.
- Arrastra el widget para colocarlo en la pantalla de inicio que prefieras.
- Elige el tamaño del widget que prefieras. Solo se mostrará un SLO, independientemente de tu elección. Si eliges un tamaño con el que el widget se ajuste al ancho de la pantalla de inicio de tu dispositivo móvil, se mostrará el SLO seleccionado y la representación temporal de su estado.


{{% /tab %}}
{{< /tabs >}}

#### Editar un widget de SLOs

{{< tabs >}}
{{% tab "iOS" %}}

- Mantén pulsado el widget durante un rato para configurarlo.
- Pulsa “Edit Widget” (Editar widget).
- Pulsa “Choose” (Elegir), junto a la etiqueta SLO, para seleccionar el SLO que quieres consultar.
- Según el SLO que elijas, es posible que aparezca la etiqueta “Timeframe” (Intervalo de tiempo). Pulsa “Choose” (Elegir), junto a la etiqueta “Timeframe”, para seleccionar el intervalo de tiempo del SLO.
- Pulsa “Choose” (Elegir), junto a la etiqueta “Dashboard to open” (Dashboard que se abrirá), para seleccionar el dashboard que quieres que se abra al pulsar el widget de SLOs.
- Pulsa en cualquier lugar fuera del widget para validar tus preferencias y salir de la pantalla de configuración.


{{% /tab %}}
{{% tab "Android" %}}

- Pulsa sobre el título del widget para configurarlo.
- Pulsa “Selected SLO” (SLO seleccionado) para seleccionar el SLO que quieres consultar.
- Pulsa “Selected Time Window” (Ventana de tiempo seleccionada) para seleccionar el intervalo de tiempo del SLO.
- Pulsa “Dashboard to open” (Dashboard que se abrirá) para seleccionar el dashboard que quieres que se abra al pulsar el widget de SLOs.
- Pulsa “Save” (Guardar) o “Apply” (Aplicar) para validar tus preferencias y salir de la pantalla de configuración.
- Mantén pulsado el widget durante un rato para elegir el tamaño que prefieras.


{{% /tab %}}
{{< /tabs >}}

#### Mostrar SLOs de varias organizaciones

Puedes mostrar los SLOs de varias organizaciones en la pantalla de inicio de tu dispositivo móvil.

{{< tabs >}}
{{% tab "iOS" %}}

La pantalla de configuración mostrará todas las organizaciones en las que has iniciado sesión. Si no encuentras la tuya, vuelve a iniciar sesión en ella.


{{% /tab %}}
{{% tab "Android" %}}

- Pulsa sobre el título del widget para configurarlo.
- En la pantalla de configuración, pulsa “Organization” (Organización).
- Selecciona una nueva organización (quizá tengas que iniciar sesión).
- Elige el tamaño del widget que prefieras.
- Pulsa “Save” (Guardar) o “Apply” (Aplicar).


{{% /tab %}}
{{< /tabs >}}

#### Eliminar un widget de SLOs

{{< tabs >}}
{{% tab "iOS" %}}

Para eliminar un widget, pulsa el botón “-”, situado en la parte superior izquierda del widget, cuando edites tu pantalla de inicio, o bien mantén pulsado el widget durante un rato y selecciona “Remove Widget” (Eliminar widget).


{{% /tab %}}
{{% tab "Android" %}}

Para eliminar un widget, mantenlo pulsado durante un rato, arrástralo y suéltalo encima del botón “Remove” (Eliminar).


{{% /tab %}}
{{< /tabs >}}

### Widget de monitores

{{< img src="service_management/mobile/monitor_widget.png" alt="Widgets de monitor configurado que se muestra en pantallas de Android e iOS" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

Consulta tus [monitores][16] desde tu pantalla de inicio gracias a los widgets de Datadog. Pulsa en cualquier celda para abrir la pantalla **Monitor Search** (Búsqueda de monitores) en la aplicación con los datos de los monitores ya rellenados.

**Nota**: Si no tienes vistas guardadas de ningún monitor, el widget te mostrará todos los monitores de forma predeterminada.

#### Crear un widget de monitores

{{< tabs >}}
{{% tab "iOS" %}}

- Mantén pulsada la pantalla de inicio durante un rato.
- Pulsa el botón “+” de la esquina superior izquierda de la pantalla.
- Busca los widgets de “Datadog”.
- Selecciona el tamaño que prefieras (el pequeño muestra dos vistas guardadas del monitor; el mediano puede mostrar hasta tres; el grande, hasta seis).
- Arrastra el widget para colocarlo en la localización que prefieras de la pantalla.


{{% /tab %}}
{{% tab "Android" %}}

- Mantén pulsada tu pantalla de inicio durante un rato.
- Pulsa “Widgets” en el editor de tu pantalla de inicio. Si tienes accesos directos a aplicaciones, es posible que solo veas un icono en la esquina superior derecha de la burbuja.
- Arrastra el widget para colocarlo en la pantalla de inicio que prefieras.
- Elige el tamaño del widget que prefieras. Para mostrar más vistas guardadas, aumenta la longitud del widget en la pantalla de inicio de tu dispositivo móvil.


{{% /tab %}}
{{< /tabs >}}

#### Editar un widget de monitores

{{< tabs >}}
{{% tab "iOS" %}}

- Mantén pulsado el widget durante un rato para configurarlo.
- Pulsa “Edit Widget” (Editar widget).
- Pulsa la celda de una vista guardada para seleccionarla o anular la selección.
- Arrastra y suelta las celdas para reorganizar las vistas.
- Pulsa en cualquier lugar fuera del widget para validar tus preferencias y salir de la pantalla de configuración.


{{% /tab %}}
{{% tab "Android" %}}

- Pulsa sobre el título del widget para configurarlo.
- Pulsa “Saved Views” (Vistas guardadas).
- Pulsa la celda de una vista guardada para seleccionarla o anular la selección.
- Arrastra y suelta las celdas para reorganizar las vistas.
- Pulsa “Save” (Guardar) o “Apply” (Aplicar) para validar tus preferencias y salir de la pantalla de configuración.
- Desplázate por el widget para ver más vistas guardadas. Mantén pulsado el widget durante un rato y elige el tamaño que prefieras.


{{% /tab %}}
{{< /tabs >}}

#### Mostrar monitores de varias organizaciones

Puedes mostrar los monitores de varias organizaciones en el mismo widget.

{{< tabs >}}
{{% tab "iOS" %}}

La pantalla de configuración mostrará todas las organizaciones en las que has iniciado sesión. Si no encuentras la tuya, puede que tengas que volver a iniciar sesión.


{{% /tab %}}
{{% tab "Android" %}}

- Pulsa sobre el título del widget para configurarlo.
- En la pantalla de configuración, pulsa “Organization” (Organización).
- Selecciona una nueva organización (quizá tengas que iniciar sesión).
- Edita el widget para usar el tamaño que prefieras.
- Pulsa “Save” (Guardar) o “Apply” (Aplicar).


{{% /tab %}}
{{< /tabs >}}

#### Eliminar un widget de monitores

{{< tabs >}}
{{% tab "iOS" %}}

Para eliminar un widget, pulsa el botón “-”, situado en la parte superior izquierda del widget, cuando edites tu pantalla de inicio, o bien mantén pulsado el widget durante un rato y, luego, selecciona “Remove Widget” (Eliminar widget).


{{% /tab %}}
{{% tab "Android" %}}

Para eliminar un widget, mantenlo pulsado durante un rato, arrástralo y suéltalo encima del botón “Remove” (Eliminar).


{{% /tab %}}
{{< /tabs >}}

## Acciones rápidas

{{< img src="service_management/mobile/shortcut_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Acciones rápidas">}}

Mantén pulsado el icono de la aplicación durante un rato para que aparezca una ficha de acciones rápidas. Si utilizas iOS, verás los cinco dashboards que encabezan [Frequently Viewed By Me (Mis consultas frecuentes)][17] (donde se tiene en cuenta tanto el número de consultas como la proximidad temporal); si utilizas Android, verás los cinco dashboards que más veces has abierto con tu dispositivo móvil. Pulsa uno de los resultados para abrir ese dashboard en la aplicación.

## Buscar desde la pantalla de inicio

{{< img src="service_management/mobile/iphone_search_doc.png" alt="Buscar página de inicio" style="width:40%;">}}

**Solo para iOS**: dirígete al apartado de búsqueda del iPhone para filtrar y buscar por nombre el dashboard que te interese. Pulsa sobre cualquier resultado para abrir la vista de ese dashboard directamente en la aplicación móvil, o bien pulsa el botón “Search in App” (Buscar en la aplicación) para abrir la consulta de búsqueda en la página de Dashboard List (Lista de dashboards) de la aplicación.

## Atajos y sugerencias de Siri

**Android**: crea iconos de acceso directo para tus dashboards tocando y manteniendo pulsado el icono de la aplicación de Datadog y, a continuación, levantando el dedo. Si la app tiene accesos directos, muestra una lista. Mantén pulsado el acceso directo deseado y, a continuación, arrástralo y suéltalo en otra localización de la pantalla para crear un icono de acceso directo único.

**iOS**: crea atajos de Siri para acceder a dashboards y monitores de Datadog mediante la aplicación de Atajos. Para poder crear un atajo, primero debes realizar la acción que te interese al menos una vez en la aplicación. Por ejemplo, si quieres crear un atajo que responda a la acción "Open AWS Overview Dashboard" (Abrir el dashboard de información general de AWS), abre primero el dashboard de información general de AWS en tu aplicación móvil al menos una vez.

Con el atajo, puedes acceder a tus dashboards y monitores realizando tres acciones clave:

- Ancla el atajo como si fuese un icono en tu pantalla de inicio. Para ello, ve a la aplicación Atajos y abre el menú de edición del atajo de tu dashboard.
- Voz de Siri: di el nombre del atajo, por ejemplo, "Open AWS Overview" (Abrir la información general de AWS) y Siri abrirá el dashboard en la aplicación.
- Sugerencias de Siri: Siri asimila tu rutina y te sugiere la creación de atajos a tus dashboards cuando más los necesitas. Puedes hacerlo mediante un banner visible en tu pantalla de inicio o de bloqueo, a través del apartado de búsqueda del iPhone o con los widgets de sugerencias de Siri de iOS 14.

{{< img src="service_management/mobile/siri_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Atajos">}}

Para obtener más información sobre los atajos y las sugerencias de Siri, lee la [documentación de Apple acerca de Siri][18].

## Handoff

**Solo para iOS**: usa Handoff de Apple para continuar tus tareas en cualquier dispositivo de Apple. Cuando lo hagas, verás el icono de la aplicación móvil de Datadog en tu Mac, en el lado izquierdo del Dock. Haz clic en ese icono para abrir tu dashboard o monitor actual en el Mac.

Para que Handoff funcione, el dispositivo debe:

- Haber iniciado sesión en iCloud con el mismo identificador de Apple
- Tener el Bluetooth activado
- Tener el wifi activado
- Tener Handoff activado

Para obtener más información sobre Handoff, lee la [documentación de Apple acerca de Handoff][19].

## Cuenta

Cambia de organización o cierra sesión desde la página de Account (Cuenta).

## Solucionar problemas

Si necesitas ayuda para solucionar problemas, [contacta con el equipo de soporte de Datadog][20]. Si lo prefieres, también puedes enviar un mensaje en el canal [de Slack público de Datadog][21] [#mobile-app][22].

### Leer más

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app
[3]: /es/account_management/saml/#pagetitle
[4]: https://app.datadoghq.com/account/profile
[5]: /es/account_management/saml/mobile-idp-login/
[6]: /es/monitors/manage/#search
[7]: https://app.datadoghq.com/monitors
[8]: /es/monitors/types
[9]: /es/dashboards/template_variables/#saved-views
[10]: https://app.datadoghq.com/dashboard/lists
[11]: /es/dashboards/
[12]: /es/monitors/incident_management
[13]: https://app.datadoghq.com/incidents/settings#Rules
[14]: /es/service_management/incident_management/incident_settings/#rules
[15]: /es/dashboards/widgets/slo/#setup
[16]: /es/logs/explorer/saved_views/
[17]: https://app.datadoghq.com/dashboard/lists/preset/5
[18]: https://support.apple.com/en-us/HT209055
[19]: https://support.apple.com/en-us/HT209455
[20]: /es/help/
[21]: https://chat.datadoghq.com/
[22]: https://datadoghq.slack.com/archives/C0114D5EHNG