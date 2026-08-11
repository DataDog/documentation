---
aliases:
- /es/synthetics/browser_check
- /es/synthetics/browser_test
description: Simular y monitorear los recorridos de los usuarios desde ubicaciones
  específicas.
further_reading:
- link: /getting_started/synthetics/browser_test
  tag: Documentación
  text: Comenzando con Pruebas de Navegador
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Aprender sobre monitores de pruebas Synthetic
- link: /synthetics/guide/version_history/
  tag: Guía
  text: Historial de versiones de Synthetic Monitoring
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centro de Aprendizaje
  text: 'Centro de Aprendizaje de Datadog: Comenzando con pruebas de navegador Synthetic'
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Mejores prácticas para crear pruebas de extremo a extremo
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: Blog
  text: Simplificando la resolución de problemas a lo largo del recorrido del usuario
    con Synthetic Monitoring de Datadog
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Cómo ayudé a mi cliente a escalar sus pruebas de navegador con Datadog
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Sitio Externo
  text: Crear y gestionar pruebas de navegador Synthetic con Terraform
title: Pruebas de Navegador
---
## Resumen {#overview}

Las pruebas de navegador son escenarios ejecutados por Datadog en sus aplicaciones web. Se ejecutan en intervalos periódicos configurables desde múltiples ubicaciones alrededor del mundo, desde múltiples navegadores y dispositivos. Estas pruebas verifican tanto que sus aplicaciones están activas y respondiendo a solicitudes, como que se cumplen las condiciones definidas en sus escenarios.

<div class="alert alert-info">Si está interesado en probar aplicaciones que están detrás de MFA, lea <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">la guía dedicada </a> y <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">envíe comentarios</a> al equipo de Monitoreo Sintético para ayudar a mejorar los sistemas que más importan a sus equipos.</div>

## Configuración de prueba {#test-configuration}

Puede crear una prueba utilizando una de las siguientes opciones:

### Crear una prueba a partir de una plantilla {#create-a-test-from-a-template}

  1. Pase el cursor sobre una de las plantillas predefinidas y haga clic en **Ver plantilla**. Esto abre un panel lateral que muestra información de configuración predefinida, incluyendo: Detalles de la prueba, Condiciones de alerta, Pasos y, opcionalmente, Variables.
  2. Haga clic en **+Crear prueba** para abrir la página de configuración, donde puede revisar y editar las opciones de configuración predefinidas. Los campos presentados son idénticos a los disponibles al crear una prueba desde cero.
  3. Haga clic en **Guardar y salir** en la esquina superior derecha para enviar su prueba de navegador.<br /><br>
       {{< img src="/synthetics/browser_tests/synthetics_templates_browser.mp4" alt="Video de la página de inicio de la prueba de navegador Synthetic con plantillas" video="true" >}}

