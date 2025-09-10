#### Setup

Install the Datadog CLI client

```shell
npm install -g @datadog/datadog-ci
```

Install the [gcloud CLI][1001] and authenticate with `gcloud auth login`.

#### Configuration

Configure the [Datadog site][1002] and Datadog API key, and define the service name to use in Datadog.

```shell
export DATADOG_SITE="<DATADOG_SITE>"
export DD_API_KEY="<DD_API_KEY>"
export DD_SERVICE="<SERVICE_NAME>"
```
#### Instrument

If you are new to Datadog serverless monitoring, launch the Datadog CLI in interactive mode to guide your first installation for a quick start.

```shell
datadog-ci cloud-run instrument -i
```

To permanently install Datadog for your production applications, run the `instrument` command in your CI/CD pipelines *after* your normal deployment. You can specify multiple services to instrument by passing multiple `--service` flags.

```shell
datadog-ci cloud-run instrument --project <GCP-PROJECT-ID> --service <CLOUD-RUN-SERVICE-NAME> --region <GCP-REGION>
```

Additional parameters can be found in the [CLI documentation][1003].

[1001]: https://cloud.google.com/sdk/docs/install
[1002]: /getting_started/site/
[1003]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/cloud-run#readme
