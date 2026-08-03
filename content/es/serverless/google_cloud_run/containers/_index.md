---
further_reading:
- link: /integrations/google-cloud-run/
  tag: Documentación
  text: Integración de Google Cloud Run
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: Blog
  text: Recopila trazas, registros y métricas personalizadas de los servicios de Cloud
    Run
- link: /serverless/google_cloud_run/containers/in_container/
  tag: Documentación
  text: Instruya su contenedor con el enfoque En-Contenedor
- link: /serverless/google_cloud_run/containers/sidecar/
  tag: Documentación
  text: Instruya su contenedor con el enfoque sidecar
- link: https://www.datadoghq.com/blog/instrument-cloud-run-with-datadog-sidecar/
  tag: Blog
  text: Instruya sus aplicaciones de Google Cloud Run con el nuevo sidecar del Datadog
    Agent
- link: /mcp_server/tools/#serverless_onboarding
  tag: Documentación
  text: 'Datadog MCP Server: herramienta de serverless_onboarding'
title: Elegir un método de instrumentación para contenedores
---
## Utilice Datadog MCP Server {#use-the-datadog-mcp-server}

Utilice el [Datadog MCP Server][3] para configurar el seguimiento de sus contenedores de Cloud Run con asistencia de inteligencia artificial. Después de conectarte, prueba una instrucción como:

```shell
Help me monitor my GCP Cloud Run services with Datadog using Terraform.
```

## Instrumentación manual {#manual-instrumentation}
Para instrumentar sus contenedores de Google Cloud Run con Datadog, elija una de dos opciones:

{{% gcr-container-options %}}

- [**En-Contenedor**][1]: Envuelva su contenedor de aplicación con el Datadog Agent. Elija esta opción para una configuración más simple, menor sobrecosto y transmisión directa de registros.
- [**Sidecar**][2]: Despliegue el Datadog Agent en un contenedor separado junto a su contenedor de aplicación. Elija esta opción si tiene múltiples contenedores en un solo servicio, si prefiere un aislamiento estricto del Datadog Agent, o si cuenta con cargas de trabajo sensibles al rendimiento.

### Comparación: Instrumentación En-Contenedor versus sidecar {#comparison-in-container-versus-sidecar-instrumentation}

| Aspecto                        | En-Contenedor                                               | Sidecar |
|-------------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Implementación                    | Un contenedor (su aplicación, envuelta con el Datadog Agent) | Dos contenedores (su aplicación, Datadog Agent) |
| Cambios en la imagen                 | Aumenta el tamaño de la imagen de la aplicación.                                | Sin cambios en la imagen de la aplicación.                                                                                                                                      |
| Sobrecosto                 | Menos que un sidecar (sin contenedor extra).                  | vCPU/memoria extra. La sobreasignación de recursos al sidecar incrementa los costos; la subasignación conduce a un escalado prematuro.                                                       |
| Registro                       | Acceso directo a stdout/stderr.                             | Volumen compartido + enrutamiento de la biblioteca de registro a un archivo de registro. Los errores no capturados requieren un manejo adicional, ya que no son gestionados automáticamente por su biblioteca de registro. |
| Aislamiento de fallas             | En casos raros, los fallos del Datadog Agent pueden afectar su aplicación.   | Los fallos del Datadog Agent están aislados.                                                                                                                           |

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/serverless/google_cloud_run/containers/in_container
[2]: /es/serverless/google_cloud_run/containers/sidecar
[3]: /es/agentic_onboarding/setup