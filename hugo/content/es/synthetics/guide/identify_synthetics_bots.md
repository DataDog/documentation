---
aliases:
- /es/synthetics/identify_synthetics_bots
description: Identificar las solicitudes de Sintético
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentación de Monitorización Datadog Synthetic
- link: /synthetics/
  tag: Documentación
  text: Más información sobre Synthetic Monitorig
- link: /synthetics/browser_tests/
  tag: Documentación
  text: Configura una prueba de navegador
- link: /synthetics/api_tests/
  tag: Documentación
  text: Configurar un test de API
title: Identificar bots de Sintético
---

## Información general

Es posible que algunas partes de tus sistemas no estén disponibles para los robots sin la identificación adecuada. También es posible que desees evitar la recopilación de datos analíticos de los robots de Datadog. 

Prueba una combinación de los siguientes métodos para detectar robots de monitorización de Sintético de Datadog.

## Direcciones IP

Utiliza los **rangos de IP de Monitorización de Sintético** correspondientes a cada localización administrada por Datadog:

```
https://ip-ranges.{{< region-param key="dd_site" >}}/synthetics.json
```

Las IP enumeradas utilizan la notación de Enrutamiento de interdominios sin clases (CIDR) y pueden requerir la conversión a rangos de direcciones IPv4 antes de su uso. Salvo en el caso de las nuevas IP administradas de localizaciones, las IP enumeradas rara vez cambian. 

Si deseas recibir una alerta cuando cambien las IP de la lista, crea un test de la API en el endpoint anterior con una aserción JSONPath como `$.synthetics['prefixes_ipv4_by_location']['aws:ap-northeast-1'].length`.

## Encabezados predeterminados

Identifica los robots de Datadog utilizando **encabezados predeterminados**, que se adjuntan a las solicitudes generadas por los tests de Sintético.

### `user-agent`

De manera predeterminada, se añade un encabezado `user-agent` a todas las solicitudes realizadas por los tests de Sintético. Cualquier `user-agent` personalizado que se añada en el test sustituye al predeterminado.

{{< tabs >}}
{{% tab "Tests de la API de uno y varios pasos" %}}

Para los tests de la API de uno o varios pasos, el encabezado predeterminado `user-agent` es `Datadog/Synthetics`.

{{% /tab %}}
{{% tab "Tests de navegador" %}}

Para los tests de navegador, el valor del encabezado predeterminado `user-agent` varía en función del navegador y del dispositivo que ejecuta el test. El valor predeterminado de `user-agent` siempre termina en `DatadogSynthetics` para poder identificar los tests de Sintético.

{{% /tab %}}
{{< /tabs >}}

### `sec-datadog`

Se añade un encabezado `sec-datadog` a todas las solicitudes realizadas por los tests de Sintético. El valor incluye el ID del test del que procede la solicitud.

{{< tabs >}}
{{% tab "Tests de la API de uno y varios pasos" %}}

```
sec-datadog: Request sent by a Datadog Synthetics API Test (https://docs.datadoghq.com/synthetics/) - test_id: <SYNTHETIC_TEST_PUBLIC_ID>
```

{{% /tab %}}
{{% tab "Tests de navegador" %}}

```
sec-datadog: Request sent by a Datadog Synthetics Browser Test (https://docs.datadoghq.com/synthetics/) - test_id: <SYNTHETIC_TEST_PUBLIC_ID>
```

{{% /tab %}}
{{< /tabs >}}

### Encabezados de APM

También se añade una serie de [**otros encabezados específicos de APM**][1] como `x-datadog-origin: synthetics` a las solicitudes generadas por los tests de la API de Sintético y del navegador.

## Personalizar solicitudes

Puedes aprovechar tu configuración de test de la API y del navegador en **Opciones avanzadas** y añadir identificadores específicos a tus solicitudes de tests, como **encabezados personalizados**, **cookies** y **cuerpos de solicitudes**.

## Variables del navegador

Cuando un robot de Datadog está representando tu aplicación, la variable `window._DATADOG_SYNTHETICS_BROWSER` se configura en `true`. Para eliminar las acciones del robot de tus datos de análisis, ajusta el código de tu herramienta de análisis con el siguiente test:

```javascript
if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
  initializeAnalytics()
}
```

Si utilizas la variable del navegador para identificar bots de Sintético en Firefox, Datadog no puede garantizar que la variable del navegador esté configurada antes de que se ejecute tu código. 

## Cookies

Las cookies que se aplican en tu navegador incluyen `datadog-synthetics-public-id` y `datadog-synthetics-result-id`.

Estas cookies están disponibles para todos los pasos en Firefox. En Microsoft Edge y Google Chrome, estas cookies solo se configuran para la URL de inicio.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/apm/#how-are-traces-linked-to-tests