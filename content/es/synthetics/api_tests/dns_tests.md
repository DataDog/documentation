---
algolia:
  category: Documentación
  rank: 70
  subcategory: Tests de API Synthetic
  tags:
  - dns
  - test dns
  - tests dns
aliases:
- /es/synthetics/dns_test
- /es/synthetics/dns_check
description: Monitorizar la resolubilidad y los tiempos de búsqueda de tus registros
  DNS
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentación de la monitorización Synthetic de Datadog
- link: https://www.datadoghq.com/blog/monitor-dns-with-datadog/
  tag: Blog
  text: Monitorización de DNS con Datadog
- link: /getting_started/synthetics/api_test
  tag: Documentación
  text: Empezando con los tests de API
- link: /synthetics/private_locations
  tag: Documentación
  text: Comprobar la resolución DNS de tus endpoints internos
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Más información sobre los monitores de test Synthetic
title: Tests DNS
---

## Información general

Los tests DNS te permiten monitorizar proactivamente la resolubilidad y los tiempos de búsqueda de tus registros DNS utilizando cualquier servidor de nombres. Si la resolución es inesperadamente lenta o un servidor DNS responde con entradas A, AAAA, CNAME, TXT o MX inesperadas, Datadog te envía una alerta con detalles sobre el fallo, lo cual te permite localizar rápidamente la causa del problema y solucionarlo.

