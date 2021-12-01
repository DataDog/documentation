---
dependencies:
- https://github.com/DataDog/synthetics-ci-github-action/blob/main/README.md
further_reading:
- link: https://github.com/DataDog/synthetics-ci-github-action/blob/main/README.md
  tag: GitHub
  text: Datadog Synthetics CI GitHub Action
kind: documentation
title: Synthetics and CI GitHub Actions
---
This Datadog GitHub Action allows you to trigger Datadog Synthetics tests, wait for results, and report the status using the [datadog-ci][1] tool.

## Setup
To get started:

1. Add your Datadog API and Application Keys as environment variables to your Github repository. For more information, see [API and Application Keys][2].
2. In your Github workflow, use `DataDog/synthetics-ci-github-action`.


Your workflow can be [simple](#simple-workflows) or [complex](#complex-workflows).

## Simple workflows

### Example workflow using public IDs


```yaml
name: Run Synthetics tests using the test public IDs

jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Run Datadog Synthetics tests
        uses: DataDog/synthetics-ci-github-action@v1
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          public_ids: 'abc-d3f-ghi, jkl-mn0-pqr' 
        
```
### Example workflow using an existing synthetics.json file

```yaml
name: Run Synthetics tests using existing synthetics.json file

jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Run Datadog Synthetics tests
        uses: DataDog/synthetics-ci-github-action@v1
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
        
```

**Note**: By default, this runs all tests listed in the `{,!(node_modules)/**/}*.synthetics.json` files (every file ending with `.synthetics.json` except for those in the `node_modules` folder). You can also trigger a list of Synthetics tests by specifying a `public_id` or using a search query.

## Complex workflows

### Example workflow using the `test_search_query`:

```yaml
name: Run Synthetics tests by test tag

jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Run Datadog Synthetics tests
        uses: DataDog/synthetics-ci-github-action@v1
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          test_search_query: 'tag:e2e-tests'

```

### Example workflow using a global configuration override using `config_path`:

```yaml
name: Run Synthetics tests with custom config

jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Run Datadog Synthetics tests
        uses: DataDog/synthetics-ci-github-action@v1
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          config_path: './synthetics-config.json'

```

## Inputs

| Name  | Type | Requirement | Default | Description   |
|-----|------|----|----|-----|
| `api_key`          | string | **_required_**  | none                                      | Your Datadog API key. This key is created by your [Datadog organization][2] and should be stored as a [secret][3].         |
| `app_key`          | string | **_required_** | none                                      | Your Datadog Application key. This key is created by your [Datadog organization][2] and should be stored as a [secret][3]. |
| `datadog_site`     | string | _optional_  | `datadoghq.com`                           | The Datadog site. For users in the EU, set to `datadoghq.eu`. For example: `datadoghq.com` or `datadoghq.eu`.                                                                                                                                  |
| `public_ids`       | string | _optional_  | none                                      | String of public IDs separated by commas for Synthetic tests you want to trigger. If no value is provided, the action looks for files named with `synthetics.json`.  |
| `config_path`      | string | _optional_  | `datadog-ci.json`                         | The global JSON configuration is used when launching tests. See the [example configuration][4] for more details.                                         |
| `files`            | string | _optional_  | `{,!(node_modules)/**/}*.synthetics.json` | Glob pattern to detect Synthetic tests config files.                                                                                                                                                                                              |
| `subdomain`        | string | _optional_  | app                                       | The name of the custom subdomain set to access your Datadog application. If the URL used to access Datadog is `myorg.datadoghq.com`, the subdomain value needs to be set to `myorg`.                                                          |
| `test_search_query`| string | _optional_  | none                                      | Trigger tests corresponding to a [search][5] query.                                                                                                                                            |
| `tunnel`           | boolean | _optional_  | false                                     | Use the [testing tunnel][6] to trigger tests.                                                                                                                    |
[1]: https://github.com/DataDog/datadog-ci
[2]: https://docs.datadoghq.com/account_management/api-app-keys/
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
[4]: https://docs.datadoghq.com/synthetics/cicd_testing/?tab=npm#setup-the-client
[5]: https://docs.datadoghq.com/synthetics/search/#search
[6]: https://docs.datadoghq.com/synthetics/cicd_testing/?tab=npm#use-the-testing-tunnel
