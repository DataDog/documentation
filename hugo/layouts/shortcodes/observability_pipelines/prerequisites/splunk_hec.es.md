Para utilizar la fuente del recopilador de eventos HTTP (HEC) Splunk de Observability Pipelines, debes tener aplicaciones que envíen datos a Splunk en el [formato HEC esperado][3001].

Para utilizar el destino HEC Splunk de Observability Pipelines, debes tener una instancia Splunk Enterprise o Cloud configurada con una entrada para el recopilador de eventos HTTP (HEC). También dispones de la siguiente información:

- El token de Splunk HEC.
- La dirección de enlace en la que escuchará tu worker de Observability Pipelines para recibir logs de tus aplicaciones. Por ejemplo, `0.0.0.0:8080`. A continuación, [configura tus aplicaciones](#send-logs-to-the-observability-pipelines-worker-over-splunk-hec) para enviar logs a esta dirección.
- La URL de base de la instancia Splunk a la que el worker enviará los logs procesados. Esta URL debe incluir el puerto que está configurado globalmente para recopiladores de eventos HTTP Splunk en tu instancia Splunk. Por ejemplo, para Splunk Cloud: `https://prd-p-0mupp.splunkcloud.com:8088`.
- Si tus HEC están configurados globalmente para habilitar SSL, también necesitarás los [certificados TLS][3002] y la contraseña adecuados que utilizaste para crear tu archivo de clave privada.

Para obtener más información sobre la configuración de Splunk HEC, consulta [Configurar el recopilador de eventos HTTP en Splunk Web][3003].

**Nota**: Observability Pipelines no es compatible con HEC Indexer Acknowledgement.

[3001]: https://docs.splunk.com/Documentation/SplunkCloud/latest/Data/UsetheHTTPEventCollector#Send_data_to_HTTP_Event_Collector
[3002]: https://docs.splunk.com/Documentation/Splunk/9.2.0/Security/StepstosecuringSplunkwithTLS#2._Obtain_the_certificates_that_you_need_to_secure_your_Splunk_platform_deployment
[3003]: https://docs.splunk.com/Documentation/SplunkCloud/latest/Data/UsetheHTTPEventCollector