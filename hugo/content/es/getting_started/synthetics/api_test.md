---
description: Crea tests de API en Datadog para monitorizar tus endpoints de forma
  proactiva. Crea tests de API de uno o varios pasos con aserciones, configura alertas
  y soluciona problemas.
further_reading:
- link: /api/latest/synthetics/#create-an-api-test
  tag: API
  text: Crear un test de API mediante programación
- link: /synthetics/api_tests
  tag: Documentación
  text: Más información sobre los tests de API únicos
- link: /getting_started/synthetics/private_location
  tag: Documentación
  text: Más información sobre las localizaciones privadas
- link: /continuous_testing/cicd_integrations/
  tag: Documentación
  text: Descubre cómo activar los tests Synthetic desde tu pipeline de integración/distribución
    continuas (CI/CD)
- link: /synthetics/guide/identify_synthetics_bots
  tag: Documentación
  text: Descubre cómo identificar los bots Synthetic de los tests de API
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Más información sobre los monitores de test Synthetic
title: Empezando con los tests de API
---

## Información general

Los tests de API **monitorizan proactivamente** tus **servicios más importantes** para que estén disponibles en cualquier momento y desde cualquier lugar. Los [tests de API únicos][1] vienen en ocho subtipos que te permiten iniciar solicitudes en las diferentes capas de red de tus sistemas (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP` y `gRPC`). Los [tests de API multipaso][2] te permiten ejecutar tests de API en secuencia para monitorizar el tiempo de actividad de los recorridos clave a nivel de API.

## Crear un test de API único

Los tests HTTP monitorizan los endpoints de tu API, y te avisan cuando la latencia de la respuesta es alta o cuando no cumple con alguna de las condiciones que hayas definido, tales como el código de estado HTTP previsto, los encabezados de respuesta o el contenido del cuerpo de la respuesta.

Los siguientes ejemplos muestran cómo crear un [test HTTP][3], un subtipo de [tests de API única][1].

1. En el sitio Datadog, pasa el ratón por encima de **Experiencia digital** y selecciona **[Tests][4]** (en **Monitorización y tests Synthetic**).

2. Haz clic en **New Testt** (Nuevo test) > **[New API test][5]** (Nuevo test de API).

3. Puedes crear un test utilizando una de las siguientes opciones:

   - **Crea un test a partir de una plantilla**:

      1. Pasa el ratón por encima de una de las plantillas ya rellenadas y haz clic en **View Template** (Ver plantilla). Se abrirá un panel lateral en el que se mostrará la información de configuración rellenada previamente, que incluye: detalles de tests, detalles de solicitudes, aserciones, condiciones de alerta y parámetros de monitor.
      2. Haz clic en **+Create Test** (+Crear test) para abrir la página **Definir solicitud**, en la que podrás revisar y editar las opciones de configuración rellenadas previamente. Los campos presentados son idénticos a aquellos disponibles cuando se crea un test desde cero.
      3. Haz clic en **Save Details** (Guardar detalles) para enviar tu test de API. <br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Vídeo de la página de inicio del test de la API de Synthetic" video="true" >}}

   - **Crea un test desde cero**:

      1. Para crear un test desde cero, haz clic en la plantilla **+ Start from scratch** (+ Empezar desde cero) y selecciona el tipo de solicitud `HTTP`.

      2. Añade la URL del endpoint que quieres monitorizar. Si no sabes con qué empezar, puedes utilizar `https://www.shopist.io/`, una aplicación web de comercio electrónico de tests. Si utilizas la URL Shopist de test, el nombre de tu test se rellena automáticamente como `Test on shopist.io`.

      3. Opcionalmente, selecciona **Opciones avanzadas** para configurar opciones de solicitud personalizadas, certificados, credenciales de autenticación y crear [variables globales][6] or [variables locales][7] seguras para entradas dinámicas.

         **Nota**: Escribe `{{` en cualquier campo relevante para seleccionar una variable e inyectar su valor en tus opciones de test.

      4. Opcionalmente, puedes configurar etiquetas (tags) como `env:prod` y `app:shopist` en tu test. Las etiquetas te permiten mantener tu conjunto de tests organizado y encontrar rápidamente los tests que te interesan en la página de inicio.

      5. Haz clic en **Send** (Enviar) para activar un test de ejemplo.

         {{< img src="getting_started/synthetics/api-test-config-4.png" alt="Configuración de test de API" style="width:90%;">}}

      6. Haz clic en **Create Test** (Crear test) para enviar tu test de API.

### Definición de aserciones

Al hacer clic en **Send** (Enviar), se rellenan automáticamente las aserciones básicas sobre la respuesta de tu endpoint. Las aserciones definen qué es una ejecución de test satisfactoria.

En este ejemplo, se rellenan tres aserciones predeterminadas después de activar la ejecución del test de prueba:

{{< img src="getting_started/synthetics/assertions-example-2.png" alt="Aserciones predeterminadas" style="width:100%;">}}

Las aserciones son totalmente personalizables. Para añadir una aserción personalizada, haz clic en los elementos de la vista previa de la respuesta, como los encabezados, o haz clic en **New Assertion** (Nueva aserción) para definir una nueva aserción desde cero. 

{{< img src="getting_started/synthetics/api-test-configuration-2.mp4" alt="Ejemplo de configuración de test de API" video="true" >}}

### Seleccionar localizaciones

Selecciona una o varias **Localizaciones gestionadas** o **Localizaciones privadas** desde las que ejecutar tu test. {{% managed-locations %}}

La aplicación de Shopist está disponible públicamente en `https://www.shopist.io/`, por lo que puedes elegir cualquier localización gestionada desde la que ejecutar tu test. Para probar aplicaciones internas o simular el comportamiento del usuario en regiones geográficas concretas, mejor utiliza las [localizaciones privadas][8].

### Indicar la frecuencia del test

Selecciona la frecuencia con la que quieres que se ejecute tu test. Puedes mantener la frecuencia predeterminada de 1 minuto.

Además de ejecutar tu test Synthetic de forma programada, puedes activarlo manualmente o desde tus [pipelines de CI/CD][9].

### Definir las condiciones de alerta

Puedes definir las condiciones de alerta para asegurarte de que tu test no se active en situaciones como un incidente breve y esporádico en la red. De este modo, solo recibirás alertas en caso de que haya problemas reales con tu endpoint.

Puedes indicar el número de fallos consecutivos que deberían producirse antes de considerar que una localización ha fallado:

```text
Retry test 2 times after 300 ms in case of failure
```

También puedes configurar tu test para activar solo una notificación cuando el endpoint deje de funcionar durante cierto tiempo y en un número determinado de localizaciones. En el siguiente ejemplo, la regla de alerta está configurada para enviar una notificación si el test falla durante tres minutos en dos localizaciones distintas:

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### Configurar el monitor de tests

Redacta el mensaje de la alerta y añade la dirección de correo electrónico a la que deben enviarse las alertas del test. También puedes usar [integraciones de notificaciones][10] como Slack, PagerDuty, Microsoft Teams y webhooks. Para activar una alerta Synthetic para estas herramientas de notificación, primero deberás configurar la [integración][11] correspondiente.

Cuando estés listo para guardar la configuración y el monitor del test, haz clic en **Create** (Crear).

## Crear un test de API multipaso

Los [test de API multipaso][2] te permiten monitorizar las transacciones empresariales clave en la API. 

{{< img src="getting_started/synthetics/multistep-api-test.png" alt="Información general de un test de API multipaso de Synthetics" style="width:100%;" >}}

De forma similar a los [tests de API][3], los tests de API multipaso te avisan cuando tus endpoints funcionan demasiado lentos o no cumplen alguna de las condiciones que has definido. Puedes crear variables a partir de respuestas de pasos individuales y volver a introducir tus valores en pasos posteriores, encadenando pasos de forma que imiten el comportamiento de tu aplicación o servicio.

El test de ejemplo que puedes ver a continuación muestra cómo se crea un test de API multipaso que monitorice la adición de un elemento a un carrito. Este test consta de tres pasos:

- Obtención de un carrito
- Obtención de un producto
- Adición del producto al carrito

Si no sabes en qué endpoints de la API crear tu test de API multipaso, utiliza los endpoints de ejemplo que aparecen a continuación.

Para crear un test de API multipaso nuevo, haz clic en **New Test** (Nuevo test) > **[Multistep API test][12]** (Test de API multipaso). Añade un nombre de test, como por ejemplo `Añadir un producto al carrito`, incluye etiquetas y selecciona localizaciones.

### Obtener un carrito

1. En **Define steps** (Definir pasos), haz clic en **Create Your First Step** (Crear tu primer paso).
2. Añade un nombre a tu paso. Ejemplo: `Obtener un carrito`.
3. Especifica el método HTTP y la URL que deseas consultar. Puedes introducir `POST` y `https://api.shopist.io/carts`.
4. Haz clic en **Test URL** para crear un elemento de carrito en el backend de la aplicación de Shopist.
5. Puedes mantener las aserciones predeterminadas o modificarlas.
6. Si lo deseas, puedes definir los parámetros de ejecución.

    Si seleccionas **Continue with test if this step fails** (Continuar con el test si este paso sale mal), podrás asegurarte de que se comprueba una recopilación completa de endpoints o de que se ha ejecutado el último paso de la limpieza, independientemente de que los pasos anteriores hayan salido bien o mal. La función del paso **Retry** (Reintentar) es útil en situaciones en las que sabes que el endpoint de la API puede tardar algún tiempo en responder. 

    En este ejemplo, no se necesita ningún parámetro de ejecución en concreto. 

7. Para crear una variable a partir del valor del ID del carrito situado al final del encabezado `location`:
    - Haz clic en **Extract a variable from response content** (Extraer una variable del contenido de la respuesta).
    - Ponle a tu variable el nombre `CART_ID`.
    - En **Response Header** (Encabezado de la respuesta), selecciona `location`.
    - En el campo **Parsing Regex** (Expresión regular de parseo), añade una expresión habitual, como `(?:[^\\/](?!(\\|/)))+$`.

   {{< img src="getting_started/synthetics/multistep-test-extract-variables.png" alt="Variable extraída del contenido de la respuesta" style="width:100%;" >}}

8. Haz clic en **Save Variable** (Guardar variable).
9. Cuando hayas terminado de crear este paso de test, haz clic en **Save Step** (Guardar paso).

### Obtener un producto

1. En **Define another step** (Definir otro paso), haz clic en **Add Another Step** (Añadir otro paso). Por defecto, puedes crear un máximo de diez pasos.
2. Ponle un nombre a tu paso. Ejemplo: `Obtener un producto`.
3. Especifica el método HTTP y la URL que deseas consultar. Aquí, puedes añadir: `GET` y `https://api.shopist.io/products.json`.
4. Haz clic en **Test URL** para obtener una lista de los productos disponibles en la aplicación de Shopist.
5. Puedes mantener las aserciones predeterminadas o modificarlas.
6. Opcionalmente, define los parámetros de ejecución. En este ejemplo, no se necesita ningún parámetro de ejecución en concreto.
7. Para crear una variable a partir del ID del producto que se encuentra en el cuerpo de la respuesta:
    - Haz clic en **Extract a variable from response content** (Extraer una variable del contenido de la respuesta).
    - Ponle a tu variable el nombre `PRODUCT_ID`.
    - Haz clic en la pestaña **Response Body** (Cuerpo de la respuesta).
    - Haz clic en la clave `$oid` de cualquier producto para generar una ruta JSON, como `$[0].id['$oid']`.
8. Haz clic en **Save Variable** (Guardar variable).
9. Cuando hayas terminado de crear este paso de test, haz clic en **Save Step** (Guardar paso).

### Añadir un producto al carrito

1. Haz clic en **Add Another Step** (Añadir otro paso) para realizar el último paso, es decir, añadir un producto a tu carrito.
2. Añade un nombre a tu paso. Ejemplo: `Añadir un producto al carrito`.
3. Especifica el método HTTP y la URL que deseas consultar. Aquí, puedes añadir: `POST` y `https://api.shopist.io/add_item.json`.
4. En la pestaña **Request Body** (Cuerpo de la solicitud), elige el tipo de cuerpo `application/json` e inserta lo siguiente:

    {{< code-block lang="java" disable_copy="true" collapsible="true" >}}
    {
      "cart_item": {
        "product_id": "{{ PRODUCT_ID }}",
        "amount_paid": 500,
        "quantity": 1
      },
      "cart_id": "{{ CART_ID }}"
    } 
    {{< /code-block >}}

5. Haz clic en **Test URL** para añadir el producto extraído en el paso 2 al carrito que has creado en el paso 1 y devolver una URL para proceder al pago.
6. En **Add assertions (optional)** (Añadir aserciones [opcional]), haz clic en **Response Body** (Cuerpo de la respuesta) y en la tecla `url` para que tu test confirme que el recorrido ha finalizado con una respuesta que contiene la URL de pago.
7. En este último paso, no se necesitan parámetros de ejecución ni extracciones de variables.
10. Cuando hayas terminado de crear este paso de test, haz clic en **Save Step** (Guardar paso).

{{< img src="getting_started/synthetics/defined-steps.png" alt="Pasos del test creados" style="width:100%;" >}}

A continuación, puedes configurar el resto de las condiciones del test, tales como la frecuencia y las condiciones de alerta, así como el monitor del test. Cuando estés listo para guardar la configuración y el monitor de tu test, haz clic en **Create** (Crear).

Para más información, consulta [Usar monitores de tests Synthetic][13].

## Consultar los resultados del test

En las páginas **API test** (Test de API) y **Multistep API test detail** (Detalles del test de API multipaso), encontrarás la información general de la configuración del test, el tiempo de actividad global asociado a los endpoints del test según su localización, los gráficos con el tiempo de respuesta y los tiempos de red, así como una lista de los resultados y eventos del test.

Para solucionar un problema de un test fallido, baja hasta **Test Results** (Resultados del test) y haz clic en un resultado del test que salió mal. Para diagnosticar el problema, revisa las aserciones fallidas y los detalles de la respuesta, tales como el código de estado, el tiempo de respuesta, así como los encabezados y el cuerpo asociados.

{{< img src="getting_started/synthetics/api-test-failure-5.png" alt="Fallo en el test de API" style="width:100%;">}}

Consulta la traza (trace) generada a partir de la ejecución del test fallido en la pestaña **Trazas** y descubre la causa raíz mediante la [integración de APM con la monitorización Synthetic][14] de Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/api_tests/
[2]: /es/synthetics/multistep
[3]: /es/synthetics/api_tests/http_tests
[4]: https://app.datadoghq.com/synthetics/tests
[5]: https://app.datadoghq.com/synthetics/create
[6]: /es/synthetics/settings/#global-variables
[7]: /es/synthetics/api_tests/http_tests#variables
[8]: /es/getting_started/synthetics/private_location
[9]: /es/synthetics/ci
[10]: /es/integrations/#cat-notification
[11]: https://app.datadoghq.com/account/settings
[12]: https://app.datadoghq.com/synthetics/multi-step/create
[13]: /es/synthetics/guide/synthetic-test-monitors
[14]: /es/synthetics/apm/
[15]: /es/synthetics/api_tests/grpc_tests