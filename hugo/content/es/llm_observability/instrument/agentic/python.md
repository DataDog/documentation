---
aliases:
- /es/llm_observability/instrumentation/agentic/python/
title: Instrumentación agéntica de aplicaciones Python
---
## Instrumentación {#instrumentation}

1. Inspeccione la versión instalada de `ddtrace` y reutilícela si es compatible con las API de instrumentación requeridas. Si se requiere una actualización, explique por qué y pregunte antes de cambiar la dependencia existente. Una actualización requerida solo para la gestión opcional de prompts es una decisión independiente y no bloquea la instrumentación con un SDK compatible.

    Si `ddtrace` no está instalado, instálelo con el administrador de paquetes existente de la aplicación:

    ```bash
    pip install ddtrace # pip
    poetry add ddtrace # poetry
    uv add ddtrace # uv
    ```

2. Inicialice el paquete Agent Observability

    Inicialice el SDK Agent Observability a través de `ddtrace.auto`. Esto **debe** hacerse como la primera importación en el punto de entrada de la aplicación, aparte de cualquier importación de variables de entorno o de carga de configuración.

    **Nota**: No añada comentarios superfluos.

    ```python
    from dotenv import load_dotenv
    load_dotenv() # this might load DD_ environment variables

    import ddtrace.auto # CRUCIAL: this initializes the Agent Observability SDK and instrumentations

    # ... remaining application logic
    ```