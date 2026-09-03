### Set a custom global attribute

To set a custom global attribute, use `RUMMonitor.shared().addAttribute(forKey:value:)`.

* To add an attribute, use `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<VALUE>")`.
* To update the value, use `RUMMonitor.shared().addAttribute(forKey: "<KEY>", value: "<UPDATED_VALUE>")`.
* To remove the key, use `RUMMonitor.shared().removeAttribute(forKey: "<KEY_TO_REMOVE>")`.

For better performance in bulk operations (modifying multiple attributes at once), use `.addAttributes(_:)` and `.removeAttributes(forKeys:)`.

**Note**: You can't create facets on custom attributes if you use spaces or special characters in your key names. For example, use `forKey: "store_id"` instead of `forKey: "Store ID"`.

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/ios
[6]: /real_user_monitoring/application_monitoring/ios/data_collected/?tab=session#default-attributes
