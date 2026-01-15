import { getConfig } from '../helpers/getConfig';
import Typesense from 'typesense';
import marked from 'marked';

const { env } = document.documentElement.dataset;
const typesenseConfig = getConfig(env).typesense;

// Configure marked for safe rendering (v1.x syntax)
marked.setOptions({
    breaks: true,      // Convert \n to <br>
    gfm: true,         // GitHub Flavored Markdown
    headerIds: false,  // Don't add IDs to headers
    smartLists: true   // Use smarter list behavior
});

// Conversation model ID for the docs collection
const CONVERSATION_MODEL_ID = 'CONVERSATION-MODEL-DOCS-OPENAI-GPT-4.1';

// Embedding field to use for semantic search
const EMBEDDING_FIELD = 'embedding';

// Initialize Typesense client (for potential future non-streaming use)
const typesenseClient = new Typesense.Client({
    nodes: [
        {
            host: `${typesenseConfig.host}-1.a1.typesense.net`,
            port: 443,
            protocol: 'https'
        },
        {
            host: `${typesenseConfig.host}-2.a1.typesense.net`,
            port: 443,
            protocol: 'https'
        },
        {
            host: `${typesenseConfig.host}-3.a1.typesense.net`,
            port: 443,
            protocol: 'https'
        }
    ],
    apiKey: typesenseConfig.public_key,
    connectionTimeoutSeconds: 10
});

class ConversationalSearch {
    constructor() {
        this.conversationId = null;
        this.isOpen = false;
        this.isLoading = false;
        this.messages = [];
        this.abortController = null;
        
        this.init();
    }

    init() {
        this.createElements();
        this.bindEvents();
    }

    createElements() {
        // Create floating button with sparkles icon
        this.floatButton = document.createElement('button');
        this.floatButton.className = 'conv-search-float-btn';
        this.floatButton.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
            </svg>
            <span>Ask AI</span>
        `;
        this.floatButton.setAttribute('aria-label', 'Ask AI');

        // Create sidebar overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'conv-search-overlay';

        // Create sidebar
        this.sidebar = document.createElement('div');
        this.sidebar.className = 'conv-search-sidebar';
        this.sidebar.innerHTML = `
            <div class="conv-search-header">
                <span class="conv-search-title">Datadog Docs AI</span>
                <div class="conv-search-header-actions">
                    <button class="conv-search-new" aria-label="New chat" title="New chat">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                    <button class="conv-search-close" aria-label="Close">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="conv-search-messages">
                <div class="conv-search-welcome">
                    <p>Ask me anything about Datadog documentation.</p>
                </div>
            </div>
            <div class="conv-search-footer">
                <div class="conv-search-input-container">
                    <textarea 
                        class="conv-search-input" 
                        placeholder="Ask a question..." 
                        rows="1"
                    ></textarea>
                    <button class="conv-search-send" aria-label="Send">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
                <p class="conv-search-disclaimer">AI-generated responses may be inaccurate. Verify important info.</p>
            </div>
        `;

        // Append to DOM
        document.body.appendChild(this.floatButton);
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.sidebar);

        // Cache DOM references
        this.closeBtn = this.sidebar.querySelector('.conv-search-close');
        this.newChatBtn = this.sidebar.querySelector('.conv-search-new');
        this.messagesContainer = this.sidebar.querySelector('.conv-search-messages');
        this.input = this.sidebar.querySelector('.conv-search-input');
        this.sendBtn = this.sidebar.querySelector('.conv-search-send');
    }

    bindEvents() {
        this.floatButton.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        this.newChatBtn.addEventListener('click', () => this.newChat());
        this.overlay.addEventListener('click', () => this.close());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        this.input.addEventListener('input', () => {
            this.input.style.height = 'auto';
            this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    open() {
        this.isOpen = true;
        this.sidebar.classList.add('open');
        this.overlay.classList.add('open');
        this.floatButton.classList.add('hidden');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => this.input.focus(), 300);
    }

    close() {
        this.isOpen = false;
        this.sidebar.classList.remove('open');
        this.overlay.classList.remove('open');
        this.floatButton.classList.remove('hidden');
        document.body.style.overflow = '';
        
        // Abort any ongoing request
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
        }
    }

    newChat() {
        // Abort any ongoing request
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
        }

        // Reset conversation state
        this.conversationId = null;
        this.messages = [];
        this.isLoading = false;
        this.sendBtn.disabled = false;

        // Clear messages and restore welcome
        this.messagesContainer.innerHTML = `
            <div class="conv-search-welcome">
                <p>Ask me anything about Datadog documentation.</p>
            </div>
        `;

        // Clear and focus input
        this.input.value = '';
        this.input.style.height = 'auto';
        this.input.focus();
    }

    addMessage(role, content) {
        // Remove welcome message on first interaction
        const welcome = this.messagesContainer.querySelector('.conv-search-welcome');
        if (welcome) {
            welcome.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `conv-search-message conv-search-message-${role}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'conv-search-message-content';
        contentDiv.textContent = content;
        
        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        
        this.scrollToBottom();
        
        return contentDiv;
    }

