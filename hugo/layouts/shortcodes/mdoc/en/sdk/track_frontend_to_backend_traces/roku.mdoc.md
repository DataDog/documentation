### Setup

**Note**: Configuring RUM and Traces makes use of APM paid data in RUM, which may impact your APM billing.

{% site-region region="gov,gov2" %}
{% alert level="danger" %}
RUM for Roku is not available on the {% region-param key="dd_datacenter" /%} Datadog site.
{% /alert %}
{% /site-region %}

1. Set up [RUM Roku Monitoring][1].

2. Use the `datadogroku_DdUrlTransfer` component to perform your network requests.
    ```text
        ddUrlTransfer = datadogroku_DdUrlTransfer(m.global.datadogRumAgent)
        ddUrlTransfer.SetUrl(url)
        ddUrlTransfer.EnablePeerVerification(false)
        ddUrlTransfer.EnableHostVerification(false)
        result = ddUrlTransfer.GetToString()
    ```

[1]: /real_user_monitoring/application_monitoring/roku/setup/
