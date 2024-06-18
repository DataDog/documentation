---
further_reading:
- link: agent/versions/upgrade_to_agent_v7
  tag: Documentación
  text: Actualizar el Agent a la versión 7
- link: agent/versions/upgrade_to_agent_v6
  tag: Documentación
  text: Actualizar el Agent a la versión 6
- link: agent/versions/upgrade_between_agent_minor_versions
  tag: Documentación
  text: Actualizar entre versiones secundarias del Agent
- link: agent/faq/agent_v6_changes
  tag: FAQ
  text: Cambios en el Agent v6
title: Diferencias entre versiones del Agent
---

<div class="alert alert-info"><p>
Datadog recomienda actualizar el Datadog Agent con todas las novedades y parches, por mínimos que sean. O, al menos, actualizarlo una vez al mes. </p>
<p>
Actualizar a una versión principal del Datadog Agent y mantenerla al día es la única forma admitida de obtener las últimas funciones y correcciones del Agent. Sin embargo, salen nuevas actualizaciones para el Agent con frecuencia, y gestionar las actualizaciones a escala empresarial puede resultar complicado. Esto no significa que tengas que esperar a las versiones principales para actualizarlo. La frecuencia de actualización adecuada para tu organización dependerá de la infraestructura y de la forma de gestionar la configuración, aunque lo aconsejable es actualizarlo una vez al mes.</p>
<p>
Para llevar a cabo la actualización básica del Datadog Agent entre dos versiones secundarias de un host determinado, ejecuta <a href="/agent/versions/upgrade_between_agent_minor_versions">el comando de instalación correspondiente para tu plataforma</a>.</p>
<p>
La numeración de los lanzamientos del Datadog Agent sigue las reglas de <a href="https://semver.org/">SemVer</a>.</p>
</div>

## Cambios entre las versiones principales del Agent

{{< tabs >}}
{{% tab "Agent v7 vs. v6" %}}

El Agent v7 es la versión principal más reciente del Datadog Agent. El único cambio que existe con respecto al Agent v6 es que **esta versión solo es compatible con Python 3 en las integraciones y checks personalizados**.

Consulta [Actualizar el Agent a la versión 7][1] para saber cómo actualizar el Agent a esta versión. Todas las integraciones oficiales son compatibles con Python 3 de forma predefinida. Sigue la guía [Migración de checks personalizados a Python 3][2] para migrar tus checks personalizados a Python 3.

**Nota**: Puedes probar esta migración con la versión 6 del Agent. Para ello, consulta [Uso de Python 3 con el Datadog Agent v6][3].


[1]: /es/agent/versions/upgrade_to_agent_v7/
[2]: /es/agent/guide/python-3/
[3]: /es/agent/guide/agent-v6-python-3/
{{% /tab %}}
{{% tab "Agent v6 vs. v5" %}}

**Cambios principales con respecto a la versión 6 del Agent**:

La principal diferencia entre la versión 5 y la versión 6 del Agent es que esta última es una reescritura completa del Agent básico en Golang. Golang ha permitido al Agent beneficiarse de la competencia. En lugar de los tres procesos que solía ejecutar el Agent v5 (el _Forwarder_, el _Collector_ y _DogStatsD_), ahora solo hay un único proceso: el _Agent_. También incluye algunas otras mejoras básicas:

- El Agent v6 ha mejorado significativamente en términos de uso de recursos en comparación con el Agent v5:

  - Menor uso de CPU
  - Menor uso de memoria
  - Menos descriptores de archivos
  - Menos superficie ocupada en general

- El Agent v6 utiliza [dos puertos adicionales][1]:

  - `5000`: para exponer sus métricas de tiempo de ejecución.
  - `5001`: para los [comandos de CLI/GUI del Agent][2].

    **Nota**: Puedes especificar diferentes puertos para `expvar_port` y `cmd_port` en el archivo `datadog.yaml`.

- Genera la compilación personalizada del Agent v6 y [DogStatsD][3] mucho más fácilmente y con muchas más opciones de configuración para incluir o excluir prácticamente cualquier cosa.

**Nuevas funciones del Agent v6**:

Para ver todos los cambios entre la versión 5 y la versión 6 del Agent, consulta la documentación sobre los [cambios específicos del Datadog Agent][4]. A continuación, se indican las principales diferencias:

- Se pueden efectuar [métricas de distribución][5] en el servidor directamente para calcular percentiles globales reales y efectivos.
- Se puede utilizar [DogStatsD][3] en un socket de Unix en lugar de en UDP.
- [Monitorización de Live Processes disponible para Windows][6].
- [Prometheus OpenMetrics es compatible de forma nativa][7].
- [Todos tus logs se pueden enviar a Datadog con fines de alerta, análisis y correlación con métricas][8].


[1]: /es/agent/#agent-architecture
[2]: /es/agent/guide/agent-commands/
[3]: /es/developers/dogstatsd/unix_socket/
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md
[5]: /es/metrics/types/?tab=distribution#metric-types
[6]: /es/infrastructure/process/
[7]: https://www.datadoghq.com/blog/monitor-prometheus-metrics
[8]: /es/logs/
{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}