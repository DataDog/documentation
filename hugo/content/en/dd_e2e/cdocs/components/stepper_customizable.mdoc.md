---
title: Stepper test (customizable page)
draft: true
private: true
content_filters:
  - trait_id: prog_lang
    option_group_id: dd_e2e_backend_prog_lang_options
  - trait_id: database
    option_group_id: dd_e2e_database_options
---

## Overview

This is a test page used to verify stepper scroll behavior on a customizable
page. Because the page defines `content_filters`, it renders the sticky Cdocs
filter bar below the header. When you navigate between steps, the new step title
must scroll clear of both the header and the sticky filter bar.

The first step is intentionally long so that advancing to the next step forces a
scroll, letting you confirm the title lands below the sticky region.

## Stepper component

{% stepper %}

{% step title="Install the database" %}
Run the following command to install FakeDB:

```shell
curl -fsSL https://fakedb.example.com/install.sh | bash
```

After the installation completes, verify that FakeDB is running:

```shell
fakedb --version
```

### System requirements

Before you install FakeDB, make sure your system meets the following requirements:

- **Operating system**: Linux (kernel 4.15+), macOS 12+, or Windows 10+
- **CPU**: x86_64 or ARM64
- **Memory**: At least 2 GB of available RAM
- **Disk space**: At least 500 MB of free disk space for the binary and initial data directory
- **Network**: Outbound access to `fakedb.example.com` on port 443 during installation

### What the installer does

The one-line installer performs the following steps:

1. Downloads the latest stable FakeDB binary for your platform
2. Verifies the download signature using GPG
3. Copies the binary to `/usr/local/bin/fakedb`
4. Creates the default data directory at `~/.fakedb/data`
5. Writes a default configuration file to `~/.fakedb/fakedb.conf`
6. Registers FakeDB as a systemd service (Linux) or launchd agent (macOS)

### Manual installation

If you prefer to install FakeDB without running the one-line installer, download the binary directly:

```shell
curl -fsSL https://releases.fakedb.example.com/v2.4.1/fakedb-linux-amd64.tar.gz -o fakedb.tar.gz
tar -xzf fakedb.tar.gz
sudo mv fakedb /usr/local/bin/fakedb
sudo chmod +x /usr/local/bin/fakedb
```

Verify the installation:

```shell
fakedb --version
# Expected output: fakedb version 2.4.1 (build 20240315)
```

### Troubleshooting installation issues

**Permission denied when running the installer**

If you see a `Permission denied` error, run the installer with `sudo`:

```shell
sudo bash -c "$(curl -fsSL https://fakedb.example.com/install.sh)"
```

**GPG verification failed**

If GPG verification fails, your keyring may be outdated. Update it:

```shell
gpg --keyserver hkps://keys.openpgp.org --recv-keys FAKEDB_KEY_ID
```

**Port already in use**

If port 5432 is already in use by another process, identify the process:

```shell
sudo lsof -i :5432
```

You can then either stop the conflicting process or configure FakeDB to use a different port in the next step.
{% /step %}

{% step title="Configure the database" %}
Create a configuration file for FakeDB:

```yaml
fakedb:
  host: localhost
  port: 5432
  database: mydb
```
{% /step %}

{% step title="Connect to the database" %}
Start the FakeDB service and open a connection:

```shell
fakedb start
fakedb connect --host localhost --port 5432 --database mydb
```
{% /step %}

{% stepper-finished %}
You're all set. Happy databasing!
{% /stepper-finished %}

{% /stepper %}
