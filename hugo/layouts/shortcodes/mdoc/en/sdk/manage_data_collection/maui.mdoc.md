To configure tracking consent, see the **Configure tracking consent (GDPR compliance)** step in [Install the Datadog SDK][1].

### Stop the current session

Call `DdRum.StopSession` to terminate the current RUM session. A new session is created the next time an event is recorded (for example, a new view or a tap).

```csharp
DdRum.StopSession();
```

[1]: /real_user_monitoring/setup/install/?platform=maui
