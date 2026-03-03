---
title: Stepper test
---

## With "finished" section

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
Step 3 contents go here, including tabs, sublists, etc.
{% /step %}

{% stepper-finished %}
Great job, you've finished all the steps. You might like to browse this super helpful doc next.
{% /stepper-finished %}

{% /stepper %}

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Without "finished" section

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

{% stepper %}

{% step title="Step 1 title" %}
Step 1 contents go here, including tabs, sublists, etc.
{% /step %}

{% step title="Step 2 title" %}
Step 2 contents go here, including tabs, sublists, etc.
{% /step %}

{% /stepper %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Lots of steps

{% stepper %}

{% step title="Step 1 title" %}
Contents go here, including tabs, sublists, etc.
{% /step %}

{% step title="Step 2 title" %}
Contents go here, including tabs, sublists, etc.
{% /step %}

{% step title="Step 3 title" %}
Contents go here, including tabs, sublists, etc.
{% /step %}

{% step title="Step 4 title" %}
Contents go here, including tabs, sublists, etc.
{% /step %}

{% step title="Step 5 title" %}
Contents go here, including tabs, sublists, etc.
{% /step %}

{% step title="Step 6 title" %}
Contents go here, including tabs, sublists, etc.
{% /step %}

{% step title="Step 7 title" %}
Contents go here, including tabs, sublists, etc.
{% /step %}

{% step title="Step 8 title" %}
Contents go here, including tabs, sublists, etc.
{% /step %}

{% step title="Step 9 title" %}
Contents go here, including tabs, sublists, etc.
{% /step %}

{% step title="Step 10 title" %}
Contents go here, including tabs, sublists, etc.
{% /step %}

{% step title="Step 11 title" %}
Contents go here, including tabs, sublists, etc.
{% /step %}

{% step title="Step 12 title" %}
Contents go here, including tabs, sublists, etc.
{% /step %}

{% /stepper %}