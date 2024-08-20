---
description: Aprende a grabar automáticamente y a configurar manualmente los pasos
  en una grabación de tests de navegador.
further_reading:
- link: /synthetics/browser_tests/advanced_options/
  tag: Documentación
  text: Descubre las opciones avanzadas para los tests de navegador
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
  tag: Sitio externo
  text: Crear y administrar variables globales de Sintético con Terraform
title: Pasos para realizar tests de navegador
---

## Información general

Los pasos son una serie de acciones que puedes grabar, editar o ampliar para un test de navegador. Para definir los pasos que deseas que ejecute tu test de navegador, puedes grabarlos directamente con la extensión Datadog test recorder (grabador de tests de Datadog) o añadirlos manualmente. Cada paso incluye un conjunto de [opciones avanzadas][1] configurables.

El tiempo de espera predeterminado para cada paso es de 60 segundos. Puedes anular este tiempo de espera predeterminado a través de la [opción de tiempo de espera][2] especificada.

## Pasos grabados automáticamente

Una vez que hagas clic en **Iniciar grabación**, la [extensión del grabador de tests de navegador Datadog][3], detecta y graba automáticamente los pasos en tu sitio web.

### Clic

Cada interacción con elementos de tu página graba un paso.

{{< img src="synthetics/browser_tests/click_step.mp4" alt="Haz clic en el menú desplegable Tipo de paso de clic" video="true" width="60%" >}}

Haz clic en el paso y selecciona el tipo de clic que deseas que realice el test de navegador en el momento de la ejecución:

* Clic primario correspondiente a un clic izquierdo
* Doble clic
* Clic contextual correspondiente a un clic derecho

### Escribir texto

Datadog graba los pasos que realizas en tu aplicación, como por ejemplo seleccionar una opción de un menú desplegable `select`, y aparece un resumen como paso.

{{< img src="synthetics/browser_tests/input_text.mp4" alt="Browser Test Input Text Step" video="true" width="95%" >}}

### Seleccionar una opción

Datadog graba los pasos que realizas en tu aplicación, como por ejemplo seleccionar una opción en un menú desplegable `select`, y aparece un resumen como paso en la esquina izquierda.

{{< img src="synthetics/browser_tests/select_options.png" alt="Seleccionar paso de opciones" style="width:70%;" >}}

### Cargar un fichero

Para grabar un paso **Upload** (Cargar), o bien:

* Abre tu escritorio desde el navegador
* O arrastra y suelta tu fichero en el iframe de grabación

Datadog graba los pasos que realizas en tu aplicación, como por ejemplo la subida de ficheros, y aparece un resumen como paso en la esquina izquierda. Puedes subir hasta 10 ficheros con un límite de 5 MB cada uno.

{{< img src="synthetics/browser_tests/upload_file_step.png" alt="Crear un paso de carga de fichero" style="width:70%;" >}}

## Pasos añadidos manualmente

Puedes añadir y organizar manualmente los pasos en la esquina izquierda de la grabación del test de navegador.

### Aserción

Las aserciones te permiten verificar que el test del  navegador se encuentra en el estado que esperas en cualquier punto de un recorrido simulado del usuario.

Para confirmar que tu test termina en un estado esperado, debes finalizar tus tests de navegador con una **assertion** (aserción).

{{< img src="synthetics/browser_tests/browser_test_assertions_2.png" alt="Opciones de aserciones en un paso del test de navegador" style="width:70%;" >}}

Algunas aserciones validan la página activa, la página con la que el usuario ha interactuado por última vez, como por ejemplo un **click** (clic) o una **assertion** (aserción) en un elemento de la página.

Para crear un paso, selecciona un tipo de aserción:

{{< tabs >}}
{{% tab "Test de un elemento en la página activa" %}}

#### Comprobar el contenido de un elemento

Crea este paso de aserción para que el test de tu navegador seleccione un elemento de la página y haga un check si contiene un valor específico.

#### Comprobar el atributo de un elemento

Crea este paso de aserción para que el test de navegador seleccione un elemento de la página y compruebe si uno de sus atributos coincide con el contenido esperado.

#### Comprobar la presencia de un elemento

