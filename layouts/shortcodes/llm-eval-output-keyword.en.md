Provide **True keywords** and **False keywords** that define when the evaluation result is true or false, respectively. 

Datadog searches the LLM-as-a-judge's response text for your defined keywords and provides the appropriate results for the evaluation. For this reason, you should instruct the LLM to respond with your chosen keywords. 

For example, if you set:

- **True keywords**: Yes, yes
- **False keywords**: No, no

Then your system prompt should include something like `Respond with "yes" or "no"`.