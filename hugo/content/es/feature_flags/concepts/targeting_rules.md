---
description: Aprenda cómo las reglas de segmentación, los filtros y los tipos de despliegue
  controlan qué variantes sirve su aplicación.
further_reading:
- link: /feature_flags/concepts/evaluation_tester
  tag: Documentación
  text: Probador de evaluación
- link: /feature_flags/concepts/targeting_attributes
  tag: Documentación
  text: Atributos de segmentación
- link: /feature_flags/concepts/scheduled_rollouts
  tag: Documentación
  text: Lanzamientos programados
- link: /feature_flags/concepts/saved_filters
  tag: Documentación
  text: Filtros guardados
- link: /feature_flags/concepts/traffic_splitting
  tag: Documentación
  text: División de tráfico y aleatorización
- link: /feature_flags/concepts/experiments
  tag: Documentación
  text: Feature Flags y experimentos
- link: /feature_flags/concepts/evaluation_context
  tag: Documentación
  text: Contexto de evaluación
- link: /feature_flags/concepts/environments
  tag: Documentación
  text: Entornos
- link: /feature_flags/client/
  tag: Documentación
  text: SDK del lado del cliente
title: Reglas y filtros de segmentación
---
## Descripción general {#overview}

**Las reglas de segmentación** definen qué variante servir a qué sujetos. Cada regla puede incluir un **filtro**, una o más variantes y un despliegue porcentual opcional. Las reglas se evalúan en orden hasta que se encuentra una coincidencia.

## Tipos de reglas de segmentación {#targeting-rule-types}

Datadog admite diferentes tipos de reglas de segmentación según su estrategia de despliegue:

| Tipo | Descripción |
|------|-------------|
| **Feature gate** | Despliegue a un porcentaje de sujetos que coincidan con su filtro (aleatorizado o no), inmediatamente o en una [hora de inicio programada](/feature_flags/concepts/scheduled_rollouts/) |
| **Despliegue progresivo** | Despliegue aleatorizado sobre un horario con múltiples pasos, iniciado manualmente o en una [hora de inicio programada](/feature_flags/concepts/scheduled_rollouts/) |
| **Experimento** | Asignación aleatorizada asociada con un [experimento][5] |

## Configure reglas de segmentación {#configure-targeting-rules}

Para configurar las reglas de segmentación de un flag:

1. Navegue a **Feature Flags** y seleccione su Feature Flag.
2. Seleccione el entorno cuyas reglas desea modificar.
3. Haga clic en **Agregar regla de segmentación** (o haga clic en la regla de segmentación que desea modificar).

{{< img src="feature_flags/concepts/ff-targeting-rules-and-rollouts-2.png" alt="Sección de Reglas de segmentación y despliegues en un Feature Flag." style="width:100%;" >}}

Para cada regla de segmentación, configure lo siguiente:

- **Asigne un nombre a su regla de segmentación**: Asigne un nombre a su regla de segmentación para describir el grupo al que se dirige.
- **Defina un filtro** (opcional): Si no define un filtro, la regla coincide con todos los sujetos en ese entorno. Para reutilizar las mismas condiciones en varios Feature Flags, agregue un [filtro guardado][1] en lugar de redefinirlas en cada Feature Flag.
- **Seleccione variantes**: Elija qué variantes ofrecer a los sujetos que coincidan. Haga clic en **Dividir tráfico** para aleatorizar entre varias variantes (consulte [División y aleatorización de tráfico](/feature_flags/concepts/traffic_splitting/)).
- **Establezca la exposición al tráfico** (opcional): Ofrezca la variante a un porcentaje de los sujetos que coincidan (consulte [División y aleatorización de tráfico](/feature_flags/concepts/traffic_splitting/)).
- **Programe una hora de inicio** (opcional): Active la regla automáticamente en una fecha y hora futuras en lugar de hacerlo inmediatamente (consulte [Lanzamientos programados](/feature_flags/concepts/scheduled_rollouts/)).

{{< img src="feature_flags/concepts/configure-targeting-rule-3.png" alt="Panel lateral del editor de reglas de segmentación en un flag." style="width:70%;" >}}

Después de configurar sus reglas de segmentación, haga clic en **Guardar**, luego habilite el flag en el entorno para que los SDK puedan evaluar las reglas de segmentación. También puede usar el [probador de evaluación][2] para simular cómo se evalúa la regla para una clave de segmentación y atributos determinados, sin afectar los datos de producción.

<div class="alert alert-info">
Los SDK no evalúan las reglas de segmentación cuando el flag está <b>deshabilitado</b> o <b>anulado</b> en un entorno. Si el flag se anula con una variante fija, el SDK devuelve esa variante en su lugar. Si el flag está deshabilitado, el SDK devuelve la variante predeterminada codificada.
</div>

## Filtros y contexto de evaluación {#filters-and-evaluation-context}

Los filtros utilizan atributos del [contexto de evaluación][4] de su SDK. Defina los atributos cuando configure el contexto de evaluación antes de evaluar los flags. Los atributos deben ser valores primitivos planos (cadenas, números, booleanos). No se admiten objetos ni matrices anidados.

Cuando crea un filtro, el campo de atributo sugiere atributos que su organización ya ha definido o que sus SDK han enviado recientemente. Consulte [Atributos de segmentación][3] para definir atributos reutilizables con un tipo de datos, lo cual también determina los operadores disponibles para ese atributo.

Dado un contexto de evaluación con atributos `country`, `tier`, `user_role` y `account_age_days`, puede crear filtros con diferentes operadores, como igualdad, **es uno de**, **no es**, o comparaciones numéricas:

- `country` **es uno de** `US`, `CA`
- `tier` **es igual a** `premium`
- `user_role` **no es** `guest`
- `account_age_days` **mayor que** `90`

## Jerarquía de reglas {#rule-hierarchy}

Las reglas de segmentación se evalúan **en orden** de arriba hacia abajo:

1. El SDK evalúa la primera regla. Si el sujeto coincide con el filtro (o no hay ningún filtro definido), la regla puede servir una variante.
2. Si el sujeto no coincide, la evaluación pasa a la siguiente regla.
3. Si ninguna regla coincide, el SDK sirve la **variante predeterminada** para ese entorno.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/feature_flags/concepts/saved_filters/
[2]: /es/feature_flags/concepts/evaluation_tester/
[3]: /es/feature_flags/concepts/targeting_attributes/
[4]: /es/feature_flags/concepts/evaluation_context/
[5]: /es/feature_flags/concepts/experiments/