    addStreamingMessage() {
        const welcome = this.messagesContainer.querySelector('.conv-search-welcome');
        if (welcome) {
            welcome.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = 'conv-search-message conv-search-message-assistant';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'conv-search-message-content';
        contentDiv.innerHTML = '<span class="conv-search-cursor"></span>';
        
        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        
        this.scrollToBottom();
        
        return contentDiv;
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    async sendMessage() {
        const query = this.input.value.trim();
        if (!query || this.isLoading) return;

        this.isLoading = true;
        this.input.value = '';
        this.input.style.height = 'auto';
        this.sendBtn.disabled = true;

        // Add user message
        this.addMessage('user', query);

        // Add streaming response container
        const responseContainer = this.addStreamingMessage();

        try {
            await this.streamConversation(query, responseContainer);
        } catch (error) {
            if (error.name === 'AbortError') {
                responseContainer.textContent = 'Request cancelled.';
            } else {
                console.error('Conversational search error:', error);
                responseContainer.textContent = 'Sorry, something went wrong. Please try again.';
            }
        } finally {
            this.isLoading = false;
            this.sendBtn.disabled = false;
            this.abortController = null;
            this.input.focus();
        }
    }

    async streamConversation(query, responseContainer) {
        // Create abort controller for cancellation
        this.abortController = new AbortController();

        // Build the search body - only collection-specific params go here
        const searchBody = {
            searches: [
                {
                    collection: typesenseConfig.docsIndex,
                    per_page: 15,
                    exclude_fields: EMBEDDING_FIELD,
                    filter_by: 'language:en',
                    query_by: EMBEDDING_FIELD,
                    prefix: false // Required for remote embedders
                }
            ]
        };

        // Build query params - conversation params go in the URL
        const queryParams = new URLSearchParams({
            conversation: 'true',
            conversation_model_id: CONVERSATION_MODEL_ID,
            q: query,
            conversation_stream: 'true'
        });

        // Add conversation_id for follow-up questions
        if (this.conversationId) {
            queryParams.set('conversation_id', this.conversationId);
        }

        // Build the URL for streaming
        const host = `${typesenseConfig.host}-1.a1.typesense.net`;
        const url = `https://${host}/multi_search?${queryParams.toString()}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream',
                'X-TYPESENSE-API-KEY': typesenseConfig.public_key
            },
            body: JSON.stringify(searchBody),
            signal: this.abortController.signal
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Typesense error:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Stream the SSE response
        if (response.body) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedMessage = '';
            let buffer = '';

            responseContainer.innerHTML = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                
                // Process complete SSE lines
                const lines = buffer.split('\n');
                buffer = lines.pop() || ''; // Keep incomplete line in buffer

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6).trim();
                        
                        // Check for end of stream
                        if (data === '[DONE]') {
                            continue;
                        }

                        try {
                            const parsed = JSON.parse(data);
                            
                            // Extract conversation_id from first chunk
                            if (parsed.conversation_id && !this.conversationId) {
                                this.conversationId = parsed.conversation_id;
                            }

                            // Streaming chunks have incremental message content
                            if (parsed.message !== undefined) {
                                accumulatedMessage += parsed.message;
                                // During streaming, show plain text for performance
                                responseContainer.textContent = accumulatedMessage;
                                this.scrollToBottom();
                            }

                            // Final chunk contains full conversation object
                            if (parsed.conversation) {
                                this.conversationId = parsed.conversation.conversation_id;
                            }
                        } catch (e) {
                            // Skip malformed JSON chunks
                            console.debug('Skipping malformed chunk:', data);
                        }
                    }
                }
            }

            // Render markdown after streaming completes
            if (accumulatedMessage) {
                responseContainer.innerHTML = marked(accumulatedMessage);
                this.scrollToBottom();
            } else {
                responseContainer.textContent = 'No response received. Please try again.';
            }
        } else {
            // Fallback for browsers that don't support streaming
            const text = await response.text();
            const lines = text.split('\n');
            let fullAnswer = '';

            for (const line of lines) {
                if (line.startsWith('data: ') && line.slice(6).trim() !== '[DONE]') {
                    try {
                        const parsed = JSON.parse(line.slice(6));
                        if (parsed.message) {
                            fullAnswer += parsed.message;
                        }
                        if (parsed.conversation_id) {
                            this.conversationId = parsed.conversation_id;
                        }
                    } catch (e) {
                        // Skip malformed lines
                    }
                }
            }

            if (fullAnswer) {
                responseContainer.innerHTML = marked(fullAnswer);
            } else {
                responseContainer.textContent = 'No response received.';
            }
        }
    }
}

// Initialize when DOM is ready
function initConversationalSearch() {
    new ConversationalSearch();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConversationalSearch);
} else {
    initConversationalSearch();
}

export { ConversationalSearch, typesenseClient };
