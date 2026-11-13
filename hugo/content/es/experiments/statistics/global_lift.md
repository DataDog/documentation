---
aliases:
- /es/product_analytics/experimentation/global_lift/
- /es/experiments/global_lift
- /es/experiments/global_lift/
description: Comprenda cómo un experimento afecta los totales de sus métricas en toda
  su población de usuarios.
further_reading:
- link: /experiments/reading_results/
  tag: Documentación
  text: Lectura de resultados de experimentos
- link: /experiments/defining_metrics/
  tag: Documentación
  text: Crear Métricas de experimento
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: Blog
  text: Tome decisiones de diseño basadas en datos con Product Analytics
- link: https://www.datadoghq.com/blog/how-we-built-datadog-experiments/
  tag: Blog
  text: Cómo construimos Datadog Experiments
title: Lift global
---
## Descripción general {#overview}

Los experimentos normalmente inscriben solo a un subconjunto de sus usuarios. El lift global responde a la pregunta: si lanzara este cambio a todos los usuarios elegibles, ¿cómo cambiarían los totales de sus métricas generales?

Por ejemplo, si un experimento muestra un aumento del 10% en los ingresos por usuario, pero la población elegible del experimento representa solo el 20% de sus ingresos totales, el impacto estimado en los ingresos globales es de aproximadamente el 2%. Esto es útil al decidir si implementar un cambio: un tratamiento que parece impresionante dentro de un experimento puede tener un impacto menor en los totales a nivel empresarial si se aplica a una audiencia limitada.

Datadog informa el lift global junto con _cobertura_, un factor que cuantifica cuánto del valor total de sus métricas proviene de la población elegible. El lift global es el producto de la cobertura y del lift local observado del experimento.

## Poblaciones de usuarios {#user-populations}

Cada experimento divide su base de usuarios en tres grupos:

| Población | Descripción |
|---|---|
| **No elegibles** | Usuarios que nunca fueron elegibles (página incorrecta, criterios de segmentación no cumplidos u otras condiciones de elegibilidad). Su comportamiento no se ve afectado por ninguna decisión de despliegue. |
| **Elegibles, no inscritos** | Usuarios que cumplieron con los criterios de elegibilidad pero fueron excluidos debido a la configuración de exposición al tráfico. |
| **Inscritos** | Usuarios asignados a la variante de tratamiento o de control. |

El lift global se centra en la población elegible (usuarios inscritos más aquellos que fueron elegibles pero no inscritos) y estima el impacto en las métricas si esa población se cambiara por completo del control al tratamiento. Si el tratamiento se lanzara por completo, la población elegible captaría a todos los usuarios que interactuarían con él.

## Cobertura {#coverage}

La cobertura es la proporción estimada del total de su métrica global que provendría de la población elegible si la experiencia de control se implementara para todos los usuarios elegibles. La fórmula es:

```
Coverage = FER_C / TM_C
```

| Símbolo | Definición |
|---|---|
| `FER_C` | Total de métrica estimado para la población elegible completa bajo un despliegue solo de control |
| `TM_C` | Total de métrica global estimado bajo un despliegue solo de control |

Estos valores se estiman a partir de los datos observados del experimento:

```
FER_C = X_C / (p_C × t_exp)

TM_C  = TM − TEM + (X_C / p_C)
```

| Símbolo | Definición |
|---|---|
| `X_C` | Total de métrica observado en la variante de control |
| `X_T` | Total de métrica observado en la variante de tratamiento |
| `TEM` | Total de métrica de experimento observado: `X_T + X_C` |
| `TM` | Total de métrica observado en todos los usuarios (inscritos y no inscritos) |
| `t_exp` | Fracción de usuarios elegibles inscritos en el experimento |
| `p_C` | Fracción de usuarios inscritos asignados a la variante de control |

**Intuición para `FER_C`:** La variante de control es una muestra representativa de la población elegible. La fracción de usuarios elegibles que terminaron en el grupo de control es `p_C × t_exp`, por lo que dividir `X_C` por esa fracción escala el total de métrica del grupo de control a toda la población elegible.

**Intuición para `TM_C`:** Comience desde el total global observado (`TM`), elimine la contribución observada de los usuarios inscritos (`TEM`) y reemplácela con lo que esos usuarios habrían generado bajo un control total (`X_C / p_C`). La contribución de los usuarios no elegibles permanece sin cambios.

## Lift global {#global-lift}

El lift global es el producto de la cobertura y del lift local del experimento:

```
Global lift = Coverage × Local lift
```

El lift local es el lift relativo por sujeto medido dentro del experimento:

```
                (Average metric value per treatment subject) − (Average metric value per control subject)
Local lift =  ──────────────────────────────────────────────────────────────────────────────────────────
                                  (Average metric value per control subject)
```

### Ejemplo {#example}

Considere un experimento con los siguientes valores observados:

- División de tráfico 50/50 (p_C = 0.5)
- Todos los usuarios elegibles están inscritos (t_exp = 1.0)
- Ingresos del control: $100 (`X_C`)
- Ingresos del tratamiento: $110 (`X_T`)
- Ingresos totales de todos los usuarios: $1,010 (`TM`)

El cálculo del lift global procede de la siguiente manera:

| Paso | Cálculo | Valor |
|---|---|---|
| `TEM` | $100 + $110 | $210 |
| `FER_C` | $100 / (0.5 × 1.0) | $200 |
| `TM_C` | $1,010 − $210 + ($100 / 0.5) | $1,000 |
| Cobertura | $200 / $1,000 | 20% |
| Lift local | ($110 − $100) / $100 | 10% |
| **Lift global** | 20% × 10% | **2%** |

En otras palabras, implementar este tratamiento para todos los usuarios elegibles aumentaría los ingresos totales en un 2%, de $1,000 (el contrafactual solo de control) a $1,020.

## Métricas admitidas {#supported-metrics}

El lift global se calcula para estos tipos de agregación: `count` y `sum`.

**Nota**: Las métricas cerradas (con ventana), aquellas que restringen los valores de los hechos a una ventana de tiempo relativa a la asignación, no son compatibles con el lift global.

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}