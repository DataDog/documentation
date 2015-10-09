---
title: Datadog-Elastic Beanstalk Integration
integration_title: AWS Elastic Beanstalk
kind: integration
---

AWS Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker on familiar servers such as Apache, Nginx, Passenger, and IIS.

### Monitor Elastic Beanstalk environments with the Datadog agent container
If you use Docker containers in a Beanstalk environment, and want to monitor your Docker usage in this environment, the containerized Datadog agent is a tool of choice.

Read on to understand how to configure your Beanstalk environment to integrate the Datadog agent container.

#### Task definition
To run docker environments with multiple containers per instance, Elastic Beanstalk relies on Amazon EC2 Container Service (ECS).
For this reason you need to describe the containers you want to deploy the ECS-way. Elastic Beanstalk allows you to do so through a file called `Dockerrun.aws.json`.

A `Dockerrun.aws.json` file is an Elastic Beanstalk–specific JSON file that describes how to deploy a set of Docker containers as an Elastic Beanstalk application. You can use this file for a multicontainer Docker environment.

`Dockerrun.aws.json` describes the containers to deploy to each container instance in the environment as well as the data volumes to create on the host instance for the containers to mount.

A `Dockerrun.aws.json` file can be used on its own or zipped up with additional source code in a single archive. Source code that is archived with a `Dockerrun.aws.json` is deployed to container instances and accessible in the `/var/app/current/` directory. Use the `volumes` section of the config to provide mount points for the containers running on the instance, and the `mountPoints` section of the embedded container definitions to mount them from the containers.

The following snippet illustrates a `Dockerrun.aws.json` declaring the Datadog agent. Update it with the definition of your containers to define your own `Dockerrun.aws.json`. This file can be zipped with additional content to send to the instances which run the described containers, and shipped to Beanstalk. For more info about the syntax of this file you can refer to [the Beanstalk documentation](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_v2config.html).

~~~~~~~~
{
  "AWSEBDockerrunVersion": 2,
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
  ],
  "containerDefinitions": [
    {
      "name": "dd-agent",
      "image": "datadog/docker-dd-agent:ecs",
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
      "memory": 128,
      "mountPoints": [
        {
          "sourceVolume": "docker_sock",
          "containerPath": "/var/run/docker.sock",
          "readOnly": false
        },
        {
          "sourceVolume": "proc",
          "containerPath": "/host/proc",
          "readOnly": true
        },
        {
          "sourceVolume": "cgroup",
          "containerPath": "/host/sys/fs/cgroup",
          "readOnly": true
        }
      ],
    },
  ]
}
~~~~~~~~

#### Creating the environment

Once the container definition is ready, the last step is to ship it to Beanstalk.
This step is explained in [the multicontainer Docker tutorial](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_ecstutorial.html) of the Elastic Beanstalk documentation.
