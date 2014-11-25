---
title: Process check
kind: documentation
sidebar:
  nav:
    - header: Integrations
    - text: Back to System Integrations
      href: "/integrations/system/"
---

<div id="int-overview">
<h3>Overview</h3>
<ul>
  <li>Capture metrics from specific running processes on a system such as CPU %, memory, and I/O.</li>
  <li>Monitor the status of running processes with <a href="/guides/monitoring#process">Process Monitors</a> (<strong>Requires Datadog Agent >= 5.1.0</strong>).</li>
</ul>

</div>

From the Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/process.py">Process check script</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/process.yaml.example">Process check configuration example</a>


<div id="int-configuration">
<h3>Configuration</h3>
 <p><em>To capture Process metrics you need to install the Datadog Agent.</em></p>

<ol>
  <li>Configure the Agent to connect to your processes. Our example configuration
  will monitor the <code>sshd</code> and <code>postgres</code> processes.
      <p>Edit <code>/etc/dd-agent/conf.d/process.yaml</code></p>
        <pre class="textfile"><code>init_config:

instances:
   - name: ssh
     search_string: ['ssh', 'sshd']

   - name: postgres
     search_string: ['postgres']</code></pre>
  </li>

  <li>Restart the Agent
        <pre class="linux"><code>sudo /etc/init.d/datadog-agent restart</code></pre>
  </li>

  <li>Execute the info command
    <pre class="linux"><code>sudo /etc/init.d/datadog-agent info</code></pre>
    and verify that the check has passed. The output of the command should contain a section similar to the following:

     <pre class="verification"><code>  Checks
  ======

  [...]

  process
  ---------
      - instance #0 [OK]
      - Collected 8 metrics &amp; 0 events &amp; 4 service checks</code></pre>
  </li>

</ol>
</div>
