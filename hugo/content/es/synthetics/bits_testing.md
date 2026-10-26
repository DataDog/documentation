---
description: Utilice Bits Testing, un Agent de IA que explora su aplicación para mapear
  recorridos críticos del usuario y generar pruebas Synthetic que aseguren la cobertura.
further_reading:
- link: /synthetics/goal_based_testing/
  tag: Documentación
  text: Pruebas basadas en objetivos
- link: /synthetics/browser_tests/
  tag: Documentación
  text: Prueba de navegador
- link: /synthetics/api_tests/http_tests
  tag: Documentación
  text: Pruebas HTTP
- link: /synthetics/network_path_tests/
  tag: Documentación
  text: Pruebas de Network Path
- link: /synthetics/test_suites/
  tag: Documentación
  text: Conjuntos de pruebas
- link: /synthetics/platform/settings/#global-variables
  tag: Documentación
  text: Variables globales
- link: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products
  tag: Precios
  text: Precios de Synthetic Monitoring
private: true
title: Bits Testing
---
{{< callout url="https://www.datadoghq.com/product-preview/bits-testing/" >}}
Bits Testing está en versión preliminar. Solicite acceso para unirse a la lista de espera.
{{< /callout >}}

## Descripción general {#overview}

Bits Testing es un Agent de IA que explora su aplicación para mapear sus recorridos de usuario más críticos. Recomienda formas de aumentar la cobertura de pruebas y puede generar las pruebas Synthetic necesarias para cerrar las brechas de cobertura.

Bits Testing también puede generar [pruebas basadas en objetivos][1]. Este tipo de prueba Synthetic utiliza pruebas agénticas, no deterministas y basadas en prompts para verificar que los usuarios puedan completar un objetivo específico en su aplicación.

## Requisitos previos {#prerequisites}

