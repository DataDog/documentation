---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/directory/
git_integration_title: directory
guid: 0c38c4ef-5266-4667-9fb1-de8f2b73708a
has_logo: true
integration_title: Directory
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: directory
public_title: Datadog-Directory Integration
short_description: The Directory integration helps monitoring and reporting metrics
  on files for a provided directory.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.1.1
---



## Overview

Capture metrics from directories and files of your choosing. The Agent will collect:

  * number of files
  * file size
  * age of the last modification
  * age of the creation

## Setup
### Installation

The directory check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) anywhere you wish to use it.

If you need the newest version of the Directory check, install the `dd-check-directory` package; this package's check overrides the one packaged with the Agent. See the [integrations-core repository README.md for more details](https://github.com/DataDog/integrations-core#installing-the-integrations).

### Configuration

1. Edit your `directory.yaml` file in the Agent's `conf.d` directory. See the [sample directory.yaml](https://github.com/DataDog/integrations-core/blob/master/directory/conf.yaml.example) for all available configuration options:

```
init_config:

instances:
  - directory: "/path/to/directory" # the only required option
    name: "my_monitored_dir"        # What the Agent will tag this directory's metrics with. Defaults to "directory"
    pattern: "*.log"                # defaults to "*" (all files)
    recursive: True                 # default False
    countonly: False                # set to True to only collect the number of files matching 'pattern'. Useful for very large directories.
    ignore_missing: False           # set to True to not raise exceptions on missing or inaccessible directories
```

Ensure that the user running the Agent process (usually `dd-agent`) has read access to the directories, subdirectories, and files you configure.

2. [Restart the Agent](https://docs.datadoghq.com/agent/faq/start-stop-restart-the-datadog-agent).

### Validation

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/faq/agent-status-and-information/) and look for `directory` under the Checks section:

```
  Checks
  ======
    [...]

    directory
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibility

The directory check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git "directory" >}}


### Events
The Directory check does not include any event at this time.

### Service Checks
The Directory check does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

