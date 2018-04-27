---
title: AWS ECS with Agent v5
kind: faq
---

<div class="alert alert-warning">
This documentation is to setup AWS EC2 container Service with <strong>Datadog Agent 5</strong>
</div>

## Setup
### Installation
To monitor your ECS containers and tasks with Datadog, run the Agent as a container on every EC2 instance in your ECS cluster. As detailed below, there are a few setup steps:

1. **Add an ECS Task**
2. **Create or Modify your IAM Policy**
3. **Create a new Instance with a User Script**

This documentation assume you already have a working EC2 Container Service cluster configured. If not, review the [Getting Started section in the ECS documentation][1].

#### Create an ECS Task

This task launches the Datadog container. When you need to modify the configuration, update this Task Definition as described further down in this guide.

You may either configure the task using the [AWS CLI tools][2] or using the Amazon Web Console.

##### AWS CLI

1. Download [dd-agent-ecs.json][3].
1. Edit dd-agent-ecs.json and update it with the [API_KEY][4] for your account.
1. Execute the following command:
```
aws ecs register-task-definition --cli-input-json file://path/to/dd-agent-ecs.json
```

##### Web UI

1. Log in to your AWS Console and navigate to the EC2 Container Service section.
2. Click on the cluster you wish to add Datadog to.
3. Click on **Task Definitions** on the left side and click the button **Create new Task Definition**.
4. Enter a **Task Definition Name**, such as ```dd-agent-task```.
5. Click on the **Add volume** link.
6. For **Name** enter ```docker_sock```. For **Source Path**, enter ```/var/run/docker.sock```. Click **Add**.
7. Add another volume with the name ```proc``` and source path of ```/proc/```.
8. Add another volume with the name ```cgroup``` and source path of ```/cgroup/```.
9. Click the large **Add container** button.
10. For **Container name** enter ```dd-agent```.
11. For **Image** enter ```datadog/docker-dd-agent:latest```.
12. For **Maximum memory** enter ```256```.
13. Scroll down to the **Advanced container configuration** section and enter ```10``` in **CPU units**.
14. For **Env Variables**, add a **Key** of ```API_KEY``` and enter your Datadog API Key in the value. *If you feel more comfortable storing secrets like this in s3, take a [look at the ECS Configuration guide][5].*
15. Add another Environment Variable for any tags you want to add using the key ```TAGS```.
16. Scroll down to the **Storage and Logging** section.
17. In **Mount points** select the **docker_sock** source volume and enter ```/var/run/docker.sock``` in the Container path. Leave the **Read only** checkbox un-checked.
18. Add another mount point for **proc** and enter ```/host/proc/``` in the Container path. Check the **Read only** checkbox.
19. Add a third mount point for **cgroup** and enter ```/host/sys/fs/cgroup``` in the Container path. Check the **Read only** checkbox.

#### Create or Modify your IAM Policy

1. Add those permissions to your [Datadog IAM policy][6] in order to collect Amazon ECS metrics: 

  * `ecs:ListClusters`: List available clusters.
  * `ecs:ListContainerInstances`: List instances of a cluster.
  * `ecs:DescribeContainerInstances`: Describe instances to add metrics on resources and tasks running, adds cluster tag to ec2 instances.

  For more information on ECS policies, [review the documentation on the AWS website][7].

2. Using the Identity and Access Management (IAM) console, create a new role called ```dd-agent-ecs```.
3. Select **Amazon EC2 Role for EC2 Container Service**. On the next screen do not check any checkboxes and click **Next Step**.
4. Click **Create Role**.
5. Click on the newly created role.
6. Expand the **Inline Policies** section. Click the link to create a new inline policy.
7. Choose **Custom Policy** and press the button.
8. For **Policy Name** enter ```dd-agent-policy```. Copy the following text into the **Policy Document**:
  
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
                 "ecs:StartTask",
                 "ecs:StartTelemetrySession"
             ],
             "Resource": [
                 "*"
             ]
         }
     ]
   }
  ```

9. Click **Create Policy**

#### Create a new instance including a startup script

Ideally you want the Datadog Agent to load on one container on each EC2 instance. The easiest way to achieve this is to have a startup script on each instance used. Unfortunately there is no way to add a script to an existing instance. So you need to create a new instance and add it to your ECS cluster.

##### Create a new Amazon Linux instance

1. Log in to the AWS console and navigate to the EC2 section.
2. Create a new instance by clicking the **Launch Instance** button.
3. Click on Community AMIs. Visit [this page to see a list of current ECS optimized instances][8]. Choose the appropriate AMI for your region and copy the ID into the search box. Choose the AMI that comes up as a result of the  search.
4. Follow the prompts as you normally would when setting up an instance.
5. On the third dialog, select the IAM role you created above.
6. Expand the Advanced Details section and copy the following script into the User Data section. Change cluster name to your cluster's name and task definition to the name you gave your task definition.

```bash
#!/bin/bash
cluster="cluster_name"
task_def="dd-agent-task"
echo ECS_CLUSTER=$cluster >> /etc/ecs/ecs.config
start ecs
yum install -y aws-cli jq
instance_arn=$(curl -s http://localhost:51678/v1/metadata | jq -r '. | .ContainerInstanceArn' | awk -F/ '{print $NF}' )
az=$(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone)
region=${az:0:${#az} - 1}
echo "cluster=$cluster az=$az region=$region aws ecs start-task --cluster \
$cluster --task-definition $task_def --container-instances $instance_arn --region $region" >> /etc/rc.local
```

This user script above will:
  * Start the task defined with the right parameters
  * Add a few lines to `/etc/rc.local` so that the rebooted instance starts the task

##### Dynamic detection and monitoring of running services

Datadog's <a href="https://docs.datadoghq.com/agent/autodiscovery/">Autodiscovery</a> can be used in conjunction with ECS and Docker to automatically discovery and monitor running tasks in your environment.

[1]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted.html
[2]: https://aws.amazon.com/cli/
[3]: /json/dd-agent-ecs.json
[4]: https://app.datadoghq.com/account/settings#api
[5]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html#ecs-config-s3
[6]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ecs.html
[8]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_container_instance.html
