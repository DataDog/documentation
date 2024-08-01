---
further_reading:
- link: /serverless/configuration/
  tag: Documentación
  text: Configurar la monitorización serverless
- link: /integrations/amazon_lambda/
  tag: Documentación
  text: Integración de AWS Lambda
title: Instalar la monitorización serverless para AWS Step Functions
---

### Requisitos
* La duración total de la ejecución de Step Function debe ser inferior a 90 minutos para las trazas (traces) completas.
* Las trazas de Lambda vinculadas son compatibles con los tiempos de ejecución de Node.js (capa v112+) y Python (capa v95+).

### Cómo funciona
La monitorización de AWS Step Functions de Datadog recopila logs y métricas de integración de AWS y utiliza logs ingeridos de AWS Step Functions para generar métricas y trazas mejoradas para tus ejecuciones de Step Function.

### Configuración

{{< tabs >}}
{{% tab "Marco serverless" %}}

Para los desarrolladores que utilicen el [Marco serverless][4] para desplegar aplicaciones serverless, utiliza el complemento del marco serverless de Datadog.

1. Si aún no lo has hecho, instala el [Complemento del marco serverless de Datadog][1] v5.40.0+:

    ```shell
    serverless plugin install --name serverless-plugin-datadog
    ```

2. Asegúrate de que hayas desplegado el [Datadog Lambda Forwarder][2], una función Lambda que envía logs de AWS a Datadog y de que estés utilizando v3.74.0+. Puede que necesites [actualizar tu Forwarder][5].

   Toma nota del ARN de tu Forwarder.

