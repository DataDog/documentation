---
disable_toc: false
further_reading:
- link: /sensitive_data_scanner/
  tag: Documentación
  text: Configurar Sensitive Data Scanner
- link: /sensitive_data_scanner/regular_expression_syntax
  tag: Documentación
  text: Sintaxis de expresiones regulares para reglas personalizadas
title: Prácticas recomendadas para crear reglas personalizadas
---

## Información general

Sensitive Data Scanner utiliza reglas de escaneo para identificar, etiquetar y, opcionalmente, redactar datos confidenciales en tus logs, eventos de APM y eventos de RUM. Utiliza [reglas de escaneo predefinidas][3] o crea reglas personalizadas utilizando patrones de [expresión regular][1] (regex). Esta guía repasa las prácticas recomendadas para crear reglas personalizadas utilizando patrones de expresión regular.

## Utilizar patrones de expresión regular precisos

Define patrones de expresión regular lo más precisos posible, ya que los patrones genéricos dan lugar a más falsos positivos. Para refinar tu patrón de expresión regular, añade datos de test en el comprobador de datos de muestra al crear una regla personalizada. Para obtener más información, consulta el paso 2 de [Añadir una regla de escaneo personalizada][2].

{{< img src="sensitive_data_scanner/guides/regex_sample_test.mp4" alt="Testear un patrón de expresión regular con una muestra que coincide y otra que no" video=true >}}

## Afinar la coincidencia de patrones de expresión regular

Proporciona una lista de palabras clave al diccionario de palabras clave para refinar la coincidencia de patrones de expresión regular. El diccionario busca el patrón coincidente dentro de una proximidad definida de esas palabras clave. Por ejemplo, si estás buscando contraseñas, puedes añadir palabras clave como `password`, `token`, `secret` y `credential`. También puedes especificar que estas palabras clave estén dentro de un determinado número de caracteres de una coincidencia. Por defecto, las palabras clave deben estar dentro de los 30 caracteres anteriores a un valor coincidente. Consulta el paso 2 de [Añadir una regla de escaneo personalizada][2] para obtener más información.

{{< img src="sensitive_data_scanner/guides/password_keyword.png" alt="Un diccionario de palabra clave con contraseña, token, secreto, credencial" style="width:90%;" >}}

Para que las coincidencias sean más precisas, también puedes hacer una de las siguientes cosas:

- Escanea todo el evento, pero excluye ciertos atributos del escaneo. Por ejemplo, si buscas información personal identificable (IPI), como nombres, puedes excluir atributos como `resource_name` y `namespace`.
- Busca atributos específicos para acotar el contexto de los datos escaneados. Por ejemplo, si buscas nombres, puedes seleccionar atributos específicos como `first_name` y `last_name`.

Consulta el paso 3 de [Añadir una regla de escaneo personalizada][2] para obtener más información.

{{< img src="sensitive_data_scanner/guides/include_exclude_attributes.mp4" alt="Excluye atributos al escanear un evento entero o escanea atributos específicos" video=true >}}

## Utilizar reglas predefinidas

En la medida de lo posible, utiliza las [reglas de biblioteca][3] predefinidas de Datadog. Estas reglas son reglas predefinidas que detectan patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, información de redes y dispositivos, entre otros. Cada regla tiene palabras clave recomendadas para el diccionario de palabras clave para refinar la precisión de las coincidencias. También puedes [añadir tus propias palabras clave][5]. 

[Ponte en contacto con el servicio de asistencia][4] si hay una regla que deseas utilizar y crees que otros usuarios también se beneficiarían de ella.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/sensitive_data_scanner/scanning_rules/custom_rules/
[2]: /es/sensitive_data_scanner/setup/telemetry_data/#add-scanning-rules
[3]: /es/sensitive_data_scanner/scanning_rules/library_rules/
[4]: /es/help/
[5]: /es/sensitive_data_scanner/setup/telemetry_data/#add-additional-keywords