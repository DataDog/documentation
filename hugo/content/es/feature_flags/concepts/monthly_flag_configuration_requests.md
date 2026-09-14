---
description: Comprenda las Solicitudes de configuración de flags mensuales (MFCR),
  la unidad de facturación de Feature Flags, y cómo los SDK del lado del cliente y
  del lado del servidor las generan de manera diferente.
further_reading:
- link: /feature_flags/concepts/configuration_sources
  tag: Documentación
  text: Fuentes de configuración del SDK del servidor
- link: /feature_flags/guide/estimating_and_managing_costs
  tag: Documentación
  text: Estime y gestione los costos de Feature Flags
- link: /account_management/plan_and_usage/usage_details
  tag: Documentación
  text: Detalles de uso
- link: /account_management/plan_and_usage/bill_overview
  tag: Documentación
  text: Resumen de facturación
title: Solicitudes de configuración de flags mensuales (MFCR)
---
## Descripción general {#overview}

Datadog factura Feature Flags según las **Solicitudes de configuración de flags mensuales (MFCR)**. Una MFCR cuenta cada vez que un SDK solicita el archivo de configuración de flags, el payload que contiene sus flags, sus variantes y las reglas de segmentación. Una MFCR no cuenta cuántas veces el código de la aplicación evalúa una flag.

Los SDK de Feature Flags evalúan las flags localmente, en memoria, con respecto a un archivo de configuración que ya poseen. Debido a que la evaluación no realiza una llamada de red, Datadog no puede medir el uso por volumen de evaluación. En cambio, la facturación de Feature Flags mide con qué frecuencia los SDK solicitan el archivo de configuración que hace posible la evaluación local.

## Qué genera una MFCR {#what-generates-an-mfcr}

Una MFCR se incrementa cada vez que se solicita el archivo de configuración de flags. Una solicitud de configuración ocurre cuando:

- Un **SDK del lado del cliente** se inicializa, lo cual generalmente ocurre cuando un usuario abre una aplicación móvil o carga una página web.
- Un **SDK del lado del servidor** busca un archivo de configuración actualizado, en un intervalo recurrente.

La solicitud en sí va a diferentes lugares dependiendo de la ruta de entrega. Los SDK del lado del cliente, y los SDK del lado del servidor que utilizan entrega sin agente, solicitan la configuración directamente desde la CDN de Datadog, que se ejecuta en Fastly. Los SDK del lado del servidor que utilizan la entrega mediante Agent no solicitan la configuración directamente; el Datadog Agent la solicita en nombre del SDK a través de Remote Configuration. Consulte [Server SDK Configuration Sources][1] para saber cómo los SDK del lado del servidor eligen entre estas rutas de entrega.

La instalación de un SDK no genera solicitudes de configuración por sí sola. Las solicitudes comienzan solo después de que el código de la aplicación inicializa el SDK (lado del cliente) o selecciona explícitamente una fuente de configuración (lado del servidor).

La cantidad de flags en el archivo de configuración no afecta el conteo. Una sola solicitud de configuración puede entregar cualquier cantidad de flags. Consulte [Qué no cuenta como un MFCR](#what-doesnt-count-as-an-mfcr).

## Facturación de SDK del lado del cliente frente al lado del servidor {#client-side-vs-server-side-sdk-billing}

Los SDK del lado del cliente y del lado del servidor generan solicitudes de configuración de manera diferente, por lo que contribuyen al volumen de MFCR de manera diferente.

### SDK del lado del cliente {#client-side-sdks}

Los [Client-side SDKs][2] solicitan la configuración a la CDN cuando se inicializan. Esto suele ocurrir cuando un usuario abre una aplicación móvil o carga una página web. El SDK almacena esa configuración en caché localmente en el dispositivo durante el resto de la sesión.

Debido a que cada solicitud corresponde a una apertura de aplicación o carga de página, el volumen de MFCR del lado del cliente sigue de cerca el tráfico del usuario final. Los ejemplos incluyen sesiones RUM no muestreadas, o usuarios activos diarios o sesiones en las propiedades donde se utilizan flags del lado del cliente.

### SDKs del lado del servidor {#server-side-sdks}

Los [Server-side SDKs][3] solicitan la configuración en un intervalo recurrente en lugar de por solicitud del usuario. Dependiendo de la ruta de entrega, esa solicitud va directamente a la CDN (entrega sin agente) o a través del Datadog Agent (entrega con Datadog Agent). Cada instancia en ejecución (por ejemplo, cada servidor, contenedor o servicio) genera sus propias solicitudes de configuración de forma independiente. Como resultado, el volumen de MFCR para los SDKs del lado del servidor depende de la cantidad de instancias en ejecución y de la frecuencia con la que solicitan una configuración actualizada. No depende del volumen de tráfico del usuario que manejan esas instancias.

Una sola solicitud de configuración del lado del servidor puede proporcionar configuración a una instancia que maneja un gran volumen de tráfico de usuario. Debido a esto, Datadog factura las solicitudes de configuración del lado del servidor a 10 veces su conteo bruto.

### Uso combinado del lado del cliente y del lado del servidor {#combined-client-side-and-server-side-usage}

Si utiliza SDKs tanto del lado del cliente como del lado del servidor, el uso total de MFCR es la suma de ambos. Sume las solicitudes de configuración del lado del cliente a las solicitudes de configuración del lado del servidor después de aplicar el multiplicador del lado del servidor.

## Qué no cuenta como un MFCR {#what-doesnt-count-as-an-mfcr}

Las evaluaciones de Feature Flags no cuentan como MFCR. Después de que un SDK recibe un archivo de configuración, evalúa los Feature Flags localmente con respecto a ese archivo almacenado en caché sin una llamada de red adicional. Como resultado:

- Una sola solicitud de configuración puede incluir cualquier cantidad de Feature Flags.
- La aplicación puede evaluar cada uno de esos Feature Flags cualquier cantidad de veces sin generar MFCR adicionales.

## Ver uso y facturación {#view-usage-and-billing}

Para ver el uso de MFCR y cómo contribuye a la factura de Feature Flags, vaya a [Usage Details][4] y [Bill Overview][5].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/feature_flags/concepts/configuration_sources/
[2]: /es/feature_flags/client/
[3]: /es/feature_flags/server/
[4]: /es/account_management/plan_and_usage/usage_details/
[5]: /es/account_management/plan_and_usage/bill_overview/