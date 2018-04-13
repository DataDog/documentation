---
autotocdepth: 2
customnav: tracingnav
hideguides: true
kind: Documentation
placeholder: true
title: Environments
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

### Definition

An environment is a first class dimension that you can use to scope a whole Datadog APM application.

Some display settings can be shared across environments, but all the measurable data (traces/metrics/statistics) can not be reaggregated across multiple environments.

Use cases can be:

- stage environments such as production, staging, and pre-production
- datacenters and availability zones in isolation

Environments are tags, therefore they must follow the following rules:

- they must start with a letter;
- other characters must be alphanumeric lower case unicode characters, underscores, minuses, colons, periods or slashes;
- they must not be more than 100 characters long.

Environments in traces and configuration files will be normalized:

- unsupported characters will be replaced by underscores;
- upper case characters will be converted to lower case.

#### Default environment

If you are not using this feature, you will get your data put in `env:none` which is the default behavior.

Note that if you are using environments, you will still get a default `env:none` environment where all the non-tagged data will go.

#### Setup

There are several ways to specify an environment when reporting data:

1. Host tag

    If you use a host tag that looks like `env:XXXX`, all the traces reported from that agent will be tagged accordingly.

2. Agent config

    You can override the default tag used by the trace agent in the configuration. This will tag all the traces coming through the agent. It overrides the value above.

    ~~~
    [trace.config]
    env = pre-prod
    ~~~

3. Per trace

    When submitting a single trace, you can specify an environment by tagging one of its span with the metadata key `env` and the value you would like. It overrides the value above.

    ~~~
    # in code this looks like
    span.set_tag('env', 'prod')
    ~~~
