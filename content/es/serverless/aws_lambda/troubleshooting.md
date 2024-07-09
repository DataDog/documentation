---
aliases:
- /es/serverless/guide/troubleshoot_serverless_monitoring
- /es/serverless/guide/troubleshooting
- /es/serverless/troubleshooting
further_reading:
- link: /serverless/installation/
  tag: Documentación
  text: Instalación de Serverless Monitoring
- link: /serverless/guide/#troubleshoot-your-installation
  tag: Documentación
  text: Solucionar problemas comunes
kind: documentación
title: Solucionar problemas relacionados con la monitorización de AWS Lambda
---

<div class="alert alert-info">Consulta las <a href="/serverless/guide/#troubleshoot-your-installation">guías de solución de problemas</a> adicionales para problemas comunes como un tamaño de código de función demasiado grande o la compatibilidad con webpack. Esta guía te ayuda a solucionar problemas generales de recopilación de telemetría.</div>

## Comprender los conceptos básicos

Para comprender mejor las instrucciones de esta guía, familiarízate primero con los [conceptos clave][1]. Una mejor comprensión de cómo funcionan las cosas te ayudará a identificar las piezas que faltan y a reducir las causas probables.

## Utilizar la extensión Datadog Lambda en lugar del Forwarder

Si todavía utilizas la [Función de Lambda del Datadog Forwarder][2] para la recopilación de datos, considera la posibilidad de adoptar la [Extensión Datadog Lambda][3] en su lugar. Dado que las limitaciones técnicas de Lambda del Forwarder provocan una serie de problemas conocidos, migrar a la extensión de Lambda puede resolverlos automáticamente.

* Si no sabes si tu función de Lambda utiliza la extensión, verifica las [configuraciones de las capas][4] de tu función de Lambda y comprueba si alguna capa de Lambda tiene el nombre `Datadog-Extension`.

* Si no sabes si tu función de Lambda utiliza el Forwarder, verifica los [filtros de suscripción][5] del grupo de logs de tu función de Lambda y comprueba si el grupo de logs tiene una función de Lambda suscrita a `Datadog Forwarder` o algo con un nombre similar.

Consulta esta [guía de comparación][6] para comprender las ventajas de utilizar la extensión y esta [guía de migración][7] para ver los pasos de migración generales. ¡Prueba los cambios en un entorno de desarrollo o de prueba primero!

Para seguir utilizando el Forwarder, consulta esta [guía de solución de problemas del Forwarder][8] para obtener más ayuda.

## Asegurarse de que las configuraciones están actualizadas y son las esperadas

Comprueba las [guías de instalación][9] con instrucciones actualizadas sobre las aplicaciones que quizás hayas configurado anteriormente para la monitorización de Datadog.

Para asegurarte de que los cambios reales realizados en tus funciones de Lambda son los esperados, prueba con definir otra función de prueba y configurarla siguiendo las instrucciones de la _CLI de Datadog_ o _Personalización_. Compara los cambios (como el controlador, las capas, las variables de entorno y las etiquetas [tags]) efectuados en tus funciones de Lambda reales con la función de prueba.

## Recopilar logs de depuración

Define la variable de entorno `DD_LOG_LEVEL` como `debug` en tus funciones de Lambda para habilitar los logs de depuración detallados. Si utilizas la [Función de Lambda del Datadog Forwarder][2] para el reenvío de datos de logs, define también `DD_LOG_LEVEL` como `debug` en la función de Lambda del Forwarder.

Si tienes problemas con el rastreo, define la variable de entorno `DD_TRACE_DEBUG` como `true` para obtener logs de depuración adicionales del rastreador de Datadog.

Para evitar costes innecesarios, deshabilita los logs de depuración después de recopilar suficientes datos.

## Comprobar la integración de AWS

Datadog puede recopilar métricas y etiquetas de recursos de AWS a través de una [integración con AWS][10] (opcional). Si te faltan determinados métricas de CloudWatch y etiquetas de recursos de Lambda, asegúrate de que la integración de AWS esté correctamente configurada.

