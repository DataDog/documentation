---
description: Comprenda cómo la directiva de Azure API Management llama al servicio
  de callout de App and API Protection, aplica decisiones de bloqueo y propaga el
  contexto de traza.
further_reading:
- link: /security/application_security/setup/azure/api-management
  tag: Documentación
  text: Habilitación de App and API Protection para Azure API Management
- link: /security/application_security/setup/azure/api-management/configuration
  tag: Documentación
  text: Configuración del callout de Azure API Management
- link: https://learn.microsoft.com/en-us/azure/api-management/send-request-policy
  tag: Documentación
  text: Directiva send-request de Azure API Management
- link: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout
  tag: Código fuente
  text: Fuente del callout de App and API Protection para Azure API Management
title: Directivas de Azure API Management para App and API Protection
---
{{< callout url="#" btn_hidden="true" header="App and API Protection para Azure API Management está en versión preliminar" >}}
Para probar la versión preliminar de App and API Protection para Azure API Management, utilice las siguientes instrucciones de configuración.
{{< /callout >}}

La integración de App and API Protection para Azure API Management (APIM) utiliza la directiva nativa de APIM [`send-request`][1] para llamar al servicio de callout de Datadog y lee la decisión de una variable de directiva.

Se proporcionan tres documentos de directiva en [`deploy/azure/policies`][2]:

| Archivo                       | Contenido                                              |
|----------------------------|-------------------------------------------------------|
| `azure-apim-full.xml`      | El documento de directiva completo, con ambas secciones.     |
| `azure-apim-inbound.xml`   | Solo la sección de entrada.                             |
| `azure-apim-outbound.xml`  | Solo la sección de salida.                            |

Utilice el documento completo para una nueva directiva. Si ya tiene contenido de directiva, utilice los fragmentos de entrada y salida para combinar las etapas de Datadog en las secciones correspondientes.

## Aplicación de la directiva {#applying-the-policy}

Azure API Management evalúa las directivas en el contexto global, del área de trabajo, de producto, de API y de operación, y `<base />` controla tanto la herencia como el orden entre esos contextos. Adjunte la directiva de Datadog en el contexto que desea proteger: todas las API, un solo producto, una API o una operación.

La política se entrega con la URL de marcador de posición `https://<dd-apim-callout-host>:8080`. Antes de aplicarla, reemplace cada aparición de esa URL completa con la salida `calloutBaseUrl` del despliegue. Esa salida es `http://<ACA-FQDN>` a menos que establezca `enableHttps` en `true`, y no incluye un puerto, así que reemplace la URL completa en lugar de solo el nombre de host. El despliegue realiza la misma sustitución por usted cuando establece `deployPolicy` en `true`, y su parámetro `targetApiIds` selecciona qué API reciben la política.

`azure-apim-full.xml` contiene un elemento `<base />` en cada una de sus cuatro secciones. APIM los rechaza en el contexto global, por lo que si aplica el archivo a todas las API, elimine primero cada elemento `<base />`. Consérvelos cuando aplique la política a un producto, una API o una operación, porque controlan la herencia desde el contexto contenedor. El despliegue aplica la misma regla para usted: elimina los elementos para los despliegues de todas las API y los conserva cuando `targetApiIds` nombra API específicas.

La política tiene esta forma:

```xml
<policies>
  <inbound>
    <base />
    <!-- Phase 1: serialize request headers, call the service, read the decision -->
    <!-- Phase 2 (conditional): send the request body when the service asks for it -->
    <!-- If blocked: return-response. Otherwise: inject x-datadog-* headers -->
  </inbound>
  <backend>
    <base />
  </backend>
  <outbound>
    <base />
    <!-- Phase 3: serialize response headers, call the service, read the decision -->
    <!-- Phase 4 (conditional): send the response body when the service asks for it -->
    <!-- If blocked: return-response -->
  </outbound>
  <on-error>
    <base />
  </on-error>
</policies>
```

## Cómo funciona el callout {#how-the-callout-works}

Cada callout es un `send-request` con `mode="new"`, `timeout="3"` y `ignore-error="true"`. Cada callout envía `application/json` al servicio de callout. La política almacena cada respuesta en `ddPhase1Response` a `ddPhase4Response` y el cuerpo JSON analizado correspondiente en `ddPhase1` a `ddPhase4`.

El intercambio tiene cuatro fases:

1. **Encabezados de solicitud.** La política serializa el método de solicitud, el esquema, la autoridad, la ruta con la cadena de consulta, la dirección IP del cliente y los encabezados, y luego los envía. El servicio responde con un ID de solicitud, encabezados de propagación del contexto de trazas y, cuando se aplica la inspección del cuerpo, un tamaño de cuerpo aceptado. La política almacena el ID de solicitud en la variable `ddRequestId`.
2. **Cuerpo de la solicitud.** Se ejecuta solo cuando la fase 1 devuelve un tamaño de cuerpo aceptado. La política codifica en base64 el cuerpo de la solicitud, lo trunca a ese tamaño y lo publica junto con el ID de la solicitud.
3. **Encabezados de respuesta.** La política publica el código de estado de respuesta y los encabezados junto con el ID de la solicitud.
4. **Cuerpo de respuesta.** Se ejecuta solo cuando la fase 3 devolvió un tamaño de cuerpo aceptado, y maneja el cuerpo de la misma manera que la fase 2.

