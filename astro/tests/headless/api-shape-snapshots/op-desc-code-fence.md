<!-- op-desc-code-fence: /api/latest/rendering-shapes/get-available-fields-for-usage-summary/ -->

### Overview

List the field names returned by `GET /api/v1/usage/summary` at each of its
three response levels. Each list contains every key the data endpoint
emits—both typed fields declared in the OpenAPI spec and untyped keys
exposed through `additionalProperties` (the latter used for billing
dimensions and usage types added after the v1 schema freeze).

This endpoint is only accessible for [parent-level organizations](https://docs.datadoghq.com/account_management/multi_organization.md).

Go example:

```go
fields, _, err := api.GetUsageSummaryAvailableFields(ctx)
attr := fields.Data.GetAttributes()

// resp is the *UsageSummaryResponse returned by api.GetUsageSummary(ctx, ...)
// Layer 1: UsageSummaryResponse
for _, key := range attr.GetResponseFields() {
    if val, ok := resp.AdditionalProperties[key]; ok {
        fmt.Println(key, val.(json.Number))
    }
}
// Layer 2: UsageSummaryDate (per month)
for _, date := range resp.GetUsage() {
    for _, key := range attr.GetDateFields() {
        if val, ok := date.AdditionalProperties[key]; ok {
            fmt.Println(key, val.(json.Number))
        }
    }
    // Layer 3: UsageSummaryDateOrg (per org per month)
    for _, org := range date.GetOrgs() {
        for _, key := range attr.GetDateOrgFields() {
            if val, ok := org.AdditionalProperties[key]; ok {
                fmt.Println(key, val.(json.Number))
            }
        }
    }
}
```
