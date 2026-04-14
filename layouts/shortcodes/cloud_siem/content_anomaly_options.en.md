In the **Content anomaly detection options** section, specify the parameters to assess whether a log is anomalous or not.
- Content anomaly detection balances precision and sensitivity using several rule parameters that you can set:
    1. Similarity threshold: Defines how dissimilar a field value must be to be considered anomalous (default: `70%`).
    1. Minimum similar items: Sets how many similar historical logs must exist for a value to be considered normal (default: `1`).
    1. Evaluation window: The time frame during which anomalies are counted toward a signal (for example, a 10-minute time frame).
- These parameters help to identify field content that is both unusual and rare, filtering out minor or common variations.
- See [Anomaly detection parameters][601] for more information.

[601]: /security/cloud_siem/detect_and_monitor/custom_detection_rules/content_anomaly/#anomaly-detection-parameters