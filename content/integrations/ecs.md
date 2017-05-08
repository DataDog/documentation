---
title: Datadog-AWS ECS Integration
integration_title: AWS ECS
kind: integration
git_integration_title: amazon_ecs
---

## Overview
Amazon EC2 Container Service (ECS) is a highly scalable, high performance container management service for Docker containers running on EC2 instances.

## Installation
To monitor your ECS containers and tasks with Datadog, run the Agent as a container on every EC2 instance in your ECS cluster. As detailed below, there are a few setup steps:

1. **Add an ECS Task**
1. **Create or Modify your IAM Policy**
1. **Create a new Instance with a User Script**

This documentation assume you already have a working EC2 Container Service cluster configured. If not, review the [Getting Started section in the ECS documentation](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted.html).

### Create an ECS Task

This task will launch the Datadog container. When you need to modify the configuration, you will update this Task Definition as described further down in this guide.

You may either configure the task using the [AWS CLI tools](https://aws.amazon.com/cli/) or using the Amazon Web Console.

#### AWS CLI

1. Download [dd-agent-ecs.json](/static/dd-agent-ecs.json).
1. Edit dd-agent-ecs.json and update it with the [API_KEY](https://app.datadoghq.com/account/settings#api) for your account.
1. Execute the following command:
       aws ecs register-task-definition --cli-input-json file://path/to/dd-agent-ecs.json

#### Web UI

1. Log in to your AWS Console and navigate to the EC2 Container Service section.
1. Click on the cluster you wish to add Datadog to.
1. Click on **Task Definitions** on the left side and click the button **Create new Task Definition**.
1. Enter a **Task Definition Name**, such as ```dd-agent-task```.
1. Click on the **Add volume** link.
1. For **Name** enter ```docker_sock```. For **Source Path**, enter ```/var/run/docker.sock```. Click **Add**.
1. Add another volume with the name ```proc``` and source path of ```/proc/```.
1. Add another volume with the name ```cgroup``` and source path of ```/cgroup/```.
1. Click the large **Add container** button.
1. For **Container name** enter ```dd-agent```.
1. For **Image** enter ```datadog/docker-dd-agent:latest```.
1. For **Maximum memory** enter ```128```.
1. Scroll down to the **Advanced container configuration** section and enter ```10``` in **CPU units**.
1. For **Env Variables**, add a **Key** of ```API_KEY``` and enter your Datadog API Key in the value. *If you feel more comfortable storing secrets like this in s3, take a [look at the ECS Configuration guide](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html#ecs-config-s3).*
1. Add another Environment Variable for any tags you want to add using the key ```TAGS```.
1. Scroll down to the **Storage and Logging** section.
1. In **Mount points** select the **docker_sock** source volume and enter ```/var/run/docker.sock``` in the Container path. Leave the **Read only** checkbox un-checked.
1. Add another mount point for **proc** and enter ```/host/proc/``` in the Container path. Check the **Read only** checkbox.
1. Add a third mount point for **cgroup** and enter ```/host/sys/fs/cgroup``` in the Container path. Check the **Read only** checkbox.

### Create or Modify your IAM Policy

If you are modifying the IAM Policy you created for your cluster, you may only need to add one Action: ```ecs:StartTask```.

1. Using the Identity and Access Management (IAM) console, create a new role called ```dd-agent-ecs```.
1. Select **Amazon EC2 Role for EC2 Container Service**. On the next screen do not check any checkboxes and click **Next Step**.
1. Click **Create Role**.
1. Click on the newly created role.
1. Expand the **Inline Policies** section. Click the link to create a new inline policy.
1. Choose **Custom Policy** and press the button.
1. For **Policy Name** enter ```dd-agent-policy```. Copy the following text into the **Policy Document**:


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
    {:.language-xml}
8. Click **Create Policy**

### Create a new instance including a startup script

Ideally you want the Datadog agent to load on one container on each EC2 instance. The easiest way to achieve this is to have a startup script on each instance used. Unfortunately there is no way to add a script to an existing instance. So you need to create a new instance and add it to your ECS cluster.

#### Create a new Amazon Linux instance

1. Log in to the AWS console and navigate to the EC2 section.
1. Create a new instance by clicking the **Launch Instance** button.
1. Click on Community AMIs. Visit [this page to see a list of current ECS optimized instances](http://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_container_instance.html). Choose the appropriate AMI for your region and copy the ID into the search box. Choose the AMI that comes up as a result of the  search.
1. Follow the prompts as you normally would when setting up an instance.
1. On the third dialog, select the IAM role you created above.
1. Expand the Advanced Details section and copy the following script into the User Data section. Change cluster name to your cluster's name and task definition to the name you gave your task definition.

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
    {:.language-shell}

    This user script above will:

    * Start the task defined with the right parameters
    * Add a few lines to `/etc/rc.local` so that the rebooted instance starts the task

#### Create a new CoreOS instance

1. Log in to the AWS console and navigate to the EC2 section.
1. Create a new instance  as described in the instructions for a simple CoreOS ECS instance [here](https://coreos.com/os/docs/latest/booting-on-ecs.html)).
1. When you get to the Configure Instance Details step, select the IAM role you created above.
1. Paste the following block in User Data under Advanced Details, replace `CLUSTER_NAME` and `YOUR_API_KEY` with the ECS cluster that instance will join and your Datadog API key. This block declares two units with cloud-config, one for the ecs-agent container, used by Amazon ECS to administrate the ECS instance, and one for the dd-agent container, used by Datadog to collect metrics about the system and the tasks running on this ECS instance. Of course it can be modified to include your own tasks as well.


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
               ExecStart=/usr/bin/docker run --name ecs-agent --env=ECS_CLUSTER=${ECS_CLUSTER} --env=ECS_LOGLEVEL=${ECS_LOGLEVEL} --env=ECS_CHECKPOINT=${ECS_ CHECKPOINT} --publish=127.0.0.1:51678:51678 --volume=/var/run/docker.sock:/var/run/docker.sock --volume=/var/lib/aws/ecs:/data amazon/amazon-ecs- agent
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
               ExecStartPre=/usr/bin/docker pull datadog/docker-dd-agent:latest
               ExecStart=/usr/bin/docker run --name dd-agent --env=API_KEY=${API_KEY} --volume=/var/run/docker.sock:/var/run/docker.sock --volume=/proc/:/host/proc/:ro --volume=/sys/fs/cgroup/:/host/sys/fs/cgroup:ro datadog/docker-dd-agent:latest
               ExecStop=/usr/bin/docker stop dd-agent

### That's all!

The Datadog agent is now running on your new ECS instance. Use this user script with every new ECS instance deployment to monitor your cluster's health with Datadog.


#### Dynamic detection and monitoring of running services

Datadog's <a href="/guides/autodiscovery/">Autodiscovery</a> can be used in conjunction with ECS and Docker to automatically discovery and monitor running tasks in your environment.

### Metrics

<%= get_metrics_from_git()%>
