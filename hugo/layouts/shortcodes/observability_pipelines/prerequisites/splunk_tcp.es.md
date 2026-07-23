Para utilizar la fuente Splunk TCP de Observability Pipelines, debes tener una instancia Splunk Enterprise o Cloud junto con un forwarder Splunk universal o un forwarder Splunk intensivo que dirija los datos a tu instancia Splunk. También dispones de la siguiente información:
- La dirección de enlace en la que escuchará tu worker de Observability Pipelines para recibir logs de tus aplicaciones. Por ejemplo, `0.0.0.0:8088`. A continuación, [configura tus aplicaciones](#connect-splunk-forwarder-to-the-observability-pipelines-worker) para enviar logs a esta dirección.
- Los [certificados TLS][101] apropiados y la contraseña que utilizaste para crear tu clave privada si tus forwarders están configurados globalmente para activar SSL.

Para obtener más información sobre los forwarders Splunk, consulta [Desplegar un forwarder universal][102] o [Desplegar un forwarder intensivo][103].

[101]: https://docs.splunk.com/Documentation/Splunk/9.2.0/Security/StepstosecuringSplunkwithTLS#2._Obtain_the_certificates_that_you_need_to_secure_your_Splunk_platform_deployment
[102]: https://docs.splunk.com/Documentation/Forwarder/9.2.0/Forwarder/Installtheuniversalforwardersoftware
[103]: https://docs.splunk.com/Documentation/Splunk/9.2.1/Forwarding/Deployaheavyforwarder
