---
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Funcionamiento de App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas predefinidas de App and API Protection
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de App and API Protection
- link: /security/application_security/threats/
  tag: Documentación
  text: App and API Protection
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: Blog
  text: Datadog Security amplía las funciones de cumplimiento de normativas y protección
    frente a amenazas para Google Cloud
title: Habilitar App and API Protection para funciones de Google Cloud Run en .NET
---

<div class="alert alert-info">La compatibilidad de AAP con Google Cloud Run está en vista previa.</a></div>

## Cómo funciona

La aplicación `serverless-init` envuelve tu proceso y lo ejecuta como un subproceso. Inicia un escuchador de métricas de DogStatsD y un escuchador de trazas del Trace Agent. Recopila logs envolviendo los flujos stdout/stderr de tu aplicación. Después de arrancar, `serverless-init` inicia tu comando como un subproceso.

Para una instrumentación completa, asegúrate de que estás llamando a `datadog-init` como el primer comando que se ejecuta dentro de tu contenedor Docker. Puedes hacerlo configurándolo como punto de entrada, o configurándolo como el primer argumento en CMD.

## Compatibilidad

<div class="alert alert-info">La compatibilidad de Google Cloud Run con App and API Protection sin servidor está en vista previa.</div>

**Nota**: La protección frente a amenazas no es compatible a través de la configuración remota. Utiliza los [flujos][5] para bloquear direcciones IP en tu [WAF][6].

## Para empezar

Añade las siguientes instrucciones y argumentos a tu Dockerfile.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
# For arm64 use datadog-dotnet-apm-2.57.0.arm64.tar.gz
# For alpine use datadog-dotnet-apm-2.57.0-musl.tar.gz
ARG TRACER_VERSION
ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm-${TRACER_VERSION}.tar.gz /tmp/datadog-dotnet-apm.tar.gz
RUN mkdir -p /dd_tracer/dotnet/ && tar -xzvf /tmp/datadog-dotnet-apm.tar.gz -C /dd_tracer/dotnet/ && rm /tmp/datadog-dotnet-apm.tar.gz
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["dotnet", "helloworld.dll"]
```

### Explicación

1. Copia `serverless-init` de Datadog en tu imagen de Docker.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copia el rastreador Datadog.NET en tu imagen de Docker.
   ```dockerfile
   # For arm64 use datadog-dotnet-apm-2.57.0.arm64.tar.gz
   # For alpine use datadog-dotnet-apm-2.57.0-musl.tar.gz
   ARG TRACER_VERSION
   ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm-${TRACER_VERSION}.tar.gz /tmp/datadog-dotnet-apm.tar.gz

   RUN mkdir -p /dd_tracer/dotnet/ && tar -xzvf /tmp/datadog-dotnet-apm.tar.gz -C /dd_tracer/dotnet/ && rm /tmp/datadog-dotnet-apm.tar.gz
   ```
   Si instalas la biblioteca del rastreador de Datadog directamente en tu aplicación, como se indica en las [instrucciones para la instrumentación manual del rastreador][1], omite este paso.

3. (Opcional) Añade etiquetas (tags) de Datadog.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-dotnet
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Cambia el punto de entrada para contener tu aplicación en el proceso de `serverless-init` de Datadog.
   **Nota**: Si ya tienes un punto de entrada definido dentro de tu archivo Docker, consulta la [configuración alternativa](#alt-dotnet).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Ejecuta tu aplicación binaria contenida en el punto de entrada. Adapta esta línea a tus necesidades.
   ```dockerfile
   CMD ["dotnet", "helloworld.dll"]
   ```
### Configuración alternativa {#alt-dotnet}
Si ya tienes un punto de entrada definido en tu archivo Docker, puedes modificar el argumento CMD.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
# Para arm64 utilizar datadog-dotnet-apm-2.57.0.arm64.tar.gz
# Para alpine utilizar datadog-dotnet-apm-2.57.0-musl.tar.gz
ARG TRACER_VERSION
ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm-${TRACER_VERSION}.tar.gz /tmp/datadog-dotnet-apm.tar.gz
RUN mkdir -p /dd_tracer/dotnet/ && tar -xzvf /tmp/datadog-dotnet-apm.tar.gz -C /dd_tracer/dotnet/ && rm /tmp/datadog-dotnet-apm.tar.gz
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "dotnet", "helloworld.dll"]
{{< /highlight >}}

Si necesitas que tu punto de entrada también se instrumente, puedes intercambiar tu punto de entrada y argumentos CMD en su lugar. Para obtener más información, consulta [Funcionamiento de `serverless-init`](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
# Para arm64 utilizar datadog-dotnet-apm-2.57.0.arm64.tar.gz
# Para alpine utilizar datadog-dotnet-apm-2.57.0-musl.tar.gz
ARG TRACER_VERSION
ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v${TRACER_VERSION}/datadog-dotnet-apm-${TRACER_VERSION}.tar.gz /tmp/datadog-dotnet-apm.tar.gz
RUN mkdir -p /dd_tracer/dotnet/ && tar -xzvf /tmp/datadog-dotnet-apm.tar.gz -C /dd_tracer/dotnet/ && rm /tmp/datadog-dotnet-apm.tar.gz
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "dotnet", "helloworld.dll"]
{{< /highlight >}}

Siempre y cuando el comando a ejecutar se pase como argumento a `datadog-init`, recibirás la Instrumentación completa.

[1]: /es/tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: /es/serverless/distributed_tracing/
[3]: https://app.datadoghq.com/security/appsec
[4]: /es/security/application_security/serverless/compatibility
[5]: /es/actions/workflows/
[6]: /es/security/application_security/waf-integration/
[apm-lambda-tracing-setup]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/