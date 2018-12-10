// TODO fix code block parsing (backticks, 4-space indent, etc)

#include <iostream>
#include <fstream>
#include <unordered_map>
#include <vector>
#include <algorithm>
#include <sstream>

#define TRY_OR_ERR(cmd) do { \
    err = cmd;               \
    if (err) {               \
        return err;          \
    }                        \
} while (0);

using namespace std;

enum State {
    ST_DEFAULT,
    ST_CODEBLOCK,
    ST_DEFLINE
};

struct context {
    vector<string> refs;
    unordered_map<string, string> lookup;
};

vector<string> shortcodes;
vector<struct context> context_stack;
enum State cur = ST_DEFAULT;

void get_shortcodes(const string list) {
    shortcodes.clear();
    istringstream iss(list);

    string substr;
    while(iss.good()) {
        iss >> substr;
        shortcodes.push_back(substr);
    }
}

void output_link_defs(struct context &ctx) {
    for (unsigned i = 0; i < ctx.refs.size(); ++i) {
        cout << '[' << i + 1 << "]: " << ctx.lookup[ctx.refs[i]] << endl;
    }
}

bool closable_shortcode(const string name) {
    return find(shortcodes.begin(), shortcodes.end(), name) != shortcodes.end();
}

void add_and_print_ref(string ref) {
    vector<string> &refs = context_stack.back().refs;
    vector<string>::iterator it = find(refs.begin(), refs.end(), ref);
    if (refs.end() == it) {
        refs.push_back(ref);
        cout << '[' << refs.size() << ']';
    } else {
        cout << '[' << distance(refs.begin(), it) + 1 << ']';
    }
}

int try_shortcode(istream &in) {
    char c = in.get();

    if ('{' != c) {
        cout << '{' << c;
        return 0;
    }

    c = in.get();
    if ('<' != c && '%' != c) {
        cout << "{{" << c;
        return 0;
    }

    char open_delim = c;
    char close_delim = ('<' == c) ? '>' : '%';
    bool is_closing = false;
    string name;

    // TODO check for EOF
    in >> c;
    if ('/' == c) {
        is_closing = true;
    } else {
        in.putback(c);
    }
    in >> name;

    string args;
    while ((EOF != (c = in.get())) && close_delim != c) {
        args.push_back(c);
    }

    if (EOF == c) {
        cerr << "Error: unfinished shortcode, reached EOF" << endl;
        return 1;
    }

    char tmp;
    in >> c >> tmp;
    if ('}' != c && '}' != tmp) {
        cerr << "Error: unfinished shortcode, no closing }} found" << endl;
        return 1;
    }

    if (is_closing) {
        struct context ctx = context_stack.back();
        context_stack.pop_back();
        output_link_defs(ctx);
    } else if (closable_shortcode(name)) {
        struct context ctx = {};
        context_stack.push_back(ctx);
    }

    // output the shortcode tag
    cout << "{{" << open_delim << ' ';
    cout << (is_closing ? "/" : "") << name;
    cout << args << close_delim << "}}";

    return 0;
}

int parse_inline(istream &in, string &href) {
    char c;
    while ((EOF != (c = in.get())) && (')' != c)) {
        href.push_back(c);
    }

    // TODO warning
    if (EOF == c) {
        cout << '(' << href;
        return 0;
    }

    return 0;
}

int try_inline(istream &in, string ref) {
    int err = 0;
    char c = in.get();
    if ('#' == c || '?' == c) {
        cout << '(' << c;
        return 0;
    }

    add_and_print_ref(ref);

    string href;
    href.push_back(c);
    TRY_OR_ERR(parse_inline(in, href));
    context_stack.back().lookup[ref] = href;

    return 0;
}


int try_ref(istream &in, string link_text) {
    string ref;
    char c;
    while ((EOF != (c = in.get())) && ']' != c) {
        ref.push_back(c);
    }

    // TODO warning here
    if (EOF == c) {
        cout << '[' << ref;
        return 0;
    }
    
    if (ref.empty()) {
        add_and_print_ref(link_text);
    } else {
        add_and_print_ref(ref);
    }

    return 0;
}

int try_ref_or_def(istream &in) {
    string buf;
    char c;
    int err = 0;
    while ((EOF != (c = in.get())) && ']' != c) {
        buf.push_back(c);
    }

    if (EOF == c) {
        cout << '[' << buf;
        return 0;
    }

    c = in.get();
    switch (c) {
        case '[':
            // link ref
            cout << '[' << buf << ']';
            TRY_OR_ERR(try_ref(in, buf));
            break;
        case '(':
            // inline link
            cout << '[' << buf << ']';
            TRY_OR_ERR(try_inline(in, buf));
            break;
        case ':': {
            // link def
            string href;
            in >> href;

            if (href.empty()) {
                cerr << "Error: empty link definition" << endl;
                return 1;
            }

            context_stack.back().lookup[buf] = href;
            cur = ST_DEFLINE;
            break;
        }
        default:
            // didn't match any of the above, output and continue
            cout << '[' << buf << ']' << c;
            break;
    }

    return 0;
}

int next(istream &in, char c) {
    int err = 0;
    switch (cur) {
        case ST_CODEBLOCK:
            cout.put(c);
            if ('`' == c) {
                cur = ST_DEFAULT;
            }
            break;
        default:
            if ('{' == c) {
                TRY_OR_ERR(try_shortcode(in));
            } else if ('[' == c) {
                TRY_OR_ERR(try_ref_or_def(in));
            } else if ('`' == c) {
                cout.put(c);
                cur = ST_CODEBLOCK;
            } else {
                cout.put(c);
            }
            break;
    }
    return 0;
}

int main(int argc, char *argv[]) {
    int err = 0;

    ifstream infile(argv[1]);
    if (!infile.good()) {
        cerr << "Error: can't read file " << argv[1] << endl;
        return 1;
    }

    if (argc > 2) {
        get_shortcodes(argv[2]);
    }

    // start off with the top level context
    struct context top_ctx = {};
    context_stack.push_back(top_ctx);

    string line;
    istringstream iss;
    while(getline(infile, line)) {
        iss.str(line);
        iss.clear();
        char c;
        while (EOF != (c = iss.get())) {
            TRY_OR_ERR(next(iss, c));
        }
        if (ST_DEFLINE == cur) {
            cur = ST_DEFAULT;
        } else {
            cout << endl;
        }
    }

    infile.close();

    if (ST_DEFAULT != cur) {
        cerr << "Error: finished reading file, but ended up on non-default state: " << cur << endl;
        return 1;
    }

    // merge all remaining trailing contexts into the global context
    struct context global = {};
    for (vector<struct context>::iterator it = context_stack.begin();
            it != context_stack.end();
            ++it) {
        global.refs.insert(global.refs.end(), it->refs.begin(), it->refs.end());
        global.lookup.insert(it->lookup.begin(), it->lookup.end());
    }

    // output the global list of linkdefs
    output_link_defs(global);
}
