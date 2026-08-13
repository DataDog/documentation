---
aliases:
- /es/developers/metrics/metrics_units
- /es/developers/metrics/units/
further_reading:
- link: /dashboards/
  tag: Documentación
  text: Visualiza tus datos para obtener más información
- link: /dashboards/guide/unit-override/
  tag: Documentación
  text: Personalizar visualizaciones con la anulación de unidades
title: Unidades de métricas
---

## Información general

Las unidades de métricas se muestran en lugares como gráficas de series temporales, widgets de valor de consulta y listas de principales.

{{< img src="metrics/units/redis_dash_metrics_units.png" alt="Unidades de métricas del dashboard de Redis" style="width:100%;">}}

En las gráficas de series temporales, puedes pasar el cursor sobre cualquier gráfica para ver las unidades relevantes. Las unidades se deben especificar manualmente, pero si no se establece ninguna unidad, se utiliza la notación de orden de magnitud (por ejemplo: K, M y G para miles, millones y billones, respectivamente). Si se establece una unidad, los datos sin procesar se convierten automáticamente a unidades de visualización legibles usando sus órdenes de magnitud correspondientes.

Por ejemplo, si tienes un punto de datos que es 3.000.000.000:

* Si no has especificado una unidad para este punto de datos, aparecerá "3G".
* Si has especificado que este punto de datos está en bytes, aparecerá "3GB".

Haz clic en el botón de pantalla completa situado en la esquina superior derecha del gráfico para ver las unidades que aparecen en la parte inferior:

{{< img src="metrics/units/metrics_units.png" alt="Las unidades de un gráfico de métricas en el modo pantalla completa" style="width:100%;">}}

En el gráfico de una métrica, haz clic en el menú contextual (tres puntos verticales) para encontrar la opción **Metrics info** (Información de la métrica). Esto abre un panel con una descripción de la métrica. Al hacer clic en el nombre de la métrica en este panel, se abre la métrica en la página del resumen de métricas para su posterior análisis o edición.

{{< img src="metrics/units/metrics_info.png" alt="La opción Información de métricas en el menú de contexto ampliado (tres puntos verticales)" style="width:100%;">}}

Para cambiar una unidad de métrica, ve a la página de [resumen de métricas][1] y selecciona una métrica. Haz clic en **Edit** en **Metadata** y selecciona una unidad, como `bit` o `byte` del menú desplegable.

## Lista de unidades

Las siguientes unidades pueden estar asociadas con las métricas enviadas a Datadog:

| tipo        | unidad(es)                                                                                                                                                                                                                                                                                                                    |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BYTES       | bit / byte (b) / kibibyte(KiB) / mebibyte (MiB) / gibibyte (GB) / tebibyte (TiB) / pebibyte (PiB) / exbibyte (EiB)                                                                                                                                                                                                         |
| TIEMPO        | nanosecond (ns) / microsecond (μs) / millisecond (ms) / second (s) / minute (min) / hour (hr) / day / week (wk)                                                                                                                                                                                                            |
| PORCENTAJE  | percent_nano (n%) / percent (%) / apdex / fraction                                                                                                                                                                                                                                                                         |
| RED     | connection (conn) / request (req) / packet (pkt) / segment (seg) / response (rsp) / message (msg) / payload / timeout / datagram / route / session / hop                                                                                                                                                                   |
| SISTEMA      | process (proc) / thread / host / node / fault / service (svc) / instance / cpu                                                                                                                                                                                                                                             |
| DISCO        | file / inode / sector / block (blk)                                                                                                                                                                                                                                                                                        |
| GENERAL     | buffer / error (err) / read (rd) / write (wr) / occurrence / event / time / unit / operation (op) / item / task / worker / resource (res) / garbage collection (gc) / email / sample (smpl) / stage / monitor / location / check / attempt / device (dev) / update (up) / method (mthd) / job / container / execution / throttle / invocation / user / success / build / prediction / exception |
| BASE DE DATOS          | table / index (idx) / lock / transaction (tx) / query / row / key / command (cmd) / offset / record / object / cursor / assertion (assert) / scan / document / shard / flush / merge / refresh / fetch / column (col) / commit / wait / ticket / question                                                                  |
| CACHÉ       | hit / miss / eviction / get / set                                                                                                                                                                                                                                                                                          |
| DINERO       | dollar ($) / cent (¢) / microdollar (μ$) / euro (€) / pound (£) / pence (p) / yen (¥)                                                                                                                                                                                                                                      |
| MEMORIA      | page (pg) / split                                                                                                                                                                                                                                                                                                          |
| FRECUENCIA   | hertz (Hz) / kilohertz (kHz) / megahertz (MHz) / gigahertz (GHz)                                                                                                                                                                                                                                                           |
| LOGS     | entry                                                                                                                                                                                                                                                                                                                      |
| TEMPERATURA | decidegree celsius (d°C) / degree celsius (°C) / degree fahrenheit (°F)                                                                                                                                                                                                                                                    |
| CPU         | nanocore (ncores) / microcore (μcores) / millicore (mcores) / core / kilocore (Kcores) / megacore (Mcores) / gigacore (Gcores) / teracore (Tcores) / petacore (Pcores) / exacore (Ecores)                                                                                                                                  |
| POTENCIA       | nanowatt (nW) / microwatt (μW) / milliwatt (mW) / deciwatt (dW) / watt / kilowatt / megawatt / gigawatt / terrawatt                                                                                                                                                                                                        |
| CORRIENTE     | milliampere (mA) / ampere (A)                                                                                                                                                                                                                                                                                              |
| POTENCIAL   | millivolt (mV) / volt (V)                                                                                                                                                                                                                                                                                                  |
| APM         | span                                                                                                                                                                                                                                                                                                                       |
| SYNTHETICS  | run / step                                                                                                                                                                                                                                                                                                                 |

