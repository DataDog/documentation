To use Observability Pipelines's Splunk HTTP Event Collector (HEC) source, you have applications sending data to Splunk in the [expected HEC format][3001].

To use Observability Pipelines's Splunk HEC destination, you have a Splunk Enterprise or Cloud instance configured with an HTTP Event Collector (HEC) input. You also have the following information available:

- The Splunk HEC token.
- The bind address that your Observability Pipelines Worker will listen on to receive logs from your applications. For example, `0.0.0.0:8080`.
- The base URL of the Splunk instance that the Worker will send processed logs to. This URL should include the port that is globally configured for Splunk HTTP Event Collectors on your Splunk instance. For example, for Splunk Cloud: `https://prd-p-0mupp.splunkcloud.com:8088`.
- If your HECs are globally configured to enable SSL, then you also need the appropriate [TLS certificates][3002] and password you used to create your private key file.

See [Configure HTTP Event Collector on Splunk Web][3003] for more information about setting up Splunk HEC.

**Note**: Observability Pipelines does not support HEC Indexer Acknowledgement.

[3001]: https://docs.splunk.com/Documentation/SplunkCloud/latest/Data/UsetheHTTPEventCollector#Send_data_to_HTTP_Event_Collector
[3002]: https://docs.splunk.com/Documentation/Splunk/9.2.0/Security/StepstosecuringSplunkwithTLS#2._Obtain_the_certificates_that_you_need_to_secure_your_Splunk_platform_deployment
[3003]: https://docs.splunk.com/Documentation/SplunkCloud/latest/Data/UsetheHTTPEventCollector