Crea este paso de aserción para que el test de tu navegador seleccione un elemento de la página como un `span`, `div`, `h` o `a` específico y confirma que está presente en la página.

Define el localizador del usuario para asegurarte de que el test de navegador se dirige al elemento correcto  seleccionando `CSS` o `XPath 1.0` en el menú desplegable y añadiendo un selector. Haz clic en **Test**.

#### Realizar un test del estado de una casilla de verificación o un botón de radio

Crea este paso de aserción para que el test de navegador seleccione un elemento de la página y valide el estado de la aserción (desmarcado o marcado).

{{< img src="synthetics/browser_tests/checkbox_state_assertion.png" alt="Opciones de aserciones en un paso del test de navegador" style="width:60%;" >}}

{{% /tab %}}
{{% tab "Comprobar el contenido de la página activa" %}}

#### Comprobar que no hay texto en la página activa

Crea este paso de aserción para que el test de navegador confirme que el texto especificado en el campo `Value` **no** está presente en la página actual que se está grabando.

#### Comprobar que existe algún texto en la página activa

Crea este paso de aserción para que el test de navegador confirme que el texto especificado en el campo `Value` está presente en la página actual que se está grabando.

#### Verifica el contenido de la URL de la página activa

Crea este paso de aserción para que el test de navegador verifique que la URL de la última página con la que se interactuó contiene un valor especificado por ti.

Puedes comprobar que existe un valor en la URL como `string`, `number`  o`regex`.

{{% /tab %}}

{{% tab "Aserciones especiales" %}}

#### Comprobar que se ha recibido un correo electrónico

Crea este paso de aserción para que tu test de navegador confirme que los mecanismos de correo electrónico de tu aplicación funcionan, y verifica que los valores que has especificado como `string`, `number` , o `regex`, están presentes en el asunto o en el cuerpo del correo electrónico.

Para más información, consulta [Validación de correo electrónico con tests de navegador][1].

#### Comprueba tu interfaz de usuario (UI) con JavaScript personalizado

Crea este paso de aserción para probar una aserción personalizada en la página activa utilizando tu código de  JavaScript. Las aserciones de JavaScript admiten tanto código síncrono como asíncrono. Dado que los tests de navegador cargan JavaScript externo añadiendo el script a la página, solo funcionan si tu sitio web acepta JavaScript externo.

La función de aserción de JavaScript contiene los siguientes parámetros y requiere una sentencia de retorno.

* La sentencia `return` (obligatoria) refleja la condición que debe cumplir la aserción para que tu paso de test tenga éxito. Se puede devolver cualquier tipo, pero el valor se convierte automáticamente en booleano. Si se devuelve un valor falso, el paso de test falla.

* `vars` (opcional): Una cadena que contiene las [variables][2] de tu test de navegador. Utiliza `vars.<YOUR_VARIABLE>` para hacer referencia a una variable de test del navegador en el snippet de JavaScript. Por ejemplo, si tu test de navegador contiene una variable `USERNAME`, invócala en tu snippet de JavaScript usando `vars.USERNAME`.

* `element` (opcional): El localizador del elemento en la página. Para configurarlo utiliza los botones **Seleccionar** y **Actualizar** elemento de destino. El elemento seleccionado aprovecha automáticamente el algoritmo de multilocalización de test de navegador de Datadog.

{{< img src="synthetics/browser_tests/js_assertion.mp4" alt="Aserción JavaScript de test de navegador" video="true" width="100%" >}}

Dado que las aserciones de JavaScript se ejecutan en el contexto de la página activa, estos pasos pueden acceder a todos los objetos definidos en la página activa (tales como bibliotecas, elementos integrados y variables globales). Para cargar bibliotecas externas utiliza una promesa (promise).

Por ejemplo:

```javascript
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://code.jquery.com/jquery-3.5.1.slim.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

// Script is now loaded

return jQuery().jquery.startsWith('3.5.1')
```

#### Comprobar un archivo descargado

Crea este paso de aserción para que tu test de navegador verifique los archivos descargados en los pasos anteriores. Puedes comprobar que un archivo se ha descargado correctamente y confirmar el nombre del archivo, el tamaño y el valor MD5.

Para obtener más información sobre cómo comprobar las descargas, consulta [Comprobar la carga y descarga de archivos][3].

