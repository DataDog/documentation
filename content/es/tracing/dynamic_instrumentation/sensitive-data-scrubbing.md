---
aliases:
- /es/dynamic_instrumentation/sensitive-data-scrubbing/
description: Protegeja la información confidencial configurando mecanismos de redacción
  y de limpieza para Dynamic Instrumentation.
further_reading:
- link: /dynamic_instrumentation/enabling/
  tag: Documentación
  text: Configuración de Dynamic Instrumentation
- link: /security/sensitive_data_scanner/
  tag: Documentación
  text: Sensitive Data Scanner
title: Limpieza de datos sensibles de Dynamic Instrumentation
---

## Información general

Datadog Dynamic Instrumentation mejora la capacidad de observación y de depuración de tus aplicaciones mediante la captura de datos variables en ubicaciones arbitrarias del código en entornos de producción. También puedes elaborar y evaluar expresiones en tiempo real e integrar sus resultados en mensajes de logs o añadirlos como etiquetas (tag) de tramos (span ).

Aunque esta funcionalidad es potente, también presenta la posibilidad de fugas de datos confidenciales, tanto intencionadas como no intencionadas. Junto con las sólidas capacidades de captura de datos del producto, también ofrece medidas exhaustivas para salvaguardar la información confidencial.

Cuando conozcas y configures correctamente estos mecanismos de redacción, podrás utilizar Dynamic Instrumentation con confianza y seguridad.

## Redactar a partir de identificadores

### Comportamiento por defecto

Dynamic Instrumentation redacta automáticamente los valores vinculados a identificadores específicos considerados confidenciales, como `password` y `accessToken`. Consulta la [ lista completa de identificadores redactados][1].

### Redacción de identificadores personalizados

Puedes personalizar aún más la redacción especificando identificadores adicionales. En el entorno de tu aplicación (no en el `datadog-agent`), configura la variable de entorno `DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS` en una lista de identificadores separados por comas, como `firstName,lastName,phoneNumber`.

Para excluir identificadores específicos de la lista de redacción predeterminada, configura la variable de entorno `DD_DYNAMIC_INSTRUMENTATION_REDACTION_EXCLUDED_IDENTIFIERS` en una lista separada por comas de identificadores que no deben redactarse, como `cookie,sessionid`.

La redacción se aplica universalmente, independientemente de cómo se utilice el identificador en el código (como argumentos de método, variables locales, atributos de clase, claves de diccionario, etc.). Los valores asociados se redactan en tu infraestructura y no se cargan en Datadog.

## Redactar en función de clases o tipos específicos

Ciertas clases pueden contener intrínsecamente información confidencial (por ejemplo, una clase `UserCredentials`). Nuevamente, en el entorno de tu aplicación (no en el `datadog-agent`), configura la variable de entorno `DD_DYNAMIC_INSTRUMENTATION_REDACTED_TYPES` en una lista separada por comas de clases sensibles, como `MyCompany.Authentication.UserCredential,MyCompany.BillingAddress`.

Redacción por clases:

- Redacta variables de los tipos indicados. Su contenido no se carga en Datadog.
- Impide que se configuren sondas dentro de cualquier ubicación de código en las clases redactadas.

## Redactar en función de valores de variables con Sensitive Data Scanner

[Sensitive Data Scanner][3] identifica y redacta información confidencial basándose en expresiones regulares específicas.

### Configuración inicial

Cuando accedes por primera vez a la [configuración de Dynamic Instrumentation][2], puedes configurar opcionalmente reglas predeterminadas de Sensitive Data Scanner para Dynamic Instrumentation. Estas cubren expresiones regulares comunes para datos probablemente confidenciales como direcciones de correo electrónico o tokens JWT.

### Personalización de Sensitive Data Scanner

Puedes desactivar las reglas por defecto o crear otras a través del [Sensitive Data Scanner][4]. Para crear una nueva regla de Sensitive Data Scanner para Dynamic Instrumentation, configúrala para que filtre en `source:dd_debugger`.

**Nota**: Datadog Sensitive Data Scanner realiza su redacción _después_ de que la información se cargue en Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-debugger/debugger-bootstrap/src/main/java/datadog/trace/bootstrap/debugger/util/Redaction.java
[2]: https://app.datadoghq.com/dynamic-instrumentation/setup
[3]: /es/security/sensitive_data_scanner/
[4]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner