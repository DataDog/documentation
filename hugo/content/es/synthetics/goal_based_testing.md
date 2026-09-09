---
description: Verifique que los usuarios puedan completar un objetivo en su aplicación
  mediante pruebas Synthetic impulsadas por un Agent, de forma no determinista y con
  prompts.
further_reading:
- link: /synthetics/bits_testing/
  tag: Documentación
  text: Bits Testing
- link: /synthetics/browser_tests/
  tag: Documentación
  text: Prueba de navegador
- link: /synthetics/test_suites/
  tag: Documentación
  text: Conjuntos de pruebas
- link: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products
  tag: Precios
  text: Precios de Synthetic Monitoring
private: true
title: Pruebas basadas en objetivos
---
{{< beta-callout url="https://www.datadoghq.com/product-preview/bits-testing/" >}}
Las pruebas basadas en objetivos están en versión preliminar. Solicite acceso para unirse a la lista de espera.
{{< /beta-callout >}}

## Descripción general {#overview}

Las pruebas basadas en objetivos son un tipo de prueba Synthetic que utiliza pruebas impulsadas por un Agent, de forma no determinista y con prompts para verificar que un usuario pueda alcanzar un objetivo específico en su aplicación. Es muy adecuada para probar funciones de IA y para validar recorridos críticos del usuario que no deberían requerir un mantenimiento continuo de las pruebas.

A diferencia de una prueba de navegador, una prueba basada en objetivos no sigue un conjunto fijo y grabado de pasos. En su lugar, un Agent explora su aplicación, probando múltiples rutas hacia el objetivo que usted describe.

## Crear una prueba basada en objetivos {#create-a-goal-based-test}

Puede crear una prueba basada en objetivos de dos maneras:

- Permita que [Bits Testing][1] genere uno automáticamente como parte del conjunto de pruebas del recorrido.
- Cree una manualmente haciendo clic en {{< ui >}}New Test{{< /ui >}} y seleccionando prueba basada en objetivos.

{{< img src="synthetics/goal_based_testing/goal_based_test_type_selection.png" alt="El cuadro de diálogo Nueva prueba Synthetic con Prueba basada en objetivos seleccionada" style="width:50%;" >}}

Al crear una prueba basada en objetivos manualmente, proporcione:

- Una **URL de inicio** para la aplicación bajo prueba.
- Un **objetivo**, escrito como un prompt en lenguaje sencillo (por ejemplo, "Pídale al chatbot de soporte una recomendación de producto").
- Una **ubicación** desde la cual ejecutar la prueba. Consulte las [ubicaciones admitidas](#supported-locations).
- Opcionalmente, un [Perfil de Agent][2] para reutilizar variables como las credenciales de inicio de sesión.

{{< img src="synthetics/goal_based_testing/goal_based_test_creation.png" alt="El panel de Nueva prueba basada en objetivos con los campos de URL inicial y objetivo" style="width:60%;" >}}

### Ubicaciones admitidas {#supported-locations}

Las pruebas basadas en objetivos se ejecutan solo desde las ubicaciones administradas por Datadog enumeradas en [Ejecutar Bits Testing][4].

Para conocer los precios, consulte [Facturación de Bits Testing][3].

## Cómo evalúa una ejecución de prueba basada en objetivos{#how-goal-based-testing-evaluates-a-run}

Después de iniciar una prueba basada en objetivos, el Agent explora su aplicación desde la URL inicial, ramificándose a través de las diferentes rutas que un usuario podría tomar hacia el objetivo.

Cuando la ejecución termina, la prueba informa un resultado de **Aprobado** si una de las ramas exploradas alcanzó el objetivo. Informa un resultado de **Fallido** si ninguna rama alcanzó el objetivo o si el Agent encontró un error. Junto con el resultado, las pruebas basadas en objetivos muestran:

- Un resumen que explica la lógica detrás del resultado Aprobado o Fallido.
- Navegación paso a paso a través de las acciones que realizó el Agent, para que pueda revisar exactamente lo que intentó.

{{< img src="synthetics/goal_based_testing/goal_based_test_run_result.png" alt="Una ejecución de prueba basada en objetivos fallida que muestra las rutas exploradas, una justificación del fallo y la captura de pantalla final" style="width:100%;" >}}

## Programar y editar una prueba {#schedule-and-edit-a-test}

Después de que se complete la primera ejecución, haga clic en el icono {{< ui >}}Edit test{{< /ui >}} para:

- Programar la prueba para que se ejecute de forma recurrente.
- Editar el nombre de la prueba.
- Agregar etiquetas.
- Cambie el Perfil de Agent seleccionado.

{{< img src="synthetics/goal_based_testing/goal_based_test_schedule.png" alt="El paso de Programación del asistente de creación de pruebas basadas en objetivos, con opciones de intervalo de recurrencia" style="width:80%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/bits_testing/
[2]: /es/synthetics/bits_testing/#agent-profiles
[3]: /es/synthetics/bits_testing/#billing
[4]: /es/synthetics/bits_testing/#run-bits-testing