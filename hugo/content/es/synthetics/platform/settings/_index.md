---
aliases:
- /es/synthetics/settings
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
  tag: Sitio externo
  text: Cree y administre variables globales sintéticas con Terraform
- link: /synthetics/api_tests/
  tag: Documentación
  text: Configure una prueba de API
- link: /synthetics/multistep/
  tag: Documentación
  text: Configure una prueba de API en varios pasos
- link: /synthetics/browser_tests/
  tag: Documentación
  text: Configure una prueba de navegador
- link: /mobile_app_testing/
  tag: Documentación
  text: Configure una prueba móvil
- link: /synthetics/private_locations/
  tag: Documentación
  text: Cree una ubicación privada
- link: /synthetics/platform/rum/
  tag: Documentación
  text: Conecte RUM a Synthetic Monitoring
title: Configuración de Synthetic Testing y Monitoring
---
## Descripción general {#overview}

En la [página de configuración de Synthetic Monitoring & Continuous Testing][1], puede acceder y controlar los siguientes temas:

* [Configuración predeterminada](#default-settings)
* [Tiempos de inactividad][25]
* [Ubicaciones privadas](#private-locations)
* [Variables globales](#global-variables)
* [Configuración de integración](#integration-settings)
* [Continuous Testing Settings][2]
* [Mobile Applications Settings][18]

## Configuración predeterminada {#default-settings}

### Configuración de etiquetas obligatorias {#enforced-tags-settings}

#### Aplique etiquetas para **atribución de uso** en todas las pruebas {#enforce-tags-for-usage-attribution-on-all-tests}

En la página de Atribución de uso, puede configurar hasta tres etiquetas para desglosar los atributos de costo y uso. Seleccione {{< ui >}}Enforce tags for usage attribution on all tests{{< /ui >}} para requerir que los usuarios ingresen todas las etiquetas de Atribución de uso configuradas al crear o editar pruebas Synthetic. Con esta configuración habilitada, los usuarios no pueden guardar pruebas sin ingresar todas las etiquetas requeridas.

#### Aplicar políticas de **etiquetas de monitor** requeridas en todas las pruebas {#enforce-required-monitor-tag-policies-on-all-tests}

En la página de [configuración de pruebas y Synthetic Monitoring][20], seleccione {{< ui >}}Enforce required monitor tag policies on all tests{{< /ui >}} para requerir que se apliquen las políticas de etiquetas de monitor definidas por el usuario en las pruebas Synthetic. Con esta configuración habilitada, los usuarios no pueden guardar pruebas sin ingresar todas las etiquetas requeridas.

  <br>

  1. Configure las etiquetas de monitor en la página [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Policies{{< /ui >}}][21]:

  <br>

   {{< img src="synthetics/settings/monitor_tag_policy.png" alt="Página de Configuración del monitor, que muestra las etiquetas de política de monitor configuradas" style="width:80%;">}}

  2. Cree una prueba de navegador Synthetic y agregue las etiquetas de política requeridas:

  <br>

  {{< img src="synthetics/settings/monitor_tags.png" alt="Página de nueva prueba Synthetic, que resalta la función de etiquetas de política" style="width:80%;">}}

### Ubicaciones predeterminadas {#default-locations}

Elija las ubicaciones predeterminadas para los detalles de su [prueba de API][4], [prueba de API en varios pasos][5] o [prueba de navegador][6].

Sus opciones incluyen todas las ubicaciones administradas disponibles que ofrece Datadog y las ubicaciones privadas que configuró para su cuenta.

Cuando termine de seleccionar las ubicaciones, haga clic en {{< ui >}}Save Default Locations{{< /ui >}}.

### Navegadores y dispositivos predeterminados {#default-browsers-and-devices}

Elija los tipos de navegador y dispositivo predeterminados para los detalles de su [prueba de navegador][6].

Sus opciones de navegadores incluyen Google Chrome, Mozilla Firefox y Microsoft Edge. Sus opciones de dispositivos incluyen una computadora portátil grande, una tableta y un dispositivo móvil pequeño.

Cuando termine de seleccionar los navegadores y dispositivos, haga clic en {{< ui >}}Save Default Browsers & Devices{{< /ui >}}.

### Etiquetas predeterminadas {#default-tags}

Elija o agregue las etiquetas predeterminadas para los detalles de su [prueba de API][4], [prueba de API en varios pasos][5] o [prueba de navegador][6].

Cuando termine de seleccionar las etiquetas relacionadas, haga clic en {{< ui >}}Save Default Tags{{< /ui >}}.

### Tiempo de espera predeterminado {#default-timeout}

Agregue los tiempos de espera predeterminados para los detalles de su [API test][4].

Cuando termine de ingresar los nuevos tiempos de espera, haga clic en {{< ui >}}Save Default Timeouts{{< /ui >}}.

### Frecuencia predeterminada {#default-frequency}

Elija o agregue las frecuencias predeterminadas para los detalles de su [prueba de API][4], [prueba de navegador][6] o [prueba móvil][17].

Cuando termine de seleccionar las etiquetas relacionadas, haga clic en {{< ui >}}Save Default Frequencies{{< /ui >}}.

### Reintentos predeterminados {#default-retries}

Elija o agregue la cantidad predeterminada de veces que desea que su prueba se reintente en caso de error para los detalles de su [prueba de API][4], [prueba de navegador][6] o [prueba móvil][17].

Cuando termine de ingresar los valores de reintento predeterminados, haga clic en {{< ui >}}Save Default Retries{{< /ui >}}.

### Dispositivos móviles predeterminados {#default-mobile-devices}

Elija o agregue los dispositivos móviles predeterminados que desea usar en los detalles de su [prueba móvil][17].

Cuando termine de ingresar los dispositivos móviles predeterminados, haga clic en {{< ui >}}Save Default Devices{{< /ui >}}.

### Permisos {#permissions}

De forma predeterminada, solo los usuarios con los [Datadog Admin and Datadog Standard roles][11] pueden acceder a la página de {{< ui >}}Default Settings{{< /ui >}} de Synthetic Monitoring. Para obtener acceso a la página {{< ui >}}Default Settings{{< /ui >}}, actualice su usuario a uno de esos dos [default roles][11].

Si está utilizando la [custom role feature][12], agregue su usuario a cualquier custom role que incluya los permisos `synthetics_default_settings_read` y `synthetics_default_settings_write`.

## Tiempos de inactividad {#downtimes}

Para obtener más información, consulte [tiempo de inactividad programado][25].

## Ubicaciones privadas {#private-locations}

Para obtener más información, consulte [Run Synthetic Tests from Private Locations][3].

## Variables globales {#global-variables}

Las variables globales son variables a las que se puede acceder desde todas sus pruebas Synthetic. Se pueden utilizar en todas las [pruebas individuales][4], [pruebas de API en varios pasos][5], [pruebas de navegador][6] y [pruebas de aplicaciones móviles][17] de su conjunto de pruebas.

Para crear una variable global, navegue a la pestaña {{< ui >}}Global Variables{{< /ui >}} en la [página {{< ui >}}Synthetic Monitoring & Continuous Testing{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][7] y haga clic en {{< ui >}}\+ New Global Variable{{< /ui >}}.

Elija el tipo de variable que desea crear:

{{< tabs >}}
{{% tab "Especificar valor" %}}

1. Ingrese un {{< ui >}}Variable Name{{< /ui >}}. El nombre de su variable solo puede usar letras mayúsculas, números y guiones bajos. Este nombre debe ser único entre sus variables globales.
2. Opcionalmente, ingrese una {{< ui >}}Description{{< /ui >}} y seleccione {{< ui >}}Tags{{< /ui >}} para asociarla con su variable.
3. Ingrese el {{< ui >}}Value{{< /ui >}} que desea asignar a su variable.
4. Opcionalmente, utilice funciones integradas para asignar valores a su variable. Por ejemplo, haga clic en la `Por ejemplo, haga clic en la `{{ alphabetic(n) }}` función integrada para completar el campo {{< ui >}}Value{{< /ui >}} con un ejemplo de un valor alfabético.
5. Opcionalmente, habilite la ofuscación de su variable para ocultar su valor en los resultados de las pruebas.

{{< img src="synthetics/settings/variable_value_3.png" alt="Especificar valor de variable global" style="width:100%;">}}

Las siguientes funciones integradas están disponibles:

&#x7b;&#x7b; numeric(n) &#x7d;&#x7d;
: Genera una cadena numérica con `n` dígitos.

&#x7b;&#x7b; alphabetic(n) &#x7d;&#x7d;
: Genera una cadena alfabética con `n` letras.

&#x7b;&#x7b; alphanumeric(n) &#x7d;&#x7d;
: Genera una cadena alfanumérica con `n` caracteres.

&#x7b;&#x7b; date(n unit, format) &#x7d;&#x7d;
: Genera una fecha en uno de los formatos aceptados por Datadog con un valor correspondiente a la fecha UTC en la que se inicia la prueba, más o menos `n` unidades.

&#x7b;&#x7b; timestamp(n, unit) &#x7d;&#x7d;
: Genera una marca de tiempo en una de las unidades aceptadas por Datadog con un valor correspondiente a la marca de tiempo UTC en la que se inicia la prueba, más o menos `n` unidades.

&#x7b;&#x7b; uuid &#x7d;&#x7d;
: Genera un identificador único universal (UUID) de versión 4.

&#x7b;&#x7b; public-id &#x7d;&#x7d;
: Inserta el ID público de su prueba.

&#x7b;&#x7b; result-id &#x7d;&#x7d;
: Inserta el ID de resultado de la ejecución de prueba.

{{% /tab %}}

{{% tab "Crear a partir de una prueba" %}}

Puede crear variables a partir de sus [pruebas HTTP][1] existentes con el parseo de los encabezados y el cuerpo de respuesta asociados, o a partir de sus [pruebas de API en varios pasos][2] existentes utilizando las variables extraídas.

{{< img src="synthetics/settings/global_variable.png" alt="Variables disponibles que puede extraer de una prueba de API en varios pasos" style="width:100%;" >}}

1. Ingrese un {{< ui >}}Variable Name{{< /ui >}}. El nombre de su variable solo puede usar letras mayúsculas, números y guiones bajos.
2. Opcionalmente, ingrese una {{< ui >}}Description{{< /ui >}} y seleccione {{< ui >}}Tags{{< /ui >}} para asociarla con su variable.
3. Habilite la ofuscación de su variable para ocultar su valor en los resultados de la prueba (opcional).
4. Seleccione la **prueba** de la que desea extraer una variable.
5. Si está utilizando una prueba de API en varios pasos, extraiga su variable local de la prueba. Si está utilizando una prueba HTTP, elija extraer su variable del encabezado de respuesta o del cuerpo de respuesta.

    * Extraiga el valor de {{< ui >}}Response Header{{< /ui >}}: utilice el encabezado de respuesta completo para su variable o parsee con un [`regex`][3].
    * Extraiga el valor de {{< ui >}}Response Body{{< /ui >}}: parsee el cuerpo de respuesta de la solicitud con un [`regex`][3], un [`jsonpath`][4], un [`xpath`][5] o utilice el cuerpo de respuesta completo.
    * Extraiga el valor de {{< ui >}}Response Status Code{{< /ui >}}.

Además de extraer un valor con una expresión regular, también puede usar una [regex][3] para analizar lo siguiente:

  - Coincida no solo con la primera instancia de un patrón, sino también con todas las instancias del patrón proporcionado.
  - Ignore las mayúsculas y minúsculas del patrón coincidente.
  - Coincida con cadenas en varias líneas.
  - Trate el patrón de expresión regular pasado como unicode.
  - Permita que los símbolos de punto identifiquen nuevas líneas.
  - Coincida a partir de un índice determinado dentro de un patrón de expresión regular.
  - Sustituya el patrón coincidente por un valor proporcionado.

{{< img src="synthetics/settings/parsing_regex_field.png" alt="Analice el cuerpo de la respuesta de una prueba HTTP con una expresión regular." style="width:80%;">}}

Los valores de las variables se actualizan cada vez que se ejecuta la prueba de la que se extraen.

[1]: /es/synthetics/api_tests/http_tests/
[2]: /es/synthetics/multistep/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
{{% /tab %}}

{{% tab "Token MFA" %}}

Para generar y usar un TOTP en tus pruebas, crea una variable global donde ingreses una clave secreta o cargues un código QR de tu proveedor de autenticación. **Nota:** Actualmente, solo se admite el algoritmo de hash SHA1 para TOTP.

1. En {{< ui >}}Choose variable type{{< /ui >}}, seleccione {{< ui >}}MFA Token{{< /ui >}}.
2. En {{< ui >}}Define Variable{{< /ui >}}, ingrese un {{< ui >}}Variable Name{{< /ui >}}. El nombre de su variable solo puede usar letras mayúsculas, números y guiones bajos.
3. Opcionalmente, ingrese un {{< ui >}}Description{{< /ui >}} y seleccione {{< ui >}}Tags{{< /ui >}} para asociarlo con su variable.
4. Ingrese el {{< ui >}}Secret Key{{< /ui >}} para su variable o cargue una imagen de código QR.
5. Haga clic en {{< ui >}}\+ Generate{{< /ui >}} para crear una OTP. Puede copiar la OTP generada con el icono {{< ui >}}Copy{{< /ui >}}.

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="Cree un token MFA" style="width:100%;" >}}

**Nota**: Si su token TOTP funciona en Google Authenticator, es probable que sea compatible con Datadog.
Algunos códigos QR están limitados a métodos de verificación específicos y es posible que no funcionen en todas las plataformas. Para garantizar la compatibilidad, utilice un código QR o un secreto que siga los protocolos TOTP estándar.

Para obtener más información sobre MFA basado en TOTP en una prueba de navegador, consulte [TOTPs For Multi-Factor Authentication (MFA) In Browser Tests][1].

[1]: /es/synthetics/guide/browser-tests-totp
{{% /tab %}}
{{% tab "Autenticador virtual" %}}

Para completar un recorrido de usuario con una passkey en sus pruebas Synthetics, cree una variable global de Autenticador virtual. Esta variable global se utiliza para generar y almacenar passkeys para todas sus pruebas de navegador de Synthetics. Para obtener más información, consulte [Using passkeys In Browser Tests][1].

1. Navegue a la pestaña {{< ui >}}Global Variables{{< /ui >}} en [{{< ui >}}Synthetic Monitoring & Continuous Testing{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1] y haga clic en {{< ui >}}\+ New Global Variable{{< /ui >}}.

1. En la sección {{< ui >}}Choose variable type{{< /ui >}}, seleccione {{< ui >}}Virtual Authenticator{{< /ui >}}.
2. En la sección {{< ui >}}Specify variable details{{< /ui >}}, ingrese un {{< ui >}}Variable Name{{< /ui >}}. El nombre de su variable solo puede usar letras mayúsculas, números y guiones bajos.
3. Opcionalmente, ingrese un {{< ui >}}Description{{< /ui >}} y seleccione {{< ui >}}Tags{{< /ui >}} para asociarlo con su variable. Datadog crea entonces un autenticador virtual utilizado para generar y almacenar sus passkeys.
4. En la sección {{< ui >}}Permissions settings{{< /ui >}}, restrinja el acceso a su variable según los roles en su organización. Para obtener más información sobre los roles, consulte la [documentación de RBAC][2].

{{< img src="synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.png" alt="Cree un autenticador virtual" style="width:80%;" >}}

[1]: /es/synthetics/guide/browser-tests-passkeys
[2]: /es/account_management/rbac/?tab=datadogapplication#custom-roles
{{% /tab %}}
{{< /tabs >}}

Una vez creadas, las variables globales se pueden utilizar en todas las pruebas Synthetic. Para importar sus variables globales a su prueba, haga clic en {{< ui >}}\+ Variables{{< /ui >}}, escriba `{{` en un campo en el que desee agregar la variable y seleccione su variable global.


Para obtener más información sobre las variables, consulte la [documentación de pruebas HTTP][8], [prueba de API en varios pasos][9], [pruebas de navegador][10], [pruebas de aplicaciones móviles][19] y [pasos de pruebas de navegador][16].

### Permisos {#permissions-1}

De forma predeterminada, solo los usuarios con los [roles de Datadog Admin y Datadog Standard][11] pueden acceder a la página de Synthetic Monitoring {{< ui >}}Global Variables{{< /ui >}}. Puede obtener acceso a la página de {{< ui >}}Global Variables{{< /ui >}} haciendo que su usuario sea actualizado a uno de esos dos [roles predeterminados][11].

Si está utilizando la [custom role feature][12], agregue su usuario a cualquier custom role que incluya los permisos `synthetics_default_settings_read` y `synthetics_default_settings_write`.

### Restringir acceso {#restrict-access}

Utilice el [control de acceso granular][22] para limitar quién tiene acceso a su prueba según los roles, equipos o usuarios individuales:

1. Abra la sección de permisos del formulario.
2. Haga clic en {{< ui >}}Edit Access{{< /ui >}}.
  {{< img src="synthetics/settings/grace_2.png" alt="Establezca los permisos para su prueba desde el formulario de configuración de Private Locations" style="width:100%;" >}}
3. Haga clic en {{< ui >}}Restrict Access{{< /ui >}}.
4. Seleccione equipos, roles o usuarios.
5. Haga clic en {{< ui >}}Add{{< /ui >}}.
6. Seleccione el nivel de acceso que desea asociar con cada uno de ellos.
7. Haga clic en {{< ui >}}Done{{< /ui >}}.

<div class="alert alert-info">Puede visualizar los resultados de una Ubicación privada incluso sin acceso de visualización a esa Ubicación privada.</div>

| Nivel de acceso | Visualizar valor de GV | Ver metadatos de GV | Usar GV en prueba | Editar valor/metadatos de GV  |
| ------------ | --------------| ---------------- | -------------- | ----------------------- |
| Sin acceso    |               |                  |                |                         |
| Viewer       | {{< X >}}     | {{< X >}}        | {{< X >}}      |                         |
| Editor       | {{< X >}}     | {{< X >}}        | {{< X >}}      | {{< X >}}               |

**Nota**: Restringir una variable impide que otros usuarios la agreguen a una prueba y la utilicen; no oculta el nombre de la variable si ya se utiliza en una prueba existente.

## Configuración de integración {#integration-settings}

{{< img src="synthetics/settings/integration_settings.png" alt="Página de configuración de integración" style="width:100%;">}}

### Integración de APM para pruebas de navegador {#apm-integration-for-browser-tests}

Permita que las URL agreguen encabezados de integración de APM a esas URL. Los encabezados de integración de APM de Datadog permiten a Datadog vincular pruebas de navegador con APM.

Defina a qué puntos de conexión desea enviar los encabezados de APM ingresando una URL en el campo {{< ui >}}Value{{< /ui >}}. Si el punto de conexión está siendo trazado y está permitido, los resultados de su prueba de navegador se vinculan automáticamente a su traza correspondiente.

Utilice `*` para permitir nombres de dominio más amplios. Por ejemplo, agregar `https://*.datadoghq.com/*` permite todo en `https://datadoghq.com/`. Cuando termine de agregar URLs, haga clic en {{< ui >}}Save APM Integration Settings{{< /ui >}}.

Para obtener más información, consulte [Conectar Synthetics y trazas de APM][15].

### Recopilación de datos de pruebas de navegador de Synthetics y aplicaciones RUM {#synthetic-browser-test-data-collection-and-rum-applications}

Para permitir que Datadog recopile datos RUM de sus ejecuciones de pruebas de navegador, haga clic en {{< ui >}}Enable Synthetic RUM data collection{{< /ui >}}. Si está deshabilitado, no puede editar la configuración de RUM en la grabadora de pruebas de navegador. Cuando termine de habilitar la recopilación de datos, haga clic en {{< ui >}}Save RUM Data Collection{{< /ui >}}.

Seleccione una aplicación RUM del menú desplegable {{< ui >}}Default Application{{< /ui >}} que recopila datos de pruebas de navegador. Cuando termine de especificar una aplicación predeterminada, haga clic en {{< ui >}}Save RUM Data Applications{{< /ui >}}.

Para obtener más información, consulte [Conectar RUM a Synthetic Monitoring][14].

### Recopilación de datos de pruebas de aplicaciones móviles de Synthetic Monitoring {#synthetic-mobile-application-test-data-collection}

Para permitir que Datadog recopile datos RUM de sus ejecuciones de pruebas de aplicaciones móviles, configure y empaquete el [SDK de iOS][23] o el [SDK de Android][24] de RUM con su archivo `.ipa` o `.apk`. Esto vincula automáticamente los datos RUM, brindándole observabilidad de extremo a extremo de las ejecuciones de prueba.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings
[2]: /es/continuous_testing/settings/
[3]: /es/synthetics/private_locations/
[4]: /es/synthetics/api_tests/
[5]: /es/synthetics/multistep/
[6]: /es/synthetics/browser_tests/
[7]: https://app.datadoghq.com/synthetics/settings/variables
[8]: /es/synthetics/api_tests/http_tests?tab=requestoptions#use-variables
[9]: /es/synthetics/multistep?tab=requestoptions#use-variables
[10]: /es/synthetics/browser_tests/?tab=requestoptions#use-global-variables
[11]: /es/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[12]: /es/account_management/rbac/?tab=datadogapplication#custom-roles
[13]: /es/account_management/billing/usage_attribution
[14]: /es/synthetics/platform/rum/
[15]: /es/synthetics/apm/#prerequisites
[16]: /es/synthetics/browser_tests/test_steps/#use-variables
[17]: /es/synthetics/mobile_app_testing/
[18]: /es/synthetics/mobile_app_testing/settings/
[19]: /es/synthetics/mobile_app_testing/#use-global-variables
[20]: https://app.datadoghq.com/synthetics/settings/default
[21]: https://app.datadoghq.com/monitors/settings/policies
[22]: /es/account_management/rbac/granular_access
[23]: https://docs.datadoghq.com/es/real_user_monitoring/application_monitoring/ios/setup?tab=swiftpackagemanagerspm
[24]: https://docs.datadoghq.com/es/real_user_monitoring/application_monitoring/android/setup?tab=rum
[25]: /es/synthetics/platform/downtime/