---
description: Utilice variables SECL y acciones de reglas de Agent para enriquecer
  eventos, responder a amenazas y crear lógica de detección con estado.
disable_toc: false
title: Variables y acciones
---
Las acciones de regla extienden las reglas de Workload Protection (seguridad en tiempo de ejecución) más allá de la detección. Cuando una regla coincide con un evento, el Agent puede ejecutar una o más acciones para enriquecer el evento, responder a una amenaza o impulsar una lógica de detección de varios pasos.

Las acciones se definen en los archivos de política de Agent (`.policy`) bajo el campo `actions` de una regla.
<div class="alert alert-info">Todas las acciones se pueden configurar en los archivos de política de Agent (YAML), pero <code>log</code>, <code>coredump</code>, y <code>network_filter</code> no se pueden configurar desde la interfaz de usuario al crear una regla.
Cuando crea una regla de Agent en Datadog, puede configurar <code>hash</code>, <code>kill</code> (<a href="/security/workload_protection/respond_and_report/#automated-response">respuesta automatizada</a>), y <code>set</code> acciones. Desde una señal de seguridad, puede aplicar manualmente <code>kill</code> o <code>network_filter</code> a una amenaza dirigida con <a href="/security/workload_protection/respond_and_report/#response">respuesta manual</a>.
</div>

| Acción           | Propósito                                               | Plataforma       | Requiere cumplimiento |
| ---------------- | ----------------------------------------------------- | -------------- | -------------------- |
| `set`            | Almacenar estado en una variable para su uso por otras reglas      | Linux, Windows | No                   |
| `kill`           | Terminar un proceso                                   | Linux, Windows | Sí                  |
| `hash`           | Calcular hashes de un archivo                              | Linux          | No                   |
| `log`            | Escribir un mensaje en el registro de Agent                      | Linux, Windows | No                   |
| `coredump`       | Capturar estado forense (proceso, montaje, dentry)       | Linux          | No                   |
| `network_filter` | Haga un seguimiento o descarte el tráfico de red que coincida con un filtro BPF.| | |


## Sintaxis {#syntax}

Cada regla puede definir múltiples acciones como una lista YAML. Cada elemento de la lista debe contener exactamente un tipo de acción.

{{< code-block lang="yaml" >}}
rules:
  - id: my_rule
    expression: exec.file.name == "suspicious_binary"
    actions:
      - set:
          name: flagged_process
          value: true
          ttl: 5m
      - kill:
          signal: SIGKILL
          scope: process

{{< /code-block >}}

### Filtros de acción {#action-filters}

Cada acción admite un campo opcional `filter`: una expresión SECL evaluada en el momento de la acción. La acción se ejecuta solo cuando coinciden tanto la expresión de la regla como el filtro de acción.


| Campo    | Requerido | Predeterminado                                | Descripción                               |
| -------- | -------- | -------------------------------------- | ----------------------------------------- |
| `filter` | No       | Ninguno (la acción se ejecuta en cada coincidencia de regla) | Expresión SECL evaluada en el momento de la acción. |


{{< code-block lang="yaml" >}}
rules:
  - id: kill_container_process
    expression: exec.file.name == "malware"
    actions:
      - filter: process.container.id != ""
        kill:
          signal: SIGTERM
          scope: container

{{< /code-block >}}

## `set`: almacenar variables {#set-store-variables}

Use `set` para almacenar un estado que persista entre reglas dentro de la misma política. Después de definirla, una variable puede ser referenciada desde cualquier otra regla en esa política.

### Cuándo usarla {#when-to-use-it}

Las variables son una de las capacidades más potentes en la creación de reglas del Agent. Son esenciales para crear detecciones con estado y de varios pasos que van más allá de lo que una sola expresión SECL puede expresar por sí misma.

- Encadene reglas dentro de una política registrando el contexto en una regla y haciendo coincidir una regla de seguimiento que haga referencia a esa variable.
- Cree listas continuas de nombres de procesos, rutas o actividad de DNS.

