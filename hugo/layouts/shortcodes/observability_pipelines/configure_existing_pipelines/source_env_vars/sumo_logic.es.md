- Dirección de Sumo Logic:
    - La dirección bind en la que escucha tu Worker de Observability Pipelines para recibir logs originalmente destinados a la fuente HTTP de Sumo Logic. Por ejemplo, `0.0.0.0:80`.
    **Nota**: La ruta `/receiver/v1/http/` se añade automáticamente al endpoint.
    - Almacenado en la variable de entorno `DD_OP_SOURCE_SUMO_LOGIC_ADDRESS`.