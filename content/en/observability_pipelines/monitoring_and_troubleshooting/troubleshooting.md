---
title: Troubleshooting
disable_toc: false
---

## Overview

If you experience unexpected behavior with Datadog Observability Pipelines (OP), there are a few common issues you can investigate, and this guide may help resolve issues quickly. If you continue to have trouble, reach out to [Datadog support][1] for further assistance.

## View Observability Pipelines Worker stats and logs

To view information about the Observability Pipelines Workers running for an active pipeline:

1. Navigate to [Observability Pipelines][2].
1. Select your pipeline.
1. Click the **Workers** tab to see the Workers' memory and CPU utilization, traffic stats, and any errors.
1. To view the Workers' statuses and versions, click the **Latest Deployment & Setup** tab.
1. To see the Workers' logs, click the cog at the top right side of the page, then select **View OPW Logs**. See [Logs Search Syntax][3] for details on how to filter your logs. To see logs for a specific Worker, add `@op_worker.id:<worker_id>` to the search query.<br>**Note**: If you are not seeing Observability Pipelines Worker logs, make sure you are [indexing Worker logs][10] to Log Management.

## Inspect events sent through your pipeline to identify setup issues

If you can access your Observability Pipelines Workers locally, use the `tap` command to see the raw data sent through your pipeline's source and processors.

### Enable the Observability Pipelines Worker API

 The Observability Pipelines Worker API allows you to interact with the Worker's processes with the `tap` and `top` command. If you are using the Helm charts provided when you [set up a pipeline][4], then the API has already been enabled. Otherwise, make sure the environment variable `DD_OP_API_ENABLED` is set to `true` in `/etc/observability-pipelines-worker/bootstrap.yaml`. See [Bootstrap options][5] for more information. This sets up the API to listen on `localhost` and port `8686`, which is what the CLI for `tap` is expecting.

 **Note**: See [Enable liveness and readiness probe][15] for instructions on how to expose the `/health` endpoint. After the endpoint is exposed, configure load balancers to use the `/health` API endpoint to check that the Worker is up and running.

### Use `top` to find the component ID

You need the source's or processor's component ID to `tap` into it. Use the `top` command to find the ID of the component you want to `tap` into:

```
observability-pipelines-worker top
```

See [Worker Commands][13] for a list of commands and options.

### Use `tap` to see your data

If you are on the same host as the Worker, run the following command to `tap` the output of the component:

```
observability-pipelines-worker tap <component_ID>
```

If you are using a containerized environment, use the `docker exec` or `kubectl exec` command to get a shell into the container to run the above `tap` command.

See [Worker Commands][13] for a list of commands and options.

## Enable debug logs

To see debug logs, restart the Worker with the `VECTOR_LOG` environment variable set to `debug`. For example, if you are running the Worker in Docker, add `-e VECTOR_LOG=debug` to the `docker run` command:

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=debug \
   datadog/observability-pipelines-worker run