### Parámetros {#parameters}


| Campo           | Requerido                                 | Predeterminado                         | Descripción                                                                                      |
| --------------- | ---------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------ |
| `name`          | Sí                                      | —                               | Nombre de la variable. Referenciado en expresiones como `${name}` o `${scope.name}`.                        |
| `value`         | Uno de `value`, `field` o `expression` | —                               | Valor estático (cadena, entero, booleano o matriz).                                               |
| `field`         | Uno de `value`, `field` o `expression` | —                               | Copiar un valor del evento desencadenante (por ejemplo, `process.file.name`).                       |
| `expression`    | Uno de `value`, `field` o `expression` | —                               | Expresión SECL cuyo resultado se almacena. Requiere `default_value` si el tipo no puede ser inferido.     |
| `default_value` | No                                       | —                               | Predeterminado al usar `expression`. Debe coincidir con el tipo de `value`.                                 |
| `scope`         | No                                       | Global (sin prefijo de contexto)        | `process`, `container` o `cgroup`. Antepone el nombre de la variable (por ejemplo, `process.my_var`). |
| `scope_field`   | No                                       | PID del proceso desencadenante          | Clave de contexto personalizada (solo contexto `process`).                                                         |
| `append`        | No                                       | `false`                         | Anexar a una variable de lista en lugar de sobrescribir.                                                |
| `size`          | No                                       | `100` (cuando `append` es `true`) | Longitud máxima de la lista cuando `append` es `true`.                                                     |
| `ttl`           | No                                       | Sin expiración                   | Tiempo de vida (por ejemplo, `10s`, `5m`). La variable expira después de esta duración.                   |
| `inherited`     | No                                       | `false`                         | La variable es heredada por procesos hijos (solo contexto `process`).                                 |
| `private`       | No                                       | `false`                         | La variable no se expone en eventos de seguridad.                                                      |


### Ejemplos {#examples}

Establecer una bandera booleana:

{{< code-block lang="yaml" >}}
rules:
  - id: flag_suspicious_exec
    expression: exec.file.path in ["/tmp/evil"]
    actions:
      - set:
          name: suspicious
          value: true
          ttl: 10m
  - id: detect_follow_up
    expression: open.file.path == "/etc/shadow" && ${suspicious}
{{< /code-block >}}

Recopilar consultas DNS en una lista rotativa:

{{< code-block lang="yaml" >}}
rules:
  - id: collect_dns_queries
    expression: dns.question.name != ""
    actions:
      - set:
          name: queried_domains
          field: dns.question.name
          append: true
          size: 10
          ttl: 10s
          scope: process

{{< /code-block >}}

Crear una regla de correlación:

Use `private` para mantener el estado interno fuera de los eventos de seguridad, y `scope_field` para vincular una variable a un proceso distinto al que activó el evento (por ejemplo, el destino de un evento `cgroup_write`):

{{< code-block lang="yaml" >}}
rules:
  - id: init_correlation_key
    expression: cgroup_write.file.path != "" && ${process.correlation_key} == ""
    actions:
      - set:
          name: correlation_key
          default_value: ""
          expression: '"attack_${builtins.uuid4}"'
          scope: process
          scope_field: cgroup_write.pid
          inherited: true
          private: true
  - id: detect_correlated_file_access
    expression: open.file.path == "/etc/shadow" && ${process.correlation_key} != ""
{{< /code-block >}}

Calcule un valor a partir de una expresión :
Use `expression` con `default_value` para definir el tipo de variable y almacenar un resultado calculado :

{{< code-block lang="yaml" >}}
rules:
  - id: record_exec_context
    expression: exec.file.path in ["/tmp/evil"]
    actions:
      - set:
          name: exec_context
          default_value: ""
          expression: '"cmd_${process.pid}_${exec.file.name}"'
          scope: process
          ttl: 5m
{{< /code-block >}}

