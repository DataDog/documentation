---
title: Datadog-VictorOps Integration
integration_title: VictorOps
kind: integration
doclevel: basic
---

### Enable Datadog integration on VictorOps

1. On your VictorOps settings page, click "Integrations"
2. Click "Datadog", then "Enable Integration"
3. Copy your key
4. Back to Datadog, paste the API key in the next section here

### VictorOps Routing Keys

Direct alerts to certain VictorOps users
Please list all the routing keys to be used on Datadog (if none are set up here, VictorOps will send the alert to the default group).

You will then be able to choose which VictorOps endpoint should receive the alert by using @victorops

Special characters are not allowed in the names. Upper/lower case letters, numbers, '_' and '-' are allowed.

### Choose a custom endpoint

If this field is left empty, the default endpoint will be 'https://alert.victorops.com/integrations/datadog/20140523/alert'
