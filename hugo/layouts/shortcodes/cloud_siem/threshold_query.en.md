1. (Optional) In the **Count** dropdown menu, select attributes whose unique values are counted over the specified time frame.
1. (Optional) In the **group by** dropdown menu, select attributes you want to group by.
    - The defined `group by` generates a signal for each `group by` value.
    - Typically, the `group by` is an entity (like user, or IP). The `group by` is also used to join the queries together.
    - Joining logs that span a time frame can increase the confidence or severity of the security signal. For example, to detect a successful brute force attack, both successful and unsuccessful authentication logs must be correlated for a user.