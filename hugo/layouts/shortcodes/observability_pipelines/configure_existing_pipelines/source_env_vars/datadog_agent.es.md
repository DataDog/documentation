- Dirección del Datadog Agent:
    - El worker de Observability Pipelines escucha esta dirección de socket para recibir datos desde el Datadog Agent.
    - Almacenado en la variable de entorno `DD_OP_SOURCE_DATADOG_AGENT_ADDRESS`.
- Contraseña TLS del Datadog Agent (si está activada):
    - Almacenado en la variable de entorno `DD_OP_SOURCE_DATADOG_AGENT_KEY_PASS`.


