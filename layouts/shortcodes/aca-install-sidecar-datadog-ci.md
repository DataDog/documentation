#### Locally

Install the Datadog CLI

```shell
npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-container-app
```

Install the [Azure CLI][1001] and authenticate with `az login`.

To set up the Datadog sidecar for your applications, configure the [Datadog site][1002] and Datadog API key, and run the `instrument` command *after* your normal deployment:

```shell
export DD_SITE="<DATADOG_SITE>"
export DD_API_KEY="<DATADOG_API_KEY>"
datadog-ci container-app instrument -s <AZURE-SUBSCRIPTION-ID> -g <AZURE-RESOURCE-GROUP-NAME> -n <CONTAINER-APP-NAME>
```

You can also instrument multiple applications using the full resource IDs:

```shell
datadog-ci container-app instrument \
  --resource-id "/subscriptions/<subscription-id>/resourceGroups/<resource-group-name-1>/providers/Microsoft.App/containerApps/<container-app-name-1>" \
  --resource-id "/subscriptions/<subscription-id>/resourceGroups/<resource-group-name-2>/providers/Microsoft.App/containerApps/<container-app-name-2>"
```

##### Azure Cloud Shell

To use the Datadog CLI in [Azure Cloud Shell][1005], open a cloud shell, set your API key and site in the `DD_API_KEY` and `DD_SITE` environment variables, and use `npx` to run the CLI directly.

```shell
export DD_API_KEY=<DATADOG_API_KEY>
export DD_SITE=<DATADOG_SITE>
npx @datadog/datadog-ci container-app instrument -s <AZURE-SUBSCRIPTION-ID> -g <AZURE-RESOURCE-GROUP-NAME> -n <CONTAINER-APP-NAME>
```

Additional parameters can be found in the [CLI documentation][1004].

[1001]: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli
[1002]: /getting_started/site/
[1004]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-container-app#arguments
[1005]: https://portal.azure.com/#cloudshell/