## `kill`: terminar un proceso {#kill-terminate-a-process}

Use `kill` para detener activamente la actividad maliciosa : El Agent envía una señal POSIX al proceso, contenedor o cgroup de destino :

### Configure en Datadog {#configure-in-datadog}

Además de definir acciones `kill` en los archivos de política de Agent, puede configurar la terminación de procesos en Datadog.

- **Automático:** Agregue acciones `kill` a las reglas de Agent en una política, como se describe en esta sección, o use [respuesta automatizada][1].
- **Manual:** Desde una señal de seguridad, use [Eliminar contenedores o procesos][2] en {{< ui >}}Respond{{< /ui >}} en el panel lateral de la señal.

Ambos enfoques requieren [Agent enforcement][3], que está habilitado de forma predeterminada. Consulte [Respond to Threats][4] para obtener una descripción general de las acciones de enforcement y respuesta.

### Cuándo usarlo {#when-to-use-it-1}

- Bloquee la criptominería, las shells inversas o el malware conocido en tiempo de ejecución :
- Detenga un proceso de forma controlada (`SIGTERM`) o fuércelo a terminar (`SIGKILL`) :

### Requisitos {#requirements}

- El Agent enforcement debe estar habilitado en la configuración de Agent (`runtime_security_config.enforcement.enabled`). Consulte [Configuración avanzada][5] :
- Las acciones de eliminación se rechazan al cargar la política si el Agent enforcement está deshabilitado globalmente.
- Las señales admitidas incluyen `SIGKILL`, `SIGTERM`, `SIGHUP`, `SIGINT` y otros nombres de señales POSIX estándar :

### Parámetros {#parameters-1}


| Campo                         | Requerido | Predeterminado   | Descripción                                                                         |
| ----------------------------- | -------- | --------- | ----------------------------------------------------------------------------------- |
| `signal`                      | Sí      | —         | Nombre de la señal (por ejemplo, `SIGKILL`, `SIGTERM`) :                                    |
| `scope`                       | No       | `process` | `process`, `container` o `cgroup` : Determina qué procesos reciben la señal : |
| `disable_container_disarmer`  | No       | `false`   | Deshabilita la salvaguarda de desactivación automática de contenedores :                                 |
| `disable_executable_disarmer` | No       | `false`   | Deshabilita la salvaguarda de desactivación automática de ejecutables :                                |


### Salvaguardas {#safeguards}

El Agent incluye desactivadores para evitar bucles de eliminación descontrolados durante la respuesta automatizada : Si se activan demasiadas acciones de eliminación contra el mismo contenedor o ejecutable dentro de un período configurado, las eliminaciones posteriores para ese destino se suprimen hasta que expire el período :

Ciertos binarios también pueden excluirse del Agent enforcement a través de `runtime_security_config.enforcement.exclude_binaries`.

### Ejemplo {#example}

{{< code-block lang="yaml" >}}
rules:
  - id: block_ping_process
    expression: >-
      exec.file.name == "ping"
    actions:
      - kill:
          signal: SIGKILL
          scope: process

{{< /code-block >}}

#### Informe de acción de eliminación {#kill-action-report}

Cuando se ejecuta una acción `kill`, el Agent adjunta un informe de acción al evento de Agent desencadenante en `agent.rule_actions`. Este no es un evento personalizado independiente; el informe se serializa con el evento de seguridad que coincidió con la regla. Para `SIGKILL`, el Agent puede retrasar el envío del evento hasta que el proceso de destino finalice para que los campos de tiempo sean precisos.

