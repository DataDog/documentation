# Getting Started with LLM Experiments: A Practical Guide for Software Engineers

If you're building LLM-powered applications, you've probably asked yourself: "How do I know if my changes actually made things better?" Maybe you tweaked a prompt, switched models, or adjusted temperature settings—and now you're left squinting at outputs, trying to convince yourself (and your team) that version B is definitely better than version A.

For most teams, the honest answer is "not really." You're flying blind, relying on vibes and cherry-picked examples instead of systematic measurement.

This is where **offline evaluation** comes in. Think of it as unit testing for your AI application—a way to validate changes against known test cases before they hit production. In this guide, we'll walk through how to implement offline evaluation using Datadog LLM Experiments, giving you the confidence to ship improvements faster.

## Why Offline Evaluation Matters

Traditional software has deterministic behavior. You write a function, write tests, and know exactly what to expect. LLM applications are different—they're probabilistic, context-dependent, and can fail in creative ways you'd never anticipate.

Without systematic evaluation, you're stuck in a slow, anxiety-inducing cycle:
1. Make a change to your prompt or model
2. Manually test a few examples
3. Deploy nervously
4. Wait for user complaints
5. Repeat

Offline evaluation breaks this cycle. It lets you:

- **Test systematically** against curated datasets before deployment
- **Compare approaches** side-by-side (different prompts, models, or parameters)
- **Catch regressions** in your CI/CD pipeline
- **Move faster** with confidence that changes improve quality

The best part? You don't need a PhD in machine learning to get started. Let's build your first evaluation pipeline.

## Common Use Cases for Offline Evaluation

Before diving into implementation, here are scenarios where offline evaluation proves invaluable:

**Testing prompt changes.** You've revised your system prompt to be more concise. Will it maintain accuracy? Run an offline experiment against your test set to find out before deploying.

**Comparing models.** GPT-4 is expensive but powerful. Claude Sonnet is faster and cheaper. Which is better for your use case? Test both on real data and measure quality, latency, and cost tradeoffs.

**Validating RAG improvements.** You've improved your retrieval algorithm to fetch more relevant documents. Does this translate to better final answers? Offline evaluation shows you whether the change moves the needle.

**Preventing regressions.** You updated a dependency and now you're worried something broke. Run your evaluation suite in CI to verify quality hasn't degraded before merging.

**Fine-tuning validation.** You've fine-tuned a model on your domain data. Is it actually better than the base model? Test systematically across diverse examples to measure improvement.

**Multi-agent optimization.** Your agent system has five decision points. Which ones are working well? Which need improvement? Component-level evaluation pinpoints exactly where to focus your efforts.

## The Three Building Blocks of LLM Evaluation

Every evaluation follows a consistent pattern, whether you're testing a single LLM call that classifies support tickets or a complex multi-agent workflow that handles customer refunds end-to-end. Here are the three components you'll need:

### 1. **Data** (Your Test Cases)

Your dataset contains the inputs your application will process during testing, along with the expected outputs you want to see. Think of it as test fixtures, but for probabilistic systems.

For a customer support bot, your dataset might look like:

```python
test_cases = [
    {
        "input": "How do I reset my password?",
        "expected": "Visit Settings > Security > Reset Password",
        "metadata": {"category": "account_management", "complexity": "simple"}
    },
    {
        "input": "What's your refund policy?",
        "expected": "Our 30-day money-back guarantee covers...",
        "metadata": {"category": "billing", "complexity": "simple"}
    },
    {
        "input": "I was charged twice but only received one item",
        "expected": "I apologize for the error. I'll refund the duplicate charge...",
        "metadata": {"category": "billing", "complexity": "complex"}
    }
]
```

#### How to build effective datasets

**Start small, then scale.** Begin with 20-50 carefully selected examples that cover your core use cases. Once you validate the approach works, expand to hundreds or thousands of cases for comprehensive coverage.

**Use real user interactions, not synthetic examples.** The best test cases come from actual production data. If your LLM app replaces an existing workflow, use the historical input/output pairs (e.g., customer support email exchanges, past database queries, resolved support tickets).
Make sure to add enough examples representing the most common topics in production.

**Test the outcomes your users care about.** If you're building a multi-step agent, focus first on whether it achieves the end goal—did it successfully process the refund? Did it resolve the support ticket? As models get smarter, the specific intermediate steps might change, but the desired outcome stays constant.

