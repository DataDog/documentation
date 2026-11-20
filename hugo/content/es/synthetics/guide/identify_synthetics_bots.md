---
aliases:
- /es/synthetics/identify_synthetics_bots
description: Identifique las solicitudes entrantes de Synthetic
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Introducción a Datadog Synthetic Monitoring
- link: /synthetics/
  tag: Documentación
  text: Obtenga más información sobre Synthetic Monitoring
- link: /synthetics/browser_tests/
  tag: Documentación
  text: Configure una prueba de navegador
- link: /synthetics/api_tests/
  tag: Documentación
  text: Configure una prueba de API
title: Identifique bots de Synthetic
---
## Descripción general {#overview}

Es posible que algunas partes de sus sistemas no estén disponibles para los robots sin la identificación adecuada. También es posible que desee evitar recopilar datos analíticos de los robots de Datadog. 

Pruebe una combinación de los siguientes métodos para detectar los robots de Synthetic Monitoring de Datadog.

## Direcciones IP {#ip-addresses}

Utilice los **rangos de IP de Synthetic Monitoring** correspondientes a cada ubicación administrada por Datadog:

```
https://ip-ranges.{{< region-param key="dd_site" >}}/synthetics.json
```

Las IP enumeradas utilizan la notación de enrutamiento entre dominios sin clases (CIDR) y pueden requerir una conversión a rangos de direcciones IPv4 antes de su uso. Excepto en el caso de las IP de nuevas ubicaciones administradas, las IP enumeradas rara vez cambian. 

Si desea recibir alertas cuando las IP enumeradas cambien, cree una prueba de API en el punto de conexión anterior con una aserción JSONPath como `$.synthetics['prefixes_ipv4_by_location']['aws:ap-northeast-1'].length`.

## Encabezados predeterminados {#default-headers}

Identifique los robots de Datadog mediante el uso de **encabezados predeterminados**, los cuales se adjuntan a las solicitudes generadas por las pruebas Synthetic.

### `user-agent` {#user-agent}

De forma predeterminada, se agrega un encabezado `user-agent` a todas las solicitudes realizadas por las pruebas Synthetic. Cualquier `user-agent` personalizado agregado en la prueba anula el predeterminado.

{{< tabs >}}
{{% tab "Pruebas de API de un solo paso y de varios pasos" %}}

Para las pruebas de API de un solo paso y de varios pasos, el encabezado `user-agent` predeterminado es `Datadog/Synthetics`.

{{% /tab %}}
{{% tab "Pruebas de navegador" %}}

Para las pruebas de navegador, el valor del encabezado `user-agent` predeterminado varía según el navegador y el dispositivo que ejecute la prueba. El valor `user-agent` predeterminado siempre termina con `DatadogSynthetics` para permitirle identificar las pruebas Synthetic.

{{% /tab %}}
{{< /tabs >}}

### Encabezados de APM {#apm-headers}

Se añade una serie de [**otros encabezados específicos de APM**][1] como `x-datadog-origin: synthetics` a las solicitudes generadas por las pruebas Synthetic de API y de navegador.

## Personalizar solicitudes {#customize-requests}

Puede aprovechar la configuración de sus pruebas de API y de navegador en {{< ui >}}Advanced options{{< /ui >}} y añadir identificadores específicos a las solicitudes de sus pruebas, como **encabezados personalizados**, **cookies** y **cuerpos de solicitud**.

## Variables del navegador {#browser-variables}

Cuando un robot de Datadog está renderizando su aplicación, la variable `window._DATADOG_SYNTHETICS_BROWSER` se establece en `true`. Para eliminar las acciones del robot de sus datos de análisis, envuelva el código de su herramienta de análisis con la siguiente prueba:

```javascript
if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
  initializeAnalytics()
}
```

Si utiliza la variable del navegador para identificar bots de Synthetic en Firefox, Datadog no puede garantizar que la variable del navegador se establezca antes de que se ejecute su código. 

## Cookies {#cookies}

Las cookies que se aplican en su navegador incluyen `datadog-synthetics-public-id` y `datadog-synthetics-result-id`.

Estas cookies están disponibles para todos los pasos en Firefox. Para Microsoft Edge y Google Chrome, estas cookies se establecen solo para la URL de inicio.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/apm/#how-are-traces-linked-to-tests