[1]: /es/synthetics/guide/email-validation
[2]: /es/synthetics/browser_tests/actions#use-variables
[3]: /es/synthetics/guide/testing-file-upload-and-download/#testing-a-file-download
{{% /pestaña %}}
{{< /pestañas >}}

</br>

### Navegación

{{< img src="synthetics/browser_tests/navigation_step.png" alt="Elige entre tres tipos de navegación en una grabación de test de navegador" style="width:60%;" >}}

#### Refrescar una página

Crea este paso de navegación para que tu test de navegador refresque la página actual de la grabación.

#### Ve a un correo electrónico y haz clic en un enlace

Una vez que hayas [creado una variable de correo electrónico][4], crea este paso de navegación para que tu test de navegador tenga acceso a buzones únicos de correo de Synthetic.

Selecciona el correo electrónico y los enlaces en los que quieres que haga clic el test de navegador. Este paso te lleva a la página correspondiente y te permite seguir adelante con el resto del recorrido desde esa página específica.

#### Seguir un enlace específico

Crea este paso de navegación para que tu test de navegador vaya a una página específica. Debes anteponer en tus URL `http` o `https` en la casilla **Enter link URL** (Introducir enlace de URL).

### Acciones especiales

Puedes utilizar la [extensión grabador de test de navegador de Datadog][3], para grabar y monitorizar la mayoría de los pasos asociados a los recorridos de los usuarios. Sin embargo, la extensión no graba automáticamente algunos pasos tales como **Hover** (Pasar el cursor), **Press Key** (Pulsar tecla), **Scroll** (Desplazamiento) y **Wait** (Esperar).

Crea este paso de aserción manualmente haciendo clic en **Special Actions** (Acciones especiles) y seleccionando un tipo de acción.

#### Pasar el cursor

Este paso utiliza un clic específico, no un mecanismo de pasar el cursor, para evitar que se genere un paso distinto cada vez que un usuario pase el cursor por encima de un elemento durante la grabación.

Selecciona **Hover** (Pasar el cursor) y haz clic en un elemento para añadir un paso.

#### Pulsar tecla

Añade un paso **Press Key** (Pulsar tecla) para simular que los usuarios introducen pulsaciones de teclas. La [extensión  grabador de test de navegador de Datadog][3] puede grabar las siguientes teclas:

* Intro
* Flechas (arriba, abajo, derecha e izquierda)
* Pestaña (fuera de un formulario)
* Escape
* Retroceso

Para pulsar teclas que no se graban automáticamente, especifica los valores que hay que pulsar en el campo **Valor**.

Selecciona los modificadores  `Alt`, `Control`, `Meta` y `Shift` para añadirlos al valor introducido.

{{< img src="synthetics/browser_tests/browser_test_press_key.png" alt="Pulsar el paso Clave en una grabación de test de navegador" style="width:50%;" >}}

#### Desplazamiento

Los tests de navegador se desplazan automáticamente a los elementos con los que es necesario interactuar. En la mayoría de los casos no es necesario añadir manualmente un paso de desplazamiento. Utiliza el paso de desplazamiento cuando necesites activar una interacción adicional, como por ejemplo un desplazamiento infinito.

Especifica el número de píxeles por los que deseas que el test de navegador se desplace vertical y horizontalmente.

{{< img src="synthetics/browser_tests/browser_test_scroll_step.png" alt="Paso de desplazamiento en una grabación de test de navegador Paso de desplazamiento de test" style="width:50%;" >}}

De forma predeterminada, el paso **Scroll** (Desplazamiento) se desplaza por toda la página. Si necesitas desplazarte sobre un elemento específico (por ejemplo, un `<div>` específico), haz clic en **Target Element** (Elemento de destino) y selecciona un elemento 

#### Esperar

De forma predeterminada, los tests de navegador esperan a que una página esté completamente cargada antes de realizar un paso o el siguiente paso con un tiempo de espera de 60 segundos.

Si sabes que una página o elemento de página tarda más de 60 segundos en cargarse, puedes personalizar el tiempo de espera en las [opciones avanzadas][2] del paso, o añadir un paso de espera codificado con un valor máximo de 300 segundos.

