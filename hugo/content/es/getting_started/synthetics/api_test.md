---
description: Cree pruebas de Datadog API para hacer un seguimiento proactivo de sus
  puntos de conexión. Cree pruebas de API individuales y pruebas de API en varios
  pasos con aserciones, configure alertas y solucione problemas.
further_reading:
- link: /api/latest/synthetics/#create-an-api-test
  tag: API
  text: Cree una prueba de API mediante programación.
- link: /synthetics/api_tests
  tag: Documentación
  text: Más información sobre las pruebas de API individuales
- link: /getting_started/synthetics/private_location
  tag: Documentación
  text: Más información sobre ubicaciones privadas
- link: /continuous_testing/cicd_integrations/
  tag: Documentación
  text: Aprenda a activar pruebas Synthetic desde su canalización de CI/CD
- link: /synthetics/guide/identify_synthetics_bots
  tag: Documentación
  text: Aprenda a identificar bots Synthetic para pruebas de API.
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Obtenga información sobre los monitores de prueba Synthetic
- link: /synthetics/guide/export-tests-to-terraform
  tag: Guía
  text: Exportar pruebas Synthetic a Terraform
title: Introducción a las pruebas de API
---
## Descripción general {#overview}

Las pruebas de API **hacen un seguimiento proactivo** de que sus **servicios más importantes** estén disponibles en cualquier momento y desde cualquier lugar. Las [pruebas de API individuales][1] vienen en ocho subtipos que le permiten lanzar solicitudes en las diferentes capas de red de sus sistemas (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP` y `gRPC`). Las [pruebas de API en varios pasos][2] le permiten ejecutar pruebas de API en secuencia para hacer un seguimiento del tiempo de actividad de los recorridos clave a nivel de API.

## Cree una prueba de API individual {#create-a-single-api-test}

Las pruebas HTTP hacen un seguimiento de los puntos de conexión de API y le alertan cuando la latencia de respuesta es alta o no cumple con las condiciones que usted defina, como el código de estado HTTP esperado, los encabezados de respuesta o el contenido del cuerpo de la respuesta.

Los ejemplos a continuación demuestran cómo crear una [prueba HTTP][3], un subtipo de [pruebas de API individuales][1].

1. En el sitio de Datadog, pase el cursor sobre {{< ui >}}Digital Experience{{< /ui >}} y seleccione [{{< ui >}}Tests{{< /ui >}}][4] (bajo {{< ui >}}Synthetic Monitoring & Testing{{< /ui >}}).

2. Haga clic en {{< ui >}}New Test{{< /ui >}} > [{{< ui >}}New API test{{< /ui >}}][5].

3. Puede crear una prueba utilizando una de las siguientes opciones:

   - **Cree una prueba a partir de una plantilla**:

      1. Pase el cursor sobre una de las plantillas precargadas y haga clic en {{< ui >}}View Template{{< /ui >}}. Esto abre un panel lateral que muestra información de configuración precargada, incluyendo: Detalles de la prueba, Detalles de la solicitud, Aserciones, Condiciones de alerta y Configuración del monitor.
      2. Haga clic en {{< ui >}}+Create Test{{< /ui >}} para abrir la página {{< ui >}}Define Request{{< /ui >}}, donde puede revisar y editar las opciones de configuración prellenadas. Los campos presentados son idénticos a los disponibles al crear una prueba desde cero.
      3. Haga clic en {{< ui >}}Save Details{{< /ui >}} para enviar su prueba de API.<br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Video de la página de inicio de la prueba de API de Synthetics con plantillas" video="true" >}}

   - **Cree una prueba desde cero**:

      1. Para crear una prueba desde cero, haga clic en la plantilla {{< ui >}}+ Start from scratch{{< /ui >}}, luego seleccione el tipo de solicitud `HTTP`.

      2. Agregue la URL del punto de conexión que desea hacer un seguimiento. Si no sabe por dónde empezar, puede usar `https://www.shopist.io/`, una aplicación web de comercio electrónico de prueba. Si usa la URL de prueba de Shopist, el nombre de su prueba se completa automáticamente como `Test on shopist.io`.  

      3. Opcionalmente, seleccione {{< ui >}}Advanced Options{{< /ui >}} para establecer opciones de solicitud personalizadas, agregar certificados y credenciales de autenticación, y crear [variables globales][6] o [variables locales][7] seguras para entradas dinámicas.

         **Nota**: Escriba `{{` en cualquier campo relevante para seleccionar una variable e insertar su valor en las opciones de su prueba. 
          
      4. Optionally, set tags such as `env:prod` and `app:shopist` on your test. Tags allow you to keep your test suite organized and quickly find tests you're interested in on the homepage.

      5. Click {{< ui >}}Send{{< /ui >}} to trigger a sample test run.

         {{< img src="getting_started/synthetics/api-test-config-4.png" alt="Configuración de prueba de API" style="width:90%;">}}

      6. Click {{< ui >}}Create Test{{< /ui >}} to submit your API test.

### Defina aserciones {#define-assertions}

Hacer clic en {{< ui >}}Send{{< /ui >}} completa automáticamente las aserciones básicas sobre la respuesta de su punto de conexión. Las aserciones definen qué constituye una ejecución de prueba exitosa.

En este ejemplo, tres aserciones predeterminadas se completan después de activar la ejecución de prueba de muestra:

{{< img src="getting_started/synthetics/assertions-example-2.png" alt="Aserciones predeterminadas" style="width:100%;">}}

Las aserciones son totalmente personalizables. Para agregar una aserción personalizada, haga clic en los elementos de la vista previa de la respuesta, como los encabezados, o haga clic en {{< ui >}}New Assertion{{< /ui >}} para definir una nueva aserción desde cero. 

{{< img src="getting_started/synthetics/api-test-configuration-2.mp4" alt="Ejemplo de configuración de prueba de API" video="true" >}}

### Seleccione ubicaciones {#select-locations}

Seleccione una o más {{< ui >}}Managed Locations{{< /ui >}} o {{< ui >}}Private Locations{{< /ui >}} desde las cuales ejecutar su prueba. {{% managed-locations %}}

La aplicación Shopist está disponible públicamente en `https://www.shopist.io/`, por lo que puede elegir cualquier ubicación administrada desde la cual ejecutar su prueba. Para probar aplicaciones internas o simular el comportamiento del usuario en regiones geográficas discretas, utilice [ubicaciones privadas][8] en su lugar.

### Especifique la frecuencia de la prueba {#specify-test-frequency}

Seleccione la frecuencia con la que desea que se ejecute su prueba. Puede dejar la frecuencia predeterminada de 1 minuto.

Además de ejecutar su prueba Synthetic según un horario, puede activarla manualmente o directamente desde sus [CI/CD pipelines][9]. 

### Defina las condiciones de alerta {#define-alert-conditions}

Puede definir condiciones de alerta para asegurarse de que su prueba no se active por cosas como una falla de red esporádica, de modo que solo reciba alertas en caso de problemas reales con su punto de conexión.

Puede especificar el número de fallas consecutivas que deben ocurrir antes de considerar que una ubicación falló:

```text
Retry test 2 times after 300 ms in case of failure
```

También puede configurar su prueba para que solo active una notificación cuando su punto de conexión deje de funcionar durante una cierta cantidad de tiempo y número de ubicaciones. En el siguiente ejemplo, la regla de alerta está configurada para enviar una notificación si la prueba falla durante tres minutos en dos ubicaciones diferentes:

```text
An alert is triggered if your test fails for 3 minutes from any 2 of 13 locations
```

### Configure el seguimiento de prueba {#configure-the-test-monitor}

Utilice esta sección para crear el **mensaje** que desea enviar con la notificación. La notificación incluye su mensaje personalizado y detalles sobre cualquier ubicación con fallas. Los mensajes de seguimiento prellenados se incluyen en el cuerpo del mensaje:

{{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="Sección de seguimiento de Synthetic Monitoring, que destaca los mensajes de seguimiento prellenados" style="width:100%;" >}}

Por ejemplo, el siguiente mensaje de seguimiento crea un seguimiento que itera sobre los pasos y extrae variables para pruebas de navegador:

   ```text
   {{! Liste las variables extraídas en todos los pasos exitosos }}
   # Variables extraídas
   {{#each synthetics.attributes.result.steps}}
   {{#if extractedValue}}
   * **Nombre**: `{{extractedValue.name}}`
   **Valor:** {{#if extractedValue.secure}}*Ofuscado (valor oculto)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

When you're ready to save your test configuration and monitor, click {{< ui >}}Save & Edit Recording{{< /ui >}}.

For more information, see [Using Synthetic Test Monitors][13].


## Create a multistep API test 

[Multistep API tests][2] allow you to monitor key business transactions at the API level. 

{{< img src="getting_started/synthetics/multistep-api-test.png" alt="Descripción general de una prueba de API en varios pasos Synthetic" style="width:100%;" >}}

Al igual que con las [pruebas de API][3], las pruebas de API en varios pasos le avisan cuando sus puntos de conexión se vuelven demasiado lentos o no cumplen con las condiciones que definió. Puede crear variables a partir de respuestas de pasos individuales y volver a inyectar sus valores en pasos posteriores, encadenando los pasos de una manera que imite el comportamiento de su aplicación o servicio.

La prueba de ejemplo a continuación demuestra la creación de una prueba de API en varios pasos que hace un seguimiento de la adición de un artículo a un carrito. Esta prueba contiene tres pasos: 

- Obtener un carrito
- Obtener un producto
- Agregar el producto al carrito

Si no sabe en qué puntos de conexión de API crear su prueba de API en varios pasos, utilice los puntos de conexión de ejemplo a continuación. 

Para crear una nueva prueba de API en varios pasos, haga clic en {{< ui >}}New Test{{< /ui >}} > [{{< ui >}}Multistep API test{{< /ui >}}][12]. Agregue un nombre de prueba como `Add product to cart`, incluya etiquetas y seleccione ubicaciones. 

### Obtener un carrito {#get-a-cart}

1. En {{< ui >}}Define steps{{< /ui >}}, haga clic en {{< ui >}}Create Your First Step{{< /ui >}}. 
2. Agregue un nombre a su paso, por ejemplo: `Get a cart`.
3. Especifique el método HTTP y la URL que desea consultar. Puede ingresar `POST` y `https://api.shopist.io/carts`. 
4. Haga clic en {{< ui >}}Test URL{{< /ui >}}. Esto crea un artículo de carrito en el backend de la aplicación Shopist.
5. Deje las aserciones predeterminadas o modifíquelas.
6. Opcionalmente, defina los parámetros de ejecución. 

    Seleccionar {{< ui >}}Continue with test if this step fails{{< /ui >}} es útil para asegurarse de que se pruebe una colección completa de puntos de conexión o para garantizar que se ejecute el último paso de limpieza, independientemente del éxito o fracaso de los pasos anteriores. La función de paso {{< ui >}}Retry{{< /ui >}} es útil en situaciones en las que sabe que su punto de conexión de API puede tardar algún tiempo en responder. 
    
    En este ejemplo, no se necesita ningún parámetro de ejecución específico. 

7. Para crear una variable a partir del valor del ID del carrito ubicado al final del encabezado `location`:
    - Haga clic en {{< ui >}}Extract a variable from response content{{< /ui >}}.
    - Nombre su variable como `CART_ID`.
    - En {{< ui >}}Response Header{{< /ui >}}, seleccione `location`.
    - En el campo {{< ui >}}Parsing Regex{{< /ui >}}, agregue una expresión regular como `(?:[^\\/](?!(\\|/)))+$`.

   {{< img src="getting_started/synthetics/multistep-test-extract-variables.png" alt="Variable extraída del contenido de la respuesta" style="width:100%;" >}}

8. Haga clic en {{< ui >}}Save Variable{{< /ui >}}.
9. Cuando termine de crear este paso de prueba, haga clic en {{< ui >}}Save Step{{< /ui >}}.

### Obtener un producto {#get-a-product}
   
1. En {{< ui >}}Define another step{{< /ui >}}, haga clic en {{< ui >}}Add Another Step{{< /ui >}}. De forma predeterminada, puede crear hasta diez pasos.
2. Agregue un nombre a su paso, por ejemplo: `Get a product`.
3. Especifique el método HTTP y la URL que desea consultar. Aquí, puede agregar: `GET` y `https://api.shopist.io/products.json`. 
4. Haga clic en {{< ui >}}Test URL{{< /ui >}}. Esto recupera una lista de productos disponibles en la aplicación Shopist.
5. Deje las aserciones predeterminadas o modifíquelas.
6. Opcionalmente, defina los parámetros de ejecución. En este ejemplo, no se necesita ningún parámetro de ejecución específico.
7. Para crear una variable a partir del ID de producto ubicado en el cuerpo de la respuesta:
    - Haga clic en {{< ui >}}Extract a variable from response content{{< /ui >}}
    - Nombre su variable como `PRODUCT_ID`.
    - Haga clic en la pestaña {{< ui >}}Response Body{{< /ui >}}.
    - Haga clic en la clave `$oid` de cualquier producto para generar una ruta JSON como `$[0].id['$oid']`.
8. Haga clic en {{< ui >}}Save Variable{{< /ui >}}.
9. Cuando termine de crear este paso de prueba, haga clic en {{< ui >}}Save Step{{< /ui >}}.

### Agregar producto al carrito {#add-product-to-cart}

1. Haga clic en {{< ui >}}Add Another Step{{< /ui >}} para agregar el paso final, la adición de un producto a su carrito.
2. Agregue un nombre a su paso, por ejemplo: `Add product to cart`.
3. Especifique el método HTTP y la URL que desea consultar. Aquí, puede agregar: `POST` y `https://api.shopist.io/add_item.json`. 
4. En la pestaña {{< ui >}}Request Body{{< /ui >}}, elija el tipo de cuerpo `application/json` e inserte lo siguiente:
        
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
        
5. Haga clic en {{< ui >}}Test URL{{< /ui >}}. Esto agrega el producto que extrajo en el paso 2 al carrito que creó en el paso 1 y devuelve una URL de pago.
6. En {{< ui >}}Add assertions (optional){{< /ui >}}, haga clic en {{< ui >}}Response Body{{< /ui >}} y haga clic en la clave `url` para que su prueba confirme que el recorrido finalizó con una respuesta que contiene la URL de pago.
7. No se necesitan parámetros de ejecución ni extracciones de variables en este último paso.
10. Cuando termine de crear este paso de prueba, haga clic en {{< ui >}}Save Step{{< /ui >}}.

{{< img src="getting_started/synthetics/defined-steps.png" alt="Pasos de prueba creados" style="width:100%;" >}}

Luego puede configurar el resto de sus condiciones de prueba, como la frecuencia de prueba y las condiciones de alerta, y el test monitor. Cuando esté listo para guardar su configuración de prueba y el test monitor, haga clic en {{< ui >}}Create{{< /ui >}}. 

Para obtener más información, consulte [Using Synthetic Test Monitors][13].

## Consulte los resultados de la prueba {#look-at-test-results}

Las páginas {{< ui >}}API test{{< /ui >}} y {{< ui >}}Multistep API test detail{{< /ui >}} muestran una descripción general de la configuración de la prueba, el tiempo de actividad global asociado con los endpoints probados por ubicación, gráficos sobre el tiempo de respuesta y los tiempos de red, y una lista de resultados y eventos de la prueba.

Para solucionar problemas de una prueba fallida, revise los errores en la pestaña **Activity** o en la pestaña **Test Runs** y haga clic en un resultado de prueba fallido. Revise las aserciones fallidas y los detalles de la respuesta, como el código de estado, el tiempo de respuesta y los encabezados y el cuerpo asociados para diagnosticar el problema.

{{< img src="synthetics/api_tests/api_test_summary_updated.png" alt="Página de detalles de la prueba de API que muestra la pestaña Activity con tiempo de actividad global, alert timeline y una lista de Test Runs recientes." style="width:100%;">}}

Con la [integración de APM con Synthetic Monitoring][14] de Datadog, acceda a la causa raíz de una ejecución de prueba fallida consultando la traza generada a partir de la ejecución de la prueba en la pestaña {{< ui >}}Traces{{< /ui >}}.

### Inicie una Bits Investigation {#launch-a-bits-investigation}

Para identificar la causa raíz de una prueba de API sintética fallida, inicie una [Bits Investigation][16]. Bits Investigation analiza los resultados de las pruebas, las trazas, los logs y las métricas para determinar la causa raíz y marcar si el error es una regresión o una configuración incorrecta.

## Lecturas adicionales {#further-reading}

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
[13]: /es/monitors/types/synthetic_monitoring/
[14]: /es/synthetics/apm/
[15]: /es/synthetics/api_tests/grpc_tests
[16]: /es/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page