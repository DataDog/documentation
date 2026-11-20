---
description: Simule cómo se evalúa un flag para una clave de segmentación y atributos
  sin afectar los datos de producción.
further_reading:
- link: /feature_flags/concepts/targeting_rules
  tag: Documentación
  text: Reglas y filtros de segmentación
- link: /feature_flags/concepts/saved_filters
  tag: Documentación
  text: Filtros guardados
- link: /feature_flags/concepts/environments
  tag: Documentación
  text: Entornos
- link: /feature_flags/concepts/evaluation_results
  tag: Documentación
  text: Resultados de la evaluación de flags.
title: Probador de evaluación
---
## Descripción general {#overview}

El evaluador de pruebas le permite simular cómo se evaluaría un flag para una clave de segmentación y un conjunto de atributos, sin llamar al SDK de su aplicación. Úselo para responder preguntas como: "¿Qué variante vería este usuario?" o "¿Por qué no coincidió esta regla de segmentación?" antes de desplegar un cambio.

Las evaluaciones realizadas a través del evaluador de pruebas son una simulación. No emiten eventos de exposición, no cuentan para las métricas o gráficos de evaluación y no afectan las estadísticas del experimento.

## Abra el evaluador de pruebas {#open-the-evaluation-tester}

1. Navegue a [{{< ui >}}Feature Flags{{< /ui >}}][1] y seleccione un flag.
1. Seleccione la pestaña del [entorno][4] con el que desea realizar la prueba, por ejemplo, {{< ui >}}Production{{< /ui >}} o {{< ui >}}Staging{{< /ui >}}.
1. En la tarjeta {{< ui >}}Targeting rules{{< /ui >}}, haga clic en {{< ui >}}Test Rule Evaluation{{< /ui >}} para abrir el panel lateral {{< ui >}}Evaluation tester{{< /ui >}}.

{{< img src="feature_flags/concepts/evaluation-tester-canvas.png" alt="Botón Probar reglas en el lienzo de reglas de segmentación para un flag." style="width:100%;" >}}

## Proporcione un contexto de segmentación {#provide-a-targeting-context}

El evaluador de pruebas evalúa las [reglas de segmentación][3] de su flag en un contexto de segmentación: una clave de segmentación y, opcionalmente, un conjunto de [atributos][2].

- Clave de segmentación (obligatorio): El identificador utilizado para la asignación determinista (por ejemplo, un ID de usuario). Cambiar la clave de segmentación puede cambiar qué variante se asigna cuando una regla utiliza la división de tráfico basada en porcentajes.
- Atributos (opcional): Valores utilizados para evaluar los filtros en sus reglas de segmentación, tales como `country`, `email` o `tier`. Obtenga más información sobre [Atributos de segmentación][2].

Puede proporcionar valores para la clave de segmentación y los atributos de dos maneras:

- {{< ui >}}Form{{< /ui >}}: Datadog genera un campo de entrada para la clave de segmentación y cada atributo al que hacen referencia las reglas de segmentación en el entorno seleccionado. Cada campo de atributo enumera las reglas que hacen referencia a él. Si ninguna regla de segmentación en el entorno hace referencia a ningún atributo, el formulario solo muestra la clave de segmentación.
- {{< ui >}}JSON{{< /ui >}}: Ingrese un objeto JSON sin formato de una clave de segmentación y atributos. Use el modo JSON cuando necesite probar valores de atributo que no sean cadenas, como números, booleanos, matrices u objetos anidados.

El [resultado de la evaluación](#understand-the-result) se actualiza automáticamente a medida que edita la clave de segmentación o los atributos.

{{< img src="feature_flags/concepts/evaluation-tester-panel.png" alt="Panel lateral del evaluador de pruebas con una clave de segmentación, un atributo y un resultado." style="width:60%;" >}}

## Comprenda el resultado {#understand-the-result}

La sección {{< ui >}}Result{{< /ui >}} muestra la variante que se asignaría para el [contexto de segmentación](#provide-a-targeting-context) proporcionado, junto con el nombre de la regla de segmentación que coincidió.

Expanda {{< ui >}}How did I get this result?{{< /ui >}} para ver un desglose regla por regla de la evaluación:

- Las reglas se enumeran en el orden en que se evalúan.
- Cada regla muestra si coincidió, si se omitió (es decir, el sujeto no coincidió con el filtro de la regla, por lo que la evaluación continuó con la siguiente regla) o si se saltó (es decir, no se pudo alcanzar dado el resultado de una regla anterior).
- Para las reglas con un filtro, el desglose explica qué condición coincidió o no coincidió (por ejemplo, `country matched US` o `browser did not match is one of Chrome, Safari`).

{{< img src="feature_flags/concepts/evaluation-tester-breakdown.png" alt="Desglose de evaluación expandido que muestra qué regla coincidió y por qué." style="width:60%;" >}}

La regla que coincidió también se resalta en el {{< ui >}}Targeting rules{{< /ui >}} lienzo, para que pueda ver la ruta de evaluación visualmente.

## Prueba de un flag deshabilitado {#testing-a-disabled-flag}

Si el flag está deshabilitado en el entorno seleccionado, el evaluador de pruebas muestra lo que recibiría un usuario si el flag estuviera habilitado. Esta simulación difiere del comportamiento del SDK en tiempo de ejecución: los SDK del lado del cliente y del lado del servidor devuelven el valor predeterminado proporcionado por su aplicación para los flags deshabilitados. Informe de evaluaciones detalladas `ERROR` con `FLAG_NOT_FOUND`. Para obtener más información, consulte [Resultados de la evaluación de flags][5].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/feature-flags
[2]: /es/feature_flags/concepts/targeting_attributes/
[3]: /es/feature_flags/concepts/targeting_rules/
[4]: /es/feature_flags/concepts/environments/
[5]: /es/feature_flags/concepts/evaluation_results/