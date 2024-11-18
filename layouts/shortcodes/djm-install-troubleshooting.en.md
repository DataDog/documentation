The init script installs the Datadog Agent. To make sure it is properly installed, run the Agent status command:
  ```shell
  sudo datadog-agent status
  ```
If it is not the case, installation logs are located in `/tmp/datadog-djm-init.log`.

Adding this environment variable to the init script will send those logs to Datadog in case of failure, so that Datadog support can provide further assistance.
  ```shell
  export DD_DJM_ADD_LOGS_TO_FAILURE_REPORT=true
  ```
