<!--
This partial contains instructions for enabling RUM with the .NET MAUI SDK.
-->

Call `DdRum.Enable` (or use the `UseDatadogRum` builder extension) after the SDK is initialized:

```csharp
DdRum.Enable(new DdRumConfiguration { ApplicationId = "<APPLICATION_ID>" });
```

When RUM is enabled, the SDK automatically tracks views, user interactions, network requests, and errors.
