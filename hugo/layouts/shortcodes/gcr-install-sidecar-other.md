After deploying your Cloud Run app, you can manually modify your app's settings to enable Datadog monitoring.

1. Create a **Volume** with `In-Memory` volume type.
2. Add a **new container** with image URL: `gcr.io/datadoghq/serverless-init:<YOUR_TAG>`. See the [latest releases on Docker Hub][1001] to pin a specific version.
3. Add the volume mount to every container in your application. Choose a path such as `/shared-volume`, and remember it for the next step.
4. Add the following environment variables to your `serverless-init` sidecar container:
   <ul>
     <li><code>DD_SERVICE</code>: A name for your service. For example, <code>gcr-sidecar-test</code>.</li>
     <li><code>DD_ENV</code>: A name for your environment. For example, <code>dev</code>.</li>
     <li><code>DD_SERVERLESS_LOG_PATH</code>: Your log path. For example, <code>/shared-volume/logs/*.log</code>. The path must begin with the mount path you defined in the previous step.</li>
     <li><code>DD_API_KEY</code>: Your <a href="https://app.datadoghq.com/organization-settings/api-keys">Datadog API key</a>.</li>{{ if eq (.Get "function") "true" }}
     <li><code>FUNCTION_TARGET</code>: The entry point of your function. For example, <code>Main</code>.</li>{{ end }}
   </ul>

   For a list of all environment variables, including additional tags, see [Environment variables](#environment-variables).

[1001]: https://hub.docker.com/r/datadog/serverless-init