**Include edge cases and failure modes.** Once you've covered the most common production scenarios, add challenging examples. Test both when a behavior should occur and when it shouldn't. Examples:
- If you're building an agent with tool use, include tasks where tools are necessary AND tasks where direct responses are better
- Multi-turn conversations requiring context retention
- Ambiguous requests needing clarification
- Inputs designed to trigger hallucinations or policy violations
- Questions outside your domain that should be declined
- Malformed inputs and error conditions

**Add metadata for downstream analysis.** Rich metadata enables you to slice results by category, complexity, or any dimension that matters. Instead of just seeing "accuracy: 0.82", you can discover that your system scores 0.95 on simple queries but only 0.65 on complex multi-step questions, or that it handles billing questions better than technical ones. This tells you exactly where to focus improvement efforts.

```python
test_cases = [
    {
        "input": "How do I reset my password?",
        "expected": "Visit Settings > Security > Reset Password",
        "metadata": {
            "category": "account_management",
            "complexity": "simple",
            "requires_tool": False,
            "user_segment": "new_user",
            "language": "en"
        }
    }
]
```

With this metadata, you can filter experiment results to answer questions like:
- Which categories have the lowest scores?
- Does performance degrade on complex vs. simple queries?
- Are multilingual queries handled as well as English ones?
- Do tool-requiring tasks have higher failure rates?

This granular analysis reveals specific weaknesses rather than just overall numbers, making it clear where optimization efforts will have the most impact.

**Keep datasets living and evolving.** Your application changes, user behavior shifts, and models get updated. A static test set becomes stale. Continuously import low-scoring production traces and user-reported issues to keep your evaluation relevant. As new failure patterns emerge in production, add them to your eval set—that's how comprehensive coverage is built over time.

In LLM Experiments, you can create datasets from CSV files, import them from production traces, or build them programmatically using the SDK.

### 2. **Task** (Your Application Logic)

This is the code you're testing—the actual business logic of your LLM application. It receives input from your dataset and produces output. Your task might be:
- A single LLM call with a carefully crafted prompt
- A RAG pipeline that retrieves context and generates answers
- A multi-agent workflow with tool use and decision making
- An entire customer service automation system

Here's a simple example:

```python
def customer_support_bot(input_text):
    response = llm_client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful customer support agent."},
            {"role": "user", "content": input_text}
        ],
        temperature=0.3
    )
    return response.choices[0].message.content
```

#### Best practices for structuring your tasks

**Make tasks reproducible.** Mock data call responses. You want to know that changes in scores reflect actual quality differences, not random variation.

**Capture intermediate steps for debugging.** Datadog automatically instruments your main task to capture every detail from your LLM calls/agent execution with full prompts and completions. To cover all the steps in your system (retrieval steps with fetched documents, tool executions, ...), instrument them using the LLM Obs SDK to get full visibility into your agent trajectory

```python
from ddtrace.llmobs.decorators import tool

@tool(name="calculator")
def calculate(operation, operands):
    """Performs mathematical calculations - automatically traced as a tool span."""
    if operation == "add":
        return sum(operands)
    elif operation == "multiply":
        return operands[0] * operands[1]
    # ... other operations
```

**Run experiments multiple times using multi-run to account for variance.** LLM applications are probabilistic—the same input can produce different outputs across runs. A test case that passes once might fail the next time, making single-run results misleading. Run each experiment 3-5 times and look at aggregate statistics rather than individual results. This reveals whether improvements are genuine or just random variation.

```python 
experiment = LLMObs.experiment(
    name="example-experiment",
    dataset=dataset,
    task=topic_relevance,
    evaluators=[exact_match, false_confidence],
    runs=5    # <--- Set this 
)
```


### 3. **Evaluators** (Your Scoring Functions)

Evaluators measure output quality—they're your automated test assertions. The evaluator takes the input, output, and (optionally) expected output, then returns a score indicating whether your application did what it should.

You have 2 main approaches:

**Code-based evaluators** for deterministic properties:
```python
def exact_match(input_data, output_data, expected_output):
    """Ensure responses are identical."""

    return output["value"] == expected_output["value"]
```

**LLM-as-a-judge** for nuanced qualities that require reasoning:
```python
def helpfulness_evaluator(input_data, output_data, expected_output) -> EvaluatorResult:
    judge_prompt = f"""
    Rate this customer support response's helpfulness from 0-1.

    Question: {input['question']}
    Response: {output}

    Criteria:
    - Does it directly answer the question?
    - Is it clear and actionable?
    - Is the tone empathetic and professional?

    Return only a number between 0 and 1.
    """

    return EvaluatorResult(
        value=fake_llm_call_result["value"],
        reasoning=fake_llm_call_result["reasoning"],
        assessment="pass", # or fail
    )
```

