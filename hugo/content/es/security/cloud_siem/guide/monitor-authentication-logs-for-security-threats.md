---
aliases:
- /es/security_monitoring/guide/monitor-authentication-logs-for-security-threats/
- /es/security_platform/guide/monitor-authentication-logs-for-security-threats/
- /es/security/guide/monitor-authentication-logs-for-security-threats/
further_reading:
- link: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
  tag: Blog
  text: Más información sobre la monitorización de logs de autenticación
title: Monitorizar logs de autenticación para amenazas de seguridad
---

## Información general

Ser capaz de loguear, monitorizar y analizar todos los eventos de autenticación es clave para identificar las amenazas a la seguridad y gestionar los registros de los clientes con fines de cumplimiento. Los logs de autenticación de diferentes fuentes y partes de tu entorno pueden tener diferentes formatos y ser gestionados por diferentes equipos, o implementados utilizando múltiples servicios de terceros.

Esta guía te mostrará las prácticas recomendadas y consejos para gestionar y formatear los logs de autenticación para que puedas utilizar los datos de logs de autenticación para monitorizar y detectar amenazas de seguridad con [Datadog Security and Compliance Monitoring][1].

## Requisitos previos

La recopilación de logs debe estar habilitada para utilizar Datadog Security and Compliance Monitoring. Esta guía recomienda tener la recopilación de logs habilitada en el [nivel de aplicación][2].

## Gestionar y formatear logs de autenticación

Antes de empezar la monitorización de las amenazas a la seguridad, sigue las prácticas recomendadas que se indican a continuación para asegurarte de que dispones de suficientes datos de log que fluyen hacia Datadog.

### Eventos de log de todos los flujos de inicio de sesión

Para obtener visibilidad de toda tu actividad de autenticación, asegúrate de que los logs de eventos para todos los flujos de inicio de sesión se encuentran a nivel de aplicación. Esto elimina lagunas en la cobertura de tu monitorización. También te da más control sobre cómo loguear los eventos de autenticación y qué datos estás recopilando.

### Asegúrate de que tus logs contienen datos útiles

