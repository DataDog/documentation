---
title: Datadog-AWS ECS Integration
integration_title: AWS ECS
kind: integration
doclevel: basic
---

Amazon EC2 Container Service (ECS) is a highly scalable, high performance container management service that supports Docker containers and allows you to easily run applications on a managed cluster of Amazon EC2 instances.


### Configure ECS [WIP]

Different cases:


#### Collect ECS metrics from CloudWatch
Once the AWS integration is setup, you can enable the ECS integration to collect ECS metrics and add cluster tags on ec2 instances part of an ecs cluster.


#### Monitor a docker container on an ecs instance by installing the agent on the host
If you don't dynamically update your docker containers running on an ec2 instance, installing the agent on the ec2 instance will allow you to monitor docker containers running locally.
The only extra step is to bind the appropriate ports in the task definition.


#### Monitor a docker container on an ecs instance by running the agent as a container

To monitor your ECS tasks with Datadog, you can choose to run the agent as a container on every ECS instance in your cluster.
To do so, follow the next few steps:

##### Task definition

Create a new task in the AWS dashboard. Copy-paste the following JSON in the JSON tab:
```json
{
  "family": "dd-agent-task",
  "containerDefinitions": [
    {
      "name": "dd-agent",
      "image": "datadog/docker-dd-agent",
      "cpu": "10",
      "memory": "128",
      "entryPoint": [],
      "environment": [
        {
          "name": "API_KEY",
          "value": "api_key"
        }
      ],
      "command": [],
      "portMappings": [],
      "volumesFrom": [],
      "links": [],
      "mountPoints": [
        {
          "sourceVolume": "docker_sock",
          "containerPath": "/var/run/docker.sock",
          "readOnly": false
        },
        {
          "sourceVolume": "proc_mounts",
          "containerPath": "/host/proc/mounts",
          "readOnly": false
        },
        {
          "sourceVolume": "cgroup",
          "containerPath": "/host/sys/fs/cgroup",
          "readOnly": false
        }
      ],
      "essential": true
    }
  ],
  "volumes": [
    {
       "name": "docker_sock",
       "host": {
            "sourcePath": "/var/run/docker.sock"
      }
    },
    {
       "name": "proc_mounts",
       "host": {
            "sourcePath": "/proc/mounts"
      }
    },
    {
       "name": "cgroup",
       "host": {
            "sourcePath": "/cgroup/"
      }
    }
  ]
}
```

- Don't forget to replace the API_KEY value with your Datadog API key
- You can add environment variables in the task definition: see https://registry.hub.docker.com/u/datadog/docker-dd-agent/ for details

##### IAM role

- Start with creating a new IAM policy called `dd-agent-policy` with this definition:
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecs:RegisterContainerInstance",
                "ecs:DeregisterContainerInstance",
                "ecs:DiscoverPollEndpoint",
                "ecs:Submit*",
                "ecs:Poll",
                "ecs:StartTask"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```
- You can then create the new role with the type **Amazon EC2 Role for EC2 Container Service**. Call it dd-agent-ecs
- Go back to the new policy, and link this role to the policy

**Note:** This IAM policy is needed to give the amazon-ecs-agent all the permissions it needs to function. It also adds the `StartTask` permission so the User script we will use next can start the datadog agent task.


##### Create the EC2 instance

- Launch a new instance with a ECS-optimized image
- At the config step, use this script as User Data in Advanced Details (don't forget to modify the cluster variable to the name of the cluster you want this task to run in).

```bash
#!/bin/bash
cluster="cluster_name"
echo ECS_CLUSTER=$cluster >> /etc/ecs/ecs.config
start ecs
yum install -y aws-cli jq
instance_arn=$(curl -s http://localhost:51678/v1/metadata | jq -r '. | .ContainerInstanceArn' | awk -F/ '{print $NF}' )
az=$(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone)
region=${az:0:${#az} - 1}
aws ecs start-task --cluster $cluster --task-definition dd-agent-task:1 --container-instances $instance_arn --region $region
```

**Note:** This should also be added to any init script (such as upstart or systemd) so that the rebooted instance starts the task.

**TODO**: explain how to add that as an init script


#### Any other case
TODO


#### Dynamic detection and monitoring of running services
Currently work in progress, more to come soon