**Best practices for building evaluators:**

**Start with simple deterministic evaluators.** Before building complex LLM-as-judge evaluators, start with code-based checks that are fast, free, and reliable. Can you verify the output format? Check for required fields? Validate length constraints? Test for the presence of specific keywords? These deterministic evaluators provide instant feedback and catch obvious failures:

```python
# Start with these simple checks
def has_required_format(input, output, expected):
    """Verify output is valid JSON with required fields."""
    try:
        parsed = json.loads(output)
        required_fields = ["intent", "confidence", "entities"]
        return all(field in parsed for field in required_fields)
    except:
        return False

def within_length_limit(input, output, expected):
    """Ensure response isn't too long or too short."""
    word_count = len(output.split())
    return 10 <= word_count <= 200

def contains_no_pii(input, output, expected):
    """Check that output doesn't leak sensitive information."""
    pii_patterns = [r'\b\d{3}-\d{2}-\d{4}\b',  # SSN
                   r'\b\d{16}\b']  # Credit card
    return not any(re.search(p, output) for p in pii_patterns)
```

Only add LLM-as-judge evaluators when you need to measure subjective qualities that deterministic code can't capture. This keeps your evaluation fast, cheap, and interpretable.

**Start with 2-3 key metrics.** Don't try to measure everything at once. Identify what matters most for your use case and nail those metrics first. You can always add more later as your evaluation matures.

**Be specific, not vague.** "The response should be good" isn't measurable. Break it down: Is it factually accurate? Is it concise? Does it maintain the right tone? Does it cite sources? Each of these is a separate, well-defined metric.

**Compare cost and latency as first-class metrics.** A system that's 5% more accurate but 3x slower or 10x more expensive might be worse overall.

**Be specific with LLM judges.** Vague criteria like "rate the quality" lead to inconsistent scores. Tell the judge exactly what to look for, provide examples of good and bad responses, and constrain the output format (numeric scores, not explanations).

**Validate your LLM judges.** Before trusting automated scores, manually review a sample of outputs to ensure evaluators are measuring what you think they're measuring. An evaluator that gives high scores to garbage outputs is worse than no evaluator at all.

**Make failure modes visible.** When an evaluator scores low, include metadata explaining why. This helps you debug faster and identify patterns in failures.

## Cookbooks 
See here for examples

## What You'll See in Datadog

After running your experiment, the Datadog UI provides rich visualization and debugging tools:

**Experiment Dashboard**
View aggregate metrics across all test cases. You'll see average scores, distribution charts showing the spread of results, and time-series trends if you're running experiments repeatedly. This high-level view tells you whether your changes improved quality overall.

**Trace Details**
Click into any test case to see exactly what happened during execution:
- Complete input and output data
- Every LLM call with full prompts, completions, and token counts
- Retrieval steps showing which documents were fetched and their relevance scores
- Tool executions with parameters and results
- Evaluation scores with pass/fail indicators
- Latency breakdown by component
- Cost per test case

This granular visibility is invaluable when debugging. When an evaluator scores low, you can see the exact prompt that was used, the model's response, and which step in the workflow went wrong.

**Side-by-Side Experiment Comparison**
Run multiple experiments (GPT-4 vs Claude, temperature 0.3 vs 0.7, prompt variant A vs B) and compare them directly. See which approach scores better on each metric, where they differ, and what tradeoffs you're making.

## Advanced Patterns for Scaling Your Evaluation Practice

Once you've run your first experiments, these patterns will help you build a mature, systematic evaluation practice:

### Pattern 1: Build Datasets from Production Traffic using Automations

[To fill]

### Pattern 2: Use the Playground for Rapid Iteration

Before running a full experiment with hundreds of test cases, use Datadog's Playground for quick iteration:

1. **Import a problematic trace** from production
2. **Adjust your approach**—tweak the prompt, change temperature, try a different model
3. **See results immediately** without waiting for full experiment runs
4. **Once you find something promising**, validate it systematically across your entire dataset

This "explore then validate" workflow is much faster than running full experiments for every idea. Use the playground for exploration, use experiments for validation.

### Pattern 3: Evaluate Multi-Step Agents

For complex agents with multiple tools and decision points, test both the journey and the destination:

