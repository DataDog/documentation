- Sumo Logic address:
    - The bind address that your Observability Pipelines Worker listens on to receive logs originally intended for the Sumo Logic HTTP Source. For example, `0.0.0.0:80`.   
    **Note**: `/receiver/v1/http/` path is automatically appended to the endpoint.
    - 環境変数 `DD_OP_SOURCE_SUMO_LOGIC_ADDRESS` に格納されています。