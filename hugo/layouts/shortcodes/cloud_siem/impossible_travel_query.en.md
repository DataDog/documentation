1. In the **User attribute** dropdown menu, select the log attribute that contains the user ID. This can be an identifier like an email address, user name, or account identifier.
1. The **Location attribute** value is automatically set to `@network.client.geoip`.
    - The `location attribute` specifies which field holds the geographic information for a log.
    - The only supported value is `@network.client.geoip`, which is enriched by the [GeoIP parser][801] to give a log location information based on the client's IP address.
1. Click the **Baseline user locations** checkbox if you want Datadog to learn regular access locations before triggering a signal.
    - When selected, signals are suppressed for the first 24 hours. During that time, Datadog learns the user's regular access locations. This can be helpful to reduce noise and infer VPN usage or credentialed API access.
    - See [How the impossible detection method works][802] for more information.

[801]: /logs/log_configuration/processors/?tab=ui#geoip-parser
[802]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/impossible_travel/#how-the-impossible-travel-method-works