### Construir una prueba desde cero {#build-a-test-from-scratch}

  1. Haga clic en la plantilla **+** para iniciar una nueva prueba de navegador desde cero.
  1. Ingrese una **URL de inicio**: La URL desde la cual su prueba de navegador inicia el escenario.
  1. Agregue un **nombre**: El nombre de su prueba de navegador.
  1. Seleccione **entorno y etiquetas adicionales**: Establezca el `env` y las etiquetas relacionadas adjuntas a su prueba de navegador. Utilice el `<KEY>:<VALUE>` formato para filtrar en un `<VALUE>` para un `<KEY>` dado.

  <div class="alert alert-info">Vea <a href=#advanced-options>Opciones avanzadas</a> para más opciones.</div>

  5. Seleccione **navegadores y dispositivos**: Los navegadores (como `Chrome`, `Firefox` y `Edge`), y dispositivos (como `Laptop Large`, `Tablet` y `Mobile Small`) para ejecutar su prueba.

      - Para un dispositivo portátil grande, las dimensiones son 1440 píxeles x 1100 píxeles.
      - Para un dispositivo tablet, las dimensiones son 768 píxeles x 1020 píxeles.
      - Para un dispositivo móvil pequeño, las dimensiones son 320 píxeles x 550 píxeles.

  6. Seleccione **ubicaciones gestionadas y privadas**: Seleccione de una lista de [ubicaciones](#locations) alrededor del mundo que son gestionadas por Datadog, o cree [ubicaciones privadas][1] para ejecutar su prueba de navegador desde ubicaciones personalizadas o dentro de redes privadas.

     **Nota**: También puede usar el [Túnel de Pruebas Continuas][2] para activar pruebas en su configuración de desarrollo local o en su canalización de CI/CD para probar entornos internos.

  7. Establece la **frecuencia de prueba**: Los intervalos varían desde cada cinco minutos hasta una vez por semana. Para solicitar una frecuencia de un minuto, [contacta al Soporte][3].
  8. Haz clic en **Guardar y Editar Grabación** para enviar tu Prueba de Navegador.

### Ubicaciones {#locations}

{{% managed-locations %}}

### Fragmentos {#snippets}

Al configurar una nueva prueba de navegador de Monitoreo Sintético, utiliza fragmentos para completar automáticamente tus dispositivos y regiones, en lugar de seleccionar estas opciones manualmente. Los siguientes fragmentos están disponibles:

* **Tamaños de pantalla**: Realiza automáticamente tus pruebas de navegador en una pantalla de tamaño específico a través de los navegadores:
   * **Grande**
   * **Tableta**
   * **Móvil**

* **Verificación multi-región**: Prueba automáticamente tu sitio web contra una ubicación en cada una de las tres principales regiones geográficas (AMER, APAC y EMEA).
</br><br>

  {{< img src="synthetics/browser_tests/browser_snippets_2.png" alt="Captura de pantalla del lado izquierdo de la creación de una prueba de navegador, mostrando los ejemplos de fragmentos" width="70%" >}}

### Opciones avanzadas {#advanced-options}

{{< tabs >}}

   {{% tab "Opciones de solicitud" %}}

   Selecciona **Deshabilitar CORS** para evitar que la política de intercambio de recursos de origen cruzado (CORS) bloquee tu prueba. Para evitar que la Política de Seguridad de Contenidos (CSP) bloquee tu prueba, selecciona **Deshabilitar CSP**.

   * **Encabezados de Solicitud**: Define encabezados en los campos **Nombre** y **Valor** para agregar o sobrescribir los encabezados predeterminados del navegador. Por ejemplo, puedes establecer el User Agent en el encabezado para [identificar scripts de Datadog][1].
   * **Cookies**: Define cookies para agregar a las cookies predeterminadas del navegador. Ingresa una cookie por línea, utilizando la sintaxis de [`Set-Cookie`][2].
   * **Autenticación HTTP**: Autentica a través de HTTP Básico, Digest o NTLM con un nombre de usuario y una contraseña. Tus credenciales se utilizan en cada paso de tu prueba de navegador. **Nota**: La autenticación a través de HTTP Básico se puede utilizar para sitios web que solicitan credenciales de usuario a través de un aviso del sistema del navegador.

   Las opciones de solicitud se establecen en cada ejecución de prueba y se aplican a cada paso de tu prueba de navegador en el momento de la ejecución, no en el momento de grabación. Si necesitas que estas opciones permanezcan activas para grabar los siguientes pasos, aplica manualmente las opciones en la página desde la que estás grabando y crea pasos subsecuentes en tu prueba.


[1]: /es/synthetics/guide/identify_synthetics_bots/?tab=apitests
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   {{% /tab %}}

   {{% tab "Certificado" %}}

   Selecciona **Ignorar error de certificado del servidor** para instruir a la prueba a omitir errores en el certificado del servidor.

   * **Certificado del Cliente**: Realiza pruebas en sistemas que requieren certificados de cliente haciendo clic en **Subir Archivo** y subiendo tu archivo de certificado y clave privada. Solo se aceptan certificados PEM.
   * **Dominios de Certificado del Cliente**: Una vez que los archivos de certificado están subidos, el certificado del cliente se aplica al dominio de la URL de inicio. Para aplicar el certificado del cliente en otro dominio, especifica el dominio en el campo **Valor**.

   Puedes incluir comodines en la URL.

   {{% /tab %}}

   {{% tab "Proxy" %}}

   Ingresa una URL para un proxy por el que deseas enviar solicitudes en el campo **URL del Proxy** como `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`.

   Puedes incluir [variables globales](#use-global-variables) en la URL.

   {{% /tab %}}

   {{% tab "Privacidad" %}}

   Selecciona **No capturar ninguna captura de pantalla para esta prueba** para evitar que se tomen capturas de pantalla en los pasos de tu prueba.

   Esta opción de privacidad está disponible como una [opción avanzada][1] a nivel de cada paso de prueba y asegura que no aparezcan datos sensibles en tus resultados de prueba. Prevenir que la prueba tome capturas de pantalla hace que la resolución de fallas sea más difícil. Para más información, consulta [Seguridad de Datos][2].

[1]: /es/synthetics/browser_tests/advanced_options#prevent-screenshot-capture
[2]: /es/data_security/synthetics
   {{% /tab %}}

   {{% tab "URL de inicio" %}}

   Ingresa un tiempo en segundos para que la prueba espere antes de declarar que el paso de prueba inicial ha fallado.

   {{% /tab %}}

   {{% tab "Hora y Lenguaje" %}}

  Por defecto, la zona horaria está configurada en UTC y el idioma está configurado en inglés (en). Para definir un idioma, utiliza el correspondiente código [ISO de 2 o 3 dígitos][1].

[1]: https://www.loc.gov/standards/iso639-2/php/code_list.php

   {{% /tab %}}

   {{% tab "Solicitudes Bloqueadas" %}}

   Ingresa uno o más patrones de solicitud para bloquear su carga mientras se ejecuta la prueba. Ingresa un patrón de solicitud por línea utilizando el [formato de patrón de coincidencia][1]. Se admiten Wildcard (por ejemplo, `*://*.example.com/*`).

   Las solicitudes bloqueadas se omiten durante la ejecución de la prueba, pero no afectan la representación de la página cuando [se graban pasos](/synthetics/browser_tests/test_steps). Visualiza las solicitudes bloqueadas en la [pestaña de Recursos](/synthetics/browser_tests/test_results#resources) de las ejecuciones de prueba. Las solicitudes bloqueadas tienen un estado de `blocked`.

[1]: https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns

   {{% /tab %}}

   {{< /tabs >}}

{{% synthetics-variables %}}

### Usa variables globales {#use-global-variables}

Puede usar las [variables globales definidas en **Configuración**][4] en la **URL de inicio** y **Opciones avanzadas** de los detalles de su prueba de navegador, así como en la grabación de su prueba.

Para mostrar una lista de variables disponibles:

- En los detalles de su prueba en el navegador: Escriba `{{` en el campo deseado.

  {{< img src="synthetics/browser_tests/use_global_variables_1.mp4" alt="Definiendo una variable local a partir de variables globales" video="true" width="90%" >}}

- En el grabador de su prueba en el navegador: Importe la variable en su prueba, luego escriba `{{` en el campo deseado o inyecte la variable en su aplicación para usarla.

  {{< img src="synthetics/browser_tests/use_global_variables_2.mp4" alt="Inyectando una variable local en un campo durante una grabación en el navegador" video="true" width="90%" >}}

Para más información sobre el uso de variables en la grabación de su prueba de navegador, consulte [Pasos de prueba en el navegador][5].

### Defina condiciones de alerta {#define-alert-conditions}

Puede personalizar las condiciones de alerta para definir las circunstancias bajo las cuales desea que una prueba envíe una alerta de notificación.

{{< img src="synthetics/browser_tests/alerting_rules_2.png" alt="Regla de alerta de prueba en el navegador" style="width:80%" >}}

#### Regla de alerta {#alerting-rule}

Se activa una alerta si alguna afirmación falla durante `X` minutos desde cualquiera `n` de `N` ubicaciones. Esta regla de alerta le permite especificar cuánto tiempo y en cuántas ubicaciones una prueba debe fallar antes de activar la notificación.

Se activa una alerta solo si estas dos condiciones son verdaderas:

- Al menos una ubicación estuvo en fallo (al menos una afirmación falló) durante los últimos X minutos;
- En un momento durante los últimos X minutos, al menos `N` ubicaciones estaban en fallo.

En caso de fallo, reintente `X` veces antes de que la ubicación sea marcada como fallida. Esto le permite definir cuántos fallos consecutivos de prueba deben ocurrir para que una ubicación se considere fallida. Por defecto, hay una espera de `300ms` antes de reintentar una prueba que falló. Este intervalo se puede configurar con la [API][6].

#### Reintento rápido {#fast-retry}

Cuando una prueba falla, el reintento rápido le permite reintentar la prueba X veces después de Y ms antes de marcarla como fallida. Personalizar el intervalo de reintento ayuda a reducir falsos positivos y mejora la precisión de sus alertas.

Dado que el tiempo de actividad de la ubicación se calcula en función del resultado final de la prueba después de que se completan los reintentos, los intervalos de reintento rápido impactan directamente en lo que aparece en su gráfico de tiempo de actividad total. El tiempo de actividad total se calcula en función de las condiciones de alerta configuradas, y las notificaciones se envían en función del tiempo de actividad total.

<div class="alert alert-info">
Para más información sobre cómo las notificaciones de Synthetic Monitoring evalúan los resultados de las pruebas y activan alertas, consulta <a href="/synthetics/guide/how-synthetics-monitors-trigger-alerts/">Comprendiendo la alerta de Synthetic Monitoring</a>.
</div>

{{% synthetics-downtimes %}}

### Configure el seguimiento de prueba {#configure-the-test-monitor}

Se envía una notificación de acuerdo con el conjunto de condiciones de alerta establecidas. Utilice esta sección para definir cómo y qué mensaje enviar a sus equipos.

1. Ingrese un **mensaje** para su prueba de navegador o use mensajes de seguimiento predefinidos. Este campo permite el formato estándar de [Markdown][7] y admite las siguientes [variables condicionales][8]:

    | Variable Condicional       | Descripción                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the monitor alerts.                                       |
    | `{{^is_alert}}`            | Show unless the monitor alerts.                                     |
    | `{{#is_recovery}}`         | Show when the monitor recovers from `alerta`.                          |
    | `{{^is_recovery}}`         | Show unless the monitor recovers from `alerta`.                        |
    | `{{#is_renotify}}`         | Show when the monitor renotifies.                                   |
    | `{{^is_renotify}}`         | Show unless the monitor renotifies.                                 |
    | `{{#is_priority}}`         | Show when the monitor matches priority (P1 to P5).                  |
    | `{{^is_priority}}`         | Mostrar a menos que el seguimiento coincida con la prioridad (P1 a P5).                |

    Notification messages include the **message** defined in this section and information about the failing locations. Pre-filled monitor messages are included in the message body section:

     {{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="Sección de seguimiento sintético, destacando los mensajes de seguimiento predefinidos" style="width:100%;" >}}

     For example, to create a monitor that iterates over steps extracting variables for browser tests, add the following to the monitor message:

   ```text
   {{! Liste las variables extraídas de todos los pasos exitosos }}
   # Variables extraídas
   {{#each synthetics.attributes.result.steps}}
   {{#if extractedValue}}
   * **Nombre**: `{{extractedValue.name}}`
   **Valor:** {{#if extractedValue.secure}}*Ofuscado (valor oculto)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

2. Choose team members and services to notify.
3. Specify a renotification frequency. To prevent renotification on failing tests, check the option `Stop re-notifying on X occurrences`.
4. Click **Save & Start Recording** to save your test configuration and record your browser steps.

For more information, see [Synthetic Monitoring notifications][9].

## Record your steps 

Tests can be only recorded from [Google Chrome][10] and [Microsoft Edge][18]. To record your test, download the [Datadog Record Test extension][11].

You can switch tabs in a browser test recording to perform an action on your application (such as clicking on a link that opens another tab) and add another test step. Your browser test must interact with the page first (through a click) before it can perform an [assertion][12]. By recording all of the test steps, the browser test can switch tabs automatically at test execution.

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Registro de prueba del navegador" width="90%" >}}

1. Opcionalmente, seleccione **Abrir en una ventana emergente** en la parte superior derecha de la página para abrir su grabación de prueba en una ventana emergente separada. Esto es útil si su aplicación no admite abrirse en un iframe o si desea evitar problemas de tamaño durante la grabación. También puede abrir la ventana emergente en **Modo Incógnito** para comenzar a grabar su prueba desde un navegador fresco, libre de sesiones ya iniciadas, cookies de su navegador existente, y más.
2. Opcionalmente, habilite Datadog para recopilar automáticamente datos de RUM al ejecutar grabaciones de pasos desde su prueba de navegador. Para más información, consulta [Explorar RUM y Reproducción de Sesiones][13].
3. Haga clic en **Iniciar Grabación** para comenzar a grabar su prueba de navegador.
4. A medida que hace clic en su aplicación mientras recorre el viaje del usuario que desea monitorear, sus acciones se graban automáticamente y se utilizan para crear [pasos][14] dentro de su escenario de prueba de navegador a la izquierda.
5. Además de los pasos grabados automáticamente, también puede usar los [pasos][14] disponibles en la esquina superior izquierda para enriquecer su escenario:
   {{< img src="synthetics/browser_tests/manual_steps.png" alt="Pasos de prueba de navegador" style="width:80%;">}}

   Datadog recomienda finalizar su prueba de navegador con una **[afirmación][12]** para confirmar que el viaje ejecutado por la prueba de navegador resultó en el estado esperado.
6. Una vez que haya terminado su escenario, haga clic en **Guardar y Lanzar Prueba**.

## Reproduzca sus pasos {#replay-your-steps}

Para volver a ejecutar uno o más pasos de su prueba de navegador directamente en su navegador, descargue la [extensión de Prueba de Grabación de Datadog][11].

La función de Reproducción de Pasos le ayuda a depurar pasos individuales, alcanzar el estado correcto de la aplicación al editar una prueba de navegador, y confirmar flujos completos antes de guardar su prueba.

**Nota**: La Reproducción de Pasos puede comportarse de manera diferente a una ejecución completa de prueba Synthetic Monitoring debido a diferentes condiciones (versión del navegador, red, agente de usuario, estado de inicio de sesión) o limitaciones.

### Cómo usar la reproducción de pasos {#how-to-use-step-replay}

Puede reproducir pasos de tres maneras:

<strong>1. Reproducción de un solo paso:</strong> Reejecute un solo paso:
{{< img src="synthetics/browser_tests/recording__replay--replay-one-step_1.mp4" alt="Reproducción de un Solo Paso" video="true" height="400px" >}}
<p style="text-align: center;"><em>Pase el cursor sobre el paso y haga clic en el botón de reproducción para reproducir únicamente este paso.</em></p>

<strong>2. Reproduzca todos los pasos:</strong> Ejecute toda la secuencia de pasos tal como se definió en el grabador:
{{< img src="synthetics/browser_tests/recording__replay--replay-all-steps_1.mp4" alt="Reproduzca Todos los Pasos" video="true" height="400px" >}}
<p style="text-align: center;"><em>Haga clic en el botón de reproducir todo (⏩︎) en la parte superior de la lista de pasos para reproducir todos los pasos.</em></p>

<strong>3. Reproduzca pasos seleccionados:</strong> Ejecute un subconjunto de pasos que seleccione en la lista de pasos:
{{< img src="synthetics/browser_tests/recording__replay--replay-selected-steps_1.mp4" alt="Reproduzca Pasos Seleccionados" video="true">}}
<p style="text-align: center;"><em>Seleccione los pasos que desea reproducir y luego haga clic en el botón de reproducir seleccionados (⏩︎) en la parte superior de la lista de pasos.</em></p>

### Soporte para la función de reproducción de pasos {#step-replay-feature-support}

La siguiente tabla resume qué tipos de pasos de prueba de navegador son compatibles con la reproducción de pasos:

| Tipo de paso                | Compatible con la Reproducción de Pasos | Notas |
|--------------------------|:------------------------:|-------|
| Extraer variable         | {{< X >}}                       |       |
| Ir a URL                | {{< X >}}                       |       |
| Actualizar                  | {{< X >}}                       |       |
| Desplazar                   | {{< X >}}                       |       |
| Seleccionar opción            | {{< X >}}                       |       |
| Esperar                     | {{< X >}}                       |       |
| Ejecutar prueba de API       | {{< X >}}                       |       |
| Afirmar estado de casilla     | {{< X >}}                       |       |
| Afirmar URL actual           | {{< X >}}                       |       |
| Afirmar atributo de elemento  | {{< X >}}                       |       |
| Afirmar contenido de elemento | {{< X >}}                       |       |
| Afirmar elemento presente     | {{< X >}}                       |       |
| Afirmar descarga de archivo   | {{< X >}}                       |       |
| Afirmar que la página contiene| {{< X >}}                       |       |
| Afirmar que la página carece  | {{< X >}}                       |       |
| Afirmar desde JavaScript      | {{< X >}}                       |       |
| Extraer de JavaScript         | {{< X >}}                       |       |
| Presionar tecla               | {{< X >}}                       |       |
| Escribir texto                | {{< X >}}                       |       |
| Hacer clic                   | {{< X >}}*                      | *Click steps are supported, but may behave differently than in a full Synthetic Monitoring test run. |
| Pasar el cursor              | {{< X >}}*                      | *Hover steps are supported, but may behave differently than in a full Synthetic Monitoring test run. |

### Tipos de paso no soportados por la reproducción de pasos {#step-types-not-supported-by-step-replay}

| Tipo de paso                | Soportado por la reproducción de pasos |
|--------------------------|:------------------------:|
| Verificar correo electrónico    | No soportado aún            |
| Verificar solicitudes          | No soportado aún            |
| Extraer del cuerpo del correo electrónico | No soportado aún |
| Ir al enlace del correo electrónico | No soportado aún |
| Subir archivos | No soportado aún |

### Permiso de depurador {#debugger-permission}

Para estar lo más cerca posible de una ejecución completa de prueba de Synthetic Monitoring, algunos pasos como los basados en JavaScript o simulaciones de pulsaciones de teclas requieren el permiso de depurador para ser reproducidos.

La primera vez que la extensión se actualiza a una versión que requiere permiso de depurador, aparece una solicitud de permiso y la extensión se desactiva hasta que la apruebe:
{{< img src="synthetics/browser_tests/recording__replay--accepting-permission_2.mp4" alt="Aceptando el permiso de depurador" video="true" height="400px" >}}
<p style="text-align: center;"><em>Haga clic en los tres puntos {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} Menú para aceptar el permiso.</em></p>

## Permisos {#permissions}

Por defecto, solo los usuarios con los roles [Datadog Admin y Datadog Standard][15] pueden crear, editar y eliminar pruebas de navegador Synthetic. Para obtener acceso para crear, editar y eliminar pruebas de navegador Synthetic, actualice su usuario a uno de esos dos [roles predeterminados][15].

Si está utilizando la [función de rol personalizado][15], agregue su usuario a cualquier rol personalizado que incluya `synthetics_read` y `synthetics_write` permisos.

### Restringir acceso {#restrict-access}

Utilice [control de acceso granular][17] para limitar quién tiene acceso a su prueba según roles, equipos o usuarios individuales:

1. Abra la sección de permisos del formulario.
2. Haga clic en **Editar Acceso**.
  {{< img src="synthetics/settings/grace_2.png" alt="Establezca permisos para su prueba desde el formulario de configuración de Ubicaciones Privadas" style="width:100%;" >}}
3. Haga clic en **Restringir Acceso**.
4. Seleccione equipos, roles o usuarios.
5. Haga clic en **Agregar**.
6. Seleccione el nivel de acceso que desea asociar con cada uno de ellos.
7. Haga clic en **Done**.

<div class="alert alert-info">Puede ver resultados de una Private Location incluso sin acceso de Visualizador a esa Private Location.</div>

| Nivel de acceso | Ver configuración de prueba | Editar configuración de prueba | Ver resultados de prueba | Ejecutar prueba  | Ver grabación | Editar grabación |
| ------------ | ----------------------- | ----------------------- | ------------------| --------- | -------------- | -------------- |
| Sin acceso    |                         |                         |                   |           |                |                |
| Visualizador       | {{< X >}}               |                         | {{< X >}}         |           |                |                |
| Editor       | {{< X >}}               | {{< X >}}               | {{< X >}}         | {{< X >}} | {{< X >}}      | {{< X >}}      |

## Para saber más {#further-reading}

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
[18]: https://www.microsoft.com/edge
[19]: /es/synthetics/guide/how-synthetics-monitors-trigger-alerts/