---
title: Datadog-AWS ECS Integration
integration_title: AWS ECS
kind: integration
doclevel: basic
---

Amazon EC2 Container Service (ECS) is a highly scalable, high performance container management service that supports Docker containers and allows you to easily run applications on a managed cluster of Amazon EC2 instances.


### Monitor your ECS containers with Datadog

To monitor your ECS tasks with Datadog, we recommend to run the agent as a container on every ECS instance in your cluster.
To do so you need to create a Task Definition that runs the agent, an IAM role with the correct rights,
so that your ECS instances can join a cluster, report metrics and start the task corresponding to the agent, and run a User Script.

All of this is explained in the following short guide.

#### Task definition

Create a new task in the AWS dashboard. To do so, simply copy-paste the following JSON in the JSON tab of a new task:


    {
      "family": "dd-agent-task",
      "containerDefinitions": [
        {
          "name": "dd-agent",
          "image": "datadog/docker-dd-agent:ecs",
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



- Don't forget to replace the API_KEY value with your Datadog API key
- You might want to add environment variables in the task definition: see [https://registry.hub.docker.com/u/datadog/docker-dd-agent/][1]  for details

#### IAM role

Start with creating a new IAM policy called `dd-agent-policy` with this definition:


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

- You can then create the new role with the type **Amazon EC2 Role for EC2 Container Service**. Call it dd-agent-ecs
- Go back to the new policy, and link this role to the policy

**Note:** This IAM policy is needed to give the amazon-ecs-agent all the permissions it needs to function. It also adds the `StartTask` permission so the User script we will use next can start the datadog agent task.


#### Create the EC2 instance

- Launch a new instance with a ECS-optimized image (you can find details about that [here][2].)
- At the config step, use this script as User Data in Advanced Details (don't forget to modify the cluster variable to the name of the cluster you want this task to run in).
It will start the task you defined earlier with the right parameters, and add a few lines to `/etc/rc.local` so that the rebooted instance starts the task.



        #!/bin/bash
        cluster="cluster_name"
        echo ECS_CLUSTER=$cluster >> /etc/ecs/ecs.config
        start ecs
        yum install -y aws-cli jq
        instance_arn=$(curl -s http://localhost:51678/v1/metadata \
        | jq -r '. | .ContainerInstanceArn' | awk -F/ '{print $NF}' )
        az=$(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone)
        region=${az:0:${#az} - 1}
        aws ecs start-task --cluster $cluster --task-definition dd-agent-task:1 \
        --container-instances $instance_arn --region $region
        echo "
        cluster=$cluster
        az=$az
        region=$region
        docker start $(docker ps -a | grep docker-dd-agent | \
        sed -e 's/  .*//g')" >> /etc/rc.local


#### That's all!

The Datadog agent is now running on your new ECS instance. Use this user script with every new ECS instance deployment to monitor your cluster's health with Datadog.


#### Dynamic detection and monitoring of running services
Currently work in progress, more to come soon



[1]: https://registry.hub.docker.com/u/datadog/docker-dd-agent/
[2]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_container_instance.html
