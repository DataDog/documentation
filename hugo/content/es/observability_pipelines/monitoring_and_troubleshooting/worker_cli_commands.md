---
aliases:
- /es/observability_pipelines/install_the_worker/worker_commands/
description: Encuentre los comandos y opciones run, tap y top para la interfaz de
  línea de comandos de Observability Pipelines Worker.
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/install_the_worker/
  tag: Documentación
  text: Instale el Worker
title: Comandos de la CLI del Worker
---
## Run, tap o top el Worker {#run-tap-or-top-the-worker}

Ejemplo de uso: `observability-pipelines-worker <COMMAND>`

Si está utilizando un entorno contenedorizado, use el comando `docker exec` o `kubectl exec` para obtener un shell en el contenedor y ejecutar el comando. Por ejemplo:

- Para Kubernetes: `kubectl exec -it <pod_name> -- observability-pipelines-worker <opw_command>`
- Para Docker: `docker exec -it <container_name> observability-pipelines-worker <opw_command>`

| Comando   | Descripción                                                                                                           |
|-----------|-----------------------------------------------------------------------------------------------------------------------|
| `run`     | Ejecute el Observability Pipelines Worker.                                                                                |
| `tap`     | Ejecute tap en una canalización para observar eventos desde la fuente o transformar componentes. Consulte [opciones de tap](#tap-options).                |
| `top`     | Enumera los componentes de la canalización y proporciona estadísticas como las tasas de datos de entrada y salida para cada componente. Ingrese `?` para ver todas las combinaciones de teclas disponibles.  |

### Opciones de tap {#tap-options}

Ejemplo de uso: `observability-pipelines-worker tap <OPTIONS> <COMPONENT_ID>`

Puede usar el [`top` comando ](#run-tap-or-top-the-worker) para encontrar el ID del componente al que desea `tap`.

| Opciones                          | Descripciones                                                                                                   |
|----------------------------------|----------------------------------------------------------------------------------------------------------------|
| `-i`, `--interval <INTERVAL>`    | Intervalo para muestrear eventos, en milisegundos (predeterminado: `500`). |
| `-u`, `--url <URL>`              | Punto de conexión del servidor de la API de GraphQL. |
| `-l`, `--limit <LIMIT>`          | Número máximo de eventos para muestrear en cada intervalo (predeterminado: `100`). |
| `-f`, `--format <FORMAT>`        | Formato de codificación para los eventos impresos en pantalla.<br>predeterminado: `json`<br>valores posibles: `json`, `yaml`, `logfmt`  |
| `--outputs-of <OUTPUTS_OF>`      | IDs de fuente o procesador cuyas salidas desea observar (separados por comas; acepta patrones glob).            |
| `--inputs-of <INPUTS_OF>`        | IDs de procesador o destino cuyas entradas desea observar (separados por comas; acepta patrones glob). |
| `-q`, `--quiet`                  | La salida silenciosa incluye solo eventos. |
| `-m`, `--meta`                   | Incluye metadatos como el ID del componente asociado al evento. |
| `-n`, `--no-reconnect`           | Indica si se debe reconectar si la conexión API subyacente se interrumpe. De forma predeterminada, `tap` intenta reconectarse si la conexión se interrumpe. |
| `-d`, `--duration-ms <DURATION_MS>` | Especifica una duración (en milisegundos) para muestrear registros (por ejemplo, especificar `10000` muestrea registros durante 10 segundos y luego sale). |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}