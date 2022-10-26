---
dependencies:
- https://github.com/DataDog/synthetics-ci-github-action/blob/main/README.md
kind: documentation
title: Synthetics and CI GitHub Actions
---
## Overview

Trigger Synthetic tests from your GitHub workflows with the [Datadog CI Synthetics command][1].

## Setup

To get started:

1. Add your Datadog API and Application Keys as secrets to your GitHub repository. For more information, see [API and Application Keys][2].
2. In your GitHub workflow, use `DataDog/synthetics-ci-github-action`.

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
        uses: DataDog/synthetics-ci-github-action@v0.6.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          public_ids: 'abc-d3f-ghi, jkl-mn0-pqr'
```

### Example workflow using an existing `synthetics.json` file

```yaml
name: Run Synthetics tests using an existing synthetics.json file
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Run Datadog Synthetics tests
        uses: DataDog/synthetics-ci-github-action@v0.6.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
```

**Note**: By default, this workflow runs all the tests listed in `{,!(node_modules)/**/}*.synthetics.json` files (every file ending with `.synthetics.json` except for those in the `node_modules` folder). You can also trigger a list of Synthetics tests by specifying a `public_id` or using a search query.

## Complex workflows

### Example workflow using the `test_search_query`

```yaml
name: Run Synthetics tests by test tag
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Run Datadog Synthetics tests
        uses: DataDog/synthetics-ci-github-action@v0.6.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          test_search_query: 'tag:e2e-tests'
```

### Example workflow using the `test_search_query` and variable overrides

```yaml
name: Run Synthetics tests using search query
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Run Datadog Synthetics tests
        uses: DataDog/synthetics-ci-github-action@v0.6.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          test_search_query: 'tag:e2e-tests'
          variables: 'START_URL=https://staging.website.com,PASSWORD=stagingpassword'
```

### Example workflow using a global configuration override with `config_path`

```yaml
name: Run Synthetics tests with custom config
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Run Datadog Synthetics tests
        uses: DataDog/synthetics-ci-github-action@v0.6.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          config_path: './synthetics-config.json'
```

## Inputs

| Name                | Type   | Requirement | Description                                                                                                                                                                                              |
| ------------------- | ------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`           | string | _required_  | Your Datadog API key. This key is created by your [Datadog organization][2] and should be stored as a [secret][3]. **Default:** none.                                                                    |
| `app_key`           | string | _required_  | Your Datadog Application key. This key is created by your [Datadog organization][2] and should be stored as a [secret][3]. **Default:** none.                                                            |
| `public_ids`        | string | _optional_  | Comma-separated list of public IDs for Synthetic tests you want to trigger. If no value is provided, the action looks for files named with `synthetics.json`. **Default:** none.                         |
| `test_search_query` | string | _optional_  | Trigger tests corresponding to a [search][5] query. **Default:** none.                                                                                                                                   |
| `subdomain`         | string | _optional_  | The name of the custom subdomain set to access your Datadog application. If the URL used to access Datadog is `myorg.datadoghq.com`, the subdomain value needs to be set to `myorg`. **Default:** `app`. |
| `files`             | string | _optional_  | Glob pattern to detect Synthetic tests config files. **Default:** `{,!(node_modules)/**/}*.synthetics.json`.                                                                                             |
| `datadog_site`      | string | _optional_  | The Datadog site. For users in the EU, set to `datadoghq.eu`. For example: `datadoghq.com` or `datadoghq.eu`. **Default:** `datadoghq.com`.                                                              |
| `config_path`       | string | _optional_  | The global JSON configuration is used when launching tests. See the [example configuration][4] for more details. **Default:** `datadog-ci.json`.                                                         |
| `variables`         | string | _optional_  | Comma-separated list of global variables to use for Synthetic tests. For example: `START_URL=https://example.org,MY_VARIABLE=My title`. **Default:** `[]`.                                               |

## Development

```bash


yarn test

# Build project
yarn build

# Compile project and its dependencies for release
yarn package
```

### Release Process

To release a new version of `synthetics-ci-github-action`:

1. Create a new branch for the version upgrade.
2. Update the package version using `yarn version [--patch|--minor|--major]` depending on the nature of your changes.
   - See [Semantic Versioning](https://semver.org/#summary) to determine what you need to increment.
   - Rebuild and package the project before release. Remember to update the `README.md` example versions.
3. Push the branch along with the release tag (`git push --tags`) to the upstream (GitHub).
   - Create a pull request with the changes introduced in the description. This pull request requires at least one approval.
4. Merge the pull request.
5. Create a GitHub Release from the [Tags page](https://github.com/DataDog/synthetics-ci-github-action/tags) with the description of your changes.

⚠️ Ensure the release version follows the expected format `vX.X.X`.

Once the release is created, the new version of the Github Action is available as a workflow.

## Further Reading

Additional helpful documentation, links, and articles:

- [CI/CD Integrations Configuration][6]

[1]: https://github.com/DataDog/datadog-ci
[2]: https://docs.datadoghq.com/account_management/api-app-keys/
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
[4]: https://docs.datadoghq.com/synthetics/cicd_integrations/configuration/?tab=npm#setup-a-client
[5]: https://docs.datadoghq.com/synthetics/search/#search
[6]: https://docs.datadoghq.com/synthetics/cicd_integrations/configuration
