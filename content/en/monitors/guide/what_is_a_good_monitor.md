# Monitor’s Best Practice

# Introduction

A well-designed monitor is essential for understanding the performance, health, and stability of your infrastructure or application. It provides accurate, actionable data to detect issues early, optimize performance, and maintain smooth operations.

This guide walks you through the key aspects of building an effective monitor: 

- Create an intuitive monitor  
- Set proper thresholds  
- Establish actionable responses. 

By following these principles, you’ll create a monitor that delivers meaningful insights and supports proactive decision-making.

# What is the monitor?

The [Manage Monitor](https://app.datadoghq.com/monitors/manage) page displays the monitor's title, monitor’s tags, and its status. Having a  clear, descriptive title is important because it immediately communicates the monitor’s purpose and what it tracks. A well-defined title helps users quickly identify the monitor's focus. A clear title also ensures that all team members, regardless of role and persona, can understand the monitor’s function at a glance.

# Use Multi Alert

To avoid redundant monitors (such as very similar monitors with just 1 filter changing), Datadog recommends using multi-alert monitors. Whenyou use a “group by” in your query, multi-alerts apply the alert to each source based on your group parameters.

For example:  
You have an e-commerce website, and to handle large volumes of traffic or processing, you deploy multiple hosts and use a load balancer to distribute the incoming requests evenly. To ensure no single host is overwhelmed, you want an alert if a host exceeds a specific CPU and memory threshold. This ensures no single host is overwhelmed, maintaining balanced traffic and processing.

# Give context

Adding context to a monitor transforms raw data into actionable insights. Context clarifies ownership and impact, helping users understand what the monitor affects.. Context also speeds up troubleshooting by providing a clearer picture of potential causes, allowing for better decision-making. In short, context makes monitoring more accurate, useful, and responsive to real-world conditions.

Datadog has 3 features to enhance monitor context:

* [**Metadata**](https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert#add-metadata)**:** Add priority, tag, and team information to alert notifications.. This context helps teams filter, prioritize, and route issues to the right people quickly. They help clarify the alert's nature and group related alerts. This makes managing and resolving alerts more efficient and effective.

* [**Monitors tags**](https://docs.datadoghq.com/monitors/manage/#monitor-tags)**:** Organize, filter, and manage monitors across complex infrastructure by categorizing them based on attributes like environment, application, or team ownership. Tags make finding specific monitors easier and help focus on those relevant to a specific purpose or team.

* [**Variables**](https://docs.datadoghq.com/monitors/notify/variables/?tab=is_alert) **:** Use variables in your monitor message to add precise context, providing dynamic, real-time details, such as the affected system, error message, or exceeded thresholds. This specificity makes notifications clearer and reduces the need for responders to search for additional information, allowing faster action. Variables also ensure consistency in the structure of alerts, which improves readability and response efficiency. 

# Monitor Quality

To confirm if your monitors are well-configured, use [Monitor Quality](https://app.datadoghq.com/monitors/quality). It identifies monitors that need improvement based on predefined rules that catch common misconfigurations in monitoring setups. For more information, see the Monitor Quality [Documentation](https://docs.datadoghq.com/monitors/quality/)

# Recommended Monitors

If you are unsure where to start when creating a monitor, use Datadog’s prebuilt [Recommended Monitors](https://app.datadoghq.com/monitors/recommended). They provide guidelines on titles, notifications, metrics and thresholds.For more information, see the Recommended Monitors [Documentation](https://docs.datadoghq.com/monitors/recommended/) 
