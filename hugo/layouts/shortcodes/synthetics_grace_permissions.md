Use [granular access control][100] to limit who has access to your test based on roles, teams, or individual users:

1. Open the permissions section of the form.
2. Click **Edit Access**.
<figure class="text-center">
<img src="{{ .Site.Params.img_url}}images/synthetics/settings/grace_2.png" alt="Set permissions for your test from Private Locations configuration form" width="100%">
</figure>

3. Click **Restrict Access**.
4. Select teams, roles, or users.
5. Click **Add**.
6. Select the level of access you want to associate with each of them.
7. Click **Done**.

<div class="alert alert-info">You can view results from a Private Location even without Viewer access to that Private Location.</div>

| Access level | View test configuration | Edit test configuration | View test results | Run test  |
| ------------ | ----------------------- | ----------------------- | ------------------| --------- |
| No access    |                         |                         |                   |           |
| Viewer       | Yes                     |                         | Yes               |           |
| Editor       | Yes                     | Yes                     | Yes               | Yes       |

[100]: /account_management/rbac/granular_access
