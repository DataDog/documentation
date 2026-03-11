---
title: Stepper test
content_filters:
  - trait_id: prog_lang
    option_group_id: otel_api_support_language_options
---

## With no "open" attribute

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

{% stepper %}

{% step title="Verify the prerequisites" %}
Make sure you meet these prerequisites:

- You have a computer.
- You have permission to install things on the computer.
- You are competent.
- You are in the mood to do this today.

{% collapse-content title="Bonus prereqs" level="h4" %}
- Somebody is paying you to do this.
{% /collapse-content %}
{% /step %}

{% step title="Install the software" %}
{% tabs %}

{% tab label="Python" %}
Run this script to install with Python:

```python
import time
import sys

def fake_install():
    steps = [
        "Checking system requirements",
        "Downloading packages",
        "Installing dependencies",
        "Configuring environment",
        "Finalizing setup"
    ]

    for step in steps:
        print(f"{step}...", end="")
        sys.stdout.flush()
        time.sleep(1)
        print(" Done.")

    print("\nInstallation completed successfully!")

if __name__ == "__main__":
    fake_install()
```
{% /tab %}

{% tab label="JavaScript" %}
Run this script to install with JavaScript:

```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fakeInstall() {
  const steps = [
    "Checking system requirements",
    "Downloading packages",
    "Installing dependencies",
    "Configuring environment",
    "Finalizing setup"
  ];

  for (const step of steps) {
    process.stdout.write(step + "... ");
    await sleep(1000);
    console.log("Done.");
  }

  console.log("\nInstallation completed successfully!");
}

fakeInstall();
```
{% /tab %}

{% /tabs %}
{% /step %}

{% step title="Update the configuration file" %}
{% alert level="warning" %}
This is made-up YAML. Proceed with caution.
{% /alert %}
Use this YAML:

```yaml
server:
  host: 0.0.0.0
  port: 8080

database:
  type: postgres
  host: localhost
  port: 5432
  username: admin
  password: secret123
```
{% /step %}

{% step title="Verify the installation" %}
Verify the installation by following these steps:

1. Ask Claude if it seems installed.
2. Ask ChatGPT if it seems installed, just in case.
3. Ask the person nearest to you if they feel as though the software was in fact installed.
{% /step %}

{% stepper-finished %}
Great job, you've finished all the steps. You might like to browse this super helpful doc next.
{% /stepper-finished %}

{% /stepper %}

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## With "open" attribute

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

{% stepper open="true" %}

{% step title="Verify the prerequisites" %}
Make sure you meet these prerequisites:

- You have a computer.
- You have permission to install things on the computer.
- You are competent.
- You are in the mood to do this today.

{% collapse-content title="Bonus prereqs" level="h4" %}
- Somebody is paying you to do this.
{% /collapse-content %}
{% /step %}

{% step title="Install the software" %}
{% tabs %}

{% tab label="Python" %}
Run this script to install with Python:

```python
import time
import sys

def fake_install():
    steps = [
        "Checking system requirements",
        "Downloading packages",
        "Installing dependencies",
        "Configuring environment",
        "Finalizing setup"
    ]

    for step in steps:
        print(f"{step}...", end="")
        sys.stdout.flush()
        time.sleep(1)
        print(" Done.")

    print("\nInstallation completed successfully!")

if __name__ == "__main__":
    fake_install()
```
{% /tab %}

{% tab label="JavaScript" %}
Run this script to install with JavaScript:

```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fakeInstall() {
  const steps = [
    "Checking system requirements",
    "Downloading packages",
    "Installing dependencies",
    "Configuring environment",
    "Finalizing setup"
  ];

  for (const step of steps) {
    process.stdout.write(step + "... ");
    await sleep(1000);
    console.log("Done.");
  }

  console.log("\nInstallation completed successfully!");
}

fakeInstall();
```
{% /tab %}

{% /tabs %}
{% /step %}

{% step title="Update the configuration file" %}
{% alert level="warning" %}
This is made-up YAML. Proceed with caution.
{% /alert %}
Use this YAML:

```yaml
server:
  host: 0.0.0.0
  port: 8080

database:
  type: postgres
  host: localhost
  port: 5432
  username: admin
  password: secret123
```
{% /step %}

{% step title="Verify the installation" %}
Verify the installation by following these steps:

1. Ask Claude if it seems installed.
2. Ask ChatGPT if it seems installed, just in case.
3. Ask the person nearest to you if they feel as though the software was in fact installed.
{% /step %}

{% stepper-finished %}
Great job, you've finished all the steps. You might like to browse this super helpful doc next.
{% /stepper-finished %}

{% /stepper %}

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