| Campo | Descripción |
| ----- | ----------- |
| `type` | Siempre `kill` |
| `signal` | Señal POSIX enviada (por ejemplo, `SIGKILL`, `SIGTERM`) |
| `scope` | `process`, `container` o `cgroup` |
| `status` | Resultado de la ejecución: `performed`, `partially_performed`, `error`, `kill_queued`, `kill_aborted`, `rule_disarmed` o `rule_dismantled` |
| `disarmer_type` | Salvaguarda que bloqueó o alteró la eliminación: `container` o `executable` (cuando corresponda) |
| `created_at` | Hora en que se creó el proceso de destino |
| `detected_at` | Hora en que coincidió la regla |
| `killed_at` | Hora en que se envió la señal (cuando corresponda) |
| `exited_at` | Hora en que finalizó el proceso de destino (cuando corresponda) |
| `ttr` | Tiempo transcurrido desde la creación del proceso hasta su finalización |

Para contar cuántas veces se ejecutó una acción `kill` después de una coincidencia de regla, use la métrica `datadog.runtime_security_config.rules.action_performed` con las etiquetas `rule_id:<rule_id>` y `action_name:kill`.

## `network_filter`: hacer un seguimiento o bloquear el tráfico de red {#network-filter-monitor-or-block-network-traffic}

`network_filter`Utilice para descartar paquetes que coincidan con una expresión de filtro BPF para el proceso o cgroup infractor. Esto es aislamiento de red a nivel de servidor.

### Configure en Datadog {#configure-in-datadog-1}

Además de definir acciones `network_filter` en los archivos de política del Agent, puede aislar una carga de trabajo comprometida en Datadog:

- **Automático:** Agregue acciones `network_filter` a las reglas del Agent en una política, como se describe en esta sección. Cuando una regla coincide, el Agent descarta el tráfico coincidente automáticamente.
- **Manual:** Desde una señal de seguridad, use [Network isolation][6] en {{< ui >}}Respond{{< /ui >}} en el panel lateral de la señal.

### Cuándo usarlo {#when-to-use-it-2}

- Interrumpa la comunicación C2 después de detectar un proceso malicioso.
- Bloquee el tráfico DNS o de un puerto específico desde un contenedor comprometido.

### Requisitos {#requirements-1}

- La aplicación debe estar habilitada.
- El tipo de evento `raw_packet` debe estar habilitado en la configuración del Agent.
- Solo Linux (filtrado de paquetes basado en eBPF).

### Parámetros {#parameters-2}


| Campo    | Requerido | Predeterminado   | Descripción                                                    |
| -------- | -------- | --------- | -------------------------------------------------------------- |
| `filter` | Sí      | —         | Expresión de filtro BPF (por ejemplo, `port 53`, `tcp port 80`). |
| `policy` | No       | `allow`   | `drop` o `allow`. Solo `drop` aplica el descarte de paquetes.       |
| `scope`  | No       | `process` | `process` o `cgroup`.                                         |


### Ejemplo {#example-1}

{{< code-block lang="yaml" >}}
rules:
  - id: block_malicious_container_network
    expression: exec.container.id == "046f6a38c8b404a78fb9be56672d554ed5a326f4c568ffb137e16cf3e7e6be43"
    actions:
      - network_filter:
          filter: "dst net 10.0.0.0/8 or dst net 172.16.0.0/12 or dst net 192.168.0.0/16 or dst net 169.254.0.0/16 or dst net 127.0.0.0/8"
          policy: drop
          scope: cgroup

{{< /code-block >}}

### Acción y métricas de paquete sin procesar {#raw-packet-action-and-metrics}

#### Evento de acción de paquete sin procesar {#raw-packet-action-event}

Cuando el kernel descarta un paquete que coincide con un filtro activo, el Agent puede emitir un evento personalizado `rawpacket_action` (`@agent.rule_id:rawpacket_action`). Estos eventos tienen una limitación de tasa bajo un alto volumen de descartes, porque el Agent no puede enviar un evento por cada paquete descartado. La carga útil del evento incluye:


