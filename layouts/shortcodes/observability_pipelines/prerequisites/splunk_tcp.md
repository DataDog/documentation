To use Observability Pipelines's Splunk TCP source, you have a Splunk Enterprise or Cloud Instance alongside either a Splunk Universal Forwarder or a Splunk Heavy Forwarder routing data to your Splunk instance. You also have the following information available:
- The bind address that your Observability Pipelines Worker will listen on to receive logs from your applications. For example, `0.0.0.0:8088`. Later on, you [configure your applications](#connect-splunk-forwarder-to-the-observability-pipelines-worker) to send logs to this address.
- The appropriate [TLS certificates][101] and the password you used to create your private key if your forwarders are globally configured to enable SSL.

See [Deploy a Universal Forwarder][102] or [Deploy a Heavy Forwarder][103] for more information on Splunk forwarders.

[101]: https://docs.splunk.com/Documentation/Splunk/9.2.0/Security/StepstosecuringSplunkwithTLS#2._Obtain_the_certificates_that_you_need_to_secure_your_Splunk_platform_deployment
[102]: https://docs.splunk.com/Documentation/Forwarder/9.2.0/Forwarder/Installtheuniversalforwardersoftware
[103]: https://docs.splunk.com/Documentation/Splunk/9.2.1/Forwarding/Deployaheavyforwarder
