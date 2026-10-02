## Configure the session sample rate

The session sample rate controls the percentage of RUM sessions sent to Datadog. Set the {% ui %}Session Sample Rate{% /ui %} to a value between 0 and 100 in the Datadog section of your {% ui %}Project Settings{% /ui %} in Unity. A value of 100 keeps all sessions.

You can adjust the session sample rate, but Datadog recommends using [retention filters][1] to control retained volume.

[1]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
