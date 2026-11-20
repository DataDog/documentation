We support auto-instrumentation for the following CI providers:
| CI Provider | Auto-Instrumentation method |
|---|---|
| GitHub Actions | [Datadog Test Visibility Github Action][1] |
| Jenkins | [UI-based configuration][2] with Datadog Jenkins plugin |
| GitLab | [Datadog Test Visibility GitLab Script][3] |
| CircleCI | [Datadog Test Visibility CircleCI Orb][4] |

Auto-instrumentation runs on the CI executor and does not automatically apply to tests in a separate container. Before using it for containerized tests, see [Tests in Containers][5].

If the auto-instrumentation step configures the process that runs your tests, you can skip the rest of the setup steps below.

[1]: https://github.com/marketplace/actions/configure-datadog-test-visibility
[2]: /continuous_integration/pipelines/jenkins/#enable-test-optimization
[3]: https://github.com/DataDog/test-visibility-gitlab-script
[4]: https://circleci.com/orbs/registry/orb/datadog/test-visibility-circleci-orb
[5]: /tests/containers/#choose-an-instrumentation-method
