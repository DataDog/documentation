---
aliases:
- /es/developers/faq/calling-on-datadog-s-api-with-the-webhooks-integration
kind: Guía
title: Llamadas a la API de Datadog mediante la integración con webhooks
---

Puedes utilizar la [integración con webhooks][1] para activar webhooks a partir de monitores y eventos Datadog. Esto suele ser útil para que tu cuenta Datadog se comunique con tu equipo utilizando herramientas de comunicación personalizadas o incluso [reenviando alertas de monitor como mensajes de texto][2].

También puedes configurar notificaciones de webhook para llamar a la [API de Datadog][3] si, por ejemplo, quieres enviar una métrica o un evento a tu cuenta Datadog cada vez que se activa un monitor.

## Cómo hacerlo

Cada webhook debe configurarse con un nombre (al que se hará referencia en los monitores) y una URL (a la que el webhook hará ping). Para enviar una llamada a la API de Datadog, selecciona "Use custom payload" (Utilizar carga útil personalizada) y añade tu carga útil personalizada al campo siguiente.

* **name field** (campo de nombre): cualquier cosa, siempre que sea algo único entre todos los demás campos de nombre de webhook.

* **url field** (campo de url): la dirección URL utilizada al hacer ping a la API. Su aspecto es el siguiente:
`https://api.datadoghq.com/api/v1/<API_ENDPOINT>?api_key=<Datadog_API_KEY>`

* **custom payload field** (campo de carga útil personalizada): contiene el JSON con todas las opciones que quieres incluir en la llamada a la API. El tipo de llamada a la API determina las opciones apropiadas. A veces puedes utilizar el contenido `$symbol` del monitor para rellenar partes de los valores de las opciones.

## Ejemplo

Imagina que tienes una serie de monitores y algunas personas de tu equipo quieren ver cuando se ejecuta un recuento momentáneo de estos monitores. Les interesa este recuento en términos de cuántos de estos monitores están en un estado OK y cuántos están en un estado CRÍTICO. Puedes añadir una notificación de webhook para enviar una llamada a la API "check_run" cada vez que uno de estos monitores pasa a un estado de alerta u OK. A partir de allí, puedes añadir un widget de "check status" en un [screenboard][4], para mostrar a tus compañeros de equipo cuál era el estado de todos estos monitores en un momento dado.

En ese caso, necesitarás dos webhooks distintos, uno para "mymonitorgroup-alert-check" y otro para "mymonitorgroup-ok-check". Ambos utilizan el mismo endpoint de la API, por lo que sus respectivos valores de nombre y URL serán los siguientes:

* Nombre: mymonitorgroup-alert-check
  URL: `https://api.datadoghq.com/api/v1/check_run?api_key=<DATADOG_API_KEY>`

* Nombre: mymonitorgroup-ok-check
  URL: `https://api.datadoghq.com/api/v1/check_run?api_key=<DATADOG_API_KEY>`

La carga útil personalizada es donde se aplican el nombre y las etiquetas (tags) del check_run. Para el webhook "alerta", considera lo siguiente:

```json
{
  "check": "mymonitorgroup.status",
  "status": 2,
  "host_name": "$HOSTNAME",
  "tags": "[monitor:$ALERT_TITLE]"
}
```

Con esta carga útil personalizada, cada vez que un monitor activa el @webhook-mymonitorgroup-alert-check, se envía una ejecución de check llamada "mymonitorgroup.status" con un estado CRÍTICO, etiquetada por el nombre del monitor y, si procede, el nombre del host en el que se activa el monitor.

A continuación, puedes aplicar los mismos valores de carga útil personalizada para "mymonitorgroup-ok-check", pero con un "estado" "0", en lugar de "2," para indicar un estado "OK".

Con ambos webhooks configurados, puedes ir a tu monitores (de los que tus compañeros de equipo quieren ver una vista rápida del estado) y añadir las referencias de la notificación de webhook, anidadas en su etiqueta de lógica condicional apropiada:

```text
{{#is_alert}} @webhook-mymonitorgroup-alert-check {{/is_alert}}
{{#is_recovery}} @webhook-mymonitorgroup-ok-check {{/is_recovery}}
```

Una vez que tus monitores estén configurados y enviando alertas (necesitan enviar alertas al menos una vez en estado OK o CRÍTICO, para ser incluidos en el recuento completo de estados), puedes configurar un widget de "estado de check" en un [screenboard][4] de tu "mymonitorgroup.check" agrupado, en este caso, por etiqueta de "monitor".

El siguiente es un ejemplo de uno de estos widgets (aunque en este ejemplo, el nombre de check sea "composite.status" y sólo un monitor del grupo se haya activado como "alerta" y luego nuevamente como "ok"):

{{< img src="developers/faq/check_status_editor.png" alt="check_status_editor" >}}

[1]: /es/integrations/webhooks/
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
[3]: /es/api/
[4]: /es/dashboards/#screenboards