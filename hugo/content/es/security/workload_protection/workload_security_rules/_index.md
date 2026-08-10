---
aliases:
- /es/security_platform/cloud_workload_security/workload_security_rules
- /es/security/cloud_workload_security/workload_security_rules
- /es/security/threats/workload_security_rules
title: Reglas de detección de Workload Protection
---

En este tema se explica cómo Workload Protection monitoriza activamente la actividad del sistema y la evalúa en función de un conjunto de reglas predefinidas (OOTB) para detectar comportamientos sospechosos.

## Bloquear de forma proactiva las amenazas con Active Protection

Por defecto, todas las reglas de detección de amenazas de minería de criptomonedas predefinidas del Agent están habilitadas y activas para la monitorización contra amenazas.

[Active Protection][12] te permite bloquear y terminar proactivamente las amenazas de minería de criptomonedas identificadas por las reglas de detección de amenazas de Datadog Agent.

## Creación de normas de Workload Protection

Las reglas de Workload Protection constan de dos componentes diferentes: reglas de Agent y reglas de detección de amenazas.

- Las **reglas del Agent:** [reglas Agent][9] se evalúan en el host del Agent. Workload Protection evalúa primero la actividad dentro del Agent con respecto a las expresiones del Agent para decidir qué actividad recopilar. Las expresiones del Agent utilizan el [Lenguaje de seguridad (SECL)][2] de Datadog.<br><br>

  Por ejemplo, he aquí la expresión *regla del Agent* `cryptominer_args`:

  ```text
  exec.args_flags in ["cpu-priority", "donate-level", ~"randomx-1gb-pages"] ||
  exec.args in [
      ~"*stratum+tcp*",
      ~"*stratum+ssl*",
      ~"*stratum1+tcp*",
      ~"*stratum1+ssl*",
      ~"*stratum2+tcp*",
      ~"*stratum2+ssl*",
      ~"*nicehash*",
      ~"*yespower*"
  ]
  ```
- **Reglas de detección de amenazas:** [Las reglas de detección de amenazas][3] se evalúan en el backend de Datadog. Las reglas de detección de amenazas se componen de reglas existentes del Agent y parámetros de expresión adicionales.<br><br>

  Esta es la *regla de detección de amenazas* `Process arguments match cryptocurrency miner`. Utiliza las reglas de Agent, `cryptominer_args` y `windows_cryptominer_process`, identificadas por `@agent.rule_id`, con parámetros de expresión adicionales:

  ```text
  @agent.rule_id:(cryptominer_args || windows_cryptominer_process)
  -@process.executable.path:"/usr/bin/grep"
  ```

### Pipeline de reglas de Workload Protection

Workload Protection utiliza el siguiente pipeline al evaluar eventos:

1. Las reglas de Agent evalúan la actividad del sistema en el host del Agent.
2. Cuando la actividad coincide con una expresión de regla de Agent, el Agent genera un evento de detección y lo transmite al backend de Datadog.
3. El backend de Datadog evalúa el evento de detección para ver si coincide con alguna regla de detección de amenazas que utilice la regla de Agent que envió el evento.
4. Si hay una coincidencia, se genera una señal y se muestra en [Señales][8].
5. Se activa cualquier [regla de notificación][10] que coincida con la gravedad, el tipo de regla de detección, las etiquetas (tags) y los atributos de la señal.

El siguiente diagrama ilustra este pipeline:

{{< img src="security/cws/threat_detection_pipeline_2.png" alt="Pipeline de detección de Workload Protection" style="width:100%;" >}}

### Ahorrar recursos mediante el diseño

Las reglas de detección de Workload Protection son complejas, ya que correlacionan varios puntos de datos, a veces a través de diferentes hosts, e incluyen datos de terceros. Esta complejidad supondría una considerable demanda de recursos informáticos en el host del Agent si todas las reglas se evaluaran allí. 

Datadog resuelve este problema manteniendo ligero al Agent con sólo unas pocas reglas, y procesa la mayoría de las reglas utilizando las reglas de detección de amenazas en el backend de Datadog.

Solo cuando el Agent observa un evento que coincide con sus reglas envía una detección al backend de Datadog. A continuación, el backend de Datadog evalúa la detección para determinar si cumple sus expresiones de reglas de detección de amenazas. Solo si hay una coincidencia, el backend de Datadog crea una señal.

### Diseño de reglas personalizadas

Comprender la dependencia que tienen las reglas de detección de amenazas de las reglas de Agent es importante cuando deseas utilizar reglas personalizadas. Las reglas personalizadas ayudan a detectar eventos que Datadog no detecta con tus reglas predefinidas.

Hay dos casos de uso:

