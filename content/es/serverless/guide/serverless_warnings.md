---
aliases:
- /es/serverless/troubleshooting/insights/
- /es/serverless/insights/
- /es/serverless/guide/insights
further_reading:
- link: https://www.datadoghq.com/blog/serverless-insights/
  tag: Blog
  text: Lee más sobre la información de las aplicaciones serverless
title: Advertencias de las aplicaciones serverless
---

Datadog genera automáticamente sugerencias para resolver errores y problemas de rendimiento y optimiza el coste de las aplicaciones serverless.

Además de la información que facilita [Watchdog for Serverless][1], Datadog Serverless Monitoring detecta una serie de problemas relacionados con las funciones y crea **advertencias**.


## Configuración

Datadog utiliza métricas de AWS CloudWatch, métricas de AWS Lambda mejoradas para Datadog y [líneas de logs `REPORT` de Lambda][2] para sugerir advertencias. Si quieres configurarlas, haz lo siguiente:

 1. Configura la integración de [Amazon Web Services][3].
 2. Configura el [Datadog Forwarder][4] y asegúrate de que tus logs `REPORT` de Lambda estén indexados en Datadog.
 3. Habilita las [Métricas de Lambda mejoradas][5] para tus funciones.

**Nota**: Datadog genera las advertencias [Errores graves](#high-errors), [Duración prolongada](#high-duration), [Limitaciones](#throttles) y [Duración prolongada del iterador](#high-iterator-age) de forma inmediata una vez que se configura la [integración de AWS][3]. Todas las demás advertencias, incluidas las que se generan en invocaciones individuales, requieren el [Datadog Forwarder][4] y las [Métricas de Lambda mejoradas][5].

## Las advertencias que se generan

### Errores

Más del 1 % de las invocaciones de la función fueron errores en el intervalo seleccionado.

**Solución:** examina los logs de la función, comprueba si hay cambios recientes en el código o en la configuración con el [Seguimiento del despliegue][6] o busca errores en los microservicios con el [rastreo distribuido][7].

### Errores graves

Más del 10 % de las invocaciones de la función fueron errores en el intervalo seleccionado.

**Solución:** examina los logs de la función, comprueba si hay cambios recientes en el código o en la configuración con el [Seguimiento del despliegue][6] o busca errores en los microservicios con el [rastreo distribuido][7].

### Uso elevado de memoria

Al menos una invocación en el intervalo seleccionado utilizó más del 95 % de la memoria asignada.

El [rastreo distribuido][7] puede ayudarte a localizar las funciones de Lambda con límites de memoria bajos y las partes de tu aplicación que utilizan cantidades excesivas de memoria.

**Solución:** las funciones de Lambda que utilizan cerca de su máximo de memoria configurado corren el riesgo de ser detenidas por el tiempo de ejecución de Lambda, lo que genera errores para el usuario. Considera aumentar la cantidad de memoria configurada en tu función. Ten en cuenta que esto puede verse reflejado en tu factura de AWS.

### Duración prolongada

Al menos una invocación en el intervalo seleccionado superó el 95 % del tiempo de espera configurado.

El [rastreo distribuido][7] puede ayudarte a localizar las llamadas lentas a la API en tu aplicación.

**Solución:** las funciones de Lambda que se ejecutan cerca de su tiempo de espera configurado corren el riesgo de ser eliminadas por el tiempo de ejecución de Lambda. Esto puede provocar respuestas lentas o fallidas a las solicitudes entrantes. Considera aumentar el tiempo de espera configurado si crees que tu función necesita más tiempo de ejecución. Ten en cuenta que esto puede verse reflejado en tu factura de AWS.

### Arranques en frío

Más del 1 % de las invocaciones de la función fueron arranques en frío en el intervalo seleccionado.

Las [métricas mejoradas][5] y el [rastreo distribuido][7] de Datadog pueden ayudarte a entender el impacto que los arranques en frío tienen en tus aplicaciones hoy.

**Solución:** los arranques en frío se producen cuando las aplicaciones serverless reciben aumentos repentinos de tráfico, y pueden ocurrir si una función estaba previamente inactiva o si recibía un número relativamente constante de solicitudes. Los usuarios pueden notar los arranques en frío como tiempos de respuesta lentos o latencia. Para anticiparte a los arranques en frío, considera habilitar la [simultaneidad aprovisionada][8] en las funciones de Lambda afectadas. Ten en cuenta que esto puede verse reflejado en tu factura de AWS.

### Sin memoria

Al menos una invocación en el intervalo seleccionado se quedó sin memoria.

**Solución:** las funciones de Lambda que utilizan más de la cantidad de memoria asignada pueden ser eliminadas por el tiempo de ejecución de Lambda. Para los usuarios, esto se ve como envíos de solicitudes a la aplicación fallidos. El [rastreo distribuido][7] puede ayudarte a localizar las partes de tu aplicación que utilizan cantidades excesivas de memoria. Considera aumentar la cantidad de memoria que tu función de Lambda puede utilizar.

### Tiempos de espera

Al menos una invocación en el intervalo seleccionado caducó. Esto ocurre cuando tu función se ejecuta durante más tiempo que el tiempo de espera configurado o el tiempo de espera global de Lambda.

**Solución:** el [rastreo distribuido][7] puede ayudarte a localizar las solicitudes lentas a las API y otros microservicios. También puedes considerar aumentar el tiempo de espera de tu función. Ten en cuenta que esto puede verse reflejado en tu factura de AWS.

### Limitaciones

Más del 10 % de las invocaciones en el intervalo seleccionado estuvieron limitadas. Las limitaciones se producen cuando las aplicaciones serverless de Lambda reciben altos niveles de tráfico sin la [simultaneidad][9] adecuada.

**Solución:** comprueba las [métricas de simultaneidad de Lambda][10] y confirma si `aws.lambda.concurrent_executions.maximum` se está acercando al nivel de simultaneidad de tu cuenta de AWS. Si es así, considera configurar la simultaneidad reservada o solicita un aumento de la cuota de servicio a AWS. Ten en cuenta que esto puede verse reflejado en tu factura de AWS.

### Duración prolongada del iterador

El iterador de la función tenía una duración de más de dos horas. La duración del iterador mide la duración del último registro de cada lote de registros procesados en un flujo (stream). Cuando este valor aumenta, significa que tu función no puede procesar datos lo suficientemente rápido.

**Solución:** habilita el [rastreo distribuido][7] para aislar el motivo por el cual tu función recibe tantos datos. También puedes considerar aumentar el número de fragmentos y el tamaño de lotes en el flujo del que lee tu función.

### Exceso de aprovisionamiento

Ninguna invocación en el intervalo seleccionado utilizó más del 10 % de la memoria asignada. Esto significa que tu función tiene asignados más recursos facturables de los necesarios.

**Solución:** considera disminuir la cantidad de memoria asignada en tu función de Lambda. Ten en cuenta que esto puede verse reflejado en tu factura de AWS.

### Amenazas detectadas

Se detectaron intentos de ataque dirigidos a la aplicación serverless. 

**Solución:** investiga los intentos de ataque en ASM haciendo clic en el botón **Security Signals** (Señales de seguridad) para determinar cómo responder. Si es necesaria una acción inmediata, puedes bloquear la IP del ataque en WAF a través de la [integración de flujos de trabajo][11].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/watchdog/insights#serverless
[2]: https://docs.aws.amazon.com/lambda/latest/dg/python-logging.html
[3]: /es/integrations/amazon_web_services/#setup
[4]: /es/serverless/forwarder
[5]: /es/serverless/enhanced_lambda_metrics
[6]: /es/serverless/deployment_tracking
[7]: /es/serverless/distributed_tracing
[8]: https://www.datadoghq.com/blog/monitor-aws-lambda-provisioned-concurrency/
[9]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html
[10]: /es/integrations/amazon_lambda/#metrics
[11]: https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY