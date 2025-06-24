---
title: Enabling AAP for Azure App Services
aliases:
  - /security/application_security/getting_started/serverless
  - /security/application_security/enabling/serverless
further_reading:
    - link: "/security/application_security/how-it-works/"
      tag: "Documentation"
      text: "How App and API Protection Works"
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App and API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
    - link: "/security/application_security/threats/"
      tag: "Documentation"
      text: "App and API Protection"
    - link: "https://www.datadoghq.com/blog/datadog-security-google-cloud/"
      tag: "Blog"
      text: "Datadog Security extends compliance and threat protection capabilities for Google Cloud"
---

## Compatibility

Only *web applications* are supported. Azure Functions are not supported.

**Note**: Threat Protection through Remote Configuration is not supported. Use [Workflows][5] to block IPs in your [WAF][6].

|Type       | OS			         | Threat Detection	|
|-----------|------------------|------------------|
| Java  	  | Windows, Linux	 | {{< X >}}    	  |
| .NET    	| Windows, Linux	 | {{< X >}}        |
| Node 		  | Linux			       | {{< X >}}        |
| Python   	| Linux			       | {{< X >}}        |
| Ruby   	  | Linux			       | {{< X >}}        |
| PHP   	  | Linux			       |		        	    |

## Setup
### Set application settings
To enable AAP on your application, begin by adding the following key-value pairs under **Application Settings** in your Azure configuration settings.

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Azure App Service Configuration: the Application Settings, under the Configuration section of Settings in the Azure UI. Three settings are listed: DD_API_KEY, DD_SERVICE, and DD_START_APP." style="width:80%;" >}}

- `DD_API_KEY` is your Datadog API key.
- `DD_CUSTOM_METRICS_ENABLED` (optional) enables [custom metrics](#custom-metrics).
- `DD_SITE` is the Datadog site [parameter][2]. Your site is {{< region-param key="dd_site" code="true" >}}. This value defaults to `datadoghq.com`.
- `DD_SERVICE` is the service name used for this program. Defaults to the name field value in `package.json`.
- `DD_START_APP` is the command used to start your application. For example, `node ./bin/www` (unnecessary for applications running in Tomcat).
- `DD_APPSEC_ENABLED` value should be 1 in order to enable App and API Protection

### Identifying your startup command

Linux Azure App Service Web Apps built using the code deployment option on built-in runtimes depend on a startup command that varies by language. The default values are outlined in [Azure's documentation][7]. Examples are included below.

Set these values in the `DD_START_APP` environment variable. Examples below are for an application named `datadog-demo`, where relevant.

| Runtime   | `DD_START_APP` Example Value                                                               | Description                                                                                                                                                                                                                        |
|-----------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Node.js   | `node ./bin/www`                                                                           | Runs the [Node PM2 configuration file][12], or your script file.                                                                                                                                                                   |
| .NET Core | `dotnet datadog-demo.dll`                                                                  | Runs a `.dll` file that uses your Web App name by default. <br /><br /> **Note**: The `.dll` file name in the command should match the file name of your `.dll` file. In certain cases, this might not match your Web App.         |
| PHP       | `cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload` | Copies script to correct location and starts application.                                                                                                                                                                           |
| Python    | `gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi`                             | Custom [startup script][13]. This example shows a Gunicorn command for starting a Django app.                                                                                                                                      |
| Java      | `java -jar /home/site/wwwroot/datadog-demo.jar`                                            | The command to start your app. This is not required for applications running in Tomcat.                                                                                                                                                                                                  |

[7]: https://learn.microsoft.com/en-us/troubleshoot/azure/app-service/faqs-app-service-linux#what-are-the-expected-values-for-the-startup-file-section-when-i-configure-the-runtime-stack-
[12]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#configure-nodejs-server
[13]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-php?pivots=platform-linux#customize-start-up


**Note**: The application restarts when new settings are saved.

### Set General Settings

{{< tabs >}}
{{% tab "Node, .NET, PHP, Python" %}}
Go to **General settings** and add the following to the **Startup Command** field:

```
curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-linux/v1.4.0/datadog_wrapper | bash
```

{{< img src="serverless/azure_app_service/startup-command-1.jpeg" alt="Azure App Service Configuration: the Stack settings, under the Configuration section of Settings in the Azure UI. Underneath the stack, major version, and minor version fields is a 'Startup Command' field that is populated by the above curl command." style="width:100%;" >}}
{{% /tab %}}
{{% tab "Java" %}}
Download the [`datadog_wrapper`][8] file from the releases and upload it to your application with the Azure CLI command:

```
  az webapp deploy --resource-group <group-name> --name <app-name> --src-path <path-to-datadog-wrapper> --type=startup
```

[8]: https://github.com/DataDog/datadog-aas-linux/releases
{{% /tab %}}
{{< /tabs >}}


## Testing threat detection

To see App and API Protection threat detection in action, send known attack patterns to your application. For example, send a request with the user agent header set to `dd-test-scanner-log` to trigger a [security scanner attack][5] attempt:
   ```sh
   curl -A 'dd-test-scanner-log' https://your-function-url/existing-route
   ```
A few minutes after you enable your application and exercise it, **threat information appears in the [Application Signals Explorer][3]**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: /serverless/distributed_tracing/
[3]: https://app.datadoghq.com/security/appsec
[4]: /security/application_security/serverless/compatibility
[5]: /security/default_rules/security-scan-detected/
[6]: /serverless/libraries_integrations/plugin/
[apm-lambda-tracing-setup]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/
