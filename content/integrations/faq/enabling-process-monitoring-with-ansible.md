---
title: Enabling Process Monitoring in Ansible
kind: faq
---

In the same directory as a playbook, create a file named `process_agent.yaml`with the following contents:

```
init_config:
  enabled: true
instances:
  - {}
```

Sample playbook that copies the file to the appropriate directory and restarts the agent.

```
- hosts: all
  become: yes
  roles:
    - { role: Datadog.datadog, become: yes } 
  vars:
    datadog_api_key: "API_KEY"
    datadog_agent6: true
    datadog_config:
        process_agent_enabled: true
  tasks:
  - copy:
      src: process_agent.yaml
      dest: /etc/datadog-agent/conf.d/process_agent.yaml
      mode: 0777
  - name: Restart datadog-agent after copying config file
    command: systemctl restart datadog-agent
```