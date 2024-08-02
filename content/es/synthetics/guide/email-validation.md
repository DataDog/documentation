---
description: Verifica el correo electrónico y su contenido con los pasos de los tests
  de navegador
further_reading:
- link: /synthetics/browser_tests/actions
  tag: Documentación
  text: Pasos de los tests de navegador
- link: /synthetics/browser_tests/advanced_options/
  tag: Documentación
  text: Configurar opciones avanzadas en los pasos
title: Validar correos electrónicos con tests de navegador
---

## Información general

Es frecuente que en los recorridos de las aplicaciones se envíen correos electrónicos a los buzones de los usuarios, como ocurre cuando se pide verificar el correo electrónico después de crear una cuenta, cuando se envía un mensaje para cambiar de contraseña porque se ha olvidado la anterior, cuando se envía un correo para confirmar un pedido o cuando se recibe una confirmación después de enviar datos mediante un formulario de contacto. 

Para que la experiencia de usuario de tu sitio web no pierda calidad, es preciso que te asegures de que los mecanismos de correo electrónico de tu aplicación funcionan como es debido.

## Crear una variable de correo electrónico

Para añadir una variable de correo electrónico llamada `EMAIL`, sigue estos pasos:

1. Haz clic en **Variables** y selecciona **Email** (Correo electrónico) en el menú desplegable.
2. Haz clic en **Add Variable** (Añadir variable) para que puedas usar la variable cuando empieces a grabar. 

{{< img src="synthetics/guide/email-validation/adding-variable.mp4" alt="Crear una variable de correo electrónico" video="true" width="100%">}}

La variable de correo electrónico genera un buzón único de cuyo mantenimiento se encarga Datadog cada vez que se ejecuta el test, lo que permite que los tests de navegador se desarrollen sin ningún conflicto.

## Grabar los pasos

Cuando has creado la variable de correo electrónico, puedes [confirmar que el correo electrónico se ha enviado correctamente](#confirm-the-email-was-sent) después de haberse activado en la aplicación.

Haz clic en **Start Recording** (Iniciar grabación) y graba todos los pasos que hacen que el correo se active con la variable de correo electrónico. Haz clic en el icono de la mano de una de las variables para introducir su valor en la entrada de texto de un formulario o un campo.

{{< img src="synthetics/guide/email-validation/record-steps.mp4" alt="Grabar los pasos" video="true" width="100%">}}

Después de haber grabado los pasos para completar el formulario, haz clic en el botón **Sign Up** (Registro) para activar una notificación por correo electrónico. Con ello, se envía un mensaje específico de la sesión de grabación al buzón de Datadog; por ejemplo, `838-n3q-q2y.6238933596@synthetics.dtdg.co`.

### Confirmar que se ha enviado el correo electrónico

Para confirmar que se ha enviado el correo electrónico, haz clic en **Assertion** (Aserción) y selecciona **Test that an email was received** (Comprobar que se ha recibido un correo electrónico). Si quieres asegurarte de que el contenido del correo electrónico se adhiere a unas directrices concretas, puedes añadir más verificaciones que engloben el asunto y el cuerpo.

{{< img src="synthetics/guide/email-validation/assertion-step.mp4" alt="Añadir una aserción" video="true" width="100%">}}

En este ejemplo, la aserción da buen resultado si el asunto es `Welcome to Shopist!`, si el cuerpo contiene `Your verification code is...` y si el código de verificación se ajusta a la expresión regular `\d{1,6}`.

### Desplazarse por los enlaces de un correo electrónico

Para que el test de navegador se desplace por los enlaces incluidos en los correos electrónicos que se envían, haz lo siguiente:

1. Haz clic en **Navigation** (Navegación) y selecciona **Go to email and click link** (Ir al correo electrónico y hacer clic en un enlace). Haz clic en **Next** (Siguiente).
2. En el buzón aparecerá el correo electrónico que contiene los enlaces que quieres probar. Haz clic en **Next** (Siguiente).  
3. Selecciona el enlace al que quieres que vaya el test de navegador. La URL del iframe o de la ventana emergente cambia inmediatamente a la del enlace especificado. Haz clic en **Save Navigation Step** (Guardar paso de navegación).
4. El iframe redirige a la URL de la página asociada. Sigue grabando los pasos del test.

En este ejemplo, el test de navegador mira en el correo electrónico `Welcome to Shopist`, hace clic en el enlace `Verify your email by clicking here` y confirma que el mecanismo de registro del usuario funciona como está previsto.

{{< img src="synthetics/guide/email-validation/navigation-step.mp4" alt="Añadir un paso de navegación" video="true" width="100%">}} 

Para finalizar el test de navegador, crea una aserción que confirme que el contenido de `div` activa la verificación de cuenta correcta. Por ejemplo, que la página contiene `Your account is now verified`.


## Leer más

{{< partial name="whats-next/whats-next.html" >}}