Los tests DNS pueden ejecutarse tanto desde [localizaciones gestionadas](#select-locations) como desde [localizaciones privadas][1] dependiendo de si prefieres ejecutar el test desde fuera o desde dentro de tu red. Los tests DNS pueden ejecutarse de forma programada, bajo demanda o directamente dentro de tus [pipelines CI/CD][2].

## Configuración

Puedes crear un test utilizando una de las siguientes opciones:

- **Crea un test a partir de una plantilla**:

     1. Pasa el ratón por encima de una de las plantillas ya rellenadas y haz clic en **View Template** (Ver plantilla). Se abrirá un panel lateral en el que se mostrará la información de configuración rellenada previamente, que incluye: detalles de tests, detalles de solicitudes, aserciones, condiciones de alerta y parámetros de monitor. 
     2. Haz clic en **+Create Test** (+Crear test) para abrir la página **Define Request** (Definir solicitud), en la que podrás revisar y editar las opciones de configuración rellenadas previamente. Los campos presentados son idénticos a aquellos disponibles cuando se crea un test desde cero.
     3. Haz clic en **Save Details** (Guardar detalles) para enviar tu test de API. <br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Vídeo de la página de inicio del test de la API de Synthetics" video="true" >}}

- **Crea un test desde cero**:

   1. Para crear un test desde cero, haz clic en la plantilla **+ Start from scratch** (+ Empezar desde cero) y selecciona el tipo de solicitud DNS.
   1. Especifica el **Dominio** que quieres que consulte tu test. Por ejemplo, `www.example.com`.
   1. Especifica el **Servidor DNS** a utilizar (opcional). Puede ser un nombre de dominio o una dirección IP. Si no se especifica, el test DNS realiza la resolución utilizando `8.8.8.8`, con una restauración en `1.1.1.1` y un servidor DNS interno de AWS.
   1. Especifica el **Puerto** de tu servidor DNS (opcional). Si no se especifica, el puerto predeterminado del servidor DNS es 53.
   1. Especifica la cantidad de tiempo en segundos antes de que se inicie un tiempo de espera en el test (opcional).
   1. **Dale un nombre** a tu test DNS.
   1. Añade **etiquetas** de entorno así como cualquier otra etiqueta a tu test DNS. A continuación, puedes utilizar estas etiquetas para filtrar a través de tus tests de Synthetic en la [página de Synthetic Monitoring y Continuous Testing][3]. 
   1. Haz clic en **Test Domain* (Probar dominio) para probar la configuración de la solicitud. Aparecerá una vista previa de la respuesta en la parte derecha de la pantalla.<br /><br>

   {{< img src="synthetics/api_tests/synthetics_dns_test_domain.png" alt="Definir consulta DNS" style="width:90%;" >}}

   1. Haz clic en **Create Test** (Crear test) para enviar tu test de API.

### Fragmentos

{{% synthetics-api-tests-snippets %}}

### Definición de aserciones

Las aserciones definen cuál es un resultado de test esperado. Al hacer clic en **URL del test**, se añaden aserciones básicas sobre el `response time` y los registros disponibles. Debes definir al menos una aserción para que sea monitorizada por tu test.

| Tipo                | Tipo de registro                                                     | Operador                                           | Tipo de valor                 |
|---------------------|-----------------------------------------------------------------|----------------------------------------------------|----------------------------|
| tiempo de respuesta       |                                                                 | `is less than`                                     | _Entero (ms)_             |
| todos los registros disponibles        | de tipo A, de tipo AAAA, de tipo CNAME, de tipo MX, de tipo NS, de tipo TXT | `is`, `contains`, <br> `matches`, `does not match` | Cadena <br> [Expresión regular][4] |
| al menos un registro | de tipo A, de tipo AAAA, de tipo CNAME, de tipo MX, de tipo NS, de tipo TXT | `is`, `contains`, <br> `matches`, `does not match` | Cadena <br> [Expresión regular][4] |

**Nota**: Los registros SOA no están disponibles para realizar tests con Synthetic.

Puedes crear hasta 20 aserciones por test de API haciendo clic en **Nueva aserción** o haciendo clic directamente en la vista previa de la respuesta:

{{< img src="synthetics/api_tests/assertions_dns.png" alt="Definir aserciones en las que tu test DNS tenga éxito o falle" style="width:90%;" >}}

Para realizar la lógica `OR` en una aserción, utiliza el comparador `matches regex` para definir una expresión regular con varios valores esperados para el mismo tipo de aserción, como `(0|100)`. El resultado del test es correcto si todos los registros disponibles o al menos el valor de una aserción del registro es 0 o 100.

Si un test no contiene una aserción en el cuerpo de la respuesta, la carga útil del cuerpo cae y devuelve un tiempo de respuesta asociado para la solicitud dentro del límite de tiempo de espera establecido por el worker de Synthetics.

Si un test contiene una aserción en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparecerá el error `Assertions on the body/response cannot be run beyond this limit`.

### Seleccionar localizaciones

Selecciona las **Localizaciones** desde donde ejecutar tu test DNS. Los tests DNS pueden ejecutarse tanto desde localizaciones gestionadas como [privadas][1], en función de si prefieres monitorizar un dominio privado o público.

{{% managed-locations %}}

### Indicar la frecuencia del test

Los test DNS se pueden ejecutar:

* **De forma programada**, para garantizar que los servicios más importantes siempre resulten accesibles para tus usuarios. Selecciona la frecuencia con la que quieres que Datadog ejecute tu test DNS.
* [**Dentro de tus pipelines CI/CD**][2].
* **Bajo demanda** para ejecutar tus tests cuando sea más conveniente para tu equipo.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### Usar variables

Puedes utilizar las [variables globales definidas en la página **Parámetros**][9] en la URL, las opciones avanzadas y las aserciones de tus tests DNS.

Para visualizar tu lista de variables, escribe `{{` en el campo de tu elección.

## Fallo del test

Un test se considera `FAILED` si no satisface una o más aserciones o si la solicitud ha fallado prematuramente. En algunos casos, el test puede fallar sin comprobar las aserciones respecto al endpoint.

Entre las razones figuran las siguientes:

`CONNRESET`
: El servidor remoto ha cerrado bruscamente la conexión. Entre las posibles causas se incluyen que el servidor web haya encontrado un error o falla al responder, o que se haya perdido la conectividad del servidor web.

`DNS`:
No se ha encontrado la entrada DNS para la URL del test. Entre las posibles causas se incluyen una URL de test mal configurada o una configuración incorrecta de las entradas DNS.

`INVALID_REQUEST` 
: La configuración del test no es válida (por ejemplo, un error tipográfico en la URL).

`TIMEOUT`
: La solicitud no se ha podido completar en un plazo razonable. Pueden ocurrir dos tipos de `TIMEOUT`:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indica que la duración de la solicitud ha alcanzado el tiempo de espera definido en el test (por defecto se establece en 60s).
  Para cada solicitud, en la cascada de la red sólo se muestran las etapas completadas de la solicitud. Por ejemplo, en el caso de que sólo se muestre `Total response time`, el tiempo de espera se produjo durante la resolución DNS.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indica que la duración del test (solicitud + aserciones) alcanza la duración máxima (60,5 segundos).

## Permisos

De manera predeterminada, sólo los usuarios con los roles de [administrador de Datadog y estándar de Datadog][10] pueden crear, editar y eliminar tests DNS Synthetic. Para crear, editar y eliminar tests DNS Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][10].

Si estás utilizando la [función de rol personalizado][11], añade tu usuario a cualquier rol que incluya permisos `synthetics_read` y `synthetics_write`.

### Restringir el acceso

{{% synthetics_grace_permissions %}}

## Referencias adicionales

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
[10]: /es/account_management/rbac/
[11]: /es/account_management/rbac#custom-roles