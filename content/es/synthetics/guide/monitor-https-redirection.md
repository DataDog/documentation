---
further_reading:
- link: /synthetics/api_tests/http_tests
  tag: Documentación
  text: Crear un test de HTTP
title: Monitorizar tus solicitudes HTTP se redirigen a HTTPS
---

## Información general

Verificar que el tráfico se redirige de HTTP a HTTPS es vital para que las conexiones de los usuarios queden cifradas en los endpoints de API y en tu aplicación.

### Verificar el redireccionamiento a HTTPS

Aunque depende de la instalación, generalmente se puede ver el redireccionamiento a HTTPS en la pestaña **Response Preview** (Vista previa de la respuesta) que se genera; se muestra en el campo `location` de **Headers** (Encabezados) o como `"https:"===window.location.protocol` en **Body** (Cuerpo).

Para verificar que el tráfico se redirecciona de HTTP a HTTPS, sigue estos pasos:

1. Crea un test de HTTP y [configura la solicitud][1].
2. Haz clic en **Test URL** (Probar URL). Para que puedas hacerte una idea de cómo es la respuesta, se generan las pestañas **Request Preview** (Vista previa de la solicitud) y **Response Preview** (Vista previa de la respuesta).
3. Añade una aserción sobre el redireccionamiento a HTTPS.
    - Haz clic en el encabezado `location` de la vista previa de la respuesta para definir la aserción del encabezado `location`. Por ejemplo, en **Headers** (Encabezados), el encabezado `location` de `http://datadoghq.com` es `https://datadoghq.com`.

    {{< img src="synthetics/guide/monitor-https-redirections/location-header-https.png" alt="Encabezado 'location' en la vista previa de la respuesta" style="width:100%;" >}}
    - También puedes definir una aserción en el cuerpo de la respuesta. Para ello, haz clic en **+ New Assertion** (Nueva aserción), selecciona `body` y `contains`, y pega `"https:"===window.location.protocol` en el campo de texto. 
    {{< img src="synthetics/guide/monitor-https-redirections/https-assertion.png" alt="Define la aserción" style="width:100%;" >}}

Termina de crear el test de HTTP y guárdalo.

Una vez definida la notificación correspondiente, Datadog te podrá avisar cada vez que el tráfico no se redirija de HTTP a HTTPS correctamente.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/synthetics/api_test/#define-request