const { Client } = require("pg");
const {
  RDSClient,
  DescribeDBInstancesCommand,
} = require("@aws-sdk/client-rds");
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

exports.handler = async (event, context) => {
  let client;
  let message;
  try {
    let dbId;
    message = JSON.parse(event.Records[0]?.body);
    if (message.RequestType) {
      // CloudFormation event
      return { Status: "SUCCESS" };
    }
    // Check for source id in RDS notification
    dbId = message["Source ID"];
    if (!dbId) {
      throw new Error("No DB Id found in the message");
    }
    const rdsClient = new RDSClient();
    const rdsInput = {
      DBInstanceIdentifier: dbId,
    };
    const rdsCommand = new DescribeDBInstancesCommand(rdsInput);
    const rdsResponse = await rdsClient.send(rdsCommand);
    const secretArn = rdsResponse.DBInstances[0].MasterUserSecret.SecretArn;

    const dbSecret = await getSecret(secretArn);

    const adminSecret = await getSecret(process.env.ADMIN_USER_SECRET_ARN);
    const datadogSecret = await getSecret(process.env.DATADOG_USER_SECRET_ARN);

    const endpoint = rdsResponse.DBInstances[0].Endpoint.Address;
    const port = rdsResponse.DBInstances[0].Endpoint.Port;

    client = new Client({
      user: dbSecret.username,
      host: endpoint,
      database: "postgres",
      password: dbSecret.password,
      port,
      ssl: {
        // Allow for the RDS self-signed SSL
        rejectUnauthorized: false,
      },
    });

    await client.connect();

    // Create admin user for orders app
    await executeSql(
      client,
      `CREATE ROLE admin WITH LOGIN PASSWORD '${adminSecret}';`
    );
    await executeSql(
      client,
      `ALTER ROLE admin WITH LOGIN PASSWORD '${adminSecret}';`
    );
    await executeSql(
      client,
      `GRANT ALL PRIVILEGES ON DATABASE postgres TO admin;`
    );

    await executeSql(client, `ALTER USER admin CREATEROLE;`);
    await executeSql(client, `ALTER USER admin CREATEDB;`);

    await executeSql(
      client,
      `CREATE USER datadog WITH password '${datadogSecret}';`
    );
    await executeSql(
      client,
      `ALTER ROLE datadog WITH password '${datadogSecret}';`
    );
    await executeSql(client, `ALTER ROLE datadog INHERIT;`);
    await executeSql(client, `CREATE SCHEMA IF NOT EXISTS datadog;`);
    await executeSql(client, `GRANT USAGE ON SCHEMA datadog TO datadog;`);
    await executeSql(client, `GRANT USAGE ON SCHEMA public TO datadog;`);
    await executeSql(client, `GRANT pg_monitor TO datadog;`);
    await executeSql(
      client,
      `CREATE EXTENSION IF NOT EXISTS pg_stat_statements;`
    );
    await executeSql(
      client,
      `CREATE OR REPLACE FUNCTION datadog.explain_statement(
   l_query TEXT,
   OUT explain JSON
)
RETURNS SETOF JSON AS
$$
DECLARE
curs REFCURSOR;
plan JSON;

BEGIN
   OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
   FETCH curs INTO plan;
   CLOSE curs;
   RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER;
`
    );
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (client) {
      await client.end();
    }
  }
};

const executeSql = async (client, sql) => {
  try {
    const res = await client.query(sql);
    return res;
  } catch (err) {
    console.error("Error executing SQL", err);
  }
};

const getSecret = async (secretArn) => {
  const secretsClient = new SecretsManagerClient();
  const secretsInput = {
    SecretId: secretArn,
  };
  const secretsCommand = new GetSecretValueCommand(secretsInput);
  const secretsResponse = await secretsClient.send(secretsCommand);
  try {
    const value = JSON.parse(secretsResponse.SecretString);
    return value;
  } catch (err) {
    return secretsResponse.SecretString;
  }
};
