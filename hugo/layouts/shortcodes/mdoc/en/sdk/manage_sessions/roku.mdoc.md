## Configure the session sample rate

The session sample rate controls the percentage of RUM sessions sent to Datadog. Set `sessionSampleRate` to an integer between 0 and 100 when you initialize the SDK. The default is 100, which keeps all sessions.

```vb.net
datadogroku_initialize({
    clientToken: "<CLIENT_TOKEN>",
    applicationId: "<APPLICATION_ID>",
    site: "{% region-param key="roku_site" /%}",
    env: "<ENV_NAME>",
    sessionSampleRate: 100,
    launchArgs: args
})
```

You can adjust the session sample rate, but Datadog recommends using [retention filters][1] to control retained volume.

[1]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
