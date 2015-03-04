---
title: Directory check
sidebar:
  nav:
    - header: Integrations
    - text: Back to System Integrations
      href: "/ja/integrations/system/"
---
<div id="int-overview">
<h3>Overview</h3>
<p>Capture metrics from the files in given directories:
  <ul>
    <li>
      number of files
    </li>
    <li>
      file size
    </li>
    <li>
      age of the last modification
    </li>
    <li>
      age of the creation
    </li>
  </ul>
</p>
</div>

From the Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/directory.py">Directory check script</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/directory.yaml.example">Directory check configuration example</a>


<div id="int-configuration">
<h3>Configuration</h3>
 <p><em>To capture Directory metrics you need to install the Datadog Agent.</em></p>

<ol>
  <li>The Directory check <b>is not currently supported on Windows systems</b>.</li>
  <li>Ensure the user account running the Agent (typically <code>dd-agent</code>) has read access to the monitored directory and files.</li>
  <li>Configure the Agent to connect to your directories.
      Edit <code>/etc/dd-agent/conf.d/directory.yaml</code>
        <pre class="textfile"><code>init_config:

instances:
    # For each instance, the 'directory' parameter is required, all others are optional.
    #
    # Instances take the following parameters:
    # "directory" - string, the directory to monitor. Required.
    # "name" - string, tag metrics with specified name. defaults to the "directory"
    # "pattern" - string, the `fnmatch` pattern to use when reading the "directory"'s files.
    #                     default "*"
    # "recursive" - boolean, when true the stats will recurse into directories. default False

    -  directory: "/path/to/directory"
       name: "tag_name"
       pattern: "*.log"
       recursive: True </code></pre>
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

  directory
  ---------
      - instance #0 [OK]
      - Collected 8 metrics & 0 events</code></pre>
  </li>

</ol>
</div>
