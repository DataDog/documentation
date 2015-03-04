---
title: Process check
sidebar:
  nav:
    - header: Integrations
    - text: Back to System Integrations
      href: "/ja/integrations/system/"
---
<div id="int-overview">
<h3>Overview</h3>
<p>Capture metrics from specific running processes on a system such as CPU %, I/O metrics, etc.</p>

</div>

From the Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/process.py">Process check script</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/process.yaml.example">Process check configuration example</a>


<div id="int-configuration">
<h3>Configuration</h3>
 <p><em>To capture Process metrics you need to install the Datadog Agent.</em></p>

<ol>
  <li>Install  <b><a href="https://pypi.python.org/pypi/psutil/1.2.1">v1.2.1 of the psutil</a> Python library</b>. The easiest way to install psutil from sources is using easy_install:
    <pre class="code-block code-block-console" lang="console"><code class="">easy_install psutil</code></pre>
  </li>
  <li>Configure the Agent to connect to your processes.
  
      Edit <code>/etc/dd-agent/conf.d/process.yaml</code>
        <pre class="textfile"><code>init_config:

  instances:
  #  - name: (required) STRING. It will be used to uniquely identify your metrics as
  #          they will be tagged with this name
  #    search_string: (required) LIST OF STRINGS. If one of the elements in the list matches,
  #                    return the counter of all the processes that contain the string
  #    exact_match: (optional) Boolean. Default to False, if you want to look for an
  #                 arbitrary string, use exact_match: False, unless use the exact base name
  #                 of the process
  #    cpu_check_interval: (optional) CPU percent check interval: 0.1 - 1.0 sec.
  #
  # Examples:
  #
   - name: ssh
     search_string: ['ssh', 'sshd']

   - name: postgres
     search_string: ['postgres']

   - name: All
     search_string: ['All']</code></pre>
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
      - Collected 8 metrics & 0 events</code></pre>
  </li>

</ol>
</div>