{{< img src="synthetics/browser_tests/browser_test_wait_step.png" alt="Paso de espera en una grabación de test de navegador" style="width:50%;" >}}

Este tiempo adicional se añade sistemáticamente a **cada ejecución** de la grabación de tu test de navegador.

### Variables

Haz clic en **Variables** y selecciona un tipo de creación de variable en el menú desplegable.

{{< img src="synthetics/browser_tests/variables.png" alt="Variables de test de navegador" style="width:60%;" >}}

Para aprender a utilizar variables dentro de tus pasos consulta [Utilizar variables](#use-variables).

#### Patrón

Puede seleccionar una de las siguientes funciones integradas disponibles:

`{{ numeric(n) }}`
: Genera una cadena numérica con `n` dígitos.

`{{ alphabetic(n) }}`
: Genera una cadena alfabética con `n` letras.

`{{ alphanumeric(n) }}`
: Genera una cadena alfanumérica con `n` caracteres.

`{{ date(n unit, format) }}`
: Genera una fecha en uno de los formatos aceptados por Datadog, con un valor correspondiente a la fecha UTC en la que se inicia el test en + o - `n` unidades.

`{{ timestamp(n, unit) }}` 
: Genera una marca de tiempo en una de las unidades aceptadas de Datadog, con un valor correspondiente a la marca de tiempo UTC con la que se inicia el test en + o - `n` unidades.

`{{ uuid }}`
: Genera un identificador único universal de la versión 4 (UUID).

Para enmascarar los valores de las variables locales en los resultados del test, selecciona **Hide and obfuscate variable value** (Ocultar y enmascarar el valor de la variable). Una vez definida la cadena de la variable, haz clic en **Add Variable** (Añadir variable).

#### Elemento

Crear una variable a partir de un contenido como `span` o `div` extrayendo el texto del elemento.

#### Cuerpo del correo electrónico

Crea una variable a partir del cuerpo del correo electrónico utilizando uno de los siguientes métodos: [`regex`][13] o [`Xpath`][12].

* [`Regex`][13] busca y devuelve el primer patrón coincidente (por ejemplo, `/*./`) del cuerpo de texto sin formato del correo electrónico. Si no se encuentra el patrón, busca en el cuerpo de HTML.

* [`Xpath`][12] solo es aplicable cuando el correo electrónico contiene un cuerpo de HTML. Devuelve el contenido de la localización correspondiente (por ejemplo, `$`).

#### JavaScript

Los pasos de JavaScript admiten tanto código síncrono como asíncrono. Dado que los tests de navegador cargan JavaScript externo añadiendo el script a la página, solo funcionan si tu sitio web acepta JavaScript externo.

La función JavaScript viene con los siguientes parámetros y requiere una sentencia return (retorno).

* La sentencia (obligatoria) `return` devuelve el valor que deseas asociar a tu variable JavaScript. La sentencia puede devolver cualquier valor, pero lo convierte automáticamente en una cadena.

* `vars` (opcional): Una cadena que contiene [variables] (#use-variables) de tu test de navegador que puedes usar dentro de tu código. Usa `vars.<YOUR_VARIABLE>` para hacer referencia a una variable de test de navegador en tu snippet de JavaScript. Por ejemplo, si tu test de navegador ya incluye una variable `PRICE`, invócala en tu snippet de JavaScript utilizando `vars.PRICE`.

* `element` (opcional): El localizador del elemento en la página. Para configurarlo utiliza los botones **Seleccionar** y **Actualizar** elemento de destino. El elemento seleccionado aprovecha automáticamente el algoritmo de multilocalización de test de navegador de Datadog.

{{< img src="synthetics/browser_tests/js_variable.mp4" alt="Variable JavaScript de test de navegador" video="true" width="100%" >}}

Dado que las aserciones de JavaScript se ejecutan en el contexto de la página activa, estos pasos pueden acceder a todos los objetos definidos en la página activa (tales como bibliotecas, elementos integrados y variables globales). Para cargar bibliotecas externas utiliza una promesa (promise).

Por ejemplo:

```javascript
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://code.jquery.com/jquery-3.5.1.slim.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

// Script is now loaded

return jQuery().jquery.startsWith('3.5.1')
```

#### Variable global

Seleccionar cualquier variable global definida en [Configuración de monitorización Synthetic][5].

#### Variable global - MFA

Selecciona cualquier variable global MFA definida en [Configuración de monitorización de Synthetic][5].

Este tipo de variable global almacena claves secretas de contraseñas de un solo uso basadas en tiempo (TOTP), lo cual te permite probar tus módulos MFA y los flujos de trabajo protegidos por MFA. Para más información, consulta [TOTPs para Autenticación multifactor (MFA) en Tests de navegador][6].

#### Correo electrónico

Crea una dirección de correo electrónico de Datadog Synthetics que puedes utilizar en pasos de test para [confirmar si un correo electrónico se ha enviado correctamente][7] o [navegar a un enlace en el correo electrónico][8], por ejemplo, para hacer clic en un enlace de confirmación.

Se genera un buzón único de correo electrónico en cada ejecución de test para evitar conflictos entre ejecuciones de test.

### Subtests

Puedes ejecutar tests de navegador dentro de otros tests de navegador para reutilizar los flujos de trabajo existentes hasta dos niveles de anidamiento.

Para utilizar como subtest un test de navegador ya existente, haz clic en **Add New Subtest** (Añadir nuevo subtest), selecciona un test de navegador en el menú desplegable de la pestaña **From Existing Test** (Desde test existente) y haz clic en **Add Subtest** (Añadir subtest).

Para convertir los pasos de tu test de navegador actual en un subtest, haz clic en la pestaña **Extract From Steps** (Extraer desde pasos), selecciona los pasos grabados que quieres extraer y haz clic en **Convert to Subtest** (Convertir a subtest). De forma predeterminada, un subtest se ejecuta en secuencia con los pasos anteriores del test padre.

{{< img src="synthetics/browser_tests/advanced_options/subtest.png" alt="Añadir un subtest en un test de navegador" style="width:60%;" >}}

Para anular las variables de los subtests en los tests padre, asegúrate de que las variables creadas en el nivel del test padre tienen los mismos nombres que las variables presentes en el subtest. Una variable siempre utiliza el valor que se le asignó en primer lugar.

Para más información sobre opciones avanzadas para subtests, consulta [Opciones avanzadas para pasos de test de navegador][9].

Si para ti no tiene sentido ejecutar un subtest de forma independiente, puedes detenerlo. El test continúa siendo invocado como parte de tu test padre y no se ejecuta individualmente. Para más información consulta [Reutilización de los recorridos de test de navegador en tu conjunto de tests][10].

### Solicitudes HTTP

Puedes ejecutar peticiones de HTTP como parte de tus tests de navegador.

{{< img src="synthetics/browser_tests/recorder_http_requests2.png" alt="Paso de petición de HTTP" style="width:70%;" >}}

#### Configuración

Para definir tu petición de HTTP:

1. Selecciona un **Method** (Método) y **URL** a consultar. Elige entre `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE` y`OPTIONS`.
2. Opcionalmente, especifica **Advanced Options** (Opciones Avanzadas):

   {{< tabs >}}

   {{% tab "Opciones de petición" %}}

   * **Follow redirects** (Seguir redirecciones): Marca esta opción para que tu test de HTTP pueda acceder hasta a diez redirecciones al realizar la petición.
   * **Ignore server certificate error** (Ignorar error de certificado del servidor): Marca esta opción para que tu test de HTTP continúe con la conexión aunque se produzcan errores al validar el certificado SSL.
   * **Request headers** (Encabezados de la petición): Define los encabezados a añadir a tu petición de HTTP. También puedes anular los encabezados predeterminados (por ejemplo, el encabezado `user-agent`).
   * **Cookies**: Definir cookies para añadir a tu solicitud de HTTP. Define múltiples cookies utilizando el formato `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`

   {{% /tab %}}

   {{% tab "Autenticación" %}}

   * **Client certificate** (Certificado de cliente): Autentícate a través de mTLS subiendo tu certificado de cliente y la clave privada asociada.
   * **HTTP Basic Auth**: Añadir credenciales de autenticación básica de HTTP.
   * **Digest Auth**: Añadir credenciales de autenticación Add Digest. 
   * **NTLM**: Añadir credenciales de autenticación NTLM. Es compatible tanto con NTLMv2 como con NTLMv1.

   {{% /tab %}}

   {{% tab "Parámetros de consulta" %}}

   * **Parámetros Encode**: Añade el nombre y el valor de los parámetros de consulta que requieren codificación.

   {{% /tab %}}

   {{% tab "Cuerpo de la consulta" %}}

   * **Body type** (Tipo de cuerpo): Selecciona el tipo de cuerpo de la petición (`text/plain`, `application/json`, `text/xml`, `text/html`, `application/x-www-form-urlencoded`, `GraphQL` o  `None`) que quieres añadir a tu petición de HTTP.
   * **Request body** (Cuerpo de la petición): Añade el contenido del cuerpo de tu petición de HTTP. El cuerpo de la petición está limitado a un tamaño máximo de 50 kilobytes.

   {{% /tab %}}

   {{% tab "Proxy" %}}

   * **Proxy URL**: Especifica la URL del proxy por el que debe pasar la petición de HTTP (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
   * **Proxy Header** (Encabezado del proxy): Añade encabezados para incluir en la petición de HTTP al proxy.

   {{% /tab %}}

   {{% tab "Privacidad" %}}

   * **Do not save response body** (No guardar el cuerpo de la respuesta): Selecciona esta opción para evitar que se guarde el cuerpo de la respuesta durante la ejecución. Esto ayuda a garantizar que no se muestren datos confidenciales en los resultados del test, pero puede dificultar la resolución de problemas. Para conocer todas las recomendaciones de seguridad, consulta [Synthetic Monitoring Data Security][1].

[1]: /es/data_security/synthetics
   {{% /tab %}}

   {{< /tabs >}}
   </br>
3. Haz clic en **Test URL** para probar la configuración de la petición. Aparecerá una vista previa de la respuesta.

{{< img src="synthetics/browser_tests/http_request2.png" alt="Realizar solicitud de HTTP" style="width:80%;" >}}

#### Añadir aserciones

Las aserciones definen cuál es el resultado esperado de un test. Después de hacer clic en **Test URL**, se añaden aserciones básicas en `status code`, `response time` y `header` `content-type`basadas en la respuesta del test. Las aserciones son opcionales para los pasos de HTTP en los tests de navegador.

| Tipo          | Operador                                                                                               | Tipo de valor                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| cuerpo          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][11], [`xpath`][12] | _String_ <br> _[Regex][13]_ <br> _String_, _[Regex][13]_ |
| cabecera        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _String_ <br> _[Regex][13]_                                      |
| tiempo de respuesta | `is less than`                                                                                         | _Integer (ms)_                                                  |
| código de estado   | `is`, `is not`                                                                                         | _Integer_                                                      |

Las peticiones de HTTP pueden descomprimir cuerpos con los siguientes encabezados `content-encoding`: `br`, `deflate`, `gzip` y `identity`.

- Si un test no contiene una aserción en el cuerpo de la respuesta, la carga útil del cuerpo cae y devuelve un tiempo de respuesta asociado para la petición dentro del límite de tiempo de espera establecido por el Worker de Synthetics.

- Si un test contiene una aserción en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparecerá un error `Assertions on the body/response cannot be run beyond this limit`.

{{< img src="synthetics/browser_tests/assertions.png" alt="Define aserciones para que tu test de navegador tenga éxito o falle en" style="width:80%;" >}}

Puedes crear hasta 20 aserciones por paso haciendo clic en **New Assertion** (Nueva aserción) o haciendo clic directamente en la vista previa de la respuesta.

#### Extraer una variable de la respuesta

Opcionalmente puedes extraer una variable de la respuesta de tu petición de HTTP mediante el parseo de sus encabezados o del cuerpo de la respuesta. El valor de la variable se actualiza cada vez que se ejecuta el paso de solicitud de HTTP. Una vez creada, esta variable se puede utilizar en los [pasos siguientes]( #use-variables) del test de navegador.

Para iniciar el parseo de una variable, haz clic en **Extract a variable from response content** (Extraer una variable del contenido de la respuesta):

1. Introduce un **Variable Name** (Nombre de variable). El nombre de tu variable debe tener al menos tres caracteres y sólo puede contener mayúsculas, números y guiones bajos. 
2. Decide si quieres extraer tu variable de los encabezados o del cuerpo de la respuesta.

   * Extraer el valor del **response header** (encabezado de la respuesta): Utiliza el encabezado completo de la respuesta de tu solicitud de HTTP como valor de la variable o parsealo con un  [`regex`][13].
   * Extraer el valor del **response body** (cuerpo de la respuesta): Utiliza el cuerpo completo de la respuesta de tu solicitud de HTTP como valor de la variable o parsealo con un [`regex`][13], un [`JSONPath`][11] o un [`XPath`][12].

{{< img src="synthetics/browser_tests/extracted_variable.png" alt="Variable extraida de la respuesta" style="width:80%;" >}}


## Gestiona el orden de los pasos

En lugar de reordenar manualmente los nuevos pasos arrastrando y soltando pasos individuales, puedes colocar el cursor en un paso de test en una fase concreta de la grabación e insertar pasos adicionales.

1. Pasa el cursor por encima de un paso de test grabado y haz clic en el icono **Set Cursor** (Situar el cursor). Aparecerá una línea azul sobre el paso de test.
2. Graba [pasos de test] (#automatically-recorded-steps) adicionales, o añade [pasos manualmente] (#manually-added-steps).
3. Cuando hayas terminado de añadir pasos adicionales sobre tus pasos de test, haz clic en **Clear Cursor** (Borrar el cursor) para salir.

{{< img src="synthetics/browser_tests/recording_cursor_step.mp4" alt="Sitúa el cursor sobre un paso de test para añadir pasos adicionales antes de este paso" video="true" width="100%" >}}

## Usar variables

Para ver todas las variables disponibles en los pasos añadidos manualmente, escribe `{{` en el campo de entrada.

Para utilizar una variable en pasos grabados automáticamente, haz clic en el icono **Inject this variable** (Inyectar esta variable) para introducir el valor de la variable durante la grabación.

{{< img src="synthetics/browser_tests/variable_input.mp4" alt="Haz clic en el paso de test para inyectar el valor en tu página de grabación" video="true" width="100%" >}}

Si a una variable se le asignan valores diferentes a lo largo de los pasos de test de navegador (por ejemplo entre subtests), la variable utiliza sistemáticamente el valor que se le asignó en primer lugar.

Algunas variables sólo se calculan en tiempo de ejecución, como por ejemplo una variable de una solicitud de HTTP o un paso JavaScript. Por ejemplo, supongamos que tienes un paso `Type text` que presenta `{{ <YOUR_VARIABLE_NAME> }}`. En la ejecución del test, `{{ <YOUR_VARIABLE_NAME> }}` se sustituye sistemáticamente por el valor asociado a tu variable. Para grabar un paso utilizando una de estas variables, graba un paso con el valor real de la variable y sustituye el valor real por `{{ <YOUR_VARIABLE_NAME> }}` en la definición del paso antes de guardar tu test.

## Editar una grabación 

Para editar una grabación del navegador después de guardarla:

- Ve a [Sintético > Tests][14].
- Haz clic en un test de navegador guardado previamente.
- Haz clic en el icono de engranaje de la esquina superior derecha y, a continuación, en "Editar grabación".
- Selecciona uno o varios pasos para borrarlos o reproducirlos y, a continuación, haz clic en **Guardar y Salir**.

{{< img src="synthetics/browser_tests/multi-step-edit.png" alt="Editar una grabación del navegador y utilizar la función de selección múltiple"="70%" >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/browser_tests/advanced_options/
[2]: /es/synthetics/browser_tests/advanced_options/#timeout
[3]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[4]: /es/synthetics/guide/email-validation/#create-an-email-variable
[5]: /es/synthetics/settings/
[6]: /es/synthetics/guide/browser-tests-totp
[7]: /es/synthetics/guide/email-validation/#confirm-the-email-was-sent
[8]: /es/synthetics/guide/email-validation/#navigate-through-links-in-an-email
[9]: /es/synthetics/browser_tests/advanced_options/#subtests
[10]: /es/synthetics/guide/reusing-browser-test-journeys
[11]: https://restfulapi.net/json-jsonpath/
[12]: https://www.w3schools.com/xml/xpath_syntax.asp
[13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[14]: https://app.datadoghq.com/synthetics/tests