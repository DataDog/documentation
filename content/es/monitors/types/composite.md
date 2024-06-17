---
aliases:
- /es/guides/composite_monitors
- /es/monitors/monitor_types/composite
- /es/monitors/create/types/composite/
description: Alerta sobre una expresión que combina varios monitores
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar un tiempo de inactividad para silenciar un monitor
- link: /monitors/manage/status/
  tag: Documentación
  text: Comprobar el estado de tu monitor
kind: Documentación
title: Monitor compuesto
---


## Información general

Los monitores compuestos combinan monitores individuales en un solo monitor para definir condiciones de alerta más específicas.

Elige los monitores existentes para crear un monitor compuesto, por ejemplo: monitor `A` y monitor `B` . A continuación, configura una condición de activación utilizando operadores booleanos, como `A && B`. El monitor compuesto se activa cuando los monitores individuales tienen simultáneamente valores que hacen que la condición de activación del monitor compuesto sea verdadera.

{{< img src="monitors/monitor_types/composite/overview.jpg" alt="Ejemplo de monitor compuesto" style="width:80%;">}}

A efectos de configuración, un monitor compuesto es independiente de los monitores que lo componen. La política de notificación de un monitor compuesto puede modificarse sin que ello afecte a las políticas de los monitores que lo componen, y viceversa. Además, la eliminación de un monitor compuesto no elimina los monitores que lo componen. Un monitor compuesto no es dueño de otros monitores, sino que sólo utiliza sus resultados. Además, muchos monitores compuestos pueden hacer referencia al mismo monitor individual.

**Notes**

- Los términos `individual monitors`, `constituent monitors` y `non-composite monitors` se refieren todos a monitores utilizados por un monitor compuesto para calcular su estado.
- Los resultados compuestos requieren agrupaciones comunes. Si seleccionas monitores que no tienen agrupaciones comunes, es posible que los monitores seleccionados en la expresión no conduzcan a un resultado compuesto.
- Las monitores compuestos no pueden basarse en otros monitores compuestos.

## Creación de un monitor

Para crear un [monitor compuesto][1] en Datadog utiliza la navegación principal: *Monitors --> New Monitor --> Composite* (Monitores > Nuevo monitor > Compuesto).

### Seleccionar monitores y configurar las condiciones de activación

#### Seleccionar monitores

Elige hasta **10** monitores individuales para utilizarlos en un monitor compuesto. Los monitores pueden incluir diferentes tipos de alertas (alertas simples, alertas múltiples o una combinación de ambas). Ningún monitor individual puede a su vez ser un monitor compuesto. Después de elegir tu primer monitor, la interfaz de usuario muestra su tipo de alerta y su estado actual.

Si eliges un monitor con alertas múltiples, la interfaz de usuario muestra la cláusula de agrupación del monitor y la cantidad de fuentes exclusivas que están informando actualmente, por ejemplo: `Returns 5 host groups`. Cuando se combinan monitores con alertas múltiples, esta información ayuda a elegir monitores que se emparejan de forma natural.

{{< img src="monitors/monitor_types/composite/composite_example.jpg" alt="Ejemplo de monitor compuesto" style="width:80%;">}}

Debes elegir monitores que tengan los mismos grupos. De lo contrario, la interfaz de usuario te advierte de que es posible que ese monitor compuesto no se active nunca:

{{< img src="monitors/monitor_types/composite/composite_common_group.jpg" alt="Grupos comunes de monitores compuestos" style="width:80%;">}}


