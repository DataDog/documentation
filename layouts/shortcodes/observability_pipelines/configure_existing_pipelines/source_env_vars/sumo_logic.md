- Sumo Logic address:
    - The bind address that your Observability Pipelines Worker listens on to receive logs originally intended for the Sumo Logic HTTP Source. For example, `0.0.0.0:80`.   
    **Note**: `/receiver/v1/http/` path is automatically appended to the endpoint.
    - Stored in the environment variable  `DD_OP_SOURCE_SUMO_LOGIC_ADDRESS`.