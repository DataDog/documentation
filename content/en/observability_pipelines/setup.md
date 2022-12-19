---
title: Set up Observability Pipelines
kind: Documentation
aliases:
  - /integrations/observability_pipelines/setup/
further_reading:
  - link: /observability_pipelines/configurations/
    tag: Documentation
    text: Learn more about Observability Pipelines configurations
  - link: https://vector.dev/docs/setup/going-to-prod/
    tag: Documentation
    text: Take Observability Pipelines to production with capacity planning
    tag: Documentation
    text: Datadog Agent as a source for Observability Pipelines
  - link: /observability_pipelines/guide/configure_observability_pipelines_with_datadog/
    tag: Documentation
    text: Configure Datadog Agents to send data to Observability Pipelines
---

## Overview

Observability Pipelines helps you manage and monitor the flow of logs, metrics, and traces throughout your infrastructure.

To set up Observability Pipelines, first [install Observability Pipelines](#install-vector) and [set up configurations for Observability Pipelines](#set-up-vector-configurations), then [connect your configurations to Datadog](#connect-vector-to-observability-pipelines) using your Datadog API.

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

- [APT][1]
- [dpkg][2]
- [Helm][3]
- [Homebrew][4]
- [MSI][5]
- [Nix][6]
- [RPM][7]
- [YUM][8]

### Specific platforms and operating systems

Many users choose to [install Vector on their Kubernetes platform][9], but Vector can be installed on any of the following platforms and operating systems:

- [Docker][10]
- [Kubernetes][9]
- [Amazon Linux][11]
- [CentOS][12]
- [Debian][13]
- [NixOS][14]
- [RHEL][15]
- [Raspbian][16]
- [Ubuntu][17]
- [Windows][18]
- [macOS][19]

For more detailed, platform specific instructions, see [Vector's documentation][20].

## Set up Observability Pipelines configurations 

Observability Pipelines topologies are defined by a configuration file that tells it how to collect, transform, and route data. The topologies are made up of three types of components: sources, transforms, and sinks. 

Observability Pipelines configurations support TOML, YAML, and JSON. The location of your configuration file depends on your installation method, but for most Linux-based systems, the file can be found at `/etc/vector/vector.toml`. 

If you already have Observability Pipelines configurations set up, skip to [Connect Observability Pipelines to Datadog UI](#connect-observability-pipelines-to-datadog-ui).

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

A configuration file can contain multiple components. Each component is prefixed with the component type and has a unique ID. In this example, the first component has `sources` for a source component with the ID `in`. The component, `sources.in`, uses the `stdin` source to receive data over `stdin`.

The second component, `sinks.out`, uses a console sink to print data to stdout. The `encoding.codec` option prints out data as plain text (unencoded).

The `inputs` option of the `sinks.out` component tells Observability Pipelines where this sink's events are coming from. In this case, events are received from the other component, `sources` with ID `in`.

Run the command `vector --config ./vector.yaml` to start Observability Pipelines with the configuration file. 

Run the following command to pipe a single event, `Hello world!`, through the configuration:

`echo 'Hello world!' | vector --config ./vector.yaml`

See [Configurations][21] for more examples on setting up the three main Observability Pipelines configuration components: sources, transforms, and sinks.

## Connect Observability Pipelines to Datadog

Connect your Observability Pipelines configuration to Datadog by doing the following:

- Go to [Observability Pipelines][22].
- Click **Create Configuration**, and follow the in-app instructions to set up the configuration.

Once the setup is complete, start exploring your Observability Pipelines data in Datadog.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vector.dev/docs/setup/installation/package-managers/apt/
[2]: https://vector.dev/docs/setup/installation/package-managers/dpkg/
[3]: https://vector.dev/docs/setup/installation/package-managers/helm/
[4]: https://vector.dev/docs/setup/installation/package-managers/homebrew/
[5]: https://vector.dev/docs/setup/installation/package-managers/msi/
[6]: https://vector.dev/docs/setup/installation/package-managers/nix/
[7]: https://vector.dev/docs/setup/installation/package-managers/rpm/
[8]: https://vector.dev/docs/setup/installation/package-managers/yum/
[9]: https://vector.dev/docs/setup/installation/platforms/kubernetes/
[10]: https://vector.dev/docs/setup/installation/platforms/docker/
[11]: https://vector.dev/docs/setup/installation/operating-systems/amazon-linux/
[12]: https://vector.dev/docs/setup/installation/operating-systems/centos/
[13]: https://vector.dev/docs/setup/installation/operating-systems/debian/
[14]: https://vector.dev/docs/setup/installation/operating-systems/nixos/
[15]: https://vector.dev/docs/setup/installation/operating-systems/rhel/
[16]: https://vector.dev/docs/setup/installation/operating-systems/raspbian/
[17]: https://vector.dev/docs/setup/installation/operating-systems/ubuntu/
[18]: https://vector.dev/docs/setup/installation/operating-systems/windows/
[19]: https://vector.dev/docs/setup/installation/operating-systems/macos/
[20]: https://vector.dev/docs/setup/installation/
[21]: /observability_pipelines/vector_configurations
[22]: https://app.datadoghq.com/observability-pipelines
