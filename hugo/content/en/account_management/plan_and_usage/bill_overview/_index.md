## Permissions

The following permissions are required to access each section of Bill Overview:

| Section | Required permission |
|---|---|
| Bill Overview (cost data) | `BILLING_READ` |
| Usage Tab | `USAGE_READ` |
| Plan Details | `BILLING_READ` + `CONTRACT_READ` |
| Billing History | `BILLING_READ` + `CONTRACT_READ` |
| Usage Attribution | `USAGE_READ` + Enterprise or Pro plan |
| Sub-org cost trends | Parent org must have `suborg_cost_trends` enabled |

### Contract information
`CONTRACT_READ` was introduced in October 2026 and was granted automatically to every role that held `BILLING_READ` at that time. No user lost access when the permission was introduced. Users with the Datadog Admin role have `CONTRACT_READ` by default.

To restrict who can see contract information, remove `CONTRACT_READ` from the roles that should not have it and leave `BILLING_READ` in place. Those users retain access to cost and usage data and lose access to {{< ui >}}Plan Details{{< /ui >}} and {{< ui >}}Billing History{{< /ui >}}.

For information on managing permissions, see [Role Based Access Control][3].