Aunque elijas monitores con alertas múltiples con los mismos grupos, es posible que sigas viendo un `Group Matching Error` si los monitores no tienen fuentes de informes comunes (también llamadas agrupaciones comunes). Si no hay fuentes de información comunes, Datadog no puede calcular un estado para el monitor compuesto y este nunca se activa. Sin embargo, puedes ignorar la advertencia y crear el monitor de todos modos. Para obtener más información, consulta [Cómo los monitores compuestos seleccionan fuentes de informes comunes](#select-monitors-and-set-triggering-conditions).

Cuando seleccionas un segundo monitor que no genera una advertencia, la interfaz de usuario rellena el campo **Trigger when** (Activar cuando) con la condición de activación predeterminada `a && b` y muestra el estado del monitor compuesto propuesto.

#### Establecer las condiciones de activación

En el campo **Trigger when* (Activar cuando), escribe la condición de activación deseada utilizando operadores booleanos, referida a monitores individuales por sus etiquetas (labels) de la forma `a`, `b`, `c`, etc. Utiliza paréntesis para controlar la precedencia de los operadores y crear condiciones más complejas.

Todas las siguientes condiciones de activación son válidas:

```text
!(a && b)
a || b && !c
(a || b) && (c || d)
```

#### Condiciones de alerta avanzadas

##### Sin datos

`Do not notify` o `Notify` cuando el monitor compuesto está en un estado sin datos. Lo que elijas aquí no afecta a la configuración `Notify no data` de los monitores individuales, pero para que un monitor compuesto envíe alertas cuando no hay datos, tanto los monitores individuales como el monitor compuesto deben estar configurados en `Notify` cuando falten datos.

##### Otras opciones

Para obtener instrucciones detalladas sobre las opciones avanzadas de alerta (resolución automática, etc.), consulta la página [Configuración de monitores][2].

### Notificaciones

Para obtener instrucciones sobre el uso de variables de plantilla a partir de los monitores que componen un monitor compuesto en tus notificaciones, consulta las [variables de monitores compuestos][4]. Para obtener instrucciones detalladas sobre la sección **Configurar notificaciones y automatizaciones**, consulta la página [Notificaciones][3].

### API

Cuando se utiliza la API, la consulta de un monitor compuesto se define en términos de sus sub-monitores utilizando los ID de monitores.

Por ejemplo, dos monitores no compuestos tienen las siguientes consultas y los siguientes ID:

```text
"avg(last_1m):avg:system.mem.free{role:database} < 2147483648" # Monitor ID: 1234
"avg(last_1m):avg:system.cpu.system{role:database} > 50" # Monitor ID: 5678
```

Una consulta de un monitor compuesto que combina las monitores anteriores podría ser `"1234 && 5678"`, `"!1234 || 5678"`, etc.

## Funcionamiento de los monitores compuestos

Esta sección utiliza ejemplos para mostrar cómo se calculan las condiciones de activación y el número de alertas que puedes recibir en diferentes escenarios.

### Cálculo de las condiciones de activación

Hay 4 estados diferentes que puede tener un monitor compuesto y 3 de ellos se consideran capaces de generar alertas:

| Estado    | Capaz de generar alertas         |Gravedad           |
|-----------|----------------------|-------------------|
| `Alert`   | Verdadero                 |4 (Más grave)    |
| `Warn`    | Verdadero                 |3                  |
| `No Data` | Verdadero                 |2                  |
| `Ok`      | Falso                |1 (Menos grave)   |

Los operadores booleanos utilizados (`&&`, `||`, `!`) operan sobre la capacidad del estado del monitor compuesto de generar alertas.

* Si `A && B` es capaz de generar alertas, el resultado es el estado **menos** grave entre A y B.
* Si `A || B` es capaz de generar alertas, el resultado es el estado **más** grave entre A y B.
* Si `A` es `No Data`, `!A` es `No Data`
* Si `A` es capaz de generar alertas, `!A` es. `OK`
* Si `A` no es capaz de generar alertas, `!A` es. `Alert`

Consideremos un monitor compuesto que utiliza dos monitores individuales: `A` y `B`. La siguiente tabla muestra el estado resultante del monitor compuesto dada la condición de activación (`&&` o `||`) y los diferentes estados de sus monitores individuales (la capacidad de alerta se indica con V o F):

| Monitor A   | Monitor B   | Condición   | Notificar Sin datos   | Estado compuesto | ¿Alerta activada? |
|-------------|-------------|-------------|------------------|------------------|------------------|
| Alerta (V)   | Advertencia (V)    | `A && B`    |                  | Advertencia (V)         | {{< X >}}        |
| Alerta (V)   | Advertencia (V)    | `A \|\| B`  |                  | Alerta (V)        | {{< X >}}        |
| Alerta (V)   | Ok (F)      | `A && B`    |                  | Ok (F)           |                  |
| Alerta (V)   | Ok (F)      | `A \|\| B`  |                  | Alerta (V)        | {{< X >}}        |
| Advertencia (V)    | Ok (F)      | `A && B`    |                  | Ok (F)           |                  |
| Advertencia (V)    | Ok (F)      | `A \|\| B`  |                  | Advertencia (V)         | {{< X >}}        |
| Sin datos (V) | Advertencia (V)    | `A && B`    | Verdadero             | Sin datos (V)      | {{< X >}}        |
| Sin datos (V) | Advertencia (V)    | `A \|\| B`  | Verdadero             | Advertencia (V)         | {{< X >}}        |
| Sin datos (V) | Advertencia (V)    | `A && B`    | Falso            | Último conocido       |                  |
| Sin datos (V) | Advertencia (V)    | `A \|\| B`  | Falso            | Advertencia (V)         | {{< X >}}        |
| Sin datos (V) | Ok (F)      | `A && B`    | Falso            | Ok (F)           |                  |
| Sin datos (V) | Ok (F)      | `A \|\| B`  | Falso            | Último conocido       |                  |
| Sin datos (V) | Ok (F)      | `A && B`    | Verdadero             | Ok (F)           |                  |
| Sin datos (V) | Ok (F)      | `A \|\| B`  | Verdadero             | Sin datos (V)      | {{< X >}}        |
| Sin datos (V) | Sin datos (V) | `A && B`    | Verdadero             | Sin datos (V)      | {{< X >}}        |
| Sin datos (V) | Sin datos (V) | `A \|\| B`  | Verdadero             | Sin datos (V)      | {{< X >}}        |

**Nota**: Cuando el monitor compuesto tiene `notify_no_data` como falso y el resultado de la evaluación de los sub-monitores debería terminar en un estado `No Data` para el monitor compuesto, este utiliza el último estado conocido.

### Monitores compuestos y tiempos de inactividad

Un monitor compuesto y sus monitores individuales son independientes entre sí.

#### Tiempos de inactividad en un monitor compuesto

Considera un monitor compuesto `C` que consta de dos monitores individuales con la condición `A || B`. La creación de un tiempo de inactividad en el monitor compuesto suprimirá notificaciones sólo de `C`.

Si el monitor `A` o el monitor `B` notifican a servicios o a equipos en sus respectivas configuraciones de monitor, el tiempo de inactividad del monitor compuesto `C` no silencia ninguna notificación generada por `A` o `B`. Para silenciar las notificaciones de `A` o `B`, configura un tiempo de inactividad en esos monitores.

#### Tiempo de inactividad en un monitor individual utilizado en un monitor compuesto

La creación de un tiempo de inactividad en un monitor individual `A`, que se utiliza en un monitor compuesto, no silencia el monitor compuesto.

Por ejemplo, un tiempo de inactividad silencia el monitor `A` , concretamente su grupo `env:staging`. Una vez que el grupo `env:staging` alcanza un estado capaz de generar alertas, la notificación procedente del monitor individual se suprime, mientras que el monitor compuesto envía una notificación de alerta.

### Número de alertas

El número de alertas que recibes depende del tipo de alerta del monitor individual.
Si todos los monitores individuales tienen alertas simples, el monitor compuesto también tiene un tipo de alerta simple. El monitor compuesto activa una única notificación cuando todas las consultas para `A` y `B` son `true` al mismo tiempo.

Si un monitor individual tiene alertas múltiples, el monitor compuesto también las tendrá. El número de alertas que puede enviar a la vez depende de si el monitor compuesto utiliza uno o varios monitores.


### Fuentes comunes de información

Las monitores compuestos que utilizan varias monitores con alertas múltiples sólo tienen en cuenta las *fuentes de información comunes* de los monitores individuales.

**Ejemplo de alerta múltiple**

Considera un escenario en el que los monitores `A` y `B` tienen alertas múltiples y están agrupados por hosts.

* Los hosts de `host:web01` a `host:web05` informan al monitor `A`.
* Los hosts de `host:web04` a `host:web09` informan al monitor `B`.

El monitor compuesto sólo tiene en cuenta las fuentes comunes (`web04` y `web05`). Durante un ciclo de evaluación, se pueden recibir hasta dos alertas.

**Valor de grupo común con diferentes nombres de grupo**

Los monitores compuestos sólo tienen en cuenta los *valores* de etiquetas (`web04`) y no las *claves* de etiquetas (`host`).
Si el ejemplo anterior incluyera un monitor con alertas múltiples, `C`, agrupado por `service`, con una única fuente de información, `service:web04`, el monitor compuesto consideraría que `web04` es la única fuente de información común entre `A`, `B` y `C`.

**Monitores agrupados por dos o más dimensiones**

En el caso de un monitor con alertas múltiples, dividido en dos o más etiquetas (tags), el grupo de monitores corresponde a toda la combinación de etiquetas.
Por ejemplo, si el monitor `1` tiene alertas múltiples por cada `device,host` y el monitor `2` tiene alertas múltiples por cada `host`, un monitor compuesto puede combinar el monitor `1` y el monitor `2`.

{{< img src="monitors/monitor_types/composite/multi-alert-1.png" alt="Notificación de escritura" style="width:80%;">}}

Sin embargo, considera el monitor `3` con alertas múltiples por cada `host,url`. El monitor `1` y el monitor `3` podrían no crear un resultado compuesto porque las agrupaciones son demasiado diferentes:
{{< img src="monitors/monitor_types/composite/multi-alert-2.png" alt="Notificación de escritura" style="width:80%;">}}


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/composite
[2]: /es/monitors/configuration/#advanced-alert-conditions
[3]: /es/monitors/notify/
[4]: /es/monitors/notify/variables/?tab=is_alert#composite-monitor-variables