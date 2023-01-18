---
title: Installation
kind: Documentation
aliases:
    - /observability_pipelines/setup/
---

## Overview

Install the Observability Pipelines Worker with the [Advanced Package Tool][1] (APT), a free package manager that handles the installation and removal of software on [Debian][2], [Ubuntu][3], and other [Linux][4] distributions.

## Prerequisites

Before installing, make sure you have:

1. A valid [Datadog API key][5].
2. An Observability Pipelines Configuration ID.

## Installation

<!-- ### Automatic

Datadog provides a script that runs the necessary steps to install the Worker. Use the following command to run the script, replacing `DD_API_KEY` with your Datadog API key:

```
$ DD_API_KEY=<DD_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_observability_pipelines_worker.sh)"
``` -->

### Manual

1. Run the following commands to set up APT to download through HTTPS:

    ```
    $ sudo apt-get update
    $ sudo apt-get install apt-transport-https curl gnupg
    ```

2. Run the following commands to set up the Datadog `deb` repo on your system and create a Datadog archive keyring:

    ```
    $ sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
    $ sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    $ sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    $ curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    $ curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    $ curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Run the following commands to update your local `apt` repo and install the Worker:

    ```
    $ sudo apt-get update
    $ sudo apt-get install datadog-observability-pipelines-worker datadog-signing-keys
    ```

4. Start the Worker:

    ```
    $ sudo systemctl restart datadog-observability-pipelines-worker.service
    ```

## Commands

| Description                       | Command                                                       |
| --------------------------------- | ------------------------------------------------------------- |
| Start the Worker                  | `sudo service datadog-observability-pipelines-worker start`   |
| Stop the Worker                   | `sudo service datadog-observability-pipelines-worker stop`    |
| Restart the Worker                | `sudo service datadog-observability-pipelines-worker restart` |
| Status of the Worker              | `sudo service datadog-observability-pipelines-worker status`  |
| Status page of the running Worker | `sudo datadog-observability-pipelines-worker status`          |
| Display command usage             | `sudo datadog-observability-pipelines-worker --help`          |
| Uninstall the Worker              | `sudo apt remove datadog-observability-pipelines-worker`      |

## Configuration

- The configuration file for the Worker is located at `/etc/datadog-observability-pipelines-worker/observability-pipelines-worker.yaml`.
- See Configuration Reference for all configuration options.
- See [Working with Data][6] and Configuration Reference for configuration examples.

[1]: https://en.wikipedia.org/wiki/APT_%28software%29
[2]: https://debian.org/
[3]: https://ubuntu.com/
[4]: https://linux.org/
[5]: /account_management/api-app-keys/#api-keys
[6]: /observability_pipelines/working_with_data/

