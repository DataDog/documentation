---
aliases:
- /es/product_analytics/user_retention/
- /es/product_analytics/charts/user_retention/
description: Mida la retención de usuario para comprender la satisfacción general
  del usuario con su aplicación.
title: Retención
---
Los gráficos de retención visualizan con qué frecuencia el usuario regresa a una página o acción, lo que le ayuda a evaluar el valor continuo de sus productos y funciones.

{{< img src="/product_analytics/retention/retention_chart.png" alt="Un ejemplo de gráfico de análisis de retención." style="width:90%;" >}}

La retención de usuario se mide dentro de una *cohorte*, un grupo de usuarios que realizaron un evento de inicio definido, como hacer clic en un enlace especificado. Un usuario en la cohorte está *retenido* si posteriormente completa el evento de retorno especificado, como hacer clic en el mismo enlace nuevamente o proceder al pago.

Solo las vistas y las acciones pueden actuar como eventos.

## Requisitos previos {#prerequisites}

Para completar los datos de retención, configure el atributo `usr.id` en su SDK. Consulte las [instrucciones para enviar atributos de usuario únicos][1].

## Calculando eventos de retención {#calculating-retention-events}

Los valores de retención se calculan como un promedio ponderado por cohorte, que resume el comportamiento general de la cohorte al tener en cuenta su tamaño. Las cohortes más grandes tienen más influencia en el valor final, lo que hace que el resultado sea más representativo que un promedio. Datadog aplica este cálculo en todos los tipos de visualización. Por ejemplo, en la cuadrícula de retención, el promedio ponderado completa la celda de resumen para cada intervalo de tiempo.

Para calcular el valor de un intervalo específico, como la semana 1 en la cuadrícula de retención, multiplique el valor de cada cohorte por su tamaño. Sume los resultados y luego divida por el tamaño total de la cohorte:

```
Weighted Average = (Σ (cohort_value × cohort_size)) / (Σ cohort_size)
```

Por ejemplo, la retención promedio ponderada del 91% después de 1 semana se calcula de la siguiente manera:

```
(99 * 1.8k + 92 * 2.35k + 81 * 1.75k) / (1.8k + 2.35k + 1.75k)
```

La tasa de retención de cada cohorte se escala según su número de usuarios antes de que contribuya a la métrica general.

{{< img src="/product_analytics/retention/pana_retention_weighed_avg.png" alt="Gráfico de ejemplo de análisis de retención que muestra un valor de retención promedio ponderado." style="width:90%;" >}}

<div class="alert alert-info">El gráfico de retención muestra valores deshabilitados cuando los datos son parciales o incompletos. Esto ocurre cuando el período de tiempo está en curso y la retención aún no se puede calcular por completo.</div>

## Crear un gráfico de retención {#create-a-retention-chart}

1. En {{< ui >}}Product Analytics{{< /ui >}}, seleccione {{< ui >}}Create New{{< /ui >}} > {{< ui >}}Retention{{< /ui >}}.

1. Defina los pasos de inicio y retorno para los que desea comprender la retención.

1. (Opcional) Filtre o agrupe los resultados del gráfico según propiedades como el país o el tipo de dispositivo utilizando {{< ui >}}Filter by{{< /ui >}} o {{< ui >}}Compare by{{< /ui >}}.

## Analice un gráfico de retención {#analyze-a-retention-chart}

Después de crear un gráfico de retención, este muestra la retención como un porcentaje o recuento para cada cohorte, desglosado por los períodos de retorno que definió.

{{< img src="/product_analytics/retention/retention_analysis.png" alt="Un gráfico de retención con llamadas numeradas para la configuración de retorno de opciones avanzadas, los controles de visualización y agrupación, el selector de tipo de gráfico, el selector de rango de tiempo y una información sobre herramientas de celda de cohorte." style="width:90%;" >}}

1. Utilice {{< ui >}}Advanced options{{< /ui >}} para establecer el contexto en el que los eventos de retorno se consideran para la retención.

   - {{< ui >}}Returned on{{< /ui >}}: Calcula el porcentaje de usuarios que activaron el evento de retorno durante un período de retorno específico. Utilice esto para ver la probabilidad de que los usuarios completen el evento de retorno en algún período de tiempo (por ejemplo, días o semanas) después del evento de inicio, lo cual es útil para evaluar la retención general en sus funciones y productos.
   - {{< ui >}}Returned on or after{{< /ui >}}: Calcula el porcentaje de usuarios que activaron el evento de retorno durante un período de retorno específico o cualquier período posterior. Utilice esto para ver a los usuarios que abandonan completamente su producto o dejan de usar una funcionalidad clave, lo cual es útil para evaluar la eficacia de las experiencias de incorporación.

