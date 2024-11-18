Data Jobs Monitoring requires to have the Datadog Agent running in the background. You can check that it is correctly installed and running on your cluster with this command:
  ```shell
  sudo datadog-agent status
  ```
If it is not the case, you may want to check the log file of the installation. On your cluster, these logs are located in `/tmp/datadog-djm-init.log`.

For further support, make sure the init script contains the following line so that the install logs are sent to the Datadog support team.
  ```shell
  export DD_DJM_ADD_LOGS_TO_FAILURE_REPORT=true
  ```
