If your Lambda functions are deployed in a Virtual Private Cloud (VPC) without access to the public internet, and you are using the `datadoghq.com` [Datadog site][2002], you can [use AWS PrivateLink][2001] to send data.

If your Lambda functions are deployed in a VPC, and you are using a [Datadog site][2002] that is **not** `datadoghq.com`, you can [use a proxy][2003] to send data.

[2001]: /agent/guide/private-link/
[2002]: /getting_started/site/
[2003]: /agent/configuration/proxy/
