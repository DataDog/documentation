---
title: Setup Tracing on a Gitlab Pipeline
kind: documentation
further_reading:
    - link: "/ci/filename/"
      tag: "Documentation"
      text: "linktext"
---


To enable traces for your GitLab CI pipelines a [native integration][1] has been merged into GitLab and is hidden under a [feature flag][2] since release `13.7.0`.

If you are a GitLab.com user and you want to early-adopt this integration, reach out to us so we enable it for your Gitlab account.

If you manage your own GitLab installation and your version is recent enough, you can enable the feature flag yourself by executing the following commands that use GitLab's [Rails Runner][3] depending on your installation type:

For Omnibus installations:
```
sudo gitlab-rails runner "Feature.enable(:datadog_ci_integration)"
```
For installations from source:
```
sudo -u git -H bundle exec rails runner -e production "Feature.enable(:datadog_ci_integration)"
```
For [Kubernetes deployments][4]:
```
kubectl exec -it <task-runner-pod-name> -- /srv/gitlab/bin/rails runner "Feature.enable(:datadog_ci_integration)"
```

Once the feature is enabled, configuring the integration is as easy as going to the page for the Datadog integration at any level:
- On a per project basis, by going to the *Settings > Integrations > Datadog* section of each project.
- For all the projects in your GitLab installation, by going to *Settings > Integrations > Datadog* section of the Admin area.

Mark it as active and paste a valid API key. If you do not have an API key you can create one [here][5].

__Note:__ Only `datadoghq.com` is currently supported.

There are a couple of optional parameters:
- __service__: Sets the service name for all traces for this GitLab instance. Defaults to `gitlab-ci`. Only useful if there are more than one GitLab instance.
- __env__: Sets the environment tag for all traces for this GitLab instance. Only useful in advanced setups where grouping GitLab instances per environment is required.

The integration can be tested with the *Test settings* button. After it's successful, click *Save changes* to finish the integration set up.


## Integrating through webhooks

If you are not using a version of GitLab that is recent enough to make the native integration available, you can still have traces for your pipelines by configuring the webhooks yourself. You need to configure the following webhooks in your GitLab site or repository:
- Job Events
- Pipeline Events

Use the following webhooks URL:
```
https://webhooks-http-intake.logs.datadoghq.com/v1/input/<API_KEY>
```
You can create an API key [here][5].

You can make use of the same optional parameters that the native integration has, if you include them as query parameters in the webhook URL: `?env=(your-env)&service=(your-service-name)`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://gitlab.com/gitlab-org/gitlab/-/merge_requests/46564
[2]: https://docs.gitlab.com/ee/administration/feature_flags.html
[3]: https://docs.gitlab.com/ee/administration/operations/rails_console.html#using-the-rails-runner
[4]: https://docs.gitlab.com/ee/administration/troubleshooting/kubernetes_cheat_sheet.html#gitlab-specific-kubernetes-information
[5]: https://app.datadoghq.com/account/settings#api
