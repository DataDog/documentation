---
title: Guide to using Autodiscovery with Docker
kind: guide
listorder: 10
---

***The Datadog Agent's Autodiscovery feature was previously called Service Discovery. The name was changed to prevent users from confusing its purpose with that of Service Discovery tools like Consul and etcd.

The feature is still called Service Discovery throughout the Agent's code and in option names.***
---

Docker is being [adopted rapidly](https://www.datadoghq.com/docker-adoption/). Platforms like Docker Swarm, Kubernetes, and Amazon's ECS make running Docker-ized services easier and more resilient by managing orchestration and replication across hosts. But all of that makes monitoring more difficult. How can you monitor a service which is unpredictably shifting from one host to another?

The Datadog Agent automatically keeps track of what services are running where, thanks to its Autodiscovery feature. Autodiscovery lets you define configuration templates for Agent checks and specify which container types each check should apply to. The Agent watches for Docker events—container creation, destruction, starts, and stops—and reloads check configurations on such events. For example, when your NGINX container moves from 10.0.0.6 to 10.0.0.17, the Agent updates its NGINX check configuration with the new IP address so it can keep collecting NGINX metrics without any action on your part.

This guide shows how to set up Autodiscovery and describes how it works.

# How to set it up

No matter what container orchestration platform you use, you'll first need to run a single [docker-dd-agent container](https://hub.docker.com/r/datadog/docker-dd-agent/) on every host in your cluster. Then, you'll write _templatized_ YAML or JSON configurations for every Agent check you want to use.

## Running the Agent Container

If you use Kubernetes, see the [Kubernetes integration page](http://docs.datadoghq.com/integrations/kubernetes/#installation) for instructions on running docker-dd-agent. If you use Amazon ECS, see [its integration page](http://docs.datadoghq.com/integrations/ecs/#installation).

If you use Docker Swarm, run the following command on one of your manager nodes:

    docker service create \
      --name dd-agent \
      --mode global \
      --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
      --mount type=bind,source=/proc/,target=/host/proc/,ro=true \
      --mount type=bind,source=/sys/fs/cgroup/,target=/host/sys/fs/cgroup,ro=true \
      -e API_KEY=<YOUR_DATADOG_API_KEY> \
      -e SD_BACKEND=docker \
      datadog/docker-dd-agent:latest

Otherwise, see the docker-dd-agent documentation for detailed instructions and a comprehensive list of supported environment variables.

In any case, you only need to provide one environment variable to enable Autodiscovery: `SD_BACKEND=docker`. (docker is the only supported backend)

## Setting up Agent checks

Of the three subsections below, the first two set up a conceptual framework

### Using Template Variables

In a non-container environment, Agent check configurations tend to be, like the environment in which they run, static. But because orchestration platforms like Docker Swarm deploy (and redeploy) your containers on arbitrary hosts, static files are not suitable for checks that use network information in their configuration.

Autodiscovery lets you templatize your check configurations using two template variables: `%%host%%` and `%%port%%`. You can substitute these variables in any check configuration where you would normally provide a hostname, IP address, or port, e.g. for the [Go Expvar check](https://github.com/Datadog/integrations-core/blob/master/go_expvar/conf.yaml.example):

~~~
init_config:

instances:
  - expvar_url: http://%%host%%:%%port%%
~~~

When Autodiscovery finds a running container to run this check against (the next section explains how it does that), it inspects the container to get get the network information, builds a new configuration from the template, and automatically enables the configuration. When Autodiscovery detects another instance of the same kind of container—whether it's an additional container or the previous one redeployed—it will build and enable another configuration.

For containers that have many IP addresses or listens on many ports, you can tell Autodiscovery which ones to choose by appending an underscore to the template variable followed by an index, e.g. `%%host_0%%`, `%%port_4%%`. After inspecting the container, Autodiscovery sorts the IPs and ports **numerically and in ascending order**, so if the container listens on ports 80, 443, and 8443, `%%port_0%%` refers to port 80. Unindexed template variables refer to the last item in the sorted list, so in this case, `%%port%%` refers to port 8443.

You can also add a network name suffix to the `%%host%%` variable—`%%host_bridge%%`, `%%host_swarm%%`, etc—for containers attached to multiple networks. When `%%host%%` does not have a suffix, Autodiscovery picks the `bridge` IP address.

### Mapping templates to their services

In a non-container world, there was no need 


### Image name format in the configuration store

Before version `5.8.3` of the Datadog Agent it was required to truncate the image name to its minimum. e.g. for the Docker image `quay.io/coreos/etcd:latest` the key in the configuration store needed to be `datadog/check_configs/etcd/...`

To make configuration more precise we now use the complete container image identifier in the key. So the agent will look in `datadog/check_configs/quay.io/coreos/etcd:latest/...`, and fallback to the old format if no template was found to ensure backward compatibility.

### Using Docker label to specify the template path

In case you need to match different templates with containers running the same image, it is also possible starting with `5.8.3` to define explicitly which path the agent should look for in the configuration store to find a template using the `com.datadoghq.sd.check.id` label.

For example, if a container has this label configured as `com.datadoghq.sd.check.id: foobar`, it will look for a configuration template in the store under the key `datadog/check_configs/foobar/...`.




### Providing templates to the Agent

There are three ways to provide check templates to the Agent: package them as files with dd-docker-agent, add them to a key-value store like Consul, or, if you use Kubernetes, add them as a pod annotation. While you may opt to use just one of these three methods, you don't have to; the Agent can use templates from all of these sources at once. (footnote about precendence, i.e. KV overrides K8S annotation overrides auto_check? Or just say it here?)

#### YAML files (Auto-conf)

The Agent looks for templates in its `conf.d/auto_conf

By default, the Agent includes Autodiscovery support for:

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

The configuration templates in `conf.d/auto_conf` directory are nearly identical to the example YAML configuration files provided in [the Datadog `conf.d` directory](https://github.com/DataDog/dd-agent/tree/master/conf.d), but with one important field added. The `docker_images` field is required and identifies the container image(s) to which the configuration template should be applied.

->>>>>>>>>>>>>>> #### Key-value stores  <<<<<<<<<<<<<<<<<-

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

->>>>>>>>>>>>>>> #### Kubernetes Annotations <<<<<<<<<<<<<<<<<-

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

# Detailed examples (i.e. Case studies)
