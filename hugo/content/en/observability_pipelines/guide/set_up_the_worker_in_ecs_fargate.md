---
title: Set Up the Worker in ECS Fargate
disable_toc: false
aliases:
  - /observability_pipelines/install_the_worker/set_up_the_worker_in_ecs_fargate/
---

## Overview

This document goes over one of the ways you can set up the Observability Pipelines Worker in ECS Fargate.

## Setup

The setup configuration for this example consists of a Fargate task, Fargate service, and a load balancer.

{{< img src="observability_pipelines/worker_fargate_architecture.png" alt="An architecture diagram with logs going to an application load balancer, a OP Worker task, and the Fargate service" style="width:100%;" >}}

## Configure the task definition

[Create a task definition][1]. The task definition describes which containers to run, the configuration (such as the environment variables and ports), and the CPU and memory resources allocated for the task.

The tasks should be deployed as a replica with auto scaling enabled, where the minimum number of containers should be based on your log volume and the maximum number of containers should be able to absorb any spikes or growth in log volume. See [Best Practices for Scaling Observability Pipelines][5] to help determine how much CPU and memory resources to allocate.

**Notes**:
- The guidance for CPU and memory allocation is not for a single instance of the task, but for the total number of tasks. For example, if you want to send 3 TB of logs to the Worker, you could either deploy three replicas with one vCPU each or deploy one replica with three vCPUs.
- Datadog recommends enabling load balancers for the pool of replica tasks.

Set the `DD_OP_SOURCE_*` environment variable according to the configuration of the pipeline and port mappings. `DD_OP_API_ENABLED` and `DD_OP_API_ADDRESS` allow the load balancer to do health checks on the Observability Pipelines Worker.

An example task definition:

```json
{
  "family": "my-opw",
  "containerDefinitions": [
    {
      "name": "my-opw",
      "image": "datadog/observability-pipelines-worker",
      "cpu": 0,
      "portMappings": [
        {
          "name": "my-opw-80-tcp",
          "containerPort": 80,
          "hostPort": 80,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "command": [
        "run"
      ],
      "environment": [
        {
          "name": "DD_OP_API_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_API_KEY",
          "value": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        },
        {
          "name": "DD_SITE",
          "value": "datadoghq.com"
        },
        {
          "name": "DD_OP_API_ADDRESS",
          "value": "0.0.0.0:8181"
        },
        {
          "name": "DD_OP_SOURCE_HTTP_SERVER_ADDRESS",
          "value": "0.0.0.0:80"
        },
        {
          "name": "DD_OP_PIPELINE_ID",
          "value": "xxxxxxx-xxxx-xxxx-xxxx-xxxx"
        }
      ],
      "mountPoints": [],
      "volumesFrom": [],
      "systemControls": []
    }
  ],
  "tags": [
    {
      "key": "PrincipalId",
      "value": "AROAYYB64AB3JW3TEST"
    },
    {
      "key": "User",
      "value": "username@test.com"
    }
  ],
  "executionRoleArn": "arn:aws:iam::60142xxxxxx:role/ecsTaskExecutionRole",
  "networkMode": "awsvpc",
  "volumes": [],
  "placementConstraints": [],
  "requiresCompatibilities": [
    "FARGATE"
  ],
  "cpu": "xxx",
  "memory": "xxx"
}
```

## Configure the ECS service

[Create an ECS service][2]. The service configuration sets the number of Worker replicas to run and the scaling policy. In this example, the scaling policy is set to target an average CPU utilization of 70% with a minimum of two replicas and a maximum of five replicas.

## Set up load balancing

Depending on your use case, configure either an [Application Load Balancer][3] or a [Network Load Balancer][4] to target the group of Fargate tasks you defined earlier. Configure the health check against the Observability Pipelines' API port that was set in the task definition.

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-task-definition.html
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-service-console-v2.html
[3]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-application-load-balancer.html
[4]: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/create-network-load-balancer.html
[5]: /observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/