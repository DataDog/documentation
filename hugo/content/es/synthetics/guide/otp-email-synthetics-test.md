---
description: Aprende a extraer un OTP del cuerpo de un correo electrónico utilizando
  tests de navegador de Synthetic.
further_reading:
- link: /synthetics/browser_tests/?tab=requestoptions#overview
  tag: Documentación
  text: Más información sobre tests de navegador de Synthetic
- link: /synthetics/api_tests/http_tests#variables
  tag: Documentación
  text: Más información sobre las variables de test Synthetic
- link: /synthetics/guide/email-validation
  tag: Documentación
  text: Más información sobre la validación del correo electrónico en los tests de
    navegador
- link: /synthetics/troubleshooting/?tab=common
  tag: Documentación
  text: Solución de problemas de Synthetic Monitoring
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Prácticas recomendadas para la creación de tests de extremo a extremo
title: Extraer un código de acceso de único uso del cuerpo de un correo electrónico
  utilizando test de navegador de Synthetic
---

<div class="alert alert-info">La extracción de contraseñas de único uso del cuerpo de un correo electrónico sólo es compatible con los tests de navegador de Synthetic.</div>

## Información general

Los tests de navegador de Synthetic se utilizan para monitorizar tus aplicaciones mediante la reproducción de cómo tus clientes experimentan tus páginas web de extremo a extremo. Cuando testees un flujo de registro o inicio de sesión, incorpora a tu test un código de acceso de único uso (OTP) enviado a una dirección de correo electrónico para la autenticación. Este token OTP se puede extraer del cuerpo de un correo electrónico para testearlo dentro de una aplicación.

Esta guía te muestra cómo configurar la extracción de OTP para un test de navegador de Synthetic.

## Configuración

### Paso 1: crear una variable de correo electrónico

Sigue los pasos que se indican a continuación para crear una variable de correo electrónico para el [test del navegador][3]. Esto genera una [dirección de correo electrónico de Datadog Synthetic][7] única para la ejecución del test de Synthetic.

1. En un test de navegador nuevo o existente, en **Variables** haz clic en **Add Variable** (Añadir variable).
2. A continuación, selecciona **Email Address** (Dirección de correo electrónico) en el menú desplegable.
3. Asigna un nombre a la variable y haz clic en **Create** (Crear).

   {{< img src="synthetics/guide/otp-from-email-body/email_variable.png" alt="Añadir una variable de correo electónico único" style="width:80%;" >}}

   Esto añade la variable de correo electrónico a la sección **Variables** de la interfaz de usuario:

   {{< img src="synthetics/guide/otp-from-email-body/email_var_example.png" alt="Variable de correo electrónico de ejemplo en la interfaz de usuario" style="width:50%;" >}}

### Paso 2: inyectar la variable de dirección de correo electrónico

A continuación, [registra los pasos][11] para insertar la variable de dirección de correo electrónico en un campo de entrada para imitar cómo un usuario añadiría la dirección de correo electrónico dentro de tu aplicación.

{{< img src="synthetics/guide/otp-from-email-body/email_injection.mp4" alt="Ejemplo de registro de los pasos de inyección de direcciones de correo electrónico" video="true" width="100%">}}

1. En primer lugar, haz clic en **Record** (Registrar) en la parte superior del test. Esto añade automáticamente pasos al test basándose en las interacciones y entradas detectadas.
2. Haz clic en el campo de entrada de correo electrónico, lo que crea un paso **Click** (Clic).
3. Busca la variable de correo electrónico creada anteriormente, llamada `DD_EMAIL_ADDRESS` en este ejemplo. A la derecha, haz clic en **Inject variable in a text input** (Inyectar variable en una entrada de texto) y haz clic en el cuadro de texto deseado, que aparece resaltado en la interfaz de usuario. El correo electrónico se inserta.

   {{< img src="synthetics/guide/otp-from-email-body/synthetics-otp-inject-variable.png" alt="Inyectar la variable de correo electrónico" style="width:60%;" >}}

Una vez enviado el correo electrónico que contiene el OTP, el test de navegador puede acceder al cuerpo del correo electrónico para utilizarlo en el resto del flujo de registro.

### Paso 3: extraer el OTP del cuerpo del correo electrónico

El siguiente paso consiste en definir un paso de test que extraiga el OTP del cuerpo del correo electrónico una vez enviado y lo almacene en una variable. En este ejemplo, la variable se denomina `OTP_FROM_EMAIL` para su posterior consulta en la guía. 

1. En **Add a variable** (Añadir una variable), selecciona **from Email body** (del cuerpo del correo electrónico).

{{< img src="synthetics/guide/otp-from-email-body/otp_from_email.png" alt="Variable OTP como se usa en el paso del cuerpo del correo electrónico" style="width:50%;" >}}

2. En **Parsing Regex** (Expresión regular de parseo), añade el patrón de expresión regular que corresponda al OTP.

