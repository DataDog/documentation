#!/bin/bash

# Clean install Datadog agent
sudo yum -y erase datadog-agent
sudo rm -rf /etc/datadog-agent
sudo rm -rf /etc/dd-agent


DD_SITE=$1       # INPUT: Datadog site (datadoghq.com, datadoghq.eu ...)
SECRET_NAME=$2   # INPUT: Secret name of the DD_API_KEY

# Install the agent
DD_API_KEY=$(aws secretsmanager get-secret-value --secret-id $SECRET_NAME | jq -r .SecretString | jq -r '.["dd_api_key"]')
DD_APM_INSTRUMENTATION_LANGUAGES=java DD_API_KEY=${DD_API_KEY} DD_INSTALL_ONLY=true DD_APM_INSTRUMENTATION_ENABLED=host bash -c "$(curl --retry 10 -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"

# Get instance data
JOB_FLOW_ID=$(cat /mnt/var/lib/instance-controller/extraInstanceData.json | jq  -r ".jobFlowId")
IS_MASTER=$(cat /mnt/var/lib/info/instance.json | jq -r ".isMaster")
INSTANCE_GROUP_ID=$(cat /mnt/var/lib/info/instance.json | jq -r ".instanceGroupId")
CLUSTER_NAME=$(aws emr describe-cluster --cluster-id  "$JOB_FLOW_ID" | jq .Cluster.Name | sed 's/"//g')


# Adding tracer configurations
sudo tee -a /etc/datadog-agent/inject/host_config.yaml <<EOF
---
version: 1
config_sources: LOCAL:/etc/datadog-agent/inject/tracer.yaml
EOF

sudo tee -a /etc/datadog-agent/inject/tracer.yaml <<EOF
---
version: 1
config_sources: LOCAL:/etc/datadog-agent/inject/tracer.yaml
additional_environment_variables:
  - key: DD_INTEGRATIONS_ENABLED
    value: false
  - key: DD_INTEGRATION_SPARK_ENABLED
    value: true
  - key: DD_TRACE_AGENT_URL
    value: http://localhost:8126
  - key: DD_TRACE_EXPERIMENTAL_LONG_RUNNING_ENABLED
    value: true
EOF

# Adding tags
echo "tags:" | sudo tee --append /etc/datadog-agent/datadog.yaml
echo "  - \"init_script_version:1\"" | sudo tee --append /etc/datadog-agent/datadog.yaml
echo "  - \"data_workload_monitoring_trial:true\"" | sudo tee --append /etc/datadog-agent/datadog.yaml
echo "  - \"cluster_name:${CLUSTER_NAME}\"" | sudo tee --append /etc/datadog-agent/datadog.yaml
echo "  - \"cluster_id:${JOB_FLOW_ID}\"" | sudo tee --append /etc/datadog-agent/datadog.yaml
echo "  - \"job_flow_id:${JOB_FLOW_ID}\"" | sudo tee --append /etc/datadog-agent/datadog.yaml
echo "  - \"is_master_node:${IS_MASTER}\"" | sudo tee --append /etc/datadog-agent/datadog.yaml
echo "  - \"instance_group_id:${INSTANCE_GROUP_ID}\"" | sudo tee --append /etc/datadog-agent/datadog.yaml

# Configure the agent to ensure metrics are attached with desired tags
echo "expected_tags_duration: 10m" | sudo tee --append /etc/datadog-agent/datadog.yaml

if [[ "$IS_MASTER" = true ]]; then
  HOST=$(hostname -f)
  echo "Running on the master node with host: $HOST"

  # Yarn Integration
  echo "init_config:
instances:
- resourcemanager_uri: http://$HOST:8088
  cluster_name: $CLUSTER_NAME" | sudo tee /etc/datadog-agent/conf.d/yarn.d/conf.yaml

  # Spark Integration
  echo "init_config:
instances:
- spark_url: http://$HOST:8088
  spark_cluster_mode: spark_yarn_mode
  cluster_name: $CLUSTER_NAME" | sudo tee /etc/datadog-agent/conf.d/spark.d/conf.yaml
fi

sudo service datadog-agent start