## Formato de los números

### Formato sin unidades

Para las métricas sin unidades, Datadog utiliza los [prefijos del SI][2] `K`, `M`, `G` Y `T`. Después de `T`, los números se convierten a notación exponencial, que también se utiliza para números muy pequeños. De forma predeterminada, Datadog redondea a dos decimales. Para la notación exponencial, el valor predeterminado es cero decimales.

#### Ejemplos

| Valor bruto              | Formateado |
|------------------------|-----------|
| 1                      | 1         |
| 2.7182818284           | 2.72      |
| 1337                   | 1.34K     |
| 31536000               | 31.54M    |
| 4294967296             | 4.29G     |
| 18446744073709552000   | 2e19      |
| 0.001                  | 1e-3      |
| 2.3283064365386963e-10 | 2e-10     |
| inválido                | N/A       |

### Tratamiento de las unidades

Las unidades se formatean automáticamente en las gráficas para facilitar su lectura. Para personalizar el etiquetado de las unidades, consulta [Personalizar visualizaciones con la anulación de unidades][3].

#### Ejemplos

| Unidad       | Familia    | Valor bruto            | Formateado    |
|------------|-----------|----------------------|--------------|
| byte       | bytes     | 1                    | 1 B          |
| kibibyte   | bytes     | 1234235              | 1.18 GiB     |
| kibibyte   | bytes     | 45457878236741230000 | 40374.71 EiB |
| hertz      | frecuencia | 6345223              | 6.35 MHz     |
| cent       | dinero     | 1337                 | 13.37 $      |
| nanosecond | tiempo      | 0                    | 0s           |
| second     | tiempo      | 0.03212              | 32.12ms      |

### Formato de hora

Las unidades de tiempo comprendidas entre un minuto y un año se dividen en varias unidades para facilitar su lectura. Se aplican las siguientes convenciones:

- Los tiempos cortos se formatean en forma decimal.
- La unidad de tiempo más pequeña es el nanosegundo.
- Los tiempos largos se formatean como días en forma decimal.


#### Ejemplos

| Segundos en bruto | Formateado               |
|-------------|-------------------------|
| 0.00123     | 1.23ms                  |
| 0.00012345  | 123.45μs (microsegundos) |
| 1.2345e-9   | 1.23ns                  |
| 95          | 1m 35s                  |
| 3671        | 1h 1m                   |
| 86390       | 1d                      |
| 96400       | 1d 3h                   |
| 52596400    | 608.75 days             |


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/summary
[2]: https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes
[3]: /es/dashboards/guide/unit-override/