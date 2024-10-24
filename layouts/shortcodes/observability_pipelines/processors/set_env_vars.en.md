Use this processor to add a field name and value of an environment variable to the log message.

To set up this processor:

1. Define a [filter query](#filter-query-syntax). Only logs that match the specified filter query are processed. All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline.
1. Enter the field name for the environment variable.
1. Enter the environment variable name.
1. Click **Add Environment Variable** if you want to add another environment variable.

##### Blocked environment variables

Environment variables that match any of the following patterns are blocked from being added to log messages because the environment variable could contain sensitive data.

- `CONNECTIONSTRING` / `CONNECTION-STRING` / `CONNECTION_STRING`
- `AUTH`
- `CERT`
- `CLIENTID` / `CLIENT-ID` / `CLIENT_ID`
- `CREDENTIALS`
- `DATABASEURL` / `DATABASE-URL` / `DATABASE_URL`
- `DBURL` / `DB-URL` / `DB_URL`
- `KEY`
- `OAUTH`
- `PASSWORD`
- `PWD`
- `ROOT`
- `SECRET`
- `TOKEN`
- `USER`

The environment variable is matched to the pattern and not the literal word. For example, `PASSWORD` blocks environment variables like `USER_PASSWORD` and `PASSWORD_SECRET` from getting added to the log messages.