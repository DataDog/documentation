- Your user account must be able to create resources in the compartment.
- [Datadog API Key][201] value
- Username and auth token for a user with the `REPOSITORY_READ` and `REPOSITORY_UPDATE` permissions to pull and push images to a Docker repo.
    - See [Getting an Auth Token][202] to find out how to create an auth token.
    - See [Policies to Control Repository Access][203] for more information on the required policies.

**Note**: To verify the Docker registry login is correct, see [Logging in to Oracle Cloud Infrastructure Registry][204].

[201]: /organization-settings/api-keys
[202]: https://docs.oracle.com/iaas/Content/Registry/Tasks/registrygettingauthtoken.htm
[203]: https://docs.oracle.com/iaas/Content/Registry/Concepts/registrypolicyrepoaccess.htm#Policies_to_Control_Repository_Access
[204]: https://docs.oracle.com/iaas/Content/Functions/Tasks/functionslogintoocir.htm