3. Añade lo siguiente a tu `serverless.yml`:

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
        forwarderArn: <FORWARDER_ARN>
        enableStepFunctionsTracing: true
        propagateUpstreamTrace : true
    ```
    - Sustituye `<DATADOG_SITE>` por {{< region-param key="dd_site" code="true" >}} (asegúrate de haber seleccionado el SITIO correcto del lado derecho).
    - Sustituye `<DATADOG_API_KEY_SECRET_ARN>` por el ARN del secreto de AWS donde hayas almacenado la [clave de la API de Datadog][3] de forma segura. La clave debe almacenarse en una cadena de texto sin formato (no en un blob JSON). El permiso `secretsmanager:GetSecretValue` es obligatorio. Para agilizar el test, puedes utilizar `apiKey` y configurar la clave de la API de Datadog en texto sin formato.
    - Sustituye `<FORWARDER_ARN>` por el ARN de tu Datadog Lambda Forwarder, como se ha indicado anteriormente.
    - `propagateUpstreamTrace`: Opcional. Configúralo en `true` para inyectar el contexto de Step Function en las invocaciones Lambda y Step Function posteriores.

    Para configuraciones adicionales, consulta [Complemento del marco serverless de Datadog - Parámetros de configuración][7].

4. Para los tiempos de ejecución Node.js y Python, configura `mergeStepFunctionAndLambdaTraces:true` en tu archivo `serverless.yaml`. Esto vincula tus trazas de Step Function con trazas Lambda. Si no has instrumentado tus funciones Lambda para enviar trazas, puedes [seguir los pasos para añadir la capa Lambda para tu tiempo de ejecución preferido][8].

[1]: https://docs.datadoghq.com/es/serverless/libraries_integrations/plugin/
[2]: /es/logs/guide/forwarder/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://www.serverless.com/
[5]: /es/logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[6]: logs/guide/forwarder/?tab=cloudformation#installation
[7]: https://github.com/datadog/serverless-plugin-datadog?tab=readme-ov-file#configuration-parameters
[8]: /es/serverless/installation/#installation-instructions
{{% /tab %}}
{{% tab "Datadog CLI" %}}
1. Si aún no lo has hecho, instala [Datadog CLI][1] v2.18.0+.

   ```shell
   npm install -g @datadog/datadog-ci
   ```
2. Asegúrate de que hayas desplegado el [Datadog Lambda Forwarder][2], una función Lambda que envía logs de AWS a Datadog y de que estés utilizando v3.74.0+. Puede que necesites [actualizar tu Forwarder][3].

   Toma nota del ARN de tu Forwarder.
3. Instrumenta tu Step Function.

   ```shell
   datadog-ci stepfunctions instrument \
    --step-function <STEP_FUNCTION_ARN> \
    --forwarder <FORWARDER_ARN> \
    --env <ENVIRONMENT> \
    --propagate-upstream-trace

   ```
   - Sustituye `<STEP_FUNCTION_ARN>` por el ARN de tu Step Function. Repite la marca `--step-function` para cada Step Function que desees instrumentar.
   - Sustituye `<FORWARDER_ARN>` por el ARN de tu Datadog Lambda Forwarder, como se ha indicado anteriormente.
   - Sustituye `<ENVIRONMENT>` por la etiqueta (tag) del entorno que desees aplicar a tu Step Functions.
   - `--propagate-upstream-trace` es opcional y actualiza las definiciones de tu Step Function para inyectar el contexto de Step Function en cualquier invocación de Step Function o Lambda posterior.

   Para obtener más información sobre el comando `datadog-ci stepfunctions`, consulta la [documentación de Datadog CLI][5].

4. Para los tiempos de ejecución de Node.js y Python, añade la marca `--merge-step-function-and-lambda-traces` en tu comando de Datadog-ci. Esto vincula las trazas de tu Step Function con las trazas de Lambda. Si aún no has instrumentado tus funciones Lambda para enviar trazas, puedes [seguir los pasos para añadir la capa Lambda para tu tiempo de ejecución preferido][6].

[1]: /es/serverless/libraries_integrations/cli/
[2]: /es/logs/guide/forwarder/
[3]: /es/logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[4]: logs/guide/forwarder/?tab=cloudformation#installation
[5]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/stepfunctions/README.md
[6]: /es/serverless/installation/#installation-instructions
{{% /tab %}}
{{% tab "Personalizado" %}}

1. Habilita todos los registros para tu Step Function. En tu consola AWS, abre tu máquina de estado. Haz clic en *Edit* (Editar) y busca la sección Registro. Allí, configura *Nivel de log* en `ALL` y activa la casilla *Incluir datos de ejecución*.
   {{< img src="serverless/step_functions/aws_log.png" alt="Interfaz de usuario de AWS, sección Registro, donde se muestra el nivel de log configurado en TODOS." style="width:100%;" >}}

2. Asegúrate de que hayas desplegado el [Datadog Lambda Forwarder][1], una función Lambda que envía logs de AWS a Datadog y de que estés utilizando v3.74.0+. Puede que necesites [actualizar tu Forwarder][2].

   Toma nota del ARN de tu Forwarder.

3. Suscribe los logs de CloudWatch al Datadog Lambda Forwarder. Para ello, tienes dos opciones:
   - **Integración de Datadog-AWS** (recomendada)
     1. Asegúrate de que hayas configurado la [Integración de Datadog-AWS][4].
     2. En Datadog, abre el [cuadro de integración de AWS][5] y ve la pestaña *Configuración*.
     3. A la izquierda, selecciona la cuenta de AWS en la que se ejecuta tu Step Function. Abre la pestaña *Recopilación de logs*.
     4. En la sección *Autosuscripción de logs*, en *Autosuscribir Forwarder Lambda Functions*, introduce el ARN de tu Datadog Lambda Forwarder, como se ha indicado anteriormente. Haz clic en *Add* (Añadir).
     5. Activar *Logs de CloudWatch de Step Functions*. Los cambios tardan 15 minutos en surtir efecto.

     **Nota**: Para la autosuscripción de logs, es necesario  que tu Lambda Forwarder y Step Function estén en la misma región.

   - **Manual**
     1. Asegúrate de que el nombre de tu grupo de logs tenga el prefijo `/aws/vendedlogs/states`. 
     2. Abre tu consola AWS y ve a tu Datadog Lambda Forwarder. En la sección *Información general sobre funciones*, haz clic en *Añadir desencadenador*.
     3. En *Añadir desencadenador*, en la sección *Configuración de desencadenador*, utiliza el desplegable *Seleccionar una fuente* para seleccionar `CloudWatch Logs`.
     4. En *Grupo de logs*, selecciona el grupo de logs para tu máquina de estados. Por ejemplo, `/aws/vendedlogs/states/my-state-machine`.
     5. Introduce un nombre para el filtro. Puedes elegir llamarlo "filtro vacío" y dejar en blanco la casilla *Patrón de filtro*.

<div class="alert alert-warning"> Si utilizas un método instrumentación diferente, como Serverless Framework o Datadog-ci, la activación de la autosuscripción puede crear logs duplicados. Elige un método de configuración para evitar este comportamiento.</a>.</div>

4. Activa métricas mejoradas en tu Step Function añadiendo una etiqueta (tag) `DD_ENHANCED_METRICS`. Configura el valor en `true`. 
5. Activa el rastreo en tu Step Function añadiendo una etiqueta `DD_TRACE_ENABLED`. Configura el valor en `true`.
6. Configura etiquetas. Abre tu consola de AWS y ve a tu máquina de estados de Step Functions. Abre la sección *Etiquetas* y añade etiquetas `env:<ENV_NAME>` y `service:<SERVICE_NAME>`. La etiqueta `env` es necesaria para ver trazas (traces) en Datadog y por defecto es `dev`. La etiqueta `service` por defecto es el nombre de la máquina de estados.
7. Para los tiempos de ejecución de Node.js y Python, puedes vincular tus trazas de Step Function a tus trazas de Lambda. En Lambda Task, configura la clave `Parameters` con lo siguiente: 

   ```json
   "Parameters": {
     "Payload.$": "States.JsonMerge($$, $, false)",
     ...
   }
   ```

   La `JsonMerge` [intrínseca función][6] fusiona el [objeto de contexto de Step Functions ][7] (`$$`) con la carga útil de entrada original de Lambda (`$`). Los campos de la carga útil original sobrescriben el objeto de contexto de Step Functions si tus claves son las mismas.

**Ejemplo**:

{{< highlight json "hl_lines=4-7" >}}
"Lambda Read From DynamoDB": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Parameters": {
        "Payload.$": "States.JsonMerge($$, $, false)",
        "FunctionName": "${lambdaArn}"
      },
      "End": true
    }
{{< /highlight >}}

Como alternativa, si tienes una lógica de negocio definida en la carga útil, también podrías utilizar lo siguiente:

{{< highlight json "hl_lines=8-10" >}}
"Lambda Read From DynamoDB": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "Parameters": {
        "Payload": {
          ...
          "Execution.$": "$$.Execution",
          "State.$": "$$.State",
          "StateMachine.$": "$$.StateMachine"
        },
        "FunctionName": "${lambdaArn}"
      },
      "End": true
    }
{{< /highlight >}}

Si aún no has instrumentado tus funciones Lambda para enviar trazas, puedes [seguir los pasos para añadir la capa Lambda para tu tiempo de ejecución preferido][3].

[1]: /es/logs/guide/forwarder/
[2]: /es/logs/guide/forwarder/?tab=cloudformation#upgrade-to-a-new-version
[3]: /es/logs/guide/forwarder/?tab=cloudformation#installation
[4]: /es/getting_started/integrations/aws/
[5]: https://app.datadoghq.com/integrations/aws
[6]: https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-intrinsic-functions.html#asl-intrsc-func-json-manipulate
[7]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-contextobject.html
{{% /tab %}}
{{< /tabs >}}



## Consulta tus métricas, logs y trazas de Step Function en Datadog

Después de haber invocado tu máquina de estados, ve a la [**Aplicación serverless**][2] en Datadog. Busca`service:<YOUR_STATE_MACHINE_NAME>` para ver las métricas, logs y trazas relevantes asociados con esa máquina de estados. Si configuras la etiqueta `service` en tu máquina de estados en un valor personalizado, busca `service:<CUSTOM_VALUE>`.

{{< img src="serverless/step_functions/overview1.png" alt="Una vista del panel lateral de AWS Step Function." style="width:100%;" >}}

Si no puedes ver tus trazas, consulta [Solucionar problemas][5].

[2]: https://app.datadoghq.com/functions?search=&cloud=aws&entity_view=step_functions
[3]: /es/serverless/installation/#installation-instructions
[5]: /es/serverless/step_functions/troubleshooting