---
further_reading:
- link: /security/application_security/how-it-works/
  tag: Documentación
  text: Cómo funciona App and API Protection
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API listas para usar
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solución de problemas de protección de aplicaciones y API
- link: /security/application_security/threats/
  tag: Documentación
  text: App and API Protection
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: Blog
  text: Datadog Security amplía las capacidades de cumplimiento y protección contra
    amenazas para Google Cloud
title: Habilitación de la protección de aplicaciones y API para funciones de Google
  Cloud Run en Ruby
---
<div class="alert alert-info">El soporte de AAP para Google Cloud Run está en versión preliminar.</a></div>

## Cómo funciona {#how-it-works}

La `serverless-init` aplicación envuelve su proceso y lo ejecuta como un subproceso. Inicia un listener de DogStatsD para métricas y un listener de Trace Agent para trazas. Recopila registros envolviendo los flujos stdout/stderr de su aplicación. Después del arranque, `serverless-init` inicia su comando como un subproceso.

Para obtener una instrumentación completa, asegúrese de llamar a `datadog-init` como el primer comando que se ejecuta dentro de su contenedor de Docker. Puede hacerlo configurándolo como el punto de entrada o como el primer argumento en CMD.

## Compatibilidad {#compatibility}

<div class="alert alert-info">El soporte de Google Cloud Run para la protección de aplicaciones y API sin servidor está en versión preliminar.</div>

**Nota**: La protección contra amenazas mediante Remote Configuration no es compatible. Utilice [Workflows][5] para bloquear direcciones IP en su [WAF][6].

## Comience {#get-started}

[Instale manualmente][1] el rastreador de Ruby antes de implementar su aplicación. Consulte la [aplicación de ejemplo][2].

Agregue las siguientes instrucciones y argumentos a su Dockerfile.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"]
```

### Explicación {#explanation}

1. Copie el `serverless-init` de Datadog en su imagen de Docker.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. (Opcional) agregue etiquetas de Datadog
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_APPSEC_ENABLED=1
   ENV DD_VERSION=1
   ```

3. Esta variable de entorno es necesaria para que la propagación de trazas funcione correctamente en Cloud Run. Asegúrese de configurar esta variable para todos los servicios downstream instrumentados con Datadog.
   ```dockerfile
   ENV DD_TRACE_PROPAGATION_STYLE=datadog
   ```

4. Cambie el punto de entrada para envolver su aplicación en el proceso de Datadog `serverless-init`.
   **Nota**: Si ya tiene un punto de entrada definido dentro de su Dockerfile, consulte la [configuración alternativa](#alt-ruby).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Ejecute su aplicación binaria envuelta en el punto de entrada. Adapte esta línea a sus necesidades.
   ```dockerfile
   CMD ["rails", "server", "-b", "0.0.0.0"]
   ```
### Configuración alternativa {#alt-ruby}
Si ya tiene un punto de entrada definido dentro de su Dockerfile, puede modificar el argumento CMD en su lugar.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
CMD ["/app/datadog-init", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

Si también requiere que su punto de entrada sea instrumentado, puede intercambiar sus argumentos de punto de entrada y CMD en su lugar. Para obtener más información, consulte [Cómo funciona `serverless-init`](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

Siempre que su comando de ejecución se pase como argumento a `datadog-init`, recibirá la instrumentación completa.

[1]: /es/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: /es/serverless/distributed_tracing/
[3]: https://app.datadoghq.com/security/appsec
[4]: /es/security/application_security/serverless/compatibility
[5]: /es/actions/workflows/
[6]: /es/security/application_security/waf-integration/
[apm-lambda-tracing-setup]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/