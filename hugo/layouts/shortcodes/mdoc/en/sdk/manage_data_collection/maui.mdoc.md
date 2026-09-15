### Stop the current session

Call `DdRum.StopSession` to terminate the current RUM session. A new session is created the next time an event is recorded (for example, a new view or a tap).

```csharp
DdRum.StopSession();
```
