---
title: Setup Tracing on a GitLab Pipeline
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---


To enable traces for your GitLab CI pipelines a [native integration][1] is available and hidden under a [feature flag][2] since release `13.7.0`.

If you are a GitLab.com user and you want to early-adopt this integration, [open a support ticket][3] with GitLab requesting that the Datadog integration be enabled in your account.

If you manage your own GitLab installation and your version is recent enough, you can enable the feature flag yourself by executing the following commands that use GitLab's [Rails Runner][4] depending on your installation type:

For Omnibus installations:
```
sudo gitlab-rails runner "Feature.enable(:datadog_ci_integration)"
```
For installations from source:
```
sudo -u git -H bundle exec rails runner -e production "Feature.enable(:datadog_ci_integration)"
```
For [Kubernetes deployments][5]:
```
kubectl exec -it <task-runner-pod-name> -- /srv/gitlab/bin/rails runner "Feature.enable(:datadog_ci_integration)"
```

Once the feature flag is enabled, configure the integration on a per project basis by going to **Settings > Integrations > Datadog** for each project you want to instrument. Mark it as active and paste a valid [API key][6].

__Note:__ Only `datadoghq.com` is currently supported.

There are a couple of optional parameters:
- _service_: Sets the service name for all traces for this GitLab instance. Defaults to `gitlab-ci`. Useful if you're using more than one GitLab instance.
- _env_: Sets the environment tag for all traces for this GitLab instance. Useful in advanced setups where grouping GitLab instances per environment is required.

Test the integration with the *Test settings* button. After it's successful, click *Save changes* to finish the integration set up.

## Integrating through webhooks

As an alternative to using the native Datadog integration, you can use [webhooks][7] to send pipeline data to Datadog.

**Note**: The native Datadog integration is the recommended approach and the one that is actively under development. Use webhooks only if the native Datadog integration option is not available to you (for example, you have an older GitLab version and you're not able to upgrade).

Go to **Settings > Webhooks** in your repository (or GitLab instance settings), and add a new webhook:
* **URL**: `https://webhooks-http-intake.logs.datadoghq.com/v1/input/<API_KEY>` where `<API_KEY>` is available [here][6].
* **Secret Token**: leave blank
* **Trigger**: Select `Job events` and `Pipeline events`.

To set custom `env` or `service` parameters, use query parameters in the webhooks URL: `?env=<YOUR_ENV>&service=<YOUR_SERVICE_NAME>`

## Visualize pipeline data in Datadog

After the integration is successfully configured, both [Pipelines][8] and [Pipeline Executions][9] pages will start populating with data after pipelines finish.

**Note**: The Pipelines page shows data for only the default branch of each repository.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.gitlab.com/ee/integration/
[2]: https://docs.gitlab.com/ee/administration/feature_flags.html
[3]: https://support.gitlab.com/
[4]: https://docs.gitlab.com/ee/administration/operations/rails_console.html#using-the-rails-runner
[5]: https://docs.gitlab.com/ee/administration/troubleshooting/kubernetes_cheat_sheet.html#gitlab-specific-kubernetes-information
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://docs.gitlab.com/ee/user/project/integrations/webhooks.html
[8]: https://app.datadoghq.com/ci/pipelines
[9]: https://app.datadoghq.com/ci/pipeline-executions
