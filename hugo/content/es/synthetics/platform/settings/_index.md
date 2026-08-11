---
aliases:
- /es/synthetics/settings
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Introducción a Datadog Synthetic Monitoring
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
  tag: Sitio externo
  text: Crear y gestionar variables globales de Synthetic con Terraform
- link: /synthetics/api_tests/
  tag: Documentación
  text: Configurar un test de API
- link: /synthetics/multistep/
  tag: Documentación
  text: Configurar un test de API de varios pasos
- link: /synthetics/browser_tests/
  tag: Documentación
  text: Configurar un test de navegador
- link: /mobile_app_testing/
  tag: Documentación
  text: Configurar un test de móvil
- link: /synthetics/private_locations/
  tag: Documentación
  text: Crear una localización privada
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: Documentación
  text: Explorar RUM y Session Replay en Synthetics
- link: /synthetics/guide/browser-tests-totp
  tag: Documentación
  text: TOTP para autenticación multifactor (MFA) en test de navegador
title: Parámetros de monitorización y tests de Synthetic
---

## Información general

En la [página Synthetic Monitoring & Continuous Testing Settings][1] (Parámetros de Synthetic Monitoring y Continuous Testing), puedes controlar los siguientes temas y acceder a ellos:

* [Parámetros predeterminados](#default-settings)
* [Localizaciones privadas](#private-locations)
* [Variables globales](#global-variables)
* [Parámetros de integración](#integration-settings)
* [Parámetros de Continuous Testing][2]
* [Parámetros de aplicaciones móviles][18]

## Parámetros predeterminados

### Parámetros de etiquetas (tags) aplicados

#### Aplicar etiquetas (tags) para la **atribución de uso** en todos los tests

En la página Usage Attribution (Atribución de uso), puedes configurar hasta tres etiquetas con las que desglosar los atributos de coste y uso. Selecciona **Enforce tags for usage attribution on all tests** (Aplicar etiquetas para la atribución de uso en todos los tests) para requerir que los usuarios introduzcan todas las etiquetas de atribución de uso configuradas al crear o editar tests de Synthetic. Con esta opción habilitada, los usuarios no podrán guardar los tests sin introducir todas las etiquetas necesarias.

#### Aplicar **políticas de etiqueta de monitor** obligatorias en todos los tests

En la página de [configuración de Synthetic Monitoring y Testing][20], selecciona **Enforce required monitor tag policies on all tests** (Aplicar políticas de etiqueta de monitor obligatorias en todos los tests) para exigir que las políticas de etiqueta de monitor definidas por el usuario se apliquen en los tests de Synthetic. Con esta opción activada, los usuarios no podrán guardar los tests sin introducir todas las etiquetas obligatorias.

  <br>

  1. Configura las etiquetas de monitor en la página [**Monitors** > **Settings** > **Policies**][21] (Monitores > Configuración > Políticas):

  <br>

   {{< img src="synthetics/settings/monitor_tag_policy.png" alt="Página de Configuración del monitor, que muestra las etiquetas de política de monitor configuradas" style="width:80%;">}}

  2. Crea un test de navegador de Synthetic y añade las etiquetas de política necesarias:

  <br>

  {{< img src="synthetics/settings/monitor_tags.png" alt="Página Nuevo test de Synthetics, con la función Etiquetas de política resaltada" style="width:80%;">}}

### Localizaciones predeterminadas

Elige las localizaciones predeterminadas para los detalles de tu [test de API][4], [test de API de varios pasos][5] o [test de navegador][6].

Tus opciones incluyen todas las localizaciones gestionadas disponibles que ofrece Datadog y las localizaciones privadas que configuraste para tu cuenta.

Cuando termines de seleccionar las localizaciones, haz clic en **Save Default Locations** (Guardar localizaciones predeterminadas).

### Navegadores y dispositivos predeterminados

Elige los tipos de navegador y dispositivo predeterminados para los detalles de tu [test de navegador][6].

Las opciones de navegador son Google Chrome, Mozilla Firefox y Microsoft Edge. En cuanto a los dispositivos, puedes elegir entre un portátil grande, una tableta y un dispositivo móvil pequeño.

Cuando termines de seleccionar los navegadores y dispositivos, haz clic en **Save Default Browsers & Devices** (Guardar los navegadores y dispositivos predeterminados).

### Etiquetas predeterminadas

Elige o añade las etiquetas predeterminadas para los detalles de tu [test de API][4], [test de API de varios pasos][5] o [test de navegador][6].

Cuando termines de seleccionar las etiquetas relacionadas, haz clic en **Save Default Tags** (Guardar etiquetas predeterminadas).

### Tiempo de espera predeterminado

Añade los tiempos de espera predeterminados para los detalles de tu [test de API][4].

Cuando hayas terminado de introducir los nuevos tiempos de espera, haz clic en **Save Default Timeouts** (Guardar tiempos de espera predeterminados).

### Frecuencia predeterminada

Elige o añade las frecuencias predeterminadas para los detalles de tu [test de API][4], [test de navegador][6] o [test de móvil][17].

Cuando hayas terminado de seleccionar las etiquetas relacionadas, haz clic en **Save Default Frequencies** (Guardar frecuencias predeterminadas).

### Reintentos predeterminados

Elige o añade el número predeterminado de veces que deseas que tu test se reintente en caso de fallo para los detalles de tu [test de API][4], [test de navegador][6] o [test de móvil][17].

Cuando hayas terminado de introducir los valores de reintentos predeterminados, haz clic en **Save Default Retries** (Guardar reintentos predeterminados).

### Dispositivos móviles predeterminados

Elige o añade los dispositivos móviles predeterminados que desees utilizar en los detalles de tu [test de móvil][17].

Cuando hayas terminado de introducir los dispositivos móviles predeterminados, haz clic en **Save Default Devices** (Guardar dispositivos predeterminados).

### Permisos

De forma predeterminada, solo los usuarios con [roles Admin y Standard de Datadog][11] pueden acceder a la página **Default Settings** (Parámetros predeterminados) de Synthetic Monitoring. Para obtener acceso a la página **Default Settings** (Parámetros predeterminados), tu usuario debe pasar a tener uno de estos dos [roles predeterminados][11].

Si utilizas la [función de rol personalizado][12], añade tu usuario a cualquier rol personalizado que incluya los permisos `synthetics_default_settings_read` y `synthetics_default_settings_write`.

## Parámetros de integración

{{< img src="synthetics/settings/integration_settings.png" alt="Página de parámetros de integración" style="width:100%;">}}

### Integración de APM para tests de navegador

Los encabezados de la integración de APM de Datadog permiten que Datadog vincule los tests de navegador con APM.

Define a qué endpoints deseas enviar los encabezados de APM añadiendo una URL a la lista **Value** (Valor). Si el endpoint está siendo rastreado y está permitido, los resultados de su test de navegador se vinculan automáticamente a su traza (trace) correspondiente.

Utiliza `*` para permitir nombres de dominio más amplios. Por ejemplo, añadir `https://*.datadoghq.com/*` permite todo en `https://datadoghq.com/`. Cuando termines de añadir las URL, haz clic en **Save APM Integration Settings** (Guardar los parámetros de la integración de APM).

Para obtener más información, consulta [Conectar trazas (traces) de Synthetics y APM][15].

### Recopilación de datos de Synthetic y aplicaciones de RUM

Para permitir que Datadog recopile datos RUM de tus tests, haz clic en **Enable Synthetic RUM data collection** (Habilitar la recopilación de datos RUM de Synthetic). Si está deshabilitada, no podrás editar el parámetro RUM de la grabación de test de navegador. Para aplicar los cambios, haz clic en **Save RUM Data Collection** (Guardar recopilación de datos RUM).

Selecciona una aplicación predeterminada para que los nuevos tests de navegador envíen datos. Utiliza el menú desplegable **Default Application** (Aplicación predeterminada) para seleccionar una aplicación de RUM que recopile datos de tests de navegador. Para aplicar los cambios, haz clic en **Save RUM Data Applications** (Guardar aplicaciones de datos RUM).

Para obtener más información, consulta [Explorar RUM y Session Replay][14].

## Localizaciones privadas

Para obtener más información, consulta [Ejecutar tests de Synthetic desde localizaciones privadas][3].

## Variables globales

Las variables globales son variables a las que se puede acceder desde todos los tests Synthetic. Se pueden utilizar en todos los tests [únicos][4], [tests de API de varios pasos][5], [tests de navegador][6] y [tests de aplicaciones móviles][17] de tu conjunto de tests.

Para crear una variable global, ve a la pestaña **Global Variables** (Variables globales) de la [página **Synthetic Monitoring & Continuous Testing** > **Settings**][7] (Synthetic Monitoring & Continuous Testing > Parámetros) y haz clic en **+ New Global Variable** (+ Nueva variable global).

Elige el tipo de variable que quieres crear:

{{< tabs >}}
{{% tab "Valor específico" %}}

1. Introduce un **Variable Name** (Nombre de variable). Solo puedes utilizar mayúsculas, números y guiones bajos. No pueden existir varias variables con el mismo nombre.
2. Opcionalmente, completa **Description** (Descripción) y en **Tags** (Etiquetas) selecciona etiquetas para asociar con tu variable.
3. Indica el valor quieres darle a tu variable en **Value** (Valor).
4. Si lo deseas, puedes utilizar las funciones integradas para asignar valores a tu variable. Por ejemplo, haz clic en la función integrada `{{ alphabetic(n) }}` para rellenar el campo **Value** (Valor) con un ejemplo de valor alfabético.
5. Opcionalmente, habilita la ofuscación de tu variable para ocultar su valor en los resultados de los tests.

{{< img src="synthetics/settings/variable_value_3.png" alt="Valor específico de la variable global" style="width:100%;">}}

Están disponibles las siguientes funciones integradas:

&#x7b;&#x7b; numeric(n) &#x7d;&#x7d;
: Genera una cadena numérica con `n` dígitos.

&#x7b;&#x7b; alphabetic(n) &#x7d;&#x7d;
: Genera una cadena alfabética con `n` letras.

&#x7b;&#x7b; alphanumeric(n) &#x7d;&#x7d;
: Genera una cadena alfanumérica con `n` caracteres.

&#x7b;&#x7b; date(n unit, format) &#x7d;&#x7d;
: Genera una fecha en uno de los formatos aceptados de Datadog con un valor correspondiente a la fecha UTC en la que se inicia el test, más o menos `n` unidades.

&#x7b;&#x7b; timestamp(n, unit) &#x7d;&#x7d;
: Genera una marca de tiempo en una de las unidades aceptadas de Datadog con un valor correspondiente a la marca de tiempo UTC en la que se inicia el test, más o menos `n` unidades.

&#x7b;&#x7b; uuid &#x7d;&#x7d;
: Genera un identificador único universal (UUID) versión 4.

&#x7b;&#x7b; public-id &#x7d;&#x7d;
: Inyecta el ID público de tu test.

&#x7b;&#x7b; result-id &#x7d;&#x7d;
: Inyecta el ID de resultado de la ejecución de tu test.

{{% /tab %}}

{{% tab "Crear desde un test" %}}

Puedes crear variables desde los [tests de HTTP][1] existentes parseando los encabezados y los cuerpos de respuesta asociados o desde tus [tests de API de varios pasos][2] existentes utilizando las variables extraídas.

{{< img src="synthetics/settings/global_variable.png" alt="Variables disponibles que puedes extraer de un test de API de varios pasos" style="width:100%;" >}}

1. Completa **Variable Name** (Nombre de variable). Recuerda que solo puede contener mayúsculas, números y guiones bajos.
2. Opcionalmente, completa **Description** (Descripción) y en **Tags** (Etiquetas) selecciona etiquetas para asociar con tu variable.
3. Habilita la ofuscación de tu variable para ocultar su valor en los resultados de los tests (opcional).
4. Elige el **test** del que quieres extraer la variable.
5. Si utilizas un test de API de varios pasos, extrae tu variable local del test. Si utilizas un test de HTTP, extrae la variable del encabezado o del cuerpo de la respuesta.

    * Extrae el valor del **Response Header** (Encabezado de la respuesta): utiliza el encabezado completo de la respuesta de la  variable o parséalo con un [`regex`][3].
    * Extrae el valor del **Response Body** (Cuerpo de la respuesta): parsea el cuerpo de la respuesta con un [`regex`][3], un [`jsonpath`][4], un [`xpath`][5] o utiliza el cuerpo completo de la respuesta.
    * Extrae el valor del **Response Status Code** (Código de estado de la respuesta).

Además de para extraer un valor, también puedes utilizar un [regex][3] para parsear lo siguiente:

  - Activar la coincidencia no solo con la primera instancia de un patrón, sino con todas las instancias del patrón proporcionado.
  - Ignorar las mayúsculas y minúsculas del patrón coincidente.
  - Activar la coincidencia con cadenas en varias líneas.
  - Tratar el patrón de regex como unicode.
  - Permitir el uso de puntos para identificar nuevas líneas.
  - Activar la coincidencia con un índice concreto de un patrón de regex.
  - Sustituir el patrón coincidente por un valor proporcionado.

{{< img src="synthetics/settings/parsing_regex_field.png" alt="Parsear el cuerpo de la respuesta de un test de HTTP con una expresión regular" style="width:80%;">}}

Los valores de la variable se actualizan cuando se ejecuta el test del que se extrajeron.

[1]: /es/synthetics/api_tests/http_tests/
[2]: /es/synthetics/multistep/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
{{% /tab %}}

{{% tab "Token MFA" %}}

Para generar y utilizar un TOTP en tus tests, crea una variable global donde introducir una clave secreta o subir un código QR de tu proveedor de autenticación. **Nota:** Actualmente, solo se admite el algoritmo hash SHA1 para TOTP.

1. En **Choose variable type** (Elegir el tipo de variable), selecciona **MFA Token**.
2. En **Define Variable** (Definir la variable), completa **Variable Name** (Nombre de variable). Recuerda que el nombre solo puede contener mayúsculas, números y guiones bajos.
3. Opcionalmente, completa **Description** (Descripción) y en **Tags** (Etiquetas) selecciona etiquetas para asociar con tu variable.
4. Añade la **clave secreta** a tu variable o carga la imagen de un código QR.
5. Haz clic en **+ Generate** (+ Generar) para crear un OTP. También puedes copiar el OTP generado con el icono de **copia**.

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="Crear un token MFA" style="width:100%;" >}}

Para obtener más información acerca de MFA basada en TOTP en un test de navegador, consulta [TOTP para autenticación multifactor (MFA) en tests de navegador][1].

[1]: /es/synthetics/guide/browser-tests-totp
{{% /tab %}}
{{% tab "Autenticador virtual" %}}

Para completar un recorrido del usuario con una clave de paso de tus tests de Synthetic, crea una variable global de autenticador virtual. Esta variable global se usa para generar y grabar claves de paso para todos tus tests de navegador de Synthetic. Para obtener más información, consulta [Uso de claves de paso en tests de navegador][1].

1. Accede a la pestaña **Global Variables** (Variables globales) en  [**Synthetic Monitoring & Continuous Testing** > **Settings**][1] (Synthetic Monitoring & Continuous Testing > Parámetros) y haz clic en **+ New Global Variable** (+ Nueva variable global).

1. En la sección **Choose variable type** (Elegir tipo de variable), selecciona **Virtual Authenticator** (Autenticador virtual).
2. En la sección **Specify variable details** (Especificar los detalles de la variable), completa **Variable Name** (Nombre de variable). Recuerda que el nombre solo puede contener mayúsculas, números y guiones bajos.
3. Opcionalmente, completa **Description** (Descripción) y en **Tags** (Etiquetas) selecciona etiquetas para asociar con tu variable. Datadog creará un autenticador virtual que empleará para generar y almacenar tus claves de paso.
4. En la sección **Permissions settings** (Parámetros de permisos), restringe el acceso a tu variable basada en roles en tu organización. Para obtener más información acerca de los roles, consulta la [documentación sobre Control de acceso basado en roles (RBAC)][2].

{{< img src="synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.png" alt="Crear un autenticador virtual" style="width:80%;" >}}

[1]: /es/synthetics/guide/browser-tests-passkeys
[2]: /es/account_management/rbac/?tab=datadogapplication#custom-roles
{{% /tab %}}
{{< /tabs >}}

Una vez creadas, las variables globales se pueden usar en todos los tests de Synthetic. Para importar tus variables globales en tu test, haz clic en **+ Variables** (+ Variables), escribe `{{` en un campo en el que quieras añadir la variable y selecciona tu variable global.


Para obtener más información sobre las variables, consulta [Test de HTTP][8], [Test de API de varios pasos][9], [Test de navegador][10], [Test de aplicación móvil][19] y la [documentación de los pasos del test de navegador][16].

### Permisos

De forma predeterminada, solo los usuarios con los [roles Admin y Standard en Datadog][11] pueden acceder a la página **Global Variables** (Variables globales) de Synthetic Monitoring. Podrás acceder a la página **Global Variables** (Variables globales) si tu usuario pasa a tener uno de esos dos [roles predeterminados][11].

Si utilizas la [función de rol personalizado][12], añade tu usuario a cualquier rol personalizado que incluya los permisos `synthetics_default_settings_read` y `synthetics_default_settings_write`.

### Restringir el acceso

Utiliza el [control de acceso granular][22] para limitar quién tiene acceso a tu test en función de roles, equipos o usuarios individuales:

1. Abre la sección de permisos del formulario.
2. Haz clic en **Edit Access** (Editar acceso).
  {{< img src="synthetics/settings/grace_2.png" alt="Establecer permisos para tu test en el formulario de configuración de Localizaciones privadas" style="width:100%;" >}}
3. Haz clic en **Restrict Access** (Restringir el acceso).
4. Selecciona equipos, roles o usuarios.
5. Haz clic en **Add** (Añadir).
6. Selecciona el nivel de acceso que deseas asociar a cada uno de ellos.
7. Haz clic en **Done** (Listo).

<div class="alert alert-info"><strong>Nota</strong>: Puedes ver los resultados de una localización privada incluso sin tener acceso a esa localización privada.</div>

| Nivel de acceso | Ver valor de GV | Ver metadatos de GV | Utilizar GV en tests | Editar valor/metadatos de GV  |
| ------------ | --------------| ---------------- | -------------- | ----------------------- |
| Sin acceso    |               |                  |                |                         |
| Visor       | {{< X >}}     | {{< X >}}        | {{< X >}}      |                         |
| Editor       | {{< X >}}     | {{< X >}}        | {{< X >}}      | {{< X >}}               |

## Parámetros de integración

{{< img src="synthetics/settings/integration_settings.png" alt="Página de parámetros de integración" style="width:100%;">}}

### Integración de APM para tests de navegador

Permite que las URL incluyan encabezados de la integración de APM. Los encabezados de la integración de APM de Datadog permiten que Datadog vincule los tests de navegador con APM.

Define los endpoints que quieres enviar a los encabezados de APM introduciendo una URL en el campo **Value** (Valor). Si el endpoint se está rastreando y esta acción está permitida, los resultados de tu test de navegador se asocian automáticamente a la traza correspondiente.

Utiliza `*` para permitir nombres de dominio más amplios. Por ejemplo, añadir `https://*.datadoghq.com/*` permite todo en `https://datadoghq.com/`. Cuando termines de añadir las URL, haz clic en **Save APM Integration Settings** (Guardar los parámetros de la integración de APM).

Para obtener más información, consulta [Conectar trazas (traces) de Synthetics y APM][15].

### Recopilación de datos de Synthetic y aplicaciones de RUM

Para permitir que Datadog recopile datos RUM de tus tests, haz clic en **Enable Synthetic RUM data collection** (Habilitar la recopilación de datos RUM de Synthetic). Si la deshabilitas, no podrás editar el parámetro RUM de la grabación de test de navegador. Cuando termines de habilitar la recopilación de datos, haz clic en **Save RUM Data Collection** (Guardar la recopilación de datos RUM).

Selecciona una aplicación de RUM del menú desplegable **Default Application** (Aplicación predeterminada) que recopile datos del test de navegador. Cuando hayas especificado la aplicación predeterminada, haz clic en **Save RUM Data Applications** (Guardar aplicaciones de datos RUM).

Para obtener más información, consulta [Explorar RUM y Session Replay][14].

## Referencias adicionales

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
[14]: /es/synthetics/guide/explore-rum-through-synthetics/
[15]: /es/synthetics/apm/#prerequisites
[16]: /es/synthetics/browser_tests/actions/#use-variables
[17]: /es/synthetics/mobile_app_testing/
[18]: /es/synthetics/mobile_app_testing/settings/
[19]: /es/synthetics/mobile_app_testing/#use-global-variables
[20]: https://app.datadoghq.com/synthetics/settings/default
[21]: https://app.datadoghq.com/monitors/settings/policies
[22]: /es/account_management/rbac/granular_access