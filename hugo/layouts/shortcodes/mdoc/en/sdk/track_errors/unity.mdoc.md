### Track custom errors

To track specific errors, notify `DdRum` when an error occurs with the exception, the source, and any additional attributes.

```csharp
try
{
  // Error prone code
}
catch(Exception e)
{
  DatadogSdk.Instance.Rum.AddError(e, RumErrorSource.Source);
}
```

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/unity/setup/
[3]: /real_user_monitoring/application_monitoring/unity/data_collected/
