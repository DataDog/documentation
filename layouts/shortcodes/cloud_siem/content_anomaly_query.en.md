1. In the **Detect anomaly** field, specify the fields whose values you want to analyze.
1. In the **group by** field, specify the fields you want to group by.
    - The defined `group by` generates a signal for each `group by` value.
    - Typically, the `group by` is an entity (like user or IP). The `group by` can also join the queries together.
    - Joining logs that span a time frame can increase the confidence or severity of the security signal. For example, to detect a successful brute force attack, both successful and unsuccessful authentication logs must be correlated for a user.
1. In the **Learn for** dropdown menu, select the number of days for the learning period. During the learning period, the rule sets a baseline of normal field values and does not generate any signals.
    - **Note**: If the detection rule is modified, the learning period restarts at day `0`.