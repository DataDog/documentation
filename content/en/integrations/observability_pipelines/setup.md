---
title: Set up Observability Pipelines
kind: Documentation
dependencies:
  ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/observability_pipelines/setup.md"]
further_reading:
  - link: /integrations/observability_pipelines/vector_configurations/
    tag: Documentation
    text: Learn more about Vector configurations
  - link: https://vector.dev/docs/setup/going-to-prod/
    tag: Documentation
    text: Take Observability Pipelines to production with capacity planning
  - link: https://vector.dev/releases/ 
    tag: Documentation
    text: Check out the new release for Vector
  - link: https://vector.dev/docs/reference/configuration/sources/datadog_agent/
    tag: Documentation
    text: Datadog Agent as a source for Vector
  - link: /agent/vector_aggregation/ 
    tag: Documentation
    text: Configure Datadog Agents to send data to Vector aggregators
---

## Overview

Observability Pipelines connects to the open-source [Vector][1] project to help you manage and monitor the flow of logs, metrics, and traces throughout your infrastructure.

To set up Observability Pipelines, first [install Vector](#install-vector) and [set up Vector configurations](#set-up-vector-configurations), then [connect your Vector configurations to Observability Pipelines](#connect-vector-to-observability-pipelines) using your Datadog API.

## Install Vector

### Quick start

#### Terminal
Run the following OS-agnostic command in the terminal, which guides you through setting up Vector:

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.vector.dev | bash
```

#### Containers
For containerized production environments, run the following command to download and install Vector:

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.vector.dev | bash -s -- -y
```

Alternatively, you can also install Vector based on your [package manager](#using-package-managers) or for your [specific platform and operating system](#specific-platforms-and-operating-systems).

Run the command `vector --version` to make sure the installation was successful.

### Using package managers

Vector supports a wide variety of package managers across several operating systems and platforms. Install Vector using your preferred package manager:

- [APT][2]
- [dpkg][3]
- [Helm][4]
- [Homebrew][5]
- [MSI][6]
- [Nix][7]
- [RPM][8]
- [YUM][9]

### Specific platforms and operating systems

Many users choose to [install Vector on their Kubernetes platform][10], but Vector can be installed on any of the following platforms and operating systems:

- [Docker][11]
- [Kubernetes][10]
- [Amazon Linux][12]
- [CentOS][13]
- [Debian][14]
- [NixOS][15]
- [RHEL][16]
- [Raspbian][17]
- [Ubuntu][18]
- [Windows][19]
- [macOS][20]

For more detailed, platform specific instructions, see [Vector's documentation][21].

## Set up Vector configurations 

Vector topologies are defined by a configuration file that tells it how to collect, transform, and route data. Vector topologies are made up of three types of components: sources, transforms, and sinks. 

Vector configurations support TOML, YAML, and JSON. The location of your Vector configuration file depends on your installation method, but for most Linux-based systems, the file can be found at `/etc/vector/vector.toml`. 

If you already have Vector configurations set up, skip to [Connect Vector to Observability Pipelines](#connect-vector-to-observability-pipelines).

### Configuration example

To set up a simple pipeline as an example, create a configuration file called `vector.yaml` with the following:

```
sources:
  in:
    type: stdin
sinks:
  out:
    inputs:
      - in
    type: console
    encoding:
      codec: text
```

A Vector configuration file can contain multiple Vector components. Each component is prefixed with the component type and has a unique ID. In this example, the first component has `sources` for a source component with the ID `in`. The component, `sources.in`, uses the `stdin` source, which tells Vector to receive data over `stdin`.

The second component, `sinks.out`, uses a console sink, which tells Vector to print the data to stdout. The `encoding.codec` option tells Vector to print data as plain text (unencoded).

The `inputs` option of the `sinks.out` component tells Vector where this sink’s events are coming from. In this case, events are received from the other component, `sources` with ID `in`.

Run the command `vector --config ./vector.yaml` to start Vector with the configuration file. 

Run the following command to pipe a single event, `Hello world!`, through the configuration:

`echo 'Hello world!' | vector --config ./vector.yaml`

See [Vector Configurations][22] for more examples on setting up the three main Vector configuration components: sources, transforms, and sinks.

## Connect Vector to Observability Pipelines 

Connect your Vector configuration to Observability Pipelines by doing the following:

- In Datadog, [create a service account][23], if you don’t already have one. A service account is required to generate the application keys necessary to connect Vector to Observability Pipelines. 
- Go to [Observability Pipelines][24].
- Click **Create Configuration**, and follow the in-app instructions to set up the configuration.

Once the setup is complete, Vector is connected to Observability Pipelines and the data shows up in the Datadog app.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/vectordotdev/vector
[2]: https://vector.dev/docs/setup/installation/package-managers/apt/
[3]: https://vector.dev/docs/setup/installation/package-managers/dpkg/
[4]: https://vector.dev/docs/setup/installation/package-managers/helm/
[5]: https://vector.dev/docs/setup/installation/package-managers/homebrew/
[6]: https://vector.dev/docs/setup/installation/package-managers/msi/
[7]: https://vector.dev/docs/setup/installation/package-managers/nix/
[8]: https://vector.dev/docs/setup/installation/package-managers/rpm/
[9]: https://vector.dev/docs/setup/installation/package-managers/yum/
[10]: https://vector.dev/docs/setup/installation/platforms/kubernetes/
[11]: https://vector.dev/docs/setup/installation/platforms/docker/
[12]: https://vector.dev/docs/setup/installation/operating-systems/amazon-linux/
[13]: https://vector.dev/docs/setup/installation/operating-systems/centos/
[14]: https://vector.dev/docs/setup/installation/operating-systems/debian/
[15]: https://vector.dev/docs/setup/installation/operating-systems/nixos/
[16]: https://vector.dev/docs/setup/installation/operating-systems/rhel/
[17]: https://vector.dev/docs/setup/installation/operating-systems/raspbian/
[18]: https://vector.dev/docs/setup/installation/operating-systems/ubuntu/
[19]: https://vector.dev/docs/setup/installation/operating-systems/windows/
[20]: https://vector.dev/docs/setup/installation/operating-systems/macos/
[21]: https://vector.dev/docs/setup/installation/
[22]: /integrations/observability_pipelines/vector_configurations
[23]: https://app.datadoghq.com/organization-settings/service-accounts/new
[24]: https://app.datadoghq.com/observability-pipelines