**Prioritize end-to-end outcomes first.** Does the complete workflow achieve the user's goal? Did it successfully process the refund, book the appointment, or resolve the ticket? This is what users actually care about.

**Then evaluate component quality.** Once you know the system works end-to-end, drill into intermediate steps: Does the agent choose the right tool? Are retrievals relevant? Is the reasoning sound?

Datadog automatically captures each step as a separate span, giving you full visibility into the decision path. When end-to-end success is low, component evaluators help you identify which step is failing.

### Pattern 4: Use LLM-as-Judge Wisely

For subjective qualities like tone, helpfulness, or safety, LLM-as-a-judge can be powerful—but only if used carefully:

```python
def helpfulness_evaluator(input, output, expected):
    """Use GPT-4 to judge helpfulness with specific criteria."""
    judge_prompt = f"""
    Rate this customer support response's helpfulness from 0 to 1.

    Question: {input['question']}
    Response: {output}

    A helpful response:
    - Directly answers the question asked
    - Provides clear, actionable next steps
    - Uses empathetic, professional language
    - Avoids jargon or overly technical terms

    Examples:
    - Score 1.0: "Visit Settings > Security > Reset Password. You'll receive an email with reset instructions."
    - Score 0.3: "We have various account management features available in our platform."

    Return ONLY a decimal number between 0 and 1.
    """

    score = float(llm_judge(judge_prompt))
    return {"metric": "helpfulness", "score": score}
```

**Key considerations for LLM judges:**
- **Be explicit about criteria.** Vague instructions like "rate quality" produce inconsistent scores. Define exactly what you're measuring.
- **Provide examples.** Show the judge what good and bad responses look like.
- **Constrain output format.** Request only numeric scores, not explanations or reasoning (unless you need them for debugging).
- **Validate against human judgment.** Spot-check a sample to ensure the LLM judge aligns with human evaluation.
- **Watch for bias.** LLM judges can favor verbose responses, specific writing styles, or responses similar to their own training data.

### Pattern 5: Integrate with CI/CD

Run experiments automatically in your continuous integration pipeline to catch regressions:

[insert_link_to_CI/CD]

This prevents you from merging changes that degrade quality.

## The Feedback Loop: Connecting Online and Offline Evaluation

Offline evaluation is powerful, but it's incomplete without production data. The real magic happens when you create a feedback loop between development and production:

**1. Monitor Production Continuously**
Datadog LLM Observability tracks every production request, capturing full traces, automatic evaluations, and user feedback. This gives you visibility into real-world performance.

**2. Identify What Your Offline Tests Missed**
Low-scoring production traces, user complaints, or unexpected behavior patterns reveal blind spots in your test coverage. These are gold—they're the cases that actually matter.

**3. Import Problems into Your Dataset**
Add problematic production traces to your test dataset. Now your offline evaluation tests the scenarios that trip you up in the real world:

**4. Fix, Validate Offline, Then Deploy**
Develop a fix and run experiments to confirm it solves the problem without breaking existing cases. Only deploy once you have data showing improvement.

**5. Verify Production Impact**
After deploying, monitor production metrics to confirm the fix worked in the wild. Sometimes offline improvements don't translate to production gains—you need to measure both.

This creates a virtuous cycle: production reveals weaknesses → offline testing catches them → deployment fixes them → production confirms success. Over time, your test coverage becomes a precise reflection of real-world challenges, and your quality systematically improves.

## Wrapping Up

Offline evaluation transforms LLM development from guesswork into engineering. Instead of hoping your changes improve quality, you'll know—with data. Instead of discovering problems in production, you'll catch them during development. Instead of debating which approach is better, you'll measure and decide.

With Datadog LLM Experiments, you get:
- **Automatic instrumentation** capturing every LLM call, retrieval, and tool execution
- **Flexible evaluation** using code-based scorers, LLM-as-judge, or custom logic
- **Rich debugging** with full trace visibility into what happened during each test
- **Production integration** creating a feedback loop between real-world usage and development

The teams shipping fastest aren't skipping testing — they're testing systematically and using data to move with confidence. Offline evaluation isn't overhead; it's the foundation for rapid iteration.

Start small, measure what matters, and improve continuously. Your first experiment might take an hour to set up. After that, every subsequent test gets easier, your coverage expands, and your quality systematically improves.

