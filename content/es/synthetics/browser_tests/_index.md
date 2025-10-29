---
aliases:
- /es/synthetics/browser_check
- /es/synthetics/browser_test
description: Simula y monitoriza los recorridos de los usuarios desde localizaciones
  específicas.
further_reading:
- link: /synthetics/guide/version_history/
  tag: Guía
  text: Historial de versiones de Synthetic Monitoring
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Prácticas recomendadas para la creación de tests de extremo a extremo
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centro de aprendizaje
  text: 'Centro de aprendizaje de Datadog: Empezando con los tests de navegador Synthetic'
- link: /getting_started/synthetics/browser_test
  tag: Documentación
  text: Introducción a los tests de navegador
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Más información sobre los monitores de test Synthetic
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Sitio externo
  text: Creación y gestión de tests de navegador Synthetic con Terraform
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Cómo ayudé a mi cliente a escalar sus tests de navegador con Datadog
title: Tests de navegador
---

## Información general

Los tests de navegador son escenarios ejecutados por Datadog en tus aplicaciones web. Se ejecutan a intervalos periódicos configurables desde varias localizaciones en todo el mundo, desde varios navegadores y dispositivos. Estos tests verifican tanto que tus aplicaciones están activas y responden a las solicitudes, como que se cumplen las condiciones definidas en tus escenarios.

<div class="alert alert-info">Si te interesa probar aplicaciones basadas en la MFA, consulta <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">la guía exclusiva</a> y <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">envía tus comentarios</a> al equipo de monitorización Synthetic para que te ayuden a mejorar los sistemas que más importan a tus equipos.</div>

## Configuración del test

Puedes crear un test utilizando una de las siguientes opciones:

### Crear un test a partir de una plantilla

  1. Pasa el ratón por encima de una de las plantillas ya rellenadas y haz clic en **View Template** (Ver plantilla). Se abrirá un panel lateral en el que se mostrará la información de configuración rellenada previamente, que incluye: detalles de tests, condiciones de alerta, pasos e incluso variables.
  2. Haz clic en **+Create Test** (+Crear test) para abrir la página de configuración, en la que podrás revisar y editar las opciones de configuración rellenadas previamente. Los campos presentados son idénticos a aquellos disponibles cuando se crea un test desde cero.
  3. Haz clic en **Save & Quit** (Guardar y salir) en la esquina superior derecha para enviar tu test de navegador.<br /><br>
       {{< img src="/synthetics/browser_tests/synthetics_templates_browser.mp4" alt="Vídeo de la página de inicio de un test de navegador Synthetic con plantillas" video="true" >}}

