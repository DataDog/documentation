---
description: Visualice sus datos para obtener información útil
further_reading:
- link: /product_analytics/
  tag: Documentación
  text: Product Analytics
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: Centro de aprendizaje
  text: Introducción a Product Analytics
title: Dashboards
---
## Descripción general {#overview}

La clave para empezar con los dashboards es saber qué tipo de preguntas se hace regularmente. ¿Cuáles son los problemas comunes que enfrentan sus clientes? Cuando ocurre un problema, ¿qué preguntas le ayudan a encontrar una solución?

Crear un buen dashboard consiste en sacar a la superficie las respuestas a estas preguntas. Además, es importante no abarrotar todos esos pensamientos en el mismo dashboard. Crear dashboards separados para identificar diferentes problemas puede ayudarle a encontrar sus respuestas rápidamente.

Esta guía le ayuda a comenzar en el camino hacia la creación de dashboards. Estos dashboards básicos permiten la discusión en equipo y aceleran la resolución de problemas.

## Cree un dashboard {#create-a-dashboard}

Para crear un dashboard, haga clic en {{< ui >}}\+ New Dashboard{{< /ui >}} en la página [{{< ui >}}Dashboard List{{< /ui >}}][1].

{{< img src="product_analytics/dashboard/pana_dashboard_overview.png" alt="Agregar un nuevo dashboard" style="width:70%;">}}


Ingrese un nombre para el dashboard y elija una opción de diseño.

{{< img src="dashboards/create-dashboard.png" alt="Agregar un nuevo dashboard" style="width:70%;">}}

{{< ui >}}Dashboards{{< /ui >}}
: Un diseño basado en cuadrícula, que puede incluir una variedad de objetos como imágenes, gráficos y registros. Se utilizan comúnmente como tableros de estado o vistas narrativas que se actualizan en tiempo real y pueden representar momentos específicos del pasado. Tienen un ancho máximo de 12 celdas de la cuadrícula y también funcionan bien para la depuración.

{{< ui >}}Timeboards{{< /ui >}}
: Diseños automáticos que representan un único momento, ya sea fijo o en tiempo real, en todo el dashboard. Se utilizan comúnmente para la resolución de problemas, la correlación y la exploración general de datos.

{{< ui >}}Screenboards{{< /ui >}}
: Dashboards con diseños de formato libre que pueden incluir una variedad de objetos como imágenes, gráficos y registros. Se utilizan comúnmente como tableros de estado o vistas narrativas que se actualizan en tiempo real o representan momentos específicos del pasado.

## Frecuencia de actualización {#refresh-rate}

La frecuencia de actualización de un dashboard privado depende del marco temporal que esté visualizando. Cuanto más corto sea el marco temporal, con mayor frecuencia se actualizan los datos. Los dashboards compartidos públicamente se actualizan cada treinta segundos, independientemente del marco temporal seleccionado.

| Marco temporal   | Frecuencia de actualización |
|--------------|--------------|
| 1 minuto     | 10 segundos   |
| 2 minutos    | 10 segundos   |
| 5 minutos    | 10 segundos   |
| 10 minutos   | 10 segundos   |
| 30 minutos   | 20 segundos   |
| 1 hora       | 20 segundos   |
| 3 horas      | 1 minuto     |
| 4 horas      | 1 minuto     |
| 1 día        | 3 minutos     |
| 2 días       | 10 minutos    |
| 1 semana       | 1 hora       |
| 1 mes      | 1 hora       |
| 3 meses     | 1 hora       |
| 6 meses     | 1 hora       |
| 1 año       | 1 hora       |



## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/dashboard/list