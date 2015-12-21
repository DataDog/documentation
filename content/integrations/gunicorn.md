---
title: Datadog-Gunicorn Integration
integration_title: gunicorn
kind: integration
---

To capture Gunicorn metrics you need to install the Datadog Agent.

1. If you are using the Datadog Agent < 5.0.0, please look at the old documentation for more detailed instructions. The following instructions are for the Datadog Agent >= 5.0.0
2. Configure the Agent to connect to Gunicorn
Edit conf.d/gunicorn.yaml

        init_config:

        instances:
            -   proc_name: my_web_app


3. Restart the Agent
4. Execute the info command and verify that the integration check has passed.The output of the command should contain a section similar to the following:

        Checks
        ======

          [...]

          gunicorn
          --------
              - instance #0 [OK]
              - Collected 8 metrics & 0 events

Not sure how to execute the last two steps? Visit the Agent Usage Guide for more detailed instructions.
