If you don't see any data in DJM after installing the product, follow those steps.

The init script installs the Datadog Agent. To make sure it is properly installed, ssh into the cluster and run the Agent status command:
  ```shell
  sudo datadog-agent status
  ```
If the Agent is not installed, view the installation logs located in `/tmp/datadog-djm-init.log`.

If you need further assistance from Datadog support, add the following environment variable to the init script. This ensures that logs are sent to Datadog when a failure occurs.
  ```shell
  export DD_DJM_ADD_LOGS_TO_FAILURE_REPORT=true
  ```
