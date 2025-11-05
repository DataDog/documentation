---
title: Actualizar la instrumentación de funciones de Lambda para Java
---

Este documento contiene instrucciones para actualizar la instrumentación de Datadog de Lambda para Java. Si es la primera vez que configuras la instrumentación, sigue las [instrucciones de instalación de Lambda para Java][1] en su lugar.

Las capas de Lambda de Datadog `dd-trace-java:5` y `Datadog-Extension:25` introducen los siguientes cambios en el proceso de configuración de la instrumentación en las funciones de Lambda para Java:

1. La librería [datadog-lambda-java][2] está obsoleta y no es necesaria.
2. No es necesario realizar cambios en el código (como la envoltura `DDLambda`), excepto en el caso de la instrumentación personalizada.
3. Puedes configurar Datadog mediante la integración [Datadog CI][3] y el complemento [Datadog Serverless Plugin][4].

### Actualizar

1. Elimina la librería `datadog-lambda-java` de `build.gradle` o `pom.xml`, puesto que ya no es necesaria.
2. Elimina `DDLambda` y la sentencia "import" del código de tu función.
3. Define la variable de entorno `AWS_LAMBDA_EXEC_WRAPPER` como `/opt/datadog_wrapper`.
4. Cambia la versión de `dd-trace-java` a `{{< latest-lambda-layer-version layer="dd-trace-java" >}}` y `Datadog-Extension` a `{{< latest-lambda-layer-version layer="extension" >}}`.
5. Si envías métricas personalizadas mediante la función auxiliar `DDLambda.metric()`, utiliza el [cliente de DogStatsD para Java][5] estándar y sigue el [código de ejemplo][6] para enviar una métrica como distribución. Ten en cuenta que [en Lambda solo puedes utilizar distribuciones][7].

[1]: /es/serverless/installation/java/
[2]: https://github.com/DataDog/datadog-lambda-java
[3]: /es/serverless/installation/java/?tab=datadogcli
[4]: /es/serverless/installation/java/?tab=serverlessframework
[5]: /es/developers/dogstatsd/?tab=hostagent&code-lang=java
[6]: /es/serverless/custom_metrics/?code-lang=java#with-the-datadog-lambda-extension
[7]: /es/serverless/custom_metrics#understanding-distribution-metrics
