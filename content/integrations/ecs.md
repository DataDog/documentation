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
TODO


#### Any other case
TODO


#### Dynamic detection and monitoring of running services
Currently work in progress, more to come soon
