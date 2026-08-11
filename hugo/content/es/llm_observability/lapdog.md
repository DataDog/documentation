---
description: Ejecute un Agent Observability dashboard localmente para inspeccionar las
  trazas del agente de codificación y de la aplicación en su navegador sin una cuenta
  de Datadog.
further_reading:
- link: https://github.com/DataDog/dd-apm-test-agent/blob/master/lapdog/README.md
  tag: GitHub
  text: README de Lapdog en GitHub
- link: /llm_observability/instrumentation/sdk
  tag: Documentación
  text: Instrumente su aplicación con Agent Observability SDK.
- link: /llm_observability/instrumentation/auto_instrumentation
  tag: Documentación
  text: Auto-instrumentación para Agent Observability.
title: Lapdog
---
## Descripción general {#overview}

Lapdog es una herramienta de desarrollo local para Agent Observability. Ejecute un agente en `localhost:8126` que capture cada span, prompt, llamada a herramienta y costo de su aplicación LLM, o de un agente de codificación como Claude Code, Codex o Pi, y transmita estos datos a un dashboard en el navegador en [lapdog.datadoghq.com](https://lapdog.datadoghq.com). No se requiere una cuenta de Datadog.

Lapdog está construido sobre el agente de prueba de código abierto [Datadog APM test agent][1]. También puede reenviar la telemetría capturada a Datadog para que los mismos datos aparezcan en Agent Observability junto con su tráfico de producción.

## Lo que obtiene {#what-you-get}

- Trazas por sesión con prompts, llamadas a herramientas y respuestas
- Uso de tokens y costo estimado, desglosado por entrada, salida y aciertos de caché
- Fricción de permisos: llamadas a herramientas restringidas y tiempos de espera
- Uso de ventana de contexto y tasa de aciertos de caché durante la sesión
- Estado en vivo del agente de codificación en ejecución (ejecutándose, inactivo, bloqueado)

## Instalar {#install}

{{< tabs >}}
{{% tab "Homebrew (macOS)" %}}

```shell
brew install datadog/lapdog/lapdog
```
{{% /tab %}}
{{% tab "pip / pipx" %}}

```shell
pipx install ddapm-test-agent
# or: pip install ddapm-test-agent
```
{{% /tab %}}
{{< /tabs >}}

Para Docker, desde el código fuente y otros caminos de instalación, consulta la [guía de instalación de Lapdog][1].

## Ejecutar un agente de codificación {#run-a-coding-agent}

Lapdog instrumenta agentes de codificación de extremo a extremo. Cada prompt, llamada a herramienta y solicitud de permiso se convierte en un tramo en una sesión que puede reproducir desde el dashboard.

{{< tabs >}}
{{% tab "Claude Code" %}}

```shell
lapdog claude
```
Inicie el agente local, instale el complemento de Lapdog Claude Code y lance Claude Code.
{{% /tab %}}
{{% tab "Codex" %}}

```shell
lapdog codex
```
Inicie el agente local, luego lance Codex con un proxy compatible con OpenAI y un observador JSONL que capture cada LLM request, llamada a herramienta y paso en una sesión.
{{% /tab %}}
{{% tab "Pi" %}}

```shell
lapdog pi
```
Inicie el agente local, instale la extensión Lapdog Pi y lance Pi con `LAPDOG_URL` configurado.
{{% /tab %}}
{{% tab "Otro" %}}

```shell
lapdog python my_app.py
```
Ejecute cualquier comando con `ddtrace` auto-instrumentación apuntando al agente local. Útil para instrumentar su propia aplicación impulsada por LLM durante el desarrollo.
{{% /tab %}}
{{< /tabs >}}

**Nota**: `lapdog claude` y `lapdog codex` están respaldados por proxy: el agente local de Lapdog se encuentra en la ruta de solicitud del modelo en vivo. Mantenga Lapdog en funcionamiento hasta que el agente de codificación salga. Si detiene o finaliza Lapdog a mitad de sesión, el agente de codificación lanzado puede dejar de avanzar en las llamadas al modelo. Reinicie el agente de codificación después de reiniciar Lapdog. `lapdog pi` y las configuraciones de hook-only fallan en modo abierto si Lapdog se detiene: el agente de codificación continúa ejecutándose, pero se pierden los datos capturados.

## Ver sesiones {#view-sessions}

Mientras una sesión está en ejecución, abra [lapdog.datadoghq.com](https://lapdog.datadoghq.com). El dashboard lee directamente de su agente local en `localhost:8126`; no se requiere iniciar sesión ni tener una cuenta de Datadog.

Si ha cambiado el puerto local, sustitúyalo desde la {{< ui >}}Collecting sessions{{< /ui >}} insignia en el encabezado del dashboard.

## Reenviar eventos a Datadog {#forward-events-to-datadog}

Para enviar eventos capturados a Agent Observability en Datadog de forma dual, configure su clave de API y pase `--forward`:

```shell
DD_API_KEY=<YOUR_API_KEY> lapdog --forward claude
```

Los tramos reenviados están etiquetados `source:lapdog` para que pueda distinguir las sesiones de desarrollo del tráfico de producción.

## Comandos útiles {#useful-commands}

| Comando | Qué hace |
| --- | --- |
| `lapdog claude` | Lance Claude Code con la captura conectada |.
| `lapdog codex` | Lance Codex con el proxy de OpenAI y el observador JSONL conectados |.
| `lapdog pi` | Lance Pi con la extensión Lapdog instalada |.
| `lapdog python app.py` | Ejecute cualquier aplicación con instrumentación de trazado |.
| `lapdog start` | Inicie el agente local en segundo plano |.
| `lapdog stop` | Detenga el agente en segundo plano |.
| `lapdog status` | Muestre si el agente está en ejecución |.

Para la lista completa de opciones, ejecute `lapdog --help`.

## Desinstalar {#uninstall}

Siga estos pasos para eliminar Lapdog y el estado que escribe en su directorio de inicio. Su gestor de paquetes (Homebrew, pip o pipx) solo limpia lo que instaló; no afecta `~/.lapdog/`, el complemento Claude Code, ni la extensión Pi.

1. Detenga el agente local:

   ```shell
   lapdog stop
   ```

2. Elimine el complemento Claude Code (si está instalado):

   ```shell
   claude plugin uninstall lapdog@lapdog
   claude plugin marketplace remove lapdog
   ```

3. Elimine la extensión Pi (solo si ejecutó `lapdog pi`):

   ```shell
   rm -f ~/.pi/agent/extensions/lapdog.ts
   ```

4. Elimine el directorio de trabajo de Lapdog:

   ```shell
   rm -rf ~/.lapdog
   ```

5. Desinstale el paquete:

   {{< tabs >}}
   {{% tab "Homebrew (macOS)" %}}
   ```shell
   brew uninstall lapdog
   brew untap datadog/lapdog
   ```
   {{% /tab %}}
   {{% tab "pip / pipx" %}}
   ```shell
   pipx uninstall ddapm-test-agent
   # or: pip uninstall ddapm-test-agent
   ```
   {{% /tab %}}
   {{< /tabs >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-apm-test-agent/blob/master/lapdog/README.md