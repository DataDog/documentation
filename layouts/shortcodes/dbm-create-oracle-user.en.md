If you already have the legacy Oracle integration installed, the user already exists, and you can skip this step.

Create a read-only login to connect to your server and grant the required permissions:

```SQL
CREATE USER datadog IDENTIFIED BY <YOUR_PASSWORD>;
```