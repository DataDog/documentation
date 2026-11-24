---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API Tests
  tags:
  - ssl
  - ssl test
  - ssl tests
aliases:
- /es/synthetics/ssl_test
- /es/synthetics/ssl_check
description: Monitoree sus certificados SSL desde ubicaciones de todo el mundo
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Introducción a Datadog Synthetic Monitoring
- link: /getting_started/synthetics/api_test
  tag: Documentación
  text: Comience con las pruebas de API
- link: /synthetics/private_locations
  tag: Documentación
  text: Ejecute pruebas SSL en hosts internos
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Obtenga información sobre los monitores de prueba Synthetic
title: Pruebas SSL
---
## Descripción general {#overview}

Las pruebas SSL le permiten monitorear de forma proactiva la validez y el vencimiento de sus certificados SSL/TLS para garantizar conexiones seguras entre sus servicios clave y los usuarios. Si su certificado está a punto de caducar o se ve comprometido, Datadog le envía una alerta con detalles sobre el error, lo que le permite identificar la causa raíz del problema y solucionarlo.

Las pruebas SSL pueden ejecutarse desde ubicaciones [administradas](#select-locations) y [privadas][1] según su preferencia para ejecutar la prueba desde fuera o dentro de su red. Las pruebas SSL pueden ejecutarse según un horario, bajo demanda o directamente dentro de sus [canalizaciones CI/CD][2].

## Configuración {#configuration}

Puede crear una prueba utilizando una de las siguientes opciones:

- **Cree una prueba a partir de una plantilla**:
   
     1. Pase el cursor sobre una de las plantillas precargadas y haga clic en {{< ui >}}View Template{{< /ui >}}. Esto abre un panel lateral que muestra información de configuración precargada, incluyendo: Detalles de la prueba, Detalles de la solicitud, Aserciones, Condiciones de alerta y Configuración del monitor.
     2. Haga clic en {{< ui >}}\+ Create Test{{< /ui >}} para abrir la página {{< ui >}}Define Request{{< /ui >}}, donde puede revisar y editar las opciones de configuración prellenadas. Los campos presentados son idénticos a los disponibles al crear una prueba desde cero.
     3. Haga clic en {{< ui >}}Save Details{{< /ui >}} para enviar su prueba de API.<br /><br>
        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Video de la página de inicio de la prueba de API de Synthetics con plantillas" video="true" >}}

- **Cree una prueba desde cero**:

   1. Para crear una prueba desde cero, haga clic en la plantilla {{< ui >}}\+ Start from scratch{{< /ui >}}, luego seleccione el tipo de solicitud SSL.
   1. Especifique el {{< ui >}}Host{{< /ui >}} y el {{< ui >}}Port{{< /ui >}} para ejecutar su prueba. El puerto SSL predeterminado es `443`.
   1. Agregue {{< ui >}}Advanced Options{{< /ui >}} (opcional) a su prueba:
      * {{< ui >}}Accept self-signed certificates{{< /ui >}}: Omite cualquier error del servidor relacionado con un certificado autofirmado.
      * {{< ui >}}Fail on revoked certificate in stapled OCSP{{< /ui >}}: Haga que la prueba falle si el certificado está marcado como revocado por el grapado OCSP.
      * {{< ui >}}Fail on incomplete certificate chain{{< /ui >}}: Deshabilita la obtención de AIA, lo que provoca que la prueba falle si falta algún certificado intermedio en la cadena de certificados del servidor.
      * {{< ui >}}Timeout{{< /ui >}}: Especifique la cantidad de tiempo en segundos antes de que la prueba agote el tiempo de espera.
      * {{< ui >}}Server Name{{< /ui >}}: Especifica en qué servidor desea iniciar el protocolo de enlace TLS, lo que permite al servidor presentar uno de los múltiples certificados posibles en la misma dirección IP y número de puerto TCP. De forma predeterminada, el parámetro se completa con el valor {{< ui >}}Host{{< /ui >}}.
      * {{< ui >}}Client certificate{{< /ui >}}: Autentíquese mediante mTLS cargando su certificado de cliente (`.crt`) y la clave privada asociada (`.key`) en formato `PEM`. 
   
      Puede utilizar la biblioteca `openssl` para convertir sus certificados. Por ejemplo, convierta un certificado `PKCS12` a claves privadas y certificados con formato `PEM`.

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   1. {{< ui >}}Name{{< /ui >}} su prueba SSL.

   1. Agregue la etiqueta Environment {{< ui >}}Tags{{< /ui >}}, así como cualquier otra etiqueta, a su prueba SSL. Luego puede usar estas etiquetas para filtrar sus pruebas Synthetic en la [página de Synthetic Monitoring y Continuous Testing][3].
   1. Haga clic en {{< ui >}}Test Certificate{{< /ui >}} para probar la configuración de la solicitud. Se muestra una vista previa de la respuesta en el lado derecho de su pantalla.<br /><br>

      {{< img src="synthetics/api_tests/synthetics_ssl_test_cert.png" alt="Defina la solicitud SSL" style="width:90%;" >}}

   1. Haga clic en {{< ui >}}Create Test{{< /ui >}} para enviar su prueba de API.

   

### Fragmentos {#snippets}

{{% synthetics-api-tests-snippets %}}

### Defina aserciones {#define-assertions}

Las aserciones definen cuál es el resultado esperado de una prueba. Después de hacer clic en {{< ui >}}Test URL{{< /ui >}}, se añaden aserciones básicas sobre la validez del certificado, los datos de vencimiento, la versión de TLS y `response time` según la respuesta obtenida. Debe definir al menos una aserción para que su prueba haga un seguimiento.

| Tipo                  | Operador                                                                               | Tipo de valor                 |
|-----------------------|----------------------------------------------------------------------------------------|----------------------------|
| certificado           | `expires in more than`, `expires in less than`                                         | _Entero (número de días)_ |
| propiedad              | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`       | _Cadena_ <br> _[Regex][4]_ |
| tiempo de respuesta         | `is less than`                                                                         | _Entero (ms)_             |
| versión máxima de TLS   | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _Decimal_                  |
| versión mínima de TLS   | `is more than`, `is more than or equal`                                                | _Decimal_                  |

Las pruebas SSL se conectan con TLS 1.2 o TLS 1.3, por lo que el servidor debe admitir al menos una de estas versiones. La aserción `minimum TLS version` comprueba la más baja de estas dos versiones que acepta el servidor. Las pruebas SSL no prueban TLS 1.0 ni TLS 1.1.

Puede crear hasta 20 aserciones por prueba de API haciendo clic en {{< ui >}}New Assertion{{< /ui >}} o haciendo clic directamente en la vista previa de la respuesta:

{{< img src="synthetics/api_tests/assertions_ssl.png" alt="Defina aserciones para que su prueba SSL tenga éxito o falle en función de" style="width:90%;" >}}

Para realizar lógica `OR` en una aserción, utilice los comparadores `matches regex` o `does not match regex` para definir una expresión regular con múltiples valores esperados para el mismo tipo de aserción, como `(0|100)`. El resultado de la prueba es exitoso si el valor de la aserción de propiedad es 0 o 100.

Si una prueba no contiene una aserción sobre el cuerpo de la respuesta, la carga útil del cuerpo se descarta y devuelve un tiempo de respuesta asociado para la solicitud dentro del límite de tiempo de espera establecido por el Synthetics Worker.

Si una prueba contiene una aserción en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparece un error `Assertions on the body/response cannot be run beyond this limit`.

### Seleccione ubicaciones {#select-locations}

Seleccione la {{< ui >}}Locations{{< /ui >}} desde la cual ejecutar su prueba SSL. Las pruebas SSL pueden ejecutarse desde ubicaciones administradas y [privadas][1] según su preferencia para monitorear certificados desde fuera o dentro de su red.

{{% managed-locations %}}

### Especifique la frecuencia de la prueba {#specify-test-frequency}

Las pruebas SSL pueden ejecutarse:

* **Según un horario** para garantizar que sus certificados SSL/TLS sean siempre válidos y que los usuarios de sus servicios clave tengan una conexión segura. Seleccione la frecuencia con la que desea que Datadog ejecute su prueba SSL.
* [**Dentro de sus pipelines de CI/CD**][2].
* **Bajo demanda** para ejecutar sus pruebas cuando tenga más sentido para su equipo.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

{{% synthetics-variables %}}

### Usar variables {#use-variables}

Puede usar las [variables globales definidas en la página {{< ui >}}Settings{{< /ui >}}][9] en la URL, las opciones avanzadas y las aserciones de sus pruebas SSL.

Para mostrar su lista de variables, escriba `{{` en el campo deseado.

## Falla de prueba {#test-failure}

Una prueba se considera `FAILED` si no cumple con una o más aserciones o si la solicitud falló prematuramente. En algunos casos, la prueba puede fallar sin probar las aserciones contra el punto de conexión.

Para obtener una lista completa de los códigos de error SSL, consulte [Errores de pruebas de API][10].

## Permisos {#permissions}

De forma predeterminada, solo los usuarios con los roles [Datadog Admin y Datadog Standard][11] pueden crear, editar y eliminar pruebas SSL sintéticas. Para obtener acceso para crear, editar y eliminar pruebas SSL sintéticas, actualice su usuario a uno de esos dos [roles predeterminados][11].

Si está utilizando la [función de roles personalizados][12], agregue su usuario a cualquier rol personalizado que incluya los permisos `synthetics_read` y `synthetics_write`.

### Restringir acceso {#restrict-access}

{{% synthetics_grace_permissions %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/private_locations
[2]: /es/synthetics/cicd_integrations
[3]: /es/synthetics/search/#search
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[5]: /es/monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /es/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /es/synthetics/guide/synthetic-test-monitors
[9]: /es/synthetics/settings/#global-variables
[10]: /es/synthetics/api_tests/errors/
[11]: /es/account_management/rbac/
[12]: /es/account_management/rbac#custom-roles