Si su aplicación se encuentra detrás de una protección contra bots o un web application firewall (WAF), permita las direcciones IP enumeradas en `synthetics` en los [rangos de IP de Datadog][2] con su proveedor. Para ejecutar Bits Testing desde una única ubicación, puede permitir solo el rango de IP de esa ubicación. Consulte [Ejecutar Bits Testing](#run-bits-testing) para conocer las ubicaciones desde las que se puede ejecutar Bits Testing.

## Acceder a Bits Testing {#access-bits-testing}

Abra Bits Testing desde Synthetic Monitoring & Testing utilizando cualquiera de las siguientes opciones:

- **Bits Testing** en la navegación superior de Synthetic Monitoring & Testing.
- `Cmd+K` en macOS o `Ctrl+K` en Windows, luego busque Bits Testing.
- **Bits Testing** en el menú de navegación lateral, bajo **Digital Experience > Synthetic Monitoring & Testing**.

## Ejecutar Bits Testing {#run-bits-testing}

1. En la página de Bits Testing, describa la cobertura que desea en lenguaje sencillo. Por ejemplo, pídale a Bits Testing que aumente la cobertura en general o que se enfoque en funciones específicas.
1. Seleccione una ubicación desde la cual ejecutar la exploración:
   - Frankfurt (GCP: `gcp:europe-west3`)
   - N. Virginia (AWS: `aws:us-east-1`)
   - Ohio (AWS: `aws:us-east-2`)
   - Virginia (Azure: `azure:eastus`)
1. Opcionalmente, seleccione un [Perfil de Agent](#agent-profiles-optional).
1. Haga clic en {{< ui >}}Start Discovery{{< /ui >}}, o en {{< ui >}}Start Discovery Without a Profile{{< /ui >}} si no se ha seleccionado un perfil.

{{< img src="synthetics/bits_testing/start_discovery.png" alt="El panel de configuración de ejecución de Bits Testing con selectores de URL de inicio, ubicación y perfil de Agent" style="width:80%;" >}}

### Detección en curso {#discovery-in-progress}

Bits Testing explora su aplicación comenzando desde la URL que usted proporcione. En cada página nueva que encuentra, determina un conjunto de acciones para probar y repite este proceso a medida que se mueve a través de su aplicación. Haga clic en {{< ui >}}View Discovery Run{{< /ui >}} para revisar una ejecución de prueba en curso.

{{< img src="synthetics/bits_testing/bits_testing_in_progress.png" alt="Una ejecución de prueba de Bits Testing en curso, explorando una aplicación desde su URL de inicio" style="width:100%;" >}}

## Perfiles de Agent (opcional) {#agent-profiles-optional}

Un perfil de Agent almacena el contexto que Bits Testing utiliza mientras interactúa con su aplicación, como las credenciales de inicio de sesión.

Para crear un perfil de Agent:

1. Abra el menú desplegable {{< ui >}}Agent Profile{{< /ui >}} y seleccione {{< ui >}}\+ New Profile{{< /ui >}}.
1. Asigne un nombre al perfil de Agent.
1. Agregue una o más variables. Para cada variable, establezca:
   - **Uso**: El propósito de la variable, por ejemplo, `username` o `password`.
   - **Valor**: Ya sea un valor escrito o un [Global Variable][3] existente.
1. Haga clic en {{< ui >}}Create Profile{{< /ui >}}.

El nuevo perfil de Agent se selecciona automáticamente para la ejecución actual. Los perfiles de Agent guardados se pueden reutilizar en ejecuciones de prueba posteriores de Bits Testing sin tener que redefinir sus variables.

{{< img src="synthetics/bits_testing/bits_testing_agent_profile_modal.png" alt="El modal de Nuevo perfil para crear un perfil de Agent, con campos para el nombre, el uso de la variable y el valor" style="width:100%;" >}}

## Revisar resultados {#review-results}

Cuando se completa una ejecución, Bits Testing muestra un gráfico de las ramas que exploró:

- **Exitosas (verde)**: ramas que llevaron a un recorrido de usuario relevante para el cual Bits Testing puede generar una prueba.
- **No exitosas (índigo)**: ramas que no produjeron un recorrido relevante, ya sea porque Bits Testing consideró que el flujo no era relevante o consistente, o porque encontró un error.

Si una ejecución no se completa correctamente, el gráfico muestra el error que la detuvo.

{{< img src="synthetics/bits_testing/bits_testing_results_graph.png" alt="Un gráfico de exploración de Bits Testing completado que muestra las ramas exploradas y los recorridos encontrados" style="width:100%;" >}}

## Conjuntos de pruebas generados {#generated-test-suites}

Haga clic en una tarjeta de recorrido verde para abrir el conjunto de pruebas generado por IA para ese recorrido. Un conjunto de pruebas puede incluir:

- **[Pruebas de navegador][6]** que reproducen las interacciones que realiza un usuario para completar el recorrido, con aserciones a lo largo del camino.
- **[Pruebas HTTP][7]** que validan los puntos finales que el recorrido llama para recuperar datos.
- **[Pruebas de Network Path][8]** que verifican que los hosts que impulsan el recorrido sean accesibles.
- **[Pruebas basadas en objetivos][1]** que validan el recorrido utilizando pruebas agénticas no deterministas.

Cada prueba en el conjunto incluye una ejecución de prueba de muestra gratuita. Revise el conjunto de pruebas y realice una de las siguientes acciones:

- Haga clic en {{< ui >}}Ignore{{< /ui >}} si el conjunto de pruebas no es relevante y, opcionalmente, comparta comentarios sobre el motivo.
- Haga clic en {{< ui >}}Start Testing{{< /ui >}} para agregar las pruebas del conjunto de pruebas a su cuenta.

Después de comenzar a probar un conjunto de pruebas, cada prueba se convierte en una prueba Synthetic regular que puede editar o eliminar. De forma predeterminada, las pruebas generadas se ejecutan cada 5 minutos desde la ubicación que seleccionó para la ejecución de Bits Testing.

{{< img src="synthetics/bits_testing/bits_testing_generated_suite.png" alt="Un conjunto de pruebas generado con pruebas de navegador, HTTP, Network Path y basadas en objetivos, que muestra los detalles de una ejecución aprobada" style="width:100%;" >}}

## Facturación {#billing}

Durante la versión preliminar, la ejecución de Bits Testing y de pruebas basadas en objetivos es gratuita. Las pruebas que habilita desde una ejecución de Bits Testing se facturan como pruebas Synthetic regulares, según las ejecuciones de prueba. Consulte los [precios de Synthetic Monitoring][4].

## Ubicaciones admitidas {#supported-locations}

Las pruebas de Bits Testing y basadas en objetivos solo se ejecutan desde las ubicaciones en [Ejecutar Bits Testing](#run-bits-testing). Las pruebas de navegador, HTTP y de Network Path generadas por Bits Testing no tienen esta restricción. Una vez creadas, admiten las mismas ubicaciones que cualquier otra prueba Synthetic, incluidas las [ubicaciones privadas][5].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/goal_based_testing/
[2]: /es/api/latest/ip-ranges/list-ip-ranges/
[3]: /es/synthetics/platform/settings/#global-variables
[4]: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products
[5]: /es/synthetics/platform/private_locations/
[6]: /es/synthetics/browser_tests/
[7]: /es/synthetics/api_tests/http_tests
[8]: /es/synthetics/network_path_tests/