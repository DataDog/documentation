---
aliases:
- /es/synthetics/browser_tests/actions
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

Una vez que hagas clic en **Start Recording** (Iniciar grabación), la [extensión del grabador de tests de navegador Datadog][3], detecta y graba automáticamente los pasos en tu sitio web.

### Clic

Cada interacción con elementos de tu página graba un paso.

{{< img src="synthetics/browser_tests/click_step.mp4" alt="Haz clic en el menú desplegable Tipo de paso de clic" video="true" width="60%" >}}

Haz clic en el paso y selecciona el tipo de clic que deseas que realice el test de navegador en el momento de la ejecución:

* Clic primario correspondiente a un clic izquierdo
* Doble clic
* Clic contextual correspondiente a un clic derecho

### Escribir texto

Datadog graba los pasos que realizas en tu aplicación, como por ejemplo seleccionar una opción de un menú desplegable `select`, y aparece un resumen como paso.

{{< img src="synthetics/browser_tests/type_text.mp4" alt="Paso de entrada de texto de test de navegador" video="true" width="95%" >}}

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

* `element` (opcional): El localizador del elemento en la página. Para configurarlo utiliza los botones **Select** (Seleccionar) y **Update** (Actualizar) del elemento de destino. El elemento seleccionado aprovecha automáticamente el algoritmo de multilocalización de test de navegador de Datadog.

{{< img src="synthetics/browser_tests/assertion_java.mp4" alt="Aserción de JavaScript de test de navegador" video="true" width="100%" >}}

Dado que las aserciones de JavaScript se ejecutan en el contexto de la página activa, estos pasos pueden acceder a todos los objetos definidos en dicha página (tales como bibliotecas, elementos integrados y variables globales). Para cargar bibliotecas externas, usa una promesa. 

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
[2]: /es/synthetics/browser_tests/test_steps#use-variables
[3]: /es/synthetics/guide/testing-file-upload-and-download/#testing-a-file-download

#### Realizar tests del recuento de solicitudes HTTP

Crea este paso de aserción para realizar tests de la cantidad de solicitudes HTTP realizadas a un patrón de URL específico. Ingresa la cantidad de solicitudes esperadas y la expresión regular de la URL de destino con la que se realizará el test.

{{< img src="synthetics/browser_tests/number_and_target_2.png" alt="Opción de número de test y destino de solicitudes con el menú desplegable de solicitudes realizadas mostrado" style="width:60%;" >}}

{{% /tab %}}
{{< /tabs >}}

</br>

### Interacción

Además de registrar pasos basados en las aserciones de tu navegador, también puedes crear pasos manualmente haciendo clic en **Interaction** (Interacción). Luego, puedes elegir un tipo de acción para añadir una interacción.

{{< img src="mobile_app_testing/test_steps/mobile_app_interaction_2.png" alt="Elegir un tipo de acción para añadir un paso de interacción" style="width:60%;" >}}

#### Actualizar página

Crea este paso de navegación para que tu test de navegador actualice la página actual de la grabación.

#### Hacer clic en el enlace de correo electrónico

Después de [crear una variable de correo electrónico][4], crea este paso de navegación para que tu navegador pruebe el acceso a buzones de correo únicos de Synthetic.

Selecciona el correo electrónico y los enlaces en los que quieres que haga clic el test de navegador. Este paso te lleva a la página correspondiente y te permite seguir adelante con el resto del recorrido desde esa página específica.

#### Ir al enlace

Crea este paso de navegación para que tu test de navegador vaya a una página específica. Debes anteponer `http` o `https` en tus URLs en la casilla **Enter link URL** (Ingresar enlace de URL).

#### Pulsar tecla

Añade el paso **Press Key** (Pulsar tecla) para simular que los usuarios introducen pulsaciones de teclas. La [extensión de grabador de test de navegador de Datadog][3] puede grabar las siguientes teclas:

* Intro
* Flechas (arriba, abajo, derecha e izquierda)
* Tab (fuera de un formulario)
* Escape
* Retroceso

