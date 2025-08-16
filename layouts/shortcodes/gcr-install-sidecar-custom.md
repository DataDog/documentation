After deploying your Cloud Run app, you can manually modify your app's settings to enable Datadog monitoring.

1. Create a **Volume** with `In-Memory` volume type.
2. Add a **new container** with image URL: `gcr.io/datadoghq/serverless-init:latest`.
3. Add the volume mount to every container in your application. Choose a path such as `/shared-volume`, and remember it for the next step. For example: <br/><br/><img src="{{ "/images/serverless/gcr/volume_mount.png" | relURL }}" alt="Volume Mounts tab. Under Mounted volumes, Volume Mount 1. For Name 1, 'shared-logs (In-Memory)' is selected. For Mount path 1, '/shared-volume' is selected." style="width:80%;">
4. Add the following environment variables to your serverless-init sidecar container:
   <ul>
     <li><code>DD_SERVICE</code>: A name for your service. For example, <code>gcr-sidecar-test</code>.</li>
     <li><code>DD_ENV</code>: A name for your environment. For example, <code>dev</code>.</li>
     <li><code>DD_SERVERLESS_LOG_PATH</code>: Your log path. For example, <code>/shared-volume/logs/*.log</code>. The path must begin with the mount path you defined in the previous step.</li>
     <li><code>DD_API_KEY</code>: Your <a href="https://app.datadoghq.com/organization-settings/api-keys">Datadog API key</a>.</li>
   </ul>


   For a list of all environment variables, including additional tags, see [Environment variables](#environment-variables).

#### Add a service label in Google Cloud

In your Cloud Run service's info panel, add a label with the following key and value:

| Key      | Value                                                       |
|-----------|-------------------------------------------------------------|
| `service` | The name of your service. Matches the value provided as the `DD_SERVICE` environment variable. |

See [Configure labels for services][1002] in the Cloud Run documentation for instructions.

[1001]: https://app.datadoghq.com/organization-settings/api-keys
[1002]: https://cloud.google.com/run/docs/configuring/services/labels
