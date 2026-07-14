---
title: Test Parallelization Troubleshooting
description: Troubleshoot Test Parallelization plan artifacts, CI node selection, skippable tests, and custom commands.
further_reading:
  - link: "/tests/test_parallelization/setup/"
    tag: "Documentation"
    text: "Set up Test Parallelization"
  - link: "/tests/test_parallelization/configuration/"
    tag: "Documentation"
    text: "Configure Test Parallelization"
  - link: "/tests/troubleshooting/"
    tag: "Documentation"
    text: "Troubleshooting Test Optimization"
---

{{< callout url="https://www.datadoghq.com/product-preview/test-parallelization/" btn_hidden="false" header="Join the Preview!" >}}
Test Parallelization is in Preview. Complete the form to request access.
{{< /callout >}}

## Missing or invalid plan artifacts

If `ddtest run --ci-node <N>` cannot find assigned test files, confirm that the `.testoptimization/` directory from the planning job is available in the test job.

The test job must have access to:

- `.testoptimization/manifest.txt`
- `.testoptimization/runner/parallel-runners.txt`
- `.testoptimization/runner/tests-split/runner-N`

When using GitHub Actions, upload `.testoptimization/` with `include-hidden-files: true`; otherwise, the artifact upload can omit the hidden directory.

## Unexpected CI node or worker count

If `ddtest` selects more or fewer CI nodes than expected, review these settings:

- `--min-parallelism`: Minimum CI node or worker count considered by `ddtest`.
- `--max-parallelism`: Maximum CI node or worker count considered by `ddtest`.
- `--ci-job-overhead`: Estimated overhead for launching an additional CI node.
- `--target-time`: Target wall time for the selected split.

Increase `--ci-job-overhead` to prefer fewer CI nodes. Decrease it to prefer faster wall-clock time.

## No skippable tests are applied

If Test Impact Analysis does not skip tests before Test Parallelization runs, check that:

- Test Impact Analysis is enabled for the test service.
- The `git` executable is present, and you run `ddtest` in a Git repository with a `.git` folder.
- The job that runs `ddtest plan` and the job that runs tests use the same `DD_SERVICE` value.
- `ddtest plan` runs on the same OS and language runtime as your tests.

For more information, see [Test Impact Analysis troubleshooting][1].

## Minitest does not run the selected files

For non-Rails Minitest projects, `ddtest` uses `bundle exec rake test` and passes the selected files in the `TEST_FILES` environment variable. Your `Rake::TestTask` must read `TEST_FILES`:

{{< code-block lang="ruby" >}}
Rake::TestTask.new(:test) do |test|
  test.test_files = ENV["TEST_FILES"] ? ENV["TEST_FILES"].split : ["test/**/*.rb"]
end
{{< /code-block >}}

## Custom commands do not run the expected files

When using `--command`, do not include test files or the `--` separator in the command. `ddtest` appends the selected test files itself.

Incorrect:

{{< code-block lang="bash" >}}
bin/ddtest run --command "bundle exec rspec -- spec/models/"
{{< /code-block >}}

Correct:

{{< code-block lang="bash" >}}
bin/ddtest run --platform ruby --framework rspec --command "bundle exec rspec"
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tests/test_impact_analysis/troubleshooting/