2. Utilice la fila {{< ui >}}Viewing{{< /ui >}} para controlar lo que se visualiza.

   - {{< ui >}}All Cohorts{{< /ui >}}, {{< ui >}}Weighted Average{{< /ui >}} o una cohorte específica: Selecciona qué cohorte se representa gráficamente. Consulte [Cálculo de eventos de retención](#calculating-retention-events) para saber cómo se calcula el promedio ponderado.
   - {{< ui >}}Unique users{{< /ui >}} o {{< ui >}}Unique accounts{{< /ui >}}: Selecciona si la retención se mide por `@usr.id`, que puede restablecerse cuando un usuario borra las cookies o cambia de dispositivo, o por `@account.id`, que rastrea la misma cuenta iniciada durante un período más largo.
   - {{< ui >}}Rate{{< /ui >}} o {{< ui >}}Count{{< /ui >}}: Selecciona si se muestra la retención como un porcentaje o un número absoluto.
   - {{< ui >}}Each day{{< /ui >}}, {{< ui >}}Each week{{< /ui >}} o {{< ui >}}Each month{{< /ui >}}: Selecciona el marco de tiempo que agrupa los eventos de retorno. La retención diaria se puede aplicar durante un mes, la retención semanal durante un año y la retención mensual durante 16 meses.

3. Utilice el selector de tipo de gráfico para alternar entre tipos de gráfico.

   - {{< ui >}}Retention{{< /ui >}}: Incluye tanto una curva de retención, que muestra el cambio en la retención para cohortes específicas, como una cuadrícula de retención, que muestra datos detallados sobre las cohortes a lo largo de los períodos de tiempo.
   - {{< ui >}}Timeseries{{< /ui >}}: Muestra la retención a lo largo del tiempo calendario para un único período de retorno que usted elija, sin un enfoque de cohorte específico.
   - {{< ui >}}Query value{{< /ui >}}: Muestra un solo número, como una tasa o un conteo, para un único período de retorno que usted elija, utilizando la cohorte que esté seleccionada: el promedio ponderado entre cohortes o una cohorte específica.
   - {{< ui >}}Top list{{< /ui >}}: Si se especifica una propiedad {{< ui >}}Compare{{< /ui >}}, muestra una clasificación ordenada de resultados agrupados por tasa de retención o conteo para el período especificado.

4. Utilice el selector de rango de tiempo para cambiar el período de datos que analiza el gráfico.

5. Pase el cursor sobre una celda para visualizar el número exacto de usuarios que regresaron durante ese período, la tasa de retorno y cómo cambió respecto al período anterior. Haga clic en una celda para visualizar una lista de usuarios y exportar la lista como un CSV.

### Uso de eventos coincidentes frente a diferentes {#using-matching-vs-differing-events}

Puede configurar los gráficos de retención con eventos de inicio y retorno iguales o diferentes.

Si los eventos coinciden, la semana 0 siempre es el 100%, ya que representa a todos los que completaron el evento inicial. Cada una de las otras celdas compara a los usuarios de esa semana con la semana 0, mostrando el porcentaje de la cohorte original que completó el evento nuevamente en esa semana.

{{< img src="/product_analytics/retention/retention_matching_events.png" alt="Gráfico de retención para eventos coincidentes." style="width:90%;" >}}

Al leer la fila **Aug 17 2026** del gráfico anterior de izquierda a derecha:
- El 23% de los 10.43k usuarios que completaron el evento esa semana regresaron para completarlo nuevamente después de 1 semana.
- El 21% de esos usuarios regresaron para completarlo nuevamente después de 2 semanas.
- El 11% de esos usuarios regresaron para completarlo nuevamente después de 3 semanas.

Si los eventos difieren, la semana 0 representa a los usuarios que completaron tanto el evento inicial como el de retorno. Cada celda posterior muestra el porcentaje de la cohorte original que completó el evento de retorno en esa semana.

{{< img src="/product_analytics/retention/retention_differing_events.png" alt="Gráfico de retención para eventos diferentes." style="width:90%;" >}}

Al leer la fila **Aug 17 2026** del gráfico anterior de izquierda a derecha:
- 10.43k usuarios completaron el evento de inicio esa semana.
- El 41% de esos usuarios también completaron el evento de retorno dentro de la misma semana.
- El 23% completó el evento de retorno después de 1 semana, el 20% después de 2 semanas y el 11% después de 3 semanas.

[1]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration#user-session