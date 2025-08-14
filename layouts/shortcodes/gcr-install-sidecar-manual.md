After deploying your Cloud Run app, you can manually modify your app's settings in the GCR UI to enable Datadog monitoring.

#### Sidecar container

1. In Cloud Run, select **Edit & Deploy New Revision**.
2. At the bottom of the page, select **Add Container**.
3. For **Container image URL**, select `gcr.io/datadoghq/serverless-init:latest`.
4. Go to **Volume Mounts** and set up a volume mount for logs. Ensure that the mount path matches your application's write location. For example: <br/><br/><img src="{{ "/images/serverless/gcr/volume_mount.png" | relURL }}" alt="Volume Mounts tab. Under Mounted volumes, Volume Mount 1. For Name 1, 'shared-logs (In-Memory)' is selected. For Mount path 1, '/shared-volume' is selected." style="width:80%;">

5. Go to **Settings** and add a startup check.
   <ul>
     <li><strong>Select health check type</strong>: Startup check</li>
     <li><strong>Select probe type</strong>: TCP</li>
     <li><strong>Port</strong>: Enter a port number. Make note of this, as it is used in the next step.</li>
   </ul>

6. Go to **Variables & Secrets** and add the following environment variables as name-value pairs:
   <ul>
     <li><code>DD_SERVICE</code>: A name for your service. For example, <code>gcr-sidecar-test</code>.</li>
     <li><code>DD_ENV</code>: A name for your environment. For example, <code>dev</code>.</li>
     <li><code>DD_SERVERLESS_LOG_PATH</code>: Your log path. For example, <code>/shared-volume/logs/*.log</code>.</li>
     <li><code>DD_API_KEY</code>: Your [Datadog API key][1].</li>
     <li><code>DD_HEALTH_PORT</code>: The port you selected for the startup check in the previous step.</li>
   </ul>

   For a list of all environment variables, including additional tags, see [Environment variables](#environment-variables).

#### Main container

1. Go to **Volume Mounts** and add the same shared volume as you did for the sidecar container.
   **Note**: Save your changes by selecting **Done**. Do not deploy changes until the final step.
1. Go to **Variables & Secrets** and add the same `DD_SERVICE` environment variable that you set for the sidecar container.
1. Go to **Settings**. In the **Container start up order** drop-down menu, select your sidecar.
1. Deploy your main application.

#### Add a service label in Google Cloud

In your Cloud Run service's info panel, add a label with the following key and value:

| Key      | Value                                                       |
|-----------|-------------------------------------------------------------|
| `service` | The name of your service. Matches the value provided as the `DD_SERVICE` environment variable. |

See [Configure labels for services][2] in the Cloud Run documentation for instructions.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://cloud.google.com/run/docs/configuring/services/labels