Ready to get started? Check out the [Datadog LLM Experiments documentation](https://docs.datadoghq.com/llm_observability/experiments/setup/) for complete setup instructions and advanced features.

---

## Appendix: Evaluation Patterns for Common LLM Use Cases

Here are dataset and evaluator examples for the most common LLM application patterns. Use these as templates for building your own evaluation pipeline.

### 5. Intent Classification / Routing

**Use Case:** Route customer inquiries to the right team, classify support tickets, or determine user intent for conversational agents.

**Dataset Example:**

```python
test_cases = [
    {
        "input": "My payment failed and I was charged twice",
        "expected": {
            "intent": "billing_issue",
            "urgency": "high",
            "route_to": "billing_team",
            "requires_immediate_action": True
        },
        "metadata": {
            "complexity": "clear",
            "multiple_intents": False
        }
    },
    {
        "input": "Can you help me reset my password? Also, when is my subscription renewal?",
        "expected": {
            "intent": "multiple",
            "sub_intents": ["password_reset", "billing_inquiry"],
            "urgency": "medium",
            "route_to": "support_team",
            "requires_immediate_action": False
        },
        "metadata": {
            "complexity": "multiple_intents",
            "multiple_intents": True
        }
    },
    {
        "input": "The dashboard is loading slowly",
        "expected": {
            "intent": "technical_issue",
            "urgency": "medium",
            "route_to": "technical_support",
            "requires_immediate_action": False
        },
        "metadata": {
            "complexity": "clear",
            "multiple_intents": False
        }
    }
]
```

**Evaluator Examples:**

```python
def intent_accuracy_evaluator(input, output, expected):
    """Check if intent is correctly classified."""
    detected_intent = extract_intent(output)
    expected_intent = expected["intent"]

    # Handle single vs multiple intents
    if expected_intent == "multiple":
        expected_intents = set(expected["sub_intents"])
        detected_intents = set(extract_sub_intents(output))

        # Check if all intents are detected
        correct_intents = expected_intents & detected_intents
        score = len(correct_intents) / len(expected_intents) if expected_intents else 0.0
    else:
        score = 1.0 if detected_intent == expected_intent else 0.0

    return {
        "metric": "intent_accuracy",
        "score": score,
        "expected": expected_intent,
        "detected": detected_intent
    }

def routing_accuracy_evaluator(input, output, expected):
    """Check if routed to correct team."""
    detected_route = extract_routing(output)
    expected_route = expected["route_to"]

    return {
        "metric": "routing_accuracy",
        "score": 1.0 if detected_route == expected_route else 0.0,
        "expected": expected_route,
        "detected": detected_route
    }

def urgency_detection_evaluator(input, output, expected):
    """Check if urgency is correctly assessed."""
    urgency_map = {"critical": 4, "high": 3, "medium": 2, "low": 1}

    detected_urgency = extract_urgency(output)
    expected_urgency = expected["urgency"]

    expected_level = urgency_map.get(expected_urgency, 0)
    detected_level = urgency_map.get(detected_urgency, 0)

    # Allow one level of difference for medium/high distinction
    diff = abs(expected_level - detected_level)

    if diff == 0:
        score = 1.0
    elif diff == 1:
        score = 0.7
    else:
        score = 0.3

    return {
        "metric": "urgency_accuracy",
        "score": score,
        "expected": expected_urgency,
        "detected": detected_urgency
    }

def multi_intent_detection_evaluator(input, output, expected):
    """Specifically test detection of multiple intents in one message."""
    has_multiple = input.get("metadata", {}).get("multiple_intents", False)

    if not has_multiple:
        return {"metric": "multi_intent_detection", "score": 1.0, "note": "single_intent"}

    detected_intents = extract_sub_intents(output)
    expected_intents = expected.get("sub_intents", [])

    # Check if all intents were found
    all_found = all(intent in detected_intents for intent in expected_intents)
    no_extras = len(detected_intents) == len(expected_intents)

    score = 1.0 if (all_found and no_extras) else 0.5 if all_found else 0.0

    return {
        "metric": "multi_intent_detection",
        "score": score,
        "expected_count": len(expected_intents),
        "detected_count": len(detected_intents)
    }
```

### 2. Retrieval-Augmented Generation (RAG)

**Use Case:** Answer questions using retrieved documents from internal knowledge bases, regulatory documents, or product documentation.

**Dataset Example:**

```python
test_cases = [
    {
        "input": {
            "question": "What is our refund policy for annual subscriptions?",
            "context_docs": [
                {
                    "id": "doc_123",
                    "content": "Annual subscriptions are eligible for full refund within 30 days of purchase. After 30 days, refunds are prorated based on unused months.",
                    "metadata": {"source": "billing_policy.pdf", "section": "refunds"}
                },
                {
                    "id": "doc_456",
                    "content": "Monthly subscriptions can be canceled anytime with no refund for the current month.",
                    "metadata": {"source": "billing_policy.pdf", "section": "cancellation"}
                }
            ]
        },
        "expected": "Annual subscriptions are eligible for a full refund within 30 days of purchase. After 30 days, refunds are prorated based on the number of unused months remaining.",
        "metadata": {
            "category": "billing",
            "answer_should_cite": ["doc_123"],
            "complexity": "simple"
        }
    },
    {
        "input": {
            "question": "How do I integrate with the REST API?",
            "context_docs": [
                {
                    "id": "doc_789",
                    "content": "To authenticate with the REST API, include your API key in the Authorization header: Authorization: Bearer YOUR_API_KEY",
                    "metadata": {"source": "api_docs.md", "section": "authentication"}
                },
                {
                    "id": "doc_101",
                    "content": "The GraphQL API is available at /graphql endpoint and requires the same authentication.",
                    "metadata": {"source": "api_docs.md", "section": "graphql"}
                }
            ]
        },
        "expected": "To integrate with the REST API, you need to authenticate by including your API key in the Authorization header using the format: Authorization: Bearer YOUR_API_KEY",
        "metadata": {
            "category": "technical",
            "answer_should_cite": ["doc_789"],
            "complexity": "simple"
        }
    }
]
```

**Evaluator Examples:**

```python
def rag_groundedness_evaluator(input, output, expected):
    """Ensure answer is grounded in provided context (no hallucination)."""
    context_text = " ".join([doc["content"] for doc in input["context_docs"]])

    judge_prompt = f"""
    Does the answer contain ONLY information from the provided context?

    Context: {context_text}
    Answer: {output}

    Score 1.0 if the answer is fully grounded in context.
    Score 0.5 if the answer includes minor unsupported details.
    Score 0.0 if the answer contains significant hallucinations or fabricated information.

    Return only a number: 0.0, 0.5, or 1.0
    """

    score = float(llm_judge(judge_prompt))
    return {"metric": "groundedness", "score": score}

def rag_citation_evaluator(input, output, expected):
    """Check that the answer cites the correct source documents."""
    # Extract document IDs cited in the output
    cited_docs = extract_document_citations(output)
    expected_docs = input.get("metadata", {}).get("answer_should_cite", [])

    if not expected_docs:
        return {"metric": "citations", "score": 1.0, "note": "no_citation_required"}

    # Check if all expected documents are cited
    correct_citations = all(doc_id in cited_docs for doc_id in expected_docs)

    # Penalize if irrelevant documents are cited
    all_doc_ids = [doc["id"] for doc in input["context_docs"]]
    spurious_citations = [doc_id for doc_id in cited_docs if doc_id not in all_doc_ids]

    score = 1.0 if correct_citations and len(spurious_citations) == 0 else 0.0

    return {
        "metric": "citations",
        "score": score,
        "cited": cited_docs,
        "expected": expected_docs,
        "spurious": spurious_citations
    }

def rag_relevance_evaluator(input, output, expected):
    """Check if the answer actually addresses the question."""
    question = input["question"]

    judge_prompt = f"""
    Rate how well this answer addresses the question (0.0 to 1.0).

    Question: {question}
    Answer: {output}

    Score 1.0 if the answer directly and completely addresses the question.
    Score 0.5 if the answer is partially relevant.
    Score 0.0 if the answer is off-topic or doesn't address the question.

    Return only a decimal number between 0.0 and 1.0.
    """

    score = float(llm_judge(judge_prompt))
    return {"metric": "relevance", "score": score}

def rag_completeness_evaluator(input, output, expected):
    """Ensure the answer includes all key information from expected output."""
    # Extract key facts from expected answer
    expected_facts = extract_key_facts(expected)

    # Check which facts are present in the output
    facts_present = [fact for fact in expected_facts if is_fact_present(fact, output)]

    completeness = len(facts_present) / len(expected_facts) if expected_facts else 1.0

    return {
        "metric": "completeness",
        "score": completeness,
        "expected_facts": len(expected_facts),
        "present_facts": len(facts_present)
    }
```

### 3. Content Summarization

**Use Case:** Summarize meeting notes, support tickets, long documents, or customer feedback.

**Dataset Example:**

```python
test_cases = [
    {
        "input": {
            "content": """
            Meeting attendees: Sarah (PM), Mike (Eng Lead), Lisa (Designer)

            Discussed the new dashboard redesign. Sarah presented user feedback showing that
            customers are confused by the current navigation. Mike raised concerns about the
            technical complexity of the proposed changes and estimated 3 weeks of work.
            Lisa showed mockups of the new design which received positive feedback.

            Action items:
            - Mike to break down technical requirements by Friday
            - Sarah to schedule user testing for the mockups
            - Lisa to finalize designs based on feedback from this meeting

            Next meeting scheduled for two weeks from today.
            """,
            "format": "bullet_points"
        },
        "expected": """
            Summary:
            - Team discussed dashboard redesign based on user feedback about navigation confusion
            - Mike estimated 3 weeks for implementation
            - Lisa's mockups received positive feedback

            Action Items:
            - Mike: Break down technical requirements (Due: Friday)
            - Sarah: Schedule user testing for mockups
            - Lisa: Finalize designs based on feedback

            Next meeting: Two weeks from today
        """,
        "metadata": {
            "type": "meeting_notes",
            "has_action_items": True,
            "has_timeline": True
        }
    },
    {
        "input": {
            "content": """
            Customer reported unable to log in to their account. After investigation,
            found that their email address had a typo in our system. Updated the email
            address from john.doe@gmial.com to john.doe@gmail.com. Customer confirmed
            they can now log in successfully. Also suggested they enable 2FA for
            additional security. Customer agreed and enabled 2FA.
            """,
            "format": "paragraph"
        },
        "expected": "Customer couldn't log in due to typo in email address. Corrected email from gmial.com to gmail.com. Login issue resolved. Customer enabled 2FA for enhanced security.",
        "metadata": {
            "type": "support_ticket",
            "has_action_items": False,
            "resolution": "solved"
        }
    }
]
```

**Evaluator Examples:**

```python
def summary_length_evaluator(input, output, expected):
    """Ensure summary is appropriately concise."""
    input_word_count = len(input["content"].split())
    output_word_count = len(output.split())

    compression_ratio = output_word_count / input_word_count

    # Good summaries are typically 20-40% of original length
    if 0.2 <= compression_ratio <= 0.4:
        score = 1.0
    elif 0.1 <= compression_ratio <= 0.6:
        score = 0.7
    else:
        score = 0.3

    return {
        "metric": "conciseness",
        "score": score,
        "compression_ratio": compression_ratio,
        "input_words": input_word_count,
        "output_words": output_word_count
    }

def summary_key_info_evaluator(input, output, expected):
    """Check that critical information is preserved."""
    # Extract entities and key phrases from both
    input_entities = extract_named_entities(input["content"])
    output_entities = extract_named_entities(output)

    # Check for action items if present
    has_action_items = input.get("metadata", {}).get("has_action_items", False)

    if has_action_items:
        input_actions = extract_action_items(input["content"])
        output_actions = extract_action_items(output)

        actions_preserved = len(output_actions) / len(input_actions) if input_actions else 1.0
    else:
        actions_preserved = 1.0

    # Check entity preservation (people, dates, key terms)
    important_entities = [e for e in input_entities if e["type"] in ["PERSON", "DATE", "ORG"]]
    entities_preserved = sum(1 for e in important_entities if e["text"] in output) / len(important_entities) if important_entities else 1.0

    score = (actions_preserved * 0.6) + (entities_preserved * 0.4)

    return {
        "metric": "key_info_preservation",
        "score": score,
        "entities_preserved": entities_preserved,
        "actions_preserved": actions_preserved
    }

def summary_coherence_evaluator(input, output, expected):
    """Ensure the summary is coherent and readable."""
    judge_prompt = f"""
    Rate the coherence and readability of this summary (0.0 to 1.0).

    Summary: {output}

    A coherent summary:
    - Has logical flow and structure
    - Uses clear, grammatically correct language
    - Is easy to understand without the original context
    - Maintains proper formatting

    Return only a decimal number between 0.0 and 1.0.
    """

    score = float(llm_judge(judge_prompt))
    return {"metric": "coherence", "score": score}

def summary_accuracy_evaluator(input, output, expected):
    """Ensure no critical information is misrepresented."""
    judge_prompt = f"""
    Does this summary accurately represent the original content without misrepresenting facts?

    Original: {input["content"]}
    Summary: {output}

    Score 1.0 if all facts are accurate.
    Score 0.5 if there are minor inaccuracies that don't change meaning.
    Score 0.0 if there are significant misrepresentations.

    Return only a number: 0.0, 0.5, or 1.0
    """

    score = float(llm_judge(judge_prompt))
    return {"metric": "accuracy", "score": score}
```

### 1. Natural Language to SQL

**Use Case:** Convert user questions into SQL queries for analytics dashboards, product analytics, or data exploration tools.

**Dataset Example:**

```python
test_cases = [
    {
        "input": {
            "question": "Show me the top 10 users by login count this month",
            "schema": {
                "tables": ["users", "login_events"],
                "columns": {
                    "users": ["user_id", "email", "created_at"],
                    "login_events": ["event_id", "user_id", "timestamp"]
                }
            }
        },
        "expected": """
            SELECT u.user_id, u.email, COUNT(l.event_id) as login_count
            FROM users u
            JOIN login_events l ON u.user_id = l.user_id
            WHERE l.timestamp >= DATE_TRUNC('month', CURRENT_DATE)
            GROUP BY u.user_id, u.email
            ORDER BY login_count DESC
            LIMIT 10
        """,
        "metadata": {
            "complexity": "medium",
            "requires_join": True,
            "requires_aggregation": True
        }
    },
    {
        "input": {
            "question": "What was our revenue last quarter?",
            "schema": {
                "tables": ["transactions"],
                "columns": {
                    "transactions": ["id", "amount", "timestamp", "status"]
                }
            }
        },
        "expected": """
            SELECT SUM(amount) as total_revenue
            FROM transactions
            WHERE timestamp >= DATE_TRUNC('quarter', CURRENT_DATE - INTERVAL '1 quarter')
              AND timestamp < DATE_TRUNC('quarter', CURRENT_DATE)
              AND status = 'completed'
        """,
        "metadata": {
            "complexity": "simple",
            "requires_date_logic": True,
            "requires_aggregation": True
        }
    }
]
```

**Evaluator Examples:**

```python
def sql_syntax_evaluator(input, output, expected):
    """Verify the SQL is syntactically valid."""
    try:
        # Use a SQL parser like sqlparse
        import sqlparse
        parsed = sqlparse.parse(output)
        is_valid = len(parsed) > 0 and parsed[0].get_type() == 'SELECT'
        return {"metric": "syntax_valid", "score": 1.0 if is_valid else 0.0}
    except Exception as e:
        return {"metric": "syntax_valid", "score": 0.0, "error": str(e)}

def sql_correctness_evaluator(input, output, expected):
    """Execute both queries and compare results."""
    try:
        expected_results = execute_query(expected, test_db)
        actual_results = execute_query(output, test_db)

        # Compare result sets
        results_match = compare_dataframes(expected_results, actual_results)

        return {
            "metric": "correctness",
            "score": 1.0 if results_match else 0.0,
            "expected_rows": len(expected_results),
            "actual_rows": len(actual_results)
        }
    except Exception as e:
        return {"metric": "correctness", "score": 0.0, "error": str(e)}

def sql_security_evaluator(input, output, expected):
    """Check for SQL injection vulnerabilities and dangerous operations."""
    dangerous_patterns = [
        r"DROP\s+TABLE",
        r"DELETE\s+FROM.*WHERE\s+1\s*=\s*1",
        r"TRUNCATE",
        r"--",  # SQL comments can hide malicious code
        r";\s*DROP",  # Bobby Tables attack
    ]

    import re
    for pattern in dangerous_patterns:
        if re.search(pattern, output, re.IGNORECASE):
            return {
                "metric": "security",
                "score": 0.0,
                "violation": pattern
            }

    return {"metric": "security", "score": 1.0}

def sql_efficiency_evaluator(input, output, expected):
    """Check for inefficient query patterns."""
    inefficiencies = []

    # Check for SELECT *
    if re.search(r"SELECT\s+\*", output, re.IGNORECASE):
        inefficiencies.append("uses_select_star")

    # Check for missing WHERE on large tables
    if "users" in output.lower() and "where" not in output.lower():
        inefficiencies.append("missing_where_clause")

    # Check for DISTINCT without reason
    if "DISTINCT" in output.upper() and "JOIN" not in output.upper():
        inefficiencies.append("unnecessary_distinct")

    score = 1.0 - (len(inefficiencies) * 0.3)
    return {
        "metric": "efficiency",
        "score": max(0.0, score),
        "issues": inefficiencies
    }
```
