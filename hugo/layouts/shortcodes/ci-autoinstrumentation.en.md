We support auto-instrumentation for the following CI providers:
| CI Provider | Auto-Instrumentation method |
|---|---|
| GitHub Actions | [Datadog Test Visibility Github Action][1] |
| Jenkins | [UI-based configuration][2] with Datadog Jenkins plugin |
| GitLab | [Datadog Test Visibility GitLab Script][3] |
| CircleCI | [Datadog Test Visibility CircleCI Orb][4] |

Auto-instrumentation cannot cross a container boundary. If your CI job launches tests in a separate container, use manual instrumentation unless the job builds the test image after the auto-instrumentation step. For more information, see [Tests in Containers][5].

If you are using auto-instrumentation for one of these providers, you can skip the rest of the setup steps below.

[1]: https://github.com/marketplace/actions/configure-datadog-test-visibility
[2]: /continuous_integration/pipelines/jenkins/#enable-test-optimization
[3]: https://github.com/DataDog/test-visibility-gitlab-script
[4]: https://circleci.com/orbs/registry/orb/datadog/test-visibility-circleci-orb
[5]: /tests/containers/#choose-an-instrumentation-method