Al registrar todos los eventos de autenticación a nivel de aplicación, puedes asegurarte de que tu logs contengan los datos más útiles para [la monitorización y detección de amenazas a la seguridad](#monitor-and-detect-security-threats).

{{< code-block lang="bash" >}}
2020-01-01 12:00:01 google oauth login success by John Doe from 1.2.3.4
{{< /code-block >}}

Los logs que contienen el "quién" (John Doe), el "qué" (login success [éxito de inicio de sesión]) y el cuándo (2020-01-01 12:00:01) de un evento proporcionan el mejor nivel de detalle para que puedas realizar análisis complejos en Datadog.

### Log en un formato estándar analizable

Asegúrate de que tu aplicación escribe logs en un formato de clave-valor utilizando `=` como separador. El uso de este formato significa que un analizador de clave-valor, como [Grok Parser][3] de Datadog, puede procesarlos. Por ejemplo, si un log tiene el siguiente formato:

{{< code-block lang="bash" >}}
INFO 2020-01-01 12:00:01 usr.id="John Doe" evt.category=authentication evt.name="google oauth" evt.outcome=success network.client.ip=1.2.3.4
{{< /code-block >}}

Datadog puede analizar esto como el siguiente JSON:

{{< code-block lang="json" >}}
{
  "usr": {
    "id": "John Doe"
  },
  "evt": {
    "category": "authentication",
    "name": "google oauth",
    "outcome": "success",
  },
  "network": {
    "client": {
      "ip": "1.2.3.4"
    }
  }
}
{{< /code-block >}}

Es importante utilizar una [convención de nomenclatura estándar][4] para los atributos en tus logs para asegurarte de que puedes buscar y agregar datos a través de todos los atributos, independientemente de su procedencia. Es recomendado que tus logs de autenticación incluyan los siguientes [atributos estándar][5]:

- [`usr.id`][6]
- [`evt.category`][7]
- [`evt.name`][7]
- [`evt.outcome`][7]
- [`network.client.ip`][8]

Utiliza el mismo formato en todos tus logs de autenticación para poder utilizar correctamente los atributos de log para filtrar y organizar los datos de log en Datadog. Por ejemplo, con los atributos estándar puedes buscar qué usuarios (`usr.id`) tienen el mayor número de inicios de sesión fallidos (`evt.outcome:failure`).

Un formato de clave-valor también simplifica el proceso para añadir atributos personalizados a logs. Por ejemplo, podrías añadir una puntuación [reCAPTCHA v3][9] para identificar posibles actividades de bots. Utiliza comillas para encerrar cualquier valor de atributo que pueda contener espacios. De esta forma te aseguras de capturar el valor completo de forma que sea analizable.

## Monitorizar y detectar las amenazas a la seguridad

Para monitorizar y detectar adecuadamente las amenazas a la seguridad, hay patrones clave que debes tener en cuenta. Por ejemplo, si observas un número significativo de intentos fallidos de inicio de sesión de un solo usuario en un corto periodo, podría indicar un [**ataque de fuerza bruta**][10]. Si esos intentos fallidos de inicio de sesión van seguidos de uno exitoso, podría tratarse de una toma de control de cuenta exitosa que deberías investigar de inmediato.

Otra técnica común de ataque a la autenticación es el [**relleno de credenciales**][11]. El relleno de credenciales se produce cuando un atacante mezcla y combina valores de inicio de sesión adulterados para intentar hacerlos coincidir con una cuenta de usuario real. Para detectar este tipo de ataque, busca inicios de sesión que utilicen varios valores `usr.id` procedentes de la misma `network.client.ip`.

Datadog ofrece [Reglas de detección][12] preconfiguradas que escanean en tiempo real tus logs ingeridos en busca de técnicas de ataque comunes como las dos mencionadas anteriormente. Si algún log activa una de estas reglas, Datadog genera automáticamente una [Señal de seguridad][13]. Esta señal incluye datos clave sobre el evento, como el tipo de ataque detectado y sugerencias sobre cómo responder y remediar la situación. Puedes ver, filtrar y clasificar todas tus señales de seguridad en el explorador para clasificarlas y ver dónde concentrar mejor tus esfuerzos.

Para las señales activadas por la regla de detección `Credential Stuffing Attack`, hay un [manual predefinido][14] disponible para ayudar con la respuesta y corrección. Este manual te guía a través de la investigación de un posible ataque de relleno de credenciales e incluye gráficos de logs relacionados. Para utilizar este manual, guarda una copia y establece el marco temporal, documenta tu investigación en markdown y compártela con tus compañeros de equipo [para que la comenten][15].

### Utilizar dashboards para investigar

Datadog proporciona dashboards predefinidos, como el [dashboard de investigación de IP][16] y el [dashboard de investigación de usuarios][17]. Estos correlacionan datos clave de tus logs de autenticación con datos relevantes del resto de tu entorno para ayudar en tus investigaciones.

Por ejemplo, si una dirección IP o un usuario concretos activan varias señales de seguridad, haz clic en la dirección IP o el usuario en una lista de dashboard o en un gráfico y selecciona **View related Security Signals** (Ver señales de seguridad relacionadas). Esto rellena todas las señales de seguridad activadas para esa dirección IP o usuario en el Security Signals Explorer. Si los datos lo permiten, esta vista es útil cuando se intenta correlacionar una dirección IP con un usuario específico, o viceversa. Desde aquí, puedes examinar y verificar cada regla para remediar los ataques. Haz clic en cualquier regla y revisa la información de análisis y respuesta en la pestaña **Rule Details** (Detalles de la regla) para evaluar y corregir adecuadamente el problema.

También se pueden crear dashboards para visualizar datos de autenticación clave como recuentos de inicios de sesión por origen y resultado. Esto te proporciona una visión muy clara de la actividad en toda tu base de usuarios y te ayuda a ver tendencias para identificar picos sospechosos que deberías investigar.

### Utiliza Rehidratación de logs para futuras investigaciones

Datadog ingiere y analiza [todos tus logs][18], asegurándose de que puedes detectar amenazas en todo tu entorno. Puedes archivar cualquier log que [no desees indexar][19] y, luego, [recuperarlo][20] rápidamente en el futuro para investigaciones, auditorías y fines de cumplimiento.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_siem/
[2]: /es/logs/log_collection/?tab=application#application-log-collection
[3]: /es/logs/log_configuration/processors/#grok-parser
[4]: https://www.datadoghq.com/blog/logs-standard-attributes/
[5]: /es/logs/log_configuration/attributes_naming_convention
[6]: /es/logs/log_configuration/attributes_naming_convention/#user-related-attributes
[7]: /es/logs/log_configuration/attributes_naming_convention/#events
[8]: /es/logs/log_configuration/attributes_naming_convention/#web-access
[9]: https://developers.google.com/recaptcha/docs/v3
[10]: https://app.datadoghq.com/security/configuration/rules?product=siem&query=brute%20force%20attack&sort=rule
[11]: https://app.datadoghq.com/security/configuration/rules?product=siem&query=credential%20stuffing%20attack&sort=rule
[12]: /es/cloud_siem/default_rules/
[13]: /es/cloud_siem/explorer
[14]: https://app.datadoghq.com/notebook/credentialstuffingrunbook
[15]: /es/notebooks/#commenting
[16]: https://app.datadoghq.com/screen/integration/security-monitoring-ip-investigation
[17]: https://app.datadoghq.com/screen/integration/security-monitoring-user-investigation
[18]: https://www.datadoghq.com/blog/logging-without-limits/
[19]: /es/logs/log_configuration/indexes/#exclusion-filters
[20]: https://www.datadoghq.com/blog/efficient-log-rehydration-with-datadog/