Para pulsar teclas que no se graban de manera automática, especifica los valores que hay que pulsar en el campo **Value** (Valor). 

 Selecciona los modificadores `Alt`, `Control`, `Meta` y `Shift` para añadirlos al valor introducido.

{{< img src="synthetics/browser_tests/browser_test_press_key.png" alt="Paso de Pulsar tecla en una grabación de test de navegador" style="width:50%;" >}}

#### Pasar el ratón sobre un elemento

En este paso se usa un clic específico, no un mecanismo de pasar el cursor, para evitar que se genere un paso distinto cada vez que un usuario pase el cursor por encima de un elemento durante la grabación.

Selecciona **Hover** (Pasar el cursor) y haz clic en un elemento para añadir un paso.

#### Desplazarse

Los tests de navegador se desplazan de manera automática a los elementos con los que es necesario interactuar. En la mayoría de los casos no es necesario añadir de manera manual un paso de desplazamiento. Usa el paso de desplazamiento cuando necesites activar una interacción adicional, como por ejemplo un desplazamiento infinito.

Especifica el número de píxeles por los que quieres que el test de navegador se desplace vertical y horizontalmente.

{{< img src="synthetics/browser_tests/browser_test_scroll_step.png" alt="Paso de Desplazarse en una grabación de test de navegador, test del paso de Desplazarse" style="width:50%;" >}}

De manera predeterminada, el paso **Desplazarse** efectúa desplazamientos por toda la página. Si necesitas desplazarte sobre un elemento específico (por ejemplo, un `<div>` específico), haz clic en **Target Element** (Elemento de destino) y selecciona un elemento por el que quieres que se desplace el test de navegador.

#### Esperar

De manera predeterminada, los tests de navegador esperan a que una página se haya cargado por completo antes de realizar un paso o realizan el siguiente paso con un tiempo de espera de 60 segundos. 

Si sabes que una página o elemento de página tarda más de 60 segundos en cargarse, puedes personalizar el tiempo de espera en las [opciones avanzadas][2] del paso, o añadir un paso de espera codificado con un valor máximo de 300 segundos.

{{< img src="synthetics/browser_tests/browser_test_wait_step.png" alt="Paso de Esperar en una grabación de test de navegador" style="width:50%;" >}}

Este tiempo adicional se añade de manera sistemática a **cada ejecución** de la grabación de tu test de navegador.

#### Ejecutar test HTTP

