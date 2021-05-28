---
title: Continuous Integration Visibility
kind: documentation
---

## Supported CI providers

* Appveyor
* Azure Pipelines
* BitBucket
* BuildKite
* CircleCI
* GitHub Actions
* GitLab
* Jenkins
* TravisCI

## Installing the Datadog CI CLI

Install the `@datadog/datadog-ci` CLI:

```bash
yarn global add @datadog/datadog-ci
```

## Uploading test reports

To upload your JUnit XML test reports to Datadog:

```bash
datadog-ci junit upload [--service] [--tags] [--max-concurrency] [--dry-run] <paths>
```

For example:

```bash
datadog-ci junit upload --service my-service \
  --tags key1:value1 --tags key2:value2 \
  unit-tests/junit-reports acceptance-tests/junit-reports e2e-tests/single-report.xml
```

`--service`
: The name of the service you're uploading JUnit XML reports for.<br>
**Default**: the `DD_SERVICE` environment variable value.

`--tags`
: An array of key-value pairs in the form `key:value`. This sets global tags applied to all spans. The resulting dictionary is merged with the content of the `DD_TAGS` environment variable. If a `key` appears both in `--tags` and `DD_TAGS`, the value in `DD_TAGS` takes precedence.

`--max-concurrency`
: The number of concurrent uploads to the API.<br>
**Default**: `20`

`--dry-run`
: Runs the command without the final upload step. All other checks are performed.<br>
**Default**: `false`

The positional arguments 
: The file paths or directories in which the JUnit XML reports are located. If you pass a directory, the CLI will look for all `.xml` files in it.


## Environment variables

Configure the `junit` command with following environment variables:

`DATADOG_API_KEY` (Required)
: API key used to authenticate the requests.

`DD_ENV`
: The environment you want your test results to appear in.

`DD_SERVICE`
: If you haven't specified a service through `--service`, you can do it with this env var.

`DD_TAGS`
: Global tags to be applied to all spans in the format `key1:value1,key2:value2`. The resulting dictionary is merged with the content of the `--tags` parameter. If a `key` appears both in `--tags` and `DD_TAGS`, the value in `DD_TAGS` takes precedence.

`DATADOG_SITE`
: The Datadog site to upload to, for example `datadoghq.com` or `datadoghq.eu`.

## Optional dependencies

- [`git`][1] is used for extracting repository metadata.

[1]: https://git-scm.com/downloads
