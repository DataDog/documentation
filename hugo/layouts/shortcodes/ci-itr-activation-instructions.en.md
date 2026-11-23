### Enable Test Impact Analysis

You, or a user in your organization with the `Test Optimization Settings Write` permission, must enable Test Impact Analysis in the CI/CD Optimization settings:

1. Open [**CI/CD Optimization** > **Settings** > **Repositories**][101].
1. Choose where to apply the setting:
   - Select the **Organization** tab to enable Test Impact Analysis for every repository by default.
   - Select the **Repository-specific** tab to enable Test Impact Analysis for a single repository, or to apply an override to one of its test services.
1. Under **General**, toggle **Test Impact Analysis** on.

<figure class="text-center">
<img src="{{ .Site.Params.img_url}}images/getting_started/intelligent_test_runner/test-impact-analysis-gs-configuration-1.png" alt="The Test Impact Analysis toggle turned on in the Organization tab of the CI/CD Optimization Repositories settings page." width="100%">
</figure>

[101]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
