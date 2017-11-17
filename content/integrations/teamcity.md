---
aliases: []
description: Track builds and understand the performance impact of every deploy.
git_integration_title: teamcity
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-Teamcity Integration
---

 Check: Teamcity

## Overview

This check watches for build-related events and sends them to Datadog.

Unlike most Agent checks, this one doesn't collect any metrics—just events.

## Setup
### Installation

The Teamcity check is packaged with the Agent, so simply [install the Agent](https://app.datadoghq.com/account/settings#agent) on your Teamcity servers. If you need the newest version of the check, install the `dd-check-teamcity` package.

### Configuration
#### Prepare Teamcity

Follow [Teamcity's documentation](https://confluence.jetbrains.com/display/TCD9/Enabling+Guest+Login) to enable Guest Login. 

Create a file `teamcity.yaml` in the Agent's `conf.d` directory. See the [sample teamcity.yaml](https://github.com/DataDog/integrations-core/blob/master/teamcity/conf.yaml.example) for all available configuration options:

```
init_config:

instances:
  - name: My Website
    server: teamcity.mycompany.com
: user:password@teamcity.mycompany.com # if you set basic_http_authentication to true
: true # default is false
    build_configuration: MyWebsite_Deploy # the internal build ID of the build configuration you wish to track
: msicalweb6 # defaults to hostname of the Agent's host
: true       # causes events to use the word 'deployment' in their messaging
: false     # default is true
:                     # add custom tags to events
#   - test
```

Add an item like the above to `instances` for each build configuration you want to track.

Restart the Agent to start collecting and sending Teamcity events to Datadog.

### Validation

[Run the Agent's `info` subcommand](https://help.datadoghq.com/hc/en-us/articles/203764635-Agent-Status-and-Information) and look for `teamcity` under the Checks section:

```
  Checks
  ======
    [...]

    teamcity
    -------
      - instance #0 [OK]
      - Collected 0 metrics, 3 events & 0 service checks

    [...]
```

## Compatibility

The teamcity check is compatible with all major platforms.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
All Teamcity events are forwared to your Datadog application.

### Service Checks
The Teamcity check does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading

* [Track performance impact of code changes with TeamCity and Datadog.](https://www.datadoghq.com/blog/track-performance-impact-of-code-changes-with-teamcity-and-datadog/)