```

## Seeing delayed logs at the destination

Observability Pipelines destinations batch events before sending them to the downstream integration. For example, the Amazon S3, Google Cloud Storage, and Azure Storage destinations have a batch timeout of 900 seconds. If the other batch parameters (maximum events and maximum bytes) have not been met within the 900-second timeout, the batch is flushed at 900 seconds. This means the destination component can take up to 15 minutes to send out a batch of events to the downstream integration.

These are the batch parameters for each destination:

{{% observability_pipelines/destination_batching %}}

See [event batching][6] for more information.

## Duplicate Observability Pipelines logs

If you see duplicate Observability Pipelines logs in [Log Explorer][7] and your Agent is running in a Docker container, you must exclude Observability Pipelines logs using the `DD_CONTAINER_EXCLUDE_LOGS` environment variable. For Helm, use `datadog.containerExcludeLogs`. This prevents duplicate logs, as the Worker also sends its own logs directly to Datadog. See [Docker Log Collection][8] or [Setting environment variables for Helm][9] for more information.

## Getting an error when installing a new version of the Worker

If you try to install a new version of the Worker in an instance that is running an older version of the Worker, you get an error. You need to [uninstall][11] the older version before you can install the new version of the Worker.

## No Worker logs in Log Explorer

If you do not see Worker logs in [Log Explorer][12], make sure they are not getting excluded in your log pipelines. Worker logs must be indexed in Log Management for optimal functionality. The logs provide deployment information, such as Worker status, version, and any errors, that is shown in the Observability Pipelines UI. The logs are also helpful for troubleshooting Worker or pipelines issues. All Worker logs have the tag `source:op_worker`.

## Too many files error

If you see the error `Too many files` and the Worker processes repeatedly restart, it could be due to a low file descriptor limit on the host. To resolve this issue for Linux environments, set `LimitNOFILE` in the systemd service configuration to `65,536` to increase the file descriptor limit.

## The Worker is not receiving logs from the source

If you have configured your source to send logs to the Worker, make sure the port that the Worker is listening on is the same port to which the source is sending logs.

If you are using RHEL and need to forward logs from one port (for example UDP/514) to the port the Worker is listening on (for example, UDP/1514, which is an unprivileged port), you can use [`firewalld`][14] to forward logs from port 514 to port 1514.

## Logs are not getting forwarded to the destination

Run the command `netstat -anp | find "<port_number>"` to check that the port that the destination is listening on is not being used by another service.

## Failed to connect error

If you see an error similar to one of these errors:

```
Failed to connect to 34.44.228.240 port 80 after 56 ms: Couldn't connect to server
```

```
connect to 35.82.252.23 port 80  failed: Operation timed out
```

```
Failed to connect to ab52a1d16fxxxxxxxabd90c7526a1-1xxxx.us-west-2.elb.amazonaws.com port 80 after 225027 ms: Couldn't connect to server
```

And you:

- Have a firewall between your source and your Workers, ensure traffic is allowed over your chosen port between the source and the Worker.
- Have a firewall between the Workers and your destination, make sure it allows traffic from your Workers to the destination over the defined port.

You can test your connectivity to your Observability Pipelines Worker endpoint using the `curl` command from your source location, provided that you have shell access to the source machine. For example, if you have a Datadog Agent source, the curl command looks something like this:

```
curl --location 'http://ab52a1d102c6f4a3c823axxx-xxxxx.us-west-2.elb.amazonaws.com:80/api/v2/logs' -d '{"ddsource": "my_datadog","ddtags": "env:test","hostname": "i-02a4fxxxxx","message": "hello","service": "test"}' -v
```

The curl command you use is based on the port you are using, as well as the path and expected payload from your source.

## Worker is not starting

If the Worker is not starting, Worker logs are not sent to Datadog and are not visible in Log Explorer for troubleshooting. To view the logs locally, use the following command:

- For a VM-based environment:
    ```
    sudo journalctl -u observability-pipelines-worker.service -b
    ```

- For Kubernetes:
    ```
    kubectl logs <pod-name>
    ```
    An example of `<pod-name>` is `opw-observability-pipelines-worker-0`.

## Certificate verify failed

If you see an error with `certificate verify failed` and `self-signed certificate in certificate chain`, see [TLS certificates][16]. Observability Pipelines does not accept self-signed certificates because they are not secure.

## Ensure your organization is enabled for RC

If you see the error `Please ensure you organization is enabled for RC`, ensure your Worker API key has [Remote Configuration enabled][17]. See [Security considerations][19] for information on safeguards implemented for Remote Configuration.

## Missing environment variable

If you see the error `Configuration is invalid. Missing environment variable $<env_var>`, make sure you add the environment variables for your source, processors, and destinations when you install the Worker. See [Environment Variables][18] for a list of source, processor, and destination environment variables.

## Failed to sync quota state

The quota processor is synchronized across all Workers in a Datadog organization. For the synchronization, there is a default rate limit of 50 Workers per organization. When there are more than 50 Workers for an organization:
- The processor continues to run, but does not sync correctly with the other Workers, which can result in logs being sent after the quota limit has been reached.
- The Worker prints `Failed to sync quota state errors`.
- [Contact support][20] if you want to increase the default number of Workers per organization.

[1]: /help/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /logs/explorer/search_syntax/
[4]: /observability_pipelines/configuration/set_up_pipelines/#set-up-a-pipeline
[5]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#bootstrap-options
[6]: /observability_pipelines/destinations/#event-batching-intro
[7]: https://app.datadoghq.com/logs/
[8]: /containers/docker/log/?tab=containerinstallation#linux
[9]: /containers/guide/container-discovery-management/?tab=helm#setting-environment-variables
[10]: /observability_pipelines/configuration/install_the_worker/#index-your-worker-logs
[11]: /observability_pipelines/install_the_worker#uninstall-the-worker
[12]: https://app.datadoghq.com/logs
[13]: /observability_pipelines/configuration/install_the_worker/worker_commands/
[14]: https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/security_guide/sec-port_forwarding#sec-Adding_a_Port_to_Redirect
[15]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/#enable-liveness-and-readiness-probe
[16]: /observability_pipelines/sources/#tls-certificates
[17]: https://app.datadoghq.com/organization-settings/remote-config/setup
[18]: /observability_pipelines/guide/environment_variables/
[19]: /remote_configuration/#security-considerations
[20]: /help/
