---
aliases:
- /es/synthetics/browser_check
- /es/synthetics/browser_test
description: Simule y haga un seguimiento de los recorridos de los usuarios desde
  ubicaciones específicas.
further_reading:
- link: /getting_started/synthetics/browser_test
  tag: Documentación
  text: Primeros pasos con pruebas de navegador
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Obtenga información sobre los monitores de prueba Synthetic
- link: /synthetics/guide/version_history/
  tag: Guía
  text: Historial de versiones de Synthetic Monitoring
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centro de aprendizaje
  text: 'Centro de aprendizaje de Datadog: Introducción a Synthetic Browser Testing'
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Mejores prácticas para crear pruebas de extremo a extremo
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: Blog
  text: Simplificación de la resolución de problemas a lo largo del recorrido del
    usuario con Datadog Synthetic Monitoring.
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Cómo ayudé a mi cliente a escalar sus pruebas de navegador con Datadog.
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Sitio externo
  text: Cree y gestione pruebas de navegador Synthetic con Terraform
title: Prueba de navegador
---
## Descripción general {#overview}

Las pruebas de navegador son escenarios ejecutados por Datadog en sus aplicaciones web. Se ejecutan en intervalos periódicos configurables desde múltiples ubicaciones alrededor del mundo, desde múltiples navegadores y dispositivos. Estas pruebas verifican tanto que sus aplicaciones estén activas y respondan a las solicitudes, como que se cumplan las condiciones definidas en sus escenarios.

<div class="alert alert-info">Si le interesa probar aplicaciones que se encuentran detrás de MFA, lea <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">la guía dedicada </a> y <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">envíe sus comentarios</a> al equipo de Synthetic Monitoring para ayudar a mejorar los sistemas que son más importantes para sus equipos.</div>

## Configuración de prueba {#test-configuration}

Puede crear una prueba utilizando una de las siguientes opciones:

### Crear una prueba a partir de una plantilla {#create-a-test-from-a-template}

  1. Pase el cursor sobre una de las plantillas precargadas y haga clic en {{< ui >}}View Template{{< /ui >}}. Esto abre un panel lateral que muestra información de configuración precargada, incluyendo: {{< ui >}}Test Details{{< /ui >}}, {{< ui >}}Alert Conditions{{< /ui >}}, {{< ui >}}Steps{{< /ui >}} y, opcionalmente, {{< ui >}}Variables{{< /ui >}}.
  2. Haga clic en {{< ui >}}+Create Test{{< /ui >}} para abrir la página de configuración, donde puede revisar y editar las opciones de configuración prellenadas. Los campos presentados son idénticos a los disponibles al crear una prueba desde cero.
  3. Haga clic en {{< ui >}}Save & Quit{{< /ui >}} en la esquina superior derecha para enviar su prueba de navegador.<br /><br>
       {{< img src="/synthetics/browser_tests/synthetics_templates_browser.mp4" alt="Video de la página de inicio de la prueba de navegador de Synthetics con plantillas" video="true" >}}

