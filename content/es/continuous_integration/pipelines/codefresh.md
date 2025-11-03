---
aliases:
- /es/continuous_integration/setup_pipelines/codefresh
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Explorar los resultados y el rendimiento de la ejecución de pipelines
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
title: Configurar el rastreo en pipelines de Codefresh
---

## Información general

[Codefresh][1] es una plataforma de integración y entrega continuas creada para Kubernetes que ofrece funciones de automatización que agilizan la creación, los tests y el despliegue de las aplicaciones.

Configura el rastreo en Codefresh para recopilar datos en cada paso de tus pipelines, analizar cuellos de botella de rendimiento, solucionar problemas operativos y monitorizar tus procesos de despliegue.

### Compatibilidad

| Pipeline Visibility | Plataforma | Definición |
|---|---|---|
| [Reintentos parciales][7] | Pipelines parciales | Observa los reintentos parciales de ejecuciones de pipelines. |
| [Pasos manuales][8] | Pasos manuales | Visualiza los pipelines activados manualmente. |
| [Parámetros][9] | Parámetros | Establece parámetros personalizados (por ejemplo, [variables de Codefresh][6]) cuando se active un pipeline. |
| [Razones de fallo del pipeline][10] | Razones de fallos de pipelines | Identifica las razones de fallos de los pipelines a partir de los mensajes de error. |
| [Filtrar trabajos de CI en la ruta crítica][12] | Filtrar trabajos de CI en la ruta crítica | Filtra por trabajos en la ruta crítica. |
| [Tiempo de ejecución][13] | Tiempo de ejecución  | Ver la cantidad de tiempo que los pipelines han estado ejecutando trabajos. |

## Configurar la integración Datadog

Para configurar la integración de Datadog para [Codefresh][1]:

1. Ve a **[Account Settings > Configuration > Integrations][2]** (Ajustes de cuenta > Configuración > Integraciones) en Codefresh y haz clic en **Configure** (Configurar) en la fila de Datadog.
2. Haz clic en **Add Integration** (Añadir integración).
3. Rellena el formulario con la siguiente información:
   * **Sitio de Datadog **: selecciona `{{< region-param key="dd_site" code="true" >}}` en el menú desplegable.
   * **Token**: añade tu [clave de API de Datadog][3].
4. Haz clic en **Save** (Guardar) para guardar la integración.

## Visualizar los datos de los pipelines en Datadog

Las páginas [**CI Pipeline List**][4] (Lista de pipelines de CI) y [**Executions**][5] (Ejecuciones) se rellenan con datos una vez finalizado el pipeline.

La página **CI Pipeline List** (Lista de pipelines de CI) muestra datos solo para la rama por defecto de cada repositorio. Para más información, consulta [Buscar y gestionar pipelines de CI][11].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://codefresh.io/
[2]: https://g.codefresh.io/account-admin/account-conf/integration/datadog
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://codefresh.io/docs/docs/codefresh-yaml/variables/#user-provided-variables
[7]: /es/glossary/#partial-retry
[8]: /es/glossary/#manual-step
[9]: /es/glossary/#parameter
[10]: /es/glossary/#pipeline-failure
[11]: /es/continuous_integration/search/#search-for-pipelines
[12]: /es/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[13]: /es/glossary/#pipeline-execution-time