## Asegúrese de que las etiquetas están configuradas

Si tienes problemas para aplicar las etiquetas estándar de Datadog `service`, `env` y `version` a los datos recopilados, asegúrate de que las variables de entorno `DD_SERVICE`, `DD_ENV` y `DD_VERSION` estén configuradas en tus funciones de Lambda. En el caso de las etiquetas personalizadas, asegúrate de que `DD_TAGS` esté configurada.

Si quieres enriquecer los datos recopilados con las etiquetas de recursos de AWS Lambda, asegúrate de que la [Integración de Datadog para AWS][10] esté correctamente configurada.

## Obtener ayuda

Para hacer preguntas rápidas, publícalas en el canal _#serverless_ de la [Comunidad de Slack de Datadog][11].

Si seguiste todos los pasos anteriores para solucionar problemas y quieres obtener ayuda del [Servicio de asistencia de Datadog][12], utiliza uno de los siguientes métodos para enviar la información de la configuración pertinente al servicio de asistencia.

{{< tabs >}}
{{% tab "Serverless Flare" %}}
1. Crea un [ticket de Zendesk](https://help.datadoghq.com/hc/en-us/requests/new).
2. Descarga la última versión de la [CLI de Datadog](https://github.com/DataDog/datadog-ci/#how-to-install-the-cli).

    ```sh
    npm install -g @datadog/datadog-ci
    ```

3. Utiliza el comando Serverless Flare desde la raíz del directorio de tu proyecto para recopilar y enviar automáticamente los datos de tu función de Lambda al Servicio de asistencia de Datadog.

    ```sh
    datadog-ci lambda flare -f <function_arn> -e <email> -c <case_id> --with-logs
    ```

<div class="alert alert-info">Para obtener más información sobre Serverless Flare, lee la <a href="https://github.com/DataDog/datadog-ci/blob/master/src/commands/lambda/README.md#troubleshooting-serverless-instrumentation">documentación del comando</a>.</div>
{{% /tab %}}
{{% tab "Manually" %}}

Crea un [ticket de Zendesk](https://help.datadoghq.com/hc/en-us/requests/new) e incluye la siguiente información:

1. Información básica sobre tu función de Lambda: ARN, tiempo de ejecución, controlador, capas, variables de entorno y etiquetas. Céntrate primero en una función si tienes el mismo problema con varias.
2. Si la función de Lambda está configurada para enviar datos a través de logs con el Datadog Forwarder, incluye información básica sobre la función de Lambda del Forwarder. Asimismo, indica los filtros de suscripción configurados en el grupo de logs de tu función de Lambda.
3. El método de instalación que usaste, como _Serverless Framework_ o _AWS CDK_.
4. El método de instalación alternativo que probaste, como la _CLI de Datadog_ o _Personalización_.
5. Los logs de depuración de tu propia función de Lambda.
6. Los logs de depuración de la función de Lambda del Datadog Forwarder (si los utilizaste).
7. Los archivos de configuración del proyecto, con los **secretos cifrados redactados**, como `serverless.yaml`, `package.json`, `package-lock.json`, `yarn.lock`, `tsconfig.json` y `webpack.config.json`.
{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/serverless/glossary/#datadog-serverless-for-aws-lambda-concepts
[2]: /es/logs/guide/forwarder/
[3]: /es/serverless/libraries_integrations/extension/
[4]: https://docs.aws.amazon.com/lambda/latest/dg/invocation-layers.html
[5]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html
[6]: /es/serverless/guide/extension_motivation/
[7]: /es/serverless/configuration/#migrate-to-the-datadog-lambda-extension
[8]: /es/logs/guide/lambda-logs-collection-troubleshooting-guide/
[9]: /es/serverless/installation/
[10]: /es/integrations/amazon_web_services/
[11]: https://chat.datadoghq.com/
[12]: https://www.datadoghq.com/support/