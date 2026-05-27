---
title: Test Parallelization Best Practices
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

## Optimize the planning step

Test Parallelization adds a planning step that discovers tests before execution. For example, RSpec projects use dry-run discovery. Keep this step lightweight so the time saved by parallel execution is not offset by planning overhead.

### Preinstall system dependencies with Docker

If your tests need operating system packages, bake them into a CI base image instead of installing them during every CI run.

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
  unless ENV["DD_TEST_OPTIMIZATION_DISCOVERY_ENABLED"]
    config.use_transactional_fixtures = true
  else
    config.use_transactional_fixtures = false
    config.use_active_record = false
  end
end
{{< /code-block >}}

After these changes, test discovery can run faster and avoid failures when the database is unavailable during planning.

## Configure Minitest in non-Rails projects

For non-Rails Minitest projects, `ddtest` uses `bundle exec rake test` and passes selected files in the `TEST_FILES` environment variable. Configure your `Rake::TestTask` to read `TEST_FILES`:

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  test.test_files = ENV["TEST_FILES"] ? ENV["TEST_FILES"].split : ["test/**/*.rb"]
end
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
