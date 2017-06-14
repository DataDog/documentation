---
title: Directory check
integration_title: Directory Check
kind: integration
newhlevel: true
---
# Overview

Capture metrics from the files in given directories:

  * number of files
  * file size
  * age of the last modification
  * age of the creation



# Configuration

*To capture Directory metrics you need to install the Datadog Agent.*

2.  Ensure the user account running the Agent (typically `dd-agent`) has read access to the monitored directory and files.
3.  Configure the Agent to connect to your directories. Edit `directory.yaml` in your `conf.d` directory.

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
            # "countonly" - boolean, when true the stats will only count the number of files matching the pattern. Useful for very large directories.


            -  directory: "/path/to/directory"
               name: "tag_name"
               pattern: "*.log"
               recursive: True
    {:.language-yaml}

4.  Restart the Agent

{{< insert-example-links conf="directory" check="directory" >}}

# Validation

To validate that the check has passed run the agent info command. The output of the command should contain a section similar to the following:

    Checks
    ======

    [...]

    directory
    ---------
        - instance #0 [OK]
        - Collected 8 metrics & 0 events

