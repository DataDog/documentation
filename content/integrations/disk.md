---
title: Datadog-Disk Integration
integration_title: Disk Check
kind: integration
newhlevel: true
platformmetrics:
  system.disk.read_time_pct:
    - Windows
  system.disk.write_time_pct:
    - Windows
---

# Overview

Get metrics related to disk usage and IO metrics.

# Installation

Included by default with the Datadog agent installation.

# Configuration


This configuration does not require any explicit configuration to begin monititoring your storage devices.  One however can override the default settings to adjust how disks are monitored.

    init_config:

    instances:
      # The use_mount parameter will instruct the check to collect disk
      # and fs metrics using mount points instead of volumes
      - use_mount: no
      # The (optional) excluded_filesystems parameter will instruct the check to
      # ignore disks using these filesystems
      # excluded_filesystems:
      #   - tmpfs

      # The (optional) excluded_disks parameter will instruct the check to
      # ignore this list of disks
      # excluded_disks:
      #   - /dev/sda1
      #   - /dev/sda2
      #
      # The (optional) excluded_disk_re parameter will instruct the check to
      # ignore all disks matching this regex
      # excluded_disk_re: /dev/sde.*
      #
      # The (optional) tag_by_filesystem parameter will instruct the check to
      # tag all disks with their filesystem (for ex: filesystem:nfs)
      # tag_by_filesystem: no
      #
      # The (optional) excluded_mountpoint_re parameter will instruct the check to
      # ignore all mountpoints matching this regex
      # excluded_mountpoint_re: /mnt/somebody-elses-problem.*
      #
      # The (optional) all_partitions parameter will instruct the check to
      # get metrics for all partitions. use_mount should be set to yes (to avoid
      # collecting empty device names) when using this option.
      # all_partitions: no
{:.language-yaml}

# Validation

To ensure the integration is installed correctly, run the agent info command.

    sudo /etc/init.d/datadog-agent info

You should see something similar to the following if everything is working correctly:

    Checks
    ======

      [...]

      disk
      ------
          - instance #0 [OK]
          - Collected 8 metrics & 0 events


# Metrics

<%= get_metrics_from_git('system', 'system.disk, system.fs') %>