| Campo            | Descripción                                                          |
| ---------------- | -------------------------------------------------------------------- |
| `packet.dropped` | `true` para paquetes descartados                                           |
| `packet.layers`  | Capas de red decodificadas (Ethernet, IP, TCP/UDP, etcétera)            |
| `packet.tls`     | Contexto TLS cuando esté disponible                                           |
| `network`        | Contexto de red para el paquete descartado (dispositivo, fuente, destino) |


#### Métricas {#metrics}

Utilice la métrica `datadog.runtime_security_config.network.raw_packet.dropped` para realizar un seguimiento confiable de los conteos de descartes.

## `hash`: Calcule los hashes de archivo {#hash-compute-file-hashes}

Utilice `hash` para enriquecer un evento con hashes criptográficos de un archivo referenciado en el evento desencadenante. Esto es útil para la coincidencia de inteligencia de amenazas y el análisis forense.

### Cuándo usarlo {#when-to-use-it-3}

- Calcule el hash de un binario en el momento de la ejecución antes de que sea eliminado o modificado.
- Calcule el hash de un archivo abierto para escritura para correlacionarlo con firmas de malware conocidas.

### Parámetros {#parameters-3}


| Campo           | Requerido | Predeterminado                                                                      | Descripción                                                                                       |
| --------------- | -------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `field`         | No       | `exec.file` para reglas `exec`; `open.file` para reglas `open`                   | Campo de evento de archivo para calcular el hash (por ejemplo, `exec.file`, `open.file`). Requerido para otros tipos de eventos. |
| `max_file_size` | No       | `5242880` (5 MB), de `runtime_security_config.hash_resolver.max_file_size` | Tamaño máximo de archivo (bytes) para calcular el hash. Los archivos más grandes se omiten.                                      |


### Algoritmos admitidos {#supported-algorithms}

Los hashes son calculados por el resolvedor de hash del Agent y pueden incluir `MD5`, `SHA1`, `SHA256` y `SSDEEP`, dependiendo de la configuración del Agent. Los resultados aparecen en el campo `*.hashes` del evento (por ejemplo, `exec.file.hashes`). Para cambiar los algoritmos utilizados, actualice `runtime_security_config.hash_resolver.hash_algorithms` en `system-probe.yaml` o establezca `DD_RUNTIME_SECURITY_CONFIG_HASH_RESOLVER_HASH_ALGORITHMS`. Consulte [Workload Protection Agent configuration][5] para ver todos los parámetros del resolvedor de hash.

### Ejemplo {#example-2}

{{< code-block lang="yaml" >}}
rules:
  - id: hash_dropped_binary
    expression: exec.file.path startswith "/tmp/" && exec.file.name not in ["systemd"]
    actions:
      - hash:
          field: exec.file
          max_file_size: 10485760  # 10 MB

{{< /code-block >}}

## `log`: Escriba en los registros del Agent {#log-write-to-agent-logs}

Utilice `log` para emitir un mensaje estructurado al registro del Runtime Security Agent cuando se active una regla. Esto es útil para depurar reglas personalizadas o auditar activaciones de reglas sin generar una señal de seguridad completa.

### Cuándo usarla {#when-to-use-it-4}

- Depurar la lógica de la regla durante el desarrollo.

### Parámetros {#parameters-4}


| Campo     | Requerido | Predeterminado                    | Descripción                                        |
| --------- | -------- | -------------------------- | -------------------------------------------------- |
| `level`   | Sí      | —                          | Registro: `debug`, `info`, `warning` o `error`. |
| `message` | No       | `Rule <rule_id> triggered` | Mensaje personalizado.                                    |


### Ejemplo {#example-3}

{{< code-block lang="yaml" >}}
rules:
  - id: log_sensitive_file_access
    expression: open.file.path startswith "/etc/"
    actions:
      - log:
          level: warning
          message: "Suspicious file access detected on sensitive path"

{{< /code-block >}}

## `coredump`: Capture el estado forense {#coredump-capture-forensic-state}

Utilice `coredump` para tomar una instantánea del estado interno del Agent en el momento en que se active una regla. El volcado está comprimido con gzip (a menos que se deshabilite) y se adjunta al evento de seguridad.

