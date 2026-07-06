---
title: Test Parallelization Best Practices
description: Optimize Test Parallelization planning and test discovery for Ruby, Rails, and Python test suites.
further_reading:
  - link: "/tests/test_parallelization/setup/"
    tag: "Documentation"
    text: "Set up Test Parallelization"
  - link: "/tests/test_parallelization/configuration/"
    tag: "Documentation"
    text: "Configure Test Parallelization"
  - link: "/tests/test_parallelization/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshooting Test Parallelization"
---

{{< callout url="https://www.datadoghq.com/product-preview/test-parallelization/" btn_hidden="false" header="Join the Preview!" >}}
Test Parallelization is in Preview. Complete the form to request access.
{{< /callout >}}

## Optimize the planning step

Test Parallelization adds a planning step that discovers tests before execution. For example, RSpec projects use dry-run discovery and pytest projects use collection. Keep this step lightweight so the time saved by parallel execution is not offset by planning overhead.

### Preinstall system dependencies with Docker

If your tests need operating system packages, include them in a CI base image instead of installing them during every CI run.

{{< code-block lang="dockerfile" filename="ci/Dockerfile.test" >}}
FROM ruby:3.3
RUN apt-get update && DEBIAN_FRONTEND=noninteractive \
    apt-get install -y --no-install-recommends imagemagick libpq-dev \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
{{< /code-block >}}

### Cache project dependencies

Use your CI provider dependency cache. For example, GitHub Actions can cache Bundler dependencies with `ruby/setup-ruby`:

{{< code-block lang="yaml" >}}
- uses: ruby/setup-ruby@v1
  with:
    ruby-version: 3.3
    bundler-cache: true
{{< /code-block >}}

For Python projects, use `actions/setup-python` with pip caching:

{{< code-block lang="yaml" >}}
- uses: actions/setup-python@v5
  with:
    python-version: "3.12"
    cache: pip
{{< /code-block >}}

### Skip database setup during discovery

Discovery does not execute tests, so database setup, migrations, seeds, and fixtures are often unnecessary during the planning step.

During discovery, `DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED` is set to `1`. Use this variable to skip expensive setup code during planning.

For example, in Rails:

{{< code-block lang="ruby" >}}
# in seeds.rb
return if ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?
# your seeds here

# in rails_helper.rb
ActiveRecord::Migration.maintain_test_schema! unless ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?

RSpec.configure do |config|
  unless ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"].present?
    config.use_transactional_fixtures = true
  else
    config.use_transactional_fixtures = false
    config.use_active_record = false
  end
end
{{< /code-block >}}

After these changes, test discovery can run faster and avoid failures when the database is unavailable during planning.

### Cache test discovery

If full test discovery takes too long, cache the `ddtest` discovery file between CI runs. Restore your CI cache before planning, and pass the restored file to `ddtest`:

{{< code-block lang="bash" >}}
DD_TEST_OPTIMIZATION_RUNNER_TEST_DISCOVERY_CACHE=.ddtest-cache/tests-discovery.json ddtest plan
{{< /code-block >}}

After planning, save the refreshed internal discovery file back to your CI cache:

{{< code-block lang="bash" >}}
if [ -f .testoptimization/tests-discovery/tests.json ]; then
  mkdir -p .ddtest-cache
  cp .testoptimization/tests-discovery/tests.json .ddtest-cache/tests-discovery.json
fi
{{< /code-block >}}

`ddtest` invalidates the cache when any test file changes. The set of test files is determined by `--tests-location` and `--tests-exclude-pattern`.

## Configure pytest

`ddtest` runs pytest as `python -m pytest` and appends the selected test files. It appends `--ddtrace` to `PYTEST_ADDOPTS`, preserving any existing value, so the `ddtrace` pytest plugin loads without changing your pytest config.

For test discovery, `ddtest` reads `testpaths` and `python_files` from `pytest.ini`, `pyproject.toml`, `tox.ini`, or `setup.cfg`. If no pytest config defines those settings, `ddtest` uses `**/{test_*,*_test}.py`.

During discovery, `DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED` is set to `1`. Use this variable to skip expensive setup code during planning, similar to [skipping database setup during discovery](#skip-database-setup-during-discovery).

## Configure Minitest in non-Rails projects

For non-Rails Minitest projects, `ddtest` uses `bundle exec rake test` and passes selected files in the `TEST_FILES` environment variable. Configure your `Rake::TestTask` to read `TEST_FILES`:

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  test.test_files = ENV["TEST_FILES"] ? ENV["TEST_FILES"].split : ["test/**/*.rb"]
end
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
