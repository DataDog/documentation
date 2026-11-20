1. In the **Action on Match** section, select if you want to scan the **Entire Event** or **Specific Attributes**. See [Scan or exclude specific-attributes](#scan-or-exclude-specific-attributes) on how to make pattern matching more precise.
    - If you are scanning the entire event, you can optionally exclude specific attributes from getting scanned.
    - If you are scanning specific attributes, specify which attributes you want to scan.
1. For **Define actions on match**, select the action you want to take for the matched information. **Note**: Redaction, partial redaction, and hashing are all irreversible actions.
    - **Redact**: Replaces all matching values with the text you specify in the **Replacement text** field.
    - **Partially Redact**: Replaces a specified portion of all matched data. In the **Redact** section, specify the number of characters you want to redact and which part of the matched data to redact.
    - **Hash**: Replaces all matched data with a unique identifier. The UTF-8 bytes of the match is hashed with the 64-bit fingerprint of FarmHash.
    - **Mask** (available for logs only): Obfuscates all matching values. Users with the `Data Scanner Unmask` permission can de-obfuscate (unmask) and view this data. See [Mask action](#mask-action) for more information.
1. (Optional) Add tags you want to associate with events where the values match the specified regex pattern.
    - Datadog recommends using `sensitive_data` and `sensitive_data_category` tags. These tags can then be used in searches, dashboards, and monitors.
    - See [Control access to logs with sensitive data](#control-access-to-logs-with-sensitive-data) for information on how to use tags to determine who can access logs containing sensitive information.