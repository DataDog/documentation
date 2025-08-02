---
aliases:
- /es/security_platform/application_security/setup_and_configure
- /es/security/application_security/setup_and_configure
- /es/security/application_security/setup_and_configure
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: Protegerse de las amenazas con la protección de aplicaciones y API en Datadog
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas predefinidas para la protección de aplicaciones y API
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Añadir información del usuario a trazas (traces)
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas de AAP
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Funcionamiento de la protección de aplicaciones y API en Datadog
title: Configuración de bibliotecas
---


## Configuración de un encabezado IP de cliente

AAP intenta resolver automáticamente `http.client_ip` de varias cabeceras bien conocidas, como `X-Forwarded-For`. Si utilizas una cabecera personalizada para este campo o si quieres evitar el algoritmo de resolución, configura la variable de entorno `DD_TRACE_CLIENT_IP_HEADER`. Si se configura esta variable, la biblioteca sólo comprueba la cabecera especificada para la IP del cliente.

## Rastrear a los atacantes autentificados

Muchos ataques críticos son realizados por usuarios autenticados que pueden acceder a tus endpoints más confidenciales. Para identificar a los atacantes que generan actividades de seguridad sospechosas, añade información de usuario a trazas instrumentando tus servicios con las etiquetas de usuario estandarizadas. Puedes añadir etiquetas personalizadas a tu tramo raíz o utilizar funciones de instrumentación.

La biblioteca de rastreo de Datadog intenta detectar eventos de inicio de sesión y conexión de los usuarios cuando se utilizan marcos de autenticación compatibles y AAP está habilitado.

Consulta [Seguimiento de la actividad del usuario][1] para obtener más información sobre cómo realizar un seguimiento manual de la actividad del usuario, o [ve cómo desactivar][7] el seguimiento automático.

## Excluir parámetros específicos de la activación de detecciones

Puede haber un momento en que una señal de AAP o una traza de seguridad sean falsos positivos. Por ejemplo, AAP detecta repetidamente
la misma traza de seguridad y se genera una señal, pero esta ya fue revisada y no es una amenaza.

Puedes añadir una entrada a la lista de aprobados, que ignora eventos de una regla, para eliminar los patrones de señales ruidosas y centrarte en las trazas de seguridad legítimas.

Para añadir una entrada a la lista de aprobados, realiza una de las siguientes acciones:

- Haz clic en una señal en [Señales AAP][4] y luego haz clic en el enlace **Add Entry** (Añadir entrada) junto a la acción sugerida **Add to passlist** (Añadir a la lista). Este método añade automáticamente una entrada para el servicio de destino.
- Accede a la [Configuración de la lista de aprobados][5] y manualmente configura una nueva entrada de la lista de aprobados según tus propios criterios.

**Nota**: Las solicitudes (trazas) que coincidan con una entrada de la lista de aprobados no se facturan.

## Cuestiones de seguridad de los datos

Los datos que recopilas con Datadog pueden contener información confidencial que desees filtrar, enmascarar, depurar, filtrar, modificar o simplemente no recopilar. Además, los datos pueden contener tráfico sintético que puede hacer que la detección de amenazas sea inexacta o que Datadog no indique con precisión la seguridad de tus servicios.

Por defecto, AAP recopila información de trazas de seguridad para ayudarte a entender por qué la solicitud fue marcada como sospechosa. Antes de enviar los datos, AAP los analiza en busca de patrones y palabras clave que indiquen que los datos son confidenciales. Si los datos se consideran confidenciales, se sustituyen por una marca `<redacted>`. Esto te permite ver que, aunque la solicitud haya sido sospechosa, los datos solicitados no se recopilaron por motivos de seguridad de los datos. Los datos relacionados con el usuario, como los identificadores de usuario de las solicitudes autenticadas, no forman parte de los datos que se redactan.

Para proteger los datos de los usuarios, **el análisis de datos confidenciales está activado por defecto en AAP**. Puedes personalizar la configuración utilizando las siguientes variables de entorno. El análisis se basa en la [sintaxis RE2][2]. Para personalizar el análisis, configura el valor de estas variables de entorno con un patrón [RE2][9] válido:

* `DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP`: patrón para analizar claves cuyos valores contengan habitualmente datos confidenciales. Si se encuentran, los valores y cualquier nodo secundario asociado a la clave se redactan.
* `DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP`: patrón para analizar valores que puedan indicar datos confidenciales. Si se encuentra, el valor y todos sus nodos secundarios se redactan.



<div class="alert alert-info"><strong>Solo para Ruby, comienza en <code>ddtrace</code> versión 1.1.0</strong>

<p>También puedes configurar patrones de escaneo en código:</p>

```ruby
Datadog.configure do |c|
# ...

# Set custom RE2 regexes
c.appsec.obfuscator_key_regex = '...'
c.appsec.obfuscator_value_regex = '...'
end
```

</div>


Los siguientes son ejemplos de datos que se marcan como confidenciales por defecto:

* `pwd`, `password`, `ipassword`, `pass_phrase`
* `secret`
* `key`, `api_key`, `private_key`, `public_key`
* `token`
* `consumer_id`, `consumer_key`, `consumer_secret`
* `sign`, `signed`, `signature`
* `bearer`
* `authorization`
* `BEGIN PRIVATE KEY`
* `ssh-rsa`

Consulta [Seguridad de datos de APM][3] para obtener información sobre otros mecanismos de Datadog Agent y bibliotecas que también pueden utilizarse para eliminar datos confidenciales.

Consulta [Modos de rastreo automático de los eventos de actividad del usuario][10] para obtener información sobre los modos de rastreo automático de la actividad del usuario y cómo configurarlos. Descubre cómo las bibliotecas de Datadog permiten configurar la instrumentación automática usando la variable de entorno `DD_APPSEC_AUTO_USER_INSTRUMENTATION_MODE` con el nombre abreviado para el modo: `ident|anon|disabled`.


## Configuración de una página de bloqueo personalizada o una carga útil

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="La página que se muestra como AAP bloquea las solicitudes provenientes de IP bloqueadas" width="75%" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/application_security/add-user-info/
[2]: https://github.com/google/re2/wiki/Syntax
[3]: /es/tracing/configure_data_security/
[4]: https://app.datadoghq.com/security/appsec/signals
[5]: https://app.datadoghq.com/security/configuration/asm/passlist
[6]: /es/help/
[7]: /es/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking
[8]: https://app.datadoghq.com/security/configuration/asm/services-config
[9]: https://github.com/google/re2/wiki/Syntax
[10]: /es/security/application_security/how-it-works/add-user-info/?tab=set_user#automatic-user-activity-event-tracking-modes