### Cree una prueba desde cero {#build-a-test-from-scratch}

  1. Haga clic en la plantilla {{< ui >}}+{{< /ui >}} para iniciar una nueva prueba de navegador desde cero.
  1. Ingrese una {{< ui >}}Starting URL{{< /ui >}}: La URL desde la cual su prueba de navegador inicia el escenario.
  1. Agregue un {{< ui >}}name{{< /ui >}}: El nombre de su prueba de navegador.
  1. Seleccione {{< ui >}}environment and additional tags{{< /ui >}}: Establezca la `env` y las etiquetas relacionadas adjuntas a su prueba de navegador. Utilice el formato `<KEY>:<VALUE>` para filtrar por una `<VALUE>` para una `<KEY>` determinada.

  <div class="alert alert-info">Consulte <a href=#advanced-options>Opciones avanzadas</a> para ver más opciones.</div>

  5. Seleccione {{< ui >}}browsers and devices{{< /ui >}}: Los navegadores (como `Chrome`, `Firefox` y `Edge`) y los dispositivos (como `Laptop Large`, `Tablet` y `Mobile Small`) para ejecutar su prueba.

      - Para un dispositivo de laptop grande, las dimensiones son 1440 píxeles x 1100 píxeles.
      - Para un dispositivo de tableta, las dimensiones son 768 píxeles x 1020 píxeles.
      - Para un dispositivo móvil pequeño, las dimensiones son 320 píxeles x 550 píxeles.

  6. Seleccione {{< ui >}}managed and private locations{{< /ui >}}: Seleccione de una lista de [ubicaciones](#locations) alrededor del mundo que son administradas por Datadog, o cree [ubicaciones privadas][1] para ejecutar su prueba de navegador desde ubicaciones personalizadas o dentro de redes privadas.

     **Nota**: También puede utilizar el [Continuous Testing Tunnel][2] para activar pruebas en su configuración de desarrollo local o en su canalización de CI/CD para probar entornos internos.

  7. Establezca la {{< ui >}}test frequency{{< /ui >}}: Los intervalos varían desde cada un minuto hasta una vez por semana.
  8. Haga clic en {{< ui >}}Save & Edit Recording{{< /ui >}} para enviar su prueba de navegador.

### Ubicaciones {#locations}

{{% managed-locations %}}

### Fragmentos {#snippets}

Al configurar una nueva prueba de navegador de Synthetic Monitoring, utilice fragmentos para completar automáticamente sus dispositivos y regiones, en lugar de seleccionar estas opciones manualmente. Los siguientes fragmentos están disponibles:

* {{< ui >}}Screen sizes{{< /ui >}}: Realice automáticamente sus pruebas de navegador en una pantalla de tamaño específico en todos los navegadores:
   * {{< ui >}}Large{{< /ui >}}
   * {{< ui >}}Tablet{{< /ui >}}
   * {{< ui >}}Mobile{{< /ui >}}

* {{< ui >}}Multi-region check{{< /ui >}}: Pruebe automáticamente su sitio web en una ubicación en cada una de las tres regiones geográficas principales (AMER, APAC y EMEA).
</br><br>

  {{< img src="synthetics/browser_tests/browser_snippets_2.png" alt="Captura de pantalla del lado izquierdo de la creación de una prueba de navegador, que muestra los ejemplos de fragmentos" width="70%" >}}

### Opciones avanzadas {#advanced-options}

{{< tabs >}}

   {{% tab "Opciones de solicitud" %}}

   * {{< ui >}}Disable CORS{{< /ui >}}: Seleccione para evitar que la política de intercambio de recursos de origen cruzado (CORS) bloquee su prueba.
   * {{< ui >}}Disable CSP{{< /ui >}}: Seleccione para evitar que la política de seguridad de contenido (CSP) bloquee su prueba.
   * {{< ui >}}Capture HTTP payloads{{< /ui >}}: Seleccione para recopilar encabezados y cuerpos de solicitud y respuesta para recursos Fetch y XHR en cada paso de la prueba. Después de habilitar esta opción, haga clic en cualquier fila de recursos Fetch o XHR en la [{{< ui >}}Resources{{< /ui >}} pestaña][3] de los resultados de su prueba para ver los encabezados y el cuerpo de la solicitud y la respuesta.
   * {{< ui >}}Request Headers{{< /ui >}}: Defina los encabezados en los campos {{< ui >}}Name{{< /ui >}} y {{< ui >}}Value{{< /ui >}} para agregar o anular los encabezados predeterminados del navegador. Por ejemplo, puede configurar el Agente de usuario en el encabezado para [identificar scripts de Datadog][1].
   * {{< ui >}}Cookies{{< /ui >}}: Defina las cookies para agregar a las cookies predeterminadas del navegador. Ingrese una cookie por línea, utilizando la sintaxis de [`Set-Cookie`][2].
   * {{< ui >}}HTTP Authentication{{< /ui >}}: Autentíquese mediante HTTP Basic, Digest o NTLM con un nombre de usuario y una contraseña. Sus credenciales se utilizan en cada paso de su prueba de navegador. **Nota**: La autenticación mediante HTTP Basic se puede utilizar para sitios web que solicitan credenciales de usuario a través de un aviso del sistema del navegador.

   Las opciones de solicitud se establecen en cada ejecución de prueba y se aplican a cada paso de su prueba de navegador en el momento de la ejecución, no en el momento de la grabación. Si necesita que estas opciones permanezcan activas para grabar los siguientes pasos, aplique manualmente las opciones en la página desde la que está grabando y cree los pasos subsiguientes en su prueba.


[1]: /es/synthetics/guide/identify_synthetics_bots/?tab=apitests
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
[3]: /es/synthetics/browser_tests/test_results#resources
   {{% /tab %}}

   {{% tab "Certificado" %}}

   Seleccione {{< ui >}}Ignore server certificate error{{< /ui >}} para indicar a la prueba que omita los errores en el certificado del servidor.

   * {{< ui >}}Client Certificate{{< /ui >}}: Realice pruebas en sistemas que requieran certificados de cliente haciendo clic en {{< ui >}}Upload File{{< /ui >}} y cargando su archivo de certificado y clave privada. Solo se aceptan certificados PEM.
   * {{< ui >}}Client Certificate Domains{{< /ui >}}: Una vez cargados los archivos de certificado, el certificado de cliente se aplica al dominio de la URL inicial. Para aplicar el certificado de cliente en otro dominio, especifique el dominio en el campo {{< ui >}}Value{{< /ui >}}.

   Puede incluir comodines en la URL.

   {{% /tab %}}

   {{% tab "Proxy" %}}

   Ingrese una URL para un proxy a través del cual desee enviar solicitudes en el campo {{< ui >}}Proxy URL{{< /ui >}} como `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`.

   Puede incluir [variables globales](#use-global-variables) en la URL.

   {{% /tab %}}

   {{% tab "Privacidad" %}}

   Seleccione {{< ui >}}Do not capture any screenshots for this test{{< /ui >}} para evitar que se tomen capturas de pantalla en los pasos de su prueba.

   Esta opción de privacidad está disponible como una [opción avanzada][1] a nivel de paso de prueba individual y garantiza que no aparezcan datos confidenciales en los resultados de sus pruebas. Evitar que la prueba tome capturas de pantalla dificulta la resolución de errores. Para obtener más información, consulte [Seguridad de datos][2].

[1]: /es/synthetics/browser_tests/advanced_options#prevent-screenshot-capture
[2]: /es/data_security/synthetics
   {{% /tab %}}

   {{% tab "URL inicial" %}}

   Ingrese una cantidad de tiempo en segundos para que la prueba espere antes de declarar el paso de prueba inicial como fallido.

   {{% /tab %}}

   {{% tab "Hora e idioma" %}}

  De forma predeterminada, la zona horaria está configurada en UTC y el idioma está configurado en inglés (en). Para definir un idioma, utilice el [código ISO][1] de 2 o 3 dígitos correspondiente.

[1]: https://www.loc.gov/standards/iso639-2/php/code_list.php

   {{% /tab %}}

   {{% tab "Solicitudes bloqueadas" %}}

   Ingrese uno o más patrones de solicitud para bloquear su carga mientras se ejecuta la prueba. Ingrese un patrón de solicitud por línea utilizando el [formato de patrón de coincidencia][1]. Se admiten comodines (por ejemplo, `*://*.example.com/*`).

   Las solicitudes bloqueadas se omiten durante la ejecución de la prueba, pero no afectan la representación de la página al [grabar pasos](/synthetics/browser_tests/test_steps). Visualice las solicitudes bloqueadas en la pestaña [{{< ui >}}Resources{{< /ui >}}](/synthetics/browser_tests/test_results#resources) de las ejecuciones de prueba. Las solicitudes bloqueadas tienen un estado de `blocked`.

[1]: https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns

   {{% /tab %}}

   {{< /tabs >}}

{{% synthetics-variables %}}

### Usar variables globales {#use-global-variables}

Puede usar las [variables globales definidas en {{< ui >}}Settings{{< /ui >}}][4] en el {{< ui >}}Starting URL{{< /ui >}} y {{< ui >}}Advanced Options{{< /ui >}} de los detalles de su prueba de navegador, así como en la grabación de su prueba.

Para mostrar una lista de las variables disponibles:

- En los detalles de su prueba de navegador: Escriba `{{` en el campo deseado.

  {{< img src="synthetics/browser_tests/use_global_variables_1.mp4" alt="Definición de una variable local a partir de variables globales" video="true" width="90%" >}}

- En la grabadora de su prueba de navegador: Importe la variable en su prueba, luego escriba `{{` en el campo deseado o inyecte la variable en su aplicación para usarla.

  {{< img src="synthetics/browser_tests/use_global_variables_2.mp4" alt="Inyección de una variable local en un campo durante una grabación de navegador" video="true" width="90%" >}}

Para obtener más información sobre el uso de variables en la grabación de su prueba de navegador, consulte [Pasos de prueba de navegador][5].

### Defina las condiciones de alerta {#define-alert-conditions}

Puede personalizar las condiciones de alerta para definir las circunstancias bajo las cuales desea que una prueba envíe una alerta de notificación.

{{< img src="synthetics/browser_tests/alerting_rules_2.png" alt="Regla de Alerting de prueba de navegador" style="width:80%" >}}

#### Regla de Alerting {#alerting-rule}

Se activa una alerta si alguna aserción falla durante `X` minutos desde cualquiera `n` de `N` ubicaciones. Esta regla de Alerting le permite especificar durante cuánto tiempo y en cuántas ubicaciones debe fallar una prueba antes de activar la notificación.

Una alerta se activa solo si estas dos condiciones son verdaderas:

- Al menos una ubicación estuvo en falla (al menos una aserción falló) durante los últimos X minutos;
- En un momento durante los últimos X minutos, al menos `N` ubicaciones estuvieron en falla.

En caso de falla, vuelva a intentar `X` veces antes de que la ubicación se marque como fallida. Esto le permite definir cuántas fallas consecutivas de prueba deben ocurrir para que una ubicación sea considerada como fallida. De forma predeterminada, hay una espera de `300ms` antes de reintentar una prueba que falló. Este intervalo se puede configurar con la [API][6].

#### Reintento rápido {#fast-retry}

Cuando una prueba falla, el reintento rápido le permite reintentar la prueba X veces después de Y ms antes de marcarla como fallida. Personalizar el intervalo de reintento ayuda a reducir los falsos positivos y mejora la precisión de sus alertas.

Dado que el tiempo de actividad de la ubicación se calcula en función del resultado final de la prueba después de que se completan los reintentos, los intervalos de reintento rápido afectan directamente lo que aparece en su gráfico de tiempo de actividad total. El tiempo de actividad total se calcula en función de las condiciones de alerta configuradas, y las notificaciones se envían según el tiempo de actividad total.

<div class="alert alert-info">
Para obtener más información sobre cómo las notificaciones de Synthetic Monitoring evalúan los resultados de las pruebas y activan alertas, consulte <a href="/synthetics/guide/how-synthetics-monitors-trigger-alerts/">Understanding Synthetic Monitor Alerting</a>.
</div>

{{% synthetics-downtimes %}}

### Configure el seguimiento de prueba {#configure-the-test-monitor}

Se envía una notificación de acuerdo con el conjunto de condiciones de alerta. Use esta sección para definir cómo y qué comunicar a sus equipos.

1. Ingrese un {{< ui >}}message{{< /ui >}} para la prueba de navegador o use mensajes de seguimiento prellenados. Este campo permite el [formato Markdown][7] estándar y admite las siguientes [variables condicionales][8]:

    | Variable condicional       | Descripción                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the monitor alerts.                                       |
    | `{{^is_alert}}`            | Show unless the monitor alerts.                                     |
    | `{{#is_recovery}}`         | Show when the monitor recovers from `alerta`.                          |
    | `{{^is_recovery}}`         | Show unless the monitor recovers from `alerta`.                        |
    | `{{#is_renotify}}`         | Show when the monitor renotifies.                                   |
    | `{{^is_renotify}}`         | Show unless the monitor renotifies.                                 |
    | `{{#is_priority}}`         | Show when the monitor matches priority (P1 to P5).                  |Prioridad
    | `{{^is_priority}}`         | Mostrar a menos que el seguimiento coincida con la prioridad (P1 a P5).                |

    Notification messages include the {{< ui >}}message{{< /ui >}} defined in this section and information about the failing locations. Pre-filled monitor messages are included in the message body section:

     {{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="Sección de seguimiento de Synthetic Monitoring, que destaca los mensajes de seguimiento prellenados" style="width:100%;" >}}

     For example, to create a monitor that iterates over steps extracting variables for browser tests, add the following to the monitor message:

   ```text
   {{! Liste las variables extraídas en todos los pasos exitosos }}
   # Variables extraídas
   {{#each synthetics.attributes.result.steps}}
   {{#if extractedValue}}
   * **Nombre**: `{{extractedValue.name}}`
   **Valor:** {{#if extractedValue.secure}}*Ofuscado (valor oculto)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

2. Choose team members and services to notify.
3. Specify a renotification frequency. To prevent renotification on failing tests, check the option {{< ui >}}Stop re-notifying on X occurrences{{< /ui >}}.
4. Click {{< ui >}}Save & Start Recording{{< /ui >}} to save your test configuration and record your browser steps.

For more information, see [Synthetic Monitoring notifications][9].

## Record your steps 

Tests can be recorded from [Google Chrome][10]. To record your test, download the [Datadog Record Test extension][11]. Because Microsoft Edge is Chromium-based, you can also install the Chrome extension in Edge after you turn on **Allow extensions from other stores**. See Microsoft's [guide to adding extensions from other stores][18] for instructions.

You can switch tabs in a browser test recording to perform an action on your application (such as clicking on a link that opens another tab) and add another test step. Your browser test must interact with the page first (through a click) before it can perform an [assertion][12]. By recording all of the test steps, the browser test can switch tabs automatically at test execution.

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Registro de prueba de navegador" width="90%" >}}

1. Opcionalmente, seleccione {{< ui >}}Open in a pop-up{{< /ui >}} en la parte superior derecha de la página para abrir su grabación de prueba en una ventana emergente separada. Esto es útil si su aplicación no admite ser abierta en un iframe o si desea evitar problemas de tamaño al grabar. También puede abrir la ventana emergente en {{< ui >}}Incognito mode{{< /ui >}} para comenzar a grabar su prueba desde un navegador nuevo, libre de sesiones ya iniciadas, cookies de su navegador existente y más.
2. Opcionalmente, habilite a Datadog para recopilar automáticamente datos de RUM al ejecutar grabaciones de pasos desde su prueba de navegador. Para obtener más información, consulte [Explorar RUM y Session Replay][13].
3. Haga clic en {{< ui >}}Start Recording{{< /ui >}} para comenzar a grabar su prueba de navegador.
4. A medida que hace clic en su aplicación recorriendo el viaje del usuario que desea hacer un seguimiento, sus acciones se graban automáticamente y se utilizan para crear [pasos][14] dentro de su escenario de prueba de navegador a la izquierda.
5. Además de los pasos grabados automáticamente, también puede usar los [pasos][14] disponibles en la esquina superior izquierda para enriquecer su escenario:
   {{< img src="synthetics/browser_tests/manual_steps.png" alt="Pasos de la prueba de navegador" style="width:80%;">}}

   Datadog recomienda finalizar su prueba de navegador con una [aserción][12] para confirmar que el viaje ejecutado por la prueba de navegador resultó en el estado esperado.
6. Una vez que haya terminado su escenario, haga clic en {{< ui >}}Save and Launch Test{{< /ui >}}.

## Reproduzca sus pasos {#replay-your-steps}

Para volver a ejecutar uno o más pasos de su prueba de navegador directamente en su navegador, descargue la [extensión Datadog Record Test][11].

La función de reproducción de pasos le ayuda a depurar pasos individuales, alcanzar el estado correcto de la aplicación al editar una prueba de navegador y confirmar flujos completos antes de guardar su prueba.

**Nota**: La reproducción de pasos puede comportarse de manera diferente a una ejecución completa de prueba de Synthetic Monitoring debido a diferentes condiciones (versión del navegador, red, agente de usuario, estado de inicio de sesión) o limitaciones.

### Cómo usar la reproducción de pasos {#how-to-use-step-replay}

Puede reproducir los pasos de tres maneras:

<strong>1. Reproducción de un solo paso:</strong> Vuelva a ejecutar un solo paso:
{{< img src="synthetics/browser_tests/recording__replay--replay-one-step_1.mp4" alt="Reproducción de un solo paso" video="true" height="400px" >}}
<p style="text-align: center;"><em>Pase el cursor sobre el paso y haga clic en el botón de reproducción para reproducir solo este paso.</em></p>

<strong>2. Reproducir todos los pasos:</strong> Ejecute toda la secuencia de pasos tal como se define en la grabadora:
{{< img src="synthetics/browser_tests/recording__replay--replay-all-steps_1.mp4" alt="Reproducir todos los pasos" video="true" height="400px" >}}
<p style="text-align: center;"><em>Haga clic en el botón de reproducir todos (⏩︎) en la parte superior de la lista de pasos para reproducir todos los pasos.</em></p>

<strong>3. Reproducir pasos seleccionados:</strong> Ejecute un subconjunto de pasos que seleccione en la lista de pasos:
{{< img src="synthetics/browser_tests/recording__replay--replay-selected-steps_1.mp4" alt="Reproducir pasos seleccionados" video="true">}}
<p style="text-align: center;"><em>Seleccione los pasos que desea reproducir y luego haga clic en el botón de reproducir seleccionados (⏩︎) en la parte superior de la lista de pasos.</em></p>

### Compatibilidad de la función de reproducción de pasos {#step-replay-feature-support}

La siguiente tabla resume qué tipos de pasos de prueba de navegador son compatibles con la reproducción de pasos:

| Tipo de paso             | Compatible con reproducción de pasos | Notas |
|--------------------------|:------------------------:|-------|
| Extraer variable         | {{< X >}}                       |       |
| Ir a la URL              | {{< X >}}                       |       |
| Actualizar               | {{< X >}}                       |       |
| Desplazarse              | {{< X >}}                       |       |
| Seleccionar opción       | {{< X >}}                       |       |
| Esperar                  | {{< X >}}                       |       |
| Ejecutar prueba de API   | {{< X >}}                       |       |
| Afirmar estado de casilla de verificación | {{< X >}}                       |       |
| Afirmar URL actual       | {{< X >}}                       |       |
| Afirmar atributo de elemento | {{< X >}}                       |       |
| Afirmar contenido de elemento | {{< X >}}                       |       |
| Confirmar que el elemento está presente | {{< X >}}                       |       |
| Confirmar descarga de archivo     | {{< X >}}                       |       |
| Confirmar que la página contiene     | {{< X >}}                       |       |
| Confirmar que la página no contiene        | {{< X >}}                       |       |
| Confirmar desde JavaScript   | {{< X >}}                       |       |
| Extraer desde JavaScript  | {{< X >}}                       |       |
| Presionar tecla                | {{< X >}}                       |       |
| Escribir texto                | {{< X >}}                       |       |
| Hacer clic                    | {{< X >}}*                      | *Click steps are supported, but may behave differently than in a full Synthetic Monitoring test run. |
| Colocar el cursor sobre | {{< X >}}*                      | *Hover steps are supported, but may behave differently than in a full Synthetic Monitoring test run. |

### Tipos de paso no admitidos por la reproducción de pasos {#step-types-not-supported-by-step-replay}

| Tipo de paso                | Soportado por la reproducción de pasos |
|--------------------------|:------------------------:|
| Confirmar correo electrónico             | Aún no soportado        |
| Confirmar solicitudes          | Aún no soportado        |
| Extraer del cuerpo del correo electrónico  | Aún no soportado        |
| Ir al enlace del correo electrónico         | Aún no soportado        |
| Cargar archivos             | Aún no soportado        |

### Permiso del depurador {#debugger-permission}

Para estar lo más cerca posible de una ejecución de prueba completa de Synthetic Monitoring, algunos pasos, como los pasos basados en JavaScript o las simulaciones de pulsaciones de teclas, requieren el permiso del depurador para ser reproducidos.

La primera vez que la extensión se actualiza a una versión que requiere permiso de depurador, aparece una solicitud de permiso y la extensión se deshabilita hasta que se apruebe:
{{< img src="synthetics/browser_tests/recording__replay--accepting-permission_2.mp4" alt="Aceptar el permiso de depurador" video="true" height="400px" >}}
<p style="text-align: center;"><em>Haga clic en los tres puntos {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} menú para aceptar el permiso.</em></p>

## Permisos {#permissions}

De forma predeterminada, solo los usuarios con los [Datadog Admin y Datadog Standard roles][15] pueden crear, editar y eliminar Synthetic browser tests. Para obtener acceso para crear, editar y eliminar Synthetic browser tests, actualice su usuario a uno de esos dos [default roles][15].

Si está utilizando la [custom role feature][15], agregue su usuario a cualquier custom role que incluya los permisos `synthetics_read` y `synthetics_write`.

### Restringir acceso {#restrict-access}

Utilice el [control de acceso granular][17] para limitar quién tiene acceso a su prueba según los roles, equipos o usuarios individuales:

1. Abra la sección de permisos del formulario.
2. Haga clic en {{< ui >}}Edit Access{{< /ui >}}.
  {{< img src="synthetics/settings/grace_2.png" alt="Establezca los permisos para su prueba desde el formulario de configuración de Private Locations" style="width:100%;" >}}
3. Haga clic en {{< ui >}}Restrict Access{{< /ui >}}.
4. Seleccione equipos, roles o usuarios.
5. Haga clic en {{< ui >}}Add{{< /ui >}}.
6. Seleccione el nivel de acceso que desea asociar con cada uno de ellos.
7. Haga clic en {{< ui >}}Done{{< /ui >}}.

<div class="alert alert-info">Puede visualizar los resultados de una Ubicación privada incluso sin acceso de visualización a esa Ubicación privada.</div>

| Access level | View test configuration | Edit test configuration | View test results | Run test  | View recording | Edit recording |
| ------------ | ----------------------- | ----------------------- | ------------------| --------- | -------------- | -------------- |
| Sin acceso    |                         |                         |                   |           |                |                |
| Viewer       | {{< X >}}               |                         | {{< X >}}         |           | {{< X >}}      |                |
| Editor       | {{< X >}}               | {{< X >}}               | {{< X >}}         | {{< X >}} | {{< X >}}      | {{< X >}}      |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/private_locations/
[2]: /es/continuous_testing/environments/proxy_firewall_vpn
[3]: /es/help/
[4]: /es/synthetics/settings/#global-variables
[5]: /es/synthetics/browser_tests/test_steps#variables
[6]: /es/api/latest/synthetics/#create-or-clone-a-test
[7]: http://daringfireball.net/projects/markdown/syntax
[8]: /es/monitors/notify/variables/?tab=is_alert#conditional-variables
[9]: /es/synthetics/notifications/
[10]: https://www.google.com/chrome
[11]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[12]: /es/synthetics/browser_tests/test_steps/#assertion
[13]: /es/synthetics/guide/explore-rum-through-synthetics/
[14]: /es/synthetics/browser_tests/test_steps/
[15]: /es/account_management/rbac#custom-roles
[16]: /es/account_management/rbac/#create-a-custom-role
[17]: /es/account_management/rbac/granular_access
[18]: https://support.microsoft.com/en-us/edge/add-turn-off-or-remove-extensions-in-microsoft-edge
[19]: /es/synthetics/guide/how-synthetics-monitors-trigger-alerts/