---
title: Private Locations Configuration
kind: documentation
description: Configure your private locations.
further_reading:
- link: "getting_started/synthetics/private_location"
  tag: "Documentation"
  text: "Getting Started with Private Locations"
- link: "synthetics/private_locations/dimensioning"
  tag: "Documentation"
  text: "Dimension your Private Locations"
---

## Overview

Synthetic private locations come with a set of options you can configure to match your environment requirements. All options for the [private location worker][1] can be found by running the `help` command:

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```

## Customize your private location

These configuration options for private locations can be passed as **parameters to your JSON configuration file** or as **arguments in the launch command**, for example:

```shell
docker run --rm -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest --logFormat=json
```

Arguments set in the launch command have precedence over the configuration file. However, these options are not stored and are consequently only revelant for a given launch.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
