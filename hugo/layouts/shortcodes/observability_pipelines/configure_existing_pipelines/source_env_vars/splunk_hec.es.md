- Dirección de Splunk HEC:
    - La dirección bind en la que tu Observability Pipelines Worker escucha para recibir logs originalmente destinados al indexador Splunk. Por ejemplo, `0.0.0.0:8088`.
    **Nota**: `/services/collector/event` se añade automáticamente al endpoint.
    - Almacenado en la variable de entorno `DD_OP_SOURCE_SPLUNK_HEC_ADDRESS`.