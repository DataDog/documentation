---
disable_toc: false
further_reading:
- link: /sensitive_data_scanner/
  tag: Documentación
  text: Configurar Sensitive Data Scanner
title: Redactar todos los correos electrónicos excepto los de un dominio específico
  en logs
---

## Información general

Esta guía te explica cómo redactar todos los correos electrónicos, excepto los de un dominio de correo electrónico específico (por ejemplo, `@test.com`), en tus logs.

## Configurar un grok parser en tu pipeline de logs 

Si el dominio de correo electrónico que no deseas censurar no es un atributo existente del log, configura un grok parser para identificar todos los logs con el dominio de correo electrónico y añádelo como atributo.

1. Navega hasta [Log Pipeline][1] (Pipeline de logs).
1. Selecciona tu pipeline.
1. Haz clic en **Add processor** (Añadir procesador).
1. Selecciona **Grok Parser**.
1. Introduce un nombre para el grok parser.
1. Define las reglas de parseo para identificar todos los logs con la dirección de correo electrónico. Por ejemplo, si estos son los mensajes de log que contienen direcciones de correo electrónico con el dominio:
    ```
    message successfully sent to 123@test.com
    ```
    ```
    message successfully received from 256@test.com
    ```
    A continuación, utiliza las siguientes reglas de parseo:
    ```
    MyParsingRule1 message successfully sent to %{notSpace:user_handle}@%{notSpace:domain}

    MyParsingRule2 message successfully received from %{notSpace:user_handle}@%{notSpace:domain}
    ```
    **Nota:** No es necesario conservar el nombre de usuario. Por ejemplo, si deseas redactar todos los correos electrónicos con el dominio `test.com`, entonces para un correo electrónico como `hello@test.com`, descarta el nombre de usuario `hello` y sólo mantén el dominio `test.com`.
1. Haz clic en **Save** (Guardar).

Navega al [Loguear Explorer][2] para confirmar que los nuevos logs que llegan con esos correos electrónicos se están procesando como se esperaba.

{{< img src="sensitive_data_scanner/guides/domain_attribute.png" alt="El atributo de dominio en el panel lateral del log" style="width:80%;" >}}

## Añadir el atributo de dominio de correo electrónico como una faceta

1. En el [Log Explorer][2], selecciona un log que contenga un correo electrónico con el dominio especificado.
1. Haz clic en el engranaje situado junto al atributo de dominio que acabas de crear.
1. Selecciona **Create facet for...** (Crear faceta para...).
1. Opcionalmente, añade la faceta a un grupo en la sección **Advanced Options** (Opciones avanzadas).
1. Haz clic en **Add** (Añadir).

## Configurar el grupo de escaneo de Sensitive Data Scanner para filtrar logs con tu atributo de dominio

Actualiza el grupo de escaneo de tu Sensitive Data Scanner para filtrar logs con el atributo de dominio que has creado, de modo que sólo se redacten los logs que no tengan ese dominio de correo electrónico.

1. Navega a la página de [Configuración][3] del Sensitive Data Scanner.
1. Haz clic en el icono del lápiz situado a la izquierda del grupo de escaneo que deseas actualizar.
1. En el campo **Filter** (Filtro), añade el atributo de dominio para que se filtren los logs con ese atributo. Por ejemplo, para filtrar los logs con el dominio de correo electrónico `test.com`, añade `-@domain:test.com` a la consulta de filtrado.
{{< img src="sensitive_data_scanner/guides/scanning_group_filter_domain.png" alt="La consulta de filtro del grupo de escaneo con -@domain:test.com" style="width:100%;" >}}
1. Haz clic en **Update** (Actualizar).

Navega al [Log Explorer][2] para confirmar que los nuevos logs que llegan no tienen correos electrónicos con el dominio especificado redactados.

{{< img src="sensitive_data_scanner/guides/log_explorer_domain.png" alt="El Log Explorer que muestra los logs con las direcciones de correo electrónico redactadas y un log que muestra el correo electrónico test.com sin redactar" style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration