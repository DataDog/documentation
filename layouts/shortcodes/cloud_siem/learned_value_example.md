As an example, if you created a query for successful user authentication with the following settings:
- **Detect new value** is `country`
- **group by** is `user`
- Learning duration is `after 7 days`

Logs coming in over the next 7 days are evaluated with those configured values. If a log comes in with a new value after the learning duration (`7 days`), a signal is generated, and the new value is learned to prevent future signals with this value.

You can also identify users and entities using multiple **Detect new value** attributes in a single query. For example, if you want to detect when a user signs in from a new device and from a country that they've never signed in from before, add `device_id` and `country_name` to **Detect new value**.