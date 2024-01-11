#!/bin/bash

echo "Downloading dd-java-agent.jar"
curl -f -L -o /databricks/driver/dd-java-agent.jar https://dtdg.co/latest-java-tracer
echo "DD_INTEGRATIONS_ENABLED=false" >> /etc/environment
echo "DD_INTEGRATION_SPARK_ENABLED=true" >> /etc/environment
echo "JAVA_TOOL_OPTIONS=-javaagent:/databricks/driver/dd-java-agent.jar" >> /etc/environment


cat <<EOF > /tmp/start_datadog.sh

#!/bin/bash

date -u +"%Y-%m-%d %H:%M:%S UTC"
echo "Running on the driver? $DB_IS_DRIVER"
echo "Driver ip: $DB_DRIVER_IP"

DB_CLUSTER_NAME=$(echo "$DB_CLUSTER_NAME" | sed -e 's/ /_/g' -e "s/'/_/g" -e 's/"/_/g')
DD_TAGS="environment:\${DD_ENV}","databricks_cluster_id:\${DB_CLUSTER_ID}","databricks_cluster_name:\${DB_CLUSTER_NAME}","databricks_container_ip:\${DB_CONTAINER_IP}","databricks_is_driver:\${DB_IS_DRIVER}","databricks_instance_type:\${DB_INSTANCE_TYPE}","databricks_is_job_cluster:\${DB_IS_JOB_CLUSTER}","data_workload_monitoring_trial:true"

if [[ $DB_CLUSTER_NAME =~ ^job-([0-9]+)- ]]; then
    DATABRICKS_JOB_ID="\${BASH_REMATCH[1]}"
    DD_TAGS=\${DD_TAGS},"databricks_job_id:\${DATABRICKS_JOB_ID}"
fi

if [[ \${DB_IS_DRIVER} = "TRUE" ]]; then
  echo "Installing Datadog Agent on the driver (master node)."

  DRIVER_TAGS="\${DD_TAGS}","spark_node:driver"

  # Install latest datadog agent on driver
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$DRIVER_TAGS bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"

  # Enable logs in datadog.yaml to collect driver logs
  echo "logs_enabled: true" >> /etc/datadog-agent/datadog.yaml

  while [ -z \$gotparams ]; do
    if [ -e "/tmp/driver-env.sh" ]; then
      DB_DRIVER_PORT=\$(grep -i "CONF_UI_PORT" /tmp/driver-env.sh | cut -d'=' -f2)
      gotparams=TRUE
    fi
    sleep 2
  done

  hostip=$(hostname -I | xargs)

  # Writing config file for spark integration with structured streaming metrics enabled
  echo "init_config:
instances:
    - spark_url: http://\${DB_DRIVER_IP}:\${DB_DRIVER_PORT}
      spark_cluster_mode: spark_driver_mode
      cluster_name: \${hostip}
      streaming_metrics: true
logs:
    - type: file
      path: /databricks/driver/logs/*.log
      source: spark
      service: databricks
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: \d{2,4}[\-\/]\d{2,4}[\-\/]\d{2,4}.*" > /etc/datadog-agent/conf.d/spark.d/spark.yaml
else
  WORKER_TAGS="\${DD_TAGS}","spark_node:worker"

  # Install latest datadog agent on workers
  DD_INSTALL_ONLY=true DD_API_KEY=\$DD_API_KEY DD_HOST_TAGS=\$WORKER_TAGS bash -c "\$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
fi

# Configure hostname explicitly, required on version 7.40+ (see https://github.com/DataDog/datadog-agent/issues/14152)
hostname=\$(hostname | xargs)
echo "hostname: \$hostname" >> /etc/datadog-agent/datadog.yaml

# Avoid conflicts on port 6062
echo "process_config.expvar_port: 6063" >> /etc/datadog-agent/datadog.yaml

# Restart to take config changes into account
sudo service datadog-agent restart
EOF

# Launch the script
chmod a+x /tmp/start_datadog.sh
/tmp/start_datadog.sh >> /tmp/datadog_start.log 2>&1 & disown
