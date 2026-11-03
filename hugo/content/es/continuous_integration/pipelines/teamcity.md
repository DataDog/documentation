---
aliases:
- /es/continuous_integration/setup_pipelines/teamcity
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Explore los resultados de la ejecución del pipeline y su rendimiento
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solución de problemas de CI Visibility
title: Configuración de TeamCity para CI Visibility
---
## Descripción general {#overview}

[TeamCity][1] es un servidor de integración y entrega continua que optimiza y automatiza los procesos de desarrollo de software.

Configure CI Visibility para TeamCity para recopilar datos sobre las ejecuciones de sus pipelines, depurar cuellos de botella en el rendimiento, abordar problemas operativos y optimizar sus flujos de trabajo de desarrollo.

### Compatibilidad {#compatibility}

| Pipeline Visibility | Plataforma | Definición |
|---|---|---|
| [Reintentos parciales][14] | Reintentar activadores de compilación | Consulte las ejecuciones de pipelines reintentadas parcialmente. |
| [Tiempo de cola][15] | Tiempo de cola | Consulte la cantidad de tiempo que los trabajos de pipeline permanecen en la cola antes de procesarse. |
| [Motivos de falla de la canalización][16] | Motivos de falla de la canalización | Identifique los motivos de falla del pipeline a partir de los mensajes de error. |
| [Filtrar trabajos de CI en la ruta crítica][17] | Filtrar trabajos de CI en la ruta crítica | Filtre por trabajos en la ruta crítica. |
| [Tiempo de ejecución][18] | Tiempo de ejecución  | Consulte la cantidad de tiempo que los pipelines han estado ejecutando trabajos. |

Las siguientes versiones de TeamCity son compatibles:

- TeamCity >= 2021.2 o posterior

### Terminología {#terminology}

Esta tabla muestra el mapeo de conceptos entre Datadog CI Visibility y TeamCity:

| Datadog                    | TeamCity    |
|----------------------------|-------------|
| Pipeline                   | Cadena de compilación |
| Trabajo | Build |
| _No disponible en Datadog_ | Paso        |

## Configurar la integración de Datadog {#configure-the-datadog-integration}

La integración entre [TeamCity][1] y Datadog CI Visibility se proporciona a través de un plugin de TeamCity. El [código fuente][8] del plugin de integración de CI de Datadog es de código abierto bajo la licencia Apache 2.0.

Para configurar la integración:

1. Descargue el [plugin de integración de CI de Datadog][5] en el servidor de TeamCity yendo a
{{< ui >}}Administration{{< /ui >}} -> {{< ui >}}Plugins{{< /ui >}} -> {{< ui >}}Browse Plugin Repository{{< /ui >}}.
2. Si aún no tiene uno, agregue un [TeamCity composite build][6] como el último build de la build chain. Esta build debe tener una dependencia de la última build actual de la build chain y ninguna otra build que dependa de ella.

   Los build chains que no terminan con un composite build son ignorados por el plugin. Por ejemplo, considere un build chain esperado donde `Aggregating Results` es el último composite build:

   {{< img src="ci/teamcity_build_chain.png" alt="TeamCity build chain con composite build al final" style="width:100%;">}}

   El composite build final debe estar configurado correctamente en términos de ajustes de control de versiones, con el VCS Root adjunto y el [VCS Trigger][13] configurado.

3. Los siguientes parámetros de configuración deben estar presentes para los proyectos de TeamCity:

   * **datadog.ci.api.key**: Su [clave de Datadog API][2]. Admite el tipo **Password** en la versión 0.0.5 del plugin y posteriores.
   * **datadog.ci.site**: {{< region-param key="dd_site" code="true" >}}
   * **datadog.ci.enabled**: `true` (`false` se puede usar para deshabilitar el plugin para un proyecto específico).

   Puede agregarlos a subproyectos de TeamCity o al [TeamCity Root Project][10]. Cuando se agregan al Root project, se propagan a todos sus subproyectos. Por ejemplo, para habilitar el plugin para todos los proyectos, agregue `datadog.ci.enabled` con el valor `true` al Root project.

   Para obtener más información sobre cómo definir parámetros de configuración, consulte la [TeamCity Project Hierarchy documentation][9].

