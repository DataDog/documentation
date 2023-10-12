### Activate Intelligent Test Runner for the test service

You, or a user in your organization with the **Intelligent Test Runner Activation** (`intelligent_test_runner_activation_write`) permission, must activate the Intelligent Test Runner on the [Test Service Settings][101] page.

<div class="shortcode-wrapper shortcode-img expand"><figure class="text-center"><a href="https://datadog-docs.imgix.net/images/continuous_integration/itr_overview.03793aa7ffdec7d28903b5d3c9d9c32d.png?fit=max&amp;auto=format" class="pop" data-bs-toggle="modal" data-bs-target="#popupImageModal"><picture><img class="img-fluid" srcset="https://datadog-docs.imgix.net/images/continuous_integration/itr_overview.03793aa7ffdec7d28903b5d3c9d9c32d.png?auto=format" alt="Intelligent test runner enabled in test service settings in the CI section of Datadog."></picture></a></figure></div>

### Application key and permissions

The Intelligent Test Runner requires an [application key][102] mapped to an owner [role][103] with the **CI Visibility Read** (`ci_visibility_read`) permission.

For more information on roles and permissions, see the CI Visibility section of the [Datadog Role Permissions documentation][104].

[101]: https://app.datadoghq.com/ci/settings/test-service
[102]: https://app.datadoghq.com/organization-settings/application-keys
[103]: https://app.datadoghq.com/organization-settings/roles
[104]: /account_management/rbac/permissions/#ci-visibility