El ID de la solicitud vincula las cuatro fases a un único contexto de evaluación de Web Application Firewall (WAF) de Datadog. El servicio mantiene ese contexto en una memoria caché cuyo tiempo de vida predeterminado es de 30 segundos, establecido por `DD_APIM_CALLOUT_REQUEST_TIMEOUT`. El contexto se crea en la fase 1, se mantiene entre fases y se libera después de la fase final o después de un bloque.

## Bloqueo {#blocking}

Cuando el WAF decide bloquear, el servicio responde con un objeto `block`:

```json
{
  "block": {
    "status": 403,
    "headers": { "Content-Type": ["application/json"] },
    "content": "<base64-encoded body>"
  }
}
```

La política detecta `block` y llama a `return-response` para enviar el código de estado, establecer `Content-Type` desde `block.headers` (usando `application/json` por defecto cuando está ausente), y escribir el cuerpo decodificando `block.content` en base64.

Debido a que `return-response` cancela el resto de la canalización, un bloqueo durante una fase de entrada significa que su backend nunca es llamado.

## Comportamiento de falla abierta {#fail-open-behavior}

Cada ruta de falla permite el paso del tráfico:

| Escenario                                                     | Resultado                                                                                              |
|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| El servicio no está disponible, o la llamada excede el tiempo de espera    | `ignore-error="true"` deja la variable de respuesta sin establecer. La política omite la verificación y el tráfico continúa. |
| La llamada responde con un estado distinto a `200`           | La política trata el resultado como permitido y el tráfico continúa.                                        |
| La llamada recibe un JSON no válido | Devuelve `400` con `{}`, y la política trata el resultado como permitido.                               |
| El ID de solicitud es desconocido en una fase posterior | El servicio responde `200` con `{}`, y no se aplica ningún bloqueo.                                        |
| El WAF agota el tiempo de espera, o el procesador informa un error | El servicio devuelve `200` con `{}`, y no se aplica ningún bloqueo.                                        |
| El estado de la solicitud en caché superó su tiempo de vida | El estado huérfano se libera y el tráfico continúa.                                               |

Debido a que cada ruta de falla permite el tráfico, una configuración incorrecta aparece como datos de seguridad faltantes en lugar de como tráfico interrumpido. Cuando faltan señales, verifique lo siguiente:

1. La política está adjunta a la API a la que está enviando tráfico, en un contexto que se aplica a ella.
2. La política llama a la URL correcta. Compare el valor `set-url` con la salida `calloutBaseUrl` del despliegue, incluyendo el esquema y el puerto.
3. La puerta de enlace puede acceder al servicio de callout en esa URL. Un callout que nunca llega no deja rastro en la política, porque `ignore-error="true"` lo oculta.
4. Los registros del servicio de callout muestran solicitudes entrantes. Si no lo hacen, la puerta de enlace no está llegando a él.
5. El servicio de callout puede acceder al Datadog Agent en el puerto `8126`, y el Agente tiene `DD_APM_ENABLED` y `DD_APM_NON_LOCAL_TRAFFIC` configurados en `true`. Sin ellos, el servicio evalúa el tráfico pero no llega nada a Datadog.

La creación del cuerpo JSON con `set-body` y el parseo de la variable de respuesta toman menos de 0.1 ms cada uno, y la evaluación condicional toma menos de 0.01 ms. El costo dominante es el tiempo de ida y vuelta de la red al servicio de callout.

## Propagación del contexto de trazas {#trace-context-propagation}

Cuando se permite la solicitud, la fase 1 devuelve encabezados de propagación del contexto de trazas y la política los inyecta en la solicitud antes de reenviarla al backend:

- `x-datadog-trace-id`
- `x-datadog-parent-id`
- `x-datadog-sampling-priority`
- `x-datadog-origin`
- `x-datadog-tags`

La presencia de estos encabezados en la solicitud de backend confirma que la política de entrada se ejecutó y permitió la solicitud.

## Identificación de la integración en Datadog {#identifying-the-integration-in-datadog}

El servicio de callout aparece en APM como el servicio `apim-callout`, y sus tramos llevan la etiqueta `component:apim-callout`. Para usar un nombre de servicio diferente, establezca `DD_SERVICE` en el contenedor de callout.

Cuando el WAF coincide con una solicitud, el tramo también lleva etiquetas de Protección de Aplicaciones y API, incluidas `appsec.event`, `appsec.blocked` y `http.client_ip`.

La dirección IP del cliente proviene del valor que la política envía en la fase 1. Ese valor establece `http.client_ip`, incluso cuando otro proxy se encuentra frente a APIM.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/api-management/send-request-policy
[2]: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout/deploy/azure/policies