4. Para habilitar el plugin, haga clic en {{< ui >}}Enable uploaded plugins{{< /ui >}} en la página {{< ui >}}Administration{{< /ui >}} -> {{< ui >}}Plugins{{< /ui >}}.
Alternativamente, reinicie el servidor de TeamCity.

## Configuración avanzada {#advanced-configuration}

### Configure la información del usuario de Git {#configure-git-user-information}

El plugin recupera el nombre y el correo electrónico del autor de Git según el [estilo de nombre de usuario de TeamCity][7]. Datadog recomienda usar los estilos de nombre de usuario {{< ui >}}Author Name and Email{{< /ui >}} o {{< ui >}}Author Email{{< /ui >}}, ya que ellos
proporcione información sobre el correo electrónico del usuario.

Cuando se utiliza uno de los otros estilos de nombre de usuario ({{< ui >}}UserId{{< /ui >}} o {{< ui >}}Author Name{{< /ui >}}), el plugin genera automáticamente un correo electrónico para el usuario añadiendo `@Teamcity` al nombre de usuario. Por ejemplo, si se utiliza el estilo de nombre de usuario {{< ui >}}UserId{{< /ui >}} y el nombre de usuario del autor de Git es `john.doe`, el plugin genera `john.doe@Teamcity` como el correo electrónico del autor de Git. El estilo de nombre de usuario se define para [Raíces de VCS][11] y se puede modificar en la configuración de la raíz de VCS.

<div class="alert alert-danger"> El correo electrónico del autor de Git se utiliza para
<a href="https://www.datadoghq.com/pricing/?product=ci-visibility#ci-visibility">fines de facturación</a>,
por lo tanto, podría haber implicaciones de costos cuando se utilizan estilos de nombre de usuario que no proporcionan correo electrónico
(<strong>usuario</strong> o <strong>Nombre del autor</strong>) se utilizan. <a href="/help/">Comuníquese con el equipo de soporte de Datadog</a> si tiene alguna pregunta sobre su incidencia.
</div>

## Visualice datos de Pipelines en Datadog {#visualize-pipeline-data-in-datadog}

Vea sus datos en las páginas [**CI Pipeline List**][3] y [**Executions**][4] después de que finalicen los pipelines.

La página {{< ui >}}CI Pipeline List{{< /ui >}} muestra datos solo para la rama predeterminada de cada repositorio. Para obtener más información, consulte [Search and Manage CI Pipelines][12].

## Solución de problemas {#troubleshooting}

Todos los registros generados por el plugin de integración de CI de Datadog se almacenan dentro del archivo `teamcity-server.log` y pueden ser
se puede acceder a ellos desde el servidor de TeamCity yendo a {{< ui >}}Administration{{< /ui >}} -> {{< ui >}}Diagnostic{{< /ui >}} -> {{< ui >}}Server Logs{{< /ui >}}.
Verifique estos registros para obtener contexto adicional sobre cualquier problema con el plugin.

### Las ejecuciones de prueba no están vinculadas a los trabajos de TeamCity {#test-runs-are-not-linked-to-teamcity-jobs}

El plugin de integración de CI de Datadog no correlaciona las ejecuciones de pipelines o de trabajos de TeamCity con las ejecuciones de prueba en Test Optimization. Las pruebas pueden aparecer en Test Optimization mientras que el trabajo de CI Visibility correspondiente muestra **Ejecuciones de prueba: 0**.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jetbrains.com/teamcity/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: https://plugins.jetbrains.com/plugin/20852-datadog-ci-integration
[6]: https://www.jetbrains.com/help/teamcity/composite-build-configuration.html
[7]: https://www.jetbrains.com/help/teamcity/git.html#General+Settings
[8]: https://github.com/DataDog/ci-teamcity-plugin
[9]: https://www.jetbrains.com/help/teamcity/project-administrator-guide.html#Project+Hierarchy
[10]: https://www.jetbrains.com/help/teamcity/project-administrator-guide.html#Root+Project
[11]: https://www.jetbrains.com/help/teamcity/configuring-vcs-roots.html
[12]: /es/continuous_integration/search/#search-for-pipelines
[13]: https://www.jetbrains.com/help/teamcity/configuring-vcs-triggers.html#Trigger+build+on+changes+in+snapshot+dependencies
[14]: /es/glossary/#partial-retry
[15]: /es/glossary/#queue-time
[16]: /es/glossary/#pipeline-failure
[17]: /es/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[18]: /es/glossary/#pipeline-execution-time