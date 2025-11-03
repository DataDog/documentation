1. (Optional) In the **Suppress specific match types to ignore risk-accepted data** section, you can add conditions to ignore certain matches. See [Suppress specific matches to ignore risk-accepted data](#suppress-specific-matches-to-ignore-risk-accepted-data) for more information<br>To add a suppression:
    1. Click **Add New Suppression** and choose a condition:
        - **Match exactly**: For precise values such as, `info@company.org`.
        - **Start with**: For prefixes or ranges. For example: `10.0.0` for all IP ranges under `10.0.0.X`.
        - **End with**: For domains such as `@company.org`.
    1. Enter a value (for example: `@company.org`) and click the plus sign (**+**) to add it.
    1. (Optional) Enter additional suppression terms.
    1. Click **Add New Suppression** to add more suppression conditions to the same rule.