- **Crear una regla de detección de amenazas utilizando una regla de Agent existente:** para crear una regla de detección de amenazas que utilice una regla de Agent existente, solo tienes que crear una regla de detección de amenazas que haga referencia a la regla de Agent y añadir los parámetros de expresión adicionales que necesites.
- **Crear una regla de detección de amenazas utilizando una nueva regla de Agent:** para detectar un evento que las reglas actuales de Agent no admiten, crea una regla de Agent personalizada para detectar ese evento y, luego, crea una regla de detección de amenazas personalizada que utilice la regla de Agent personalizada.

Para una explicación detallada, consulta [Reglas de detección de Workload Protection][11]. 

## Resumen de reglas de Agent

Las reglas de Agent contienen [expresiones de Agent](#agent-expressions) que determinan qué actividades recopila el Agent. Un conjunto completo de reglas de Agent se denomina política. Datadog te proporciona varias [reglas de Agent predefinidas][6] impulsadas por la política predeterminada del Agent.

Con [Workload Protection][7] activado, recibirás automáticamente reglas del Agent nuevas y actualizadas de Workload Protection cuando se publiquen. Estas reglas agrupadas del Agent se utilizan en las [reglas de detección predeterminadas][1].

<!-- <div class="alert alert-info">La configuración remota de Workload Protection está en Vista previa. Si tienes preguntas o comentarios, ponte en contacto con el <a href="/help">servicio de asistencia de Datadog</a>.</div> -->

### Expresiones del Agent

Las expresiones del Agent utilizan [el Lenguaje de seguridad (SECL) de Datadog][2] para definir el comportamiento basado en la actividad en tus hosts y contenedores, como se muestra en los siguientes ejemplos:

#### Detectar cuándo se ejecuta el comando `passwd`

Para detectar cuándo se ejecuta el comando `passwd`, hay que tener en cuenta algunos atributos.

En la mayoría de las distribuciones de Linux, la utilidad `passwd` se instala en `/usr/bin/passwd`. Los eventos de ejecución incluyen `exec`, `execve`, `fork` y otras llamadas al sistema. En el entorno de Workload Protection, todos estos eventos se identifican con el símbolo `exec`.

Si lo unimos todo, la expresión de la regla es `exec.file.path == "/usr/bin/passwd"`.

La regla de comandos `passwd` ya está presente en la política predeterminada del Agent de Workload Protection. Sin embargo, las expresiones del Agent también pueden ser más avanzadas y pueden definir reglas que coincidan con los predecesores del proceso o utilizar comodines para detecciones más amplias.

#### Detectar cuando un proceso PHP o Nginx lanza Bash

Para detectar cuando un proceso PHP o Nginx lanza Bash, hay algunos atributos a tener en cuenta.

En la mayoría de las distribuciones de Linux, Bash se instala en `/usr/bin/bash`. Como en el ejemplo anterior, para detectar la ejecución, incluye `exec.file.path == "/usr/bin/bash"` en tu regla. Esto asegura que la regla está considerando la ejecución de Bash y también del Bash como proceso secundario de PHP o Nginx.

El nombre de archivo de un proceso predecesor en Workload Protection es un atributo con el símbolo `process.ancestors.file.name`. Para comprobar si el predecesor es Nginx, añade `process.ancestors.file.name == "nginx"`. Dado que PHP se ejecuta como múltiples procesos, utiliza un comodín para expandir la regla a cualquier proceso con el prefijo `php`. Para comprobar si el predecesor es un proceso PHP, añade `process.ancestors.file.name =~ "php*"`. 

Si lo unimos todo, la expresión de la regla es `exec.file.path == "/usr/bin/bash"  && (process.ancestors.file.name == "nginx" || process.ancestors.file.name =~ "php*")`.

## Resumen de las reglas de detección

Las reglas de detección que se ejecutan en el backend de Datadog después de eventos se envían como logs. A continuación, los logs se evalúan en función de los patrones de eventos descritos en las [reglas de detección][3]. Si el patrón coincide con una regla de detección, se genera una [señal de seguridad][8]. Datadog desarrolla continuamente nuevas reglas de detección, que se importan automáticamente a tu cuenta.


[1]: /es/security/default_rules/#cat-workload-security
[2]: /es/security/workload_protection/agent_expressions
[3]: https://app.datadoghq.com/security/configuration/rules?product=cws
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /es/security/notifications/variables/
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: https://app.datadoghq.com/security/configuration/workload/setup
[8]: /es/security/workload_protection/security_signals
[9]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[10]: https://app.datadoghq.com/security/configuration/notification-rules
[11]: /es/security/workload_protection/workload_security_rules/custom_rules
[12]: /es/security/workload_protection/guide/active-protection