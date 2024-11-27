---
categories:
- recopilación de logs
custom_kind: integration
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/fluentbit.md
description: Configura Fluent Bit para recopilar, analizar y reenviar datos de logs
  de diversas fuentes.
doc_link: /integrations/fluentbit/
further_reading:
- link: https://www.datadoghq.com/blog/fluentbit-integration-announcement/
  tag: Blog
  text: Centralizar tus logs con Datadog y Fluent Bit
has_logo: true
integration_id: fluentbit
integration_title: Fluent Bit
is_public: true
name: fluentbit
public_title: Integración de Datadog y Fluent Bit
short_description: Recopila, analiza y reenvía datos de logs procedentes de diversas
  fuentes.
title: Fluent Bit
---

## Información general

Configura Fluent Bit para recopilar, analizar y reenviar datos de logs de diversas fuentes diferentes a Datadog para su monitorización. Fluent Bit ocupa poca memoria (~450 KB), por lo que puedes utilizarlo para recopilar logs en entornos con recursos limitados, como servicios en contenedores y sistemas Linux integrados. El [complemento de salida Fluent Bit Datadog][1] admite Fluent Bit v1.3.0 o posterior.

## Configuración

A continuación, verás las instrucciones para configurar Fluent Bit en un host. Para Amazon ECS, consulta [ECS Fluent Bit y FireLens][2].

### Recopilación de logs

Antes de empezar, necesitas tener una [cuenta de Datadog][3], una [clave de API Datadog][4] y también necesitas [activar la gestión de logs de Datadog][5].

1. [Instala][6] y [configura][7] Fluent Bit utilizando su método recomendado de un archivo de configuración.
2. Actualiza tu [archivo de configuración de Fluent Bit][8] para añadir Datadog como complemento de salida. Para obtener más información sobre los parámetros de configuración, consulta la [tabla de parámetros de configuración](#configuration-parameters). Para ver un ejemplo de la sección de configuración de `[OUTPUT]`, consulta el [ejemplo de archivo de configuración](#configuration-file-example).
3. Una vez que empieces a enviar logs desde Fluent Bit, comprueba los logs en la [página del Explorador de logs de Datadog][9].

#### Parámetros de configuración

| Clave            | Descripción                                                                                                                                                                                                                                                                                                                 | Por defecto                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                    | --------------------------------------------------------------------------- |
| Host           | Obligatorio - Servidor Datadog al que envías tus logs.                                                                                                                                                                                                                                                            | {{< region-param key="http_endpoint" code="true" >}}                        |
| TLS            | Obligatorio - Protocolo de seguridad de comunicaciones de seguridad de extremo a extremo. Este parámetro debe estar configurado en `on`.                                                                                                                                                                                                                        | `off`                                                                       |
| apikey         | Obligatorio - Tu [clave de API Datadog][4].                                                                                                                                                                                                                                                                                     |                                                                             |
| compress       | Recomendado - Comprime la carga útil en formato GZIP. Datadog es compatible y recomienda configurarla como `gzip`.                                                                                                                                                                                                              |                                                                             |
| dd_service     | Recomendado - Nombre legible por seres humanos para tu servicio que genera logs, nombre de tu aplicación o base de datos.                                                                                                                                                                                                     |                                                                             |
| dd_source      | Recomendado - Nombre legible por seres humanos para la tecnología subyacente de tu servicio. Por ejemplo, `postgres` o `nginx`.                                                                                                                                                                                                    |                                                                             |
| dd_message_key | Recomendado - Define el atributo que se utilizará para almacenar tu mensaje de log.                                                                                                                                                                                                                                                         |                                                                             |
| dd_tags        | Opcional - [Etiquetas (tags)][10] que quieres asignar a tus logs en Datadog.                                                                                                                                                                                                                                                     |                                                                             |
| dd_hostname    | Opcional - Host al que deben asociarse los logs emitidos. Si no se define, Datadog espera que el host se defina como uno de los [atributos de host estándar][12].
| proveedor       | Opcional - Proveedor que se utilizará. Defínelo en `ecs` si quieres enviar logs desde tus tareas Fargate a Datadog.                                                                                                                                                                                                            |                                                                             |

#### Ejemplo de archivo de configuración

```text
[OUTPUT]
    Name              datadog
    Match             *
    Host              http-intake.logs.datadoghq.com
    TLS               on
    compress          gzip
    apikey            <DATADOG_API_KEY>
    dd_service        <APPLICATION_SERVICE>
    dd_source         <SOURCE>
    dd_message_key    log
    dd_tags           env:dev,<TAG_KEY>:<TAG_VALUE>
```

## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.fluentbit.io/manual/output/datadog
[2]: /es/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens
[3]: https://app.datadoghq.com/signup
[4]: /es/account_management/api-app-keys/
[5]: https://app.datadoghq.com/logs/activation
[6]: https://docs.fluentbit.io/manual/installation/sources/build-and-install
[7]: https://docs.fluentbit.io/manual/administration/configuring-fluent-bit
[8]: https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/configuration-file
[9]: https://app.datadoghq.com/logs
[10]: /es/getting_started/tagging/
[11]: /es/help/
[12]: /es/logs/log_configuration/pipelines/?tab=host#preprocessing