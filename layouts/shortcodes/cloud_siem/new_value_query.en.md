1. In the **Detect new value** dropdown menu, select the attributes you want to detect.
    - For example, if you create a query for successful user authentication with the following settings:
        - **Detect new value** is `country`
        - **group by** is `user`
        - Learning duration is `after 7 days`
    <br>Then, logs coming in over the next 7 days are evaluated with those configured values. If a log comes in with a new value after the learning duration (`7 days`), a signal is generated, and the new value is learned to prevent future signals with this value.
    - You can also identify users and entities using multiple **Detect new value** attributes in a single query.
        - For example, if you want to detect when a user signs in from a new device and from a country that they've never signed in from before, add `device_id` and `country_name` to the **Detect new value** field.
1. (Optional) Define a signal grouping in the **group by** dropdown menu.
    - The defined `group by` generates a signal for each `group by` value.
    - Typically, the `group by` is an entity (like user or IP address).
1. In the dropdown menu to the right of **group by**, select the learning duration.
1. (Optional) Define a signal grouping in the **group by** dropdown menu.
    - The defined `group by` generates a signal for each `group by` value.
    - Typically, the `group by` is an entity (like user or IP address).
1. In the dropdown menu to the right of **group by**, select the learning duration.