A continuación, se muestran patrones de expresión regular de ejemplo para analizar el token OTP del cuerpo del correo electrónico:

| **Tipo**                           | **Ejemplo**                                  | **Regla de expresión regular**                           |
|:-----------------------------------|:---------------------------------------------|:-----------------------------------------|
| OTP de 4 dígitos                        | 1234                                         | `/[0-9]{4,4}/`                           |
| OTP de 6 dígitos                        | 123456                                       | `/[0-9]{6,6}/`                           |
| 5 caracteres                        | abcde                                        | `/[a-z]{5,5}/`                           |
| OTP alfanumérico                 | a1b2cd34                                     | `/[a-zA-Z0-9]{8,8}/`                       |

El OTP será almacenado en la variable para ser usado en tu test de navegador.

### Paso 4: utilizar una aserción de JavaScript para insertar el OTP

JavaScript te permite desencadenar un evento en un elemento DOM mediante programación, lo que hace posible imitar las interacciones del usuario u otros eventos. Según cómo estés creado tu elemento de entrada, el envío de un evento puede ser necesario para habilitar comportamientos personalizados o testear oyentes de eventos vinculados al elemento. Puedes utilizar una aserción de JavaScript para añadir el OTP guardado del correo electrónico e insertarlo en tu aplicación.

1. Añade un [paso  de aserción de JavaScript][5] para introducir la variable de OTP almacenada, en nuestro ejemplo `OTP_FROM_EMAIL`, en el campo apropiado de tu aplicación. 

   {{< img src="synthetics/guide/otp-from-email-body/js_assertion.png" alt="Aserción de Javascript" style="width:50%;" >}}

2. En **Custom JavaScript** (JavaScript personalizado) añade el código de extracción. El formato del código varía en función de si el OTP se inserta en un campo de texto simple o en los respectivos campos de entrada. A continuación, se muestran ejemplos que ilustran ambos escenarios:

#### Campo de texto simple
Para insertar la OTP en un campo de texto simple, utiliza lo siguiente:
{{< code-block lang="java" disable_copy="false" >}}
function (vars, element) {
  element.setAttribute('value', vars.OTP_FROM_EMAIL);
  element.dispatchEvent(new Event("input", { bubbles: true }));
  return true;
}
{{< /code-block >}}

A continuación, se muestra un ejemplo visual de una configuración OTP con un simple campo de texto para el que se puede utilizar la consulta anterior:

{{< img src="synthetics/guide/otp-from-email-body/simple_otp.png" alt="example of an otp with a simple text field" style="width:40%;" caption="Ejemplo de un OTP con un campo de texto simple" >}}

**Nota**: En ambos ejemplos de JavaScript, debes sustituir el campo `OTP_FROM_EMAIL` por el nombre de la variable de correo electrónico que hayas definido si se denomina de otro modo en el test de navegador.

#### Campos de entrada respectivos
Para insertar el OTP en campos definidos por separado, utiliza lo siguiente:
{{< code-block lang="java" disable_copy="false" >}}
function (vars) {
  const inputList = document.querySelectorAll('input');
  inputList.forEach((element) => {
      element.setAttribute('value', vars.OTP_FROM_EMAIL);
      element.dispatchEvent(new Event("input", { bubbles: true }));
  });
  return true;
}
{{< /code-block >}}

A continuación, se muestra un ejemplo visual de una configuración OTP con campos definidos por separado para los que se puede utilizar la consulta anterior:

{{< img src="synthetics/guide/otp-from-email-body/bubble_otp.png" alt="Ejemplo de un OTP con campos numéricos individuales" style="width:40%;" caption="Ejemplo de un OTP con los campos de entrada respectivos" >}}

## Siguientes pasos

Una vez insertado y verificado el OTP, puedes continuar añadiendo pasos a tu test de navegador para verificar que el usuario ha completado el flujo de registro de tu aplicación, como añadir una [aserción][6] de que un texto específico está presente en la página.
Desde aquí, puedes continuar [registrando el resto de tu test de navegador][9] y luego verificar tus [resultados del test de navegador][10].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/browser_tests/?tab=requestoptions#create-local-variables
[2]: https://app.datadoghq.com/synthetics/settings/variables
[3]: https://app.datadoghq.com/synthetics/browser/create
[4]: /es/synthetics/settings/?tab=specifyvalue#global-variables
[5]: /es/synthetics/browser_tests/actions/?tab=testanelementontheactivepage#javascript
[6]: /es/synthetics/browser_tests/actions/?tab=testanelementontheactivepage#assertion
[7]: /es/synthetics/browser_tests/actions/?tab=testanelementontheactivepage#email
[8]: /es/synthetics/guide/email-validation/#create-an-email-variable
[9]: /es/synthetics/browser_tests/actions?tab=testanelementontheactivepage
[10]: /es/synthetics/browser_tests/test_results
[11]: /es/synthetics/browser_tests/actions?tab=testanelementontheactivepage#automatically-recorded-steps