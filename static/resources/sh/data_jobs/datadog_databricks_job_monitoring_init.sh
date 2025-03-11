#!/bin/bash

# Required parameters
export DD_API_KEY=${DD_API_KEY}
export DD_SITE=${DD_SITE:-datadoghq.com}
export DATABRICKS_WORKSPACE=${DATABRICKS_WORKSPACE}

## Optional parameters - boolean - default: false
## Setting any of these options to "true" will enable the respective telemetry to be collected
# export DRIVER_LOGS_ENABLED=false
# export WORKER_LOGS_ENABLED=false


# Installation script
echo $(date -u) "Downloading dd-java-agent.jar..."
curl -f -L -o /databricks/driver/dd-java-agent.jar https://dtdg.co/latest-java-tracer
echo $(date -u) "Downloaded java agent in path /databricks/driver/dd-java-agent.jar"

echo $(date -u) "Configuring env variables to use the spark instrumentation"
echo "DD_INTEGRATIONS_ENABLED=false" >> /etc/environment
echo "DD_INTEGRATION_SPARK_ENABLED=true" >> /etc/environment
echo "DD_TRACE_EXPERIMENTAL_LONG_RUNNING_ENABLED=true" >> /etc/environment
echo "JAVA_TOOL_OPTIONS=-javaagent:/databricks/driver/dd-java-agent.jar" >> /etc/environment


echo $(date -u) "Generating the script /tmp/start_datadog.sh..."

cat <<EOF > /tmp/start_datadog.sh
#!/bin/bash

echo \$(date -u) "Installing Datadog Agent... Is running on the driver? $DB_IS_DRIVER"

DD_HOSTNAME=\$(hostname | xargs)
DB_CLUSTER_NAME="$(echo "$DB_CLUSTER_NAME" | sed 's/[^a-zA-Z0-9_:.-]/_/g')"

HOST_TAGS="init_script_version:1","data_workload_monitoring_trial:true"

# Tags provided to the init script
if [[ -n \${DATABRICKS_WORKSPACE} ]]; then
  HOST_TAGS=\${HOST_TAGS},"workspace:\${DATABRICKS_WORKSPACE}"
fi

# Tags from the previous datadog databricks integration
# keeping those to not break dashboards when upgrading
HOST_TAGS=\${HOST_TAGS},"databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","spark_host_ip:\${DB_DRIVER_IP}","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}"

# Unified cluster_id/cluster_name tag across technologies
HOST_TAGS=\${HOST_TAGS},"cluster_id:\${DB_CLUSTER_ID}","cluster_name:\${DB_CLUSTER_NAME}"

# Extracting the jobId and runId for job clusters
if [[ \${DB_CLUSTER_NAME} =~ ^job-([0-9]+)-run-([0-9]+) ]]; then
    JOB_ID="\${BASH_REMATCH[1]}"
    RUN_ID="\${BASH_REMATCH[2]}"
    HOST_TAGS=\${HOST_TAGS},"jobid:\${JOB_ID}","runid:\${RUN_ID}"
fi

if [[ \${DB_IS_DRIVER} = "TRUE" ]]; then
  echo \$(date -u) "Installing Datadog Agent on the driver (master node)..."

  DRIVER_TAGS="\${HOST_TAGS}","spark_node:driver"
  DD_INSTALL_ONLY=true DD_HOST_TAGS=\$DRIVER_TAGS DD_HOSTNAME=\$DD_HOSTNAME bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  echo \$(date -u) "Datadog agent installed, applying Databricks specific configuration..."

  while [ -z \$gotparams ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT=\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)
      gotparams=TRUE
    fi
    sleep 2
  done

  echo \$(date -u) "Using Databricks Driver Port \$DB_DRIVER_PORT"

  # Writing config file for spark integration with structured streaming metrics enabled
  echo "init_config:
instances:
    - spark_url: http://\${DB_DRIVER_IP}:\${DB_DRIVER_PORT}
      spark_cluster_mode: spark_driver_mode
      cluster_name: \${DB_CLUSTER_NAME}
      streaming_metrics: true
" > /etc/datadog-agent/conf.d/spark.d/spark.yaml


  DRIVER_LOGS_ENABLED=\${DRIVER_LOGS_ENABLED:-false}
  if [[ \${DRIVER_LOGS_ENABLED} = true ]]; then
    echo \$(date -u) "Enabling logs collection on the driver"
    echo "logs_enabled: true" >> /etc/datadog-agent/datadog.yaml
    echo "logs:
    - type: file
      path: /databricks/driver/logs/*.log
      service: databricks
      source: driver_logs
      auto_multi_line_detection: true

    - type: file
      path: /databricks/driver/logs/stderr
      service: databricks
      source: driver_stderr
      auto_multi_line_detection: true

    - type: file
      path: /databricks/driver/logs/stdout
      service: databricks
      source: driver_stdout
      auto_multi_line_detection: true
" > /etc/datadog-agent/conf.d/databricks_logs.yaml
  fi

else
  echo \$(date -u) "Installing Datadog Agent on the workers..."
  WORKER_TAGS="\${HOST_TAGS}","spark_node:worker"
  DD_INSTALL_ONLY=true DD_HOST_TAGS=\$WORKER_TAGS DD_HOSTNAME=\$DD_HOSTNAME bash -c "\$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  echo \$(date -u) "Datadog agent downloaded, applying Databricks specific configuration..."

  if [[ \${WORKER_LOGS_ENABLED} = true ]]; then
    echo \$(date -u) "Enabling logs collection on the worker"
    echo "logs_enabled: true" >> /etc/datadog-agent/datadog.yaml
    echo "logs:
    - type: file
      path: /databricks/spark/work/*/*/*.log
      service: databricks
      source: worker_logs
      auto_multi_line_detection: true

    - type: file
      path: /databricks/spark/work/*/*/stderr
      service: databricks
      source: worker_stderr
      auto_multi_line_detection: true

    - type: file
      path: /databricks/spark/work/*/*/stdout
      service: databricks
      source: worker_stdout
      auto_multi_line_detection: true
" > /etc/datadog-agent/conf.d/databricks_logs.yaml
  fi
fi

# Avoid conflicts on port 6062
echo "process_config.expvar_port: 6063" >> /etc/datadog-agent/datadog.yaml

# Send host tags with metrics for the first 10 minutes
echo "expected_tags_duration: 10m" >> /etc/datadog-agent/datadog.yaml

echo \$(date -u) "Installation completed. Starting Datadog Agent..."
sudo service datadog-agent start
echo \$(date -u) "Datadog Agent is now running"
EOF

echo $(date -u) "Installing Datadog Agent asynchronously... Installation logs can be found in /tmp/datadog_start.log"
chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
