---
title: Guide to using Autodiscovery with Docker
kind: guide
listorder: 10
---

Docker is being [adopted rapidly](https://www.datadoghq.com/docker-adoption/) and platforms like Docker Swarm, Kubernetes and Amazon's ECS make running services easier and more resilient by managing orchestration and replication across hosts. But all of that makes monitoring more difficult. How can you monitor a service which is dynamically shifting from one host to another?

Datadog automatically keeps track of what is running where, thanks to its Autodiscovery feature. Autodiscovery allows you to define configuration templates that will be applied automatically to monitor your containers.

## How it works

As we consider [the problem of monitoring Docker](https://www.datadoghq.com/blog/the-docker-monitoring-problem/), one strategy is to move from a host-centric model to a service-oriented model. To do this, we'll run the Datadog Agent as a containerized service, rather than using Datadog Agents installed across all of our hosts.

The Autodiscovery feature watches for Docker events like when a container is created, destroyed, started or stopped. When one of these happens, the Agent identifies which service is impacted, loads the configuration template for this image, and automatically sets up its checks.

Configuration templates can be defined by simple template files or as single key-value stores using etcd or Consul.

## How to set it up

To use Autodiscovery, you'll first need to run the Datadog Agent as a service.

In Docker Swarm, you can do this by running the following command on one of your manager nodes (using your [API key](https://app.datadoghq.com/account/settings#api)):

    docker service create \
      --name dd-agent \
      --mode global \
      --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
      --mount type=bind,source=/proc/,target=/host/proc/,ro=true \
      --mount type=bind,source=/sys/fs/cgroup/,target=/host/sys/fs/cgroup,ro=true \
      -e API_KEY=<YOUR API KEY> \
      -e SD_BACKEND=docker \
      datadog/docker-dd-agent:latest

For Kubernetes, you can follow our [Kubernetes Integration](http://docs.datadoghq.com/integrations/kubernetes/) to create a DaemonSet. We also have [Amazon ECS integration instructions](http://docs.datadoghq.com/integrations/ecs/) available.

By default, the Datadog Agent includes Autodiscovery support for:

- Apache Web Server
- Consul
- CouchDB
- Couchbase
- Elasticsearch
- etcd
- Kube State Metrics
- Kyoto Tycoon
- Memcached
- Redis
- Riak

These are provided by the configuration templates in the Datadog Agent `conf.d/auto_conf` directory.

To add Autodiscovery for your custom container images, you simply need to add a configuration template to the `conf.d/auto_conf` directory.

## Configuration templates

The configuration templates in `conf.d/auto_conf` directory are nearly identical to the example YAML configuration files provided in [the Datadog `conf.d` directory](https://github.com/DataDog/dd-agent/tree/master/conf.d), but with one important field added. The `docker_images` field is required and identifies the container image(s) to which the configuration template should be applied.

### Template variables

Because orchestration tools like Docker Swarm and Kubernetes automatically run your containers on arbitrary hosts, the host address and port where your service reports metrics will be dynamic. To account for this in your configuration template, you can use the variables `%%host%%` and `%%port%%`.

 When a list of values is expected for the variable and selecting a specific one is mandatory, you can specify the value from the list by appending an underscore followed by an index or key. For example `%%host_0%%` or `%%port_4%%`. Note that indexes begin at 0 and if no index is provided, the last value in the value list ordered increasingly will be used.

Let's take the example of the port variable: a RabbitMQ container with the management module enabled has 6 exposed ports by default. The list of ports as seen by the agent is: `[4369, 5671, 5672, 15671, 15672, 25672]`. **Notice the order. The Agent always sorts values in ascending order.**

The default management port for the rabbitmq image is `15672` with index 4 in the list (starting from 0), so the template variable needs to be `%%port_4%%`.

As of version `5.8.3` of the Datadog Agent, you can also use keys as a suffix when a variable contains a dictionary. This is particularly useful to select an IP address for a container that has several networks attached.

As an example if the rabbitmq container mentioned above is available over two networks `bridge` and `swarm`, using `%%host_swarm%%` will pick the IP address from the swarm network.
Note that for the `host` variable if several networks are found and no key is passed the agent attempts to use the default `bridge` network.

## Configuration templates with key-value stores

Using Autodiscovery with the configuration templates in the Datadog Agent  `conf.d/auto_conf` directory is a straightforward process, though managing your templates and copying them into the Datadog Agent container (or building your own Datadog Agent container to include custom configuration templates) can make scaling this process difficult.

To make configuration template management easier, you can use etcd or Consul, two popular distributed key-value stores, as a repository for your templates.

First you'll need to configure etcd or Consul as your Autoiscovery backend by either updating the `datadog.conf` file or passing the settings as environment variables when starting the Datadog Agent service.

### Configuring etcd or Consul in `datadog.conf`

In the `datadog.conf` file, you can enable etcd or Consul as a configuration backend by uncommenting and configuring the `sd_config_backend`, `sd_backend_host`, and `sd_backend_port` settings. If you are using Consul, you will also need to uncomment and set the `consul_token`.

    # For now only Docker is supported so you just need to un-comment this line.
    service_discovery_backend: docker

    # Define which key/value store must be used to look for configuration templates.
    # Default is etcd. Consul is also supported.
    sd_config_backend: etcd

    # Settings for connecting to the backend. These are the default, edit them if you run a different config.
    sd_backend_host: 127.0.0.1
    sd_backend_port: 4001

    # By default, the agent will look for the configuration templates under the
    # `/datadog/check_configs` key in the back-end.
    # If you wish otherwise, uncomment this option and modify its value.
    # sd_template_dir: /datadog/check_configs

    # If you Consul store requires token authentication for service discovery, you can define that token here.
    # consul_token: f45cbd0b-5022-samp-le00-4eaa7c1f40f1

### Configuring etcd or Consul using environment variables

To pass the settings listed above as environment variables when starting the Datadog Agent in Docker Swarm, you would run the command:

    docker service create \
      --name dd-agent \
      --mode global \
      --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
      --mount type=bind,source=/proc/,target=/host/proc/,ro=true \
      --mount type=bind,source=/sys/fs/cgroup/,target=/host/sys/fs/cgroup,ro=true \
      -e API_KEY=<YOUR API KEY> \
      -e SD_BACKEND=docker \
      -e SD_CONFIG_BACKEND=etcd \
      -e SD_BACKEND_HOST=127.0.0.1 \
      -e SD_BACKEND_PORT=4001 \
      datadog/docker-dd-agent:latest

### Template structure in key-value stores

After your Datadog Agent service has been configured to use your Autodiscovery configuration backend, you will need to store your configuration templates in the structure:

    /datadog/
      check_configs/
        docker_image_0/
          - check_names: ["check_name_0"]
          - init_configs: [{init_config}]
          - instances: [{instance_config}]
        docker_image_1/
          - check_names: ["check_name_1a", "check_name_1b"]
          - init_configs: [{init_config_1a}, {init_config_1b}]
          - instances: [{instance_config_1a}, {instance_config_1b}]
        ...

Note that in the structure above, you may have multiple checks for a single container. For example you may run a Java service that provides an HTTP API, using the HTTP check and the JMX integration at the same time. To declare that in templates, simply add elements to the `check_names`, `init_configs`, and `instances lists`. These elements will be matched together based on their index in their respective lists.

### Example: Apache Web Server

By default, the Datadog Agent supports Autodiscovery for the Apache Web Server through the [`conf.d/auto_conf/apache.yaml` file](https://github.com/DataDog/integrations-core/blob/master/apache/conf.yaml.example):

    docker_images:
      - httpd

    init_config:

    instances:
      - apache_status_url: http://%%host%%/server-status?auto

To store the same configuration template in etcd you could run the following commands:

    etcdctl mkdir /datadog/check_configs/httpd
    etcdctl set /datadog/check_configs/httpd/check_names '["apache"]'
    etcdctl set /datadog/check_configs/httpd/init_configs '[{}]'
    etcdctl set /datadog/check_configs/httpd/instances '[{"apache_status_url": "http://%%host%%/server-status?auto"}]'

### Image name format in the configuration store

Before version `5.8.3` of the Datadog Agent it was required to truncate the image name to its minimum. e.g. for the Docker image `quay.io/coreos/etcd:latest` the key in the configuration store needed to be `datadog/check_configs/etcd/...`

To make configuration more precise we now use the complete container image identifier in the key. So the agent will look in `datadog/check_configs/quay.io/coreos/etcd:latest/...`, and fallback to the old format if no template was found to ensure backward compatibility.


### Using Docker label to specify the template path

In case you need to match different templates with containers running the same image, it is also possible starting with `5.8.3` to define explicitly which path the agent should look for in the configuration store to find a template using the `com.datadoghq.sd.check.id` label.

For example, if a container has this label configured as `com.datadoghq.sd.check.id: foobar`, it will look for a configuration template in the store under the key `datadog/check_configs/foobar/...`.

## Configuration templates with Kubernetes annotations

As of version 5.12 of the Datadog Agent, you can use Kubernetes pod annotations to store your configuration templates. Follow the [Kubernetes integration instructions](/integrations/kubernetes/), then add annotations to your pod definitions. The basic format looks similar to the structure used in the key-value store configuration above, but for Kubernetes it takes the form:

    annotations:
      service-discovery.datadoghq.com/<Kubernetes Container Name>.check_names: '["check_name_0"]'
      service-discovery.datadoghq.com/<Kubernetes Container Name>.init_configs: '[{init_config}]'
      service-discovery.datadoghq.com/<Kubernetes Container Name>.instances: '[{instance_config}]'

Also similar to the key-value store configuration above, you include multiple checks for a container within in the pod. Each element from `check_names`, `init_configs`, and `instances` will be matched together based on their index. In pods with multiple containers, you can simply include additional annotations using the corresponding Kubernetes container name.

### Example: Apache Web Server

Here's an example of the Apache YAML file that would correspond to the configuration template [`conf.d/auto_conf/apache.yaml` file](https://github.com/DataDog/integrations-core/blob/master/apache/conf.yaml.example):

    apiVersion: v1
    kind: Pod
    metadata:
      name: apache
      annotations:
        service-discovery.datadoghq.com/apache.check_names: '["apache"]'
        service-discovery.datadoghq.com/apache.init_configs: '[{}]'
        service-discovery.datadoghq.com/apache.instances: '[{"apache_status_url": "http://%%host%%/server-status?auto"}]'
      labels:
        name: apache
    spec:
      containers:
        - name: apache
          image: httpd
          ports:
            - containerPort: 80
