---
title: Environments
kind: Documentation
---
## Definition

An environment is a first class dimension that you can use to scope a whole Datadog APM application.

Some display settings can be shared across environments, but all the measurable data (traces/metrics/statistics) can not be re-aggregated across multiple environments.

Use cases can be:

* Stage environments such as production, staging, and pre-production
* Datacenters and availability zones in isolation

Environments are tags, therefore they must follow the following rules:

* They must start with a letter.
* Other characters must be alphanumeric lower case Unicode characters, underscores, minuses, colons, periods or slashes.
* They must not be more than 100 characters long.

Environments in traces and configuration files are normalized:

* Unsupported characters are replaced by underscores.
* Upper case characters are converted to lower case.

## Default environment

If you are not using this feature, your data is put in `env:none` which is the default behavior.

Note that if you are using environments, you still get a default `env:none` environment where all the non-tagged data goes.

## Setup

There are several ways to specify an environment when reporting data:

1. Host tag:

    If you use a host tag that looks like `env:XXXX`, all the traces reported from that agent are tagged accordingly.

2. Agent config:

    You can override the default tag used by the trace agent in the configuration. This will tag all the traces coming through the agent. It overrides the value above.

    ```
    [trace.config]
    env = pre-prod
    ```

3. Per trace:

    When submitting a single trace, you can specify an environment by tagging one of its span with the metadata key `env` and the value you would like. It overrides the value above.

    ```
    # in code this looks like
    span.set_tag('env', 'prod')
    ```

