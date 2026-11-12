---
aliases:
- /es/tracing/trace_collection/dynamic_instrumentation/sensitive-data-scrubbing/
- /es/dynamic_instrumentation/sensitive-data-scrubbing/
- /es/tracing/dynamic_instrumentation/sensitive-data-scrubbing
description: Proteja los datos confidenciales de la aplicación capturados por Live
  Debugger.
further_reading:
- link: /tracing/live_debugger/#setup
  tag: Documentación
  text: Configuración de Live Debugger
- link: /security/sensitive_data_scanner/
  tag: Documentación
  text: Sensitive Data Scanner
title: Ocultamiento de datos confidenciales de Live Debugger
---
## Descripción general {#overview}

[Live Debugger][5] captura registros e instantáneas de variables que pueden contener datos confidenciales de la aplicación, especialmente al usar la opción {{< ui >}}Capture Variables{{< /ui >}}.

Los siguientes mecanismos de ocultamiento ayudan a proteger los datos capturados:

- **Las reglas de identificadores y tipos** ocultan los valores coincidentes en su infraestructura antes de que se carguen.
- **Los modos de ocultamiento de Live Debugger** controlan qué valores capturados son visibles. Consulte [ocultamiento basado en modos](#mode-based-redaction).
- **Las reglas de Sensitive Data Scanner** ocultan los datos coincidentes después de que llegan a Datadog. Consulte [Sensitive Data Scanner](#redact-based-on-variable-values-with-sensitive-data-scanner). Estas reglas no sustituyen a las reglas que evitan que los valores confidenciales salgan de su infraestructura.

## Ocultamiento basado en modos {#mode-based-redaction}

Live Debugger tiene dos modos de ocultamiento:

- {{< ui >}}Strict Mode{{< /ui >}}: Redacta todos los valores excepto números y booleanos. [Bits Live Debugger][8] no está disponible para combinaciones de servicio y entorno configuradas en {{< ui >}}Strict Mode{{< /ui >}}.
- {{< ui >}}Targeted Mode{{< /ui >}}: Redacta patrones confidenciales conocidos como números de tarjetas de crédito, claves de API, direcciones IP y otra información de identificación personal (PII). También ejecuta un escáner de secretos de alta entropía que oculta automáticamente los posibles secretos, que aparecen como `[REDACTED:HIGH_ENTROPY]` en los datos capturados.

Estos modos de ocultamiento no se pueden desactivar, solo cambiar. El modo dirigido (Targeted Mode) se aplica automáticamente en entornos comunes de preproducción como `staging` o `preprod`. Cambiar el modo de ocultamiento requiere el permiso **Live Debugger Redaction Write**.

## Oculte según los identificadores {#redact-based-on-identifiers}

### Comportamiento predeterminado {#default-behavior}

Live Debugger oculta automáticamente los valores vinculados a identificadores sensibles, como `password` y `accessToken`, antes de que los datos capturados salgan del servidor. Cada SDK incorpora reglas adicionales de ocultamiento específicas del lenguaje. Consulte [identificadores ocultos][1].

### Ocultamiento personalizado de identificadores {#custom-identifier-redaction}

Puede personalizar aún más el ocultamiento especificando identificadores adicionales. En el entorno de su aplicación (no en `datadog-agent`), establezca la variable de entorno `DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS` en una lista de identificadores separados por comas, como `firstName,lastName,phoneNumber`.

Para excluir identificadores específicos de la lista predeterminada de ocultamiento, establezca la variable de entorno `DD_DYNAMIC_INSTRUMENTATION_REDACTION_EXCLUDED_IDENTIFIERS` en una lista de identificadores separados por comas que no deban ocultarse, como `cookie,sessionid`.

El ocultamiento se aplica universalmente, independientemente de cómo se utilice el identificador en el código (como argumentos de método, variables locales, atributos de clase, claves de diccionario, etcétera). Los valores asociados se ocultan en su infraestructura y no se cargan en Datadog.

## Oculte según clases o tipos específicos {#redact-based-on-specific-classes-or-types}

Ciertas clases pueden contener inherentemente información confidencial (por ejemplo, una clase `UserCredentials`). Nuevamente en el entorno de su aplicación (no en `datadog-agent`), establezca la variable de entorno `DD_DYNAMIC_INSTRUMENTATION_REDACTED_TYPES` en una lista de tipos confidenciales separados por comas, como `MyCompany.Authentication.UserCredential,MyCompany.BillingAddress`.

Ocultamiento basado en clases:

- Oculta variables de los tipos enumerados. Sus contenidos no se cargan en Datadog.
- Evita que se establezcan sondas en cualquier ubicación del código de las clases sujetas a ocultamiento de datos.

## Oculte según los valores de las variables con Sensitive Data Scanner {#redact-based-on-variable-values-with-sensitive-data-scanner}

[Sensitive Data Scanner][3] identifica y oculta información confidencial según expresiones regulares específicas.

### Configure reglas de Sensitive Data Scanner {#configure-sensitive-data-scanner-rules}

Cree, personalice o deshabilite reglas en la [página de Sensitive Data Scanner][4]. Al crear una regla, establezca su filtro en `source:dd_debugger` para aplicarla a los registros de Live Debugger. Para obtener instrucciones de configuración, consulte la [documentación de Sensitive Data Scanner][3].

**Nota**: Datadog Sensitive Data Scanner oculta la información _después_ de que se carga en Datadog.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java
[3]: /es/security/sensitive_data_scanner/
[4]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[5]: /es/tracing/live_debugger/
[8]: /es/tracing/live_debugger/bits-live-debugger/