### Crear un test desde cero

  1. Haz clic en la plantilla **+** para iniciar un nuevo test de navegador desde cero.
  1. Introduce una **URL de inicio**: La URL desde la que tu test de navegador inicia el escenario.
  1. Añade un **nombre**: El nombre del test de tu navegador.
  1. Selecciona **etiquetas (tags) de entorno y adicionales**: Define la etiqueta `env` y otras etiquetas relacionadas, adjuntas a tu test de navegador. Utiliza el formato `<KEY>:<VALUE>` para filtrar por `<VALUE>` una `<KEY>` determinada.

  <div class="alert alert-info">Para ver más opciones, consulta <a href=#advanced-options>Opciones avanzadas</a>.</div>

  5. Selecciona **navegadores y dispositivos**: Los navegadores (como `Chrome`, `Firefox` y `Edge`) y los dispositivos (como `Laptop Large`, `Tablet` y `Mobile Small`) en los que vas a ejecutar tu test.

      - Para un dispositivo portátil grande, las dimensiones son 1440 píxeles x 1100 píxeles.
      - Para una tableta, las dimensiones son 768 píxeles x 1020 píxeles.
      - Para un dispositivo móvil pequeño, las dimensiones son 320 píxeles x 550 píxeles.

  6. Selecciona **localizaciones gestionadas y privadas**: Selecciona entre una lista de [localizaciones](#locations) de todo el mundo, que son administradas por Datadog, o crea [localizaciones privadas][1] para ejecutar tu test de navegador desde localizaciones personalizadas o dentro de redes privadas.

     **Nota**: También puedes utilizar el [túnel de Continuous Testing][2] para activar tests en tu configuración de desarrollo local o en tu pipeline CI/CD para probar entornos internos.

  7. Ajusta la **frecuencia de los tests**: los intervalos varían de cada cinco minutos a una vez por semana. Para solicitar una frecuencia de un minuto, [ponte en contacto con el servicio de asistencia][3].
  8. Haz clic en **Save & Edit Recording** (Guardar y editar grabación) para enviar tu test de navegador.

### Localizaciones

{{% managed-locations %}}

### Fragmentos

Cuando configures un nuevo test de navegador de Synthetic Monitoring, utiliza fragmentos para rellenar automáticamente tus dispositivos y regiones, en lugar de seleccionar estas opciones manualmente. Están disponibles los siguientes fragmentos:

* **Screen sizes** (Tamaños de pantalla): realiza automáticamente tus tests de navegador en una pantalla de tamaño específico en todos los navegadores:
   * **Large** (Grande)
   * **Tablet** (Tableta)
   * **Mobile** (Móvil)

* **Multi-region check** (Check multiregión): prueba automáticamente tu sitio web en una localización en cada una de las tres regiones geográficas principales (AMER, APAC y EMEA).
</br><br>

  {{< img src="synthetics/browser_tests/browser_snippets_2.png" alt="Captura de pantalla del lado izquierdo de la creación de test de navegador, que muestra los ejemplos de fragmentos" width="70%" >}}

### Opciones avanzadas

{{< tabs >}}

{{% tab "Opciones de solicitud" %}}

   Selecciona **Deshabilitar CORS** para evitar que la política de uso compartido de recursos entre orígenes (CORS) bloquee tu test. Para evitar que la política de seguridad del contenido (CSP) bloquee tu test, selecciona **Deshabilitar CSP**.

   * **Cabeceras de solicitud**: Define las cabeceras en los campos **Nombre** y **Valor** para añadir o anular las cabeceras predeterminadas del navegador. Por ejemplo, puedes configurar el Agent de usuario en la cabecera para [identificar scripts de Datadog][1].
   * **Cookies**: Define cookies que añadir a las cookies predeterminadas del navegador. Introduce una cookie por línea, utilizando la sintaxis de [`Set-Cookie`][2].
   * **Autenticación HTTP**: Autentícate a través de HTTP Basic, Digest o NTLM con un nombre de usuario y una contraseña. Tus credenciales se utilizan en cada paso del test del navegador. **Nota**: La autenticación a través de HTTP Basic se puede utilizar para sitios web que solicitan credenciales de usuario a través de un aviso del sistema del navegador.

   Las opciones de solicitud se definen en cada ejecución del test y se aplican a cada paso de tu test del navegador en el momento de la ejecución, no en el momento de la grabación. Si necesitas que estas opciones permanezcan activas para grabar los pasos siguientes, aplica manualmente las opciones en la página desde la que estás grabando y crea pasos posteriores en tu test.


[1]: /es/synthetics/guide/identify_synthetics_bots/?tab=apitests
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   {{% /tab %}}

{{% tab "Certificado" %}}

Selecciona **Ignorar error de certificado del servidor** para indicar al test que omita los errores en el certificado del servidor.

   * **Certificado de cliente**: Realiza tests en sistemas que requieren certificados de cliente haciendo clic en **Cargar archivo** y cargando tu archivo de certificado y tu clave privada. Solo se aceptan certificados PEM.
   * **Dominios de certificados de cliente**: Una vez cargados los archivos de certificado, el certificado de cliente se aplica al dominio de la URL de inicio. Para aplicar el certificado de cliente en otro dominio, especifica el dominio en el campo **Valor**.

   Puedes incluir comodines en la URL.

   {{% /tab %}}

   {{% tab "Proxy" %}}

   Introduce la URL del proxy a través del cual quieres enviar las solicitudes en el campo **URL de proxy** como `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`.

   Puedes incluir [variables globales](#use-global-variables) en la URL.

   {{% /tab %}}

   {{% tab "Privacidad" %}}

   Seleccione **No realizar capturas de pantalla en este test** para evitar que se realicen capturas de pantalla en los pasos de tu test.

   Esta opción de privacidad está disponible como [opción avanzada][1] en el nivel de cada paso del test y garantiza que no aparezcan datos confidenciales en los resultados del test. Si se impide que el test realice capturas de pantalla, será más difícil encontrar fallos y solucionarlos. Para obtener más información, consulta [Data Security][2].

[1]: /es/synthetics/browser_tests/advanced_options#prevent-screenshot-capture
[2]: /es/data_security/synthetics
   {{% /tab %}}

{{% tab "URL de inicio" %}}

Introduce una cantidad de tiempo en segundos que el test deberá esperar antes de declarar el paso de test inicial como fallido.

   {{% /tab %}}

{{% tab "Hora e idioma" %}}

  Por defecto, la zona horaria está establecida en UTC y el idioma en inglés (en). Para definir un idioma, utiliza el [código ISO][1] de 2 o 3 dígitos correspondiente.

[1]: https://www.loc.gov/standards/iso639-2/php/code_list.php

   {{% /tab %}}

   {{% tab "Blocked Requests" %}}

   Introduce uno o más patrones de solicitud para bloquear el proceso de carga mientras se ejecuta el test. Introduce un patrón de solicitud por línea utilizando el [formato de patrón coincidente][1]. Se admiten comodines (por ejemplo, `*://*.example.com/*`).

   Las solicitudes bloqueadas se omiten durante la ejecución del test pero no afectan a la presentación de una página cuando se [registran pasos](/synthetics/browser_tests/actions). Consulta las solicitudes bloqueadas en la [pestaña Recursos](/synthetics/browser_tests/test_results#resources) de las ejecuciones de tests. Las solicitudes bloqueadas tienen el estado `blocked`.

[1]: https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns

   {{% /tab %}}

   {{< /tabs >}}

{{% synthetics-variables %}}

### Uso de variables globales

Puedes utilizar las [variables globales definidas en **Settings** (Configuración)][4] en la **Starting URL** (URL de inicio) y **Advanced Options** (Opciones avanzadas) de los detalles del test de tu navegador, así como en la grabación del test.

Para visualizar una lista de las variables disponibles:

- En los detalles de los tests de tu navegador: Escribe `{{` en el campo deseado.

  {{< img src="synthetics/browser_tests/use_global_variables_1.mp4" alt="Definición de una variable local de las variables globales" video="true" width="90%" >}}

- En la grabadora de los tests de tu navegador: Importa la variable en tu test, luego escribe `{{` en el campo deseado o inyecta la variable en tu aplicación para utilizarla.

  {{< img src="synthetics/browser_tests/use_global_variables_2.mp4" alt="Inyección de una variable local en un campo durante una grabación de navegador" video="true" width="90%" >}}

Para más información sobre el uso de variables en la grabación del test del navegador, consulta [Pasos del test del navegador][5].

### Definir las condiciones de alerta

Puedes personalizar las condiciones de alerta para definir las circunstancias en las que quieres que un test envíe una alerta de notificación.

{{< img src="synthetics/browser_tests/alerting_rules.png" alt="Regla para las alertas de un test de navegador" style="width:80%" >}}

* Se activa una alerta si cualquier aserción falla durante `X` minutos desde cualquier localización `n` de `N`. Esta regla para alertas permite especificar durante cuánto tiempo y en cuántas localizaciones debe fallar un test antes de que se active la notificación.
* Reintenta `X` veces antes de que la localización se marque como fallida. Esto permite definir cuántos fallos de tests consecutivos deben producirse para que una localización se considere fallida. Por defecto, hay una espera de 300 ms antes de reintentar un test que ha fallado. Este intervalo puede configurarse con la [API][6].

### Configurar el monitor de tests

Se envía una notificación según el conjunto de condiciones de alerta. Utiliza esta sección para definir qué mensajes enviar a tus equipos y cómo hacerlo.

1. Introduce un **mensaje** para el test de navegador o utiliza los mensajes prerellenados de monitor. Este campo permite el [formato Markdown][7] estándar y admite las siguientes [variables condicionales][8]:

    | Variable condicional       | Descripción                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`             | Mostrar cuando el monitor envía alertas.                                       |
    | `{{^is_alert}}`            | Mostrar a menos que el monitor envía alertas.                                     |
    | `{{#is_recovery}}`         | Mostrar cuando el monitor se recupera de una `alert`.                          |
    | `{{^is_recovery}}`         | Mostrar a menos que el monitor se recupere de una `alert`.                        |
    | `{{#is_renotify}}`         | Mostrar cuando el monitor vuelva a enviar una notificación.                                  |
    | `{{^is_renotify}}`         | Mostrar a menos que el monitor vuelva a enviar una notificación.                                 |
    | `{{#is_priority}}`         | Mostrar cuando el monitor coincide con la prioridad (de P1 a P5).                  |
    | `{{^is_priority}}`         | Mostrar a menos que el monitor coincida con la prioridad (de P1 a P5).                |

    Los mensajes de notificación incluyen el **mensaje** definido en esta sección e información sobre las ubicaciones que fallan. Los mensajes prerellenados de monitor se incluyen en la sección del cuerpo del mensaje:

     {{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="La sección del monitor de Synthetic Monitoring, que resalta los mensajes de monitor prerellenados" style="width:100%;" >}}

     Por ejemplo, para crear un monitor que itere sobre los pasos extrayendo variables para los tests de navegador, añade lo siguiente al mensaje de monitor:

   ```text
   {{! List extracted variables across all successful steps }}
   # Extracted variables
   {{#each synthetics.attributes.result.steps}}
   {{#if extractedValue}}
   * **Name**: `{{extractedValue.name}}`
   **Value:** {{#if extractedValue.secure}}*Obfuscated (value hidden)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

2. Selecciona los miembros del equipo y los servicios a los que notificar.
3. Especifica una frecuencia para volver a enviar la notificación. Para evitar una nueva notificación en caso de error en tests, activa la opción `Stop re-notifying on X occurrences`.
4. Haz clic en **Save & Start Recording** (Guardar e iniciar grabación) para guardar la configuración de test y grabar los pasos del navegador.

Para más información, consulta [Notificaciones de Synthetic Monitoring][9].

## Para grabar tus pasos

Los tests solo se pueden grabar desde [Google Chrome][10] y [Microsoft Edge][18]. Para grabar tu test, descarga la [extensión de Grabación de tests de Datadog][11].

Puedes cambiar de pestaña en una grabación del test de navegador para realizar una acción en tu aplicación (como hacer clic en un enlace que abre otra pestaña) y añadir otro paso de test. El test de navegador debe interactuar primero con la página (a través de un clic) antes de poder realizar una [confirmación][12]. Al grabar todos los pasos de test, el test de navegador puede cambiar de pestaña automáticamente en la ejecución de test.

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="Test de grabación de un test de navegador" width="90%" >}}

1. También puedes seleccionar **Abrir en una ventana emergente** en la parte superior derecha de la página para abrir la grabación del test en una ventana emergente independiente. Esto es útil si tu aplicación no admite ser abierta en un iframe o si quieres evitar problemas de tamaño en la grabación. También puedes abrir la ventana emergente en **Modo incógnito** para empezar a grabar tu test desde un navegador nuevo, libre de sesiones ya iniciadas, cookies de tu navegador actual, etc.
2. También puedes habilitar Datadog para recopilar automáticamente datos RUM al ejecutar grabaciones de los pasos del test de tu navegador. Para obtener más información, consulta [Explorar RUM y Session Replay][13].
3. Haz clic en **Iniciar grabación** para empezar a grabar el test de tu navegador.
4. A medida que haces clic en tu aplicación en el recorrido del usuario que quieres monitorizar, tus acciones se graban automáticamente y se utilizan para crear [pasos][14] en el escenario de test de tu navegador a la izquierda.
5. Además de los pasos grabados automáticamente, también puedes utilizar los [pasos][14] disponibles en la esquina superior izquierda para mejorar tu escenario:
   {{< img src="synthetics/browser_tests/manual_steps.png" alt="Pasos del test de navegador" style="width:80%;">}}

   Datadog recomienda finalizar tu test de navegador con una **[aserción][12]** para confirmar que el recorrido ejecutado por el test del navegador ha dado como resultado el estado esperado.
6. Una vez que termines tu escenario, haz clic en **Guardar e iniciar test**.

## Repetición de pasos

La repetición de pasos te permite volver a ejecutar uno o más pasos de tu test de navegador directamente en tu navegador con la [extensión Grabación de test de Datadog][11]. Esta función te ayuda a establecer el estado correcto cuando añades o editas pasos en medio de un test, por lo que no necesitas hacerlo manualmente.

### Permiso de depuración

Los pasos basados en JavaScript y las simulaciones de pulsaciones de teclas requieren el permiso del depurador.

La primera vez que la extensión se actualice a una versión que requiera permiso de depuración, verás una solicitud de permiso y la extensión se desactivará hasta que la apruebes:
{{< img src="synthetics/browser_tests/recording__replay--accepting-permission_2.mp4" alt="Aceptar el permiso del depurador" video="true" height="400px" >}}
<p style="text-align: center;"><em>Haz clic en el menú de tres puntos {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} para aceptar el permiso.</em></p>

### Cómo utilizar la Repetición del paso

Puedes repetir los pasos de tres maneras:

<strong>1. Repetición de paso único:</strong> reejecuta un único paso:
{{< img src="synthetics/browser_tests/recording__replay--replay-one-step_1.mp4" alt="Repetición de un paso único" video="true" height="400px" >}}
<p style="text-align: center;"><em>Pasa el ratón por encima del paso, y haz clic en el botón de reproducción para repetir solo este paso.</em></p>

<strong>2. Repetición de todos los pasos:</strong> ejecuta toda la secuencia de pasos definida en la grabadora:
{{< img src="synthetics/browser_tests/recording__replay--replay-all-steps_1.mp4" alt="Repetición de todos los pasos" video="true" height="400px" >}}
<p style="text-align: center;"><em>Haz clic en el botón repetir todo (⏩︎) en la parte superior de la lista de pasos para repetir todos los pasos.</em></p>

<strong>3. Repetición de los pasos seleccionados:</strong> ejecuta un subconjunto de pasos que selecciones en la lista de pasos:
{{< img src="synthetics/browser_tests/recording__replay--replay-selected-steps_1.mp4" alt="Repetición de los pasos seleccionados" video="true">}}
<p style="text-align: center;"><em>Selecciona los pasos que deseas repetir y, a continuación, haz clic en el botón de repetición seleccionado (⏩︎) en la parte superior de la lista de pasos.</em></p>

### Compatibilidad con la función de repetición de pasos

La siguiente tabla resume qué tipos de paso de test de navegador admiten la repetición de pasos:

| Tipo de paso                | Compatibilidad con la repetición de pasos | Notas |
|--------------------------|:------------------------:|-------|
| Extraer variable         | {{< X >}}                       |       |
| Ir a la URL                | {{< X >}}                       |       |
| Actualizar                  | {{< X >}}                       |       |
| Desplazarse                   | {{< X >}}                       |       |
| Seleccionar una opción            | {{< X >}}                       |       |
| Esperar                     | {{< X >}}                       |       |
| Ejecutar test de API             | {{< X >}}                       |       |
| Confirmar el estado de la casilla    | {{< X >}}                       |       |
| Confirmar la URL actual       | {{< X >}}                       |       |
| Confirmar el atributo de elemento | {{< X >}}                       |       |
| Confirmar el contenido de elemento   | {{< X >}}                       |       |
| Confirmar el elemento presente   | {{< X >}}                       |       |
| Confirmar la descarga del archivo     | {{< X >}}                       |       |
| Confirmar el contenido de página     | {{< X >}}                       |       |
| Confirmar los faltantes de página        | {{< X >}}                       |       |
| Confirmar desde JavaScript   | {{< X >}}                       |       |
| Extraer desde JavaScript  | {{< X >}}                       |       |
| Pulsar tecla                | {{< X >}}                       |       |
| Escribir texto                | {{< X >}}                       |       |
| Clic                    | {{< X >}}*                      | *Se admiten pasos de clic, pero pueden comportarse de forma diferente que en una ejecución completa de test de Synthetic Monitoring. |
| Pasar el cursor                    | {{< X >}}*                      | *Se admiten pasos flotantes, pero pueden comportarse de forma diferente que en una ejecución completa del test de Synthetic Monitoring. |

### Tipos de pasos no compatibles con la repetición de pasos

| Tipo de paso                | Compatible con la repetición de pasos |
|--------------------------|:------------------------:|
| Confirmar correo electrónico             | Aún no se admite        |
| Confirmar solicitudes          | Aún no se admite        |
| Extraer del cuerpo del correo electrónico  | Aún no se admite        |
| Ir al enlace de correo electrónico         | Aún no se admite        |
| Cargar archivos             | Aún no se admite        |
| Confirmar el lenguaje natural  | Aún no se admite        |

## Permisos

De manera predeterminada, solo los usuarios con los roles de [administrador de Datadog y estándar de Datadog][15] pueden crear, editar y eliminar tests de navegador Synthetic. Para crear, editar y eliminar tests de navegador Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][15].

Si estás utilizando la [función de rol personalizado][15], añade tu usuario a cualquier rol que incluya permisos `synthetics_read` y `synthetics_write`.

### Restringir el acceso

Utiliza el [control de acceso detallado][17] para limitar quién tiene acceso a tu test en función de roles, equipos o usuarios individuales:

1. Abre la sección de permisos del formulario.
2. Haz clic en **Edit Access** (Editar acceso).
  {{< img src="synthetics/settings/grace_2.png" alt="Establecer permisos para tu test en el formulario de configuración de localizaciones privadas" style="width:100%;" >}}
3. Haz clic en **Restrict Access** (Restringir el acceso).
4. Selecciona equipos, roles o usuarios.
5. Haz clic en **Add** (Añadir).
6. Selecciona el nivel de acceso que deseas asociar a cada uno de ellos.
7. Haz clic en **Done** (Listo).

<div class="alert alert-info">Puedes ver los resultados de una Ubicación privada incluso sin acceso del Visor a esa Ubicación privada.</div>

| Nivel de acceso | Ver configuración del test | Editar configuración del test | Ver los resultados de los tests | Ejecutar tests  | Ver grabación | Editar grabación |
| ------------ | ----------------------- | ----------------------- | ------------------| --------- | -------------- | -------------- |
| Sin acceso    |                         |                         |                   |           |                |                |
| Visor       | {{< X >}}               |                         | {{< X >}}         |           |                |                |
| Editor       | {{< X >}}               | {{< X >}}               | {{< X >}}         | {{< X >}} | {{< X >}}      | {{< X >}}      |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/private_locations/
[2]: /es/continuous_testing/environments/proxy_firewall_vpn
[3]: /es/help/
[4]: /es/synthetics/settings/#global-variables
[5]: /es/synthetics/browser_tests/actions#variables
[6]: /es/api/latest/synthetics/#create-or-clone-a-test
[7]: http://daringfireball.net/projects/markdown/syntax
[8]: /es/monitors/notify/variables/?tab=is_alert#conditional-variables
[9]: /es/synthetics/notifications/
[10]: https://www.google.com/chrome
[11]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[12]: /es/synthetics/browser_tests/actions/#assertion
[13]: /es/synthetics/guide/explore-rum-through-synthetics/
[14]: /es/synthetics/browser_tests/actions/
[15]: /es/account_management/rbac#custom-roles
[16]: /es/account_management/rbac/#create-a-custom-role
[17]: /es/account_management/rbac/granular_access
[18]: https://www.microsoft.com/edge