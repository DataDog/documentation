---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Directory check
integration_title: Directory Check
kind: integration
---

### Overview

Capture metrics from the files in given directories:

- number of files
- file size
- age of the last modification
- age of the creation

From the Agent:

* [Directory check script](https://github.com/DataDog/dd-agent/blob/master/checks.d/directory.py)
* [irectory check configuration example](https://github.com/DataDog/dd-agent/blob/master/conf.d/directory.yaml.example)


### Configuration
 *To capture Directory metrics you need to install the Datadog Agent.*

- The Directory check **is not currently supported on Windows systems**.
- Ensure the user account running the Agent (typically `dd-agent`) has read access to the monitored directory and files.
- Configure the Agent to connect to your directories.  
  Edit `/etc/dd-agent/conf.d/directory.yaml`

        init_config:

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
               recursive: True

- Restart the Agent

        sudo /etc/init.d/datadog-agent restart

- Execute the info command

        sudo /etc/init.d/datadog-agent info

    and verify that the check has passed. The output of the command should contain a section similar to the following:

        Checks
        ======

        [...]

        directory
        ---------
            - instance #0 [OK]
            - Collected 8 metrics & 0 events
