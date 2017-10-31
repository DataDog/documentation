---
title: How do I monitor Windows Processes?
kind: faq
customnav: agentnav
---

You can monitor Windows processes via the [process integration](http://docs.datadoghq.com/integrations/process/). To set this up on Windows, select the "Process" integration from the list of integrations in the Datadog Agent Manager and edit the configuration.

For example, to monitor Notepad, your config file would include:

```yaml
init_config:
instances:
- name: notepad
  search_string: ['notepad.exe']
```

When adding your own processes, be sure to follow the formatting exactly as shown - if formatting is not correct it will cause the integration to fail.

When you're done editing the file, press "Save" to save it, then "Enable" to enable it.

Any time you modify a Datadog integration you’ll need to restart the Datadog Agent service. You can do this by clicking the "Actions" button in the top left corner, then selecting "Restart", or you can restart "Datadog Agent" in your Services Management Snap-in Console (services.msc).

To verify that your Process check is working, click on "Logs and Status", then "Agent Status". Scroll down to the "Checks" section and you should see "process" reporting on each process instance you have setup in your config file.

Again, due to the sensitivity of yaml, if you've tried the above and cannot get it to work, use the attached file to get yourself started and confirm your syntax.