Puedes ejecutar solicitudes HTTP, añadir [aserciones](#add-assertions) y [extraer variables](#extract-a-variable-from-the-response) como parte de tus tests de navegador.

{{< img src="synthetics/browser_tests/http_request_3.png" alt="Paso Solicitud HTTP" style="width:70%;" >}}

Para definir tu solicitud HTTP:

1. Introduce la URL que quieres probar.
2. De manera opcional, especifica **Advanced Options** (Opciones Avanzadas):

   {{< tabs >}}

   {{% tab "Opciones de solicitud" %}}

   * **Seguir redirecciones**: Selecciona esta opción para que tu test HTTP siga hasta diez redirecciones al realizar la solicitud.
   * **Ignorar error de certificado del servidor**: Selecciona esta opción para que tu test HTTP continúe con la conexión aunque se produzcan errores al validar el certificado SSL.
   * **Request headers** (Encabezados de la solicitud): define encabezados para añadir a tu solicitud HTTP. También puedes anular los encabezados predeterminados (por ejemplo, el encabezado `user-agent`).
   * **Cookies**: define cookies para añadir a tu solicitud HTTP. Define varias cookies con el formato `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

   {{% /tab %}}

   {{% tab "Autenticación" %}}

   * **Client certificate** (Certificado de cliente): autentícate a través de mTLS al cargar tu certificado de cliente y la clave privada asociada.
   * **HTTP Basic Auth** (Autenticación básica de HTTP): añade credenciales de autenticación básica de HTTP.
   * **Autenticación Digest** (Autenticación implícita): añade credenciales de autenticación implícita. 
   * **Firma AWS**: Añade el ID de la clave de acceso y la clave de acceso secreta de AWS.
   * **NTLM**: Añade credenciales de autenticación NTLM. Admite tanto NTLMv2 como NTLMv1.
   * **OAuth 2.0**: Selecciona un tipo de concesión (credenciales del cliente o contraseña del propietario del recurso).

   {{% /tab %}}

   {{% tab "Parámetros de consulta" %}}

   * **Codificar parámetros**: Añade los nombres y los valores de los parámetros de consulta que requieren codificación.

   {{% /tab %}}

   {{% tab "Cuerpo de la solicitud" %}}

   * **Tipo de cuerpo**: Selecciona el tipo de cuerpo de solicitud (`text/plain`, `application/json`, `text/xml`, `text/html`, `application/x-www-form-urlencoded`, `application/octet-stream`, `multipart/form-data`, `GraphQL` o `None`) que quieres añadir a tu solicitud HTTP.
   * **Cuerpo de la solicitud**: Añade el contenido del cuerpo de tu solicitud HTTP. Para cargar archivos en los pasos HTTP del navegador, el tamaño del cuerpo está limitado a 3 MB, mientras que el cuerpo de la solicitud tiene un límite de tamaño máximo de 50 KB.

   {{% /tab %}}

   {{% tab "Proxy" %}}

   * **Proxy URL** (URL del proxy): especifica la URL del proxy por la que debe pasar la solicitud HTTP (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
   * **Proxy Header** (Encabezado del proxy): añade encabezados para incluir en la solicitud HTTP al proxy.

   {{% /tab %}}

   {{% tab "Privacidad" %}}

   * **Do not save response body** (No guardar el cuerpo de la respuesta): selecciona esta opción para evitar que se guarde el cuerpo de la respuesta durante la ejecución. Esto ayuda a garantizar que no se muestren datos confidenciales en los resultados del test, pero puede dificultar la resolución de problemas. Para conocer todas las recomendaciones de seguridad, consulta la [Seguridad de los datos de la monitorización Synthetic][1].

[1]: /es/data_security/synthetics
   {{% /tab %}}

   {{< /tabs >}}
   </br>

3. Haz clic en **Send** (Enviar) para probar la configuración de la solicitud. Aparecerá una vista previa de la respuesta.

{{< img src="mobile_app_testing/test_steps/http_mobile_request.png" alt="Realizar una solicitud HTTP" style="width:80%;" >}}

##### Añadir aserciones

Las aserciones definen cuál es el resultado esperado de un test. Después de hacer clic en **Send** (Enviar), se añaden aserciones básicas en `status code`, `response time` y `header` `content-type`, en función de la respuesta del test. En tests de navegador, las aserciones son opcionales para los pasos HTTP.

| Tipo            | Operador                                                                                                               | Tipo de valor                                               |
|-----------------|------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| `body`          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][11], [`xpath`][12] | _Cadena_ <br> _[Expresión regular][13]_ <br> _Cadena_, _[Expresión regular][13]_ |
| `header`        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                                       | _Cadena_ <br> _[Expresión regular][13]_                              |
| `response time` | `is less than`                                                                                                         | _Entero (ms)_                                           |
| `status code`   | `is`, `is not`                                                                                                         | _Entero_                                                |

Las solicitudes HTTP pueden descomprimir cuerpos con los siguientes encabezados `content-encoding`: `br`, `deflate`, `gzip` y `identity`.

- Si un test no contiene una aserción en el cuerpo de la respuesta, la carga útil del cuerpo cae y devuelve un tiempo de respuesta asociado para la solicitud dentro del límite de tiempo de espera establecido por el worker de Synthetics.

- Si un test contiene una aserción en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparecerá el error `Assertions on the body/response cannot be run beyond this limit`.

Puedes crear hasta 20 aserciones por paso al hacer clic en **New Assertion** (Aserción nueva) o hacer clic directamente en la vista previa de la respuesta.

{{< img src="synthetics/browser_tests/assertions.png" alt="Define aserciones para que tu test de navegador tenga éxito o falle" style="width:80%;" >}}

##### Extraer una variable de la respuesta

También puedes extraer una variable de la respuesta de tu solicitud HTTP analizando las cabeceras o el cuerpo de la respuesta. El valor de la variable se actualiza cada vez que se ejecuta el paso de solicitud HTTP. A continuación, puedes utilizar la variable en [pasos posteriores](#use-variables) de tu test de navegador.

Para empezar a analizar una variable, haz clic en **Extract a variable from response content** (Extraer una variable del contenido de la respuesta). A continuación, define la variable:

1. Ingresa un **Variable Name** (Nombre de variable). El nombre de tu variable debe tener al menos tres caracteres, y solo puede contener mayúsculas, números y guiones bajos.
2. Decide si quieres extraer tu variable de los encabezados o del cuerpo de la respuesta.

   * Extrae el valor de la **cabecera de la respuesta**: utiliza la cabecera de la respuesta completa de tu solicitud HTTP como valor de la variable o analízala con [`regex`][13].
   * Extrae el valor del **cuerpo de la respuesta**: utiliza el cuerpo de la respuesta completo de tu solicitud HTTP como valor de la variable o analízalo con [`regex`][13], [`JSONPath`][11] o [`XPath`][12].

{{< img src="synthetics/browser_tests/extracted_variable.png" alt="Variable extraída de la respuesta" style="width:80%;" >}}

### Acciones especiales

Puedes usar la [extensión de grabador de test de navegador de Datadog][3], para grabar y monitorizar la mayoría de los pasos asociados a los recorridos de los usuarios. Sin embargo, la extensión no graba de manera automática algunos pasos tales como **Hover** (Pasar el cursor), **Press Key** (Pulsar tecla), **Scroll** (Desplazarse) y **Wait** (Esperar).

Crea este paso de aserción de manera manual al hacer clic en **Special Actions** (Acciones especiales) y seleccionar un tipo de acción.

### Variables

Haz clic en **Variables** y selecciona un tipo de creación de variable en el menú desplegable. 

{{< img src="synthetics/browser_tests/variables.png" alt="Variables del test de navegador" style="width:60%;" >}}

Para aprender a usar variables en tus pasos, consulta [Usar variables](#use-variables).

#### Patrón

Puedes seleccionar una de las siguientes funciones integradas disponibles:

`{{ numeric(n) }}`
: Genera una cadena numérica con `n` dígitos.

`{{ alphabetic(n) }}`
: Genera una cadena alfabética con `n` letras.

`{{ alphanumeric(n) }}`
: Genera una cadena alfanumérica con `n` caracteres.

`{{ date(n unit, format) }}`
: Genera una fecha en uno de los formatos aceptados por Datadog, con un valor correspondiente a la fecha UTC en la que se inicia el test en + o - `n` unidades.

`{{ timestamp(n, unit) }}` 
: Genera una marca de tiempo en una de las unidades aceptadas por Datadog, con un valor correspondiente a la marca de tiempo UTC con la que se inicia el test en + o - `n` unidades.

`{{ uuid }}`
: Genera un identificador único universal (UUID) de la versión 4.

Para enmascarar los valores de las variables locales en los resultados del test, selecciona **Ocultar y enmascarar el valor de la variable**. Una vez definida la cadena de la variable, haz clic en **Añadir variable**.

#### Elemento

Crea una variable a partir de contenido como `span` o `div` al extraer el texto del elemento.

#### Cuerpo del correo electrónico

Crea una variable a partir del cuerpo del correo electrónico con uno de los siguientes métodos: [`regex`][13] o [`Xpath`][12].

* [`Regex`][13] busca y devuelve el primer patrón coincidente (por ejemplo, `/*./`) del cuerpo con texto sin formato del correo electrónico. Si no se encuentra el patrón, busca en el cuerpo de HTML.

* [`Xpath`][12] solo se puede aplicar cuando el correo electrónico contiene un cuerpo de HTML. Devuelve el contenido de la localización correspondiente (por ejemplo, `$`).

#### JavaScript

Los pasos de JavaScript admiten tanto código síncrono como asíncrono. Dado que los tests de navegador cargan JavaScript externo al añadir el script a la página, solo funcionan si tu sitio web acepta JavaScript externo.

La función de JavaScript cuenta con los siguientes parámetros y requiere una instrucción de retorno (return).

* La instrucción `return` (obligatoria) devuelve el valor que quieres asociar a tu variable de JavaScript. La instrucción puede devolver cualquier valor, pero lo convierte en una cadena de manera automática.

* `vars` (opcional): una cadena que contiene [variables](#use-variables) de tu test de navegador que puedes usar en tu código. Usa `vars.<YOUR_VARIABLE>` para hacer referencia a una variable de test de navegador en tu fragmento de JavaScript. Por ejemplo, si tu test de navegador ya incluye una variable `PRICE`, invócala en tu fragmento de JavaScript con `vars.PRICE`.

* `element` (opcional): El localizador del elemento en la página. Para configurarlo utiliza los botones **Select** (Seleccionar) y **Update** (Actualizar) del elemento de destino. El elemento seleccionado aprovecha automáticamente el algoritmo de multilocalización de test de navegador de Datadog.

{{< img src="synthetics/browser_tests/custom_java_script.mp4" alt="Variable de JavaScript del test de navegador" video="true" width="100%" >}}

Dado que las aserciones de JavaScript se ejecutan en el contexto de la página activa, estos pasos pueden acceder a todos los objetos definidos en dicha página (tales como bibliotecas, elementos integrados y variables globales). Para cargar bibliotecas externas, usa una promesa. 

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

Selecciona cualquier variable global definida en la [Configuración de la monitorización Synthetic][5].

#### Variable global: MFA

Selecciona cualquier variable global de MFA definida en la [Configuración de la monitorización Synthetic][5].

Este tipo de variable global almacena claves secretas de contraseñas de un solo uso basadas en el tiempo (TOTP), lo que te permite realizar tests de tus módulos de MFA y los flujos de trabajo protegidos con MFA. Para obtener más información, consulta [TOTPs para la autenticación multifactor (MFA) en tests de navegador][6].

#### Correo electrónico

Crea una dirección de correo electrónico de Datadog Synthetics que puedes usar en pasos de test para [confirmar si un correo electrónico se ha enviado correctamente][7] o [ir a un enlace en el correo electrónico][8], por ejemplo, para hacer clic en un enlace de confirmación.

Se genera un buzón de correo electrónico único en cada ejecución de test para evitar conflictos entre ejecuciones de test.

### Subtests

Puedes ejecutar tests de navegador en otros tests de navegador para reutilizar los flujos de trabajo existentes hasta dos niveles de anidamiento.

Para usar un test de navegador existente como subtest, haz clic en **Add New Subtest** (Añadir subtest nuevo), selecciona un test de navegador en el menú desplegable de la pestaña **From Existing Test** (Desde test existente) y haz clic en **Add Subtest** (Añadir subtest).

Para convertir los pasos de tu test de navegador actual en un subtest, haz clic en la pestaña **Extract From Steps** (Extraer desde pasos), selecciona los pasos grabados que quieres extraer y haz clic en **Convert to Subtest** (Convertir a subtest). De manera predeterminada, un subtest se ejecuta en secuencia con los pasos anteriores del test principal. 

{{< img src="synthetics/browser_tests/advanced_options/subtest.png" alt="Añadir un subtest en un test de navegador" style="width:60%;" >}}

Para anular las variables de los subtests en los tests principales, asegúrate de que las variables creadas en el nivel del test principal tengan los mismos nombres que las variables presentes en el subtest. Una variable siempre usa el valor que se le asignó en primer lugar. 

A fin de obtener más información sobre opciones avanzadas para subtests, consulta [Opciones avanzadas para pasos de test de navegador][9].

Si para ti no tiene sentido ejecutar un subtest de forma independiente, puedes detenerlo. El test se continúa invocando como parte de tu test principal y no se ejecuta de manera individual. Para obtener más información, consulta [Reutilización de los recorridos de tests de navegador en tu conjunto de tests][10].

## Gestionar el orden de los pasos

En lugar de reordenar de manera manual los pasos nuevos al arrastrar y soltar pasos individuales, puedes colocar el cursor en un paso de test en una fase concreta de la grabación e insertar pasos adicionales. 

1. Pasa el cursor por encima de un paso de test grabado y haz clic en el icono **Set Cursor** (Situar el cursor). Aparecerá una línea azul sobre el paso de test. 
2. Graba [pasos de test](#automatically-recorded-steps) adicionales o añade [pasos de manera manual](#manually-added-steps).
3. Cuando hayas terminado de añadir pasos adicionales sobre tus pasos de test, haz clic en **Clear Cursor** (Borrar el cursor) para salir.

{{< img src="synthetics/browser_tests/recording_cursor_step.mp4" alt="Sitúa el cursor sobre un paso de test para añadir pasos adicionales antes de este paso" video="true" width="100%" >}}

## Usar variables

Para ver todas las variables disponibles en los pasos añadidos de manera manual, escribe `{{` en el campo de entrada.

Para usar una variable en pasos grabados de manera automática, haz clic en el icono **Inject this variable** (Inyectar esta variable) para introducir el valor de la variable durante la grabación. 

{{< img src="synthetics/browser_tests/variable_input.mp4" alt="Haz clic en el paso de test para inyectar el valor en tu página de grabación" video="true" width="100%" >}}

Si a una variable se le asignan valores diferentes a lo largo de los pasos de test de navegador (por ejemplo, entre subtests), la variable usa de manera sistemática el valor que se le asignó en primer lugar.

Algunas variables solo se calculan en tiempo de ejecución, como por ejemplo una variable de una solicitud HTTP o un paso de JavaScript. Por ejemplo, supongamos que tienes un paso `Type text` que presenta `{{ <YOUR_VARIABLE_NAME> }}`. En la ejecución del test, `{{ <YOUR_VARIABLE_NAME> }}` se sustituye de manera sistemática por el valor asociado a tu variable. Para grabar un paso con una de estas variables, graba un paso con el valor real de la variable y sustituye el valor real por `{{ <YOUR_VARIABLE_NAME> }}` en la definición del paso antes de guardar tu test. 

### Utilizar múltiples variables

Puedes añadir múltiples variables a los pasos de registro de test del navegador.

En el registro de test del navegador, haz clic en el botón **+ Add Variable** (+ Añadir variable) para añadir una o varias variables al test:

  {{< img src="synthetics/browser_tests/extract_multiple_variables.png" alt="Definir una variable local desde variables globales" width="90%" >}}

En el registro de tu test de navegador, añade un registro por pasos y haz clic en **Extract variables from the response(optional)** (Extraer variables de la respuesta (opcional)) para extraer y utilizar las variables en tu test de navegador:

  {{< img src="synthetics/browser_tests/edit_test_extract_multiple_variables.png" alt="Inyección de una variable local en un campo durante un registro de navegador" width="90%" >}}

## Editar una grabación 

Para editar una grabación del navegador después de guardarla:

- Ve a [Synthetic Monitoring > Tests (Monitorización Synthetic > Tests)][14].
- Haz clic en un test de navegador guardado previamente.
- Haz clic en el icono de engranaje de la esquina superior derecha y, a continuación, en "Edit recording" (Editar grabación).
- Selecciona uno o varios pasos para eliminarlos o reproducirlos y, a continuación, haz clic en **Save & Quit** (Guardar y salir).

{{< img src="synthetics/browser_tests/edit_a_recording.png" alt="Editar una grabación del navegador y usar la función de selección múltiple"="70%" >}}


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