### Cuándo usarla {#when-to-use-it-5}

- Se utiliza principalmente para fines de depuración.
- Capture las cachés de contexto interno, como el árbol de procesos, la tabla de montaje o el estado de la caché de dentry, junto con el evento desencadenante.

### Plataforma {#platform}

Solo Linux.

### Parámetros {#parameters-5}

Se debe establecer al menos uno de `process`, `mount` o `dentry` en `true`.


| Campo            | Requerido     | Predeterminado                            | Descripción                                   |
| ---------------- | ------------ | ---------------------------------- | --------------------------------------------- |
| `process`        | Al menos uno | `false`                            | Incluir la instantánea del resolutor de procesos.        |
| `mount`          | Al menos uno | `false`                            | Incluir la instantánea del resolutor de montaje.          |
| `dentry`         | Al menos uno | `false`                            | Incluir la instantánea del resolutor de dentry.         |
| `no_compression` | No           | `false` (compresión gzip habilitada) | Deshabilite la compresión gzip de la carga útil del volcado. |


### Ejemplo {#example-4}

{{< code-block lang="yaml" >}}
rules:
  - id: capture_forensic_state
    expression: exec.file.path startswith "/tmp/" && process.container.id != ""
    actions:
      - coredump:
          process: true
          mount: true
          dentry: true
          no_compression: false

{{< /code-block >}}

## Combinación de acciones {#combining-actions}

Una sola regla puede encadenar múltiples acciones. Se ejecutan en el orden de la lista cuando la regla coincide:

{{< code-block lang="yaml" >}}
rules:
  - id: detect_and_respond
    expression: exec.file.path == "/tmp/payload"
    actions:
      - set:
          name: payload_seen
          value: true
      - hash:
          field: exec.file
      - log:
          level: info
          message: "Payload executed, hashing and killing"
      - kill:
          signal: SIGKILL
          scope: process

{{< /code-block >}}

Patrones típicos:


| Patrón                 | Acciones                                       |
| ----------------------- | --------------------------------------------- |
| Detectar → enriquecer → alertar | `hash` solo (señal enviada automáticamente)       |
| Detectar → responder        | `kill` o `network_filter`                    |
| Detección de varios pasos    | `set` en la regla A, referencia `${var}` en la regla B |
| Depurar reglas personalizadas      | `log`                                         |


## Resumen de la plataforma {#platform-summary}


| Acción           | Linux | Windows |
| ---------------- | ----- | ------- |
| `set`            | ✅     | ✅       |
| `kill`           | ✅     | ✅       |
| `hash`           | ✅     | ❌       |
| `log`            | ✅     | ✅       |
| `coredump`       | ✅     | ❌       |
| `network_filter` | ✅     | ❌       |


## Reglas de validación {#validation-rules}

El Agent valida las acciones al momento de cargar la política:

- **Un tipo de acción por lista**: `set` y `kill` no pueden aparecer en el mismo bloque de acción.
- **Campos obligatorios**: por ejemplo, `kill.signal`, `log.level`, `network_filter.filter`.
- **Puerta de cumplimiento**: `kill` y `network_filter` requieren que el cumplimiento esté habilitado.
- **Compatibilidad de tipo de evento**: `network_filter` requiere el tipo de evento `raw_packet`; `hash.field` debe ser compatible con el tipo de evento de la regla.

[1]: /es/security/workload_protection/respond_and_report/#automated-response
[2]: /es/security/workload_protection/investigate_and_triage/security_signals/actions#kill-containers-or-processes
[3]: /es/security/workload_protection/respond_and_report/#configure-agent-enforcement
[4]: /es/security/workload_protection/respond_and_report/
[5]: /es/security/workload_protection/setup/advanced_configuration
[6]: /es/security/workload_protection/investigate_and_triage/security_signals/actions#network-isolation