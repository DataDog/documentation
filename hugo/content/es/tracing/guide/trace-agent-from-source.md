---
aliases:
- /es/tracing/faq/trace-agent-from-source/
title: Instalación del Trace Agent desde la fuente
---

## Instalar desde la fuente

1. Instala `Go 1.11+`. Para más información, consulta los pasos en el [sitio web oficial de Go][1].
2. Clona el [repositorio del Datadog Agent][2].
3. Ejecuta este comando en la raíz del repositorio `datadog-agent`:
    ```bash
    go install ./cmd/trace-agent
    ```

4. Ejecuta el Agent utilizando `trace-agent` (suponiendo que la ruta `$GOPATH/bin` se encuentra en la `$PATH` de tu sistema).

### Solucionar problemas

Comprueba la salida del Agent o los logs (`/var/log/datadog/trace-agent.log` en Linux) para asegurarte de que las trazas (traces) parecen correctas
y que están llegando a la API de Datadog.

[1]: https://golang.org/dl
[2]: https://github.com/DataDog/datadog-agent