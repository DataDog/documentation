---
further_reading:
- link: /integrations/google-cloud-run/
  tag: Documentación
  text: Integración Google Cloud Run
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: Blog
  text: Recopilar trazas (traces), logs y métricas personalizadas de servicios de
    Cloud Run
- link: /serverless/google_cloud_run/containers/in_container/
  tag: Documentación
  text: Instrumentar tu contenedor con la estrategia dentro-del-contenedor
- link: /serverless/google_cloud_run/containers/sidecar/
  tag: Documentación
  text: Instrumentar tu contenedor con la estrategia del sidecar
- link: https://www.datadoghq.com/blog/instrument-cloud-run-with-datadog-sidecar/
  tag: Blog
  text: Instrumentar aplicaciones de Google Cloud Run con el nuevo sidecar del Datadog
    Agent
title: Elegir un método de instrumentación para contenedores
---

Para instrumentar tus contenedores Google Cloud Run con Datadog, elige una de las dos opciones:

{{% gcr-container-options %}}

- [**Dentro-del-contenedor**][1]: Envuelve tu contenedor de aplicaciones con el Datadog Agent. Elige esta opción para una configuración más sencilla, menos gastos generales y una canalización directa de logs.
- [**Sidecar**][2]: Despliega el Datadog Agent en un contenedor separado junto al contenedor de tu aplicación. Elige esta opción si tienes varios contenedores en un único servicio, si prefieres un aislamiento estricto del Datadog Agent o si tienes cargas de trabajo que responden al rendimiento.

## Comparación: Instrumentación dentro-del-contenedor frente a la instrumentación con sidecar

| Aspecto                        | Dentro-del-contenedor                                               | Sidecar                                                                                                                                                      |
|-------------------------------|----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Implementación                    | Un contenedor (tu aplicación, envuelta con el Datadog Agent) | Dos contenedores (tu aplicación, el Datadog Agent)                                                                                                                    |
| Cambios de imagen                 | Aumenta el tamaño de la imagen de la aplicación.                                | No hay cambios en la imagen de la aplicación.                                                                                                                                      |
| Gastos generales                 | Menos que el sidecar (sin contenedor adicional).                  | Más vCPU/memoria. La sobreasignación del sidecar desperdicia costes, mientras que la infraasignación conduce a un escalado prematuro.                                                       |
| Generación de logs                       | Acceso directo stdout/stderr.                             | Enrutamiento de volumen compartido + biblioteca de logs a un archivo de log. Los errores no detectados requieren un tratamiento adicional, ya que no son gestionados automáticamente por tu biblioteca de generación de logs. |
| Aislamiento de fallos             | En raras ocasiones, los errores del Datadog Agent pueden afectar a tu aplicación.   | Los fallos del Datadog Agent están aislados.                                                                                                                           |
| Observación de varios contenedores | No compatible                                            | Compatible                                                                                                                                                    |


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/serverless/google_cloud_run/containers/in_container
[2]: /es/serverless/google_cloud_run/containers/sidecar