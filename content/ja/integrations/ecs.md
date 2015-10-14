---
title: Datadog-AWS ECS Integration
integration_title: AWS ECS
kind: integration
---

Amazon EC2 Container Service (ECS) is a highly scalable, high performance container management service for Docker containers running on EC2 instances.

### Monitor your ECS containers with Datadog
To monitor your ECS containers and tasks with Datadog, run the Agent as a container on every EC2 instance in your ECS cluster. As detailed below, there are three setup steps:

1. **Create a cluster** if you don't already have one you want to use
2. **Define an ECS task** that installs and runs the Agent
3. **Create an IAM policy** to give the Agent necessary permissions, including permission to be auto-started
4. **Add a user script** to run the ECS defined in step 2, above

#### 1. Create a cluster
* Using the EC2 Container Service (ECS) console, create a new cluster. Write down its name.

#### 2. Define an ECS task
* Staying in the ECS console, create a new task.
* Click the JSON tab, and replace the default contents by copy-pasting the JSON below, but don't click "Create" yet.
* Replace *your\_api\_key* with your Datadog API key (enclosed by double quotes).
* Replace *simple-tag-0, tag-key-1:tag-value-1* with tags you want to associate with your containers' metrics; details [here](https://registry.hub.docker.com/u/datadog/docker-dd-agent/). If you don't want any tags, remove the whole block for defining tags.
* Click "Create".

~~~~~~~~    
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
              "value": "your_api_key"
            },
            {
              "name": "TAGS",
              "value": "simple-tag-0, tag-key-1:tag-value-1"
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
              "sourceVolume": "proc",
              "containerPath": "/host/proc/",
              "readOnly": true
            },
            {
              "sourceVolume": "cgroup",
              "containerPath": "/host/sys/fs/cgroup",
              "readOnly": true
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
           "name": "proc",
           "host": {
                "sourcePath": "/proc/"
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
~~~~~~~~

#### 3. Create an IAM policy

* Using the Identity and Access Management (IAM) console, create the new role called `dd-agent-ecs`. Select type **Amazon EC2 Role for EC2 Container Service**. Don't attach it to any policy during creation.
* Create a new IAM policy called `dd-agent-policy` with this definition:

~~~~~~~~
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
                    "ecs:StartTask",
                    "ecs:StartTelemetrySession"
                ],
                "Resource": [
                    "*"
                ]
            }
        ]
    }
~~~~~~~~
* Select the newly created policy, and then attach it to the new `dd-agent-ecs` role.



#### 4. Add a user script, and launch EC2 instance (for non-CoreOS users)

* From the EC2 console (not the ECS console) launch a new instance with a ECS-optimized image (detailed launch instructions [here](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_container_instance.html)).
* When you get to the Configure Instance Details step:
    *  Select the IAM role you created at step 2
    *  Paste the script below into User Data under Advanced Details, replacing *"cluster_name"* with name of the cluster you created in step 1.

~~~~~~~~
  #!/bin/bash
  cluster="cluster_name"
  task_def="dd-agent-task"
  echo ECS_CLUSTER=$cluster >> /etc/ecs/ecs.config
  start ecs
  yum install -y aws-cli jq
  instance_arn=$(curl -s http://localhost:51678/v1/metadata \
  | jq -r '. | .ContainerInstanceArn' | awk -F/ '{print $NF}' )
  az=$(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone)
  region=${az:0:${#az} - 1}
  echo "
  cluster=$cluster
  az=$az
  region=$region
  aws ecs start-task --cluster $cluster --task-definition $task_def \
  --container-instances $instance_arn --region $region" >> /etc/rc.local
~~~~~~~~

This user script above will:

1. start the task defined in step 2 with the right parameters
2. add a few lines to `/etc/rc.local` so that the rebooted instance starts the task

#### 5. Add a cloud-config User Script, and launch EC2 instance (fore CoreOS users)

* From the EC2 console (not the ECS console) launch a new CoreOS instance that will join an ECS cluster (instructions for a simple CoreOS ECS instance [here](https://coreos.com/os/docs/latest/booting-on-ecs.html)).
* When you get to the Configure Instance Details step:
    * Select the IAM role you created at step 2
    * Paste the following block in User Data under Advanced Details, replace `CLUSTER_NAME` and `YOUR_API_KEY` with the ECS cluster that instance will join and your Datadog API key. This block declares two units with cloud-config, one for the ecs-agent container, used by Amazon ECS to administrate the ECS instance, and one for the dd-agent container, used by Datadog to collect metrics about the system and the tasks running on this ECS instance. Of course it can be modified to include your own tasks as well.

~~~~~~~~
#cloud-config

coreos:
  units:
    - name: amazon-ecs-agent.service
      command: start
      runtime: true
      content: |
        [Unit]
        Description=Amazon ECS Agent
        After=docker.service
        Requires=docker.service
        Requires=network-online.target
        After=network-online.target

        [Service]
        Environment=ECS_CLUSTER=CLUSTER_NAME
        Environment=ECS_LOGLEVEL=warn
        Environment=ECS_CHECKPOINT=true
        ExecStartPre=-/usr/bin/docker kill ecs-agent
        ExecStartPre=-/usr/bin/docker rm ecs-agent
        ExecStartPre=/usr/bin/docker pull amazon/amazon-ecs-agent
        ExecStart=/usr/bin/docker run --name ecs-agent --env=ECS_CLUSTER=${ECS_CLUSTER} --env=ECS_LOGLEVEL=${ECS_LOGLEVEL} --env=ECS_CHECKPOINT=${ECS_CHECKPOINT} --publish=127.0.0.1:51678:51678 --volume=/var/run/docker.sock:/var/run/docker.sock --volume=/var/lib/aws/ecs:/data amazon/amazon-ecs-agent
        ExecStop=/usr/bin/docker stop ecs-agent
    - name: dd-agent.service
      command: start
      runtime: true
      content: |
        [Unit]
        Description=Datadog Agent
        After=amazon-ecs-agent.service
        After=docker.service
        After=network-online.target
        Requires=amazon-ecs-agent.service
        Requires=docker.service
        Requires=network-online.target

        [Service]
        Environment=API_KEY=YOUR_API_KEY
        Environment=TAGS=simple-tag-0
        ExecStartPre=/usr/bin/docker pull datadog/docker-dd-agent:ecs
        ExecStart=/usr/bin/docker run --name dd-agent --env=API_KEY=${API_KEY} --volume=/var/run/docker.sock:/var/run/docker.sock --volume=/proc/:/host/proc/:ro --volume=/sys/fs/cgroup/:/host/sys/fs/cgroup:ro datadog/docker-dd-agent:ecs
        ExecStop=/usr/bin/docker stop dd-agent
~~~~~~~~

#### That's all!

The Datadog agent is now running on your new ECS instance. Use this user script with every new ECS instance deployment to monitor your cluster's health with Datadog.


#### Dynamic detection and monitoring of running services
Currently work in progress, more to come soon
