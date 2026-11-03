---
further_reading:
- link: /continuous_integration/
  tag: Documentación
  text: CI Visibility
- link: /tests/
  tag: Documentación
  text: Test Optimization
title: Optimización de CI/CD
---
La optimización de CI/CD combina las experiencias de [CI Visibility][1] y [Test Optimization][2] de Datadog en una interfaz unificada. Proporciona un lugar único para comprender, hacer un seguimiento y mejorar todo su ecosistema de CI/CD, desde las ejecuciones de Pipelines hasta las ejecuciones de pruebas individuales.

Para habilitar la nueva experiencia, haga clic en {{< ui >}}Try It Now{{< /ui >}} en la parte superior de cualquier página en CI Visibility o Test Optimization. Puede volver a la interfaz de usuario anterior en cualquier momento haciendo clic en {{< ui >}}Switch Back{{< /ui >}}.

Esta página proporciona una descripción general de las características clave de CI/CD Optimization, algunas de las cuales conservan la funcionalidad original de CI Visibility y Test Optimization. Siga los enlaces a la documentación heredada para obtener detalles sobre el uso de cada producto dentro de la interfaz de usuario unificada.

## Descripción general de CI/CD {#cicd-overview}

Explore las métricas clave de confiabilidad y rendimiento de CI en la página {{< ui >}}Overview{{< /ui >}} de CI/CD. El tablero incluye widgets para hacer un seguimiento de su evolución a lo largo del tiempo, sugerencias para mejorarlos y una descripción general del estado de sus monitors.

{{< img src="cicd_optimization/cicd_overview.png" alt="Tablero de descripción general de CI/CD" style="width:100%;" >}}

## Explorador unificado{#unified-explorer}

Explore las ejecuciones de Pipelines y las ejecuciones de pruebas desde una sola vista en el {{< ui >}}Explorer{{< /ui >}} de CI/CD. Alterne entre Pipelines y pruebas, y limite los resultados por niveles específicos de agregación:

- **Pipelines**: Pipeline, Etapa, Trabajo, Paso o Comando
- **Pruebas**: Sesión, Módulo, Suite o Prueba

{{< img src="cicd_optimization/explorer-2.png" alt="Explorador unificado con alternancia para datos de Pipelines y pruebas" style="width:100%;" >}}

Para obtener detalles sobre cómo buscar, filtrar y analizar cada tipo de datos, consulte [CI Visibility Explorer][3] y [Test Optimization Explorer][4].

## Gestión de pruebas inestables {#flaky-management}

Obtenga una vista de alto nivel de la inestabilidad en sus repositorios en el {{< ui >}}Flaky Management Overview{{< /ui >}}. Esta página proporciona gráficos de tendencias, sugerencias de priorización y herramientas para validar su configuración.

{{< img src="cicd_optimization/flaky_overview-2.png" alt="Descripción general de la gestión de pruebas inestables con gráficos de tendencias y sugerencias de priorización" style="width:100%;" >}}

Realice el seguimiento y solucione las pruebas inestables directamente desde {{< ui >}}Flaky Management Explorer{{< /ui >}}. Puede visualizar las tendencias de las pruebas inestables, identificar las pruebas problemáticas y tomar medidas para mejorar la confiabilidad de las pruebas. Consulte [Flaky Tests Management][5] para obtener más información.

{{< img src="cicd_optimization/flaky_management-2.png" alt="Interfaz de gestión de pruebas inestables que muestra las tendencias y acciones de las pruebas inestables" style="width:100%;" >}}

## Flujo de configuración continua {#continuous-setup-flow}

Configure CI/CD Optimization para un repositorio en un proceso continuo y guiado. Después de [conectar su proveedor de CI][6] a Datadog, continúe directamente al siguiente paso para [configurar el conjunto de pruebas][7] que desea monitorear.

{{< img src="cicd_optimization/setup_flow.png" alt="Flujo de configuración continua para el proveedor de CI y el conjunto de pruebas" style="width:90%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

 [1]: /continuous_integration/
 [2]: /tests/
 [3]: /continuous_integration/explorer/
 [4]: /tests/explorer/
 [5]: /tests/flaky_management/
 [6]: /continuous_integration/pipelines/
 [7]: /tests/setup/